import { describe, expect, it } from 'vitest';
import { SENTENCES, UNIT_LESSONS, UNITS, WORDS } from './course';
import { GRAMMAR, GRAMMAR_MAP } from './grammar';
import { READINGS } from './readings';
import { VERB_MAP, VERBS } from './verbs';
import { conjugate, TENSES } from '../lib/conjugate';
import { grammarExercises, stepExercises } from '../lib/exercises';

describe('course content', () => {
  it('has unique word ids', () => {
    const seen = new Map<string, string>();
    for (const w of WORDS) {
      expect(seen.has(w.id), `"${w.id}" appears in ${seen.get(w.id)} and ${w.unitId}`).toBe(false);
      seen.set(w.id, w.unitId);
    }
  });

  it('every unit has words, sentences, grammar and known verbs', () => {
    for (const u of UNITS) {
      expect(u.words.length, u.id).toBeGreaterThanOrEqual(12);
      expect(u.sentences.length, u.id).toBeGreaterThanOrEqual(4);
      expect(u.grammar.length, u.id).toBeGreaterThan(100);
      for (const v of u.conj?.verbs ?? []) expect(VERB_MAP[v], `${u.id}: ${v}`).toBeDefined();
    }
  });

  it('can generate exercises for every unit step', () => {
    for (const u of UNITS) for (const step of [0, 1, 2]) expect(stepExercises(u, step).length, `${u.id}:${step}`).toBeGreaterThan(3);
  });

  it('conjugates every verb in every tense', () => {
    for (const v of VERBS) for (const t of TENSES) expect(() => conjugate(v.inf, t.id)).not.toThrow();
  });

  it('readings are well-formed', () => {
    for (const r of READINGS) {
      expect(r.translation.length, r.id).toBe(r.paragraphs.length);
      for (const q of r.questions) expect(q.answer).toBeLessThan(q.options.length);
    }
  });

  it('grammar lessons reference real verbs and valid answers', () => {
    const ids = new Set<string>();
    for (const g of GRAMMAR) {
      expect(ids.has(g.id), g.id).toBe(false);
      ids.add(g.id);
      for (const b of g.blocks) if (b.t === 'table') for (const v of b.verbs) expect(VERB_MAP[v], `${g.id}: ${v}`).toBeDefined();
      for (const v of g.practice.conj?.verbs ?? []) expect(VERB_MAP[v], `${g.id}: ${v}`).toBeDefined();
      for (const q of g.practice.choice ?? []) expect(q.answer, `${g.id}: ${q.q}`).toBeLessThan(q.options.length);
      expect(grammarExercises(g).length, g.id).toBeGreaterThanOrEqual(5);
    }
    for (const [unit, lessons] of Object.entries(UNIT_LESSONS)) for (const l of lessons) expect(GRAMMAR_MAP[l], `${unit}: ${l}`).toBeDefined();
  });

  it('sentences end with punctuation', () => {
    for (const s of SENTENCES) expect(s.es, s.es).toMatch(/[.?!]$/);
  });
});
