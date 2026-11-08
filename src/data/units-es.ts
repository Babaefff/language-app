import { A1 } from './a1';
import { A1B } from './a1b';
import { A2B } from './a2b';
import { B1B } from './b1b';
import { A1C, A2C, B1C } from './extra';
import { CORE_UNITS } from './core';
import { A2 } from './a2';
import { B1 } from './b1';
import { withEssentials, withLevelledEssentials } from './essentials';
import { ESSENTIALS_ES } from './essentials-es';
import { MORE_ES } from './more-es';
import type { Unit } from './types';

const ES_UNITS: Unit[] = [
  ...A1, ...A1B, ...A1C, ...CORE_UNITS.filter((u) => u.level === 'A1'),
  ...A2, ...A2B, ...A2C, ...CORE_UNITS.filter((u) => u.level === 'A2'),
  ...B1, ...B1B, ...B1C, ...CORE_UNITS.filter((u) => u.level === 'B1'),
];

/** The Spanish course: topic units, Top words, then the essential and level word sets. */
export const ES_COURSE: Unit[] = withLevelledEssentials(withEssentials(ES_UNITS, ESSENTIALS_ES), MORE_ES);

/** Grammar lessons that explain the grammar used in each unit. */
export const ES_UNIT_LESSONS: Record<string, string[]> = {
  'a1-01': ['g-stem-ending', 'g-ser-estar'],
  'a1-02': ['g-yo-go'],
  'a1-03': ['g-gender'],
  'a1-04': ['g-ser-estar'],
  'a1-05': ['g-ser-estar'],
  'a1-06': ['g-stem-ending', 'g-boot'],
  'a1-07': ['g-reflexive'],
  'a1-08': ['g-person-code', 'g-yo-go'],
  'a1-09': ['g-gustar', 'g-boot'],
  'a1-10': ['g-yo-go'],
  'a2-01': ['g-pronouns'],
  'a2-02': ['g-preterite-regular', 'g-preterite-irregular'],
  'a2-03': ['g-gustar'],
  'a2-04': ['g-por-para'],
  'a2-05': ['g-imperfect', 'g-pret-vs-imp'],
  'a2-06': ['g-perfect'],
  'b1-01': ['g-future'],
  'b1-02': ['g-future'],
  'b1-03': ['g-subj-form', 'g-subj-use'],
  'b1-04': ['g-subj-use'],
  'b1-05': ['g-subj-use'],
  'b1-06': ['g-subj-use', 'g-reflexive'],
  'b1-07': ['g-imperative'],
  'a1-11': ['g-gender'],
  'a1-12': ['g-gender', 'g-ser-estar'],
  'a1-13': ['g-person-code'],
  'a1-14': ['g-boot', 'g-yo-go'],
  'a1-15': ['g-gender'],
  'a2-07': ['g-pronouns'],
  'a2-08': ['g-perfect'],
  'a2-09': ['g-gender'],
  'a2-10': ['g-preterite-regular', 'g-perfect'],
  'a2-11': ['g-ser-estar', 'g-comparisons'],
  'b1-08': ['g-pret-vs-imp', 'g-future'],
  'b1-09': ['g-perfect'],
  'b1-10': ['g-subj-use'],
  'b1-11': ['g-subj-use', 'g-imperative'],
  'a1-16': ['g-gender'],
  'a1-17': ['g-imperative'],
  'a2-12': ['g-preterite-regular'],
  'a2-13': ['g-imperative'],
  'b1-12': ['g-gustar', 'g-ser-estar'],
  'b1-13': ['g-perfect', 'g-subj-use'],
};
