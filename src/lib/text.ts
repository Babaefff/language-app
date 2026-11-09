import { LANG } from '../data/lang';
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
}

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
  if (lang === 'de') t = t.replace(/(\p{L}+)'s(?!\p{L})/gu, '$1 es').replace(/(?<!\p{L})(h)ab'?(?!\p{L})/giu, '$1abe');
  if (lang === 'ru') t = t.replace(/ё/g, 'е').replace(/Ё/g, 'Е');
  return t;
}
/** Drops punctuation but keeps letter case. */
const clean = (s: string) => equivalentForm(s).replace(/[¿?¡!.,;:"“”«»()…]/g, ' ').replace(/\s+/g, ' ').trim();
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
export function checkAnswer(input: string, expected: string, strict = false): Check {
  const a = clean(input);
  for (const alt of expected.split('/')) {
    const full = clean(alt);
    const variants: [string, boolean][] = [[full, false]];
    const noArt = full.replace(ARTICLES_I, '');
    if (noArt !== full) variants.push([noArt, true]);
    for (const [b, article] of variants) {
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
