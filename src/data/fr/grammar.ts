import type { GrammarLesson } from '../types';
import { ex, q } from './registry';
import { GRAMMAR_FR_A2 } from './grammar-a2';
import { GRAMMAR_FR_B1 } from './grammar-b1';

/**
 * French grammar, in teaching order: every lesson uses only forms taught in it or before it.
 * Each has a logic box (the idea that connects it to the rest) and a reason for every answer.
 */
const GRAMMAR_FR_A1: GrammarLesson[] = [
  {
    id: 'fr-g-big-picture', level: 'A1', title: 'The big picture: 7 patterns behind French', titleEs: 'La grammaire en 7 idées',
    summary: 'Start here: the few ideas that explain most French grammar.',
    blocks: [
      { t: 'text', md: `
## 1. Stem + ending, but many endings are silent
A verb is a **stem** plus an **ending**: *parl-e, parl-ons*. Unlike Spanish, **-e, -es, -ent are silent**, so *il parle* and *ils parlent* sound the same. That's why French **always needs the pronoun** (je, tu, il…).

## 2. Two vowels never meet: elision
A short word drops its vowel before another vowel: **je → j'**, **le / la → l'**, **ne → n'**, **de → d'**, **me / te / se → m' / t' / s'**: ${ex("J'aime l'école.", 'I like school.')}

## 3. Every noun is le or la
Masculine or feminine, and the article tells you. Articles, adjectives and possessives all **agree** with the noun.

## 4. Little words melt together
**à + le = au**, **à + les = aux**, **de + le = du**, **de + les = des**. You'll meet these everywhere: *au cinéma, du pain*.

## 5. ne … pas wraps the verb
The negation is a sandwich around the conjugated verb: ${ex('Je ne parle pas anglais.', "I don't speak English.")}

## 6. French counts what it eats
"Some" is never left out: *du pain, de la soupe, des pommes*. After a negative it shrinks to **de**.

## 7. The verb carries the time, a helper carries the past
Simple tenses add endings (*je parle, je parlais, je parlerai*); the spoken past uses a helper, **avoir** or **être**, plus a participle: *j'ai parlé, je suis allé*.` },
      { t: 'tip', md: 'When a rule looks new, ask which of these 7 ideas it belongs to. It almost always fits one of them.' },
    ],
    practice: {
      choice: [
        q('Why does French always need je, tu, il… before the verb?', ['Many endings are silent', 'Verbs have no endings', 'It is only polite'], 'parle, parles and parlent sound the same, so only the pronoun tells you who it is.'),
        q('je + aime is written…', ["j'aime", 'je aime', 'jaime'], 'Two vowels never meet: je drops its e and takes an apostrophe before a vowel.'),
        q('à + le becomes…', ['au', 'à le', 'al'], 'à and le melt into one word: au cinéma.'),
        q('Where does ne … pas go?', ['Around the conjugated verb', 'At the end of the sentence', 'Before the subject'], 'ne before the verb, pas after it: je ne parle pas.'),
        q('In “la voiture rouge”, which word tells you voiture is feminine?', ['la', 'rouge', 'voiture'], 'The article shows the gender: la is feminine, le is masculine.'),
      ],
    },
  },
  {
    id: 'fr-g-verbs', level: 'A1', title: 'How French verbs work: -er verbs', titleEs: 'Le radical et la terminaison',
    summary: '9 out of 10 French verbs end in -er and follow one pattern.',
    blocks: [
      { t: 'text', md: `
## Stem + ending
Cut **-er** off the infinitive to get the stem: *parl-er, aim-er, habit-er*. Then add the ending for the person:` },
      { t: 'table', verbs: ['parler', 'aimer', 'habiter'], tense: 'presente', caption: 'The present of regular -er verbs' },
      { t: 'text', md: `
## Listen: four forms sound the same
**-e, -es, -e, -ent** are all **silent**. Only *nous* (-ons) and *vous* (-ez) sound different. So *je parle, tu parles, il parle, ils parlent* are all said "parl".

## Elision with a vowel
Before a vowel or a silent h, **je** becomes **j'**: ${ex("J'aime le chocolat.", 'I like chocolate.')} · ${ex("J'habite à Lyon.", 'I live in Lyon.')}

## One present for three English ones
${ex('Je parle français.', 'I speak French. / I am speaking French.')} French has no "-ing" form for this.` },
      { t: 'logic', md: `The endings are a **person code**, the same idea as in Spanish: **-ons** always means *nous*, **-ez** always means *vous*, and **-ent** (silent) means *ils*. You will see -ons and -ez again in almost every tense.` },
      { t: 'mistakes', items: [['Je parler français.', 'Je parle français.', 'Always conjugate: parler is only the dictionary form.'], ['Je aime le thé.', "J'aime le thé.", 'je becomes j\' before a vowel.'], ['Ils parlont.', 'Ils parlent.', 'The ils ending of -er verbs is -ent (silent).']] },
    ],
    practice: {
      conj: { verbs: ['parler', 'aimer', 'habiter', 'travailler', 'regarder', 'écouter', 'jouer', 'chanter'], tenses: ['presente'], count: 10 },
      choice: [
        q('Nous ___ français.', ['parlons', 'parlez', 'parlent'], '-ons is the nous ending: nous parlons.', 'We speak French.'),
        q('Vous ___ à Paris ?', ['habitez', 'habitons', 'habite'], '-ez is the vous ending: vous habitez.', 'Do you live in Paris?'),
        q('Ils ___ la télé.', ['regardent', 'regardons', 'regardez'], 'The ils ending is a silent -ent: ils regardent.', 'They watch TV.'),
        q('___ le cinéma.', ["J'aime", 'Je aime', 'Je aimes'], 'je becomes j\' before a vowel, and the je ending is -e: j\'aime.', 'I like the cinema.'),
      ],
    },
  },
  {
    id: 'fr-g-etre-avoir', level: 'A1', title: 'être and avoir', titleEs: 'Être et avoir',
    summary: 'The two most important verbs, and where French uses avoir but English uses "to be".',
    blocks: [
      { t: 'text', md: `
## The two verbs you need from day one
Both are irregular, but look at the ends: they still keep the person code: *nous somm**es**, vous ête**s***, but *nous av**ons**, vous av**ez***.` },
      { t: 'table', verbs: ['être', 'avoir'], tense: 'presente', caption: 'être and avoir in the present' },
      { t: 'text', md: `
## être: what or how something is
${ex('Je suis étudiant.', 'I am a student.')} · ${ex('Elle est fatiguée.', 'She is tired.')} · ${ex('Nous sommes à Paris.', 'We are in Paris.')}
French has only one "to be", so the ser / estar choice of Spanish doesn't exist.

## avoir where English says "to be"
- age: ${ex("J'ai vingt ans.", 'I am twenty.')}
- feelings of the body: **avoir faim** (hungry), **avoir soif** (thirsty), **avoir chaud / froid** (hot / cold), **avoir peur** (afraid), **avoir raison** (right)
- ${ex("Tu as faim ?", 'Are you hungry?')}` },
      { t: 'logic', md: `French sees age and hunger as things you **have**: you *have* twenty years, you *have* hunger. Whenever English says "I am" + a body feeling or an age, French reaches for **avoir**.` },
      { t: 'mistakes', items: [['Je suis vingt ans.', "J'ai vingt ans.", 'Age uses avoir.'], ["Je suis faim.", "J'ai faim.", 'Hunger uses avoir.'], ['Nous avez un chat.', 'Nous avons un chat.', '-ons goes with nous.']] },
    ],
    practice: {
      conj: { verbs: ['être', 'avoir'], tenses: ['presente'], count: 8 },
      choice: [
        q("Mon frère ___ quinze ans.", ['a', 'est', 'as'], 'Age uses avoir, and il / elle takes a: il a quinze ans.', 'My brother is fifteen.'),
        q('Nous ___ très contents.', ['sommes', 'avons', 'êtes'], 'Happy is a state, so it takes être: nous sommes.', 'We are very happy.'),
        q("J'___ soif.", ['ai', 'suis', 'as'], 'Thirst uses avoir: j\'ai soif.', 'I am thirsty.'),
        q('Vous ___ français ?', ['êtes', 'avez', 'sont'], 'Nationality uses être; the vous form is êtes.', 'Are you French?'),
        q('Elles ___ un appartement.', ['ont', 'sont', 'avons'], 'To have something is avoir; ils / elles take ont.', 'They have a flat.'),
      ],
    },
  },
  {
    id: 'fr-g-gender', level: 'A1', title: 'le, la, les: gender and articles', titleEs: 'Le genre des noms',
    summary: 'Every noun is masculine or feminine, and endings give strong hints.',
    blocks: [
      { t: 'text', md: `
## The articles
| | masculine | feminine | before a vowel | plural |
| the | le | la | l' | les |
| a / some | un | une | un / une | des |

Plural nouns usually add a silent **-s**: *le livre → les livres*. You hear the plural only in the article: *le* vs *les*.

## Endings that tell you the gender
- masculine: **-age** (le fromage), **-ment** (le moment), **-eau** (le bureau), **-isme**
- feminine: **-tion / -sion** (la station), **-té** (la liberté), **-ette** (la baguette), **-ure** (la voiture), most nouns in **-e**
- exceptions exist (*la page, l'eau* is feminine, *le musée* is masculine), so always learn the noun with its article.` },
      { t: 'logic', md: `As in Spanish, **the noun decides**: once you know *voiture* is feminine, the article (*la, une*), the adjective (*rouge*, *petite*) and the possessive (*ma*) all follow. In French the article matters even more, because the noun itself often sounds the same in singular and plural.` },
      { t: 'mistakes', items: [['le eau', "l'eau", 'le / la become l\' before a vowel.'], ['la fromage', 'le fromage', '-age nouns are masculine.'], ['les enfant', 'les enfants', 'Plural nouns add -s, even if you can\'t hear it.']] },
    ],
    practice: {
      choice: [
        q('___ voiture', ['la', 'le'], '-ure nouns are feminine: la voiture.'),
        q('___ fromage', ['le', 'la'], '-age nouns are masculine: le fromage.'),
        q('___ école', ["l'", 'la', 'le'], 'Before a vowel, le and la become l\'.'),
        q('___ station', ['la', 'le'], '-tion nouns are feminine: la station.'),
        q('___ livres', ['les', 'le', 'la'], 'Plural nouns take les, whatever their gender.'),
        q('J\'ai ___ chats.', ['des', 'les', 'un'], 'des is the plural of un / une: "some" cats.', 'I have cats.'),
      ],
    },
  },
  {
    id: 'fr-g-adjectives', level: 'A1', title: 'Adjectives: agreement and position', titleEs: 'Les adjectifs',
    summary: 'Add -e for feminine, -s for plural; most adjectives go after the noun.',
    blocks: [
      { t: 'text', md: `
## Agreement
| | singular | plural |
| masculine | petit | petit**s** |
| feminine | petit**e** | petit**es** |

You often **hear** the feminine: the final consonant is silent in *petit* but sounds in *petite*.
Adjectives in **-e** don't change for gender: *jeune, rouge, sympa* (invariable).

## Common irregular feminines
*blanc → blanche · gentil → gentille · bon → bonne · beau → belle · nouveau → nouvelle · vieux → vieille · heureux → heureuse*

## Position
Most adjectives go **after** the noun: ${ex('un livre intéressant', 'an interesting book')}. Short, common ones go **before** (think **B**eauty, **A**ge, **G**oodness, **S**ize): *beau, joli, jeune, vieux, nouveau, bon, mauvais, grand, petit*: ${ex("C'est une jolie maison.", "It's a pretty house.")}` },
      { t: 'logic', md: `Same idea as the articles: **the noun decides** and everything around it agrees. The position rule is about meaning: everyday judgements (beautiful, old, good, big) come before; descriptions that sort things (colour, nationality, shape) come after.` },
      { t: 'mistakes', items: [['une maison petite', 'une petite maison', 'petit is a "size" adjective: it goes before.'], ['une robe noir', 'une robe noire', 'Feminine nouns need feminine adjectives: add -e.'], ['une voiture belle', 'une belle voiture', 'beau / belle goes before the noun.']] },
    ],
    practice: {
      choice: [
        q('Ma sœur est ___.', ['grande', 'grand', 'grands'], 'sœur is feminine singular: add -e.', 'My sister is tall.'),
        q('Les chats sont ___.', ['noirs', 'noir', 'noires'], 'chats is masculine plural: add -s.', 'The cats are black.'),
        q('C\'est une ___ idée.', ['bonne', 'bon', 'bonnes'], 'bon doubles its n in the feminine: bonne. It goes before the noun.', "It's a good idea."),
        q('une voiture ___', ['rouge', 'rouges', 'rougee'], 'rouge already ends in -e, so it stays the same for feminine.', 'a red car'),
        q('Il a une ___ maison.', ['belle', 'beau', 'bel'], 'beau becomes belle in the feminine and goes before the noun.', 'He has a beautiful house.'),
      ],
    },
  },
  {
    id: 'fr-g-negation', level: 'A1', title: 'Saying no: ne … pas', titleEs: 'La négation',
    summary: 'ne before the verb, pas after it, and un / une / des become de.',
    blocks: [
      { t: 'text', md: `
## The sandwich
**ne** goes before the conjugated verb, **pas** after it. **ne → n'** before a vowel.
- ${ex('Je parle anglais.', 'I speak English.')} → ${ex('Je ne parle pas anglais.', "I don't speak English.")}
- ${ex('Il aime le thé.', 'He likes tea.')} → ${ex("Il n'aime pas le thé.", "He doesn't like tea.")}

## un, une, des become de
After a negative, "a / some" shrinks to **de** (d' before a vowel):
- ${ex("J'ai un chat.", 'I have a cat.')} → ${ex("Je n'ai pas de chat.", "I don't have a cat.")}
- ${ex('Il y a des enfants.', 'There are children.')} → ${ex("Il n'y a pas d'enfants.", 'There are no children.')}

But **le, la, les** stay: ${ex("Je n'aime pas le café.", "I don't like coffee.")}

## Other sandwiches
**ne … jamais** (never), **ne … plus** (no longer), **ne … rien** (nothing): ${ex('Je ne mange jamais de viande.', 'I never eat meat.')}

## In speech
People often drop the **ne**: ${ex('Je sais pas.', "I don't know.")} You will hear it, but write it.` },
      { t: 'logic', md: `The negation always hugs the **conjugated verb**, wherever it is. The shrinking of un / une / des to **de** is the same "some" logic as *du pain*: after a negative there is no amount, so only the little word **de** is left.` },
      { t: 'mistakes', items: [['Je ne ai pas faim.', "Je n'ai pas faim.", 'ne becomes n\' before a vowel.'], ["Je n'ai pas un chat.", "Je n'ai pas de chat.", 'un / une / des become de after a negative.'], ['Je pas parle anglais.', 'Je ne parle pas anglais.', 'ne before the verb, pas after it.']] },
    ],
    practice: {
      choice: [
        q("Je ___ suis ___ fatigué.", ['ne … pas', 'pas … ne', 'n\' … pas'], 'ne before the verb, pas after it; suis starts with a consonant, so ne stays ne.', 'I am not tired.'),
        q("Elle ___ aime pas le sport.", ["n'", 'ne', 'pas'], 'ne becomes n\' before the vowel of aime.', "She doesn't like sport."),
        q("Nous n'avons pas ___ voiture.", ['de', 'une', 'la'], 'After a negative, une becomes de.', "We don't have a car."),
        q("Il n'y a pas ___ enfants.", ["d'", 'des', 'les'], 'des becomes de after a negative, and d\' before a vowel.', 'There are no children.'),
        q("Je n'aime pas ___ café.", ['le', 'de', 'du'], 'le stays after a negative: only un / une / des / du change.', "I don't like coffee."),
      ],
    },
  },
  {
    id: 'fr-g-questions', level: 'A1', title: 'Asking questions', titleEs: 'Poser des questions',
    summary: 'Intonation, est-ce que, or inversion: three ways to ask.',
    blocks: [
      { t: 'text', md: `
## Three ways to ask "Do you speak French?"
| everyday speech | Tu parles français ? | just raise your voice |
| neutral | Est-ce que tu parles français ? | put est-ce que in front |
| formal / written | Parles-tu français ? | swap verb and pronoun, add a hyphen |

With inversion, **il / elle + vowel** adds a **-t-** so the vowels don't meet: ${ex('Parle-t-il anglais ?', 'Does he speak English?')}

## Question words
**qui** (who), **que / quoi** (what), **où** (where), **quand** (when), **comment** (how), **pourquoi** (why), **combien** (how much / many), **quel / quelle** (which).
- ${ex('Où est-ce que tu habites ?', 'Where do you live?')}
- ${ex('Comment tu t\'appelles ?', 'What is your name?')}
- ${ex('Qu\'est-ce que tu fais ?', 'What are you doing?')}

Answer *pourquoi* with **parce que**.` },
      { t: 'logic', md: `**est-ce que** literally means "is it that…", so you can put it in front of any normal sentence without changing its word order. That makes it the safest choice while you learn. The **-t-** in *parle-t-il* is elision's cousin: French keeps two vowels apart, either by dropping one (j') or by adding a sound (-t-).` },
      { t: 'mistakes', items: [['Où tu est-ce que habites ?', 'Où est-ce que tu habites ?', 'Question word, then est-ce que, then the normal sentence.'], ['Parle il anglais ?', 'Parle-t-il anglais ?', 'Inversion needs a hyphen, and -t- between two vowels.'], ['Pourquoi ? Car j\'aime.', 'Parce que j\'aime ça.', 'Answer pourquoi with parce que.']] },
    ],
    practice: {
      choice: [
        q('___ tu habites ?', ['Où est-ce que', 'Où est que', 'Est-ce où'], 'Question word + est-ce que + normal order.', 'Where do you live?'),
        q('___ -il anglais ?', ['Parle-t', 'Parle', 'Parlé'], 'il + a verb ending in a vowel needs -t- in inversion.', 'Does he speak English?'),
        q('___ tu étudies le français ? — Parce que j\'aime voyager.', ['Pourquoi', 'Comment', 'Où'], 'The answer starts with parce que (because), so the question is pourquoi (why).', 'Why are you studying French? Because I like travelling.'),
        q('___ heure est-il ?', ['Quelle', 'Quel', 'Quels'], 'heure is feminine singular, so quel becomes quelle.', 'What time is it?'),
        q('___ coûte le livre ?', ['Combien', 'Quand', 'Qui'], 'Asking a price: combien (how much).', 'How much does the book cost?'),
      ],
    },
  },
  {
    id: 'fr-g-aller-faire', level: 'A1', title: 'aller and faire, au and du', titleEs: 'Aller et faire',
    summary: 'Two irregular verbs, the little words that melt, and the near future.',
    blocks: [
      { t: 'text', md: `
## Two irregular verbs you use every day` },
      { t: 'table', verbs: ['aller', 'faire'], tense: 'presente', caption: 'aller and faire: notice vont / font, like ont and sont' },
      { t: 'text', md: `
## à and de melt into le and les
| | + le | + la | + l' | + les |
| à (to, at) | **au** | à la | à l' | **aux** |
| de (of, from) | **du** | de la | de l' | **des** |

- ${ex('Je vais au marché.', "I'm going to the market.")}
- ${ex('Il revient du travail.', "He's coming back from work.")}
- ${ex('Elle joue de la guitare.', 'She plays the guitar.')}

## The near future: aller + infinitive
${ex('Je vais partir.', "I'm going to leave.")} · ${ex('Nous allons manger au restaurant.', "We're going to eat at the restaurant.")}

## faire: weather and activities
${ex('Il fait beau.', 'The weather is nice.')} · ${ex('Je fais du sport.', 'I do sport.')} · ${ex('Tu fais la cuisine ?', 'Are you cooking?')}` },
      { t: 'logic', md: `Four very common verbs end in **-ont** in the ils form: **ils ont, ils sont, ils vont, ils font**. Learn them as a family. And **au / du** are elision's partner: instead of dropping a vowel, two little words merge into one.` },
      { t: 'mistakes', items: [['Je vais à le cinéma.', 'Je vais au cinéma.', 'à + le always melts into au.'], ['Ils allent.', 'Ils vont.', 'aller is irregular: ils vont.'], ['Vous faisez.', 'Vous faites.', 'faire is irregular: vous faites (like vous êtes, vous dites).']] },
    ],
    practice: {
      conj: { verbs: ['aller', 'faire'], tenses: ['presente'], count: 8 },
      choice: [
        q('Je vais ___ cinéma.', ['au', 'à le', 'à la'], 'cinéma is masculine: à + le = au.', "I'm going to the cinema."),
        q('Nous allons ___ gare.', ['à la', 'au', 'aux'], 'gare is feminine: à la stays as it is.', "We're going to the station."),
        q('Ils ___ au marché.', ['vont', 'allent', 'vas'], 'aller is irregular: ils vont.', "They're going to the market."),
        q('Demain, je vais ___ mes parents.', ['visiter', 'visite', 'visité'], 'In the near future only aller is conjugated; the second verb stays in the infinitive.', "Tomorrow I'm going to visit my parents."),
        q('Il ___ beau aujourd\'hui.', ['fait', 'est', 'a'], 'Weather uses faire: il fait beau.', 'The weather is nice today.'),
      ],
    },
  },
  {
    id: 'fr-g-partitive', level: 'A1', title: 'Some: du, de la, des', titleEs: 'L’article partitif',
    summary: 'French never leaves out "some", and liking takes le / la.',
    blocks: [
      { t: 'text', md: `
## "Some of the": du, de la, de l', des
English often says nothing; French always says something:
- ${ex('Je mange du pain.', 'I eat bread.')} (de + le)
- ${ex('Tu veux de la soupe ?', 'Do you want soup?')}
- ${ex("Elle boit de l'eau.", 'She drinks water.')}
- ${ex('Nous achetons des pommes.', 'We buy apples.')}

## Three cases, three articles
| what you mean | article | example |
| an amount of it | du / de la / des | Je bois **du** café. |
| one of them | un / une | Je bois **un** café. (one cup) |
| it in general | le / la / les | J'aime **le** café. |

## Quantities use only de
*beaucoup **de** café, un peu **de** lait, une bouteille **d'**eau, un kilo **de** pommes*

And after a negative: ${ex('Je ne bois pas de café.', "I don't drink coffee.")}

## Two verbs for the shopping list
**boire** changes its stem (bois / buvons / boivent); **acheter** takes **è** where the stem is stressed, like *se lever*.` },
      { t: 'table', verbs: ['boire', 'acheter'], tense: 'presente', caption: 'boire and acheter' },
      { t: 'logic', md: `The article always answers the same question: **how much?** An amount of it → *du*; one → *un*; all of it, as an idea → *le*; a measured amount or none at all → just *de*. That is why *aimer* takes *le* (you like coffee in general) but *boire* takes *du* (you drink some).` },
      { t: 'mistakes', items: [['Je mange pain.', 'Je mange du pain.', 'French never leaves "some" out.'], ["J'aime du fromage.", "J'aime le fromage.", 'Liking is about the thing in general: le.'], ['beaucoup des amis', "beaucoup d'amis", 'Quantities take only de.']] },
    ],
    practice: {
      conj: { verbs: ['manger', 'boire', 'acheter'], tenses: ['presente'], count: 8 },
      choice: [
        q('Je mange ___ fromage.', ['du', 'le', 'de'], 'An amount of cheese: de + le = du.', 'I eat cheese.'),
        q("J'adore ___ chocolat.", ['le', 'du', 'de'], 'adorer is about chocolate in general: le.', 'I love chocolate.'),
        q('Elle boit ___ eau.', ["de l'", 'de la', 'du'], 'eau starts with a vowel: de l\'.', 'She drinks water.'),
        q('Il y a beaucoup ___ touristes.', ['de', 'des', 'les'], 'After a quantity (beaucoup) only de: beaucoup de.', 'There are a lot of tourists.'),
        q('Tu veux ___ soupe ?', ['de la', 'du', 'la'], 'An amount of soup (feminine): de la.', 'Do you want soup?'),
      ],
    },
  },
  {
    id: 'fr-g-reflexive', level: 'A1', title: 'Reflexive verbs', titleEs: 'Les verbes pronominaux',
    summary: 'je me lève: verbs whose action comes back to you.',
    blocks: [
      { t: 'text', md: `
## A pronoun that matches the subject
**me, te, se, nous, vous, se** go before the verb; **me, te, se → m', t', s'** before a vowel.` },
      { t: 'table', verbs: ['se lever', "s'appeler"], tense: 'presente', caption: 'se lever and s’appeler: è / ll only where the syllable is stressed' },
      { t: 'text', md: `
## Why lève and appelle?
The last syllable of the stem gets the stress in *je lève, j'appelle*, so French marks it: **e → è** or a **double consonant**. In *nous levons, vous appelez* the stress moves to the ending, and the plain e comes back.

## Everyday reflexive verbs
**se réveiller** (wake up), **se lever** (get up), **se doucher** (shower), **s'habiller** (get dressed), **se coucher** (go to bed), **se reposer** (rest).
${ex('Je me réveille à sept heures.', 'I wake up at seven.')} · ${ex('Tu te couches tard.', 'You go to bed late.')}

## Negative and near future
- ${ex('Je ne me lève pas tôt.', "I don't get up early.")} (the pronoun stays glued to the verb)
- ${ex('Je vais me coucher.', "I'm going to go to bed.")} (the pronoun matches the subject)` },
      { t: 'logic', md: `The reflexive pronoun is part of the verb: it always **stays right before the verb it belongs to**, even inside a negative sandwich (*ne me lève pas*) or before an infinitive (*vais me coucher*). The è / ll change is the same stress logic as Spanish boot verbs, only shown in spelling instead of in the vowel.` },
      { t: 'mistakes', items: [['Je lève à 7 heures.', 'Je me lève à 7 heures.', 'Reflexive verbs need their pronoun.'], ['Je me appelle Paul.', "Je m'appelle Paul.", 'me becomes m\' before a vowel.'], ['Je vais se coucher.', 'Je vais me coucher.', 'The pronoun matches the subject, also before an infinitive.']] },
    ],
    practice: {
      conj: { verbs: ['se lever', 'se réveiller', 'se coucher', "s'habiller", "s'appeler"], tenses: ['presente'], count: 8 },
      choice: [
        q('Je ___ lève à sept heures.', ['me', 'se', 'te'], 'je takes me: je me lève.', 'I get up at seven.'),
        q('Nous ___ couchons tard.', ['nous', 'se', 'vous'], 'The nous pronoun is nous: nous nous couchons.', 'We go to bed late.'),
        q('Elle ___ appelle Julie.', ["s'", 'se', 'me'], 'se becomes s\' before the vowel of appelle.', 'She is called Julie.'),
        q('Ils se ___ à six heures.', ['lèvent', 'levent', 'levons'], 'ils is stressed on the stem, so it takes è: ils se lèvent.', 'They get up at six.'),
        q('Je vais ___ doucher.', ['me', 'se', 'nous'], 'The pronoun matches the subject, also before an infinitive: je vais me doucher.', "I'm going to have a shower."),
      ],
    },
  },
  {
    id: 'fr-g-ir-re', level: 'A1', title: 'The -ir and -re verbs', titleEs: 'Les verbes en -ir et -re',
    summary: 'finir (nous finissons) and attendre (il attend): two more regular groups.',
    blocks: [
      { t: 'text', md: `
## The second group: -ir with -iss-
Verbs like **finir, choisir, réussir** add **-iss-** in the plural:` },
      { t: 'table', verbs: ['finir', 'choisir'], tense: 'presente', caption: 'Second-group verbs: -is, -is, -it, -issons, -issez, -issent' },
      { t: 'text', md: `
## Regular -re verbs
Drop **-re** and add **-s, -s, (nothing), -ons, -ez, -ent**. The d of the stem is already there in *il attend*, so nothing is added.` },
      { t: 'table', verbs: ['attendre', 'vendre'], tense: 'presente', caption: 'Regular -re verbs' },
      { t: 'text', md: `
## Another -ir pattern: sortir, partir, dormir
These drop the last consonant of the stem in the singular: *je sors, je pars, je dors*, but *nous sortons, nous partons, nous dormons*.
${ex('Je pars à huit heures.', 'I leave at eight.')} · ${ex('Nous sortons ce soir.', "We're going out tonight.")}` },
      { t: 'table', verbs: ['sortir', 'partir', 'dormir'], tense: 'presente', caption: 'sortir, partir, dormir' },
      { t: 'logic', md: `Whatever the group, the **singular** endings are mostly **-s, -s, -t** (je finis, tu finis, il finit) and the **plural** keeps the person code **-ons, -ez, -ent**. Once you see that skeleton, every new verb is just a new stem on the same frame.` },
      { t: 'mistakes', items: [['Nous finons.', 'Nous finissons.', 'Second-group verbs add -iss- in the plural.'], ['Il attendt.', 'Il attend.', '-re verbs add nothing for il.'], ['Je sorts.', 'Je sors.', 'sortir drops its t in the singular.']] },
    ],
    practice: {
      conj: { verbs: ['finir', 'choisir', 'attendre', 'vendre', 'répondre', 'sortir', 'partir', 'dormir'], tenses: ['presente'], count: 10 },
      choice: [
        q('Nous ___ à six heures.', ['finissons', 'finons', 'finisons'], 'Second-group verbs add -iss- in the plural: nous finissons.', 'We finish at six.'),
        q("Il ___ le bus.", ['attend', 'attendt', 'attends'], '-re verbs add nothing for il: il attend.', "He's waiting for the bus."),
        q('Je ___ ce soir.', ['sors', 'sorts', 'sore'], 'sortir drops its t in the singular: je sors.', "I'm going out tonight."),
        q('Ils ___ une maison.', ['vendent', 'vendont', 'vends'], 'The ils ending is -ent: ils vendent.', "They're selling a house."),
        q('Tu ___ quel livre ?', ['choisis', 'choisit', 'choisissez'], 'tu takes -is: tu choisis.', 'Which book are you choosing?'),
      ],
    },
  },
  {
    id: 'fr-g-modals', level: 'A1', title: 'pouvoir, vouloir, devoir', titleEs: 'Pouvoir, vouloir, devoir',
    summary: 'Can, want, must, all followed by an infinitive.',
    blocks: [
      { t: 'text', md: `
## Three verbs with one shape` },
      { t: 'table', verbs: ['pouvoir', 'vouloir', 'devoir'], tense: 'presente', caption: 'pouvoir, vouloir, devoir: one vowel in the singular and ils, another in nous / vous' },
      { t: 'text', md: `
## + infinitive
The second verb never changes: ${ex('Je peux venir.', 'I can come.')} · ${ex('Elle veut partir.', 'She wants to leave.')} · ${ex('Nous devons travailler.', 'We have to work.')}
Negative: the sandwich goes around the first verb: ${ex('Je ne peux pas venir.', "I can't come.")}

## savoir and pouvoir
**savoir** is irregular too: *je sais, tu sais, il sait, nous savons, vous savez, ils savent*. **savoir** + infinitive = know how to: ${ex('Je sais nager.', 'I can swim. (I know how to.)')} · **pouvoir** = be able to right now: ${ex('Je ne peux pas nager aujourd\'hui.', "I can't swim today.")}

## Polite forms
**je voudrais** (I would like) and **pourriez-vous…?** (could you…?) are the polite versions you'll use in shops.` },
      { t: 'logic', md: `These verbs follow the stress logic again: the **stressed** forms (je, tu, il, ils) have one vowel (**eu, oi**), the **unstressed** nous / vous keep the infinitive's (**ou, e**): *je peux / nous pouvons, je dois / nous devons*. It's the same pattern as *je lève / nous levons*.` },
      { t: 'mistakes', items: [['Je peux de venir.', 'Je peux venir.', 'No de between these verbs and the infinitive.'], ['Nous peuvons.', 'Nous pouvons.', 'nous keeps the infinitive vowel: pouvons.'], ['Je ne peux venir pas.', 'Je ne peux pas venir.', 'ne … pas wraps the conjugated verb.']] },
    ],
    practice: {
      conj: { verbs: ['pouvoir', 'vouloir', 'devoir', 'savoir'], tenses: ['presente'], count: 10 },
      choice: [
        q('Nous ___ partir maintenant.', ['devons', 'doivons', 'doivent'], 'nous keeps the infinitive vowel: nous devons.', 'We must leave now.'),
        q('Ils ___ venir demain.', ['veulent', 'voulent', 'veux'], 'ils is stressed on the stem, so it takes eu: ils veulent.', 'They want to come tomorrow.'),
        q('Tu ___ m\'aider ?', ['peux', 'peut', 'pouvez'], 'tu takes -x: tu peux.', 'Can you help me?'),
        q('Je ___ nager.', ['sais', 'connais', 'peux de'], 'Knowing how to do something is savoir + infinitive.', 'I can swim.'),
        q('Je ne peux ___ venir.', ['pas', 'de', 'ne'], 'ne … pas wraps the first verb; the infinitive comes after pas.', "I can't come."),
      ],
    },
  },
  {
    id: 'fr-g-irregular', level: 'A1', title: 'Irregular families: prendre, venir, mettre, dire', titleEs: 'Les verbes irréguliers',
    summary: 'Irregular verbs come in families: learn one and you know several.',
    blocks: [
      { t: 'text', md: `
## The prendre family: prendre, comprendre, apprendre
Like -re verbs in the singular, but the **d** disappears in the plural and **ils** doubles the n.` },
      { t: 'table', verbs: ['prendre', 'comprendre'], tense: 'presente', caption: 'prendre and comprendre: nous prenons, ils prennent' },
      { t: 'text', md: `
## The venir family: venir, revenir, devenir
**e → ie** in the stressed forms, and **ils viennent** with a double n.` },
      { t: 'table', verbs: ['venir'], tense: 'presente', caption: 'venir: je viens, nous venons, ils viennent' },
      { t: 'text', md: `
## mettre, dire, lire, écrire
*je mets, nous mettons* · *je dis, vous **dites*** (like vous êtes, vous faites) · *je lis, nous lisons* · *j'écris, nous écrivons*.
${ex('Je mets un pull.', "I'm putting on a jumper.")} · ${ex('Qu\'est-ce que tu dis ?', 'What are you saying?')} · ${ex('Il écrit une lettre.', "He's writing a letter.")}` },
      { t: 'table', verbs: ['mettre', 'dire'], tense: 'presente', caption: 'mettre and dire' },
      { t: 'logic', md: `Even irregular verbs keep two things: the **person code** in the plural (-ons, -ez, -ent) and the **stress logic** (a longer or changed stem where the stem is stressed: *viens, prennent*). Only three verbs break -ez in vous: **êtes, faites, dites**.` },
      { t: 'mistakes', items: [['Ils prendent.', 'Ils prennent.', 'prendre: ils prennent, with nn.'], ['Vous disez.', 'Vous dites.', 'dire is one of the three: vous dites.'], ['Je viendre.', 'Je viens.', 'venir: je viens.']] },
    ],
    practice: {
      conj: { verbs: ['prendre', 'comprendre', 'apprendre', 'venir', 'mettre', 'dire', 'lire', 'écrire'], tenses: ['presente'], count: 10 },
      choice: [
        q('Ils ___ le train.', ['prennent', 'prendent', 'prenent'], 'prendre: ils prennent, the d disappears and the n doubles.', "They're taking the train."),
        q('Vous ___ la vérité ?', ['dites', 'disez', 'dizez'], 'dire is one of only three verbs with -tes for vous: dites.', 'Are you telling the truth?'),
        q('Elles ___ de Montréal.', ['viennent', 'venent', 'viensent'], 'venir: ils / elles viennent.', 'They come from Montreal.'),
        q('Je ne ___ pas.', ['comprends', 'comprend', 'comprenons'], 'je takes -s: je comprends.', "I don't understand."),
        q('Nous ___ la table.', ['mettons', 'metons', 'mettez'], 'mettre keeps tt in the plural: nous mettons.', "We're laying the table."),
      ],
    },
  },
];

export const GRAMMAR_FR: GrammarLesson[] = [...GRAMMAR_FR_A1, ...GRAMMAR_FR_A2, ...GRAMMAR_FR_B1];
