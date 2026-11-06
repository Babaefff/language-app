import type { Exam } from './types';
import { LANG } from './lang';
import { EXAMS_DE } from './de/exams';

export const EXAMS: Exam[] = LANG === 'de' ? EXAMS_DE : [];
