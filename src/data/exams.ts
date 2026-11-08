import type { Exam } from './types';
import { content } from './content';

/** Mock exams of the language being studied. */
export const EXAMS: Exam[] = content().exams;
