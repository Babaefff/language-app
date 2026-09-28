import { units } from './build';

export const A2B = units('A2', [
  {
    id: 'a2-07',
    title: 'At the restaurant',
    titleEs: 'En el restaurante',
    emoji: '🍽️',
    description: 'Book a table, order, and ask for the bill.',
    words: [
      ['la tarjeta', 'the (bank) card'],
      ['el menú del día', 'the set menu of the day'],
      ['el primer plato', 'the starter / first course'],
      ['el segundo plato', 'the main course'],
      ['el postre', 'the dessert', '¿Qué hay de postre?', "What's for dessert?"],
      ['la bebida', 'the drink'],
      ['la cuenta', 'the bill / the check', 'La cuenta, por favor.', 'The bill, please.'],
      ['la propina', 'the tip'],
      ['la mesa para dos', 'the table for two'],
      ['el vaso', 'the glass (for water)'],
      ['la copa', 'the (wine) glass'],
      ['el tenedor', 'the fork'],
      ['el cuchillo', 'the knife'],
      ['la cuchara', 'the spoon'],
      ['la servilleta', 'the napkin'],
      ['la sopa', 'the soup'],
      ['la ensalada', 'the salad'],
      ['el pollo', 'the chicken'],
      ['el helado', 'the ice cream'],
      ['servir', 'to serve'],
    ],
    sentences: [
      ['Quería una mesa para dos, por favor.', 'I would like a table for two, please.'],
      ['De primero voy a tomar la sopa.', "For the first course I'll have the soup."],
      ['¿Me trae otro tenedor, por favor?', 'Could you bring me another fork, please?'],
      ['La comida estaba buenísima.', 'The food was really good.'],
      ['¿Se puede pagar con tarjeta?', 'Can you pay by card?'],
    ],
    grammar: `
## Polite ordering
- **Quería…** / **Querría…** — I'd like… (softer than *quiero*)
- **Para mí, …** — For me, …
- **De primero / de segundo / de postre, …** — For the first course / main / dessert, …
- **¿Me trae…?** — Could you bring me…? (*traer*, usted form)

## Tú vs usted
In restaurants and shops, staff often use **usted** (formal "you"). It uses the *él/ella* verb form:
*¿Qué **quiere** usted?* · *¿**Tiene** mesa?*

**servir** is an e → i verb: *¿Qué le **sirvo**?* (What can I get you?)
`,
    conj: { verbs: ['servir', 'pedir', 'traer', 'querer', 'pagar'], tenses: ['presente'] },
  },
  {
    id: 'a2-08',
    title: 'Around the house',
    titleEs: 'Las tareas de casa',
    emoji: '🧹',
    description: 'Chores, household objects and who does what.',
    words: [
      ['limpiar', 'to clean'],
      ['lavar', 'to wash'],
      ['fregar los platos', 'to do the washing-up'],
      ['hacer la cama', 'to make the bed'],
      ['poner la lavadora', 'to put the washing machine on'],
      ['sacar la basura', 'to take out the rubbish'],
      ['planchar', 'to iron'],
      ['la lavadora', 'the washing machine'],
      ['la nevera', 'the fridge'],
      ['el armario', 'the wardrobe / cupboard'],
      ['la lámpara', 'the lamp'],
      ['la llave', 'the key', '¿Dónde están las llaves?', 'Where are the keys?'],
      ['el jardín', 'the garden'],
      ['la escalera', 'the stairs'],
      ['el suelo', 'the floor'],
      ['la pared', 'the wall'],
      ['sucio', 'dirty'],
      ['limpio', 'clean'],
      ['ordenado', 'tidy'],
    ],
    sentences: [
      ['Hoy me toca fregar los platos.', "Today it's my turn to do the washing-up."],
      ['Mi hermano nunca hace la cama.', 'My brother never makes his bed.'],
      ['La cocina está muy sucia.', 'The kitchen is very dirty.'],
      ['He puesto la lavadora.', "I've put the washing machine on."],
      ['Las llaves están encima de la nevera.', 'The keys are on top of the fridge.'],
    ],
    grammar: `
## Whose turn is it? Tocar
**tocar** works like *gustar*: *Hoy **me toca** a mí.* (It's my turn.) · *¿**A quién le toca** cocinar?*

## Tener que / hay que
- **tener que** + inf. — someone has to: *Tengo que limpiar mi habitación.*
- **hay que** + inf. — it is necessary (in general): *Hay que sacar la basura.*

## Adjectives with estar
States of things use **estar**: *La casa **está** limpia. El suelo **está** sucio.*
`,
    conj: { verbs: ['limpiar', 'lavar', 'hacer', 'poner', 'tener'], tenses: ['presente', 'perfecto'] },
  },
  {
    id: 'a2-09',
    title: 'Animals & nature',
    titleEs: 'Los animales y la naturaleza',
    emoji: '🌳',
    description: 'Animals, the countryside and the landscape.',
    words: [
      ['el animal', 'the animal'],
      ['el pájaro', 'the bird'],
      ['el caballo', 'the horse'],
      ['la vaca', 'the cow'],
      ['el cerdo', 'the pig'],
      ['la oveja', 'the sheep'],
      ['el pez', 'the fish (live)', 'Los peces viven en el agua.', 'Fish live in the water.'],
      ['el ratón', 'the mouse'],
      ['el árbol', 'the tree'],
      ['la flor', 'the flower'],
      ['el río', 'the river'],
      ['el lago', 'the lake'],
      ['el bosque', 'the forest'],
      ['el campo', 'the countryside / the field'],
      ['la isla', 'the island'],
      ['el cielo', 'the sky'],
      ['la luna', 'the moon'],
      ['el sol', 'the sun'],
      ['la estrella', 'the star'],
    ],
    sentences: [
      ['Mis abuelos tienen una granja con vacas y caballos.', 'My grandparents have a farm with cows and horses.'],
      ['Esta noche hay muchas estrellas en el cielo.', 'Tonight there are lots of stars in the sky.'],
      ['Nos bañamos en el río.', 'We swam in the river.'],
      ['Me gusta pasear por el bosque.', 'I like walking in the forest.'],
      ['El pájaro está en el árbol.', 'The bird is in the tree.'],
    ],
    grammar: `
## Pez or pescado?
- **el pez** — a live fish (plural **los peces**)
- **el pescado** — fish as food

## Plurals of words ending in -z
**z → ces**: *el pez → los peces*, *la luz → las luces*, *la vez → las veces*

## Describing a place with hay
*En mi pueblo **hay** un río y un bosque.* — **hay** for what exists; **está** for where a known thing is: *El río **está** cerca.*
`,
  },
  {
    id: 'a2-10',
    title: 'Phones & technology',
    titleEs: 'La tecnología',
    emoji: '📱',
    description: 'Phones, computers, messages and the internet.',
    words: [
      ['el móvil', 'the mobile phone'],
      ['el ordenador', 'the computer (Spain)'],
      ['la computadora', 'the computer (Latin America)'],
      ['la pantalla', 'the screen'],
      ['el teclado', 'the keyboard'],
      ['el mensaje', 'the message', 'Te mando un mensaje luego.', "I'll send you a message later."],
      ['el correo electrónico', 'the email'],
      ['la contraseña', 'the password'],
      ['la aplicación', 'the app'],
      ['la red social', 'the social network'],
      ['la página web', 'the website'],
      ['la batería', 'the battery'],
      ['el cargador', 'the charger'],
      ['descargar', 'to download'],
      ['subir', 'to upload / to go up'],
      ['compartir', 'to share'],
      ['enviar', 'to send'],
      ['conectarse', 'to connect / to go online'],
      ['el enlace', 'the link'],
    ],
    sentences: [
      ['Me he quedado sin batería.', 'My battery has died.'],
      ['¿Cuál es la contraseña del wifi?', 'What is the wifi password?'],
      ['He olvidado mi contraseña.', 'I have forgotten my password.'],
      ['Subí las fotos a las redes sociales.', 'I uploaded the photos to social media.'],
      ['¿Me envías el enlace por correo?', 'Can you send me the link by email?'],
    ],
    grammar: `
## Words that differ between Spain and Latin America
| Spain | Latin America | |
| el móvil | el celular | mobile phone |
| el ordenador | la computadora | computer |
| el coche | el carro / el auto | car |
| conducir | manejar | to drive |

## Quedarse sin
**quedarse sin** + noun = to run out of: *Me he quedado sin batería / sin dinero.*

**enviar** has a written accent in the boot forms: *envío, envías, envía, enviamos, enviáis, envían*.
`,
    conj: { verbs: ['descargar', 'subir', 'compartir', 'olvidar', 'cambiar'], tenses: ['presente', 'preterito', 'perfecto'] },
  },
  {
    id: 'a2-11',
    title: 'Personality & looks',
    titleEs: 'El carácter y el físico',
    emoji: '🧑',
    description: 'Describe what people look like and what they are like.',
    words: [
      ['inteligente', 'intelligent'],
      ['trabajador', 'hard-working'],
      ['perezoso', 'lazy'],
      ['tímido', 'shy'],
      ['divertido', 'fun / funny'],
      ['serio', 'serious'],
      ['amable', 'kind'],
      ['generoso', 'generous'],
      ['antipático', 'unfriendly'],
      ['educado', 'polite'],
      ['rubio', 'blond'],
      ['moreno', 'dark-haired / tanned'],
      ['pelirrojo', 'red-haired'],
      ['delgado', 'slim'],
      ['gordo', 'fat'],
      ['joven', 'young'],
      ['mayor', 'older / elderly'],
      ['el pelo', 'the hair', 'Tiene el pelo largo y rizado.', 'She has long curly hair.'],
      ['los ojos', 'the eyes'],
      ['la barba', 'the beard'],
    ],
    sentences: [
      ['Mi hermano es alto, moreno y muy divertido.', 'My brother is tall, dark-haired and very funny.'],
      ['Tiene los ojos azules.', 'He has blue eyes.'],
      ['Mi jefa es seria pero muy amable.', 'My boss is serious but very kind.'],
      ['¿Cómo es tu novio?', 'What is your boyfriend like?'],
      ['De pequeña era muy tímida.', 'As a little girl I was very shy.'],
    ],
    grammar: `
## ¿Cómo es? vs ¿Cómo está?
- **¿Cómo es?** — What is he/she like? (appearance, personality → *ser*)
- **¿Cómo está?** — How is he/she? (mood, health → *estar*)

## Tener for features
*Tiene **el** pelo corto.* · *Tiene **los** ojos verdes.* · *Tiene barba.* — Spanish uses **tener** + article for body features.

## Softening
- **un poco** + negative adjective: *Es un poco tímido.*
- **bastante** = quite: *Es bastante alto.*
- **nada** = not at all: *No es nada perezoso.*
`,
  },
]);
