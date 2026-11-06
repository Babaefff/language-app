import type { Reading } from '../types';

export const READINGS_DE_B1: Reading[] = [
  {
    id: 'de-r-wohnung',
    level: 'B1',
    title: 'Wohnungssuche in München',
    paragraphs: [
      'Wer in München eine Wohnung sucht, braucht Geduld. Die Mieten gehören zu den höchsten in Deutschland, und für eine schöne Wohnung gibt es oft mehr als hundert Bewerber.',
      'Als ich letztes Jahr nach München gezogen bin, habe ich drei Monate lang gesucht. Ich habe jeden Tag die Anzeigen gelesen und mindestens zehn Wohnungen besichtigt. Meistens waren sie entweder zu teuer oder zu klein.',
      'Am Ende habe ich ein Zimmer in einer WG gefunden. Ich teile die Küche und das Bad mit zwei Studentinnen, die sehr nett sind. Die Miete ist zwar nicht billig, aber die Lage ist perfekt: Ich brauche nur zehn Minuten bis zur Arbeit.',
    ],
    translation: [
      'Anyone looking for a flat in Munich needs patience. The rents are among the highest in Germany, and there are often more than a hundred applicants for a nice flat.',
      'When I moved to Munich last year, I searched for three months. I read the adverts every day and viewed at least ten flats. Most were either too expensive or too small.',
      "In the end I found a room in a shared flat. I share the kitchen and bathroom with two students who are very nice. The rent isn't cheap, but the location is perfect: it takes me only ten minutes to get to work.",
    ],
    glossary: { wer: 'whoever / anyone who', geduld: 'patience', höchsten: 'highest', bewerber: 'applicants', gezogen: 'moved', mindestens: 'at least', besichtigt: 'viewed', meistens: 'mostly', entweder: 'either', zwar: 'admittedly (zwar … aber: … but)', lage: 'location', studentinnen: 'students (female)', teile: 'share' },
    questions: [
      { q: 'Wie lange hat die Person gesucht?', options: ['Drei Wochen', 'Drei Monate', 'Ein Jahr'], answer: 1 },
      { q: 'Wo wohnt sie jetzt?', options: ['In einer WG', 'Bei ihren Eltern', 'In einem Hotel'], answer: 0 },
      { q: 'Was ist der Vorteil der Wohnung?', options: ['Sie ist billig', 'Die Lage', 'Sie ist sehr groß'], answer: 1 },
    ],
  },
  {
    id: 'de-r-plastik',
    level: 'B1',
    title: 'Weniger Plastik — aber wie?',
    paragraphs: [
      'Jedes Jahr werden in Deutschland Millionen Tonnen Plastikmüll produziert. Ein großer Teil davon wird nicht recycelt, sondern verbrannt oder ins Ausland exportiert.',
      'Viele Menschen versuchen deshalb, im Alltag weniger Plastik zu benutzen. Sie nehmen eigene Taschen zum Einkaufen mit, kaufen Obst und Gemüse ohne Verpackung und trinken Leitungswasser statt Wasser aus Plastikflaschen.',
      'Kritiker sagen jedoch, dass die Verantwortung nicht nur bei den Verbrauchern liegt. Ihrer Meinung nach müsste die Politik strengere Gesetze machen, damit die Industrie weniger Verpackung herstellt. Was denken Sie: Wer sollte mehr tun?',
    ],
    translation: [
      'Every year millions of tonnes of plastic waste are produced in Germany. A large part of it is not recycled, but burned or exported abroad.',
      'Many people therefore try to use less plastic in everyday life. They take their own bags shopping, buy fruit and vegetables without packaging and drink tap water instead of water from plastic bottles.',
      'Critics say, however, that the responsibility does not lie only with consumers. In their opinion, politicians should pass stricter laws so that industry produces less packaging. What do you think: who should do more?',
    ],
    glossary: { werden: 'are (passive)', produziert: 'produced', tonnen: 'tonnes', teil: 'part', recycelt: 'recycled', sondern: 'but rather', verbrannt: 'burned', exportiert: 'exported', alltag: 'everyday life', eigene: 'own', taschen: 'bags', verpackung: 'packaging', leitungswasser: 'tap water', kritiker: 'critics', jedoch: 'however', verbrauchern: 'consumers', müsste: 'would have to / should', strengere: 'stricter', damit: 'so that', herstellt: 'produces' },
    questions: [
      { q: 'Was passiert mit einem großen Teil des Plastikmülls?', options: ['Er wird recycelt', 'Er wird verbrannt oder exportiert', 'Er wird verkauft'], answer: 1 },
      { q: 'Was trinken viele Menschen statt Flaschenwasser?', options: ['Saft', 'Leitungswasser', 'Tee'], answer: 1 },
      { q: 'Was fordern die Kritiker?', options: ['Strengere Gesetze', 'Mehr Plastik', 'Weniger Recycling'], answer: 0 },
    ],
  },
  {
    id: 'de-r-lotto',
    level: 'B1',
    title: 'Wenn ich im Lotto gewinnen würde …',
    paragraphs: [
      'Was würdest du machen, wenn du eine Million Euro gewinnen würdest? Diese Frage haben wir fünf Leuten in Hamburg gestellt.',
      'Lisa, 23, muss nicht lange überlegen: „Ich würde sofort um die Welt reisen. Zuerst nach Südamerika, dann nach Asien.“ Thomas, 45, ist vorsichtiger: „Ich würde einen Teil sparen und für meine Kinder ein Haus kaufen.“',
      'Und Frau Krüger, 70, lacht nur: „Wenn ich so viel Geld hätte, würde ich es verschenken. Ich habe alles, was ich brauche. Glück kann man sowieso nicht kaufen.“',
    ],
    translation: [
      'What would you do if you won a million euros? We asked five people in Hamburg this question.',
      "Lisa, 23, doesn't need to think for long: \"I would travel round the world straight away. First to South America, then to Asia.\" Thomas, 45, is more careful: \"I would save part of it and buy a house for my children.\"",
      'And Mrs Krüger, 70, just laughs: "If I had that much money, I would give it away. I have everything I need. You can\'t buy happiness anyway."',
    ],
    glossary: { würdest: 'would (you)', gewinnen: 'win', million: 'million', gestellt: 'asked (eine Frage stellen)', überlegen: 'to think about', südamerika: 'South America', asien: 'Asia', vorsichtiger: 'more careful', verschenken: 'to give away', glück: 'happiness / luck', sowieso: 'anyway' },
    questions: [
      { q: 'Was würde Lisa machen?', options: ['Ein Haus kaufen', 'Um die Welt reisen', 'Das Geld verschenken'], answer: 1 },
      { q: 'Für wen würde Thomas ein Haus kaufen?', options: ['Für seine Kinder', 'Für sich', 'Für seine Eltern'], answer: 0 },
      { q: 'Was denkt Frau Krüger über Glück?', options: ['Man kann es kaufen', 'Man kann es nicht kaufen', 'Sie hat kein Glück'], answer: 1 },
    ],
  },
  {
    id: 'de-r-kafka',
    level: 'B1+',
    title: 'Die Verwandlung',
    source: 'Franz Kafka, 1915 — the opening (public domain)',
    paragraphs: [
      'Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.',
      'Er lag auf seinem panzerartig harten Rücken und sah, wenn er den Kopf ein wenig hob, seinen gewölbten, braunen, von bogenförmigen Versteifungen geteilten Bauch, auf dessen Höhe sich die Bettdecke, zum gänzlichen Niedergleiten bereit, kaum noch erhalten konnte.',
    ],
    translation: [
      'When Gregor Samsa woke one morning from troubled dreams, he found himself transformed in his bed into a monstrous insect.',
      'He lay on his armour-hard back and saw, when he lifted his head a little, his curved brown belly, divided by arch-shaped ribs, on top of which the blanket, ready to slide off completely, could barely stay in place.',
    ],
    glossary: { 'eines morgens': 'one morning', unruhigen: 'troubled / restless', träumen: 'dreams', erwachte: 'woke up', ungeheueren: 'monstrous', ungeziefer: 'vermin / insect', verwandelt: 'transformed', lag: 'lay (liegen)', panzerartig: 'armour-like', harten: 'hard', hob: 'lifted (heben)', gewölbten: 'curved / domed', bogenförmigen: 'arch-shaped', versteifungen: 'ribs / stiffenings', geteilten: 'divided', dessen: 'whose / its', höhe: 'top / height', bettdecke: 'blanket / duvet', gänzlichen: 'complete', niedergleiten: 'sliding down', bereit: 'ready', kaum: 'barely', erhalten: 'to stay / to hold' },
    questions: [
      { q: 'Was ist mit Gregor passiert?', options: ['Er ist krank geworden', 'Er wurde in ein Insekt verwandelt', 'Er hat verschlafen'], answer: 1 },
      { q: 'Wo war Gregor?', options: ['Im Büro', 'In seinem Bett', 'Im Zug'], answer: 1 },
    ],
  },
];
