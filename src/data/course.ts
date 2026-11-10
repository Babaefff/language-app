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
let stemDict: Map<string, Word> | null = null;
/** Rough stems (4+ letters) so inflected forms find their word: meinen → mein, Москве → Москва. */
const stemsOf = (t: string, cuts: number[]) => cuts.map((c) => t.slice(0, t.length - c)).filter((x) => x.length >= 4);

/** Finds a course word for a token from running text (handles articles, plurals, gender). */
export function lookupWord(token: string, fuzzy = true): Word | undefined {
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
  if (!fuzzy) return undefined;
  if (!stemDict) {
    stemDict = new Map();
    for (const w of WORDS) {
      const b = bare(w.es);
      if (b.includes(' ')) continue;
      for (const st of stemsOf(b, [0, 1, 2])) if (!stemDict.has(st)) stemDict.set(st, w);
    }
  }
  // The shared part must cover most of both words, so "klein" finds "kleinen" but
  // "Prozent" never turns into "Prozess" or "животным" (animals) into "живот" (stomach).
  for (const st of stemsOf(t, [1, 2, 3])) {
    const w = dict.get(st) ?? stemDict.get(st);
    const b = bare(w?.es ?? '');
    // Russian endings are often two letters (красивый → красивая), so allow that much there.
    const enough = /[а-яё]/.test(b) ? st.length >= b.length - 2 : st.length >= 0.8 * b.length;
    if (w && enough && st.length >= 0.65 * t.length) return w;
  }
  return undefined;
}

/** Grammar lessons that explain the grammar used in each unit. */
export const UNIT_LESSONS: Record<string, string[]> = content().unitLessons;
