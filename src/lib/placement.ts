import { content } from '../data/content';
import type { Level, Unit } from '../data/types';
import { shuffle } from './text';

/**
 * Level test for newcomers. The course is cut into checkpoints (each level in three parts). Each
 * checkpoint asks 4 questions about the words and sentences of its lessons; 3 right moves on to the
 * next one, fewer stops the test, and the learner starts at the first lesson of that checkpoint.
 * Four options plus "I don't know" keep lucky guesses from placing anyone too high
 * (guessing 3 of 4 right happens about 5% of the time).
 */
export interface Checkpoint { level: Level; part: number; units: Unit[] }
export interface PlacementQuestion { kind: 'meaning' | 'say' | 'sentence'; prompt: string; options: string[]; answer: number; /** Text to read aloud (the foreign one). */ audio?: string }

export const PER_CHECKPOINT = 4;
export const PASS = 3;

export function checkpoints(units: Unit[] = content().units): Checkpoint[] {
  const out: Checkpoint[] = [];
  for (const level of [...new Set(units.map((u) => u.level))]) {
    const us = units.filter((u) => u.level === level);
    const size = Math.ceil(us.length / 3);
    for (let part = 0; part < 3 && part * size < us.length; part++) out.push({ level, part, units: us.slice(part * size, (part + 1) * size) });
  }
  return out;
}

const uniq = <T,>(xs: T[], key: (x: T) => string) => { const seen = new Set<string>(); return xs.filter((x) => { const k = key(x).toLowerCase(); return !seen.has(k) && !!seen.add(k); }); };
/** Correct answer plus 3 wrong ones from the same pool, shuffled. */
function options(right: string, pool: string[]): { options: string[]; answer: number } {
  const wrong = shuffle(uniq(pool.filter((x) => x.toLowerCase() !== right.toLowerCase()), (x) => x)).slice(0, 3);
  const opts = shuffle([right, ...wrong]);
  return { options: opts, answer: opts.indexOf(right) };
}

/** 4 questions about one checkpoint: words at first, more sentences higher up (they test grammar too). */
export function questionsFor(c: Checkpoint, index: number): PlacementQuestion[] {
  const words = uniq(c.units.flatMap((u) => u.words).filter((w) => w.es && w.en && w.es.length < 40), (w) => w.en);
  const sentences = uniq(c.units.flatMap((u) => u.sentences).filter((s) => s.es && s.en), (s) => s.en);
  const nSent = Math.min(sentences.length, index === 0 ? 1 : index < 3 ? 2 : 3);
  const qs: PlacementQuestion[] = [];
  for (const s of shuffle(sentences).slice(0, nSent)) {
    qs.push({ kind: 'sentence', prompt: s.es, audio: s.es, ...options(s.en, sentences.map((x) => x.en)) });
  }
  const ws = shuffle(words).slice(0, PER_CHECKPOINT - qs.length);
  ws.forEach((w, i) => {
    qs.push(i % 2 === 0
      ? { kind: 'meaning', prompt: w.es, audio: w.es, ...options(w.en, words.map((x) => x.en)) }
      : { kind: 'say', prompt: w.en, ...options(w.es, words.map((x) => x.es)) });
  });
  return shuffle(qs);
}

/** Where to start after the test: the first lesson of the first checkpoint not passed. */
export function startUnit(passed: number, cps: Checkpoint[] = checkpoints()): Unit | null {
  return passed >= cps.length ? null : cps[passed].units[0];
}

/**
 * After `asked` of `n` questions with `right` correct: 3 of 4 passes; exactly 2 of 4 is unclear,
 * so 2 more questions follow ('extend') and 4 of 6 passes.
 */
export function decide(n: number, asked: number, right: number): 'pass' | 'fail' | 'extend' | 'continue' {
  const need = n > PER_CHECKPOINT ? PASS + 1 : PASS;
  if (right >= need) return 'pass';
  const reachable = n === PER_CHECKPOINT ? PASS - 1 : need;
  if (right + (n - asked) < reachable) return 'fail';
  if (asked === n) return n === PER_CHECKPOINT ? 'extend' : 'fail';
  return 'continue';
}
