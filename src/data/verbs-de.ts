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
];

export const VERB_MAP_DE: Record<string, VerbDe> = Object.fromEntries(VERBS_DE.map((v) => [v.inf, v]));
