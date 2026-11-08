import type { Exam } from './types';
import { LANG } from './lang';
import { EXAMS_DE } from './de/exams';
import { EXAMS_ES } from './exams-es';

/** French mock exams (DELF format) come with the A2 / B1 content. */
export const EXAMS: Exam[] = LANG === 'de' ? EXAMS_DE : LANG === 'fr' ? [] : EXAMS_ES;
