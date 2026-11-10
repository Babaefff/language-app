import type { Unit } from '../data/types';
import { UNITS } from '../data/course';
import { VERB_MAP } from '../data/verbs';
import { conjugate, TENSES } from './conjugate';
import { gloss } from './gloss';
import { phrasesIn } from './phrases';
import type { Phrase } from '../data/phrases/types';

/**
 * What a lesson has really taught: its word list (with every form of its verbs), the foreign
 * words its grammar note explains (bold, italic, tables) and its verb tables, plus everything
 * from earlier lessons. Example sentences don't count: seeing "Mir geht es gut" once doesn't
 * teach what "mir" means.
 */
const clean = (t: string) => t.toLowerCase().replace(/[^\p{L}'’-]/gu, '');
let taughtBy: Map<string, number> | null = null;

function index(): Map<string, number> {
  if (taughtBy) return taughtBy;
  const m = new Map<string, number>();
  const put = (text: string, i: number) => { for (const p of text.split(/[\s/,()]+/)) { const c = clean(p); if (c && !m.has(c)) m.set(c, i); } };
  const putVerb = (inf: string, i: number) => {
    if (!VERB_MAP[inf]) return;
    for (const t of TENSES) { try { for (const f of conjugate(inf, t.id)) if (f) put(f, i); } catch { /* not in this tense */ } }
  };
  UNITS.forEach((u, i) => {
    for (const w of u.words) { put(w.es, i); putVerb(w.es, i); }
    for (const x of u.grammar.matchAll(/\*\*([^*]+)\*\*|\*([^*]+)\*|^\|(.+)\|\s*$/gm)) put(x[1] ?? x[2] ?? x[3] ?? '', i);
    for (const v of u.conj?.verbs ?? []) putVerb(v, i);
  });
  return (taughtBy = m);
}

const known = (w: string, upTo: number) => {
  const ix = index();
  // Forms of a taught word count (plural, gender, case): check the word without its ending too.
  for (const t of [w, w.replace(/^[\p{L}]{1,3}['’]/u, '')]) {
    const hit = [t, ...[1, 2, 3].map((c) => t.slice(0, t.length - c)).filter((x) => x.length >= 4)].map((x) => ix.get(x)).find((x) => x !== undefined);
    if (hit !== undefined && hit <= upTo) return true;
  }
  return false;
};

/** Words a lesson's sentences use that no lesson up to it has taught (in the form they appear). */
export function untaughtInSentences(u: Unit): string[] {
  const upTo = UNITS.indexOf(u);
  const out = new Map<string, string>();
  for (const s of u.sentences) for (const raw of s.es.split(/\s+/)) {
    const w = clean(raw);
    if (!w || /\d/.test(raw) || out.has(w)) continue;
    if (!known(w, upTo)) out.set(w, raw.replace(/[¿?¡!.,;:"«»—–()]/g, ''));
  }
  return [...out.values()];
}

/** The same words with their meanings, to teach them before the sentences are practised. */
export function sentenceWords(u: Unit): { word: string; en: string }[] {
  return untaughtInSentences(u).map((w) => ({ word: w, en: gloss(w).meaning })).filter((x) => x.en !== '—');
}

/** The lesson a course sentence belongs to (for exercises that only carry the sentence). */
let bySentence: Map<string, Unit> | null = null;
export function unitOfSentence(es: string): Unit | undefined {
  if (!bySentence) { bySentence = new Map(); for (const u of UNITS) for (const st of u.sentences) if (!bySentence.has(st.es)) bySentence.set(st.es, u); }
  return bySentence.get(es);
}

/** Lower-case words of a sentence that its lesson hasn't taught yet (shown with their meaning). */
export function newWordsIn(es: string): Set<string> {
  const u = unitOfSentence(es);
  return new Set(u ? untaughtInSentences(u).map((w) => clean(w)) : []);
}
export const cleanWord = clean;

/** Fixed expressions that first appear in this lesson (its sentences or word examples). */
export function phrasesOfUnit(u: Unit): Phrase[] {
  const at = UNITS.indexOf(u);
  const seen = new Set<string>();
  for (const e of UNITS.slice(0, at)) for (const t of [...e.sentences.map((x) => x.es), ...e.words.flatMap((w) => (w.ex ? [w.ex] : []))]) for (const p of phrasesIn(t)) seen.add(p.phrase);
  const out = new Map<string, Phrase>();
  for (const t of [...u.words.flatMap((w) => (w.ex ? [w.ex] : [])), ...u.sentences.map((x) => x.es)]) for (const p of phrasesIn(t)) if (!seen.has(p.phrase)) out.set(p.phrase, p);
  return [...out.values()];
}
