import type { Level } from './types';

/** German verb definition: only irregular parts are given; everything else follows the rules. */
export interface VerbDe {
  inf: string;
  en: string;
  level: Level;
  /** Separable prefix: aufstehen → ich stehe auf. */
  prefix?: string;
  /** Inseparable prefix (be-, ver-, er-…): no ge- in the participle. */
  insep?: boolean;
  /** Vowel-changed present stem for du / er (fahren → fähr, lesen → lies). */
  pres?: string;
  /** Simple-past stem: strong (fuhr) or, ending in -te, mixed/irregular weak (brachte). */
  pret?: string;
  /** Past participle without separable prefix (gefahren). */
  part?: string;
  /** Perfect with sein (movement / change of state). */
  sein?: boolean;
  over?: { presente?: string[]; preterito?: string[]; condicional?: string[]; imperativo?: (string | null)[] };
}

const modal = (pres: string[], pret: string, cond?: string[]) => ({
  presente: pres,
  preterito: ['', 'st', '', 'n', 't', 'n'].map((e) => pret + e),
  ...(cond ? { condicional: cond } : {}),
  imperativo: [null, null, null, null, null, null],
});

export const VERBS_DE: VerbDe[] = [
  // --- Irregular core verbs ---------------------------------------------------
  {
    inf: 'sein', en: 'to be', level: 'A1', part: 'gewesen', sein: true,
    over: {
      presente: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'],
      preterito: ['war', 'warst', 'war', 'waren', 'wart', 'waren'],
      condicional: ['wäre', 'wärst', 'wäre', 'wären', 'wärt', 'wären'],
      imperativo: [null, 'sei', 'seien Sie', 'seien wir', 'seid', null],
    },
  },
  {
    inf: 'haben', en: 'to have', level: 'A1', pret: 'hatte', part: 'gehabt',
    over: {
      presente: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'],
      condicional: ['hätte', 'hättest', 'hätte', 'hätten', 'hättet', 'hätten'],
    },
  },
  {
    inf: 'werden', en: 'to become / will', level: 'A1', part: 'geworden', sein: true,
    over: {
      presente: ['werde', 'wirst', 'wird', 'werden', 'werdet', 'werden'],
      preterito: ['wurde', 'wurdest', 'wurde', 'wurden', 'wurdet', 'wurden'],
    },
  },
  { inf: 'können', en: 'can / to be able to', level: 'A1', part: 'gekonnt', over: modal(['kann', 'kannst', 'kann', 'können', 'könnt', 'können'], 'konnte', ['könnte', 'könntest', 'könnte', 'könnten', 'könntet', 'könnten']) },
  { inf: 'müssen', en: 'must / to have to', level: 'A1', part: 'gemusst', over: modal(['muss', 'musst', 'muss', 'müssen', 'müsst', 'müssen'], 'musste', ['müsste', 'müsstest', 'müsste', 'müssten', 'müsstet', 'müssten']) },
  { inf: 'wollen', en: 'to want', level: 'A1', part: 'gewollt', over: modal(['will', 'willst', 'will', 'wollen', 'wollt', 'wollen'], 'wollte') },
  { inf: 'dürfen', en: 'may / to be allowed to', level: 'A1', part: 'gedurft', over: modal(['darf', 'darfst', 'darf', 'dürfen', 'dürft', 'dürfen'], 'durfte', ['dürfte', 'dürftest', 'dürfte', 'dürften', 'dürftet', 'dürften']) },
  { inf: 'sollen', en: 'should / to be supposed to', level: 'A1', part: 'gesollt', over: modal(['soll', 'sollst', 'soll', 'sollen', 'sollt', 'sollen'], 'sollte') },
  { inf: 'mögen', en: 'to like', level: 'A1', part: 'gemocht', over: modal(['mag', 'magst', 'mag', 'mögen', 'mögt', 'mögen'], 'mochte', ['möchte', 'möchtest', 'möchte', 'möchten', 'möchtet', 'möchten']) },
  { inf: 'wissen', en: 'to know (facts)', level: 'A1', pret: 'wusste', part: 'gewusst', over: { presente: ['weiß', 'weißt', 'weiß', 'wissen', 'wisst', 'wissen'] } },

  // --- Regular (weak) ---------------------------------------------------------
  { inf: 'machen', en: 'to do / to make', level: 'A1' },
  { inf: 'spielen', en: 'to play', level: 'A1' },
  { inf: 'wohnen', en: 'to live (reside)', level: 'A1' },
  { inf: 'arbeiten', en: 'to work', level: 'A1' },
  { inf: 'lernen', en: 'to learn', level: 'A1' },
  { inf: 'kaufen', en: 'to buy', level: 'A1' },
  { inf: 'schenken', en: 'to give (as a present)', level: 'A2' },
  { inf: 'putzen', en: 'to clean', level: 'A2' },
  { inf: 'trainieren', en: 'to train', level: 'A2' },
  { inf: 'kochen', en: 'to cook', level: 'A1' },
  { inf: 'hören', en: 'to hear / to listen', level: 'A1' },
  { inf: 'sagen', en: 'to say', level: 'A1' },
  { inf: 'fragen', en: 'to ask', level: 'A1' },
  { inf: 'brauchen', en: 'to need', level: 'A1' },
  { inf: 'suchen', en: 'to look for', level: 'A1' },
  { inf: 'lieben', en: 'to love', level: 'A1' },
  { inf: 'leben', en: 'to live (be alive)', level: 'A1' },
  { inf: 'reisen', en: 'to travel', level: 'A1', sein: true },
  { inf: 'tanzen', en: 'to dance', level: 'A1' },
  { inf: 'öffnen', en: 'to open', level: 'A1' },
  { inf: 'warten', en: 'to wait', level: 'A1' },
  { inf: 'zeigen', en: 'to show', level: 'A1' },
  { inf: 'kosten', en: 'to cost', level: 'A1' },
  { inf: 'räumen', en: 'to clear / to tidy', level: 'A1' },
  { inf: 'studieren', en: 'to study (at university)', level: 'A1' },
  { inf: 'besuchen', en: 'to visit', level: 'A1', insep: true },
  { inf: 'bezahlen', en: 'to pay', level: 'A1', insep: true },
  { inf: 'erzählen', en: 'to tell (a story)', level: 'A1', insep: true },
  { inf: 'verkaufen', en: 'to sell', level: 'A1', insep: true },

  // --- Strong & mixed ---------------------------------------------------------
  { inf: 'fahren', en: 'to drive / to go (by vehicle)', level: 'A1', pres: 'fähr', pret: 'fuhr', part: 'gefahren', sein: true },
  { inf: 'gehen', en: 'to go (on foot)', level: 'A1', pret: 'ging', part: 'gegangen', sein: true },
  { inf: 'kommen', en: 'to come', level: 'A1', pret: 'kam', part: 'gekommen', sein: true },
  { inf: 'sehen', en: 'to see', level: 'A1', pres: 'sieh', pret: 'sah', part: 'gesehen' },
  { inf: 'lesen', en: 'to read', level: 'A1', pres: 'lies', pret: 'las', part: 'gelesen' },
  { inf: 'essen', en: 'to eat', level: 'A1', pres: 'iss', pret: 'aß', part: 'gegessen' },
  { inf: 'trinken', en: 'to drink', level: 'A1', pret: 'trank', part: 'getrunken' },
  { inf: 'schreiben', en: 'to write', level: 'A1', pret: 'schrieb', part: 'geschrieben' },
  { inf: 'sprechen', en: 'to speak', level: 'A1', pres: 'sprich', pret: 'sprach', part: 'gesprochen' },
  { inf: 'nehmen', en: 'to take', level: 'A1', pres: 'nimm', pret: 'nahm', part: 'genommen' },
  { inf: 'geben', en: 'to give', level: 'A1', pres: 'gib', pret: 'gab', part: 'gegeben' },
  { inf: 'finden', en: 'to find', level: 'A1', pret: 'fand', part: 'gefunden' },
  { inf: 'schlafen', en: 'to sleep', level: 'A1', pres: 'schläf', pret: 'schlief', part: 'geschlafen' },
  { inf: 'laufen', en: 'to run / to walk', level: 'A1', pres: 'läuf', pret: 'lief', part: 'gelaufen', sein: true },
  { inf: 'helfen', en: 'to help', level: 'A1', pres: 'hilf', pret: 'half', part: 'geholfen' },
  { inf: 'treffen', en: 'to meet', level: 'A1', pres: 'triff', pret: 'traf', part: 'getroffen' },
  { inf: 'bleiben', en: 'to stay', level: 'A1', pret: 'blieb', part: 'geblieben', sein: true },
  { inf: 'heißen', en: 'to be called', level: 'A1', pret: 'hieß', part: 'geheißen' },
  { inf: 'stehen', en: 'to stand', level: 'A1', pret: 'stand', part: 'gestanden' },
  { inf: 'rufen', en: 'to call', level: 'A1', pret: 'rief', part: 'gerufen' },
  { inf: 'schwimmen', en: 'to swim', level: 'A1', pret: 'schwamm', part: 'geschwommen', sein: true },
  { inf: 'vergessen', en: 'to forget', level: 'A1', insep: true, pres: 'vergiss', pret: 'vergaß', part: 'vergessen' },
  { inf: 'verstehen', en: 'to understand', level: 'A1', insep: true, pret: 'verstand', part: 'verstanden' },
  { inf: 'denken', en: 'to think', level: 'A1', pret: 'dachte', part: 'gedacht' },
  { inf: 'bringen', en: 'to bring', level: 'A1', pret: 'brachte', part: 'gebracht' },
  { inf: 'kennen', en: 'to know (people, places)', level: 'A1', pret: 'kannte', part: 'gekannt' },

  // --- Separable --------------------------------------------------------------
  { inf: 'aufstehen', en: 'to get up', level: 'A1', prefix: 'auf', sein: true },
  { inf: 'einkaufen', en: 'to go shopping', level: 'A1', prefix: 'ein' },
  { inf: 'anrufen', en: 'to phone', level: 'A1', prefix: 'an' },
  { inf: 'fernsehen', en: 'to watch TV', level: 'A1', prefix: 'fern' },
  { inf: 'mitkommen', en: 'to come along', level: 'A1', prefix: 'mit', sein: true },
  { inf: 'aufräumen', en: 'to tidy up', level: 'A1', prefix: 'auf' },
  { inf: 'ankommen', en: 'to arrive', level: 'A1', prefix: 'an', sein: true },
  { inf: 'abfahren', en: 'to depart', level: 'A1', prefix: 'ab', sein: true },

  // --- A2 ---------------------------------------------------------------------
  { inf: 'tragen', en: 'to wear / to carry', level: 'A2', pres: 'träg', pret: 'trug', part: 'getragen' },
  { inf: 'ziehen', en: 'to pull / to move', level: 'A2', pret: 'zog', part: 'gezogen' },
  { inf: 'anziehen', en: 'to put on (clothes)', level: 'A2', prefix: 'an' },
  { inf: 'aussehen', en: 'to look (appearance)', level: 'A2', prefix: 'aus' },
  { inf: 'waschen', en: 'to wash', level: 'A2', pres: 'wäsch', pret: 'wusch', part: 'gewaschen' },
  { inf: 'fliegen', en: 'to fly', level: 'A2', pret: 'flog', part: 'geflogen', sein: true },
  { inf: 'liegen', en: 'to lie (be lying)', level: 'A2', pret: 'lag', part: 'gelegen' },
  { inf: 'sitzen', en: 'to sit', level: 'A2', pret: 'saß', part: 'gesessen' },
  { inf: 'legen', en: 'to lay / to put (flat)', level: 'A2' },
  { inf: 'stellen', en: 'to put (upright)', level: 'A2' },
  { inf: 'fangen', en: 'to catch', level: 'A2', pres: 'fäng', pret: 'fing', part: 'gefangen' },
  { inf: 'anfangen', en: 'to begin', level: 'A2', prefix: 'an' },
  { inf: 'beginnen', en: 'to begin', level: 'A2', insep: true, pret: 'begann', part: 'begonnen' },
  { inf: 'gewinnen', en: 'to win', level: 'A2', insep: true, pret: 'gewann', part: 'gewonnen' },
  { inf: 'verlieren', en: 'to lose', level: 'A2', insep: true, pret: 'verlor', part: 'verloren' },
  { inf: 'bestellen', en: 'to order', level: 'A2', insep: true },
  { inf: 'empfehlen', en: 'to recommend', level: 'A2', insep: true, pres: 'empfiehl', pret: 'empfahl', part: 'empfohlen' },
  { inf: 'verdienen', en: 'to earn', level: 'A2', insep: true },
  { inf: 'schicken', en: 'to send', level: 'A2' },
  { inf: 'buchen', en: 'to book', level: 'A2' },
  { inf: 'erklären', en: 'to explain', level: 'A2', insep: true },
  { inf: 'hoffen', en: 'to hope', level: 'A2' },
  { inf: 'lachen', en: 'to laugh', level: 'A2' },
  { inf: 'schließen', en: 'to close', level: 'A2', pret: 'schloss', part: 'geschlossen' },
  { inf: 'gefallen', en: 'to please (to like)', level: 'A2', insep: true, pres: 'gefäll', pret: 'gefiel', part: 'gefallen' },
  { inf: 'gehören', en: 'to belong to', level: 'A2', insep: true },

  // Childhood and work (A2)
  { inf: 'klettern', en: 'to climb', level: 'A2', sein: true },
  { inf: 'zeichnen', en: 'to draw', level: 'A2' },
  { inf: 'sammeln', en: 'to collect', level: 'A2' },
  { inf: 'basteln', en: 'to make crafts', level: 'A2' },
  { inf: 'wechseln', en: 'to change', level: 'A2' },
  { inf: 'feiern', en: 'to celebrate', level: 'A2' },
  { inf: 'probieren', en: 'to try (taste)', level: 'A2' },
  { inf: 'übernachten', en: 'to stay the night', level: 'A2', insep: true },
  { inf: 'behalten', en: 'to keep', level: 'A2', insep: true, pres: 'behält', pret: 'behielt', part: 'behalten' },
  { inf: 'kennenlernen', en: 'to get to know / to meet (for the first time)', level: 'A2', prefix: 'kennen' },
  { inf: 'springen', en: 'to jump', level: 'A2', pret: 'sprang', part: 'gesprungen', sein: true },

  // --- B1 ---------------------------------------------------------------------
  { inf: 'planen', en: 'to plan', level: 'B1' },
  { inf: 'sparen', en: 'to save (money)', level: 'B1' },
  { inf: 'umziehen', en: 'to move (house)', level: 'B1', prefix: 'um', sein: true },
  { inf: 'einziehen', en: 'to move in', level: 'B1', prefix: 'ein', sein: true },
  { inf: 'vorhaben', en: 'to plan / to intend', level: 'B1', prefix: 'vor' },
  { inf: 'schlagen', en: 'to hit / to beat', level: 'B1', pres: 'schläg', pret: 'schlug', part: 'geschlagen' },
  { inf: 'vorschlagen', en: 'to suggest', level: 'B1', prefix: 'vor' },
  { inf: 'versuchen', en: 'to try', level: 'B1', insep: true },
  { inf: 'aufhören', en: 'to stop', level: 'B1', prefix: 'auf' },
  { inf: 'bestehen', en: 'to pass (an exam)', level: 'B1', insep: true, pret: 'bestand', part: 'bestanden' },
  { inf: 'kündigen', en: 'to quit / to give notice', level: 'B1' },
  { inf: 'berichten', en: 'to report', level: 'B1', insep: true },
  { inf: 'passieren', en: 'to happen', level: 'B1', sein: true },
  { inf: 'heiraten', en: 'to marry', level: 'B1' },
  { inf: 'vermissen', en: 'to miss (someone)', level: 'B1', insep: true },
  { inf: 'vertrauen', en: 'to trust', level: 'B1', insep: true },
  { inf: 'schützen', en: 'to protect', level: 'B1' },
  { inf: 'trennen', en: 'to separate', level: 'B1' },
  { inf: 'wünschen', en: 'to wish', level: 'B1' },
  { inf: 'renovieren', en: 'to renovate', level: 'B1' },
  { inf: 'entscheiden', en: 'to decide', level: 'B1', insep: true, pret: 'entschied', part: 'entschieden' },
  { inf: 'erreichen', en: 'to reach / to achieve', level: 'B1', insep: true },
  { inf: 'bauen', en: 'to build', level: 'B1' },
  { inf: 'reparieren', en: 'to repair', level: 'B1' },
  { inf: 'erfinden', en: 'to invent', level: 'B1', insep: true, pret: 'erfand', part: 'erfunden' },
];

export const VERB_MAP_DE: Record<string, VerbDe> = Object.fromEntries(VERBS_DE.map((v) => [v.inf, v]));
