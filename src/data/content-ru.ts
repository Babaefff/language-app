import type { LangContent } from './content';
import { withLevelledEssentials } from './essentials';
import { MORE_RU } from './ru/more-words';
import { RU_A1_UNITS, RU_A1_UNIT_LESSONS } from './ru/units';
import { GRAMMAR_RU_A1 } from './ru/grammar';
import { GRAMMAR_RU_A2 } from './ru/grammar-a2';
import { RU_A2_UNITS, RU_A2_UNIT_LESSONS } from './ru/a2';
import { GRAMMAR_RU_B1 } from './ru/grammar-b1';
import { RU_B1_UNITS, RU_B1_UNIT_LESSONS } from './ru/b1';
import { READINGS_RU, SONGS_RU } from './ru/readings';
import { EXAMS_RU } from './ru/exams';
// Russian examples register their English and "why" as the units and grammar above load.
import { RU_TRANSLATIONS, RU_WHY } from './ru/registry';

export const CONTENT: LangContent = {
  units: withLevelledEssentials([...RU_A1_UNITS, ...RU_A2_UNITS, ...RU_B1_UNITS], MORE_RU), unitLessons: { ...RU_A1_UNIT_LESSONS, ...RU_A2_UNIT_LESSONS, ...RU_B1_UNIT_LESSONS }, grammar: [...GRAMMAR_RU_A1, ...GRAMMAR_RU_A2, ...GRAMMAR_RU_B1],
  readings: READINGS_RU, songs: SONGS_RU, exams: EXAMS_RU, translations: RU_TRANSLATIONS, why: RU_WHY,
};
