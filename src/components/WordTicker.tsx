import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WORD_MAP, WORDS } from '../data/course';
import type { Word } from '../data/types';
import { useProgress } from '../lib/store';
import { speak } from '../lib/speech';
import { shuffle } from '../lib/text';

/**
 * A slim strip that keeps showing words you have met, in shuffled order: every word
 * appears once before any repeats (a "shuffle bag"), and it moves on when you change page.
 */
export function WordTicker() {
  const { cards, settings } = useProgress();
  const { pathname } = useLocation();
  const pool = useMemo<Word[]>(() => {
    const learned = Object.keys(cards).map((id) => WORD_MAP[id]).filter(Boolean);
    // Beginners haven't met many words yet: show the whole A1 vocabulary instead.
    return learned.length >= 10 ? learned : WORDS.filter((w) => w.level === 'A1');
  }, [cards]);
  const bag = useRef<Word[]>([]);
  const draw = () => {
    if (!bag.current.length) bag.current = shuffle(pool);
    return bag.current.pop();
  };
  const [word, setWord] = useState<Word | undefined>(() => draw());
  const [reveal, setReveal] = useState(false);
  const next = () => {
    setWord(draw());
    setReveal(false);
  };

  // New pool (more words learned) → refill the bag from it.
  useEffect(() => {
    bag.current = shuffle(pool);
  }, [pool]);
  useEffect(() => {
    const t = setInterval(next, 9000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(next, [pathname]);
  useEffect(() => {
    if (reveal) return;
    const t = setTimeout(() => setReveal(true), 3500);
    return () => clearTimeout(t);
  }, [reveal, word]);

  if (!settings.ticker || !word) return null;
  return (
    <button className="ticker" onClick={() => speak(word.es)} title="Tap to hear it" key={word.id}>
      <span className="ticker-es" lang="es">🔊 {word.es}</span>
      <span className={`ticker-en ${reveal ? 'show' : ''}`}>{word.en}</span>
    </button>
  );
}
