import { units, type SentenceRow, type WordRow } from '../build';
import type { Level, Unit } from '../types';

/**
 * The most frequent French words, in rough frequency order. Words already taught in a topic unit
 * are skipped, and the rest are split into sets of 25 to be learned like any other unit.
 */
const CORE: WordRow[] = [
  // the glue of every sentence
  ['de', 'of / from'], ['à', 'to / at / in'], ['le', 'the (m)'], ['la', 'the (f)'], ['les', 'the (plural)'], ['un', 'a / one (m)'], ['une', 'a / one (f)'],
  ['des', 'some (plural)'], ['du', 'some / of the (m)'], ['en', 'in / by / of it'], ['pour', 'for / in order to'], ['dans', 'in / inside'], ['sur', 'on'],
  ['par', 'by / per'], ['ce', 'this / it'], ['il', 'he / it'], ['elle', 'she / it'], ['on', 'one / we / people'], ['nous', 'we / us'], ['vous', 'you (formal / plural)'],
  ['ils', 'they (m)'], ['je', 'I'], ['tu', 'you (informal)'], ['ne … pas', 'not'], ['qui', 'who / which'], ['que', 'that / what / than'],
  ['tout', 'all / everything'], ['plus', 'more / no longer'], ['aussi', 'also / as'], ['bien', 'well / good'], ['comme', 'like / as'], ['si', 'if / so / yes (after a negative)'],
  ['moi', 'me'], ['toi', 'you (stressed)'], ['lui', 'him / to him'], ['là', 'there'], ['ici', 'here'], ['maintenant', 'now'], ['alors', 'so / then'],
  ['encore', 'again / still'], ['déjà', 'already'], ['beaucoup', 'a lot / much'], ['peu', 'little / few'], ['trop', 'too / too much'], ['assez', 'enough / quite'],
  ['rien', 'nothing'], ['quelque chose', 'something'], ['quelqu’un', 'someone'], ['personne', 'nobody / person'], ['chaque', 'each / every'], ['autre', 'other'],
  ['même', 'same / even'], ['seul', 'alone / only'], ['vrai', 'true'], ['faux', 'false / wrong'], ['bon', 'good'], ['mauvais', 'bad'], ['premier', 'first'],
  ['dernier', 'last'], ['prochain', 'next'], ['long', 'long'], ['court', 'short'], ['facile', 'easy'], ['difficile', 'difficult'], ['important', 'important'],
  ['possible', 'possible'], ['sûr', 'sure / safe'], ['prêt', 'ready'], ['libre', 'free / available'], ['plein', 'full'], ['vide', 'empty'], ['propre', 'clean / own'],
  ['sale', 'dirty'], ['la chose', 'the thing'], ['le temps', 'the time / the weather'], ['la fois', 'the time (occasion)'], ['la vie', 'the life'],
  ['le jour', 'the day'], ['la nuit', 'the night'], ['le monde', 'the world / people'], ['les gens', 'the people'], ["l'homme", 'the man'], ['la personne', 'the person'],
  ['le pays', 'the country'], ['la place', 'the square / the seat / the space'], ['le moment', 'the moment'], ['la façon', 'the way'], ['le nom', 'the name'],
  ['la vérité', 'the truth'], ["l'idée", 'the idea'], ['la raison', 'the reason'], ['le problème', 'the problem'], ['la partie', 'the part / the game'], ['le côté', 'the side'],
  ['le bout', 'the end / the bit'], ['la fin', 'the end'], ['le début', 'the beginning'], ['la main', 'the hand'], ['le cœur', 'the heart'], ['la voix', 'the voice'],
  ["l'histoire", 'the story / history'], ['le mot', 'the word'], ['la question', 'the question'], ["l'ami", 'the friend (m)'], ["l'amie", 'the friend (f)'],
  // core verbs
  ['dire', 'to say / to tell'], ['donner', 'to give'], ['savoir', 'to know (a fact)'], ['falloir', 'to be necessary (il faut)'], ['voir', 'to see'],
  ['mettre', 'to put'], ['croire', 'to believe'], ['passer', 'to pass / to spend (time)'], ['trouver', 'to find'], ['rendre', 'to give back'],
  ['tenir', 'to hold'], ['laisser', 'to leave / to let'], ['penser', 'to think'], ['sembler', 'to seem'], ['montrer', 'to show'], ['entendre', 'to hear'],
  ['continuer', 'to continue'], ['arrêter', 'to stop'], ['commencer', 'to begin'], ['finir', 'to finish'], ['appeler', 'to call'], ['devenir', 'to become'],
  ['revenir', 'to come back'], ['rester', 'to stay'], ['tomber', 'to fall'], ['oublier', 'to forget'], ['se souvenir', 'to remember'], ['comprendre', 'to understand'],
  ['connaître', 'to know (a person / place)'], ['vivre', 'to live'], ['écrire', 'to write'], ['ouvrir', 'to open'], ['perdre', 'to lose'], ['gagner', 'to win / to earn'],
  ['changer', 'to change'], ['chercher', 'to look for'], ['attendre', 'to wait'], ['répondre', 'to answer'], ['essayer', 'to try'], ['demander', 'to ask'],
  ['sentir', 'to smell / to feel'], ['servir', 'to serve'], ['suivre', 'to follow'], ['permettre', 'to allow'], ['recevoir', 'to receive'], ['décider', 'to decide'],
  // A2: time, place and feelings
  ['souvent', 'often'], ['toujours', 'always / still'], ['jamais', 'never'], ['parfois', 'sometimes'], ['longtemps', 'a long time'], ['tout de suite', 'right away'],
  ['ensuite', 'then / next'], ['enfin', 'finally / at last'], ['avant', 'before'], ['après', 'after'], ['pendant', 'during / for'], ['depuis', 'since / for'],
  ['jusqu’à', 'until / as far as'], ['vers', 'towards / around'], ['chez', 'at someone’s place'], ['entre', 'between'], ['sans', 'without'], ['contre', 'against'],
  ['partout', 'everywhere'], ['ailleurs', 'elsewhere'], ['dehors', 'outside'], ['dedans', 'inside'], ['loin', 'far'], ['près', 'near'], ['tard', 'late'], ['tôt', 'early'],
  ['vite', 'quickly'], ['doucement', 'gently / quietly'], ['vraiment', 'really'], ['surtout', 'above all'], ['presque', 'almost'], ['seulement', 'only'],
  ['ensemble', 'together'], ['peut-être', 'maybe'], ['d’accord', 'OK / agreed'], ['bien sûr', 'of course'], ['heureux', 'happy'], ['triste', 'sad'], ['fâché', 'angry'],
  ['inquiet', 'worried'], ['étonné', 'surprised'], ['fier', 'proud'], ['la peur', 'the fear'], ["l'amour", 'love'], ['la chance', 'the luck'], ['le bruit', 'the noise'],
  ['le souvenir', 'the memory'], ["l'erreur", 'the mistake'], ['le choix', 'the choice'], ['le besoin', 'the need'], ["l'envie", 'the wish / the desire'],
  ['avoir besoin de', 'to need'], ['avoir envie de', 'to feel like'], ['avoir raison', 'to be right'], ['avoir tort', 'to be wrong'], ['avoir l’air', 'to look / to seem'],
  // B1: argument and abstraction
  ['pourtant', 'yet / however'], ['cependant', 'however'], ['donc', 'so / therefore'], ['car', 'because / for'], ['puisque', 'since (cause)'], ['lorsque', 'when'],
  ['tandis que', 'while / whereas'], ['grâce à', 'thanks to'], ['à cause de', 'because of'], ['au lieu de', 'instead of'], ['malgré', 'despite'], ['selon', 'according to'],
  ['environ', 'about / approximately'], ['plutôt', 'rather'], ['notamment', 'in particular'], ['d’ailleurs', 'besides / by the way'], ['en effet', 'indeed'],
  ['le droit', 'the right / law'], ['le devoir', 'the duty'], ['la loi', 'the law'], ['le pouvoir', 'the power'], ['la liberté', 'freedom'], ["l'égalité", 'equality'],
  ['la guerre', 'the war'], ['la paix', 'the peace'], ['le gouvernement', 'the government'], ["l'état", 'the state'], ['le citoyen', 'the citizen'], ['le résultat', 'the result'],
  ['le niveau', 'the level'], ['le but', 'the goal'], ['le moyen', 'the means / the way'], ['la cause', 'the cause'], ["l'effet", 'the effect'], ['le rôle', 'the role'],
  ['le sens', 'the meaning / the direction'], ['le fait', 'the fact'], ['la preuve', 'the proof'], ['le risque', 'the risk'], ['la solution', 'the solution'],
  ['proposer', 'to suggest'], ['expliquer', 'to explain'], ['présenter', 'to present / to introduce'], ['développer', 'to develop'], ['créer', 'to create'],
  ['produire', 'to produce'], ['réduire', 'to reduce'], ['augmenter', 'to increase'], ['diminuer', 'to decrease'], ['protéger', 'to protect'], ['permettre de', 'to make it possible to'],
  ['réussir à', 'to manage to'], ['s’occuper de', 'to take care of'], ['se rendre compte', 'to realise'], ['avoir lieu', 'to take place'], ['faire partie de', 'to be part of'],
  ['la recherche', 'the research / the search'], ['le progrès', 'the progress'], ['la connaissance', 'the knowledge'], ['la décision', 'the decision'], ['le débat', 'the debate'],
  ['la crise', 'the crisis'], ['le comportement', 'the behaviour'], ['la responsabilité', 'the responsibility'], ['le citoyen engagé', 'the active citizen'], ['évoluer', 'to evolve'],
  ['soutenir', 'to support'], ['empêcher', 'to prevent'],
];

/** Sentences per set, using only the grammar of that set's level. */
const SENTENCES: SentenceRow[][] = [
  [['Je pense à toi.', "I'm thinking of you."], ["C'est pour moi ?", 'Is it for me?'], ['Il y a quelqu’un dans la cuisine.', "There's someone in the kitchen."], ['Tout va bien.', 'Everything is fine.']],
  [["C'est vrai ou faux ?", 'Is it true or false?'], ['Le premier jour est toujours difficile.', 'The first day is always difficult.'], ['Je suis prêt !', "I'm ready!"], ["Ce n'est pas possible.", "It's not possible."]],
  [["Les gens sont sympas ici.", 'People are nice here.'], ["J'ai une idée.", 'I have an idea.'], ['Quel est le problème ?', "What's the problem?"], ['Je ne sais pas.', "I don't know."]],
  [['Tu donnes ton numéro à Paul ?', 'Are you giving Paul your number?'], ['Je ne trouve pas mes clés.', "I can't find my keys."], ['Il faut attendre.', 'You have to wait.'], ['Je ne comprends rien.', "I don't understand anything."]],
  [["J'ai oublié mon parapluie.", "I've forgotten my umbrella."], ['Elle est devenue médecin.', 'She became a doctor.'], ['Nous sommes restés chez nous.', 'We stayed at home.'], ["Tu te souviens de lui ?", 'Do you remember him?']],
  [['Je viens tout de suite !', "I'm coming right away!"], ["J'habite ici depuis longtemps.", "I've lived here for a long time."], ['On se voit après le travail ?', 'Shall we meet after work?'], ["Il n'y a personne dehors.", "There's nobody outside."]],
  [["J'ai besoin d'aide.", 'I need help.'], ["Tu as raison.", "You're right."], ["J'ai envie d'une glace.", 'I feel like an ice cream.'], ['Elle avait l’air inquiète.', 'She looked worried.']],
  [["Grâce à toi, j'ai réussi.", 'Thanks to you, I succeeded.'], ['Le concert a eu lieu malgré la pluie.', 'The concert took place despite the rain.'], ['Selon la météo, il fera beau.', 'According to the forecast, the weather will be nice.'], ["Il faut que nous trouvions une solution.", 'We have to find a solution.']],
  [["Je ne pense pas que ce soit la bonne solution.", "I don't think it's the right solution."], ['Il faudrait réduire la pollution.', 'We should reduce pollution.'], ["Je me suis rendu compte de mon erreur.", 'I realised my mistake.'], ['Chaque citoyen a des droits et des devoirs.', 'Every citizen has rights and duties.']],
];

const LEVELS: Level[] = ['A1', 'A1', 'A1', 'A1', 'A2', 'A2', 'A2', 'B1', 'B1'];

const GRAMMAR = `
## Why these words?
These are some of the most frequent words in French. Together with the topic units, they make up most of what you'll hear and read every day.

- Little words like **de, à, le, la, que, en** appear in almost every sentence; remember they melt and elide: *du, au, l', qu'*.
- Many common verbs are irregular: the grammar lessons show the families they belong to.
- Expressions with **avoir** often use "to be" in English: *avoir raison* = to be right, *avoir besoin de* = to need.
`;

/** Builds the sets from the words not already taught in `taught` (ids of topic-unit words). */
export function frCoreUnits(taught: Set<string>): Unit[] {
  const seen = new Set<string>();
  const words = CORE.filter(([fr]) => !taught.has(fr) && !seen.has(fr) && seen.add(fr));
  return LEVELS.map((level, i) =>
    units(level, [{
      id: `fr-core-${i + 1}`, title: `Top words ${i + 1}`, titleEs: `Mots fréquents ${i + 1}`, emoji: '⭐',
      description: `Most-used French words, set ${i + 1} of ${LEVELS.length}.`,
      words: words.slice(i * 25, i * 25 + 25), sentences: SENTENCES[i], grammar: GRAMMAR,
    }])[0],
  );
}
