import type { GrammarLesson } from '../types';

export const GRAMMAR_DE_MORE_A1: GrammarLesson[] = [
  {
    id: 'de-g-plural', level: 'A1', title: 'Plurals', titleEs: 'Der Plural',
    summary: 'Five plural patterns — and a few rules of thumb to guess them.',
    blocks: [
      { t: 'text', md: `
## The plural article is always die
*der Hund → **die** Hunde · die Katze → **die** Katzen · das Kind → **die** Kinder*

## Five patterns
| ending | example | typical for |
| **-e** (often + umlaut) | der Tag → die Tag**e**, die Hand → die H**ä**nd**e** | masculine, one-syllable nouns |
| **-(e)n** | die Frau → die Frau**en**, die Blume → die Blume**n** | almost all feminine nouns |
| **-er** (+ umlaut) | das Kind → die Kind**er**, das Buch → die B**ü**ch**er** | short neuter nouns |
| **–** (maybe umlaut) | der Lehrer → die Lehrer, der Vater → die V**ä**ter | nouns in -er, -el, -en |
| **-s** | das Auto → die Auto**s**, das Handy → die Handy**s** | foreign words, words ending in a vowel |

## Dative plural adds -n
*mit den Kinder**n**, mit meinen Freunde**n*** — unless the plural already ends in -n or -s.` },
      { t: 'tip', md: 'Learn every noun as a trio: **der Tisch, die Tische**. Dictionaries write it as *Tisch, der; -e*.' },
      { t: 'mistakes', items: [['die Kinds', 'die Kinder', 'Only foreign words and words ending in a vowel take -s.'], ['Ich spiele mit den Kinder.', 'Ich spiele mit den Kindern.', 'Dative plural adds -n.']] },
    ],
    practice: {
      choice: [
        { q: 'das Buch → die ___', options: ['Bücher', 'Buchs', 'Buchen'], answer: 0 },
        { q: 'die Frau → die ___', options: ['Frauen', 'Fraue', 'Fraus'], answer: 0 },
        { q: 'das Auto → die ___', options: ['Autos', 'Autoen', 'Äuter'], answer: 0 },
        { q: 'der Lehrer → die ___', options: ['Lehrer', 'Lehrers', 'Lehreren'], answer: 0 },
        { q: 'der Tag → die ___', options: ['Tage', 'Tags', 'Täger'], answer: 0 },
        { q: 'Ich spreche mit meinen ___.', options: ['Freunden', 'Freunde', 'Freund'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-negation', level: 'A1', title: 'Saying no: nicht or kein?', titleEs: 'Verneinung: nicht oder kein',
    summary: 'kein replaces ein (or no article); nicht negates everything else.',
    blocks: [
      { t: 'text', md: `
## kein = "not a / no"
Use **kein** where you would say **ein** or nothing at all:
- *Ich habe **ein** Auto. → Ich habe **kein** Auto.*
- *Ich habe Zeit. → Ich habe **keine** Zeit.*
- *Das sind Äpfel. → Das sind **keine** Äpfel.*

**kein** takes the same endings as **ein**: kein / keine / kein, accusative **keinen**.

## nicht = "not"
Everything else: verbs, adjectives, names, nouns with **der/die/das** or **mein**:
- *Ich komme **nicht**.* · *Das ist **nicht** teuer.* · *Das ist **nicht** mein Hund.*

## Where does nicht go?
- At the end, to negate the whole sentence: *Ich verstehe dich **nicht**.*
- Before adjectives, places and the second verb part: *Er ist **nicht** müde. Ich wohne **nicht** in Berlin. Ich kann **nicht** schwimmen.*` },
      { t: 'tip', md: 'Answering a negative question with "yes" uses **doch**: *Kommst du nicht? — **Doch**, ich komme!*' },
      { t: 'mistakes', items: [['Ich habe nicht Auto.', 'Ich habe kein Auto.', 'No article → kein.'], ['Ich habe nicht einen Bruder.', 'Ich habe keinen Bruder.', 'nicht + ein becomes kein.']] },
    ],
    practice: {
      choice: [
        { q: 'Ich habe ___ Hunger.', options: ['keinen', 'nicht', 'kein'], answer: 0 },
        { q: 'Das ist ___ mein Buch.', options: ['nicht', 'kein', 'keine'], answer: 0 },
        { q: 'Wir haben ___ Zeit.', options: ['keine', 'nicht', 'keinen'], answer: 0 },
        { q: 'Er kommt heute ___.', options: ['nicht', 'kein', 'keine'], answer: 0 },
        { q: 'Das ist ___ Problem.', options: ['kein', 'nicht', 'keinen'], answer: 0 },
        { q: 'Kommst du nicht mit? — ___, ich komme mit!', options: ['Doch', 'Ja', 'Nein'], answer: 0 },
      ],
    },
  },
];

export const GRAMMAR_DE_MORE_A2: GrammarLesson[] = [
  {
    id: 'de-g-imperative', level: 'A2', title: 'Giving instructions', titleEs: 'Der Imperativ',
    summary: 'Three forms — du, ihr, Sie — built from the present tense.',
    blocks: [
      { t: 'text', md: `
## Build it from the present tense
| | present | imperative |
| **du** | du kommst | **Komm!** (drop -st and du) |
| **ihr** | ihr kommt | **Kommt!** (drop ihr) |
| **Sie** | Sie kommen | **Kommen Sie!** (swap the order) |

## Watch out
- e → i verbs keep the change for du: *du nimmst → **Nimm!** · du liest → **Lies!***
- a → ä verbs lose the umlaut: *du fährst → **Fahr!** · du schläfst → **Schlaf!***
- Separable prefixes go to the end: **Ruf** mich morgen **an**!
- **sein** is irregular: *Sei ruhig! · Seid leise! · Seien Sie pünktlich!*

## Softening it
Add **bitte**, **mal** or **doch**: *Komm **doch mal** vorbei!* — Do come round!` },
      { t: 'table', verbs: ['machen', 'nehmen', 'fahren', 'sein'], tense: 'imperativo' },
      { t: 'mistakes', items: [['Nehme das Buch!', 'Nimm das Buch!', 'e → i verbs keep the i in the du form.'], ['Du komm!', 'Komm!', 'No pronoun with the du-imperative.']] },
    ],
    practice: {
      choice: [
        { q: '(du, kommen) ___ bitte her!', options: ['Komm', 'Kommst', 'Kommen'], answer: 0 },
        { q: '(du, lesen) ___ den Text!', options: ['Lies', 'Les', 'Liest'], answer: 0 },
        { q: '(Sie, warten) ___ bitte!', options: ['Warten Sie', 'Sie warten', 'Wartet'], answer: 0 },
        { q: '(ihr, sein) ___ bitte leise!', options: ['Seid', 'Sei', 'Seien'], answer: 0 },
        { q: '(du, anrufen) ___ mich morgen ___!', options: ['Ruf … an', 'Anruf … –', 'Rufst … an'], answer: 0 },
        { q: '(du, fahren) ___ langsam!', options: ['Fahr', 'Fähr', 'Fährst'], answer: 0 },
      ],
      conj: { verbs: ['machen', 'nehmen', 'geben', 'sprechen'], tenses: ['imperativo'], count: 4 },
    },
  },
];

export const GRAMMAR_DE_MORE_B1: GrammarLesson[] = [
  {
    id: 'de-g-connectors', level: 'B1', title: 'Linking ideas: obwohl, trotzdem, deshalb', titleEs: 'Konnektoren',
    summary: 'Three kinds of connectors — and each one puts the verb somewhere else.',
    blocks: [
      { t: 'text', md: `
## 1. Position 0: und, aber, oder, denn, sondern
They don't count — normal word order follows:
*Ich bleibe zu Hause, **denn** ich **bin** krank.*

## 2. Verb to the end: weil, obwohl, dass, wenn, als, während, damit
*Ich gehe joggen, **obwohl** es **regnet**.* — although it's raining.
*Ich spare, **damit** ich ein Auto kaufen **kann**.* — so that I can buy a car.

## 3. Adverbs in position 1: deshalb, trotzdem, dann, außerdem, sonst
They take position 1, so the verb comes straight after:
*Es regnet. **Trotzdem gehe** ich joggen.* — Nevertheless I go jogging.
*Ich bin krank. **Deshalb bleibe** ich zu Hause.* — That's why I'm staying at home.

| reason | weil (end) · denn (pos. 0) · deshalb (pos. 1) |
| contrast | obwohl (end) · aber (pos. 0) · trotzdem (pos. 1) |` },
      { t: 'tip', md: '**obwohl** and **trotzdem** say the same thing from opposite sides: *Obwohl es regnet, … = Es regnet. Trotzdem …*' },
      { t: 'mistakes', items: [['Deshalb ich bleibe zu Hause.', 'Deshalb bleibe ich zu Hause.', 'deshalb takes position 1 → verb second.'], ['Ich komme, obwohl ich bin müde.', 'Ich komme, obwohl ich müde bin.', 'obwohl sends the verb to the end.']] },
    ],
    practice: {
      choice: [
        { q: 'Es regnet. ___ gehe ich spazieren.', options: ['Trotzdem', 'Obwohl', 'Weil'], answer: 0 },
        { q: 'Ich bleibe zu Hause, ___ ich krank bin.', options: ['weil', 'deshalb', 'trotzdem'], answer: 0 },
        { q: 'Er ist müde, ___ er arbeitet weiter.', options: ['aber', 'obwohl', 'deshalb'], answer: 0 },
        { q: 'Ich habe kein Geld. Deshalb ___ ich nicht.', options: ['reise', 'ich reise', 'reisen'], answer: 0 },
        { q: '___ sie wenig Zeit hat, hilft sie mir.', options: ['Obwohl', 'Trotzdem', 'Denn'], answer: 0 },
        { q: 'Ich lerne viel, ___ ich die Prüfung bestehe.', options: ['damit', 'denn', 'sonst'], answer: 0 },
      ],
    },
  },
];
