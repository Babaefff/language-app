/**
 * French content registers its English next to each example, so a sentence and its translation
 * can never drift apart. `ex` returns the italic markup used in grammar notes.
 */
export const FR_TRANSLATIONS: Record<string, string> = {};
export const FR_WHY: Record<string, string> = {};

/** An example sentence in a grammar note: shown in italics with its English after it. */
export function ex(fr: string, en: string): string {
  FR_TRANSLATIONS[fr.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim()] = en;
  return `*${fr}*`;
}

/** A practice question with the reason its answer is right. */
export function q(question: string, options: string[], why: string, en?: string) {
  FR_WHY[question] = why;
  return { q: question, options, answer: 0, ...(en ? { en } : {}) };
}
