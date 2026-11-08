import type { GrammarLesson } from './types';
import { content } from './content';

/** Grammar lessons of the language being studied. */
export const GRAMMAR: GrammarLesson[] = content().grammar;
export const GRAMMAR_MAP: Record<string, GrammarLesson> = Object.fromEntries(GRAMMAR.map((g) => [g.id, g]));
