import { units } from '../build';
import { ex } from './registry';
import { FR_A2_UNIT_LESSONS, FR_A2_UNITS } from './a2';
import { FR_B1_UNIT_LESSONS, FR_B1_UNITS } from './b1';

/** French A1. Each note shows the forms its sentences use before (or where) they first appear. */
const FR_A1_UNITS = units('A1', [
  {
    id: 'fr-a1-01', title: 'Greetings & introductions', titleEs: 'Les salutations', emoji: '👋',
    description: 'Say hello, introduce yourself and be polite.',
    words: [
      ['bonjour', 'hello / good morning', 'Bonjour, madame !', 'Hello, madam!'], ['salut', 'hi / bye (informal)'], ['au revoir', 'goodbye'],
      ['bonsoir', 'good evening'], ['bonne nuit', 'good night'], ['ça va ?', 'how are you?', 'Salut, ça va ?', 'Hi, how are you?'],
      ['bien', 'well / good'], ['merci', 'thank you'], ["s'il vous plaît", 'please (formal)'], ["s'il te plaît", 'please (informal)'],
      ['oui', 'yes'], ['non', 'no'], ['excusez-moi', 'excuse me'], ['pardon', 'sorry'], ['enchanté', 'nice to meet you'],
      ['à bientôt', 'see you soon'], ['monsieur', 'sir / Mr'], ['madame', 'madam / Mrs'],
    ],
    sentences: [
      ["Bonjour, je m'appelle Paul.", 'Hello, my name is Paul.'],
      ["Comment tu t'appelles ?", 'What is your name?'],
      ['Je suis anglais.', 'I am English.'],
      ['Comment allez-vous ?', 'How are you? (formal)'],
      ['Ça va bien, merci.', "I'm fine, thanks."],
    ],
    grammar: `
## Subject pronouns and être (to be)
| je suis | I am |
| tu es | you are (informal) |
| il / elle / on est | he / she / one is |
| nous sommes | we are |
| vous êtes | you are (formal or plural) |
| ils / elles sont | they are |

**on** means "one / people", and in everyday speech it means **we**: ${ex('On est contents.', "We're happy.")} uses the il form.

## tu or vous?
- **tu**: friends, family, children, people your age
- **vous**: strangers, shops, work, and always for several people

## How are you?
- **Ça va ?** (informal) · **Comment allez-vous ?** (formal, from the verb *aller*, coming in Around town)
- **Ça va bien, merci.**: I'm fine, thanks.

## Your name: a fixed phrase for now
- **Je m'appelle…**: My name is… (literally "I call myself")
- **Tu t'appelles…?** · **Il / Elle s'appelle…**: His / her name is…

The whole verb *s'appeler* comes in Daily routine.

## Written with a space
French puts a space before **? ! : ;**: ${ex('Ça va ?', 'How are you?')}
`,
    conj: { verbs: ['être'], tenses: ['presente'] },
  },
  {
    id: 'fr-a1-02', title: 'Numbers & age', titleEs: 'Les nombres et l’âge', emoji: '🔢',
    description: 'Count to 30 and say how old you are.',
    words: [
      ['zéro', 'zero'], ['un', 'one'], ['deux', 'two'], ['trois', 'three'], ['quatre', 'four'], ['cinq', 'five'], ['six', 'six'],
      ['sept', 'seven'], ['huit', 'eight'], ['neuf', 'nine'], ['dix', 'ten'], ['onze', 'eleven'], ['douze', 'twelve'],
      ['quinze', 'fifteen'], ['vingt', 'twenty'], ['trente', 'thirty'], ["l'an", 'the year (of age)', "J'ai vingt ans.", 'I am twenty.'],
      ['quel âge ?', 'how old?'],
    ],
    sentences: [
      ["J'ai vingt ans.", 'I am twenty.'],
      ['Quel âge as-tu ?', 'How old are you?'],
      ['Mon frère a douze ans.', 'My brother is twelve.'],
      ["J'ai deux chats.", 'I have two cats.'],
      ['Elle a quinze ans.', 'She is fifteen.'],
    ],
    grammar: `
## Numbers 0–30
| 0 zéro | 1 un | 2 deux | 3 trois |
| 4 quatre | 5 cinq | 6 six | 7 sept |
| 8 huit | 9 neuf | 10 dix | 11 onze |
| 12 douze | 13 treize | 14 quatorze | 15 quinze |
| 16 seize | 17 dix-sept | 18 dix-huit | 19 dix-neuf |
| 20 vingt | 21 vingt et un | 22 vingt-deux | 30 trente |

From 17 the numbers are built like sums: **dix-sept** = ten-seven.

## Age uses avoir (to have)
In French you **have** years: ${ex("J'ai vingt-cinq ans.", 'I am twenty-five.')} Never *je suis 25*.
| j'ai | nous avons |
| tu as | vous avez |
| il / elle a | ils / elles ont |

**je** becomes **j'** before a vowel: *j'ai*, never *je ai*. This is called elision, and it happens everywhere in French.

**mon frère** = my brother, **ma sœur** = my sister; the full set comes in the next unit.
`,
    conj: { verbs: ['avoir'], tenses: ['presente'] },
  },
  {
    id: 'fr-a1-03', title: 'Family', titleEs: 'La famille', emoji: '👨‍👩‍👧',
    description: 'Talk about your family.',
    words: [
      ['la famille', 'the family'], ['le père', 'the father'], ['la mère', 'the mother'], ['les parents', 'the parents'],
      ['le frère', 'the brother'], ['la sœur', 'the sister'], ["l'enfant", 'the child'], ['le fils', 'the son'], ['la fille', 'the daughter / girl'],
      ['le grand-père', 'the grandfather'], ['la grand-mère', 'the grandmother'], ['le mari', 'the husband'], ['la femme', 'the wife / woman'],
      ["l'oncle", 'the uncle'], ['la tante', 'the aunt'], ['le cousin', 'the cousin (m)'], ['habiter', 'to live (somewhere)', "J'habite à Paris.", 'I live in Paris.'],
    ],
    sentences: [
      ['Ma mère s\'appelle Marie.', 'My mother is called Marie.'],
      ["J'ai un frère et une sœur.", 'I have a brother and a sister.'],
      ['Mes grands-parents habitent à Lyon.', 'My grandparents live in Lyon.'],
      ['Son père est médecin.', 'His father is a doctor.'],
      ['Tu as des enfants ?', 'Do you have children?'],
    ],
    grammar: `
## Two genders: le and la
Every noun is **masculine** or **feminine**, and the article shows which.
| | masculine | feminine | plural |
| the | **le** père | **la** mère | **les** parents |
| a / some | **un** frère | **une** sœur | **des** enfants |

**le** and **la** become **l'** before a vowel: *l'enfant, l'oncle*. **des** ("some") has no English word, but French needs it.

## My, your, his
The possessive agrees with the **thing owned**, not the owner:
| | masculine | feminine | plural |
| my | mon frère | ma sœur | mes parents |
| your | ton frère | ta sœur | tes parents |
| his / her | son frère | sa sœur | ses parents |

So *sa mère* is both "his mother" and "her mother". Before a vowel, feminine nouns take **mon / ton / son**: *mon amie*.

## Your first regular verb: habiter
Most verbs end in **-er** and follow one pattern: the stem **habit-** plus an ending.
| j'habit**e** | nous habit**ons** |
| tu habit**es** | vous habit**ez** |
| il / elle habit**e** | ils / elles habit**ent** |

The endings **-e, -es, -e, -ent** are all silent, so *habite, habites, habitent* sound the same.
`,
    conj: { verbs: ['habiter'], tenses: ['presente'] },
  },
  {
    id: 'fr-a1-04', title: 'Describing people & things', titleEs: 'Décrire', emoji: '🧑',
    description: 'Describe how people and things look and are.',
    words: [
      ['grand', 'tall / big'], ['petit', 'small / short'], ['jeune', 'young'], ['vieux', 'old'], ['beau', 'beautiful / handsome'],
      ['joli', 'pretty'], ['sympa', 'nice / friendly'], ['gentil', 'kind'], ['content', 'happy / pleased'], ['fatigué', 'tired', 'Je suis fatigué.', 'I am tired.'],
      ['blanc', 'white'], ['noir', 'black'], ['rouge', 'red'], ['bleu', 'blue'], ['vert', 'green'], ['nouveau', 'new'],
      ['très', 'very'], ['un peu', 'a bit'],
    ],
    sentences: [
      ['La maison est grande et blanche.', 'The house is big and white.'],
      ['Ma sœur est très sympa.', 'My sister is very nice.'],
      ['Je suis un peu fatigué.', 'I am a bit tired.'],
      ["La voiture n'est pas nouvelle.", 'The car is not new.'],
      ['Les chiens sont petits.', 'The dogs are small.'],
    ],
    grammar: `
## Adjectives agree with the noun
Add **-e** for feminine and **-s** for plural:
| | singular | plural |
| masculine | un chat noir | des chats noir**s** |
| feminine | une robe noir**e** | des robes noir**es** |

Adjectives already ending in **-e** don't change for gender: *un garçon jeune, une fille jeune*. Some change more: *blanc → blanche, gentil → gentille, nouveau → nouvelle, vieux → vieille, beau → belle*.

## Where does the adjective go?
Most go **after** the noun: ${ex('une voiture rouge', 'a red car')}. A few short, very common ones go **before**: beau, joli, grand, petit, jeune, vieux, nouveau, bon. ${ex("C'est un petit chat.", "It's a small cat.")}

## ne … pas: not
The negation wraps around the verb: **ne** before, **pas** after. **ne** becomes **n'** before a vowel.
- ${ex('Je suis fatigué.', 'I am tired.')} → ${ex('Je ne suis pas fatigué.', 'I am not tired.')}
- ${ex('Elle est contente.', 'She is happy.')} → ${ex("Elle n'est pas contente.", 'She is not happy.')}
`,
    conj: { verbs: ['être'], tenses: ['presente'] },
  },
  {
    id: 'fr-a1-05', title: 'At home', titleEs: 'À la maison', emoji: '🏠',
    description: 'Describe your home and say where things are.',
    words: [
      ['la maison', 'the house'], ["l'appartement", 'the flat / apartment'], ['la chambre', 'the bedroom'], ['la cuisine', 'the kitchen'],
      ['la salle de bains', 'the bathroom'], ['le salon', 'the living room'], ['le jardin', 'the garden'], ['la table', 'the table'],
      ['la chaise', 'the chair'], ['le lit', 'the bed'], ['le canapé', 'the sofa'], ['la fenêtre', 'the window'], ['la porte', 'the door'],
      ['il y a', 'there is / there are', 'Il y a un jardin.', 'There is a garden.'], ['sur', 'on'], ['sous', 'under'], ['dans', 'in'], ['à côté de', 'next to'],
    ],
    sentences: [
      ['Il y a deux chambres dans mon appartement.', 'There are two bedrooms in my flat.'],
      ['Le chat est sous la table.', 'The cat is under the table.'],
      ['La cuisine est à côté du salon.', 'The kitchen is next to the living room.'],
      ["J'habite dans une petite maison.", 'I live in a small house.'],
      ['Où est la salle de bains ?', 'Where is the bathroom?'],
    ],
    grammar: `
## il y a: there is / there are
One phrase for singular and plural: ${ex('Il y a un lit.', 'There is a bed.')} · ${ex('Il y a deux chaises.', 'There are two chairs.')}
Negative: **il n'y a pas de**: ${ex("Il n'y a pas de jardin.", 'There is no garden.')} (after a negative, un / une / des become **de**).

## Where is it?
**sur** (on), **sous** (under), **dans** (in), **devant** (in front of), **derrière** (behind), **à côté de** (next to), **en face de** (opposite).

## de + le = du
Phrases ending in **de** melt into the article:
| de + le | → **du** | à côté **du** salon |
| de + la | → de la | à côté **de la** cuisine |
| de + l' | → de l' | à côté **de l'**entrée |
| de + les | → **des** | à côté **des** chambres |
`,
  },
  {
    id: 'fr-a1-06', title: 'Food & drink', titleEs: 'Manger et boire', emoji: '🥖',
    description: 'Order food and drink and say what you like.',
    words: [
      ['le pain', 'the bread'], ['le fromage', 'the cheese'], ['la viande', 'the meat'], ['le poisson', 'the fish'], ['le poulet', 'the chicken'],
      ['les légumes', 'the vegetables'], ['le fruit', 'the fruit'], ["l'eau", 'the water'], ['le café', 'the coffee / café'], ['le thé', 'the tea'],
      ['le vin', 'the wine'], ['le lait', 'the milk'], ['le petit-déjeuner', 'the breakfast'], ['le déjeuner', 'the lunch'], ['le dîner', 'the dinner'],
      ['manger', 'to eat'], ['aimer', 'to like / to love', "J'aime le fromage.", 'I like cheese.'], ['je voudrais', "I'd like", 'Je voudrais un café, s\'il vous plaît.', "I'd like a coffee, please."],
    ],
    sentences: [
      ["Je voudrais un café, s'il vous plaît.", "I'd like a coffee, please."],
      ['Je ne mange pas de viande.', "I don't eat meat."],
      ["Nous buvons de l'eau.", 'We drink water.'],
      ['Tu manges quoi au petit-déjeuner ?', 'What do you eat for breakfast?'],
      ['Le pain est très bon.', 'The bread is very good.'],
    ],
    grammar: `
## -er verbs: the whole pattern
You met *habiter*. Every regular -er verb works the same way:
| je mang**e** | nous mange**ons** |
| tu mang**es** | vous mang**ez** |
| il / elle mang**e** | ils / elles mang**ent** |

*manger* keeps an **e** before -ons so the g stays soft: *nous mangeons*. With a vowel, je becomes j': *j'aime*.

## Some: du, de la, des
For food you don't count, French says "some of the": ${ex('Je mange du pain.', 'I eat bread.')} · ${ex('Tu bois de la bière ?', 'Do you drink beer?')} · ${ex("Nous buvons de l'eau.", 'We drink water.')}
After a negative they all become **de**: ${ex('Je ne mange pas de viande.', "I don't eat meat.")}

But after **aimer, adorer, détester, préférer** use **le / la / les**, because you like the thing in general: ${ex("J'aime le fromage.", 'I like cheese.')}

## Ordering politely
**Je voudrais…** (I would like) is the polite way to order. **boire** (to drink) is irregular: je bois, tu bois, il boit, nous buvons, vous buvez, ils boivent.
`,
    conj: { verbs: ['manger', 'aimer', 'boire'], tenses: ['presente'] },
  },
  {
    id: 'fr-a1-07', title: 'Daily routine', titleEs: 'La routine', emoji: '⏰',
    description: 'Describe your day and tell the time.',
    words: [
      ['se lever', 'to get up'], ['se réveiller', 'to wake up'], ['se coucher', 'to go to bed'], ['se doucher', 'to shower'],
      ["s'habiller", 'to get dressed'], ['travailler', 'to work'], ['le matin', 'the morning'], ["l'après-midi", 'the afternoon'],
      ['le soir', 'the evening'], ["l'heure", 'the hour / time', 'Quelle heure est-il ?', 'What time is it?'], ['tôt', 'early'], ['tard', 'late'],
      ['toujours', 'always'], ['souvent', 'often'], ['parfois', 'sometimes'], ['ensuite', 'then / next'],
    ],
    sentences: [
      ['Je me lève à sept heures.', 'I get up at seven.'],
      ['Le soir, je regarde la télé.', 'In the evening I watch TV.'],
      ['Il est huit heures et demie.', 'It is half past eight.'],
      ['Nous travaillons le matin.', 'We work in the morning.'],
      ['Tu te couches tard ?', 'Do you go to bed late?'],
    ],
    grammar: `
## Reflexive verbs: the action comes back to you
A reflexive verb carries a pronoun that matches the subject: **me, te, se, nous, vous, se**. It goes before the verb (and becomes m', t', s' before a vowel).
| je **me** lève | nous **nous** levons |
| tu **te** lèves | vous **vous** levez |
| il / elle **se** lève | ils / elles **se** lèvent |

*se lever* also writes **è** where the syllable is stressed (lève) but not in *levons, levez*. Now you can see *s'appeler* is the same: *je m'appelle* = I call myself.

## Telling the time
- **Quelle heure est-il ?**: ${ex('Il est huit heures.', "It's eight o'clock.")}
- **et quart** (quarter past) · **et demie** (half past) · **moins le quart** (quarter to)
- **à** huit heures = at eight o'clock · **midi** (noon) · **minuit** (midnight)
`,
    conj: { verbs: ['se lever', 'se coucher', 'travailler'], tenses: ['presente'] },
  },
  {
    id: 'fr-a1-08', title: 'Around town', titleEs: 'En ville', emoji: '🏙️',
    description: 'Say where you are going and what you are going to do.',
    words: [
      ['la ville', 'the town / city'], ['la rue', 'the street'], ['la gare', 'the station'], ['la banque', 'the bank'], ['la poste', 'the post office'],
      ['le supermarché', 'the supermarket'], ['le marché', 'the market'], ['le cinéma', 'the cinema'], ['le musée', 'the museum'], ["l'église", 'the church'],
      ['la pharmacie', 'the pharmacy'], ['le restaurant', 'the restaurant'], ['aller', 'to go'], ['tout droit', 'straight on'], ['à gauche', 'on the left'],
      ['à droite', 'on the right'], ['loin', 'far'], ['près', 'near'],
    ],
    sentences: [
      ['Je vais au cinéma.', "I'm going to the cinema."],
      ['Nous allons à la gare.', "We're going to the station."],
      ['Ce soir, je vais manger au restaurant.', "Tonight I'm going to eat at the restaurant."],
      ['La banque est à gauche.', 'The bank is on the left.'],
      ['Où est la pharmacie ?', 'Where is the pharmacy?'],
    ],
    grammar: `
## aller (to go): irregular but essential
| je vais | nous allons |
| tu vas | vous allez |
| il / elle va | ils / elles vont |

## à + le = au
**à** (to, at) melts into le and les, just like *de*:
| à + le | → **au** | Je vais **au** cinéma. |
| à + la | → à la | Je vais **à la** gare. |
| à + l' | → à l' | Je vais **à l'**église. |
| à + les | → **aux** | Je vais **aux** toilettes. |

## aller + infinitive = going to
Exactly like English: ${ex('Je vais manger.', "I'm going to eat.")} · ${ex('Nous allons visiter le musée.', "We're going to visit the museum.")}
Only *aller* is conjugated; the second verb stays as it is.
`,
    conj: { verbs: ['aller'], tenses: ['presente'] },
  },
  {
    id: 'fr-a1-09', title: 'Free time & likes', titleEs: 'Les loisirs', emoji: '⚽',
    description: 'Talk about hobbies, sports and music.',
    words: [
      ['le sport', 'sport'], ['le football', 'football'], ['le tennis', 'tennis'], ['la musique', 'music'], ['le livre', 'the book'],
      ['le film', 'the film'], ['la guitare', 'the guitar'], ['le piano', 'the piano'], ['jouer', 'to play'], ['faire', 'to do / to make'],
      ['regarder', 'to watch'], ['écouter', 'to listen to'], ['lire', 'to read'], ['danser', 'to dance'], ['adorer', 'to love (things)'],
      ['détester', 'to hate'], ['le week-end', 'the weekend'],
    ],
    sentences: [
      ['Le week-end, je lis un livre.', 'At the weekend I read a book.'],
      ["J'adore écouter de la musique.", 'I love listening to music.'],
      ['Il joue au football le samedi.', 'He plays football on Saturdays.'],
      ['Elle joue du piano.', 'She plays the piano.'],
      ['Nous faisons du sport.', 'We do sport.'],
    ],
    grammar: `
## aimer / adorer + infinitive
After a verb of liking, the second verb stays in the infinitive: ${ex("J'aime danser.", 'I like dancing.')} · ${ex('Je déteste courir.', 'I hate running.')}

## jouer à or jouer de?
- a game or sport: **jouer à** (+ le = **au**): ${ex('Il joue au tennis.', 'He plays tennis.')}
- an instrument: **jouer de** (+ le = **du**): ${ex('Elle joue de la guitare.', 'She plays the guitar.')}

## faire (to do / to make)
| je fais | nous faisons |
| tu fais | vous faites |
| il / elle fait | ils / elles font |

**lire** (to read) is irregular too: je lis, tu lis, il lit, nous lisons, vous lisez, ils lisent.

Sports often use **faire du / de la**: ${ex('Je fais du vélo.', 'I go cycling.')} · ${ex('Tu fais de la natation ?', 'Do you swim?')}

## The weekend, on Saturdays
**le** + day = every week: *le samedi* (on Saturdays). Without le it means one day: *samedi* (this Saturday).
`,
    conj: { verbs: ['faire', 'jouer', 'lire'], tenses: ['presente'] },
  },
  {
    id: 'fr-a1-10', title: 'Days, months & weather', titleEs: 'Le temps', emoji: '☀️',
    description: 'Talk about days, dates and the weather.',
    words: [
      ['lundi', 'Monday'], ['mardi', 'Tuesday'], ['mercredi', 'Wednesday'], ['jeudi', 'Thursday'], ['vendredi', 'Friday'], ['samedi', 'Saturday'],
      ['dimanche', 'Sunday'], ['janvier', 'January'], ['juillet', 'July'], ['la semaine', 'the week'], ['le mois', 'the month'],
      ["aujourd'hui", 'today'], ['demain', 'tomorrow'], ['hier', 'yesterday'], ['il fait beau', 'the weather is nice'], ['il pleut', "it's raining"],
      ['il fait froid', "it's cold"], ['il fait chaud', "it's hot"],
    ],
    sentences: [
      ["Aujourd'hui, c'est lundi.", 'Today is Monday.'],
      ['En hiver, il fait froid.', "In winter it's cold."],
      ['Il pleut beaucoup à Paris.', 'It rains a lot in Paris.'],
      ["Mon anniversaire, c'est le trois mai.", 'My birthday is on the third of May.'],
      ['Demain, il va faire beau.', 'Tomorrow the weather is going to be nice.'],
    ],
    grammar: `
## Days and months: small letters
Days and months are written **without a capital**: *lundi, mai*. Dates use plain numbers: *le trois mai* (the third of May). Only the first is special: *le premier janvier*.

## The weather uses faire
French says "it makes": ${ex('Il fait beau.', 'The weather is nice.')} · ${ex('Il fait froid.', "It's cold.")} · ${ex('Il fait 20 degrés.', "It's 20 degrees.")}
Rain and snow have their own verbs: **il pleut** (it rains), **il neige** (it snows).

## Seasons
**en** été, **en** automne, **en** hiver, but **au** printemps.
`,
  },
  {
    id: 'fr-a1-11', title: 'Countries & languages', titleEs: 'Les pays et les langues', emoji: '🌍',
    description: 'Say where you are from and which languages you speak.',
    words: [
      ['la France', 'France'], ["l'Angleterre", 'England'], ["l'Espagne", 'Spain'], ["l'Allemagne", 'Germany'], ['le Canada', 'Canada'],
      ['les États-Unis', 'the United States'], ['le pays', 'the country'], ['la langue', 'the language'], ['le français', 'French (language)'],
      ["l'anglais", 'English (language)'], ['français', 'French (nationality)', 'Il est français.', 'He is French.'], ['anglais', 'English (nationality)'],
      ['espagnol', 'Spanish'], ['allemand', 'German'], ['parler', 'to speak'], ['venir', 'to come'],
    ],
    sentences: [
      ['Je viens du Canada.', 'I come from Canada.'],
      ['Elle est espagnole.', 'She is Spanish.'],
      ['Nous parlons français et anglais.', 'We speak French and English.'],
      ["J'habite en France.", 'I live in France.'],
      ['Tu parles allemand ?', 'Do you speak German?'],
    ],
    grammar: `
## Nationalities agree like adjectives
${ex('Il est français.', 'He is French.')} ${ex('Elle est français**e**.', 'She is French.')} · ${ex('Ils sont anglais.', 'They are English.')} ${ex('Elles sont anglais**es**.', 'They (f) are English.')} They are written **small**; only the people as nouns are capitalised: *un Français*.

## In / to a country
- feminine countries (most ending in -e): **en**: *en France, en Espagne*
- masculine countries: **au**: *au Canada, au Japon*
- plural: **aux**: *aux États-Unis*
- towns: **à**: *à Paris*

## venir (to come)
| je viens | nous venons |
| tu viens | vous venez |
| il / elle vient | ils / elles viennent |

From a country: **de / d'** + feminine, **du** + masculine: ${ex("Je viens d'Espagne.", 'I come from Spain.')} · ${ex('Je viens du Japon.', 'I come from Japan.')}
`,
    conj: { verbs: ['parler', 'venir'], tenses: ['presente'] },
  },
  {
    id: 'fr-a1-12', title: 'Jobs & work', titleEs: 'Le travail', emoji: '💼',
    description: 'Say what you do and where you work.',
    words: [
      ['le travail', 'the work / job'], ['le médecin', 'the doctor'], ['le professeur', 'the teacher'], ["l'étudiant", 'the student (m)'],
      ["l'étudiante", 'the student (f)'], ['le serveur', 'the waiter'], ['la serveuse', 'the waitress'], ["l'infirmier", 'the nurse (m)'],
      ["l'infirmière", 'the nurse (f)'], ["l'ingénieur", 'the engineer'], ['le bureau', 'the office'], ["l'hôpital", 'the hospital'],
      ["l'école", 'the school'], ['le magasin', 'the shop'], ['étudier', 'to study'], ['finir', 'to finish'],
    ],
    sentences: [
      ['Je suis professeur.', 'I am a teacher.'],
      ['Ma sœur est infirmière.', 'My sister is a nurse.'],
      ['Il travaille dans un bureau.', 'He works in an office.'],
      ['Nous finissons à six heures.', 'We finish at six.'],
      ['Tu es étudiant ?', 'Are you a student?'],
    ],
    grammar: `
## No article with jobs
After **être**, a job has no article: ${ex('Je suis médecin.', 'I am a doctor.')} With **c'est** you need one: ${ex("C'est un bon médecin.", "He's a good doctor.")}

## Masculine and feminine jobs
- add **-e**: étudiant → étudiant**e**
- **-er → -ère**: infirmier → infirm**ière**
- **-eur → -euse**: serveur → serv**euse**
- some stay the same: *un / une médecin, un / une professeur*

## The second group: -ir verbs like finir
Many -ir verbs add **-iss-** in the plural:
| je fin**is** | nous fin**issons** |
| tu fin**is** | vous fin**issez** |
| il / elle fin**it** | ils / elles fin**issent** |
`,
    conj: { verbs: ['travailler', 'finir'], tenses: ['presente'] },
  },
  {
    id: 'fr-a1-13', title: 'Questions & little words', titleEs: 'Les questions', emoji: '❓',
    description: 'Ask questions three ways and use question words.',
    words: [
      ['qui ?', 'who?'], ['quoi ?', 'what?'], ['où ?', 'where?'], ['quand ?', 'when?'], ['comment ?', 'how?'], ['pourquoi ?', 'why?'],
      ['parce que', 'because'], ['combien ?', 'how much / how many?'], ['quel', 'which / what (m)'], ['quelle', 'which / what (f)'],
      ["est-ce que", 'question marker', 'Est-ce que tu viens ?', 'Are you coming?'], ['et', 'and'], ['mais', 'but'], ['ou', 'or'],
      ['avec', 'with'], ['sans', 'without'],
    ],
    sentences: [
      ['Où est-ce que tu habites ?', 'Where do you live?'],
      ['Pourquoi tu étudies le français ?', 'Why are you studying French?'],
      ["Parce que j'aime la France.", 'Because I like France.'],
      ['Combien coûte le livre ?', 'How much does the book cost?'],
      ['Quelle heure est-il ?', 'What time is it?'],
    ],
    grammar: `
## Three ways to ask the same question
1. **Raise your voice** (everyday speech): ${ex('Tu viens ?', 'Are you coming?')}
2. **est-ce que** in front (neutral): ${ex('Est-ce que tu viens ?', 'Are you coming?')}
3. **Swap verb and pronoun** with a hyphen (formal, written): ${ex('Viens-tu ?', 'Are you coming?')}

Question words go first or last: ${ex('Où tu habites ?', 'Where do you live?')} · ${ex('Tu habites où ?', 'Where do you live?')} · ${ex('Où est-ce que tu habites ?', 'Where do you live?')}

## quel agrees
**quel** (m), **quelle** (f), **quels / quelles** (plural) all sound the same: ${ex('Quel âge as-tu ?', 'How old are you?')} · ${ex('Quelle heure est-il ?', 'What time is it?')}

## où and ou
**où** with an accent = where · **ou** without = or.
`,
  },
  {
    id: 'fr-a1-14', title: 'Everyday verbs', titleEs: 'Les verbes du quotidien', emoji: '🧩',
    description: 'Say what you can, want and must do.',
    words: [
      ['pouvoir', 'can / to be able to'], ['vouloir', 'to want'], ['devoir', 'must / to have to'], ['savoir', 'to know (a fact)'],
      ['prendre', 'to take'], ['comprendre', 'to understand'], ['apprendre', 'to learn'], ['attendre', 'to wait (for)'], ['dormir', 'to sleep'],
      ['sortir', 'to go out'], ['partir', 'to leave'], ['acheter', 'to buy'], ['payer', 'to pay'], ['ouvrir', 'to open'],
      ['fermer', 'to close'], ['aider', 'to help'], ['le bus', 'the bus'],
    ],
    sentences: [
      ['Je peux vous aider ?', 'Can I help you?'],
      ['Nous voulons partir tôt.', 'We want to leave early.'],
      ['Tu dois prendre le bus.', 'You have to take the bus.'],
      ['Je ne comprends pas.', "I don't understand."],
      ["J'attends le bus.", "I'm waiting for the bus."],
    ],
    grammar: `
## Verb + infinitive
**pouvoir, vouloir, devoir, savoir** are followed by an infinitive, like *aller*: ${ex('Je veux dormir.', 'I want to sleep.')} · ${ex('Tu dois partir.', 'You must leave.')}
| je peux | je veux | je dois |
| tu peux | tu veux | tu dois |
| il peut | il veut | il doit |
| nous pouvons | nous voulons | nous devons |
| vous pouvez | vous voulez | vous devez |
| ils peuvent | ils veulent | ils doivent |

The pattern: the stressed singular and *ils* forms have one vowel (**eu, oi**), *nous* and *vous* keep the infinitive's (**ou, e**).

## The -re verbs: attendre, prendre
Regular -re verbs drop -re and add **-s, -s, –, -ons, -ez, -ent**: *j'attends, il attend, nous attendons*. *prendre* follows them in the singular but loses its d in the plural: *nous prenons, ils prennent*.

## A softer way to ask
${ex('Je voudrais partir.', "I'd like to leave.")} (from vouloir) is more polite than *je veux*.
`,
    conj: { verbs: ['pouvoir', 'vouloir', 'devoir', 'prendre', 'attendre'], tenses: ['presente'] },
  },
]);

export const FR_UNITS = [...FR_A1_UNITS, ...FR_A2_UNITS, ...FR_B1_UNITS];

/** Grammar lessons that explain the grammar used in each unit. */
export const FR_UNIT_LESSONS: Record<string, string[]> = {
  ...FR_A2_UNIT_LESSONS,
  ...FR_B1_UNIT_LESSONS,
  'fr-a1-01': ['fr-g-etre-avoir'],
  'fr-a1-02': ['fr-g-etre-avoir'],
  'fr-a1-03': ['fr-g-gender', 'fr-g-verbs'],
  'fr-a1-04': ['fr-g-adjectives', 'fr-g-negation'],
  'fr-a1-05': ['fr-g-negation'],
  'fr-a1-06': ['fr-g-verbs', 'fr-g-partitive'],
  'fr-a1-07': ['fr-g-reflexive'],
  'fr-a1-08': ['fr-g-aller-faire'],
  'fr-a1-09': ['fr-g-aller-faire'],
  'fr-a1-10': ['fr-g-aller-faire'],
  'fr-a1-11': ['fr-g-adjectives', 'fr-g-irregular'],
  'fr-a1-12': ['fr-g-ir-re'],
  'fr-a1-13': ['fr-g-questions'],
  'fr-a1-14': ['fr-g-modals', 'fr-g-ir-re'],
};
