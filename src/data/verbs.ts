import type { Level, Tense } from './types';

export type StemChange = 'ie' | 'ue' | 'i' | 'u-ue';

export type Forms = (string | null)[];

export interface VerbDef {
  inf: string;
  en: string;
  level: Level;
  /** Present-tense stem change (applies to yo, tú, él, ellos). */
  stem?: StemChange;
  /** Irregular yo form of the present (tengo, hago…). Also drives the subjunctive stem. */
  yo?: string;
  /** Strong preterite stem (tuv-, pud-, dij-…). */
  pret?: string;
  /** Irregular future/conditional stem (tendr-, har-…). */
  fut?: string;
  part?: string;
  ger?: string;
  /** Irregular affirmative tú imperative (ten, haz, di…). */
  impTu?: string;
  /** Full-tense overrides; 6 slots: yo, tú, él, nosotros, vosotros, ellos. */
  over?: Partial<Record<Tense, Forms>>;
}

export const VERBS: VerbDef[] = [
  // --- Core irregulars -------------------------------------------------------
  {
    inf: 'ser', en: 'to be (identity, origin)', level: 'A1',
    over: {
      presente: ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
      preterito: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
      imperfecto: ['era', 'eras', 'era', 'éramos', 'erais', 'eran'],
      subjuntivo: ['sea', 'seas', 'sea', 'seamos', 'seáis', 'sean'],
    },
    impTu: 'sé',
  },
  {
    inf: 'estar', en: 'to be (state, location)', level: 'A1', pret: 'estuv',
    over: {
      presente: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
      subjuntivo: ['esté', 'estés', 'esté', 'estemos', 'estéis', 'estén'],
    },
  },
  {
    inf: 'ir', en: 'to go', level: 'A1', ger: 'yendo', impTu: 've',
    over: {
      presente: ['voy', 'vas', 'va', 'vamos', 'vais', 'van'],
      preterito: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
      imperfecto: ['iba', 'ibas', 'iba', 'íbamos', 'ibais', 'iban'],
      subjuntivo: ['vaya', 'vayas', 'vaya', 'vayamos', 'vayáis', 'vayan'],
      imperativo: [null, 've', 'vaya', 'vamos', 'id', 'vayan'],
    },
  },
  { inf: 'tener', en: 'to have', level: 'A1', yo: 'tengo', stem: 'ie', pret: 'tuv', fut: 'tendr', impTu: 'ten' },
  {
    inf: 'hacer', en: 'to do / to make', level: 'A1', yo: 'hago', fut: 'har', part: 'hecho', impTu: 'haz',
    over: { preterito: ['hice', 'hiciste', 'hizo', 'hicimos', 'hicisteis', 'hicieron'] },
  },
  { inf: 'poder', en: 'to be able to / can', level: 'A1', stem: 'ue', pret: 'pud', fut: 'podr', ger: 'pudiendo' },
  { inf: 'querer', en: 'to want / to love', level: 'A1', stem: 'ie', pret: 'quis', fut: 'querr' },
  { inf: 'decir', en: 'to say / to tell', level: 'A2', yo: 'digo', stem: 'i', pret: 'dij', fut: 'dir', part: 'dicho', impTu: 'di' },
  { inf: 'venir', en: 'to come', level: 'A1', yo: 'vengo', stem: 'ie', pret: 'vin', fut: 'vendr', impTu: 'ven' },
  { inf: 'poner', en: 'to put', level: 'A2', yo: 'pongo', pret: 'pus', fut: 'pondr', part: 'puesto', impTu: 'pon' },
  { inf: 'salir', en: 'to leave / to go out', level: 'A1', yo: 'salgo', fut: 'saldr', impTu: 'sal' },
  {
    inf: 'saber', en: 'to know (facts)', level: 'A2', pret: 'sup', fut: 'sabr',
    over: {
      presente: ['sé', 'sabes', 'sabe', 'sabemos', 'sabéis', 'saben'],
      subjuntivo: ['sepa', 'sepas', 'sepa', 'sepamos', 'sepáis', 'sepan'],
    },
  },
  {
    inf: 'dar', en: 'to give', level: 'A2',
    over: {
      presente: ['doy', 'das', 'da', 'damos', 'dais', 'dan'],
      preterito: ['di', 'diste', 'dio', 'dimos', 'disteis', 'dieron'],
      subjuntivo: ['dé', 'des', 'dé', 'demos', 'deis', 'den'],
    },
  },
  {
    inf: 'ver', en: 'to see / to watch', level: 'A1', part: 'visto',
    over: {
      presente: ['veo', 'ves', 've', 'vemos', 'veis', 'ven'],
      preterito: ['vi', 'viste', 'vio', 'vimos', 'visteis', 'vieron'],
      imperfecto: ['veía', 'veías', 'veía', 'veíamos', 'veíais', 'veían'],
    },
  },
  {
    inf: 'haber', en: 'to have (auxiliary) / there is', level: 'A2', pret: 'hub', fut: 'habr',
    over: {
      presente: ['he', 'has', 'ha', 'hemos', 'habéis', 'han'],
      subjuntivo: ['haya', 'hayas', 'haya', 'hayamos', 'hayáis', 'hayan'],
    },
  },
  { inf: 'conocer', en: 'to know (people, places) / to meet', level: 'A2', yo: 'conozco' },
  { inf: 'conducir', en: 'to drive', level: 'A2', yo: 'conduzco', pret: 'conduj' },
  { inf: 'traer', en: 'to bring', level: 'A2', yo: 'traigo', pret: 'traj' },
  { inf: 'seguir', en: 'to follow / to continue', level: 'B1', yo: 'sigo', stem: 'i' },
  { inf: 'conseguir', en: 'to achieve / to get', level: 'B1', yo: 'consigo', stem: 'i' },
  { inf: 'proteger', en: 'to protect', level: 'B1', yo: 'protejo' },

  // --- Stem-changing ---------------------------------------------------------
  { inf: 'pensar', en: 'to think', level: 'A1', stem: 'ie' },
  { inf: 'empezar', en: 'to begin', level: 'A2', stem: 'ie' },
  { inf: 'entender', en: 'to understand', level: 'A1', stem: 'ie' },
  { inf: 'preferir', en: 'to prefer', level: 'A1', stem: 'ie' },
  { inf: 'recomendar', en: 'to recommend', level: 'B1', stem: 'ie' },
  { inf: 'sentirse', en: 'to feel', level: 'A2', stem: 'ie' },
  { inf: 'dormir', en: 'to sleep', level: 'A1', stem: 'ue' },
  { inf: 'volver', en: 'to return / to come back', level: 'A2', stem: 'ue', part: 'vuelto' },
  { inf: 'encontrar', en: 'to find', level: 'A2', stem: 'ue' },
  { inf: 'costar', en: 'to cost', level: 'A2', stem: 'ue' },
  { inf: 'doler', en: 'to hurt', level: 'A2', stem: 'ue' },
  { inf: 'recordar', en: 'to remember', level: 'A2', stem: 'ue' },
  { inf: 'probarse', en: 'to try on', level: 'A2', stem: 'ue' },
  { inf: 'aprobar', en: 'to pass (an exam)', level: 'B1', stem: 'ue' },
  { inf: 'acostarse', en: 'to go to bed', level: 'A1', stem: 'ue' },
  { inf: 'jugar', en: 'to play', level: 'A1', stem: 'u-ue' },
  { inf: 'pedir', en: 'to ask for / to order', level: 'A2', stem: 'i' },

  // --- Regular ---------------------------------------------------------------
  { inf: 'hablar', en: 'to speak', level: 'A1' },
  { inf: 'llamarse', en: 'to be called', level: 'A1' },
  { inf: 'vivir', en: 'to live', level: 'A1' },
  { inf: 'comer', en: 'to eat', level: 'A1' },
  { inf: 'beber', en: 'to drink', level: 'A1' },
  { inf: 'tomar', en: 'to take / to have (food, drink)', level: 'A1' },
  { inf: 'desayunar', en: 'to have breakfast', level: 'A1' },
  { inf: 'cenar', en: 'to have dinner', level: 'A1' },
  { inf: 'levantarse', en: 'to get up', level: 'A1' },
  { inf: 'ducharse', en: 'to shower', level: 'A1' },
  { inf: 'trabajar', en: 'to work', level: 'A1' },
  { inf: 'estudiar', en: 'to study', level: 'A1' },
  { inf: 'buscar', en: 'to look for', level: 'A1' },
  { inf: 'leer', en: 'to read', level: 'A1' },
  { inf: 'creer', en: 'to believe', level: 'A2' },
  { inf: 'bailar', en: 'to dance', level: 'A1' },
  { inf: 'cantar', en: 'to sing', level: 'A1' },
  { inf: 'escuchar', en: 'to listen', level: 'A1' },
  { inf: 'llevar', en: 'to wear / to carry', level: 'A2' },
  { inf: 'comprar', en: 'to buy', level: 'A1' },
  { inf: 'pagar', en: 'to pay', level: 'A2' },
  { inf: 'viajar', en: 'to travel', level: 'A2' },
  { inf: 'llegar', en: 'to arrive', level: 'A2' },
  { inf: 'visitar', en: 'to visit', level: 'A2' },
  { inf: 'descansar', en: 'to rest', level: 'A2' },
  { inf: 'escribir', en: 'to write', level: 'A2', part: 'escrito' },
  { inf: 'abrir', en: 'to open', level: 'A2', part: 'abierto' },
  { inf: 'romper', en: 'to break', level: 'A2', part: 'roto' },
  { inf: 'aprender', en: 'to learn', level: 'A1' },
  { inf: 'deber', en: 'must / should', level: 'B1' },
  { inf: 'terminar', en: 'to finish', level: 'B1' },
  { inf: 'reciclar', en: 'to recycle', level: 'B1' },
  { inf: 'casarse', en: 'to get married', level: 'B1' },
  { inf: 'enfadarse', en: 'to get angry', level: 'B1' },
  { inf: 'enamorarse', en: 'to fall in love', level: 'B1' },
  { inf: 'discutir', en: 'to argue', level: 'B1' },
  { inf: 'cortar', en: 'to cut', level: 'B1' },
  { inf: 'añadir', en: 'to add', level: 'B1' },
  { inf: 'mezclar', en: 'to mix', level: 'B1' },
  { inf: 'mirar', en: 'to look at / to watch', level: 'A1' },
  { inf: 'llamar', en: 'to call', level: 'A1' },
  { inf: 'preguntar', en: 'to ask (a question)', level: 'A1' },
  { inf: 'contestar', en: 'to answer', level: 'A1' },
  { inf: 'ayudar', en: 'to help', level: 'A1' },
  { inf: 'necesitar', en: 'to need', level: 'A1' },
  { inf: 'usar', en: 'to use', level: 'A1' },
  { inf: 'cocinar', en: 'to cook', level: 'A1' },
  { inf: 'limpiar', en: 'to clean', level: 'A2' },
  { inf: 'lavar', en: 'to wash', level: 'A2' },
  { inf: 'ganar', en: 'to win / to earn', level: 'A2' },
  { inf: 'gastar', en: 'to spend (money)', level: 'A2' },
  { inf: 'olvidar', en: 'to forget', level: 'A2' },
  { inf: 'cambiar', en: 'to change', level: 'A2' },
  { inf: 'subir', en: 'to go up / to upload', level: 'A2' },
  { inf: 'bajar', en: 'to go down / to download', level: 'A2' },
  { inf: 'compartir', en: 'to share', level: 'A2' },
  { inf: 'descargar', en: 'to download', level: 'A2' },
  { inf: 'cerrar', en: 'to close', level: 'A1', stem: 'ie' },
  { inf: 'perder', en: 'to lose / to miss (a bus)', level: 'A2', stem: 'ie' },
  { inf: 'servir', en: 'to serve', level: 'A2', stem: 'i' },
  { inf: 'repetir', en: 'to repeat', level: 'A2', stem: 'i' },
  { inf: 'traducir', en: 'to translate', level: 'B1', yo: 'traduzco', pret: 'traduj' },
  { inf: 'parecer', en: 'to seem', level: 'B1', yo: 'parezco' },
  { inf: 'publicar', en: 'to publish / to post', level: 'B1' },
  { inf: 'ocurrir', en: 'to happen', level: 'B1' },
  { inf: 'invertir', en: 'to invest', level: 'B1', stem: 'ie' },
  { inf: 'cobrar', en: 'to charge / to get paid', level: 'B1' },
  { inf: 'quejarse', en: 'to complain', level: 'B1' },
  { inf: 'correr', en: 'to run', level: 'A1' },
  { inf: 'caminar', en: 'to walk', level: 'A1' },
  { inf: 'relajarse', en: 'to relax', level: 'B1' },
  { inf: 'devolver', en: 'to give back / to return', level: 'B1', stem: 'ue', part: 'devuelto' },
];

export const VERB_MAP: Record<string, VerbDef> = Object.fromEntries(VERBS.map((v) => [v.inf, v]));
