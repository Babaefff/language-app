import type { Sentence, Tense, Unit, Word } from '../data/types';
import { WORDS } from '../data/course';
import { VERB_MAP } from '../data/verbs';
import { conjugate, IMP_PERSONS, PERSONS, TENSE_MAP } from './conjugate';
import { sample, shuffle } from './text';

export type Exercise =
  | { kind: 'choice'; key: string; prompt: string; label: string; audio?: string; options: string[]; answer: string; wordId?: string; optionsSpanish: boolean }
  | { kind: 'type'; key: string; prompt: string; label: string; answer: string; wordId?: string }
  | { kind: 'listen'; key: string; answer: string; en: string; wordId: string }
  | { kind: 'build'; key: string; en: string; es: string; tiles: string[] }
  | { kind: 'match'; key: string; pairs: { es: string; en: string; wordId: string }[] }
  | { kind: 'conj'; key: string; inf: string; tense: Tense; person: number; answer: string };

let seq = 0;
const key = () => `x${++seq}`;

function distractors(word: Word, pool: Word[], field: 'es' | 'en', n = 3): string[] {
  const seen = new Set([word[field]]);
  const out: string[] = [];
  for (const w of shuffle(pool)) {
    if (out.length >= n) break;
    if (!seen.has(w[field])) {
      seen.add(w[field]);
      out.push(w[field]);
    }
  }
  return out;
}

/** Distractor pool: same unit first, then same level, so wrong options are plausible. */
function poolFor(word: Word): Word[] {
  const unit = WORDS.filter((w) => w.unitId === word.unitId && w.id !== word.id);
  if (unit.length >= 6) return unit;
  return [...unit, ...WORDS.filter((w) => w.level === word.level && w.unitId !== word.unitId)];
}

export function choiceEsEn(word: Word): Exercise {
  return {
    kind: 'choice', key: key(), label: 'What does this mean?', prompt: word.es, audio: word.es,
    options: shuffle([word.en, ...distractors(word, poolFor(word), 'en')]), answer: word.en, wordId: word.id, optionsSpanish: false,
  };
}

export function choiceEnEs(word: Word): Exercise {
  return {
    kind: 'choice', key: key(), label: 'Choose the Spanish', prompt: word.en,
    options: shuffle([word.es, ...distractors(word, poolFor(word), 'es')]), answer: word.es, wordId: word.id, optionsSpanish: true,
  };
}

export function typeEnEs(word: Word): Exercise {
  return { kind: 'type', key: key(), label: 'Write in Spanish', prompt: word.en, answer: word.es, wordId: word.id };
}

export function listen(word: Word): Exercise {
  return { kind: 'listen', key: key(), answer: word.es, en: word.en, wordId: word.id };
}

export function build(sentence: Sentence, extraWords: Word[] = []): Exercise {
  const tokens = sentence.es.split(' ');
  const lower = new Set(tokens.map((t) => t.toLowerCase()));
  const extras = sample(extraWords, 8)
    .map((w) => w.es.replace(/^(el|la|los|las) /, ''))
    .filter((t) => !t.includes(' ') && !lower.has(t.toLowerCase()))
    .slice(0, 2);
  return { kind: 'build', key: key(), en: sentence.en, es: sentence.es, tiles: shuffle([...tokens, ...extras]) };
}

export function match(words: Word[]): Exercise {
  return { kind: 'match', key: key(), pairs: words.map((w) => ({ es: w.es, en: w.en, wordId: w.id })) };
}

export function conjItem(inf: string, tense: Tense): Exercise | null {
  if (!VERB_MAP[inf]) return null;
  const forms = conjugate(inf, tense);
  const persons = forms.map((f, i) => (f ? i : -1)).filter((i) => i >= 0);
  if (!persons.length) return null;
  const person = persons[Math.floor(Math.random() * persons.length)];
  return { kind: 'conj', key: key(), inf, tense, person, answer: forms[person]! };
}

export const personLabel = (tense: Tense, person: number) => (tense === 'imperativo' ? IMP_PERSONS : PERSONS)[person];
export const tenseLabel = (tense: Tense) => TENSE_MAP[tense].es;

function chunks<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out.filter((c) => c.length >= 3);
}

/** Unit steps: 0 = learn words, 1 = practise words, 2 = sentences & verbs. */
export const STEPS = [
  { title: 'Learn the words', description: 'Flashcards with audio, then a recognition quiz.' },
  { title: 'Practise', description: 'Listen, choose and write the new words.' },
  { title: 'Grammar, sentences & verbs', description: 'Read the grammar note, build sentences and conjugate.' },
] as const;

export function stepExercises(unit: Unit, step: number): Exercise[] {
  const words = shuffle(unit.words);
  if (step === 0) {
    const [first, second] = chunks(shuffle(unit.words), 4);
    const recog = words.map(choiceEsEn);
    const mid = Math.floor(recog.length / 2);
    return [...recog.slice(0, mid), ...(first ? [match(first)] : []), ...recog.slice(mid), ...(second ? [match(second)] : [])];
  }
  if (step === 1) {
    return words.map((w, i) => (i % 3 === 0 ? typeEnEs(w) : i % 3 === 1 ? listen(w) : choiceEnEs(w)));
  }
  const builds = unit.sentences.map((s) => build(s, unit.words));
  const conj: Exercise[] = [];
  if (unit.conj) {
    for (let i = 0; i < 6; i++) {
      const inf = unit.conj.verbs[i % unit.conj.verbs.length];
      const tense = unit.conj.tenses[i % unit.conj.tenses.length];
      const ex = conjItem(inf, tense);
      if (ex) conj.push(ex);
    }
  }
  return shuffle([...builds, ...shuffle(conj)]);
}

/** One exercise for a word in review, harder as the card gets stronger. */
export function reviewExercise(word: Word, reps: number): Exercise {
  if (reps <= 1) return Math.random() < 0.5 ? choiceEsEn(word) : choiceEnEs(word);
  const r = Math.random();
  return r < 0.4 ? typeEnEs(word) : r < 0.75 ? listen(word) : choiceEnEs(word);
}
