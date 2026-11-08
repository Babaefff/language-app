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
