import { L, LANG } from '../data/lang';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '../components/Nav';
import { READINGS, SONGS } from '../data/readings';
import type { Reading } from '../data/types';
import { tokenize } from '../lib/text';
import { gloss, type Gloss } from '../lib/gloss';
import { chunks } from '../lib/audioKey';
import { speak, stopSpeaking } from '../lib/speech';

type Speed = 'slower' | 'slow' | 'normal';
const SPEED_KEY = 'hablo:reading-speed';
/** rate: as in Settings (0.9 = normal); undefined = the speed chosen in Settings. */
const SPEEDS: Record<Speed, { label: string; rate?: number; pause: number }> = {
  slower: { label: '🐢 Slower', rate: 0.55, pause: 900 },
  slow: { label: 'Slow', rate: 0.7, pause: 500 },
  normal: { label: 'Normal', pause: 0 },
};
import { addXp, completeReading, gradeWord, useProgress } from '../lib/store';
import { SpeakButton } from '../components/SpeakButton';
import { coverage, isReady, readyAfter } from '../lib/readiness';
import { useFeedbackPage } from '../lib/feedback';
import { FeedbackButton } from '../components/FeedbackButton';
import { UNITS, WORD_MAP } from '../data/course';
import { WordParts } from '../components/WordParts';
import { SongPlayer, type SongPlayerHandle } from '../components/SongPlayer';

export function Readings() {
  return (
    <div className="page">
      <h1>Reading</h1>
      <p className="muted">Short graded texts. Tap any word for its meaning, listen to the whole text read aloud, then check your understanding.</p>
      <ReadingGrid items={READINGS} />
      <Link to="/songs" className="card action"><h2>Songs</h2><p className="muted small">Sing along with real singers, line by line.</p></Link>
    </div>
  );
}

export function Songs() {
  return (
    <div className="page">
      <h1>Songs</h1>
      <p className="muted">Traditional songs and carols sung by real singers. The lyrics light up line by line with the English underneath — tap any word for its meaning, repeat a line, then play the gap game.</p>
      {SONGS.length === 0 && <p className="card">Songs for {L.name} are coming soon.</p>}
      <ReadingGrid items={SONGS} />
    </div>
  );
}

/** "Ready to read" from the lessons finished so far, or the lesson that makes it ready. */
export function ReadyTag({ r, done }: { r: Reading; done: Record<string, unknown> }) {
  const gate = readyAfter(r);
  if (isReady(r, done)) return <span className="ready-tag on">✓ Ready: you know {Math.round(coverage(r, done) * 100)}% of the words</span>;
  if (!gate) return null;
  return <span className="ready-tag">Ready after lesson {UNITS.indexOf(gate) + 1}: {gate.title}</span>;
}

function ReadingGrid({ items }: { items: Reading[] }) {
  const { readings, units } = useProgress();
  return (
      <div className="grid-2">
        {items.map((r) => (
          <Link key={r.id} to={`/${r.song ? 'songs' : 'reading'}/${r.id}`} className="card action">
            <span className={`badge ${r.level.replace('+', 'plus')}`}>{r.level}</span>
            <h2 lang={LANG}>{r.title}</h2>
            <p className="muted small">{r.source ?? r.paragraphs[0].slice(0, 90) + '…'}</p>
            {readings[r.id] ? <span className="small">✓ {r.song ? 'Done' : 'Read'} · {readings[r.id].score}/{r.questions.length} correct</span> : <ReadyTag r={r} done={units} />}
          </Link>
        ))}
      </div>
  );
}

export function ReadingPage() {
  const { id } = useParams();
  const r = [...READINGS, ...SONGS].find((x) => x.id === id);
  const { cards } = useProgress();
  const [showEn, setShowEn] = useState(false);
  const [popup, setPopup] = useState<Gloss | null>(null);
  const [current, setCurrent] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const playId = useRef(0);
  // Reading speed for beginners: slow keeps the voice natural (pitch unchanged) and pauses between sentences.
  const [speed, setSpeed] = useState<Speed>(() => { try { const v = localStorage.getItem(SPEED_KEY); return v === 'slow' || v === 'slower' ? v : 'normal'; } catch { return 'normal'; } });
  const pickSpeed = (v: Speed) => { setSpeed(v); try { localStorage.setItem(SPEED_KEY, v); } catch { /* this visit only */ } };
  const speedRef = useRef(speed);
  speedRef.current = speed;
  const songRef = useRef<SongPlayerHandle>(null);
  const [synced, setSynced] = useState(false);
  const keysRef = useRef<string[]>([]);
  const onSongLine = useCallback((i: number | null) => setCurrent(i === null ? null : keysRef.current[i] ?? null), []);

  useEffect(() => () => { playId.current++; stopSpeaking(); }, []);

  useFeedbackPage(r ? `${r.song ? 'Song' : 'Reading'} · ${r.title}` : undefined, undefined, r ? `${r.song ? 'Songs' : 'Reading'} · ${r.level}` : undefined);
  if (!r) return <div className="page"><p>Text not found. <Link to="/reading">Back</Link></p></div>;

  const sentences = (p: string) => chunks(p, r.song);
  const all = r.paragraphs.flatMap((p, pi) => sentences(p).map((s, si) => ({ key: `${pi}:${si}`, s })));
  keysRef.current = all.map((x) => x.key);
  const play = async (from = 0) => {
    const me = ++playId.current;
    for (const { key, s } of all.slice(from)) {
      if (playId.current !== me) return;
      setCurrent(key);
      const sp = SPEEDS[speedRef.current];
      await speak(s, sp.rate ? { rate: sp.rate } : {});
      // A short breath between sentences gives time to follow along.
      if (sp.pause && playId.current === me) await new Promise((res) => setTimeout(res, sp.pause));
    }
    if (playId.current === me) setCurrent(null);
  };
  const stop = () => { playId.current++; stopSpeaking(); setCurrent(null); };

  const score = r.questions.filter((q, i) => answers[i] === q.answer).length;

  return (
    <div className="page narrow">
      <Link className="link" to={r.song ? '/songs' : '/reading'}>← {r.song ? 'Songs' : 'Reading'}</Link>
      <div className="row wrap between">
        <div>
          <span className={`badge ${r.level.replace('+', 'plus')}`}>{r.level}</span>
          <h1 lang={LANG}>{r.title}</h1>
          {r.source && <p className="muted small">{r.source}</p>}
        </div>
        <div className="row wrap reading-controls">
          {current ? <button className="btn" onClick={stop}>⏹ Stop</button> : <button className="btn primary" onClick={() => play()}>▶ {r.song ? 'Speak lyrics' : 'Read aloud'}</button>}
          {!r.song && (
            <div className="seg speed-seg" role="group" aria-label="Reading speed">
              {(Object.keys(SPEEDS) as Speed[]).map((k) => <button key={k} className={speed === k ? 'on' : ''} aria-pressed={speed === k} onClick={() => pickSpeed(k)}>{SPEEDS[k].label}</button>)}
            </div>
          )}
          <label className="toggle"><input type="checkbox" checked={showEn} onChange={(e) => setShowEn(e.target.checked)} /> English</label>
        </div>
      </div>
      {r.keyWords && r.keyWords.length > 0 && (
        <section className="card key-words">
          <h3>Key words for this text</h3>
          <ul className="glossary-list">{r.keyWords.map((w) => <li key={w}><strong lang={LANG}>{w}</strong> <span>{r.glossary[w]}</span></li>)}</ul>
        </section>
      )}

      {r.song && <SongPlayer ref={songRef} r={r} lines={all.map((x) => x.s)} onLine={onSongLine} onSynced={setSynced} />}

      <article className={`card reading ${r.song ? 'song' : ''}`}>
        {r.paragraphs.map((p, pi) => (
          <div key={pi} className="para">
            <p lang={LANG}>
              {sentences(p).map((s, si) => (
                <span key={si} className={`${r.song ? 'song-line' : ''} ${current === `${pi}:${si}` ? 'reading-now' : ''}`}>
                  {synced && <button className="seek" aria-label="Play from this line" onClick={() => songRef.current?.seekLine(all.findIndex((x) => x.key === `${pi}:${si}`))}>▶</button>}
                  {tokenize(s).map((t, ti) =>
                    t.word ? (
                      <button key={ti} className="w" onClick={() => { const g = gloss(t.text, r.glossary); setPopup(g); speak(t.text); }}>{t.text}</button>
                    ) : (
                      <span key={ti}>{t.text}</span>
                    ),
                  )}
                  {r.song && showEn && <span className="line-en" lang="en">{r.translation[pi].split('\n')[si]}</span>}
                </span>
              ))}
            </p>
            {showEn && !r.song && <p className="muted translation">{r.translation[pi]}</p>}
          </div>
        ))}
      </article>

      {popup && (
        <div className="popup card" role="dialog">
          <div className="row between">
            <div className="row"><strong lang={LANG}>{popup.word}</strong><SpeakButton text={popup.word} /></div>
            <button className="icon-btn" onClick={() => setPopup(null)} aria-label="Close">✕</button>
          </div>
          <div>{popup.meaning}</div>
          {popup.detail && <div className="muted small" lang={LANG}>{popup.detail}</div>}
          {popup.wordId && WORD_MAP[popup.wordId] && <WordParts word={WORD_MAP[popup.wordId]} compact />}
          {popup.wordId && !cards[popup.wordId] && <button className="btn small-btn" onClick={() => { gradeWord(popup.wordId!, 0); setPopup(null); }}>+ Add to my reviews</button>}
        </div>
      )}

      {r.song && <GapGame r={r} />}

      <section className="card">
        <h3>{LANG === 'de' ? 'Verständnis' : LANG === 'fr' ? 'Compréhension' : LANG === 'ru' ? 'Понимание текста' : 'Comprensión'}</h3>
        {r.questions.map((q, qi) => (
          <div key={qi} className="question">
            <p lang={LANG}><strong>{qi + 1}. {q.q}</strong></p>
            <div className="options">
              {q.options.map((o, oi) => (
                <button
                  key={oi}
                  lang={LANG}
                  className={`option ${answers[qi] === oi ? 'selected' : ''} ${submitted && oi === q.answer ? 'right' : ''} ${submitted && answers[qi] === oi && oi !== q.answer ? 'wrong' : ''}`}
                  disabled={submitted}
                  onClick={() => setAnswers({ ...answers, [qi]: oi })}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        ))}
        {submitted ? (
          <p><strong>{score}/{r.questions.length} correct.</strong> {score === r.questions.length ? '¡Perfecto! 🎉' : 'Re-read with the English toggle and try again later.'}</p>
        ) : (
          <button
            className="btn primary"
            disabled={Object.keys(answers).length < r.questions.length}
            onClick={() => { setSubmitted(true); completeReading(r.id, score); addXp(10 + score * 2); }}
          >
            Check answers
          </button>
        )}
      </section>
      <p className="center-text"><FeedbackButton /></p>
    </div>
  );
}

const shuffle = <T,>(a: T[]) => a.map((x) => [Math.random(), x] as const).sort((x, y) => x[0] - y[0]).map((x) => x[1]);

/** One gap per line: the longest word, with two distractors taken from the other lines. */
function makeGaps(r: Reading) {
  const lines = [...new Set(r.paragraphs.flatMap((p) => chunks(p, true)))];
  const items = lines.flatMap((line) => {
    const words = tokenize(line).filter((t) => t.word && t.text.length >= 4);
    if (!words.length) return [];
    const answer = words.reduce((a, b) => (b.text.length > a.text.length ? b : a)).text;
    return [{ line, answer }];
  });
  const pool = [...new Set(items.map((i) => i.answer))];
  return shuffle(items).slice(0, 6).flatMap((it) => {
    const others = shuffle(pool.filter((w) => w.toLowerCase() !== it.answer.toLowerCase())).slice(0, 2);
    if (others.length < 2) return [];
    const i = it.line.indexOf(it.answer);
    return [{ ...it, before: it.line.slice(0, i), after: it.line.slice(i + it.answer.length), options: shuffle([it.answer, ...others]) }];
  });
}

function GapGame({ r }: { r: Reading }) {
  const [gaps, setGaps] = useState(() => makeGaps(r));
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const g = gaps[i];
  if (!gaps.length) return null;
  const restart = () => { setGaps(makeGaps(r)); setI(0); setPicked(null); setScore(0); };
  if (!g) {
    return (
      <section className="card">
        <h3>Listen &amp; fill the gap</h3>
        <p><strong>{score}/{gaps.length} correct.</strong> {score === gaps.length ? '🎉' : 'Listen to the lyrics again and retry.'}</p>
        <button className="btn" onClick={restart}>↻ Play again</button>
      </section>
    );
  }
  const choose = (o: string) => {
    if (picked) return;
    setPicked(o);
    if (o === g.answer) { setScore(score + 1); addXp(2); }
  };
  return (
    <section className="card gap-game">
      <div className="row between">
        <h3>Listen &amp; fill the gap</h3>
        <span className="muted small">{i + 1}/{gaps.length}</span>
      </div>
      <p className="gap-line" lang={LANG}>
        {g.before}<span className={`gap ${picked ? (picked === g.answer ? 'right' : 'wrong') : ''}`}>{picked ? g.answer : '_____'}</span>{g.after}
      </p>
      <div className="row"><SpeakButton text={g.line} /> <span className="muted small">Listen, then choose the missing word.</span></div>
      <div className="options">
        {g.options.map((o) => (
          <button key={o} lang={LANG} className={`option ${picked && o === g.answer ? 'right' : ''} ${picked === o && o !== g.answer ? 'wrong' : ''}`} disabled={!!picked} onClick={() => choose(o)}>{o}</button>
        ))}
      </div>
      {picked && <button className="btn primary" onClick={() => { setPicked(null); setI(i + 1); }}>Next →</button>}
    </section>
  );
}

