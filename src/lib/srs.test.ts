import { describe, expect, it } from 'vitest';
import { recallChance, review, strength } from './srs';

const DAY = 86_400_000;

describe('FSRS scheduler', () => {
  it('first grades give increasing intervals', () => {
    const hard = review(undefined, 1, 0).interval;
    const good = review(undefined, 2, 0).interval;
    const easy = review(undefined, 3, 0).interval;
    expect(hard).toBeLessThan(good);
    expect(good).toBeLessThan(easy);
    expect(good).toBeGreaterThan(2);
  });

  it('intervals grow with each successful on-time review', () => {
    let c = review(undefined, 2, 0);
    const seen: number[] = [c.interval];
    for (let i = 0; i < 4; i++) {
      c = review(c, 2, c.due);
      seen.push(c.interval);
    }
    // Grows until it reaches the one-year cap.
    for (let i = 1; i < seen.length; i++) expect(seen[i]).toBeGreaterThanOrEqual(Math.min(365, seen[i - 1] * 1.5));
    expect(strength(c)).toBe('known');
  });

  it('forgetting drops stability and counts a lapse', () => {
    let c = review(undefined, 2, 0);
    c = review(c, 2, c.due);
    const before = c.stability!;
    c = review(c, 0, c.due);
    expect(c.stability!).toBeLessThan(before);
    expect(c.lapses).toBe(1);
    expect(c.interval).toBe(0);
    expect(strength(c)).toBe('learning');
  });

  it('converts old SM-2 cards', () => {
    const old = { ease: 2.5, interval: 10, due: 10 * DAY, reps: 3, lapses: 0, seen: 0 };
    const c = review(old, 2, 10 * DAY);
    expect(c.stability).toBeGreaterThan(10);
    expect(recallChance(old, 10 * DAY)).toBeGreaterThan(0.8);
  });
});
