import type { Reading } from '../types';

/** Original A1 texts, built only from grammar taught in the A1 units. */
export const READINGS_FR: Reading[] = [
  {
    id: 'fr-r-claire', level: 'A1', title: 'Je m’appelle Claire',
    paragraphs: [
      "Bonjour ! Je m'appelle Claire et j'ai vingt-quatre ans. Je suis française, mais j'habite à Bruxelles, en Belgique.",
      "Je suis infirmière. Je travaille dans un grand hôpital. Le matin, je me lève à six heures, parce que je commence à sept heures.",
      "J'ai un frère, Thomas. Il est étudiant et il habite à Lyon avec nos parents. Le week-end, nous faisons du vélo ensemble ou nous allons au cinéma.",
    ],
    translation: [
      "Hello! My name is Claire and I am twenty-four. I am French, but I live in Brussels, in Belgium.",
      'I am a nurse. I work in a big hospital. In the morning I get up at six, because I start at seven.',
      'I have a brother, Thomas. He is a student and he lives in Lyon with our parents. At the weekend we go cycling together or we go to the cinema.',
    ],
    glossary: { ensemble: 'together', nos: 'our', 'vélo': 'bike', commence: 'start(s)', belgique: 'Belgium', bruxelles: 'Brussels' },
    questions: [
      { q: 'Quel âge a Claire ?', options: ['24 ans', '20 ans', '34 ans'], answer: 0 },
      { q: 'Où habite Claire ?', options: ['À Bruxelles', 'À Lyon', 'À Paris'], answer: 0 },
      { q: 'Quel est le travail de Claire ?', options: ['Infirmière', 'Étudiante', 'Professeur'], answer: 0 },
      { q: 'Avec qui habite Thomas ?', options: ['Avec ses parents', 'Avec Claire', 'Seul'], answer: 0 },
    ],
  },
  {
    id: 'fr-r-marche', level: 'A1', title: 'Au marché',
    paragraphs: [
      "Le samedi matin, Paul va au marché. Il fait beau et il y a beaucoup de monde.",
      "D'abord, il achète du pain et des croissants. Ensuite, il prend un kilo de pommes et des tomates. Il ne prend pas de viande, parce qu'il ne mange pas de viande.",
      "— Bonjour monsieur, je voudrais du fromage, s'il vous plaît.\n— Bien sûr. Celui-ci ? Il est très bon.\n— Oui, merci. C'est combien ?\n— Huit euros.",
      "Paul paie et rentre à la maison. Il prépare le déjeuner pour ses amis.",
    ],
    translation: [
      "On Saturday mornings Paul goes to the market. The weather is nice and there are a lot of people.",
      "First he buys bread and croissants. Then he takes a kilo of apples and some tomatoes. He doesn't take any meat, because he doesn't eat meat.",
      "— Hello, sir, I'd like some cheese, please.\n— Of course. This one? It's very good.\n— Yes, thank you. How much is it?\n— Eight euros.",
      'Paul pays and goes home. He makes lunch for his friends.',
    ],
    glossary: { "d'abord": 'first', monde: 'people (lit. world)', 'celui-ci': 'this one', 'bien sûr': 'of course', euros: 'euros', paie: 'pays', pour: 'for', amis: 'friends', pommes: 'apples', tomates: 'tomatoes' },
    questions: [
      { q: 'Quand est-ce que Paul va au marché ?', options: ['Le samedi matin', 'Le dimanche soir', 'Le lundi'], answer: 0 },
      { q: "Pourquoi Paul n'achète pas de viande ?", options: ['Il ne mange pas de viande', "C'est trop cher", "Il n'y a pas de viande"], answer: 0 },
      { q: 'Combien coûte le fromage ?', options: ['8 euros', '18 euros', '2 euros'], answer: 0 },
    ],
  },
  {
    id: 'fr-r-journee', level: 'A1', title: 'Une journée de Léa',
    paragraphs: [
      "Léa est étudiante à Toulouse. Elle se réveille à sept heures et demie, mais elle se lève à huit heures !",
      "Elle prend un café et une tartine, puis elle va à l'université en bus. Les cours finissent à cinq heures.",
      "Le soir, elle fait ses devoirs, elle téléphone à sa mère et elle regarde une série. Elle se couche à onze heures. Demain, elle va sortir avec ses amies.",
    ],
    translation: [
      'Léa is a student in Toulouse. She wakes up at half past seven, but she gets up at eight!',
      'She has a coffee and a slice of bread and butter, then she goes to university by bus. Classes finish at five.',
      "In the evening she does her homework, she phones her mother and she watches a series. She goes to bed at eleven. Tomorrow she's going to go out with her friends.",
    ],
    glossary: { tartine: 'slice of bread with butter / jam', puis: 'then', 'université': 'university', cours: 'classes', devoirs: 'homework', 'série': 'TV series', amies: 'friends (f)' },
    questions: [
      { q: 'À quelle heure Léa se lève ?', options: ['À huit heures', 'À sept heures et demie', 'À cinq heures'], answer: 0 },
      { q: "Comment elle va à l'université ?", options: ['En bus', 'À pied', 'En voiture'], answer: 0 },
      { q: "Qu'est-ce qu'elle va faire demain ?", options: ['Sortir avec ses amies', 'Travailler', 'Regarder une série'], answer: 0 },
    ],
  },
];

/** Songs come with a real sung performance; French ones are added once their timings are synced. */
export const SONGS_FR: Reading[] = [];
