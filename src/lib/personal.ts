import { useEffect, useSyncExternalStore } from 'react';
import type { Level, Unit } from '../data/types';
import { units, type WordRow, type SentenceRow } from '../data/build';
import { build, type Exercise } from './exercises';
import { shuffle } from './text';
import { supabase, accountsEnabled } from './sync';
import { L } from '../data/lang';

/**
 * Personal material: lessons and tests made for one learner (e.g. from their own worksheets).
 * It lives in the database, never in the app code, so only that learner and admins can read it.
 */
export interface PersonalLesson {
  id: string;
  title: string;
  /** Title in the language being learned. */
  titleDe?: string;
  emoji?: string;
  level?: Level;
  description?: string;
  /** [German, English, example?, example in English?] */
  words: WordRow[];
  /** [German, English] */
  sentences?: SentenceRow[];
  /** Explanation in the app's note format (## heading, **bold**, *example*, tables). */
  notes?: string;
}
export type PersonalQuestion =
  | { type: 'choice'; q: string; options: string[]; answer: number; en?: string; why?: string }
  | { type: 'type'; q: string; answer: string; accept?: string[]; why?: string }
  | { type: 'build'; q: string; answer: string };
/** exam: a mock exam with a time limit (minutes) and a pass mark (percent); questions come in random order. */
export interface PersonalTest { id: string; title: string; lesson?: string; exam?: { minutes: number; pass: number }; questions: PersonalQuestion[] }
/** Another language for the English texts: English text → translation, plus whole lesson notes by lesson id. */
export interface PersonalI18n { strings: Record<string, string>; notes?: Record<string, string> }
export interface PersonalContent { lessons: PersonalLesson[]; tests: PersonalTest[]; i18n?: Record<string, PersonalI18n> }
export interface PersonalSet { id: string; lang: string; title: string; content: PersonalContent; tabName: string }
export interface PersonalResult { id: string; user_id: string; set_id: string; test_id: string; score: number; total: number; answers: TestAnswer[]; seconds?: number | null; created_at: string }
export interface TestAnswer { q: string; expected: string; given: string; ok: boolean }

/** Checks an uploaded file and says exactly what's wrong, so the admin can fix it. */
export function validateContent(v: unknown): { ok: true; title: string; lang: string; content: PersonalContent } | { ok: false; error: string } {
  const o = v as Record<string, unknown>;
  if (!o || typeof o !== 'object') return { ok: false, error: 'The file is not a JSON object.' };
  if (typeof o.title !== 'string' || !o.title) return { ok: false, error: 'Missing "title".' };
  if (!['es', 'de', 'fr', 'ru'].includes(o.lang as string)) return { ok: false, error: '"lang" must be es, de, fr or ru.' };
  const lessons = Array.isArray(o.lessons) ? o.lessons : [];
  const tests = Array.isArray(o.tests) ? o.tests : [];
  if (!lessons.length && !tests.length) return { ok: false, error: 'No "lessons" and no "tests".' };
  for (const [i, l] of lessons.entries()) {
    if (!l?.id || !l?.title || !Array.isArray(l.words)) return { ok: false, error: `Lesson ${i + 1}: needs "id", "title" and "words".` };
    for (const w of l.words) if (!Array.isArray(w) || typeof w[0] !== 'string' || typeof w[1] !== 'string') return { ok: false, error: `Lesson "${l.title}": every word must be ["word in the language", "English", …].` };
  }
  for (const [i, t] of tests.entries()) {
    if (!t?.id || !t?.title || !Array.isArray(t.questions) || !t.questions.length) return { ok: false, error: `Test ${i + 1}: needs "id", "title" and "questions".` };
    if (t.exam && !(t.exam.minutes >= 1 && t.exam.minutes <= 180 && t.exam.pass >= 1 && t.exam.pass <= 100)) return { ok: false, error: `Test "${t.title}": "exam" needs "minutes" (1–180) and "pass" (1–100, percent).` };
    for (const [j, q] of t.questions.entries()) {
      const where = `Test "${t.title}", question ${j + 1}`;
      if (q?.type === 'choice' && (!Array.isArray(q.options) || typeof q.answer !== 'number' || !q.options[q.answer])) return { ok: false, error: `${where}: "answer" must be the number of the right option (0 = first).` };
      if ((q?.type === 'type' || q?.type === 'build') && typeof q.answer !== 'string') return { ok: false, error: `${where}: "answer" must be the answer text.` };
      if (!['choice', 'type', 'build'].includes(q?.type)) return { ok: false, error: `${where}: "type" must be choice, type or build.` };
    }
  }
  const i18n = o.i18n && typeof o.i18n === 'object' ? (o.i18n as PersonalContent['i18n']) : undefined;
  return { ok: true, title: o.title, lang: o.lang as string, content: { lessons, tests, ...(i18n ? { i18n } : {}) } as PersonalContent };
}

/** A personal lesson as an app lesson, so it is taught exactly like the course (cards, practice, sentences). */
export function lessonUnit(set: PersonalSet, l: PersonalLesson): Unit {
  return units(l.level ?? 'A1', [{
    id: `p-${set.id.slice(0, 8)}-${l.id}`, title: l.title, titleEs: l.titleDe ?? l.title, emoji: l.emoji ?? '⭐',
    description: l.description ?? '', words: l.words, sentences: l.sentences ?? [], grammar: l.notes ?? '',
  }])[0];
}

/** A test as exercises: multiple choice, typing (English → German) and sentence building. */
export function testExercises(t: PersonalTest): Exercise[] {
  return (t.exam ? shuffle(t.questions) : t.questions).map((q, i): Exercise => {
    const key = `ptest-${t.id}-${i}`;
    if (q.type === 'choice') {
      const gap = q.q.includes('___');
      return { kind: 'choice', key, label: gap ? 'Choose the right word' : 'Choose the answer', prompt: q.q, hint: q.en, options: shuffle(q.options), answer: q.options[q.answer], optionsSpanish: gap, promptSpanish: gap, why: q.why };
    }
    if (q.type === 'type') return { kind: 'type', key, label: `Write in ${L.name}`, prompt: q.q, answer: q.answer, accept: q.accept, why: q.why };
    return { ...build({ es: q.answer, en: q.q }), key };
  });
}

// ---- Loading (cached per sign-in) --------------------------------------------------------
let sets: PersonalSet[] | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export async function loadPersonal(): Promise<PersonalSet[]> {
  if (!accountsEnabled) return (sets = []);
  const sb = await supabase();
  const { data: u } = await sb.auth.getUser();
  if (!u.user) { sets = []; emit(); return sets; }
  const { data: access } = await sb.from('personal_access').select('set_id, tab_name').eq('user_id', u.user.id);
  const ids = (access ?? []).map((a) => a.set_id as string);
  if (!ids.length) { sets = []; emit(); return sets; }
  const { data } = await sb.from('personal_sets').select('id, lang, title, content').in('id', ids);
  sets = (data ?? []).map((s) => ({ ...(s as Omit<PersonalSet, 'tabName'>), tabName: (access ?? []).find((a) => a.set_id === s.id)?.tab_name ?? 'Mu kalli jaoks' }));
  emit();
  return sets;
}
export function clearPersonal() { sets = null; emit(); }
/** The learner's personal sets (empty for everyone else). Reloads when the account changes. */
export function usePersonal(userId: string | undefined): PersonalSet[] | null {
  const v = useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => sets);
  useEffect(() => { if (userId) void loadPersonal(); else { sets = []; emit(); } }, [userId]);
  return v;
}

export async function saveResult(setId: string, testId: string, score: number, total: number, answers: TestAnswer[], seconds?: number) {
  const sb = await supabase();
  const { data: u } = await sb.auth.getUser();
  if (!u.user) throw new Error('Sign in to save your result.');
  const { error } = await sb.from('personal_results').insert({ user_id: u.user.id, set_id: setId, test_id: testId, score, total, answers, ...(seconds != null ? { seconds } : {}) });
  if (error) throw new Error(error.message);
}
export async function myResults(): Promise<PersonalResult[]> {
  const sb = await supabase();
  const { data: u } = await sb.auth.getUser();
  if (!u.user) return [];
  const { data } = await sb.from('personal_results').select('*').eq('user_id', u.user.id).order('created_at', { ascending: false }).limit(1000);
  return (data ?? []) as PersonalResult[];
}

// ---- Admin -------------------------------------------------------------------------------
export async function adminSets() {
  const sb = await supabase();
  const [{ data: s }, { data: o }, { data: r }] = await Promise.all([
    sb.from('personal_sets').select('id, lang, title, content, created_at').order('created_at', { ascending: false }),
    sb.rpc('personal_overview'),
    sb.from('personal_results').select('*').order('created_at', { ascending: false }).limit(500),
  ]);
  return {
    sets: (s ?? []) as (Omit<PersonalSet, 'tabName'> & { created_at: string })[],
    access: (o ?? []) as { set_id: string; user_id: string; email: string; tab_name: string }[],
    results: (r ?? []) as PersonalResult[],
  };
}
export async function uploadSet(title: string, lang: string, content: PersonalContent) {
  const sb = await supabase();
  const { error } = await sb.from('personal_sets').insert({ title, lang, content });
  if (error) throw new Error(error.message);
}
export async function replaceSet(id: string, title: string, content: PersonalContent) {
  const sb = await supabase();
  const { error } = await sb.from('personal_sets').update({ title, content }).eq('id', id);
  if (error) throw new Error(error.message);
}
export async function deleteSet(id: string) {
  const sb = await supabase();
  const { error } = await sb.from('personal_sets').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
export async function assignSet(setId: string, email: string, tab: string) {
  const sb = await supabase();
  const { error } = await sb.rpc('personal_assign', { set_uuid: setId, learner_email: email, tab });
  if (error) throw new Error(error.message);
}
export async function unassign(setId: string, userId: string) {
  const sb = await supabase();
  const { error } = await sb.from('personal_access').delete().eq('set_id', setId).eq('user_id', userId);
  if (error) throw new Error(error.message);
}

/** A fresh mixed test each time: questions from all tests of the set, plus words from every lesson (English → German). */
export const MIXED_ID = 'mixed';
export function mixedTest(c: PersonalContent, size = 20): PersonalTest {
  const fromTests = shuffle(c.tests.flatMap((t) => t.questions)).slice(0, Math.ceil(size * 0.7));
  const words = shuffle(c.lessons.flatMap((l) => l.words)).slice(0, size - fromTests.length)
    .map(([de, en]): PersonalQuestion => ({ type: 'type', q: en, answer: de, accept: /^(der|die|das) /.test(de) ? [de.replace(/^(der|die|das) /, '')] : undefined }));
  return { id: MIXED_ID, title: 'Mixed test', questions: shuffle([...fromTests, ...words]) };
}

/** "12:05" */
export const clock = (sec: number) => `${Math.floor(sec / 60)}:${String(Math.max(0, sec) % 60).padStart(2, '0')}`;

/** The set with its English texts in another language (e.g. "et"), where the file has them. */
export function localize(c: PersonalContent, lang: string): PersonalContent {
  const tr = c.i18n?.[lang];
  if (!tr) return c;
  const T = (x?: string) => (x ? (tr.strings[x] ?? x) : x);
  return {
    ...c,
    lessons: c.lessons.map((l) => ({
      ...l, title: T(l.title)!, description: T(l.description),
      words: l.words.map(([de, en, ex, exEn]) => [de, T(en)!, ...(ex ? [ex, T(exEn) ?? ''] : [])] as typeof l.words[number]),
      sentences: l.sentences?.map(([de, en]) => [de, T(en)!] as [string, string]),
      notes: tr.notes?.[l.id] ?? l.notes,
    })),
    tests: c.tests.map((t) => ({
      ...t, title: T(t.title)!,
      questions: t.questions.map((q): PersonalQuestion => q.type === 'choice' ? { ...q, q: T(q.q)!, en: T(q.en), why: T(q.why) } : q.type === 'type' ? { ...q, q: T(q.q)!, why: T(q.why) } : { ...q, q: T(q.q)! }),
    })),
  };
}

// ---- Word drill: 10 words at a time, wrong ones come back until right ----------------------
export const DRILL_ID = 'drill';
export const DANGER_ID = 'drill-danger';
export interface DrillWord { de: string; en: string; right: number; wrong: number; seen: boolean; known: boolean; danger: boolean }

/** Every lesson word with how it went in earlier drills (from the saved drill rounds, so it follows the learner across devices). */
export function drillState(c: PersonalContent, results: PersonalResult[], setId: string): DrillWord[] {
  const hist = new Map<string, boolean[]>();
  const rounds = results.filter((r) => r.set_id === setId && (r.test_id === DRILL_ID || r.test_id === DANGER_ID)).sort((a, b) => a.created_at.localeCompare(b.created_at));
  for (const r of rounds) for (const a of r.answers) { const h = hist.get(a.expected) ?? []; h.push(a.ok); hist.set(a.expected, h); }
  const seen = new Set<string>();
  const out: DrillWord[] = [];
  for (const l of c.lessons) for (const [de, en] of l.words) {
    if (seen.has(de)) continue;
    seen.add(de);
    const h = hist.get(de) ?? [];
    const wrong = h.filter((x) => !x).length;
    // Known: the last time it was asked, it was right at once (a round ends with every word right,
    // so look at the answer before the final, corrected one).
    const lastRound = rounds.filter((r) => r.answers.some((a) => a.expected === de)).at(-1);
    const firstInLast = lastRound?.answers.find((a) => a.expected === de);
    const known = !!firstInLast?.ok;
    // Danger: wrong again and again — 3 or more mistakes, until it is right at once twice in a row.
    const firsts = rounds.map((r) => r.answers.find((a) => a.expected === de)).filter(Boolean).map((a) => a!.ok);
    const cleared = firsts.length >= 2 && firsts.slice(-2).every(Boolean);
    out.push({ de, en, right: h.length - wrong, wrong, seen: h.length > 0, known, danger: wrong >= 3 && !cleared });
  }
  return out;
}

/** The next 10: words answered wrong last time first, then new ones. Danger mode: only danger words. */
export function drillTest(words: DrillWord[], danger = false, size = 10): PersonalTest {
  const pool = danger ? words.filter((w) => w.danger) : [...words.filter((w) => w.seen && !w.known), ...words.filter((w) => !w.seen)];
  const pick = (pool.length ? pool : words).slice(0, size);
  return {
    id: danger ? DANGER_ID : DRILL_ID, title: danger ? 'Danger words' : 'Word drill',
    questions: shuffle(pick).map((w): PersonalQuestion => ({ type: 'type', q: w.en, answer: w.de })),
  };
}
