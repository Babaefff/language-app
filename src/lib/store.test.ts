import { describe, expect, it } from 'vitest';
import { mergeProgress, parseProgress, shields, streak, today } from './store';

describe('mergeProgress', () => {
  it('keeps the best of both copies and never doubles XP', () => {
    const base = parseProgress({});
    const card = (seen: number, due: number) => ({ interval: 1, due, reps: seen, lapses: 0, seen });
    const phone = { ...base, cards: { hola: card(5, 10), gato: card(1, 5) }, xp: { '2026-11-01': 30 }, grammar: { g1: 80 }, units: { u1: { completedAt: 200, best: 70 } } };
    const laptop = { ...base, cards: { hola: card(2, 99), perro: card(3, 7) }, xp: { '2026-11-01': 30, '2026-11-02': 10 }, grammar: { g1: 60 }, units: { u1: { completedAt: 100, best: 90 } } };
    const m = mergeProgress(phone, laptop);
    expect(Object.keys(m.cards).sort()).toEqual(['gato', 'hola', 'perro']);
    expect(m.cards.hola.seen).toBe(5);
    expect(m.xp).toEqual({ '2026-11-01': 30, '2026-11-02': 10 });
    expect(m.grammar.g1).toBe(80);
    expect(m.units.u1).toEqual({ completedAt: 100, best: 90 });
    expect(mergeProgress(m, m)).toEqual(m);
  });
});

describe('streak shields', () => {
  const day = (n: number) => { const d = new Date(); d.setDate(d.getDate() - n); return today(d); };
  const days = (from: number, to: number) => Object.fromEntries(Array.from({ length: to - from + 1 }, (_, i) => [day(from + i), 10]));

  it('earns one shield per 7 practice days, at most 2, minus those used', () => {
    expect(shields({ xp: days(1, 6), frozen: {} })).toBe(0);
    expect(shields({ xp: days(1, 7), frozen: {} })).toBe(1);
    expect(shields({ xp: days(1, 30), frozen: {} })).toBe(2);
    expect(shields({ xp: days(1, 14), frozen: { [day(20)]: 1 } })).toBe(1);
  });

  it('counts a shielded day as part of the streak', () => {
    const xp = { ...days(0, 0), ...days(2, 10) };
    expect(streak(xp)).toBe(1);
    expect(streak(xp, { [day(1)]: 1 })).toBe(11);
  });

  it('keeps shielded days when merging devices', () => {
    const a = parseProgress({ frozen: { [day(3)]: 1 } });
    const b = parseProgress({ frozen: { [day(5)]: 1 } });
    expect(Object.keys(mergeProgress(a, b).frozen).sort()).toEqual([day(5), day(3)].sort());
  });
});

describe('backup safety and account separation', () => {
  it('rejects invalid and oversized backups without changing progress', async () => {
    const s = await import('./store');
    const before = s.exportProgress();
    for (const data of ['null', '{"version":1,"cards":null}', '{"version":1,"cards":[]}', ' '.repeat(1_000_001)]) {
      expect(() => s.importProgress(data)).toThrow();
      expect(s.exportProgress()).toBe(before);
    }
  });

  it('sanitizes nested values while retaining valid older backup fields', async () => {
    const s = await import('./store');
    s.importProgress(JSON.stringify({ version: 1, cards: { bad: null,
      old: { interval: 1, due: 12, reps: 2, lapses: 0, seen: 10, ease: 2.5 } },
      xp: { day: 'bad', good: 10 }, units: { bad: {} },
      settings: { rate: 'invalid', theme: 'bogus', autoplay: 'yes' } }));
    expect(s.getProgress().cards.old.ease).toBe(2.5);
    expect(s.getProgress().cards.bad).toBeUndefined();
    expect(s.getProgress().xp).toEqual({ good: 10 });
    expect(s.getProgress().units).toEqual({});
    expect(typeof s.getProgress().settings.rate).toBe('number');
    expect(typeof s.getProgress().settings.autoplay).toBe('boolean');
    expect(s.getProgress().settings.theme).toBe('system');
  });

  it('separates guest and account copies across sign-out, reload, and languages', async () => {
    const s = await import('./store');
    const memory = new Map<string, string>();
    const previous = globalThis.localStorage;
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
      getItem: (k: string) => memory.get(k) ?? null,
      setItem: (k: string, v: string) => memory.set(k, v),
    } });
    try {
      s.selectProgressAccount(null);
      s.resetProgress(); s.addXp(5);
      s.selectProgressAccount('alice');
      expect(s.getProgress().xp).toEqual({});
      s.addXp(20);
      memory.set(s.progressKeyFor('de'), JSON.stringify({ xp: { day: 99 } }));
      s.selectProgressAccount(null);
      expect(Object.values(s.getProgress().xp)).toEqual([5]);
      expect(s.readProgressFor('de').xp).toEqual({});
      s.selectProgressAccount('bob');
      expect(s.getProgress().xp).toEqual({});
      s.importGuestProgress();
      expect(Object.values(s.getProgress().xp)).toEqual([5]);
      s.selectProgressAccount('alice');
      expect(Object.values(s.getProgress().xp)).toEqual([20]);
      expect(s.readProgressFor('de').xp).toEqual({ day: 99 });
    } finally {
      s.selectProgressAccount(null);
      Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: previous });
    }
  });
});
