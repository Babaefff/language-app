import { units } from '../build';
import { ex } from './registry';

/** Russian B1: conditional, чтобы, который, plural cases, reported speech, participles, connectors. */
export const RU_B1_UNITS = units('B1', [
  {
    id: 'ru-b1-01', title: 'Plans & dreams', titleEs: 'Планы и мечты', emoji: '🌈',
    description: 'Talk about plans, dreams and what you would do.',
    words: [
      ['план', 'plan'], ['мечта', 'dream'], ['будущее', 'future'], ['цель', 'goal'], ['возможность', 'opportunity'], ['решение', 'decision'],
      ['мечтать', 'to dream'], ['надеяться', 'to hope'], ['решать', 'to decide'], ['собираться', 'to be going to'], ['обязательно', 'definitely'], ['наверное', 'probably'],
      ['может быть', 'maybe'], ['когда-нибудь', 'some day'], ['за границей', 'abroad'], ['деньги', 'money'],
    ],
    sentences: [
      ['Я собираюсь поехать за границу.', "I'm going to go abroad."],
      ['Если бы у меня были деньги, я бы купил дом у моря.', 'If I had money, I would buy a house by the sea.'],
      ['Я мечтаю стать писателем.', 'I dream of becoming a writer.'],
      ['Надеюсь, что всё будет хорошо.', 'I hope everything will be fine.'],
      ['Когда-нибудь я обязательно поеду в Сибирь.', "Some day I'll definitely go to Siberia."],
    ],
    grammar: `
## Plans: собираться + infinitive
${ex('Я собираюсь учиться в Москве.', "I'm going to study in Moscow.")}

## Dreams: мечтать о / + infinitive
${ex('Я мечтаю о собаке.', "I dream of a dog.")} (о + prepositional) · ${ex('Я мечтаю путешествовать.', "I dream of travelling.")}

## What if: если бы … бы
${ex('Если бы у меня было время, я бы учил китайский.', 'If I had time, I would learn Chinese.')}
`,
    conj: { verbs: ['мечтать', 'надеяться'], tenses: ['presente', 'condicional'] },
  },
  {
    id: 'ru-b1-02', title: 'Advice & requests', titleEs: 'Советы и просьбы', emoji: '💡',
    description: 'Give advice, make polite requests and say what others should do.',
    words: [
      ['совет', 'advice'], ['просьба', 'request'], ['советовать', 'to advise'], ['просить', 'to ask (for)'], ['предлагать', 'to suggest'], ['стоит', 'it is worth'],
      ['лучше всего', 'best of all'], ['должен', 'must / should'], ['нужно', 'it is necessary'], ['вежливо', 'politely'], ['пожалуй', 'perhaps'], ['конечно', 'of course'],
      ['проблема', 'problem'], ['вопрос', 'question'], ['ответ', 'answer'], ['помощь', 'help'],
    ],
    sentences: [
      ['Я советую тебе больше отдыхать.', 'I advise you to rest more.'],
      ['Тебе стоит посмотреть этот фильм.', 'You should watch this film.'],
      ['Вы не могли бы закрыть окно?', 'Could you close the window?'],
      ['Мама просит, чтобы я позвонил.', 'Mum is asking me to call.'],
      ['На твоём месте я бы не спешил.', "If I were you, I wouldn't rush."],
    ],
    grammar: `
## Advice
- **советовать** кому + infinitive: ${ex('Я советую вам отдохнуть.', 'I advise you to rest.')}
- **стоит / лучше** + infinitive (with dative): ${ex('Тебе лучше остаться дома.', "You'd better stay at home.")}
- **должен / должна / должны** (must): ${ex('Ты должен позвонить.', "You must call.")}

## Polite requests
*Вы не могли бы…? · Будьте добры… · Если вам не трудно…*

## Asking others: чтобы + past
${ex('Я прошу, чтобы вы говорили медленнее.', 'I ask you to speak more slowly.')}
`,
    conj: { verbs: ['советовать', 'просить', 'предлагать'], tenses: ['presente'] },
  },
  {
    id: 'ru-b1-03', title: 'Society & the environment', titleEs: 'Общество и экология', emoji: '🌍',
    description: 'Discuss society and the environment, and argue your opinion.',
    words: [
      ['общество', 'society'], ['природа', 'nature'], ['экология', 'ecology'], ['загрязнение', 'pollution'], ['отходы', 'waste'], ['климат', 'climate'],
      ['энергия', 'energy'], ['закон', 'law'], ['правительство', 'government'], ['гражданин', 'citizen'], ['мнение', 'opinion'], ['по-моему', 'in my opinion'],
      ['считать', 'to consider / think'], ['защищать', 'to protect'], ['во-первых', 'firstly'], ['кроме того', 'moreover'], ['однако', 'however'],
    ],
    sentences: [
      ['По-моему, нужно больше защищать природу.', 'In my opinion, we need to protect nature more.'],
      ['Я считаю, что это важная проблема.', 'I think this is an important problem.'],
      ['Во-первых, это дорого, во-вторых, неудобно.', "Firstly, it's expensive; secondly, it's inconvenient."],
      ['Хотя это трудно, мы должны попробовать.', "Although it's difficult, we must try."],
      ['Из-за загрязнения в городе трудно дышать.', "Because of pollution, it's hard to breathe in the city."],
    ],
    grammar: `
## Giving your opinion
**По-моему, … · Я считаю, что … · Мне кажется, что … · С одной стороны … с другой стороны …**
${ex('Мне кажется, что это правильно.', 'It seems to me that this is right.')}

## Building the argument
**во-первых, во-вторых, кроме того, однако, поэтому, в итоге**

## Because of: из-за + genitive
${ex('из-за погоды', 'because of the weather')} · and the positive *благодаря* + dative (thanks to).
`,
    conj: { verbs: ['считать', 'защищать'], tenses: ['presente'] },
  },
  {
    id: 'ru-b1-04', title: 'Culture & media', titleEs: 'Культура и СМИ', emoji: '🎭',
    description: 'Talk about books, films and the news, in detail.',
    words: [
      ['культура', 'culture'], ['искусство', 'art'], ['писатель', 'writer'], ['роман', 'novel'], ['стихи', 'poems'], ['выставка', 'exhibition'],
      ['спектакль', 'play / show'], ['новости', 'news'], ['газета', 'newspaper'], ['журнал', 'magazine'], ['статья', 'article'], ['передача', 'TV programme'],
      ['режиссёр', 'film director'], ['актёр', 'actor'], ['сюжет', 'plot'], ['знаменитый', 'famous'],
    ],
    sentences: [
      ['Это фильм, который мне очень понравился.', "It's a film I liked a lot."],
      ['Книга, которую я читаю, очень интересная.', "The book I'm reading is very interesting."],
      ['Мы были на выставке, о которой писали в газете.', 'We went to the exhibition that the paper wrote about.'],
      ['Он сказал, что спектакль был скучный.', 'He said the play was boring.'],
      ['Я не знаю, видел ли он этот фильм.', "I don't know whether he has seen this film."],
    ],
    grammar: `
## Describing with который
${ex('Это писатель, которого я люблю.', "He's a writer I love.")} · ${ex('Это газета, в которой я работаю.', 'This is the newspaper I work at.')}

## Reporting what people said
${ex('Он сказал, что фильм хороший.', 'He said the film was good.')} · ${ex('Я спросил, понравился ли ей спектакль.', "I asked whether she liked the play.")}

## Talking about a work
**Мне понравился / понравилась…** (I liked…) · **Это о том, как…** (It's about how…) · **Я рекомендую…**
`,
  },
  {
    id: 'ru-b1-05', title: 'Work & applying for a job', titleEs: 'Работа и резюме', emoji: '📄',
    description: 'Read job adverts, write a formal letter and talk about experience.',
    words: [
      ['вакансия', 'vacancy'], ['резюме', 'CV'], ['собеседование', 'job interview'], ['опыт работы', 'work experience'], ['образование', 'education'], ['навыки', 'skills'],
      ['требование', 'requirement'], ['условия', 'conditions'], ['график', 'schedule'], ['отпуск по болезни', 'sick leave'], ['уважаемый', 'dear (formal)'], ['с уважением', 'yours sincerely'],
      ['требуется', 'wanted'], ['обязанности', 'duties'], ['полный рабочий день', 'full-time'], ['ответственный', 'responsible'],
    ],
    sentences: [
      ['Требуется опытный программист.', 'Experienced programmer wanted.'],
      ['У меня пять лет опыта работы.', 'I have five years of work experience.'],
      ['Меня пригласили на собеседование.', "I've been invited to an interview."],
      ['Уважаемый Иван Петрович!', 'Dear Ivan Petrovich,'],
      ['С уважением, Анна Смирнова.', 'Yours sincerely, Anna Smirnova.'],
    ],
    grammar: `
## Job adverts use participles and short forms
*Требуется менеджер* (A manager is wanted) · *Опыт работы обязателен* (Experience required).

## The formal letter
- **Уважаемый / Уважаемая** + first name and patronymic: ${ex('Уважаемая Елена Ивановна!', "Dear Elena Ivanovna,")}
- **Я хотел(а) бы…** (I would like to…) · **Прошу рассмотреть моё резюме** (Please consider my CV)
- **С уважением,** + name

## Experience: genitive after numbers
${ex('У меня три года опыта.', 'I have three years of experience.')}
`,
  },
  {
    id: 'ru-b1-06', title: 'Feelings & relationships', titleEs: 'Чувства и отношения', emoji: '💬',
    description: 'Talk about feelings, friends and relationships.',
    words: [
      ['чувство', 'feeling'], ['любовь', 'love'], ['дружба', 'friendship'], ['отношения', 'relationship'], ['ссора', 'quarrel'], ['радость', 'joy'],
      ['грусть', 'sadness'], ['счастливый', 'happy'], ['грустный', 'sad'], ['обида', 'offence / hurt'], ['ревность', 'jealousy'], ['доверять', 'to trust'],
      ['ссориться', 'to quarrel'], ['мириться', 'to make up'], ['скучать', 'to miss'], ['влюбиться', 'to fall in love'],
    ],
    sentences: [
      ['Я очень скучаю по тебе.', 'I miss you very much.'],
      ['Они поссорились, но потом помирились.', 'They quarrelled but then made up.'],
      ['Я рад, что ты пришёл.', "I'm glad you came."],
      ['Мне грустно, когда идёт дождь.', "I'm sad when it rains."],
      ['Важно, чтобы люди доверяли друг другу.', "It's important that people trust each other."],
    ],
    grammar: `
## Feelings: мне грустно, я рад
The dative + an adverb for a state: ${ex('Мне скучно.', "I'm bored.")} · or a short adjective: *Я рад / рада* (I'm glad).

## Missing someone: скучать по + dative
${ex('Я скучаю по маме.', 'I miss my mum.')}

## Each other: друг друга
${ex('Они любят друг друга.', "They love each other.")} · ${ex('Мы помогаем друг другу.', "We help each other.")} (dative)
`,
  },
  {
    id: 'ru-b1-07', title: 'Travel problems & complaints', titleEs: 'Проблемы в поездке', emoji: '🧳',
    description: 'Deal with problems and complain politely.',
    words: [
      ['жалоба', 'complaint'], ['задержка', 'delay'], ['багаж', 'luggage'], ['отмена', 'cancellation'], ['номер', 'hotel room'], ['администратор', 'receptionist'],
      ['сломан', 'broken'], ['не работает', "doesn't work"], ['жаловаться', 'to complain'], ['вернуть деньги', 'to refund'], ['компенсация', 'compensation'], ['к сожалению', 'unfortunately'],
      ['срочно', 'urgently'], ['ошибка', 'mistake'], ['извиняться', 'to apologise'], ['решить проблему', 'to solve the problem'],
    ],
    sentences: [
      ['Рейс отменён из-за погоды.', 'The flight is cancelled because of the weather.'],
      ['В номере не работает кондиционер.', "The air conditioning in the room doesn't work."],
      ['Я хотел бы пожаловаться.', "I'd like to make a complaint."],
      ['Мой багаж потерялся.', 'My luggage got lost.'],
      ['Прошу вернуть мне деньги.', 'Please refund my money.'],
    ],
    grammar: `
## Short participles for states
*Рейс отменён · Номер занят · Кран сломан* : like *Магазин закрыт*.

## Complaining politely
${ex('Я хотел бы пожаловаться на шум.', "I'd like to complain about the noise.")} (жаловаться **на** + accusative)
**Не могли бы вы…?** · **Прошу…** · **К сожалению, …**
`,
    conj: { verbs: ['жаловаться', 'объяснить'], tenses: ['presente', 'futuro'] },
  },
  {
    id: 'ru-b1-08', title: 'Russia: history & traditions', titleEs: 'Россия: история и традиции', emoji: '🏛️',
    description: 'Talk about history and traditions, and compare cultures.',
    words: [
      ['история', 'history'], ['век', 'century'], ['царь', 'tsar'], ['революция', 'revolution'], ['война', 'war'], ['победа', 'victory'],
      ['традиция', 'tradition'], ['обычай', 'custom'], ['Масленица', 'Maslenitsa (pancake week)'], ['Рождество', 'Christmas'], ['праздновать', 'to celebrate'], ['народ', 'people / nation'],
      ['древний', 'ancient'], ['современный', 'modern'], ['сравнивать', 'to compare'], ['отличаться', 'to differ'],
    ],
    sentences: [
      ['На Масленицу пекут блины.', 'At Maslenitsa people bake pancakes.'],
      ['Рождество в России празднуют седьмого января.', 'Christmas in Russia is celebrated on the seventh of January.'],
      ['Петербург основали в восемнадцатом веке.', 'St Petersburg was founded in the eighteenth century.'],
      ['Эти традиции отличаются от наших.', 'These traditions differ from ours.'],
      ['Если сравнивать, у нас праздник проще.', 'If you compare, our celebration is simpler.'],
    ],
    grammar: `
## "They" for people in general
Russian uses the **они** form without a pronoun: ${ex('На Масленицу пекут блины.', 'At Maslenitsa people bake pancakes.')} · ${ex('Здесь говорят по-русски.', "Russian is spoken here.")}

## Centuries: в + prepositional
${ex('в девятнадцатом веке', 'in the nineteenth century')}

## Comparing cultures
**отличаться от** + genitive (to differ from) · **похож на** + accusative (similar to) · **в отличие от** (unlike)
`,
    conj: { verbs: ['сравнивать'], tenses: ['presente'] },
  },
]);

export const RU_B1_UNIT_LESSONS: Record<string, string[]> = {
  'ru-b1-01': ['ru-g-conditional'],
  'ru-b1-02': ['ru-g-conditional', 'ru-g-chtoby'],
  'ru-b1-03': ['ru-g-connectors'],
  'ru-b1-04': ['ru-g-kotoryi', 'ru-g-reported'],
  'ru-b1-05': ['ru-g-participles'],
  'ru-b1-06': ['ru-g-chtoby', 'ru-g-plural-cases'],
  'ru-b1-07': ['ru-g-participles', 'ru-g-conditional'],
  'ru-b1-08': ['ru-g-plural-cases'],
};
