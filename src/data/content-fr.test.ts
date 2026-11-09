import { beforeAll, describe, expect, it, vi } from 'vitest';

// Load the app with French selected (each test file runs in its own module scope).
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
  vi.stubEnv('HABLO_LANG', 'fr');
  await (await import('./load')).loadContent();
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

describe('French course', () => {
  it('is selected', () => {
    expect(m.course.UNITS[0].id.startsWith('fr-')).toBe(true);
    expect(m.conj.PERSONS[0]).toBe("je / j'");
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
    expect(m.readings.READINGS.length).toBeGreaterThanOrEqual(12);
    for (const r of m.readings.READINGS) for (const q of r.questions) expect(q.answer, `${r.id}: ${q.q}`).toBeLessThan(q.options.length);
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

  it('every grammar question explains its answer and every example sentence has English', async () => {
    const { whyFor } = await import('./grammar-why');
    const { exampleTranslation } = await import('./grammar-translations');
    const lessons = m.grammar.GRAMMAR;
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
    for (const u of m.course.UNITS) for (const m of u.grammar.matchAll(re)) {
      if (m[0].startsWith('**') && !m[0].startsWith('***')) continue;
      const s = m[0].slice(1, -1).replace(/\*\*/g, '').trim();
      if (/[.!?]$/.test(s) && s.split(/\s+/).length >= 2) expect(exampleTranslation(s), `${u.id}: ${s}`).toBeTruthy();
    }
  });

  it('every grammar lesson has its logic box', () => {
    for (const l of m.grammar.GRAMMAR) expect(l.blocks.some((b) => b.t === 'logic') || l.id.endsWith('big-picture'), `${l.id} has no logic box`).toBe(true);
  });

  it('mock exams are well-formed, with answers in varied positions', async () => {
    const { EXAMS } = await import('./exams');
    expect(EXAMS.map((e) => e.level)).toEqual(['A1', 'A2', 'B1']);
    const positions = new Set<number>();
    for (const e of EXAMS) {
      for (const mod of e.modules) for (const p of mod.parts) {
        expect(p.items.length, `${e.id} ${p.title}`).toBeGreaterThan(0);
        for (const it of p.items) {
          expect(it.answer, `${e.id}: ${it.q}`).toBeLessThan(it.options.length);
          positions.add(it.answer);
          if (mod.id === 'hoeren') expect(!!(it.audio ?? p.audio), `${e.id}: ${it.q} has audio`).toBe(true);
        }
      }
      expect(e.writing.length).toBeGreaterThan(0);
    }
    expect(positions.size).toBeGreaterThanOrEqual(3);
  });

  it('has the Top words sets', () => {
    const core = m.course.UNITS.filter((u) => u.id.startsWith('fr-core-'));
    expect(core.length).toBe(9);
    for (const u of core) expect(u.words.length, u.id).toBe(25);
  });

  it('conjugates every verb, with elision and the -cer / -ger spellings', () => {
    for (const v of m.verbs.VERBS) for (const t of m.conj.TENSES) for (const f of m.conj.conjugate(v.inf, t.id)) expect(f ?? 'ok', `${v.inf} ${t.id}`).not.toMatch(/undefined|null/);
    const c = m.conj.conjugate;
    expect(c('manger', 'presente')[3]).toBe('mangeons');
    expect(c('commencer', 'imperfecto')).toEqual(['commençais', 'commençais', 'commençait', 'commencions', 'commenciez', 'commençaient']);
    expect(c("s'appeler", 'presente')[0]).toBe("m'appelle");
    expect(c('se lever', 'perfecto')[5]).toBe('se sont levés');
    expect(c('aller', 'perfecto')[0]).toBe('suis allé');
    expect(c('prendre', 'subjuntivo')).toEqual(['prenne', 'prennes', 'prenne', 'prenions', 'preniez', 'prennent']);
    expect(c('finir', 'presente')[3]).toBe('finissons');
    expect(c('parler', 'imperativo')).toEqual([null, 'parle', null, 'parlons', 'parlez', null]);
    expect(c('se lever', 'imperativo')[1]).toBe('lève-toi');
    expect(c('être', 'imperfecto')[0]).toBe('étais');
    expect(c('avoir', 'futuro')[0]).toBe('aurai');
    expect(m.text.checkAnswer('ecole', "l'école")).toEqual({ ok: true, accent: true, article: true });
    expect(m.text.checkAnswer("l’école", "l'école").ok).toBe(true);
    expect(m.conj.lookupForm('prennent')[0]).toMatchObject({ inf: 'prendre' });
  });

  it('never asks a typed gap the lesson did not prepare, and translates every lesson word', () => {
    for (const g of m.grammar.GRAMMAR) {
      for (const ex of m.ex.grammarExercises(g)) {
        if (ex.kind !== 'choice' || !ex.typed) continue;
        const ok = !!ex.base || m.ex.lessonText(g).includes(ex.answer.toLowerCase());
        expect(ok, `${g.id}: typed "${ex.prompt}" → ${ex.answer}`).toBe(true);
      }
      for (const v of g.practice.conj?.verbs ?? []) expect(m.verbs.VERB_MAP[v]?.en, `${g.id}: ${v}`).toBeTruthy();
      for (const w of m.ex.lessonGlossary(g)) expect(w.en, `${g.id}: ${w.word}`).toBeTruthy();
    }
  });
  it('every reading and song is readable by the end of its level', async () => {
    const r = await import('../lib/readiness');
    const units = m.course.UNITS;
    for (const x of [...m.readings.READINGS, ...m.readings.SONGS]) {
      const gate = r.readyAfter(x);
      const level = x.level === 'B1+' ? 'B1' : x.level;
      expect(gate, `${x.id}: never reaches 95% known words`).toBeTruthy();
      expect(units.indexOf(gate!), `${x.id}: ready only after ${gate!.title}`).toBeLessThanOrEqual(units.map((u) => u.level).lastIndexOf(level));
    }
  });
  it('every word of every lesson sentence can be translated (tap a tile, "show meanings")', async () => {
    const { gloss } = await import('../lib/gloss');
    const missing = new Set<string>();
    for (const u of m.course.UNITS) for (const st of [...u.sentences.map((x) => x.es), ...u.words.flatMap((w) => (w.ex ? [w.ex] : []))])
      for (const raw of st.split(/\s+/)) { const w = raw.replace(/[¿?¡!.,;:"«»—–()]/g, ''); if (w && !/\d/.test(w) && gloss(w).meaning === '—') missing.add(w); }
    expect([...missing]).toEqual([]);
  });
  it("words a lesson's sentences use beyond what it taught are listed with a meaning", async () => {
    const t = await import('../lib/taught');
    for (const u of m.course.UNITS) expect(t.sentenceWords(u).length, u.id).toBe(t.untaughtInSentences(u).length);
  });
});
