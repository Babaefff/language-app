import { units, type SentenceRow, type WordRow } from '../build';

const TOPICS = units('B1', [
  {
    id: 'de-b1-01', title: 'Plans & the future', titleEs: 'Pläne und Zukunft', emoji: '🚀',
    description: 'Talk about plans, goals and predictions.',
    words: [
      ['die Zukunft', 'the future'], ['der Plan', 'the plan'], ['das Ziel', 'the goal'], ['der Traum', 'the dream'],
      ['nächstes Jahr', 'next year'], ['in Zukunft', 'in future'], ['vorhaben', 'to plan / intend', 'Was hast du am Wochenende vor?', 'What are you planning this weekend?'],
      ['planen', 'to plan'], ['umziehen', 'to move (house)'], ['sparen', 'to save (money)'], ['die Ausbildung', 'the (vocational) training'],
      ['das Studium', 'the (university) studies'], ['der Abschluss', 'the degree / qualification'], ['wahrscheinlich', 'probably'],
      ['bestimmt', 'definitely / certainly'], ['die Möglichkeit', 'the possibility'], ['die Chance', 'the chance'], ['das Ausland', 'abroad'],
    ],
    sentences: [
      ['Nächstes Jahr werde ich in Berlin studieren.', 'Next year I will study in Berlin.'],
      ['Was hast du nach dem Studium vor?', 'What are you planning after your studies?'],
      ['Morgen wird es wahrscheinlich regnen.', 'It will probably rain tomorrow.'],
      ['Wir sparen für eine eigene Wohnung.', "We're saving for our own flat."],
      ['Mein Traum ist es, im Ausland zu arbeiten.', 'My dream is to work abroad.'],
    ],
    grammar: `
## Future: present tense or werden?
- German often uses the **present** with a time word: *Morgen **fahre** ich nach Hamburg.*
- **werden + infinitive** (at the end) for predictions, promises and plans further away:
  *Es **wird** morgen **regnen**. Ich **werde** dich nie **vergessen**.*

## Expressing certainty
**bestimmt / sicher** (certainly) · **wahrscheinlich** (probably) · **vielleicht** (maybe)
*Er wird **wahrscheinlich** später kommen.*
`,
    conj: { verbs: ['werden', 'vorhaben', 'umziehen', 'planen'], tenses: ['futuro', 'presente'] },
  },
  {
    id: 'de-b1-02', title: 'Advice & wishes', titleEs: 'Ratschläge und Wünsche', emoji: '💡',
    description: 'Give advice and talk about wishes with würde, hätte, wäre.',
    words: [
      ['der Rat', 'the advice'], ['der Tipp', 'the tip'], ['vorschlagen', 'to suggest'], ['an deiner Stelle', 'if I were you'],
      ['ich würde', 'I would', 'Ich würde mehr schlafen.', 'I would sleep more.'], ['der Wunsch', 'the wish'], ['wünschen', 'to wish'],
      ['die Hilfe', 'the help'], ['die Lösung', 'the solution'], ['versuchen', 'to try'], ['aufhören', 'to stop'],
      ['sich Sorgen machen', 'to worry'], ['unbedingt', 'absolutely / by all means'], ['auf jeden Fall', 'in any case / definitely'],
      ['es wäre besser', 'it would be better'], ['hätte', 'would have'], ['könnte', 'could'],
    ],
    sentences: [
      ['An deiner Stelle würde ich mit ihm sprechen.', "If I were you, I'd talk to him."],
      ['Du solltest mehr Wasser trinken.', 'You should drink more water.'],
      ['Wenn ich Zeit hätte, würde ich mehr lesen.', 'If I had time, I would read more.'],
      ['Könnten Sie mir bitte helfen?', 'Could you help me, please?'],
      ['Ich wünsche dir viel Glück!', 'I wish you lots of luck!'],
    ],
    grammar: `
## Giving advice
- **Du solltest …** — You should … (*sollen* in Konjunktiv II)
- **An deiner Stelle würde ich …** — If I were you, I'd …
- **Es wäre besser, wenn …** — It would be better if …

## Wishes and unreal conditions
*Wenn ich reich **wäre**, **würde** ich um die Welt **reisen**.*
*Ich **hätte** gern mehr Zeit.*

## Polite requests
***Könnten** Sie … ?* · ***Würden** Sie bitte … ?* · *Ich **hätte** gern …*
`,
    conj: { verbs: ['haben', 'sein', 'können', 'machen', 'gehen'], tenses: ['condicional'] },
  },
  {
    id: 'de-b1-03', title: 'Work & studies', titleEs: 'Studium und Beruf', emoji: '🎓',
    description: 'University, exams, internships and the workplace.',
    words: [
      ['die Universität', 'the university'], ['das Fach', 'the subject'], ['die Prüfung', 'the exam'], ['bestehen', 'to pass (an exam)'],
      ['durchfallen', 'to fail (an exam)'], ['das Praktikum', 'the internship'], ['die Erfahrung', 'the experience'], ['der Lebenslauf', 'the CV / résumé'],
      ['die Besprechung', 'the meeting'], ['die Abteilung', 'the department'], ['kündigen', 'to quit / to resign'], ['einstellen', 'to hire'],
      ['die Überstunden', 'overtime'], ['der Feierabend', 'the end of the working day'], ['selbstständig', 'self-employed'],
      ['die Karriere', 'the career'], ['der Arbeitsplatz', 'the workplace / job'],
    ],
    sentences: [
      ['Ich habe die Prüfung bestanden!', 'I passed the exam!'],
      ['Sie macht ein Praktikum bei einer großen Firma.', "She's doing an internship at a big company."],
      ['Nach Feierabend gehe ich ins Fitnessstudio.', 'After work I go to the gym.'],
      ['Er hat gekündigt, weil er zu viele Überstunden machen musste.', 'He quit because he had to work too much overtime.'],
      ['Schicken Sie uns bitte Ihren Lebenslauf.', 'Please send us your CV.'],
    ],
    grammar: `
## Talking about your experience
- *Ich **habe** zwei Jahre als Kellner **gearbeitet**.*
- *Ich **habe** Erfahrung **in** / **mit** …*
- *Ich **bin** seit 2020 **bei** Siemens.* — seit + present tense for things still going on!

## Feierabend
A very German word: the moment work ends. *Schönen Feierabend!* — Have a nice evening (after work).
`,
    conj: { verbs: ['bestehen', 'kündigen', 'arbeiten'], tenses: ['perfecto', 'presente'] },
  },
  {
    id: 'de-b1-04', title: 'Environment & society', titleEs: 'Umwelt und Gesellschaft', emoji: '🌱',
    description: 'Give your opinion on the environment and society.',
    words: [
      ['die Umwelt', 'the environment'], ['der Klimawandel', 'climate change'], ['der Müll', 'the rubbish / trash'], ['den Müll trennen', 'to sort the rubbish'],
      ['die Energie', 'the energy'], ['schützen', 'to protect'], ['die Natur', 'nature'], ['die Regierung', 'the government'], ['das Gesetz', 'the law'],
      ['die Gesellschaft', 'society'], ['die Meinung', 'the opinion'], ['ich finde', 'I think / I find'], ['meiner Meinung nach', 'in my opinion'],
      ['einverstanden', 'agreed'], ['der Vorteil', 'the advantage'], ['der Nachteil', 'the disadvantage'], ['die Umweltverschmutzung', 'the pollution'],
    ],
    sentences: [
      ['Meiner Meinung nach müssen wir die Umwelt besser schützen.', 'In my opinion we must protect the environment better.'],
      ['In Deutschland trennt man den Müll.', 'In Germany people sort their rubbish.'],
      ['Ich finde, dass das Gesetz zu streng ist.', 'I think the law is too strict.'],
      ['Damit bin ich nicht einverstanden.', "I don't agree with that."],
      ['Das hat Vorteile und Nachteile.', 'That has advantages and disadvantages.'],
    ],
    grammar: `
## Giving your opinion
- **Ich finde / glaube / denke, dass …** + verb at the end: *Ich finde, dass Recycling wichtig **ist**.*
- **Meiner Meinung nach** + verb second: *Meiner Meinung nach **ist** Recycling wichtig.*
- **Ich bin (nicht) einverstanden.** — I (don't) agree.
- **Einerseits …, andererseits …** — on the one hand …, on the other hand …

## man = people / one / you
*In Deutschland **trennt man** den Müll.* — always with the er/sie/es form.
`,
    conj: { verbs: ['schützen', 'trennen', 'finden'], tenses: ['presente'] },
  },
  {
    id: 'de-b1-05', title: 'Feelings & relationships', titleEs: 'Gefühle und Beziehungen', emoji: '❤️',
    description: 'Love, friendship, arguments and emotions.',
    words: [
      ['die Liebe', 'the love'], ['die Freundschaft', 'the friendship'], ['der Partner', 'the partner'], ['die Beziehung', 'the relationship'],
      ['sich verlieben', 'to fall in love'], ['heiraten', 'to marry'], ['sich streiten', 'to argue'], ['sich trennen', 'to split up'],
      ['eifersüchtig', 'jealous'], ['stolz', 'proud'], ['traurig', 'sad'], ['nervös', 'nervous'], ['enttäuscht', 'disappointed'],
      ['überrascht', 'surprised'], ['vermissen', 'to miss (someone)', 'Ich vermisse dich.', 'I miss you.'], ['vertrauen', 'to trust'],
      ['das Gefühl', 'the feeling'],
    ],
    sentences: [
      ['Ich vermisse dich sehr.', 'I miss you a lot.'],
      ['Sie haben sich im Urlaub verliebt.', 'They fell in love on holiday.'],
      ['Wir haben letztes Jahr geheiratet.', 'We got married last year.'],
      ['Ich bin stolz auf dich.', "I'm proud of you."],
      ['Er war enttäuscht, weil niemand gekommen ist.', 'He was disappointed because nobody came.'],
    ],
    grammar: `
## Feelings + preposition
| stolz **auf** + acc. | proud of |
| sich freuen **über** + acc. | to be happy about |
| Angst haben **vor** + dat. | to be afraid of |
| verliebt **in** + acc. | in love with |
| eifersüchtig **auf** + acc. | jealous of |

## Reciprocal sich
*Wir haben **uns** gestritten.* — We argued (with each other).
*Sie haben **sich** getrennt.* — They split up.
`,
    conj: { verbs: ['heiraten', 'vermissen', 'vertrauen'], tenses: ['presente', 'perfecto'] },
  },
  {
    id: 'de-b1-06', title: 'News & media', titleEs: 'Medien und Nachrichten', emoji: '📰',
    description: 'Newspapers, TV, the internet — and the passive.',
    words: [
      ['die Nachrichten', 'the news'], ['die Zeitung', 'the newspaper'], ['die Zeitschrift', 'the magazine'], ['der Artikel', 'the article'],
      ['die Schlagzeile', 'the headline'], ['die Sendung', 'the programme'], ['die Serie', 'the series'], ['die Werbung', 'the advertising'],
      ['berichten', 'to report'], ['veröffentlichen', 'to publish'], ['passieren', 'to happen', 'Was ist passiert?', 'What happened?'],
      ['die Quelle', 'the source'], ['die Information', 'the information'], ['die Umfrage', 'the survey'], ['der Journalist', 'the journalist'],
      ['die Medien', 'the media'],
    ],
    sentences: [
      ['Ich lese jeden Morgen die Zeitung.', 'I read the newspaper every morning.'],
      ['In den Nachrichten wurde über den Unfall berichtet.', 'The accident was reported on the news.'],
      ['Was ist gestern passiert?', 'What happened yesterday?'],
      ['Der Artikel wurde gestern veröffentlicht.', 'The article was published yesterday.'],
      ['Die Serie wird in vielen Ländern gesehen.', 'The series is watched in many countries.'],
    ],
    grammar: `
## The passive: werden + participle
The action matters more than who does it:
- present: *Die Zeitung **wird** jeden Tag **gelesen**.* — is read
- past: *Der Artikel **wurde** gestern **veröffentlicht**.* — was published
- who did it: **von** + dative: *…von vielen Leuten gelesen*

News and instructions use the passive a lot.
`,
    conj: { verbs: ['berichten', 'passieren', 'lesen'], tenses: ['perfecto', 'preterito'] },
  },
  {
    id: 'de-b1-07', title: 'Living & renting', titleEs: 'Wohnen und Mieten', emoji: '🔑',
    description: 'Find a flat, talk to the landlord and the neighbours.',
    words: [
      ['die Miete', 'the rent'], ['der Vermieter', 'the landlord'], ['der Mieter', 'the tenant'], ['die Nebenkosten', 'the extra costs (bills)'],
      ['der Nachbar', 'the neighbour'], ['die WG', 'the shared flat'], ['einziehen', 'to move in'], ['ausziehen', 'to move out / to undress'],
      ['möbliert', 'furnished'], ['der Balkon', 'the balcony'], ['der Keller', 'the cellar'], ['der Aufzug', 'the lift / elevator'],
      ['der Stock', 'the floor / storey'], ['gemütlich', 'cosy'], ['renovieren', 'to renovate'], ['die Kaution', 'the deposit'], ['die Anzeige', 'the advert'],
    ],
    sentences: [
      ['Wie hoch ist die Miete?', 'How much is the rent?'],
      ['Die Nebenkosten sind nicht inklusive.', 'The bills are not included.'],
      ['Wir sind letzten Monat eingezogen.', 'We moved in last month.'],
      ['Die Wohnung liegt im dritten Stock ohne Aufzug.', 'The flat is on the third floor with no lift.'],
      ['Ich wohne in einer WG mit drei Studenten.', 'I live in a shared flat with three students.'],
    ],
    grammar: `
## Flat adverts are full of abbreviations
*2-Zi.-Whg., 60 m², 3. OG, 800 € kalt + 150 € NK, 2 MM Kaution*
= 2-room flat, 60 square metres, 3rd floor, €800 rent without bills + €150 bills, deposit of two months' rent.

- **kalt / warm** — rent without / with heating and bills
- **WG** (Wohngemeinschaft) — a shared flat, very common for students

**ein-, aus-, umziehen** are separable: *Wir **ziehen** nächste Woche **ein**.*
`,
    conj: { verbs: ['einziehen', 'umziehen', 'renovieren'], tenses: ['presente', 'perfecto'] },
  },
  {
    id: 'de-b1-08', title: 'Culture & the arts', titleEs: 'Kultur und Kunst', emoji: '🎭',
    description: 'Theatre, exhibitions, books — and saying what you thought.',
    words: [
      ['das Theater', 'the theatre'], ['die Ausstellung', 'the exhibition'], ['das Konzert', 'the concert'], ['das Gemälde', 'the painting'],
      ['der Künstler', 'the artist'], ['der Roman', 'the novel'], ['das Gedicht', 'the poem'], ['die Handlung', 'the plot'],
      ['die Figur', 'the character'], ['das Publikum', 'the audience'], ['die Eintrittskarte', 'the ticket'], ['die Kritik', 'the review / criticism'],
      ['empfehlenswert', 'worth recommending'], ['sich lohnen', 'to be worth it', 'Der Film lohnt sich.', 'The film is worth it.'],
      ['die Vorstellung', 'the performance / show'], ['die Bühne', 'the stage'],
    ],
    sentences: [
      ['Die Ausstellung lohnt sich wirklich.', 'The exhibition is really worth it.'],
      ['Der Roman, den ich gerade lese, ist sehr spannend.', "The novel I'm reading right now is very exciting."],
      ['Die Vorstellung beginnt um acht Uhr.', 'The performance starts at eight.'],
      ['Wie hat dir das Konzert gefallen?', 'How did you like the concert?'],
    ],
    grammar: `
## Saying what you thought
- **Wie hat dir … gefallen?** — How did you like …?
- **Es hat mir (sehr / gar nicht) gefallen.** — I liked it (a lot / not at all).
- **Es lohnt sich / Es lohnt sich nicht.** — It's (not) worth it.
- **Ich kann es nur empfehlen.** — I can only recommend it.

## Relative clauses (see the grammar lesson)
*Der Roman, **den** ich gerade **lese**, ist spannend.* — the verb goes to the end.
`,
    conj: { verbs: ['gefallen', 'empfehlen', 'beginnen'], tenses: ['perfecto', 'presente'] },
  },
]);

const CORE: WordRow[] = [
  // set 8 — ideas and abstract nouns
  ['die Entwicklung', 'the development'], ['die Bedeutung', 'the meaning / significance'], ['der Grund', 'the reason'], ['das Ergebnis', 'the result'],
  ['die Entscheidung', 'the decision'], ['die Ursache', 'the cause'], ['die Folge', 'the consequence'], ['der Unterschied', 'the difference'],
  ['die Gesundheit', 'the health'], ['die Sicherheit', 'the safety / security'], ['die Freiheit', 'the freedom'], ['die Verantwortung', 'the responsibility'],
  ['die Gelegenheit', 'the opportunity'], ['die Gefahr', 'the danger'], ['der Erfolg', 'the success'], ['der Fehler', 'the mistake'],
  ['die Wahrheit', 'the truth'], ['die Geschichte', 'the story / history'], ['die Kultur', 'the culture'], ['die Wirtschaft', 'the economy'],
  ['die Politik', 'politics'], ['die Bildung', 'education'], ['die Hoffnung', 'the hope'], ['die Angst', 'the fear'], ['die Erinnerung', 'the memory'],
  // set 9 — B1 verbs
  ['entscheiden', 'to decide'], ['entwickeln', 'to develop'], ['erreichen', 'to reach / to achieve'], ['erwarten', 'to expect'],
  ['sich erinnern', 'to remember', 'Ich erinnere mich an den Tag.', 'I remember the day.'], ['bemerken', 'to notice'], ['beschreiben', 'to describe'],
  ['bieten', 'to offer'], ['bitten', 'to ask (for)'], ['dauern', 'to last / to take (time)'], ['feiern', 'to celebrate'], ['führen', 'to lead'],
  ['genießen', 'to enjoy'], ['nutzen', 'to use'], ['reagieren', 'to react'], ['stören', 'to disturb'], ['teilen', 'to share / to divide'],
  ['unterstützen', 'to support'], ['vergleichen', 'to compare'], ['verändern', 'to change'], ['vermeiden', 'to avoid'], ['verbessern', 'to improve'],
  ['zweifeln', 'to doubt'], ['leiden', 'to suffer'], ['behaupten', 'to claim'],
];

const CORE_SENTENCES: SentenceRow[][] = [
  [['Das war eine schwierige Entscheidung.', 'That was a difficult decision.'], ['Was ist der Grund dafür?', 'What is the reason for that?'], ['Jeder macht Fehler.', 'Everyone makes mistakes.'], ['Ich habe schöne Erinnerungen an diese Zeit.', 'I have nice memories of that time.']],
  [['Wie lange dauert der Film?', 'How long does the film last?'], ['Wir feiern heute ihren Geburtstag.', "We're celebrating her birthday today."], ['Genieß den Abend!', 'Enjoy the evening!'], ['Darf ich Sie um einen Gefallen bitten?', 'May I ask you a favour?']],
];

const CORE_GRAMMAR = `
## Why these words?
The vocabulary you need to talk about ideas, not just everyday things.

- Nouns ending in **-ung, -heit, -keit, -schaft** are always feminine: *die Entscheidung, die Freiheit*.
- Many B1 verbs have inseparable prefixes (**be-, ent-, er-, ver-**): no *ge-* in the past participle — *entschieden, erreicht, verbessert*.
`;

const CORE_UNITS = [0, 1].map((i) =>
  units('B1', [{
    id: `de-core-${i + 8}`, title: `Top words ${i + 8}`, titleEs: `Häufige Wörter ${i + 8}`, emoji: '⭐',
    description: `Most-used German words, set ${i + 8} of 9.`,
    words: CORE.slice(i * 25, i * 25 + 25), sentences: CORE_SENTENCES[i], grammar: CORE_GRAMMAR,
  }])[0],
);

export const DE_B1_UNITS = [...TOPICS, ...CORE_UNITS];

export const DE_B1_UNIT_LESSONS: Record<string, string[]> = {
  'de-b1-01': ['de-g-futur', 'de-g-zu-inf'],
  'de-b1-02': ['de-g-konjunktiv'],
  'de-b1-03': ['de-g-prep-verbs'],
  'de-b1-04': ['de-g-weil-dass', 'de-g-genitive'],
  'de-b1-05': ['de-g-prep-verbs', 'de-g-reflexive'],
  'de-b1-06': ['de-g-passive'],
  'de-b1-07': ['de-g-indirect'],
  'de-b1-08': ['de-g-relative'],
};
