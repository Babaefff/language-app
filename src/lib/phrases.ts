import type { Phrase } from '../data/phrases/types';
import { content } from '../data/content';

const compiled = new Map<string, RegExp>();
const rx = (p: Phrase) => {
  let r = compiled.get(p.re);
  if (!r) { r = new RegExp(`(?<![\\p{L}])(?:${p.re})(?![\\p{L}])`, 'iu'); compiled.set(p.re, r); }
  return r;
};

/** Fixed expressions in a sentence, with where they are, so their words can be explained together. */
export function phrasesIn(sentence: string): (Phrase & { start: number; end: number })[] {
  const out: (Phrase & { start: number; end: number })[] = [];
  for (const p of content().phrases ?? []) {
    const m = rx(p).exec(sentence);
    if (m) out.push({ ...p, start: m.index, end: m.index + m[0].length });
  }
  return out;
}

/** The phrase a word of the sentence belongs to (by its position in the sentence), if any. */
export function phraseForWord(sentence: string, word: string): Phrase | undefined {
  const clean = word.replace(/[¿?¡!.,;:"«»—–()]/g, '').toLowerCase();
  if (!clean) return undefined;
  return phrasesIn(sentence).find((p) => {
    const part = sentence.slice(p.start, p.end).toLowerCase();
    return new RegExp(`(?<![\\p{L}])${clean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}])`, 'u').test(part);
  });
}
