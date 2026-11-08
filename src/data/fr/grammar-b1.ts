import type { GrammarLesson } from '../types';
import { ex, q } from './registry';

/** French B1 grammar, in the order of the B1 units. */
export const GRAMMAR_FR_B1: GrammarLesson[] = [
  {
    id: 'fr-g-futur', level: 'B1', title: 'The futur simple', titleEs: 'Le futur simple',
    summary: 'The infinitive + the endings of avoir: je parlerai.',
    blocks: [
      { t: 'text', md: `
## Built from what you know
**Stem** = the infinitive (-re verbs drop their e). **Endings** = the present of *avoir*: -ai, -as, -a, -ons, -ez, -ont.` },
      { t: 'table', verbs: ['parler', 'finir', 'prendre'], tense: 'futuro', caption: 'Regular futures: infinitive + ai, as, a, ons, ez, ont' },
      { t: 'text', md: `
## Irregular stems (the endings never change)
| être → **ser-** | avoir → **aur-** | aller → **ir-** |
| faire → **fer-** | venir → **viendr-** | voir → **verr-** |
| pouvoir → **pourr-** | vouloir → **voudr-** | devoir → **devr-** |
| savoir → **saur-** | | |

Every future stem ends in **r**: that's the sound of the future. *acheter → j'achèterai* keeps the è of *j'achète*.

## When to use it
- predictions and plans further away: ${ex('Un jour, je parlerai couramment.', 'One day I will speak fluently.')}
- after **quand** for a future action: ${ex('Quand je serai à Paris, je visiterai le Louvre.', "When I'm in Paris, I'll visit the Louvre.")}` },
      { t: 'table', verbs: ['être', 'avoir', 'aller', 'faire'], tense: 'futuro', caption: 'The four most common irregular stems' },
      { t: 'logic', md: `The French future is literally **"I have to speak"**: *parler + ai* (I have). That is why the endings are the present of *avoir*, and why every stem is an infinitive-like form ending in **r**. Spanish built its future the same way (*hablar + é*).` },
      { t: 'mistakes', items: [['Quand je suis à Paris, je visiterai…', 'Quand je serai à Paris, je visiterai…', 'After quand, a future action takes the future.'], ['Je allerai.', "J'irai.", 'aller → ir-.'], ['Je prendreai.', 'Je prendrai.', '-re verbs drop their e.']] },
    ],
    practice: {
      conj: { verbs: ['parler', 'finir', 'prendre', 'être', 'avoir', 'aller', 'faire', 'venir', 'pouvoir', 'voir'], tenses: ['futuro'], count: 12 },
      choice: [
        q("L'année prochaine, nous ___ en Italie.", ['irons', 'allerons', 'allons irons'], 'aller has the irregular stem ir-: nous irons.', 'Next year we will go to Italy.'),
        q('Demain, il ___ beau.', ['fera', 'faira', 'fait'], 'faire → fer-: il fera.', 'Tomorrow the weather will be nice.'),
        q('Quand tu ___ grand, tu comprendras.', ['seras', 'es', 'serais'], 'After quand, a future action takes the future: tu seras.', 'When you are older, you will understand.'),
        q('Je ___ le train de 8 heures.', ['prendrai', 'prendreai', 'prenderai'], '-re verbs drop their final e before the endings: prendr-ai.', 'I will take the 8 o\'clock train.'),
        q('Vous ___ venir ?', ['pourrez', 'pouverez', 'pourez'], 'pouvoir → pourr- (two r): vous pourrez.', 'Will you be able to come?'),
      ],
    },
  },
  {
    id: 'fr-g-conditionnel', level: 'B1', title: 'The conditionnel', titleEs: 'Le conditionnel',
    summary: 'Future stem + imparfait endings: would, could, should.',
    blocks: [
      { t: 'text', md: `
## Two things you already know
The **future stem** (parler-, ser-, aur-, fer-, pourr-…) + the **imparfait endings** (-ais, -ais, -ait, -ions, -iez, -aient).` },
      { t: 'table', verbs: ['aimer', 'être', 'pouvoir'], tense: 'condicional', caption: 'Conditionnel: future stem + imparfait endings' },
      { t: 'text', md: `
## Politeness
${ex('Je voudrais un renseignement.', "I'd like some information.")} · ${ex('Pourriez-vous fermer la fenêtre ?', 'Could you close the window?')} · ${ex('Vous auriez un stylo ?', 'Would you have a pen?')}

## Advice: devoir in the conditionnel
${ex('Tu devrais appeler le médecin.', 'You should call the doctor.')} · **À ta place, j'irais…** (If I were you, I'd go…)

## Wishes and dreams
${ex("J'aimerais apprendre le piano.", "I'd like to learn the piano.")} · ${ex('Ce serait parfait.', 'That would be perfect.')}

## Future or conditionnel? Listen to the end
*je parlerai* (will, said "ré") / *je parlerais* (would, said "rè"). The written s makes the difference.` },
      { t: 'logic', md: `The conditionnel is "the future seen from the past": it takes the **future's stem** and the **imparfait's endings**. Once you know those two, there is nothing new to learn, not even for irregular verbs: *je serai → je serais, j'irai → j'irais*.` },
      { t: 'mistakes', items: [['Je voulais un café, s\'il vous plaît.', 'Je voudrais un café, s\'il vous plaît.', 'Politeness uses the conditionnel: voudr- + ais.'], ['Tu devrais de dormir.', 'Tu devrais dormir.', 'No de after devoir.'], ['Ce sera génial si tu venais.', 'Ce serait génial si tu venais.', 'An imagined situation: conditionnel.']] },
    ],
    practice: {
      conj: { verbs: ['aimer', 'vouloir', 'pouvoir', 'devoir', 'être', 'avoir', 'faire', 'aller'], tenses: ['condicional'], count: 12 },
      choice: [
        q('___-vous m\'aider, s\'il vous plaît ?', ['Pourriez', 'Pouvriez', 'Pourrez'], 'A polite request: pouvoir → pourr- + iez.', 'Could you help me, please?'),
        q('Tu ___ te reposer.', ['devrais', 'devras', 'doives'], 'Advice: devoir in the conditionnel, tu → devrais.', 'You should rest.'),
        q("J'___ visiter le Japon.", ['aimerais', 'aimerai', 'aimais'], 'A wish: aimer in the conditionnel, j\'aimerais.', "I'd like to visit Japan."),
        q('À ta place, je ___ le bus.', ['prendrais', 'prendrai', 'prenais'], 'À ta place + conditionnel: je prendrais.', "If I were you, I'd take the bus."),
        q('Ce ___ formidable !', ['serait', 'sera', 'soit'], 'An imagined situation: être in the conditionnel, ce serait.', 'That would be wonderful!'),
      ],
    },
  },
  {
    id: 'fr-g-si', level: 'B1', title: 'If-sentences: si', titleEs: 'Les phrases avec si',
    summary: 'si + present → future; si + imparfait → conditionnel.',
    blocks: [
      { t: 'text', md: `
## Two patterns
| | si-part | main part |
| real, possible | si + **present** | **future** (or present, imperative) |
| imagined, unreal | si + **imparfait** | **conditionnel** |

- ${ex("Si tu viens, on ira au cinéma.", "If you come, we'll go to the cinema.")}
- ${ex("Si j'avais le temps, j'apprendrais le chinois.", "If I had time, I'd learn Chinese.")}
- ${ex("Si j'étais toi, je partirais.", "If I were you, I'd leave.")}

## The golden rule
**No future and no conditionnel right after si.** *Si je serais* is the most famous French mistake, even among the French.

## The parts can swap
${ex("On ira au cinéma si tu viens.", "We'll go to the cinema if you come.")} The tenses stay with their part.

## si + il → s'il
*s'il pleut, s'ils viennent*, but *si elle vient* (only i is dropped before i).` },
      { t: 'logic', md: `The **si-part** is always one step "further back" than the main part: present → future, imparfait → conditionnel. It's the same logic as English (*if I had* → *I would*), and the same as Spanish *si tuviera* → *haría*, but French uses the familiar imparfait instead of a special subjunctive.` },
      { t: 'mistakes', items: [["Si j'aurais de l'argent…", "Si j'avais de l'argent…", 'Never the conditionnel after si.'], ["S'il pleuvra, je resterai.", "S'il pleut, je resterai.", 'Never the future after si.'], ['Si il vient…', "S'il vient…", 'si + il → s\'il.']] },
    ],
    practice: {
      choice: [
        q("S'il fait beau demain, nous ___ à la plage.", ['irons', 'irions', 'allions'], 'Real condition (si + present) → future: nous irons.', "If the weather is nice tomorrow, we'll go to the beach."),
        q("Si j'___ riche, j'achèterais une maison.", ['étais', 'serais', 'suis'], 'Imagined condition → si + imparfait: j\'étais.', "If I were rich, I'd buy a house."),
        q("Si tu travaillais plus, tu ___ ton examen.", ['réussirais', 'réussiras', 'réussis'], 'si + imparfait → conditionnel: tu réussirais.', "If you worked more, you'd pass your exam."),
        q("___ pleut, je prendrai un parapluie.", ["S'il", 'Si il', 'Si'], 'si + il always contracts: s\'il.', "If it rains, I'll take an umbrella."),
        q("Que ferais-tu si tu ___ au loto ?", ['gagnais', 'gagnerais', 'gagnes'], 'The main part is conditionnel, so the si-part is imparfait: gagnais.', 'What would you do if you won the lottery?'),
      ],
    },
  },
  {
    id: 'fr-g-subj-form', level: 'B1', title: 'Forming the subjonctif', titleEs: 'La formation du subjonctif',
    summary: 'From the ils form: ils prennent → que je prenne.',
    blocks: [
      { t: 'text', md: `
## Two stems you already know
- **je, tu, il, ils**: the **ils** form of the present, minus -ent: *ils prennent → que je prenn**e***
- **nous, vous**: like the **imparfait**: *que nous pren**ions**, que vous pren**iez***

Endings: **-e, -es, -e, -ions, -iez, -ent**. It is always written after **que**.` },
      { t: 'table', verbs: ['parler', 'finir', 'prendre'], tense: 'subjuntivo', caption: 'Regular subjonctif: ils stem + e, es, e, ions, iez, ent' },
      { t: 'text', md: `
For *-er* verbs, je / tu / il / ils look exactly like the present: *que je parle*. You only notice the subjonctif in irregular verbs and with nous / vous.

## The seven true irregulars` },
      { t: 'table', verbs: ['être', 'avoir', 'aller', 'faire'], tense: 'subjuntivo', caption: 'être, avoir, aller, faire' },
      { t: 'table', verbs: ['pouvoir', 'savoir', 'vouloir'], tense: 'subjuntivo', caption: 'pouvoir, savoir, vouloir' },
      { t: 'logic', md: `Again the stress logic: the forms stressed on the stem (je, tu, il, ils) use the **ils** stem (*viennent → vienne, boivent → boive*); the forms stressed on the ending (nous, vous) use the unstressed **nous** stem (*venions, buvions*). Irregular verbs follow it too: only seven break it.` },
      { t: 'mistakes', items: [['que je prends', 'que je prenne', 'From ils prennent: prenn- + e.'], ['que nous prennions', 'que nous prenions', 'nous uses the nous stem: pren-.'], ['que je suis', 'que je sois', 'être is irregular: sois.']] },
    ],
    practice: {
      conj: { verbs: ['parler', 'finir', 'prendre', 'venir', 'boire', 'être', 'avoir', 'aller', 'faire', 'pouvoir'], tenses: ['subjuntivo'], count: 12 },
      choice: [
        q('Il faut que tu ___ ce livre.', ['lises', 'lis', 'lisais'], 'From ils lisent → lis- + es: que tu lises.', 'You must read this book.'),
        q('Je veux que vous ___ à l\'heure.', ['soyez', 'êtes', 'soiez'], 'être is irregular: que vous soyez.', 'I want you to be on time.'),
        q('Il faut que nous ___ maintenant.', ['partions', 'partons', 'partiions'], 'nous uses the nous stem + -ions: que nous partions.', 'We must leave now.'),
        q('Il faut que j\'___ à la banque.', ['aille', 'alle', 'vais'], 'aller is irregular: que j\'aille.', 'I have to go to the bank.'),
        q('Je veux qu\'il ___ ses devoirs.', ['fasse', 'fait', 'faise'], 'faire is irregular: qu\'il fasse.', 'I want him to do his homework.'),
      ],
    },
  },
  {
    id: 'fr-g-subj-use', level: 'B1', title: 'When to use the subjonctif', titleEs: 'L’emploi du subjonctif',
    summary: 'Wishes, necessity, feelings, doubt: two subjects joined by que.',
    blocks: [
      { t: 'text', md: `
## The trigger + que + a second person
| wish | vouloir que, souhaiter que, aimer que | ${ex('Je veux que tu restes.', 'I want you to stay.')} |
| necessity | il faut que, il est important que | ${ex('Il faut que tu dormes.', 'You need to sleep.')} |
| feeling | être content / triste que, avoir peur que | ${ex('Je suis content que tu sois là.', "I'm glad you're here.")} |
| doubt | je ne pense pas que, je doute que | ${ex('Je doute qu\'il vienne.', 'I doubt he will come.')} |
| some conjunctions | pour que, bien que, avant que | ${ex('Je parle lentement pour que tu comprennes.', 'I speak slowly so that you understand.')} |

## Not after certainty
**je pense que, je crois que, je suis sûr que, il est vrai que** + indicative: ${ex('Je crois qu\'il a raison.', 'I think he is right.')}
Negative or question turns doubt on: ${ex('Je ne crois pas qu\'il ait raison.', "I don't think he's right.")}

## One subject → infinitive
${ex('Je veux partir.', 'I want to leave.')} (not *que je parte*) · ${ex('Je suis content de te voir.', "I'm glad to see you.")}` },
      { t: 'logic', md: `The subjonctif marks a verb that is **not presented as a fact**: something wanted, needed, feared or doubted. Same idea as the Spanish subjunctive (*quiero que vengas*). The quick test: **two different people + a wish, a need, a feeling or a doubt** → subjonctif.` },
      { t: 'mistakes', items: [['Je veux que je parte.', 'Je veux partir.', 'One subject: use the infinitive.'], ["Je pense qu'il soit malade.", "Je pense qu'il est malade.", 'je pense que (certainty) + indicative.'], ['Il faut que tu fais attention.', 'Il faut que tu fasses attention.', 'il faut que + subjonctif.']] },
    ],
    practice: {
      choice: [
        q('Je veux que tu ___ avec moi.', ['viennes', 'viens', 'venir'], 'A wish for someone else: vouloir que + subjonctif.', 'I want you to come with me.'),
        q("Je pense qu'il ___ raison.", ['a', 'ait', 'avoir'], 'je pense que expresses certainty: indicative.', 'I think he is right.'),
        q("Je ne pense pas qu'il ___ raison.", ['ait', 'a', 'aura'], 'Negative opinion = doubt: subjonctif.', "I don't think he's right."),
        q('Je veux ___ en France.', ['vivre', 'que je vive', 'vive'], 'One subject: infinitive, not que + subjonctif.', 'I want to live in France.'),
        q("Bien qu'il ___ froid, je sors.", ['fasse', 'fait', 'fera'], 'bien que always takes the subjonctif.', "Although it's cold, I'm going out."),
        q('Je suis triste que tu ___.', ['partes', 'pars', 'partir'], 'A feeling about someone else: subjonctif.', "I'm sad that you're leaving."),
      ],
    },
  },
  {
    id: 'fr-g-relatives', level: 'B1', title: 'qui, que, où, dont', titleEs: 'Les pronoms relatifs',
    summary: 'Joining two sentences: the man who…, the book that…, the town where…',
    blocks: [
      { t: 'text', md: `
## Four words to join sentences
- **qui** = subject: ${ex("J'ai un ami. Il habite à Rome. → J'ai un ami qui habite à Rome.", 'I have a friend who lives in Rome.')}
- **que / qu'** = object: ${ex("C'est le livre que je lis.", "It's the book I'm reading.")}
- **où** = place or time: ${ex("C'est le café où on s'est rencontrés.", "It's the café where we met.")} · *le jour où…*
- **dont** = replaces **de** + …: ${ex("C'est le film dont je t'ai parlé.", "It's the film I told you about.")} (parler **de**)

## The quick test
What comes **straight after**?
- a **verb** → **qui**: *le train **qui part***
- a **subject** (je, tu, Marie…) → **que**: *le train **que je prends***

## que in the passé composé with avoir
The participle agrees with **que** when it comes before: ${ex("Les photos que j'ai prises sont belles.", 'The photos I took are beautiful.')} You mostly see this in writing.` },
      { t: 'logic', md: `English can leave the word out (*the book I read*); French never can: **que** must be there. And **qui / que** follow subject / object, exactly like **il / le**: if the word replaced would be *il*, use **qui**; if it would be *le / la*, use **que**.` },
      { t: 'mistakes', items: [["C'est le livre je lis.", "C'est le livre que je lis.", 'French never drops que.'], ["L'homme que habite ici.", "L'homme qui habite ici.", 'A verb follows: qui.'], ["Le film que je parle.", 'Le film dont je parle.', 'parler de → dont.']] },
    ],
    practice: {
      choice: [
        q("J'ai une amie ___ parle cinq langues.", ['qui', 'que', 'dont'], 'A verb follows (parle): the friend is the subject → qui.', 'I have a friend who speaks five languages.'),
        q("Le film ___ j'ai vu était génial.", ['que', 'qui', 'où'], 'A subject follows (j\'): the film is the object → que.', 'The film I saw was great.'),
        q("C'est la maison ___ je suis né.", ['où', 'que', 'qui'], 'A place → où.', "It's the house where I was born."),
        q("C'est le livre ___ tout le monde parle.", ['dont', 'que', 'qui'], 'parler de → dont.', "It's the book everyone is talking about."),
        q("Le jour ___ je suis arrivé, il pleuvait.", ['où', 'que', 'quand'], 'After a time noun (le jour), French uses où.', 'The day I arrived, it was raining.'),
      ],
    },
  },
  {
    id: 'fr-g-imperatif', level: 'B1', title: 'Commands and pronouns', titleEs: 'L’impératif',
    summary: 'parle, parlons, parlez, plus where the pronouns go.',
    blocks: [
      { t: 'text', md: `
## Three forms, from the present
Drop the pronoun. **-er** verbs (and *aller*: va) also drop the **s** of tu.` },
      { t: 'table', verbs: ['parler', 'finir', 'prendre'], tense: 'imperativo', caption: 'Impératif: tu, nous, vous' },
      { t: 'text', md: `
Irregular: **être** (sois, soyons, soyez), **avoir** (aie, ayons, ayez), **savoir** (sache…), **vouloir** (veuillez).
${ex('Soyez prudents !', 'Be careful!')} · ${ex('Veuillez patienter.', 'Please wait.')}

## Pronouns: after a positive command
Positive → after the verb, with a hyphen, **me → moi, te → toi**:
${ex('Regarde-moi.', 'Look at me.')} · ${ex('Prends-le.', 'Take it.')} · ${ex('Parle-lui.', 'Talk to him.')} · ${ex('Assieds-toi.', 'Sit down.')}

## Negative → back to the normal slot
${ex('Ne me regarde pas.', "Don't look at me.")} · ${ex('Ne le prends pas.', "Don't take it.")}

## Reflexive verbs
${ex('Lève-toi ! Levons-nous ! Levez-vous !', "Get up! Let's get up! Get up (you all)!")} · ${ex('Ne te lève pas.', "Don't get up.")}` },
      { t: 'table', verbs: ['se lever'], tense: 'imperativo', caption: 'A reflexive command: lève-toi' },
      { t: 'logic', md: `A positive command has **no subject**, so the pronoun moves to the end, where a stressed word is needed: that's why *me* becomes **moi** (*donne-moi*). As soon as **ne … pas** is there, everything goes back to the usual slot before the verb.` },
      { t: 'mistakes', items: [['Tu parles plus fort !', 'Parle plus fort !', 'Drop the pronoun and the s of -er verbs.'], ['Donne-me le sel.', 'Donne-moi le sel.', 'me → moi after a command.'], ['Ne prends-le pas.', 'Ne le prends pas.', 'Negative: pronoun back before the verb.']] },
    ],
    practice: {
      conj: { verbs: ['parler', 'finir', 'prendre', 'aller', 'être', 'se lever', 'faire', 'venir'], tenses: ['imperativo'], count: 10 },
      choice: [
        q('___ la fenêtre, s\'il te plaît. (fermer)', ['Ferme', 'Fermes', 'Tu fermes'], '-er verbs drop the s in the tu command: ferme.', 'Close the window, please.'),
        q('Le livre ? ___ !', ['Prends-le', 'Le prends', 'Prends-lui'], 'Positive command: pronoun after the verb, with a hyphen.', 'The book? Take it!'),
        q('___ le sel, s\'il te plaît.', ['Donne-moi', 'Donne-me', 'Me donne'], 'After a positive command, me becomes moi.', 'Give me the salt, please.'),
        q('Ne ___ pas !', ['te lève', 'lève-toi', 'toi lève'], 'Negative command: the pronoun goes back before the verb.', "Don't get up!"),
        q('___ sages, les enfants !', ['Soyez', 'Êtes', 'Soyiez'], 'être is irregular in the impératif: soyez.', 'Be good, children!'),
      ],
    },
  },
  {
    id: 'fr-g-connectors', level: 'B1', title: 'Linking ideas', titleEs: 'Les connecteurs logiques',
    summary: 'parce que, donc, pourtant, bien que, pour que…',
    blocks: [
      { t: 'text', md: `
## By job
| cause | **parce que, car, comme** | ${ex('Comme il pleut, je reste.', "As it's raining, I'm staying.")} |
| consequence | **donc, alors, c'est pourquoi** | ${ex("Il pleut, donc je reste.", "It's raining, so I'm staying.")} |
| contrast | **mais, pourtant, cependant, par contre** | ${ex("Il pleut, pourtant je sors.", "It's raining, yet I'm going out.")} |
| concession | **bien que** + subjonctif | ${ex("Bien qu'il pleuve, je sors.", "Although it's raining, I'm going out.")} |
| purpose | **pour que** + subjonctif / **pour** + infinitive | ${ex('Je travaille pour gagner de l\'argent.', 'I work to earn money.')} |
| order | **d'abord, ensuite, puis, enfin** | |

## Watch the mood
Most connectors are followed by a normal sentence. Only a few take the **subjonctif**: **bien que, pour que, avant que, à condition que, sans que**.

## comme or parce que?
**comme** opens the sentence; **parce que** follows the main idea: ${ex('Comme je suis malade, je reste.', "As I'm ill, I'm staying.")} / ${ex('Je reste parce que je suis malade.', "I'm staying because I'm ill.")}` },
      { t: 'logic', md: `Connectors group by meaning, and each group has a plain word (**mais, donc, parce que**) and a more formal one (**cependant, c'est pourquoi, car**). The subjonctif appears only with those that introduce something **not yet real** (a purpose, a condition) or **conceded** (bien que): the same idea as in the previous lesson.` },
      { t: 'mistakes', items: [["Bien qu'il pleut, je sors.", "Bien qu'il pleuve, je sors.", 'bien que + subjonctif.'], ['Parce que je suis malade, je reste.', 'Comme je suis malade, je reste.', 'At the start of a sentence, use comme.'], ['Je travaille pour que gagner.', 'Je travaille pour gagner.', 'One subject: pour + infinitive.']] },
    ],
    practice: {
      choice: [
        q("Il est fatigué, ___ il va se coucher.", ['donc', 'pourtant', 'bien que'], 'A consequence: donc.', "He's tired, so he's going to bed."),
        q("___ elle soit malade, elle travaille.", ['Bien qu\'', 'Parce qu\'', 'Donc'], 'A concession with the subjonctif (soit): bien que.', "Although she's ill, she's working."),
        q("___ il fait beau, on mange dehors.", ['Comme', 'Parce que', 'Pourtant'], 'Cause at the start of the sentence: comme.', "As the weather's nice, we're eating outside."),
        q("J'ai bien travaillé, ___ j'ai raté l'examen.", ['pourtant', 'donc', 'car'], 'A contrast with what you expected: pourtant.', 'I worked hard, yet I failed the exam.'),
        q("Je t'explique ___ tu comprennes.", ['pour que', 'pour', 'parce que'], 'Purpose for someone else, with the subjonctif: pour que.', "I'm explaining so that you understand."),
      ],
    },
  },
];
