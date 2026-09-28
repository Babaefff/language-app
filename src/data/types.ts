export type Level = 'A1' | 'A2' | 'B1';

export const LEVELS: Level[] = ['A1', 'A2', 'B1'];

export const LEVEL_INFO: Record<Level, { name: string; description: string }> = {
  A1: { name: 'Beginner', description: 'Greetings, numbers, family, home, food, daily routine and the present tense.' },
  A2: { name: 'Elementary', description: 'Shopping, health, travel and talking about the past.' },
  B1: { name: 'Intermediate', description: 'Future plans, advice, wishes, opinions, feelings and instructions.' },
};

export interface Word {
  /** Stable id used for spaced-repetition progress (the Spanish text). */
  id: string;
  es: string;
  en: string;
  ex?: string;
  exEn?: string;
  unitId: string;
  level: Level;
}

export interface Sentence {
  es: string;
  en: string;
}

export type Tense =
  | 'presente'
  | 'progresivo'
  | 'preterito'
  | 'imperfecto'
  | 'perfecto'
  | 'futuro'
  | 'condicional'
  | 'subjuntivo'
  | 'imperativo';

export interface Unit {
  id: string;
  level: Level;
  title: string;
  titleEs: string;
  emoji: string;
  description: string;
  words: Word[];
  sentences: Sentence[];
  /** Lightweight markup: `## heading`, `- bullet`, `| table | row |`, `**bold**`. */
  grammar: string;
  conj?: { verbs: string[]; tenses: Tense[] };
}

export interface Reading {
  id: string;
  level: Level | 'B1+';
  title: string;
  source?: string;
  paragraphs: string[];
  translation: string[];
  /** Lower-case word form → English, checked before the course dictionary. */
  glossary: Record<string, string>;
  questions: { q: string; options: string[]; answer: number }[];
}

export type LessonBlock =
  /** Explanatory text in the same light markup as unit grammar notes. */
  | { t: 'text'; md: string }
  /** Colour-coded conjugation table: stems plain, endings coloured, changed stems highlighted. */
  | { t: 'table'; verbs: string[]; tense: Tense; caption?: string }
  /** Spanish/English example pairs with audio. */
  | { t: 'examples'; title?: string; items: [string, string][] }
  /** A highlighted rule of thumb. */
  | { t: 'tip'; md: string };

export interface ChoiceQuestion {
  /** Sentence with a gap shown as ___ . */
  q: string;
  options: string[];
  answer: number;
  en?: string;
}

export interface GrammarLesson {
  id: string;
  level: Level;
  title: string;
  titleEs: string;
  summary: string;
  blocks: LessonBlock[];
  practice: { conj?: { verbs: string[]; tenses: Tense[]; count: number }; choice?: ChoiceQuestion[] };
}
