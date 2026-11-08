import type { Reading } from '../types';

/** Traditional Russian folk songs (public domain). A sung video and timings can be added per song. */
export const RU_SONGS_LIST: Reading[] = [
  {
    id: 'ru-s-kalinka', song: true, level: 'A2', title: 'Калинка',
    source: 'Song by Ivan Larionov, 1860, in the folk style (public domain)',
    paragraphs: [
      'Калинка, калинка, калинка моя!\nВ саду ягода малинка, малинка моя!',
      'Ах, под сосною, под зелёною,\nСпать положите вы меня!\nАй-люли, люли, ай-люли, люли,\nСпать положите вы меня.',
      'Калинка, калинка, калинка моя!\nВ саду ягода малинка, малинка моя!',
    ],
    translation: [
      'Little guelder-rose, guelder-rose, my little guelder-rose!\nIn the garden a berry, a raspberry, my raspberry!',
      'Ah, under the pine, under the green one,\nLay me down to sleep!\nAy-lyuli, lyuli, ay-lyuli, lyuli,\nLay me down to sleep.',
      'Little guelder-rose, guelder-rose, my little guelder-rose!\nIn the garden a berry, a raspberry, my raspberry!',
    ],
    glossary: { 'калинка': 'little guelder-rose (a red berry)', 'саду': 'garden (в саду: in the garden)', 'ягода': 'berry', 'малинка': 'little raspberry', 'сосною': 'pine (poetic instrumental)', 'зелёною': 'green (poetic)', 'положите': 'lay (command, вы)', 'спать': 'to sleep' },
    questions: [
      { q: 'Где растёт малинка?', options: ['В саду', 'В лесу', 'На горе'], answer: 0 },
      { q: 'Под каким деревом хочет спать певец?', options: ['Под сосной', 'Под берёзой', 'Под дубом'], answer: 0 },
    ],
  },
  {
    id: 'ru-s-beryoza', song: true, level: 'A1', title: 'Во поле берёза стояла',
    source: 'Traditional folk song (public domain)',
    paragraphs: [
      'Во поле берёза стояла,\nВо поле кудрявая стояла,\nЛюли, люли, стояла,\nЛюли, люли, стояла.',
      'Некому берёзу заломати,\nНекому кудряву заломати,\nЛюли, люли, заломати,\nЛюли, люли, заломати.',
    ],
    translation: [
      'In the field a birch tree stood,\nIn the field a curly one stood,\nLyuli, lyuli, it stood,\nLyuli, lyuli, it stood.',
      'There is no one to break the birch,\nNo one to break the curly one,\nLyuli, lyuli, to break it,\nLyuli, lyuli, to break it.',
    ],
    glossary: { 'во поле': 'in the field (old form of в поле)', 'берёза': 'birch tree', 'стояла': 'stood (past, f)', 'кудрявая': 'curly', 'некому': 'there is no one (to)', 'заломати': 'to break (old form)' },
    questions: [
      { q: 'Что стояло в поле?', options: ['Берёза', 'Дом', 'Лошадь'], answer: 0 },
      { q: '«Стояла» — какое время?', options: ['Прошедшее, женский род', 'Настоящее', 'Будущее'], answer: 0 },
    ],
  },
  {
    id: 'ru-s-moroz', song: true, level: 'A2', title: 'Ой, мороз, мороз',
    source: 'Traditional folk song (public domain)',
    paragraphs: [
      'Ой, мороз, мороз,\nНе морозь меня,\nНе морозь меня,\nМоего коня.',
      'Моего коня\nБелогривого,\nУ меня жена,\nОх, ревнивая.',
    ],
    translation: [
      'Oh, frost, frost,\nDon’t freeze me,\nDon’t freeze me,\nOr my horse.',
      'My horse\nWith its white mane,\nI have a wife,\nOh, a jealous one.',
    ],
    glossary: { 'мороз': 'frost', 'не морозь': "don't freeze (command)", 'коня': 'horse (accusative)', 'белогривого': 'white-maned', 'ревнивая': 'jealous (f)' },
    questions: [
      { q: 'К кому обращается певец?', options: ['К морозу', 'К жене', 'К коню'], answer: 0 },
      { q: 'Какая у певца жена?', options: ['Ревнивая', 'Весёлая', 'Молодая'], answer: 0 },
    ],
  },
  {
    id: 'ru-s-korobeiniki', song: true, level: 'B1', title: 'Коробейники',
    source: 'Poem by Nikolai Nekrasov, 1861, sung as a folk song (public domain)',
    paragraphs: [
      'Ой, полным-полна коробушка,\nЕсть и ситцы и парча.\nПожалей, моя зазнобушка,\nМолодецкого плеча!',
      'Выди, выди в рожь высокую!\nТам до ночки погожу,\nА завижу черноокую —\nВсе товары разложу.',
    ],
    translation: [
      'Oh, my little box is full to the brim,\nThere is cotton and brocade.\nHave pity, my sweetheart,\nOn this young man’s shoulder!',
      'Come out, come out into the tall rye!\nThere I’ll wait until nightfall,\nAnd when I see the dark-eyed girl,\nI’ll lay out all my goods.',
    ],
    glossary: { 'полным-полна': 'full to the brim', 'коробушка': 'little box (of a pedlar)', 'ситцы': 'cotton prints', 'парча': 'brocade', 'пожалей': 'have pity (command)', 'зазнобушка': 'sweetheart (folk)', 'молодецкого': "young man's", 'плеча': 'shoulder (genitive)', 'выди': 'come out (folk form of выйди)', 'рожь': 'rye', 'погожу': "I'll wait (folk)", 'завижу': "I'll catch sight of", 'черноокую': 'dark-eyed (f)', 'товары': 'goods', 'разложу': "I'll lay out" },
    questions: [
      { q: 'Что лежит в коробушке?', options: ['Ситцы и парча', 'Хлеб и соль', 'Книги'], answer: 0 },
      { q: 'Где певец будет ждать?', options: ['В высокой ржи', 'В доме', 'На реке'], answer: 0 },
    ],
  },
  {
    id: 'ru-s-vecher', song: true, level: 'B1', title: 'Ой, то не вечер',
    source: 'Traditional Cossack folk song (public domain)',
    paragraphs: [
      'Ой, то не вечер, то не вечер,\nМне малым-мало спалось,\nМне малым-мало спалось,\nОх, да во сне привиделось.',
      'Мне во сне привиделось,\nБудто конь мой вороной\nРазыгрался, расплясался,\nОх, да разрезвился подо мной.',
    ],
    translation: [
      'Oh, it isn’t evening, it isn’t evening,\nI slept so very little,\nI slept so very little,\nOh, and I saw in a dream.',
      'I saw in a dream\nThat my black horse\nBegan to play, to dance,\nOh, and frolicked beneath me.',
    ],
    glossary: { 'малым-мало': 'very little', 'спалось': 'I slept (impersonal: мне спалось)', 'во сне': 'in a dream', 'привиделось': 'appeared (in a dream)', 'будто': 'as if', 'вороной': 'black (of a horse)', 'разыгрался': 'began to play', 'расплясался': 'began to dance', 'разрезвился': 'began to frolic', 'подо мной': 'beneath me' },
    questions: [
      { q: 'Что певец увидел во сне?', options: ['Своего коня', 'Свою жену', 'Свой дом'], answer: 0 },
      { q: '«Мне малым-мало спалось» значит…', options: ['Я очень мало спал', 'Я долго спал', 'Я не хотел спать'], answer: 0 },
    ],
  },
];

/** Original texts at A2 – B1+ (one adapted from Tolstoy, public domain). */
export const RU_READINGS_MORE: Reading[] = [
  {
    id: 'ru-r-vyhodnye', level: 'A2', title: 'Выходные в Казани',
    paragraphs: [
      'В прошлые выходные мы с подругой ездили в Казань. Мы уехали в пятницу вечером на поезде и приехали утром.',
      'В субботу мы гуляли по Кремлю и ели чак-чак, это местная сладость. Погода была отличная, поэтому мы долго гуляли по набережной.',
      'В воскресенье мы ходили в музей, а потом купили подарки для родителей. Мы вернулись домой усталые, но очень довольные.',
    ],
    translation: [
      'Last weekend my friend and I went to Kazan. We left on Friday evening by train and arrived in the morning.',
      'On Saturday we walked around the Kremlin and ate chak-chak, a local sweet. The weather was excellent, so we spent a long time walking along the embankment.',
      'On Sunday we went to a museum and then bought presents for our parents. We came home tired but very happy.',
    ],
    glossary: { 'выходные': 'the weekend', 'мы с подругой': 'my friend and I', 'кремлю': 'Kremlin (по Кремлю: around the Kremlin)', 'чак-чак': 'chak-chak (honey pastry)', 'местная': 'local', 'сладость': 'sweet', 'набережной': 'embankment', 'довольные': 'pleased' },
    questions: [
      { q: 'Как они поехали в Казань?', options: ['На поезде', 'На самолёте', 'На машине'], answer: 0 },
      { q: 'Что такое чак-чак?', options: ['Местная сладость', 'Музей', 'Улица'], answer: 0 },
      { q: 'Что они купили?', options: ['Подарки для родителей', 'Билеты', 'Книги'], answer: 0 },
    ],
  },
  {
    id: 'ru-r-detstvo', level: 'A2', title: 'Лето у бабушки',
    paragraphs: [
      'Когда я был маленьким, каждое лето я жил у бабушки в деревне. Её дом стоял на берегу реки.',
      'Утром мы с бабушкой ходили в лес за грибами. Днём я купался в реке и играл с соседскими детьми. Вечером бабушка пекла пироги.',
      'Однажды я потерялся в лесу. Я очень испугался, но меня нашла соседская собака. С тех пор мы стали лучшими друзьями.',
    ],
    translation: [
      'When I was little, every summer I lived at my grandmother’s in the village. Her house stood on the bank of a river.',
      'In the morning my grandmother and I went to the forest for mushrooms. In the afternoon I swam in the river and played with the neighbours’ children. In the evening grandma baked pies.',
      'Once I got lost in the forest. I was very frightened, but the neighbours’ dog found me. Since then we became best friends.',
    ],
    glossary: { 'берегу': 'bank (на берегу: on the bank)', 'за грибами': 'for mushrooms', 'купался': 'swam / bathed', 'соседскими': "neighbours'", 'пекла': 'baked', 'пироги': 'pies', 'потерялся': 'got lost', 'испугался': 'was frightened', 'с тех пор': 'since then' },
    questions: [
      { q: 'Где стоял дом бабушки?', options: ['На берегу реки', 'В городе', 'В лесу'], answer: 0 },
      { q: '«Каждое лето я жил» — почему несовершенный вид?', options: ['Это повторялось', 'Это было один раз', 'Это будущее'], answer: 0 },
      { q: 'Кто нашёл мальчика?', options: ['Соседская собака', 'Бабушка', 'Полиция'], answer: 0 },
    ],
  },
  {
    id: 'ru-r-ob-yavlenie', level: 'A2', title: 'Объявления',
    paragraphs: [
      'СДАЁТСЯ КВАРТИРА. Двухкомнатная квартира в центре города, рядом с метро. Третий этаж, есть лифт и балкон. 40 000 рублей в месяц. Звонить вечером.',
      'ВНИМАНИЕ! С понедельника бассейн закрыт на ремонт. Мы откроемся первого сентября. Извините за неудобства!',
      'ПОТЕРЯЛАСЬ СОБАКА. Маленькая, белая, зовут Снежок. Если вы её видели, позвоните, пожалуйста, по телефону 8-900-123-45-67.',
    ],
    translation: [
      'FLAT TO LET. Two-room flat in the town centre, next to the metro. Third floor, with a lift and a balcony. 40,000 roubles a month. Call in the evening.',
      'ATTENTION! From Monday the swimming pool is closed for repairs. We will open on the first of September. Sorry for the inconvenience!',
      'LOST DOG. Small, white, called Snezhok. If you have seen her, please call 8-900-123-45-67.',
    ],
    glossary: { 'сдаётся': 'to let', 'двухкомнатная': 'two-room', 'рядом с': 'next to', 'лифт': 'lift', 'внимание': 'attention', 'бассейн': 'swimming pool', 'откроемся': 'we will open', 'неудобства': 'inconvenience', 'потерялась': 'got lost (f)', 'снежок': 'Snowball (name)' },
    questions: [
      { q: 'Сколько стоит квартира?', options: ['40 000 рублей в месяц', '4 000 рублей', '40 000 рублей в год'], answer: 0 },
      { q: 'Когда откроется бассейн?', options: ['Первого сентября', 'В понедельник', 'Через неделю'], answer: 0 },
      { q: 'Какая собака потерялась?', options: ['Маленькая и белая', 'Большая и чёрная', 'Старая'], answer: 0 },
    ],
  },
  {
    id: 'ru-r-pismo', level: 'A2', title: 'Письмо другу',
    paragraphs: [
      'Привет, Саша! Как у тебя дела? Извини, что долго не писал: у меня было много работы.',
      'Я уже месяц живу в новой квартире. Она больше, чем старая, и окна выходят в парк. Соседи очень приятные.',
      'Приезжай ко мне в гости в мае! Мы погуляем по городу, сходим в театр. Напиши, когда сможешь приехать. Обнимаю, Миша.',
    ],
    translation: [
      "Hi Sasha! How are things? Sorry I haven't written for so long: I had a lot of work.",
      "I've been living in my new flat for a month already. It's bigger than the old one, and the windows look onto a park. The neighbours are very nice.",
      "Come and visit me in May! We'll walk around the town and go to the theatre. Write and tell me when you can come. Hugs, Misha.",
    ],
    glossary: { 'долго': 'for a long time', 'выходят в парк': 'look out onto the park', 'приятные': 'nice', 'в гости': 'to visit', 'сходим': "we'll go (and come back)", 'обнимаю': 'hugs (I hug you)' },
    questions: [
      { q: 'Почему Миша долго не писал?', options: ['У него было много работы', 'Он был болен', 'Он был в отпуске'], answer: 0 },
      { q: 'Куда выходят окна?', options: ['В парк', 'На улицу', 'Во двор'], answer: 0 },
      { q: 'Когда Миша приглашает Сашу?', options: ['В мае', 'В июне', 'Завтра'], answer: 0 },
    ],
  },
  {
    id: 'ru-r-udalyonka', level: 'B1', title: 'Работа из дома',
    paragraphs: [
      'После пандемии многие россияне начали работать из дома. По данным опроса, почти половина сотрудников, которые попробовали удалённую работу, не хотят возвращаться в офис.',
      'Плюсы понятны: не нужно тратить время на дорогу, можно самому планировать свой день. Однако есть и минусы. «Я скучаю по коллегам, и мне трудно разделять работу и личную жизнь», — рассказывает Ольга из Новосибирска.',
      'Эксперты советуют, чтобы у каждого было отдельное рабочее место и чёткий график. Если бы все соблюдали эти правила, работать из дома было бы гораздо легче.',
    ],
    translation: [
      'After the pandemic many Russians started working from home. According to a survey, almost half of the employees who have tried remote work do not want to go back to the office.',
      'The advantages are clear: you don’t have to spend time commuting, you can plan your own day. However, there are disadvantages too. “I miss my colleagues, and it’s hard for me to separate work and private life,” says Olga from Novosibirsk.',
      'Experts advise that everyone should have a separate workplace and a clear schedule. If everyone followed these rules, working from home would be much easier.',
    ],
    glossary: { 'по данным опроса': 'according to a survey', 'половина': 'half', 'сотрудников': 'employees', 'удалённую': 'remote', 'тратить': 'to spend', 'плюсы': 'pros', 'минусы': 'cons', 'разделять': 'to separate', 'личную': 'private', 'отдельное': 'separate', 'чёткий': 'clear', 'соблюдали': 'observed / followed', 'гораздо': 'much (with comparatives)' },
    questions: [
      { q: 'Сколько сотрудников не хотят возвращаться в офис?', options: ['Почти половина', 'Все', 'Десять процентов'], answer: 0 },
      { q: 'Почему Ольге трудно?', options: ['Она скучает по коллегам', 'У неё нет компьютера', 'Ей далеко ехать'], answer: 0 },
      { q: '«Если бы все соблюдали…, было бы легче» — это…', options: ['нереальное условие', 'реальное условие', 'приказ'], answer: 0 },
    ],
  },
  {
    id: 'ru-r-baikal', level: 'B1', title: 'Байкал в опасности',
    paragraphs: [
      'Байкал — самое глубокое озеро в мире. В нём находится около двадцати процентов всей пресной воды на планете. Здесь живут животные, которых нет больше нигде, например байкальская нерпа.',
      'Однако озеро страдает от загрязнения и от большого количества туристов. Учёные считают, что нужно строже контролировать строительство на берегу и запретить сбрасывать отходы в воду.',
      'Местные жители создали несколько организаций, которые убирают мусор на берегу и объясняют туристам, как беречь природу. «Мы хотим, чтобы наши дети тоже увидели чистый Байкал», — говорит один из волонтёров.',
    ],
    translation: [
      "Baikal is the deepest lake in the world. It holds about twenty per cent of all the fresh water on the planet. Animals live here that don't exist anywhere else, for example the Baikal seal.",
      'However, the lake suffers from pollution and from large numbers of tourists. Scientists believe that construction on the shore should be controlled more strictly and dumping waste into the water should be banned.',
      'Local residents have set up several organisations that clean up rubbish on the shore and explain to tourists how to protect nature. “We want our children to see a clean Baikal too,” says one of the volunteers.',
    ],
    glossary: { 'глубокое': 'deep', 'пресной': 'fresh (water)', 'нигде': 'nowhere', 'нерпа': 'seal (Baikal)', 'страдает': 'suffers', 'количества': 'quantity', 'строже': 'more strictly', 'строительство': 'construction', 'запретить': 'to ban', 'сбрасывать': 'to dump', 'создали': 'created', 'беречь': 'to protect / take care of', 'волонтёров': 'volunteers' },
    questions: [
      { q: 'Сколько пресной воды планеты в Байкале?', options: ['Около 20 %', 'Половина', '5 %'], answer: 0 },
      { q: 'Что предлагают учёные?', options: ['Строже контролировать строительство', 'Закрыть озеро', 'Строить больше гостиниц'], answer: 0 },
      { q: 'Что делают местные жители?', options: ['Убирают мусор на берегу', 'Продают рыбу', 'Строят дома'], answer: 0 },
    ],
  },
  {
    id: 'ru-r-teatr', level: 'B1', title: 'Отзыв о спектакле',
    paragraphs: [
      'Вчера я был в Большом театре на балете «Лебединое озеро». Я давно мечтал его увидеть, и билеты, которые подарила мне сестра, были лучшим подарком.',
      'Танцоры были великолепны, а музыка Чайковского, которую я знал с детства, звучала совсем по-новому. Особенно мне понравилась балерина, исполнявшая главную роль.',
      'Единственный минус — очень дорогие напитки в буфете. Но если вы будете в Москве, обязательно сходите на этот спектакль. Я уверен, что вы не пожалеете.',
    ],
    translation: [
      "Yesterday I was at the Bolshoi Theatre for the ballet Swan Lake. I'd long dreamed of seeing it, and the tickets my sister gave me were the best present.",
      'The dancers were magnificent, and Tchaikovsky’s music, which I had known since childhood, sounded completely new. I especially liked the ballerina dancing the lead role.',
      "The only downside: very expensive drinks at the bar. But if you're in Moscow, be sure to go to this show. I'm sure you won't regret it.",
    ],
    glossary: { 'отзыв': 'review', 'балете': 'ballet', 'лебединое': 'swan (adj.)', 'танцоры': 'dancers', 'великолепны': 'magnificent', 'звучала': 'sounded', 'по-новому': 'in a new way', 'исполнявшая': 'performing (participle)', 'главную роль': 'the lead role', 'единственный': 'the only', 'буфете': 'theatre bar', 'не пожалеете': "won't regret it" },
    questions: [
      { q: 'Кто подарил билеты?', options: ['Сестра', 'Друг', 'Мама'], answer: 0 },
      { q: 'Что ему не понравилось?', options: ['Дорогие напитки', 'Музыка', 'Танцоры'], answer: 0 },
      { q: '«балерина, исполнявшая главную роль» = балерина, ___ исполняла главную роль', options: ['которая', 'который', 'что бы'], answer: 0 },
    ],
  },
  {
    id: 'ru-r-kostochka', level: 'B1+', title: 'Косточка (по Л. Н. Толстому)',
    source: 'Adapted from Leo Tolstoy, «Косточка» (1872, public domain)',
    paragraphs: [
      'Купила мать слив и хотела их дать детям после обеда. Они лежали на тарелке. Ваня никогда не ел слив и всё нюхал их. И очень они ему нравились. Очень хотелось съесть.',
      'Он всё ходил мимо слив. Когда никого не было в горнице, он не удержался, схватил одну сливу и съел. Перед обедом мать сочла сливы и видит — одной нет. Она сказала отцу.',
      'За обедом отец и говорит: «А что, дети, не съел ли кто-нибудь одну сливу?» Все сказали: «Нет». Ваня покраснел как рак и сказал тоже: «Нет, я не ел».',
      'Тогда отец сказал: «Что съел кто-нибудь из вас, это нехорошо; но не в том беда. Беда в том, что в сливах есть косточки, и если кто не умеет их есть и проглотит косточку, то через день умрёт. Я этого боюсь». Ваня побледнел и сказал: «Нет, я косточку бросил за окошко». И все засмеялись, а Ваня заплакал.',
    ],
    translation: [
      'Mother bought some plums and wanted to give them to the children after lunch. They lay on a plate. Vanya had never eaten plums and kept sniffing them. And he liked them very much. He really wanted to eat one.',
      'He kept walking past the plums. When there was nobody in the room, he could not hold back: he grabbed a plum and ate it. Before lunch mother counted the plums and saw that one was missing. She told father.',
      'At lunch father said: “Well, children, has anyone eaten a plum?” Everyone said: “No.” Vanya turned as red as a lobster and also said: “No, I didn’t eat one.”',
      'Then father said: “That one of you has eaten it is not good; but that is not the trouble. The trouble is that plums have stones, and if someone doesn’t know how to eat them and swallows a stone, he will die in a day. That is what I am afraid of.” Vanya went pale and said: “No, I threw the stone out of the window.” And everyone laughed, and Vanya began to cry.',
    ],
    glossary: { 'косточка': 'stone (of a fruit)', 'слив': 'plums (genitive)', 'сливу': 'plum (accusative)', 'тарелке': 'plate', 'нюхал': 'sniffed', 'мимо': 'past', 'горнице': 'room (old word)', 'не удержался': "couldn't hold back", 'схватил': 'grabbed', 'сочла': 'counted', 'покраснел как рак': 'turned red as a lobster', 'беда': 'trouble', 'проглотит': 'swallows', 'умрёт': 'will die', 'боюсь': "I'm afraid", 'побледнел': 'turned pale', 'бросил': 'threw', 'окошко': 'little window', 'засмеялись': 'started laughing', 'заплакал': 'started crying' },
    questions: [
      { q: 'Что купила мать?', options: ['Сливы', 'Яблоки', 'Вишню'], answer: 0 },
      { q: 'Почему Ваня сказал про косточку?', options: ['Он испугался', 'Он хотел пошутить', 'Отец спросил прямо'], answer: 0 },
      { q: 'Чем кончилась история?', options: ['Все засмеялись, а Ваня заплакал', 'Ваню наказали', 'Ваня съел ещё одну сливу'], answer: 0 },
    ],
  },
  {
    id: 'ru-r-yazyk', level: 'B1+', title: 'Почему русский язык не так труден',
    paragraphs: [
      'Многие считают русский язык одним из самых трудных в мире: шесть падежей, виды глагола, свободное ударение. Однако у русского есть и черты, которые делают его проще, чем кажется.',
      'Во-первых, в русском нет артиклей, а настоящее время глагола «быть» обычно не употребляется. Во-вторых, порядок слов достаточно свободный: окончания показывают, кто что делает. В-третьих, у прошедшего времени всего четыре формы, которые зависят только от рода и числа.',
      'Конечно, чтобы хорошо говорить, нужно много практиковаться. Но если заниматься понемногу каждый день, слушать песни и читать простые тексты, уже через год можно свободно общаться на бытовые темы.',
    ],
    translation: [
      'Many people consider Russian one of the hardest languages in the world: six cases, verb aspects, free stress. However, Russian also has features that make it simpler than it seems.',
      'Firstly, Russian has no articles, and the present tense of the verb "to be" is usually not used. Secondly, the word order is fairly free: the endings show who does what. Thirdly, the past tense has only four forms, which depend only on gender and number.',
      'Of course, to speak well you need a lot of practice. But if you study a little every day, listen to songs and read simple texts, after just a year you can communicate freely on everyday topics.',
    ],
    glossary: { 'черты': 'features', 'кажется': 'it seems', 'артиклей': 'articles', 'употребляется': 'is used', 'порядок слов': 'word order', 'достаточно': 'fairly / enough', 'окончания': 'endings', 'зависят': 'depend', 'практиковаться': 'to practise', 'понемногу': 'a little at a time', 'общаться': 'to communicate', 'бытовые': 'everyday' },
    questions: [
      { q: 'Что делает русский язык проще?', options: ['Нет артиклей', 'Много падежей', 'Свободное ударение'], answer: 0 },
      { q: 'Сколько форм у прошедшего времени?', options: ['Четыре', 'Шесть', 'Две'], answer: 0 },
      { q: 'Что советует автор?', options: ['Заниматься понемногу каждый день', 'Учить только грамматику', 'Не слушать песни'], answer: 0 },
    ],
  },
];
