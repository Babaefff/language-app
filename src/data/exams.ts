import type { Exam } from './types';
import { LANG } from './lang';
import { EXAMS_FR } from './fr/exams';
import { EXAMS_DE } from './de/exams';
import { EXAMS_ES } from './exams-es';

export const EXAMS: Exam[] = LANG === 'de' ? EXAMS_DE : LANG === 'fr' ? EXAMS_FR : EXAMS_ES;
