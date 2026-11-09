import { LANG } from '../data/lang';
import { numbersToDigits } from './numbers';
const ARTICLES = /^(?:(?:el|la|los|las|un|una|unos|unas|der|die|das|ein|eine|le|les|une|des)\s+|l['’])/;

/** Lower-case, trim, drop punctuation, collapse spaces. Keeps accents. */
export function normalize(s: string): string {
  return equivalentForm(s)
    .toLowerCase()
    .replace(/[¿?¡!.,;:"“”«»()…]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function stripAccents(s: string): string {
  // Keep ñ (Spanish) and й (Russian) distinct: they are separate letters, not accented ones.
  return s
    .replace(/ñ/g, '\u0000')
    .replace(/й/g, '\u0001')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\u0000/g, 'ñ')
    .replace(/\u0001/g, 'й')
    .replace(/ß/g, 'ss');
}

/** Removes a leading article: "el perro" → "perro". */
export function bare(s: string): string {
  return normalize(s).replace(ARTICLES, '');
}

export interface Check {
  ok: boolean;
  /** Right except for accents / special letters (á, ñ, ä, ß…). */
  accent?: boolean;
  /** Right except for capital letters (German nouns, Sie…). */
  letterCase?: boolean;
  /** Right except the article was missing. */
  article?: boolean;
  /** Right except for a one-letter typo (only where allowed, never in strict mode). */
  typo?: boolean;
}

/** Edit distance (insert, delete, replace, swap of two neighbours). */
function distance(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
  }
  return d[a.length][b.length];
}

/** Spanish usually leaves out the subject pronoun: "Soy estudiante" = "Yo soy estudiante". */
const PRONOUN_ES = /^(yo|tú|tu|él|ella|usted|nosotros|nosotras|vosotros|vosotras|ellos|ellas|ustedes) /i;

const ARTICLES_I = new RegExp(ARTICLES.source, 'i');

/**
 * Writes equivalent spellings one way, so they count as the same answer:
 * - any apostrophe-like character between letters (’ ‘ ʼ ´ ` ” “) is an apostrophe: geht”s = geht's
 * - German: a contracted "es" is the full word (geht's = geht es, gibt's = gibt es), hab' = habe
 * - Russian: ё and е are the same letter (Russians usually write е)
 * - every kind of dash is a hyphen
 */
export function equivalentForm(s: string, lang: string = LANG): string {
  let t = s.replace(/(?<=\p{L})[’‘ʼ´`”“″′'](?=\p{L})/gu, "'").replace(/[–—‑]/g, '-');
  if (lang === 'fr') {
    // "j' ai" with a stray space is "j'ai"; œ / æ typed as oe / ae.
    t = t.replace(/(?<![\p{L}])(j|l|d|n|m|t|s|c|qu|jusqu|lorsqu|puisqu)\s*[’‘ʼ´`'”“]\s+(?=\p{L})/giu, "$1'");
    t = t.replace(/œ/g, 'oe').replace(/Œ/g, 'Oe').replace(/æ/g, 'ae');
  }
  if (lang === 'de') t = t.replace(/(\p{L}+)'s(?!\p{L})/gu, '$1 es').replace(/(?<!\p{L})(h)ab'?(?!\p{L})/giu, '$1abe');
  if (lang === 'ru') {
    t = t.replace(/ё/g, 'е').replace(/Ё/g, 'Е');
    // A Latin look-alike typed by mistake inside a Russian word (o/о, a/а, p/р…) is the Cyrillic letter.
    const LOOK: Record<string, string> = { a: 'а', e: 'е', o: 'о', p: 'р', c: 'с', x: 'х', y: 'у', k: 'к', A: 'А', B: 'В', E: 'Е', K: 'К', M: 'М', H: 'Н', O: 'О', P: 'Р', C: 'С', T: 'Т', X: 'Х' };
    t = t.replace(/\p{L}+/gu, (w) => (/[а-яА-Я]/.test(w) ? w.replace(/[aeopcxykABEKMHOPCTX]/g, (ch) => LOOK[ch]) : w));
  }
  return t;
}
/** Drops punctuation but keeps letter case. */
const clean = (s: string) => numbersToDigits(equivalentForm(s), LANG).replace(/[¿?¡!.,;:"“”«»()…]/g, ' ').replace(/\s+/g, ' ').trim();
/** Lower case without accents; in German, ae/oe/ue typed for ä/ö/ü count as the same letter. */
function fold(s: string) {
  const f = stripAccents(s.toLowerCase());
  return LANG === 'de' ? f.replace(/ae/g, 'a').replace(/oe/g, 'o').replace(/ue/g, 'u') : f;
}
/** A capital letter where a small one belongs, or the other way round. The first letter of a
 * sentence is free, except a single German word (where a capital means "noun"). */
function caseSlip(a: string, b: string) {
  const wa = a.split(' ');
  const wb = b.split(' ');
  const up = (w: string) => w[0] !== w[0].toLowerCase();
  return wb.some((w, i) => !!wa[i] && (i > 0 || (LANG === 'de' && wb.length === 1)) && up(wa[i]) !== up(w));
}

/**
 * Compares a typed answer with the expected text. Slips in accents, special letters, capital
 * letters or a missing article are accepted but flagged — or count as wrong when `strict`.
 */
export function checkAnswer(input: string, expected: string, strict = false, opts: { typos?: boolean; isWord?: (w: string) => boolean } = {}): Check {
  const typed = clean(input);
  const inputs = [typed];
  for (const alt of expected.split('/')) {
    const full = clean(alt);
    const variants: [string, boolean][] = [[full, false]];
    const noArt = full.replace(ARTICLES_I, '');
    if (noArt !== full) variants.push([noArt, true]);
    // With or without the subject pronoun (but never one pronoun swapped for another).
    if (LANG === 'es') {
      if (PRONOUN_ES.test(full) && !PRONOUN_ES.test(typed)) variants.push([full.replace(PRONOUN_ES, ''), false]);
      if (PRONOUN_ES.test(typed) && !PRONOUN_ES.test(full)) inputs.push(typed.replace(PRONOUN_ES, ''));
    }
    for (const [b, article] of variants) for (const a of inputs) {
      if (fold(a) !== fold(b)) continue;
      const accent = a.toLowerCase() !== b.toLowerCase();
      const letterCase = caseSlip(a, b);
      const r: Check = { ok: !(strict && (accent || letterCase)) };
      if (accent) r.accent = true;
      if (letterCase) r.letterCase = true;
      if (article) r.article = true;
      return r;
    }
  }
  // A one-letter slip counts, with a note: in one word of 6+ letters only, and never when the
  // typed word is itself a real word or verb form (vas for voy is a grammar mistake, not a typo).
  if (opts.typos && !strict) {
    const tw = fold(typed).split(' ');
    for (const alt of expected.split('/')) {
      const ew = fold(clean(alt)).split(' ');
      if (ew.length !== tw.length) continue;
      const diff = ew.map((_, i) => i).filter((i) => ew[i] !== tw[i]);
      if (diff.length !== 1) continue;
      const [x, y] = [tw[diff[0]], ew[diff[0]]];
      if (y.length >= 6 && distance(x, y) === 1 && !opts.isWord?.(x)) return { ok: true, typo: true };
    }
  }
  return { ok: false };
}

/** Indexes of the expected words that the typed answer got wrong in any way (for highlighting). */
export function wrongWords(input: string, expected: string): Set<number> {
  const a = clean(input).split(' ');
  const b = clean(expected.split('/')[0]).split(' ');
  const offset = b.length - a.length === 1 && ARTICLES_I.test(clean(expected)) ? 1 : 0;
  const same = (x: string | undefined, w: string, i: number) => x === w || (i === 0 && b.length > 1 && x?.toLowerCase() === w.toLowerCase());
  return new Set(b.map((w, i) => (i < offset || same(a[i - offset], w, i) ? -1 : i)).filter((i) => i >= 0));
}

export function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample<T>(items: readonly T[], n: number): T[] {
  return shuffle(items).slice(0, n);
}

/** Splits running text into word and non-word pieces, keeping punctuation for display. */
export function tokenize(text: string): { text: string; word: boolean }[] {
  return text.split(/(\p{L}+)/u).filter(Boolean).map((t) => ({ text: t, word: /\p{L}/u.test(t) }));
}
