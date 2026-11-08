import { units } from '../build';
import { ex } from './registry';

/** French A2: the past (passé composé, imparfait), pronouns, comparisons. Forms are shown before use. */
export const FR_A2_UNITS = units('A2', [
  {
    id: 'fr-a2-01', title: 'Clothes & shopping', titleEs: 'Les vêtements', emoji: '👕',
    description: 'Buy clothes, ask for sizes and point at things.',
    words: [
      ['le pantalon', 'the trousers'], ['la chemise', 'the shirt'], ['la robe', 'the dress'], ['la jupe', 'the skirt'], ['le pull', 'the jumper'],
      ['la veste', 'the jacket'], ['le manteau', 'the coat'], ['les chaussures', 'the shoes'], ['le chapeau', 'the hat'], ['la taille', 'the size'],
      ['la pointure', 'the shoe size'], ['cher', 'expensive'], ['bon marché', 'cheap'], ['les soldes', 'the sales'], ['la cabine', 'the fitting room'],
      ['essayer', 'to try (on)', "Je peux essayer cette robe ?", 'Can I try on this dress?'], ['porter', 'to wear'],
    ],
    sentences: [
      ['Je peux essayer ce pantalon ?', 'Can I try on these trousers?'],
      ['Cette veste est trop chère.', 'This jacket is too expensive.'],
      ['Vous faites quelle taille ?', 'What size are you?'],
      ['Ces chaussures sont en solde.', 'These shoes are on sale.'],
      ['Je préfère cet anorak bleu.', 'I prefer this blue anorak.'],
    ],
    grammar: `
## this / these: ce, cet, cette, ces
| masculine | **ce** pull | before a vowel: **cet** anorak |
| feminine | **cette** robe | |
| plural | **ces** chaussures | |

**cet** exists only so two vowels don't meet: the same idea as *l'* and *j'*. To insist, add **-ci** (this here) or **-là** (that there): *cette robe-ci, cette robe-là*.

## In the shop
- ${ex('Je peux essayer cette jupe ?', 'Can I try on this skirt?')}
- ${ex("C'est combien ?", 'How much is it?')} · **trop** = too: *trop grand, trop cher*
- *essayer* changes **y → i** where the stem is stressed: *j'essaie, nous essayons*, like *payer*.
`,
    conj: { verbs: ['essayer', 'porter', 'acheter'], tenses: ['presente'] },
  },
  {
    id: 'fr-a2-02', title: 'What did you do?', titleEs: 'Le passé composé', emoji: '📅',
    description: 'Talk about what you did yesterday or last weekend.',
    words: [
      ['hier soir', 'last night'], ['avant-hier', 'the day before yesterday'], ['la semaine dernière', 'last week'], ["l'année dernière", 'last year'],
      ['le week-end dernier', 'last weekend'], ['déjà', 'already'], ['pas encore', 'not yet'], ['la fête', 'the party'], ['le concert', 'the concert'],
      ['la soirée', 'the evening / party'], ['les vacances', 'the holidays'], ['rencontrer', 'to meet'], ['passer', 'to spend (time)'],
      ['fini', 'finished'], ['génial', 'great'], ['ennuyeux', 'boring'],
    ],
    sentences: [
      ["Hier soir, j'ai regardé un film.", 'Last night I watched a film.'],
      ['Nous avons mangé au restaurant.', 'We ate at the restaurant.'],
      ["Tu as fini tes devoirs ?", 'Have you finished your homework?'],
      ["Il a pris le train à huit heures.", 'He took the train at eight.'],
      ["Je n'ai pas encore vu ce film.", "I haven't seen this film yet."],
    ],
    grammar: `
## The passé composé: avoir + participle
For a finished action in the past, French uses **avoir** (which you know) + a **participle**:
| j'ai parlé | nous avons parlé |
| tu as parlé | vous avez parlé |
| il / elle a parlé | ils / elles ont parlé |

It covers both "I spoke" and "I have spoken": ${ex("J'ai mangé une pizza.", 'I ate a pizza. / I have eaten a pizza.')}

## Regular participles
**-er → -é** (parlé) · **-ir → -i** (fini) · **-re → -u** (attendu)

## The most common irregular ones
**fait** (faire), **pris** (prendre), **mis** (mettre), **dit** (dire), **écrit** (écrire), **vu** (voir), **bu** (boire), **lu** (lire), **eu** (avoir), **été** (être), **pu, voulu, dû, su**.

## Negative
The sandwich wraps **avoir**, not the participle: ${ex("Je n'ai pas compris.", "I didn't understand.")}
`,
    conj: { verbs: ['parler', 'finir', 'faire', 'prendre'], tenses: ['perfecto'] },
  },
  {
    id: 'fr-a2-03', title: 'Health & the body', titleEs: 'La santé', emoji: '🩺',
    description: 'Say where it hurts and understand advice.',
    words: [
      ['la tête', 'the head'], ['le ventre', 'the stomach'], ['le dos', 'the back'], ['la gorge', 'the throat'], ['le bras', 'the arm'],
      ['la jambe', 'the leg'], ['le pied', 'the foot'], ['la main', 'the hand'], ["l'œil", 'the eye (pl. les yeux)'], ['la dent', 'the tooth'],
      ['malade', 'ill'], ['la fièvre', 'the fever'], ['le médicament', 'the medicine'], ["l'ordonnance", 'the prescription'],
      ['avoir mal à', 'to have a pain in', "J'ai mal à la tête.", 'I have a headache.'], ['se sentir', 'to feel'], ['il faut', 'you must / it is necessary'],
    ],
    sentences: [
      ["J'ai mal à la tête.", 'I have a headache.'],
      ['Elle a mal au dos.', 'She has backache.'],
      ['Je ne me sens pas bien.', "I don't feel well."],
      ['Il faut boire beaucoup d\'eau.', 'You must drink a lot of water.'],
      ['Tu dois prendre ce médicament.', 'You must take this medicine.'],
    ],
    grammar: `
## avoir mal à: it hurts
French says "I have pain at": **avoir mal à** + the body part, with the melting à you know:
- **à + la**: ${ex("J'ai mal à la gorge.", 'I have a sore throat.')}
- **à + le = au**: ${ex("J'ai mal au ventre.", 'I have a stomach ache.')}
- **à + les = aux**: ${ex("J'ai mal aux pieds.", 'My feet hurt.')}

Body parts take **le / la**, not *mon / ma*: *J'ai mal à la main* (not *à ma main*).

## il faut + infinitive: one must
**il faut** never changes: it means "you have to / it is necessary", for everyone. ${ex('Il faut dormir.', 'You need to sleep.')}
For one person, use **devoir**: ${ex('Vous devez rester au lit.', 'You must stay in bed.')}

## se sentir (to feel)
*je me sens, tu te sens, il se sent, nous nous sentons, vous vous sentez, ils se sentent*.
`,
    conj: { verbs: ['se sentir', 'avoir', 'devoir'], tenses: ['presente'] },
  },
  {
    id: 'fr-a2-04', title: 'Travel & transport', titleEs: 'Les voyages', emoji: '🚆',
    description: 'Travel by train and plane and talk about trips.',
    words: [
      ['le train', 'the train'], ["l'avion", 'the plane'], ['la voiture', 'the car'], ['le vélo', 'the bike'], ['le billet', 'the ticket'],
      ['le voyage', 'the trip'], ['le quai', 'the platform'], ["l'aéroport", 'the airport'], ['la valise', 'the suitcase'], ["l'hôtel", 'the hotel'],
      ['le départ', 'the departure'], ["l'arrivée", 'the arrival'], ['en retard', 'late'], ["à l'heure", 'on time'], ['voyager', 'to travel'],
      ['à pied', 'on foot'],
    ],
    sentences: [
      ['Je suis allé à Nice en train.', 'I went to Nice by train.'],
      ['Elle est arrivée à midi.', 'She arrived at noon.'],
      ['Nous sommes restés trois jours.', 'We stayed three days.'],
      ['Le train est parti en retard.', 'The train left late.'],
      ['Tu es déjà allé au Canada ?', 'Have you ever been to Canada?'],
    ],
    grammar: `
## Some verbs take être
About 15 verbs of **movement or change** use **être** instead of avoir. Think of a house: you **arrive**, **go in**, **go up**, **stay**, **go down**, **fall**, **go out**, **leave**, **come back**… and you are **born** and **die** in it.
**aller, venir, arriver, partir, entrer, sortir, monter, descendre, rester, tomber, retourner, rentrer, revenir, devenir, naître, mourir**

## With être, the participle agrees
Like an adjective after être: add **-e** for feminine, **-s** for plural.
| je suis allé(e) | nous sommes allé(e)s |
| tu es allé(e) | vous êtes allé(e)(s) |
| il est allé · elle est allé**e** | ils sont allé**s** · elles sont allé**es** |

${ex('Marie est partie.', 'Marie left.')} · ${ex('Mes parents sont arrivés.', 'My parents arrived.')}

## Transport: en or à?
Inside it: **en** train, **en** avion, **en** voiture, **en** bus · On it: **à** vélo, **à** pied.
`,
    conj: { verbs: ['aller', 'arriver', 'partir', 'rester'], tenses: ['perfecto'] },
  },
  {
    id: 'fr-a2-05', title: 'When I was a child', titleEs: 'Quand j’étais petit', emoji: '🧸',
    description: 'Describe your childhood and how things used to be.',
    words: [
      ["l'enfance", 'childhood'], ['le village', 'the village'], ["l'école primaire", 'primary school'], ['le jouet', 'the toy'],
      ['le copain', 'the friend / mate (m)'], ['la copine', 'the friend / mate (f)'], ['autrefois', 'in the past'], ['chaque été', 'every summer'],
      ["d'habitude", 'usually'], ['timide', 'shy'], ['sage', 'well-behaved'], ['grandir', 'to grow up'], ['jouer à cache-cache', 'to play hide-and-seek'],
      ['la plage', 'the beach'], ['la campagne', 'the countryside'],
    ],
    sentences: [
      ["Quand j'étais petit, j'habitais à la campagne.", 'When I was little, I lived in the countryside.'],
      ['Chaque été, nous allions à la plage.', 'Every summer we used to go to the beach.'],
      ["J'avais un chien. Il s'appelait Max.", 'I had a dog. He was called Max.'],
      ['Ma grand-mère faisait des gâteaux.', 'My grandmother used to make cakes.'],
      ["Il pleuvait, alors je suis resté à la maison.", 'It was raining, so I stayed at home.'],
    ],
    grammar: `
## The imparfait: how things were
Take the **nous** form of the present, drop **-ons**, add **-ais, -ais, -ait, -ions, -iez, -aient**:
| nous **parl**ons → je parl**ais** | nous **finiss**ons → je finiss**ais** | nous **fais**ons → je fais**ais** |

| je parlais | nous parlions |
| tu parlais | vous parliez |
| il / elle parlait | ils / elles parlaient |

Only **être** is irregular: **ét-** (j'étais). *-ais, -ait, -aient* all sound the same. The weather too: *il pleut → il pleuvait*.

## When do you use it?
- background and description: ${ex('Il faisait beau.', 'The weather was nice.')}
- habits, "used to": ${ex('Je jouais au foot tous les jours.', 'I used to play football every day.')}
- age and feelings in the past: ${ex("J'avais dix ans.", 'I was ten.')}

A single finished event stays in the passé composé: ${ex('Un jour, je suis tombé.', 'One day I fell.')}
`,
    conj: { verbs: ['être', 'avoir', 'habiter', 'faire'], tenses: ['imperfecto'] },
  },
  {
    id: 'fr-a2-06', title: 'At the restaurant', titleEs: 'Au restaurant', emoji: '🍽️',
    description: 'Book a table, order a meal and pay.',
    words: [
      ['la carte', 'the menu'], ['le menu', 'the set menu'], ["l'entrée", 'the starter'], ['le plat', 'the main course'], ['le dessert', 'the dessert'],
      ["l'addition", 'the bill'], ['le pourboire', 'the tip'], ['réserver', 'to book'], ['commander', 'to order'], ['la boisson', 'the drink'],
      ['saignant', 'rare (meat)'], ['bien cuit', 'well done'], ['délicieux', 'delicious'], ['la serviette', 'the napkin'], ['la fourchette', 'the fork'],
      ['le couteau', 'the knife'],
    ],
    sentences: [
      ["L'addition, s'il vous plaît.", 'The bill, please.'],
      ['Je prends le poulet, et comme dessert, une tarte.', "I'll have the chicken, and a tart for dessert."],
      ['La soupe ? Je la prends.', "The soup? I'll have it."],
      ['Des frites ? Oui, j\'en veux.', 'Chips? Yes, I want some.'],
      ['Vous avez réservé une table ?', 'Have you booked a table?'],
    ],
    grammar: `
## le, la, les: it, them
To avoid repeating a thing or person, use **le** (him / it, m), **la** (her / it, f), **les** (them). It goes **before the verb**:
- ${ex('Tu prends le gâteau ? Oui, je le prends.', "Are you having the cake? Yes, I'll have it.")}
- ${ex('Tu connais Marie ? Oui, je la connais.', 'Do you know Marie? Yes, I know her.')}
- **l'** before a vowel: ${ex("Le vin ? Je l'adore.", 'Wine? I love it.')}

## en: some of it
**en** replaces **du / de la / des** + noun, or a number: ${ex("Du pain ? J'en veux.", "Bread? I'd like some.")} · ${ex("Tu as des frères ? J'en ai deux.", 'Do you have brothers? I have two.')}

## Ordering
**Je prends…** or **Je voudrais…** · **comme entrée / plat / dessert** (as a starter…) · ${ex("L'addition, s'il vous plaît.", 'The bill, please.')}
`,
    conj: { verbs: ['prendre', 'commander', 'vouloir'], tenses: ['presente'] },
  },
  {
    id: 'fr-a2-07', title: 'Work & studies', titleEs: 'Le travail et les études', emoji: '🎓',
    description: 'Talk about your studies, job and how long you have done things.',
    words: [
      ["l'entreprise", 'the company'], ['le collègue', 'the colleague'], ['le patron', 'the boss'], ['le salaire', 'the salary'], ["l'emploi", 'the job'],
      ['le stage', 'the internship'], ["l'université", 'the university'], ["l'examen", 'the exam'], ['le diplôme', 'the degree'], ['les études', 'studies'],
      ['réussir', 'to succeed / to pass'], ['depuis', 'since / for'], ['il y a deux ans', 'two years ago', 'Je suis arrivé il y a deux ans.', 'I arrived two years ago.'], ['venir de', 'to have just'], ['bientôt', 'soon'],
    ],
    sentences: [
      ["J'habite ici depuis deux ans.", 'I have lived here for two years.'],
      ["J'ai commencé ce travail il y a six mois.", 'I started this job six months ago.'],
      ['Elle vient de réussir son examen.', 'She has just passed her exam.'],
      ['Mon collègue travaille dans une grande entreprise.', 'My colleague works for a big company.'],
      ['Je fais un stage cet été.', "I'm doing an internship this summer."],
    ],
    grammar: `
## depuis + present: still going on
English says "I have lived"; French says "I live since", because it's still true: ${ex("J'apprends le français depuis un an.", "I've been learning French for a year.")}

## il y a + passé composé: ago
${ex("Je suis arrivé il y a trois jours.", 'I arrived three days ago.')} Don't confuse it with *il y a* = there is: the time word shows the meaning.

## venir de + infinitive: just did
The opposite of *aller* + infinitive: ${ex('Je viens de manger.', "I've just eaten.")} · ${ex('Le train vient de partir.', 'The train has just left.')}

| near past | **venir de** + infinitive | je viens de manger |
| present | present | je mange |
| near future | **aller** + infinitive | je vais manger |
`,
    conj: { verbs: ['venir', 'réussir', 'commencer'], tenses: ['presente', 'perfecto'] },
  },
  {
    id: 'fr-a2-08', title: 'Personality & comparing', titleEs: 'Comparer', emoji: '⚖️',
    description: 'Describe personalities and compare people and things.',
    words: [
      ['drôle', 'funny'], ['sérieux', 'serious'], ['bavard', 'chatty'], ['calme', 'calm'], ['paresseux', 'lazy'], ['travailleur', 'hard-working'],
      ['généreux', 'generous'], ['intelligent', 'clever'], ['plus', 'more'], ['moins', 'less'], ['aussi', 'as / also'], ['meilleur', 'better'],
      ['mieux', 'better (adverb)'], ['le plus', 'the most'], ['que', 'than / as'],
    ],
    sentences: [
      ['Mon frère est plus grand que moi.', 'My brother is taller than me.'],
      ['Elle est aussi drôle que sa mère.', 'She is as funny as her mother.'],
      ['Ce café est meilleur que l\'autre.', 'This coffee is better than the other one.'],
      ["C'est la ville la plus belle de France.", 'It is the most beautiful town in France.'],
      ['Il parle mieux anglais que moi.', 'He speaks English better than me.'],
    ],
    grammar: `
## plus, moins, aussi + adjective + que
| more | **plus** grand **que** | ${ex('Paul est plus grand que Marc.', 'Paul is taller than Marc.')} |
| less | **moins** cher **que** | ${ex("Le train est moins cher que l'avion.", 'The train is cheaper than the plane.')} |
| as | **aussi** sympa **que** | ${ex('Léa est aussi sympa que toi.', 'Léa is as nice as you.')} |

The adjective still agrees: ${ex('Elle est plus grand**e** que lui.', 'She is taller than him.')} After que, use **moi, toi, lui, elle, nous, vous, eux**.

## Two irregular ones
**bon → meilleur** (better, adjective): *un meilleur café* · **bien → mieux** (better, adverb): ${ex('Il chante mieux.', 'He sings better.')} Never *plus bon*.

## The most: le / la / les plus
${ex("C'est le plus grand musée de Paris.", "It's the biggest museum in Paris.")} After a noun, repeat the article: *la ville **la** plus belle*. "in" is **de**.
`,
  },
  {
    id: 'fr-a2-09', title: 'Around the house', titleEs: 'Les tâches ménagères', emoji: '🧹',
    description: 'Talk about housework and who does what for whom.',
    words: [
      ['le ménage', 'the housework'], ['la vaisselle', 'the washing-up'], ['le linge', 'the laundry'], ['les courses', 'the shopping'], ['la poubelle', 'the bin'],
      ['nettoyer', 'to clean'], ['ranger', 'to tidy'], ['passer l\'aspirateur', 'to vacuum'], ['garder', 'to look after'], ['le voisin', 'the neighbour'],
      ['prêter', 'to lend'], ['emprunter', 'to borrow'], ['le cadeau', 'the present'], ['envoyer', 'to send'], ['montrer', 'to show'],
    ],
    sentences: [
      ['Je fais la vaisselle et tu ranges ta chambre.', 'I do the washing-up and you tidy your room.'],
      ['Je lui donne un cadeau.', "I'm giving him a present."],
      ['Nous leur envoyons une carte.', "We're sending them a card."],
      ['Tu peux me prêter ton vélo ?', 'Can you lend me your bike?'],
      ['Qui fait les courses dans ta famille ?', 'Who does the shopping in your family?'],
    ],
    grammar: `
## To whom? me, te, lui, nous, vous, leur
Verbs like **donner, envoyer, prêter, montrer, téléphoner, dire, parler** take a person with **à**. Replace *à + person* with:
| à moi → **me** | à nous → **nous** |
| à toi → **te** | à vous → **vous** |
| à lui / à elle → **lui** | à eux / à elles → **leur** |

${ex('Je téléphone à ma mère. → Je lui téléphone.', 'I phone my mother. → I phone her.')} **lui** is both "to him" and "to her".

## le or lui?
**le / la / les** replace a thing or person **without à** (direct). **lui / leur** replace a person **with à**.
- ${ex('Je vois Paul. → Je le vois.', 'I see Paul. → I see him.')}
- ${ex('Je parle à Paul. → Je lui parle.', 'I speak to Paul. → I speak to him.')}

## faire for housework
**faire** la vaisselle, le ménage, les courses, la cuisine, le lit.
`,
    conj: { verbs: ['nettoyer', 'ranger', 'envoyer'], tenses: ['presente'] },
  },
  {
    id: 'fr-a2-10', title: 'Phones & technology', titleEs: 'La technologie', emoji: '📱',
    description: 'Talk about phones, the internet and apps.',
    words: [
      ['le portable', 'the mobile phone'], ["l'ordinateur", 'the computer'], ["l'écran", 'the screen'], ['le mot de passe', 'the password'],
      ["l'application", 'the app'], ['le courriel', 'the email'], ['le réseau', 'the network'], ['la batterie', 'the battery'], ['le chargeur', 'the charger'],
      ['en ligne', 'online'], ['télécharger', 'to download'], ['envoyer un texto', 'to send a text'], ['se connecter', 'to log in'], ['cliquer', 'to click'],
      ['allumer', 'to switch on'], ['éteindre', 'to switch off'],
    ],
    sentences: [
      ["Je n'ai plus de batterie.", "I've got no battery left."],
      ['Tu peux m\'envoyer un texto ?', 'Can you send me a text?'],
      ["J'ai oublié mon mot de passe.", "I've forgotten my password."],
      ['Le wifi ? Il y en a à la gare.', 'Wifi? There is some at the station.'],
      ['Paris ? J\'y vais demain.', "Paris? I'm going there tomorrow."],
    ],
    grammar: `
## y: there
**y** replaces a place (à, en, dans, chez + place): ${ex('Tu vas à Paris ? Oui, j\'y vais.', 'Are you going to Paris? Yes, I\'m going there.')} It goes before the verb, like the other pronouns.

## en: some, of it (again)
You know **en** for amounts. It also replaces **de + thing**: ${ex("Tu as besoin de ton portable ? Oui, j'en ai besoin.", 'Do you need your phone? Yes, I need it.')}
**Il y en a** = there is some / there are some.

## ne … plus: no longer
Another negative sandwich: ${ex("Je n'ai plus de batterie.", "I've got no battery left.")} Like *pas*, it turns un / du / des into **de**.

## Pronouns in the passé composé
They go before **avoir / être**: ${ex("Je l'ai envoyé.", 'I sent it.')} · ${ex("J'y suis allé.", 'I went there.')}
`,
    conj: { verbs: ['télécharger', 'oublier', 'envoyer'], tenses: ['perfecto'] },
  },
]);

export const FR_A2_UNIT_LESSONS: Record<string, string[]> = {
  'fr-a2-01': ['fr-g-demonstratives'],
  'fr-a2-02': ['fr-g-passe-compose'],
  'fr-a2-03': ['fr-g-modals'],
  'fr-a2-04': ['fr-g-etre-verbs'],
  'fr-a2-05': ['fr-g-imparfait', 'fr-g-pc-vs-imp'],
  'fr-a2-06': ['fr-g-pronouns-direct'],
  'fr-a2-07': ['fr-g-time'],
  'fr-a2-08': ['fr-g-comparison'],
  'fr-a2-09': ['fr-g-pronouns-indirect'],
  'fr-a2-10': ['fr-g-y-en'],
};
