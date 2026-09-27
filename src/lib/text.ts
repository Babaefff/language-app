const ARTICLES = /^(el|la|los|las|un|una|unos|unas)\s+/;

/** Lower-case, trim, drop punctuation, collapse spaces. Keeps accents. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[¿?¡!.,;:"“”«»()…]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function stripAccents(s: string): string {
  // Keep ñ distinct from n: it is a different letter in Spanish.
  return s
    .replace(/ñ/g, '\u0000')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\u0000/g, 'ñ');
}

/** Removes a leading article: "el perro" → "perro". */
export function bare(s: string): string {
  return normalize(s).replace(ARTICLES, '');
}

export interface Check {
  ok: boolean;
  /** Correct except for accents. */
  accent?: boolean;
  /** Correct except the article was missing. */
  article?: boolean;
}

/**
 * Compares a typed answer with the expected Spanish text. Missing accents and a missing
 * article are accepted but flagged so the learner gets a gentle reminder.
 */
export function checkAnswer(input: string, expected: string): Check {
  const a = normalize(input);
  const alternatives = expected.split('/').map((e) => normalize(e));
  for (const b of alternatives) {
    if (a === b) return { ok: true };
    if (stripAccents(a) === stripAccents(b)) return { ok: true, accent: true };
    const bb = b.replace(ARTICLES, '');
    if (bb !== b && (a === bb || stripAccents(a) === stripAccents(bb))) return { ok: true, article: true };
  }
  return { ok: false };
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
  return text.split(/([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)/).filter(Boolean).map((t) => ({ text: t, word: /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(t) }));
}
