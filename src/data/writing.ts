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

export const WRITING: WritingPrompt[] = LANG === 'de' ? DE : ES;
