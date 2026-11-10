import { describe, expect, it } from 'vitest';
import { VERB_MAP, VERBS } from './verbs';
import { conjugate, TENSES } from '../lib/conjugate';
import { loadContent } from './load';

// The course is loaded on demand (one language per download), so load it before using it.
await loadContent('es');
const { SENTENCES, UNIT_LESSONS, UNITS, WORDS } = await import('./course');
const { GRAMMAR, GRAMMAR_MAP } = await import('./grammar');
const { READINGS, SONGS } = await import('./readings');
const { grammarExercises, lessonGlossary, lessonText, stepExercises } = await import('../lib/exercises');

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

  it('every grammar question explains its answer and every example sentence has English', async () => {
    const { whyFor } = await import('./grammar-why');
    const { exampleTranslation } = await import('./grammar-translations');
    const lessons = (await import('./grammar')).GRAMMAR;
    for (const l of lessons) for (const q of l.practice.choice ?? []) expect(whyFor(q.q, q.options[q.answer]), `${l.id}: ${q.q}`).toBeTruthy();
    const re = /(\*\*[^*]+\*\*|\*(?:\*\*[^*]+\*\*|[^*])+\*)/g;
    for (const l of lessons) for (const b of l.blocks) if (b.t === 'text' || b.t === 'tip' || b.t === 'logic') for (const m of b.md.matchAll(re)) {
      if (m[0].startsWith('**') && !m[0].startsWith('***')) continue;
      const s = m[0].slice(1, -1).replace(/\*\*/g, '').trim();
      if (/[.!?]$/.test(s) && s.split(/\s+/).length >= 2) expect(exampleTranslation(s), `${l.id}: ${s}`).toBeTruthy();
    }
  });

  it('every example sentence in the unit grammar notes has English', async () => {
    const { exampleTranslation } = await import('./grammar-translations');
    const re = /(\*\*[^*]+\*\*|\*(?:\*\*[^*]+\*\*|[^*])+\*)/g;
    for (const u of UNITS) for (const m of u.grammar.matchAll(re)) {
      if (m[0].startsWith('**') && !m[0].startsWith('***')) continue;
      const s = m[0].slice(1, -1).replace(/\*\*/g, '').trim();
      if (/[.!?]$/.test(s) && s.split(/\s+/).length >= 2) expect(exampleTranslation(s), `${u.id}: ${s}`).toBeTruthy();
    }
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
  it('never asks a typed gap the lesson did not prepare, and translates every lesson word', () => {
    for (const g of GRAMMAR) {
      for (const ex of grammarExercises(g)) {
        if (ex.kind !== 'choice' || !ex.typed) continue;
        const ok = !!ex.base || lessonText(g).includes(ex.answer.toLowerCase());
        expect(ok, `${g.id}: typed "${ex.prompt}" → ${ex.answer}`).toBe(true);
      }
      for (const v of g.practice.conj?.verbs ?? []) expect(VERB_MAP[v]?.en, `${g.id}: ${v}`).toBeTruthy();
      for (const w of lessonGlossary(g)) expect(w.en, `${g.id}: ${w.word}`).toBeTruthy();
    }
  });
  it('every reading and song is readable by the end of its level', async () => {
    const r = await import('../lib/readiness');
    for (const x of [...READINGS, ...SONGS]) {
      const gate = r.readyAfter(x);
      const level = x.level === 'B1+' ? 'B1' : x.level;
      expect(gate, `${x.id}: never reaches 95% known words`).toBeTruthy();
      expect(UNITS.indexOf(gate!), `${x.id}: ready only after ${gate!.title}`).toBeLessThanOrEqual(UNITS.map((u) => u.level).lastIndexOf(level));
    }
  });
  it('every word of every lesson sentence can be translated (tap a tile, "show meanings")', async () => {
    const { gloss } = await import('../lib/gloss');
    const missing = new Set<string>();
    for (const u of UNITS) for (const st of [...u.sentences.map((x) => x.es), ...u.words.flatMap((w) => (w.ex ? [w.ex] : []))])
      for (const raw of st.split(/\s+/)) { const w = raw.replace(/[¿?¡!.,;:"«»—–()]/g, ''); if (w && !/\d/.test(w) && gloss(w).meaning === '—') missing.add(w); }
    expect([...missing]).toEqual([]);
  });
  it("words a lesson's sentences use beyond what it taught are listed with a meaning", async () => {
    const t = await import('../lib/taught');
    for (const u of UNITS) expect(t.sentenceWords(u).length, u.id).toBe(t.untaughtInSentences(u).length);
  });
  it('every generated exercise is fair: answers accepted, no wrong option that is also right, no look-alike tiles', async () => {
    const { auditExercises } = await import('../test/exercise-audit');
    expect(await auditExercises()).toEqual([]);
  }, 60000);
  it('explains words by their parts, every part with a meaning', async () => {
    const { breakdown } = await import('../lib/breakdown');
    for (const w of WORDS) {
      const b = breakdown(w);
      if (b) for (const p of b.parts) expect(p.text && p.en, `${w.es}: ${p.text}`).toBeTruthy();
    }
    expect(breakdown({ es: 'el tenedor', en: 'the fork' })?.parts.map((p) => p.text).join(' + ')).toBe('tene + -dor');
  });
});
