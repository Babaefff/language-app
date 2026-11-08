import type { LangContent } from './content';
import { RU_A1_UNITS, RU_A1_UNIT_LESSONS } from './ru/units';
import { GRAMMAR_RU_A1 } from './ru/grammar';
import { READINGS_RU, SONGS_RU } from './ru/readings';
// Russian examples register their English and "why" as the units and grammar above load.
import { RU_TRANSLATIONS, RU_WHY } from './ru/registry';

export const CONTENT: LangContent = {
  units: [...RU_A1_UNITS], unitLessons: { ...RU_A1_UNIT_LESSONS }, grammar: [...GRAMMAR_RU_A1],
  readings: READINGS_RU, songs: SONGS_RU, exams: [], translations: RU_TRANSLATIONS, why: RU_WHY,
};
