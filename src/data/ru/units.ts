import { units } from '../build';
import { ex } from './registry';

/** Russian A1. Each note shows the forms its sentences use before (or where) they first appear. */
export const RU_A1_UNITS = units('A1', [
  {
    id: 'ru-a1-01', title: 'Greetings & introductions', titleEs: 'Знакомство', emoji: '👋',
    description: 'Say hello, introduce yourself and read your first Cyrillic words.',
    words: [
      ['привет', 'hi'], ['здравствуйте', 'hello (formal)'], ['до свидания', 'goodbye'], ['пока', 'bye'], ['доброе утро', 'good morning'],
      ['добрый день', 'good afternoon'], ['добрый вечер', 'good evening'], ['спокойной ночи', 'good night'], ['спасибо', 'thank you'], ['пожалуйста', 'please / you’re welcome'],
      ['да', 'yes'], ['нет', 'no'], ['извините', 'excuse me / sorry'], ['как дела?', 'how are you?', 'Привет! Как дела?', 'Hi! How are you?'],
      ['хорошо', 'well / good'], ['плохо', 'badly'], ['меня зовут', 'my name is', 'Меня зовут Анна.', 'My name is Anna.'], ['очень приятно', 'nice to meet you'],
    ],
    sentences: [
      ['Привет! Меня зовут Иван.', 'Hi! My name is Ivan.'],
      ['Как тебя зовут?', 'What is your name?'],
      ['Как дела? — Хорошо, спасибо.', 'How are you? — Fine, thanks.'],
      ['Я студент.', 'I am a student.'],
      ['Очень приятно!', 'Nice to meet you!'],
    ],
    grammar: `
## Reading Cyrillic
Many letters look and sound like English: **А, К, М, О, Т**. Some look English but sound different: **В** = v, **Н** = n, **Р** = r, **С** = s, **У** = oo, **Х** = ch (as in Bach). The Pronunciation page has the whole alphabet.

## No "am / is / are" in the present
Russian simply leaves out "to be": ${ex('Я студент.', 'I am a student.')} · ${ex('Он врач.', 'He is a doctor.')} There are no articles either: *студент* = a student / the student.

## Personal pronouns
| я | I | мы | we |
| ты | you (informal) | вы | you (formal / plural) |
| он / она / оно | he / she / it | они | they |

## ты or вы?
**ты** for friends, family and children; **вы** for strangers, older people and work. **Здравствуйте** goes with вы, **привет** with ты.

## Your name: a fixed phrase for now
**Меня зовут…** (literally "me they call…") · **Как тебя зовут?** · **Как вас зовут?** (formal)
`,
  },
  {
    id: 'ru-a1-02', title: 'Numbers & age', titleEs: 'Числа и возраст', emoji: '🔢',
    description: 'Count to 20 and say how old you are.',
    words: [
      ['ноль', 'zero'], ['один', 'one'], ['два', 'two'], ['три', 'three'], ['четыре', 'four'], ['пять', 'five'], ['шесть', 'six'],
      ['семь', 'seven'], ['восемь', 'eight'], ['девять', 'nine'], ['десять', 'ten'], ['одиннадцать', 'eleven'], ['двенадцать', 'twelve'],
      ['пятнадцать', 'fifteen'], ['двадцать', 'twenty'], ['сколько?', 'how many / how much?'], ['год', 'year'], ['лет', 'years (of age)'],
    ],
    sentences: [
      ['Мне двадцать лет.', 'I am twenty.'],
      ['Сколько тебе лет?', 'How old are you?'],
      ['Ему пять лет.', 'He is five.'],
      ['Ей двадцать один год.', 'She is twenty-one.'],
      ['У меня два брата.', 'I have two brothers.'],
    ],
    grammar: `
## Numbers 0–20
| 0 ноль | 1 один | 2 два | 3 три |
| 4 четыре | 5 пять | 6 шесть | 7 семь |
| 8 восемь | 9 девять | 10 десять | 11 одиннадцать |
| 12 двенадцать | 13 тринадцать | 14 четырнадцать | 15 пятнадцать |
| 16 шестнадцать | 17 семнадцать | 18 восемнадцать | 19 девятнадцать, 20 двадцать |

11–19 all end in **-надцать** ("on ten"): *один + надцать = одиннадцать*.

## Age: "to me are twenty years"
Russian says *to me* (**мне**), *to you* (**тебе**), *to him* (**ему**), *to her* (**ей**): ${ex('Мне двадцать лет.', 'I am twenty.')}
The word for "years" changes with the number:
- 1, 21, 31… → **год**
- 2–4, 22–24… → **года**
- 5–20, 25–30… → **лет**

These come from the cases you'll meet later; for now learn the three as a pattern.
`,
  },
  {
    id: 'ru-a1-03', title: 'Family', titleEs: 'Семья', emoji: '👨‍👩‍👧',
    description: 'Talk about your family and what you have.',
    words: [
      ['семья', 'family'], ['мама', 'mum'], ['папа', 'dad'], ['мать', 'mother'], ['отец', 'father'], ['родители', 'parents'],
      ['брат', 'brother'], ['сестра', 'sister'], ['сын', 'son'], ['дочь', 'daughter'], ['бабушка', 'grandmother'], ['дедушка', 'grandfather'],
      ['муж', 'husband'], ['жена', 'wife'], ['ребёнок', 'child'], ['дети', 'children'], ['у меня есть', 'I have', 'У меня есть брат.', 'I have a brother.'],
    ],
    sentences: [
      ['Это моя мама.', 'This is my mum.'],
      ['У меня есть брат и сестра.', 'I have a brother and a sister.'],
      ['Мой папа врач.', 'My dad is a doctor.'],
      ['Моя бабушка живёт в Москве.', 'My grandmother lives in Moscow.'],
      ['У тебя есть дети?', 'Do you have children?'],
    ],
    grammar: `
## Three genders, seen in the ending
| masculine (он) | ends in a consonant or **-й** | брат, отец, музей |
| feminine (она) | ends in **-а / -я** | мама, сестра, семья |
| neuter (оно) | ends in **-о / -е** | окно, море |

**-ь** can be either: *день* (m), *дочь* (f); learn these with the word. A few male people end in -а: *папа, дедушка*: they are masculine because of what they mean.

## My: мой, моя, моё, мои
The word for "my" agrees with the noun: **мой** брат, **моя** сестра, **моё** окно, **мои** родители. **твой / твоя / твоё / твои** (your) work the same way.

## "I have": у меня есть
Russian says "at me there is": ${ex('У меня есть сестра.', 'I have a sister.')} · ${ex('У тебя есть машина?', 'Do you have a car?')}

## Your first verb: жить (to live)
| я живу | мы живём |
| ты живёшь | вы живёте |
| он / она живёт | они живут |

**в Москве** = in Moscow: the place takes an **-е** ending after *в* (more in the lesson on "where?").
`,
    conj: { verbs: ['жить'], tenses: ['presente'] },
  },
  {
    id: 'ru-a1-04', title: 'Describing people & things', titleEs: 'Какой? Какая?', emoji: '🧑',
    description: 'Describe people and things with adjectives.',
    words: [
      ['большой', 'big'], ['маленький', 'small'], ['новый', 'new'], ['старый', 'old'], ['молодой', 'young'], ['красивый', 'beautiful'],
      ['хороший', 'good'], ['плохой', 'bad'], ['интересный', 'interesting'], ['весёлый', 'cheerful'], ['умный', 'clever'], ['высокий', 'tall'],
      ['белый', 'white'], ['чёрный', 'black'], ['красный', 'red'], ['синий', 'blue (dark)'], ['какой?', 'what kind of?'], ['очень', 'very'],
    ],
    sentences: [
      ['Это новый дом.', 'This is a new house.'],
      ['Моя сестра очень красивая.', 'My sister is very beautiful.'],
      ['Какая интересная книга!', 'What an interesting book!'],
      ['Это не мой телефон.', "This isn't my phone."],
      ['Мой город большой и старый.', 'My town is big and old.'],
    ],
    grammar: `
## Adjectives agree with the noun
| masculine | feminine | neuter | plural |
| нов**ый** дом | нов**ая** книга | нов**ое** окно | нов**ые** дома |
| больш**ой** город | больш**ая** семья | больш**ое** окно | больш**ие** города |

Stressed endings use **-ой** instead of -ый: *большой, молодой*. After **г, к, х, ж, ш, щ, ч**, write **и** instead of ы: *маленький, хороший, высокие*.

## Asking: какой? какая? какое? какие?
${ex('Какой это дом?', 'What kind of house is this?')}

## Not: не
**не** goes right before the word it negates: ${ex('Это не мой дом.', "This isn't my house.")} · ${ex('Он не студент.', "He isn't a student.")}
`,
  },
  {
    id: 'ru-a1-05', title: 'At home', titleEs: 'Дома', emoji: '🏠',
    description: 'Describe your flat and say where things are.',
    words: [
      ['дом', 'house'], ['квартира', 'flat'], ['комната', 'room'], ['кухня', 'kitchen'], ['спальня', 'bedroom'], ['ванная', 'bathroom'],
      ['стол', 'table'], ['стул', 'chair'], ['кровать', 'bed'], ['диван', 'sofa'], ['окно', 'window'], ['дверь', 'door'],
      ['где?', 'where?'], ['здесь', 'here'], ['там', 'there'], ['в', 'in'], ['на', 'on / at'], ['этаж', 'floor (storey)'],
    ],
    sentences: [
      ['Где кухня? — Кухня там.', 'Where is the kitchen? — The kitchen is there.'],
      ['Книга на столе.', 'The book is on the table.'],
      ['Мама в кухне.', 'Mum is in the kitchen.'],
      ['Моя квартира большая.', 'My flat is big.'],
      ['В комнате есть диван и стол.', 'There is a sofa and a table in the room.'],
    ],
    grammar: `
## Where? в / на + the prepositional case
After **в** (in) and **на** (on, at), most nouns end in **-е**:
| стол | → на стол**е** |
| комната | → в комнат**е** |
| окно | → на окн**е** |
| кухня | → в кухн**е** |

Feminine nouns in **-ь** and words in **-ия** take **-и**: *кровать → на кровати, Россия → в России*.

## в or на?
**в** = inside (в комнате, в Москве); **на** = on a surface, and for some places that are "open" or events: **на** кухне (also common), **на** работе, **на** почте, **на** концерте. Learn the на-places as you meet them.

## There is: есть
${ex('В комнате есть телевизор.', 'There is a TV in the room.')}
`,
  },
  {
    id: 'ru-a1-06', title: 'Food & drink', titleEs: 'Еда', emoji: '🥟',
    description: 'Say what you eat, drink and like.',
    words: [
      ['еда', 'food'], ['хлеб', 'bread'], ['сыр', 'cheese'], ['мясо', 'meat'], ['рыба', 'fish'], ['суп', 'soup'],
      ['салат', 'salad'], ['вода', 'water'], ['чай', 'tea'], ['кофе', 'coffee'], ['молоко', 'milk'], ['сок', 'juice'],
      ['завтрак', 'breakfast'], ['обед', 'lunch'], ['ужин', 'dinner'], ['вкусный', 'tasty'], ['есть', 'to eat'], ['пить', 'to drink'],
    ],
    sentences: [
      ['Я люблю чай.', 'I like tea.'],
      ['Что ты хочешь? — Я хочу воду.', 'What do you want? — I want water.'],
      ['Мы едим суп и пьём сок.', "We're eating soup and drinking juice."],
      ['Он не ест мясо.', "He doesn't eat meat."],
      ['Это очень вкусная рыба!', 'This is very tasty fish!'],
    ],
    grammar: `
## The object: the accusative case
The thing you eat, want or love takes the **accusative**. Only **feminine** nouns in -а / -я visibly change:
| вода | → я пью вод**у** |
| рыба | → он ест рыб**у** |
| чай, хлеб, молоко | stay the same (masculine / neuter things) |

## Three key verbs
| | есть (eat) | пить (drink) | хотеть (want) |
| я | ем | пью | хочу |
| ты | ешь | пьёшь | хочешь |
| он / она | ест | пьёт | хочет |
| мы | едим | пьём | хотим |
| вы | едите | пьёте | хотите |
| они | едят | пьют | хотят |

**любить** (to love / like) works the same way: *я люблю, ты любишь…* + the accusative: ${ex('Я люблю рыбу.', 'I like fish.')}
`,
    conj: { verbs: ['есть', 'пить', 'хотеть'], tenses: ['presente'] },
  },
  {
    id: 'ru-a1-07', title: 'Daily routine', titleEs: 'Мой день', emoji: '⏰',
    description: 'Describe your day and tell the time.',
    words: [
      ['утро', 'morning'], ['день', 'day / afternoon'], ['вечер', 'evening'], ['ночь', 'night'], ['утром', 'in the morning'], ['вечером', 'in the evening'],
      ['час', 'hour / o’clock'], ['время', 'time'], ['сейчас', 'now'], ['рано', 'early'], ['поздно', 'late'], ['всегда', 'always'],
      ['обычно', 'usually'], ['потом', 'then'], ['вставать', 'to get up'], ['работать', 'to work'], ['отдыхать', 'to rest'],
    ],
    sentences: [
      ['Я встаю в семь часов.', 'I get up at seven.'],
      ['Утром я завтракаю.', 'In the morning I have breakfast.'],
      ['Потом я работаю.', 'Then I work.'],
      ['Вечером мы отдыхаем.', 'In the evening we rest.'],
      ['Который час? — Сейчас восемь часов.', "What time is it? — It's eight o'clock."],
    ],
    grammar: `
## The first conjugation: -ю, -ешь, -ет…
Most verbs in **-ать / -ять** drop **-ть** and add these endings:
| я работа**ю** | мы работа**ем** |
| ты работа**ешь** | вы работа**ете** |
| он / она работа**ет** | они работа**ют** |

*вставать* is a little special: *я встаю, ты встаёшь* (the **-ва-** drops out).

## Times of day
**утром** (in the morning), **днём**, **вечером**, **ночью**: no preposition needed.

## Telling the time
**Который час?** · **Сколько времени?** · ${ex('Сейчас час / два часа / пять часов.', "It's one o'clock / two o'clock / five o'clock.")}
"at" is **в**: ${ex('в восемь часов', "at eight o'clock")} (the word *час* changes like *год / года / лет*).
`,
    conj: { verbs: ['работать', 'вставать', 'отдыхать'], tenses: ['presente'] },
  },
  {
    id: 'ru-a1-08', title: 'Around town', titleEs: 'В городе', emoji: '🏙️',
    description: 'Say where you are going and how.',
    words: [
      ['город', 'town / city'], ['улица', 'street'], ['магазин', 'shop'], ['банк', 'bank'], ['почта', 'post office'], ['аптека', 'pharmacy'],
      ['музей', 'museum'], ['театр', 'theatre'], ['кино', 'cinema'], ['парк', 'park'], ['вокзал', 'railway station'], ['метро', 'underground'],
      ['автобус', 'bus'], ['куда?', 'where to?'], ['направо', 'to the right'], ['налево', 'to the left'], ['прямо', 'straight on'], ['далеко', 'far'],
    ],
    sentences: [
      ['Куда ты идёшь? — Я иду в магазин.', 'Where are you going? — I’m going to the shop.'],
      ['Мы едем в театр на метро.', "We're going to the theatre by underground."],
      ['Аптека направо.', 'The pharmacy is on the right.'],
      ['Вокзал далеко?', 'Is the station far?'],
      ['Она идёт на почту.', "She's going to the post office."],
    ],
    grammar: `
## Where? vs Where to?
- **где?** (where?) + в / на + **prepositional** (-е): ${ex('Я в магазине.', "I'm in the shop.")}
- **куда?** (where to?) + в / на + **accusative**: ${ex('Я иду в магазин.', "I'm going to the shop.")} · ${ex('Она идёт на почту.', "She's going to the post office.")}

## Going: on foot or by transport
Russian has two verbs for "go" right now:
| | идти (on foot) | ехать (by transport) |
| я | иду | еду |
| ты | идёшь | едешь |
| он / она | идёт | едет |
| мы | идём | едем |
| вы | идёте | едете |
| они | идут | едут |

How: **на** + transport: *на метро, на автобусе* (by underground, by bus).
`,
    conj: { verbs: ['идти', 'ехать'], tenses: ['presente'] },
  },
  {
    id: 'ru-a1-09', title: 'Free time & likes', titleEs: 'Свободное время', emoji: '⚽',
    description: 'Talk about hobbies and what you like.',
    words: [
      ['футбол', 'football'], ['теннис', 'tennis'], ['музыка', 'music'], ['гитара', 'guitar'], ['книга', 'book'], ['фильм', 'film'],
      ['спорт', 'sport'], ['играть', 'to play'], ['читать', 'to read'], ['слушать', 'to listen'], ['смотреть', 'to watch'], ['танцевать', 'to dance'],
      ['петь', 'to sing'], ['рисовать', 'to draw'], ['любить', 'to love / to like'], ['нравиться', 'to be liked'], ['часто', 'often'],
    ],
    sentences: [
      ['Я люблю читать.', 'I love reading.'],
      ['Он играет в футбол.', 'He plays football.'],
      ['Она играет на гитаре.', 'She plays the guitar.'],
      ['Мне нравится музыка.', 'I like music.'],
      ['Вечером мы смотрим фильм.', 'In the evening we watch a film.'],
    ],
    grammar: `
## The second conjugation: -ю, -ишь, -ит…
Many verbs in **-ить / -еть** take endings with **и**:
| я говор**ю** | мы говор**им** |
| ты говор**ишь** | вы говор**ите** |
| он / она говор**ит** | они говор**ят** |

*смотреть: смотрю, смотришь, смотрят* · *любить* adds an **л** in the я form: *люблю, любишь*.

## play: играть в / на
- a game or sport: **играть в** + accusative: *играть в футбол, в теннис*
- an instrument: **играть на** + prepositional: *играть на гитаре, на пианино*

## I like: мне нравится
"It pleases me": the liked thing is the subject: ${ex('Мне нравится музыка.', 'I like music.')} · plural: ${ex('Мне нравятся фильмы.', 'I like films.')}
`,
    conj: { verbs: ['говорить', 'смотреть', 'любить'], tenses: ['presente'] },
  },
  {
    id: 'ru-a1-10', title: 'Days, months & weather', titleEs: 'Дни и погода', emoji: '☀️',
    description: 'Talk about the week, the seasons and the weather.',
    words: [
      ['понедельник', 'Monday'], ['вторник', 'Tuesday'], ['среда', 'Wednesday'], ['четверг', 'Thursday'], ['пятница', 'Friday'], ['суббота', 'Saturday'],
      ['воскресенье', 'Sunday'], ['неделя', 'week'], ['месяц', 'month'], ['сегодня', 'today'], ['завтра', 'tomorrow'], ['вчера', 'yesterday'],
      ['зима', 'winter'], ['весна', 'spring'], ['лето', 'summer'], ['осень', 'autumn'], ['погода', 'weather'], ['холодно', "it's cold"],
    ],
    sentences: [
      ['Сегодня понедельник.', 'Today is Monday.'],
      ['В субботу я отдыхаю.', 'On Saturday I rest.'],
      ['Зимой холодно.', "In winter it's cold."],
      ['Летом тепло.', "In summer it's warm."],
      ['Какая сегодня погода?', "What's the weather like today?"],
    ],
    grammar: `
## On Monday: в + accusative
${ex('в понедельник', 'on Monday')} · *в среду, в пятницу, в субботу* (feminine days change to -у).

## In winter: зимой, летом
Seasons use a special ending without a preposition: **зимой, весной, летом, осенью**.

## Weather: just an adverb
Russian says "cold", "warm": ${ex('Холодно.', "It's cold.")} · ${ex('Тепло.', "It's warm.")} · ${ex('Идёт дождь.', "It's raining.")} (literally "rain is going") · *Идёт снег* (it's snowing).
`,
  },
  {
    id: 'ru-a1-11', title: 'Countries & languages', titleEs: 'Страны и языки', emoji: '🌍',
    description: 'Say where you are from and which languages you speak.',
    words: [
      ['Россия', 'Russia'], ['Англия', 'England'], ['Германия', 'Germany'], ['Франция', 'France'], ['Испания', 'Spain'], ['Америка', 'America'],
      ['страна', 'country'], ['язык', 'language'], ['русский', 'Russian'], ['английский', 'English'], ['по-русски', 'in Russian'], ['по-английски', 'in English'],
      ['говорить', 'to speak'], ['понимать', 'to understand'], ['знать', 'to know'], ['откуда?', 'where from?'], ['из', 'from'],
    ],
    sentences: [
      ['Я говорю по-русски.', 'I speak Russian.'],
      ['Откуда ты? — Я из Англии.', 'Where are you from? — I’m from England.'],
      ['Вы понимаете по-английски?', 'Do you understand English?'],
      ['Мы живём в Германии.', 'We live in Germany.'],
      ['Я знаю русский язык.', 'I know Russian.'],
    ],
    grammar: `
## Speaking a language: по-русски
With **говорить, понимать, читать**: **по-** + the adjective in -и: *по-русски, по-английски, по-немецки*.
With **знать, учить** use the noun: ${ex('Я знаю русский язык.', "I know Russian.")}

## From: из + genitive
${ex('Я из России.', "I'm from Russia.")} · ${ex('Он из Англии.', "He's from England.")} Countries in **-ия** take **-и**: *Россия → из России, в России*.

## Nationalities
${ex('Я русский / русская · Он англичанин / Она англичанка.', "I'm Russian (m / f) · He's English / She's English.")} Note: Russian writes nationalities and languages **with a small letter**.
`,
    conj: { verbs: ['понимать', 'знать'], tenses: ['presente'] },
  },
  {
    id: 'ru-a1-12', title: 'Jobs & work', titleEs: 'Работа', emoji: '💼',
    description: 'Say what you do and where you work.',
    words: [
      ['работа', 'work / job'], ['врач', 'doctor'], ['учитель', 'teacher'], ['инженер', 'engineer'], ['студент', 'student (m)'], ['студентка', 'student (f)'],
      ['журналист', 'journalist'], ['программист', 'programmer'], ['продавец', 'shop assistant'], ['повар', 'cook'], ['офис', 'office'], ['больница', 'hospital'],
      ['школа', 'school'], ['университет', 'university'], ['фирма', 'company'], ['учиться', 'to study (be a student)'], ['кем?', 'as what?'],
    ],
    sentences: [
      ['Я врач. Я работаю в больнице.', "I'm a doctor. I work in a hospital."],
      ['Где ты работаешь? — В офисе.', 'Where do you work? — In an office.'],
      ['Она учится в университете.', 'She studies at university.'],
      ['Мой брат программист.', 'My brother is a programmer.'],
      ['Кем ты работаешь?', 'What do you do (for work)?'],
    ],
    grammar: `
## Jobs: no "is", no article
${ex('Я учитель.', "I'm a teacher.")} · ${ex('Она журналист.', "She's a journalist.")}

## Where you work: в / на + prepositional
*в офисе, в школе, в больнице, в университете* · but **на** заводе, **на** почте.

## Studying: учиться vs учить
- **учиться** = to be a student somewhere: ${ex('Я учусь в университете.', "I'm studying at university.")}
- **учить** = to learn something: ${ex('Я учу русский язык.', "I'm learning Russian.")}

-ся at the end means the verb "turns back" on you: *учусь, учишься, учится, учимся, учитесь, учатся*.

**Кем ты работаешь?** literally "as whom do you work?" (кем is the instrumental case, coming later).
`,
    conj: { verbs: ['учиться', 'работать'], tenses: ['presente'] },
  },
  {
    id: 'ru-a1-13', title: 'Questions & little words', titleEs: 'Вопросы', emoji: '❓',
    description: 'Ask questions and link your ideas.',
    words: [
      ['кто?', 'who?'], ['что?', 'what?'], ['когда?', 'when?'], ['почему?', 'why?'], ['потому что', 'because'], ['как?', 'how?'],
      ['чей?', 'whose?'], ['который?', 'which?'], ['и', 'and'], ['а', 'and / but (contrast)'], ['но', 'but'], ['или', 'or'],
      ['тоже', 'also'], ['ещё', 'still / more'], ['уже', 'already'], ['только', 'only'],
    ],
    sentences: [
      ['Кто это? — Это мой друг.', 'Who is this? — This is my friend.'],
      ['Что это? — Это книга.', 'What is this? — This is a book.'],
      ['Почему ты не спишь? — Потому что я читаю.', "Why aren't you sleeping? — Because I'm reading."],
      ['Я люблю чай, а он любит кофе.', 'I like tea, and he likes coffee.'],
      ['Когда ты работаешь?', 'When do you work?'],
    ],
    grammar: `
## Questions: just the voice
A yes / no question has the same word order as a statement; your voice rises on the key word: ${ex('Ты студент?', 'Are you a student?')} · ${ex('Это твой дом?', 'Is this your house?')}

## Question words first
${ex('Где ты живёшь?', 'Where do you live?')} · ${ex('Что ты делаешь?', 'What are you doing?')} · Answer **почему?** with **потому что**.

## и, а, но
- **и** = and (adding): *чай и кофе*
- **а** = and / whereas (contrast): ${ex('Я студент, а он врач.', "I'm a student, and he's a doctor.")}
- **но** = but (against expectation): ${ex('Он устал, но работает.', "He's tired, but he's working.")}
`,
  },
  {
    id: 'ru-a1-14', title: 'Everyday verbs', titleEs: 'Важные глаголы', emoji: '🧩',
    description: 'Say what you can, want and need to do, and talk about yesterday.',
    words: [
      ['мочь', 'can'], ['хотеть', 'to want'], ['надо', 'it is necessary'], ['можно', 'one may / it is allowed'], ['нельзя', 'one must not'],
      ['делать', 'to do / to make'], ['писать', 'to write'], ['ждать', 'to wait'], ['спать', 'to sleep'], ['звонить', 'to call'],
      ['покупать', 'to buy'], ['помогать', 'to help'], ['готовить', 'to cook'], ['думать', 'to think'], ['вчера вечером', 'last night'], ['был', 'was (m)'],
    ],
    sentences: [
      ['Я могу помочь.', 'I can help.'],
      ['Мне надо работать.', 'I need to work.'],
      ['Здесь можно курить? — Нет, нельзя.', 'Can you smoke here? — No, you can’t.'],
      ['Вчера я читал книгу.', 'Yesterday I was reading a book.'],
      ['Она была дома.', 'She was at home.'],
    ],
    grammar: `
## Can, want + infinitive
| я могу | я хочу |
| ты можешь | ты хочешь |
| он может | он хочет |
| мы можем | мы хотим |
| вы можете | вы хотите |
| они могут | они хотят |

${ex('Я хочу спать.', 'I want to sleep.')} · ${ex('Ты можешь помочь?', 'Can you help?')}

## Need, may: мне надо, можно, нельзя
**надо** (need to) with **мне / тебе / ему / ей**: ${ex('Мне надо идти.', 'I need to go.')} · **можно** (may / it's OK) · **нельзя** (mustn't / can't).

## The past: -л, -ла, -ло, -ли
Drop **-ть** and add an ending for the **gender** of the subject, not the person:
| он читал | она читала | оно читало | они читали |
${ex('Вчера я читал.', 'Yesterday I was reading.')} (a man) · ${ex('Вчера я читала.', "Yesterday I was reading (said by a woman).")} (a woman). "was": **был, была, было, были**.
`,
    conj: { verbs: ['мочь', 'хотеть', 'читать'], tenses: ['presente', 'preterito'] },
  },
]);

export const RU_A1_UNIT_LESSONS: Record<string, string[]> = {
  'ru-a1-01': ['ru-g-big-picture'],
  'ru-a1-02': ['ru-g-big-picture'],
  'ru-a1-03': ['ru-g-gender'],
  'ru-a1-04': ['ru-g-adjectives'],
  'ru-a1-05': ['ru-g-prepositional'],
  'ru-a1-06': ['ru-g-accusative', 'ru-g-conj1'],
  'ru-a1-07': ['ru-g-conj1'],
  'ru-a1-08': ['ru-g-motion'],
  'ru-a1-09': ['ru-g-conj2'],
  'ru-a1-10': ['ru-g-accusative'],
  'ru-a1-11': ['ru-g-prepositional'],
  'ru-a1-12': ['ru-g-conj2'],
  'ru-a1-13': ['ru-g-big-picture'],
  'ru-a1-14': ['ru-g-past', 'ru-g-modals'],
};
