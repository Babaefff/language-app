import type { LangContent } from './content';
import { MORPH_DE } from './morph/de';
import { PHRASES_DE } from './phrases/de';
import { SMALL_DE } from './small/de';
import { KEY_WORDS_DE, withKeyWords } from './key-words';
import { withEssentials, withLevelledEssentials } from './essentials';
import { DE_UNITS, DE_UNIT_LESSONS } from './de/units';
import { ESSENTIALS_DE } from './de/essentials';
import { MORE_DE } from './de/more-words';
import { GRAMMAR_DE } from './de/grammar';
import { READINGS_DE } from './de/readings';
import { SONGS_DE } from './de/songs';
import { EXAMS_DE } from './de/exams';
import { DE as TRANSLATIONS } from './de/translations';
import { DE as WHY } from './de/why';

export const CONTENT: LangContent = {
  units: withLevelledEssentials(withEssentials(DE_UNITS, ESSENTIALS_DE), MORE_DE), unitLessons: DE_UNIT_LESSONS, grammar: GRAMMAR_DE,
  readings: withKeyWords(READINGS_DE, KEY_WORDS_DE), songs: withKeyWords(SONGS_DE, KEY_WORDS_DE), exams: EXAMS_DE, translations: TRANSLATIONS, smallWords: SMALL_DE, phrases: PHRASES_DE, morphology: MORPH_DE, why: WHY,
};
