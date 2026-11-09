import type { Reading } from './types';

/**
 * Key words for each reading and song: words the text needs that the course teaches only later
 * (or not at all). They are shown before you start reading ("pre-teaching" vocabulary helps
 * comprehension) and count as known when deciding whether a text is ready for you.
 */
type Keys = Record<string, Record<string, string>>;

export const KEY_WORDS_ES: Keys = {
  'r-dia': { tomate: 'tomato' },
  'r-nina': { mañanas: 'mornings' },
  'r-mercado': { mejores: 'best (plural)', mejor: 'better / best', esperar: 'to wait', esperamos: 'we wait' },
  'r-lazarillo': { cual: 'which (el cual = who / which)' },
  'r-quijote': { aun: 'even' },
  's-cielito': { ay: 'oh! (a sigh)' },
  's-colores': { 'pí': '(the sound of a chick: cheep)' },
};

export const KEY_WORDS_DE: Keys = {
  'de-r-wochenende': { meiner: 'my (of my / with my)', viele: 'many' },
  'de-r-einkaufen': { letzten: 'last' },
  'de-r-arzt': { fall: 'case (auf jeden Fall = in any case)' },
  'de-r-job': { denn: 'because / then (in questions)', gefällt: 'likes (es gefällt mir = I like it)' },
  'de-r-weihnachten': { des: 'of the', ganze: 'whole', alle: 'all / everyone' },
  'de-r-wohnung': { perfekt: 'perfect' },
  'de-r-plastik': { davon: 'of it / from it' },
  'de-r-lotto': { lisa: 'Lisa (a name)' },
  'de-r-homeoffice': { normal: 'normal', praktisch: 'practical', manchen: 'some (people)' },
  'de-r-bremen': { nun: 'now', da: 'there / then' },
  'de-s-entchen': { alle: 'all', fliegt: 'flies', fliegen: 'to fly' },
  'de-s-haenschen': { nun: 'now', da: 'there / then', ihm: '(to) him', dir: '(to) you', wohl: 'well' },
  'de-s-vogel': { flieg: 'fly!', denn: 'because', weil: 'because' },
  'de-s-tannenbaum': { o: 'oh', gefallen: 'to please (du kannst mir gefallen = I like you)', jeder: 'every' },
  'de-s-stille-nacht': { o: 'oh', da: 'there / when', christ: 'Christ' },
};

export const KEY_WORDS_FR: Keys = {
  'fr-r-claire': { 'vingt-quatre': 'twenty-four', 'hôpital': 'hospital' },
  'fr-r-marche': { 'prépare': 'prepares', "qu'il": 'that he / that it' },
  'fr-r-appart': { m: 'm (metres, as in 45 m²)', 'acceptés': 'accepted' },
  'fr-r-message': { message: 'message', h: 'h (o’clock, as in 18 h)', italien: 'Italian', retrouve: 'meet (up)', quartier: 'neighbourhood' },
  'fr-r-velo': { centaines: 'hundreds', 'kilomètres': 'kilometres', chauffeur: 'driver' },
  'fr-r-teletravail': { 'télétravaillent': 'work from home', avantages: 'advantages', clairs: 'clear', experts: 'experts', espace: 'space', probable: 'likely' },
  'fr-r-lettre': { sujet: 'subject', article: 'article', 'agréer': '(veuillez agréer = yours faithfully)' },
  'fr-r-erasmus': { programme: 'programme', referais: 'would do again' },
  'fr-r-gaspillage': { millions: 'millions', nourriture: 'food', 'réfrigérateur': 'fridge', applications: 'apps', consommer: 'to consume / to eat' },
  'fr-r-langues': { facilement: 'easily', adultes: 'adults', avantages: 'advantages', adulte: 'adult' },
  'fr-r-miserables': { octobre: 'October', homme: 'man', 'dit-elle': 'she said' },
  'fr-s-jacques': { dang: '(bell sound)', dong: '(bell sound)' },
  'fr-s-lune': { amour: 'love', 'écrire': 'to write' },
  'fr-s-avignon': { avignon: 'Avignon (a city)', rond: 'round (en rond = in a circle)' },
  'fr-s-fontaine': { promener: 'to walk (aller me promener = to go for a walk)' },
};

export const KEY_WORDS_RU: Keys = {
  'ru-r-den': { 'работу': 'work (на работу = to work)' },
  'ru-r-vyhodnye': { 'уехали': 'left (went away)', 'для': 'for', 'вернулись': 'came back' },
  'ru-r-detstvo': { 'соседская': 'the neighbours’', 'тех': 'those (с тех пор = since then)', 'пор': '(с тех пор = since then)', 'лучшими': 'best (with лучшими друзьями = best friends)' },
  'ru-r-ob-yavlenie': { 'центре': 'centre (в центре = in the centre)' },
  'ru-r-pismo': { 'ко': 'to (ко мне = to me)', 'погуляем': 'we’ll go for a walk', 'сможешь': 'you will be able to', 'работы': 'work (после работы = after work)' },
  'ru-r-udalyonka': { 'пандемии': 'pandemic', 'возвращаться': 'to return', 'легче': 'easier' },
  'ru-r-baikal': { 'нём': 'it (в нём = in it)', 'байкальская': 'Baikal (adjective)', 'несколько': 'several', 'организаций': 'organisations', 'увидели': 'saw' },
  'ru-r-teatr': { 'его': 'him / it / his', 'увидеть': 'to see', 'балерина': 'ballerina', 'сходите': 'go (and see)', 'пожалеете': 'you will regret' },
  'ru-r-kostochka': { 'их': 'them / their', 'съесть': 'to eat (up)', 'удержался': 'held back', 'съел': 'ate (up)', 'покраснел': 'blushed', 'рак': 'crayfish (красный как рак = red as a lobster)', 'нехорошо': 'not good', 'косточки': 'stones (of fruit)', 'умеет': 'can (knows how to)', 'косточку': 'stone (of a fruit)' },
  'ru-r-yazyk': { 'падежей': 'cases (grammar)', 'глагола': 'verb', 'ударение': 'stress (on a syllable)', 'его': 'it / its', 'прошедшего': 'past (прошедшее время = past tense)', 'рода': 'gender (grammar)' },
  'ru-s-kalinka': { 'ах': 'ah!', 'ай-люли': '(a joyful refrain)', 'люли': '(a joyful refrain)' },
  'ru-s-beryoza': { 'люли': '(a refrain)', 'поле': 'field', 'кудряву': 'curly (old form of кудрявую)' },
  'ru-s-moroz': { 'ой': 'oh!', 'ох': 'oh! (a sigh)' },
  'ru-s-korobeiniki': { 'ой': 'oh!' },
  'ru-s-vecher': { 'ой': 'oh!', 'ох': 'oh! (a sigh)' },
};

/** Adds the key words to each reading's glossary (the reading's own entries win). */
export function withKeyWords(list: Reading[], keys: Keys): Reading[] {
  return list.map((r) => (keys[r.id] ? { ...r, glossary: { ...keys[r.id], ...r.glossary }, keyWords: Object.keys(keys[r.id]) } : r));
}
