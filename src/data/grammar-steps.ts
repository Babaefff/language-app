import type { GrammarLesson, LessonBlock } from './types';

/**
 * Step-by-step fixes: forms a lesson relies on are shown (with their logic) before they are used,
 * and lessons are ordered so that nothing is needed before it has been taught.
 * Blocks are inserted right after a lesson's introduction, or open the lesson when they start with "## First".
 */
export const STEPS_ES: Record<string, LessonBlock[]> = {
  'g-ser-estar': [
    { t: 'text', md: `
## First, the forms
You need both verbs from day one, so learn them as a pair.
- **ser** is completely irregular, like English "to be" (am / are / is). But look at the ends: it still keeps the person code: so**mos**, so**n**, ere**s**.
- **estar** is simply a **regular -ar verb** on the stem **est-**, with two small quirks: the yo form is **estoy** (like soy, voy, doy), and the stress is always on the ending, which is why it has accents: est**á**s, est**á**, est**á**n.` },
    { t: 'table', verbs: ['ser', 'estar'], tense: 'presente', caption: 'ser and estar in the present' },
  ],
  'g-yo-go': [
    { t: 'table', verbs: ['tener', 'venir', 'decir'], tense: 'presente', caption: '-go in yo, and also boot verbs: tener / venir e → ie, decir e → i' },
    { t: 'text', md: `
## ir, dar, ver: tiny but everywhere
**ir** (to go) looks wild, but it's just **v- + the -ar endings**: voy, vas, va, vamos, vais, van. It's the verb in "going to": **ir a + infinitive**.
**dar** (to give) and **ver** (to see) are regular apart from their yo forms: **doy**, **veo**.` },
    { t: 'table', verbs: ['ir', 'dar', 'ver'], tense: 'presente', caption: 'ir, dar, ver' },
  ],
  'g-gustar': [
    { t: 'text', md: `
## First: the "to whom" pronouns
gustar always comes with one of these short words, meaning "to me, to you, to him…": **me, te, le, nos, os, les**. They tell you **who** likes something. The verb itself then only needs two forms: **gusta** (one thing) and **gustan** (several things).` },
  ],
  'g-preterite-irregular': [
    { t: 'table', verbs: ['ser', 'ir'], tense: 'preterito', caption: 'ser and ir share the same preterite: fui, fuiste, fue…' },
    { t: 'table', verbs: ['hacer', 'decir'], tense: 'preterito', caption: 'An i-stem (hic-) and a j-stem (dij-): no accents, and dij- takes -eron' },
  ],
  'g-imperfect': [
    { t: 'table', verbs: ['ser', 'ir', 'ver'], tense: 'imperfecto', caption: 'The only three irregular verbs in the imperfect' },
  ],
  'g-pret-vs-imp': [
    { t: 'text', md: `
## Both sets of forms side by side
You already know both tenses from the previous lessons; this lesson is only about **choosing** between them.
| | preterite: one event | imperfect: background, habit |
| hablar | hablé, hablaste, habló | hablaba, hablabas, hablaba |
| comer | comí, comiste, comió | comía, comías, comía |
| ser | fui, fuiste, fue | era, eras, era |
| tener | tuve, tuviste, tuvo | tenía, tenías, tenía |` },
  ],
  'g-perfect': [
    { t: 'text', md: `
## First: the helper haber
**haber** is only used to build tenses; to *have* something is **tener**. Its present is short and must be learned: **he, has, ha, hemos, habéis, han**. Then add the participle: **-ar → -ado** (hablado), **-er / -ir → -ido** (comido, vivido).` },
  ],
  'g-subj-form': [
    { t: 'table', verbs: ['ser', 'ir', 'estar'], tense: 'subjuntivo', caption: 'Three of the six true irregulars: sea, vaya, esté' },
  ],
  'g-imperative': [
    { t: 'table', verbs: ['decir', 'hacer', 'tener'], tense: 'imperativo', caption: 'Irregular tú commands: di, haz, ten. The rest is the subjunctive' },
  ],
};

export const STEPS_DE: Record<string, LessonBlock[]> = {
  'de-g-negation': [
    { t: 'text', md: `
## kein in every case
kein takes **exactly the same endings as ein**; in the plural it ends like **die**.
| | masculine | feminine | neuter | plural |
| nominative | kein | keine | kein | keine |
| accusative | **keinen** | keine | kein | keine |
| dative | keinem | keiner | keinem | keinen |
For now you only need the first two rows; the dative comes in A2.` },
  ],
  'de-g-modals': [
    { t: 'text', md: `
## wissen works like a modal
**wissen** (to know a fact) is not a modal verb, but it is conjugated like one: no ending for ich and er, and a different vowel in the singular. Compare it with **kennen**, which means to know a person or place.
- *Ich weiß es.*
- *Ich kenne Berlin.*` },
    { t: 'table', verbs: ['wissen'], tense: 'presente', caption: 'wissen: ich weiß, du weißt, er weiß' },
  ],
  'de-g-perfekt': [
    { t: 'text', md: `
## You already know the helpers
The Perfekt uses **haben** or **sein** from the lesson "sein and haben", conjugated as usual in position 2: *ich habe, du hast, er hat…* or *ich bin, du bist, er ist…*. Only the participle at the end is new.` },
  ],
  'de-g-reflexive': [
    { t: 'text', md: `
## A whole reflexive verb: sich freuen
The verb is conjugated normally; the pronoun is simply added after it.
| ich freue **mich** | wir freuen **uns** |
| du freust **dich** | ihr freut **euch** |
| er / sie / es freut **sich** | sie / Sie freuen **sich** |` },
  ],
  'de-g-passive': [
    { t: 'text', md: `
## Nothing new to conjugate
You already know **werden** from the future lesson (ich werde, du wirst, er wird). The passive uses the same verb. The only new forms are the past, **wurde**, and the participle **worden**.` },
    { t: 'table', verbs: ['werden'], tense: 'preterito', caption: 'werden in the past: wurde, wurdest, wurde…' },
  ],
};

/** Lesson order where it differs from the files: basics before the lessons that use them. */
export const ORDER_ES = ['g-big-picture', 'g-stem-ending', 'g-person-code', 'g-ser-estar', 'g-gender', 'g-boot', 'g-yo-go', 'g-gustar', 'g-reflexive', 'g-cognates'];
export const ORDER_DE = ['de-g-big-picture', 'de-g-verbs', 'de-g-sein-haben', 'de-g-gender', 'de-g-plural', 'de-g-vowel', 'de-g-word-order', 'de-g-accusative', 'de-g-negation', 'de-g-separable', 'de-g-modals', 'de-g-perfekt'];

/** Inserts the step blocks after each lesson's introduction and applies the order. */
export function withSteps(lessons: GrammarLesson[], steps: Record<string, LessonBlock[]>, order: string[]): GrammarLesson[] {
  const out = lessons.map((l) => {
    const add = steps[l.id];
    if (!add) return l;
    // A step titled "## First…" teaches the forms, so it opens the lesson; others follow the introduction.
    const first = add[0].t === 'text' && /^\s*## First/.test(add[0].md);
    return { ...l, blocks: first ? [...add, ...l.blocks] : [l.blocks[0], ...add, ...l.blocks.slice(1)] };
  });
  const rank = (id: string) => { const i = order.indexOf(id); return i < 0 ? order.length : i; };
  // Stable: lessons named in the order list come first in that order; the rest keep their place.
  return out.map((l, i) => ({ l, i })).sort((a, b) => (rank(a.l.id) - rank(b.l.id)) || (a.i - b.i)).map((x) => x.l);
}
