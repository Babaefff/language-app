import { describe, expect, it } from 'vitest';
import { daysAway, daysInWeek, today, weekStreak } from './store';

const key = (d: Date) => today(d);
const daysAgo = (n: number, from = new Date(2026, 10, 11)) => { const d = new Date(from); d.setDate(d.getDate() - n); return d; };

describe('weekly goals and breaks', () => {
  const now = new Date(2026, 10, 11); // Wednesday 11 Nov 2026
  it('counts days since the last practice', () => {
    expect(daysAway({}, now)).toBe(0);
    expect(daysAway({ [key(now)]: 5 }, now)).toBe(0);
    expect(daysAway({ [key(daysAgo(1))]: 5 }, now)).toBe(1);
    expect(daysAway({ [key(daysAgo(5))]: 5, [key(daysAgo(9))]: 5 }, now)).toBe(5);
  });
  it('counts practice days in the Monday–Sunday week', () => {
    const xp = { [key(daysAgo(0))]: 5, [key(daysAgo(2))]: 5, [key(daysAgo(3))]: 5 }; // Wed, Mon, previous Sun
    expect(daysInWeek(xp, now)).toBe(2);
  });
  it('keeps a weekly streak while each week meets the goal', () => {
    const xp: Record<string, number> = {};
    // Last two weeks: 3 days each; this week: 1 day so far.
    for (const n of [7, 8, 9, 14, 15, 16, 0]) xp[key(daysAgo(n))] = 5;
    expect(weekStreak(xp, 3, now)).toBe(2);
    xp[key(daysAgo(1))] = 5; xp[key(daysAgo(2))] = 5; // goal met this week too
    expect(weekStreak(xp, 3, now)).toBe(3);
    expect(weekStreak(xp, 4, now)).toBe(0);
  });
});
