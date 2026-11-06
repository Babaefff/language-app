import { useEffect, useState } from 'react';
import { Link } from '../components/Nav';
import { SENTENCES } from '../data/course';
import { L, LANG } from '../data/lang';
import { LEVELS, type Level } from '../data/types';
import { compareSpeech, listenOnce, recognitionSupported, RECOGNITION_ERRORS, stopListening } from '../lib/recognize';
import { speak, stopSpeaking } from '../lib/speech';
import { addXp } from '../lib/store';
import { sample } from '../lib/text';

type Mode = 'repeat' | 'translate';
const PASS = 80;

export function Speaking() {
  const [mode, setMode] = useState<Mode>('repeat');
  const [levels, setLevels] = useState<Level[]>(['A1']);
  const [items, setItems] = useState<typeof SENTENCES | null>(null);
  const [i, setI] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof compareSpeech> | null>(null);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState('');
  const [passed, setPassed] = useState(0);
  const pool = SENTENCES.filter((s) => levels.includes(s.level));
  const s = items?.[i];

  useEffect(() => () => { stopListening(); stopSpeaking(); }, []);
  useEffect(() => { if (s && mode === 'repeat') void speak(s.es); }, [s, mode]);

  const start = () => { setItems(sample(pool, 10)); setI(0); setResult(null); setPassed(0); setError(''); };
  const record = async () => {
    if (!s || listening) return;
    stopSpeaking();
    setError('');
    setListening(true);
    try {
      const heard = await listenOnce();
      const r = compareSpeech(s.es, heard);
      if (!result && r.pct >= PASS) { setPassed(passed + 1); addXp(2); }
      setResult(r);
    } catch (e) {
      const code = (e as Error).message;
      setError(RECOGNITION_ERRORS[code] ?? `Speech recognition failed (${code}).`);
    } finally {
      setListening(false);
    }
  };
  const next = () => { stopListening(); setResult(null); setError(''); setI(i + 1); };

  if (!recognitionSupported()) {
    return (
      <div className="page narrow">
        <Link className="link" to="/practice">← Practice</Link>
        <h1>🎤 Speaking</h1>
        <p className="card">{RECOGNITION_ERRORS.unsupported}</p>
      </div>
    );
  }

  if (items && !s) {
    return (
      <div className="page narrow">
        <h1>🎤 Speaking</h1>
        <div className="card">
          <h2>{passed}/{items.length} understood</h2>
          <p className="muted">{passed >= 8 ? 'Excellent — you are clearly understood.' : 'Listen to each sentence again and copy the rhythm, then retry.'}</p>
          <div className="row"><button className="btn primary" onClick={start}>Again</button><button className="btn" onClick={() => setItems(null)}>Done</button></div>
        </div>
      </div>
    );
  }

  if (s) {
    const show = mode === 'repeat' || !!result;
    const words = s.es.split(/\s+/);
    return (
      <div className="page narrow">
        <div className="row between"><button className="link" onClick={() => setItems(null)}>✕ Stop</button><span className="muted small">{i + 1}/{items!.length}</span></div>
        <div className="card speak-card">
          <p className="muted small">{mode === 'repeat' ? 'Listen, then say it' : `Say it in ${L.name}`}</p>
          {mode === 'translate' && <h2>{s.en}</h2>}
          {show && (
            <p className="speak-target" lang={LANG}>
              {result
                ? words.map((w, wi) => {
                    // map each written word to the found flags of its letter-words
                    const before = words.slice(0, wi).join(' ').match(/\p{L}+/gu)?.length ?? 0;
                    const n = w.match(/\p{L}+/gu)?.length ?? 0;
                    const ok = result.found.slice(before, before + n).every(Boolean);
                    return <span key={wi} className={ok ? 'heard-ok' : 'heard-miss'}>{w} </span>;
                  })
                : s.es}
            </p>
          )}
          {mode === 'repeat' && <p className="muted small">{s.en}</p>}
          <div className="row wrap">
            {show && <button className="btn" onClick={() => speak(s.es)}>🔊 Listen</button>}
            <button className={`btn primary ${listening ? 'playing' : ''}`} onClick={record} disabled={listening}>{listening ? '🎙️ Listening…' : result ? '🎤 Try again' : '🎤 Speak'}</button>
          </div>
          {error && <p className="warn">{error}</p>}
          {result && (
            <p className={result.pct >= PASS ? 'exam-score pass' : 'exam-score fail'}>
              <strong>{result.pct}% understood</strong>{result.heard ? <> — heard: “<span lang={LANG}>{result.heard}</span>”</> : ' — nothing recognised'}
            </p>
          )}
        </div>
        <button className="btn" onClick={next}>{result ? 'Next →' : 'Skip →'}</button>
      </div>
    );
  }

  return (
    <div className="page narrow">
      <Link className="link" to="/practice">← Practice</Link>
      <h1>🎤 Speaking</h1>
      <p className="muted">Speak into the microphone and see which words were understood. Green means the word was recognised; red means try it again. This checks whether you are understood — it can’t grade every detail of your accent.</p>
      <div className="card">
        <h3>Mode</h3>
        <div className="chips">
          <button className={`chip ${mode === 'repeat' ? 'on' : ''}`} onClick={() => setMode('repeat')}>🔁 Repeat after me</button>
          <button className={`chip ${mode === 'translate' ? 'on' : ''}`} onClick={() => setMode('translate')}>🗣️ Say it in {L.name}</button>
        </div>
        <h3>Levels</h3>
        <div className="chips">
          {LEVELS.map((l) => (
            <button key={l} className={`chip ${levels.includes(l) ? 'on' : ''}`} onClick={() => setLevels(levels.includes(l) ? (levels.length > 1 ? levels.filter((x) => x !== l) : levels) : [...levels, l])}>{l}</button>
          ))}
        </div>
        <div className="row between">
          <span className="muted small">{pool.length} sentences</span>
          <button className="btn primary" onClick={start}>Start</button>
        </div>
      </div>
    </div>
  );
}
