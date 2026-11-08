import type { GrammarLesson } from '../types';
import { ex, q } from './registry';

/** Russian A2 grammar, in the order of the A2 units. */
export const GRAMMAR_RU_A2: GrammarLesson[] = [
  {
    id: 'ru-g-genitive', level: 'A2', title: 'The genitive: of, none, how many', titleEs: 'Родительный падеж',
    summary: 'нет + genitive, quantities, numbers, and из / от / у / до / после / без.',
    blocks: [
      { t: 'text', md: `
## The endings
| | singular | plural |
| masculine (стол, музей) | стол**а**, музе**я** | стол**ов**, музе**ев** |
| feminine (книга, неделя) | книг**и**, недел**и** | книг, недель (the ending drops) |
| neuter (окно, море) | окн**а**, мор**я** | окон, морей |

## Five jobs
- **of / whose**: ${ex('Это машина брата.', "It's my brother's car.")}
- **none of**: ${ex('У меня нет денег.', "I don't have any money.")}
- **amounts**: *много, мало, сколько, килограмм, бутылка* + genitive: ${ex('бутылка воды', 'a bottle of water')}
- **numbers**: 2, 3, 4 + genitive **singular**; 5–20 + genitive **plural**: *два брата, пять братьев* (you met *года / лет* already)
- **after** из, от, у, до, после, без, для: ${ex('после работы', 'after work')} · ${ex('кофе без сахара', 'coffee without sugar')}` },
      { t: 'logic', md: `The genitive is the case of **"of"** and **"part of / none of"**. That's why it follows numbers (two *of* brother, five *of* brothers), quantities (a bottle *of* water) and нет (none *of*). Once you hear the hidden "of", you know the case.` },
      { t: 'mistakes', items: [['пять брата', 'пять братьев', '5+ takes the genitive plural.'], ['два братьев', 'два брата', '2–4 take the genitive singular.'], ['чашка кофе с без сахар', 'чашка кофе без сахара', 'без + genitive.']] },
    ],
    practice: {
      choice: [
        q('У меня нет ___.', ['машины', 'машина', 'машину'], 'нет + genitive, feminine -а → -ы.', "I don't have a car."),
        q('Дайте, пожалуйста, бутылку ___.', ['воды', 'вода', 'воду'], 'A quantity (a bottle of) + genitive: воды.', 'A bottle of water, please.'),
        q('У меня два ___.', ['брата', 'брат', 'братьев'], '2, 3, 4 + genitive singular: брата.', 'I have two brothers.'),
        q('В группе пять ___.', ['студентов', 'студента', 'студенты'], '5+ + genitive plural: студентов.', 'There are five students in the group.'),
        q('Я пью кофе без ___.', ['сахара', 'сахар', 'сахаром'], 'без (without) + genitive: сахара.', 'I drink coffee without sugar.'),
      ],
    },
  },
  {
    id: 'ru-g-dative', level: 'A2', title: 'The dative: to whom', titleEs: 'Дательный падеж',
    summary: 'кому? помогать, звонить, дарить, нравиться, надо, к.',
    blocks: [
      { t: 'text', md: `
## The endings
| masculine / neuter | брат → брат**у**, окно → окн**у** |
| feminine | мама → мам**е**, Мария → Мари**и** |
| plural | брат**ам**, мам**ам** |
| pronouns | мне, тебе, ему, ей, нам, вам, им |

## Uses
- **to whom**: ${ex('Я звоню маме.', "I'm calling Mum.")} · ${ex('Я подарил брату книгу.', 'I gave my brother a book.')}
- verbs that take the dative: *помогать, звонить, советовать, нравиться, отвечать*
- feelings, age and need (you know these!): *мне нравится, мне двадцать лет, мне надо, мне холодно*
- **к** (towards, to someone's): ${ex('Я иду к врачу.', "I'm going to the doctor's.")}` },
      { t: 'logic', md: `The dative is the **receiver**: the one something goes **to**. That one idea links *звонить маме* (call to Mum), *мне нравится* (it is pleasing to me), *мне холодно* (it is cold to me) and *к врачу* (to the doctor's).` },
      { t: 'mistakes', items: [['Я звоню маму.', 'Я звоню маме.', 'звонить takes the dative.'], ['Я помогаю брата.', 'Я помогаю брату.', 'помогать takes the dative.'], ['Я иду к врач.', 'Я иду к врачу.', 'к + dative.']] },
    ],
    practice: {
      choice: [
        q('Вечером я позвоню ___.', ['маме', 'маму', 'мама'], 'звонить кому? → dative: маме.', "I'll call Mum this evening."),
        q('Я помогаю ___.', ['брату', 'брата', 'брат'], 'помогать кому? → dative: брату.', "I'm helping my brother."),
        q('___ нравится этот фильм.', ['Ей', 'Она', 'Её'], 'нравиться: the person who likes is in the dative: ей.', 'She likes this film.'),
        q('Завтра я иду к ___.', ['врачу', 'врача', 'врач'], 'к + dative: врачу.', "Tomorrow I'm going to the doctor's."),
        q('Что ты подаришь ___?', ['сестре', 'сестру', 'сестра'], 'дарить кому? → dative, feminine -е: сестре.', 'What will you give your sister?'),
      ],
    },
  },
  {
    id: 'ru-g-instrumental', level: 'A2', title: 'The instrumental: with, by, as', titleEs: 'Творительный падеж',
    summary: 'с кем? чем? кем? с другом, ручкой, врачом.',
    blocks: [
      { t: 'text', md: `
## The endings
| masculine / neuter | брат → брат**ом**, окно → окн**ом** (after ж, ш, ч, щ, ц unstressed: -ем) |
| feminine | мама → мам**ой**, неделя → недел**ей** |
| plural | брать**ями**, друзь**ями**, мам**ами** |
| pronouns | мной, тобой, им, ей, нами, вами, ими |

## Uses
- **с** (with, together): ${ex('Я гуляю с собакой.', "I'm walking with the dog.")} · *чай с молоком*
- **the tool**: ${ex('Я пишу ручкой.', "I'm writing with a pen.")}
- **as / becoming**: ${ex('Я работаю врачом.', 'I work as a doctor.')} · ${ex('Он хочет стать пилотом.', "He wants to become a pilot.")}
- verbs: *заниматься* (спортом), *интересоваться* (музыкой)
- **за, под, над, перед, рядом с** (behind, under, above, in front of, next to): *за домом, перед школой*` },
      { t: 'logic', md: `The instrumental is the case of **"by means of / together with"**. It answers **с кем?** (with whom?), **чем?** (with what?) and **кем?** (as what?). That's why "Кем ты работаешь?" means "as what do you work?", the question you learned as a fixed phrase in A1.` },
      { t: 'mistakes', items: [['Я работаю врач.', 'Я работаю врачом.', 'работать кем? → instrumental.'], ['чай с молоко', 'чай с молоком', 'с + instrumental.'], ['Я занимаюсь спорт.', 'Я занимаюсь спортом.', 'заниматься чем? → instrumental.']] },
    ],
    practice: {
      choice: [
        q('Я пью чай с ___.', ['молоком', 'молоко', 'молока'], 'с (with) + instrumental: молоком.', 'I drink tea with milk.'),
        q('Она работает ___.', ['учителем', 'учитель', 'учителя'], 'работать кем? → instrumental: учителем.', 'She works as a teacher.'),
        q('Мы гуляем с ___.', ['подругой', 'подруга', 'подругу'], 'с + instrumental, feminine -а → -ой.', "We're walking with a friend."),
        q('Я занимаюсь ___.', ['спортом', 'спорт', 'спорта'], 'заниматься чем? → instrumental.', 'I do sport.'),
        q('Машина стоит перед ___.', ['домом', 'дом', 'дому'], 'перед (in front of) + instrumental.', 'The car is in front of the house.'),
      ],
    },
  },
  {
    id: 'ru-g-aspect', level: 'A2', title: 'Aspect: process or result', titleEs: 'Вид глагола',
    summary: 'читал (was reading, used to read) or прочитал (read it all).',
    blocks: [
      { t: 'text', md: `
## Two verbs for one English verb
Most Russian verbs come in **pairs**:
| imperfective: process, repetition | perfective: one complete result |
| читать | прочитать |
| делать | сделать |
| писать | написать |
| покупать | купить |
| говорить | сказать |

## In the past
- **imperfective**: the action itself, a habit, or "was doing": ${ex('Вчера я читал книгу.', 'Yesterday I was reading a book.')} · ${ex('Я часто звонил маме.', 'I often called Mum.')}
- **perfective**: done, finished, with a result: ${ex('Я прочитал книгу.', "I've read the book (to the end).")} · ${ex('Я позвонил маме.', 'I called Mum (and got through).')}

## Signal words
- imperfective: **долго, часто, всегда, каждый день, обычно, иногда**
- perfective: **уже, наконец, вдруг, сразу**` },
      { t: 'table', verbs: ['читать', 'прочитать'], tense: 'preterito', caption: 'The same past endings, different meaning' },
      { t: 'logic', md: `It's the same choice as Spanish **imperfecto / pretérito** or French **imparfait / passé composé**, but built into the verb itself. Ask: am I describing the **activity** (imperfective) or reporting the **result** (perfective)? Many perfectives are the imperfective + a prefix (*по-, про-, на-, с-*).` },
      { t: 'mistakes', items: [['Я часто прочитал газету.', 'Я часто читал газету.', 'A repeated action: imperfective.'], ['Я уже читал письмо, вот ответ.', 'Я уже прочитал письмо, вот ответ.', 'A finished result: perfective.'], ['Он долго сделал работу.', 'Он долго делал работу.', 'долго describes the process: imperfective.']] },
    ],
    practice: {
      conj: { verbs: ['прочитать', 'сделать', 'написать', 'купить', 'сказать'], tenses: ['preterito'], count: 8 },
      choice: [
        q('Я уже ___ эту книгу, вот она.', ['прочитал', 'читал', 'читаю'], 'уже + a finished result: perfective прочитал.', "I've already read this book, here it is."),
        q('Каждое утро она ___ кофе.', ['пила', 'выпила', 'выпьет'], 'Every morning (a habit): imperfective пила.', 'Every morning she drank coffee.'),
        q('Вчера весь вечер я ___ письма.', ['писал', 'написал', 'напишу'], 'All evening (the process): imperfective писал.', 'Yesterday I spent the whole evening writing letters.'),
        q('Ты ___ хлеб? — Да, вот он.', ['купил', 'покупал', 'покупаешь'], 'A result (here it is): perfective купил.', 'Did you buy bread? — Yes, here it is.'),
        q('Он долго ___ на вопрос.', ['отвечал', 'ответил', 'ответит'], 'долго (for a long time): imperfective отвечал.', 'He took a long time answering the question.'),
      ],
    },
  },
  {
    id: 'ru-g-aspect-future', level: 'A2', title: 'Two futures: буду читать / прочитаю', titleEs: 'Будущее время и вид',
    summary: 'The perfective "present" is the future.',
    blocks: [
      { t: 'text', md: `
## Two ways to talk about the future
| imperfective: буду + infinitive | perfective: conjugate it like a present |
| Я буду читать. (I'll be reading / I'll read regularly) | Я прочитаю. (I'll read it to the end) |
| Я буду звонить каждый день. | Я позвоню завтра. |

A perfective verb has **no present**: its present forms mean the future. ${ex('Я напишу письмо завтра.', "I'll write the letter tomorrow.")}` },
      { t: 'table', verbs: ['прочитать', 'купить'], tense: 'futuro', caption: 'Perfective future: present endings, future meaning' },
      { t: 'text', md: `
## Never буду + perfective
*Я буду прочитать* is impossible. Choose: **буду читать** (process) or **прочитаю** (result).` },
      { t: 'logic', md: `A perfective verb describes one complete action. The **present** is never complete (it's happening now), so the perfective simply can't have a present. Its forms jump forward to the next point where the action can be complete: the future.` },
      { t: 'mistakes', items: [['Я буду купить хлеб.', 'Я куплю хлеб.', 'Never буду + perfective.'], ['Сейчас я прочитаю книгу.', 'Сейчас я читаю книгу.', 'Right now: imperfective present.'], ['Завтра я позвоню каждый час.', 'Завтра я буду звонить каждый час.', 'A repeated action in the future: imperfective.']] },
    ],
    practice: {
      conj: { verbs: ['прочитать', 'купить', 'позвонить', 'написать'], tenses: ['futuro'], count: 8 },
      choice: [
        q('Завтра я ___ тебе.', ['позвоню', 'буду позвонить', 'звоню'], 'One call, a result: perfective future позвоню.', "I'll call you tomorrow."),
        q('Летом я ___ много читать.', ['буду', 'прочитаю', 'читаю'], 'A process / habit in the future: буду + infinitive.', "In summer I'll read a lot."),
        q('Я ___ эту книгу за неделю.', ['прочитаю', 'буду прочитать', 'читал'], 'Finishing it in a week (a result): прочитаю.', "I'll read this book in a week."),
        q('Что ты ___ делать в субботу?', ['будешь', 'сделаешь', 'делал'], 'Asking about the activity: будешь делать.', 'What are you going to do on Saturday?'),
        q('Мы ___ билеты сегодня.', ['купим', 'будем купить', 'покупали'], 'One result: perfective future купим.', "We'll buy the tickets today."),
      ],
    },
  },
  {
    id: 'ru-g-imperative', level: 'A2', title: 'Commands', titleEs: 'Повелительное наклонение',
    summary: 'читай / читайте, говори / говорите.',
    blocks: [
      { t: 'text', md: `
## From the они form
Take **они**, drop **-ют / -ут / -ят / -ат**:
- stem ends in a vowel → **-й / -йте**: *чита-ют → читай, читайте*
- otherwise → **-и / -ите**: *говор-ят → говори, говорите*; *пиш-ут → пиши, пишите*
- reflexive add **-ся / -сь**: *занимайся, занимайтесь*` },
      { t: 'table', verbs: ['читать', 'говорить', 'писать', 'заниматься'], tense: 'imperativo', caption: 'ты and вы commands' },
      { t: 'text', md: `
## Aspect in commands
- positive, one action: usually **perfective**: ${ex('Позвони мне!', 'Call me!')}
- negative: usually **imperfective**: ${ex('Не звони мне!', "Don't call me!")}
- polite invitations: imperfective: ${ex('Садитесь, пожалуйста.', 'Please sit down.')}

**Давай / давайте** + infinitive or мы-form = let's: ${ex('Давай пойдём в кино!', "Let's go to the cinema!")}` },
      { t: 'logic', md: `The command is built from the **они** stem, the most "basic" form of the verb, exactly like the Spanish or French command is built from a present form. -**те** is the same polite / plural marker you see in *вы делаете*.` },
      { t: 'mistakes', items: [['Чити!', 'Читай!', 'A vowel stem takes -й.'], ['Не скажи ему!', 'Не говори ему!', 'Negative commands: imperfective.'], ['Пишай!', 'Пиши!', 'From пишут: пиш- + и.']] },
    ],
    practice: {
      conj: { verbs: ['читать', 'говорить', 'писать', 'делать', 'смотреть'], tenses: ['imperativo'], count: 8 },
      choice: [
        q('___ громче, пожалуйста! (говорить)', ['Говорите', 'Говорийте', 'Говорете'], 'говорят → говор- + ите.', 'Speak louder, please!'),
        q('___ эту книгу! (читать, ты)', ['Читай', 'Читаи', 'Чити'], 'читают → чита- (vowel) + й.', 'Read this book!'),
        q('Не ___ так быстро! (to a friend)', ['говори', 'скажи', 'говорит'], 'Negative command: imperfective говори.', "Don't talk so fast!"),
        q('___ пойдём в кино!', ['Давай', 'Дай', 'Давать'], "Let's: давай + мы-form.", "Let's go to the cinema!"),
        q('___ мне вечером! (позвонить, вы)', ['Позвоните', 'Позвонийте', 'Позвонять'], 'позвонят → позвон- + ите.', 'Call me in the evening!'),
      ],
    },
  },
  {
    id: 'ru-g-prefixed-motion', level: 'A2', title: 'Arriving and leaving: при-, у-, по-', titleEs: 'Приставочные глаголы движения',
    summary: 'пойти, приехать, уйти: prefixes give motion verbs a direction.',
    blocks: [
      { t: 'text', md: `
## Prefixes add a direction
| prefix | meaning | on foot | by transport |
| по- | set off | пойти | поехать |
| при- | arrive | прийти / приходить | приехать / приезжать |
| у- | leave | уйти / уходить | уехать / уезжать |

The perfective comes from **идти / ехать**, the imperfective from **ходить / ездить** (or a new form like *приезжать*).

## In sentences
- ${ex('Он пришёл домой в шесть часов.', 'He came home at six.')}
- ${ex('Завтра мы поедем на дачу.', "Tomorrow we'll go to the dacha.")}
- ${ex('Она уже ушла.', 'She has already left.')}
- ${ex('Поезд приходит в восемь.', 'The train arrives at eight.')} (regularly / timetable: imperfective)` },
      { t: 'table', verbs: ['прийти', 'уйти'], tense: 'preterito', caption: 'Past of прийти and уйти: like шёл / шла' },
      { t: 'logic', md: `The base pairs from A1 (*идти / ходить, ехать / ездить*) now combine with aspect. A prefix makes the movement **complete**: *пойти* (to have set off), *прийти* (to have arrived). The prefixes are like English particles: come **in**, go **away**, set **off**.` },
      { t: 'mistakes', items: [['Он прийшёл.', 'Он пришёл.', 'прийти: пришёл / пришла.'], ['Завтра я пойду в Москву на поезде.', 'Завтра я поеду в Москву на поезде.', 'By train: поехать.'], ['Она уже уходила, её нет.', 'Она уже ушла, её нет.', 'A result (she is gone): perfective.']] },
    ],
    practice: {
      conj: { verbs: ['прийти', 'уйти', 'приехать', 'пойти', 'поехать'], tenses: ['preterito'], count: 8 },
      choice: [
        q('Он ___ домой в шесть часов.', ['пришёл', 'прийшёл', 'пришла'], 'Arrived on foot: прийти → пришёл.', 'He came home at six.'),
        q('Летом мы ___ на море на машине.', ['поедем', 'пойдём', 'идём'], 'By car, setting off in the future: поедем.', "In summer we'll go to the seaside by car."),
        q('Где Анна? — Она уже ___.', ['ушла', 'уходила', 'уйдёт'], 'She has left (result): ушла.', "Where's Anna? — She's already left."),
        q('Когда ты ___ в Москву? — Вчера.', ['приехал', 'пришёл', 'приезжаешь'], 'Arrived by transport, yesterday: приехал.', 'When did you arrive in Moscow? — Yesterday.'),
        q('Давай ___ в парк!', ['пойдём', 'ходим', 'пойду'], "Let's set off on foot: давай пойдём.", "Let's go to the park!"),
      ],
    },
  },
  {
    id: 'ru-g-reflexive', level: 'A2', title: 'Verbs in -ся', titleEs: 'Возвратные глаголы',
    summary: 'одеваться, заниматься, встречаться: -ся after a consonant, -сь after a vowel.',
    blocks: [
      { t: 'table', verbs: ['заниматься', 'учиться'], tense: 'presente', caption: '-ся after a consonant, -сь after a vowel' },
      { t: 'text', md: `
## Three meanings of -ся
- **oneself**: *одеваться* (to dress oneself), *умываться*
- **each other**: ${ex('Мы встречаемся в кафе.', "We're meeting at the café.")}
- **just part of the verb**: *смеяться* (laugh), *надеяться* (hope), *учиться* (study)

## Past and future
${ex('Она одевалась.', 'She was getting dressed.')} · ${ex('Он проснулся в семь.', 'He woke up at seven.')} · ${ex('Я буду заниматься.', "I'll study.")}` },
      { t: 'logic', md: `-**ся** is an old form of **себя** (oneself) glued to the verb, like Spanish *-se* or French *se*. It's always the last thing in the word, after the person ending: *занима-ю-сь, занима-ет-ся*.` },
      { t: 'mistakes', items: [['Я занимаюся.', 'Я занимаюсь.', 'After a vowel: -сь.'], ['Он умываетсь.', 'Он умывается.', 'After a consonant: -ся.'], ['Я одеваю.', 'Я одеваюсь.', 'Dressing yourself: одеваться.']] },
    ],
    practice: {
      conj: { verbs: ['заниматься', 'одеваться', 'встречаться', 'учиться', 'просыпаться'], tenses: ['presente', 'preterito'], count: 10 },
      choice: [
        q('Я ___ спортом.', ['занимаюсь', 'занимаюся', 'занимаю'], 'After the vowel ю: -сь.', 'I do sport.'),
        q('Где вы ___?', ['встречаетесь', 'встречаетеся', 'встречаете'], 'After the vowel е: -сь.', 'Where do you meet?'),
        q('Утром она быстро ___.', ['одевается', 'одеваетсь', 'одевает'], 'After the consonant т: -ся.', 'In the morning she gets dressed quickly.'),
        q('Вчера я ___ поздно. (a man)', ['проснулся', 'проснулась', 'проснулсь'], 'A man, after the consonant л: проснулся.', 'Yesterday I woke up late.'),
        q('Они ___ в школе.', ['учатся', 'учутся', 'учат'], 'учиться: они учатся.', 'They study at school.'),
      ],
    },
  },
  {
    id: 'ru-g-time', level: 'A2', title: 'Time: через, назад, в, на', titleEs: 'Выражение времени',
    summary: 'in two days, a week ago, on Monday, for a month.',
    blocks: [
      { t: 'text', md: `
## Before and after now
- **через** + accusative = in (from now): ${ex('через неделю', 'in a week')} · ${ex('Я приеду через два дня.', "I'll come in two days.")}
- **назад** after the time = ago: ${ex('неделю назад', 'a week ago')}

## When?
| в + accusative | days, hours | в понедельник, в пять часов |
| в + prepositional | months, years | в мае, в 2020 году |
| на + prepositional | weeks | на этой неделе, на прошлой неделе |
| no preposition | parts of the day, seasons | утром, вечером, летом |

## How long?
- process (imperfective): accusative, no preposition: ${ex('Я жил там год.', 'I lived there for a year.')}
- planned period after: **на** + accusative: ${ex('Я еду в Москву на неделю.', "I'm going to Moscow for a week.")}
- result within a time: **за** + accusative: ${ex('Я прочитал книгу за два дня.', 'I read the book in two days.')}` },
      { t: 'logic', md: `Time words reuse the cases you know: **в + accusative** for points (like *куда?*), **в + prepositional** for containers like months and years (like *где?*). *через* (through) looks forward; *назад* (back) looks back.` },
      { t: 'mistakes', items: [['через неделя', 'через неделю', 'через + accusative.'], ['в май', 'в мае', 'Months: в + prepositional.'], ['назад два дня', 'два дня назад', 'назад comes after the time.']] },
    ],
    practice: {
      choice: [
        q('Поезд уходит через ___.', ['час', 'часа', 'часом'], 'через + accusative (час unchanged).', 'The train leaves in an hour.'),
        q('Я был в Москве три года ___.', ['назад', 'через', 'на'], 'ago = назад, after the time.', 'I was in Moscow three years ago.'),
        q('Мой день рождения в ___.', ['мае', 'май', 'мая'], 'Months: в + prepositional: в мае.', 'My birthday is in May.'),
        q('Я еду в Петербург на ___.', ['неделю', 'неделе', 'неделя'], 'A planned period: на + accusative.', "I'm going to St Petersburg for a week."),
        q('Мы встретимся в ___.', ['пятницу', 'пятнице', 'пятница'], 'Days: в + accusative: в пятницу.', "We'll meet on Friday."),
      ],
    },
  },
  {
    id: 'ru-g-comparison', level: 'A2', title: 'Comparing: больше, лучше, самый', titleEs: 'Сравнение',
    summary: 'more than, the most: -ее, чем, самый.',
    blocks: [
      { t: 'text', md: `
## The comparative: -ее
Drop the adjective ending and add **-ее**: *интересный → интереснее, тёплый → теплее, быстрый → быстрее*.
It never changes for gender: ${ex('Эта книга интереснее.', 'This book is more interesting.')}

## Irregular (learn these)
*хороший → лучше · плохой → хуже · большой → больше · маленький → меньше · дорогой → дороже · дешёвый → дешевле · молодой → моложе · старый → старше* (people)

## Than: чем, or the genitive
${ex('Москва больше, чем Петербург.', 'Moscow is bigger than St Petersburg.')} = ${ex('Москва больше Петербурга.', 'Moscow is bigger than St Petersburg.')}

## The most: самый
**самый / самая / самое / самые** + adjective: ${ex('Это самый красивый город.', "It's the most beautiful town.")}` },
      { t: 'logic', md: `The comparative is one unchanging form (**-ее** or an irregular one), while **самый** agrees like any adjective. This matches the superlative logic of the other languages: the comparative plus an extra word (*самый* ≈ *the most*).` },
      { t: 'mistakes', items: [['более хороший', 'лучше', 'хороший has an irregular comparative.'], ['Он старше чем я', 'Он старше, чем я / Он старше меня', 'Use a comma before чем, or the genitive.'], ['самая красивый', 'самый красивый', 'самый agrees with the noun.']] },
    ],
    practice: {
      choice: [
        q('Сегодня ___, чем вчера.', ['теплее', 'тёплый', 'теплый'], 'Comparative: тёплый → теплее.', "It's warmer today than yesterday."),
        q('Этот фильм ___ того.', ['лучше', 'хорошее', 'более хороший'], 'хороший → лучше (irregular).', 'This film is better than that one.'),
        q('Брат ___ меня на два года.', ['старше', 'старее', 'старый'], 'For people: старше.', 'My brother is two years older than me.'),
        q('Это ___ интересная книга.', ['самая', 'самый', 'самое'], 'книга is feminine: самая.', "It's the most interesting book."),
        q('Москва больше ___.', ['Петербурга', 'Петербург', 'Петербургу'], 'Without чем, the second part goes into the genitive.', 'Moscow is bigger than St Petersburg.'),
      ],
    },
  },
];
