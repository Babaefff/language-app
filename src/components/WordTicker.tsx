import { useEffect, useMemo, useState } from 'react';
import { WORD_MAP, WORDS } from '../data/course';
import { useProgress } from '../lib/store';
import { speak } from '../lib/speech';

/**
 * A slim strip that keeps cycling through words you are learning, weakest first,
 * so they stay in front of you on every page.
 */
export function WordTicker() {
  const { cards, settings } = useProgress();
  const pool = useMemo(() => {
    const learned = Object.entries(cards)
      .filter(([id]) => WORD_MAP[id])
      .sort((a, b) => a[1].interval - b[1].interval)
      .slice(0, 40)
      .map(([id]) => WORD_MAP[id]);
    return learned.length >= 3 ? learned : WORDS.filter((w) => w.unitId === 'a1-01');
  }, [cards]);
  const [i, setI] = useState(() => Math.floor(Math.random() * 1000));
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setI((n) => n + 1);
      setReveal(false);
    }, 9000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (!reveal) {
      const t = setTimeout(() => setReveal(true), 3500);
      return () => clearTimeout(t);
    }
  }, [reveal, i]);

  if (!settings.ticker || !pool.length) return null;
  const w = pool[i % pool.length];
  return (
    <button className="ticker" onClick={() => speak(w.es)} title="Tap to hear it" key={w.id}>
      <span className="ticker-es" lang="es">🔊 {w.es}</span>
      <span className={`ticker-en ${reveal ? 'show' : ''}`}>{w.en}</span>
    </button>
  );
}
