import type { Reading } from '../types';

// Traditional songs and carols, all in the public domain. Spelling lightly modernised.
export const SONGS_DE: Reading[] = [
  {
    id: 'de-s-entchen', song: true, level: 'A1', title: 'Alle meine Entchen',
    youtube: 'NN8_R44Ig0g', timings: [15.9, 18.6, 21.3, 23.6, 26.7, 35.9, 38.9, 41.5, 44.3, 46.6, 55.6, 58.6, 61.6, 63.8, 66.7],
    source: 'Traditional children’s song (public domain)',
    paragraphs: [
      'Alle meine Entchen\nschwimmen auf dem See,\nschwimmen auf dem See,\nKöpfchen in das Wasser,\nSchwänzchen in die Höh.',
      'Alle meine Täubchen\ngurren auf dem Dach,\ngurren auf dem Dach,\nfliegt eins in die Lüfte,\nfliegen alle nach.',
      'Alle meine Hühner\nscharren in dem Stroh,\nscharren in dem Stroh,\nfinden sie ein Körnchen,\nsind sie alle froh.',
    ],
    translation: [
      "All my little ducks\nare swimming on the lake,\nare swimming on the lake,\nlittle heads in the water,\nlittle tails up high.",
      "All my little doves\nare cooing on the roof,\nare cooing on the roof,\nif one flies up into the air,\nthey all fly after it.",
      "All my hens\nare scratching in the straw,\nare scratching in the straw,\nif they find a little grain,\nthey are all happy.",
    ],
    glossary: { entchen: 'little ducks (-chen = small)', köpfchen: 'little head', schwänzchen: 'little tail', höh: 'height (in die Höh: up high)', täubchen: 'little doves', gurren: 'to coo', dach: 'roof', lüfte: 'the air (poetic)', nach: 'after (nachfliegen: to fly after)', hühner: 'hens', scharren: 'to scratch (the ground)', stroh: 'straw', körnchen: 'little grain', froh: 'happy' },
    questions: [
      { q: 'Wo schwimmen die Entchen?', options: ['Im Fluss', 'Auf dem See', 'Im Meer'], answer: 1 },
      { q: 'Wo sind die Täubchen?', options: ['Auf dem Dach', 'Im Stroh', 'Im Wasser'], answer: 0 },
      { q: 'Wann sind die Hühner froh?', options: ['Wenn es regnet', 'Wenn sie schwimmen', 'Wenn sie ein Körnchen finden'], answer: 2 },
    ],
  },
  {
    id: 'de-s-haenschen', song: true, level: 'A1', title: 'Hänschen klein',
    source: 'Traditional children’s song, words by Franz Wiedemann (1860) — public domain',
    youtube: 'estWuexvkqs',
    paragraphs: [
      'Hänschen klein ging allein in die weite Welt hinein.\nStock und Hut steht ihm gut, ist gar wohlgemut.\nDoch die Mutter weinet sehr, hat ja nun kein Hänschen mehr:\n„Wünsch dir Glück!“, sagt ihr Blick, „Kehr nur bald zurück!“',
      'Sieben Jahr, trüb und klar, Hänschen in der Fremde war,\nda besinnt sich das Kind, eilt nach Haus geschwind.\nDoch nun ist’s kein Hänschen mehr, nein, ein großer Hans ist er,\nbraun gebrannt Stirn und Hand, wird er wohl erkannt?',
      'Eins, zwei, drei gehn vorbei, wissen nicht, wer das wohl sei,\nSchwester spricht: „Welch Gesicht!“, kennt den Bruder nicht.\nKommt daher sein Mütterlein, schaut ihm kaum ins Aug hinein,\nruft sie schon: „Hans, mein Sohn! Grüß dich Gott, mein Sohn!“',
    ],
    translation: [
      "Little Hans went off alone into the wide world.\nStick and hat suit him well, he is in high spirits.\nBut his mother cries a lot: now she has no little Hans any more.\n“I wish you luck!” her look says. “Just come back soon!”",
      "For seven years, in dull days and bright, little Hans was far from home,\nthen the child thinks it over and hurries home quickly.\nBut now he is no little Hans any more — no, he is a big Hans,\nforehead and hands tanned brown: will anyone recognise him?",
      "One, two, three people walk past; they don’t know who that could be.\nHis sister says: “What a face!” — she doesn’t recognise her brother.\nThen along comes his dear mother; she barely looks into his eyes\nbefore she calls: “Hans, my son! God bless you, my son!”",
    ],
    glossary: { hänschen: 'little Hans', ging: 'went (gehen)', allein: 'alone', weite: 'wide', hinein: 'into', stock: 'walking stick', hut: 'hat', steht: 'suits (stehen + dative)', gar: '(old) very', wohlgemut: 'cheerful', doch: 'but', weinet: '(old) weint — cries', wünsch: 'I wish (wünschen)', glück: 'luck / happiness', blick: 'look / gaze', kehr: 'kehr zurück: come back (zurückkehren)', zurück: 'back', trüb: 'dull, cloudy', klar: 'clear, bright', fremde: 'in der Fremde: far from home, abroad', besinnt: 'thinks it over (sich besinnen)', eilt: 'hurries (eilen)', geschwind: '(old) quickly', großer: 'big', gebrannt: 'braun gebrannt: tanned', stirn: 'forehead', erkannt: 'recognised (erkennen)', gehn: 'go / walk (gehen)', vorbei: 'past', sei: 'might be (subjunctive of sein)', spricht: 'says (sprechen)', welch: 'what a', gesicht: 'face', bruder: 'brother', daher: 'along', mütterlein: 'dear (little) mother', schaut: 'looks (schauen)', kaum: 'barely', aug: '(old) Auge — eye', ruft: 'calls (rufen)', sohn: 'son', grüß: 'Grüß dich Gott: hello / God bless you (southern German)' },
    questions: [
      { q: 'Wohin geht Hänschen?', options: ['Nach Hause', 'In die weite Welt', 'In die Schule'], answer: 1 },
      { q: 'Wie lange war Hänschen in der Fremde?', options: ['Sieben Tage', 'Sieben Monate', 'Sieben Jahre'], answer: 2 },
      { q: 'Wer erkennt Hans?', options: ['Die Schwester', 'Die Mutter', 'Der Nachbar'], answer: 1 },
    ],
  },
  {
    id: 'de-s-vogel', song: true, level: 'A1', title: 'Kommt ein Vogel geflogen',
    source: 'Traditional folk song (public domain)',
    paragraphs: [
      'Kommt ein Vogel geflogen,\nsetzt sich nieder auf meinen Fuß,\nhat einen Zettel im Schnabel,\nvon der Mutter einen Gruß.',
      'Lieber Vogel, flieg weiter,\nnimm einen Gruß mit und einen Kuss,\ndenn ich kann dich nicht begleiten,\nweil ich hier bleiben muss.',
    ],
    translation: [
      "A bird comes flying,\nsits down on my foot,\nhas a note in its beak,\na greeting from my mother.",
      "Dear bird, fly on,\ntake a greeting and a kiss with you,\nbecause I can’t go with you,\nas I have to stay here.",
    ],
    glossary: { geflogen: 'flying (kommt geflogen: comes flying)', setzt: 'sits down (sich setzen)', nieder: 'down', fuß: 'foot', zettel: 'note / slip of paper', schnabel: 'beak', gruß: 'greeting', lieber: 'dear', weiter: 'on / further', kuss: 'kiss', begleiten: 'to go with / accompany' },
    questions: [
      { q: 'Wohin setzt sich der Vogel?', options: ['Auf den Baum', 'Auf das Dach', 'Auf den Fuß'], answer: 2 },
      { q: 'Von wem ist der Gruß?', options: ['Von der Mutter', 'Vom Vater', 'Vom Freund'], answer: 0 },
      { q: 'Warum fliegt das Kind nicht mit?', options: ['Es hat Angst', 'Es muss hier bleiben', 'Es ist krank'], answer: 1 },
    ],
  },
  {
    id: 'de-s-tannenbaum', song: true, level: 'A2', title: 'O Tannenbaum',
    youtube: '27JleM39TPY', timings: [3.5, 7.2, 11.6, 15.7, 19.5, 23.7, 31.2, 35.8, 39.6, 43.9, 48.1, 51.8, 59.7, 64, 67.5, 72, 75.8, 80.2],
    source: 'Ernst Anschütz (1824) — public domain',
    paragraphs: [
      'O Tannenbaum, o Tannenbaum,\nwie treu sind deine Blätter!\nDu grünst nicht nur zur Sommerszeit,\nnein, auch im Winter, wenn es schneit.\nO Tannenbaum, o Tannenbaum,\nwie treu sind deine Blätter!',
      'O Tannenbaum, o Tannenbaum,\ndu kannst mir sehr gefallen!\nWie oft hat schon zur Weihnachtszeit\nein Baum von dir mich hocherfreut!\nO Tannenbaum, o Tannenbaum,\ndu kannst mir sehr gefallen!',
      'O Tannenbaum, o Tannenbaum,\ndein Kleid will mich was lehren:\ndie Hoffnung und Beständigkeit\ngibt Trost und Kraft zu jeder Zeit.\nO Tannenbaum, o Tannenbaum,\ndein Kleid will mich was lehren!',
    ],
    translation: [
      "O fir tree, o fir tree,\nhow faithful are your leaves!\nYou are green not only in summertime,\nno, also in winter when it snows.\nO fir tree, o fir tree,\nhow faithful are your leaves!",
      "O fir tree, o fir tree,\nhow much I like you!\nHow often at Christmas time\nhas a tree like you delighted me!\nO fir tree, o fir tree,\nhow much I like you!",
      "O fir tree, o fir tree,\nyour green dress wants to teach me something:\nhope and constancy\ngive comfort and strength at any time.\nO fir tree, o fir tree,\nyour green dress wants to teach me something!",
    ],
    glossary: { tannenbaum: 'fir tree', treu: 'faithful / loyal', blätter: 'leaves (here: needles)', grünst: 'are green (grünen)', sommerszeit: 'summertime', schneit: 'it snows (schneien)', schon: 'already (here: so often)', weihnachtszeit: 'Christmas time', hocherfreut: 'greatly delighted', kleid: 'dress (here: its green needles)', was: 'something (= etwas)', lehren: 'to teach', hoffnung: 'hope', beständigkeit: 'constancy, staying the same', trost: 'comfort', kraft: 'strength' },
    questions: [
      { q: 'Wann ist der Tannenbaum grün?', options: ['Nur im Sommer', 'Auch im Winter', 'Nur zu Weihnachten'], answer: 1 },
      { q: 'Wie sind die Blätter des Baums?', options: ['Treu', 'Rot', 'Klein'], answer: 0 },
      { q: 'Was gibt der Baum zu jeder Zeit?', options: ['Geld', 'Trost und Kraft', 'Licht'], answer: 1 },
    ],
  },
  {
    id: 'de-s-stille-nacht', song: true, level: 'B1', title: 'Stille Nacht, heilige Nacht',
    source: 'Joseph Mohr (1816), music by Franz Xaver Gruber (1818) — public domain',
    paragraphs: [
      'Stille Nacht, heilige Nacht!\nAlles schläft, einsam wacht\nnur das traute hochheilige Paar.\nHolder Knabe im lockigen Haar,\nschlaf in himmlischer Ruh!\nSchlaf in himmlischer Ruh!',
      'Stille Nacht, heilige Nacht!\nHirten erst kundgemacht,\ndurch der Engel Halleluja\ntönt es laut von fern und nah:\nChrist, der Retter, ist da!\nChrist, der Retter, ist da!',
    ],
    translation: [
      "Silent night, holy night!\nAll is asleep; alone keeps watch\nonly the dear, most holy couple.\nLovely boy with curly hair,\nsleep in heavenly peace!\nSleep in heavenly peace!",
      "Silent night, holy night!\nFirst made known to the shepherds,\nthrough the angels’ Hallelujah\nit rings out loud from far and near:\nChrist the Saviour is here!\nChrist the Saviour is here!",
    ],
    glossary: { stille: 'silent', heilige: 'holy', einsam: 'alone', wacht: 'keeps watch / is awake (wachen)', traute: '(old) dear, beloved', hochheilige: 'most holy', paar: 'couple', holder: '(old) lovely', knabe: '(old) boy', lockigen: 'curly', himmlischer: 'heavenly', ruh: '(old) Ruhe — peace, rest', hirten: 'shepherds', erst: 'first', kundgemacht: 'made known', engel: 'angels', tönt: 'sounds / rings out', fern: 'far', nah: 'near', retter: 'saviour' },
    questions: [
      { q: 'Was macht alles in der Nacht?', options: ['Es singt', 'Es schläft', 'Es tanzt'], answer: 1 },
      { q: 'Wem wurde die Nachricht zuerst gesagt?', options: ['Den Königen', 'Den Kindern', 'Den Hirten'], answer: 2 },
    ],
  },
  {
    id: 'de-s-gedanken', song: true, level: 'B1', title: 'Die Gedanken sind frei',
    source: 'Traditional folk song (c. 1780, printed 1842) — public domain',
    paragraphs: [
      'Die Gedanken sind frei,\nwer kann sie erraten?\nSie fliehen vorbei\nwie nächtliche Schatten.\nKein Mensch kann sie wissen,\nkein Jäger erschießen.\nEs bleibet dabei:\nDie Gedanken sind frei!',
      'Ich denke, was ich will,\nund was mich beglücket,\ndoch alles in der Still\nund wie es sich schicket.\nMein Wunsch und Begehren\nkann niemand verwehren,\nes bleibet dabei:\nDie Gedanken sind frei!',
    ],
    translation: [
      "Thoughts are free,\nwho can guess them?\nThey fly past\nlike shadows in the night.\nNo one can know them,\nno hunter can shoot them.\nThat’s how it stays:\nthoughts are free!",
      "I think what I want\nand what makes me happy,\nbut all of it quietly\nand as is proper.\nMy wishes and desires\nno one can forbid,\nthat’s how it stays:\nthoughts are free!",
    ],
    glossary: { gedanken: 'thoughts', erraten: 'to guess', fliehen: 'to flee / fly', vorbei: 'past', nächtliche: 'of the night', schatten: 'shadows', jäger: 'hunter', erschießen: 'to shoot (dead)', bleibet: '(old) bleibt', dabei: 'es bleibt dabei: that’s how it stays', beglücket: '(old) beglückt — makes happy', still: '(old) in der Stille — quietly', schicket: '(old) sich schicken — to be proper', begehren: 'desire', niemand: 'nobody', verwehren: 'to forbid / deny' },
    questions: [
      { q: 'Womit vergleicht das Lied die Gedanken?', options: ['Mit Vögeln', 'Mit nächtlichen Schatten', 'Mit Wolken'], answer: 1 },
      { q: 'Wer kann die Gedanken erschießen?', options: ['Kein Jäger', 'Die Polizei', 'Der König'], answer: 0 },
      { q: 'Was ist die Botschaft des Liedes?', options: ['Man soll nicht denken', 'Gedanken sind gefährlich', 'Niemand kann kontrollieren, was ich denke'], answer: 2 },
    ],
  },
];
