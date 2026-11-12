import { describe, expect, it } from 'vitest';
import { parseProgress, today } from './store';
import { weekLine, weekSummary } from './weekly';

const wed = new Date(2026, 10, 11, 12); // Wednesday
const at = (daysAgo: number) => wed.getTime() - daysAgo * 86_400_000;
const card = (added: number | undefined, lapses = 0) => ({ interval: 3, due: at(-2), reps: 2, lapses, seen: at(0), ...(added ? { added } : {}) });

describe('weekly summary', () => {
  it('counts this Monday–Sunday week only', () => {
    const p = parseProgress({
      version: 1,
      xp: { [today(new Date(at(0)))]: 20, [today(new Date(at(2)))]: 10, [today(new Date(at(5)))]: 30 }, // Wed, Mon, last Fri
      cards: { a: card(at(1)), b: card(at(2)), c: card(at(6)), d: card(undefined, 4) },
      units: { u1: { completedAt: at(1), best: 80 }, u2: { completedAt: at(1), best: -1 } },
      learning: { mistakes: {}, attempts: [{ id: 'x', at: at(1), ok: true, delayed: false, context: false }, { id: 'y', at: at(0), ok: false, delayed: false, context: false }], practiced: [], lastPractice: {}, daily: [] },
    });
    const w = weekSummary(p, wed);
    expect(w.active).toBe(2);
    expect(w.xp).toBe(30);
    expect(w.newWords).toBe(2);
    expect(w.lessons).toBe(1); // the level-test placement doesn't count
    expect(w.accuracy).toBe(0.5);
    expect(w.danger).toBe(1);
    expect(weekLine(w)).toBe('2 days · 2 new words · 1 lesson · 1 danger word left');
  });
});
