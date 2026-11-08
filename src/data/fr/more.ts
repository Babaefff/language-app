import { units } from '../build';
import { ex } from './registry';

/** Extra French topic units, so French covers the same topics as Spanish and German. */
export const FR_MORE_A1 = units('A1', [
  {
    id: 'fr-a1-15', title: 'Big numbers & prices', titleEs: 'Les grands nombres', emoji: '💶',
    description: 'Count to 1,000, say prices and dates.',
    words: [
      ['quarante', 'forty'], ['cinquante', 'fifty'], ['soixante', 'sixty'], ['soixante-dix', 'seventy'], ['quatre-vingts', 'eighty'],
      ['quatre-vingt-dix', 'ninety'], ['cent', 'a hundred'], ['mille', 'a thousand'], ["l'euro", 'the euro'], ['le centime', 'the cent'],
      ['le prix', 'the price'], ['coûter', 'to cost'], ['la date', 'the date'], ['le premier', 'the first'], ['le numéro', 'the number'],
    ],
    sentences: [
      ['Le livre coûte quinze euros cinquante.', 'The book costs fifteen euros fifty.'],
      ["Ma grand-mère a quatre-vingt-deux ans.", 'My grandmother is eighty-two.'],
      ['Mon numéro, c\'est le zéro six, soixante-dix, quarante.', 'My number is 06 70 40.'],
      ["C'est le premier mai.", "It's the first of May."],
      ['Il y a mille habitants dans le village.', 'There are a thousand inhabitants in the village.'],
    ],
    grammar: `
## 70, 80, 90: French counts in twenties
| 60 soixante | 70 **soixante-dix** (60 + 10) |
| 71 soixante et onze | 79 soixante-dix-neuf |
| 80 **quatre-vingts** (4 × 20) | 81 quatre-vingt-un |
| 90 **quatre-vingt-dix** (4 × 20 + 10) | 99 quatre-vingt-dix-neuf |

**quatre-vingts** loses its s when another number follows: *quatre-vingt-trois*. In Belgium and Switzerland you'll also hear *septante, nonante*.

## Prices and dates
${ex('Ça coûte douze euros.', 'It costs twelve euros.')} · Dates use plain numbers except the first: *le premier juin, le deux juin*.
`,
  },
  {
    id: 'fr-a1-16', title: 'Fruit & vegetables', titleEs: 'Les fruits et les légumes', emoji: '🍎',
    description: 'Shop at the market and talk about quantities.',
    words: [
      ['la pomme', 'the apple'], ['la poire', 'the pear'], ['la banane', 'the banana'], ["l'orange", 'the orange'], ['la fraise', 'the strawberry'],
      ['le raisin', 'the grapes'], ['la tomate', 'the tomato'], ['la carotte', 'the carrot'], ['la pomme de terre', 'the potato'], ['la salade', 'the lettuce / salad'],
      ['le kilo', 'the kilo'], ['la bouteille', 'the bottle'], ['le paquet', 'the packet'], ['frais', 'fresh'], ['mûr', 'ripe'],
    ],
    sentences: [
      ['Je voudrais un kilo de pommes, s\'il vous plaît.', "I'd like a kilo of apples, please."],
      ['Les fraises sont très bonnes aujourd\'hui.', 'The strawberries are very good today.'],
      ["Il n'y a plus de tomates.", 'There are no more tomatoes.'],
      ['Je prends aussi une bouteille d\'eau.', "I'll also take a bottle of water."],
      ['Les bananes ne sont pas mûres.', 'The bananas are not ripe.'],
    ],
    grammar: `
## Quantities take only de
After an amount, du / de la / des all become **de** (d' before a vowel):
*un kilo **de** pommes · une bouteille **d'**eau · un paquet **de** pâtes · beaucoup **de** fraises · un peu **de** sel*

## At the market
- ${ex('Je voudrais des carottes.', "I'd like some carrots.")}
- ${ex("Avec ceci ?", 'Anything else?')} · ${ex("C'est tout, merci.", "That's all, thanks.")}
`,
    conj: { verbs: ['acheter', 'vouloir'], tenses: ['presente'] },
  },
  {
    id: 'fr-a1-17', title: 'In the classroom', titleEs: 'En classe', emoji: '🏫',
    description: 'Understand your teacher and ask for help.',
    words: [
      ['le stylo', 'the pen'], ['le crayon', 'the pencil'], ['le cahier', 'the notebook'], ['la gomme', 'the eraser'], ['le tableau', 'the board'],
      ['la question', 'the question'], ['la réponse', 'the answer'], ['le mot', 'the word'], ['la phrase', 'the sentence'], ["l'exercice", 'the exercise'],
      ['répéter', 'to repeat'], ['expliquer', 'to explain'], ['épeler', 'to spell'], ['lentement', 'slowly'], ['comment dit-on…?', 'how do you say…?'],
    ],
    sentences: [
      ['Vous pouvez répéter, s\'il vous plaît ?', 'Can you repeat, please?'],
      ['Comment dit-on « book » en français ?', 'How do you say "book" in French?'],
      ['Je ne comprends pas la question.', "I don't understand the question."],
      ['Parlez plus lentement, s\'il vous plaît.', 'Speak more slowly, please.'],
      ["Qu'est-ce que ça veut dire ?", 'What does that mean?'],
    ],
    grammar: `
## Survival phrases
- **Vous pouvez répéter ?** · **Plus lentement, s'il vous plaît.**
- **Comment dit-on… en français ?** · **Qu'est-ce que ça veut dire ?** (What does that mean?)
- **Comment ça s'écrit ?** · **Vous pouvez épeler ?**

## What the teacher says: commands with vous
The vous command is the present without *vous*: **Écoutez !** · **Répétez !** · **Ouvrez vos livres.** · **Lisez le texte.** ${ex('Écrivez la réponse.', 'Write the answer.')}
`,
    conj: { verbs: ['comprendre'], tenses: ['presente'] },
  },
]);

export const FR_MORE_A2 = units('A2', [
  {
    id: 'fr-a2-11', title: 'Animals & nature', titleEs: 'Les animaux et la nature', emoji: '🌳',
    description: 'Talk about animals, landscapes and the outdoors.',
    words: [
      ['le chien', 'the dog'], ['le chat', 'the cat'], ['le cheval', 'the horse (pl. chevaux)'], ["l'oiseau", 'the bird (pl. oiseaux)'], ['la vache', 'the cow'],
      ['le poisson rouge', 'the goldfish'], ['la forêt', 'the forest'], ['la montagne', 'the mountain'], ['la rivière', 'the river'], ['le lac', 'the lake'],
      ["l'arbre", 'the tree'], ['la fleur', 'the flower'], ['le ciel', 'the sky'], ['la mer', 'the sea'], ["l'île", 'the island'],
    ],
    sentences: [
      ["Il y a beaucoup d'oiseaux dans la forêt.", 'There are lots of birds in the forest.'],
      ['Nous avons fait une randonnée à la montagne.', 'We went hiking in the mountains.'],
      ['Les chevaux mangent dans le champ.', 'The horses are eating in the field.'],
      ["Quand j'étais petit, j'avais un chien.", 'When I was little, I had a dog.'],
      ['Le lac est plus grand que la rivière.', 'The lake is bigger than the river.'],
    ],
    grammar: `
## Plurals in -aux and -eaux
- **-al → -aux**: *un cheval, des chevaux · un animal, des animaux · un journal, des journaux*
- **-eau → -eaux**, **-eu → -eux** (with x): *un oiseau, des oiseaux · un jeu, des jeux*

The x is silent like the s. A few -al words just add s: *un festival, des festivals*.

## Nature with à, en, dans
**à la** montagne, **à la** campagne, **à la** mer · **dans la** forêt · **sur une** île
`,
  },
  {
    id: 'fr-a2-12', title: 'Sport & fitness', titleEs: 'Le sport', emoji: '🏃',
    description: 'Talk about sports, training and how often you do them.',
    words: [
      ['la natation', 'swimming'], ['la course à pied', 'running'], ['faire du vélo', 'to cycle'], ['la randonnée', 'hiking'], ['le yoga', 'yoga'],
      ['la salle de sport', 'the gym'], ["l'équipe", 'the team'], ['le match', 'the match'], ['gagner un match', 'to win a match'], ['perdre', 'to lose'],
      ["s'entraîner", 'to train'], ['une fois par semaine', 'once a week'], ['tous les jours', 'every day'], ['jamais', 'never'], ['en forme', 'fit'],
    ],
    sentences: [
      ['Je fais de la natation deux fois par semaine.', 'I go swimming twice a week.'],
      ["Notre équipe a gagné le match hier.", 'Our team won the match yesterday.'],
      ["Je ne fais jamais de sport le dimanche.", 'I never do sport on Sundays.'],
      ['Elle court tous les matins.', 'She runs every morning.'],
      ["Je vais à la salle de sport pour rester en forme.", 'I go to the gym to stay fit.'],
    ],
    grammar: `
## How often?
**jamais** (never) · **rarement** · **parfois** · **souvent** · **tous les jours** · **une fois / deux fois par semaine**
**ne … jamais** wraps the verb like *ne … pas*: ${ex('Je ne cours jamais.', 'I never run.')}

## faire de + sport
**faire du** vélo / yoga · **faire de la** natation / randonnée · **faire de l'**athlétisme. Negative: ${ex('Je ne fais pas de vélo.', "I don't cycle.")}

**courir** (to run): je cours, tu cours, il court, nous courons, vous courez, ils courent · passé composé: j'ai couru.
`,
    conj: { verbs: ['courir', 'faire'], tenses: ['presente', 'perfecto'] },
  },
  {
    id: 'fr-a2-13', title: 'Celebrations', titleEs: 'Les fêtes', emoji: '🎉',
    description: 'Talk about birthdays, holidays and celebrations.',
    words: [
      ["l'anniversaire", 'the birthday'], ['Noël', 'Christmas'], ['le jour de l\'An', "New Year's Day"], ['Pâques', 'Easter'], ['le mariage', 'the wedding'],
      ['le gâteau', 'the cake'], ['la bougie', 'the candle'], ['les invités', 'the guests'], ['inviter', 'to invite'], ['offrir', 'to give (a present)'],
      ['fêter', 'to celebrate'], ['joyeux anniversaire', 'happy birthday'], ['bonne année', 'happy new year'], ['félicitations', 'congratulations'], ['la carte de vœux', 'the greetings card'],
    ],
    sentences: [
      ["Joyeux anniversaire ! Tu as quel âge ?", 'Happy birthday! How old are you?'],
      ["Pour Noël, je lui ai offert un livre.", 'For Christmas I gave him a book.'],
      ['Nous avons invité trente personnes au mariage.', 'We invited thirty people to the wedding.'],
      ["Le 14 juillet, on fête la fête nationale.", 'On 14 July we celebrate the national holiday.'],
      ["Félicitations pour ton nouveau travail !", 'Congratulations on your new job!'],
    ],
    grammar: `
## Two objects: something to someone
${ex("J'offre un cadeau à ma mère.", "I'm giving my mother a present.")} → ${ex('Je lui offre un cadeau.', "I'm giving her a present.")}
The person with **à** becomes **lui / leur**, the thing becomes **le / la / les**.

## Wishing people well
**Joyeux anniversaire ! · Joyeux Noël ! · Bonne année ! · Bonne fête ! · Félicitations !**
On 14 July (*le 14 Juillet*) France celebrates the storming of the Bastille with fireworks and *bals*.
`,
  },
  {
    id: 'fr-a2-14', title: 'Money & the bank', titleEs: 'L’argent et la banque', emoji: '🏦',
    description: 'Pay, withdraw money and talk about prices.',
    words: [
      ['le compte', 'the account'], ['la carte bancaire', 'the bank card'], ['le distributeur', 'the cash machine'], ['les espèces', 'cash'], ['la monnaie', 'the change / coins'],
      ['retirer', 'to withdraw'], ['dépenser', 'to spend (money)'], ['économiser', 'to save'], ['rembourser', 'to pay back / refund'], ['le reçu', 'the receipt'],
      ['le code', 'the PIN'], ['gratuit', 'free (of charge)'], ['la réduction', 'the discount'], ['payer par carte', 'to pay by card'], ['le prêt', 'the loan'],
    ],
    sentences: [
      ['Je peux payer par carte ?', 'Can I pay by card?'],
      ["J'ai retiré cinquante euros au distributeur.", 'I took fifty euros out at the cash machine.'],
      ["Je n'ai pas de monnaie, désolé.", "I don't have any change, sorry."],
      ['Le magasin m\'a remboursé.', 'The shop refunded me.'],
      ["J'économise pour acheter une voiture.", "I'm saving to buy a car."],
    ],
    grammar: `
## Paying
**payer par carte · payer en espèces · payer avec son téléphone** · ${ex('Vous avez la monnaie ?', 'Do you have change?')}

## pour + infinitive: in order to
${ex("J'économise pour voyager.", "I'm saving to travel.")} · Like *aller* + infinitive, only the first verb is conjugated.

## Free or freedom?
**gratuit** = costs nothing · **libre** = free to do, available. *L'entrée est gratuite* / *Je suis libre ce soir*.
`,
    conj: { verbs: ['payer'], tenses: ['presente', 'perfecto'] },
  },
]);

export const FR_MORE_B1 = units('B1', [
  {
    id: 'fr-b1-09', title: 'Healthy living', titleEs: 'La santé au quotidien', emoji: '🥗',
    description: 'Talk about habits, diet and wellbeing, and give advice.',
    words: [
      ["l'alimentation", 'diet / food'], ['équilibré', 'balanced'], ['le sommeil', 'sleep'], ['les habitudes', 'habits'], ['arrêter de fumer', 'to stop smoking'],
      ['le poids', 'the weight'], ['grossir', 'to put on weight'], ['maigrir', 'to lose weight'], ['les sucreries', 'sweets'], ['la santé mentale', 'mental health'],
      ['bouger', 'to move / to be active'], ['le régime', 'the diet (to lose weight)'], ['bio', 'organic'], ['éviter', 'to avoid'], ['le bien-être', 'wellbeing'],
    ],
    sentences: [
      ["Il faut que tu dormes au moins sept heures.", 'You need to sleep at least seven hours.'],
      ['Si je mangeais moins de sucre, je serais en meilleure forme.', "If I ate less sugar, I'd be in better shape."],
      ["Mon médecin m'a conseillé de bouger plus.", 'My doctor advised me to move more.'],
      ["J'ai arrêté de fumer il y a deux ans.", 'I stopped smoking two years ago.'],
      ['Tu devrais éviter les écrans le soir.', 'You should avoid screens in the evening.'],
    ],
    grammar: `
## Three ways to give advice
- **il faut que** + subjonctif: ${ex('Il faut que tu manges mieux.', 'You need to eat better.')}
- **tu devrais** + infinitive: ${ex('Tu devrais faire du sport.', 'You should do some sport.')}
- **si j'étais toi, je…** (si + imparfait → conditionnel)

## conseiller / arrêter / éviter + de + infinitive
${ex("Je te conseille d'aller chez le médecin.", 'I advise you to go to the doctor.')} · *arrêter **de** fumer · éviter **de** manger tard*
`,
  },
  {
    id: 'fr-b1-10', title: 'Travel problems', titleEs: 'Les problèmes en voyage', emoji: '🧳',
    description: 'Deal with delays, lost luggage and complaints.',
    words: [
      ['annulé', 'cancelled'], ['le retard', 'the delay'], ['la correspondance', 'the connection'], ['les bagages', 'the luggage'], ['perdu', 'lost'],
      ['la réclamation', 'the complaint'], ['se plaindre', 'to complain'], ['le remboursement', 'the refund'], ['la grève', 'the strike'], ['le guichet', 'the ticket office'],
      ['la réservation', 'the booking'], ['complet', 'full / fully booked'], ['la chambre double', 'the double room'], ['le climatiseur', 'the air conditioner'], ['en panne', 'broken down'],
    ],
    sentences: [
      ['Mon vol a été annulé à cause de la grève.', 'My flight was cancelled because of the strike.'],
      ["J'ai raté ma correspondance.", 'I missed my connection.'],
      ["Ma valise n'est pas arrivée.", "My suitcase hasn't arrived."],
      ['Le climatiseur de la chambre est en panne.', 'The air conditioner in the room is broken.'],
      ["Je voudrais qu'on me rembourse le billet.", "I'd like the ticket to be refunded."],
    ],
    grammar: `
## Complaining politely
Use the conditionnel and the subjonctif:
- ${ex('Je voudrais parler au responsable.', "I'd like to speak to the manager.")}
- ${ex("Pourriez-vous changer ma chambre ?", 'Could you change my room?')}
- ${ex("J'aimerais que vous me remboursiez.", "I'd like you to refund me.")}

## What happened: a été + participle
${ex('Le train a été annulé.', 'The train was cancelled.')} The thing it happened to comes first; the participle agrees like an adjective: *la réunion a été annulée*.
`,
  },
  {
    id: 'fr-b1-11', title: 'Living & renting', titleEs: 'Se loger', emoji: '🏘️',
    description: 'Find a flat, talk to a landlord and describe where you live.',
    words: [
      ['le propriétaire', 'the landlord / owner'], ['le locataire', 'the tenant'], ['le loyer', 'the rent'], ['les charges', 'the service charges'], ['la caution', 'the deposit'],
      ['le bail', 'the lease'], ['meublé', 'furnished'], ['la colocation', 'the flat-share'], ["l'étage", 'the floor (storey)'], ["l'ascenseur", 'the lift'],
      ['lumineux', 'bright'], ['bruyant', 'noisy'], ['le quartier', 'the neighbourhood'], ['emménager', 'to move in'], ['la petite annonce', 'the small ad'],
    ],
    sentences: [
      ["Le loyer est de huit cents euros, charges comprises.", 'The rent is eight hundred euros, bills included.'],
      ["Je cherche un appartement qui soit proche du métro.", "I'm looking for a flat that is close to the metro."],
      ["C'est le quartier où j'aimerais habiter.", "It's the neighbourhood where I'd like to live."],
      ['Le propriétaire veut deux mois de caution.', 'The landlord wants two months’ deposit.'],
      ["Nous emménagerons le premier septembre.", 'We will move in on the first of September.'],
    ],
    grammar: `
## Describing what you're looking for
**qui / que / où** to add detail: ${ex("Je cherche une chambre qui ne soit pas trop chère.", "I'm looking for a room that isn't too expensive.")}
After **chercher** + something that may not exist, French often uses the subjonctif in the qui-clause.

## Small-ad abbreviations
**T2 / F2** (two rooms: living room + bedroom) · **cc** (charges comprises, bills included) · **m²** · **RDC** (rez-de-chaussée, ground floor)
`,
  },
  {
    id: 'fr-b1-12', title: 'Festivals & traditions', titleEs: 'Les fêtes et les traditions', emoji: '🎭',
    description: 'Describe traditions and compare them with your own.',
    words: [
      ['la tradition', 'the tradition'], ['la galette des rois', 'the kings’ cake (January)'], ['la Chandeleur', 'Candlemas (crêpe day)'], ['le poisson d’avril', 'April fool'],
      ['la fête de la musique', 'the music festival (21 June)'], ['le feu d’artifice', 'the fireworks'], ['le défilé', 'the parade'], ['le bal', 'the dance (party)'],
      ['célébrer', 'to celebrate'], ['à l’origine', 'originally'], ['ancien', 'old / ancient'], ['la coutume', 'the custom'], ['le pays d’origine', 'the home country'],
      ['partager', 'to share'], ['la fève', 'the charm (in the cake)'],
    ],
    sentences: [
      ['En janvier, on mange la galette des rois.', 'In January we eat the kings’ cake.'],
      ['La personne qui trouve la fève devient le roi.', 'The person who finds the charm becomes the king.'],
      ['Le 21 juin, tout le monde joue de la musique dans la rue.', 'On 21 June everyone plays music in the street.'],
      ["Le 1er avril, les enfants accrochent des poissons dans le dos des gens.", "On 1 April children stick fish on people's backs."],
      ["Dans mon pays, nous célébrions le Nouvel An différemment.", 'In my country we used to celebrate New Year differently.'],
    ],
    grammar: `
## Explaining a tradition
- general truth: present with **on**: ${ex("À la Chandeleur, on fait des crêpes.", 'At Candlemas, people make pancakes.')}
- its origin: passé composé / imparfait: ${ex("À l'origine, c'était une fête religieuse.", 'Originally it was a religious festival.')}

## Comparing with your country
**Chez nous, …** · **Dans mon pays, …** · **C'est comme… / Ce n'est pas comme…** · **alors que** (whereas): ${ex("En France, on fête Noël le 24 au soir, alors que chez nous, c'est le 25.", 'In France Christmas is celebrated on the evening of the 24th, whereas at home it is on the 25th.')}
`,
  },
]);

export const FR_MORE_UNIT_LESSONS: Record<string, string[]> = {
  'fr-a1-15': ['fr-g-gender'],
  'fr-a1-16': ['fr-g-partitive'],
  'fr-a1-17': ['fr-g-questions'],
  'fr-a2-11': ['fr-g-comparison'],
  'fr-a2-12': ['fr-g-aller-faire', 'fr-g-passe-compose'],
  'fr-a2-13': ['fr-g-pronouns-indirect'],
  'fr-a2-14': ['fr-g-passe-compose'],
  'fr-b1-09': ['fr-g-subj-use', 'fr-g-conditionnel'],
  'fr-b1-10': ['fr-g-conditionnel', 'fr-g-subj-use'],
  'fr-b1-11': ['fr-g-relatives'],
  'fr-b1-12': ['fr-g-pc-vs-imp'],
};
