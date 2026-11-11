import { whyFor } from '../data/grammar-why';
import type { ChoiceQuestion, GrammarLesson, Sentence, Tense, Unit, Word } from '../data/types';
import { UNIT_MAP, WORDS, lookupWord } from '../data/course';
import { content } from '../data/content';
import { VERB_MAP } from '../data/verbs';
import { conjugate, lookupForm, personLabelsFor, TENSE_MAP } from './conjugate';
import { checkAnswer, normalize, sample, shuffle } from './text';
import { L, LANG } from '../data/lang';

export type Exercise =
  | { kind: 'choice'; key: string; prompt: string; label: string; audio?: string; options: string[]; answer: string; wordId?: string; optionsSpanish: boolean; hint?: string; base?: string; promptSpanish?: boolean; typed?: boolean; why?: string; accept?: string[] }
  /** from: set on review words from an earlier unit, shown as a tag so they never look like a mistake. */
  /** accept: other right answers (course words with the same English, e.g. el marido / el esposo). */
  | { kind: 'type'; key: string; prompt: string; label: string; answer: string; wordId?: string; from?: string; accept?: string[]; why?: string; assessment?: 'context' | 'practice' }
  | { kind: 'listen'; key: string; answer: string; en: string; wordId: string; from?: string }
  | { kind: 'build'; key: string; en: string; es: string; tiles: string[] }
  | { kind: 'match'; key: string; pairs: { es: string; en: string; wordId: string }[] }
  /** options: choose the form (recognition) instead of typing it; why: all forms, shown after answering. */
  | { kind: 'conj'; key: string; inf: string; tense: Tense; person: number; answer: string; options?: string[]; why?: string }
  /** A study card: the full table of a verb before it is practised. Not scored. */
  | { kind: 'study'; key: string; inf: string; tense: Tense }
  /** Say a sentence aloud (speech recognition checks which words were understood). */
  | { kind: 'speak'; key: string; es: string; en: string };

let seq = 0;
const key = () => `x${++seq}`;

/** The meanings in an English gloss: "the time (of day) / hour" → the time of day, the time, hour. */
function meanings(en: string): string[] {
  const out = new Set<string>();
  for (const part of en.toLowerCase().split(/\s*[/;]\s*/)) {
    const p = part.trim();
    if (!p) continue;
    out.add(p.replace(/[()]/g, '').replace(/\s+/g, ' ').trim());
    out.add(p.replace(/\s*\([^)]*\)/g, '').trim());
  }
  return [...out].filter(Boolean);
}
/** Two words share a meaning ("what" and "which / what"): never a wrong option for each other. */
const sameEn = (a: Word, b: Word) => { const m = meanings(b.en); return meanings(a.en).some((x) => m.includes(x)); };

/** Gender, formality and similar markers in a gloss: "(m)", "(female)", "(formal)", "(to a friend)". */
const markers = (en: string) => (en.toLowerCase().match(/\(([^)]*)\)/g) ?? []).map((x) => x.slice(1, -1).trim());
const CLASH = [['m', 'f'], ['male', 'female'], ['masc', 'fem'], ['formal', 'informal'], ['singular', 'plural'], ['sg', 'pl']];
/** The same meaning and no clashing markers: "the husband" = "the husband / spouse"; not "which / what (m)" =
 * "which / what (f)", and not "who / which" = "which / what" (they only share one of their meanings). */
const sameMeaning = (a: Word, b: Word) => {
  // Every meaning of one is a meaning of the other ("to start" ⊂ "to begin / to start").
  const ma0 = meanings(a.en), mb0 = meanings(b.en);
  if (!ma0.every((x) => mb0.includes(x)) && !mb0.every((x) => ma0.includes(x))) return false;
  const ma = markers(a.en), mb = markers(b.en);
  return !CLASH.some(([x, y]) => (ma.includes(x) && mb.includes(y)) || (ma.includes(y) && mb.includes(x)));
};

/** Other course words that mean exactly the same in English: both are right answers. */
export function synonymsOf(word: Word): string[] {
  return WORDS.filter((w) => w.id !== word.id && sameMeaning(w, word)).map((w) => w.es);
}

function distractors(word: Word, pool: Word[], field: 'es' | 'en', n = 3): string[] {
  const seen = new Set([normalize(word[field])]);
  const out: string[] = [];
  for (const w of shuffle(pool)) {
    if (out.length >= n) break;
    // Never offer a synonym as a "wrong" option: it would also be right.
    if (sameEn(w, word)) continue;
    // Nor the answer itself in another spelling ("français" next to "le français").
    if (field === 'es' && (checkAnswer(w.es, word.es).ok || checkAnswer(word.es, w.es).ok)) continue;
    const k = normalize(w[field]);
    if (!seen.has(k)) {
      seen.add(k);
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
    kind: 'choice', key: key(), label: `Choose the ${L.name}`, prompt: word.en,
    options: shuffle([word.es, ...distractors(word, poolFor(word), 'es')]), answer: word.es, wordId: word.id, optionsSpanish: true, accept: synonymsOf(word),
  };
}

export function typeEnEs(word: Word): Exercise {
  return { kind: 'type', key: key(), label: `Write in ${L.name}`, prompt: word.en, answer: word.es, wordId: word.id, accept: synonymsOf(word) };
}

export function listen(word: Word): Exercise {
  return { kind: 'listen', key: key(), answer: word.es, en: word.en, wordId: word.id };
}

/**
 * A word as a tile: no full stop, question mark or ¿ ¡ (they would show which word ends or starts
 * the sentence) and the first word in lower case, unless it is always written with a capital
 * (a German noun, Sie, a name). Answers are compared without case and punctuation anyway.
 */
export function asTile(word: string, first: boolean): string {
  let t = word.replace(/^[¿¡]+/, '').replace(/[.!?…]+$/, '');
  if (!t) return word;
  if (first && /^\p{Lu}/u.test(t) && !keepsCapital(t)) t = t.charAt(0).toLowerCase() + t.slice(1);
  return t;
}
function keepsCapital(w: string): boolean {
  const bare = w.replace(/[,;:"«»]/g, '');
  if (LANG === 'de') {
    if (bare === 'Sie' || bare === 'Ihr' || /^Ihr(e|en|em|er|es)?$/.test(bare)) return true;
    const x = lookupWord(bare, false);
    if (x && /^(der|die|das) /i.test(x.es)) return true;
  }
  if (bare === 'I') return true;
  // A known word or verb form is an ordinary word; anything else capitalised is likely a name.
  const known = !!lookupWord(bare, false) || lookupForm(bare.toLowerCase()).length > 0 || !!content().smallWords?.[bare.toLowerCase()];
  return !known;
}

export function build(sentence: Sentence, extraWords: Word[] = []): Exercise {
  // A lone "?" or "!" (French puts a space before them) is not a word: no tile for it.
  const tokens = sentence.es.split(' ').filter((t) => /\p{L}|\p{N}/u.test(t)).map((t, i) => asTile(t, i === 0));
  const lower = new Set(tokens.map((t) => normalize(t)));
  const extras = sample(extraWords, 8)
    .map((w) => w.es.replace(/^(el|la|los|las|der|die|das|le|les|l') ?/i, ''))
    .map((t) => asTile(t, false))
    .filter((t) => !t.includes(' ') && !lower.has(normalize(t)))
    .slice(0, 2);
  return { kind: 'build', key: key(), en: sentence.en, es: sentence.es, tiles: shuffle([...tokens, ...extras]) };
}

export function match(words: Word[]): Exercise {
  // Two words with the same meaning would make the pairs ambiguous: keep the first of them.
  const kept: Word[] = [];
  for (const w of words) if (!kept.some((k) => sameEn(k, w) || normalize(k.es) === normalize(w.es))) kept.push(w);
  return { kind: 'match', key: key(), pairs: kept.map((w) => ({ es: w.es, en: w.en, wordId: w.id })) };
}

/** "yo hablo · tú hablas · …": every form of a verb, shown after a conjugation answer. */
export function paradigm(inf: string, tense: Tense): string {
  const forms = conjugate(inf, tense);
  const labels = personLabelsFor(tense);
  return `${inf}: ` + forms.map((f, i) => (f ? `${labels[i]} ${f}` : null)).filter(Boolean).join(' · ');
}

/** One conjugation question. "choose" shows three forms of the same verb to pick from; "type" asks for it. */
export function conjItem(inf: string, tense: Tense, mode: 'choose' | 'type' = 'type', avoid: number[] = []): Exercise | null {
  if (!VERB_MAP[inf]) return null;
  const forms = conjugate(inf, tense);
  const persons = forms.map((f, i) => (f ? i : -1)).filter((i) => i >= 0);
  if (!persons.length) return null;
  const fresh = persons.filter((i) => !avoid.includes(i));
  const pool = fresh.length ? fresh : persons;
  const person = pool[Math.floor(Math.random() * pool.length)];
  const answer = forms[person]!;
  const why = paradigm(inf, tense);
  if (mode === 'choose') {
    const others = shuffle([...new Set(forms.filter((f): f is string => !!f && f !== answer))]).slice(0, 2);
    if (others.length) return { kind: 'conj', key: key(), inf, tense, person, answer, options: shuffle([answer, ...others]), why };
  }
  return { kind: 'conj', key: key(), inf, tense, person, answer, why };
}

/** See it, recognise it, then produce it: a study card, two "choose" questions, then typing. */
export function conjSet(inf: string, tense: Tense, typed = 2): Exercise[] {
  if (!VERB_MAP[inf]) return [];
  const out: Exercise[] = [{ kind: 'study', key: key(), inf, tense }];
  const used: number[] = [];
  const add = (mode: 'choose' | 'type') => {
    const ex = conjItem(inf, tense, mode, used);
    if (ex && ex.kind === 'conj') { used.push(ex.person); out.push(ex); }
  };
  add('choose'); add('choose');
  for (let i = 0; i < typed; i++) add('type');
  return out;
}

export const personLabel = (tense: Tense, person: number) => personLabelsFor(tense)[person];
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

export function stepExercises(unit: Unit, step: number, review: Word[] = []): Exercise[] {
  const words = shuffle(unit.words);
  if (step === 0) {
    const [first, second] = chunks(shuffle(unit.words), 4);
    const recog = words.map(choiceEsEn);
    const mid = Math.floor(recog.length / 2);
    return [...recog.slice(0, mid), ...(first ? [match(first)] : []), ...recog.slice(mid), ...(second ? [match(second)] : [])];
  }
  if (step === 1) {
    const practice = words.map((w, i) => (i % 3 === 0 ? typeEnEs(w) : i % 3 === 1 ? listen(w) : choiceEnEs(w)));
    // Interleaving: mix in a few older words that are due, so earlier units stay fresh.
    const old = shuffle(review).slice(0, 4).map((w) => ({ ...(Math.random() < 0.5 ? typeEnEs(w) : listen(w)), from: UNIT_MAP[w.unitId]?.title ?? 'an earlier lesson' }));
    return shuffle([...practice, ...old]);
  }
  // Sentences: build every sentence from tiles first, then write two of them yourself.
  const sentences = shuffle(unit.sentences);
  const builds = sentences.map((s) => build(s, unit.words));
  const writeAgain = sentences.slice(0, 2).map((s): Exercise => ({ kind: 'type', key: key(), label: `Now write it yourself in ${L.name}`, prompt: s.en, answer: s.es }));
  // Speaking: say two short sentences aloud (left out where the browser can't listen).
  const speakIt = shuffle(sentences.filter((s) => s.es.split(' ').length <= 8)).slice(0, 2).map((s): Exercise => ({ kind: 'speak', key: key(), es: s.es, en: s.en }));
  // Verbs: for each verb, first the table, then choosing forms, then typing one.
  const conj = unit.conj;
  const verbBlocks = conj ? conj.verbs.slice(0, 3).map((v, i) => conjSet(v, conj.tenses[i % conj.tenses.length], 1)).filter((b) => b.length) : [];
  // Alternate a verb block with a few sentence builds; written sentences come last.
  const out: Exercise[] = [];
  const per = Math.ceil(builds.length / (verbBlocks.length + 1));
  let at = 0;
  for (const block of verbBlocks) {
    out.push(...block, ...builds.slice(at, at + per));
    at += per;
  }
  out.push(...builds.slice(at), ...speakIt, ...writeAgain);
  return out;
}

/** One exercise for a word in review, harder as the card gets stronger. */
export function reviewExercise(word: Word, reps: number): Exercise {
  if (reps <= 1) return Math.random() < 0.5 ? choiceEsEn(word) : choiceEnEs(word);
  const r = Math.random();
  return r < 0.4 ? typeEnEs(word) : r < 0.75 ? listen(word) : choiceEnEs(word);
}

/** A fill-the-gap grammar question, e.g. "Ana ___ cansada." → es / está. */
/** Words of the course by their written form (articles dropped), to look up a gap answer. */
let wordIndex: Map<string, Word> | null = null;
const plain = (t: string) => t.toLowerCase().replace(/[.,!?¿¡«»"]/g, '').trim();
function courseWord(t: string): Word | undefined {
  if (!wordIndex) {
    wordIndex = new Map();
    for (const w of WORDS) {
      const k = plain(w.es);
      wordIndex.set(k, w);
      wordIndex.set(k.replace(/^(el|la|los|las|der|die|das|le|la|les|l')\s*/, ''), w);
    }
  }
  return wordIndex.get(plain(t));
}

/**
 * The dictionary form behind a gap answer, with its meaning: "tanzt" → tanzen (to dance).
 * Typed gaps show it, the way grammar books write "Du ___ (tanzen) sehr gut", so a learner is
 * never asked to produce a word they were not given.
 */
export function baseWordFor(answer: string): { word: string; en: string } | null {
  const words = plain(answer).split(/\s+/);
  for (const t of [plain(answer), ...words.slice().reverse()]) {
    const infs = [...new Set(lookupForm(t).map((f) => f.inf))].filter((i) => VERB_MAP[i]);
    if (infs.length) return { word: infs.slice(0, 2).join(' / '), en: infs.slice(0, 2).map((i) => VERB_MAP[i].en).join(' / ') };
    if (VERB_MAP[t]) return { word: t, en: VERB_MAP[t].en };
  }
  const w = courseWord(answer);
  return w ? { word: w.es, en: w.en } : null;
}

/** Everything a grammar lesson shows before its practice: text, examples, tables and their forms. */
export function lessonText(lesson: GrammarLesson): string {
  let txt = '';
  for (const b of lesson.blocks) {
    if ('md' in b) txt += ' ' + b.md;
    if (b.t === 'examples') txt += ' ' + b.items.flat().join(' ');
    if (b.t === 'mistakes') txt += ' ' + b.items.flat().join(' ');
    if (b.t === 'table') for (const v of b.verbs) { txt += ' ' + v; try { txt += ' ' + conjugate(v, b.tense).filter(Boolean).join(' '); } catch { /* unknown verb */ } }
  }
  return txt.toLowerCase().replace(/\*/g, '');
}
const shown = (text: string, answer: string) =>
  new RegExp(`(^|[^\\p{L}])${plain(answer).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^\\p{L}])`, 'u').test(text);

/**
 * A gap question. Typed only when the learner can know the answer: either the base word is given
 * as a hint (and isn't itself the answer), or the exact answer was shown in the lesson.
 * Otherwise it stays multiple choice, where the options show the forms to pick from.
 */
export function gapChoice(q: ChoiceQuestion, typed = false, text = ''): Exercise {
  const answer = q.options[q.answer];
  const gap = q.q.includes('___');
  const base = gap ? baseWordFor(answer) : null;
  const hintable = !!base && plain(base.word) !== plain(answer);
  const canType = typed && gap && (hintable || (!!text && shown(text, answer)));
  return {
    kind: 'choice', key: key(), label: 'Choose the right word', prompt: q.q, hint: q.en,
    base: canType && hintable ? `${base!.word} — ${base!.en}` : undefined,
    // Gap-fill questions are Spanish; "what does X mean?" questions have English options.
    options: shuffle(q.options), answer, optionsSpanish: gap, promptSpanish: gap,
    // Every other gap question must be typed: recall is stronger than recognition.
    typed: canType,
    why: whyFor(q.q, answer),
  };
}

/** Every verb and word a grammar lesson uses, with its meaning, shown before the practice. */
export function lessonGlossary(lesson: GrammarLesson): { word: string; en: string }[] {
  const out = new Map<string, string>();
  const add = (w: string, en?: string) => { if (en && !out.has(w)) out.set(w, en); };
  for (const b of lesson.blocks) if (b.t === 'table') for (const v of b.verbs) add(v, VERB_MAP[v]?.en);
  for (const v of lesson.practice.conj?.verbs ?? []) add(v, VERB_MAP[v]?.en);
  for (const q of lesson.practice.choice ?? []) {
    if (!q.q.includes('___')) continue;
    const b = baseWordFor(q.options[q.answer]);
    if (b) add(b.word, b.en);
  }
  return [...out].map(([word, en]) => ({ word, en }));
}

/** Grammar practice: choose first, then the verbs (table → choose → type), and only then type gap answers. */
export function grammarExercises(lesson: GrammarLesson): Exercise[] {
  const qs = shuffle(lesson.practice.choice ?? []);
  const half = Math.ceil(qs.length / 2);
  const text = lessonText(lesson);
  const chosen = qs.slice(0, half).map((q) => gapChoice(q, false, text));
  const typed = qs.slice(half).map((q) => gapChoice(q, true, text));
  const c = lesson.practice.conj;
  const verbs = c ? c.verbs.slice(0, 2).flatMap((v, i) => conjSet(v, c.tenses[i % c.tenses.length], 1)) : [];
  return [...chosen, ...verbs, ...typed];
}
