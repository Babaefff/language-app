import type { Reading } from '../types';

// Traditional songs and carols, all in the public domain. Spelling lightly modernised.
export const SONGS_DE: Reading[] = [
  {
    id: 'de-s-entchen', song: true, level: 'A1', title: 'Alle meine Entchen',
    youtube: 'NN8_R44Ig0g', timings: [17, 19.5, 22.2, 25.1, 27.8, 37.3, 40, 42.6, 45.5, 48.3, 57.4, 60, 62.9, 65.3, 68.1],
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
    paragraphs: [
      'Hänschen klein\nging allein\nin die weite Welt hinein.\nStock und Hut\nsteht ihm gut,\nist gar wohlgemut.',
      'Aber Mutter weinet sehr,\nhat ja nun kein Hänschen mehr.\nDa besinnt sich das Kind,\nläuft nach Haus geschwind.',
    ],
    translation: [
      "Little Hans,\nwent off alone\nout into the wide world.\nStick and hat\nsuit him well,\nhe is in high spirits.",
      "But his mother cries a lot,\nnow she has no little Hans any more.\nThen the child thinks again\nand runs home quickly.",
    ],
    glossary: { hänschen: 'little Hans', ging: 'went (gehen)', allein: 'alone', weite: 'wide', hinein: 'into', stock: 'walking stick', hut: 'hat', steht: 'suits (stehen + dative)', gar: '(old) very', wohlgemut: 'cheerful', weinet: '(old) weint — cries', besinnt: 'thinks again (sich besinnen)', geschwind: '(old) quickly' },
    questions: [
      { q: 'Wohin geht Hänschen?', options: ['Nach Hause', 'In die weite Welt', 'In die Schule'], answer: 1 },
      { q: 'Was hat er dabei?', options: ['Stock und Hut', 'Einen Koffer', 'Ein Fahrrad'], answer: 0 },
      { q: 'Warum geht er nach Hause?', options: ['Er hat Hunger', 'Es regnet', 'Seine Mutter weint'], answer: 2 },
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
    source: 'Ernst Anschütz (1824) — public domain',
    paragraphs: [
      'O Tannenbaum, o Tannenbaum,\nwie treu sind deine Blätter!\nDu grünst nicht nur zur Sommerzeit,\nnein, auch im Winter, wenn es schneit.\nO Tannenbaum, o Tannenbaum,\nwie treu sind deine Blätter!',
      'O Tannenbaum, o Tannenbaum,\ndu kannst mir sehr gefallen!\nWie oft hat nicht zur Weihnachtszeit\nein Baum von dir mich hoch erfreut!\nO Tannenbaum, o Tannenbaum,\ndu kannst mir sehr gefallen!',
    ],
    translation: [
      "O fir tree, o fir tree,\nhow faithful are your leaves!\nYou are green not only in summertime,\nno, also in winter when it snows.\nO fir tree, o fir tree,\nhow faithful are your leaves!",
      "O fir tree, o fir tree,\nhow much I like you!\nHow often at Christmas time\nhas a tree like you delighted me!\nO fir tree, o fir tree,\nhow much I like you!",
    ],
    glossary: { tannenbaum: 'fir tree', treu: 'faithful / loyal', blätter: 'leaves (here: needles)', grünst: 'are green (grünen)', sommerzeit: 'summertime', schneit: 'it snows (schneien)', weihnachtszeit: 'Christmas time', hoch: 'highly / greatly', erfreut: 'delighted (erfreuen)' },
    questions: [
      { q: 'Wann ist der Tannenbaum grün?', options: ['Nur im Sommer', 'Auch im Winter', 'Nur zu Weihnachten'], answer: 1 },
      { q: 'Wie sind die Blätter des Baums?', options: ['Treu', 'Rot', 'Klein'], answer: 0 },
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
