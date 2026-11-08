import type { Level, Sentence, Unit, Word } from './types';
import { content } from './content';
import { bare, normalize } from '../lib/text';

/** Units of the language being studied. */
export const UNITS: Unit[] = content().units;
export const UNIT_MAP: Record<string, Unit> = Object.fromEntries(UNITS.map((u) => [u.id, u]));
export const WORDS: Word[] = UNITS.flatMap((u) => u.words);
export const WORD_MAP: Record<string, Word> = Object.fromEntries(WORDS.map((w) => [w.id, w]));
export const SENTENCES: (Sentence & { unitId: string; level: Level })[] = UNITS.flatMap((u) =>
  u.sentences.map((s) => ({ ...s, unitId: u.id, level: u.level })),
);

export const unitsForLevel = (level: Level) => UNITS.filter((u) => u.level === level);

let dict: Map<string, Word> | null = null;

/** Finds a course word for a token from running text (handles articles, plurals, gender). */
export function lookupWord(token: string): Word | undefined {
  if (!dict) {
    dict = new Map();
    for (const w of WORDS) {
      const key = normalize(w.es);
      if (!dict.has(key)) dict.set(key, w);
      const b = bare(w.es);
      if (!dict.has(b)) dict.set(b, w);
    }
  }
  const t = normalize(token);
  const candidates = [t];
  if (t.endsWith('es')) candidates.push(t.slice(0, -2));
  if (t.endsWith('s')) candidates.push(t.slice(0, -1));
  for (const c of [...candidates]) {
    if (c.endsWith('a')) candidates.push(c.slice(0, -1) + 'o');
  }
  for (const c of candidates) {
    const w = dict.get(c);
    if (w) return w;
  }
  return undefined;
}

/** Grammar lessons that explain the grammar used in each unit. */
export const UNIT_LESSONS: Record<string, string[]> = content().unitLessons;
