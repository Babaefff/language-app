import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { LANG } from '../data/lang';
import type { Reading } from '../data/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
type YTPlayer = any;

/** Loads the YouTube IFrame API once. */
let apiPromise: Promise<any> | null = null;
function loadApi(): Promise<any> {
  const w = window as any;
  if (w.YT?.Player) return Promise.resolve(w.YT);
  apiPromise ??= new Promise((resolve) => {
    const prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => { prev?.(); resolve(w.YT); };
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(s);
  });
  return apiPromise;
}

/** Accepts a full YouTube link (watch, youtu.be, shorts) or a bare id. */
export function youtubeId(input: string): string | null {
  const s = input.trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

// A video and timings chosen on this device are kept here until they are added to the course.
const store = (id: string) => `hablo:song:${id}`;
type Local = { youtube?: string; timings?: number[] };
const readLocal = (id: string): Local => { try { return JSON.parse(localStorage.getItem(store(id)) ?? '{}') as Local; } catch { return {}; } };
/** Tapping while syncing comes a little after the line starts (reaction time), so lyrics are
 * shown this many seconds early. Adjustable per device in "Video options". */
const LEAD_KEY = 'hablo:lyricsLead2';
const readLead = () => { try { const v = Number(localStorage.getItem(LEAD_KEY)); return Number.isFinite(v) && localStorage.getItem(LEAD_KEY) !== null ? v : 0.3; } catch { return 0.3; } };
const writeLocal = (id: string, v: Local) => { try { localStorage.setItem(store(id), JSON.stringify(v)); } catch { /* storage blocked */ } };

/** Taps come this long after a line really starts; it is subtracted when a tap is saved. */
const REACTION = 0.5;

export interface SongPlayerHandle {
  /** Jumps the video to the start of a lyric line (flat index). */
  seekLine: (i: number) => void;
  synced: boolean;
}

/**
 * The song sung by real performers, with the lyrics following along line by line (karaoke).
 * Lines are synced by timings: the second at which each line starts.
 */
export const SongPlayer = forwardRef<SongPlayerHandle, { r: Reading; lines: string[]; onLine: (i: number | null) => void; onSynced?: (s: boolean) => void }>(
  function SongPlayer({ r, lines, onLine, onSynced }, ref) {
    const local = readLocal(r.id);
    const [video, setVideo] = useState<string | undefined>(r.youtube ?? local.youtube);
    const [timings, setTimings] = useState<number[] | undefined>(
      // A sync made on this device for the same video wins over the built-in one.
      local.timings && local.youtube === (r.youtube ?? local.youtube) ? local.timings : r.timings,
    );
    const [link, setLink] = useState('');
    const [timing, setTiming] = useState<number[] | null>(null); // timing mode: times recorded so far
    const [loop, setLoop] = useState<number | null>(null);
    const [line, setLine] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);
    const [lead, setLead] = useState(readLead);
    const leadRef = useRef(lead);
    leadRef.current = lead;
    const nudge = (d: number) => { const v = Math.round((lead + d) * 100) / 100; setLead(v); try { localStorage.setItem(LEAD_KEY, String(v)); } catch { /* storage blocked */ } };
    const box = useRef<HTMLDivElement>(null);
    const player = useRef<YTPlayer>(null);
    const loopRef = useRef(loop);
    loopRef.current = loop;
    const synced = !!(timings && timings.length === lines.length);
    const onLineRef = useRef(onLine);
    onLineRef.current = onLine;
    useEffect(() => { onSynced?.(synced); }, [synced, onSynced]);

    useImperativeHandle(ref, () => ({
      synced,
      seekLine: (i) => {
        if (!synced || !player.current) return;
        // Start a moment before the line so its first word isn't cut off.
        player.current.seekTo(Math.max(0, timings![i] - leadRef.current - 0.3), true);
        player.current.playVideo();
      },
    }), [synced, timings]);

    // Create the player whenever the video changes.
    useEffect(() => {
      if (!video || !box.current) return;
      let cancelled = false;
      const host = document.createElement('div');
      box.current.replaceChildren(host);
      void loadApi().then((YT) => {
        if (cancelled) return;
        player.current = new YT.Player(host, { videoId: video, playerVars: { playsinline: 1, rel: 0, modestbranding: 1 } });
      });
      return () => { cancelled = true; player.current?.destroy?.(); player.current = null; };
    }, [video]);

    // Follow the video: highlight the current line, and loop one line if asked.
    useEffect(() => {
      if (!synced) return;
      const t = setInterval(() => {
        const p = player.current;
        if (!p?.getCurrentTime) return;
        const now: number = p.getCurrentTime();
        const playing = p.getPlayerState?.() === 1;
        let i = -1;
        for (let k = 0; k < timings!.length; k++) if (timings![k] <= now + leadRef.current) i = k;
        const l = loopRef.current;
        if (l !== null && playing) {
          const end = timings![l + 1] ?? timings![l] + 8;
          if (now >= end - leadRef.current || now < timings![l] - leadRef.current - 1) { p.seekTo(Math.max(0, timings![l] - leadRef.current - 0.3), true); i = l; }
        }
        const cur = i >= 0 ? i : null;
        setLine(cur);
        onLineRef.current(cur);
      }, 80);
      return () => clearInterval(t);
    }, [synced, timings]);

    const startSync = () => { setLoop(null); setTiming([]); onLine(0); player.current?.seekTo(0, true); player.current?.playVideo(); };

    const chooseVideo = () => {
      const id = youtubeId(link);
      if (!id) return;
      setVideo(id);
      setTimings(undefined);
      writeLocal(r.id, { youtube: id });
    };

    const tap = () => {
      if (!timing || !player.current) return;
      const next = [...timing, Math.max(0, Math.round((player.current.getCurrentTime() - REACTION) * 10) / 10)];
      if (next.length === lines.length) {
        setTimings(next);
        setTiming(null);
        writeLocal(r.id, { youtube: video, timings: next });
        onLine(null);
      } else {
        setTiming(next);
        onLine(next.length);
      }
    };

    const code = `youtube: '${video}', timings: [${(timings ?? []).join(', ')}],`;
    const search = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${r.title} ${LANG === 'de' ? 'Lied' : 'canción'}`)}`;

    if (!video) {
      return (
        <div className="card">
          <h3>🎵 Hear it sung</h3>
          <p className="muted small">Pick a performance on YouTube, paste its link here, and the song plays inside the app with the lyrics following along.</p>
          <form className="row wrap" onSubmit={(e) => { e.preventDefault(); chooseVideo(); }}>
            <input className="account-email" placeholder="https://www.youtube.com/watch?v=…" value={link} onChange={(e) => setLink(e.target.value)} />
            <button className="btn primary" disabled={!youtubeId(link)}>Use this video</button>
          </form>
          <p className="small"><a href={search} target="_blank" rel="noreferrer">Find “{r.title}” on YouTube ↗</a></p>
        </div>
      );
    }

    return (
      <div className="card song-video">
        <div ref={box} className="yt-box" />
        {timing ? (
          <div className="timing">
            <p className="small"><strong>Timing mode</strong> — tap the button the moment each line starts being sung ({timing.length}/{lines.length}).</p>
            <button className="btn primary timing-btn" onClick={tap}>
              ▶ Line {timing.length + 1}: <span lang={LANG}>{lines[timing.length]}</span>
            </button>
            <div className="row wrap">
              <button className="btn" disabled={!timing.length} onClick={() => { const n = timing.slice(0, -1); setTiming(n); onLine(n.length); }}>↶ Undo</button>
              <button className="btn" onClick={() => { setTiming(null); onLine(null); }}>Cancel</button>
            </div>
          </div>
        ) : synced ? (
          <div className="row wrap between">
            <span className="muted small">🎤 Lyrics follow the song. Tap ▸ next to a line to jump there.</span>
            <button className={`btn small-btn ${loop !== null ? 'playing' : ''}`} disabled={line === null && loop === null} onClick={() => setLoop(loop !== null ? null : line)}>
              🔁 {loop !== null ? `Repeating line ${loop + 1} — stop` : 'Repeat this line'}
            </button>
            <button className="btn small-btn" onClick={startSync}>⏱ Re-sync lyrics</button>
          </div>
        ) : (
          <p className="small">
            Lyrics aren’t synced to this video yet.{' '}
            <button className="link" onClick={() => { setTiming([]); onLine(0); player.current?.seekTo(0, true); player.current?.playVideo(); }}>Sync them now</button>{' '}
            <span className="muted">(tap once per line while the song plays — about as long as the song)</span>
          </p>
        )}
        {!timing && (
          <details className="small">
            <summary>Video options</summary>
            <div className="row wrap">
              <button className="link" onClick={() => { setVideo(undefined); setTimings(undefined); writeLocal(r.id, {}); }}>Choose another video</button>
            </div>
            {synced && (
              <div className="row wrap">
                <span>Lyrics timing:</span>
                <button className="btn small-btn" onClick={() => nudge(0.1)}>◀ earlier</button>
                <button className="btn small-btn" onClick={() => nudge(-0.1)}>later ▶</button>
                <span className="muted">{lead >= 0 ? `${lead.toFixed(1)} s ahead` : `${(-lead).toFixed(1)} s behind`}</span>
              </div>
            )}
            {synced && timings !== r.timings && (
              <>
                <p className="muted">These timings are saved on this device only. To add them to the app for everyone, send this line to the developer:</p>
                <pre className="code">{code}</pre>
                <button className="btn small-btn" onClick={() => { void navigator.clipboard?.writeText(code).then(() => setCopied(true)); }}>{copied ? '✓ Copied' : 'Copy'}</button>
              </>
            )}
          </details>
        )}
      </div>
    );
  },
);
