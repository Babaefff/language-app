import { describe, expect, it } from 'vitest';
import { mergeProgress, parseProgress } from './store';

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
