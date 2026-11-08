import type { Reading } from '../types';

/** Original A2 – B1+ texts, each using the grammar of its level. */
export const READINGS_FR_MORE: Reading[] = [
  // ---- A2: passé composé, imparfait, pronouns ----
  {
    id: 'fr-r-weekend', level: 'A2', title: 'Un week-end à Bordeaux',
    paragraphs: [
      "Le week-end dernier, je suis allée à Bordeaux avec mon copain Hugo. Nous sommes partis le vendredi soir en train et nous sommes arrivés vers dix heures.",
      "Le samedi, il faisait très beau. Nous avons visité le centre-ville à vélo et nous avons mangé des huîtres au marché des Capucins. Hugo ne les aime pas, mais il les a goûtées quand même !",
      "Le dimanche, nous sommes allés dans un château pour une dégustation de vin. Le guide était très sympa et il nous a tout expliqué. Nous sommes rentrés fatigués mais très contents.",
    ],
    translation: [
      'Last weekend I went to Bordeaux with my boyfriend Hugo. We left on Friday evening by train and arrived around ten o’clock.',
      "On Saturday the weather was very nice. We visited the town centre by bike and ate oysters at the Capucins market. Hugo doesn't like them, but he tasted them anyway!",
      'On Sunday we went to a château for a wine tasting. The guide was very nice and explained everything to us. We came home tired but very happy.',
    ],
    glossary: { copain: 'boyfriend / friend', 'huîtres': 'oysters', 'goûtées': 'tasted (goûter)', 'quand même': 'anyway', 'château': 'castle / wine estate', 'dégustation': 'tasting', guide: 'guide', 'expliqué': 'explained' },
    questions: [
      { q: 'Comment sont-ils allés à Bordeaux ?', options: ['En train', 'En voiture', 'En avion'], answer: 0 },
      { q: 'Est-ce que Hugo aime les huîtres ?', options: ['Non, mais il les a goûtées', 'Oui, beaucoup', 'Il ne les a pas goûtées'], answer: 0 },
      { q: 'Qu’est-ce qu’ils ont fait le dimanche ?', options: ['Une dégustation de vin', 'Du vélo', 'Un tour en bateau'], answer: 0 },
    ],
  },
  {
    id: 'fr-r-enfance', level: 'A2', title: 'Chez ma grand-mère',
    paragraphs: [
      "Quand j'étais petit, je passais tous les étés chez ma grand-mère, en Bretagne. Elle habitait dans une vieille maison près de la mer.",
      "Le matin, j'allais à la boulangerie pour acheter le pain. L'après-midi, nous allions à la plage, même quand il pleuvait. Le soir, ma grand-mère faisait des crêpes et elle me racontait des histoires.",
      "Un été, j'ai trouvé un petit chat dans le jardin. Ma grand-mère l'a gardé et elle l'a appelé Pirate. Aujourd'hui, la maison est vendue, mais je pense souvent à ces étés.",
    ],
    translation: [
      'When I was little, I spent every summer at my grandmother’s in Brittany. She lived in an old house near the sea.',
      'In the morning I went to the bakery to buy bread. In the afternoon we went to the beach, even when it was raining. In the evening my grandmother made pancakes and told me stories.',
      'One summer I found a little cat in the garden. My grandmother kept it and called it Pirate. Today the house has been sold, but I often think about those summers.',
    ],
    glossary: { 'étés': 'summers', bretagne: 'Brittany', 'boulangerie': 'bakery', 'même quand': 'even when', 'crêpes': 'pancakes', racontait: 'used to tell (raconter)', histoires: 'stories', 'gardé': 'kept (garder)', vendue: 'sold (f)' },
    questions: [
      { q: 'Où habitait la grand-mère ?', options: ['En Bretagne, près de la mer', 'À Paris', 'À la montagne'], answer: 0 },
      { q: 'Que faisait la grand-mère le soir ?', options: ['Des crêpes', 'Du vélo', 'Les courses'], answer: 0 },
      { q: '« Un été, j’ai trouvé un petit chat » : pourquoi le passé composé ?', options: ['C’est un événement unique', 'C’est une habitude', 'C’est une description'], answer: 0 },
    ],
  },
  {
    id: 'fr-r-appart', level: 'A2', title: 'Petite annonce : appartement à louer',
    paragraphs: [
      "À LOUER – Lyon, quartier de la Croix-Rousse. Appartement de 45 m² au troisième étage avec ascenseur. Deux pièces : un salon lumineux, une chambre, une cuisine équipée et une salle de bains avec douche.",
      "Loyer : 750 € par mois, charges comprises. Proche du métro et des commerces. Animaux acceptés. Libre le 1er septembre.",
      "Contactez Mme Dubois au 06 12 34 56 78, de préférence le soir après 18 heures. Visites le samedi matin.",
    ],
    translation: [
      'TO LET – Lyon, Croix-Rousse district. 45 m² flat on the third floor with a lift. Two rooms: a bright living room, a bedroom, a fitted kitchen and a bathroom with a shower.',
      'Rent: €750 a month, bills included. Close to the metro and shops. Pets allowed. Available on 1 September.',
      'Contact Mrs Dubois on 06 12 34 56 78, preferably in the evening after 6 pm. Viewings on Saturday mornings.',
    ],
    glossary: { 'à louer': 'to let / for rent', quartier: 'district', 'étage': 'floor', ascenseur: 'lift', 'pièces': 'rooms', lumineux: 'bright', 'équipée': 'fitted', loyer: 'rent', charges: 'bills / service charges', comprises: 'included', proche: 'close', commerces: 'shops', libre: 'available', 'de préférence': 'preferably' },
    questions: [
      { q: 'Combien coûte l’appartement par mois ?', options: ['750 €, charges comprises', '750 € plus les charges', '450 €'], answer: 0 },
      { q: 'Est-ce qu’on peut avoir un chien ?', options: ['Oui', 'Non', 'On ne sait pas'], answer: 0 },
      { q: 'Quand peut-on visiter ?', options: ['Le samedi matin', 'Le soir après 18 heures', 'Le dimanche'], answer: 0 },
    ],
  },
  {
    id: 'fr-r-message', level: 'A2', title: 'Un message de Julie',
    paragraphs: [
      "Salut Marc ! Je viens de rentrer du travail et j'ai vu ton message. Désolée, je n'ai pas pu te répondre avant : j'avais une réunion toute la journée.",
      "Pour samedi, c'est d'accord ! On se retrouve devant le cinéma à 19 heures ? Le film commence à 19 h 30. J'ai déjà acheté les billets sur Internet, je te les envoie par courriel.",
      "Après, on peut aller manger une pizza chez Luigi. Tu y es déjà allé ? C'est le meilleur restaurant italien du quartier. Bises, Julie",
    ],
    translation: [
      "Hi Marc! I've just come home from work and I saw your message. Sorry, I couldn't answer you before: I had a meeting all day.",
      "For Saturday, that's fine! Shall we meet in front of the cinema at 7 pm? The film starts at 7.30. I've already bought the tickets online, I'll send them to you by email.",
      "Afterwards we can go and eat a pizza at Luigi's. Have you been there before? It's the best Italian restaurant in the area. Love, Julie",
    ],
    glossary: { 'désolée': 'sorry (f)', 'réunion': 'meeting', "d'accord": 'OK / agreed', 'se retrouve': 'meet up (se retrouver)', devant: 'in front of', billets: 'tickets', bises: 'love / kisses (end of message)' },
    questions: [
      { q: 'Pourquoi Julie n’a pas répondu avant ?', options: ['Elle avait une réunion', 'Elle était malade', 'Elle était au cinéma'], answer: 0 },
      { q: 'À quelle heure commence le film ?', options: ['À 19 h 30', 'À 19 h', 'À 20 h'], answer: 0 },
      { q: 'Dans « je te les envoie », que remplace « les » ?', options: ['Les billets', 'Les pizzas', 'Les messages'], answer: 0 },
    ],
  },
  // ---- B1: future, conditional, subjunctive, relative pronouns ----
  {
    id: 'fr-r-velo', level: 'B1', title: 'Paris à vélo',
    paragraphs: [
      "Depuis quelques années, Paris change. La mairie a créé des centaines de kilomètres de pistes cyclables, et beaucoup de Parisiens qui prenaient la voiture vont maintenant au travail à vélo.",
      "Pour certains, c'est une révolution : l'air est plus propre et la ville est plus calme. D'autres pensent que les embouteillages ont augmenté et que les commerçants perdent des clients. « Il faut que la ville reste accessible à tous », explique un chauffeur de taxi.",
      "D'ici 2030, la mairie voudrait que la moitié des trajets se fassent à pied, en vélo ou en transports en commun. Si ce projet réussit, Paris deviendra peut-être un modèle pour d'autres grandes villes.",
    ],
    translation: [
      'For a few years Paris has been changing. The town hall has created hundreds of kilometres of cycle lanes, and many Parisians who used to take the car now go to work by bike.',
      'For some it’s a revolution: the air is cleaner and the city is quieter. Others think traffic jams have increased and shopkeepers are losing customers. “The city must stay accessible to everyone,” explains a taxi driver.',
      'By 2030 the town hall would like half of all journeys to be made on foot, by bike or by public transport. If this project succeeds, Paris may become a model for other big cities.',
    ],
    glossary: { mairie: 'town hall', 'créé': 'created', 'pistes cyclables': 'cycle lanes', embouteillages: 'traffic jams', 'augmenté': 'increased', 'commerçants': 'shopkeepers', accessible: 'accessible', "d'ici": 'by (a date)', 'moitié': 'half', trajets: 'journeys', 'transports en commun': 'public transport', 'modèle': 'model' },
    questions: [
      { q: 'Qu’est-ce que la mairie a créé ?', options: ['Des pistes cyclables', 'Des parkings', 'Des autoroutes'], answer: 0 },
      { q: 'Pourquoi « se fassent » est au subjonctif ?', options: ['Après « voudrait que » (un souhait)', 'Après « si »', 'Parce que c’est le passé'], answer: 0 },
      { q: 'Que pense le chauffeur de taxi ?', options: ['La ville doit rester accessible à tous', 'Il faut plus de vélos', 'Les taxis sont trop chers'], answer: 0 },
    ],
  },
  {
    id: 'fr-r-teletravail', level: 'B1', title: 'Le télétravail : une chance ?',
    paragraphs: [
      "Depuis 2020, de plus en plus de Français travaillent de chez eux deux ou trois jours par semaine. Selon un sondage, huit salariés sur dix qui télétravaillent ne voudraient plus revenir au bureau tous les jours.",
      "Les avantages sont clairs : moins de temps dans les transports, plus de calme et plus de liberté pour organiser sa journée. Pourtant, certains se sentent seuls. « Je ne vois plus mes collègues, et c'est difficile de séparer la vie privée et le travail », raconte Inès, comptable à Lille.",
      "Les experts conseillent de garder des horaires fixes et un espace réservé au travail. Bien que le télétravail ne convienne pas à tout le monde, il est probable qu'il fera partie de l'avenir du travail.",
    ],
    translation: [
      'Since 2020 more and more French people work from home two or three days a week. According to a survey, eight out of ten employees who work from home would not want to go back to the office every day.',
      'The advantages are clear: less time commuting, more peace and more freedom to organise your day. Yet some feel lonely. “I don’t see my colleagues any more, and it’s hard to separate private life and work,” says Inès, an accountant in Lille.',
      'Experts advise keeping fixed hours and a space kept for work. Although working from home doesn’t suit everyone, it will probably be part of the future of work.',
    ],
    glossary: { 'télétravail': 'working from home', sondage: 'survey', 'salariés': 'employees', 'liberté': 'freedom', 'séparer': 'to separate', 'vie privée': 'private life', comptable: 'accountant', horaires: 'hours / schedule', 'réservé': 'kept / reserved', convienne: 'suits (convenir, subjonctif)', 'fera partie de': 'will be part of' },
    questions: [
      { q: 'Combien de télétravailleurs ne voudraient plus aller au bureau tous les jours ?', options: ['Huit sur dix', 'Deux sur dix', 'La moitié'], answer: 0 },
      { q: 'Quel est le problème d’Inès ?', options: ['Elle se sent seule', 'Elle a trop de transports', 'Elle n’a pas d’ordinateur'], answer: 0 },
      { q: 'Que conseillent les experts ?', options: ['Des horaires fixes et un espace de travail', 'Travailler la nuit', 'Revenir au bureau'], answer: 0 },
    ],
  },
  {
    id: 'fr-r-lettre', level: 'B1', title: 'Courrier des lecteurs',
    paragraphs: [
      "Madame, Monsieur, je vous écris au sujet de votre article sur la fermeture de la bibliothèque de notre quartier. Je suis très déçu que la mairie ait pris cette décision sans consulter les habitants.",
      "Cette bibliothèque est un lieu où les enfants font leurs devoirs, où les personnes âgées lisent le journal et où les étudiants trouvent le calme dont ils ont besoin. Si elle fermait, beaucoup de gens n'auraient plus d'endroit pour se retrouver.",
      "Je propose que la mairie organise une réunion publique avant de décider. Je suis sûr que de nombreux habitants seraient prêts à aider. Veuillez agréer mes salutations distinguées. Paul Martin",
    ],
    translation: [
      "Dear Sir or Madam, I am writing about your article on the closure of our neighbourhood library. I am very disappointed that the town hall took this decision without consulting the residents.",
      "This library is a place where children do their homework, where elderly people read the newspaper and where students find the quiet they need. If it closed, many people would no longer have a place to meet.",
      'I suggest that the town hall organise a public meeting before deciding. I am sure that many residents would be ready to help. Yours faithfully, Paul Martin',
    ],
    glossary: { 'au sujet de': 'about', fermeture: 'closure', 'bibliothèque': 'library', 'déçu': 'disappointed', consulter: 'to consult', habitants: 'residents', lieu: 'place', 'âgées': 'elderly', endroit: 'place', organise: 'organise (subjonctif)', 'prêts': 'ready' },
    questions: [
      { q: 'Pourquoi Paul est-il déçu ?', options: ['La mairie veut fermer la bibliothèque', 'La bibliothèque est trop petite', 'L’article est faux'], answer: 0 },
      { q: '« le calme dont ils ont besoin » : pourquoi « dont » ?', options: ['Parce qu’on dit « avoir besoin de »', 'Parce que c’est un lieu', 'Parce que c’est le sujet'], answer: 0 },
      { q: 'Que propose Paul ?', options: ['Une réunion publique', 'Une pétition en ligne', 'Une nouvelle bibliothèque'], answer: 0 },
    ],
  },
  {
    id: 'fr-r-erasmus', level: 'B1', title: 'Mon année Erasmus',
    paragraphs: [
      "L'année dernière, je suis partie six mois à Barcelone avec le programme Erasmus. Au début, c'était difficile : je ne comprenais rien en cours et je ne connaissais personne.",
      "Puis j'ai rencontré d'autres étudiants qui venaient de toute l'Europe. Nous parlions un mélange d'anglais, d'espagnol et de français ! Petit à petit, j'ai fait des progrès et j'ai commencé à rêver en espagnol.",
      "Si c'était à refaire, je le referais sans hésiter. Je conseille à tous les étudiants de partir, même si ça fait peur. On apprend une langue, mais surtout, on apprend à se connaître.",
    ],
    translation: [
      "Last year I went to Barcelona for six months with the Erasmus programme. At first it was hard: I didn't understand anything in class and I didn't know anyone.",
      'Then I met other students who came from all over Europe. We spoke a mix of English, Spanish and French! Little by little I made progress and started dreaming in Spanish.',
      'If I had to do it again, I would do it without hesitating. I advise all students to go, even if it’s scary. You learn a language, but above all, you learn to know yourself.',
    ],
    glossary: { 'au début': 'at first', rien: 'nothing', personne: 'nobody', 'mélange': 'mix', 'petit à petit': 'little by little', 'progrès': 'progress', 'rêver': 'to dream', refaire: 'to do again', 'hésiter': 'to hesitate', surtout: 'above all', 'se connaître': 'to know yourself' },
    questions: [
      { q: 'Combien de temps est-elle restée à Barcelone ?', options: ['Six mois', 'Un an', 'Deux mois'], answer: 0 },
      { q: 'Pourquoi c’était difficile au début ?', options: ['Elle ne comprenait rien et ne connaissait personne', 'Elle n’avait pas d’argent', 'Il faisait froid'], answer: 0 },
      { q: '« Si c’était à refaire, je le referais » : quel type de phrase ?', options: ['Une hypothèse (si + imparfait → conditionnel)', 'Une condition réelle', 'Un ordre'], answer: 0 },
    ],
  },
  // ---- B1+: longer, more abstract ----
  {
    id: 'fr-r-gaspillage', level: 'B1+', title: 'Le gaspillage alimentaire',
    paragraphs: [
      "Chaque année, en France, près de dix millions de tonnes de nourriture sont jetées. Ce gaspillage a lieu à toutes les étapes : dans les champs, dans les usines, dans les supermarchés, mais aussi chez nous, quand nous oublions un yaourt au fond du réfrigérateur.",
      "Depuis 2016, une loi interdit aux grands supermarchés de jeter les produits encore consommables : ils doivent les donner à des associations. Des applications permettent aussi d'acheter à petit prix les invendus des boulangeries et des restaurants en fin de journée.",
      "Pour les spécialistes, ces mesures sont utiles, mais elles ne suffiront pas si chacun ne change pas ses habitudes. Faire une liste avant d'aller au marché, comprendre la différence entre « à consommer jusqu'au » et « à consommer de préférence avant », cuisiner les restes : ce sont de petits gestes qui, ensemble, pourraient changer beaucoup de choses.",
    ],
    translation: [
      'Every year in France nearly ten million tonnes of food are thrown away. This waste happens at every stage: in the fields, in factories, in supermarkets, but also at home, when we forget a yoghurt at the back of the fridge.',
      'Since 2016 a law has banned large supermarkets from throwing away products that can still be eaten: they must give them to charities. Apps also make it possible to buy bakeries’ and restaurants’ unsold food cheaply at the end of the day.',
      'For specialists these measures are useful, but they will not be enough if everyone doesn’t change their habits. Making a list before going to the market, understanding the difference between “use by” and “best before”, cooking leftovers: these are small actions which, together, could change a great deal.',
    ],
    glossary: { gaspillage: 'waste', alimentaire: 'food (adj.)', 'jetées': 'thrown away', 'étapes': 'stages', champs: 'fields', usines: 'factories', loi: 'law', interdit: 'bans (interdire)', consommables: 'fit to eat', associations: 'charities', invendus: 'unsold goods', mesures: 'measures', suffiront: 'will be enough (suffire, futur)', habitudes: 'habits', restes: 'leftovers', gestes: 'actions / gestures' },
    questions: [
      { q: 'Que doivent faire les grands supermarchés depuis 2016 ?', options: ['Donner les produits encore consommables', 'Vendre moins cher', 'Fermer le dimanche'], answer: 0 },
      { q: 'Selon les spécialistes, la loi suffit-elle ?', options: ['Non, chacun doit changer ses habitudes', 'Oui, complètement', 'Ils ne disent rien'], answer: 0 },
      { q: 'Quel geste n’est PAS proposé ?', options: ['Acheter plus de produits frais', 'Faire une liste', 'Cuisiner les restes'], answer: 0 },
    ],
  },
  {
    id: 'fr-r-langues', level: 'B1+', title: 'Apprendre une langue à l’âge adulte',
    paragraphs: [
      "On dit souvent que les enfants apprennent les langues plus facilement que les adultes. C'est en partie vrai : un enfant qui grandit avec deux langues aura généralement un meilleur accent. Pourtant, les adultes ont des avantages que l'on oublie souvent.",
      "Un adulte comprend les règles, sait comparer avec sa propre langue et peut organiser son apprentissage. Il est aussi plus motivé, parce qu'il a choisi d'apprendre. Selon plusieurs études, ce qui compte le plus n'est pas l'âge, mais le temps passé au contact de la langue et la régularité.",
      "Il vaut donc mieux étudier quinze minutes par jour que deux heures une fois par semaine. Et surtout, il ne faut pas avoir peur de faire des erreurs : c'est en les faisant que l'on progresse.",
    ],
    translation: [
      'People often say that children learn languages more easily than adults. It’s partly true: a child who grows up with two languages will usually have a better accent. Yet adults have advantages that people often forget.',
      'An adult understands the rules, can compare with their own language and can organise their learning. They are also more motivated, because they chose to learn. According to several studies, what matters most is not age, but the time spent in contact with the language and regularity.',
      'So it’s better to study fifteen minutes a day than two hours once a week. And above all, you mustn’t be afraid of making mistakes: it’s by making them that you progress.',
    ],
    glossary: { 'en partie': 'partly', 'généralement': 'usually', 'règles': 'rules', propre: 'own', apprentissage: 'learning', 'motivé': 'motivated', 'études': 'studies', 'ce qui compte': 'what matters', 'régularité': 'regularity', 'il vaut mieux': "it's better to", erreurs: 'mistakes', 'en les faisant': 'by making them', progresse: 'progresses' },
    questions: [
      { q: 'Quel avantage ont les enfants ?', options: ['Un meilleur accent', 'Plus de motivation', 'Ils comprennent les règles'], answer: 0 },
      { q: 'Selon les études, qu’est-ce qui compte le plus ?', options: ['Le temps de contact et la régularité', 'L’âge', 'Le professeur'], answer: 0 },
      { q: 'Quel conseil donne le texte ?', options: ['Étudier un peu chaque jour', 'Étudier deux heures par semaine', 'Éviter toutes les erreurs'], answer: 0 },
    ],
  },
  {
    id: 'fr-r-miserables', level: 'B1+', title: 'Les Misérables (extrait adapté)',
    source: 'Adapted from Victor Hugo, Les Misérables (1862, public domain)',
    paragraphs: [
      "Un soir d'octobre 1815, un homme entra dans la petite ville de Digne. Il était fatigué, il avait faim, et ses vêtements étaient sales. Les habitants le regardaient avec méfiance.",
      "Il frappa à la porte de plusieurs auberges, mais partout on refusa de le recevoir : on savait qu'il sortait de prison. Il s'appelait Jean Valjean. Il avait passé dix-neuf ans au bagne pour avoir volé un pain.",
      "Enfin, une vieille femme lui montra une petite maison. « Frappez là », dit-elle. C'était la maison de l'évêque, Monseigneur Myriel. L'évêque ouvrit la porte, le fit entrer et lui donna à manger, sans lui poser de questions. Cette nuit allait changer la vie de Jean Valjean.",
    ],
    translation: [
      'One October evening in 1815, a man entered the small town of Digne. He was tired, he was hungry, and his clothes were dirty. The inhabitants watched him with suspicion.',
      'He knocked on the door of several inns, but everywhere they refused to take him in: people knew he had just come out of prison. His name was Jean Valjean. He had spent nineteen years in a penal colony for stealing a loaf of bread.',
      'At last an old woman showed him a little house. “Knock there,” she said. It was the house of the bishop, Monseigneur Myriel. The bishop opened the door, let him in and gave him something to eat, without asking him any questions. That night was going to change Jean Valjean’s life.',
    ],
    glossary: { entra: 'entered (passé simple of entrer)', 'méfiance': 'suspicion', frappa: 'knocked (passé simple)', auberges: 'inns', 'refusa': 'refused (passé simple)', bagne: 'penal colony / hard labour', 'volé': 'stolen', montra: 'showed (passé simple)', dit: 'said (passé simple of dire)', 'évêque': 'bishop', ouvrit: 'opened (passé simple)', fit: 'made / let (passé simple of faire)', donna: 'gave (passé simple)', 'allait changer': 'was going to change' },
    questions: [
      { q: 'Pourquoi les auberges refusent-elles Jean Valjean ?', options: ['Il sort de prison', 'Il n’a pas d’argent', 'Elles sont pleines'], answer: 0 },
      { q: 'Pourquoi était-il en prison ?', options: ['Il avait volé un pain', 'Il avait tué un homme', 'Il n’avait pas payé ses impôts'], answer: 0 },
      { q: 'Les formes « entra, frappa, donna » sont au passé simple : où trouve-t-on ce temps ?', options: ['Dans les livres et les récits écrits', 'Dans la conversation', 'Dans les SMS'], answer: 0 },
    ],
  },
];
