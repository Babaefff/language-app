import type { GrammarLesson } from '../types';
import { ex, q } from './registry';

/** Russian B1 grammar, in the order of the B1 units. */
export const GRAMMAR_RU_B1: GrammarLesson[] = [
  {
    id: 'ru-g-conditional', level: 'B1', title: 'Would: the past + бы', titleEs: 'Сослагательное наклонение',
    summary: 'я бы купил, если бы у меня были деньги.',
    blocks: [
      { t: 'text', md: `
## One form for all "would"
The **past** tense + **бы**: ${ex('Я бы купил машину.', 'I would buy a car.')} · ${ex('Она бы помогла.', 'She would help.')}
There is no separate tense: the same form covers "would", "would have" and polite wishes.` },
      { t: 'table', verbs: ['купить', 'помочь'], tense: 'condicional', caption: 'past + бы' },
      { t: 'text', md: `
## Unreal conditions: если бы … бы
Both halves take the past + **бы**: ${ex('Если бы у меня были деньги, я бы путешествовал.', 'If I had money, I would travel.')}

## Real conditions: если + future
${ex('Если будет хорошая погода, мы пойдём гулять.', "If the weather is good, we'll go for a walk.")} (Russian uses the **future** after если when the time is future.)

## Polite: я бы хотел…
${ex('Я бы хотел заказать столик.', "I'd like to book a table.")} · ${ex('Вы не могли бы помочь?', "Could you help?")} (Could you help?)

## Advice
${ex('На твоём месте я бы позвонил ему.', 'If I were you, I would call him.')}` },
      { t: 'logic', md: `Russian builds "would" with a tiny particle, **бы**, on the past tense, so there is nothing new to conjugate, and it agrees by gender like any past (*купил бы / купила бы*). Compare English "would" (from "will" in the past): the same idea of a past form for unreal situations.` },
      { t: 'mistakes', items: [['Если бы у меня есть деньги…', 'Если бы у меня были деньги…', 'After если бы: the past.'], ['Если будет время, я бы пришёл.', 'Если будет время, я приду.', 'A real condition: future, no бы.'], ['Я хочу бы чай.', 'Я бы хотел чаю.', 'бы goes with the past form.']] },
    ],
    practice: {
      conj: { verbs: ['купить', 'помочь', 'хотеть', 'поехать'], tenses: ['condicional'], count: 8 },
      choice: [
        q('Если бы у меня было время, я бы ___ книгу.', ['прочитал', 'прочитаю', 'читаю'], 'Unreal: если бы … past + бы.', 'If I had time, I would read the book.'),
        q('Я бы ___ заказать такси.', ['хотел', 'хочу', 'хотеть'], 'Polite wish: я бы хотел.', "I'd like to order a taxi."),
        q('Если ___ хорошая погода, мы поедем на дачу.', ['будет', 'была бы', 'есть'], 'A real future condition: если + future.', "If the weather is good, we'll go to the dacha."),
        q('На твоём месте я бы ___ врачу.', ['позвонил', 'позвоню', 'звоню'], 'Advice: past + бы.', 'If I were you, I would call the doctor.'),
        q('Вы не ___ бы мне помочь?', ['могли', 'можете', 'сможете'], 'Polite request: past + бы: могли бы.', 'Could you help me?'),
      ],
    },
  },
  {
    id: 'ru-g-chtoby', level: 'B1', title: 'чтобы: in order to, (want) that', titleEs: 'Союз чтобы',
    summary: 'чтобы + infinitive or past: purpose and wishes for others.',
    blocks: [
      { t: 'text', md: `
## Same subject: чтобы + infinitive
${ex('Я учу русский, чтобы читать Толстого.', "I'm learning Russian to read Tolstoy.")}

## Different subject: чтобы + past
When someone else should do it, use the **past** tense: ${ex('Я хочу, чтобы ты пришёл.', 'I want you to come.')} · ${ex('Мама просит, чтобы мы не опаздывали.', 'Mum asks us not to be late.')}

## Wishes and requests
*хотеть, просить, сказать, важно, нужно* + **чтобы** + past for another person: ${ex('Важно, чтобы все знали правила.', "It's important that everyone knows the rules.")}` },
      { t: 'logic', md: `**чтобы** is really **что + бы**: "that would". That's why it takes the **past** for another person (like any бы-form): it describes something wanted, not yet real. It's the same idea as the Spanish and French subjunctive after *querer que / vouloir que*.` },
      { t: 'mistakes', items: [['Я хочу, чтобы ты придёшь.', 'Я хочу, чтобы ты пришёл.', 'Another subject: чтобы + past.'], ['Я хочу, чтобы я поехал.', 'Я хочу поехать.', 'Same subject: just the infinitive.'], ['Я пришёл, что купить хлеб.', 'Я пришёл, чтобы купить хлеб.', 'Purpose: чтобы.']] },
    ],
    practice: {
      choice: [
        q('Я хочу, чтобы ты ___ ко мне.', ['пришёл', 'придёшь', 'прийти'], 'Another person: чтобы + past.', 'I want you to come to me.'),
        q('Я работаю, ___ заработать деньги.', ['чтобы', 'что', 'потому что'], 'Purpose: чтобы + infinitive.', 'I work to earn money.'),
        q('Мама сказала, чтобы мы ___ домой рано.', ['вернулись', 'вернёмся', 'вернуться'], 'An instruction for others: чтобы + past.', 'Mum told us to come home early.'),
        q('Важно, чтобы все ___ правду.', ['знали', 'знают', 'знать'], 'важно, чтобы + past (plural): знали.', "It's important that everyone knows the truth."),
        q('Я хочу ___ в Россию.', ['поехать', 'чтобы я поехал', 'поехал'], 'The same subject: just the infinitive.', 'I want to go to Russia.'),
      ],
    },
  },
  {
    id: 'ru-g-kotoryi', level: 'B1', title: 'который: who, which', titleEs: 'Слово «который»',
    summary: 'Joining sentences: человек, который…; книга, которую…',
    blocks: [
      { t: 'text', md: `
## Gender from the noun, case from its own sentence
**который** takes its **gender and number** from the noun it refers to, and its **case** from its role in the new clause:
- ${ex('Это мой друг, который живёт в Москве.', 'This is my friend who lives in Moscow.')} (subject → nominative)
- ${ex('Это книга, которую я читаю.', "This is the book I'm reading.")} (object → accusative, feminine)
- ${ex('Это город, в котором я родился.', 'This is the town where I was born.')} (в + prepositional)
- ${ex('Это человек, с которым я работаю.', 'This is the man I work with.')} (с + instrumental)

It declines like an adjective (*новый*): который, которая, которое, которые; которого, которой; которому…

## Always with a comma
Russian always separates the clause with a comma: ${ex('Девушка, которая поёт, моя сестра.', "The girl who is singing is my sister.")}` },
      { t: 'logic', md: `**который** is an adjective that "points back". Like every adjective it agrees with the noun (gender, number), but because it starts a new clause it takes the **case** that clause needs. Ask two questions: **which noun?** (→ gender) and **what is its job in its own sentence?** (→ case).` },
      { t: 'mistakes', items: [['книга, который я читаю', 'книга, которую я читаю', 'книга is feminine and the object: которую.'], ['Это друг который живёт там.', 'Это друг, который живёт там.', 'Always put a comma before который.'], ['город, где который я живу', 'город, в котором я живу', 'в + prepositional: в котором.']] },
    ],
    practice: {
      choice: [
        q('Это девушка, ___ поёт в группе.', ['которая', 'который', 'которую'], 'девушка is feminine and the subject: которая.', 'This is the girl who sings in the band.'),
        q('Фильм, ___ мы смотрели, был скучный.', ['который', 'которого', 'которую'], 'фильм is masculine, inanimate object: который.', 'The film we watched was boring.'),
        q('Это книга, ___ я тебе говорил.', ['о которой', 'которая', 'которую'], 'говорить о + prepositional, feminine: о которой.', "This is the book I told you about."),
        q('Вот друг, с ___ я учился.', ['которым', 'который', 'которого'], 'с + instrumental, masculine: с которым.', "Here's the friend I studied with."),
        q('Дом, в ___ я живу, очень старый.', ['котором', 'который', 'которого'], 'в (where?) + prepositional: в котором.', 'The house I live in is very old.'),
      ],
    },
  },
  {
    id: 'ru-g-plural-cases', level: 'B1', title: 'Plurals in all cases', titleEs: 'Множественное число: падежи',
    summary: 'друзьям, с друзьями, о друзьях: three plural endings you already know.',
    blocks: [
      { t: 'text', md: `
## The plural endings are almost the same for every noun
| case | ending | example |
| dative | **-ам / -ям** | друзь**ям**, книг**ам** |
| instrumental | **-ами / -ями** | с друзь**ями**, с книг**ами** |
| prepositional | **-ах / -ях** | о друзь**ях**, в книг**ах** |
| genitive | -ов / -ей / – | друзей, книг, столов |
| accusative | = nominative (things), = genitive (people) | Я вижу книги / Я вижу друзей |

${ex('Я часто звоню друзьям.', 'I often call my friends.')} · ${ex('Мы говорили о детях.', 'We talked about the children.')} · ${ex('Он живёт с родителями.', 'He lives with his parents.')}` },
      { t: 'logic', md: `In the singular each gender has its own endings; in the plural they **merge**: dative **-ам**, instrumental **-ами**, prepositional **-ах** for all genders. Only the genitive (and the accusative of people, which copies it) needs care.` },
      { t: 'mistakes', items: [['Я звоню друзей.', 'Я звоню друзьям.', 'звонить + dative plural: друзьям.'], ['с родителях', 'с родителями', 'с + instrumental plural: -ями.'], ['в городам', 'в городах', 'в (where?) + prepositional plural: -ах.']] },
    ],
    practice: {
      choice: [
        q('Я часто пишу ___.', ['друзьям', 'друзей', 'друзьях'], 'писать кому? + dative plural: друзьям.', 'I often write to my friends.'),
        q('Мы живём с ___.', ['родителями', 'родителям', 'родителях'], 'с + instrumental plural: родителями.', 'We live with our parents.'),
        q('Они говорят о ___.', ['детях', 'детям', 'детей'], 'о + prepositional plural: детях.', "They're talking about the children."),
        q('В этих ___ много музеев.', ['городах', 'городам', 'городами'], 'в (where?) + prepositional plural: городах.', 'There are many museums in these towns.'),
        q('Я вижу моих ___.', ['друзей', 'друзья', 'друзьям'], 'Accusative plural of people = genitive: друзей.', 'I see my friends.'),
      ],
    },
  },
  {
    id: 'ru-g-reported', level: 'B1', title: 'Reported speech: что and ли', titleEs: 'Косвенная речь',
    summary: 'Он сказал, что…; Она спросила, придёт ли он.',
    blocks: [
      { t: 'text', md: `
## Statements: что, and keep the tense
Russian **keeps the original tense** (no backshift): ${ex('Он сказал: «Я устал». → Он сказал, что устал.', 'He said: "I\'m tired." → He said he was tired.')} · ${ex('Она сказала, что придёт завтра.', 'She said she would come tomorrow.')}

## Yes / no questions: ли
The key word first, then **ли**: ${ex('Он спросил, приду ли я.', 'He asked whether I would come.')} · ${ex('Я не знаю, есть ли у него машина.', "I don't know if he has a car.")}

## Question words stay
${ex('Она спросила, где я живу.', 'She asked where I lived.')}

## Commands: чтобы + past
${ex('Мама сказала, чтобы я позвонил.', 'Mum told me to call.')}` },
      { t: 'logic', md: `Russian reports speech "as it was said": the tense from the original sentence stays (*придёт* = will come), unlike English *would*. **ли** marks an indirect yes / no question and sits right after the word being questioned, like English *whether*.` },
      { t: 'mistakes', items: [['Он сказал, что он был устал.', 'Он сказал, что устал.', 'Keep the original tense.'], ['Он спросил, если я приду.', 'Он спросил, приду ли я.', 'Indirect yes / no questions use ли, not если.'], ['Она спросила, где живу я ли.', 'Она спросила, где я живу.', 'With a question word, no ли.']] },
    ],
    practice: {
      choice: [
        q('Он сказал, что ___ завтра.', ['придёт', 'пришёл бы', 'прийти'], 'Keep the original tense: "I will come" → придёт.', 'He said he would come tomorrow.'),
        q('Я не знаю, ___ ли он.', ['приедет', 'если приедет', 'что приедет'], 'Yes / no question: verb + ли.', "I don't know whether he'll come."),
        q('Она спросила, ___ я живу.', ['где', 'ли где', 'что'], 'Keep the question word: где.', 'She asked where I lived.'),
        q('Учитель сказал, чтобы мы ___ текст.', ['прочитали', 'прочитаем', 'прочитать'], 'A reported command: чтобы + past.', 'The teacher told us to read the text.'),
        q('Он спросил, ___ ли у меня время.', ['есть', 'если есть', 'что'], 'The questioned word, then ли: есть ли.', 'He asked if I had time.'),
      ],
    },
  },
  {
    id: 'ru-g-participles', level: 'B1', title: 'Participles: reading them', titleEs: 'Причастия',
    summary: 'читающий, прочитанный: adjectives made from verbs, common in writing.',
    blocks: [
      { t: 'text', md: `
## Why learn them now
Participles are verb-adjectives; they are rare in speech but everywhere in news, signs and books. At B1 you mainly need to **recognise** them.

## Active present: -ущий / -ющий / -ащий / -ящий
"who is doing": ${ex('Человек, читающий газету, мой сосед.', 'The man reading the newspaper is my neighbour.')} (= человек, который читает)

## Passive past: -нный / -тый
"done": ${ex('Прочитанная книга лежит на столе.', 'The book that has been read is on the table.')} · *закрытый магазин* (a closed shop) · *сделанный в России* (made in Russia)

## Short form: the result
${ex('Магазин закрыт.', 'The shop is closed.')} · ${ex('Работа сделана.', 'The work is done.')}` },
      { t: 'logic', md: `A participle is a **который-clause squeezed into one adjective**: *человек, который читает* → *читающий человек*. It agrees like any adjective (*читающая девушка*), and the endings tell you active (-щий: doing) or passive (-нный / -тый: done).` },
      { t: 'mistakes', items: [['Магазин закрытый в воскресенье.', 'Магазин закрыт в воскресенье.', 'For a state (closed), use the short form: закрыт.'], ['сделанный в Россия', 'сделанный в России', 'в (where?) + prepositional.'], ['Работа сделан.', 'Работа сделана.', 'The short form agrees: работа (f) → сделана.']] },
    ],
    practice: {
      choice: [
        q('Магазин сегодня ___.', ['закрыт', 'закрывает', 'закрыть'], 'A state (closed): short passive participle закрыт.', 'The shop is closed today.'),
        q('«Человек, читающий газету» means…', ['the man who is reading the newspaper', 'the man who read the newspaper yesterday', 'the newspaper the man reads'], '-ющий = who is doing (active present).'),
        q('Эта машина ___ в Германии.', ['сделана', 'сделал', 'делает'], 'Made (passive), feminine: сделана.', 'This car was made in Germany.'),
        q('«Прочитанная книга» means…', ['a book that has been read', 'a book someone is reading', 'a book to read'], '-нный = done to it (passive past).'),
        q('Работа уже ___.', ['сделана', 'сделанный', 'делает'], 'The result, feminine short form: сделана.', 'The work is already done.'),
      ],
    },
  },
  {
    id: 'ru-g-connectors', level: 'B1', title: 'Linking ideas', titleEs: 'Союзы и связки',
    summary: 'потому что, поэтому, хотя, однако, если, когда.',
    blocks: [
      { t: 'text', md: `
## By job
| cause | **потому что, так как, из-за** + genitive | ${ex('Я остался дома, потому что болел.', 'I stayed at home because I was ill.')} |
| consequence | **поэтому, так что** | ${ex('Шёл дождь, поэтому мы не пошли гулять.', "It was raining, so we didn't go for a walk.")} |
| contrast | **но, однако, а** | ${ex('Он богат, однако несчастлив.', "He's rich, yet unhappy.")} |
| concession | **хотя** | ${ex('Хотя было холодно, мы гуляли.', 'Although it was cold, we went for a walk.')} |
| purpose | **чтобы** | ${ex('Я пришёл, чтобы помочь.', "I came to help.")} |
| time | **когда, пока, после того как** | ${ex('Когда я пришёл, все спали.', "When I arrived, everyone was asleep.")} |

## Commas
Russian puts a comma before every subordinate clause: *…, потому что…*, *…, что…*, *Хотя…, …*.

## Building an argument
**во-первых, во-вторых** (firstly, secondly) · **кроме того** (moreover) · **с одной стороны / с другой стороны** · **в итоге** (in the end)` },
      { t: 'logic', md: `As in the other languages, each linking job has a plain word and a more formal one (*но / однако*, *потому что / так как*). Russian is strict about commas: every clause starting with a conjunction or который gets one, which also helps you see the sentence's structure.` },
      { t: 'mistakes', items: [['Я не пришёл потому что болел.', 'Я не пришёл, потому что болел.', 'A comma before потому что.'], ['Было поздно, потому что мы пошли домой.', 'Было поздно, поэтому мы пошли домой.', 'A consequence: поэтому.'], ['из-за дождь', 'из-за дождя', 'из-за + genitive.']] },
    ],
    practice: {
      choice: [
        q('Я устал, ___ лёг спать рано.', ['поэтому', 'потому что', 'хотя'], 'A consequence: поэтому.', 'I was tired, so I went to bed early.'),
        q('___ было холодно, мы пошли на пляж.', ['Хотя', 'Поэтому', 'Потому что'], 'A concession: хотя.', 'Although it was cold, we went to the beach.'),
        q('Мы не поехали из-за ___.', ['дождя', 'дождь', 'дождём'], 'из-за + genitive: дождя.', "We didn't go because of the rain."),
        q('Он не пришёл, ___ заболел.', ['потому что', 'поэтому', 'хотя'], 'A cause: потому что.', "He didn't come because he fell ill."),
        q('Квартира большая, ___ очень дорогая.', ['однако', 'поэтому', 'потому что'], 'A contrast: однако (however).', 'The flat is big, however very expensive.'),
      ],
    },
  },
];
