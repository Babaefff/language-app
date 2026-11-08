import { units } from '../build';
import { ex } from './registry';

/** Russian A2: genitive, dative, instrumental, aspect, prefixed motion, comparison. Forms are shown before use. */
export const RU_A2_UNITS = units('A2', [
  {
    id: 'ru-a2-01', title: 'Shopping & clothes', titleEs: 'Покупки и одежда', emoji: '👕',
    description: 'Buy clothes, ask about prices and sizes.',
    words: [
      ['одежда', 'clothes'], ['рубашка', 'shirt'], ['платье', 'dress'], ['брюки', 'trousers'], ['юбка', 'skirt'], ['куртка', 'jacket'],
      ['пальто', 'coat'], ['обувь', 'footwear'], ['туфли', 'shoes'], ['размер', 'size'], ['цена', 'price'], ['дорогой', 'expensive'],
      ['дешёвый', 'cheap'], ['рубль', 'rouble'], ['примерить', 'to try on'], ['касса', 'till'], ['скидка', 'discount'],
    ],
    sentences: [
      ['Сколько стоит эта куртка?', 'How much is this jacket?'],
      ['Можно примерить это платье?', 'Can I try on this dress?'],
      ['Это слишком дорого.', "That's too expensive."],
      ['У вас есть другой размер?', 'Do you have another size?'],
      ['Куртка стоит пять тысяч рублей.', 'The jacket costs five thousand roubles.'],
    ],
    grammar: `
## Prices: numbers and the genitive
*один рубль · два, три, четыре рубля · пять (и больше) рублей* : the same pattern as *год / года / лет*.
${ex('Это стоит сто рублей.', 'It costs a hundred roubles.')}

## this: этот, эта, это, эти
${ex('Сколько стоит эта рубашка?', 'How much is this shirt?')} · ${ex('Эти туфли очень дорогие.', 'These shoes are very expensive.')}

## Too: слишком
${ex('Это слишком дорого.', "That's too expensive.")} · ${ex('Платье слишком большое.', "The dress is too big.")}
`,
    conj: { verbs: ['покупать', 'купить', 'стоить'], tenses: ['presente', 'futuro'] },
  },
  {
    id: 'ru-a2-02', title: 'Health & the body', titleEs: 'Здоровье', emoji: '🩺',
    description: 'Say what hurts and understand the doctor.',
    words: [
      ['голова', 'head'], ['горло', 'throat'], ['живот', 'stomach'], ['спина', 'back'], ['рука', 'hand / arm'], ['нога', 'leg / foot'],
      ['зуб', 'tooth'], ['глаз', 'eye'], ['болеть', 'to hurt / be ill'], ['больной', 'ill'], ['здоровый', 'healthy'], ['лекарство', 'medicine'],
      ['температура', 'temperature'], ['простуда', 'cold (illness)'], ['рецепт', 'prescription'], ['таблетка', 'tablet'], ['поликлиника', 'clinic'],
    ],
    sentences: [
      ['У меня болит голова.', 'I have a headache.'],
      ['У него болят зубы.', 'He has toothache.'],
      ['Мне надо к врачу.', 'I need to go to the doctor.'],
      ['Вчера у меня была температура.', 'Yesterday I had a temperature.'],
      ['Принимайте эти таблетки три раза в день.', 'Take these tablets three times a day.'],
    ],
    grammar: `
## It hurts: у меня болит
"At me hurts the head": ${ex('У меня болит голова.', 'I have a headache.')} · plural: ${ex('У меня болят ноги.', 'My legs hurt.')}

## Being ill: болеть
*Я болею* (I'm ill) · *Он болел неделю* (he was ill for a week).

## At the doctor's: к врачу, у врача
Going **to** a person: **к** + dative (*к врачу*). Being **at** someone's: **у** + genitive (*у врача*).
`,
    conj: { verbs: ['болеть'], tenses: ['presente', 'preterito'] },
  },
  {
    id: 'ru-a2-03', title: 'Travel & transport', titleEs: 'Путешествия', emoji: '🚆',
    description: 'Travel by train and plane, arrive and leave.',
    words: [
      ['поезд', 'train'], ['самолёт', 'plane'], ['билет', 'ticket'], ['аэропорт', 'airport'], ['гостиница', 'hotel'], ['чемодан', 'suitcase'],
      ['паспорт', 'passport'], ['виза', 'visa'], ['путешествие', 'journey / travel'], ['поездка', 'trip'], ['отпуск', 'holiday (from work)'], ['море', 'sea'],
      ['граница', 'border'], ['приезжать', 'to arrive'], ['уезжать', 'to leave'], ['опаздывать', 'to be late'], ['вовремя', 'on time'],
    ],
    sentences: [
      ['Поезд приходит в восемь часов.', 'The train arrives at eight.'],
      ['Мы приехали в Москву вчера.', 'We arrived in Moscow yesterday.'],
      ['Летом мы поедем на море.', "In summer we'll go to the seaside."],
      ['Самолёт опаздывает на час.', 'The plane is an hour late.'],
      ['Где ваш паспорт?', 'Where is your passport?'],
    ],
    grammar: `
## Arriving and leaving
**при-** = arrive, **у-** = leave, **по-** = set off. The perfective is for one completed trip: ${ex('Мы приехали вчера.', 'We arrived yesterday.')}
The imperfective is for timetables and habits: ${ex('Поезд приходит в восемь.', 'The train arrives at eight.')}

## For how long?
**на** + accusative: ${ex('Я еду на неделю.', "I'm going for a week.")} (I'm going for a week.)

## Late
**опаздывать на** + time: ${ex('Я опаздываю на десять минут.', "I'm ten minutes late.")}
`,
    conj: { verbs: ['приехать', 'поехать', 'опаздывать'], tenses: ['preterito', 'futuro'] },
  },
  {
    id: 'ru-a2-04', title: 'When I was a child', titleEs: 'Детство', emoji: '🧸',
    description: 'Talk about your childhood and what you used to do.',
    words: [
      ['детство', 'childhood'], ['детский сад', 'kindergarten'], ['игрушка', 'toy'], ['друг', 'friend (m)'], ['подруга', 'friend (f)'], ['деревня', 'village'],
      ['дача', 'dacha (country house)'], ['лес', 'forest'], ['река', 'river'], ['каждый', 'every'], ['иногда', 'sometimes'], ['никогда', 'never'],
      ['раньше', 'before / in the past'], ['тогда', 'then / at that time'], ['однажды', 'once (one day)'], ['вдруг', 'suddenly'],
    ],
    sentences: [
      ['В детстве я жил в деревне.', 'As a child I lived in a village.'],
      ['Каждое лето мы ездили на дачу.', 'Every summer we went to the dacha.'],
      ['Я часто играл с друзьями в лесу.', 'I often played with friends in the forest.'],
      ['Однажды я потерял собаку.', 'Once I lost the dog.'],
      ['Тогда я никогда не болел.', 'Back then I was never ill.'],
    ],
    grammar: `
## Habits in the past: imperfective
${ex('Каждое лето мы ездили на дачу.', 'Every summer we went to the dacha.')} · ${ex('Я часто играл в футбол.', "I often played football.")}

## One event: perfective
${ex('Однажды я потерял собаку.', 'Once I lost the dog.')} · ${ex('Вдруг пошёл дождь.', "Suddenly it started to rain.")}

## With friends: с + instrumental
*с другом, с подругой, с друзьями*.

## Never: никогда не
Russian uses a double negative: ${ex('Я никогда не был в Китае.', "I've never been to China.")}
`,
    conj: { verbs: ['играть', 'ездить', 'потерять'], tenses: ['preterito'] },
  },
  {
    id: 'ru-a2-05', title: 'At the restaurant', titleEs: 'В ресторане', emoji: '🍽️',
    description: 'Order food, ask for the bill and give instructions.',
    words: [
      ['меню', 'menu'], ['официант', 'waiter'], ['счёт', 'bill'], ['блюдо', 'dish'], ['первое', 'first course (soup)'], ['второе', 'main course'],
      ['десерт', 'dessert'], ['пирог', 'pie'], ['блины', 'pancakes'], ['борщ', 'borscht'], ['пельмени', 'dumplings'], ['сметана', 'sour cream'],
      ['заказывать', 'to order'], ['принести', 'to bring'], ['свободный', 'free / vacant'], ['стакан', 'glass'],
    ],
    sentences: [
      ['Принесите, пожалуйста, меню.', 'Please bring the menu.'],
      ['Я буду борщ и пельмени.', "I'll have borscht and dumplings."],
      ['Чай с лимоном, пожалуйста.', 'Tea with lemon, please.'],
      ['Счёт, пожалуйста!', 'The bill, please!'],
      ['Этот столик свободен?', 'Is this table free?'],
    ],
    grammar: `
## Ordering: я буду…
In a restaurant **Я буду…** means "I'll have…": ${ex('Я буду суп.', "I'll have the soup.")} · or **Можно…?** (Can I have…?)

## Polite commands
*Принесите, пожалуйста…* (Please bring…) · *Дайте, пожалуйста…* (Please give…)

## With: с + instrumental
${ex('чай с лимоном', 'tea with lemon')} · *блины со сметаной* (**со** before some consonant clusters)
`,
    conj: { verbs: ['заказывать', 'заказать'], tenses: ['presente', 'preterito'] },
  },
  {
    id: 'ru-a2-06', title: 'Work & studies', titleEs: 'Работа и учёба', emoji: '🎓',
    description: 'Talk about jobs, studying and what you want to become.',
    words: [
      ['профессия', 'profession'], ['коллега', 'colleague'], ['начальник', 'boss'], ['зарплата', 'salary'], ['компания', 'company'], ['экзамен', 'exam'],
      ['урок', 'lesson'], ['лекция', 'lecture'], ['факультет', 'faculty'], ['диплом', 'degree / diploma'], ['опыт', 'experience'], ['стать', 'to become'],
      ['интересоваться', 'to be interested in'], ['карьера', 'career'], ['менеджер', 'manager'], ['свободное время', 'free time'],
    ],
    sentences: [
      ['Кем ты работаешь? — Я работаю менеджером.', 'What do you do? — I work as a manager.'],
      ['Я хочу стать врачом.', 'I want to become a doctor.'],
      ['Она интересуется музыкой.', "She's interested in music."],
      ['Вчера я сдал экзамен.', 'Yesterday I passed the exam.'],
      ['Мой брат учится на втором курсе.', 'My brother is in his second year.'],
    ],
    grammar: `
## As what? работать кем, стать кем
Jobs after **работать, стать, быть** (past / future) take the **instrumental**: ${ex('Я работаю учителем.', 'I work as a teacher.')} · ${ex('Он хочет стать пилотом.', 'He wants to become a pilot.')}

## Interested in: интересоваться + instrumental
${ex('Я интересуюсь историей.', "I'm interested in history.")} · also *заниматься спортом*.

## Exams
**сдавать** экзамен = to take an exam (process) · **сдать** = to pass it (result).
`,
    conj: { verbs: ['стать', 'учиться'], tenses: ['preterito', 'futuro'] },
  },
  {
    id: 'ru-a2-07', title: 'Personality & comparing', titleEs: 'Характер', emoji: '⚖️',
    description: 'Describe personalities and compare people and things.',
    words: [
      ['характер', 'character'], ['добрый', 'kind'], ['злой', 'angry / mean'], ['спокойный', 'calm'], ['серьёзный', 'serious'], ['смешной', 'funny'],
      ['ленивый', 'lazy'], ['трудолюбивый', 'hard-working'], ['вежливый', 'polite'], ['честный', 'honest'], ['лучше', 'better'], ['хуже', 'worse'],
      ['больше', 'more / bigger'], ['меньше', 'less / smaller'], ['самый', 'the most'], ['чем', 'than'],
    ],
    sentences: [
      ['Мой брат старше меня.', 'My brother is older than me.'],
      ['Она спокойнее, чем её сестра.', 'She is calmer than her sister.'],
      ['Это самый добрый человек.', "He's the kindest person."],
      ['Сегодня погода лучше, чем вчера.', 'The weather is better today than yesterday.'],
      ['Он очень вежливый и честный.', 'He is very polite and honest.'],
    ],
    grammar: `
## Comparing
**-ее** + **чем**: ${ex('Она спокойнее, чем сестра.', 'She is calmer than her sister.')} · or the genitive: *старше меня, больше Москвы*.
Irregular: *хороший → лучше, плохой → хуже, большой → больше, маленький → меньше*.

## The most
**самый** agrees like any adjective: *самый добрый, самая умная, самые весёлые*.
`,
  },
  {
    id: 'ru-a2-08', title: 'Around the house', titleEs: 'Домашние дела', emoji: '🧹',
    description: 'Talk about housework: what you did and what you will do.',
    words: [
      ['уборка', 'cleaning'], ['посуда', 'dishes'], ['пол', 'floor'], ['мусор', 'rubbish'], ['стирать', 'to do the washing'], ['мыть', 'to wash'],
      ['убирать', 'to tidy'], ['пылесос', 'vacuum cleaner'], ['холодильник', 'fridge'], ['плита', 'cooker'], ['стиральная машина', 'washing machine'],
      ['сосед', 'neighbour'], ['ремонт', 'repairs / renovation'], ['чистый', 'clean'], ['грязный', 'dirty'], ['порядок', 'order / tidiness'],
    ],
    sentences: [
      ['Я мою посуду, а ты убираешь комнату.', "I'm washing the dishes and you're tidying the room."],
      ['Я уже приготовил ужин.', "I've already cooked dinner."],
      ['Завтра я вымою пол.', "Tomorrow I'll wash the floor."],
      ['Кто вынесет мусор?', 'Who will take out the rubbish?'],
      ['В квартире чисто.', 'The flat is clean.'],
    ],
    grammar: `
## Aspect pairs for chores
| process | result |
| мыть посуду | вымыть посуду |
| готовить ужин | приготовить ужин |
| убирать комнату | убрать комнату |

${ex('Я весь вечер убирал.', 'I spent the whole evening tidying.')} · ${ex('Я убрал комнату.', "I've tidied the room.")}

## Clean, dirty: adverbs for the state
${ex('В комнате чисто / грязно.', "The room is clean / dirty.")} (like *холодно*: no "it is")
`,
    conj: { verbs: ['мыть', 'убирать', 'приготовить'], tenses: ['presente', 'preterito'] },
  },
  {
    id: 'ru-a2-09', title: 'Phones & technology', titleEs: 'Технологии', emoji: '📱',
    description: 'Call, write and send messages.',
    words: [
      ['телефон', 'phone'], ['компьютер', 'computer'], ['ноутбук', 'laptop'], ['интернет', 'internet'], ['сообщение', 'message'], ['письмо', 'letter / email'],
      ['пароль', 'password'], ['сайт', 'website'], ['приложение', 'app'], ['зарядка', 'charger'], ['отправить', 'to send'], ['получить', 'to receive'],
      ['скачать', 'to download'], ['звонок', 'call'], ['социальные сети', 'social media'], ['онлайн', 'online'],
    ],
    sentences: [
      ['Я позвоню тебе вечером.', "I'll call you this evening."],
      ['Отправь мне сообщение.', 'Send me a message.'],
      ['Я забыл пароль.', "I've forgotten my password."],
      ['У меня нет зарядки.', "I don't have a charger."],
      ['Ты получил моё письмо?', 'Did you get my email?'],
    ],
    grammar: `
## To whom: the dative
*звонить, писать, отправлять, отвечать* + **кому?**: ${ex('Я пишу другу.', "I'm writing to a friend.")} · ${ex('Позвони маме!', 'Call Mum!')}

## Not having: нет + genitive
${ex('У меня нет интернета.', "I don't have internet.")}

## Perfective commands for one action
*Отправь, позвони, скачай* · negative: ${ex('Не звони мне поздно!', "Don't call me late!")}
`,
    conj: { verbs: ['отправить', 'позвонить', 'забыть'], tenses: ['preterito', 'futuro'] },
  },
  {
    id: 'ru-a2-10', title: 'Celebrations', titleEs: 'Праздники', emoji: '🎉',
    description: 'Birthdays and holidays: congratulate and give presents.',
    words: [
      ['праздник', 'holiday / celebration'], ['день рождения', 'birthday'], ['Новый год', 'New Year'], ['подарок', 'present'], ['гость', 'guest'], ['торт', 'cake'],
      ['свеча', 'candle'], ['цветы', 'flowers'], ['ёлка', 'New Year tree'], ['поздравлять', 'to congratulate'], ['дарить', 'to give (a present)'],
      ['приглашать', 'to invite'], ['отмечать', 'to celebrate'], ['поздравляю!', 'congratulations!'], ['с днём рождения!', 'happy birthday!'],
    ],
    sentences: [
      ['С днём рождения!', 'Happy birthday!'],
      ['Поздравляю тебя с Новым годом!', 'Happy New Year to you!'],
      ['Что ты подаришь маме?', 'What will you give Mum?'],
      ['Я подарил ей цветы.', 'I gave her flowers.'],
      ['Мы отмечали праздник у друзей.', "We celebrated the holiday at our friends'."],
    ],
    grammar: `
## Congratulating: поздравлять кого с чем
The person in the accusative, the occasion with **с** + instrumental: ${ex('Поздравляю тебя с днём рождения!', 'Happy birthday to you!')}
Short form: **С днём рождения! С Новым годом!**

## Giving: дарить кому что
The receiver in the **dative**, the present in the accusative: ${ex('Я подарю сестре книгу.', "I'll give my sister a book.")}

## At someone's: у + genitive
${ex('Мы были у друзей.', "We were at our friends'.")} (We were at our friends'.)
`,
    conj: { verbs: ['поздравлять', 'дарить', 'подарить'], tenses: ['presente', 'futuro'] },
  },
]);

export const RU_A2_UNIT_LESSONS: Record<string, string[]> = {
  'ru-a2-01': ['ru-g-genitive'],
  'ru-a2-02': ['ru-g-dative'],
  'ru-a2-03': ['ru-g-prefixed-motion', 'ru-g-time'],
  'ru-a2-04': ['ru-g-aspect', 'ru-g-instrumental'],
  'ru-a2-05': ['ru-g-imperative', 'ru-g-instrumental'],
  'ru-a2-06': ['ru-g-instrumental'],
  'ru-a2-07': ['ru-g-comparison'],
  'ru-a2-08': ['ru-g-aspect', 'ru-g-aspect-future'],
  'ru-a2-09': ['ru-g-dative', 'ru-g-imperative'],
  'ru-a2-10': ['ru-g-dative'],
};
