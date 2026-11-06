import type { GrammarLesson } from '../types';

export const GRAMMAR_DE_A2: GrammarLesson[] = [
  {
    id: 'de-g-dative', level: 'A2', title: 'The dative case', titleEs: 'Der Dativ',
    summary: 'To whom? dem / der / dem / den — after mit, bei, zu and verbs like helfen.',
    blocks: [
      { t: 'text', md: `
## The indirect object: to / for whom?
*Ich gebe **dem Mann** das Buch.* — I give the book **to the man**.

| | nominative | accusative | **dative** |
| masculine | der / ein | den / einen | **dem / einem** |
| feminine | die / eine | die / eine | **der / einer** |
| neuter | das / ein | das / ein | **dem / einem** |
| plural | die | die | **den** (+ -n on the noun) |

## Always dative after
- prepositions **aus, bei, mit, nach, seit, von, zu** (and **gegenüber**): *mit **dem** Bus, zu **der** Schule → zur Schule*
- verbs **helfen, danken, gefallen, gehören, antworten, schmecken**: *Ich helfe **dir**. Das gefällt **mir**.*` },
      { t: 'tip', md: 'Short forms: **zu + dem = zum**, **zu + der = zur**, **bei + dem = beim**, **von + dem = vom**.' },
      { t: 'mistakes', items: [['Ich fahre mit der Bus.', 'Ich fahre mit dem Bus.', 'mit always takes the dative: der Bus → dem Bus.'], ['Ich helfe dich.', 'Ich helfe dir.', 'helfen takes the dative.']] },
    ],
    practice: {
      choice: [
        { q: 'Ich fahre mit ___ Zug.', options: ['dem', 'den', 'der'], answer: 0 },
        { q: 'Sie wohnt bei ___ Eltern.', options: ['ihren', 'ihre', 'ihrem'], answer: 0 },
        { q: 'Das Buch gehört ___ Lehrerin.', options: ['der', 'die', 'dem'], answer: 0 },
        { q: 'Kannst du ___ helfen?', options: ['mir', 'mich', 'ich'], answer: 0 },
        { q: 'Ich gehe ___ Arzt.', options: ['zum', 'zur', 'zu den'], answer: 0 },
        { q: 'Wir kommen aus ___ Kino.', options: ['dem', 'das', 'den'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-pronouns', level: 'A2', title: 'Personal pronouns in all cases', titleEs: 'Personalpronomen',
    summary: 'ich – mich – mir: one table you will use every day.',
    blocks: [
      { t: 'text', md: `
## The three forms
| nominative | accusative | dative |
| ich | **mich** | **mir** |
| du | **dich** | **dir** |
| er | **ihn** | **ihm** |
| sie | sie | **ihr** |
| es | es | **ihm** |
| wir | **uns** | **uns** |
| ihr | **euch** | **euch** |
| sie / Sie | sie / Sie | **ihnen / Ihnen** |

- accusative after verbs with a direct object: *Ich liebe **dich**. Ich sehe **ihn**.*
- dative after dative verbs and prepositions: *Das gefällt **mir**. Kommst du mit **uns**?*

## Two pronouns: accusative first
*Ich gebe **es ihm**.* — I give it to him.` },
      { t: 'mistakes', items: [['Ich sehe er.', 'Ich sehe ihn.', 'Direct object → accusative ihn.'], ['Wie geht es dich?', 'Wie geht es dir?', 'gehen + person uses the dative.']] },
    ],
    practice: {
      choice: [
        { q: 'Ich liebe ___. (du)', options: ['dich', 'dir', 'du'], answer: 0 },
        { q: 'Das Kleid gefällt ___. (ich)', options: ['mir', 'mich', 'ich'], answer: 0 },
        { q: 'Hast du ___ gesehen? (er)', options: ['ihn', 'ihm', 'er'], answer: 0 },
        { q: 'Ich schenke ___ Blumen. (sie, she)', options: ['ihr', 'sie', 'ihnen'], answer: 0 },
        { q: 'Kommt ihr mit ___? (wir)', options: ['uns', 'wir', 'unser'], answer: 0 },
        { q: 'Wie geht es ___? (Sie)', options: ['Ihnen', 'Sie', 'Ihr'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-twoway', level: 'A2', title: 'Where? or Where to?', titleEs: 'Wechselpräpositionen',
    summary: 'in, auf, an, unter… take the dative for location and the accusative for movement.',
    blocks: [
      { t: 'text', md: `
## Nine "two-way" prepositions
**in, an, auf, unter, über, vor, hinter, neben, zwischen**

| question | case | example |
| **Wo?** (where — location) | dative | *Das Buch liegt **auf dem** Tisch.* |
| **Wohin?** (where to — movement) | accusative | *Ich lege das Buch **auf den** Tisch.* |

## Verb pairs
| location (Wo? + dative) | movement (Wohin? + accusative) |
| liegen — to lie | legen — to lay |
| stehen — to stand | stellen — to put (upright) |
| sitzen — to sit | setzen — to set / sit down |
| sein — to be | gehen / fahren — to go |

*Ich bin **im** Kino* (in dem) · *Ich gehe **ins** Kino* (in das).` },
      { t: 'mistakes', items: [['Ich gehe in dem Park.', 'Ich gehe in den Park.', 'Movement → accusative.'], ['Das Buch liegt auf den Tisch.', 'Das Buch liegt auf dem Tisch.', 'Location (liegen) → dative.']] },
    ],
    practice: {
      choice: [
        { q: 'Die Katze schläft auf ___ Sofa.', options: ['dem', 'das'], answer: 0 },
        { q: 'Ich stelle die Flasche auf ___ Tisch.', options: ['den', 'dem'], answer: 0 },
        { q: 'Wir gehen heute ___ Kino.', options: ['ins', 'im'], answer: 0 },
        { q: 'Mein Auto steht vor ___ Haus.', options: ['dem', 'das'], answer: 0 },
        { q: 'Häng das Bild an ___ Wand!', options: ['die', 'der'], answer: 0 },
        { q: 'Er sitzt ___ Garten.', options: ['im', 'in den'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-weil-dass', level: 'A2', title: 'weil, dass, wenn: verb to the end', titleEs: 'Nebensätze',
    summary: 'In a subordinate clause the conjugated verb jumps to the very end.',
    blocks: [
      { t: 'text', md: `
## The verb goes last
After **weil** (because), **dass** (that), **wenn** (if/when), **obwohl** (although), **ob** (whether) the conjugated verb moves to the **end**:

| main clause | subordinate clause |
| Ich bleibe zu Hause, | weil ich krank **bin**. |
| Ich glaube, | dass er morgen **kommt**. |
| Ich gehe schwimmen, | wenn das Wetter schön **ist**. |

With two verbs, the conjugated one is last: *…, weil ich arbeiten **muss**.*
Separable verbs join up again: *…, weil ich früh **aufstehe**.*

## Starting with the subordinate clause
Then the main clause starts with its verb (verb-second still holds!):
***Wenn** das Wetter schön ist, **gehe** ich schwimmen.*

## weil vs. denn
**denn** also means "because" but keeps normal word order: *…, **denn** ich **bin** krank.*` },
      { t: 'mistakes', items: [['…, weil ich bin müde.', '…, weil ich müde bin.', 'weil sends the verb to the end.'], ['Wenn es regnet, ich bleibe zu Hause.', 'Wenn es regnet, bleibe ich zu Hause.', 'The main clause then starts with the verb.']] },
    ],
    practice: {
      choice: [
        { q: 'Ich lerne Deutsch, weil ich in Wien ___.', options: ['wohne', 'wohnen', 'wohnt'], answer: 0 },
        { q: 'Ich weiß, dass du recht ___.', options: ['hast', 'haben', 'habt'], answer: 0 },
        { q: 'Wenn ich Zeit habe, ___ ich dich.', options: ['besuche', 'ich besuche', 'besuchen'], answer: 0 },
        { q: 'Er kommt nicht, ___ er krank ist.', options: ['weil', 'denn', 'aber'], answer: 0 },
        { q: 'Er kommt nicht, ___ er ist krank.', options: ['denn', 'weil', 'dass'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-praeteritum', level: 'A2', title: 'The simple past (Präteritum)', titleEs: 'Das Präteritum',
    summary: 'war, hatte, konnte — and the written past for stories.',
    blocks: [
      { t: 'text', md: `
## When is it used?
- **Speaking**: mostly Perfekt — **except** sein, haben and the modal verbs, which almost always use the Präteritum.
- **Writing** (stories, news, books): the Präteritum is normal for all verbs.` },
      { t: 'table', verbs: ['sein', 'haben', 'können'], tense: 'preterito', caption: 'The ones you need in conversation' },
      { t: 'text', md: `
## Regular verbs: -te
*spielen → ich spiel**te**, du spiel**test**, wir spiel**ten***

## Irregular verbs: new stem, no ending for ich / er
*fahren → fuhr*, *gehen → ging*, *kommen → kam*, *sehen → sah*, *essen → aß*
**ich** and **er/sie/es** are always the same: *ich ging, er ging*.` },
      { t: 'table', verbs: ['spielen', 'fahren'], tense: 'preterito' },
    ],
    practice: {
      conj: { verbs: ['sein', 'haben', 'können', 'müssen', 'wollen', 'spielen', 'machen', 'fahren', 'gehen', 'kommen'], tenses: ['preterito'], count: 12 },
    },
  },
  {
    id: 'de-g-adjectives', level: 'A2', title: 'Adjective endings', titleEs: 'Adjektivdeklination',
    summary: 'ein kleiner Hund, der kleine Hund: the endings explained simply.',
    blocks: [
      { t: 'text', md: `
## Rule 1: after der / die / das → -e or -en
After the definite article the adjective ends in **-e** (nominative singular) — otherwise mostly **-en**:
*der klein**e** Hund, die klein**e** Katze, das klein**e** Kind* · *den klein**en** Hund*, *mit dem klein**en** Hund*, *die klein**en** Kinder*

## Rule 2: after ein / kein / mein → the adjective shows the gender
Where **ein** doesn't show the gender, the adjective does:
| | nominative | accusative |
| masculine | ein klein**er** Hund | einen klein**en** Hund |
| feminine | eine klein**e** Katze | eine klein**e** Katze |
| neuter | ein klein**es** Kind | ein klein**es** Kind |

## Rule 3: no article → strong endings (like der/die/das)
*kalt**er** Kaffee, kalt**e** Milch, kalt**es** Wasser*

## After sein: no ending
*Der Hund ist **klein**.*` },
      { t: 'tip', md: 'Shortcut: **-er = der**, **-e = die**, **-es = das**. If the article already shows the gender, the adjective can relax (-e/-en).' },
      { t: 'mistakes', items: [['ein klein Hund', 'ein kleiner Hund', 'Before a noun the adjective needs an ending.'], ['der kleiner Hund', 'der kleine Hund', 'der already shows the gender → -e.']] },
    ],
    practice: {
      choice: [
        { q: 'Das ist ein ___ Auto.', options: ['neues', 'neuer', 'neue'], answer: 0 },
        { q: 'Der ___ Mann ist mein Vater.', options: ['alte', 'alter', 'altes'], answer: 0 },
        { q: 'Ich habe einen ___ Bruder.', options: ['kleinen', 'kleiner', 'kleine'], answer: 0 },
        { q: 'Sie trägt eine ___ Jacke.', options: ['rote', 'roter', 'rotes'], answer: 0 },
        { q: 'Ich trinke ___ Kaffee.', options: ['schwarzen', 'schwarzer', 'schwarze'], answer: 0 },
        { q: 'Die Jacke ist ___.', options: ['schön', 'schöne', 'schönes'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-comparison', level: 'A2', title: 'Comparing things', titleEs: 'Komparativ und Superlativ',
    summary: 'schneller als, so schnell wie, am schnellsten.',
    blocks: [
      { t: 'text', md: `
## Three steps
| klein | klein**er** (als) | am klein**sten** |
| schnell | schnell**er** | am schnell**sten** |
| alt | **ä**lt**er** | am **ä**lt**esten** |

Short adjectives often add an umlaut: *alt → älter, jung → jünger, groß → größer, warm → wärmer*.

## Irregular
| gut | besser | am besten |
| viel | mehr | am meisten |
| gern | lieber | am liebsten |
| hoch | höher | am höchsten |

## als vs wie
- different: **als** — *Berlin ist größer **als** Hamburg.*
- equal: **so … wie** — *Ich bin **so** groß **wie** mein Vater.*` },
      { t: 'mistakes', items: [['Er ist größer wie ich.', 'Er ist größer als ich.', 'Comparative + als.'], ['Das ist mehr gut.', 'Das ist besser.', 'gut → besser.']] },
    ],
    practice: {
      choice: [
        { q: 'Mein Bruder ist ___ als ich.', options: ['älter', 'alter', 'mehr alt'], answer: 0 },
        { q: 'Der Zug ist schneller ___ der Bus.', options: ['als', 'wie', 'dann'], answer: 0 },
        { q: 'Ich bin so groß ___ du.', options: ['wie', 'als', 'so'], answer: 0 },
        { q: 'Tee trinke ich gern, aber Kaffee trinke ich ___.', options: ['lieber', 'gerner', 'mehr gern'], answer: 0 },
        { q: 'Das ist der ___ Film des Jahres.', options: ['beste', 'gute', 'bessere'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-reflexive', level: 'A2', title: 'Reflexive verbs', titleEs: 'Reflexive Verben',
    summary: 'sich freuen, sich waschen: mich, dich, sich, uns, euch, sich.',
    blocks: [
      { t: 'text', md: `
## The reflexive pronoun
| ich wasche **mich** | wir waschen **uns** |
| du wäschst **dich** | ihr wascht **euch** |
| er/sie wäscht **sich** | sie/Sie waschen **sich** |

## Common reflexive verbs
| sich freuen (auf / über) | to look forward to / be happy about |
| sich interessieren für | to be interested in |
| sich treffen | to meet (each other) |
| sich fühlen | to feel |
| sich beeilen | to hurry |
| sich ausruhen | to rest |
| sich anziehen | to get dressed |

*Ich **freue mich** auf das Wochenende.* · *Wir **treffen uns** um acht.*

## With a body part: dative
*Ich wasche **mir** die Hände.* — I wash my hands.` },
      { t: 'mistakes', items: [['Ich freue auf den Urlaub.', 'Ich freue mich auf den Urlaub.', 'sich freuen needs the pronoun.'], ['Wir treffen uns um acht Uhr morgen.', 'Wir treffen uns morgen um acht Uhr.', 'Time expressions: when before what time.']] },
    ],
    practice: {
      choice: [
        { q: 'Ich freue ___ auf die Ferien.', options: ['mich', 'mir', 'sich'], answer: 0 },
        { q: 'Interessierst du ___ für Musik?', options: ['dich', 'dir', 'sich'], answer: 0 },
        { q: 'Wir treffen ___ vor dem Kino.', options: ['uns', 'euch', 'sich'], answer: 0 },
        { q: 'Er fühlt ___ heute nicht gut.', options: ['sich', 'ihn', 'ihm'], answer: 0 },
        { q: 'Beeilt ___, der Zug fährt gleich!', options: ['euch', 'uns', 'dich'], answer: 0 },
      ],
    },
  },
];
