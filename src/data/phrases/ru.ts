import type { Phrase } from './types';

export const PHRASES_RU: Phrase[] = [
  { re: '(меня|тебя|его|её|вас|нас) зовут|как (тебя|вас|его|её) зовут', phrase: 'Меня зовут …', en: 'My name is …', literal: 'me (they) call …', note: 'Меня is “me”, not “my”: they call me Anna. Как тебя зовут? = What’s your name?' },
  { re: 'у (меня|тебя|него|неё|нас|вас|них) (есть|нет)|у (меня|тебя|него|неё|нас|вас|них)(?![\\p{L}])', phrase: 'У меня есть …', en: 'I have …', literal: 'by me there is …', note: 'Russian has no everyday “I have”: у меня есть брат = I have a brother. Negative: у меня нет брата (genitive).' },
  { re: '(мне|тебе|ему|ей|нам|вам|им) нравится|(мне|тебе|ему|ей|нам|вам|им) нравятся|(мне|тебе|ему|ей) понравил', phrase: 'Мне нравится …', en: 'I like …', literal: '… pleases to me', note: 'The thing you like is the subject; the person is in the dative (мне, тебе).' },
  { re: '(мне|тебе|ему|ей|вам) \\p{N}+ (лет|год|года)|сколько (тебе|вам|ему|ей) лет', phrase: 'Мне … лет.', en: 'I’m … years old.', literal: 'to me … years', note: 'Age uses the dative: мне двадцать лет. Год / года / лет depends on the number.' },
  { re: 'как дела', phrase: 'Как дела?', en: 'How are you?', literal: 'how (are) things?', note: 'Answer: хорошо, нормально, отлично.' },
  { re: '(мне|тебе|ему|ей|нам|вам) (холодно|жарко|скучно|грустно|весело|интересно|трудно|легко|плохо|хорошо|страшно)', phrase: 'Мне холодно / скучно …', en: 'I’m cold / bored …', literal: 'to me (it is) cold / boring', note: 'Feelings use the dative + an -о word: мне холодно = I’m cold. Not “я холодный”.' },
  { re: 'у (меня|тебя|него|неё|нас|вас) болит|болит (голова|горло|живот|зуб|нога|рука|спина)', phrase: 'У меня болит …', en: 'My … hurts', literal: 'by me hurts …', note: 'У меня болит голова = I have a headache. Plural: болят.' },
  { re: '(мне|тебе|ему|ей|нам|вам)? ?(надо|нужно)(?![\\p{L}])', phrase: 'Мне надо / нужно …', en: 'I need to / I have to …', literal: 'to me (it is) necessary', note: 'Мне нужно работать = I have to work. The person is in the dative.' },
  { re: 'можно(?![\\p{L}])', phrase: 'можно', en: 'you may / it’s possible', literal: '(it is) possible', note: 'Можно войти? = May I come in? Нельзя = you mustn’t.' },
  { re: 'нельзя', phrase: 'нельзя', en: 'you mustn’t / you can’t', literal: '(it is) not allowed', note: 'Здесь нельзя курить = You can’t smoke here.' },
  { re: '(мне|тебе|ему|ей|нам|вам) кажется', phrase: 'Мне кажется …', en: 'I think / it seems to me …', literal: 'to me it seems', note: 'A soft way to give an opinion.' },
  { re: '(мне|тебе|ему|ей|нам|вам) (жаль|жалко)|к сожалению', phrase: 'Мне жаль / к сожалению', en: 'I’m sorry / unfortunately', literal: 'to me (it is) a pity', note: 'К сожалению, я не могу = Unfortunately I can’t.' },
  { re: 'очень приятно', phrase: 'Очень приятно!', en: 'Nice to meet you!', literal: 'very pleasant', note: 'Said after introductions.' },
  { re: 'до свидания', phrase: 'До свидания!', en: 'Goodbye!', literal: 'until meeting', note: 'Informal: пока.' },
  { re: 'спокойной ночи', phrase: 'Спокойной ночи!', en: 'Good night!', literal: '(I wish you a) calm night', note: 'The words are in the genitive because “I wish” is left out.' },
  { re: 'всё равно', phrase: 'всё равно', en: 'all the same / anyway', literal: 'all equal', note: 'Мне всё равно = I don’t mind.' },
  { re: 'тем не менее', phrase: 'тем не менее', en: 'nevertheless', literal: 'by that not less', note: 'A linking word for writing.' },
  { re: 'так как', phrase: 'так как', en: 'since / because', literal: 'so as', note: 'Like потому что, but more formal.' },
  { re: 'потому что', phrase: 'потому что', en: 'because', literal: 'for that that', note: 'Почему? — Потому что … = Why? — Because …' },
  { re: 'вместе с|с (другом|подругой|друзьями|мамой|папой|семьёй)', phrase: 'с + instrumental', en: 'with (someone)', literal: 'with', note: 'с другом = with a friend: the noun takes the instrumental (-ом, -ой, -ами).' },
];
