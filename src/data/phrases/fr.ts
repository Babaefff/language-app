import type { Phrase } from './types';

export const PHRASES_FR: Phrase[] = [
  { re: 'il y a', phrase: 'il y a', en: 'there is / there are; … ago', literal: 'it there has', note: 'Il y a un café = there is a café. With time: il y a deux jours = two days ago.' },
  { re: '(j\'|j’)ai \\p{N}+ ans|(as|a|avez|avons|ont) \\p{N}+ ans|quel âge', phrase: 'J’ai … ans.', en: 'I’m … years old.', literal: 'I have … years', note: 'French “has” years: j’ai vingt ans. Not “je suis vingt”.' },
  { re: '(j\'|j’)ai (très )?(faim|soif|froid|chaud|peur|sommeil|raison)|(as|a|avez|avons|ont) (très )?(faim|soif|froid|chaud|peur|sommeil|raison)', phrase: 'avoir faim / soif / froid …', en: 'to be hungry / thirsty / cold …', literal: 'to have hunger / thirst / cold', note: 'J’ai faim = I’m hungry, j’ai froid = I’m cold. Not “je suis faim”.' },
  { re: '(j\'|j’)ai mal|(as|a|avez|avons|ont) mal', phrase: 'avoir mal (à)', en: 'to hurt / to have a pain', literal: 'to have bad (at)', note: 'J’ai mal à la tête = I have a headache.' },
  { re: 'ça va', phrase: 'Ça va ?', en: 'How are you? / I’m fine.', literal: 'it goes?', note: 'As a question: how are you? As an answer: fine. Ça va bien = I’m fine.' },
  { re: 'il fait (très )?(froid|chaud|beau|mauvais|du soleil|du vent)', phrase: 'Il fait froid / chaud / beau …', en: 'It’s cold / hot / nice …', literal: 'it makes cold / hot / nice', note: 'Weather uses faire. For rain: il pleut.' },
  { re: '(je m\'|je m’)appelle|(tu t\'|tu t’)appelles|(s\'|s’)appelle|vous appelez', phrase: 'Je m’appelle …', en: 'My name is …', literal: 'I call myself …', note: 's’appeler = to be called. Comment tu t’appelles ? = What’s your name?' },
  { re: '(s\'|s’)il (te|vous) plaît', phrase: 's’il vous plaît / s’il te plaît', en: 'please', literal: 'if it pleases you', note: 'Vous for strangers and politeness, te for friends.' },
  { re: 'il faut', phrase: 'il faut + infinitive', en: 'you have to / one must; it takes', literal: 'it is needed', note: 'Il faut partir = we have to go. Il faut deux heures = it takes two hours.' },
  { re: '(je viens|tu viens|il vient|elle vient|nous venons|vous venez|ils viennent) (de|d\'|d’)', phrase: 'venir de + infinitive', en: 'to have just (done)', literal: 'to come from …', note: 'Je viens de manger = I’ve just eaten. (Je viens de Paris = I come from Paris.)' },
  { re: '(je vais|tu vas|il va|elle va|on va|nous allons|vous allez|ils vont) \\p{L}+(er|ir|re)(?![\\p{L}])', phrase: 'aller + infinitive', en: 'to be going to', literal: 'to go …', note: 'The easy future: je vais manger = I’m going to eat.' },
  { re: '(j\'|j’)ai besoin|(as|a|avez|avons|ont) besoin', phrase: 'avoir besoin de', en: 'to need', literal: 'to have need of', note: 'J’ai besoin d’aide = I need help.' },
  { re: '(j\'|j’)ai envie|(as|a|avez|avons|ont) envie', phrase: 'avoir envie de', en: 'to feel like / to want', literal: 'to have desire of', note: 'J’ai envie d’un café = I feel like a coffee.' },
  { re: 'ça me plaît|ça (m\'|m’)a plu|me plaît', phrase: 'Ça me plaît.', en: 'I like it.', literal: 'that pleases me', note: 'The thing you like is the subject, like aimer’s polite cousin.' },
  { re: 'est-ce que', phrase: 'Est-ce que … ?', en: '(question marker)', literal: 'is it that …?', note: 'Turns a sentence into a yes/no question: Est-ce que tu viens ? = Are you coming?' },
  { re: '(qu\'|qu’)est-ce que', phrase: 'Qu’est-ce que … ?', en: 'What … ?', literal: 'what is it that …?', note: 'Qu’est-ce que tu fais ? = What are you doing?' },
  { re: 'ne \\p{L}+ pas|n(\'|’)\\p{L}+ pas', phrase: 'ne … pas', en: 'not', literal: 'not … a step', note: 'Two parts around the verb: je ne parle pas. In speech the ne often disappears.' },
  { re: 'tout de suite', phrase: 'tout de suite', en: 'right away', literal: 'all of following', note: 'J’arrive tout de suite = I’m coming right away.' },
  { re: 'en avoir marre|(j\'|j’)en ai marre', phrase: 'en avoir marre', en: 'to be fed up', literal: 'to have enough of it', note: 'Informal: j’en ai marre !' },
  { re: 'avoir lieu|a eu lieu|aura lieu|ont lieu', phrase: 'avoir lieu', en: 'to take place', literal: 'to have place', note: 'Le concert a lieu samedi.' },
];
