/**
 * Generates every exercise of the loaded course (every lesson step and grammar lesson) and
 * reports anything that would be unfair or confusing to a learner. Used by the content tests
 * of each language; the result must be empty.
 */
export async function auditExercises(rounds = 1): Promise<string[]> {
  const { UNITS, lookupWord } = await import('../data/course');
  const { GRAMMAR } = await import('../data/grammar');
  const ex = await import('../lib/exercises');
  const { checkAnswer, normalize } = await import('../lib/text');
  const { lookupForm } = await import('../lib/conjugate');
  const isWord = (w: string) => !!lookupWord(w, false) || lookupForm(w).length > 0;
  const ok = (typed: string, expected: string) => checkAnswer(typed, expected, false, { isWord }).ok;
  const issues = new Set<string>();
  for (let r = 0; r < rounds; r++) {
    const all = [
      ...UNITS.flatMap((u) => [0, 1, 2].flatMap((s) => ex.stepExercises(u, s, []).map((e) => ({ e, src: u.id })))),
      ...GRAMMAR.flatMap((g) => ex.grammarExercises(g).map((e) => ({ e, src: g.id }))),
    ];
    for (const { e, src } of all) {
      if (e.kind === 'type' || e.kind === 'conj' || e.kind === 'listen' || (e.kind === 'choice' && e.typed)) {
        if (!ok(e.answer, e.answer)) issues.add(`${src}: the answer typed exactly is rejected: ${e.answer}`);
        for (const a of ('accept' in e && e.accept) || []) if (!ok(a, a)) issues.add(`${src}: an accepted synonym is rejected: ${a}`);
      }
      if (e.kind === 'choice') {
        const norm = e.options.map((o) => normalize(o));
        if (new Set(norm).size !== norm.length) issues.add(`${src}: two options look the same: ${e.options.join(' | ')}`);
        // Picking by meaning: a "wrong" English option must not mean the same as the answer.
        if (!e.optionsSpanish) for (const o of e.options) if (o !== e.answer && normalize(o) === normalize(e.answer)) issues.add(`${src}: option = answer: ${o}`);
        // Choosing a word: a "wrong" option must not be the answer in another spelling.
        if (e.optionsSpanish && !e.promptSpanish) for (const o of e.options) if (o !== e.answer && ok(o, e.answer)) issues.add(`${src}: a wrong option is also right: ${o} for ${e.answer}`);
      }
      if (e.kind === 'match') {
        const es = e.pairs.map((p) => normalize(p.es));
        if (new Set(es).size !== es.length) issues.add(`${src}: the same word twice in a match`);
      }
      if (e.kind === 'build') {
        const toks = e.es.split(' ');
        const extras = [...e.tiles];
        for (const t of toks) extras.splice(extras.indexOf(t), 1);
        for (const x of extras) if (toks.some((t) => normalize(t) === normalize(x))) issues.add(`${src}: an extra tile looks like a sentence word: ${x}`);
      }
    }
  }
  return [...issues];
}
