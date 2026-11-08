import { Icon } from './Icon';
import { LANG } from '../data/lang';
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(next, [pathname]);
  // Each word runs its own clock: the translation appears after 3 s, then the word stays
  // 5.5 s more before the next one. A page change restarts the clock, so the translation
  // is always shown before the word changes.
  useEffect(() => {
    const t = setTimeout(() => (reveal ? next() : setReveal(true)), reveal ? 5500 : 3000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reveal, word]);

  if (!settings.ticker || !word) return null;
  return (
    <button className="ticker" onClick={() => speak(word.es)} title="Tap to hear it" key={word.id}>
      <span className="ticker-content">
        <Icon name="volume" size={18} />
        <span className="ticker-es" lang={LANG}>{word.es}</span>
        <span className={`ticker-en ${reveal ? 'show' : ''}`} lang="en">{word.en}</span>
      </span>
    </button>
  );
}
