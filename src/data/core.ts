import { units, type SentenceRow, type WordRow } from './build';

/**
 * The most frequent Spanish words not already taught in a topic unit, in rough frequency
 * order. Split into sets of 25 so they can be learned like any other unit.
 */
const CORE: WordRow[] = [
  // set 1 — the glue of every sentence
  ['el', 'the (masc.)'], ['la', 'the (fem.)'], ['los', 'the (masc. plural)'], ['las', 'the (fem. plural)'],
  ['un', 'a / an (masc.)'], ['una', 'a / an (fem.)'], ['de', 'of / from'], ['a', 'to / at'],
  ['en', 'in / on / at'], ['que', 'that / which / than'], ['para', 'for / in order to'], ['por', 'for / by / through'],
  ['yo', 'I'], ['tú', 'you (informal)'], ['él', 'he'], ['ella', 'she'],
  ['nosotros', 'we'], ['ellos', 'they'], ['usted', 'you (formal)'], ['mi', 'my'],
  ['tu', 'your (informal)'], ['su', 'his / her / their / your (formal)'], ['si', 'if'], ['como', 'like / as'],
  ['ser', 'to be (permanent)', 'Quiero ser médico.', 'I want to be a doctor.'],
  // set 2
  ['estar', 'to be (state, place)', '¿Dónde estás?', 'Where are you?'], ['haber', 'to have (auxiliary)'], ['decir', 'to say / to tell'], ['dar', 'to give'],
  ['ver', 'to see / to watch'], ['poner', 'to put'], ['pensar', 'to think'], ['creer', 'to believe / to think'],
  ['dejar', 'to leave / to let', 'Déjame pensar.', 'Let me think.'], ['seguir', 'to follow / to continue'], ['encontrar', 'to find'], ['parecer', 'to seem'],
  ['quedar', 'to remain / to meet up', '¿Quedamos a las ocho?', 'Shall we meet at eight?'], ['quedarse', 'to stay'], ['vivir', 'to live'], ['volver', 'to come back'],
  ['traer', 'to bring'], ['entrar', 'to go in / to enter'], ['pasar', 'to pass / to spend (time) / to happen', '¿Qué pasa?', "What's happening?"], ['vender', 'to sell'],
  ['tomar', 'to take / to have (food, drink)'], ['buscar', 'to look for'], ['acabar', 'to finish / to have just'], ['sentir', 'to feel / to be sorry', 'Lo siento.', "I'm sorry."],
  ['oír', 'to hear'],
  // set 3
  ['me', 'me / to me / myself'], ['te', 'you / to you / yourself'], ['lo', 'it / him'], ['le', 'to him / to her'],
  ['se', 'himself / herself / oneself'], ['nos', 'us / to us'], ['este', 'this (masc.)'], ['esta', 'this (fem.)'],
  ['ese', 'that (masc.)'], ['esa', 'that (fem.)'], ['esto', 'this (thing)'], ['eso', 'that (thing)', 'Eso es verdad.', "That's true."],
  ['algo', 'something'], ['nada', 'nothing / anything'], ['alguien', 'someone'], ['nadie', 'nobody'],
  ['todo', 'all / everything'], ['otro', 'other / another'], ['mismo', 'same'], ['cada', 'each / every'],
  ['tanto', 'so much'], ['cuando', 'when (not a question)'], ['donde', 'where (not a question)'], ['así', 'like this / like that'],
  ['entonces', 'then / so'],
  // set 4
  ['bueno', 'good'], ['malo', 'bad'], ['último', 'last'], ['largo', 'long'],
  ['corto', 'short (length)'], ['importante', 'important'], ['posible', 'possible'], ['cierto', 'true / certain'],
  ['claro', 'clear / of course', '¡Claro que sí!', 'Of course!'], ['el tiempo', 'the time / the weather'], ['la vez', 'the time (occasion)', 'Otra vez, por favor.', 'Once more, please.'], ['la cosa', 'the thing'],
  ['la persona', 'the person'], ['la gente', 'the people'], ['el hombre', 'the man'], ['el niño', 'the child / the boy'],
  ['la vida', 'the life'], ['el día', 'the day'], ['la hora', 'the hour / the time'], ['el lugar', 'the place'],
  ['la parte', 'the part'], ['el momento', 'the moment'], ['la manera', 'the way / the manner'], ['el nombre', 'the name'],
  ['la verdad', 'the truth'],
  // set 5
  ['sobre', 'on / about'], ['entre', 'between / among'], ['hasta', 'until / as far as / even'], ['desde', 'since / from'],
  ['hacia', 'towards'], ['contra', 'against'], ['durante', 'during / for'], ['todavía', 'still / yet'],
  ['casi', 'almost'], ['solo', 'only / alone'], ['bastante', 'quite / enough'], ['demasiado', 'too / too much'],
  ['pronto', 'soon'], ['despacio', 'slowly'], ['juntos', 'together'], ['la historia', 'the story / the history'],
  ['la idea', 'the idea', '¡Buena idea!', 'Good idea!'], ['el grupo', 'the group'], ['el número', 'the number'], ['la forma', 'the shape / the way'],
  ['el caso', 'the case'], ['el ejemplo', 'the example'], ['la razón', 'the reason', 'Tienes razón.', "You're right."], ['el lado', 'the side'],
  ['la vuelta', 'the return / the change (money)'],
  // set 6
  ['olvidar', 'to forget'], ['mandar', 'to send / to order'], ['conducir', 'to drive'], ['empezar a', 'to start (doing)'],
  ['tener que', 'to have to'], ['ir a', 'to be going to'], ['hay que', 'one must / it is necessary to'], ['acabar de', 'to have just (done)'],
  ['volver a', 'to do again', 'Vuelve a llamar.', 'Call again.'], ['soler', 'to usually (do)'], ['tratar de', 'to try to'], ['darse cuenta', 'to realise'],
  ['ponerse', 'to put on / to become'], ['llegar a ser', 'to become'], ['hacer falta', 'to be needed'], ['tener ganas de', 'to feel like (doing)', 'Tengo ganas de verte.', 'I feel like seeing you.'],
  ['tener razón', 'to be right'], ['tener miedo', 'to be afraid'], ['tener hambre', 'to be hungry'], ['tener sed', 'to be thirsty'],
  ['tener sueño', 'to be sleepy'], ['tener prisa', 'to be in a hurry'], ['tener suerte', 'to be lucky'], ['tener cuidado', 'to be careful'],
  ['dar igual', 'to not matter', 'Me da igual.', "I don't mind."],
  // set 7 — body, nature and everyday nouns
  ['el corazón', 'the heart'], ['la cara', 'the face'], ['la boca', 'the mouth'], ['la nariz', 'the nose'],
  ['la oreja', 'the ear'], ['el diente', 'the tooth'], ['el dedo', 'the finger'], ['la voz', 'the voice'],
  ['la luz', 'the light'], ['el fuego', 'the fire'], ['la tierra', 'the earth / the land'], ['el aire', 'the air'],
  ['el camino', 'the path / the way'], ['el sitio', 'the place / the site'], ['la zona', 'the area'], ['el principio', 'the beginning'],
  ['el fin', 'the end'], ['la mitad', 'the half'], ['el resto', 'the rest'], ['el tipo', 'the type / the guy'],
  ['el nivel', 'the level'], ['la cantidad', 'the amount'], ['la calidad', 'the quality'], ['la decisión', 'the decision'],
  ['la situación', 'the situation'],
  // set 8 — useful verbs
  ['recibir', 'to receive'], ['ofrecer', 'to offer'], ['explicar', 'to explain', '¿Me lo puedes explicar?', 'Can you explain it to me?'], ['enseñar', 'to teach / to show'],
  ['contar', 'to count / to tell'], ['elegir', 'to choose'], ['decidir', 'to decide'], ['crecer', 'to grow'],
  ['nacer', 'to be born'], ['morir', 'to die'], ['guardar', 'to keep / to save'], ['tirar', 'to throw / to pull'],
  ['empujar', 'to push'], ['coger', 'to take / to catch (Spain)'], ['llenar', 'to fill'], ['faltar', 'to be missing', 'Me falta tiempo.', "I'm short of time."],
  ['importar', 'to matter', 'No importa.', "It doesn't matter."], ['interesar', 'to interest'], ['encantar', 'to love (things)'], ['molestar', 'to bother'],
  ['evitar', 'to avoid'], ['mejorar', 'to improve'], ['despertarse', 'to wake up'], ['sentarse', 'to sit down'],
  ['vestirse', 'to get dressed'],
  // set 9 — describing words
  ['rápido', 'fast'], ['lento', 'slow'], ['fuerte', 'strong'], ['débil', 'weak'],
  ['pobre', 'poor'], ['lleno', 'full'], ['vacío', 'empty'], ['caliente', 'hot (to touch)'],
  ['duro', 'hard'], ['blando', 'soft'], ['bonito', 'pretty / nice'], ['hermoso', 'beautiful'],
  ['raro', 'strange / rare'], ['libre', 'free (not busy)'], ['ocupado', 'busy'], ['listo', 'clever / ready'],
  ['tranquilo', 'calm / quiet'], ['peligroso', 'dangerous'], ['famoso', 'famous'], ['privado', 'private'],
  ['principal', 'main'], ['propio', 'own', 'Tengo mi propio coche.', 'I have my own car.'], ['único', 'only / unique'], ['verdadero', 'true / real'],
  ['económico', 'economic / cheap'],
  // set 10 — adverbs and expressions
  ['rápidamente', 'quickly'], ['realmente', 'really'], ['finalmente', 'finally'], ['exactamente', 'exactly'],
  ['incluso', 'even'], ['apenas', 'hardly / barely'], ['tal vez', 'maybe'], ['enseguida', 'right away'],
  ['a menudo', 'often'], ['de repente', 'suddenly'], ['de nuevo', 'again'], ['otra vez', 'again / once more'],
  ['al menos', 'at least'], ['por supuesto', 'of course'], ['sin duda', 'without a doubt'], ['a la vez', 'at the same time'],
  ['delante de', 'in front of'], ['detrás de', 'behind'], ['fuera', 'outside'], ['arriba', 'up / upstairs'],
  ['abajo', 'down / downstairs'], ['enfrente', 'opposite'], ['a tiempo', 'on time'], ['de momento', 'for now'],
  ['poco a poco', 'little by little'],
  // set 11 — ideas and abstract words
  ['la guerra', 'the war'], ['la paz', 'the peace'], ['la muerte', 'the death'], ['el valor', 'the value / the courage'],
  ['el sentido', 'the sense / the meaning'], ['el sentimiento', 'the feeling'], ['el recuerdo', 'the memory / the souvenir'], ['la memoria', 'the memory (ability)'],
  ['la cultura', 'the culture'], ['el arte', 'the art'], ['la ciencia', 'the science'], ['la relación', 'the relationship'],
  ['el cambio', 'the change'], ['la iglesia', 'the church'], ['existir', 'to exist'], ['aparecer', 'to appear'],
  ['desaparecer', 'to disappear'], ['crear', 'to create'], ['construir', 'to build'], ['producir', 'to produce'],
  ['mantener', 'to maintain / to keep'], ['lograr', 'to achieve'], ['aumentar', 'to increase'], ['llorar', 'to cry'],
  ['sonreír', 'to smile'],
];

const SENTENCES: SentenceRow[][] = [
  [['Yo soy de España y ella es de México.', 'I am from Spain and she is from Mexico.'], ['El libro es para mi hermana.', 'The book is for my sister.'], ['Vivo en una casa con mis padres.', 'I live in a house with my parents.'], ['Si tienes tiempo, te llamo.', "If you have time, I'll call you."]],
  [['¿Qué piensas de la película?', 'What do you think of the film?'], ['Creo que va a llover.', "I think it's going to rain."], ['No encuentro mis llaves.', "I can't find my keys."], ['Déjame tu número.', 'Leave me your number.']],
  [['No hay nada en la nevera.', "There's nothing in the fridge."], ['Todo está bien.', 'Everything is fine.'], ['¿Quieres otro café?', 'Do you want another coffee?'], ['Nadie sabe la verdad.', 'Nobody knows the truth.']],
  [['Es una idea muy buena.', "It's a very good idea."], ['No tengo tiempo hoy.', "I don't have time today."], ['Hay mucha gente en la plaza.', 'There are lots of people in the square.'], ['Es la última vez.', "It's the last time."]],
  [['Trabajo desde las nueve hasta las cinco.', 'I work from nine until five.'], ['La tienda está entre el banco y la farmacia.', 'The shop is between the bank and the pharmacy.'], ['Todavía no he comido.', "I still haven't eaten."], ['Habla demasiado rápido.', 'He speaks too fast.']],
  [['Tengo que estudiar esta noche.', 'I have to study tonight.'], ['Acabo de llegar a casa.', "I've just got home."], ['Tengo mucha hambre.', "I'm very hungry."], ['Hay que tener cuidado.', 'You have to be careful.']],
  [['Me duele el corazón.', 'My heart hurts.'], ['Tiene una voz muy bonita.', 'She has a very beautiful voice.'], ['La mitad de la clase está enferma.', 'Half of the class is ill.'], ['Es una decisión difícil.', "It's a difficult decision."]],
  [['¿Me puedes explicar la pregunta?', 'Can you explain the question to me?'], ['Mi abuela me enseñó a cocinar.', 'My grandmother taught me to cook.'], ['No me importa el precio.', "I don't care about the price."], ['Me despierto a las siete.', 'I wake up at seven.']],
  [['El tren es más rápido que el autobús.', 'The train is faster than the bus.'], ['La botella está vacía.', 'The bottle is empty.'], ['¿Estás libre esta tarde?', 'Are you free this afternoon?'], ['Es un barrio muy tranquilo.', "It's a very quiet neighbourhood."]],
  [['De repente empezó a llover.', 'Suddenly it started to rain.'], ['Voy a la playa a menudo.', 'I often go to the beach.'], ['Por supuesto que te ayudo.', "Of course I'll help you."], ['Llegamos a tiempo.', 'We arrived on time.']],
  [['Nadie quiere la guerra.', 'Nobody wants war.'], ['Tengo muy buenos recuerdos de ese viaje.', 'I have very good memories of that trip.'], ['Van a construir un hospital nuevo.', "They're going to build a new hospital."], ['El niño empezó a llorar.', 'The child started to cry.']],
];

const LEVELS = ['A1', 'A1', 'A1', 'A1', 'A2', 'A2', 'A2', 'A2', 'A2', 'B1', 'B1'] as const;

const GRAMMAR = `
## Why these words?
These are some of the most frequent words in Spanish. Together with the words in the topic units, they make up most of what you'll hear and read every day, so they are worth learning early.

- Small words like **de, que, en, a, la, el** appear in almost every sentence.
- Many verbs here are irregular — see the grammar lessons for the patterns.
- Expressions with **tener** often use "to be" in English: *tengo hambre* = I am hungry.
`;

export const CORE_UNITS = LEVELS.map((level, i) =>
  units(level, [
    {
      id: `core-${i + 1}`,
      title: `Top words ${i + 1}`,
      titleEs: `Palabras frecuentes ${i + 1}`,
      emoji: '⭐',
      description: `Most-used Spanish words, set ${i + 1} of ${LEVELS.length}.`,
      words: CORE.slice(i * 25, i * 25 + 25),
      sentences: SENTENCES[i],
      grammar: GRAMMAR,
    },
  ])[0],
);
