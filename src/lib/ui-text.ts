/**
 * Optional translation of the exercise screens' fixed texts (Check, Continue, Correct answer…).
 * Only the personal tab switches it on (e.g. to Estonian); everywhere else the texts stay English.
 */
let table: Record<string, string> = {};
/** The text in the chosen interface language, or the English text itself. */
export const t = (s: string) => table[s] ?? s;
export function setUiText(next: Record<string, string> | null) { table = next ?? {}; }
