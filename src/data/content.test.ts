import { describe, expect, it } from 'vitest';
import { SENTENCES, UNIT_LESSONS, UNITS, WORDS } from './course';
import { GRAMMAR, GRAMMAR_MAP } from './grammar';
import { READINGS, SONGS } from './readings';
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

  it('writing tasks point at real units', async () => {
    const { WRITING } = await import('./writing');
    const { UNITS } = await import('./course');
    for (const w of WRITING) for (const u of w.units) expect(UNITS.some((x) => x.id === u), `${w.id}: ${u}`).toBe(true);
  });

  it('DELE mock exams are well-formed', async () => {
    const { EXAMS } = await import('./exams');
    expect(EXAMS.map((e) => e.level)).toEqual(['A1', 'A2', 'B1']);
    for (const e of EXAMS) for (const m of e.modules) for (const p of m.parts) for (const it of p.items) {
      expect(it.answer, `${e.id}: ${it.q}`).toBeLessThan(it.options.length);
      if (m.id === 'hoeren') expect(!!(it.audio ?? p.audio), `${e.id}: ${it.q}`).toBe(true);
    }
  });

  it('songs have one English line per lyric line', () => {
    for (const r of SONGS) if (r.timings) {
      expect(r.timings.length, `${r.id} timings`).toBe(r.paragraphs.join('\n').split('\n').length);
      expect([...r.timings].sort((x, y) => x - y), `${r.id} timings in order`).toEqual(r.timings);
    }
    for (const r of SONGS) r.paragraphs.forEach((p, i) => expect(r.translation[i].split('\n').length, `${r.id} verse ${i + 1}`).toBe(p.split('\n').length));
  });

  it('every grammar lesson has its logic box', async () => {
    const { DEEP_ES } = await import('./grammar-deep-es');
    const lessons = (await import('./grammar')).GRAMMAR;
    for (const id of Object.keys(DEEP_ES)) expect(lessons.some((l) => l.id === id), id).toBe(true);
    for (const l of lessons) expect(l.blocks.some((b) => b.t === 'logic') || l.id.endsWith('big-picture'), `${l.id} has no logic box`).toBe(true);
  });

  it('readings are well-formed', () => {
    for (const r of [...READINGS, ...SONGS]) {
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
