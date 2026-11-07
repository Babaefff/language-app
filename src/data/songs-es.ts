import type { Reading } from './types';

// Traditional songs and public-domain poems set to music.
export const SONGS_ES: Reading[] = [
  {
    id: 's-pollitos', song: true, level: 'A1', title: 'Los pollitos dicen',
    source: 'Traditional children’s song (public domain)',
    paragraphs: [
      'Los pollitos dicen\npío, pío, pío,\ncuando tienen hambre,\ncuando tienen frío.',
      'La gallina busca\nel maíz y el trigo,\nles da la comida\ny les presta abrigo.',
      'Bajo sus dos alas,\nacurrucaditos,\nduermen los pollitos\nhasta el otro día.',
    ],
    translation: [
      "The little chicks say\ncheep, cheep, cheep,\nwhen they are hungry,\nwhen they are cold.",
      "The hen looks for\ncorn and wheat,\nshe gives them food\nand keeps them warm.",
      "Under her two wings,\nsnuggled up,\nthe little chicks sleep\nuntil the next day.",
    ],
    glossary: { pollitos: 'little chicks', pío: 'cheep', gallina: 'hen', maíz: 'corn / maize', trigo: 'wheat', presta: 'lends / gives (prestar)', abrigo: 'shelter, warmth (also: coat)', alas: 'wings', acurrucaditos: 'snuggled up', otro: 'el otro día: here, the next day' },
    questions: [
      { q: '¿Cuándo dicen «pío» los pollitos?', options: ['Cuando juegan', 'Cuando tienen hambre o frío', 'Cuando duermen'], answer: 1 },
      { q: '¿Qué busca la gallina?', options: ['El maíz y el trigo', 'Agua', 'Flores'], answer: 0 },
      { q: '¿Dónde duermen los pollitos?', options: ['En un árbol', 'En una caja', 'Bajo las alas de la gallina'], answer: 2 },
    ],
  },
  {
    id: 's-arroz', song: true, level: 'A1', title: 'Arroz con leche',
    source: 'Traditional children’s song (public domain)',
    paragraphs: [
      'Arroz con leche,\nme quiero casar\ncon una señorita\nde San Nicolás,',
      'que sepa coser,\nque sepa bordar,\nque sepa abrir la puerta\npara ir a jugar.',
      'Con esta sí,\ncon esta no,\ncon esta señorita\nme caso yo.',
    ],
    translation: [
      "Rice pudding,\nI want to marry\na young lady\nfrom San Nicolás,",
      "who knows how to sew,\nwho knows how to embroider,\nwho knows how to open the door\nto go out and play.",
      "With this one yes,\nwith this one no,\nthis young lady\nis the one I’ll marry.",
    ],
    glossary: { arroz: 'rice (arroz con leche: rice pudding)', casar: 'to marry (casarse)', señorita: 'young lady', sepa: 'knows how to (subjunctive of saber)', coser: 'to sew', bordar: 'to embroider', caso: 'me caso: I get married' },
    questions: [
      { q: '¿Qué quiere hacer el cantante?', options: ['Viajar', 'Cocinar', 'Casarse'], answer: 2 },
      { q: '¿De dónde es la señorita?', options: ['De San Nicolás', 'De Madrid', 'De México'], answer: 0 },
      { q: '¿Para qué abre la puerta?', options: ['Para comer', 'Para ir a jugar', 'Para dormir'], answer: 1 },
    ],
  },
  {
    id: 's-cielito', song: true, level: 'A2', title: 'Cielito lindo',
    source: 'Quirino Mendoza y Cortés (1882), Mexico — public domain',
    paragraphs: [
      "De la Sierra Morena,\ncielito lindo, vienen bajando\nun par de ojitos negros,\ncielito lindo, de contrabando.",
      "¡Ay, ay, ay, ay!\nCanta y no llores,\nporque cantando se alegran,\ncielito lindo, los corazones.",
      "Ese lunar que tienes,\ncielito lindo, junto a la boca,\nno se lo des a nadie,\ncielito lindo, que a mí me toca.",
      "¡Ay, ay, ay, ay!\nCanta y no llores,\nporque cantando se alegran,\ncielito lindo, los corazones.",
      "Pájaro que abandona,\ncielito lindo, su primer nido,\nsi lo encuentra ocupado,\ncielito lindo, muy merecido.",
      "¡Ay, ay, ay, ay!\nCanta y no llores,\nporque cantando se alegran,\ncielito lindo, los corazones.",
    ],
    translation: [
      "From the Sierra Morena,\nmy sweetheart, coming down\nare a pair of dark eyes,\nmy sweetheart, smuggled in.",
      "Ay, ay, ay, ay!\nSing and don’t cry,\nbecause by singing,\nmy sweetheart, hearts become happy.",
      "That beauty mark you have,\nmy sweetheart, next to your mouth,\ndon’t give it to anyone,\nmy sweetheart, because it belongs to me.",
      "Ay, ay, ay, ay!\nSing and don’t cry,\nbecause by singing,\nmy sweetheart, hearts become happy.",
      "A bird that leaves,\nmy sweetheart, its first nest,\nif it finds it taken,\nmy sweetheart, it deserves it.",
      "Ay, ay, ay, ay!\nSing and don’t cry,\nbecause by singing,\nmy sweetheart, hearts become happy.",
    ],
    glossary: { cielito: 'little sky — here: sweetheart', lindo: 'lovely / pretty', sierra: 'mountain range', morena: 'Sierra Morena: mountains in Spain', bajando: 'coming down (bajar)', par: 'pair', ojitos: 'little eyes', contrabando: 'de contrabando: smuggled', llores: 'no llores: don’t cry (llorar)', cantando: 'singing', alegran: 'become happy (alegrarse)', corazones: 'hearts', lunar: 'beauty mark / mole', junto: 'junto a: next to', des: 'no se lo des: don’t give it (dar)', toca: 'is mine / my turn (tocar)', "pájaro": "bird", "abandona": "leaves, abandons (abandonar)", "primer": "first", "nido": "nest", "encuentra": "finds (encontrar)", "ocupado": "occupied, taken", "merecido": "deserved" },
    questions: [
      { q: '¿Qué vienen bajando de la Sierra Morena?', options: ['Unos caballos', 'Un par de ojitos negros', 'Unos amigos'], answer: 1 },
      { q: '¿Qué dice la canción que hagamos?', options: ['Cantar y no llorar', 'Llorar', 'Dormir'], answer: 0 },
      { q: '¿Dónde está el lunar?', options: ['En la mano', 'En la frente', 'Junto a la boca'], answer: 2 },
    ],
  },
  {
    id: 's-colores', song: true, level: 'A2', title: 'De colores',
    source: 'Traditional folk song (public domain)',
    paragraphs: [
      'De colores,\nde colores se visten los campos en la primavera.\nDe colores,\nde colores son los pajaritos que vienen de afuera.',
      'De colores,\nde colores es el arco iris que vemos lucir,\ny por eso los grandes amores\nde muchos colores me gustan a mí.',
      'Canta el gallo,\ncanta el gallo con el quiri, quiri, quiri, quiri, quiri.\nLa gallina,\nla gallina con el cara, cara, cara, cara, cara.\nLos polluelos,\nlos polluelos con el pío, pío, pío, pío, pí.',
    ],
    translation: [
      "In colours,\nin colours the fields dress in spring.\nIn colours,\nin colours are the little birds that come from far away.",
      "In colours,\nin colours is the rainbow we see shining,\nand that’s why great loves\nof many colours are the ones I like.",
      "The rooster sings,\nthe rooster sings with a quiri, quiri, quiri, quiri, quiri.\nThe hen,\nthe hen with a cara, cara, cara, cara, cara.\nThe chicks,\nthe chicks with a cheep, cheep, cheep, cheep, cheep.",
    ],
    glossary: { colores: 'colours', visten: 'dress (vestirse: to get dressed)', campos: 'fields', primavera: 'spring', pajaritos: 'little birds', afuera: 'outside / far away', arco: 'arco iris: rainbow', iris: 'arco iris: rainbow', lucir: 'to shine', amores: 'loves', gallo: 'rooster', gallina: 'hen', polluelos: 'chicks', quiri: '(rooster sound)', cara: '(hen sound)', pío: 'cheep' },
    questions: [
      { q: '¿Cuándo se visten de colores los campos?', options: ['En invierno', 'En la primavera', 'En otoño'], answer: 1 },
      { q: '¿Qué vemos lucir de colores?', options: ['El arco iris', 'El sol', 'La luna'], answer: 0 },
      { q: '¿Qué animal canta «quiri, quiri»?', options: ['La gallina', 'Los polluelos', 'El gallo'], answer: 2 },
    ],
  },
  {
    id: 's-mananitas', song: true, level: 'A2', title: 'Las mañanitas',
    youtube: '8fkjW8IKQWk',
    source: 'Traditional Mexican birthday song (public domain)',
    paragraphs: [
      "Estas son las mañanitas\nque cantaba el rey David;\nhoy por ser día de tu santo\nte las cantamos a ti.",
      "Despierta, mi bien, despierta,\nmira que ya amaneció;\nya los pajaritos cantan,\nla luna ya se metió.",
      "Qué linda está la mañana\nen que vengo a saludarte;\nvenimos todos con gusto\ny placer a felicitarte.",
      "El día en que tú naciste\nnacieron todas las flores;\nen la pila del bautizo\ncantaron los ruiseñores.",
      "Ya viene amaneciendo,\nya la luz del día nos dio;\nlevántate de mañana,\nmira que ya amaneció.",
      "Si yo pudiera bajarte\nlas estrellas y un lucero\npara poder demostrarte\nlo mucho que yo te quiero.",
      "Con jazmines y flores\neste día quiero adornar;\nhoy por ser día de tu santo\nte venimos a cantar.",
    ],
    translation: [
      "These are the morning songs\nthat King David used to sing;\ntoday, because it’s your saint’s day,\nwe sing them to you.",
      "Wake up, my dear, wake up,\nlook, the day has dawned;\nthe little birds are already singing,\nthe moon has already set.",
      "How lovely the morning is\nwhen I come to greet you;\nwe all come gladly\nand happily to congratulate you.",
      "On the day you were born\nall the flowers were born;\nat the baptismal font\nthe nightingales sang.",
      "The day is already dawning,\nthe daylight has already reached us;\nget up early,\nlook, the day has dawned.",
      "If I could bring down for you\nthe stars and a bright morning star\nto be able to show you\nhow much I love you.",
      "With jasmine and flowers\nI want to decorate this day;\ntoday, because it’s your saint’s day,\nwe come to sing to you.",
    ],
    glossary: { mañanitas: 'morning songs (a birthday serenade)', cantaba: 'used to sing (imperfect)', rey: 'king', santo: 'día de tu santo: your saint’s day / birthday', despierta: 'wake up! (despertar)', bien: 'mi bien: my dear', amaneció: 'day has dawned (amanecer)', metió: 'se metió: has set / gone in (meterse)', "naciste": "you were born (nacer)", "nacieron": "were born (nacer)", "flores": "flowers", "pila": "pila del bautismo: baptismal font", "bautismo": "baptism", "ruiseñores": "nightingales", "amaneciendo": "dawning (amanecer)", "luz": "light", "levántate": "get up! (levantarse)", "linda": "lovely", "saludarte": "to greet you (saludar)", "gusto": "con gusto: gladly", "placer": "pleasure", "felicitarte": "to congratulate you (felicitar)", "bautizo": "baptism (pila del bautizo: baptismal font)", "pudiera": "could (subjunctive of poder)", "bajarte": "to bring down for you (bajar)", "estrellas": "stars", "lucero": "bright star, morning star", "demostrarte": "to show you (demostrar)", "quiero": "I love / I want (querer)", "jazmines": "jasmine flowers", "adornar": "to decorate" },
    questions: [
      { q: '¿Quién cantaba las mañanitas?', options: ['El rey David', 'Un pajarito', 'La luna'], answer: 0 },
      { q: '¿Cuándo se canta esta canción?', options: ['En Navidad', 'Por la noche', 'En el cumpleaños o el día del santo'], answer: 2 },
      { q: '¿Qué hacen los pajaritos?', options: ['Duermen', 'Cantan', 'Comen'], answer: 1 },
    ],
  },
  {
    id: 's-guantanamera', song: true, level: 'B1', title: 'Versos sencillos (Guantanamera)',
    source: 'José Martí, Versos sencillos (1891) — public domain; sung to the tune of “Guantanamera”',
    paragraphs: [
      'Yo soy un hombre sincero\nde donde crece la palma,\ny antes de morirme quiero\nechar mis versos del alma.',
      'Mi verso es de un verde claro\ny de un carmín encendido;\nmi verso es un ciervo herido\nque busca en el monte amparo.',
      'Con los pobres de la tierra\nquiero yo mi suerte echar;\nel arroyo de la sierra\nme complace más que el mar.',
    ],
    translation: [
      "I am a sincere man\nfrom where the palm tree grows,\nand before I die I want\nto pour out the verses of my soul.",
      "My verse is a light green\nand a fiery crimson;\nmy verse is a wounded deer\nthat seeks shelter in the hills.",
      "With the poor of the earth\nI want to share my fate;\nthe mountain stream\npleases me more than the sea.",
    ],
    glossary: { sincero: 'sincere / honest', crece: 'grows (crecer)', palma: 'palm tree', morirme: 'antes de morirme: before I die', echar: 'to throw / pour out; echar la suerte: to share one’s fate', versos: 'verses', alma: 'soul', claro: 'light (colour)', carmín: 'crimson', encendido: 'bright / burning', ciervo: 'deer', herido: 'wounded', monte: 'hills / woodland', amparo: 'shelter / protection', pobres: 'the poor', suerte: 'fate / luck', arroyo: 'stream', sierra: 'mountains', complace: 'pleases (complacer)' },
    questions: [
      { q: '¿De dónde es el poeta?', options: ['Del mar', 'De donde crece la palma', 'De la ciudad'], answer: 1 },
      { q: '¿Con qué compara su verso?', options: ['Con un ciervo herido', 'Con un pájaro', 'Con una flor'], answer: 0 },
      { q: '¿Qué le gusta más que el mar?', options: ['La ciudad', 'El desierto', 'El arroyo de la sierra'], answer: 2 },
    ],
  },
];
