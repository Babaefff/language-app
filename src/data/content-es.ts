import type { LangContent } from './content';
import { ES_COURSE, ES_UNIT_LESSONS } from './units-es';
import { GRAMMAR_ES_COURSE } from './grammar-es';
import { READINGS_ES, SONGS_ES } from './readings-es';
import { EXAMS_ES } from './exams-es';
import { ES as TRANSLATIONS } from './translations-es';
import { ES as WHY } from './why-es';

export const CONTENT: LangContent = {
  units: ES_COURSE, unitLessons: ES_UNIT_LESSONS, grammar: GRAMMAR_ES_COURSE,
  readings: READINGS_ES, songs: SONGS_ES, exams: EXAMS_ES, translations: TRANSLATIONS, why: WHY,
};
