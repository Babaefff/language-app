import type { GrammarLesson } from './types';

export const GRAMMAR: GrammarLesson[] = [
  // ─── A1 ────────────────────────────────────────────────────────────────────
  {
    id: 'g-stem-ending',
    level: 'A1',
    title: 'How Spanish verbs work',
    titleEs: 'Raíz + terminación',
    summary: 'Every verb form is a stem plus an ending. Learn the three verb families.',
    blocks: [
      { t: 'text', md: `
## Stem + ending
Every Spanish verb in the dictionary ends in **-ar**, **-er** or **-ir**. Cut that off and you have the **stem**: *habl-ar*, *com-er*, *viv-ir*.

To say who is doing the action, you add an **ending** to the stem. The ending carries the person, so Spanish usually drops *yo, tú, él*: **hablo** already means "I speak".` },
      { t: 'table', verbs: ['hablar', 'comer', 'vivir'], tense: 'presente', caption: 'Present tense of the three families' },
      { t: 'text', md: `
## What to notice
- **-ar** verbs use the vowel **a**: habl**as**, habl**a**, habl**an**.
- **-er** and **-ir** verbs use **e**: com**es**, viv**es**, com**en**, viv**en**.
- **-er** and **-ir** only differ in *nosotros* and *vosotros*: com**emos** / viv**imos**, com**éis** / viv**ís**.
- **yo** always ends in **-o**, whatever the family.` },
      { t: 'tip', md: '**Learn one verb per family and you know thousands.** About 90% of Spanish verbs are regular -ar verbs like *hablar*.' },
      { t: 'examples', items: [
        ['Hablo español.', 'I speak Spanish.'],
        ['¿Comes carne?', 'Do you eat meat?'],
        ['Vivimos en Madrid.', 'We live in Madrid.'],
        ['Ellos trabajan mucho.', 'They work a lot.'],
      ] },
      { t: 'mistakes', items: [["Yo hablar español.", "Yo hablo español.", "Always conjugate: the infinitive (hablar) is only the dictionary form."], ["Nosotros vivemos aquí.", "Nosotros vivimos aquí.", "-ir verbs use -imos, not -emos."]] },
    ],
    practice: {
      conj: { verbs: ['hablar', 'comer', 'vivir', 'trabajar', 'beber', 'escribir', 'estudiar', 'aprender'], tenses: ['presente'], count: 10 },
      choice: [
        { q: 'Nosotros ___ en Sevilla.', options: ['vivimos', 'vivemos', 'vivamos'], answer: 0, en: 'We live in Seville.' },
        { q: 'Tú ___ muy bien.', options: ['hablas', 'hables', 'habla'], answer: 0, en: 'You speak very well.' },
      ],
    },
  },
  {
    id: 'g-person-code',
    level: 'A1',
    title: 'The person code',
    titleEs: 'Las terminaciones de persona',
    summary: 'The last letters tell you who: -s is "you", -mos is "we", -n is "they" — in every tense.',
    blocks: [
      { t: 'text', md: `
## The same signals in (almost) every tense
Once you know these final letters, you can recognise the person in any tense, even ones you haven't studied yet:

| tú | ends in **-s** | hablas, hablabas, hablarás |
| nosotros | ends in **-mos** | hablamos, hablábamos, hablaremos |
| vosotros | ends in **-is** | habláis, hablabais, hablaréis |
| ellos / ustedes | ends in **-n** | hablan, hablaban, hablarán |
| él / ella / usted | no extra letter | habla, hablaba, hablará |

The only exception: the preterite *tú* form (**hablaste**) has no final -s.` },
      { t: 'table', verbs: ['hablar'], tense: 'imperfecto', caption: 'Imperfect: same person signals' },
      { t: 'table', verbs: ['hablar'], tense: 'futuro', caption: 'Future: same person signals' },
      { t: 'tip', md: "**Reading tip:** when you meet a new verb form, look at the end first. *-mos* means \"we\", even if you don't know the tense yet." },
    ],
    practice: {
      choice: [
        { q: '"Comeremos" means…', options: ['we will eat', 'they will eat', 'you will eat'], answer: 0 },
        { q: '"Viajaban" means…', options: ['they travelled / used to travel', 'we travelled', 'I travelled'], answer: 0 },
        { q: '"Estudias" means…', options: ['you study', 'he studies', 'we study'], answer: 0 },
        { q: '"Trabajábamos" means…', options: ['we used to work', 'they used to work', 'you used to work'], answer: 0 },
        { q: '"Cantará" means…', options: ['he / she will sing', 'I sing', 'they will sing'], answer: 0 },
        { q: '"Bailan" means…', options: ['they dance', 'you dance', 'we dance'], answer: 0 },
      ],
    },
  },
  {
    id: 'g-boot',
    level: 'A1',
    title: 'Boot verbs (stem changers)',
    titleEs: 'Verbos con cambio de raíz',
    summary: 'e → ie, o → ue, e → i — the change happens in four persons that form a "boot".',
    blocks: [
      { t: 'text', md: `
## The vowel in the stem changes when it is stressed
In some verbs the last vowel of the stem changes: *pensar* → **pienso**, *poder* → **puedo**, *pedir* → **pido**. The endings stay regular.

The change happens only where the stress falls on the stem: **yo, tú, él, ellos**. In **nosotros** and **vosotros** the stress moves to the ending, so the stem goes back to normal. Draw a line around the changed forms in the table and you get the shape of a **boot**.` },
      { t: 'table', verbs: ['pensar', 'poder'], tense: 'presente', caption: 'e → ie and o → ue: highlighted forms = the boot' },
      { t: 'table', verbs: ['pedir', 'jugar'], tense: 'presente', caption: 'e → i and u → ue: the same boot' },
      { t: 'text', md: `
## The four groups
| e → ie | pensar, querer, empezar, entender, preferir, tener*, venir* |
| o → ue | poder, dormir, volver, encontrar, costar, recordar |
| e → i | pedir, repetir, servir, seguir, decir* |
| u → ue | jugar (the only one) |

\\* *tener, venir, decir* also have an irregular **yo** form (tengo, vengo, digo) — see the next lesson.

Dictionaries often mark these verbs like this: *pensar (ie)*, *dormir (ue)*, *pedir (i)*.` },
      { t: 'tip', md: '**Nosotros is safe:** *pensamos, podemos, pedimos, jugamos* — never *piensamos*.' },
      { t: 'mistakes', items: [["Nosotros puedemos.", "Nosotros podemos.", "nosotros and vosotros never change the stem."], ["Yo jugo al fútbol.", "Yo juego al fútbol.", "jugar changes u → ue in the boot forms."]] },
    ],
    practice: {
      conj: { verbs: ['pensar', 'querer', 'poder', 'dormir', 'volver', 'pedir', 'jugar', 'empezar', 'entender', 'encontrar'], tenses: ['presente'], count: 10 },
      choice: [
        { q: 'Nosotros ___ ir al cine.', options: ['queremos', 'quieremos'], answer: 0, en: 'We want to go to the cinema.' },
        { q: 'Yo ___ ocho horas.', options: ['duermo', 'dormo'], answer: 0, en: 'I sleep eight hours.' },
      ],
    },
  },
  {
    id: 'g-yo-go',
    level: 'A1',
    title: 'Irregular "yo" forms',
    titleEs: 'Verbos irregulares en «yo»',
    summary: 'Tengo, hago, pongo, salgo… many verbs are only odd in the "I" form.',
    blocks: [
      { t: 'text', md: `
## Only "yo" is irregular
A big group of common verbs is completely regular — except the **yo** form of the present.

## The "-go" verbs
| tener → **tengo** | venir → **vengo** |
| hacer → **hago** | decir → **digo** |
| poner → **pongo** | traer → **traigo** |
| salir → **salgo** | oír → **oigo** |` },
      { t: 'table', verbs: ['hacer', 'poner', 'salir'], tense: 'presente' },
      { t: 'text', md: `
## The "-zco" verbs
Verbs ending in a vowel + **-cer / -cir** add a **z**: *conocer* → **conozco**, *conducir* → **conduzco**, *parecer* → **parezco**.

## Other small irregulars
- **ver** → veo · **dar** → doy · **saber** → sé
- **estar** → estoy · **ir** → voy · **ser** → soy

## Why it matters later
The present **subjunctive** is built on the *yo* form, so **tengo** gives **tenga**, **hago** gives **haga** (see the B1 lesson).` },
      { t: 'examples', items: [
        ['Hago los deberes por la tarde.', 'I do my homework in the afternoon.'],
        ['Salgo de casa a las ocho.', 'I leave home at eight.'],
        ['No conozco a tu hermano.', "I don't know your brother."],
        ['¿Pongo la mesa?', 'Shall I set the table?'],
      ] },
      { t: 'mistakes', items: [["Yo teno un perro.", "Yo tengo un perro.", "tener, poner, salir, venir… add -go in yo."], ["Yo sabo la respuesta.", "Yo sé la respuesta.", "saber is irregular: sé."]] },
    ],
    practice: {
      conj: { verbs: ['tener', 'hacer', 'poner', 'salir', 'decir', 'venir', 'traer', 'conocer', 'conducir', 'saber', 'dar', 'ver'], tenses: ['presente'], count: 12 },
    },
  },
  {
    id: 'g-ser-estar',
    level: 'A1',
    title: 'Ser or estar?',
    titleEs: '¿Ser o estar?',
    summary: 'Two verbs for "to be": what something is vs. how or where it is.',
    blocks: [
      { t: 'text', md: `
## Ser: what something IS
Use **ser** for things that define or identify:
- **D**escription: *Mi casa **es** grande.*
- **O**ccupation: *Ana **es** médica.*
- **C**haracteristics / personality: *Eres muy simpático.*
- **T**ime and dates: ***Son** las tres. Hoy **es** lunes.*
- **O**rigin: ***Soy** de México.*
- **R**elationships: *Luis **es** mi hermano.*

## Estar: how or where something is
- **P**osition / location: *El baño **está** a la derecha.*
- **L**ocation of events is the exception — that's *ser*: *La fiesta **es** en mi casa.*
- **A**ction in progress: ***Estoy** comiendo.*
- **C**ondition: *La sopa **está** fría.*
- **E**motion / mood: ***Estamos** cansados.*` },
      { t: 'tip', md: 'Remember **DOCTOR** for *ser* and **PLACE** for *estar*.' },
      { t: 'examples', title: 'Same adjective, different meaning', items: [
        ['Pedro es aburrido.', 'Pedro is boring (his personality).'],
        ['Pedro está aburrido.', 'Pedro is bored (right now).'],
        ['La manzana es verde.', 'The apple is green (its colour).'],
        ['La manzana está verde.', 'The apple is unripe.'],
        ['Es listo.', 'He is clever.'],
        ['Está listo.', 'He is ready.'],
      ] },
      { t: 'mistakes', items: [["Soy cansado.", "Estoy cansado.", "Moods and temporary states use estar."], ["Madrid es en España.", "Madrid está en España.", "Location uses estar (except events: la fiesta es en…)."], ["Estoy profesor.", "Soy profesor.", "Jobs use ser."]] },
    ],
    practice: {
      choice: [
        { q: 'Mi padre ___ profesor.', options: ['es', 'está'], answer: 0, en: 'My father is a teacher.' },
        { q: 'Madrid ___ en el centro de España.', options: ['es', 'está'], answer: 1, en: 'Madrid is in the centre of Spain.' },
        { q: 'Hoy ___ muy cansada.', options: ['soy', 'estoy'], answer: 1, en: 'Today I am very tired.' },
        { q: '___ las cinco de la tarde.', options: ['Son', 'Están'], answer: 0, en: 'It is five in the afternoon.' },
        { q: 'Nosotros ___ de Argentina.', options: ['somos', 'estamos'], answer: 0, en: 'We are from Argentina.' },
        { q: 'La sopa ___ fría.', options: ['es', 'está'], answer: 1, en: 'The soup is cold.' },
        { q: 'Mis amigos ___ muy simpáticos.', options: ['son', 'están'], answer: 0, en: 'My friends are very nice.' },
        { q: '¿Dónde ___ las llaves?', options: ['son', 'están'], answer: 1, en: 'Where are the keys?' },
        { q: 'La fiesta ___ en mi casa.', options: ['es', 'está'], answer: 0, en: 'The party is at my house.' },
        { q: 'Ahora ___ comiendo.', options: ['soy', 'estoy'], answer: 1, en: 'I am eating now.' },
      ],
    },
  },
  {
    id: 'g-gender',
    level: 'A1',
    title: 'Gender of nouns',
    titleEs: 'El género',
    summary: 'How to guess if a noun is masculine or feminine from its ending.',
    blocks: [
      { t: 'text', md: `
## Endings are strong clues
| usually masculine (el) | usually feminine (la) |
| **-o**: el libro, el perro | **-a**: la casa, la mesa |
| **-or**: el color, el amor | **-ción / -sión**: la canción, la televisión |
| **-aje**: el viaje, el garaje | **-dad / -tad**: la ciudad, la amistad |
| **-ma** (Greek): el problema, el idioma, el sistema | **-umbre**: la costumbre |
| days, months, colours, seas: el lunes, el rojo, el Atlántico | **-tud**: la salud, la juventud |

## Common exceptions to learn
- **la mano**, **la foto** (fotografía), **la moto** (motocicleta), **la radio**
- **el día**, **el mapa**, **el sofá**, **el planeta**
- **el agua**, **el hambre**: feminine, but use *el* in the singular because they start with a stressed *a*: *el agua fría*.` },
      { t: 'tip', md: '**Always learn a noun with its article:** not *casa* but *la casa*. The app shows every noun that way.' },
      { t: 'text', md: `
## Plurals
- Vowel → add **-s**: *el libro → los libros*
- Consonant → add **-es**: *la ciudad → las ciudades*, *el país → los países*
- **-z** → **-ces**: *el lápiz → los lápices*` },
      { t: 'mistakes', items: [["La problema", "El problema", "Many -ma words from Greek are masculine."], ["El mano", "La mano", "mano is feminine despite the -o."]] },
    ],
    practice: {
      choice: [
        { q: '___ problema', options: ['el', 'la'], answer: 0 },
        { q: '___ canción', options: ['el', 'la'], answer: 1 },
        { q: '___ mano', options: ['el', 'la'], answer: 1 },
        { q: '___ día', options: ['el', 'la'], answer: 0 },
        { q: '___ ciudad', options: ['el', 'la'], answer: 1 },
        { q: '___ viaje', options: ['el', 'la'], answer: 0 },
        { q: '___ mapa', options: ['el', 'la'], answer: 0 },
        { q: '___ televisión', options: ['el', 'la'], answer: 1 },
        { q: '___ idioma', options: ['el', 'la'], answer: 0 },
        { q: '___ foto', options: ['el', 'la'], answer: 1 },
      ],
    },
  },
  {
    id: 'g-gustar',
    level: 'A1',
    title: 'Gustar and similar verbs',
    titleEs: 'Gustar, encantar, doler…',
    summary: 'The thing you like is the subject — so it is gusta or gustan.',
    blocks: [
      { t: 'text', md: `
## Think "to please"
*Me gusta el café* literally means **"coffee pleases me"**. The coffee is the subject, so the verb agrees with it:
- one thing or an action → **gusta**: *Me gusta el café. Me gusta bailar.*
- several things → **gustan**: *Me gustan los gatos.*

## Who likes it: the pronoun
| (a mí) **me** gusta | (a nosotros) **nos** gusta |
| (a ti) **te** gusta | (a vosotros) **os** gusta |
| (a él/ella/usted) **le** gusta | (a ellos/ustedes) **les** gusta |

Add *a + person* for emphasis or clarity: ***A Marta** le gusta el té.*` },
      { t: 'text', md: `
## Verbs that work the same way
- **encantar** — to love (a thing): *Me encanta la playa.*
- **doler** — to hurt: *Me duelen los pies.*
- **interesar** — to interest: *¿Te interesa la historia?*
- **molestar** — to bother: *Nos molesta el ruido.*
- **quedar** — to have left / to fit: *Me queda poco dinero.*` },
      { t: 'examples', items: [
        ['Me gusta mucho el chocolate.', 'I really like chocolate.'],
        ['¿Te gustan los perros?', 'Do you like dogs?'],
        ['A mis padres les encanta viajar.', 'My parents love travelling.'],
        ['Me duele la cabeza.', 'My head hurts.'],
      ] },
      { t: 'mistakes', items: [["Yo gusto el café.", "Me gusta el café.", "The thing liked is the subject: me gusta."], ["Me gusta los perros.", "Me gustan los perros.", "Plural things → gustan."]] },
    ],
    practice: {
      choice: [
        { q: 'Me ___ las películas de acción.', options: ['gusta', 'gustan'], answer: 1, en: 'I like action films.' },
        { q: 'A Juan ___ gusta el fútbol.', options: ['le', 'les', 'me'], answer: 0, en: 'Juan likes football.' },
        { q: 'Nos ___ bailar.', options: ['gusta', 'gustan'], answer: 0, en: 'We like dancing.' },
        { q: 'A mis hermanos ___ encantan los videojuegos.', options: ['le', 'les'], answer: 1, en: 'My brothers love video games.' },
        { q: 'Me ___ los ojos.', options: ['duele', 'duelen'], answer: 1, en: 'My eyes hurt.' },
        { q: '¿___ gusta el té? (to you, informal)', options: ['Te', 'Le', 'Os'], answer: 0, en: 'Do you like tea?' },
      ],
    },
  },
  {
    id: 'g-reflexive',
    level: 'A1',
    title: 'Reflexive verbs',
    titleEs: 'Verbos reflexivos',
    summary: 'Levantarse, ducharse, llamarse: actions you do to yourself.',
    blocks: [
      { t: 'text', md: `
## The -se at the end
A verb ending in **-se** is reflexive: the action goes back to the subject. *Lavar* = to wash (something); *lavarse* = to wash (yourself).

Conjugate the verb normally and put the matching pronoun **before** it:` },
      { t: 'table', verbs: ['levantarse', 'llamarse'], tense: 'presente' },
      { t: 'text', md: `
## Where the pronoun goes
- Before a conjugated verb: ***Me** levanto a las siete.*
- Attached to an infinitive or gerund: *Voy a levantar**me**. Estoy duchándo**me**.*
- Attached to an affirmative command: *¡Levánta**te**!*

## Common reflexive verbs
*levantarse, acostarse (ue), ducharse, vestirse (i), llamarse, sentirse (ie), despertarse (ie), quedarse, irse, casarse, enfadarse*` },
      { t: 'examples', items: [
        ['¿Cómo te llamas?', 'What is your name?'],
        ['Nos acostamos a las once.', 'We go to bed at eleven.'],
        ['Mi hermano se ducha por la noche.', 'My brother showers at night.'],
      ] },
    ],
    practice: {
      conj: { verbs: ['levantarse', 'acostarse', 'ducharse', 'llamarse', 'sentirse'], tenses: ['presente'], count: 8 },
      choice: [
        { q: 'Yo ___ levanto temprano.', options: ['me', 'se', 'te'], answer: 0 },
        { q: 'Ellos ___ acuestan tarde.', options: ['se', 'nos', 'les'], answer: 0 },
      ],
    },
  },

  {
    id: 'g-cognates',
    level: 'A1',
    title: 'Words you already know',
    titleEs: 'Palabras transparentes',
    summary: 'English endings that turn into Spanish: -tion → -ción, -ty → -dad, -ly → -mente…',
    blocks: [
      { t: 'text', md: `
## Thousands of free words
English and Spanish share a huge number of words from Latin. Many follow **regular patterns**, so if you know the English word you can often build the Spanish one:

| English | Spanish | examples |
| -tion | **-ción** (fem.) | nation → nación, information → información |
| -ty | **-dad** (fem.) | city → ciudad, university → universidad |
| -ly | **-mente** | really → realmente, exactly → exactamente |
| -ous | **-oso** | famous → famoso, delicious → delicioso |
| -ist | **-ista** | artist → artista, dentist → dentista |
| -ble | **-ble** | possible → posible, terrible → terrible |
| -ic | **-ico** | music → música, electric → eléctrico |
| -ence / -ance | **-encia / -ancia** | science → ciencia, distance → distancia |` },
      { t: 'tip', md: 'Words ending in **-ción** and **-dad** are always **feminine**: *la nación, la ciudad*.' },
      { t: 'mistakes', items: [["Estoy embarazada. (to mean 'embarrassed')", 'Tengo vergüenza.', '"False friend": embarazada means pregnant!'], ['Actualmente (to mean "actually")', 'En realidad', 'actualmente means "currently".'], ['Librería (to mean "library")', 'Biblioteca', 'una librería is a bookshop.']] },
      { t: 'examples', items: [['La información es importante.', 'The information is important.'], ['Es realmente delicioso.', "It's really delicious."], ['Es posible.', "It's possible."]] },
    ],
    practice: {
      choice: [
        { q: '"nation" in Spanish: ___', options: ['nación', 'natión', 'nacio'], answer: 0 },
        { q: '"university" in Spanish: ___', options: ['universidad', 'universitad', 'universitía'], answer: 0 },
        { q: '"exactly" in Spanish: ___', options: ['exactamente', 'exactly', 'exactomente'], answer: 0 },
        { q: '"famous" in Spanish: ___', options: ['famoso', 'famous', 'fama'], answer: 0 },
        { q: 'Una librería is a…', options: ['bookshop', 'library', 'bookcase'], answer: 0 },
        { q: '___ ciudad', options: ['la', 'el'], answer: 0 },
      ],
    },
  },

  // ─── A2 ────────────────────────────────────────────────────────────────────
  {
    id: 'g-preterite-regular',
    level: 'A2',
    title: 'The preterite: regular verbs',
    titleEs: 'El pretérito indefinido regular',
    summary: 'Two sets of endings, and why the accent matters: hablo vs habló.',
    blocks: [
      { t: 'text', md: `
## Finished actions in the past
The preterite describes completed actions at a specific time: *ayer, anoche, el lunes, en 2019, hace dos años*.

There are only **two sets of endings**: one for -ar, and one shared by -er and -ir.` },
      { t: 'table', verbs: ['hablar', 'comer', 'vivir'], tense: 'preterito' },
      { t: 'text', md: `
## Things to notice
- **Nosotros** is the same as the present for -ar and -ir: *hablamos, vivimos*. Context tells you which.
- The accent changes the meaning: **hablo** (I speak) vs **habló** (he spoke).
- *yo* ends in **-é / -í**, *él* in **-ó / -ió**.

## Spelling changes in "yo" only
To keep the same sound before **é**:
| -car → **-qué** | buscar → **busqué**, tocar → toqué |
| -gar → **-gué** | llegar → **llegué**, pagar → pagué, jugar → jugué |
| -zar → **-cé** | empezar → **empecé** |

-er/-ir verbs with a vowel before the ending use **y**: *leer → leyó, leyeron*; *creer → creyó*.` },
      { t: 'mistakes', items: [["Ayer yo hablo con Ana.", "Ayer hablé con Ana.", "Finished past action → preterite; mind the accent."], ["Ayer yo buscé las llaves.", "Ayer yo busqué las llaves.", "-car verbs spell -qué in yo."]] },
    ],
    practice: {
      conj: { verbs: ['hablar', 'comer', 'vivir', 'trabajar', 'escribir', 'buscar', 'llegar', 'empezar', 'leer', 'viajar', 'visitar', 'aprender'], tenses: ['preterito'], count: 12 },
    },
  },
  {
    id: 'g-preterite-irregular',
    level: 'A2',
    title: 'The preterite: irregular families',
    titleEs: 'El pretérito indefinido irregular',
    summary: 'tuv-, pud-, pus-, hic-… one set of endings for all the strong stems.',
    blocks: [
      { t: 'text', md: `
## The "strong" preterites
Many common verbs get a new stem in the preterite — and then **all** of them use the same endings, with **no accents**:

| -e | -iste | -o | -imos | -isteis | -ieron |

| tener → **tuv-** | estar → **estuv-** | andar → **anduv-** |
| poder → **pud-** | poner → **pus-** | saber → **sup-** |
| querer → **quis-** | venir → **vin-** | hacer → **hic-** (hizo) |` },
      { t: 'table', verbs: ['tener', 'poder', 'venir'], tense: 'preterito' },
      { t: 'text', md: `
## The j-stems drop the i
When the stem ends in **j**, *ellos* is **-eron**, not *-ieron*:
- decir → **dij-**: dije, dijiste, dijo… **dijeron**
- traer → **traj-**: traje… **trajeron**
- conducir → **conduj-**: conduje… **condujeron**

## Ser and ir are identical
**fui, fuiste, fue, fuimos, fuisteis, fueron** — context tells you if it means "was" or "went".
- *Fue un día increíble.* (it **was**)
- *Fue al cine.* (he **went**)

**dar** and **ver** use -er/-ir endings without accents: *di, dio · vi, vio*.` },
      { t: 'tip', md: '**Hizo** is spelled with a z to keep the sound — *hico* would sound like "iko".' },
      { t: 'mistakes', items: [["Yo tení un problema.", "Yo tuve un problema.", "tener has the strong stem tuv-."], ["Ellos dijieron", "Ellos dijeron", "j-stems drop the i: -eron."]] },
    ],
    practice: {
      conj: { verbs: ['tener', 'estar', 'poder', 'poner', 'saber', 'querer', 'venir', 'hacer', 'decir', 'traer', 'conducir', 'ir', 'ser', 'dar', 'ver'], tenses: ['preterito'], count: 14 },
    },
  },
  {
    id: 'g-imperfect',
    level: 'A2',
    title: 'The imperfect',
    titleEs: 'El pretérito imperfecto',
    summary: 'The easiest tense: -aba / -ía, and only three irregular verbs.',
    blocks: [
      { t: 'text', md: `
## Habits and descriptions in the past
The imperfect is used for "used to …", "was …-ing", and for describing how things were.

It has just two sets of endings and **no stem changes**:` },
      { t: 'table', verbs: ['hablar', 'comer', 'vivir'], tense: 'imperfecto' },
      { t: 'text', md: `
## Only three irregulars in the whole language
| ser | era, eras, era, éramos, erais, eran |
| ir | iba, ibas, iba, íbamos, ibais, iban |
| ver | veía, veías, veía, veíamos, veíais, veían |

*Yo* and *él* are the same form (*hablaba*), so use the pronoun if it's unclear.` },
      { t: 'examples', items: [
        ['De pequeño jugaba en la calle.', 'As a child I used to play in the street.'],
        ['Mi abuela era muy alta.', 'My grandmother was very tall.'],
        ['Íbamos a la playa todos los veranos.', 'We used to go to the beach every summer.'],
      ] },
    ],
    practice: {
      conj: { verbs: ['hablar', 'comer', 'vivir', 'jugar', 'tener', 'estar', 'ser', 'ir', 'ver', 'trabajar', 'querer'], tenses: ['imperfecto'], count: 12 },
    },
  },
  {
    id: 'g-pret-vs-imp',
    level: 'A2',
    title: 'Preterite or imperfect?',
    titleEs: '¿Indefinido o imperfecto?',
    summary: 'The film analogy: the imperfect sets the scene, the preterite is the action.',
    blocks: [
      { t: 'text', md: `
## Think of a film
- The **imperfect** is the **background**: the scenery, the weather, what was going on, what people were like. It has no clear beginning or end.
- The **preterite** is the **events**: what happened, one after another, each one finished.

*Era de noche y **llovía**. Ana **leía** en el sofá. De repente, **sonó** el teléfono. Ana **se levantó** y **contestó**.*

## Signal words
| imperfect | preterite |
| siempre, a menudo, normalmente | ayer, anoche, el lunes pasado |
| todos los días, cada verano | una vez, de repente, en 2015 |
| de niño, antes, mientras | hace dos años, al final |

## Interrupted actions
Imperfect for the ongoing action, preterite for the interruption:
*Mientras **cenábamos**, **llegó** mi hermano.*` },
      { t: 'tip', md: 'Ask yourself: **was it going on** (imperfect) or **did it happen** (preterite)?' },
      { t: 'mistakes', items: [["Ayer iba al cine.", "Ayer fui al cine.", "A single finished event → preterite."], ["De niño fui a la playa cada verano.", "De niño iba a la playa cada verano.", "Repeated habits → imperfect."]] },
    ],
    practice: {
      choice: [
        { q: 'Cuando era niño, ___ en un pueblo.', options: ['vivía', 'viví'], answer: 0, en: 'When I was a child, I lived in a village.' },
        { q: 'Ayer ___ a mi abuela.', options: ['visitaba', 'visité'], answer: 1, en: 'Yesterday I visited my grandmother.' },
        { q: 'Mientras ___ la cena, sonó el teléfono.', options: ['preparaba', 'preparé'], answer: 0, en: 'While I was preparing dinner, the phone rang.' },
        { q: 'El año pasado ___ a Italia.', options: ['íbamos', 'fuimos'], answer: 1, en: 'Last year we went to Italy.' },
        { q: 'Todos los domingos ___ paella.', options: ['comíamos', 'comimos'], answer: 0, en: 'Every Sunday we used to eat paella.' },
        { q: 'De repente ___ a llover.', options: ['empezaba', 'empezó'], answer: 1, en: 'Suddenly it started to rain.' },
        { q: 'La casa ___ grande y bonita.', options: ['era', 'fue'], answer: 0, en: 'The house was big and pretty.' },
        { q: 'Anoche ___ una película muy buena.', options: ['veía', 'vi'], answer: 1, en: 'Last night I saw a very good film.' },
      ],
    },
  },
  {
    id: 'g-perfect',
    level: 'A2',
    title: 'The present perfect',
    titleEs: 'El pretérito perfecto',
    summary: 'He + participle: -ado / -ido, and the irregular participles.',
    blocks: [
      { t: 'text', md: `
## Haber + participle
The present perfect is **haber** in the present plus a **participle**, which never changes:
- -ar → **-ado**: hablar → hablado
- -er / -ir → **-ido**: comer → comido, vivir → vivido` },
      { t: 'table', verbs: ['hablar', 'comer'], tense: 'perfecto' },
      { t: 'text', md: `
## Irregular participles
| abrir → **abierto** | escribir → **escrito** |
| decir → **dicho** | hacer → **hecho** |
| poner → **puesto** | volver → **vuelto** |
| ver → **visto** | romper → **roto** |
| morir → **muerto** | descubrir → **descubierto** |

## When to use it (Spain)
For actions in a period of time that **isn't over yet**: *hoy, esta semana, este año, alguna vez, nunca, ya, todavía no*.
- *Hoy **he trabajado** mucho.* vs *Ayer **trabajé** mucho.*

In most of Latin America the preterite is used much more: *¿Ya comiste?*` },
    ],
    practice: {
      conj: { verbs: ['hablar', 'comer', 'vivir', 'hacer', 'decir', 'escribir', 'abrir', 'ver', 'poner', 'volver', 'romper'], tenses: ['perfecto'], count: 12 },
    },
  },
  {
    id: 'g-por-para',
    level: 'A2',
    title: 'Por or para?',
    titleEs: '¿Por o para?',
    summary: 'Para looks ahead to a goal; por looks at the cause, the route or the exchange.',
    blocks: [
      { t: 'text', md: `
## Para → destination and purpose (an arrow pointing forward)
- purpose: *Estudio **para** aprender.* (in order to)
- recipient: *Este regalo es **para** ti.*
- destination: *Salgo **para** Madrid.*
- deadline: *Es **para** el lunes.*
- opinion: ***Para** mí, es fácil.*

## Por → cause, route and exchange (looking back / through)
- cause: *Gracias **por** todo.* *Lo hice **por** ti.* (because of you)
- through / along: *Paseamos **por** el parque.*
- exchange / price: *Lo compré **por** diez euros.*
- duration: *Estudié **por** tres horas.*
- means: *Hablamos **por** teléfono.*
- time of day: ***por** la mañana, **por** la tarde*` },
      { t: 'tip', md: 'Ask: is it the **goal** (para) or the **reason / way** (por)?' },
      { t: 'mistakes', items: [["Gracias para todo.", "Gracias por todo.", "Thanks always takes por."], ["Estudio por aprender.", "Estudio para aprender.", "Purpose (in order to) → para."]] },
    ],
    practice: {
      choice: [
        { q: 'Gracias ___ tu ayuda.', options: ['por', 'para'], answer: 0, en: 'Thanks for your help.' },
        { q: 'Este libro es ___ ti.', options: ['por', 'para'], answer: 1, en: 'This book is for you.' },
        { q: 'Estudio español ___ viajar.', options: ['por', 'para'], answer: 1, en: 'I study Spanish to travel.' },
        { q: 'Caminamos ___ la playa.', options: ['por', 'para'], answer: 0, en: 'We walked along the beach.' },
        { q: 'Compré el coche ___ 5.000 euros.', options: ['por', 'para'], answer: 0, en: 'I bought the car for 5,000 euros.' },
        { q: 'El trabajo es ___ mañana.', options: ['por', 'para'], answer: 1, en: 'The work is due tomorrow.' },
        { q: 'Hablo con mi madre ___ teléfono.', options: ['por', 'para'], answer: 0, en: 'I talk to my mother on the phone.' },
        { q: '___ mí, el español es fácil.', options: ['Por', 'Para'], answer: 1, en: 'For me, Spanish is easy.' },
      ],
    },
  },
  {
    id: 'g-pronouns',
    level: 'A2',
    title: 'Object pronouns',
    titleEs: 'Lo, la, le, se lo',
    summary: 'Replace "it", "him", "to her": lo/la for things, le for people receiving something.',
    blocks: [
      { t: 'text', md: `
## Direct object: what? → lo, la, los, las
*¿Compras **el pan**? — Sí, **lo** compro.* · *¿Ves **a María**? — Sí, **la** veo.*

## Indirect object: to whom? → le, les
*Doy el libro **a Juan**. → **Le** doy el libro.*

| | direct | indirect |
| me / te | me, te | me, te |
| him, her, it, you (formal) | lo, la | le |
| us / you all | nos, os | nos, os |
| them, you all (formal) | los, las | les |

## Both together: le + lo → se lo
Indirect goes first, and **le/les becomes se** before lo/la:
*Le doy el libro → **Se lo** doy.* (I give it to him.)

## Position
- before a conjugated verb: ***Lo** tengo.*
- attached to an infinitive, gerund or command: *Quiero comprar**lo**. Estoy leyéndo**lo**. ¡Cómpra**lo**!*` },
    ],
    practice: {
      choice: [
        { q: '¿Tienes las llaves? — Sí, ___ tengo.', options: ['las', 'los', 'les'], answer: 0 },
        { q: '¿Conoces a Pedro? — Sí, ___ conozco.', options: ['lo', 'le', 'la'], answer: 0 },
        { q: '___ escribo una carta a mi abuela.', options: ['Le', 'La', 'Lo'], answer: 0, en: 'I write a letter to my grandmother.' },
        { q: '¿El regalo? ___ doy mañana a Ana.', options: ['Se lo', 'Le lo', 'Lo le'], answer: 0 },
        { q: 'Quiero comprar___ (the dress).', options: ['lo', 'la', 'le'], answer: 0 },
        { q: 'A mis padres ___ gusta el cine.', options: ['les', 'los', 'le'], answer: 0 },
      ],
    },
  },

  // ─── B1 ────────────────────────────────────────────────────────────────────
  {
    id: 'g-future',
    level: 'B1',
    title: 'Future and conditional: one set of stems',
    titleEs: 'Futuro y condicional',
    summary: 'Add endings to the whole infinitive; twelve irregular stems in three groups.',
    blocks: [
      { t: 'text', md: `
## Built on the infinitive
Both tenses add endings to the **whole infinitive** — the same for -ar, -er and -ir:
- future: **-é, -ás, -á, -emos, -éis, -án**
- conditional: **-ía, -ías, -ía, -íamos, -íais, -ían** (the imperfect -er endings!)` },
      { t: 'table', verbs: ['hablar', 'comer', 'vivir'], tense: 'futuro' },
      { t: 'text', md: `
## The irregular stems come in three groups
They are shared by both tenses, so learn them once:

| drop the e | put a d | shortened |
| poder → **podr-** | tener → **tendr-** | decir → **dir-** |
| saber → **sabr-** | poner → **pondr-** | hacer → **har-** |
| querer → **querr-** | salir → **saldr-** | |
| haber → **habr-** | venir → **vendr-** | |
| caber → **cabr-** | valer → **valdr-** | |` },
      { t: 'table', verbs: ['tener', 'poder', 'hacer'], tense: 'condicional' },
      { t: 'tip', md: '**The endings never change** — *tendré* and *hablaré* end the same way. Only the stem is irregular.' },
    ],
    practice: {
      conj: { verbs: ['hablar', 'vivir', 'tener', 'poder', 'saber', 'querer', 'poner', 'salir', 'venir', 'decir', 'hacer', 'ir'], tenses: ['futuro', 'condicional'], count: 14 },
    },
  },
  {
    id: 'g-subj-form',
    level: 'B1',
    title: 'Forming the present subjunctive',
    titleEs: 'La forma del subjuntivo',
    summary: 'Take "yo", drop the -o, swap the vowel: hablo → hable, como → coma.',
    blocks: [
      { t: 'text', md: `
## Three steps
1. Take the **yo** form of the present: *hablo, como, tengo*
2. Drop the **-o**: *habl-, com-, teng-*
3. Add the **"opposite" vowel**: -ar verbs take **e**, -er/-ir verbs take **a**

This is why irregular *yo* forms matter: *tengo → tenga*, *hago → haga*, *conozco → conozca*.` },
      { t: 'table', verbs: ['hablar', 'comer', 'tener'], tense: 'subjuntivo' },
      { t: 'text', md: `
## Stem-changers keep their boot
*pensar → piense, pienses, piense, **pensemos**, penséis, piensen*

-ir stem-changers also change in *nosotros/vosotros* (e → i, o → u): *dormir → **durmamos***, *pedir → **pidamos***, *sentir → **sintamos***.

## Spelling to keep the sound
*buscar → busque*, *llegar → llegue*, *empezar → empiece*

## Six irregulars (not based on yo)
| ser → **sea** | estar → **esté** | ir → **vaya** |
| saber → **sepa** | dar → **dé** | haber → **haya** |` },
    ],
    practice: {
      conj: { verbs: ['hablar', 'comer', 'vivir', 'tener', 'hacer', 'venir', 'decir', 'pensar', 'dormir', 'pedir', 'buscar', 'ser', 'estar', 'ir', 'saber'], tenses: ['subjuntivo'], count: 14 },
    },
  },
  {
    id: 'g-subj-use',
    level: 'B1',
    title: 'When to use the subjunctive',
    titleEs: '¿Cuándo se usa el subjuntivo?',
    summary: 'WEIRDO: wishes, emotions, impersonal phrases, requests, doubt, ojalá.',
    blocks: [
      { t: 'text', md: `
## The basic idea
The indicative states **facts**. The subjunctive expresses things that are **not (yet) facts** for the speaker: wishes, feelings, doubts, requests.

It usually appears after **que**, when the two parts of the sentence have **different subjects**:
- *Quiero **viajar**.* (I want to travel — same subject → infinitive)
- *Quiero que **viajes**.* (I want you to travel — different subject → subjunctive)

## WEIRDO
| **W**ishes | quiero que, espero que, prefiero que |
| **E**motions | me alegra que, me molesta que, tengo miedo de que |
| **I**mpersonal | es importante que, es necesario que, es mejor que |
| **R**equests | te pido que, te recomiendo que, no permiten que |
| **D**oubt / denial | no creo que, dudo que, no es verdad que |
| **O**jalá | ojalá (que) |

## Also after these
- ***cuando*** + future idea: *Cuando **llegues**, llámame.*
- ***para que***: *Te lo explico para que lo **entiendas**.*` },
      { t: 'tip', md: '**Creo que** + indicative (you believe it) · **No creo que** + subjunctive (you doubt it).' },
      { t: 'mistakes', items: [["Quiero que vienes.", "Quiero que vengas.", "Wish + different subject → subjunctive."], ["Creo que sea verdad.", "Creo que es verdad.", "Creer que (belief) takes the indicative."], ["Cuando llegaré, te llamo.", "Cuando llegue, te llamo.", "cuando + future idea → subjunctive."]] },
    ],
    practice: {
      choice: [
        { q: 'Quiero que ___ a mi fiesta.', options: ['vienes', 'vengas'], answer: 1, en: 'I want you to come to my party.' },
        { q: 'Creo que ___ razón.', options: ['tienes', 'tengas'], answer: 0, en: 'I think you are right.' },
        { q: 'No creo que ___ razón.', options: ['tienes', 'tengas'], answer: 1, en: "I don't think you are right." },
        { q: 'Ojalá ___ buen tiempo mañana.', options: ['hace', 'haga'], answer: 1, en: 'I hope the weather is good tomorrow.' },
        { q: 'Es importante que ___ mucha agua.', options: ['bebes', 'bebas'], answer: 1, en: "It's important that you drink a lot of water." },
        { q: 'Sé que ___ cansado.', options: ['estás', 'estés'], answer: 0, en: 'I know you are tired.' },
        { q: 'Me alegra que ___ aquí.', options: ['estás', 'estés'], answer: 1, en: "I'm glad you are here." },
        { q: 'Cuando ___ a casa, te llamo.', options: ['llego', 'llegue'], answer: 1, en: 'When I get home, I will call you.' },
        { q: 'Normalmente, cuando ___ a casa, ceno.', options: ['llego', 'llegue'], answer: 0, en: 'Normally, when I get home, I have dinner.' },
        { q: 'Quiero ___ español.', options: ['aprender', 'que aprenda'], answer: 0, en: 'I want to learn Spanish.' },
      ],
    },
  },
  {
    id: 'g-imperative',
    level: 'B1',
    title: 'Giving commands',
    titleEs: 'El imperativo',
    summary: 'Tú commands come from the present; everything else from the subjunctive.',
    blocks: [
      { t: 'text', md: `
## Affirmative commands
- **tú** = the *él* form of the present: *habla, come, escribe*
- **vosotros** = infinitive with **-d** instead of **-r**: *hablad, comed, escribid*
- **usted, ustedes, nosotros** = present subjunctive: *hable, hablen, hablemos*` },
      { t: 'table', verbs: ['hablar', 'comer', 'dormir'], tense: 'imperativo' },
      { t: 'text', md: `
## The eight short tú commands
| decir → **di** | hacer → **haz** |
| ir → **ve** | poner → **pon** |
| salir → **sal** | ser → **sé** |
| tener → **ten** | venir → **ven** |

## Negative commands: always subjunctive
*¡Habla! → ¡**No hables**!* · *¡Come! → ¡**No comas**!* · *¡Ven! → ¡**No vengas**!*

## Pronouns
- attached to affirmative commands (add an accent to keep the stress): *Dí**melo**. Cóme**lo**. Levánta**te**.*
- before negative commands: *No **me lo** digas. No **te** levantes.*` },
      { t: 'mistakes', items: [["¡No habla!", "¡No hables!", "Negative commands use the subjunctive."], ["¡Dice la verdad!", "¡Di la verdad!", "decir has the short tú command di."]] },
    ],
    practice: {
      conj: { verbs: ['hablar', 'comer', 'escribir', 'decir', 'hacer', 'ir', 'poner', 'salir', 'tener', 'venir', 'cortar', 'añadir'], tenses: ['imperativo'], count: 12 },
      choice: [
        { q: '¡No ___ la ventana! (tú, abrir)', options: ['abras', 'abre'], answer: 0 },
        { q: '___ la verdad. (tú, decir)', options: ['Di', 'Dice', 'Diga'], answer: 0 },
      ],
    },
  },
  {
    id: 'g-comparisons',
    level: 'B1',
    title: 'Comparing things',
    titleEs: 'Comparativos y superlativos',
    summary: 'más … que, tan … como, el más …, and the irregular mejor / peor.',
    blocks: [
      { t: 'text', md: `
## More, less, as … as
| more … than | **más** + adj. + **que** | *Madrid es más grande que Toledo.* |
| less … than | **menos** + adj. + **que** | *Este libro es menos interesante que el otro.* |
| as … as | **tan** + adj. + **como** | *Soy tan alto como mi padre.* |
| as much / many as | **tanto/a/os/as** + noun + **como** | *Tengo tantos libros como tú.* |

## The most: el / la más …
*Es **la** ciudad **más** bonita **de** España.* — note **de**, not *en*.

## Irregular forms
| bueno → **mejor** | malo → **peor** |
| grande (age) → **mayor** | pequeño (age) → **menor** |

*Mi hermano es **mayor que** yo.* · *Es **el mejor** restaurante de la ciudad.*

## Very: -ísimo
*muy bueno → buenísimo*, *muy caro → carísimo*, *muy fácil → facilísimo*` },
    ],
    practice: {
      choice: [
        { q: 'Mi coche es más rápido ___ el tuyo.', options: ['que', 'como', 'de'], answer: 0 },
        { q: 'Ana es tan alta ___ su madre.', options: ['como', 'que', 'de'], answer: 0 },
        { q: 'Es el edificio más alto ___ la ciudad.', options: ['de', 'en', 'que'], answer: 0 },
        { q: 'Este café es ___ que el de ayer.', options: ['mejor', 'más bueno', 'bueno'], answer: 0 },
        { q: 'Mi hermana tiene 20 años y yo 25. Ella es ___ que yo.', options: ['menor', 'mayor', 'peor'], answer: 0 },
        { q: 'No tengo ___ dinero como tú.', options: ['tanto', 'tan', 'más'], answer: 0 },
      ],
    },
  },
];

export const GRAMMAR_MAP: Record<string, GrammarLesson> = Object.fromEntries(GRAMMAR.map((g) => [g.id, g]));
