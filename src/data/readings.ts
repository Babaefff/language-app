import type { Reading } from './types';
import { content } from './content';

/** Readings and songs of the language being studied. */
export const READINGS: Reading[] = content().readings;
export const SONGS: Reading[] = content().songs;
