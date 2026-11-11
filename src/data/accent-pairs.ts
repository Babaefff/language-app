import { LANG } from './lang';

/**
 * Words that become another word without their accent, umlaut or ñ. Taught in the lesson box
 * ("Watch the accent") before the exercises, and used to explain the mistake when they mix up.
 * [with the mark, what it means, without the mark, what that means]
 */
export type AccentPair = [string, string, string, string];

const ES: AccentPair[] = [
  ['dónde', 'where? (in questions)', 'donde', 'where (in a statement: la casa donde vivo)'],
  ['qué', 'what? / how …! (questions, exclamations)', 'que', 'that / than (creo que…, más que…)'],
  ['cómo', 'how? (in questions)', 'como', 'like, as — and “I eat” (yo como)'],
  ['cuándo', 'when? (in questions)', 'cuando', 'when (in a statement: cuando llueve…)'],
  ['quién', 'who? (in questions)', 'quien', 'who (in a statement)'],
  ['cuál', 'which? (in questions)', 'cual', 'which (in a statement: el cual)'],
  ['cuánto', 'how much? (in questions)', 'cuanto', 'as much as (in a statement)'],
  ['sí', 'yes', 'si', 'if'],
  ['tú', 'you', 'tu', 'your'],
  ['él', 'he', 'el', 'the'],
  ['mí', 'me (after a preposition: para mí)', 'mi', 'my'],
  ['sé', 'I know (saber)', 'se', 'himself / herself (se llama)'],
  ['té', 'tea', 'te', 'you (te quiero)'],
  ['más', 'more', 'mas', 'but (old-fashioned)'],
  ['está', 'is (estar)', 'esta', 'this (feminine: esta casa)'],
  ['habló', 'he / she spoke', 'hablo', 'I speak'],
  ['año', 'year', 'ano', 'a different, rude word — never drop the ñ'],
  ['papá', 'dad', 'papa', 'potato'],
];

const DE: AccentPair[] = [
  ['schön', 'beautiful', 'schon', 'already'],
  ['zählen', 'to count', 'zahlen', 'to pay'],
  ['würde', 'would', 'wurde', 'became / was (done)'],
  ['könnte', 'could (would be able to)', 'konnte', 'could (was able to, past)'],
  ['drücken', 'to press / to push', 'drucken', 'to print'],
  ['Brüder', 'brothers', 'Bruder', 'brother'],
  ['Mütter', 'mothers', 'Mutter', 'mother'],
  ['Väter', 'fathers', 'Vater', 'father'],
  ['Töchter', 'daughters', 'Tochter', 'daughter'],
  ['Äpfel', 'apples', 'Apfel', 'apple'],
  ['fährt', 'drives (er fährt)', 'fahrt', 'drive! (to several people: ihr fahrt)'],
];

const FR: AccentPair[] = [
  ['où', 'where', 'ou', 'or'],
  ['à', 'to / at', 'a', 'has (il a)'],
  ['là', 'there', 'la', 'the / her'],
  ['dû', 'had to / owed (devoir)', 'du', 'some / of the'],
  ['sûr', 'sure', 'sur', 'on'],
  ['mûr', 'ripe', 'mur', 'wall'],
  ['dès', 'from (a time: dès lundi)', 'des', 'some / of the'],
  ['tâche', 'task', 'tache', 'stain'],
  ['parlé', 'spoken (j’ai parlé)', 'parle', 'speak / speaks (je parle)'],
];

/** Russian: ё is often written as е and the app accepts both; no pairs to warn about. */
const PAIRS: Record<string, AccentPair[]> = { es: ES, de: DE, fr: FR, ru: [] };

export const accentPairs = (): AccentPair[] => PAIRS[LANG] ?? [];

const lc = (s: string) => s.toLowerCase();
/** The pair a word belongs to (either spelling). */
export function accentPairOf(word: string): AccentPair | undefined {
  const w = lc(word);
  return accentPairs().find(([a, , b]) => lc(a) === w || lc(b) === w);
}

/** Pairs whose words appear in a text (word list, sentences), so the lesson can teach them first. */
export function accentPairsIn(text: string): AccentPair[] {
  const words = new Set(lc(text).match(/\p{L}+/gu) ?? []);
  return accentPairs().filter(([a, , b]) => words.has(lc(a)) || words.has(lc(b)));
}

/** "dónde = where? (in questions) · donde = where (in a statement…)" */
export const explainPair = ([a, ae, b, be]: AccentPair) => `${a} = ${ae} · ${b} = ${be}`;
