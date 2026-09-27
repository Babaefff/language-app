import { units } from './build';

export const A1 = units('A1', [
  {
    id: 'a1-01',
    title: 'Greetings & introductions',
    titleEs: 'Saludos y presentaciones',
    emoji: '👋',
    description: 'Say hello, introduce yourself and be polite.',
    words: [
      ['hola', 'hello', '¡Hola! ¿Qué tal?', 'Hi! How are you?'],
      ['adiós', 'goodbye'],
      ['buenos días', 'good morning', 'Buenos días, señora.', 'Good morning, madam.'],
      ['buenas tardes', 'good afternoon'],
      ['buenas noches', 'good evening / good night'],
      ['¿qué tal?', 'how are you? / how is it going?'],
      ['bien', 'well / fine', 'Estoy bien, gracias.', 'I am fine, thanks.'],
      ['mal', 'badly / not well'],
      ['gracias', 'thank you', 'Muchas gracias.', 'Thank you very much.'],
      ['de nada', "you're welcome"],
      ['por favor', 'please', 'Un café, por favor.', 'A coffee, please.'],
      ['me llamo', 'my name is', 'Me llamo Ana.', 'My name is Ana.'],
      ['mucho gusto', 'nice to meet you'],
      ['perdón', 'sorry / excuse me'],
      ['sí', 'yes'],
      ['no', 'no / not'],
      ['hasta luego', 'see you later'],
    ],
    sentences: [
      ['Hola, me llamo Carlos.', 'Hello, my name is Carlos.'],
      ['¿Cómo te llamas?', 'What is your name?'],
      ['Soy de España.', 'I am from Spain.'],
      ['Buenos días, ¿qué tal?', 'Good morning, how are you?'],
      ['Muy bien, gracias.', 'Very well, thank you.'],
    ],
    grammar: `
## Subject pronouns
| yo | I |
| tú | you (informal) |
| él / ella / usted | he / she / you (formal) |
| nosotros / nosotras | we |
| vosotros / vosotras | you all (Spain, informal) |
| ellos / ellas / ustedes | they / you all |

Spanish often **drops the pronoun** because the verb ending already shows who is speaking: *Soy Ana* = I am Ana.

## The verb ser (to be)
| yo soy | nosotros somos |
| tú eres | vosotros sois |
| él/ella/usted es | ellos/ellas/ustedes son |

- **¿Cómo te llamas?** — What's your name? (lit. How do you call yourself?)
- **Me llamo…** — My name is…
- **Soy de…** — I'm from…

Questions and exclamations open with an upside-down mark: **¿…?** and **¡…!**
`,
    conj: { verbs: ['ser', 'llamarse'], tenses: ['presente'] },
  },
  {
    id: 'a1-02',
    title: 'Numbers & age',
    titleEs: 'Los números y la edad',
    emoji: '🔢',
    description: 'Count to twenty and say how old you are.',
    words: [
      ['cero', 'zero'],
      ['uno', 'one'],
      ['dos', 'two'],
      ['tres', 'three'],
      ['cuatro', 'four'],
      ['cinco', 'five'],
      ['seis', 'six'],
      ['siete', 'seven'],
      ['ocho', 'eight'],
      ['nueve', 'nine'],
      ['diez', 'ten'],
      ['once', 'eleven'],
      ['doce', 'twelve'],
      ['quince', 'fifteen'],
      ['veinte', 'twenty'],
      ['el año', 'the year', 'Tengo treinta años.', 'I am thirty years old.'],
      ['¿cuántos años tienes?', 'how old are you?'],
    ],
    sentences: [
      ['Tengo veinte años.', 'I am twenty years old.'],
      ['Mi hermano tiene doce años.', 'My brother is twelve years old.'],
      ['Tengo dos gatos.', 'I have two cats.'],
      ['Ella tiene quince años.', 'She is fifteen years old.'],
    ],
    grammar: `
## Numbers 0–30
| 0 cero | 1 uno | 2 dos | 3 tres |
| 4 cuatro | 5 cinco | 6 seis | 7 siete |
| 8 ocho | 9 nueve | 10 diez | 11 once |
| 12 doce | 13 trece | 14 catorce | 15 quince |
| 16 dieciséis | 17 diecisiete | 18 dieciocho | 19 diecinueve |
| 20 veinte | 21 veintiuno | 22 veintidós | 30 treinta |

## Age uses tener (to have)
In Spanish you **have** years: **Tengo 25 años** = I am 25.

| yo tengo | nosotros tenemos |
| tú tienes | vosotros tenéis |
| él/ella/usted tiene | ellos/ellas/ustedes tienen |

- **¿Cuántos años tienes?** — How old are you?
- **Uno** becomes **un** before a masculine noun: *un año*, *veintiún años*.
`,
    conj: { verbs: ['tener'], tenses: ['presente'] },
  },
  {
    id: 'a1-03',
    title: 'Family',
    titleEs: 'La familia',
    emoji: '👨‍👩‍👧',
    description: 'Talk about your family and pets.',
    words: [
      ['la familia', 'the family'],
      ['la madre', 'the mother'],
      ['el padre', 'the father'],
      ['los padres', 'the parents'],
      ['el hermano', 'the brother'],
      ['la hermana', 'the sister'],
      ['el hijo', 'the son'],
      ['la hija', 'the daughter'],
      ['el abuelo', 'the grandfather'],
      ['la abuela', 'the grandmother'],
      ['el tío', 'the uncle'],
      ['la tía', 'the aunt'],
      ['el primo', 'the cousin (male)'],
      ['el marido', 'the husband'],
      ['la mujer', 'the woman / the wife'],
      ['el perro', 'the dog', 'Mi perro se llama Toby.', 'My dog is called Toby.'],
      ['el gato', 'the cat'],
    ],
    sentences: [
      ['Mi madre se llama Rosa.', 'My mother is called Rosa.'],
      ['Tengo un hermano y una hermana.', 'I have a brother and a sister.'],
      ['Mis abuelos viven en Sevilla.', 'My grandparents live in Seville.'],
      ['Su padre es médico.', 'His father is a doctor.'],
      ['¿Tienes hijos?', 'Do you have children?'],
    ],
    grammar: `
## Gender and articles
Every noun is **masculine** or **feminine**. Most nouns ending in **-o** are masculine, most ending in **-a** are feminine.

| | masculine | feminine |
| the (singular) | el hermano | la hermana |
| the (plural) | los hermanos | las hermanas |
| a / an | un hermano | una hermana |

A masculine plural can mean a mixed group: **los padres** = the parents, **los hermanos** = brothers and sisters.

## Possessives
| mi / mis | my |
| tu / tus | your |
| su / sus | his / her / your (formal) / their |
| nuestro/a | our |

*mi hermano* → *mis hermanos*
`,
    conj: { verbs: ['tener', 'vivir'], tenses: ['presente'] },
  },
  {
    id: 'a1-04',
    title: 'Describing people & things',
    titleEs: 'Descripciones y colores',
    emoji: '🎨',
    description: 'Colours, adjectives and ser vs estar.',
    words: [
      ['grande', 'big'],
      ['pequeño', 'small'],
      ['alto', 'tall'],
      ['bajo', 'short (height)'],
      ['guapo', 'good-looking'],
      ['feo', 'ugly'],
      ['simpático', 'nice / friendly', 'Tu amiga es muy simpática.', 'Your friend is very nice.'],
      ['nuevo', 'new'],
      ['viejo', 'old'],
      ['rojo', 'red'],
      ['azul', 'blue'],
      ['verde', 'green'],
      ['amarillo', 'yellow'],
      ['blanco', 'white'],
      ['negro', 'black'],
      ['cansado', 'tired', 'Hoy estoy muy cansado.', 'Today I am very tired.'],
      ['contento', 'happy / pleased'],
    ],
    sentences: [
      ['La casa es grande y blanca.', 'The house is big and white.'],
      ['Mi hermana es alta y simpática.', 'My sister is tall and nice.'],
      ['Estoy muy cansado hoy.', 'I am very tired today.'],
      ['El coche nuevo es rojo.', 'The new car is red.'],
      ['Los perros son pequeños.', 'The dogs are small.'],
    ],
    grammar: `
## Adjectives agree with the noun
Adjectives usually go **after** the noun and match its gender and number.

| | singular | plural |
| masculine | el gato negro | los gatos negros |
| feminine | la casa blanca | las casas blancas |

Adjectives ending in **-e** or a consonant don't change for gender: *un coche grande, una casa grande, un mar azul, una camisa azul*.

## Ser or estar?
- **ser** — what something *is*: identity, origin, character, description. *Ana es alta.*
- **estar** — how or where something *is*: moods, temporary states, location. *Ana está cansada.*

| yo estoy | nosotros estamos |
| tú estás | vosotros estáis |
| él/ella/usted está | ellos/ellas/ustedes están |
`,
    conj: { verbs: ['ser', 'estar'], tenses: ['presente'] },
  },
  {
    id: 'a1-05',
    title: 'At home',
    titleEs: 'La casa',
    emoji: '🏠',
    description: 'Rooms, furniture, "hay" and where things are.',
    words: [
      ['la casa', 'the house'],
      ['el piso', 'the flat / apartment / floor'],
      ['la cocina', 'the kitchen'],
      ['el baño', 'the bathroom'],
      ['el dormitorio', 'the bedroom'],
      ['el salón', 'the living room'],
      ['la mesa', 'the table'],
      ['la silla', 'the chair'],
      ['la cama', 'the bed'],
      ['el sofá', 'the sofa'],
      ['la puerta', 'the door'],
      ['la ventana', 'the window'],
      ['hay', 'there is / there are', 'Hay un sofá en el salón.', 'There is a sofa in the living room.'],
      ['encima de', 'on top of'],
      ['debajo de', 'under'],
      ['al lado de', 'next to'],
      ['dentro de', 'inside'],
    ],
    sentences: [
      ['Hay dos dormitorios en mi piso.', 'There are two bedrooms in my flat.'],
      ['El gato está debajo de la mesa.', 'The cat is under the table.'],
      ['La cocina está al lado del salón.', 'The kitchen is next to the living room.'],
      ['Vivo en una casa pequeña.', 'I live in a small house.'],
      ['¿Dónde está el baño?', 'Where is the bathroom?'],
    ],
    grammar: `
## Hay vs estar
- **hay** = there is / there are. Used with *un, una, dos, muchos…* or no article. *Hay una cama en el dormitorio.*
- **estar** = to be (located). Used with *el, la, mi, tu…* *La cama está en el dormitorio.*

## Prepositions of place
| en | in / on |
| encima de | on top of |
| debajo de | under |
| al lado de | next to |
| delante de / detrás de | in front of / behind |
| dentro de | inside |

**de + el = del**: *al lado del sofá* (never *de el*).
`,
    conj: { verbs: ['estar', 'vivir'], tenses: ['presente'] },
  },
  {
    id: 'a1-06',
    title: 'Food & drink',
    titleEs: 'La comida y la bebida',
    emoji: '🍎',
    description: 'Order food and learn regular present-tense verbs.',
    words: [
      ['el agua', 'the water'],
      ['el pan', 'the bread'],
      ['la leche', 'the milk'],
      ['el café', 'the coffee'],
      ['el té', 'the tea'],
      ['la fruta', 'the fruit'],
      ['la manzana', 'the apple'],
      ['el queso', 'the cheese'],
      ['la carne', 'the meat'],
      ['el pescado', 'the fish (food)'],
      ['el arroz', 'the rice'],
      ['el vino', 'the wine'],
      ['el desayuno', 'the breakfast'],
      ['el almuerzo', 'the lunch'],
      ['la cena', 'the dinner'],
      ['comer', 'to eat', '¿Qué comes hoy?', 'What are you eating today?'],
      ['beber', 'to drink'],
      ['rico', 'tasty / delicious'],
    ],
    sentences: [
      ['Quiero un café con leche.', 'I want a coffee with milk.'],
      ['No como carne.', "I don't eat meat."],
      ['Bebemos agua con la comida.', 'We drink water with the meal.'],
      ['¿Qué quieres para cenar?', 'What do you want for dinner?'],
      ['El pan está muy rico.', 'The bread is very tasty.'],
    ],
    grammar: `
## Regular verbs in the present
Remove **-ar / -er / -ir** and add the ending:

| | hablar | comer | vivir |
| yo | hablo | como | vivo |
| tú | hablas | comes | vives |
| él/ella/usted | habla | come | vive |
| nosotros | hablamos | comemos | vivimos |
| vosotros | habláis | coméis | vivís |
| ellos/ustedes | hablan | comen | viven |

## Querer (to want) — stem change e → ie
*quiero, quieres, quiere, queremos, queréis, quieren*

- Negation: put **no** before the verb: *No bebo vino.*
- **el agua** is feminine but takes *el* in the singular for sound: *el agua fría*.
`,
    conj: { verbs: ['hablar', 'comer', 'beber', 'vivir', 'tomar', 'querer'], tenses: ['presente'] },
  },
  {
    id: 'a1-07',
    title: 'Daily routine',
    titleEs: 'La rutina diaria',
    emoji: '⏰',
    description: 'Reflexive verbs and telling the time.',
    words: [
      ['levantarse', 'to get up', 'Me levanto a las siete.', 'I get up at seven.'],
      ['ducharse', 'to shower'],
      ['acostarse', 'to go to bed'],
      ['desayunar', 'to have breakfast'],
      ['trabajar', 'to work'],
      ['estudiar', 'to study'],
      ['la mañana', 'the morning'],
      ['la tarde', 'the afternoon / early evening'],
      ['la noche', 'the night'],
      ['temprano', 'early'],
      ['tarde', 'late'],
      ['siempre', 'always'],
      ['nunca', 'never'],
      ['a veces', 'sometimes'],
      ['todos los días', 'every day'],
      ['¿qué hora es?', 'what time is it?'],
    ],
    sentences: [
      ['Me levanto a las siete.', 'I get up at seven.'],
      ['Siempre desayuno café y pan.', 'I always have coffee and bread for breakfast.'],
      ['Trabajo de lunes a viernes.', 'I work from Monday to Friday.'],
      ['Nos acostamos muy tarde.', 'We go to bed very late.'],
      ['Son las tres y media.', 'It is half past three.'],
    ],
    grammar: `
## Reflexive verbs
Verbs ending in **-se** describe actions you do to yourself. The pronoun goes before the verb:

| yo me levanto | nosotros nos levantamos |
| tú te levantas | vosotros os levantáis |
| él/ella se levanta | ellos/ellas se levantan |

**acostarse** changes o → ue: *me acuesto, te acuestas, se acuesta, nos acostamos…*

## Telling the time
- **¿Qué hora es?** — **Es la una.** / **Son las dos.**
- **y cuarto** (quarter past), **y media** (half past), **menos cuarto** (quarter to)
- **a las ocho** = at eight o'clock
- **de la mañana / de la tarde / de la noche** = am / pm / at night
`,
    conj: { verbs: ['levantarse', 'ducharse', 'acostarse', 'trabajar', 'estudiar', 'desayunar'], tenses: ['presente'] },
  },
  {
    id: 'a1-08',
    title: 'Around town',
    titleEs: 'La ciudad',
    emoji: '🏙️',
    description: 'Places, directions and the verb ir.',
    words: [
      ['la ciudad', 'the city'],
      ['la calle', 'the street'],
      ['el banco', 'the bank / the bench'],
      ['el supermercado', 'the supermarket'],
      ['la farmacia', 'the pharmacy'],
      ['el restaurante', 'the restaurant'],
      ['el hospital', 'the hospital'],
      ['la estación', 'the station'],
      ['el parque', 'the park'],
      ['la plaza', 'the square'],
      ['a la derecha', 'on / to the right'],
      ['a la izquierda', 'on / to the left'],
      ['todo recto', 'straight ahead'],
      ['cerca', 'near', 'El parque está cerca de mi casa.', 'The park is near my house.'],
      ['lejos', 'far'],
      ['dónde', 'where'],
    ],
    sentences: [
      ['¿Dónde está la farmacia?', 'Where is the pharmacy?'],
      ['El banco está a la derecha.', 'The bank is on the right.'],
      ['Voy al supermercado.', 'I am going to the supermarket.'],
      ['La estación está muy lejos.', 'The station is very far.'],
      ['Vamos a comer en un restaurante.', 'We are going to eat in a restaurant.'],
    ],
    grammar: `
## Ir (to go) — irregular
| yo voy | nosotros vamos |
| tú vas | vosotros vais |
| él/ella/usted va | ellos/ellas/ustedes van |

**a + el = al**: *Voy al parque* (never *a el*). *Voy a la plaza.*

## Ir a + infinitive = going to (near future)
- *Voy a estudiar.* — I'm going to study.
- *¿Vas a venir?* — Are you going to come?

## Asking the way
- **¿Dónde está…?** — Where is…?
- **Sigue todo recto** y **gira a la izquierda.** — Go straight on and turn left.
`,
    conj: { verbs: ['ir', 'venir', 'buscar'], tenses: ['presente'] },
  },
  {
    id: 'a1-09',
    title: 'Free time & likes',
    titleEs: 'El tiempo libre',
    emoji: '⚽',
    description: 'Hobbies and the verb gustar.',
    words: [
      ['gustar', 'to like (lit. to please)', 'Me gusta el café.', 'I like coffee.'],
      ['el deporte', 'the sport'],
      ['el fútbol', 'football / soccer'],
      ['la música', 'the music'],
      ['leer', 'to read'],
      ['bailar', 'to dance'],
      ['cantar', 'to sing'],
      ['nadar', 'to swim'],
      ['jugar', 'to play (games, sports)'],
      ['el cine', 'the cinema'],
      ['la película', 'the film / movie'],
      ['el libro', 'the book'],
      ['el fin de semana', 'the weekend'],
      ['también', 'also / too'],
      ['tampoco', 'neither / not either'],
      ['mucho', 'a lot / much'],
    ],
    sentences: [
      ['Me gusta mucho la música.', 'I like music a lot.'],
      ['A mi hermano le gusta jugar al fútbol.', 'My brother likes to play football.'],
      ['¿Te gustan las películas de terror?', 'Do you like horror films?'],
      ['Los fines de semana leo un libro.', 'At weekends I read a book.'],
      ['A mí tampoco.', 'Me neither.'],
    ],
    grammar: `
## Gustar works "backwards"
The thing you like is the subject: *Me gusta el cine* = the cinema pleases me.

| me gusta(n) | I like |
| te gusta(n) | you like |
| le gusta(n) | he / she / you (formal) like |
| nos gusta(n) | we like |
| os gusta(n) | you all like |
| les gusta(n) | they / you all like |

- **gusta** + singular noun or verb: *Me gusta el libro. Me gusta bailar.*
- **gustan** + plural noun: *Me gustan los libros.*
- Agree: **a mí también** (me too). Disagree with a negative: **a mí tampoco** (me neither).

**jugar** changes u → ue: *juego, juegas, juega, jugamos, jugáis, juegan* — *jugar **al** fútbol*.
`,
    conj: { verbs: ['jugar', 'leer', 'bailar', 'cantar', 'hacer'], tenses: ['presente'] },
  },
  {
    id: 'a1-10',
    title: 'Days, dates & weather',
    titleEs: 'Los días y el tiempo',
    emoji: '☀️',
    description: 'Days of the week, today/tomorrow and the weather.',
    words: [
      ['el lunes', 'Monday'],
      ['el martes', 'Tuesday'],
      ['el miércoles', 'Wednesday'],
      ['el jueves', 'Thursday'],
      ['el viernes', 'Friday'],
      ['el sábado', 'Saturday'],
      ['el domingo', 'Sunday'],
      ['hoy', 'today'],
      ['mañana', 'tomorrow'],
      ['ayer', 'yesterday'],
      ['la semana', 'the week'],
      ['el mes', 'the month'],
      ['hace calor', 'it is hot'],
      ['hace frío', 'it is cold'],
      ['hace sol', 'it is sunny'],
      ['llueve', 'it rains / it is raining'],
      ['nieva', 'it snows / it is snowing'],
    ],
    sentences: [
      ['Hoy es lunes.', 'Today is Monday.'],
      ['En invierno hace frío.', 'In winter it is cold.'],
      ['Los sábados voy al cine.', 'On Saturdays I go to the cinema.'],
      ['Hoy llueve mucho.', 'It is raining a lot today.'],
      ['Mi cumpleaños es en mayo.', 'My birthday is in May.'],
    ],
    grammar: `
## Days and months
Days and months are written with a **lower-case** letter.

- **el lunes** = on Monday · **los lunes** = on Mondays (every Monday)
- Months: *enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre*
- Dates: **el 5 de mayo** · *¿Qué día es hoy?*

## Weather with hacer
| hace calor | it's hot |
| hace frío | it's cold |
| hace sol | it's sunny |
| hace viento | it's windy |
| hace buen / mal tiempo | the weather is good / bad |

But: **llueve** (it rains), **nieva** (it snows), **está nublado** (it's cloudy).

**hacer** is irregular only in *yo*: **hago**, haces, hace, hacemos, hacéis, hacen.
`,
    conj: { verbs: ['hacer', 'salir'], tenses: ['presente'] },
  },
]);
