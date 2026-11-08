/**
 * The language being studied. Chosen in the header; stored per browser. Switching reloads the
 * app so every module picks up the matching course (each language keeps its own progress).
 * Scripts and tests choose with the HABLO_LANG environment variable.
 */
export type LangId = 'es' | 'de' | 'fr' | 'ru';

export interface LangInfo {
  id: LangId;
  name: string;
  native: string;
  flag: string;
  /** BCP-47 tag for speech and the `lang` attribute. */
  tts: string;
  hello: string;
  wordOfDay: string;
  /** Extra characters offered under text inputs. */
  keys: string[];
  levels: Record<'A1' | 'A2' | 'B1', string>;
}

export const LANGS: Record<LangId, LangInfo> = {
  es: {
    id: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸', tts: 'es-ES', hello: '¡Hola!', wordOfDay: 'Palabra del día',
    keys: ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'],
    levels: {
      A1: 'Greetings, numbers, family, home, food, daily routine and the present tense.',
      A2: 'Shopping, health, travel and talking about the past.',
      B1: 'Future plans, advice, wishes, opinions, feelings and instructions.',
    },
  },
  de: {
    id: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪', tts: 'de-DE', hello: 'Hallo!', wordOfDay: 'Wort des Tages',
    keys: ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'],
    levels: {
      A1: 'Greetings, numbers, family, home, food, daily routine, der/die/das and the present tense.',
      A2: 'Shopping, health, travel, work, the past, the dative case and adjective endings.',
      B1: 'Plans, advice, work, the environment, feelings, media — Konjunktiv II, relative clauses and the passive.',
    },
  },
  fr: {
    id: 'fr', name: 'French', native: 'Français', flag: '🇫🇷', tts: 'fr-FR', hello: 'Bonjour !', wordOfDay: 'Mot du jour',
    keys: ['é', 'è', 'ê', 'à', 'â', 'ç', 'ù', 'û', 'î', 'ï', 'ô', 'ë', 'œ'],
    levels: {
      A1: 'Greetings, numbers, family, home, food, daily routine, le/la, être and avoir and the present tense.',
      A2: 'Shopping, health, travel and talking about the past: passé composé and imparfait.',
      B1: 'Plans, advice, wishes and opinions: the future, the conditional and the subjunctive.',
    },
  },
  ru: {
    id: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺', tts: 'ru-RU', hello: 'Привет!', wordOfDay: 'Слово дня',
    keys: ['ё', 'й', 'ъ', 'ь', 'ы', 'э', 'щ'],
    levels: {
      A1: 'The Cyrillic alphabet, greetings, family, home, food, numbers, the present and past tense, and the cases you need first.',
      A2: 'Shopping, health, travel, work and the past: verb aspect, verbs of motion and all six cases.',
      B1: 'Plans, opinions, society and media: the conditional, participles, complex sentences.',
    },
  },
};

const STORAGE_KEY = 'hablo:lang';

function detect(): LangId {
  try {
    const env = typeof process !== 'undefined' ? process.env?.HABLO_LANG : undefined;
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    const v = env ?? stored;
    return v === 'de' || v === 'fr' || v === 'ru' ? v : 'es';
  } catch {
    return 'es';
  }
}

export const LANG: LangId = detect();
export const L = LANGS[LANG];

/** Switches the studied language and reloads the app. */
export function switchLanguage(id: LangId) {
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // storage blocked: the switch lasts until reload only
  }
  // Pages for one text, unit or lesson don't exist in the other language: open their list instead.
  const parents: [RegExp, string][] = [[/^#\/reading\/.+/, '#/reading'], [/^#\/songs\/.+/, '#/songs'], [/^#\/unit\/.+/, '#/course'], [/^#\/grammar\/.+/, '#/grammar'], [/^#\/exam\/.+/, '#/exam'], [/^#\/writing\/.+/, '#/writing']];
  const parent = parents.find(([re]) => re.test(window.location.hash))?.[1];
  if (parent) window.history.replaceState(null, '', parent);
  window.location.reload();
}
