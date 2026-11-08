/**
 * The language being studied. Chosen in the header; stored per browser. Switching reloads the
 * app so every module picks up the matching course (each language keeps its own progress).
 * Scripts and tests choose with the HABLO_LANG environment variable.
 */
export type LangId = 'es' | 'de';

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
};

const STORAGE_KEY = 'hablo:lang';

function detect(): LangId {
  try {
    const env = typeof process !== 'undefined' ? process.env?.HABLO_LANG : undefined;
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    const v = env ?? stored;
    return v === 'de' ? 'de' : 'es';
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
