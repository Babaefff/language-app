import { describe, expect, it } from 'vitest';
import { loadContent } from '../data/load';
import { content } from '../data/content';
import { PER_CHECKPOINT, checkpoints, decide, questionsFor } from './placement';

/** Runs the test the way the welcome screen does: 3 of 4 right moves on, else stop. */
function run(cps: ReturnType<typeof checkpoints>, answerer: (q: ReturnType<typeof questionsFor>[number]) => boolean) {
  for (let i = 0; i < cps.length; i++) {
    let qs = questionsFor(cps[i], i);
    let right = 0;
    for (let k = 0; ; k++) {
      right += answerer(qs[k]) ? 1 : 0;
      const d = decide(qs.length, k + 1, right);
      if (d === 'pass') break;
      if (d === 'fail') return i;
      if (d === 'extend') qs = [...qs, ...questionsFor(cps[i], i).slice(0, 2)];
    }
  }
  return cps.length;
}

describe.each(['es', 'de', 'fr', 'ru'] as const)('level test (%s)', (lang) => {
  it('asks sound questions at every checkpoint', async () => {
    await loadContent(lang);
    const cps = checkpoints(content().units);
    expect(cps.length).toBe(9);
    cps.forEach((c, i) => {
      for (let n = 0; n < 5; n++) {
        const qs = questionsFor(c, i);
        expect(qs).toHaveLength(PER_CHECKPOINT);
        for (const q of qs) {
          expect(q.options).toHaveLength(4);
          expect(new Set(q.options.map((o) => o.toLowerCase())).size).toBe(4);
          expect(q.answer).toBeGreaterThanOrEqual(0);
        }
      }
    });
  });
  it('places someone who knows everything at the end, and guessers low', async () => {
    await loadContent(lang);
    const cps = checkpoints(content().units);
    expect(run(cps, () => true)).toBe(cps.length);
    expect(run(cps, () => false)).toBe(0);
    // Random guessing (no "I don't know"): rarely gets past the first checkpoints.
    const places = Array.from({ length: 400 }, () => run(cps, (q) => Math.floor(Math.random() * 4) === q.answer));
    expect(places.filter((p) => p >= 2).length / places.length).toBeLessThan(0.02);
  });
});

describe('level test rule', () => {
  it('passes 3 of 4, asks 2 more on 2 of 4, passes 4 of 6', () => {
    expect(decide(4, 3, 3)).toBe('pass');
    expect(decide(4, 3, 0)).toBe('fail');
    expect(decide(4, 4, 2)).toBe('extend');
    expect(decide(4, 4, 1)).toBe('fail');
    expect(decide(6, 6, 3)).toBe('fail');
    expect(decide(6, 5, 4)).toBe('pass');
    expect(decide(4, 1, 1)).toBe('continue');
  });
});
