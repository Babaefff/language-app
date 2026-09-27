import type { Level, Sentence, Tense, Unit } from './types';

/** [spanish, english, example?, exampleTranslation?] */
export type WordRow = [string, string, string?, string?];
/** [spanish, english] */
export type SentenceRow = [string, string];

export interface UnitInput {
  id: string;
  title: string;
  titleEs: string;
  emoji: string;
  description: string;
  words: WordRow[];
  sentences: SentenceRow[];
  grammar: string;
  conj?: { verbs: string[]; tenses: Tense[] };
}

export function units(level: Level, inputs: UnitInput[]): Unit[] {
  return inputs.map((u) => ({
    ...u,
    level,
    grammar: u.grammar.trim(),
    words: u.words.map(([es, en, ex, exEn]) => ({ id: es, es, en, ex, exEn, unitId: u.id, level })),
    sentences: u.sentences.map(([es, en]): Sentence => ({ es, en })),
  }));
}
