import type { Tense } from '../data/types';
import { VERB_MAP_DE, VERBS_DE, type VerbDe } from '../data/verbs-de';

/** German conjugation. Tense ids are shared with Spanish; labels differ (see TENSES_DE). */
export const PERSONS_DE = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
export const IMP_PERSONS_DE = ['—', 'du', 'Sie', 'wir', 'ihr', '—'];

export const TENSES_DE: { id: Tense; es: string; en: string; level: 'A1' | 'A2' | 'B1'; hint: string }[] = [
  { id: 'presente', es: 'Präsens', en: 'Present', level: 'A1', hint: 'I play / I am playing' },
  { id: 'perfecto', es: 'Perfekt', en: 'Present perfect (spoken past)', level: 'A1', hint: 'haben/sein + participle: I have played / I played' },
  { id: 'preterito', es: 'Präteritum', en: 'Simple past', level: 'A2', hint: 'Written past: I played' },
  { id: 'futuro', es: 'Futur I', en: 'Future', level: 'A2', hint: 'werden + infinitive: I will play' },
  { id: 'condicional', es: 'Konjunktiv II', en: 'Conditional', level: 'B1', hint: 'würde + infinitive: I would play' },
  { id: 'imperativo', es: 'Imperativ', en: 'Imperative', level: 'A1', hint: 'Commands: play!' },
];

const PRESENT = ['e', 'st', 't', 'en', 't', 'en'];
const WEAK_PAST = ['te', 'test', 'te', 'ten', 'tet', 'ten'];
const STRONG_PAST = ['', 'st', '', 'en', 't', 'en'];
const WUERDE = ['würde', 'würdest', 'würde', 'würden', 'würdet', 'würden'];
const WERDEN = ['werde', 'wirst', 'wird', 'werden', 'werdet', 'werden'];
const HABEN = ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'];
const SEIN = ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'];

interface Parsed {
  def: VerbDe;
  /** The verb without its separable prefix (aufstehen → stehen), whose rules apply. */
  core: VerbDe;
  coreInf: string;
  prefix: string;
  stem: string;
  /** -eln/-ern verbs keep the e: wir wandern. */
  shortPlural: boolean;
}

function parse(def: VerbDe): Parsed {
  const prefix = def.prefix ?? '';
  const coreInf = def.inf.slice(prefix.length);
  const core = prefix ? (VERB_MAP_DE[coreInf] ?? { inf: coreInf, en: '', level: def.level }) : def;
  const shortPlural = /[lr]n$/.test(coreInf) && !coreInf.endsWith('en');
  const stem = shortPlural ? coreInf.slice(0, -1) : coreInf.replace(/e?n$/, '');
  return { def, core, coreInf, prefix, stem, shortPlural };
}

/** arbeit-e-st, öffn-e-t: stems in d/t, or consonant + m/n, need a linking e. */
const needsE = (stem: string) => /[dt]$/.test(stem) || /[^aeiouäöülrmnh][mn]$/.test(stem);
/** heiß-t, tanz-t, lies-t: du drops its s after s/ß/z/x. */
const sibilant = (stem: string) => /(s|ß|z|x)$/.test(stem);

const withPrefix = (form: string, p: Parsed) => (p.prefix ? `${form} ${p.prefix}` : form);

function presentCore(p: Parsed): string[] {
  const over = p.core.over?.presente;
  if (over) return over;
  return PRESENT.map((e, i) => {
    const changed = (i === 1 || i === 2) && p.core.pres;
    const stem = changed ? p.core.pres! : p.stem;
    if (p.shortPlural && (i === 3 || i === 5)) return stem + 'n';
    if (i === 1 && sibilant(stem)) return stem + 't';
    if ((i === 1 || i === 2 || i === 4) && needsE(stem) && !changed) return stem + 'e' + e;
    return stem + e;
  });
}

function pastCore(p: Parsed): string[] {
  const over = p.core.over?.preterito;
  if (over) return over;
  const pret = p.core.pret;
  if (pret && pret.endsWith('te')) return WEAK_PAST.map((e) => pret.slice(0, -2) + e);
  if (pret) return STRONG_PAST.map((e, i) => pret + (i === 4 && /[dt]$/.test(pret) ? 'et' : e));
  const stem = needsE(p.stem) ? p.stem + 'e' : p.stem;
  return WEAK_PAST.map((e) => stem + e);
}

export function participleDe(def: VerbDe): string {
  const p = parse(def);
  let part = p.core.part;
  if (!part) {
    const ge = p.core.insep || p.coreInf.endsWith('ieren') ? '' : 'ge';
    part = ge + p.stem + (needsE(p.stem) ? 'et' : 't');
  }
  return p.prefix + part;
}

const auxForms = (def: VerbDe) => (def.sein ? SEIN : HABEN);

function imperative(p: Parsed): (string | null)[] {
  const over = p.def.over?.imperativo ?? p.core.over?.imperativo;
  if (over) return over;
  // e → i/ie verbs keep the change (lies!, nimm!); a → ä verbs don't (fahr!).
  const duStem = p.core.pres && !/[äöü]/.test(p.core.pres) ? p.core.pres : p.stem + (needsE(p.stem) ? 'e' : '');
  const ihr = presentCore(p)[4];
  return [null, withPrefix(duStem, p), withPrefix(`${p.coreInf} Sie`, p), withPrefix(`${p.coreInf} wir`, p), withPrefix(ihr, p), null];
}

export function conjugateDe(inf: string, tense: Tense): (string | null)[] {
  const def = VERB_MAP_DE[inf];
  if (!def) throw new Error(`unknown verb: ${inf}`);
  const p = parse(def);
  switch (tense) {
    case 'presente':
      return presentCore(p).map((f) => withPrefix(f, p));
    case 'preterito':
      return pastCore(p).map((f) => withPrefix(f, p));
    case 'perfecto': {
      const part = participleDe(def);
      return auxForms(def).map((a) => `${a} ${part}`);
    }
    case 'futuro':
      return WERDEN.map((w) => `${w} ${def.inf}`);
    case 'condicional':
      return def.over?.condicional ?? WUERDE.map((w) => `${w} ${def.inf}`);
    case 'imperativo':
      return imperative(p);
    default:
      return [null, null, null, null, null, null];
  }
}

export interface FormPartsDe {
  pre: string;
  stem: string;
  ending: string;
  changed: boolean;
  /** Separable prefix shown after the verb (stehe … auf). */
  post?: string;
}

/** Stem/ending split for teaching tables. Compound tenses show the helper verb separately. */
export function splitFormsDe(inf: string, tense: Tense): (FormPartsDe | null)[] {
  const def = VERB_MAP_DE[inf];
  const p = parse(def);
  return conjugateDe(inf, tense).map((full, i) => {
    if (!full) return null;
    if (tense === 'perfecto' || tense === 'futuro' || (tense === 'condicional' && !def.over?.condicional)) {
      const [aux, ...rest] = full.split(' ');
      return { pre: aux, stem: rest.join(' '), ending: '', changed: tense === 'perfecto' && !!p.core.part };
    }
    let form = full;
    let post: string | undefined;
    if (p.prefix && form.endsWith(' ' + p.prefix)) {
      form = form.slice(0, -p.prefix.length - 1);
      post = p.prefix;
    }
    if (tense === 'imperativo') return { pre: '', stem: form, ending: '', changed: false, post };
    const endings = tense === 'presente' ? PRESENT : p.core.pret && !p.core.pret.endsWith('te') ? STRONG_PAST : WEAK_PAST;
    let e = endings[i];
    if (p.shortPlural && tense === 'presente' && (i === 3 || i === 5)) e = 'n';
    if (tense === 'presente' && i === 1 && !form.endsWith('st')) e = 't';
    if (!e || !form.endsWith(e) || form.length === e.length) {
      return { pre: '', stem: form, ending: '', changed: !!(p.core.over || p.core.pres || p.core.pret), post };
    }
    let stem = form.slice(0, -e.length);
    if (stem.endsWith('e') && needsE(stem.slice(0, -1)) && stem.slice(0, -1) === p.stem) {
      stem = stem.slice(0, -1);
      e = 'e' + e;
    }
    return { pre: '', stem, ending: e, changed: stem !== p.stem && !(tense === 'preterito' && !p.core.pret), post };
  });
}

export function allFormsDe(): { inf: string; tense: Tense; person: number; form: string }[] {
  const out: { inf: string; tense: Tense; person: number; form: string }[] = [];
  for (const v of VERBS_DE) {
    for (const t of ['presente', 'preterito', 'imperativo'] as Tense[]) {
      conjugateDe(v.inf, t).forEach((f, person) => {
        if (f) out.push({ inf: v.inf, tense: t, person, form: f.split(' ')[0] });
      });
    }
  }
  return out;
}
