import { units } from './build';

export const A2 = units('A2', [
  {
    id: 'a2-01',
    title: 'Clothes & shopping',
    titleEs: 'La ropa y las compras',
    emoji: '🛍️',
    description: 'Buy clothes, ask prices, use este/ese and lo/la.',
    words: [
      ['la ropa', 'the clothes'],
      ['la camisa', 'the shirt'],
      ['la camiseta', 'the T-shirt'],
      ['los pantalones', 'the trousers / pants'],
      ['el vestido', 'the dress'],
      ['la falda', 'the skirt'],
      ['los zapatos', 'the shoes'],
      ['la chaqueta', 'the jacket'],
      ['la tienda', 'the shop'],
      ['caro', 'expensive'],
      ['barato', 'cheap'],
      ['la talla', 'the size (clothes)', '¿Qué talla usa?', 'What size do you wear?'],
      ['¿cuánto cuesta?', 'how much does it cost?'],
      ['el dinero', 'the money'],
      ['pagar', 'to pay', '¿Puedo pagar con tarjeta?', 'Can I pay by card?'],
      ['comprar', 'to buy'],
      ['llevar', 'to wear / to carry'],
    ],
    sentences: [
      ['¿Cuánto cuesta esta camisa?', 'How much does this shirt cost?'],
      ['Estos zapatos son muy caros.', 'These shoes are very expensive.'],
      ['¿Puedo probarme la chaqueta?', 'Can I try on the jacket?'],
      ['La falda es bonita, la compro.', "The skirt is pretty, I'll buy it."],
      ['Hoy llevo un vestido azul.', 'Today I am wearing a blue dress.'],
    ],
    grammar: `
## Demonstratives
| | near me | near you | over there |
| masc. sing. | este | ese | aquel |
| fem. sing. | esta | esa | aquella |
| masc. plural | estos | esos | aquellos |
| fem. plural | estas | esas | aquellas |

*Esta camisa es cara, pero esa es barata.*

## Direct object pronouns
They replace the thing and go **before** the verb:

| lo | it / him (masc.) |
| la | it / her (fem.) |
| los / las | them |

- *¿Compras el vestido?* — *Sí, **lo** compro.*
- With an infinitive they can attach: *Quiero comprar**la**.*

**costar** (o → ue): *¿Cuánto cuesta?* (one thing) · *¿Cuánto cuestan?* (several)
`,
    conj: { verbs: ['costar', 'probarse', 'llevar', 'comprar', 'pagar', 'poder'], tenses: ['presente'] },
  },
  {
    id: 'a2-02',
    title: 'What did you do?',
    titleEs: '¿Qué hiciste?',
    emoji: '📸',
    description: 'The preterite: finished actions in the past.',
    words: [
      ['anoche', 'last night'],
      ['la semana pasada', 'last week'],
      ['el año pasado', 'last year'],
      ['hace dos días', 'two days ago'],
      ['visitar', 'to visit'],
      ['llegar', 'to arrive'],
      ['el viaje', 'the trip / journey'],
      ['el museo', 'the museum'],
      ['la foto', 'the photo'],
      ['la fiesta', 'the party'],
      ['conocer', 'to know / to meet (for the first time)', 'Conocí a Pedro en Madrid.', 'I met Pedro in Madrid.'],
      ['primero', 'first'],
      ['luego', 'then / later'],
      ['después', 'afterwards'],
      ['por fin', 'finally / at last'],
    ],
    sentences: [
      ['Ayer fui al museo.', 'Yesterday I went to the museum.'],
      ['La semana pasada visitamos a mis abuelos.', 'Last week we visited my grandparents.'],
      ['Anoche no dormí bien.', "Last night I didn't sleep well."],
      ['¿Qué hiciste el fin de semana?', 'What did you do at the weekend?'],
      ['Llegué a casa muy tarde.', 'I arrived home very late.'],
    ],
    grammar: `
## Preterite (pretérito indefinido)
For **completed** actions at a specific time: *ayer, anoche, el año pasado, en 2020…*

| | hablar | comer | vivir |
| yo | hablé | comí | viví |
| tú | hablaste | comiste | viviste |
| él/ella/usted | habló | comió | vivió |
| nosotros | hablamos | comimos | vivimos |
| vosotros | hablasteis | comisteis | vivisteis |
| ellos/ustedes | hablaron | comieron | vivieron |

## Key irregulars
- **ser / ir** (same!): fui, fuiste, fue, fuimos, fuisteis, fueron
- **hacer**: hice, hiciste, hizo, hicimos, hicisteis, hicieron
- **tener**: tuve, tuviste, tuvo… · **estar**: estuve, estuviste, estuvo…

Spelling: **llegar → llegué**, **buscar → busqué**, **empezar → empecé** (only *yo*).

Watch the accents: *hablo* = I speak, *habló* = he spoke.
`,
    conj: { verbs: ['viajar', 'llegar', 'visitar', 'ir', 'ser', 'hacer', 'tener', 'estar'], tenses: ['preterito'] },
  },
  {
    id: 'a2-03',
    title: 'Health & the body',
    titleEs: 'La salud y el cuerpo',
    emoji: '🩺',
    description: 'Say what hurts and visit the doctor.',
    words: [
      ['el cuerpo', 'the body'],
      ['la cabeza', 'the head'],
      ['el brazo', 'the arm'],
      ['la pierna', 'the leg'],
      ['la mano', 'the hand'],
      ['el pie', 'the foot'],
      ['el estómago', 'the stomach'],
      ['la espalda', 'the back'],
      ['la garganta', 'the throat'],
      ['el médico', 'the doctor'],
      ['enfermo', 'ill / sick'],
      ['la fiebre', 'the fever / temperature'],
      ['la medicina', 'the medicine'],
      ['me duele', 'it hurts (me)', 'Me duele la espalda.', 'My back hurts.'],
      ['el dolor', 'the pain'],
      ['descansar', 'to rest'],
    ],
    sentences: [
      ['Me duele la cabeza.', 'I have a headache.'],
      ['Tengo fiebre y estoy enfermo.', 'I have a temperature and I am ill.'],
      ['Tienes que ir al médico.', 'You have to go to the doctor.'],
      ['Le duelen los pies.', 'His feet hurt.'],
      ['Necesito descansar un poco.', 'I need to rest a little.'],
    ],
    grammar: `
## Doler works like gustar
- **Me duele** + singular: *Me duele la cabeza.*
- **Me duelen** + plural: *Me duelen los ojos.*

Use **the article, not a possessive**, for body parts: *Me duele **la** mano* (not *mi mano*).

## Tener que + infinitive = to have to
- *Tengo que tomar la medicina.* — I have to take the medicine.
- *Tienes que descansar.* — You have to rest.

## Useful phrases
- **¿Qué te pasa?** — What's wrong?
- **Me siento mal.** — I feel ill. (*sentirse*, e → ie)
- **Tengo tos / fiebre / gripe.** — I have a cough / a temperature / the flu.
`,
    conj: { verbs: ['doler', 'sentirse', 'tener', 'descansar'], tenses: ['presente'] },
  },
  {
    id: 'a2-04',
    title: 'Travel & transport',
    titleEs: 'Los viajes',
    emoji: '✈️',
    description: 'Transport, hotels, holidays and por vs para.',
    words: [
      ['el avión', 'the plane'],
      ['el tren', 'the train'],
      ['el autobús', 'the bus'],
      ['el coche', 'the car'],
      ['el billete', 'the ticket'],
      ['el aeropuerto', 'the airport'],
      ['la maleta', 'the suitcase'],
      ['el hotel', 'the hotel'],
      ['la habitación', 'the room'],
      ['el pasaporte', 'the passport'],
      ['las vacaciones', 'the holidays / vacation'],
      ['la playa', 'the beach'],
      ['la montaña', 'the mountain'],
      ['el mar', 'the sea'],
      ['reservar', 'to book / to reserve'],
      ['salir', 'to leave / to go out', 'El avión sale a las diez.', 'The plane leaves at ten.'],
    ],
    sentences: [
      ['El tren sale a las nueve.', 'The train leaves at nine.'],
      ['Quiero reservar una habitación.', 'I want to book a room.'],
      ['Vamos a la playa en verano.', 'We go to the beach in summer.'],
      ['Viajé a México en avión.', 'I travelled to Mexico by plane.'],
      ['Este regalo es para ti.', 'This present is for you.'],
    ],
    grammar: `
## Transport uses en
*en coche, en tren, en avión, en autobús* — but **a pie** (on foot).

## Por vs para (first steps)
**para** — goal, destination, recipient, deadline:
- *Este billete es **para** ti.* — for you
- *Salgo **para** Madrid.* — heading to Madrid
- *Estudio **para** aprender.* — in order to learn

**por** — cause, route, duration, exchange:
- *Paseo **por** la playa.* — along / through
- *Gracias **por** todo.* — for (because of)
- *Lo compré **por** 20 euros.* — in exchange for

**salir** is irregular in *yo*: **salgo**, sales, sale… · **volver** (o → ue): *vuelvo, vuelves…*
`,
    conj: { verbs: ['salir', 'volver', 'conducir', 'viajar'], tenses: ['presente', 'preterito'] },
  },
  {
    id: 'a2-05',
    title: 'When I was a child',
    titleEs: 'Cuando era niño',
    emoji: '🧸',
    description: 'The imperfect: habits and descriptions in the past.',
    words: [
      ['de niño', 'as a child'],
      ['antes', 'before / in the past'],
      ['la escuela', 'the school'],
      ['el pueblo', 'the village / small town'],
      ['el vecino', 'the neighbour'],
      ['el juguete', 'the toy'],
      ['el amigo', 'the friend'],
      ['el profesor', 'the teacher'],
      ['el verano', 'the summer'],
      ['el invierno', 'the winter'],
      ['recordar', 'to remember'],
      ['la bicicleta', 'the bicycle'],
      ['mientras', 'while'],
      ['normalmente', 'normally / usually'],
    ],
    sentences: [
      ['De niño vivía en un pueblo.', 'As a child I lived in a village.'],
      ['Todos los veranos íbamos a la playa.', 'Every summer we used to go to the beach.'],
      ['Mi abuela era muy simpática.', 'My grandmother was very nice.'],
      ['Mientras yo leía, mi hermano jugaba.', 'While I was reading, my brother was playing.'],
      ['Antes no me gustaba el pescado.', "Before, I didn't like fish."],
    ],
    grammar: `
## Imperfect (pretérito imperfecto)
For **habits**, **descriptions** and **background** in the past ("used to", "was …-ing").

| | hablar | comer / vivir |
| yo | hablaba | comía / vivía |
| tú | hablabas | comías / vivías |
| él/ella/usted | hablaba | comía / vivía |
| nosotros | hablábamos | comíamos / vivíamos |
| vosotros | hablabais | comíais / vivíais |
| ellos/ustedes | hablaban | comían / vivían |

Only three irregulars: **ser** (era), **ir** (iba), **ver** (veía).

## Imperfect or preterite?
- Imperfect = the scene: *Llovía y yo **leía** un libro…*
- Preterite = the event: *…cuando **sonó** el teléfono.*

Signal words: **siempre, normalmente, todos los días, de niño, mientras** → imperfect.
`,
    conj: { verbs: ['ser', 'ir', 'ver', 'jugar', 'vivir', 'tener'], tenses: ['imperfecto'] },
  },
  {
    id: 'a2-06',
    title: 'Experiences',
    titleEs: 'Las experiencias',
    emoji: '🌍',
    description: 'The present perfect: what you have (never) done.',
    words: [
      ['ya', 'already'],
      ['todavía no', 'not yet'],
      ['alguna vez', 'ever'],
      ['esta semana', 'this week'],
      ['últimamente', 'lately'],
      ['el mundo', 'the world'],
      ['el país', 'the country'],
      ['probar', 'to try / to taste', '¿Has probado la paella?', 'Have you tried paella?'],
      ['escribir', 'to write'],
      ['abrir', 'to open'],
      ['romper', 'to break'],
      ['la carta', 'the letter'],
      ['el plato', 'the dish / plate'],
      ['aprender', 'to learn'],
    ],
    sentences: [
      ['¿Has estado alguna vez en Argentina?', 'Have you ever been to Argentina?'],
      ['Todavía no he visto esa película.', "I haven't seen that film yet."],
      ['Ya hemos comido.', 'We have already eaten.'],
      ['Esta semana he trabajado mucho.', 'This week I have worked a lot.'],
      ['¿Quién ha abierto la ventana?', 'Who has opened the window?'],
    ],
    grammar: `
## Present perfect = haber + participle
| yo he | nosotros hemos |
| tú has | vosotros habéis |
| él/ella/usted ha | ellos/ustedes han |

Participle: **-ar → -ado** (hablado), **-er/-ir → -ido** (comido, vivido).

## Irregular participles
| hacer → hecho | decir → dicho |
| ver → visto | escribir → escrito |
| poner → puesto | volver → vuelto |
| abrir → abierto | romper → roto |

Used for experiences and time periods that are **not finished**: *hoy, esta semana, este año, alguna vez, nunca, ya, todavía no*.

Nothing goes between *haber* and the participle: *Ya lo **he hecho**.*
`,
    conj: { verbs: ['hacer', 'ver', 'escribir', 'decir', 'poner', 'volver', 'abrir', 'romper'], tenses: ['perfecto'] },
  },
]);
