/**
 * Russian content registers its English next to each example, so a sentence and its translation
 * can never drift apart. `ex` returns the italic markup used in grammar notes.
 */
export const RU_TRANSLATIONS: Record<string, string> = {};
export const RU_WHY: Record<string, string> = {};

/** An example sentence in a grammar note: shown in italics with its English after it. */
export function ex(fr: string, en: string): string {
  RU_TRANSLATIONS[fr.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim()] = en;
  return `*${fr}*`;
}

/** A practice question with the reason its answer is right. */
export function q(question: string, options: string[], why: string, en?: string) {
  RU_WHY[question] = why;
  return { q: question, options, answer: 0, ...(en ? { en } : {}) };
}

/** Content is written with the right answer first; this rotates the options so it lands in varied places. */
export function vary<T extends { options: string[]; answer: number }>(items: T[]): T[] {
  return items.map((it, i) => {
    if (it.options[0] === 'Vrai' || it.options[0] === 'Верно') return it;
    const n = it.options.length;
    const k = (i * 2 + 1) % n;
    const options = it.options.map((_, j) => it.options[(j + n - k) % n]);
    return { ...it, options, answer: options.indexOf(it.options[it.answer]) };
  });
}
