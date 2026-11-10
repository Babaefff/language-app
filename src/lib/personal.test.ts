import { beforeAll, describe, expect, it, vi } from 'vitest';
import type { PersonalSet } from './personal';

let P: typeof import('./personal');
beforeAll(async () => {
  vi.stubEnv('HABLO_LANG', 'de');
  await (await import('../data/load')).loadContent();
  P = await import('./personal');
});

const sample = {
  title: 'Worksheets', lang: 'de',
  lessons: [{ id: 'family', title: 'Family', words: [['die Mutter', 'the mother'], ['der Vater', 'the father'], ['die Schwester', 'the sister'], ['der Bruder', 'the brother']], sentences: [['Das ist meine Mutter.', 'This is my mother.']] }],
  tests: [{ id: 't1', title: 'Family test', questions: [
    { type: 'choice', q: 'Das ist ___ Mutter.', options: ['mein', 'meine'], answer: 1, why: 'Mutter is feminine.' },
    { type: 'type', q: 'the father', answer: 'der Vater' },
    { type: 'build', q: 'This is my mother.', answer: 'Das ist meine Mutter.' },
  ] }],
};

describe('personal material', () => {
  it('accepts a valid file and explains a broken one', () => {
    expect(P.validateContent(sample).ok).toBe(true);
    const bad = P.validateContent({ ...sample, tests: [{ id: 'x', title: 'X', questions: [{ type: 'choice', q: '?', options: ['a'], answer: 3 }] }] });
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.error).toMatch(/question 1/);
    expect(P.validateContent({ title: 'x', lang: 'it', lessons: [] }).ok).toBe(false);
  });
  it('turns lessons and tests into normal exercises', () => {
    const v = P.validateContent(sample);
    if (!v.ok) throw new Error(v.error);
    const set: PersonalSet = { id: '12345678-aaaa', lang: 'de', title: v.title, content: v.content, tabName: 'Mu kalli jaoks' };
    const u = P.lessonUnit(set, v.content.lessons[0]);
    expect(u.words.length).toBe(4);
    const ex = P.testExercises(v.content.tests[0]);
    expect(ex.map((e) => e.kind)).toEqual(['choice', 'type', 'build']);
  });
});
