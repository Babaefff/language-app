import type { GrammarLesson, LessonBlock } from './types';

/** Extra depth for each Spanish lesson: a detailed section and "the logic behind it". */
export const DEEP_ES: Record<string, { more?: string; logic: string }> = {
  'g-stem-ending': {
    more: `
## Three families, one system
Every verb ends in **-ar**, **-er** or **-ir**. Take that off and you have the **stem** (the meaning); add an **ending** (who and when).
| | hablar | comer | vivir |
| yo | habl**o** | com**o** | viv**o** |
| tú | habl**as** | com**es** | viv**es** |
| él / ella / usted | habl**a** | com**e** | viv**e** |
| nosotros | habl**amos** | com**emos** | viv**imos** |
| vosotros | habl**áis** | com**éis** | viv**ís** |
| ellos / ustedes | habl**an** | com**en** | viv**en** |

- **-ar** verbs use **a** in their endings, **-er / -ir** verbs use **e**.
- **-er** and **-ir** share every form except nosotros and vosotros (comemos / vivimos).

## You can drop the pronoun
The ending already says who: *Hablo español.* Use *yo, tú…* only for emphasis or contrast: *Yo cocino y tú lavas los platos.*`,
    logic: `A Spanish verb is always **stem + ending**. Every tense you learn later is just **a new set of endings on the same stem**, so the system you learn now is reused everywhere.

Remember the vowel too: -ar → **a**, -er/-ir → **e**. At B1 the subjunctive simply **swaps them** (hable, coma).`,
  },
  'g-person-code': {
    more: `
## The same code in almost every tense
| person | code | present | imperfect | future |
| tú | **-s** | habla**s** | hablaba**s** | hablará**s** |
| nosotros | **-mos** | habla**mos** | hablába**mos** | hablare**mos** |
| vosotros | **-is** | habl**áis** | hablaba**is** | hablaré**is** |
| ellos | **-n** | habla**n** | hablaba**n** | hablará**n** |

- Outside the present, **yo and él often look the same**: *(yo / él) hablaba, hablaría, hable*. Context or a pronoun tells them apart.
- The one exception: **preterite tú** has no -s: *hablaste* (not *hablastes*).

## Reading forms you've never seen
See **-mos** → "we", whatever the tense. See **-n** → "they / you all".`,
    logic: `Think of an ending as **two layers**: first a **tense marker** (-aba-, -ará-, -ría-…), then the **person code** (-s, -mos, -is, -n). Once you know the code, every new tense is just a new marker in the middle.`,
  },
  'g-boot': {
    more: `
## Why "boot"?
Draw the present-tense table: the stem changes in **yo, tú, él and ellos**. Those four boxes form a boot shape. Nosotros and vosotros, the "hole" in the middle, stay regular.
| | e → ie: querer | o → ue: poder | e → i: pedir |
| yo | qu**ie**ro | p**ue**do | p**i**do |
| tú | qu**ie**res | p**ue**des | p**i**des |
| él | qu**ie**re | p**ue**de | p**i**de |
| nosotros | queremos | podemos | pedimos |
| vosotros | queréis | podéis | pedís |
| ellos | qu**ie**ren | p**ue**den | p**i**den |

## The reason is stress
The vowel changes **only where it is stressed**: *QUIE-ro*, but *que-RE-mos*. In nosotros and vosotros the stress moves to the ending, so the stem stays plain.

## The common families
- **e → ie**: pensar, empezar, cerrar, entender, preferir, sentir
- **o → ue**: dormir, volver, encontrar, contar, costar, recordar (and jugar: u → ue)
- **e → i** (only -ir verbs): pedir, servir, repetir, seguir, vestirse`,
    logic: `**Stress decides.** A stressed **e** grows into **ie**, a stressed **o** into **ue**; an unstressed one stays the same.

The same boot comes back in the **present subjunctive** (quiera, pueda) and in commands (*¡Duerme!*). Learn the shape once and you'll recognise it everywhere.`,
  },
  'g-yo-go': {
    more: `
## The -go group
Some very common verbs add a **g** only in the yo form: **tengo, vengo, pongo, salgo, hago, digo, traigo, oigo**. The other forms are regular or boot forms: *tengo, tienes, tiene…*

## Other "yo only" quirks
- **-zco** (verbs in -cer / -cir): conozco, conduzco, parezco, ofrezco
- **-oy**: soy, estoy, voy, doy
- **sé** (saber), **veo** (ver), **quepo** (caber)

## Why yo matters so much
The **present subjunctive** is built from the yo form: tengo → **tenga**, hago → **haga**, conozco → **conozca**, digo → **diga**. So do the **negative commands**: *¡No lo hagas!*`,
    logic: `Irregularities **cluster in one place**: if a verb is odd in the yo form, it is usually odd **only there**. And because the yo form is the **root of the subjunctive**, each irregular yo you learn now gives you a whole irregular tense later, for free.`,
  },
  'g-ser-estar': {
    more: `
## Ser = what something is · Estar = how or where it is
| ser | estar |
| identity: *Soy Ana.* | location: *Estoy en casa.* |
| origin: *Es de Chile.* | mood and state: *Está cansado.* |
| job: *Es médica.* | result of a change: *La tienda está cerrada.* |
| characteristics: *Es alto.* | action in progress: *Está comiendo.* |
| time and date: *Son las tres.* | |
| where an event takes place: *La fiesta es en mi casa.* | |

## Same adjective, different meaning
- *Es aburrido* (he's boring) / *Está aburrido* (he's bored)
- *Es listo* (clever) / *Está listo* (ready)
- *Es rico* (rich) / *Está rico* (tasty)
- *Es malo* (a bad person) / *Está malo* (ill)`,
    logic: `Ask one question: **is this the essence, or the current condition or position?** Essence → **ser**. Condition or place → **estar**.

The one trap: **events** (*la fiesta es en…*) use ser even though they have a place. "Taking place" is what an event *is*.`,
  },
  'g-gender': {
    more: `
## Endings that predict gender
| masculine (el) | feminine (la) |
| -o: el libro | -a: la casa |
| -or: el color, el amor | -ción / -sión: la canción |
| -aje: el viaje, el garaje | -dad / -tad: la ciudad, la libertad |
| Greek -ma: el problema, el idioma, el tema | -umbre: la costumbre |

## Exceptions worth knowing
- **la** mano, **la** radio, **la** foto, **la** moto (foto and moto are short for fotografía and motocicleta)
- **el** día, **el** mapa, **el** sofá
- **el** agua, **el** águila: feminine nouns starting with a stressed *a-* take **el** in the singular (but *las aguas*)

## Everything agrees
The article, the noun and the adjective all match: *la casa blanca, los coches rojos, unas ideas buenas*.`,
    logic: `Gender isn't about meaning; **it's mostly the ending**. Learn each noun with **el / la**, and let the ending guide you for new words.

Agreement then follows automatically: **one choice (the noun) decides every word around it**.`,
  },
  'g-gustar': {
    more: `
## Gustar works "backwards"
The thing you like is the **subject**; the person is the **indirect object**. *Me gusta el café* is literally "coffee pleases me".
| me gusta(n) | I like |
| te gusta(n) | you like |
| le gusta(n) | he / she likes, you (usted) like |
| nos gusta(n) | we like |
| os gusta(n) | you all like |
| les gusta(n) | they like |

- One thing, or a verb → **gusta**: *Me gusta bailar.*
- Several things → **gustan**: *Me gustan los perros.*

## Verbs that work the same way
encantar (to love), interesar, doler (to hurt), faltar (to be missing), parecer (to seem), molestar (to bother): *Me duele la cabeza. Nos encanta Madrid.*

## Making le / les clear
Add **a + person** for clarity or emphasis: *A María le gusta el té. A mí me gusta más el café.*`,
    logic: `The verb agrees with **the thing**, not the person, so it's almost always **gusta** or **gustan**. Who likes it is shown by the pronoun in front (me, te, le…). These are the same pronouns you use for "to me / to you".`,
  },
  'g-reflexive': {
    more: `
## The action comes back to the subject
*Lavo el coche* (I wash the car) → *Me lavo* (I wash myself).
| me levanto | nos levantamos |
| te levantas | os levantáis |
| se levanta | se levantan |

## Where does the pronoun go?
- **before** a conjugated verb: *Me ducho a las siete.*
- **attached** to an infinitive or -ando form: *Voy a ducharme. Estoy duchándome.* (or *Me voy a duchar.*)
- **attached** to a positive command: *¡Levántate!*

## Daily-routine verbs
despertarse, levantarse, ducharse, vestirse, peinarse, acostarse, llamarse (*Me llamo…*)

## Reflexive can change the meaning
ir (to go) / **irse** (to leave) · dormir (to sleep) / **dormirse** (to fall asleep) · quedar (to arrange to meet) / **quedarse** (to stay)`,
    logic: `Reflexive pronouns are just the object pronouns, except that the 3rd person becomes **se**. They follow the **same placement rule as every object pronoun**: before the conjugated verb, or glued to the end of an infinitive, an -ando form or a positive command.`,
  },
  'g-cognates': {
    more: `
## Reliable English → Spanish patterns
| English | Spanish | example |
| -tion | -ción | nation → nación |
| -ty | -dad | city → ciudad, university → universidad |
| -ous | -oso | famous → famoso |
| -ly | -mente | rapidly → rápidamente |
| -ist | -ista | artist → artista |
| -ic | -ico | electric → eléctrico |
| s + consonant | es- | student → estudiante, Spain → España |

## False friends
- **embarazada** = pregnant (embarrassed = avergonzado)
- **éxito** = success (exit = salida)
- **actual** = current (actual = real)
- **librería** = bookshop (library = biblioteca)
- **constipado** = having a cold`,
    logic: `Thousands of Spanish words share a Latin root with English, especially "educated" English words. **Learn the ending swaps once** and you can unlock words you've never seen. Just keep a short list of false friends.`,
  },
  'g-preterite-regular': {
    more: `
## The endings
| | hablar | comer / vivir |
| yo | habl**é** | com**í** / viv**í** |
| tú | habl**aste** | com**iste** |
| él | habl**ó** | com**ió** |
| nosotros | habl**amos** | com**imos** / viv**imos** |
| vosotros | habl**asteis** | com**isteis** |
| ellos | habl**aron** | com**ieron** |

- -er and -ir verbs share **all** preterite endings.
- The accent matters: *hablo* (I speak) / *habló* (he spoke).
- Nosotros is the same as the present (*hablamos*); time words make it clear: *Ayer hablamos.*

## Spelling changes in yo (the sound stays the same)
-car → **-qué** (busqué), -gar → **-gué** (llegué), -zar → **-cé** (empecé)

## Typical time words
ayer, anoche, la semana pasada, el año pasado, en 2019, hace dos días`,
    logic: `The preterite is for **completed events** you can count or place on a timeline. Regular forms are **stressed on the ending** (ha-BLÓ, co-MIÓ), and that stress is what separates the past from the present (HA-blo).`,
  },
  'g-preterite-irregular': {
    more: `
## Stem families with the same endings and no accents
| family | stems | examples |
| u-stems | tuv-, estuv-, pud-, pus-, sup-, anduv- | tuve, tuvo |
| i-stems | quis-, hic-, vin- | quise, hizo, vino |
| j-stems | dij-, traj-, conduj- | dije, dijo, dijeron |
All of them use **-e, -iste, -o, -imos, -isteis, -ieron**, with no written accent. j-stems drop the i in *-eron*: dijeron.

## The essential four
- **ser** and **ir** are identical: fui, fuiste, fue, fuimos, fuisteis, fueron (*Fui a Roma. Fue increíble.*)
- **dar** takes -er endings: di, diste, dio
- **ver**: vi, viste, vio

## -ir boot verbs change in the 3rd person
pedir → p**i**dió, p**i**dieron · dormir → d**u**rmió, d**u**rmieron`,
    logic: `Irregular preterites come in **families**: one new stem plus one shared set of endings, always without accents. Learn the stem (tuv-, hic-, dij-) and the rest is automatic.`,
  },
  'g-imperfect': {
    more: `
## The easiest tense
| | hablar | comer / vivir |
| yo | habl**aba** | com**ía** |
| tú | habl**abas** | com**ías** |
| él | habl**aba** | com**ía** |
| nosotros | habl**ábamos** | com**íamos** |
| vosotros | habl**abais** | com**íais** |
| ellos | habl**aban** | com**ían** |
Only three verbs are irregular: **ser** (era), **ir** (iba), **ver** (veía).

## When to use it
- **habits** in the past: *De niño jugaba al fútbol.* (I used to play)
- **descriptions and background**: *Hacía sol y había mucha gente.*
- **age and time**: *Tenía diez años. Eran las ocho.*
- **actions in progress**: *Leía cuando llamaste.*`,
    logic: `The imperfect is the **"camera keeps rolling"** tense: no start or end in view. It sets the scene, describes and repeats. The preterite then puts single events into that scene.`,
  },
  'g-pret-vs-imp': {
    more: `
## The film metaphor
- **Imperfect** = the background, the scenery: what was going on
- **Preterite** = what happens on stage: the event
*Llovía* (scene) *cuando salí* (event).

## Signal words
| preterite | imperfect |
| ayer, de repente, una vez, el lunes | siempre, cada día, a menudo, mientras |
| tres veces, en 2010 | de niño, antes, normalmente |

## Verbs that change meaning
- conocí (I **met**) / conocía (I **knew**)
- supe (I **found out**) / sabía (I **knew**)
- quise (I **tried**) / quería (I **wanted**)
- no pude (I **failed**) / no podía (I **wasn't able**)`,
    logic: `Ask: do you see the action as **one whole, finished event** (preterite), or as something **ongoing, repeated or descriptive** (imperfect)?

The same fact can take either, depending on the angle: *Fui a la playa* (a trip) / *Iba a la playa* (I used to go).`,
  },
  'g-perfect': {
    more: `
## haber + participle
**he, has, ha, hemos, habéis, han** + hablado / comido / vivido

Irregular participles: **hecho, dicho, visto, escrito, puesto, vuelto, abierto, roto, muerto**.

## When Spain uses it
- a time period that isn't over: *Hoy he trabajado mucho. Este año he viajado poco.*
- experiences, "ever / never": *¿Has estado en México? Nunca he comido sushi.*
Most of Latin America uses the preterite much more often (*Hoy trabajé mucho.*). Both are correct.

## Pronouns go before haber
*Lo he visto. Me he levantado tarde.* Nothing ever goes between haber and the participle.`,
    logic: `The perfect **connects the past to now**: the time period isn't over yet, or the experience still counts. It works like English "have done", and the participle **never changes its ending** after haber.`,
  },
  'g-por-para': {
    more: `
## para → towards a goal
- purpose: *Estudio para aprender.*
- recipient: *Es para ti.*
- destination: *Salgo para Madrid.*
- deadline: *para el lunes*
- opinion: *Para mí, es fácil.*

## por → cause, route, exchange
- reason or cause: *Gracias por la ayuda. Lo hago por ti.* (because of you, or on your behalf)
- through or along: *Paseamos por el parque.*
- exchange or price: *Lo compré por 10 euros.*
- part of the day, rough duration: *por la mañana, por dos horas*
- means: *por teléfono, por email*
- who did it (passive): *escrito por Cervantes*`,
    logic: `Picture an arrow. **Para** points **forward** to a goal: where it goes, what it's for, who gets it. **Por** looks **back or through**: the cause, the route, the exchange.

*Lo hago para ti* (it's a present for you) / *Lo hago por ti* (because of you, or instead of you).`,
  },
  'g-pronouns': {
    more: `
## Direct and indirect pronouns
| | direct (what / whom) | indirect (to whom) |
| me | me | me |
| you | te | te |
| him / her / it / you (usted) | lo, la | le |
| us | nos | nos |
| you all | os | os |
| them | los, las | les |

## Order and the "se" swap
The indirect pronoun comes first: *Te lo doy.* When two 3rd-person pronouns meet, **le / les becomes se**: *Se lo doy* (I give it to him). Never *le lo*.

## Placement: one rule everywhere
- **before** a conjugated verb: *Lo veo. No se lo digas.*
- **attached** to an infinitive, an -ando form or a positive command: *Quiero verlo. Estoy leyéndolo. ¡Dámelo!*`,
    logic: `**One placement rule** covers every object and reflexive pronoun: before the conjugated verb, or glued to the end of an infinitive, gerund or positive command. The order is always **person before thing** (te lo, se la).`,
  },
  'g-future': {
    more: `
## One stem, two tenses
The future and the conditional both add endings to the **whole infinitive**:
| | future | conditional |
| yo | hablar**é** | hablar**ía** |
| tú | hablar**ás** | hablar**ías** |
| él | hablar**á** | hablar**ía** |
| nosotros | hablar**emos** | hablar**íamos** |
| vosotros | hablar**éis** | hablar**íais** |
| ellos | hablar**án** | hablar**ían** |

## The 12 irregular stems, shared by both
- a **d** slips in: tendr-, vendr-, pondr-, saldr-, valdr-
- the vowel drops: podr-, sabr-, cabr-, habr-, querr-
- short forms: har-, dir-

## Uses
- plans and predictions: *Mañana lloverá.* (In speech, *ir a + infinitive* is more common.)
- guesses about now: *Serán las tres.* (It's probably three.)
- conditional: polite requests and "would": *¿Podrías ayudarme? Yo iría.*`,
    logic: `Learn an irregular stem once and you get **two tenses**: *tendré* and *tendría*. And the conditional endings are exactly the **imperfect -er/-ir endings** (-ía, -ías…) stuck on the infinitive.`,
  },
  'g-subj-form': {
    more: `
## The vowel swap
Take the **yo form** of the present, drop the **-o**, and swap the vowel family:
| | -ar → e | -er / -ir → a |
| yo | habl**e** | com**a** / viv**a** |
| tú | habl**es** | com**as** |
| él | habl**e** | com**a** |
| nosotros | habl**emos** | com**amos** |
| vosotros | habl**éis** | com**áis** |
| ellos | habl**en** | com**an** |

## An irregular yo gives an irregular subjunctive
tengo → **tenga**, hago → **haga**, digo → **diga**, conozco → **conozca**, salgo → **salga**

## The six true irregulars
ser → **sea**, estar → **esté**, ir → **vaya**, saber → **sepa**, haber → **haya**, dar → **dé**`,
    logic: `The subjunctive is the **"opposite vowel"** mood: -ar verbs borrow **e**, -er/-ir verbs borrow **a**. Because it's built from yo, it **inherits yo's irregularities**: -go verbs, -zco verbs and boot verbs all carry over.`,
  },
  'g-subj-use': {
    more: `
## The WEIRDO triggers
- **W**ishes: *Quiero que vengas.*
- **E**motions: *Me alegra que estés aquí.*
- **I**mpersonal expressions: *Es importante que estudies.*
- **R**ecommendations: *Te recomiendo que descanses.*
- **D**oubt and denial: *Dudo que llueva. No creo que sea verdad.*
- **O**jalá: *Ojalá haga sol.*

## Two subjects linked by que
The subjunctive appears in the second part **when the subject changes**: *Quiero ir* (I want to go) but *Quiero que **tú** vayas* (I want you to go).

## Certainty takes the indicative
*Creo que **es** verdad* / *No creo que **sea** verdad*. *Cuando **llegues*** (future, not real yet) / *Cuando **llego*** (a habit).`,
    logic: `The **indicative states facts**. The **subjunctive marks what is not presented as fact**: wished, felt, doubted, not yet real. If the second half is something the speaker reports as true → indicative; if it's coloured by the first half → subjunctive.`,
  },
  'g-imperative': {
    more: `
## Positive tú: the él form of the present
*habla, come, escribe*. Eight short irregulars: **di, haz, ve, pon, sal, sé, ten, ven**.

## Everything else is the subjunctive
| | positive | negative |
| tú | habla | no hables |
| usted | hable | no hable |
| nosotros | hablemos | no hablemos |
| vosotros | hablad | no habléis |
| ustedes | hablen | no hablen |

## Pronouns
**Attached** to positive commands, with an accent to keep the stress: *Dímelo. Siéntate.* **Before** negative ones: *No me lo digas. No te sientes.*`,
    logic: `Only the **positive tú and vosotros** commands have their own forms. **Every other command, and every negative one, is the present subjunctive.** Learn the subjunctive and you already know most commands.`,
  },
  'g-comparisons': {
    more: `
## More and less
**más** + adjective + **que**: *Madrid es más grande que Toledo.*
**menos** + adjective + **que**: *Es menos caro que el otro.*
With numbers use **de**: *más de diez personas*.

## As … as
**tan** + adjective + **como**: *Es tan alto como su padre.*
**tanto / tanta / tantos / tantas** + noun + **como**: *Tengo tantos libros como tú.*

## Irregular forms
bueno → **mejor** · malo → **peor** · grande (age) → **mayor** · pequeño (age) → **menor**

## The superlative
**el / la / los / las + más** + adjective (+ de): *Es la ciudad más bonita de España.*
**-ísimo** means "very, extremely": *carísimo, buenísimo, facilísimo*`,
    logic: `Spanish compares with three building blocks: **más / menos / tan** + the word + **que / como**. The superlative is just the comparative with an **article** in front: *el más alto* = the tallest.`,
  },
};

/** The overview lesson: the few ideas the whole Spanish grammar is built on. */
export const BIG_PICTURE_ES: GrammarLesson = {
  id: 'g-big-picture', level: 'A1', title: 'The big picture: 7 patterns behind Spanish', titleEs: 'La gramática en 7 ideas',
  summary: 'Start here: the few ideas that explain most Spanish grammar.',
  blocks: [
    { t: 'text', md: `
## 1. Stem + ending
A verb is a **stem** (the meaning) plus an **ending** (who and when). Every tense is a new set of endings on the same stem. Because the ending says who, **pronouns are optional**: *Hablo* = I speak.

## 2. The person code
**-s** = you, **-mos** = we, **-is** = you all, **-n** = they, in almost every tense.

## 3. Stress drives the changes
Boot verbs (qu**ie**ro, p**ue**do) change only where the vowel is stressed. Accent marks show stress that breaks the normal rules: habló, café.

## 4. One noun decides
Gender comes mostly from the ending (-o / -a, -ción, -dad…), and **article, noun and adjective all agree**: *las casas blancas*.

## 5. The yo form is a root
Irregular yo forms (tengo, hago, conozco) pass straight into the **subjunctive** (tenga, haga, conozca) and the negative commands.

## 6. One rule for pronoun placement
Object and reflexive pronouns go **before the conjugated verb**, or **glued to the end** of an infinitive, -ando form or positive command: *Lo veo. Quiero verlo. ¡Dímelo!*

## 7. Two ways of seeing
Spanish often splits one English idea in two, depending on how you see it:
- **ser** (what it is) / **estar** (how or where it is)
- **preterite** (a finished event) / **imperfect** (ongoing, background, habit)
- **indicative** (fact) / **subjunctive** (wish, feeling, doubt)
- **por** (cause, route) / **para** (goal)` },
    { t: 'tip', md: 'When a rule looks new, ask which of these 7 ideas it belongs to. It almost always fits one of them.' },
  ],
  practice: {
    choice: [
      { q: 'Which ending means “we” in every tense?', options: ['-mos', '-n', '-s'], answer: 0 },
      { q: 'Why does poder become “puedo”?', options: ['The o is stressed', 'It is plural', 'It is a past form'], answer: 0 },
      { q: 'The present subjunctive is built from which form?', options: ['yo', 'él', 'the infinitive'], answer: 0 },
      { q: 'Hoy ___ muy cansado.', options: ['estoy', 'soy', 'tengo'], answer: 0 },
      { q: 'Quiero ___ mañana. (to see it)', options: ['verlo', 'lo ver', 'ver le'], answer: 0 },
      { q: 'Las casas son muy ___.', options: ['bonitas', 'bonita', 'bonitos'], answer: 0 },
    ],
  },
};

/** Adds the detailed section and the logic box to each lesson, before its "common mistakes". */
export function deepen(lessons: GrammarLesson[], deep: Record<string, { more?: string; logic: string }>): GrammarLesson[] {
  return lessons.map((l) => {
    const d = deep[l.id];
    if (!d) return l;
    const extra: LessonBlock[] = [...(d.more ? [{ t: 'text' as const, md: d.more }] : []), { t: 'logic', md: d.logic }];
    const at = l.blocks.findIndex((b) => b.t === 'mistakes');
    const blocks = at < 0 ? [...l.blocks, ...extra] : [...l.blocks.slice(0, at), ...extra, ...l.blocks.slice(at)];
    return { ...l, blocks };
  });
}
