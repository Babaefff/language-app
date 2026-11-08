import type { Reading } from '../types';
import { vary } from './registry';
import { RU_READINGS_MORE, RU_SONGS_LIST } from './readings-more';

/** Original texts built only from grammar taught at each level. */
const RU_READINGS_A1: Reading[] = [
  {
    id: 'ru-r-anna', level: 'A1', title: 'Меня зовут Анна',
    paragraphs: [
      'Привет! Меня зовут Анна. Мне двадцать три года. Я живу в Москве. Я студентка, я учусь в университете.',
      'У меня есть брат. Его зовут Максим. Он врач и работает в больнице. Максим живёт в Петербурге.',
      'Я люблю читать и гулять в парке. Вечером я часто смотрю фильмы. Мой любимый фильм очень старый.',
    ],
    translation: [
      "Hi! My name is Anna. I'm twenty-three. I live in Moscow. I'm a student; I study at university.",
      'I have a brother. His name is Maxim. He is a doctor and works in a hospital. Maxim lives in St Petersburg.',
      'I love reading and walking in the park. In the evening I often watch films. My favourite film is very old.',
    ],
    glossary: { 'любимый': 'favourite', 'петербурге': 'St Petersburg (prepositional)', 'гулять': 'to walk / stroll', 'старый': 'old' },
    questions: [
      { q: 'Сколько лет Анне?', options: ['Двадцать три', 'Двадцать', 'Тридцать'], answer: 0 },
      { q: 'Где работает Максим?', options: ['В больнице', 'В университете', 'В парке'], answer: 0 },
      { q: 'Что Анна делает вечером?', options: ['Смотрит фильмы', 'Работает', 'Играет в футбол'], answer: 0 },
    ],
  },
  {
    id: 'ru-r-den', level: 'A1', title: 'Мой день',
    paragraphs: [
      'Обычно я встаю в семь часов. Утром я завтракаю: я ем хлеб с сыром и пью кофе.',
      'Потом я еду на работу на метро. Я работаю в офисе. Днём я обедаю в кафе.',
      'Вечером я иду домой. Дома я готовлю ужин, читаю книгу или слушаю музыку. Я ложусь спать поздно.',
    ],
    translation: [
      'I usually get up at seven. In the morning I have breakfast: I eat bread with cheese and drink coffee.',
      'Then I go to work by underground. I work in an office. In the afternoon I have lunch in a café.',
      'In the evening I walk home. At home I cook dinner, read a book or listen to music. I go to bed late.',
    ],
    glossary: { 'с сыром': 'with cheese', 'кафе': 'café', 'днём': 'in the afternoon', 'домой': 'home (where to)', 'дома': 'at home', 'ложусь спать': 'go to bed' },
    questions: [
      { q: 'Когда он встаёт?', options: ['В семь часов', 'В восемь часов', 'Поздно'], answer: 0 },
      { q: 'Как он едет на работу?', options: ['На метро', 'На автобусе', 'Он идёт'], answer: 0 },
      { q: 'Где он обедает?', options: ['В кафе', 'Дома', 'В офисе'], answer: 0 },
    ],
  },
  {
    id: 'ru-r-kvartira', level: 'A1', title: 'Моя квартира',
    paragraphs: [
      'Это моя квартира. Она небольшая, но очень удобная. Здесь есть кухня, спальня и ванная.',
      'В спальне стоит кровать и шкаф. На кухне есть стол и четыре стула. Окно большое, и в комнате светло.',
      'Вчера у меня были гости. Мы ужинали на кухне и долго говорили. Было очень весело!',
    ],
    translation: [
      "This is my flat. It's not big, but very comfortable. There's a kitchen, a bedroom and a bathroom.",
      'In the bedroom there is a bed and a wardrobe. In the kitchen there is a table and four chairs. The window is big, and the room is bright.',
      'Yesterday I had guests. We had dinner in the kitchen and talked for a long time. It was great fun!',
    ],
    glossary: { 'небольшая': 'not big (f)', 'удобная': 'comfortable (f)', 'стоит': 'stands', 'шкаф': 'wardrobe', 'светло': 'bright, light', 'гости': 'guests', 'долго': 'for a long time', 'весело': 'fun, cheerful' },
    questions: [
      { q: 'Какая квартира?', options: ['Небольшая, но удобная', 'Очень большая', 'Старая и плохая'], answer: 0 },
      { q: 'Что есть на кухне?', options: ['Стол и четыре стула', 'Кровать и шкаф', 'Диван'], answer: 0 },
      { q: 'Что было вчера?', options: ['Были гости', 'Был концерт', 'Ничего'], answer: 0 },
    ],
  },
];

const spread = (r: Reading): Reading => ({ ...r, questions: vary(r.questions) });
export const READINGS_RU: Reading[] = [...RU_READINGS_A1, ...RU_READINGS_MORE].map(spread);
export const SONGS_RU: Reading[] = RU_SONGS_LIST.map(spread);
