import { units, type SentenceRow, type WordRow } from '../build';

const TOPICS = units('A2', [
  {
    id: 'de-a2-01', title: 'Clothes & shopping', titleEs: 'Kleidung und Einkaufen', emoji: '🛍️',
    description: 'Buy clothes, ask prices, try things on.',
    words: [
      ['die Kleidung', 'the clothes'], ['das Hemd', 'the shirt'], ['die Hose', 'the trousers'], ['das Kleid', 'the dress'],
      ['der Rock', 'the skirt'], ['die Schuhe', 'the shoes'], ['die Jacke', 'the jacket'], ['der Pullover', 'the jumper / sweater'],
      ['die Größe', 'the size'], ['teuer', 'expensive'], ['billig', 'cheap'], ['das Geschäft', 'the shop'], ['der Preis', 'the price'],
      ['anprobieren', 'to try on', 'Kann ich das anprobieren?', 'Can I try this on?'], ['tragen', 'to wear / to carry'],
      ['anziehen', 'to put on (clothes)'], ['die Kasse', 'the till / checkout'], ['die Farbe', 'the colour'],
    ],
    sentences: [
      ['Was kostet die Jacke?', 'How much is the jacket?'],
      ['Die Schuhe sind zu teuer.', 'The shoes are too expensive.'],
      ['Kann ich das Kleid anprobieren?', 'Can I try on the dress?'],
      ['Ich trage heute einen blauen Pullover.', "I'm wearing a blue jumper today."],
      ['Haben Sie das in Größe 40?', 'Do you have this in size 40?'],
    ],
    grammar: `
## Which one? This one!
- **welcher / welche / welches** — which: *Welche Jacke nimmst du?*
- **dieser / diese / dieses** — this: *Diese Jacke ist schön.*

They take the same endings as der/die/das: *der → dieser, die → diese, das → dieses*.

## Useful shopping phrases
- **Was kostet …? / Wie viel kostet …?** — How much is …?
- **Das ist zu teuer.** — That's too expensive.
- **Ich nehme es.** — I'll take it.
- **tragen** changes a → ä: *du trägst, er trägt*.
`,
    conj: { verbs: ['tragen', 'anziehen', 'kaufen'], tenses: ['presente'] },
  },
  {
    id: 'de-a2-02', title: 'Body & health', titleEs: 'Körper und Gesundheit', emoji: '🩺',
    description: 'Say what hurts and go to the doctor.',
    words: [
      ['der Körper', 'the body'], ['der Arm', 'the arm'], ['das Bein', 'the leg'], ['der Fuß', 'the foot'], ['der Bauch', 'the belly / stomach'],
      ['der Rücken', 'the back'], ['der Hals', 'the throat / neck'], ['der Zahn', 'the tooth'], ['die Nase', 'the nose'], ['das Ohr', 'the ear'],
      ['der Arzt', 'the doctor (male)'], ['die Ärztin', 'the doctor (female)'], ['krank', 'ill / sick'], ['gesund', 'healthy'],
      ['das Fieber', 'the fever'], ['die Tablette', 'the pill'], ['die Erkältung', 'the cold'],
      ['wehtun', 'to hurt', 'Mir tut der Kopf weh.', 'My head hurts.'], ['die Schmerzen', 'the pain(s)'],
    ],
    sentences: [
      ['Mir tut der Kopf weh.', 'I have a headache.'],
      ['Ich habe Fieber und bin krank.', 'I have a fever and I am ill.'],
      ['Du musst zum Arzt gehen.', 'You have to go to the doctor.'],
      ['Gute Besserung!', 'Get well soon!'],
      ['Ich habe eine Erkältung.', 'I have a cold.'],
    ],
    grammar: `
## It hurts: wehtun + dative
The body part is the subject; the person is in the **dative**:
- ***Mir** tut der Kopf weh.* — My head hurts (lit. the head hurts to me).
- ***Mir** tun die Füße weh.* — My feet hurt (plural → tun).

| ich → mir | du → dir | er → ihm | sie → ihr |

## Advice with sollen / müssen
- *Du **solltest** im Bett bleiben.* — You should stay in bed.
- *Sie **müssen** diese Tabletten nehmen.* — You have to take these pills.
`,
    conj: { verbs: ['müssen', 'sollen'], tenses: ['presente'] },
  },
  {
    id: 'de-a2-03', title: 'Travel & holidays', titleEs: 'Reisen und Urlaub', emoji: '✈️',
    description: 'Trains, planes, hotels and the beach.',
    words: [
      ['die Reise', 'the trip / journey'], ['der Urlaub', 'the holiday / vacation'], ['das Flugzeug', 'the plane'], ['der Zug', 'the train'],
      ['der Bus', 'the bus'], ['die Fahrkarte', 'the ticket'], ['der Flughafen', 'the airport'], ['der Koffer', 'the suitcase'],
      ['das Hotel', 'the hotel'], ['der Pass', 'the passport'], ['das Meer', 'the sea'], ['der Strand', 'the beach'],
      ['die Berge', 'the mountains'], ['buchen', 'to book'], ['fliegen', 'to fly', 'Wir fliegen nach Spanien.', "We're flying to Spain."],
      ['abfahren', 'to depart'], ['die Abfahrt', 'the departure'], ['die Ankunft', 'the arrival'],
    ],
    sentences: [
      ['Wir fliegen im Sommer nach Spanien.', "We're flying to Spain in summer."],
      ['Der Zug fährt um neun Uhr ab.', 'The train leaves at nine.'],
      ['Ich möchte ein Zimmer buchen.', "I'd like to book a room."],
      ['Im Urlaub liegen wir am Strand.', 'On holiday we lie on the beach.'],
      ['Hast du deinen Pass?', 'Do you have your passport?'],
    ],
    grammar: `
## Where to? nach, in, an, zu
- **nach** + cities and most countries: *nach Berlin, nach Spanien*
- **in** + countries with an article / buildings: *in die Schweiz, in die Türkei, ins Hotel*
- **an** + water: *ans Meer, an den Strand*
- **in** + mountains: *in die Berge*

## Where? (location) → dative
*Ich bin **in** Berlin / **am** Meer / **in den** Bergen / **im** Hotel.*
`,
    conj: { verbs: ['fliegen', 'abfahren', 'ankommen', 'fahren'], tenses: ['presente', 'perfecto'] },
  },
  {
    id: 'de-a2-04', title: 'What did you do?', titleEs: 'Was hast du gemacht?', emoji: '📸',
    description: 'Talk about the past with the Perfekt.',
    words: [
      ['letzte Woche', 'last week'], ['letztes Jahr', 'last year'], ['vor zwei Tagen', 'two days ago'], ['schon einmal', 'ever / before'],
      ['noch nie', 'never (yet)'], ['besuchen', 'to visit'], ['das Museum', 'the museum'], ['das Foto', 'the photo'], ['die Party', 'the party'],
      ['der Ausflug', 'the trip / outing'], ['zuerst', 'first'], ['danach', 'afterwards'], ['später', 'later'], ['endlich', 'finally'],
      ['erleben', 'to experience'], ['das Erlebnis', 'the experience'], ['das Wetter', 'the weather'],
    ],
    sentences: [
      ['Letzte Woche habe ich meine Oma besucht.', 'Last week I visited my grandma.'],
      ['Wir sind vor zwei Tagen angekommen.', 'We arrived two days ago.'],
      ['Warst du schon einmal in Wien?', 'Have you ever been to Vienna?'],
      ['Ich habe noch nie Sushi gegessen.', "I've never eaten sushi."],
      ['Zuerst haben wir gegessen, danach sind wir ins Kino gegangen.', 'First we ate, afterwards we went to the cinema.'],
    ],
    grammar: `
## The spoken past: Perfekt
*Ich **habe** einen Ausflug **gemacht**.* · *Wir **sind** nach Wien **gefahren**.*

## But: sein, haben and modals use the Präteritum
Even in speech, Germans say:
- **war** (was): *Ich **war** gestern im Kino.*
- **hatte** (had): *Ich **hatte** keine Zeit.*
- **konnte, musste, wollte**: *Ich **musste** arbeiten.*

## vor = ago
*vor zwei Tagen* (two days ago), *vor einem Jahr* (a year ago) — vor + dative.
`,
    conj: { verbs: ['besuchen', 'machen', 'sein', 'haben'], tenses: ['perfecto', 'preterito'] },
  },
  {
    id: 'de-a2-05', title: 'Work & jobs', titleEs: 'Arbeit und Beruf', emoji: '💼',
    description: 'Jobs, workplaces and applying for a job.',
    words: [
      ['der Beruf', 'the profession'], ['der Lehrer', 'the teacher (male)'], ['die Lehrerin', 'the teacher (female)'], ['der Koch', 'the cook'],
      ['der Verkäufer', 'the shop assistant'], ['der Ingenieur', 'the engineer'], ['der Kellner', 'the waiter'], ['die Firma', 'the company'],
      ['das Büro', 'the office'], ['der Chef', 'the boss'], ['der Kollege', 'the colleague'], ['das Gehalt', 'the salary'],
      ['die Stelle', 'the job / position'], ['die Bewerbung', 'the application'], ['das Vorstellungsgespräch', 'the job interview'],
      ['Vollzeit', 'full-time'], ['Teilzeit', 'part-time'], ['verdienen', 'to earn'],
    ],
    sentences: [
      ['Ich arbeite als Kellner in einem Café.', 'I work as a waiter in a café.'],
      ['Meine Mutter ist Lehrerin.', 'My mother is a teacher.'],
      ['Ich schreibe eine Bewerbung.', "I'm writing an application."],
      ['Morgen habe ich ein Vorstellungsgespräch.', 'Tomorrow I have a job interview.'],
      ['Sie arbeitet Teilzeit.', 'She works part-time.'],
    ],
    grammar: `
## Jobs: no article
*Ich bin **Lehrer**.* — not *ein Lehrer* (unless you add an adjective: *ein guter Lehrer*).

## Female forms: -in
*der Lehrer → die Lehrer**in***, *der Arzt → die Ärzt**in***, *der Koch → die Köch**in***. Plural: **-innen** (*Lehrerinnen*).

## als = as
*Ich arbeite **als** Ingenieur.* — I work as an engineer.
`,
    conj: { verbs: ['arbeiten', 'verdienen', 'schreiben'], tenses: ['presente', 'perfecto'] },
  },
  {
    id: 'de-a2-06', title: 'At the restaurant', titleEs: 'Im Restaurant', emoji: '🍽️',
    description: 'Order politely and pay the bill.',
    words: [
      ['die Speisekarte', 'the menu'], ['die Rechnung', 'the bill'], ['das Trinkgeld', 'the tip'], ['die Vorspeise', 'the starter'],
      ['das Hauptgericht', 'the main course'], ['der Nachtisch', 'the dessert'], ['die Suppe', 'the soup'], ['der Salat', 'the salad'],
      ['das Hähnchen', 'the chicken'], ['die Kartoffel', 'the potato'], ['das Eis', 'the ice cream / ice'], ['das Glas', 'the glass'],
      ['die Gabel', 'the fork'], ['das Messer', 'the knife'], ['der Löffel', 'the spoon'], ['bestellen', 'to order'],
      ['empfehlen', 'to recommend', 'Was können Sie empfehlen?', 'What can you recommend?'],
    ],
    sentences: [
      ['Ich hätte gern die Speisekarte.', "I'd like the menu, please."],
      ['Die Rechnung, bitte.', 'The bill, please.'],
      ['Was können Sie empfehlen?', 'What can you recommend?'],
      ['Zum Nachtisch nehme ich ein Eis.', "For dessert I'll have an ice cream."],
      ['Zusammen oder getrennt?', 'Together or separately?'],
    ],
    grammar: `
## Ordering politely
- **Ich hätte gern …** — I'd like … (very polite)
- **Ich möchte …** — I'd like …
- **Ich nehme …** — I'll have …

## Paying
*Zahlen, bitte!* — The bill, please! The waiter may ask **Zusammen oder getrennt?** — together or separately?
Tips (*Trinkgeld*) are usually rounded up: *Das macht 18 Euro. — Machen Sie 20.*

**empfehlen** changes e → ie: *Was **empfiehlst** du?*
`,
    conj: { verbs: ['bestellen', 'empfehlen', 'nehmen'], tenses: ['presente'] },
  },
  {
    id: 'de-a2-07', title: 'Phones & technology', titleEs: 'Technik', emoji: '📱',
    description: 'Phones, computers, messages and the internet.',
    words: [
      ['das Handy', 'the mobile phone'], ['der Computer', 'the computer'], ['der Bildschirm', 'the screen'], ['die Tastatur', 'the keyboard'],
      ['die Nachricht', 'the message / news'], ['die E-Mail', 'the email'], ['das Passwort', 'the password'], ['die App', 'the app'],
      ['das Internet', 'the internet'], ['herunterladen', 'to download'], ['schicken', 'to send'], ['das Ladegerät', 'the charger'],
      ['der Akku', 'the battery'], ['das WLAN', 'the wifi'], ['das Video', 'the video'], ['leer', 'empty / flat (battery)'],
    ],
    sentences: [
      ['Mein Akku ist leer.', 'My battery is flat.'],
      ['Wie ist das WLAN-Passwort?', 'What is the wifi password?'],
      ['Ich schicke dir eine Nachricht.', "I'll send you a message."],
      ['Ich habe mein Passwort vergessen.', "I've forgotten my password."],
    ],
    grammar: `
## Two objects: dative (person) + accusative (thing)
*Ich schicke **dir** (dat.) **eine Nachricht** (acc.).* — I send you a message.
*Kannst du **mir** **das Passwort** geben?*

Verbs like this: **geben, schicken, zeigen, schenken, erklären, bringen**.

## Handy ≠ handy
German *das Handy* is a mobile phone — a "false friend".
`,
    conj: { verbs: ['schicken', 'vergessen'], tenses: ['presente', 'perfecto'] },
  },
  {
    id: 'de-a2-08', title: 'Personality & looks', titleEs: 'Aussehen und Charakter', emoji: '🧑',
    description: 'Describe what people look like and what they are like.',
    words: [
      ['intelligent', 'intelligent'], ['fleißig', 'hard-working'], ['faul', 'lazy'], ['schüchtern', 'shy'], ['ernst', 'serious'],
      ['sympathisch', 'likeable / nice'], ['unsympathisch', 'unpleasant'], ['höflich', 'polite'], ['ehrlich', 'honest'],
      ['blond', 'blond'], ['dunkelhaarig', 'dark-haired'], ['schlank', 'slim'], ['dick', 'fat / thick'], ['kurz', 'short (length)'],
      ['lang', 'long'], ['die Haare', 'the hair'], ['der Bart', 'the beard'], ['die Brille', 'the glasses'],
      ['aussehen', 'to look (like)', 'Wie sieht er aus?', 'What does he look like?'],
    ],
    sentences: [
      ['Mein Bruder ist groß und sehr sympathisch.', 'My brother is tall and very likeable.'],
      ['Sie hat lange blonde Haare.', 'She has long blond hair.'],
      ['Er trägt eine Brille.', 'He wears glasses.'],
      ['Wie sieht dein neuer Chef aus?', 'What does your new boss look like?'],
      ['Als Kind war ich sehr schüchtern.', 'As a child I was very shy.'],
    ],
    grammar: `
## Wie sieht er aus? vs Wie ist er?
- **Wie sieht er aus?** — What does he look like? (*aussehen*, separable)
- **Wie ist er?** — What is he like? (personality)

## Adjectives before a noun get endings
*Sie hat **lange** Haare. Er hat einen **kurzen** Bart.* — see the grammar lesson on adjective endings.

## Hair is plural
*Seine Haare **sind** kurz.* — die Haare (plural), unlike English "hair".
`,
    conj: { verbs: ['aussehen', 'sein', 'haben'], tenses: ['presente'] },
  },
]);

const CORE: WordRow[] = [
  // set 5 — describing words
  ['besser', 'better'], ['wichtig', 'important'], ['richtig', 'right / correct'], ['falsch', 'wrong'], ['leicht', 'easy / light'],
  ['schwer', 'difficult / heavy'], ['schnell', 'fast'], ['langsam', 'slow'], ['laut', 'loud'], ['leise', 'quiet'],
  ['warm', 'warm'], ['kalt', 'cold'], ['voll', 'full'], ['sicher', 'safe / sure'], ['möglich', 'possible'],
  ['fertig', 'ready / finished'], ['frei', 'free'], ['gleich', 'same / right away'], ['anders', 'different'], ['einfach', 'simple / easy'],
  ['schwierig', 'difficult'], ['spannend', 'exciting'], ['langweilig', 'boring'], ['ruhig', 'calm / quiet'], ['bekannt', 'well-known'],
  // set 6 — useful verbs
  ['helfen', 'to help'], ['zeigen', 'to show'], ['warten', 'to wait', 'Warte auf mich!', 'Wait for me!'], ['verkaufen', 'to sell'], ['erzählen', 'to tell (a story)'],
  ['vergessen', 'to forget'], ['treffen', 'to meet'], ['laufen', 'to run / to walk'], ['schreiben', 'to write'], ['anrufen', 'to phone'],
  ['einkaufen', 'to go shopping'], ['fernsehen', 'to watch TV'], ['mitkommen', 'to come along'], ['öffnen', 'to open'], ['schließen', 'to close'],
  ['beginnen', 'to begin'], ['gewinnen', 'to win'], ['verlieren', 'to lose'], ['liegen', 'to lie (be lying)'], ['sitzen', 'to sit'],
  ['stellen', 'to put (upright)'], ['legen', 'to lay / to put (flat)'], ['hoffen', 'to hope'], ['erklären', 'to explain'], ['lachen', 'to laugh'],
  // set 7 — linking words
  ['weil', 'because'], ['dass', 'that'], ['wenn', 'if / when'], ['obwohl', 'although'], ['deshalb', 'therefore / that’s why'],
  ['trotzdem', 'nevertheless'], ['außerdem', 'besides'], ['vorher', 'before(hand)'], ['nachher', 'afterwards'], ['sofort', 'immediately'],
  ['plötzlich', 'suddenly'], ['leider', 'unfortunately'], ['zum Glück', 'luckily'], ['zum Beispiel', 'for example'], ['eigentlich', 'actually'],
  ['ungefähr', 'about / approximately'], ['fast', 'almost'], ['genau', 'exactly'], ['ziemlich', 'quite / rather'], ['besonders', 'especially'],
  ['sogar', 'even'], ['überall', 'everywhere'], ['jemand', 'someone'], ['niemand', 'nobody'], ['gerade', 'just / right now'],
];

const CORE_SENTENCES: SentenceRow[][] = [
  [['Das ist sehr wichtig.', 'That is very important.'], ['Deutsch ist nicht so schwer.', "German isn't that difficult."], ['Bist du fertig?', 'Are you ready?'], ['Der Film war langweilig.', 'The film was boring.']],
  [['Kannst du mir helfen?', 'Can you help me?'], ['Ich warte auf den Bus.', "I'm waiting for the bus."], ['Wir treffen uns um acht.', "We're meeting at eight."], ['Ich rufe dich morgen an.', "I'll call you tomorrow."]],
  [['Ich lerne Deutsch, weil ich in Berlin arbeite.', 'I learn German because I work in Berlin.'], ['Leider habe ich keine Zeit.', "Unfortunately I don't have time."], ['Ich glaube, dass er recht hat.', 'I think that he is right.'], ['Es ist ungefähr zehn Uhr.', "It's about ten o'clock."]],
];

const CORE_GRAMMAR = `
## Why these words?
More of the most frequent German words — the ones that make your sentences sound natural.

- **weil, dass, wenn, obwohl** send the verb to the **end** of the clause: *…, weil ich müde **bin**.*
- **deshalb, trotzdem, außerdem** count as position 1, so the verb comes **right after**: *Deshalb **bleibe** ich zu Hause.*
`;

const CORE_UNITS = [0, 1, 2].map((i) =>
  units('A2', [{
    id: `de-core-${i + 5}`, title: `Top words ${i + 5}`, titleEs: `Häufige Wörter ${i + 5}`, emoji: '⭐',
    description: `Most-used German words, set ${i + 5} of 7.`,
    words: CORE.slice(i * 25, i * 25 + 25), sentences: CORE_SENTENCES[i], grammar: CORE_GRAMMAR,
  }])[0],
);

export const DE_A2_UNITS = [...TOPICS, ...CORE_UNITS];

export const DE_A2_UNIT_LESSONS: Record<string, string[]> = {
  'de-a2-01': ['de-g-adjectives'],
  'de-a2-02': ['de-g-dative', 'de-g-pronouns'],
  'de-a2-03': ['de-g-twoway'],
  'de-a2-04': ['de-g-praeteritum', 'de-g-perfekt'],
  'de-a2-05': ['de-g-weil-dass'],
  'de-a2-06': ['de-g-dative'],
  'de-a2-07': ['de-g-pronouns'],
  'de-a2-08': ['de-g-adjectives', 'de-g-comparison'],
  'de-core-5': ['de-g-comparison'],
  'de-core-7': ['de-g-weil-dass'],
};
