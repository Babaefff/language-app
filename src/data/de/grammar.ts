import type { GrammarLesson } from '../types';
import { GRAMMAR_DE_A2 } from './grammar-a2';
import { GRAMMAR_DE_B1 } from './grammar-b1';

const GRAMMAR_DE_A1: GrammarLesson[] = [
  {
    id: 'de-g-verbs', level: 'A1', title: 'How German verbs work', titleEs: 'Stamm + Endung',
    summary: 'Every verb is a stem plus an ending: spiel-e, spiel-st, spiel-t…',
    blocks: [
      { t: 'text', md: `
## Stem + ending
German infinitives end in **-en** (a few in -n). Cut it off to get the **stem**: *spiel-en, wohn-en, lern-en*.
Then add an ending for the person. One set of endings works for almost every verb:` },
      { t: 'table', verbs: ['spielen', 'wohnen', 'lernen'], tense: 'presente', caption: 'Present tense of regular verbs' },
      { t: 'text', md: `
## What to notice
- **ich** always ends in **-e**: *ich spiele*.
- **wir** and **sie/Sie** look like the infinitive: *wir spielen, sie spielen*.
- **er/sie/es** and **ihr** both end in **-t**: *er spielt, ihr spielt*.

## Two small adjustments
- Stems ending in **-t / -d** add an **e** so you can pronounce them: *du arbeit**e**st, er arbeit**e**t*.
- Stems ending in **-s / -ß / -z** drop the **s** for du: *du heißt, du tanzt*.` },
      { t: 'table', verbs: ['arbeiten', 'heißen'], tense: 'presente', caption: 'The e-insertion and the s-rule' },
      { t: 'mistakes', items: [['Ich spielen Fußball.', 'Ich spiele Fußball.', 'Always conjugate: spielen is only the dictionary form.'], ['Du arbeitst.', 'Du arbeitest.', 'Stems in -t add an e.']] },
    ],
    practice: {
      conj: { verbs: ['spielen', 'wohnen', 'lernen', 'kaufen', 'machen', 'arbeiten', 'heißen', 'tanzen'], tenses: ['presente'], count: 10 },
      choice: [
        { q: 'Wir ___ in Berlin.', options: ['wohnen', 'wohnt', 'wohne'], answer: 0, en: 'We live in Berlin.' },
        { q: 'Du ___ sehr gut.', options: ['tanzt', 'tanzst', 'tanzen'], answer: 0, en: 'You dance very well.' },
      ],
    },
  },
  {
    id: 'de-g-sein-haben', level: 'A1', title: 'sein and haben', titleEs: 'sein und haben',
    summary: 'The two most important (and irregular) verbs — and du vs Sie.',
    blocks: [
      { t: 'table', verbs: ['sein', 'haben'], tense: 'presente', caption: 'Learn these two by heart' },
      { t: 'text', md: `
## Uses
- **sein**: who/what you are, nationality, job, age, mood — *Ich bin Lehrer. Ich bin 30. Ich bin müde.*
- **haben**: possession, family, time — *Ich habe einen Bruder. Ich habe keine Zeit.*
- Feelings with **haben**: *Ich habe Hunger / Durst / Angst* (I am hungry / thirsty / afraid).

## du, ihr, Sie
- **du** — one person you know well
- **ihr** — several people you know well
- **Sie** — formal, singular **and** plural; uses the same form as *sie* (they): *Sind Sie Herr Müller?*` },
      { t: 'mistakes', items: [['Ich habe 20 Jahre.', 'Ich bin 20 Jahre alt.', 'Age uses sein.'], ['Ich bin Hunger.', 'Ich habe Hunger.', 'Hunger, thirst and fear use haben.']] },
    ],
    practice: {
      conj: { verbs: ['sein', 'haben'], tenses: ['presente'], count: 8 },
      choice: [
        { q: 'Ich ___ 25 Jahre alt.', options: ['bin', 'habe'], answer: 0 },
        { q: 'Wir ___ zwei Kinder.', options: ['haben', 'sind'], answer: 0 },
        { q: '___ Sie Frau Schmidt?', options: ['Sind', 'Seid', 'Bist'], answer: 0 },
        { q: 'Ich ___ Durst.', options: ['habe', 'bin'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-gender', level: 'A1', title: 'der, die, das', titleEs: 'Das Genus',
    summary: 'Three genders — and the endings that tell you which one.',
    blocks: [
      { t: 'text', md: `
## Learn every noun with its article
German has three genders and all plurals use **die**. Some endings are reliable clues:

| always **die** | -ung, -heit, -keit, -schaft, -ion, -tät, -ei | die Wohnung, die Freiheit, die Information |
| always **das** | -chen, -lein (small things), -um, -ment | das Mädchen, das Zentrum, das Dokument |
| usually **der** | -er (people), -ling, -ismus; days, months, seasons | der Lehrer, der Montag, der Winter |
| usually **die** | -e | die Lampe, die Schule (but: der Name, der Käse) |

## Compound nouns
The **last** word decides the gender: *das Haus* + *die Tür* → **die** Haustür.

## Capital letters
Every noun starts with a capital letter — that's how you spot nouns when reading.` },
      { t: 'mistakes', items: [['die Mädchen (one girl)', 'das Mädchen', '-chen is always das, even for people.'], ['der Wohnung', 'die Wohnung', '-ung is always feminine.']] },
    ],
    practice: {
      choice: [
        { q: '___ Zeitung', options: ['die', 'der', 'das'], answer: 0 },
        { q: '___ Mädchen', options: ['das', 'die', 'der'], answer: 0 },
        { q: '___ Montag', options: ['der', 'die', 'das'], answer: 0 },
        { q: '___ Freiheit', options: ['die', 'der', 'das'], answer: 0 },
        { q: '___ Lehrer', options: ['der', 'die', 'das'], answer: 0 },
        { q: '___ Brötchen', options: ['das', 'der', 'die'], answer: 0 },
        { q: '___ Haustür', options: ['die', 'das', 'der'], answer: 0 },
        { q: '___ Information', options: ['die', 'der', 'das'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-vowel', level: 'A1', title: 'Verbs that change their vowel', titleEs: 'Verben mit Vokalwechsel',
    summary: 'fahren → du fährst, lesen → er liest: only du and er/sie/es change.',
    blocks: [
      { t: 'text', md: `
## Only two persons change
Some common verbs change the vowel of their stem — but **only for du and er/sie/es**. All the others are regular.
Three patterns:
| a → ä | fahren → fährt, schlafen → schläft, laufen → läuft |
| e → i | essen → isst, sprechen → spricht, nehmen → nimmt, geben → gibt, helfen → hilft |
| e → ie | lesen → liest, sehen → sieht |` },
      { t: 'table', verbs: ['fahren', 'sprechen', 'lesen'], tense: 'presente', caption: 'Highlighted = the changed stem' },
      { t: 'tip', md: 'If a dictionary lists *fahren (fährt)*, the verb changes its vowel. Learn the **er** form with the infinitive.' },
      { t: 'mistakes', items: [['Er fahrt nach Berlin.', 'Er fährt nach Berlin.', 'a → ä for du and er.'], ['Wir fähren.', 'Wir fahren.', 'wir never changes.']] },
    ],
    practice: {
      conj: { verbs: ['fahren', 'schlafen', 'laufen', 'essen', 'sprechen', 'nehmen', 'geben', 'helfen', 'lesen', 'sehen'], tenses: ['presente'], count: 12 },
    },
  },
  {
    id: 'de-g-word-order', level: 'A1', title: 'Word order: the verb is second', titleEs: 'Satzstellung',
    summary: 'The conjugated verb always sits in position 2 — the key rule of German.',
    blocks: [
      { t: 'text', md: `
## Verb in position 2
In a normal statement the conjugated verb is **always the second element**. Anything can go first — but then the subject moves behind the verb:

| 1 | **2 (verb)** | rest |
| Ich | **gehe** | heute ins Kino. |
| Heute | **gehe** | ich ins Kino. |
| Ins Kino | **gehe** | ich heute. |

## Questions
- Yes/no questions start with the verb: ***Gehst** du ins Kino?*
- W-questions: question word + verb: *Wann **gehst** du ins Kino?*

## nicht
*nicht* usually goes near the end, or before the word it negates: *Ich gehe heute **nicht**.* · *Das ist **nicht** gut.*` },
      { t: 'mistakes', items: [['Heute ich gehe ins Kino.', 'Heute gehe ich ins Kino.', 'The verb must be second.'], ['Du gehst ins Kino?', 'Gehst du ins Kino?', 'Yes/no questions start with the verb.']] },
    ],
    practice: {
      choice: [
        { q: 'Am Montag ___ ich.', options: ['arbeite', 'ich arbeite'], answer: 0, en: 'On Monday I work.' },
        { q: '___ du Deutsch?', options: ['Sprichst', 'Du sprichst'], answer: 0, en: 'Do you speak German?' },
        { q: 'Morgen ___ wir nach Berlin.', options: ['fahren', 'wir fahren'], answer: 0, en: 'Tomorrow we go to Berlin.' },
        { q: 'Wo ___ du?', options: ['wohnst', 'du wohnst'], answer: 0, en: 'Where do you live?' },
        { q: 'Das ist ___ gut.', options: ['nicht', 'kein'], answer: 0, en: "That's not good." },
      ],
    },
  },
  {
    id: 'de-g-accusative', level: 'A1', title: 'The accusative case', titleEs: 'Der Akkusativ',
    summary: 'Direct objects: only der changes — to den / einen.',
    blocks: [
      { t: 'text', md: `
## Subject vs object
The **subject** does the action (nominative). The **direct object** receives it (accusative).
*Der Mann kauft **den Apfel**.* — the man buys the apple.

Good news: **only masculine nouns change**.
| | nominative | accusative |
| masculine | der / ein / kein | **den / einen / keinen** |
| feminine | die / eine | die / eine |
| neuter | das / ein | das / ein |
| plural | die | die |

## Triggers
- verbs with an object: *haben, kaufen, essen, trinken, sehen, brauchen, möchten…*
- **es gibt**: *Es gibt **einen** Park.*
- prepositions **für, ohne, gegen, durch, um**: *für **den** Freund*` },
      { t: 'mistakes', items: [['Ich habe ein Bruder.', 'Ich habe einen Bruder.', 'der Bruder → einen after haben.'], ['Ich kaufe der Tisch.', 'Ich kaufe den Tisch.', 'Masculine direct objects take den.']] },
    ],
    practice: {
      choice: [
        { q: 'Ich trinke ___ Kaffee.', options: ['einen', 'ein', 'eine'], answer: 0 },
        { q: 'Wir kaufen ___ Brot.', options: ['ein', 'einen', 'eine'], answer: 0 },
        { q: 'Hast du ___ Hund?', options: ['einen', 'ein', 'eine'], answer: 0 },
        { q: 'Ich sehe ___ Frau.', options: ['die', 'den', 'der'], answer: 0 },
        { q: 'Das Geschenk ist für ___ Vater.', options: ['den', 'der', 'dem'], answer: 0 },
        { q: 'Ich habe ___ Zeit.', options: ['keine', 'keinen', 'kein'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-separable', level: 'A1', title: 'Separable verbs', titleEs: 'Trennbare Verben',
    summary: 'aufstehen → ich stehe … auf: the prefix jumps to the end.',
    blocks: [
      { t: 'text', md: `
## The prefix goes to the end
Verbs with prefixes like **an-, auf-, aus-, ein-, mit-, fern-, ab-, zu-** split in the present: the verb is in position 2, the prefix at the very end.` },
      { t: 'table', verbs: ['aufstehen', 'einkaufen'], tense: 'presente' },
      { t: 'text', md: `
## Examples
- *Ich **stehe** um 7 Uhr **auf**.*
- *Wir **kaufen** am Samstag **ein**.*
- *Der Zug **fährt** um 9 Uhr **ab**.*

## With a modal verb they stay together
*Ich **muss** morgen früh **aufstehen**.*

## Inseparable prefixes never split
**be-, ver-, er-, ent-, emp-, zer-, ge-**: *Ich **besuche** dich. Ich **verstehe** das.*` },
      { t: 'mistakes', items: [['Ich aufstehe um sieben.', 'Ich stehe um sieben auf.', 'The prefix goes to the end.'], ['Ich stehe auf um sieben.', 'Ich stehe um sieben auf.', 'The prefix goes to the very end.']] },
    ],
    practice: {
      conj: { verbs: ['aufstehen', 'einkaufen', 'anrufen', 'fernsehen', 'mitkommen', 'ankommen'], tenses: ['presente'], count: 10 },
    },
  },
  {
    id: 'de-g-modals', level: 'A1', title: 'Modal verbs', titleEs: 'Modalverben',
    summary: 'können, müssen, wollen… + an infinitive at the end.',
    blocks: [
      { t: 'table', verbs: ['können', 'müssen', 'wollen'], tense: 'presente' },
      { t: 'text', md: `
## Two things to remember
1. **ich** and **er/sie/es** are the same and have **no ending**: *ich kann, er kann*.
2. The second verb goes to the **end** as an infinitive: *Ich **kann** gut **schwimmen**.*

| können | can, to be able to |
| müssen | must, to have to |
| wollen | to want to |
| dürfen | may, to be allowed to |
| sollen | should, to be supposed to |
| möchten | would like to (polite) |` },
      { t: 'mistakes', items: [['Ich kann schwimmen gut.', 'Ich kann gut schwimmen.', 'The infinitive goes to the end.'], ['Er kannt Deutsch.', 'Er kann Deutsch.', 'Modals have no -t for er.']] },
    ],
    practice: {
      conj: { verbs: ['können', 'müssen', 'wollen', 'dürfen', 'sollen'], tenses: ['presente'], count: 10 },
      choice: [
        { q: 'Ich ___ heute arbeiten.', options: ['muss', 'müsse', 'musst'], answer: 0 },
        { q: '___ du mir helfen?', options: ['Kannst', 'Kann', 'Könnt'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-perfekt', level: 'A1', title: 'Talking about the past: Perfekt', titleEs: 'Das Perfekt',
    summary: 'haben/sein + participle — the everyday spoken past.',
    blocks: [
      { t: 'text', md: `
## haben or sein + participle at the end
*Ich **habe** Fußball **gespielt**.* — I played football.

**Regular** verbs: **ge- + stem + -t** → *gespielt, gemacht, gearbeitet*
**Irregular** verbs: **ge- + (changed) stem + -en** → *gegessen, getrunken, gesehen* — learn these.

No **ge-** for verbs in **-ieren** (*studiert*) or with be-/ver-/er- (*besucht, verstanden*).
Separable verbs put **ge** after the prefix: *auf**ge**standen, ein**ge**kauft*.` },
      { t: 'table', verbs: ['spielen', 'essen', 'fahren'], tense: 'perfecto' },
      { t: 'text', md: `
## sein or haben?
Most verbs use **haben**. Use **sein** for **movement from A to B** or a **change of state**:
*gehen, fahren, kommen, fliegen, laufen, aufstehen, werden* — plus *sein* and *bleiben*.
- *Ich **bin** nach Berlin **gefahren**.* · *Wir **sind** spät **aufgestanden**.*` },
      { t: 'mistakes', items: [['Ich habe nach Berlin gefahren.', 'Ich bin nach Berlin gefahren.', 'Movement uses sein.'], ['Ich habe gegesst.', 'Ich habe gegessen.', 'essen is irregular: gegessen.']] },
    ],
    practice: {
      conj: { verbs: ['spielen', 'machen', 'arbeiten', 'essen', 'trinken', 'sehen', 'fahren', 'gehen', 'kommen', 'aufstehen'], tenses: ['perfecto'], count: 12 },
      choice: [
        { q: 'Gestern ___ ich ins Kino gegangen.', options: ['bin', 'habe'], answer: 0 },
        { q: 'Wir ___ Pizza gegessen.', options: ['haben', 'sind'], answer: 0 },
      ],
    },
  },
];

export const GRAMMAR_DE: GrammarLesson[] = [...GRAMMAR_DE_A1, ...GRAMMAR_DE_A2, ...GRAMMAR_DE_B1];
