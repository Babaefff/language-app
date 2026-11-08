import { content } from './content';

const norm = (s: string) => s.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
let index: Record<string, string> | null = null;
/** Built on first use, after the French modules have registered their entries. */
const INDEX = () => (index ??= Object.fromEntries(Object.entries(content().translations).map(([k, v]) => [norm(k), v])));

/** English for an example from a grammar lesson, if it has one. */
export const exampleTranslation = (text: string): string | undefined => INDEX()[norm(text)];
export const translatedExamples = () => Object.keys(INDEX());
