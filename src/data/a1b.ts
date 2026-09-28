import { units } from './build';

export const A1B = units('A1', [
  {
    id: 'a1-11',
    title: 'Countries & languages',
    titleEs: 'Países e idiomas',
    emoji: '🌎',
    description: 'Say where you are from and which languages you speak.',
    words: [
      ['España', 'Spain'],
      ['México', 'Mexico'],
      ['Estados Unidos', 'the United States'],
      ['Inglaterra', 'England'],
      ['Francia', 'France'],
      ['Alemania', 'Germany'],
      ['Italia', 'Italy'],
      ['China', 'China'],
      ['español', 'Spanish (language / man)', 'Hablo un poco de español.', 'I speak a little Spanish.'],
      ['inglés', 'English (language / man)'],
      ['francés', 'French (language / man)'],
      ['alemán', 'German (language / man)'],
      ['italiano', 'Italian (language / man)'],
      ['el idioma', 'the language', '¿Cuántos idiomas hablas?', 'How many languages do you speak?'],
      ['la lengua', 'the language / the tongue'],
      ['extranjero', 'foreign'],
      ['hablar', 'to speak'],
      ['entender', 'to understand', 'No entiendo, ¿puedes repetir?', "I don't understand, can you repeat?"],
      ['un poco', 'a little'],
    ],
    sentences: [
      ['Soy de Inglaterra, pero vivo en España.', 'I am from England, but I live in Spain.'],
      ['Mi amiga es francesa.', 'My friend is French.'],
      ['Hablo inglés y un poco de español.', 'I speak English and a little Spanish.'],
      ['¿De dónde eres?', 'Where are you from?'],
      ['No entiendo el alemán.', "I don't understand German."],
    ],
    grammar: `
## Nationalities agree like adjectives
| | masculine | feminine |
| -o → -a | italiano | italiana |
| consonant → + a | español, inglés, alemán | española, inglesa, alemana |
| -e / -a: no change | estadounidense | estadounidense |

Notice the accent disappears in the feminine and plural: *inglés → inglesa, ingleses*.

- Nationalities and languages use a **lower-case** letter: *español, inglés*. Countries use a capital: *España*.
- **Soy de** + country: *Soy de Alemania.* · **Soy** + nationality: *Soy alemán.*
- **Hablo** + language, no article: *Hablo francés.*
`,
    conj: { verbs: ['hablar', 'entender', 'ser', 'vivir'], tenses: ['presente'] },
  },
  {
    id: 'a1-12',
    title: 'Jobs & work',
    titleEs: 'Las profesiones',
    emoji: '👩‍🏫',
    description: 'Say what you do and where you work.',
    words: [
      ['el arquitecto', 'the architect'],
      ['el enfermero', 'the nurse (male)'],
      ['el camarero', 'the waiter'],
      ['el cocinero', 'the cook / chef'],
      ['el abogado', 'the lawyer'],
      ['el ingeniero', 'the engineer'],
      ['el policía', 'the police officer'],
      ['el estudiante', 'the student'],
      ['el dependiente', 'the shop assistant'],
      ['el conductor', 'the driver'],
      ['el periodista', 'the journalist'],
      ['el artista', 'the artist'],
      ['la oficina', 'the office', 'Trabajo en una oficina.', 'I work in an office.'],
      ['la fábrica', 'the factory'],
      ['el trabajador', 'the worker'],
      ['¿a qué te dedicas?', 'what do you do (for a living)?'],
      ['estar en paro', 'to be unemployed'],
      ['jubilado', 'retired'],
    ],
    sentences: [
      ['Mi madre es enfermera.', 'My mother is a nurse.'],
      ['¿A qué te dedicas?', 'What do you do?'],
      ['Trabajo como camarero en un restaurante.', 'I work as a waiter in a restaurant.'],
      ['Mi abuelo está jubilado.', 'My grandfather is retired.'],
      ['Soy estudiante de medicina.', 'I am a medical student.'],
    ],
    grammar: `
## No article with jobs
*Soy **profesor**.* (not *soy un profesor*) — unless you add a description: *Es **un** profesor muy bueno.*

## Masculine and feminine jobs
| -o → -a | el camarero / la camarera |
| -or → -ora | el conductor / la conductora |
| -ista, -e: same form | el / la periodista, el / la estudiante |
| special | el policía / la policía (also: la mujer policía) |

- **trabajar como** + job: *Trabajo como cocinero.*
- **trabajar en** + place: *Trabajo en una fábrica.*
`,
    conj: { verbs: ['trabajar', 'ser', 'estar'], tenses: ['presente'] },
  },
  {
    id: 'a1-13',
    title: 'Questions & little words',
    titleEs: 'Preguntas y palabras útiles',
    emoji: '❓',
    description: 'Question words and the small words that join sentences.',
    words: [
      ['qué', 'what', '¿Qué haces?', 'What are you doing?'],
      ['quién', 'who'],
      ['cuándo', 'when'],
      ['cómo', 'how'],
      ['por qué', 'why'],
      ['porque', 'because', 'Estudio porque quiero viajar.', 'I study because I want to travel.'],
      ['cuál', 'which / what'],
      ['cuánto', 'how much'],
      ['y', 'and'],
      ['pero', 'but'],
      ['o', 'or'],
      ['con', 'with'],
      ['sin', 'without', 'Un café sin azúcar.', 'A coffee without sugar.'],
      ['muy', 'very'],
      ['más', 'more'],
      ['menos', 'less'],
      ['poco', 'little / not much'],
      ['aquí', 'here'],
      ['allí', 'there'],
      ['ahora', 'now'],
    ],
    sentences: [
      ['¿Por qué estudias español?', 'Why are you studying Spanish?'],
      ['¿Cuándo es tu cumpleaños?', 'When is your birthday?'],
      ['¿Quién es tu profesor?', 'Who is your teacher?'],
      ['Quiero un té con leche, pero sin azúcar.', 'I want a tea with milk, but without sugar.'],
      ['¿Cuál es tu número de teléfono?', 'What is your phone number?'],
    ],
    grammar: `
## Question words always have an accent
| qué | what |
| quién / quiénes | who |
| cuándo | when |
| dónde / adónde | where / where to |
| cómo | how |
| cuánto/a/os/as | how much / how many |
| cuál / cuáles | which / what |
| por qué | why |

The answer **porque** (because) is one word, without an accent.

## Qué or cuál?
- **qué** + noun: *¿Qué libro lees?*
- **cuál** + *es / son* to ask for one of several: *¿Cuál es tu dirección?* (not *¿Qué es tu dirección?*)

## y → e, o → u
Before a word starting with the *i* / *o* sound: *padre **e** hijo*, *siete **u** ocho*.
`,
  },
  {
    id: 'a1-14',
    title: 'Everyday verbs',
    titleEs: 'Verbos de todos los días',
    emoji: '🔁',
    description: 'The most useful regular verbs for daily life.',
    words: [
      ['mirar', 'to look at / to watch'],
      ['escuchar', 'to listen to', 'Escucho música en el coche.', 'I listen to music in the car.'],
      ['llamar', 'to call'],
      ['preguntar', 'to ask (a question)'],
      ['contestar', 'to answer'],
      ['ayudar', 'to help', '¿Me ayudas, por favor?', 'Can you help me, please?'],
      ['necesitar', 'to need'],
      ['usar', 'to use'],
      ['cocinar', 'to cook'],
      ['cerrar', 'to close'],
      ['empezar', 'to start / to begin'],
      ['terminar', 'to finish'],
      ['querer', 'to want / to love'],
      ['poder', 'can / to be able to', '¿Puedo abrir la ventana?', 'Can I open the window?'],
      ['hacer', 'to do / to make'],
      ['tener', 'to have'],
      ['ir', 'to go'],
      ['venir', 'to come'],
      ['saber', 'to know (facts) / to know how'],
      ['dormir', 'to sleep'],
    ],
    sentences: [
      ['Necesito ayuda con los deberes.', 'I need help with my homework.'],
      ['¿Puedes cerrar la puerta?', 'Can you close the door?'],
      ['La clase empieza a las nueve.', 'The class starts at nine.'],
      ['No sé cocinar muy bien.', "I don't know how to cook very well."],
      ['Mi hermano duerme mucho.', 'My brother sleeps a lot.'],
    ],
    grammar: `
## Verb + infinitive
Many verbs are followed directly by an infinitive:
- **querer** + inf.: *Quiero comer.*
- **poder** + inf.: *¿Puedes venir?*
- **necesitar** + inf.: *Necesito dormir.*
- **saber** + inf. = to know how to: *Sé nadar.*

## Some need a small word in between
- **empezar a**: *Empiezo **a** trabajar a las ocho.*
- **terminar de**: *Termino **de** trabajar a las cinco.*
- **tener que** = to have to: *Tengo **que** estudiar.*
- **ir a** = going to: *Voy **a** llamar a mi madre.*

**cerrar, empezar, querer** (e → ie), **poder, dormir** (o → ue) are boot verbs — see the grammar lesson.
`,
    conj: { verbs: ['mirar', 'escuchar', 'ayudar', 'necesitar', 'cerrar', 'empezar', 'poder', 'querer', 'dormir', 'saber'], tenses: ['presente'] },
  },
  {
    id: 'a1-15',
    title: 'Months, seasons & big numbers',
    titleEs: 'Meses, estaciones y números',
    emoji: '📅',
    description: 'The months, the seasons and numbers up to a thousand.',
    words: [
      ['enero', 'January'],
      ['febrero', 'February'],
      ['marzo', 'March'],
      ['abril', 'April'],
      ['mayo', 'May'],
      ['junio', 'June'],
      ['julio', 'July'],
      ['agosto', 'August'],
      ['septiembre', 'September'],
      ['octubre', 'October'],
      ['noviembre', 'November'],
      ['diciembre', 'December'],
      ['la primavera', 'the spring'],
      ['el otoño', 'the autumn / fall'],
      ['la fecha', 'the date', '¿Qué fecha es hoy?', 'What is the date today?'],
      ['treinta', 'thirty'],
      ['cincuenta', 'fifty'],
      ['cien', 'one hundred'],
      ['mil', 'one thousand'],
    ],
    sentences: [
      ['Mi cumpleaños es el doce de marzo.', 'My birthday is on the twelfth of March.'],
      ['En primavera hace buen tiempo.', 'In spring the weather is good.'],
      ['El libro cuesta cincuenta euros.', 'The book costs fifty euros.'],
      ['Vamos de vacaciones en agosto.', 'We go on holiday in August.'],
      ['Nací en mil novecientos noventa.', 'I was born in nineteen ninety.'],
    ],
    grammar: `
## Numbers from 30
| 30 treinta | 40 cuarenta | 50 cincuenta |
| 60 sesenta | 70 setenta | 80 ochenta |
| 90 noventa | 100 cien | 101 ciento uno |
| 200 doscientos | 500 quinientos | 1000 mil |

- From 31, use **y**: *treinta **y** uno, cuarenta **y** cinco*.
- **cien** alone, **ciento** + more: *cien euros*, *ciento veinte euros*.
- Years are read as full numbers: *2025 = dos mil veinticinco*.

## Dates
**el** + number + **de** + month: *el 5 de mayo*. The first can be *el uno* or *el primero*.
Months and seasons use lower-case letters: *en julio, en otoño*.
`,
  },
]);
