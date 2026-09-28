import { useEffect, useRef, useState } from 'react';
import { UNITS, WORD_MAP, WORDS } from '../data/course';
import type { Word } from '../data/types';
import { getProgress } from '../lib/store';
import { recallChance } from '../lib/srs';
import { shuffle } from '../lib/text';
import { speak, stopSpeaking } from '../lib/speech';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Source = 'mine' | string;

function wordsFor(source: Source): Word[] {
  if (source === 'mine') {
    const mine = Object.entries(getProgress().cards)
      .filter(([id]) => WORD_MAP[id])
      .sort((a, b) => recallChance(a[1]) - recallChance(b[1]))
      .slice(0, 50)
      .map(([id]) => WORD_MAP[id]);
    return mine.length ? shuffle(mine) : WORDS.filter((w) => w.unitId === 'a1-01');
  }
  return shuffle(WORDS.filter((w) => w.unitId === source));
}

/**
 * Hands-free "passive" mode: shows and speaks each word, pauses so you can recall the
 * meaning, then reveals it and reads the example. Repetition without effort.
 */
export function Listen() {
  const [source, setSource] = useState<Source>('mine');
  const [english, setEnglish] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [list, setList] = useState<Word[]>(() => wordsFor('mine'));
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<'es' | 'en'>('es');
  const run = useRef(0);

  useEffect(() => {
    setList(wordsFor(source));
    setI(0);
  }, [source]);

  useEffect(() => {
    if (!playing) return;
    const id = ++run.current;
    const alive = () => run.current === id;
    let lock: { release: () => Promise<void> } | null = null;
    try { (navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<{ release: () => Promise<void> }> } }).wakeLock
      ?.request('screen')
      .then((l) => { lock = l; })
      .catch(() => {}); } catch { // wake lock unavailable
    }
    (async () => {
      let n = i;
      while (alive()) {
        const w = list[n % list.length];
        setI(n % list.length);
        setPhase('es');
        await speak(w.es);
        if (!alive()) break;
        await wait(2200);
        if (!alive()) break;
        setPhase('en');
        if (english) await speak(w.en, { lang: 'en' });
        await wait(600);
        if (w.ex && alive()) await speak(w.ex);
        if (!alive()) break;
        await speak(w.es);
        await wait(1500);
        n++;
      }
    })();
    return () => {
      run.current++;
      stopSpeaking();
      lock?.release().catch(() => {});
    };
    // Restart the loop only when play state or content changes, not on every index tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, list, english]);

  const w = list[i];
  return (
    <div className="page narrow">
      <h1>Listen mode</h1>
      <p className="muted">Press play and just listen. Each word is spoken, you get a moment to recall its meaning, then it's revealed with an example. Leave it running while you cook, walk or commute.</p>
      <div className="card">
        <div className="row wrap">
          <select value={source} onChange={(e) => { setPlaying(false); setSource(e.target.value); }}>
            <option value="mine">My words (weakest first)</option>
            {UNITS.map((u) => <option key={u.id} value={u.id}>{u.level} · {u.title}</option>)}
          </select>
          <label className="toggle"><input type="checkbox" checked={english} onChange={(e) => setEnglish(e.target.checked)} /> Speak English too</label>
        </div>
      </div>
      {w && (
        <div className="card listen-card">
          <div className="learn-es" lang="es">{w.es}</div>
          <div className={`learn-en ${phase === 'en' ? '' : 'hidden'}`}>{w.en}</div>
          {w.ex && <div className={`learn-ex ${phase === 'en' ? '' : 'hidden'}`}><div lang="es">{w.ex}</div><div className="muted">{w.exEn}</div></div>}
          <div className="muted small">{i + 1} / {list.length}</div>
        </div>
      )}
      <div className="row center">
        <button className="btn" onClick={() => { setPlaying(false); setI((i - 1 + list.length) % list.length); setPhase('en'); }}>⏮</button>
        <button className="btn primary big" onClick={() => setPlaying(!playing)}>{playing ? '⏸ Pause' : '▶ Play'}</button>
        <button className="btn" onClick={() => { setPlaying(false); setI((i + 1) % list.length); setPhase('en'); }}>⏭</button>
      </div>
    </div>
  );
}
