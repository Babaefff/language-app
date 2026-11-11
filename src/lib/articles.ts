import { LANG } from '../data/lang';
import { lookupWord } from '../data/course';

/** Articles (and French "de"), the only words compared here. */
const ARTS: Record<string, string[]> = {
  es: ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas'],
  de: ['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer', 'eines'],
  fr: ['le', 'la', 'les', "l'", 'un', 'une', 'des', 'du', 'de', "d'"],
  ru: [],
};

const WHY: Record<string, { extra: string; missing: string }> = {
  es: {
    extra: 'No article here: for something in general or an amount you don’t count, Spanish leaves it out after the verb — no como carne (I don’t eat meat), bebo agua (I drink water). With the article it means one specific thing: no como la carne = I’m not eating the meat.',
    missing: 'Spanish needs the article here, even where English has none: things in general as the subject or after gustar / encantar take el, la, los, las — me gusta el café (I like coffee), los perros son fieles (dogs are loyal).',
  },
  de: {
    extra: 'No article here: for something in general or an amount you don’t count, German uses none — ich trinke Wasser, ich esse kein Fleisch. With an article it means one specific thing (das Wasser = the water).',
    missing: 'German needs an article here: a single countable thing almost always has der / die / das or ein / eine — ich habe einen Bruder, das ist ein Hund.',
  },
  fr: {
    extra: 'After a negation or an amount, French uses just de: je ne mange pas de viande, beaucoup de pain. And no article after être for jobs: il est médecin.',
    missing: 'French nouns almost always need an article: du / de la / des for “some” (je bois du café), le / la / les for things in general (j’aime le café).',
  },
};

const tokens = (s: string) => s.toLowerCase().replace(/[¿?¡!.,;:"“”«»()…]/g, ' ').replace(/(\p{L})'(?=\p{L})/gu, "$1' ").split(/\s+/).filter(Boolean);

/**
 * Why the answer is wrong, when the only difference is an article: one too many, one missing, or
 * the wrong one (gender). Undefined when anything else differs too.
 */
export function articleHint(typed: string, expected: string): string | undefined {
  const arts = ARTS[LANG] ?? [];
  if (!arts.length) return undefined;
  const a = tokens(typed), b = tokens(expected);
  const isArt = (w: string) => arts.includes(w);
  // Same words once the articles are taken out?
  const strip = (ws: string[]) => ws.filter((w) => !isArt(w));
  if (strip(a).join(' ') !== strip(b).join(' ')) return undefined;
  const ta = a.filter(isArt), tb = b.filter(isArt);
  if (ta.join(' ') === tb.join(' ')) return undefined;
  const why = WHY[LANG];
  if (ta.length > tb.length) return why?.extra;
  if (ta.length < tb.length) return why?.missing;
  // Same number of articles, a different one: say which gender the noun has.
  const i = b.findIndex((w, k) => isArt(w) && a[k] !== w);
  const noun = b[i + 1];
  const entry = noun ? lookupWord(noun, false) : undefined;
  const g = entry?.es.split(' ')[0];
  return g && g.toLowerCase() !== noun ? `${a[i]} → ${b[i]}: ${entry!.es} — the article follows the noun’s gender (and case).` : `${a[i]} → ${b[i]}.`;
}
