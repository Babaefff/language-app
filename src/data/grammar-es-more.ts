import type { GrammarLesson } from './types';
import { ES as TRANSLATIONS } from './translations-es';
import { ES as WHY } from './why-es';

/** Example sentence: italic in the lesson, with its English registered next to it. */
function ex(es: string, en: string): string {
  TRANSLATIONS[es.replace(/\*\*/g, '')] = en;
  return `*${es}*`;
}
/** Practice question with the reason its answer is right (the right option is listed first). */
function q(question: string, options: string[], why: string, en?: string) {
  WHY[question] = why;
  return { q: question, options, answer: 0, ...(en ? { en } : {}) };
}

/** The progressive (A2): placed after the present perfect. */
export const ES_PROGRESSIVE: GrammarLesson = {
  id: 'g-progressive', level: 'A2', title: 'Right now: estar + gerund', titleEs: 'Estar + gerundio',
  summary: 'estoy hablando: an action in progress at this moment.',
  blocks: [
    { t: 'text', md: `
## Two parts you already know
**estar** (estoy, estás, está…) + the **gerund**: **-ar → -ando**, **-er / -ir → -iendo**.
${ex('Estoy hablando por teléfono.', "I'm talking on the phone.")} · ${ex('¿Qué estás haciendo?', 'What are you doing?')} · ${ex('Están comiendo.', "They're eating.")}

## Irregular gerunds
- **-ir** boot verbs change e → i, o → u: *pedir → pidiendo, dormir → durmiendo, decir → diciendo*
- a vowel before -iendo becomes **-yendo**: *leer → leyendo, oír → oyendo, ir → yendo*

## When to use it
Only for what is happening **right now** or around now: ${ex('Estoy leyendo un libro muy bueno.', "I'm reading a very good book.")}
For habits and the near future Spanish uses the simple present: ${ex('Mañana trabajo.', "I'm working tomorrow.")} (not *estoy trabajando mañana*).

## Pronouns
Before estar or glued to the gerund (with an accent): ${ex('Lo estoy haciendo.', "I'm doing it.")} = ${ex('Estoy haciéndolo.', "I'm doing it.")}` },
    { t: 'table', verbs: ['hablar', 'comer', 'dormir'], tense: 'progresivo', caption: 'estar + gerund' },
    { t: 'logic', md: `This is the same "**estar** = how something is right now" idea from ser / estar: the action is a **temporary state** you're in the middle of. English uses -ing much more widely; Spanish keeps it for the moment itself.` },
    { t: 'mistakes', items: [['Mañana estoy trabajando.', 'Mañana trabajo.', 'For plans, Spanish uses the simple present.'], ['Estoy leendo.', 'Estoy leyendo.', 'A vowel before -iendo becomes -yendo.'], ['Soy comiendo.', 'Estoy comiendo.', 'The progressive always uses estar.']] },
  ],
  practice: {
    conj: { verbs: ['hablar', 'comer', 'escribir', 'leer', 'dormir', 'pedir'], tenses: ['progresivo'], count: 8 },
    choice: [
      q('Ahora mismo ___ la cena.', ['estoy preparando', 'soy preparando', 'preparo mañana'], 'Right now + estar + gerund: estoy preparando.', "I'm making dinner right now."),
      q('Los niños están ___.', ['durmiendo', 'dormiendo', 'dormido'], 'dormir changes o → u in the gerund: durmiendo.', 'The children are sleeping.'),
      q('¿Qué estás ___?', ['leyendo', 'leiendo', 'leído'], 'leer: the vowel before -iendo makes -yendo.', 'What are you reading?'),
      q('Mañana ___ con mis abuelos.', ['como', 'estoy comiendo', 'estando'], 'For a plan, Spanish uses the simple present.', "Tomorrow I'm having lunch with my grandparents."),
    ],
  },
};

/** B1 lessons that complete the Spanish course; placed after "Comparing things". */
export const ES_B1_MORE: GrammarLesson[] = [
  {
    id: 'g-pluperfect', level: 'B1', title: 'Had done: the pluperfect', titleEs: 'El pluscuamperfecto',
    summary: 'había + participle: something that happened before another past event.',
    blocks: [
      { t: 'text', md: `
## había + participle
The imperfect of **haber** (había, habías, había, habíamos, habíais, habían) + the participle you know from the present perfect:
${ex('Cuando llegué, la película ya había empezado.', 'When I arrived, the film had already started.')}

## One step further back
It places an action **before** another past action: ${ex('No tenía hambre porque había comido.', "I wasn't hungry because I had eaten.")}
The words **ya** (already) and **todavía no / nunca** (not yet / never) often go with it: ${ex('Nunca había visto el mar.', 'I had never seen the sea.')}` },
      { t: 'logic', md: `It's built exactly like the present perfect, just one step back in time: **he comido** (have eaten) → **había comido** (had eaten). Same participles, same irregulars (*hecho, visto, dicho, escrito*); only haber moves to the imperfect.` },
      { t: 'mistakes', items: [['Cuando llegué, la película ya empezó.', 'Cuando llegué, la película ya había empezado.', 'It started before you arrived: pluperfect.'], ['Había hacido los deberes.', 'Había hecho los deberes.', 'hacer → hecho, as in the present perfect.']] },
    ],
    practice: {
      choice: [
        q('Cuando llegamos, el tren ya ___.', ['había salido', 'salió', 'sale'], 'It left before we arrived: had left → había salido.', 'When we arrived, the train had already left.'),
        q('Nunca ___ una ciudad tan bonita.', ['había visto', 'había vido', 'vi'], 'The participle of ver is visto: había visto.', 'I had never seen such a beautiful city.'),
        q('Estaba cansado porque no ___ bien.', ['había dormido', 'dormí', 'había dormiendo'], 'The reason lies before the tiredness: had slept → había dormido.', "He was tired because he hadn't slept well."),
        q('¿Ya ___ el libro cuando viste la película?', ['habías leído', 'leíste', 'habías leyendo'], 'Before the film: had read → habías leído.', 'Had you already read the book when you saw the film?'),
        q('Ella ya ___ la carta cuando la llamé.', ['había escrito', 'había escribido', 'escribía'], 'escribir → escrito: había escrito.', 'She had already written the letter when I called her.'),
      ],
    },
  },
  {
    id: 'g-si', level: 'B1', title: 'If I had…: the imperfect subjunctive', titleEs: 'Si + imperfecto de subjuntivo',
    summary: 'si tuviera dinero, viajaría: imagined situations.',
    blocks: [
      { t: 'text', md: `
## Real conditions: si + present
${ex('Si llueve, me quedo en casa.', "If it rains, I'll stay at home.")} · ${ex('Si tienes tiempo, llámame.', 'If you have time, call me.')}

## Imagined conditions: si + imperfect subjunctive → conditional
${ex('Si tuviera dinero, viajaría por el mundo.', 'If I had money, I would travel the world.')}

## Forming the imperfect subjunctive
Take the **ellos** form of the preterite, drop **-ron**, add **-ra, -ras, -ra, -ramos, -rais, -ran**:
| hablaron → habla**ra** | comieron → comie**ra** | vivieron → vivie**ra** |
| tuvieron → tuvie**ra** | fueron → fue**ra** | hicieron → hicie**ra** |
| pudieron → pudie**ra** | dijeron → dije**ra** | estuvieron → estuvie**ra** |

*nosotros* has an accent: *tuviéramos, habláramos*. So every irregular preterite you learned gives you this tense for free.

## Never the conditional after si
${ex('Si fuera rico, compraría una casa.', "If I were rich, I'd buy a house.")} (not *si sería*).

## Also after "ojalá" and past wishes
${ex('Ojalá tuviera más tiempo.', 'I wish I had more time.')} · ${ex('Quería que vinieras.', 'I wanted you to come.')}` },
      { t: 'logic', md: `The **si-part** is one step further from reality than the main part: real → present; imagined → imperfect subjunctive + conditional. The form itself comes from the **preterite ellos** form, so the irregular preterite families (*tuv-, estuv-, pud-, hic-, dij-, fu-*) carry straight over.` },
      { t: 'mistakes', items: [['Si tendría dinero, viajaría.', 'Si tuviera dinero, viajaría.', 'Never the conditional after si.'], ['Si sería tú, no iría.', 'Si fuera tú, no iría.', 'ser → fueron → fuera.'], ['Ojalá tengo más tiempo.', 'Ojalá tuviera más tiempo.', 'An unreal wish takes the imperfect subjunctive.']] },
    ],
    practice: {
      choice: [
        q('Si ___ más tiempo, aprendería a tocar el piano.', ['tuviera', 'tendría', 'tengo'], 'An imagined condition: si + imperfect subjunctive (tuvieron → tuviera).', "If I had more time, I'd learn to play the piano."),
        q('Si yo ___ tú, no lo haría.', ['fuera', 'sería', 'soy'], 'ser: fueron → fuera. Never the conditional after si.', "If I were you, I wouldn't do it."),
        q('Si ganara la lotería, ___ una casa en la playa.', ['compraría', 'comprara', 'compro'], 'After si + imperfect subjunctive, the main part takes the conditional.', "If I won the lottery, I'd buy a house on the beach."),
        q('Si mañana hace sol, ___ a la playa.', ['vamos', 'fuéramos', 'iríamos'], 'A real possibility: si + present → present / future.', "If it's sunny tomorrow, we'll go to the beach."),
        q('Ojalá ___ aquí conmigo.', ['estuvieras', 'estarías', 'estás'], 'An unreal wish: ojalá + imperfect subjunctive (estuvieron → estuviera).', 'I wish you were here with me.'),
      ],
    },
  },
  {
    id: 'g-relatives', level: 'B1', title: 'que, quien, donde, lo que', titleEs: 'Los pronombres relativos',
    summary: 'Joining sentences: the man who…, the town where…, what…',
    blocks: [
      { t: 'text', md: `
## que: the all-purpose word
**que** works for people and things, subject or object: ${ex('El libro que estoy leyendo es genial.', "The book I'm reading is great.")} · ${ex('Tengo un amigo que vive en Lima.', 'I have a friend who lives in Lima.')}
Spanish never leaves it out, unlike English (*the book I'm reading*).

## quien / quienes: after a preposition, for people
${ex('La chica con quien hablé es mi vecina.', 'The girl I talked to is my neighbour.')}

## donde: places
${ex('Este es el pueblo donde nací.', 'This is the village where I was born.')}

## lo que: "what" (the thing that)
${ex('No entiendo lo que dices.', "I don't understand what you're saying.")} · ${ex('Lo que más me gusta es viajar.', 'What I like most is travelling.')}

## el que / la que after prepositions (things)
${ex('La empresa para la que trabajo es alemana.', 'The company I work for is German.')}` },
      { t: 'logic', md: `Start with **que** (it covers most cases), then add the special ones: **quien** for people after a preposition, **donde** for places, and **lo que** when English says "what" in the middle of a sentence. Like in French and German, the relative word can never be dropped.` },
      { t: 'mistakes', items: [['El libro estoy leyendo es genial.', 'El libro que estoy leyendo es genial.', 'que can never be left out.'], ['No entiendo que dices.', 'No entiendo lo que dices.', '"what" in mid-sentence is lo que.'], ['La chica con que hablé.', 'La chica con quien hablé.', 'A person after a preposition: quien.']] },
    ],
    practice: {
      choice: [
        q('La película ___ vimos ayer era muy buena.', ['que', 'lo que', 'donde'], 'A thing, no preposition: que.', 'The film we saw yesterday was very good.'),
        q('Esta es la casa ___ vivía de niño.', ['donde', 'que', 'quien'], 'A place: donde.', 'This is the house where I lived as a child.'),
        q('No sé ___ quieres.', ['lo que', 'que', 'quien'], '"what" in the middle of a sentence: lo que.', "I don't know what you want."),
        q('___ más me gusta de España es la comida.', ['Lo que', 'Que', 'Donde'], '"What" as the subject of the sentence: lo que.', 'What I like most about Spain is the food.'),
        q('El chico con ___ salgo es argentino.', ['quien', 'que', 'donde'], 'A person after a preposition (con): quien.', "The boy I'm going out with is Argentinian."),
      ],
    },
  },
  {
    id: 'g-se', level: 'B1', title: 'se: impersonal and passive', titleEs: 'Se impersonal y pasiva refleja',
    summary: 'Se habla español, se venden pisos: when nobody in particular does it.',
    blocks: [
      { t: 'text', md: `
## Impersonal se: "you / people / one"
**se** + the él form: ${ex('Aquí se come muy bien.', 'You eat very well here.')} · ${ex('¿Cómo se dice "window" en español?', 'How do you say "window" in Spanish?')}

## Passive se: the verb agrees with the thing
${ex('Se vende piso.', 'Flat for sale.')} · ${ex('Se venden pisos.', 'Flats for sale.')} · ${ex('Se habla inglés.', 'English spoken.')}
This is much more common than the "real" passive (*ser + participle*), which belongs to formal writing: ${ex('El puente fue construido en 1900.', 'The bridge was built in 1900.')}

## Accidents: se me…
For things that "happen to you": ${ex('Se me olvidaron las llaves.', 'I forgot my keys.')} · ${ex('Se me rompió el móvil.', 'My phone broke.')} The thing is the subject; **me / te / le** shows who it happened to.` },
      { t: 'logic', md: `Spanish prefers to hide the doer with **se** instead of using the passive. Watch the agreement: the verb follows the **thing** (*se vende un piso / se venden pisos*), just as with **gustar**, where the verb agrees with what is liked.` },
      { t: 'mistakes', items: [['Se vende pisos.', 'Se venden pisos.', 'The verb agrees with the thing: plural.'], ['Yo olvidé las llaves sin querer.', 'Se me olvidaron las llaves.', 'For accidents Spanish uses se me…'], ['Uno habla español aquí.', 'Aquí se habla español.', 'Impersonal: se + él form.']] },
    ],
    practice: {
      choice: [
        q('En esta tienda se ___ ropa de segunda mano.', ['vende', 'venden', 'vendes'], 'ropa is singular, so the verb is singular: se vende.', 'Second-hand clothes are sold in this shop.'),
        q('Se ___ coches usados.', ['venden', 'vende', 'vendemos'], 'coches is plural: se venden.', 'Used cars for sale.'),
        q('¿Cómo se ___ "thank you" en español?', ['dice', 'dicen', 'dices'], 'Impersonal se + él form: se dice.', 'How do you say "thank you" in Spanish?'),
        q('Aquí no se ___ fumar.', ['puede', 'pueden', 'podemos'], 'Impersonal se + él form: se puede.', "You can't smoke here."),
        q('Se me ___ las gafas.', ['rompieron', 'rompió', 'rompí'], 'las gafas is plural and the subject: se me rompieron.', 'My glasses broke.'),
      ],
    },
  },
  {
    id: 'g-connectors', level: 'B1', title: 'Linking ideas', titleEs: 'Los conectores',
    summary: 'porque, aunque, sin embargo, por eso, para que: building an argument.',
    blocks: [
      { t: 'text', md: `
## By job
| cause | **porque, como, ya que** | ${ex('Como llovía, nos quedamos.', 'As it was raining, we stayed.')} |
| consequence | **por eso, así que, por lo tanto** | ${ex('Estaba cansado, así que me acosté.', 'I was tired, so I went to bed.')} |
| contrast | **pero, sin embargo, en cambio** | ${ex('Es caro; sin embargo, vale la pena.', "It's expensive; however, it's worth it.")} |
| concession | **aunque** | ${ex('Aunque llueve, salgo.', "Although it's raining, I'm going out.")} |
| purpose | **para** + infinitive / **para que** + subjunctive | ${ex('Te lo explico para que lo entiendas.', "I'll explain it so that you understand.")} |
| order | **primero, luego, además, por último** | |

## Watch the mood
- **aunque + indicative** = a fact: *Aunque llueve, salgo* (it is raining).
- **aunque + subjunctive** = maybe / doesn't matter: ${ex('Aunque llueva, saldré.', "Even if it rains, I'll go out.")}
- **para que, antes de que, sin que** always take the subjunctive.

## como or porque?
**como** opens the sentence; **porque** comes after the main idea: ${ex('Como estoy enfermo, no voy.', "As I'm ill, I'm not going.")} / ${ex('No voy porque estoy enfermo.', "I'm not going because I'm ill.")}` },
      { t: 'logic', md: `Connectors group by meaning, each with a plain and a more formal option (**pero / sin embargo**, **por eso / por lo tanto**). The subjunctive appears with the ones that introduce something **not (yet) real**: a purpose, a hypothesis, a concession you don't accept as fact.` },
      { t: 'mistakes', items: [['Porque estoy enfermo, no voy.', 'Como estoy enfermo, no voy.', 'At the start of the sentence, use como.'], ['Te lo explico para que lo entiendes.', 'Te lo explico para que lo entiendas.', 'para que + subjunctive.'], ['Sin embargo que llueve, salgo.', 'Aunque llueve, salgo.', 'sin embargo links two sentences; aunque joins clauses.']] },
    ],
    practice: {
      choice: [
        q('Estaba cansada, ___ se fue a dormir.', ['así que', 'aunque', 'para que'], 'A consequence: así que.', 'She was tired, so she went to sleep.'),
        q('___ hace frío, voy a la playa.', ['Aunque', 'Por eso', 'Como'], 'A contrast with what you would expect: aunque.', "Although it's cold, I'm going to the beach."),
        q('___ no tenía dinero, no fui al concierto.', ['Como', 'Porque', 'Sin embargo'], 'A cause at the start of the sentence: como.', "As I didn't have any money, I didn't go to the concert."),
        q('Te doy mi número para que me ___.', ['llames', 'llamas', 'llamar'], 'para que always takes the subjunctive: llames.', "I'll give you my number so that you can call me."),
        q('Es un buen hotel; ___, es muy caro.', ['sin embargo', 'por eso', 'porque'], 'A contrast between two sentences: sin embargo.', "It's a good hotel; however, it's very expensive."),
      ],
    },
  },
];
