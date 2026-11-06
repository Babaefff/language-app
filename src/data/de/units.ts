import { units, type SentenceRow, type WordRow } from '../build';
import { DE_A2_UNIT_LESSONS, DE_A2_UNITS } from './a2';

const TOPICS = units('A1', [
  {
    id: 'de-a1-01', title: 'Greetings & introductions', titleEs: 'Begrüßung und Vorstellung', emoji: '👋',
    description: 'Say hello, introduce yourself and be polite.',
    words: [
      ['hallo', 'hello', 'Hallo! Wie geht’s?', 'Hi! How are you?'], ['tschüss', 'bye'], ['auf Wiedersehen', 'goodbye'],
      ['guten Morgen', 'good morning'], ['guten Tag', 'good day / hello'], ['guten Abend', 'good evening'], ['gute Nacht', 'good night'],
      ['wie geht’s?', 'how are you?'], ['gut', 'good / well', 'Mir geht es gut.', "I'm fine."], ['schlecht', 'bad / badly'],
      ['danke', 'thank you'], ['bitte', 'please / you’re welcome'], ['ja', 'yes'], ['nein', 'no'],
      ['Entschuldigung', 'excuse me / sorry'], ['ich heiße', 'my name is', 'Ich heiße Anna.', 'My name is Anna.'],
      ['freut mich', 'nice to meet you'], ['bis später', 'see you later'],
    ],
    sentences: [
      ['Hallo, ich heiße Tom.', 'Hello, my name is Tom.'],
      ['Wie heißt du?', 'What is your name?'],
      ['Ich komme aus Spanien.', 'I come from Spain.'],
      ['Wie geht es Ihnen?', 'How are you? (formal)'],
      ['Mir geht es gut, danke.', "I'm fine, thanks."],
    ],
    grammar: `
## Personal pronouns and sein (to be)
| ich bin | I am |
| du bist | you are (informal) |
| er / sie / es ist | he / she / it is |
| wir sind | we are |
| ihr seid | you all are |
| sie / Sie sind | they are / you are (formal) |

## du or Sie?
- **du** — friends, family, children, people your age
- **Sie** — strangers, shops, work (always written with a capital S)

- **Wie heißt du?** — What's your name? · **Ich heiße …** — My name is …
- **Ich komme aus …** — I come from …
`,
    conj: { verbs: ['sein', 'heißen', 'kommen'], tenses: ['presente'] },
  },
  {
    id: 'de-a1-02', title: 'Numbers & age', titleEs: 'Zahlen und Alter', emoji: '🔢',
    description: 'Count and say how old you are.',
    words: [
      ['null', 'zero'], ['eins', 'one'], ['zwei', 'two'], ['drei', 'three'], ['vier', 'four'], ['fünf', 'five'],
      ['sechs', 'six'], ['sieben', 'seven'], ['acht', 'eight'], ['neun', 'nine'], ['zehn', 'ten'], ['elf', 'eleven'],
      ['zwölf', 'twelve'], ['zwanzig', 'twenty'], ['hundert', 'a hundred'], ['das Jahr', 'the year'],
      ['alt', 'old', 'Wie alt bist du?', 'How old are you?'],
    ],
    sentences: [
      ['Ich bin zwanzig Jahre alt.', 'I am twenty years old.'],
      ['Wie alt bist du?', 'How old are you?'],
      ['Mein Bruder ist zwölf.', 'My brother is twelve.'],
      ['Ich habe zwei Katzen.', 'I have two cats.'],
    ],
    grammar: `
## Numbers 13–100
| 13 dreizehn | 14 vierzehn | 16 sechzehn | 17 siebzehn |
| 21 einundzwanzig | 22 zweiundzwanzig | 30 dreißig | 40 vierzig |
| 50 fünfzig | 60 sechzig | 70 siebzig | 100 hundert |

From 21 the **units come first**: *einundzwanzig* = one-and-twenty.

## Age uses sein
**Ich bin 25 (Jahre alt).** — I am 25. (Not *haben*, unlike Spanish or French.)

## haben (to have)
*ich habe, du hast, er hat, wir haben, ihr habt, sie haben*
`,
    conj: { verbs: ['haben', 'sein'], tenses: ['presente'] },
  },
  {
    id: 'de-a1-03', title: 'Family', titleEs: 'Die Familie', emoji: '👨‍👩‍👧',
    description: 'Talk about your family — and meet der, die, das.',
    words: [
      ['die Familie', 'the family'], ['die Mutter', 'the mother'], ['der Vater', 'the father'], ['die Eltern', 'the parents'],
      ['der Bruder', 'the brother'], ['die Schwester', 'the sister'], ['der Sohn', 'the son'], ['die Tochter', 'the daughter'],
      ['der Großvater', 'the grandfather'], ['die Großmutter', 'the grandmother'], ['der Onkel', 'the uncle'], ['die Tante', 'the aunt'],
      ['der Mann', 'the man / the husband'], ['die Frau', 'the woman / the wife'], ['das Kind', 'the child'],
      ['der Hund', 'the dog', 'Mein Hund heißt Bello.', 'My dog is called Bello.'], ['die Katze', 'the cat'], ['die Geschwister', 'the siblings'],
    ],
    sentences: [
      ['Meine Mutter heißt Maria.', 'My mother is called Maria.'],
      ['Ich habe einen Bruder und eine Schwester.', 'I have a brother and a sister.'],
      ['Meine Großeltern wohnen in Berlin.', 'My grandparents live in Berlin.'],
      ['Hast du Kinder?', 'Do you have children?'],
    ],
    grammar: `
## Three genders: der, die, das
| masculine | **der** Vater | **ein** Vater |
| feminine | **die** Mutter | **eine** Mutter |
| neuter | **das** Kind | **ein** Kind |
| plural (all) | **die** Eltern | — |

Always learn a noun **with its article** — and nouns are always written with a **capital letter**.

## My, your
| mein / meine | my |
| dein / deine | your |
| sein / seine | his |
| ihr / ihre | her / their |

**-e** for feminine and plural: *meine Mutter, meine Eltern* — but *mein Vater, mein Kind*.
`,
    conj: { verbs: ['haben', 'wohnen'], tenses: ['presente'] },
  },
  {
    id: 'de-a1-04', title: 'Describing people & things', titleEs: 'Beschreibungen und Farben', emoji: '🎨',
    description: 'Colours and adjectives.',
    words: [
      ['groß', 'big / tall'], ['klein', 'small / short'], ['jung', 'young'], ['neu', 'new'], ['schön', 'beautiful / nice'],
      ['hässlich', 'ugly'], ['nett', 'nice / kind'], ['freundlich', 'friendly'], ['lustig', 'funny'], ['müde', 'tired', 'Ich bin heute müde.', "I'm tired today."],
      ['glücklich', 'happy'], ['rot', 'red'], ['blau', 'blue'], ['grün', 'green'], ['gelb', 'yellow'], ['weiß', 'white'], ['schwarz', 'black'], ['sehr', 'very'],
    ],
    sentences: [
      ['Das Haus ist groß und weiß.', 'The house is big and white.'],
      ['Meine Schwester ist sehr nett.', 'My sister is very nice.'],
      ['Ich bin heute müde.', 'I am tired today.'],
      ['Das Auto ist nicht neu.', 'The car is not new.'],
    ],
    grammar: `
## After sein, adjectives never change
*Der Hund ist **klein**. Die Katze ist **klein**. Die Kinder sind **klein**.*

(Before a noun they do get endings — *ein kleiner Hund* — you'll learn that at A2.)

## nicht — not
**nicht** goes **before the adjective**: *Das ist **nicht** schön.*

## sehr / ziemlich / zu
*sehr* = very · *ziemlich* = quite · *zu* = too: *Das ist **zu** teuer.*
`,
    conj: { verbs: ['sein'], tenses: ['presente'] },
  },
  {
    id: 'de-a1-05', title: 'At home', titleEs: 'Zu Hause', emoji: '🏠',
    description: 'Rooms, furniture and "es gibt".',
    words: [
      ['das Haus', 'the house'], ['die Wohnung', 'the flat / apartment'], ['die Küche', 'the kitchen'], ['das Bad', 'the bathroom'],
      ['das Schlafzimmer', 'the bedroom'], ['das Wohnzimmer', 'the living room'], ['der Tisch', 'the table'], ['der Stuhl', 'the chair'],
      ['das Bett', 'the bed'], ['das Sofa', 'the sofa'], ['die Tür', 'the door'], ['das Fenster', 'the window'],
      ['es gibt', 'there is / there are', 'Es gibt ein Sofa im Wohnzimmer.', 'There is a sofa in the living room.'],
      ['auf', 'on'], ['unter', 'under'], ['neben', 'next to'], ['das Zimmer', 'the room'],
    ],
    sentences: [
      ['Es gibt zwei Schlafzimmer.', 'There are two bedrooms.'],
      ['Die Katze ist unter dem Tisch.', 'The cat is under the table.'],
      ['Die Küche ist neben dem Bad.', 'The kitchen is next to the bathroom.'],
      ['Ich wohne in einer kleinen Wohnung.', 'I live in a small flat.'],
    ],
    grammar: `
## es gibt + accusative
**Es gibt** = there is / there are. The thing that exists goes in the **accusative**:
*Es gibt **einen** Tisch.* (der → einen) · *Es gibt **eine** Küche.* · *Es gibt **ein** Bad.*

## Where is it? Prepositions + dative
After *in, auf, unter, neben* (for location) the article changes:
| der Tisch | → unter **dem** Tisch |
| die Küche | → in **der** Küche |
| das Bad | → neben **dem** Bad |

**in + dem = im**: *im Wohnzimmer*.
`,
    conj: { verbs: ['wohnen', 'sein'], tenses: ['presente'] },
  },
  {
    id: 'de-a1-06', title: 'Food & drink', titleEs: 'Essen und Trinken', emoji: '🥨',
    description: 'Order food and use the accusative.',
    words: [
      ['das Wasser', 'the water'], ['das Brot', 'the bread'], ['die Milch', 'the milk'], ['der Kaffee', 'the coffee'], ['der Tee', 'the tea'],
      ['das Obst', 'the fruit'], ['der Apfel', 'the apple'], ['der Käse', 'the cheese'], ['das Fleisch', 'the meat'], ['der Fisch', 'the fish'],
      ['der Reis', 'the rice'], ['das Bier', 'the beer'], ['der Wein', 'the wine'], ['das Frühstück', 'the breakfast'],
      ['das Mittagessen', 'the lunch'], ['das Abendessen', 'the dinner'], ['lecker', 'tasty'],
      ['essen', 'to eat', 'Was isst du gern?', 'What do you like to eat?'], ['trinken', 'to drink'],
    ],
    sentences: [
      ['Ich möchte einen Kaffee, bitte.', "I'd like a coffee, please."],
      ['Ich esse kein Fleisch.', "I don't eat meat."],
      ['Wir trinken Wasser.', 'We drink water.'],
      ['Was isst du zum Frühstück?', 'What do you eat for breakfast?'],
      ['Das Brot ist sehr lecker.', 'The bread is very tasty.'],
    ],
    grammar: `
## The accusative: only der changes
The thing you eat, buy or want is the **direct object** (accusative):
| der Kaffee | → Ich trinke **den** / **einen** Kaffee. |
| die Milch | → Ich trinke **die** / **eine** Milch. |
| das Brot | → Ich esse **das** / **ein** Brot. |

Only masculine changes: **der → den, ein → einen**.

## kein = not a / no
*Ich esse **kein** Fleisch. Ich habe **keinen** Hunger.* (kein follows the ein-pattern.)

## Ich möchte … — I'd like …
The polite way to order: *Ich möchte einen Tee, bitte.*
`,
    conj: { verbs: ['essen', 'trinken', 'nehmen', 'kochen'], tenses: ['presente'] },
  },
  {
    id: 'de-a1-07', title: 'Daily routine', titleEs: 'Der Alltag', emoji: '⏰',
    description: 'Separable verbs and telling the time.',
    words: [
      ['aufstehen', 'to get up', 'Ich stehe um sieben auf.', 'I get up at seven.'], ['frühstücken', 'to have breakfast'], ['arbeiten', 'to work'],
      ['lernen', 'to learn / to study'], ['schlafen', 'to sleep'], ['duschen', 'to shower'], ['der Morgen', 'the morning'],
      ['der Nachmittag', 'the afternoon'], ['der Abend', 'the evening'], ['die Nacht', 'the night'], ['früh', 'early'], ['spät', 'late'],
      ['immer', 'always'], ['nie', 'never'], ['manchmal', 'sometimes'], ['jeden Tag', 'every day'],
      ['wie spät ist es?', 'what time is it?'], ['die Uhr', 'the clock / o’clock'],
    ],
    sentences: [
      ['Ich stehe um sieben Uhr auf.', 'I get up at seven o’clock.'],
      ['Ich frühstücke immer Brot mit Käse.', 'I always have bread with cheese for breakfast.'],
      ['Ich arbeite von Montag bis Freitag.', 'I work from Monday to Friday.'],
      ['Wir gehen spät ins Bett.', 'We go to bed late.'],
      ['Es ist halb vier.', "It's half past three."],
    ],
    grammar: `
## Separable verbs
Many verbs have a prefix that **jumps to the end** of the sentence:
- **auf**stehen → *Ich stehe um 7 Uhr **auf**.*
- **fern**sehen → *Wir sehen am Abend **fern**.*
- **ein**kaufen → *Er kauft im Supermarkt **ein**.*

## Telling the time
- **Wie spät ist es?** — **Es ist acht Uhr.**
- **Viertel nach** acht (8:15) · **Viertel vor** neun (8:45)
- **halb neun** = 8:30 — *half to nine*, not half past eight!
- **um** acht Uhr = at eight o'clock
`,
    conj: { verbs: ['aufstehen', 'arbeiten', 'schlafen', 'fernsehen'], tenses: ['presente'] },
  },
  {
    id: 'de-a1-08', title: 'Around town', titleEs: 'In der Stadt', emoji: '🏙️',
    description: 'Places, directions, gehen and fahren.',
    words: [
      ['die Stadt', 'the city / town'], ['die Straße', 'the street'], ['die Bank', 'the bank / the bench'], ['der Supermarkt', 'the supermarket'],
      ['die Apotheke', 'the pharmacy'], ['das Restaurant', 'the restaurant'], ['das Krankenhaus', 'the hospital'], ['der Bahnhof', 'the station'],
      ['der Park', 'the park'], ['der Platz', 'the square / the place'], ['rechts', 'on the right'], ['links', 'on the left'],
      ['geradeaus', 'straight ahead'], ['nah', 'near'], ['weit', 'far'], ['wo', 'where'], ['die Haltestelle', 'the (bus) stop'],
    ],
    sentences: [
      ['Wo ist die Apotheke?', 'Where is the pharmacy?'],
      ['Die Bank ist rechts.', 'The bank is on the right.'],
      ['Ich gehe zum Supermarkt.', "I'm going to the supermarket."],
      ['Der Bahnhof ist sehr weit.', 'The station is very far.'],
      ['Wir fahren mit dem Bus.', 'We go by bus.'],
    ],
    grammar: `
## gehen or fahren?
- **gehen** — to go **on foot**: *Ich gehe in den Park.*
- **fahren** — to go **by vehicle**: *Ich fahre mit dem Zug nach Berlin.*

**fahren** changes its vowel: *ich fahre, du **fährst**, er **fährt***.

## Going to a place
- **zu** + place: *zu**m** Bahnhof* (zu + dem), *zu**r** Apotheke* (zu + der)
- **nach** + city/country: *nach Berlin, nach Spanien* · but **nach Hause** = home
- **mit** + transport: *mit dem Bus, mit dem Auto*
`,
    conj: { verbs: ['gehen', 'fahren', 'kommen', 'suchen'], tenses: ['presente'] },
  },
  {
    id: 'de-a1-09', title: 'Free time & likes', titleEs: 'Freizeit und Hobbys', emoji: '⚽',
    description: 'Hobbies and how to say you like doing something.',
    words: [
      ['das Hobby', 'the hobby'], ['der Sport', 'sport'], ['der Fußball', 'football / soccer'], ['die Musik', 'the music'],
      ['lesen', 'to read'], ['tanzen', 'to dance'], ['singen', 'to sing'], ['schwimmen', 'to swim'], ['spielen', 'to play'],
      ['das Kino', 'the cinema'], ['der Film', 'the film'], ['das Buch', 'the book'], ['das Wochenende', 'the weekend'],
      ['auch', 'also / too'], ['gern', 'gladly — (to like doing)', 'Ich lese gern.', 'I like reading.'], ['lieber', 'rather / prefer'], ['am liebsten', 'most of all'],
    ],
    sentences: [
      ['Ich höre gern Musik.', 'I like listening to music.'],
      ['Mein Bruder spielt gern Fußball.', 'My brother likes playing football.'],
      ['Siehst du gern Filme?', 'Do you like watching films?'],
      ['Am Wochenende lese ich ein Buch.', 'At the weekend I read a book.'],
      ['Ich schwimme lieber.', 'I prefer swimming.'],
    ],
    grammar: `
## Liking something: verb + gern
German doesn't need a special verb — just add **gern** after the verb:
- *Ich spiele **gern** Fußball.* — I like playing football.
- *Ich spiele **nicht gern** Tennis.* — I don't like playing tennis.
- *Ich spiele **lieber** Basketball.* — I prefer playing basketball.
- *Ich spiele **am liebsten** Volleyball.* — I like volleyball most of all.

To like a thing: **mögen** — *Ich mag Musik.*

**lesen** and **sehen** change e → ie: *du liest, er sieht*.
`,
    conj: { verbs: ['spielen', 'lesen', 'schwimmen', 'sehen', 'tanzen'], tenses: ['presente'] },
  },
  {
    id: 'de-a1-10', title: 'Days & weather', titleEs: 'Tage und Wetter', emoji: '☀️',
    description: 'Days of the week, today/tomorrow and the weather.',
    words: [
      ['der Montag', 'Monday'], ['der Dienstag', 'Tuesday'], ['der Mittwoch', 'Wednesday'], ['der Donnerstag', 'Thursday'],
      ['der Freitag', 'Friday'], ['der Samstag', 'Saturday'], ['der Sonntag', 'Sunday'], ['heute', 'today'], ['morgen', 'tomorrow'],
      ['gestern', 'yesterday'], ['die Woche', 'the week'], ['der Monat', 'the month'], ['es ist warm', 'it is warm'],
      ['es ist kalt', 'it is cold'], ['die Sonne scheint', 'the sun is shining'], ['es regnet', 'it is raining'], ['es schneit', 'it is snowing'],
    ],
    sentences: [
      ['Heute ist Montag.', 'Today is Monday.'],
      ['Im Winter ist es kalt.', 'In winter it is cold.'],
      ['Am Samstag gehe ich ins Kino.', 'On Saturday I go to the cinema.'],
      ['Heute regnet es viel.', "It's raining a lot today."],
      ['Mein Geburtstag ist im Mai.', 'My birthday is in May.'],
    ],
    grammar: `
## am, im, um — time words
- **am** + day / part of day: *am Montag, am Abend, am Wochenende*
- **im** + month / season: *im Mai, im Winter*
- **um** + clock time: *um acht Uhr*

## Weather uses es
*Es regnet. Es schneit. Es ist kalt.* — just like English "it".

## Word order: the verb is always second
If a time word comes first, the subject moves **after** the verb:
*Ich gehe am Samstag ins Kino.* → ***Am Samstag gehe ich** ins Kino.*
`,
    conj: { verbs: ['gehen', 'sein', 'haben'], tenses: ['presente'] },
  },
]);

/** The most frequent German words not already taught in a topic unit. */
const CORE: WordRow[] = [
  // set 1 — the glue of every sentence
  ['der', 'the (masc.)'], ['die', 'the (fem. / plural)'], ['das', 'the (neuter) / that'], ['ein', 'a / an (masc., neuter)'], ['eine', 'a / an (fem.)'],
  ['und', 'and'], ['oder', 'or'], ['aber', 'but'], ['nicht', 'not'], ['kein', 'no / not a'], ['mit', 'with'], ['ohne', 'without'],
  ['für', 'for'], ['zu', 'to / too'], ['von', 'from / of'], ['aus', 'from / out of'], ['bei', 'at / near'], ['nach', 'after / to (places)'],
  ['ich', 'I'], ['du', 'you (informal)'], ['er', 'he'], ['sie', 'she / they'], ['wir', 'we'], ['ihr', 'you all / her'], ['es', 'it'],
  // set 2 — key verbs
  ['sein', 'to be'], ['haben', 'to have'], ['werden', 'to become'], ['können', 'can'], ['müssen', 'must'], ['wollen', 'to want'],
  ['sagen', 'to say'], ['machen', 'to do / to make', 'Was machst du?', 'What are you doing?'], ['gehen', 'to go'], ['kommen', 'to come'], ['sehen', 'to see'], ['geben', 'to give'],
  ['nehmen', 'to take'], ['finden', 'to find'], ['denken', 'to think'], ['wissen', 'to know (facts)'], ['kennen', 'to know (people)'], ['sprechen', 'to speak'],
  ['bleiben', 'to stay'], ['stehen', 'to stand'], ['bringen', 'to bring'], ['verstehen', 'to understand', 'Ich verstehe nicht.', "I don't understand."], ['brauchen', 'to need'], ['glauben', 'to believe'], ['fragen', 'to ask'],
  // set 3 — little words
  ['hier', 'here'], ['dort', 'there'], ['jetzt', 'now'], ['dann', 'then'], ['noch', 'still / yet'], ['schon', 'already'],
  ['nur', 'only'], ['also', 'so / therefore'], ['mal', 'once / just'], ['wieder', 'again'], ['viel', 'much / a lot'], ['mehr', 'more'],
  ['etwas', 'something'], ['nichts', 'nothing'], ['alles', 'everything'], ['oft', 'often'], ['bald', 'soon'], ['vielleicht', 'maybe'],
  ['natürlich', 'of course'], ['wirklich', 'really'], ['zusammen', 'together'], ['warum', 'why'], ['wann', 'when'], ['was', 'what'], ['wer', 'who'],
  // set 4 — everyday nouns
  ['die Zeit', 'the time'], ['der Tag', 'the day'], ['die Welt', 'the world'], ['das Leben', 'the life'], ['der Mensch', 'the person / human'],
  ['die Leute', 'the people'], ['das Land', 'the country'], ['die Arbeit', 'the work / job'], ['die Schule', 'the school'], ['die Frage', 'the question'],
  ['die Antwort', 'the answer'], ['das Wort', 'the word'], ['der Name', 'the name'], ['das Problem', 'the problem'], ['die Idee', 'the idea'],
  ['der Freund', 'the friend (male)'], ['die Freundin', 'the friend (female)'], ['das Geld', 'the money'], ['das Auto', 'the car'], ['der Weg', 'the way / path'],
  ['die Hand', 'the hand'], ['das Auge', 'the eye'], ['der Kopf', 'the head'], ['das Ende', 'the end'], ['die Sprache', 'the language'],
];

const CORE_SENTENCES: SentenceRow[][] = [
  [['Ich trinke Kaffee mit Milch.', 'I drink coffee with milk.'], ['Das ist für dich.', 'That is for you.'], ['Wir kommen aus Italien.', 'We come from Italy.'], ['Er ist nicht hier.', "He isn't here."]],
  [['Ich verstehe das nicht.', "I don't understand that."], ['Was machst du heute?', 'What are you doing today?'], ['Kannst du mir helfen?', 'Can you help me?'], ['Ich weiß es nicht.', "I don't know."]],
  [['Ich bin schon hier.', "I'm already here."], ['Vielleicht komme ich morgen.', "Maybe I'll come tomorrow."], ['Das ist alles.', "That's everything."], ['Warum lernst du Deutsch?', 'Why are you learning German?']],
  [['Ich habe keine Zeit.', "I don't have time."], ['Das ist eine gute Idee.', "That's a good idea."], ['Mein Freund heißt Paul.', 'My friend is called Paul.'], ['Deutsch ist eine schöne Sprache.', 'German is a beautiful language.']],
];

const CORE_GRAMMAR = `
## Why these words?
These are some of the most frequent words in German. Together with the topic units they cover most of what you'll hear every day.

- **der, die, das, und, nicht, ich, sein, haben** appear in almost every sentence.
- **die** is both "the" (feminine) and "the" for all plurals.
- **sie** means "she" or "they"; **Sie** with a capital S is the formal "you".
`;

const CORE_UNITS = [0, 1, 2, 3].map((i) =>
  units('A1', [{
    id: `de-core-${i + 1}`, title: `Top words ${i + 1}`, titleEs: `Häufige Wörter ${i + 1}`, emoji: '⭐',
    description: `Most-used German words, set ${i + 1} of 4.`,
    words: CORE.slice(i * 25, i * 25 + 25), sentences: CORE_SENTENCES[i], grammar: CORE_GRAMMAR,
  }])[0],
);

export const DE_UNITS = [...TOPICS, ...CORE_UNITS, ...DE_A2_UNITS];

export const DE_UNIT_LESSONS: Record<string, string[]> = {
  'de-a1-01': ['de-g-verbs', 'de-g-sein-haben'],
  'de-a1-02': ['de-g-sein-haben'],
  'de-a1-03': ['de-g-gender'],
  'de-a1-04': ['de-g-word-order'],
  'de-a1-05': ['de-g-accusative'],
  'de-a1-06': ['de-g-accusative', 'de-g-vowel'],
  'de-a1-07': ['de-g-separable'],
  'de-a1-08': ['de-g-vowel'],
  'de-a1-09': ['de-g-vowel', 'de-g-modals'],
  'de-a1-10': ['de-g-word-order', 'de-g-perfekt'],
  ...DE_A2_UNIT_LESSONS,
};
