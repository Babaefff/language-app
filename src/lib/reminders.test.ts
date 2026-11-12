import { beforeEach, describe, expect, it } from 'vitest';

// Tests run in Node: a tiny in-memory localStorage.
const mem = new Map<string, string>();
globalThis.localStorage ??= { getItem: (k: string) => mem.get(k) ?? null, setItem: (k: string, v: string) => void mem.set(k, v), removeItem: (k: string) => void mem.delete(k), clear: () => mem.clear(), key: () => null, length: 0 } as Storage;
import { getProgress, replaceProgress, today, updateSettings } from './store';
import { planReminders, setDrillLeft } from './reminders';

const now = new Date(2026, 10, 11, 9, 0); // 9:00
const day = 86_400_000;
const card = (due: number) => ({ interval: 1, due, reps: 1, lapses: 0, seen: 1 });

describe('daily reminders', () => {
  beforeEach(() => {
    localStorage.clear();
    const p = getProgress();
    replaceProgress({ ...p, xp: {}, cards: {} });
    updateSettings({ planTime: '20:00', planCue: 'After dinner', planMinutes: 10 });
  });
  it('plans 7 days with the words due by each reminder', () => {
    const p = getProgress();
    replaceProgress({ ...p, cards: { a: card(now.getTime()), b: card(now.getTime() + day), c: card(now.getTime() + day) } });
    const plan = planReminders(now);
    expect(plan).toHaveLength(7);
    expect(plan[0].title).toContain('1 word waiting');
    expect(plan[1].title).toContain('3 words waiting');
    expect(plan[0].route).toBe('/review');
  });
  it('skips today once practised, and is off without a plan', () => {
    const p = getProgress();
    replaceProgress({ ...p, xp: { [today(now)]: 10 } });
    expect(planReminders(now)).toHaveLength(6);
    updateSettings({ planTime: '' });
    expect(planReminders(now)).toHaveLength(0);
  });
  it('points to the word drill when no words are due', () => {
    setDrillLeft(37);
    const plan = planReminders(now);
    expect(plan[0].title).toContain('37 words in your word drill');
    expect(plan[0].route).toBe('/mine');
  });
});
