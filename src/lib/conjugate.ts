import { VERB_MAP, VERBS, type Forms, type StemChange, type VerbDef } from '../data/verbs';
import type { Level, Tense } from '../data/types';

export const PERSONS = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ellas/ustedes'];
export const IMP_PERSONS = ['—', 'tú', 'usted', 'nosotros', 'vosotros', 'ustedes'];
const REFLEXIVE = ['me', 'te', 'se', 'nos', 'os', 'se'];

export const TENSES: { id: Tense; es: string; en: string; level: Level; hint: string }[] = [
  { id: 'presente', es: 'Presente', en: 'Present', level: 'A1', hint: 'I speak / I am speaking' },
  { id: 'progresivo', es: 'Presente continuo', en: 'Present progressive', level: 'A1', hint: 'estar + gerund: I am speaking (right now)' },
  { id: 'preterito', es: 'Pretérito indefinido', en: 'Preterite', level: 'A2', hint: 'Finished past: I spoke' },
  { id: 'imperfecto', es: 'Pretérito imperfecto', en: 'Imperfect', level: 'A2', hint: 'Habitual/ongoing past: I used to speak / I was speaking' },
  { id: 'perfecto', es: 'Pretérito perfecto', en: 'Present perfect', level: 'A2', hint: 'haber + participle: I have spoken' },
  { id: 'futuro', es: 'Futuro simple', en: 'Future', level: 'B1', hint: 'I will speak' },
  { id: 'condicional', es: 'Condicional', en: 'Conditional', level: 'B1', hint: 'I would speak' },
  { id: 'subjuntivo', es: 'Presente de subjuntivo', en: 'Present subjunctive', level: 'B1', hint: '(that) I speak — after wishes, doubts, emotions' },
  { id: 'imperativo', es: 'Imperativo', en: 'Imperative', level: 'B1', hint: 'Commands: speak!' },
];

export const TENSE_MAP = Object.fromEntries(TENSES.map((t) => [t.id, t])) as Record<Tense, (typeof TENSES)[number]>;

const ENDINGS = {
  presente: { ar: ['o', 'as', 'a', 'amos', 'áis', 'an'], er: ['o', 'es', 'e', 'emos', 'éis', 'en'], ir: ['o', 'es', 'e', 'imos', 'ís', 'en'] },
  preterito: { ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'], er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'], ir: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'] },
  imperfecto: { ar: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'], er: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'], ir: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'] },
  subjuntivo: { ar: ['e', 'es', 'e', 'emos', 'éis', 'en'], er: ['a', 'as', 'a', 'amos', 'áis', 'an'], ir: ['a', 'as', 'a', 'amos', 'áis', 'an'] },
};
const FUTURE = ['é', 'ás', 'á', 'emos', 'éis', 'án'];
const CONDITIONAL = ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'];
const STRONG_PRET = ['e', 'iste', 'o', 'imos', 'isteis', 'ieron'];
const VOWEL_PRET = ['í', 'íste', 'yó', 'ímos', 'ísteis', 'yeron'];
/** Persons whose stem changes in the present ("boot" verbs). */
const BOOT = [true, true, true, false, false, true];

type VerbType = 'ar' | 'er' | 'ir';

interface Parsed {
  def: VerbDef;
  reflexive: boolean;
  base: string;
  type: VerbType;
  stem: string;
}

function parse(def: VerbDef): Parsed {
  const reflexive = def.inf.endsWith('se');
  const base = reflexive ? def.inf.slice(0, -2) : def.inf;
  return { def, reflexive, base, type: base.slice(-2) as VerbType, stem: base.slice(0, -2) };
}

function replaceLast(s: string, from: string, to: string): string {
  const i = s.lastIndexOf(from);
  return i < 0 ? s : s.slice(0, i) + to + s.slice(i + from.length);
}

/** Strong stem change: pensar → piens-, dormir → duerm-, pedir → pid-. */
function strongStem(stem: string, change?: StemChange): string {
  switch (change) {
    case 'ie': return replaceLast(stem, 'e', 'ie');
    case 'ue': return replaceLast(stem, 'o', 'ue');
    case 'i': return replaceLast(stem, 'e', 'i');
    case 'u-ue': return replaceLast(stem, 'u', 'ue');
    default: return stem;
  }
}

/** Weak -ir change used in preterite (3rd person), gerund and subjunctive nosotros/vosotros. */
function weakStem(p: Parsed): string {
  if (p.type !== 'ir' || !p.def.stem) return p.stem;
  if (p.def.stem === 'ue') return replaceLast(p.stem, 'o', 'u');
  return replaceLast(p.stem, 'e', 'i');
}

/** Spelling changes for -ar verbs before an e: busqué, llegué, empecé. */
function softenBeforeE(stem: string): string {
  if (stem.endsWith('c')) return stem.slice(0, -1) + 'qu';
  if (stem.endsWith('g')) return stem.slice(0, -1) + 'gu';
  if (stem.endsWith('z')) return stem.slice(0, -1) + 'c';
  return stem;
}

const endsInVowel = (s: string) => /[aeo]$/.test(s);

function present(p: Parsed): string[] {
  const over = p.def.over?.presente;
  if (over) return over as string[];
  const endings = ENDINGS.presente[p.type];
  const changed = strongStem(p.stem, p.def.stem);
  return endings.map((e, i) => (i === 0 && p.def.yo ? p.def.yo : (BOOT[i] ? changed : p.stem) + e));
}

function preterite(p: Parsed): string[] {
  const over = p.def.over?.preterito;
  if (over) return over as string[];
  if (p.def.pret) {
    const strong = p.def.pret;
    return STRONG_PRET.map((e, i) => strong + (i === 5 && strong.endsWith('j') ? 'eron' : e));
  }
  if (p.type === 'ar') {
    return ENDINGS.preterito.ar.map((e, i) => (i === 0 ? softenBeforeE(p.stem) : p.stem) + e);
  }
  if (endsInVowel(p.stem)) return VOWEL_PRET.map((e) => p.stem + e);
  const weak = weakStem(p);
  return ENDINGS.preterito[p.type].map((e, i) => (i === 2 || i === 5 ? weak : p.stem) + e);
}

function imperfect(p: Parsed): string[] {
  return (p.def.over?.imperfecto as string[]) ?? ENDINGS.imperfecto[p.type].map((e) => p.stem + e);
}

function subjunctive(p: Parsed): string[] {
  const over = p.def.over?.subjuntivo;
  if (over) return over as string[];
  const endings = ENDINGS.subjuntivo[p.type];
  const fix = (s: string) => (p.type === 'ar' ? softenBeforeE(s) : s);
  const yoForm = present(p)[0];
  if ((p.def.yo || p.def.over?.presente) && yoForm.endsWith('o')) {
    const s = yoForm.slice(0, -1);
    return endings.map((e) => s + e);
  }
  const changed = strongStem(p.stem, p.def.stem);
  const weak = weakStem(p);
  return endings.map((e, i) => fix(BOOT[i] ? changed : i === 3 || i === 4 ? weak : p.stem) + e);
}

export function participle(def: VerbDef): string {
  if (def.part) return def.part;
  const p = parse(def);
  if (p.type === 'ar') return p.stem + 'ado';
  return p.stem + (endsInVowel(p.stem) ? 'ído' : 'ido');
}

export function gerund(def: VerbDef): string {
  if (def.ger) return def.ger;
  const p = parse(def);
  if (p.type === 'ar') return p.stem + 'ando';
  if (endsInVowel(p.stem)) return p.stem + 'yendo';
  return weakStem(p) + 'iendo';
}

function simple(p: Parsed, tense: Tense): string[] {
  switch (tense) {
    case 'presente': return present(p);
    case 'preterito': return preterite(p);
    case 'imperfecto': return imperfect(p);
    case 'subjuntivo': return subjunctive(p);
    case 'futuro': return FUTURE.map((e) => (p.def.fut ?? p.base) + e);
    case 'condicional': return CONDITIONAL.map((e) => (p.def.fut ?? p.base) + e);
    default: throw new Error(`not a simple tense: ${tense}`);
  }
}

function imperative(p: Parsed): Forms {
  const over = p.def.over?.imperativo;
  if (over) return over;
  // Reflexive commands need the pronoun attached plus a written accent (levántate); not drilled yet.
  if (p.reflexive) return [null, null, null, null, null, null];
  const subj = subjunctive(p);
  return [null, p.def.impTu ?? present(p)[2], subj[2], subj[3], p.base.slice(0, -1) + 'd', subj[5]];
}

/** Returns the six forms (yo … ellos) of `inf` in `tense`. Imperative slot 0 is always null. */
export function conjugate(inf: string, tense: Tense): Forms {
  const def = VERB_MAP[inf];
  if (!def) throw new Error(`unknown verb: ${inf}`);
  const p = parse(def);
  if (tense === 'imperativo') return imperative(p);

  let forms: string[];
  if (tense === 'perfecto') {
    const part = participle(def);
    forms = present(parse(VERB_MAP.haber)).map((h) => `${h} ${part}`);
  } else if (tense === 'progresivo') {
    const ger = gerund(def);
    forms = present(parse(VERB_MAP.estar)).map((e) => `${e} ${ger}`);
  } else {
    forms = simple(p, tense);
  }
  return p.reflexive ? forms.map((f, i) => `${REFLEXIVE[i]} ${f}`) : forms;
}

export interface FormInfo {
  inf: string;
  tense: Tense | 'participio' | 'gerundio';
  person: number;
}

let formIndex: Map<string, FormInfo[]> | null = null;

/** Reverse lookup: a single-word verb form (fui, tengo, hablaste…) → which verb/tense/person it is. */
export function lookupForm(form: string): FormInfo[] {
  if (!formIndex) {
    formIndex = new Map();
    const add = (f: string, info: FormInfo) => {
      const list = formIndex!.get(f) ?? [];
      if (!list.some((x) => x.inf === info.inf && x.tense === info.tense)) list.push(info);
      formIndex!.set(f, list);
    };
    for (const v of VERBS) {
      for (const t of ['presente', 'preterito', 'imperfecto', 'futuro', 'condicional', 'subjuntivo', 'imperativo'] as Tense[]) {
        conjugate(v.inf, t).forEach((f, person) => {
          if (f) add(f.split(' ').pop()!, { inf: v.inf, tense: t, person });
        });
      }
      add(participle(v), { inf: v.inf, tense: 'participio', person: -1 });
      add(gerund(v), { inf: v.inf, tense: 'gerundio', person: -1 });
    }
  }
  return formIndex.get(form.toLowerCase()) ?? [];
}

export interface FormParts {
  /** Reflexive pronoun or auxiliary (me, he, estoy…), if any. */
  pre: string;
  stem: string;
  ending: string;
  /** The stem differs from the regular one (stem change or irregular verb). */
  changed: boolean;
}

/**
 * Splits each form into stem + ending for teaching tables: habl|o, piens|o, tuv|e.
 * Forms that don't end in the expected ending (soy, voy, fui) come back whole with `changed`.
 */
export function splitForms(inf: string, tense: Tense): (FormParts | null)[] {
  const def = VERB_MAP[inf];
  if (!def) throw new Error(`unknown verb: ${inf}`);
  const p = parse(def);
  const forms = conjugate(inf, tense);
  return forms.map((full, i) => {
    if (!full) return null;
    const words = full.split(' ');
    const form = words.pop()!;
    const pre = words.join(' ');
    if (tense === 'perfecto' || tense === 'progresivo') {
      const ending = form.match(/(ado|ido|ído|ando|iendo|yendo)$/)?.[0] ?? '';
      const stem = form.slice(0, form.length - ending.length);
      return { pre, stem, ending, changed: !ending || (stem !== p.stem && !p.def.part) };
    }
    let regularStem = p.stem;
    let expected: string;
    if (tense === 'futuro' || tense === 'condicional') {
      regularStem = p.base;
      expected = (tense === 'futuro' ? FUTURE : CONDITIONAL)[i];
    } else if (tense === 'imperativo') {
      expected = i === 4 ? 'd' : i === 1 ? ENDINGS.presente[p.type][2] : ENDINGS.subjuntivo[p.type][i === 2 ? 2 : i === 3 ? 3 : 5];
      if (i === 4) regularStem = p.base.slice(0, -1);
    } else if (tense === 'preterito' && p.def.pret && !p.def.over?.preterito) {
      expected = i === 5 && p.def.pret.endsWith('j') ? 'eron' : STRONG_PRET[i];
    } else if (tense === 'preterito' && p.type !== 'ar' && endsInVowel(p.stem)) {
      expected = VOWEL_PRET[i];
    } else {
      expected = ENDINGS[tense as 'presente' | 'preterito' | 'imperfecto' | 'subjuntivo'][p.type][i];
    }
    if (!form.endsWith(expected) || form.length === expected.length) return { pre, stem: form, ending: '', changed: true };
    const stem = form.slice(0, -expected.length);
    return { pre, stem, ending: expected, changed: stem !== regularStem };
  });
}
