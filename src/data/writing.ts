import type { Level } from './types';
import { LANG } from './lang';

/** A free-writing task. Points are checked by keywords (any one counts); units supply topic vocabulary. */
export interface WritingPrompt {
  id: string;
  level: Level;
  title: string;
  prompt: string;
  points: { text: string; keys: string[] }[];
  words: [number, number];
  units: string[];
  model: string;
}

const DE: WritingPrompt[] = [
  {
    id: 'de-w-me', level: 'A1', title: 'Introduce yourself', prompt: 'Write a short text about yourself for a language-exchange website.',
    points: [{ text: 'Your name', keys: ['heiße', 'name'] }, { text: 'Your age', keys: ['jahre', 'alt'] }, { text: 'Where you come from and live', keys: ['komme', 'wohne'] }, { text: 'Your hobbies', keys: ['gern', 'hobby', 'hobbys', 'freizeit'] }],
    words: [25, 50], units: ['de-a1-01', 'de-a1-02', 'de-a1-09'],
    model: 'Hallo! Ich heiße Tom und ich bin achtundzwanzig Jahre alt. Ich komme aus England, aber jetzt wohne ich in Köln. Ich arbeite als Koch. In meiner Freizeit spiele ich gern Fußball und ich lese viel. Ich lerne Deutsch, weil meine Freundin aus Deutschland kommt.',
  },
  {
    id: 'de-w-family', level: 'A1', title: 'My family', prompt: 'Describe your family.',
    points: [{ text: 'Who is in your family', keys: ['familie', 'habe', 'mutter', 'vater', 'bruder', 'schwester'] }, { text: 'Names and ages', keys: ['heißt', 'heißen', 'jahre'] }, { text: 'What they do or are like', keys: ['arbeitet', 'ist', 'sind', 'nett', 'lustig'] }, { text: 'Something you do together', keys: ['zusammen', 'wir'] }],
    words: [25, 50], units: ['de-a1-03', 'de-a1-04'],
    model: 'Meine Familie ist nicht groß. Meine Mutter heißt Ana und sie ist Ärztin. Mein Vater heißt Luis und er arbeitet in einer Bank. Ich habe eine Schwester. Sie ist sechzehn Jahre alt und sehr lustig. Am Sonntag kochen wir zusammen und essen im Garten.',
  },
  {
    id: 'de-w-weekend', level: 'A2', title: 'My last weekend', prompt: 'Write an email to a friend about what you did last weekend (use the Perfekt).',
    points: [{ text: 'Where you were', keys: ['war', 'waren', 'gefahren', 'gegangen'] }, { text: 'What you did', keys: ['habe', 'haben', 'gemacht', 'gegessen', 'gesehen'] }, { text: 'Who you were with', keys: ['mit'] }, { text: 'How it was', keys: ['schön', 'toll', 'super', 'langweilig', 'lustig', 'anstrengend'] }],
    words: [40, 70], units: ['de-a2-04', 'de-a1-09'],
    model: 'Hallo Lisa, wie geht’s? Am Wochenende bin ich mit meinem Bruder nach Hamburg gefahren. Am Samstag haben wir eine Hafenrundfahrt gemacht und Fischbrötchen gegessen. Am Abend sind wir ins Musical gegangen. Das war toll, aber die Karten waren ziemlich teuer. Am Sonntag hat es geregnet, deshalb sind wir früh nach Hause gefahren. Und du? Was hast du gemacht? Liebe Grüße, Ben',
  },
  {
    id: 'de-w-job', level: 'A2', title: 'My new job', prompt: 'Write to a friend about your new job.',
    points: [{ text: 'What the job is', keys: ['arbeite', 'stelle', 'job', 'beruf', 'firma'] }, { text: 'Your colleagues', keys: ['kollegen', 'kollegin', 'kollege', 'chef', 'chefin'] }, { text: 'Your working hours', keys: ['uhr', 'stunden', 'morgens', 'abends'] }, { text: 'What you like or don’t like', keys: ['gefällt', 'mag', 'finde', 'gern', 'leider'] }],
    words: [40, 70], units: ['de-a2-05'],
    model: 'Liebe Mia, ich habe seit Montag eine neue Stelle! Ich arbeite jetzt als Verkäuferin in einem Buchladen im Zentrum. Meine Kollegen sind sehr nett und helfen mir viel. Ich arbeite von neun bis siebzehn Uhr, nur samstags muss ich auch arbeiten. Die Arbeit gefällt mir sehr, weil ich Bücher liebe. Leider verdiene ich nicht so viel. Bis bald! Deine Clara',
  },
  {
    id: 'de-w-city', level: 'B1', title: 'City or countryside?', prompt: 'Write a forum post: is it better to live in the city or in the countryside?',
    points: [{ text: 'Your opinion', keys: ['meinung', 'finde', 'denke', 'glaube', 'meiner'] }, { text: 'Advantages, with reasons', keys: ['vorteil', 'weil', 'denn', 'deshalb'] }, { text: 'Disadvantages', keys: ['nachteil', 'aber', 'allerdings', 'jedoch', 'trotzdem'] }, { text: 'Your own experience', keys: ['früher', 'habe', 'bin', 'wohne'] }],
    words: [70, 110], units: ['de-b1-04', 'de-b1-07'],
    model: 'Meiner Meinung nach ist das Leben in der Stadt praktischer, aber nicht unbedingt schöner. Ein großer Vorteil der Stadt ist, dass man alles schnell erreichen kann: Ärzte, Geschäfte und Kinos sind in der Nähe. Außerdem gibt es mehr Arbeitsplätze. Allerdings sind die Mieten in Großstädten sehr hoch, und es ist oft laut. Ich habe früher auf dem Land gewohnt und vermisse manchmal die Ruhe und die Natur. Trotzdem würde ich im Moment nicht zurückziehen, weil ich meine Arbeit in der Stadt liebe.',
  },
  {
    id: 'de-w-future', level: 'B1', title: 'My plans for the future', prompt: 'Describe your plans and dreams for the next five years.',
    points: [{ text: 'Work or study plans', keys: ['werde', 'möchte', 'plane', 'vor'] }, { text: 'Where you want to live', keys: ['wohnen', 'ziehen', 'umziehen', 'leben'] }, { text: 'A dream (Konjunktiv II)', keys: ['würde', 'wäre', 'hätte', 'traum'] }, { text: 'Reasons', keys: ['weil', 'damit', 'um', 'deshalb'] }],
    words: [70, 110], units: ['de-b1-01', 'de-b1-02'],
    model: 'In den nächsten fünf Jahren habe ich viel vor. Zuerst werde ich mein Studium abschließen. Danach möchte ich ein Jahr im Ausland arbeiten, um mein Englisch zu verbessern. Später will ich nach Berlin ziehen, weil die Stadt so lebendig ist und es dort viele Jobs in meinem Bereich gibt. Mein großer Traum wäre eine eigene kleine Firma. Wenn ich genug Geld hätte, würde ich auch gern eine Reise durch Südamerika machen. Mal sehen, was davon wirklich passiert!',
  },
];

const ES: WritingPrompt[] = [
  {
    id: 'w-me', level: 'A1', title: 'Introduce yourself', prompt: 'Write a short text about yourself for a language-exchange website.',
    points: [{ text: 'Your name', keys: ['llamo', 'nombre'] }, { text: 'Your age', keys: ['años'] }, { text: 'Where you come from and live', keys: ['soy de', 'vivo'] }, { text: 'Your hobbies', keys: ['gusta', 'encanta', 'tiempo libre'] }],
    words: [25, 50], units: ['a1-01', 'a1-02', 'a1-09'],
    model: '¡Hola! Me llamo Tom y tengo veintiocho años. Soy de Inglaterra, pero ahora vivo en Sevilla. Trabajo como cocinero. En mi tiempo libre me gusta jugar al fútbol y leer novelas. Estudio español porque mi novia es de Colombia.',
  },
  {
    id: 'w-family', level: 'A1', title: 'My family', prompt: 'Describe your family.',
    points: [{ text: 'Who is in your family', keys: ['familia', 'tengo', 'madre', 'padre', 'hermano', 'hermana'] }, { text: 'Names and ages', keys: ['llama', 'llaman', 'años'] }, { text: 'What they do or are like', keys: ['trabaja', 'es', 'son', 'simpático', 'simpática', 'divertido', 'divertida'] }, { text: 'Something you do together', keys: ['juntos', 'juntas', 'nosotros'] }],
    words: [25, 50], units: ['a1-03', 'a1-04'],
    model: 'Mi familia no es muy grande. Mi madre se llama Ana y es médica. Mi padre se llama Luis y trabaja en un banco. Tengo una hermana. Tiene dieciséis años y es muy divertida. Los domingos cocinamos juntos y comemos en el jardín.',
  },
  {
    id: 'w-weekend', level: 'A2', title: 'My last weekend', prompt: 'Write an email to a friend about what you did last weekend (use the preterite).',
    points: [{ text: 'Where you went', keys: ['fui', 'fuimos', 'estuve', 'estuvimos'] }, { text: 'What you did', keys: ['comí', 'comimos', 'vi', 'vimos', 'visité', 'visitamos', 'hice', 'hicimos'] }, { text: 'Who you were with', keys: ['con'] }, { text: 'How it was', keys: ['fue', 'genial', 'bonito', 'aburrido', 'divertido', 'increíble'] }],
    words: [40, 70], units: ['a2-02', 'a2-04'],
    model: '¡Hola, Lucía! ¿Qué tal? El fin de semana fui a Valencia con mi hermano. El sábado visitamos la Ciudad de las Artes y comimos una paella buenísima cerca de la playa. Por la noche fuimos a un concierto. Fue genial, pero las entradas fueron bastante caras. El domingo llovió, así que volvimos pronto a casa. ¿Y tú? ¿Qué hiciste? Un abrazo, Ben',
  },
  {
    id: 'w-child', level: 'A2', title: 'When I was a child', prompt: 'Describe your childhood (use the imperfect).',
    points: [{ text: 'Where you lived', keys: ['vivía', 'vivíamos'] }, { text: 'What you were like', keys: ['era', 'tenía'] }, { text: 'What you used to do', keys: ['jugaba', 'iba', 'íbamos', 'jugábamos', 'veía', 'leía'] }, { text: 'How it compares with now', keys: ['ahora', 'hoy', 'todavía', 'ya no'] }],
    words: [40, 70], units: ['a2-05'],
    model: 'Cuando era niña, vivía en un pueblo pequeño cerca de las montañas. Era muy tímida, pero tenía dos amigas muy buenas. Todos los veranos íbamos al río y jugábamos hasta la noche. Mi abuela siempre nos preparaba chocolate con churros. Ahora vivo en Madrid y ya no veo a mis amigas, pero todavía me encanta volver al pueblo.',
  },
  {
    id: 'w-city', level: 'B1', title: 'City or countryside?', prompt: 'Write a forum post: is it better to live in the city or in the countryside?',
    points: [{ text: 'Your opinion', keys: ['opinión', 'creo', 'pienso', 'parece'] }, { text: 'Advantages, with reasons', keys: ['ventaja', 'porque', 'por eso', 'ya que'] }, { text: 'Disadvantages', keys: ['desventaja', 'inconveniente', 'pero', 'sin embargo', 'aunque'] }, { text: 'Your own experience', keys: ['viví', 'vivía', 'vivo', 'he vivido'] }],
    words: [70, 110], units: ['b1-05', 'b1-10'],
    model: 'En mi opinión, vivir en la ciudad es más práctico, pero no necesariamente mejor. Una gran ventaja es que todo está cerca: médicos, tiendas y cines. Además, hay más trabajo. Sin embargo, los alquileres son carísimos y hay mucho ruido. Yo viví diez años en un pueblo y a veces echo de menos la tranquilidad y la naturaleza. Aun así, no creo que vuelva pronto, porque me encanta mi trabajo en la ciudad.',
  },
  {
    id: 'w-future', level: 'B1', title: 'My plans for the future', prompt: 'Describe your plans and dreams for the next five years.',
    points: [{ text: 'Work or study plans', keys: ['voy a', 'terminaré', 'trabajaré', 'estudiaré', 'quiero'] }, { text: 'Where you want to live', keys: ['viviré', 'vivir', 'mudarme', 'mudaré'] }, { text: 'A dream (conditional or subjunctive)', keys: ['me gustaría', 'sería', 'tendría', 'ojalá', 'si tuviera', 'sueño'] }, { text: 'Reasons', keys: ['porque', 'para', 'ya que'] }],
    words: [70, 110], units: ['b1-01', 'b1-03'],
    model: 'En los próximos cinco años tengo muchos planes. Primero voy a terminar la carrera. Después quiero trabajar un año en el extranjero para mejorar mi inglés. Más tarde me mudaré a Barcelona, porque es una ciudad muy viva y hay mucho trabajo en mi sector. Mi gran sueño sería tener mi propia empresa. Si tuviera suficiente dinero, también me gustaría viajar por Sudamérica. ¡Ojalá todo salga bien!',
  },
];

const FR: WritingPrompt[] = [
  {
    id: 'fr-w-me', level: 'A1', title: 'Introduce yourself', prompt: 'Write a short text about yourself for a language-exchange website.',
    points: [{ text: 'Your name', keys: ["m'appelle", 'nom'] }, { text: 'Your age', keys: ['ans'] }, { text: 'Where you come from and live', keys: ['viens', 'habite', 'suis'] }, { text: 'What you like doing', keys: ['aime', 'adore', 'fais', 'joue'] }],
    words: [25, 50], units: ['fr-a1-01', 'fr-a1-02', 'fr-a1-09'],
    model: "Bonjour ! Je m'appelle Tom et j'ai vingt-huit ans. Je suis anglais, mais j'habite à Lyon. Je suis cuisinier. Le week-end, j'aime jouer au football et lire. J'apprends le français parce que ma copine est française.",
  },
  {
    id: 'fr-w-family', level: 'A1', title: 'My family', prompt: 'Describe your family.',
    points: [{ text: 'Who is in your family', keys: ['famille', 'mère', 'père', 'frère', 'sœur', 'parents'] }, { text: 'Names and ages', keys: ["s'appelle", 'ans'] }, { text: 'What they are like or do', keys: ['est', 'sont', 'travaille', 'sympa', 'grand', 'grande'] }, { text: 'Something you do together', keys: ['ensemble', 'nous', 'on'] }],
    words: [25, 50], units: ['fr-a1-03', 'fr-a1-04'],
    model: "Ma famille n'est pas très grande. Ma mère s'appelle Anne et elle est médecin. Mon père s'appelle Luc et il travaille dans une banque. J'ai une sœur. Elle a seize ans et elle est très drôle. Le dimanche, nous mangeons ensemble dans le jardin.",
  },
  {
    id: 'fr-w-day', level: 'A1', title: 'My day', prompt: 'Describe a normal day: when you get up, what you do and when you go to bed.',
    points: [{ text: 'Your morning', keys: ['me lève', 'me réveille', 'matin'] }, { text: 'Work or study', keys: ['travaille', 'étudie', 'cours', 'bureau'] }, { text: 'Your evening', keys: ['soir', 'regarde', 'dîner'] }, { text: 'Times', keys: ['heures', 'heure', 'midi'] }],
    words: [30, 60], units: ['fr-a1-07', 'fr-a1-12'],
    model: "Je me réveille à sept heures et je me lève tout de suite. Je prends un café et je vais au bureau en bus. Je travaille de neuf heures à cinq heures. Le soir, je prépare le dîner et je regarde un film. Je me couche à onze heures.",
  },
  {
    id: 'fr-w-weekend', level: 'A2', title: 'My last weekend', prompt: 'Write an email to a friend about what you did last weekend (use the passé composé).',
    points: [{ text: 'Where you went', keys: ['suis allé', 'suis allée', 'sommes allés', 'sommes allées', 'suis parti', 'suis partie'] }, { text: 'What you did', keys: ['ai visité', 'avons visité', 'ai mangé', 'avons mangé', 'ai vu', 'avons vu', 'ai fait', 'avons fait'] }, { text: 'Who you were with', keys: ['avec'] }, { text: 'What it was like', keys: ["c'était", 'génial', 'super', 'beau', 'ennuyeux', 'faisait'] }],
    words: [50, 80], units: ['fr-a2-02', 'fr-a2-04'],
    model: "Salut Léa ! Le week-end dernier, je suis allé à Marseille avec mon frère. Samedi, nous avons visité le Vieux-Port et nous avons mangé une bouillabaisse. Il faisait très beau, alors nous sommes allés à la plage l'après-midi. Le soir, nous avons vu un concert en plein air. C'était génial ! Dimanche, nous sommes rentrés en train. Et toi, qu'est-ce que tu as fait ? Bises, Tom",
  },
  {
    id: 'fr-w-child', level: 'A2', title: 'When I was a child', prompt: 'Describe your childhood (use the imparfait).',
    points: [{ text: 'Where you lived', keys: ['habitais', 'vivais', 'habitions'] }, { text: 'What you were like', keys: ['étais', 'avais'] }, { text: 'What you used to do', keys: ['jouais', 'allais', 'faisais', 'regardais', 'lisais', 'allions', 'jouions'] }, { text: 'How it compares with now', keys: ["aujourd'hui", 'maintenant', 'encore', 'ne … plus', 'plus'] }],
    words: [50, 80], units: ['fr-a2-05'],
    model: "Quand j'étais petite, j'habitais dans un village près de Toulouse. J'étais très timide, mais j'avais deux bonnes amies. Tous les étés, nous allions à la rivière et nous jouions jusqu'au soir. Ma grand-mère nous faisait souvent des crêpes. Aujourd'hui, j'habite à Paris et je ne vois plus mes amies, mais j'adore encore retourner au village.",
  },
  {
    id: 'fr-w-city', level: 'B1', title: 'City or countryside?', prompt: 'Write a forum post: is it better to live in the city or in the countryside?',
    points: [{ text: 'Your opinion', keys: ['à mon avis', 'je pense', 'je trouve', 'je crois'] }, { text: 'Advantages, with reasons', keys: ['avantage', 'parce que', 'car', 'donc'] }, { text: 'Disadvantages', keys: ['inconvénient', 'pourtant', 'mais', 'cependant', 'bien que'] }, { text: 'A hypothesis', keys: ['si ', 'serait', 'aurais', 'pourrais', 'habiterais'] }],
    words: [100, 140], units: ['fr-b1-05', 'fr-b1-03'],
    model: "À mon avis, vivre en ville est plus pratique, mais pas forcément meilleur. D'un côté, tout est proche : les médecins, les magasins, les cinémas. De plus, il y a plus de travail. De l'autre côté, les loyers sont très chers et il y a beaucoup de bruit. J'ai habité dix ans dans un village et la tranquillité me manque parfois. Si j'avais un travail à distance, j'habiterais sûrement à la campagne. Pourtant, je ne pense pas que je quitte la ville bientôt, parce que j'adore mon travail ici.",
  },
  {
    id: 'fr-w-future', level: 'B1', title: 'My plans for the future', prompt: 'Describe your plans and dreams for the next five years.',
    points: [{ text: 'Work or study plans', keys: ['je vais', 'finirai', 'travaillerai', 'étudierai', 'je veux'] }, { text: 'Where you want to live', keys: ['habiterai', 'vivrai', 'déménager', 'déménagerai'] }, { text: 'A dream (conditionnel)', keys: ["j'aimerais", 'je voudrais', 'serait', 'si '] }, { text: 'Reasons', keys: ['parce que', 'pour', 'car'] }],
    words: [100, 140], units: ['fr-b1-01', 'fr-b1-02'],
    model: "Dans les cinq prochaines années, j'ai beaucoup de projets. D'abord, je vais finir mes études de commerce. Ensuite, je travaillerai un an à l'étranger pour améliorer mon anglais. Plus tard, je déménagerai à Lyon, parce que c'est une ville dynamique et qu'il y a du travail dans mon secteur. Mon grand rêve serait d'ouvrir mon propre café. Si j'avais assez d'argent, j'aimerais aussi faire le tour de l'Amérique du Sud. J'espère que tout se passera bien !",
  },
];

const RU: WritingPrompt[] = [
  {
    id: 'ru-w-me', level: 'A1', title: 'Introduce yourself', prompt: 'Write a short text about yourself for a language-exchange website.',
    points: [{ text: 'Your name', keys: ['меня зовут', 'зовут'] }, { text: 'Your age', keys: ['лет', 'год', 'года'] }, { text: 'Where you live and what you do', keys: ['живу', 'работаю', 'учусь'] }, { text: 'What you like', keys: ['люблю', 'нравится'] }],
    words: [25, 50], units: ['ru-a1-01', 'ru-a1-02', 'ru-a1-09'],
    model: 'Привет! Меня зовут Том. Мне двадцать восемь лет. Я англичанин, но живу в Москве. Я работаю в школе, я учитель. Я люблю читать и играть в футбол. Я учу русский язык, потому что моя жена русская.',
  },
  {
    id: 'ru-w-family', level: 'A1', title: 'My family', prompt: 'Describe your family.',
    points: [{ text: 'Who is in your family', keys: ['семья', 'мама', 'папа', 'брат', 'сестра', 'у меня есть'] }, { text: 'Names and ages', keys: ['зовут', 'лет'] }, { text: 'What they do', keys: ['работает', 'учится', 'врач', 'учитель'] }, { text: 'Where they live', keys: ['живёт', 'живут', 'в '] }],
    words: [25, 50], units: ['ru-a1-03', 'ru-a1-12'],
    model: 'У меня небольшая семья. Мою маму зовут Ольга, она врач. Мой папа инженер, он работает на заводе. У меня есть сестра. Ей пятнадцать лет, она учится в школе. Мои бабушка и дедушка живут в деревне.',
  },
  {
    id: 'ru-w-yesterday', level: 'A1', title: 'My day yesterday', prompt: 'Describe what you did yesterday (use the past tense).',
    points: [{ text: 'Morning', keys: ['утром', 'встал', 'встала'] }, { text: 'Work or study', keys: ['работал', 'работала', 'учился', 'училась'] }, { text: 'Evening', keys: ['вечером', 'смотрел', 'смотрела', 'читал', 'читала'] }, { text: 'Where you were', keys: ['был', 'была'] }],
    words: [30, 60], units: ['ru-a1-07', 'ru-a1-14'],
    model: 'Вчера я встала в семь часов. Утром я завтракала и пила кофе. Потом я работала в офисе. Вечером я была дома: я готовила ужин и смотрела фильм. Я легла спать поздно.',
  },
  {
    id: 'ru-w-weekend', level: 'A2', title: 'My last weekend', prompt: 'Write to a friend about your last weekend (past tense, both aspects).',
    points: [{ text: 'Where you went', keys: ['ездил', 'ездила', 'ходил', 'ходила', 'поехал', 'поехала', 'был', 'была'] }, { text: 'What you did', keys: ['гулял', 'гуляла', 'смотрел', 'смотрела', 'купил', 'купила'] }, { text: 'Who with', keys: ['с '] }, { text: 'How it was', keys: ['было', 'понравилось', 'интересно', 'весело', 'скучно'] }],
    words: [50, 80], units: ['ru-a2-03', 'ru-a2-04'],
    model: 'Привет, Катя! В прошлые выходные я ездил в Петербург с братом. В субботу мы гуляли по Невскому проспекту и были в Эрмитаже. Вечером мы ужинали в грузинском ресторане. Было очень вкусно! В воскресенье шёл дождь, поэтому мы рано вернулись домой. А как ты провела выходные? Пиши! Том',
  },
  {
    id: 'ru-w-childhood', level: 'A2', title: 'When I was a child', prompt: 'Describe your childhood (imperfective past for habits).',
    points: [{ text: 'Where you lived', keys: ['жил', 'жила', 'жили'] }, { text: 'What you were like', keys: ['был', 'была'] }, { text: 'What you used to do', keys: ['играл', 'играла', 'ходил', 'ходила', 'ездили', 'каждый', 'часто'] }, { text: 'Now compared with then', keys: ['сейчас', 'теперь'] }],
    words: [50, 80], units: ['ru-a2-04'],
    model: 'Когда я была маленькой, я жила в деревне недалеко от Волги. Я была очень весёлой и смелой девочкой. Каждое лето мы с друзьями купались в реке и ходили в лес за грибами. Бабушка часто пекла блины. Сейчас я живу в большом городе, но я очень скучаю по деревне.',
  },
  {
    id: 'ru-w-city', level: 'B1', title: 'City or countryside?', prompt: 'Write a forum post: is it better to live in the city or in the countryside?',
    points: [{ text: 'Your opinion', keys: ['по-моему', 'считаю', 'мне кажется', 'думаю'] }, { text: 'Arguments', keys: ['во-первых', 'во-вторых', 'потому что', 'поэтому'] }, { text: 'The other side', keys: ['однако', 'но', 'хотя', 'с другой стороны'] }, { text: 'A hypothesis', keys: ['если бы', ' бы '] }],
    words: [100, 140], units: ['ru-b1-03', 'ru-b1-01'],
    model: 'По-моему, жить в городе удобнее, но не всегда лучше. Во-первых, в городе есть работа, больницы и театры. Во-вторых, легко встречаться с друзьями. Однако в большом городе дорогие квартиры и много шума. Хотя я люблю Москву, иногда я мечтаю о тишине. Если бы я мог работать из дома, я бы, наверное, переехал за город. Но пока мне нравится городская жизнь.',
  },
  {
    id: 'ru-w-future', level: 'B1', title: 'My plans for the future', prompt: 'Describe your plans and dreams for the next five years.',
    points: [{ text: 'Plans', keys: ['собираюсь', 'буду', 'хочу'] }, { text: 'A dream', keys: ['мечтаю', 'мечта', ' бы '] }, { text: 'Reasons', keys: ['потому что', 'чтобы', 'поэтому'] }, { text: 'What others should do', keys: ['чтобы'] }],
    words: [100, 140], units: ['ru-b1-01', 'ru-b1-02'],
    model: 'В ближайшие пять лет я собираюсь закончить университет и найти работу в хорошей компании. Я хочу больше путешествовать, чтобы увидеть разные страны. Моя мечта — открыть своё кафе. Если бы у меня были деньги, я бы сделал это уже сейчас. Я хочу, чтобы мои родители гордились мной, поэтому я много работаю.',
  },
];

export const WRITING: WritingPrompt[] = LANG === 'de' ? DE : LANG === 'fr' ? FR : LANG === 'ru' ? RU : ES;
