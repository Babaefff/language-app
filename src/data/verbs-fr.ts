import type { Level } from './types';

/**
 * French verb definition: only the irregular parts are given; everything else follows the rules
 * (imparfait from the nous stem, subjunctive from the ils stem, future from the infinitive).
 */
export interface VerbFr {
  /** Reflexive verbs start with se / s': "se lever", "s'appeler". */
  inf: string;
  en: string;
  level: Level;
  /** Second group (finir → nous finissons). */
  iss?: boolean;
  /** Full present (je … ils), for irregular verbs and stem changers (achète, appelle). */
  pres?: string[];
  /** Past participle (fait, pris…). */
  part?: string;
  /** Passé composé with être (movement / change of state). Reflexive verbs always use être. */
  etre?: boolean;
  /** Future / conditional stem (ir-, aur-, fer-…). */
  fut?: string;
  /** Imparfait stem when it is not the nous stem (être → ét-). */
  imp?: string;
  /** Full present subjunctive for the seven truly irregular verbs. */
  subj?: string[];
  /** Imperative [tu, nous, vous] when it is not the present form. null = not used. */
  imper?: (string | null)[];
}

export const VERBS_FR: VerbFr[] = [
  // --- The irregular core -------------------------------------------------------
  {
    inf: 'être', en: 'to be', level: 'A1', pres: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'], part: 'été', fut: 'ser', imp: 'ét',
    subj: ['sois', 'sois', 'soit', 'soyons', 'soyez', 'soient'], imper: ['sois', 'soyons', 'soyez'],
  },
  {
    inf: 'avoir', en: 'to have', level: 'A1', pres: ['ai', 'as', 'a', 'avons', 'avez', 'ont'], part: 'eu', fut: 'aur',
    subj: ['aie', 'aies', 'ait', 'ayons', 'ayez', 'aient'], imper: ['aie', 'ayons', 'ayez'],
  },
  {
    inf: 'aller', en: 'to go', level: 'A1', pres: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'], etre: true, fut: 'ir',
    subj: ['aille', 'ailles', 'aille', 'allions', 'alliez', 'aillent'],
  },
  {
    inf: 'faire', en: 'to do / to make', level: 'A1', pres: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'], part: 'fait', fut: 'fer',
    subj: ['fasse', 'fasses', 'fasse', 'fassions', 'fassiez', 'fassent'],
  },
  {
    inf: 'pouvoir', en: 'can / to be able to', level: 'A1', pres: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'], part: 'pu', fut: 'pourr',
    subj: ['puisse', 'puisses', 'puisse', 'puissions', 'puissiez', 'puissent'], imper: [null, null, null],
  },
  {
    inf: 'vouloir', en: 'to want', level: 'A1', pres: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'], part: 'voulu', fut: 'voudr',
    subj: ['veuille', 'veuilles', 'veuille', 'voulions', 'vouliez', 'veuillent'], imper: [null, null, 'veuillez'],
  },
  { inf: 'devoir', en: 'must / to have to', level: 'A1', pres: ['dois', 'dois', 'doit', 'devons', 'devez', 'doivent'], part: 'dû', fut: 'devr', imper: [null, null, null] },
  {
    inf: 'savoir', en: 'to know (a fact)', level: 'A1', pres: ['sais', 'sais', 'sait', 'savons', 'savez', 'savent'], part: 'su', fut: 'saur',
    subj: ['sache', 'saches', 'sache', 'sachions', 'sachiez', 'sachent'], imper: ['sache', 'sachons', 'sachez'],
  },
  { inf: 'venir', en: 'to come', level: 'A1', pres: ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'], part: 'venu', etre: true, fut: 'viendr' },
  { inf: 'devenir', en: 'to become', level: 'A2', pres: ['deviens', 'deviens', 'devient', 'devenons', 'devenez', 'deviennent'], part: 'devenu', etre: true, fut: 'deviendr' },
  { inf: 'revenir', en: 'to come back', level: 'A2', pres: ['reviens', 'reviens', 'revient', 'revenons', 'revenez', 'reviennent'], part: 'revenu', etre: true, fut: 'reviendr' },
  { inf: 'prendre', en: 'to take', level: 'A1', pres: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'], part: 'pris' },
  { inf: 'comprendre', en: 'to understand', level: 'A1', pres: ['comprends', 'comprends', 'comprend', 'comprenons', 'comprenez', 'comprennent'], part: 'compris' },
  { inf: 'apprendre', en: 'to learn', level: 'A1', pres: ['apprends', 'apprends', 'apprend', 'apprenons', 'apprenez', 'apprennent'], part: 'appris' },
  { inf: 'mettre', en: 'to put / to put on', level: 'A1', pres: ['mets', 'mets', 'met', 'mettons', 'mettez', 'mettent'], part: 'mis' },
  { inf: 'dire', en: 'to say / to tell', level: 'A1', pres: ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'], part: 'dit' },
  { inf: 'voir', en: 'to see', level: 'A1', pres: ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'], part: 'vu', fut: 'verr' },
  { inf: 'sortir', en: 'to go out', level: 'A1', pres: ['sors', 'sors', 'sort', 'sortons', 'sortez', 'sortent'], etre: true },
  { inf: 'partir', en: 'to leave', level: 'A1', pres: ['pars', 'pars', 'part', 'partons', 'partez', 'partent'], etre: true },
  { inf: 'dormir', en: 'to sleep', level: 'A1', pres: ['dors', 'dors', 'dort', 'dormons', 'dormez', 'dorment'] },
  { inf: 'lire', en: 'to read', level: 'A1', pres: ['lis', 'lis', 'lit', 'lisons', 'lisez', 'lisent'], part: 'lu' },
  { inf: 'écrire', en: 'to write', level: 'A1', pres: ['écris', 'écris', 'écrit', 'écrivons', 'écrivez', 'écrivent'], part: 'écrit' },
  { inf: 'boire', en: 'to drink', level: 'A1', pres: ['bois', 'bois', 'boit', 'buvons', 'buvez', 'boivent'], part: 'bu' },
  { inf: 'connaître', en: 'to know (a person / place)', level: 'A1', pres: ['connais', 'connais', 'connaît', 'connaissons', 'connaissez', 'connaissent'], part: 'connu' },
  { inf: 'croire', en: 'to believe', level: 'A2', pres: ['crois', 'crois', 'croit', 'croyons', 'croyez', 'croient'], part: 'cru' },
  { inf: 'ouvrir', en: 'to open', level: 'A2', pres: ['ouvre', 'ouvres', 'ouvre', 'ouvrons', 'ouvrez', 'ouvrent'], part: 'ouvert' },
  { inf: 'vivre', en: 'to live', level: 'A2', pres: ['vis', 'vis', 'vit', 'vivons', 'vivez', 'vivent'], part: 'vécu' },
  { inf: 'recevoir', en: 'to receive', level: 'B1', pres: ['reçois', 'reçois', 'reçoit', 'recevons', 'recevez', 'reçoivent'], part: 'reçu', fut: 'recevr' },

  { inf: 'naître', en: 'to be born', level: 'A2', pres: ['nais', 'nais', 'naît', 'naissons', 'naissez', 'naissent'], part: 'né', etre: true },
  { inf: 'mourir', en: 'to die', level: 'A2', pres: ['meurs', 'meurs', 'meurt', 'mourons', 'mourez', 'meurent'], part: 'mort', etre: true, fut: 'mourr' },
  { inf: 'envoyer', en: 'to send', level: 'A2', pres: ['envoie', 'envoies', 'envoie', 'envoyons', 'envoyez', 'envoient'], fut: 'enverr' },
  { inf: 'courir', en: 'to run', level: 'A2', pres: ['cours', 'cours', 'court', 'courons', 'courez', 'courent'], part: 'couru', fut: 'courr' },

  // --- Regular -er verbs (the first group: 9 verbs out of 10) -------------------
  { inf: 'parler', en: 'to speak', level: 'A1' },
  { inf: 'habiter', en: 'to live (somewhere)', level: 'A1' },
  { inf: 'aimer', en: 'to like / to love', level: 'A1' },
  { inf: 'adorer', en: 'to love (things)', level: 'A1' },
  { inf: 'détester', en: 'to hate', level: 'A1' },
  { inf: 'travailler', en: 'to work', level: 'A1' },
  { inf: 'étudier', en: 'to study', level: 'A1' },
  { inf: 'regarder', en: 'to watch / to look at', level: 'A1' },
  { inf: 'écouter', en: 'to listen to', level: 'A1' },
  { inf: 'jouer', en: 'to play', level: 'A1' },
  { inf: 'chanter', en: 'to sing', level: 'A1' },
  { inf: 'danser', en: 'to dance', level: 'A1' },
  { inf: 'donner', en: 'to give', level: 'A1' },
  { inf: 'trouver', en: 'to find', level: 'A1' },
  { inf: 'penser', en: 'to think', level: 'A1' },
  { inf: 'chercher', en: 'to look for', level: 'A1' },
  { inf: 'demander', en: 'to ask', level: 'A1' },
  { inf: 'aider', en: 'to help', level: 'A1' },
  { inf: 'visiter', en: 'to visit (a place)', level: 'A1' },
  { inf: 'cuisiner', en: 'to cook', level: 'A1' },
  { inf: 'marcher', en: 'to walk', level: 'A1' },
  { inf: 'porter', en: 'to wear / to carry', level: 'A1' },
  { inf: 'fermer', en: 'to close', level: 'A1' },
  { inf: 'oublier', en: 'to forget', level: 'A2' },
  { inf: 'coûter', en: 'to cost', level: 'A1' },
  { inf: 'préparer', en: 'to prepare', level: 'A1' },
  { inf: 'téléphoner', en: 'to phone', level: 'A1' },
  { inf: 'commander', en: 'to order', level: 'A1' },
  { inf: 'utiliser', en: 'to use', level: 'A2' },
  { inf: 'rencontrer', en: 'to meet', level: 'A2' },
  { inf: 'passer', en: 'to spend (time) / to pass', level: 'A2' },
  { inf: 'quitter', en: 'to leave (a place / person)', level: 'A2' },
  { inf: 'louer', en: 'to rent', level: 'A2' },
  { inf: 'garder', en: 'to keep / to look after', level: 'A2' },
  { inf: 'nettoyer', en: 'to clean', level: 'A2', pres: ['nettoie', 'nettoies', 'nettoie', 'nettoyons', 'nettoyez', 'nettoient'], fut: 'nettoier' },
  { inf: 'ranger', en: 'to tidy', level: 'A2' },
  { inf: 'télécharger', en: 'to download', level: 'A2' },
  { inf: 'arriver', en: 'to arrive', level: 'A1', etre: true },
  { inf: 'rester', en: 'to stay', level: 'A1', etre: true },
  { inf: 'entrer', en: 'to go in', level: 'A1', etre: true },
  { inf: 'rentrer', en: 'to go home', level: 'A1', etre: true },
  { inf: 'tomber', en: 'to fall', level: 'A2', etre: true },
  { inf: 'monter', en: 'to go up / to get on', level: 'A2', etre: true },
  { inf: 'retourner', en: 'to go back', level: 'A2', etre: true },
  { inf: 'manger', en: 'to eat', level: 'A1' },
  { inf: 'voyager', en: 'to travel', level: 'A1' },
  { inf: 'nager', en: 'to swim', level: 'A1' },
  { inf: 'commencer', en: 'to begin', level: 'A1' },
  // Stem changers: the stressed syllable gets è / ll (like Spanish boot verbs, but only in spelling)
  { inf: 'acheter', en: 'to buy', level: 'A1', pres: ['achète', 'achètes', 'achète', 'achetons', 'achetez', 'achètent'], fut: 'achèter' },
  { inf: 'préférer', en: 'to prefer', level: 'A1', pres: ['préfère', 'préfères', 'préfère', 'préférons', 'préférez', 'préfèrent'] },
  { inf: 'payer', en: 'to pay', level: 'A1', pres: ['paie', 'paies', 'paie', 'payons', 'payez', 'paient'], fut: 'paier' },
  { inf: 'essayer', en: 'to try', level: 'A2', pres: ['essaie', 'essaies', 'essaie', 'essayons', 'essayez', 'essaient'], fut: 'essaier' },

  // --- Regular -ir verbs (the second group: nous finissons) -----------------------
  { inf: 'finir', en: 'to finish', level: 'A1', iss: true },
  { inf: 'choisir', en: 'to choose', level: 'A1', iss: true },
  { inf: 'réussir', en: 'to succeed / to pass', level: 'A2', iss: true },
  { inf: 'grandir', en: 'to grow up', level: 'A2', iss: true },

  // --- Regular -re verbs ------------------------------------------------------------
  { inf: 'attendre', en: 'to wait (for)', level: 'A1' },
  { inf: 'vendre', en: 'to sell', level: 'A1' },
  { inf: 'répondre', en: 'to answer', level: 'A1' },
  { inf: 'entendre', en: 'to hear', level: 'A1' },
  { inf: 'perdre', en: 'to lose', level: 'A2' },
  { inf: 'descendre', en: 'to go down / to get off', level: 'A2', etre: true },

  // --- Reflexive verbs (always être in the passé composé) -------------------------
  { inf: "s'appeler", en: 'to be called', level: 'A1', pres: ['appelle', 'appelles', 'appelle', 'appelons', 'appelez', 'appellent'], fut: 'appeller' },
  { inf: 'se lever', en: 'to get up', level: 'A1', pres: ['lève', 'lèves', 'lève', 'levons', 'levez', 'lèvent'], fut: 'lèver' },
  { inf: 'se réveiller', en: 'to wake up', level: 'A1' },
  { inf: 'se coucher', en: 'to go to bed', level: 'A1' },
  { inf: 'se laver', en: 'to wash (oneself)', level: 'A1' },
  { inf: 'se doucher', en: 'to shower', level: 'A1' },
  { inf: "s'habiller", en: 'to get dressed', level: 'A1' },
  { inf: 'se reposer', en: 'to rest', level: 'A1' },
  { inf: "s'amuser", en: 'to have fun', level: 'A2' },
  { inf: 'se sentir', en: 'to feel', level: 'A2', pres: ['sens', 'sens', 'sent', 'sentons', 'sentez', 'sentent'] },
  { inf: 'se promener', en: 'to go for a walk', level: 'A2', pres: ['promène', 'promènes', 'promène', 'promenons', 'promenez', 'promènent'], fut: 'promèner' },
];

export const VERB_MAP_FR: Record<string, VerbFr> = Object.fromEntries(VERBS_FR.map((v) => [v.inf, v]));
