import { describe, expect, it } from 'vitest';
import { review, strength } from './srs';

describe('srs', () => {
  it('grows intervals on success and resets on failure', () => {
    let c = review(undefined, 2, 0);
    expect(c.interval).toBe(1);
    c = review(c, 2, 0);
    expect(c.interval).toBe(3);
    c = review(c, 2, 0);
    expect(c.interval).toBeCloseTo(7.5);
    expect(strength(c)).toBe('familiar');
    c = review(c, 0, 0);
    expect(c.interval).toBe(0);
    expect(c.lapses).toBe(1);
    expect(strength(c)).toBe('learning');
  });
});
