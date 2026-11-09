import type { Exam, GrammarLesson, Reading, Unit } from './types';
import type { Phrase } from './phrases/types';
import type { Morphology } from './morph/types';

/**
 * The course of the language being studied. Each language is a separate download (see load.ts),
 * set here once before the app starts, so nobody downloads the courses they aren't learning.
 */
export interface LangContent {
  units: Unit[];
  unitLessons: Record<string, string[]>;
  grammar: GrammarLesson[];
  readings: Reading[];
  songs: Reading[];
  exams: Exam[];
  /** English for example sentences inside grammar notes and lessons. */
  translations: Record<string, string>;
  /** Why the answer to each grammar practice question is right. */
  why: Record<string, string>;
  /** Small words (pronouns, prepositions…) and forms missing from the word lists, for tap-to-translate. */
  smallWords?: Record<string, string>;
  /** Fixed expressions explained as a whole ("Mir geht es gut" = I'm fine). */
  phrases?: Phrase[];
  /** How words are built, to explain words by their parts. */
  morphology?: Morphology;
}

let current: LangContent | null = null;

export function setContent(c: LangContent) {
  current = c;
}

export function content(): LangContent {
  if (!current) throw new Error('Course content is not loaded yet: await loadContent() first.');
  return current;
}
