import type { Reading } from '../types';

export const READINGS_DE_A2: Reading[] = [
  {
    id: 'de-r-einkaufen',
    level: 'A2',
    title: 'Ein neuer Mantel',
    paragraphs: [
      'Letzten Samstag bin ich in die Stadt gefahren, weil ich einen neuen Mantel gebraucht habe. Mein alter Mantel war schon zehn Jahre alt und hatte ein großes Loch.',
      'Im ersten Geschäft waren die Mäntel sehr schön, aber leider viel zu teuer. Im zweiten Geschäft habe ich einen grauen Mantel anprobiert. Er hat mir gut gefallen, aber er war zu klein.',
      'Die Verkäuferin war sehr freundlich und hat mir einen Mantel in Größe 42 gebracht. Der hat perfekt gepasst! Ich habe ihn sofort gekauft und bin glücklich nach Hause gegangen.',
    ],
    translation: [
      'Last Saturday I went into town because I needed a new coat. My old coat was already ten years old and had a big hole.',
      'In the first shop the coats were very nice, but unfortunately far too expensive. In the second shop I tried on a grey coat. I liked it, but it was too small.',
      'The shop assistant was very friendly and brought me a coat in size 42. It fitted perfectly! I bought it straight away and went home happy.',
    ],
    glossary: { mantel: 'coat', mäntel: 'coats', gebraucht: 'needed (brauchen)', loch: 'hole', ersten: 'first', zweiten: 'second', grauen: 'grey', anprobiert: 'tried on', gefallen: 'pleased (gefallen) — I liked it', verkäuferin: 'shop assistant (female)', gebracht: 'brought', gepasst: 'fitted (passen)', perfekt: 'perfectly', gekauft: 'bought', gegangen: 'gone' },
    questions: [
      { q: 'Warum brauchte er einen neuen Mantel?', options: ['Der alte hatte ein Loch', 'Es war kalt', 'Er hatte Geburtstag'], answer: 0 },
      { q: 'Was war das Problem mit dem grauen Mantel?', options: ['Er war zu teuer', 'Er war zu klein', 'Er war hässlich'], answer: 1 },
      { q: 'Welche Größe hat gepasst?', options: ['40', '42', '44'], answer: 1 },
    ],
  },
  {
    id: 'de-r-arzt',
    level: 'A2',
    title: 'Beim Arzt',
    paragraphs: [
      '„Guten Tag, Frau Weber. Was fehlt Ihnen?“, fragt der Arzt. „Seit drei Tagen tut mir der Hals weh und ich habe Fieber“, antwortet Frau Weber. „Ich fühle mich sehr müde.“',
      'Der Arzt untersucht sie. „Sie haben eine starke Erkältung. Sie müssen viel Tee trinken und im Bett bleiben. Ich gebe Ihnen auch Tabletten gegen das Fieber.“',
      '„Muss ich morgen arbeiten?“, fragt Frau Weber. „Nein, auf keinen Fall. Ich schreibe Sie für diese Woche krank. Gute Besserung!“',
    ],
    translation: [
      '"Good afternoon, Mrs Weber. What\'s the matter?" asks the doctor. "My throat has hurt for three days and I have a fever," answers Mrs Weber. "I feel very tired."',
      'The doctor examines her. "You have a bad cold. You must drink lots of tea and stay in bed. I\'ll also give you tablets for the fever."',
      '"Do I have to work tomorrow?" asks Mrs Weber. "No, definitely not. I\'ll sign you off sick for this week. Get well soon!"',
    ],
    glossary: { fehlt: 'is missing — Was fehlt Ihnen? = What is wrong?', seit: 'for / since', antwortet: 'answers', fühle: 'feel (sich fühlen)', untersucht: 'examines', starke: 'strong / bad', gegen: 'against / for', 'auf keinen fall': 'definitely not', krank: 'ill — krankschreiben: to sign off sick', besserung: 'recovery — Gute Besserung: get well soon' },
    questions: [
      { q: 'Was tut Frau Weber weh?', options: ['Der Kopf', 'Der Hals', 'Der Rücken'], answer: 1 },
      { q: 'Was soll sie trinken?', options: ['Kaffee', 'Tee', 'Wasser'], answer: 1 },
      { q: 'Muss sie morgen arbeiten?', options: ['Ja', 'Nein', 'Nur am Nachmittag'], answer: 1 },
    ],
  },
  {
    id: 'de-r-job',
    level: 'A2',
    title: 'Mein neuer Job',
    paragraphs: [
      'Seit einem Monat arbeite ich als Grafikdesignerin in einer kleinen Firma in Köln. Ich bin sehr froh, dass ich die Stelle bekommen habe, denn ich habe lange gesucht.',
      'Meine Kollegen sind nett und hilfsbereit. Wir essen oft zusammen in der Mittagspause. Mein Chef ist ziemlich streng, aber er erklärt alles sehr genau.',
      'Das Einzige, was mir nicht so gut gefällt, ist der Weg zur Arbeit. Ich fahre jeden Tag eine Stunde mit dem Zug. Deshalb möchte ich bald näher an der Firma wohnen.',
    ],
    translation: [
      "For a month I've been working as a graphic designer in a small company in Cologne. I'm very glad that I got the job, because I looked for a long time.",
      'My colleagues are nice and helpful. We often eat together in the lunch break. My boss is quite strict, but he explains everything very precisely.',
      "The only thing I don't like so much is the commute. I travel an hour by train every day. That's why I'd like to live closer to the company soon.",
    ],
    glossary: { seit: 'since / for', grafikdesignerin: 'graphic designer (female)', köln: 'Cologne', froh: 'glad', bekommen: 'got / received', gesucht: 'looked for', hilfsbereit: 'helpful', mittagspause: 'lunch break', streng: 'strict', erklärt: 'explains', einzige: 'only (thing)', stunde: 'hour', näher: 'closer' },
    questions: [
      { q: 'Wie lange arbeitet sie schon dort?', options: ['Seit einem Jahr', 'Seit einem Monat', 'Seit einer Woche'], answer: 1 },
      { q: 'Wie ist ihr Chef?', options: ['Streng, aber er erklärt gut', 'Faul', 'Sehr lustig'], answer: 0 },
      { q: 'Was gefällt ihr nicht?', options: ['Die Kollegen', 'Der Weg zur Arbeit', 'Das Essen'], answer: 1 },
    ],
  },
  {
    id: 'de-r-bremen',
    level: 'B1+',
    title: 'Die Bremer Stadtmusikanten',
    source: 'Brüder Grimm, Kinder- und Hausmärchen (1857) — the opening (public domain)',
    paragraphs: [
      'Es hatte ein Mann einen Esel, der schon lange Jahre die Säcke unverdrossen zur Mühle getragen hatte, dessen Kräfte aber nun zu Ende gingen, so daß er zur Arbeit immer untauglicher ward.',
      'Da dachte der Herr daran, ihn aus dem Futter zu schaffen, aber der Esel merkte, daß kein guter Wind wehte, lief fort und machte sich auf den Weg nach Bremen; dort, meinte er, könnte er ja Stadtmusikant werden.',
    ],
    translation: [
      'A man had a donkey which for many years had tirelessly carried the sacks to the mill, but whose strength was now coming to an end, so that he was becoming less and less fit for work.',
      'Then his master thought about no longer feeding him, but the donkey noticed that an ill wind was blowing, ran away and set off for Bremen; there, he thought, he could become a town musician.',
    ],
    glossary: { esel: 'donkey', säcke: 'sacks', unverdrossen: 'tirelessly', mühle: 'mill', getragen: 'carried', dessen: 'whose', kräfte: 'strength', daß: '(old spelling) dass — that', untauglicher: 'less fit / less useful', ward: '(old) wurde — became', herr: 'master', futter: 'animal feed', schaffen: 'to get rid of (here)', merkte: 'noticed', wehte: 'was blowing', fort: 'away', meinte: 'thought', stadtmusikant: 'town musician' },
    questions: [
      { q: 'Was hat der Esel jahrelang gemacht?', options: ['Säcke zur Mühle getragen', 'Musik gespielt', 'Im Garten gearbeitet'], answer: 0 },
      { q: 'Wohin geht der Esel?', options: ['Nach Hamburg', 'Nach Bremen', 'Nach Berlin'], answer: 1 },
    ],
  },
  {
    id: 'de-r-weihnachten',
    level: 'A2',
    title: 'Weihnachten bei Familie Becker',
    paragraphs: [
      'Für Familie Becker ist Weihnachten das wichtigste Fest des Jahres. Schon Anfang Dezember backen die Kinder Plätzchen mit ihrer Oma, und jeden Abend öffnen sie ein Türchen am Adventskalender.',
      'Am 24. Dezember, dem Heiligabend, kommt die ganze Familie zusammen. Am Nachmittag schmücken sie den Weihnachtsbaum mit Kerzen und Kugeln. Am Abend gibt es Kartoffelsalat mit Würstchen — ein ganz einfaches Essen, aber eine alte Tradition.',
      'Danach packen alle ihre Geschenke aus. Der kleine Paul hat dieses Jahr ein Fahrrad bekommen und war sehr glücklich. Am 25. und 26. Dezember besuchen die Beckers ihre Verwandten und essen viel zu viel.',
    ],
    translation: [
      "For the Becker family, Christmas is the most important celebration of the year. At the beginning of December the children already bake biscuits with their grandma, and every evening they open a door on the Advent calendar.",
      'On 24 December, Christmas Eve, the whole family gets together. In the afternoon they decorate the Christmas tree with candles and baubles. In the evening there is potato salad with sausages — a very simple meal, but an old tradition.',
      'Afterwards everyone unwraps their presents. Little Paul got a bike this year and was very happy. On 25 and 26 December the Beckers visit their relatives and eat far too much.',
    ],
    glossary: { wichtigste: 'most important', anfang: 'beginning', backen: 'bake', plätzchen: 'Christmas biscuits', türchen: 'little door', adventskalender: 'Advent calendar', heiligabend: 'Christmas Eve', zusammen: 'together', schmücken: 'decorate', weihnachtsbaum: 'Christmas tree', kugeln: 'baubles', kartoffelsalat: 'potato salad', würstchen: 'sausages', einfaches: 'simple', tradition: 'tradition', packen: 'unwrap (auspacken)', bekommen: 'got / received', verwandten: 'relatives' },
    questions: [
      { q: 'Was backen die Kinder mit der Oma?', options: ['Plätzchen', 'Brot', 'Pizza'], answer: 0 },
      { q: 'Was isst die Familie an Heiligabend?', options: ['Gans', 'Kartoffelsalat mit Würstchen', 'Fisch'], answer: 1 },
      { q: 'Was hat Paul bekommen?', options: ['Ein Buch', 'Ein Handy', 'Ein Fahrrad'], answer: 2 },
    ],
  },
];
