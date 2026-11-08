import type { GrammarLesson } from '../types';
import { ex, q } from './registry';

/**
 * Russian grammar, in teaching order: every lesson uses only forms taught in it or before it.
 * Each has a logic box (the idea that connects it to the rest) and a reason for every answer.
 */
export const GRAMMAR_RU_A1: GrammarLesson[] = [
  {
    id: 'ru-g-big-picture', level: 'A1', title: 'The big picture: 7 patterns behind Russian', titleEs: 'Грамматика в 7 идеях',
    summary: 'Start here: the few ideas that explain most Russian grammar.',
    blocks: [
      { t: 'text', md: `
## 1. No "to be" and no articles
In the present, Russian leaves out "am / is / are", and has no "a" or "the": ${ex('Это мой дом.', 'This is my house.')}

## 2. The ending tells the gender
A consonant → masculine, **-а / -я** → feminine, **-о / -е** → neuter. Adjectives and *мой / моя / моё* agree.

## 3. Cases: the ending tells the role
Russian shows who does what with **endings**, not word order: *Мама любит папу* = *Папу любит мама* (Mum loves Dad). There are six cases; you learn them one at a time.

## 4. Two verb patterns
Verbs take endings for the person: **-ю / -ешь / -ет** (читать) or **-ю / -ишь / -ит** (говорить).

## 5. The past changes by gender
*он читал, она читала, они читали*: the past agrees like an adjective, not by person.

## 6. Aspect: process or result
Most verbs come in pairs: *читать* (to be reading, to read regularly) and *прочитать* (to read to the end, once).

## 7. Going has many verbs
On foot or by transport, now or regularly: *идти / ходить, ехать / ездить*.` },
      { t: 'tip', md: 'When a rule looks new, ask which of these 7 ideas it belongs to. Most Russian grammar is the case endings or verb aspect in disguise.' },
    ],
    practice: {
      choice: [
        q('How do you say "I am a student"?', ['Я студент.', 'Я есть студент.', 'Я a студент.'], 'Russian leaves out "am / is / are" in the present: Я студент.'),
        q('книга (book) is…', ['feminine', 'masculine', 'neuter'], 'It ends in -а, so it is feminine.'),
        q('окно (window) is…', ['neuter', 'feminine', 'masculine'], 'It ends in -о, so it is neuter.'),
        q('In Russian, who does what is shown mainly by…', ['the endings (cases)', 'the word order', 'articles'], 'Cases: the ending of the noun tells you its role in the sentence.'),
        q('The past tense changes by…', ['gender and number', 'person (я, ты, он…)', 'nothing'], 'он читал, она читала, они читали: by gender and number.'),
      ],
    },
  },
  {
    id: 'ru-g-gender', level: 'A1', title: 'Gender: он, она, оно', titleEs: 'Род существительных',
    summary: 'The ending tells you the gender, and мой / моя / моё agree.',
    blocks: [
      { t: 'text', md: `
## Look at the last letter
| он (masculine) | consonant, **-й** | брат, стол, музей |
| она (feminine) | **-а, -я** | мама, книга, неделя |
| оно (neuter) | **-о, -е** | окно, море, кофе* |
| either | **-ь** | день (m), ночь (f): learn with the word |

*кофе* is an exception: it's masculine. Male people in -а (*папа, дедушка*) are masculine.

## It: он, она, оно
Things are also *he / she / it*: ${ex('Где книга? — Она там.', 'Where is the book? — It’s over there.')} · ${ex('Где стол? — Он здесь.', 'Where is the table? — It’s here.')}

## My, your, our
| | m | f | n | pl |
| my | мой | моя | моё | мои |
| your | твой | твоя | твоё | твои |
| our | наш | наша | наше | наши |

**его** (his), **её** (her), **их** (their) never change: *его мама, его папа*.` },
      { t: 'logic', md: `The noun decides and the words around it agree, as in Spanish or French. But Russian has **no articles**, so the gender shows only in the ending of the noun itself and in its adjectives, possessives and past-tense verbs. That's why the last letter of a noun is so important.` },
      { t: 'mistakes', items: [['мой мама', 'моя мама', 'мама ends in -а: feminine → моя.'], ['моя окно', 'моё окно', 'окно ends in -о: neuter → моё.'], ['Где книга? — Он там.', 'Где книга? — Она там.', 'книга is feminine, so "it" is она.']] },
    ],
    practice: {
      choice: [
        q('___ брат', ['мой', 'моя', 'моё'], 'брат ends in a consonant: masculine → мой.'),
        q('___ сестра', ['моя', 'мой', 'моё'], 'сестра ends in -а: feminine → моя.'),
        q('___ окно', ['моё', 'мой', 'моя'], 'окно ends in -о: neuter → моё.'),
        q('Где машина? — ___ там.', ['Она', 'Он', 'Оно'], 'машина is feminine, so "it" is она.'),
        q('___ родители', ['мои', 'мой', 'моя'], 'Plural: мои.'),
      ],
    },
  },
  {
    id: 'ru-g-plural', level: 'A1', title: 'Plurals: -ы, -и, -а', titleEs: 'Множественное число',
    summary: 'Most nouns add -ы or -и; neuter nouns take -а / -я.',
    blocks: [
      { t: 'text', md: `
## The rules
| masculine (consonant) | **+ы** | стол → столы |
| feminine **-а** | **а → ы** | книга → книги*, мама → мамы |
| **-й, -ь, -я** | **→ и** | музей → музеи, день → дни, неделя → недели |
| neuter **-о / -е** | **→ а / я** | окно → окна, море → моря |

## The spelling rule
After **г, к, х, ж, ш, щ, ч** never write ы, write **и**: *книга → книги, парк → парки, врач → врачи*. You'll meet this rule again in adjectives.

## Common irregulars
*брат → братья, друг → друзья, ребёнок → дети, человек → люди, дом → дома, город → города*` },
      { t: 'logic', md: `Russian spelling follows sound: **г, к, х** and the hushing letters **ж, ш, щ, ч** can't be followed by **ы**, so it becomes **и**. This single spelling rule explains endings across nouns, adjectives and verbs.` },
      { t: 'mistakes', items: [['книгы', 'книги', 'After г write и, not ы.'], ['ребёнки', 'дети', 'The plural of ребёнок is дети.'], ['окны', 'окна', 'Neuter -о becomes -а.']] },
    ],
    practice: {
      choice: [
        q('стол → ___', ['столы', 'столи', 'стола'], 'A masculine consonant adds -ы.'),
        q('книга → ___', ['книги', 'книгы', 'книга'], 'After г, write и instead of ы.'),
        q('окно → ___', ['окна', 'окны', 'окни'], 'Neuter -о becomes -а.'),
        q('музей → ___', ['музеи', 'музеы', 'музея'], '-й becomes -и.'),
        q('ребёнок → ___', ['дети', 'ребёнки', 'ребёнка'], 'Irregular: один ребёнок, два ребёнка, but дети (children).'),
      ],
    },
  },
  {
    id: 'ru-g-conj1', level: 'A1', title: 'Verbs: the first conjugation', titleEs: 'Первое спряжение',
    summary: '-ю, -ешь, -ет, -ем, -ете, -ют: читать, работать, делать.',
    blocks: [
      { t: 'text', md: `
## Stem + ending
Drop **-ть** from verbs like *читать* and add the endings. The **e** in the endings gives this group its name (the е-conjugation).` },
      { t: 'table', verbs: ['читать', 'работать', 'делать'], tense: 'presente', caption: 'First conjugation: -ю, -ешь, -ет, -ем, -ете, -ют' },
      { t: 'text', md: `
## When the stem ends in a consonant: -у / -ут
*жить: живу, живёшь, живёт, живём, живёте, живут* · *писать: пишу, пишешь… пишут*. When the ending is stressed, **е → ё**: *живёшь*.` },
      { t: 'table', verbs: ['жить', 'писать'], tense: 'presente', caption: '-у / -ут after a consonant; ё under stress' },
      { t: 'logic', md: `The endings are a **person code**: **-ешь** always means ты, **-ем** мы, **-ете** вы. Only я (**-ю / -у**) and они (**-ют / -ут**) choose between two forms, depending on whether the stem ends in a vowel or a consonant.` },
      { t: 'mistakes', items: [['Я читать книгу.', 'Я читаю книгу.', 'Always conjugate: читать is the dictionary form.'], ['Ты читает.', 'Ты читаешь.', 'ты always ends in -шь.'], ['Они живют.', 'Они живут.', 'After a consonant: -ут.']] },
    ],
    practice: {
      conj: { verbs: ['читать', 'работать', 'делать', 'знать', 'слушать', 'думать', 'играть', 'жить'], tenses: ['presente'], count: 10 },
      choice: [
        q('Ты ___ книгу.', ['читаешь', 'читает', 'читаю'], 'ты always ends in -ешь here: читаешь.', 'You are reading a book.'),
        q('Мы ___ дома.', ['работаем', 'работаете', 'работают'], 'мы ends in -ем: работаем.', 'We work at home.'),
        q('Они ___ в Москве.', ['живут', 'живют', 'живёт'], 'The stem жив- ends in a consonant, so они takes -ут.', 'They live in Moscow.'),
        q('Что вы ___?', ['делаете', 'делаем', 'делают'], 'вы ends in -ете: делаете.', 'What are you doing?'),
        q('Я ___ письмо.', ['пишу', 'писаю', 'пишет'], 'писать changes с → ш and takes -у: пишу.', "I'm writing a letter."),
      ],
    },
  },
  {
    id: 'ru-g-conj2', level: 'A1', title: 'Verbs: the second conjugation', titleEs: 'Второе спряжение',
    summary: '-ю, -ишь, -ит, -им, -ите, -ят: говорить, смотреть, любить.',
    blocks: [
      { t: 'text', md: `
## The и-conjugation
Most verbs in **-ить** and many in **-еть** take endings with **и**, and **-ят** for они:` },
      { t: 'table', verbs: ['говорить', 'смотреть', 'любить'], tense: 'presente', caption: 'Second conjugation: -ю, -ишь, -ит, -им, -ите, -ят' },
      { t: 'text', md: `
## A consonant changes in the я form
Only in the **я** form, some stems change: *любить → люблю* (+л), *готовить → готовлю*, *видеть → вижу* (д → ж), *ходить → хожу*, *сидеть → сижу*. The other forms stay regular: *любишь, видишь*.

## After ж, ш, ч, щ: -у / -ат
*учить: учу, учишь… учат* (the spelling rule again: no ю / я after these letters).` },
      { t: 'table', verbs: ['видеть', 'учить'], tense: 'presente', caption: 'я-form changes and the spelling rule' },
      { t: 'logic', md: `Two conjugations, one skeleton: **ты -шь, он -т, мы -м, вы -те**. The only difference is the vowel: **е** (читаешь) or **и** (говоришь), and for они **-ют / -ут** or **-ят / -ат**. The consonant change in the я form (люблю, вижу) only ever happens there.` },
      { t: 'mistakes', items: [['Я любю.', 'Я люблю.', 'любить adds л in the я form.'], ['Они говорют.', 'Они говорят.', 'Second conjugation: они -ят.'], ['Ты видешь.', 'Ты видишь.', 'Second conjugation: ты -ишь.']] },
    ],
    practice: {
      conj: { verbs: ['говорить', 'смотреть', 'любить', 'видеть', 'учить', 'звонить', 'готовить'], tenses: ['presente'], count: 10 },
      choice: [
        q('Я ___ по-русски.', ['говорю', 'говору', 'говорит'], 'я takes -ю: говорю.', 'I speak Russian.'),
        q('Они ___ фильм.', ['смотрят', 'смотрют', 'смотрит'], 'Second conjugation: они -ят.', "They're watching a film."),
        q('Я ___ музыку.', ['люблю', 'любю', 'любит'], 'любить adds л in the я form: люблю.', 'I love music.'),
        q('Ты ___ этот дом?', ['видишь', 'видешь', 'вижу'], 'Second conjugation: ты -ишь. The ж appears only in я (вижу).', 'Do you see that house?'),
        q('Мы ___ русский язык.', ['учим', 'учем', 'учат'], 'мы -им in the second conjugation: учим.', "We're learning Russian."),
      ],
    },
  },
  {
    id: 'ru-g-adjectives', level: 'A1', title: 'Adjectives: новый, новая, новое', titleEs: 'Прилагательные',
    summary: 'Adjectives agree with the noun, with a few spelling rules.',
    blocks: [
      { t: 'text', md: `
## Four forms
| m | f | n | pl |
| нов**ый** | нов**ая** | нов**ое** | нов**ые** |
| молод**ой** (stressed) | молод**ая** | молод**ое** | молод**ые** |
| хорош**ий** | хорош**ая** | хорош**ее** | хорош**ие** |

- **-ой** when the ending is stressed: *большой, молодой, плохой*.
- The spelling rule: after **г, к, х, ж, ш, щ, ч** write **и**, not ы: *маленький, русский, хорошие*.
- After **ж, ш, щ, ч**, unstressed **о → е**: *хорошее* (not хорошое).

## Before or after?
Adjectives go **before** the noun: ${ex('Это интересная книга.', 'This is an interesting book.')} After "to be" (left out) they still agree: ${ex('Книга интересная.', 'The book is interesting.')}

## этот: this
**этот** дом, **эта** книга, **это** окно, **эти** книги. Don't confuse with **Это…** = "This is…".` },
      { t: 'logic', md: `The adjective's ending echoes the noun's: feminine -**а** → -**ая**, neuter -**о** → -**ое**. Once you hear the echo, you only have to remember the spelling rule (и after г, к, х and hushing letters) and that stressed endings use **-ой**.` },
      { t: 'mistakes', items: [['новый книга', 'новая книга', 'книга is feminine: новая.'], ['русскый', 'русский', 'After к write и.'], ['хорошое окно', 'хорошее окно', 'After ш, unstressed о becomes е.']] },
    ],
    practice: {
      choice: [
        q('Это ___ машина.', ['новая', 'новый', 'новое'], 'машина is feminine: новая.', 'This is a new car.'),
        q('У меня ___ брат.', ['маленький', 'маленькый', 'маленькая'], 'брат is masculine, and after к write и: маленький.', 'I have a little brother.'),
        q('Это ___ окно.', ['большое', 'большой', 'большая'], 'окно is neuter: большое.', 'This is a big window.'),
        q('Это ___ книги.', ['интересные', 'интересная', 'интересный'], 'книги is plural: интересные.', 'These are interesting books.'),
        q('___ дом очень старый.', ['Этот', 'Эта', 'Это'], 'дом is masculine: этот дом (this house).', 'This house is very old.'),
      ],
    },
  },
  {
    id: 'ru-g-prepositional', level: 'A1', title: 'Where? The prepositional case', titleEs: 'Предложный падеж',
    summary: 'в / на + -е: в Москве, на столе. Also о + -е: about.',
    blocks: [
      { t: 'text', md: `
## The ending: -е (sometimes -и)
| Nominative | after в / на / о |
| стол | на стол**е** |
| Москва | в Москв**е** |
| окно | на окн**е** |
| музей | в музе**е** |
| Россия, кровать | в Росси**и**, на кроват**и** |

Feminine nouns in **-ь** and nouns in **-ия / -ие** take **-и**.

## Three uses
- **в** (in): ${ex('Я живу в Москве.', 'I live in Moscow.')}
- **на** (on, at): ${ex('Книга на столе.', 'The book is on the table.')} · *на работе, на почте, на концерте*
- **о** (about): ${ex('Мы говорим о фильме.', "We're talking about the film.")}

## Pronouns: about me, about you…
*обо мне, о тебе, о нём, о ней, о нас, о вас, о них*.` },
      { t: 'logic', md: `This is the first of six cases, and it's the friendliest: almost everything takes **-е**. It only answers two questions: **где?** (where?) with в / на, and **о ком? о чём?** (about whom / what?) with о.` },
      { t: 'mistakes', items: [['Я живу в Москва.', 'Я живу в Москве.', 'After в (where?), the noun takes -е.'], ['в Россие', 'в России', 'Nouns in -ия take -и.'], ['Я на работа.', 'Я на работе.', 'на + prepositional: работе.']] },
    ],
    practice: {
      choice: [
        q('Я живу в ___.', ['Лондоне', 'Лондон', 'Лондона'], 'Where? в + prepositional: Лондоне.', 'I live in London.'),
        q('Кошка на ___.', ['диване', 'диван', 'дивана'], 'на + prepositional: диване.', 'The cat is on the sofa.'),
        q('Мы были в ___.', ['России', 'Россие', 'Россия'], 'Nouns in -ия take -и: в России.', 'We were in Russia.'),
        q('Он сейчас на ___.', ['работе', 'работа', 'работу'], 'Where? на + prepositional: на работе.', "He's at work now."),
        q('Мы говорим о ___.', ['книге', 'книга', 'книгу'], 'о (about) + prepositional: книге.', "We're talking about the book."),
      ],
    },
  },
  {
    id: 'ru-g-accusative', level: 'A1', title: 'What? The accusative case', titleEs: 'Винительный падеж',
    summary: 'The object: книга → книгу. Also куда? (where to?) and days.',
    blocks: [
      { t: 'text', md: `
## Only feminine -а / -я changes (for things)
| она | книг**а** → книг**у** | недел**я** → недел**ю** |
| он / оно (things) | стол, окно: no change |
| -ь feminine | дверь: no change |

${ex('Я читаю книгу.', "I'm reading a book.")} · ${ex('Я люблю музыку.', 'I love music.')} · ${ex('Я вижу дом.', 'I see the house.')}

## Masculine people and animals change: -а / -я
брат → ${ex('Я вижу брат**а**.', 'I see my brother.')} · учитель → ${ex('Я знаю учител**я**.', 'I know the teacher.')} (it looks like the genitive; Russian treats living beings specially)

## Three uses
- the **object**: ${ex('Я пью воду.', "I'm drinking water.")}
- **куда?** with в / на: ${ex('Я иду в школу.', "I'm going to school.")}
- **days**: *в субботу, в среду*

## Pronouns
*меня, тебя, его, её, нас, вас, их*: ${ex('Я тебя люблю.', 'I love you.')}` },
      { t: 'logic', md: `Compare **где?** and **куда?**: *в школе* (in school: prepositional) vs *в школу* (to school: accusative). Same preposition, different case: the case shows whether you're **there** or **going there**. German does exactly the same with *in der Schule / in die Schule*.` },
      { t: 'mistakes', items: [['Я читаю книга.', 'Я читаю книгу.', 'The object: feminine -а → -у.'], ['Я иду в школе.', 'Я иду в школу.', 'Where to? в + accusative.'], ['Я вижу брат.', 'Я вижу брата.', 'Masculine people take -а in the accusative.']] },
    ],
    practice: {
      choice: [
        q('Я пью ___.', ['воду', 'вода', 'воде'], 'The object, feminine -а → -у: воду.', "I'm drinking water."),
        q('Она читает ___.', ['журнал', 'журнала', 'журналу'], 'A masculine thing doesn’t change: журнал.', "She's reading a magazine."),
        q('Мы идём в ___.', ['школу', 'школе', 'школа'], 'Where to? в + accusative: школу.', "We're going to school."),
        q('Я знаю ___.', ['Ивана', 'Иван', 'Иване'], 'A masculine person as object takes -а: Ивана.', 'I know Ivan.'),
        q('Я ___ люблю.', ['тебя', 'ты', 'тебе'], 'The object pronoun of ты is тебя.', 'I love you.'),
      ],
    },
  },
  {
    id: 'ru-g-motion', level: 'A1', title: 'Going: идти, ходить, ехать, ездить', titleEs: 'Глаголы движения',
    summary: 'On foot or by transport, now or regularly.',
    blocks: [
      { t: 'text', md: `
## Four verbs, two questions
| | right now, one direction | regularly, there and back |
| on foot | **идти** | **ходить** |
| by transport | **ехать** | **ездить** |` },
      { t: 'table', verbs: ['идти', 'ходить'], tense: 'presente', caption: 'On foot: идти (now) and ходить (regularly)' },
      { t: 'table', verbs: ['ехать', 'ездить'], tense: 'presente', caption: 'By transport: ехать (now) and ездить (regularly)' },
      { t: 'text', md: `
## In sentences
- ${ex('Сейчас я иду в парк.', "I'm walking to the park now.")}
- ${ex('Я часто хожу в парк.', 'I often go to the park.')}
- ${ex('Завтра мы едем в Москву.', "Tomorrow we're going to Moscow.")} (by train, car…)
- ${ex('Каждое лето мы ездим на море.', 'Every summer we go to the seaside.')}

The past of идти is irregular: **шёл, шла, шли**.` },
      { t: 'logic', md: `English has one "go"; Russian asks two questions: **how?** (walking or riding) and **how?** (one trip in progress, or a habit / round trip). Pick the row first, then the column. Words like *сейчас, сегодня* point to идти / ехать; *часто, каждый день, обычно* point to ходить / ездить.` },
      { t: 'mistakes', items: [['Я иду в Москву на поезде.', 'Я еду в Москву на поезде.', 'By train: ехать.'], ['Я часто иду в кино.', 'Я часто хожу в кино.', 'A habit: ходить.'], ['Он идил.', 'Он шёл.', 'The past of идти is шёл / шла / шли.']] },
    ],
    practice: {
      conj: { verbs: ['идти', 'ходить', 'ехать', 'ездить'], tenses: ['presente'], count: 8 },
      choice: [
        q('Сейчас я ___ домой.', ['иду', 'хожу', 'езжу'], 'Right now, on foot: идти → иду.', "I'm walking home now."),
        q('Каждый день она ___ на работу на автобусе.', ['ездит', 'едет', 'ходит'], 'Every day (a habit), by bus: ездить → ездит.', 'Every day she goes to work by bus.'),
        q('Завтра мы ___ в Петербург.', ['едем', 'идём', 'ездим'], 'One trip, to another city (by transport): ехать → едем.', "Tomorrow we're going to St Petersburg."),
        q('Я часто ___ в кино.', ['хожу', 'иду', 'еду'], 'Often (a habit), on foot: ходить → хожу.', 'I often go to the cinema.'),
        q('Куда ты ___? — В магазин.', ['идёшь', 'ходишь', 'ездишь'], 'Right now, one direction: идти → идёшь.', 'Where are you going? — To the shop.'),
      ],
    },
  },
  {
    id: 'ru-g-past', level: 'A1', title: 'The past tense', titleEs: 'Прошедшее время',
    summary: '-л, -ла, -ло, -ли: by gender, not by person.',
    blocks: [
      { t: 'text', md: `
## One rule for almost every verb
Drop **-ть**, add **-л** (he), **-ла** (she), **-ло** (it), **-ли** (they, and polite вы).` },
      { t: 'table', verbs: ['читать', 'говорить', 'жить'], tense: 'preterito', caption: 'The past: by gender and number' },
      { t: 'text', md: `
## Who's speaking?
A woman says ${ex('Я читала.', 'I was reading.')}; a man says ${ex('Я читал.', 'I was reading.')}; with **мы, вы, они** always **-ли**: *мы читали*.

## A few irregular pasts
**идти** → шёл, шла, шли · **мочь** → мог, могла, могли · **есть** → ел, ела, ели
**быть** (to be) → был, была, было, были: ${ex('Вчера я был дома.', 'Yesterday I was at home.')}

## -ся verbs
After a consonant **-ся**, after a vowel **-сь**: *он учился, она училась, они учились*.` },
      { t: 'logic', md: `The Russian past was originally an adjective-like participle ("I [am] having-read"), which is why it agrees in **gender and number** like an adjective (*новый / новая*), and never by person. Once you know the subject's gender, the past is the easiest tense in the language.` },
      { t: 'mistakes', items: [['Она читал.', 'Она читала.', 'A female subject: -ла.'], ['Мы читал.', 'Мы читали.', 'мы, вы, они: -ли.'], ['Он идёл.', 'Он шёл.', 'идти has an irregular past.']] },
    ],
    practice: {
      conj: { verbs: ['читать', 'говорить', 'жить', 'работать', 'быть', 'идти'], tenses: ['preterito'], count: 10 },
      choice: [
        q('Вчера Анна ___ книгу.', ['читала', 'читал', 'читали'], 'Анна is a woman: -ла.', 'Yesterday Anna was reading a book.'),
        q('Мы ___ в Москве.', ['жили', 'жил', 'жила'], 'мы always takes -ли.', 'We lived in Moscow.'),
        q('Где ты ___ вчера? (to a man)', ['был', 'была', 'были'], 'Talking to a man: был.', 'Where were you yesterday?'),
        q('Он ___ в парк.', ['шёл', 'идил', 'шла'], 'идти has an irregular past: он шёл.', 'He was walking to the park.'),
        q('Дети ___ дома.', ['были', 'был', 'была'], 'дети is plural: были.', 'The children were at home.'),
      ],
    },
  },
  {
    id: 'ru-g-modals', level: 'A1', title: 'Can, want, must', titleEs: 'Мочь, хотеть, надо',
    summary: 'могу, хочу + infinitive; мне надо, можно, нельзя.',
    blocks: [
      { t: 'table', verbs: ['мочь', 'хотеть'], tense: 'presente', caption: 'мочь (г / ж) and хотеть (mixed conjugation)' },
      { t: 'text', md: `
## + infinitive
${ex('Я могу прийти завтра.', 'I can come tomorrow.')} · ${ex('Мы хотим отдыхать.', 'We want to rest.')}
**хотеть** mixes both conjugations: *хочу, хочешь, хочет* but *хотим, хотите, хотят*.

## мне надо, можно, нельзя
These don't change; the person goes in the **dative** (*to me*): **мне, тебе, ему, ей, нам, вам, им**.
- ${ex('Мне надо работать.', 'I need to work.')}
- ${ex('Можно войти?', 'May I come in?')}
- ${ex('Здесь нельзя курить.', "You can't smoke here.")}

**уметь** (know how to) vs **мочь** (be able to now): ${ex('Я умею плавать, но сегодня не могу.', "I can swim, but today I can't.")}` },
      { t: 'logic', md: `Russian often expresses need and permission **impersonally**: not "I need" but "to me it is necessary" (*мне надо*). You already know this pattern from age (*мне двадцать лет*) and liking (*мне нравится*): the person is the one things happen **to**.` },
      { t: 'mistakes', items: [['Я надо работать.', 'Мне надо работать.', 'надо takes the dative: мне.'], ['Он можит.', 'Он может.', 'мочь: может (г → ж).'], ['Мы хочем.', 'Мы хотим.', 'хотеть: хотим in the plural.']] },
    ],
    practice: {
      conj: { verbs: ['мочь', 'хотеть'], tenses: ['presente'], count: 8 },
      choice: [
        q('Ты ___ мне помочь?', ['можешь', 'можишь', 'могешь'], 'мочь: ты можешь.', 'Can you help me?'),
        q('Мы ___ пить чай.', ['хотим', 'хочем', 'хотят'], 'хотеть: мы хотим.', 'We want to drink tea.'),
        q('___ надо идти.', ['Мне', 'Я', 'Меня'], 'надо takes the dative: мне.', 'I need to go.'),
        q('Здесь ___ курить.', ['нельзя', 'не может', 'нет'], '"Not allowed" is нельзя.', "You can't smoke here."),
        q('Они ___ прийти.', ['могут', 'можут', 'могят'], 'мочь: они могут.', 'They can come.'),
      ],
    },
  },
  {
    id: 'ru-g-possession', level: 'A1', title: 'Having: у меня есть, у меня нет', titleEs: 'У меня есть',
    summary: 'у + genitive to have; нет + genitive for not having.',
    blocks: [
      { t: 'text', md: `
## у меня есть: "at me there is"
| у меня | I have | у нас | we have |
| у тебя | you have | у вас | you have |
| у него / у неё | he / she has | у них | they have |

${ex('У меня есть машина.', 'I have a car.')} · ${ex('У тебя есть брат?', 'Do you have a brother?')}

## Not having: нет + genitive
**нет** replaces есть and the thing goes into the **genitive** case:
| брат | → нет брат**а** |
| машина | → нет машин**ы** |
| время | → нет времени |

${ex('У меня нет машины.', "I don't have a car.")} · ${ex('Сегодня нет урока.', "There's no lesson today.")}

The genitive: masculine / neuter **-а / -я**, feminine **-ы / -и** (spelling rule: книги).` },
      { t: 'logic', md: `Russian doesn't "have" things; things "are at" you: *у меня есть* (at me is). The negative is "at me there is none of X", which is why the thing moves to the **genitive**, the case of "of" and "none of".` },
      { t: 'mistakes', items: [['Я имею брата.', 'У меня есть брат.', 'Russian uses у меня есть.'], ['У меня нет машина.', 'У меня нет машины.', 'нет + genitive.'], ['У я есть.', 'У меня есть.', 'After у: меня, тебя, него…']] },
    ],
    practice: {
      choice: [
        q('У ___ есть собака.', ['меня', 'мне', 'я'], 'After у: меня.', 'I have a dog.'),
        q('У меня нет ___.', ['времени', 'время', 'временем'], 'нет + genitive: времени.', "I don't have time."),
        q('У него нет ___.', ['сестры', 'сестра', 'сестру'], 'нет + genitive, feminine -а → -ы.', "He doesn't have a sister."),
        q('У нас нет ___.', ['хлеба', 'хлеб', 'хлебу'], 'нет + genitive, masculine + а: хлеба.', "We don't have any bread."),
        q('У ___ есть дети?', ['вас', 'вам', 'вы'], 'After у: вас.', 'Do you have children?'),
      ],
    },
  },
  {
    id: 'ru-g-future', level: 'A1', title: 'The future: буду + infinitive', titleEs: 'Будущее время',
    summary: 'я буду читать: the future of imperfective verbs.',
    blocks: [
      { t: 'table', verbs: ['быть', 'читать'], tense: 'futuro', caption: 'быть in the future, and буду + infinitive' },
      { t: 'text', md: `
## буду + infinitive
For a process, a habit or something ongoing in the future: ${ex('Завтра я буду работать.', "Tomorrow I'll be working.")} · ${ex('Летом мы будем жить на даче.', "In summer we'll be living at the dacha.")}

## "will be": буду, будешь…
${ex('Завтра я буду дома.', "Tomorrow I'll be at home.")}

## Present, past, future of быть
| present | (nothing) | Я дома. |
| past | был, была, было, были | Я был дома. |
| future | буду, будешь, будет… | Я буду дома. |

You'll meet the other way to make the future (*прочитаю*: I'll read it all) with aspect in A2.` },
      { t: 'logic', md: `**быть** (to be) is invisible in the present but appears in the past and future, and its future forms double as the helper for the future of other verbs: *буду* (I'll be) + *читать* = I'll be reading. It's like English *will* or German *werden*.` },
      { t: 'mistakes', items: [['Я буду читаю.', 'Я буду читать.', 'After буду: the infinitive.'], ['Он буду работать.', 'Он будет работать.', 'буду changes for the person: он будет.'], ['Я есть дома.', 'Я дома.', 'In the present, быть is left out.']] },
    ],
    practice: {
      conj: { verbs: ['быть', 'читать', 'работать'], tenses: ['futuro'], count: 8 },
      choice: [
        q('Завтра я ___ работать.', ['буду', 'будет', 'был'], 'Future helper for я: буду.', "Tomorrow I'll be working."),
        q('Что ты ___ делать вечером?', ['будешь', 'буду', 'будет'], 'For ты: будешь.', 'What are you going to do this evening?'),
        q('Мы будем ___ фильм.', ['смотреть', 'смотрим', 'смотрели'], 'After будем, the infinitive: смотреть.', "We'll watch a film."),
        q('Вчера она ___ дома.', ['была', 'будет', 'есть'], 'Yesterday + a woman: была.', 'Yesterday she was at home.'),
        q('Они ___ в Москве в мае.', ['будут', 'будет', 'были'], 'Future for они: будут.', "They'll be in Moscow in May."),
      ],
    },
  },
];
