import { content } from './content';

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
let index: Record<string, string> | null = null;
/** Built on first use, after the French modules have registered their entries. */
const INDEX = () => (index ??= Object.fromEntries(Object.entries(content().why).map(([k, v]) => [norm(k), v])));

/** The explanation for a grammar practice question (keys may add "|answer" when a question repeats). */
export const whyFor = (q: string, answer?: string): string | undefined => INDEX()[`${norm(q)}|${answer}`] ?? INDEX()[norm(q)];
