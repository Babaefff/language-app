import { units } from '../build';
import { ex } from './registry';

/** French B1: future, conditional, si-clauses, subjunctive, relative pronouns, commands, linking. */
export const FR_B1_UNITS = units('B1', [
  {
    id: 'fr-b1-01', title: 'Plans & the future', titleEs: 'Les projets', emoji: '🗓️',
    description: 'Talk about plans, predictions and what will happen.',
    words: [
      ["l'avenir", 'the future'], ['le projet', 'the plan / project'], ["l'année prochaine", 'next year'], ['dans cinq ans', 'in five years'],
      ['un jour', 'one day'], ['probablement', 'probably'], ['sûrement', 'surely'], ['déménager', 'to move house'],
      ['changer', 'to change'], ['la retraite', 'retirement'], ['le rêve', 'the dream'], ['espérer', 'to hope'], ['prévoir', 'to plan / to forecast'],
      ['la météo', 'the weather forecast'], ['prochainement', 'shortly'],
    ],
    sentences: [
      ["L'année prochaine, je travaillerai à Montréal.", 'Next year I will work in Montreal.'],
      ['Nous déménagerons dans un an.', 'We will move house in a year.'],
      ['Demain, il fera beau.', 'Tomorrow the weather will be nice.'],
      ['Tu viendras à ma fête ?', 'Will you come to my party?'],
      ['Quand je serai grand, je serai pilote.', 'When I grow up, I will be a pilot.'],
    ],
    grammar: `
## The futur simple: the infinitive + avoir's endings
Take the **infinitive** (drop the final **e** of -re verbs) and add **-ai, -as, -a, -ons, -ez, -ont**: the present of *avoir*.
| je parler**ai** | nous parler**ons** |
| tu parler**as** | vous parler**ez** |
| il / elle parler**a** | ils / elles parler**ont** |

*finir → je finirai · prendre → je prendrai*

## Irregular stems, same endings
**être → ser-** · **avoir → aur-** · **aller → ir-** · **faire → fer-** · **venir → viendr-** · **pouvoir → pourr-** · **vouloir → voudr-** · **voir → verr-** · **devoir → devr-** · **savoir → saur-**
${ex('Je serai là à huit heures.', "I'll be there at eight.")}

## quand + future
Where English uses the present after *when*, French uses the future: ${ex('Quand tu arriveras, tu m\'appelleras.', "When you arrive, you'll call me.")}

## Futur proche or futur simple?
*Je vais partir* (soon, already decided) · *Je partirai* (later, a plan or prediction). Both are correct; speech prefers *aller* + infinitive.
`,
    conj: { verbs: ['parler', 'être', 'avoir', 'aller', 'faire'], tenses: ['futuro'] },
  },
  {
    id: 'fr-b1-02', title: 'Advice & polite requests', titleEs: 'Les conseils', emoji: '💡',
    description: 'Give advice, make polite requests and talk about what you would do.',
    words: [
      ['le conseil', 'the advice'], ['à ta place', 'if I were you'], ['poli', 'polite'], ['aimer bien', 'to quite like'], ['volontiers', 'gladly'],
      ['proposer', 'to suggest'], ['conseiller', 'to advise'], ['le service', 'the favour / service'], ['rendre service', 'to do a favour'],
      ['se détendre', 'to relax'], ['le stress', 'stress'], ['tranquille', 'quiet / peaceful'], ['plutôt', 'rather'], ['mieux vaut', "it's better to"],
      ['ça dépend', 'it depends'],
    ],
    sentences: [
      ['Pourriez-vous m\'aider, s\'il vous plaît ?', 'Could you help me, please?'],
      ['Tu devrais dormir plus.', 'You should sleep more.'],
      ["À ta place, je prendrais le train.", "If I were you, I'd take the train."],
      ["J'aimerais voyager en Asie.", "I'd like to travel in Asia."],
      ['Ce serait génial !', 'That would be great!'],
    ],
    grammar: `
## The conditionnel: future stem + imparfait endings
Take the **future stem** (parler-, ser-, aur-, fer-…) and add the **imparfait endings** -ais, -ais, -ait, -ions, -iez, -aient.
| je parler**ais** | nous parler**ions** |
| tu parler**ais** | vous parler**iez** |
| il / elle parler**ait** | ils / elles parler**aient** |

## Its three jobs
- **politeness**: ${ex('Je voudrais un café.', "I'd like a coffee.")} · ${ex('Pourriez-vous répéter ?', 'Could you repeat that?')}
- **advice** with *devoir*: ${ex('Tu devrais te reposer.', 'You should rest.')}
- **wishes and imagined situations**: ${ex("J'aimerais habiter à la mer.", "I'd like to live by the sea.")}

**À ta place, …** + conditionnel = If I were you, …
`,
    conj: { verbs: ['pouvoir', 'devoir', 'aimer', 'être'], tenses: ['condicional'] },
  },
  {
    id: 'fr-b1-03', title: 'Dreams & what ifs', titleEs: 'Les hypothèses', emoji: '🌈',
    description: 'Talk about real and imaginary conditions with si.',
    words: [
      ['si', 'if'], ['gagner', 'to win / to earn'], ['le loto', 'the lottery'], ['riche', 'rich'], ['le tour du monde', 'the trip round the world'],
      ['la chance', 'the luck'], ["l'argent", 'the money'], ['le temps libre', 'the free time'], ['imaginer', 'to imagine'], ['sinon', 'otherwise'],
      ['à condition de', 'on condition that'], ['au cas où', 'in case'], ['peut-être', 'maybe'], ['vraiment', 'really'], ['le bateau', 'the boat'],
    ],
    sentences: [
      ["S'il pleut, je resterai à la maison.", "If it rains, I'll stay at home."],
      ["Si j'avais de l'argent, je ferais le tour du monde.", "If I had money, I'd travel round the world."],
      ['Si tu veux, on peut sortir ce soir.', 'If you want, we can go out tonight.'],
      ['Que ferais-tu si tu gagnais au loto ?', 'What would you do if you won the lottery?'],
      ["Si j'étais toi, je lui parlerais.", "If I were you, I'd talk to him."],
    ],
    grammar: `
## Real: si + present → future (or present)
A condition that can really happen: ${ex("S'il fait beau, nous irons à la plage.", "If the weather's nice, we'll go to the beach.")}

## Imagined: si + imparfait → conditionnel
A dream or an unreal situation: ${ex("Si j'étais riche, j'achèterais une maison.", "If I were rich, I'd buy a house.")}
| si + **present** | → **future** | real |
| si + **imparfait** | → **conditionnel** | imagined |

## Never the future or conditional after si
${ex("S'il pleut demain…", 'If it rains tomorrow…')} (not *s'il pleuvra*). **si + il / ils → s'il / s'ils**; *si elle* doesn't change.
`,
    conj: { verbs: ['avoir', 'être', 'faire'], tenses: ['imperfecto', 'condicional'] },
  },
  {
    id: 'fr-b1-04', title: 'Wishes & feelings', titleEs: 'Les souhaits et les sentiments', emoji: '💬',
    description: 'Say what you want others to do and how you feel about it.',
    words: [
      ['vouloir que', 'to want (someone to)'], ['il faut que', 'it is necessary that'], ['souhaiter', 'to wish'], ['avoir peur que', 'to be afraid that'],
      ['être content que', 'to be glad that'], ['regretter', 'to be sorry / to regret'], ['triste', 'sad'], ['fier', 'proud'], ['déçu', 'disappointed'],
      ['inquiet', 'worried'], ['la joie', 'the joy'], ['la colère', 'the anger'], ['dommage', 'a pity'], ['ensemble', 'together'], ['heureux', 'happy'],
    ],
    sentences: [
      ['Je veux que tu viennes avec moi.', 'I want you to come with me.'],
      ['Il faut que nous partions tôt.', 'We have to leave early.'],
      ['Je suis content que tu sois là.', "I'm glad you're here."],
      ["C'est dommage qu'il ne puisse pas venir.", "It's a pity he can't come."],
      ['Ma mère veut que je fasse mes devoirs.', 'My mother wants me to do my homework.'],
    ],
    grammar: `
## The subjonctif: from the ils form
Take **ils** in the present, drop **-ent**, add **-e, -es, -e, -ions, -iez, -ent**:
*ils parlent → que je parle · ils finissent → que je finisse · ils prennent → que je prenne*
**nous / vous** look like the imparfait: *que nous prenions, que vous preniez*.

## Seven irregular ones
**être** (que je sois) · **avoir** (que j'aie) · **aller** (que j'aille) · **faire** (que je fasse) · **pouvoir** (que je puisse) · **savoir** (que je sache) · **vouloir** (que je veuille)

## When? Two people + a wish, an obligation or a feeling
- ${ex('Je veux que tu viennes.', 'I want you to come.')}
- ${ex('Il faut que je parte.', 'I have to leave.')}
- ${ex('Je suis triste que tu partes.', "I'm sad you're leaving.")}

With one person, use the infinitive: ${ex('Je veux venir.', 'I want to come.')} (not *je veux que je vienne*).
`,
    conj: { verbs: ['parler', 'être', 'avoir', 'faire', 'venir'], tenses: ['subjuntivo'] },
  },
  {
    id: 'fr-b1-05', title: 'Society & the environment', titleEs: 'La société et l’environnement', emoji: '🌍',
    description: 'Give opinions on society and the planet, and argue for them.',
    words: [
      ["l'environnement", 'the environment'], ['la planète', 'the planet'], ['la pollution', 'pollution'], ['le climat', 'the climate'],
      ['recycler', 'to recycle'], ['les déchets', 'waste'], ["l'énergie", 'energy'], ['le chômage', 'unemployment'], ['la société', 'society'],
      ["à mon avis", 'in my opinion'], ["d'un côté", 'on the one hand'], ["de l'autre côté", 'on the other hand'], ['pourtant', 'yet / however'],
      ['donc', 'so / therefore'], ['bien que', 'although'],
    ],
    sentences: [
      ['À mon avis, il faut recycler plus.', 'In my opinion, we need to recycle more.'],
      ['Je pense que le climat change.', 'I think the climate is changing.'],
      ["Je ne pense pas que ce soit facile.", "I don't think it's easy."],
      ["Bien qu'il fasse froid, je prends mon vélo.", "Although it's cold, I take my bike."],
      ["C'est important que chacun fasse un effort.", "It's important that everyone makes an effort."],
    ],
    grammar: `
## Opinions: indicative or subjonctif?
- sure, positive: **je pense que, je crois que, je trouve que** + indicative: ${ex('Je pense que tu as raison.', 'I think you are right.')}
- doubt, negative: **je ne pense pas que, je doute que** + subjonctif: ${ex('Je ne pense pas que tu aies raison.', "I don't think you're right.")}

## Judgements + subjonctif
**il est important que, il est possible que, c'est dommage que** → subjonctif (the weather too: *il pleut → qu'il pleuve*): ${ex('Il est possible qu\'il pleuve.', "It's possible it'll rain.")}

## Linking an argument
**d'abord** (first) · **ensuite** · **de plus** (moreover) · **pourtant / cependant** (however) · **donc** (so) · **enfin** (finally) · **bien que** + subjonctif (although)
`,
    conj: { verbs: ['croire', 'penser', 'pouvoir'], tenses: ['subjuntivo'] },
  },
  {
    id: 'fr-b1-06', title: 'Culture & media', titleEs: 'La culture et les médias', emoji: '🎭',
    description: 'Talk about films, books and the news, and describe them in detail.',
    words: [
      ["l'actualité", 'the news / current affairs'], ['le journal', 'the newspaper'], ["l'article", 'the article'], ["l'émission", 'the TV programme'],
      ['le roman', 'the novel'], ["l'auteur", 'the author'], ["l'acteur", 'the actor'], ["l'actrice", 'the actress'], ["l'exposition", 'the exhibition'],
      ['le spectacle', 'the show'], ['la chanson', 'the song'], ['passionnant', 'fascinating'], ['émouvant', 'moving'], ['décevant', 'disappointing'],
      ['raconter', 'to tell (a story)'],
    ],
    sentences: [
      ["C'est un film qui m'a beaucoup plu.", "It's a film I really liked."],
      ['Le livre que je lis est passionnant.', "The book I'm reading is fascinating."],
      ["C'est la ville où je suis né.", "It's the town where I was born."],
      ["C'est l'acteur dont tout le monde parle.", "He's the actor everyone is talking about."],
      ["L'émission raconte l'histoire d'une famille.", 'The programme tells the story of a family.'],
    ],
    grammar: `
## Joining sentences: qui, que, où, dont
| **qui** | the subject (who / which does it) | le film **qui** passe ce soir |
| **que** | the object (whom / which you…) | le film **que** je regarde |
| **où** | a place or a time | la ville **où** j'habite · le jour **où**… |
| **dont** | replaces de + … | le livre **dont** je parle |

**Test:** if a verb follows straight after, it's usually **qui**; if a subject (je, tu, il…) follows, it's **que**: ${ex("C'est l'acteur qui joue Napoléon.", "He's the actor who plays Napoleon.")} · ${ex("C'est l'acteur que j'adore.", "He's the actor I love.")}

**que → qu'** before a vowel; **qui** never elides.

## Talking about a work
**Ça parle de…** (it's about) · **ça m'a plu** (I liked it) · **je l'ai trouvé…** (I found it…)
`,
  },
  {
    id: 'fr-b1-07', title: 'In the kitchen', titleEs: 'En cuisine', emoji: '🍳',
    description: 'Follow and give instructions: recipes and directions.',
    words: [
      ['la recette', 'the recipe'], ['couper', 'to cut'], ['mélanger', 'to mix'], ['ajouter', 'to add'], ['verser', 'to pour'], ['faire cuire', 'to cook'],
      ['le four', 'the oven'], ['la poêle', 'the frying pan'], ["l'œuf", 'the egg'], ['la farine', 'the flour'], ['le sucre', 'the sugar'], ['le beurre', 'the butter'],
      ['le sel', 'the salt'], ["l'oignon", 'the onion'], ['la cuillère', 'the spoon'],
    ],
    sentences: [
      ["Coupez l'oignon en petits morceaux.", 'Cut the onion into small pieces.'],
      ['Ajoute le sucre et mélange bien.', 'Add the sugar and mix well.'],
      ['Ne mettez pas trop de sel !', "Don't put in too much salt!"],
      ['Le beurre ? Mets-le dans la poêle.', 'The butter? Put it in the pan.'],
      ['Donne-moi la cuillère, s\'il te plaît.', 'Give me the spoon, please.'],
    ],
    grammar: `
## The impératif: the present without the pronoun
Three forms, from the present: **tu**, **nous** (let's), **vous**:
| tu | parles → **parle** | -er verbs (and aller: va) drop the s |
| nous | **parlons** | let's speak |
| vous | **parlez** | speak (polite or plural) |

*finis, finissons, finissez · prends, prenons, prenez*. Irregular: **sois / soyez** (être), **aie / ayez** (avoir).

## Pronouns after a positive command
With a hyphen, after the verb; **me → moi**, **te → toi**: ${ex('Mets-le dans le four.', 'Put it in the oven.')} · ${ex('Donne-moi le sel.', 'Give me the salt.')} · ${ex('Lève-toi !', 'Get up!')}

## Negative commands keep the normal order
${ex('Ne le mange pas !', "Don't eat it!")} · ${ex('Ne te lève pas.', "Don't get up.")}
`,
    conj: { verbs: ['ajouter', 'mettre', 'prendre'], tenses: ['imperativo'] },
  },
  {
    id: 'fr-b1-08', title: 'Applying for a job', titleEs: 'Chercher un emploi', emoji: '📄',
    description: 'Write a cover letter and talk about your experience.',
    words: [
      ['le CV', 'the CV'], ['la lettre de motivation', 'the cover letter'], ["l'entretien", 'the interview'], ['le poste', 'the position'],
      ["l'expérience", 'the experience'], ['les compétences', 'the skills'], ['postuler', 'to apply'], ['embaucher', 'to hire'], ['le candidat', 'the candidate'],
      ['le contrat', 'the contract'], ['à temps plein', 'full-time'], ['à temps partiel', 'part-time'], ['pour que', 'so that'], ['afin de', 'in order to'],
      ['Madame, Monsieur', 'Dear Sir or Madam'],
    ],
    sentences: [
      ['Je souhaite postuler au poste de vendeur.', 'I would like to apply for the sales position.'],
      ["J'ai trois ans d'expérience dans la vente.", 'I have three years of experience in sales.'],
      ['Je vous envoie mon CV pour que vous puissiez le lire.', "I'm sending you my CV so that you can read it."],
      ["Je serais ravi de vous rencontrer.", 'I would be delighted to meet you.'],
      ["Je vous prie d'agréer mes salutations distinguées.", 'Yours faithfully.'],
    ],
    grammar: `
## pour que + subjonctif, pour / afin de + infinitive
Two people → **pour que** + subjonctif: ${ex('Je vous écris pour que vous connaissiez mon profil.', "I'm writing so that you know my profile.")}
One person → **pour / afin de** + infinitive: ${ex('Je vous écris afin de postuler.', "I'm writing in order to apply.")}

## The formal letter
- Open: **Madame, Monsieur,**
- Purpose: **Je me permets de vous écrire…** · **Suite à votre annonce…**
- Polite wish: conditionnel: **Je serais heureux de…**
- Close: **Je vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.**

## Talking about experience
**depuis** + present for what still continues: ${ex('Je travaille dans la vente depuis trois ans.', "I've been working in sales for three years.")} · passé composé for finished jobs: ${ex("J'ai travaillé deux ans à Lyon.", 'I worked in Lyon for two years.')}
`,
    conj: { verbs: ['être', 'pouvoir'], tenses: ['condicional', 'subjuntivo'] },
  },
]);

export const FR_B1_UNIT_LESSONS: Record<string, string[]> = {
  'fr-b1-01': ['fr-g-futur'],
  'fr-b1-02': ['fr-g-conditionnel'],
  'fr-b1-03': ['fr-g-si'],
  'fr-b1-04': ['fr-g-subj-form', 'fr-g-subj-use'],
  'fr-b1-05': ['fr-g-subj-use', 'fr-g-connectors'],
  'fr-b1-06': ['fr-g-relatives'],
  'fr-b1-07': ['fr-g-imperatif'],
  'fr-b1-08': ['fr-g-subj-use', 'fr-g-connectors'],
};
