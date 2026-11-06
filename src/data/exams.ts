import type { Exam } from './types';
import { LANG } from './lang';
import { EXAMS_DE } from './de/exams';
import { EXAMS_ES } from './exams-es';

export const EXAMS: Exam[] = LANG === 'de' ? EXAMS_DE : EXAMS_ES;
