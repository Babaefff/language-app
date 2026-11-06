import type { Reading } from '../types';

export const READINGS_DE: Reading[] = [
  {
    id: 'de-r-lena',
    level: 'A1',
    title: 'Ich heiße Lena',
    paragraphs: [
      'Hallo! Ich heiße Lena und ich bin vierundzwanzig Jahre alt. Ich komme aus Hamburg, aber jetzt wohne ich in München.',
      'Ich habe eine kleine Familie. Meine Mutter heißt Sabine und mein Vater heißt Peter. Ich habe einen Bruder. Er heißt Jonas und er ist achtzehn.',
      'Ich bin Studentin. Ich lerne Spanisch und Englisch. Am Wochenende spiele ich gern Tennis und ich lese viele Bücher.',
    ],
    translation: [
      "Hello! My name is Lena and I'm twenty-four years old. I come from Hamburg, but now I live in Munich.",
      'I have a small family. My mother is called Sabine and my father is called Peter. I have a brother. He is called Jonas and he is eighteen.',
      'I am a student. I study Spanish and English. At the weekend I like playing tennis and I read lots of books.',
    ],
    glossary: { vierundzwanzig: 'twenty-four', jahre: 'years', hamburg: 'Hamburg (city in the north)', münchen: 'Munich', kleine: 'small', achtzehn: 'eighteen', studentin: 'student (female)', spanisch: 'Spanish', englisch: 'English', tennis: 'tennis', viele: 'many', bücher: 'books' },
    questions: [
      { q: 'Woher kommt Lena?', options: ['Aus München', 'Aus Hamburg', 'Aus Berlin'], answer: 1 },
      { q: 'Wie alt ist Jonas?', options: ['Achtzehn', 'Vierundzwanzig', 'Zwölf'], answer: 0 },
      { q: 'Was macht Lena am Wochenende?', options: ['Sie arbeitet', 'Sie spielt Tennis', 'Sie kocht'], answer: 1 },
    ],
  },
  {
    id: 'de-r-tag',
    level: 'A1',
    title: 'Mein Tag',
    paragraphs: [
      'Ich heiße Max und ich arbeite in einer Bank in Frankfurt. Jeden Tag stehe ich um sechs Uhr auf. Ich dusche und frühstücke: Brot mit Käse und einen Kaffee.',
      'Um sieben Uhr fahre ich mit der U-Bahn zur Arbeit. Ich arbeite von acht bis fünf. Mittags esse ich mit meinen Kollegen in der Kantine.',
      'Am Abend koche ich oder ich gehe mit Freunden ins Restaurant. Manchmal sehe ich fern. Um elf Uhr gehe ich ins Bett.',
    ],
    translation: [
      'My name is Max and I work in a bank in Frankfurt. Every day I get up at six. I shower and have breakfast: bread with cheese and a coffee.',
      'At seven I take the underground to work. I work from eight to five. At midday I eat with my colleagues in the canteen.',
      'In the evening I cook or I go to a restaurant with friends. Sometimes I watch TV. At eleven I go to bed.',
    ],
    glossary: { frankfurt: 'Frankfurt', 'u-bahn': 'underground / subway', mittags: 'at midday', kollegen: 'colleagues', kantine: 'canteen', freunden: 'friends (dative)', bett: 'bed' },
    questions: [
      { q: 'Wann steht Max auf?', options: ['Um sechs Uhr', 'Um sieben Uhr', 'Um acht Uhr'], answer: 0 },
      { q: 'Wie fährt er zur Arbeit?', options: ['Mit dem Auto', 'Mit der U-Bahn', 'Mit dem Fahrrad'], answer: 1 },
      { q: 'Was macht er manchmal am Abend?', options: ['Er sieht fern', 'Er arbeitet', 'Er schwimmt'], answer: 0 },
    ],
  },
  {
    id: 'de-r-wochenende',
    level: 'A1',
    title: 'Ein Wochenende in Berlin',
    paragraphs: [
      'Am Wochenende bin ich mit meiner Freundin nach Berlin gefahren. Wir sind am Freitagabend mit dem Zug angekommen.',
      'Am Samstag haben wir das Brandenburger Tor gesehen und viele Fotos gemacht. Danach haben wir in einem kleinen Café Kuchen gegessen.',
      'Am Sonntag hat es geregnet, also sind wir ins Museum gegangen. Am Abend sind wir müde, aber glücklich nach Hause gefahren.',
    ],
    translation: [
      'At the weekend I went to Berlin with my girlfriend. We arrived by train on Friday evening.',
      'On Saturday we saw the Brandenburg Gate and took lots of photos. Afterwards we ate cake in a small café.',
      'On Sunday it rained, so we went to the museum. In the evening we went home tired but happy.',
    ],
    glossary: { gefahren: 'gone / travelled (fahren, Perfekt)', freitagabend: 'Friday evening', zug: 'train', angekommen: 'arrived', 'brandenburger': 'Brandenburg', tor: 'gate', gesehen: 'seen', fotos: 'photos', gemacht: 'made / taken', danach: 'afterwards', café: 'café', kuchen: 'cake', gegessen: 'eaten', geregnet: 'rained', museum: 'museum', gegangen: 'gone', hause: 'home (nach Hause)' },
    questions: [
      { q: 'Wie sind sie nach Berlin gefahren?', options: ['Mit dem Zug', 'Mit dem Auto', 'Mit dem Flugzeug'], answer: 0 },
      { q: 'Was haben sie im Café gegessen?', options: ['Pizza', 'Kuchen', 'Suppe'], answer: 1 },
      { q: 'Warum sind sie ins Museum gegangen?', options: ['Weil es geregnet hat', 'Weil es kalt war', 'Weil sie müde waren'], answer: 0 },
    ],
  },
  {
    id: 'de-r-rotkaeppchen',
    level: 'B1+',
    title: 'Rotkäppchen',
    source: 'Brüder Grimm, Kinder- und Hausmärchen (1857) — the opening (public domain)',
    paragraphs: [
      'Es war einmal eine kleine süße Dirne, die hatte jedermann lieb, der sie nur ansah, am allerliebsten aber ihre Großmutter, die wußte gar nicht, was sie alles dem Kinde geben sollte.',
      'Einmal schenkte sie ihm ein Käppchen von rotem Sammet, und weil ihm das so wohl stand und es nichts anders mehr tragen wollte, hieß es nur das Rotkäppchen.',
    ],
    translation: [
      'Once upon a time there was a sweet little girl whom everyone who looked at her loved, but most of all her grandmother, who did not know what she could give the child next.',
      'Once she gave her a little cap of red velvet, and because it suited her so well and she would not wear anything else, she was simply called Little Red Cap.',
    ],
    glossary: { 'es war einmal': 'once upon a time', süße: 'sweet', dirne: '(old) girl, maiden', jedermann: 'everyone', lieb: 'dear (lieb haben: to love)', ansah: 'looked at (ansehen)', allerliebsten: 'most of all', wußte: '(old spelling) wusste — knew', kinde: '(old) child (dative)', schenkte: 'gave (as a gift)', käppchen: 'little cap', rotem: 'red', sammet: '(old) velvet — modern: Samt', wohl: 'well', stand: 'suited (stehen)', tragen: 'to wear', hieß: 'was called (heißen)' },
    questions: [
      { q: 'Wer liebte das Mädchen am meisten?', options: ['Die Mutter', 'Die Großmutter', 'Der Jäger'], answer: 1 },
      { q: 'Was schenkte die Großmutter dem Kind?', options: ['Ein rotes Käppchen', 'Einen Kuchen', 'Ein Buch'], answer: 0 },
    ],
  },
];
