import { beforeAll, describe, expect, it, vi } from 'vitest';

// Load the app with German selected (each test file runs in its own module scope).
type Mods = {
  course: typeof import('./course');
  grammar: typeof import('./grammar');
  readings: typeof import('./readings');
  verbs: typeof import('./verbs');
  conj: typeof import('../lib/conjugate');
  ex: typeof import('../lib/exercises');
  text: typeof import('../lib/text');
};
let m: Mods;

beforeAll(async () => {
  vi.stubEnv('HABLO_LANG', 'de');
  m = {
    course: await import('./course'),
    grammar: await import('./grammar'),
    readings: await import('./readings'),
    verbs: await import('./verbs'),
    conj: await import('../lib/conjugate'),
    ex: await import('../lib/exercises'),
    text: await import('../lib/text'),
  };
});

describe('German course', () => {
  it('is selected', () => {
    expect(m.course.UNITS[0].id.startsWith('de-')).toBe(true);
    expect(m.conj.PERSONS[0]).toBe('ich');
  });

  it('has unique words and well-formed units', () => {
    const seen = new Map<string, string>();
    for (const w of m.course.WORDS) {
      expect(seen.has(w.id), `"${w.id}" in ${seen.get(w.id)} and ${w.unitId}`).toBe(false);
      seen.set(w.id, w.unitId);
    }
    for (const u of m.course.UNITS) {
      expect(u.words.length, u.id).toBeGreaterThanOrEqual(12);
      expect(u.sentences.length, u.id).toBeGreaterThanOrEqual(4);
      for (const v of u.conj?.verbs ?? []) expect(m.verbs.VERB_MAP[v], `${u.id}: ${v}`).toBeDefined();
      for (const step of [0, 1, 2]) expect(m.ex.stepExercises(u, step).length).toBeGreaterThan(3);
    }
  });

  it('grammar lessons and readings are valid', () => {
    for (const g of m.grammar.GRAMMAR) {
      for (const b of g.blocks) if (b.t === 'table') for (const v of b.verbs) expect(m.verbs.VERB_MAP[v], `${g.id}: ${v}`).toBeDefined();
      for (const v of g.practice.conj?.verbs ?? []) expect(m.verbs.VERB_MAP[v], `${g.id}: ${v}`).toBeDefined();
      expect(m.ex.grammarExercises(g).length, g.id).toBeGreaterThanOrEqual(4);
    }
    for (const [u, ls] of Object.entries(m.course.UNIT_LESSONS)) for (const l of ls) expect(m.grammar.GRAMMAR_MAP[l], `${u}: ${l}`).toBeDefined();
    for (const r of [...m.readings.READINGS, ...m.readings.SONGS]) expect(r.translation.length, r.id).toBe(r.paragraphs.length);
    expect(m.readings.SONGS.length).toBeGreaterThanOrEqual(5);
    for (const r of m.readings.SONGS) if (r.timings) {
      expect(r.timings.length, `${r.id} timings`).toBe(r.paragraphs.join('\n').split('\n').length);
      expect([...r.timings].sort((x, y) => x - y), `${r.id} timings in order`).toEqual(r.timings);
    }
    for (const r of m.readings.SONGS) r.paragraphs.forEach((p, i) => expect(r.translation[i].split('\n').length, `${r.id} verse ${i + 1}`).toBe(p.split('\n').length));
  });

  it('writing tasks point at real units', async () => {
    const { WRITING } = await import('./writing');
    expect(WRITING.length).toBeGreaterThanOrEqual(6);
    for (const w of WRITING) for (const u of w.units) expect(m.course.UNITS.some((x) => x.id === u), `${w.id}: ${u}`).toBe(true);
  });

  it('mock exams are well-formed', async () => {
    const { EXAMS } = await import('./exams');
    expect(EXAMS.map((e) => e.level)).toEqual(['A1', 'A2', 'B1']);
    for (const e of EXAMS) {
      for (const m of e.modules) for (const p of m.parts) {
        expect(p.items.length, `${e.id} ${p.title}`).toBeGreaterThan(0);
        for (const it of p.items) {
          expect(it.answer, `${e.id}: ${it.q}`).toBeLessThan(it.options.length);
          if (m.id === 'hoeren') expect(!!(it.audio ?? p.audio), `${e.id}: ${it.q} has audio`).toBe(true);
        }
      }
      expect(e.writing.length).toBeGreaterThan(0);
    }
  });

  it('conjugates every verb and accepts ss for ß', () => {
    for (const v of m.verbs.VERBS) for (const t of m.conj.TENSES) expect(() => m.conj.conjugate(v.inf, t.id)).not.toThrow();
    expect(m.text.checkAnswer('weiss', 'weiß').ok).toBe(true);
    expect(m.text.checkAnswer('Hund', 'der Hund')).toEqual({ ok: true, article: true });
    expect(m.text.checkAnswer('hund', 'der Hund')).toEqual({ ok: true, letterCase: true, article: true });
    expect(m.text.checkAnswer('das Maedchen', 'das Mädchen')).toEqual({ ok: true, accent: true });
    expect(m.text.checkAnswer('Strasse', 'die Straße', true)).toEqual({ ok: false, accent: true, article: true });
    expect(m.text.checkAnswer('Wie geht es ihnen', 'Wie geht es Ihnen?', true).ok).toBe(false);
    expect([...m.text.wrongWords('das haus ist gross', 'Das Haus ist groß.')]).toEqual([1, 3]);
    expect(m.conj.lookupForm('fährt')[0]).toMatchObject({ inf: 'fahren' });
  });
});
