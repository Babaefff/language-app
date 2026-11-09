import type { LangContent } from './content';
import { SMALL_FR } from './small/fr';
import { KEY_WORDS_FR, withKeyWords } from './key-words';
import { withEssentials, withLevelledEssentials } from './essentials';
import { FR_UNITS, FR_UNIT_LESSONS } from './fr/units';
import { ESSENTIALS_FR } from './fr/essentials';
import { MORE_FR } from './fr/more-words';
import { GRAMMAR_FR } from './fr/grammar';
import { READINGS_FR, SONGS_FR } from './fr/readings';
import { EXAMS_FR } from './fr/exams';
// French examples register their English and "why" as the units and grammar above load.
import { FR_TRANSLATIONS, FR_WHY } from './fr/registry';

export const CONTENT: LangContent = {
  units: withLevelledEssentials(withEssentials(FR_UNITS, ESSENTIALS_FR), MORE_FR), unitLessons: FR_UNIT_LESSONS, grammar: GRAMMAR_FR,
  readings: withKeyWords(READINGS_FR, KEY_WORDS_FR), songs: withKeyWords(SONGS_FR, KEY_WORDS_FR), exams: EXAMS_FR, translations: FR_TRANSLATIONS, smallWords: SMALL_FR, why: FR_WHY,
};
