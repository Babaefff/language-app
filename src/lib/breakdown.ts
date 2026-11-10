import type { Word } from '../data/types';
import type { Morphology } from '../data/morph/types';
import { WORDS } from '../data/course';
import { VERBS } from '../data/verbs';
import { content } from '../data/content';
import { LANG } from '../data/lang';

/** One building block of a word, with what it means. */
export interface Part { text: string; en: string; kind: 'word' | 'prefix' | 'suffix' | 'link' }
export interface Breakdown { parts: Part[]; literal?: string }

const ARTICLE = /^(der|die|das|el|la|los|las|le|la|les|l['’])\s*/i;
/** "the letter / the mail" → "letter": the short meaning used inside a breakdown. */
const short = (en: string) => en.replace(/\([^)]*\)/g, '').split(/\s*[/;,]\s*/)[0].replace(/^(the|a|an|to)\s+/i, '').trim();
const VERB_END: Record<string, RegExp> = { de: /(en|n)$/, es: /(ar|er|ir)$/, fr: /(er|ir|re)$/, ru: /(ть|ти|чь)(ся)?$/ };

let lexicon: Map<string, string> | null = null;
/** Parts that are nouns (written with a capital in German). */
const nouns = new Set<string>();
/** Verb stems → the verb's meaning ("chant" → sing (from chanter)). */
const verbStems = new Map<string, string>();
/** Adjectives and adverbs of the course (words without an article that aren't verbs). */
const adjectives = new Set<string>();
/** Every course word and verb stem (lower case) → its meaning, plus the language's own parts. */
function lex(m: Morphology): Map<string, string> {
  if (lexicon) return lexicon;
  const map = new Map<string, string>();
  for (const [k, v] of Object.entries(m.parts)) map.set(k, v);
  for (const w of WORDS) {
    const b = w.es.replace(ARTICLE, '').toLowerCase();
    if (/\s/.test(b) || b.length < 3) continue;
    if (ARTICLE.test(w.es)) nouns.add(b);
    else if (!/^to /.test(w.en)) adjectives.add(b);
    if (!map.has(b)) map.set(b, short(w.en));
  }
  for (const v of VERBS) {
    const stem = v.inf.toLowerCase().replace(/^sich /, '').replace(VERB_END[LANG] ?? /$/, '');
    if (stem.length >= 2) verbStems.set(stem, `${short(v.en)} (from ${v.inf})`);
    if (stem.length >= 3 && !map.has(stem)) map.set(stem, `${short(v.en)} (from ${v.inf})`);
  }
  return (lexicon = map);
}

const NOT_PARTS = new Set(['der', 'die', 'das', 'den', 'dem', 'des', 'und', 'ein', 'eine', 'ist', 'sie', 'wir', 'ihr', 'mit', 'von', 'zum', 'zur', 'aus', 'bei', 'nach', 'auf', 'für', 'los', 'ich', 'ihm']);

/** German compounds: the split into known words (with linking letters) that needs the fewest parts. */
function splitCompound(word: string, m: Morphology): Part[] | null {
  const w = word.toLowerCase();
  const L = lex(m);
  const links = m.compounds?.links ?? [];
  const best: (Part[] | null)[] = Array(w.length + 1).fill(null);
  best[0] = [];
  for (let i = 0; i < w.length; i++) {
    const before = best[i];
    if (!before) continue;
    for (let j = w.length; j >= i + 3; j--) {
      const seg = w.slice(i, j);
      if (seg === w || NOT_PARTS.has(seg)) continue;
      const en = L.get(seg);
      if (!en) continue;
      const cand: Part[] = [...before, { text: seg, en, kind: 'word' }];
      const put = (k: number, parts: Part[]) => { if (!best[k] || parts.length < best[k]!.length) best[k] = parts; };
      put(j, cand);
      // A linking letter may follow (Geburt-s-tag, Woche-n-ende), but never at the end.
      for (const l of links) if (j + l.length < w.length && w.startsWith(l, j)) put(j + l.length, [...cand, { text: l, en: '(linking letter)', kind: 'link' }]);
    }
  }
  const parts = best[w.length];
  if (!parts || parts.filter((p) => p.kind === 'word').length < 2) return null;
  return parts;
}

/** Word = known word + ending (Wohn·ung, panad·ería) or prefix + known word (un·freundlich, вы·ход). */
/** The word's English shows the affix (impolite for impoli; not "to import" for importer). */
const cued = (gloss: string, cues?: string[]) => {
  if (!cues) return true;
  const g = gloss.toLowerCase().replace(/^(the|a|an|to)\s+/, '').replace(/\([^)]*\)/g, '');
  return cues.some((c) => (c.startsWith(' ') || c.startsWith("'") || c.length > 3 ? g.includes(c.trim()) : g.startsWith(c)) || g.endsWith(c));
};

function splitAffix(word: string, gloss: string, m: Morphology, isNoun: boolean): Part[] | null {
  const w = word.toLowerCase();
  const L = lex(m);
  for (const [s, en, makes, base, cues] of [...m.suffixes].sort((a, b) => b[0].length - a[0].length)) {
    if (!w.endsWith(s) || w.length - s.length < 3) continue;
    // Noun endings only on nouns, adjective endings only on other words (später isn't spät + -er).
    if ((makes === 'noun' && !isNoun) || (makes === 'adj' && isNoun)) continue;
    if (!cued(gloss, cues)) continue;
    const stem = w.slice(0, -s.length);
    const tries = [stem, stem + 'e', stem + 'a', stem + 'o'];
    // What the ending attaches to: a verb (chant-eur ← chanter), an adjective (honnête-té), or any word.
    const meaning = base === 'verb' ? tries.map((t) => verbStems.get(t)).find(Boolean)
      : base === 'adj' ? tries.filter((t) => adjectives.has(t)).map((t) => L.get(t)).find(Boolean)
      : tries.map((t) => verbStems.get(t) ?? L.get(t)).find(Boolean);
    if (meaning) return [{ text: stem, en: meaning, kind: 'word' }, { text: '-' + s, en, kind: 'suffix' }];
  }
  for (const [p, en, cues] of [...m.prefixes].sort((a, b) => b[0].length - a[0].length)) {
    if (!w.startsWith(p) || w.length - p.length < 3 || !cued(gloss, cues)) continue;
    const rest = w.slice(p.length);
    const meaning = L.get(rest);
    if (!meaning) continue;
    // "Not" / "again" prefixes: the English must contain the base's meaning too
    // (injuste = unfair contains "fair" ✓; importer = to import doesn't contain "wear" ✗).
    if (/^(un-|re-|not)/.test(en) && !gloss.toLowerCase().includes(short(meaning).toLowerCase().split(' ')[0])) continue;
    return [{ text: p + '-', en, kind: 'prefix' }, { text: rest, en: meaning, kind: 'word' }];
  }
  return null;
}

/** Keep the word's own capitals and letters in the parts ("Brief + träger" → "Brief + Träger"). */
function restore(word: string, parts: Part[]): Part[] {
  let at = 0;
  return parts.map((p) => {
    const t = p.text.replace(/-/g, '');
    const original = word.slice(at, at + t.length);
    at += t.length;
    const lower = original.toLowerCase();
    // German: nouns keep their capital, other parts are written small.
    const text = LANG === 'de' && p.kind === 'word' && nouns.has(lower) ? lower[0].toUpperCase() + lower.slice(1) : at - t.length === 0 ? original : lower;
    return { ...p, text: p.kind === 'prefix' ? text + '-' : p.kind === 'suffix' ? '-' + text : text };
  });
}

function parseOverride(s: string): Part[] {
  return s.split(/\s\+\s/).map((x) => {
    const [text, en] = x.split('|');
    const kind = en?.includes('linking') ? 'link' : text.endsWith('-') ? 'prefix' : text.startsWith('-') ? 'suffix' : 'word';
    return { text, en: en ?? '', kind };
  });
}

const cache = new Map<string, Breakdown | null>();
/** How a word is built, or null when it's a simple word (or can't be split with confidence). */
export function breakdown(word: Pick<Word, 'es' | 'en'>): Breakdown | null {
  if (cache.has(word.es)) return cache.get(word.es)!;
  const m = content().morphology;
  let res: Breakdown | null = null;
  if (m) {
    const bare = word.es.replace(ARTICLE, '');
    const o = m.overrides[bare] ?? m.overrides[word.es];
    let parts: Part[] | null = o ? parseOverride(o) : null;
    const blocked = (m.noSplit ?? []).some((x) => x.toLowerCase() === bare.toLowerCase());
    if (!parts && !blocked && !/\s/.test(bare) && bare.length >= 6) {
      // Hyphenated words (porte-monnaie, arc-en-ciel) are explained word by word.
      if (bare.includes('-')) {
        const L = lex(m);
        const ps = bare.split('-').map((t) => ({ text: t, en: L.get(t.toLowerCase()) ?? '', kind: 'word' as const }));
        parts = ps.every((p) => p.en) ? ps : null;
      } else {
        const c = m.compounds ? splitCompound(bare, m) : null;
        const a = c ? null : splitAffix(bare, word.en, m, ARTICLE.test(word.es));
        parts = c ?? a;
        if (parts) parts = restore(bare, parts);
      }
    }
    if (parts && parts.length >= 2) {
      const words = parts.filter((p) => p.kind === 'word').map((p) => short(p.en));
      res = { parts, literal: words.length >= 2 ? words.join(' ') : undefined };
    }
  }
  cache.set(word.es, res);
  return res;
}
