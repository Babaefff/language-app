import { units } from './build';

export const A1C = units('A1', [
  {
    id: 'a1-16', title: 'Fruit & vegetables', titleEs: 'Frutas y verduras', emoji: '🥕',
    description: 'Shop for fruit and vegetables at the market.',
    words: [
      ['la naranja', 'the orange'], ['el plátano', 'the banana'], ['la fresa', 'the strawberry'],
      ['la uva', 'the grape'], ['la pera', 'the pear'], ['el limón', 'the lemon'],
      ['la sandía', 'the watermelon'], ['el melocotón', 'the peach'], ['la piña', 'the pineapple'],
      ['la verdura', 'the vegetable(s)', 'Como mucha verdura.', 'I eat a lot of vegetables.'],
      ['la zanahoria', 'the carrot'], ['la lechuga', 'the lettuce'], ['el pimiento', 'the pepper'],
      ['el pepino', 'the cucumber'], ['las judías verdes', 'the green beans'], ['el kilo', 'the kilo'],
      ['maduro', 'ripe'], ['fresco', 'fresh'], ['el mercado', 'the market'],
    ],
    sentences: [
      ['Quiero un kilo de naranjas, por favor.', 'I want a kilo of oranges, please.'],
      ['Las fresas están muy maduras.', 'The strawberries are very ripe.'],
      ['¿A cuánto está el kilo de tomates?', 'How much is a kilo of tomatoes?'],
      ['Compro la fruta en el mercado.', 'I buy fruit at the market.'],
    ],
    grammar: `
## Quantities with de
**un kilo de** manzanas · **medio kilo de** uvas · **una docena de** huevos · **un poco de** sal

## Asking prices at the market
- **¿A cuánto está(n)…?** — How much are… (today)? Used for prices that change.
- **¿Algo más?** — Anything else? · **Nada más, gracias.** — Nothing else, thanks.
`,
  },
  {
    id: 'a1-17', title: 'In the classroom', titleEs: 'En clase', emoji: '✏️',
    description: 'Classroom objects and phrases for learning.',
    words: [
      ['la clase', 'the class / classroom'], ['el cuaderno', 'the notebook'], ['el bolígrafo', 'the pen'],
      ['el lápiz', 'the pencil'], ['la goma', 'the eraser'], ['la mochila', 'the backpack'],
      ['la pizarra', 'the board'], ['el diccionario', 'the dictionary'], ['la página', 'the page'],
      ['la palabra', 'the word', '¿Qué significa esta palabra?', 'What does this word mean?'],
      ['la frase', 'the sentence'], ['la pregunta', 'the question'], ['la respuesta', 'the answer'],
      ['los deberes', 'the homework'], ['el alumno', 'the pupil'], ['repetir', 'to repeat'],
      ['significar', 'to mean'], ['deletrear', 'to spell'], ['fácil', 'easy'], ['difícil', 'difficult'],
    ],
    sentences: [
      ['¿Cómo se dice «book» en español?', 'How do you say "book" in Spanish?'],
      ['¿Puedes repetir, por favor?', 'Can you repeat, please?'],
      ['Abrid el libro en la página diez.', 'Open your books at page ten.'],
      ['Esta pregunta es muy difícil.', 'This question is very difficult.'],
    ],
    grammar: `
## Survival phrases
- **¿Cómo se dice … en español?** — How do you say … in Spanish?
- **¿Qué significa …?** — What does … mean?
- **¿Cómo se escribe?** — How do you spell it?
- **Más despacio, por favor.** — More slowly, please.
- **No lo sé.** — I don't know.

Teachers often use **vosotros** commands with the class: *abrid, escuchad, repetid*.
`,
    conj: { verbs: ['repetir', 'escribir', 'leer', 'entender'], tenses: ['presente'] },
  },
]);

export const A2C = units('A2', [
  {
    id: 'a2-12', title: 'Sports & hobbies', titleEs: 'Deportes y aficiones', emoji: '🎸',
    description: 'Talk about sports, instruments and free-time activities.',
    words: [
      ['el baloncesto', 'basketball'], ['el tenis', 'tennis'], ['el ciclismo', 'cycling'],
      ['la natación', 'swimming'], ['el equipo', 'the team'], ['el partido', 'the match / game'],
      ['el jugador', 'the player'], ['ganar un partido', 'to win a match'], ['perder', 'to lose'],
      ['el entrenamiento', 'the training'], ['la guitarra', 'the guitar'], ['el piano', 'the piano'],
      ['tocar', 'to play (an instrument) / to touch', 'Toco la guitarra.', 'I play the guitar.'],
      ['pintar', 'to paint'], ['dibujar', 'to draw'], ['la afición', 'the hobby'],
      ['el concierto', 'the concert'], ['el videojuego', 'the video game'], ['pasear', 'to go for a walk'],
    ],
    sentences: [
      ['Juego al baloncesto dos veces por semana.', 'I play basketball twice a week.'],
      ['Mi hermana toca el piano muy bien.', 'My sister plays the piano very well.'],
      ['Nuestro equipo perdió el partido.', 'Our team lost the match.'],
      ['Los domingos paseo por el parque.', 'On Sundays I go for a walk in the park.'],
    ],
    grammar: `
## Jugar or tocar?
- **jugar a** + game / sport: *Juego **al** fútbol, **al** tenis, **a las** cartas.*
- **tocar** + instrument: *Toco **la** guitarra.*
- **hacer** + some sports: *hacer ciclismo, hacer natación, hacer yoga*

## How often
*una vez / dos veces por semana* · *todos los días* · *los fines de semana* · *casi nunca*
`,
    conj: { verbs: ['jugar', 'perder', 'ganar'], tenses: ['presente', 'preterito'] },
  },
  {
    id: 'a2-13', title: 'Getting around town', titleEs: 'Moverse por la ciudad', emoji: '🚇',
    description: 'Public transport, tickets and directions.',
    words: [
      ['el metro', 'the underground / subway'], ['la parada', 'the stop'], ['la línea', 'the line'],
      ['el andén', 'the platform'], ['el taxi', 'the taxi'], ['el semáforo', 'the traffic light'],
      ['la esquina', 'the corner'], ['el cruce', 'the crossroads'], ['el puente', 'the bridge'],
      ['la avenida', 'the avenue'], ['el barrio', 'the neighbourhood'], ['el centro', 'the centre'],
      ['cruzar', 'to cross'], ['girar', 'to turn'], ['seguir recto', 'to go straight on'],
      ['bajarse', 'to get off', 'Me bajo en la próxima parada.', 'I get off at the next stop.'],
      ['subirse', 'to get on'], ['el mapa', 'the map'], ['perderse', 'to get lost'],
    ],
    sentences: [
      ['¿Qué línea va al centro?', 'Which line goes to the centre?'],
      ['Gira a la izquierda en el semáforo.', 'Turn left at the traffic light.'],
      ['Cruza el puente y sigue recto.', 'Cross the bridge and go straight on.'],
      ['Me he perdido, ¿me puede ayudar?', "I'm lost, can you help me?"],
    ],
    grammar: `
## Giving directions (tú commands)
*Sigue recto · Gira a la derecha · Cruza la calle · Toma la segunda a la izquierda*

Formal (**usted**): *Siga · Gire · Cruce · Tome*

## Prepositions of movement
- **en** + transport: *en metro, en taxi*
- **hasta** = as far as: *Sigue **hasta** la plaza.*
- **por** = through / along: *Ve **por** esta calle.*
`,
    conj: { verbs: ['cruzar', 'girar', 'seguir'], tenses: ['imperativo'] },
  },
]);

export const B1C = units('B1', [
  {
    id: 'b1-12', title: 'Culture & the arts', titleEs: 'La cultura y el arte', emoji: '🎭',
    description: 'Theatre, exhibitions, books and giving your opinion.',
    words: [
      ['el teatro', 'the theatre'], ['la obra', 'the play / the work (of art)'], ['la exposición', 'the exhibition'],
      ['el cuadro', 'the painting'], ['el pintor', 'the painter'], ['el escritor', 'the writer'],
      ['la novela', 'the novel'], ['el poema', 'the poem'], ['el personaje', 'the character'],
      ['la trama', 'the plot'], ['el final', 'the ending'], ['el público', 'the audience'],
      ['la entrada', 'the ticket / the entrance', 'Ya he comprado las entradas.', "I've already bought the tickets."],
      ['la crítica', 'the review / criticism'], ['emocionante', 'exciting / moving'], ['aburrido', 'boring / bored'],
      ['recomendable', 'worth it / recommended'], ['estrenar', 'to premiere'], ['valer la pena', 'to be worth it'],
    ],
    sentences: [
      ['La novela tiene un final muy emocionante.', 'The novel has a very moving ending.'],
      ['Merece la pena ver esa exposición.', "That exhibition is worth seeing."],
      ['El personaje principal me pareció aburrido.', 'I found the main character boring.'],
      ['La obra se estrena el próximo viernes.', 'The play premieres next Friday.'],
    ],
    grammar: `
## Giving your opinion about a work
- **Me pareció** + adj.: *Me pareció genial / aburrida.* (parecer works like *gustar*)
- **Vale / merece la pena** + inf.: *Vale la pena leerla.*
- **Lo que más me gustó fue…** — What I liked most was…
- **Te la recomiendo.** — I recommend it to you.

## Aburrido with ser / estar
*La película **es** aburrida* (boring) · *Yo **estoy** aburrido* (bored)
`,
    conj: { verbs: ['parecer', 'recomendar'], tenses: ['preterito'] },
  },
  {
    id: 'b1-13', title: 'Travel problems', titleEs: 'Problemas de viaje', emoji: '🧳',
    description: 'Delays, lost luggage and solving problems politely.',
    words: [
      ['el vuelo', 'the flight'], ['el retraso', 'the delay'], ['cancelado', 'cancelled'],
      ['la puerta de embarque', 'the boarding gate'], ['la tarjeta de embarque', 'the boarding pass'],
      ['el equipaje', 'the luggage'], ['perder el vuelo', 'to miss the flight'], ['la reclamación', 'the claim / complaint'],
      ['la aduana', 'customs'], ['el control de seguridad', 'the security check'], ['la recepción', 'the reception'],
      ['la reserva', 'the booking'], ['el seguro de viaje', 'the travel insurance'], ['la avería', 'the breakdown'],
      ['robar', 'to steal', 'Me han robado la cartera.', 'My wallet has been stolen.'], ['la cartera', 'the wallet'],
      ['la comisaría', 'the police station'], ['la embajada', 'the embassy'], ['urgente', 'urgent'],
    ],
    sentences: [
      ['El vuelo tiene dos horas de retraso.', 'The flight is delayed by two hours.'],
      ['Han perdido mi equipaje.', 'They have lost my luggage.'],
      ['Quería poner una reclamación.', 'I would like to make a complaint.'],
      ['Si hubiera salido antes, no habría perdido el vuelo.', "If I had left earlier, I wouldn't have missed the flight."],
    ],
    grammar: `
## Impersonal "they": han + participle
To say something was done without saying who: *Me **han robado** la cartera. **Han cancelado** el vuelo.*

## Hoping it gets solved (subjunctive)
- *Espero que **encuentren** mi maleta.*
- *Es urgente que me **llamen**.*

## Looking back (advanced)
*Si **hubiera salido** antes, no **habría perdido** el vuelo.* — pluperfect subjunctive + conditional perfect, for regrets about the past. Just learn it as a phrase for now.
`,
    conj: { verbs: ['perder', 'robar', 'cancelar'], tenses: ['perfecto'] },
  },
]);
