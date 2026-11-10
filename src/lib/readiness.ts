import type { Reading, Unit } from '../data/types';
import { UNITS } from '../data/course';
import { VERB_MAP } from '../data/verbs';
import { conjugate, TENSES } from './conjugate';

/**
 * "Can I read this yet?" For each reading we work out which course lessons teach its words.
 * Research on reading in a foreign language (Hu & Nation 2000; Laufer) finds that you need to
 * know about 95% of the words to follow a text, and 98% to read it comfortably; the reading's
 * own glossary covers the rest. Names and numbers don't count.
 */
export const READY_COVERAGE = 0.95;

const clean = (t: string) => t.toLowerCase().replace(/[^\p{L}'’-]/gu, '');
/** Rough stems, so "casas", "бабушкой" or "grande" match "casa", "бабушка" or "grand". */
const stems = (t: string, cuts: number[]) => cuts.map((c) => t.slice(0, t.length - c)).filter((x) => x.length >= 3 && x.length < t.length);
/** French/Italian elision: "d'autres" → "autres", "l'université" → "université". */
const unelide = (t: string) => t.replace(/^[\p{L}]{1,3}['’]/u, '');

type Index = { exact: Map<string, number>; stems: Map<string, number> };

function lookup(ix: Index, w: string): number | undefined {
  for (const t of [w, unelide(w)]) {
    const cuts = [t, ...stems(t, [1, 2, 3])];
    const hit = cuts.map((x) => ix.exact.get(x)).find((x) => x !== undefined) ?? cuts.map((x) => ix.stems.get(x)).find((x) => x !== undefined);
    if (hit !== undefined) return hit;
  }
  return undefined;
}
let index: Index | null = null;

/** Every written form → the position of the first lesson that teaches it. */
function buildIndex(): Index {
  const exact = new Map<string, number>();
  const stemMap = new Map<string, number>();
  const put = (form: string, i: number) => {
    const f = clean(form);
    if (!f) return;
    if (!exact.has(f)) exact.set(f, i);
    for (const st of stems(f, [1, 2])) if (!stemMap.has(st)) stemMap.set(st, i);
  };
  const putText = (text: string, i: number) => { for (const part of text.split(/[\s/,()]+/)) put(part, i); };
  const putVerb = (inf: string, i: number) => {
    const verb = VERB_MAP[inf];
    if (verb) for (const t of TENSES) { try { for (const f of conjugate(verb.inf, t.id)) if (f) putText(f, i); } catch { /* not in this tense */ } }
  };
  UNITS.forEach((u, i) => {
    // Everything a lesson shows with its translation: words, their examples, sentences, the
    // foreign words in its grammar note (bold, italic, tables) and its verb tables.
    for (const w of u.words) {
      putText(w.es, i);
      if (w.ex) putText(w.ex, i);
      // A verb brings all its forms: learning "tanzen" lets you read "tanzt".
      putVerb(w.es, i);
    }
    for (const st of u.sentences) putText(st.es, i);
    for (const m of u.grammar.matchAll(/\*\*([^*]+)\*\*|\*([^*]+)\*|^\|(.+)\|\s*$/gm)) putText(m[1] ?? m[2] ?? m[3] ?? '', i);
    for (const v of u.conj?.verbs ?? []) putVerb(v, i);
  });
  return { exact, stems: stemMap };
}

export interface ReadingWords {
  /** Words that count (names and numbers excluded). */
  total: number;
  /** The counted words, in the same order as firstLesson. */
  words: string[];
  /** For each counted word: the lesson position that teaches it (Infinity = only in the glossary). */
  firstLesson: number[];
}

const cache = new Map<string, ReadingWords>();
export function readingWords(r: Reading): ReadingWords {
  const hit = cache.get(r.id);
  if (hit) return hit;
  index ??= buildIndex();
  const firstLesson: number[] = [];
  const words: string[] = [];
  // Names: words never written in lower case in this text (not for German, where nouns are capitalised).
  const lower = new Set(r.paragraphs.join(' ').split(/\s+/).filter((x) => /^[^\p{Lu}]*\p{Ll}/u.test(x)).map(clean));
  const german = UNITS[0]?.id.startsWith('de-');
  for (const para of r.paragraphs) {
    for (const sentence of para.split(/(?<=[.!?…])\s+|\n/)) {
      sentence.split(/\s+/).forEach((raw, i) => {
        const w = clean(raw);
        if (!w || /\d/.test(raw)) return;
        // A capital in the middle of a sentence is a name (German nouns are checked first).
        const capital = /^\p{Lu}/u.test(raw.replace(/^[^\p{L}]+/u, ''));
        if (!german && capital && !lower.has(w) && w.length > 2 && !r.glossary[w]) {
          const k = lookup(index!, w);
          // Not a name if the course teaches it early (e.g. a sentence-initial "Hoy").
          if (k === undefined || UNITS[k].level !== 'A1' || /^[A-ZÁÉÍÓÚÀ-ÖØ-Þ][a-zà-ÿ]+$/.test(raw) && i > 0) return;
        }
        const known = lookup(index!, w);
        if (known === undefined && i > 0 && /^\p{Lu}/u.test(raw.replace(/^[^\p{L}]+/u, ''))) return;
        // The reading's own key words are given with it, so they count as known from the start.
        const glossed = !!(r.glossary[w] || r.glossary[unelide(w)]);
        firstLesson.push(glossed ? -1 : known ?? Infinity);
        words.push(w);
      });
    }
  }
  const res = { total: firstLesson.length, words, firstLesson };
  cache.set(r.id, res);
  return res;
}

/** Share of the reading's words this learner knows from finished lessons (glossary words count). */
export function coverage(r: Reading, done: Record<string, unknown>): number {
  const { total, firstLesson } = readingWords(r);
  if (!total) return 1;
  const known = firstLesson.filter((i) => i === -1 || (Number.isFinite(i) && !!done[UNITS[i].id])).length;
  return known / total;
}

/** The lesson after which a learner who follows the course knows enough words (null: not reachable). */
export function readyAfter(r: Reading): Unit | null {
  const { total, firstLesson } = readingWords(r);
  if (!total) return null;
  const sorted = firstLesson.map((i) => (i === -1 ? -1 : i)).sort((a, b) => a - b);
  const need = sorted[Math.ceil(total * READY_COVERAGE) - 1];
  if (!Number.isFinite(need)) return null;
  // Words aren't everything: a text also uses its level's grammar (an A2 story is in the past
  // tense), so it is never ready before the first lesson of its level.
  const level = r.level === 'B1+' ? 'B1' : r.level;
  const firstOfLevel = UNITS.findIndex((u) => u.level === level);
  return UNITS[Math.max(0, need, firstOfLevel)];
}

/** Ready for this learner: the gating lesson is done and they know enough of the words. */
export function isReady(r: Reading, done: Record<string, unknown>): boolean {
  const gate = readyAfter(r);
  return !!gate && !!done[gate.id] && coverage(r, done) >= READY_COVERAGE - 0.03;
}
