import type { Tense } from '../data/types';
import { VERB_MAP_FR, VERBS_FR, type VerbFr } from '../data/verbs-fr';

/** French conjugation. Tense ids are shared with Spanish; labels differ (see TENSES_FR). */
export const PERSONS_FR = ["je / j'", 'tu', 'il / elle / on', 'nous', 'vous', 'ils / elles'];
export const IMP_PERSONS_FR = ['—', 'tu', '—', 'nous', 'vous', '—'];

export const TENSES_FR: { id: Tense; es: string; en: string; level: 'A1' | 'A2' | 'B1'; hint: string }[] = [
  { id: 'presente', es: 'Présent', en: 'Present', level: 'A1', hint: 'I speak / I am speaking' },
  { id: 'imperativo', es: 'Impératif', en: 'Imperative', level: 'A1', hint: 'Commands: speak!' },
  { id: 'perfecto', es: 'Passé composé', en: 'Perfect (spoken past)', level: 'A2', hint: 'avoir/être + participle: I spoke / I have spoken' },
  { id: 'imperfecto', es: 'Imparfait', en: 'Imperfect', level: 'A2', hint: 'Background / habit: I was speaking / I used to speak' },
  { id: 'futuro', es: 'Futur simple', en: 'Future', level: 'B1', hint: 'I will speak' },
  { id: 'condicional', es: 'Conditionnel', en: 'Conditional', level: 'B1', hint: 'I would speak' },
  { id: 'subjuntivo', es: 'Subjonctif présent', en: 'Present subjunctive', level: 'B1', hint: '(that) I speak — after il faut que, vouloir que, feelings' },
];

const END = {
  er: ['e', 'es', 'e', 'ons', 'ez', 'ent'],
  iss: ['is', 'is', 'it', 'issons', 'issez', 'issent'],
  re: ['s', 's', '', 'ons', 'ez', 'ent'],
  imp: ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'],
  fut: ['ai', 'as', 'a', 'ons', 'ez', 'ont'],
  subj: ['e', 'es', 'e', 'ions', 'iez', 'ent'],
};
const AVOIR = ['ai', 'as', 'a', 'avons', 'avez', 'ont'];
const ETRE = ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'];
const REFL = ['me', 'te', 'se', 'nous', 'vous', 'se'];
const REFL_IMP = ['', 'toi', '', 'nous', 'vous', ''];

interface Parsed {
  def: VerbFr;
  reflexive: boolean;
  /** The verb without se / s'. */
  base: string;
  group: 'er' | 'iss' | 're' | 'ir';
  stem: string;
}

function parse(def: VerbFr): Parsed {
  const m = /^(se |s')(.+)$/.exec(def.inf);
  const base = m ? m[2] : def.inf;
  const group = base.endsWith('er') ? 'er' : base.endsWith('re') ? 're' : def.iss ? 'iss' : 'ir';
  return { def, reflexive: !!m, base, group, stem: base.slice(0, -2) };
}

/** -cer / -ger keep their soft sound before a or o: commençons, mangeons, mangeais. */
function join(p: Parsed, stem: string, end: string): string {
  if (p.base.endsWith('cer')) {
    if (stem.endsWith('c') && /^[aoâ]/.test(end)) return stem.slice(0, -1) + 'ç' + end;
    if (stem.endsWith('ç') && /^[ei]/.test(end)) return stem.slice(0, -1) + 'c' + end;
  }
  if (p.base.endsWith('ger')) {
    if (stem.endsWith('g') && /^[aoâ]/.test(end)) return stem + 'e' + end;
    if (stem.endsWith('ge') && /^[ei]/.test(end)) return stem.slice(0, -1) + end;
  }
  return stem + end;
}

const vowel = (s: string) => /^[aeiouyéèêâîôûœh]/i.test(s);
/** me + appelle → m'appelle. */
const withPronoun = (pron: string, form: string) => (pron.length === 2 && vowel(form) ? pron[0] + "'" + form : `${pron} ${form}`);

function present(p: Parsed): string[] {
  if (p.def.pres) return p.def.pres;
  const end = p.group === 'iss' ? END.iss : p.group === 're' ? END.re : END.er;
  return end.map((e) => join(p, p.stem, e));
}

/** Imparfait stem: the nous form without -ons (finissons → finiss-), except être (ét-). */
const impStem = (p: Parsed) => p.def.imp ?? present(p)[3].replace(/ons$/, '');
/** Future stem: the infinitive (-re drops its e), unless irregular (ir-, aur-, fer-…). */
const futStem = (p: Parsed) => p.def.fut ?? (p.group === 're' ? p.base.slice(0, -1) : p.base);
/** Subjunctive: je/tu/il/ils from the ils stem (prennent → prenn-), nous/vous from the imparfait. */
const subjStem = (p: Parsed) => present(p)[5].replace(/ent$/, '');

export function participleFr(def: VerbFr): string {
  if (def.part) return def.part;
  const p = parse(def);
  return p.group === 'er' ? p.stem + 'é' : p.group === 're' ? p.stem + 'u' : p.base.slice(0, -1);
}

const usesEtre = (p: Parsed) => p.reflexive || !!p.def.etre;

function simple(p: Parsed, tense: Tense): string[] | null {
  switch (tense) {
    case 'presente': return present(p);
    case 'imperfecto': return END.imp.map((e) => join(p, impStem(p), e));
    case 'futuro': return END.fut.map((e) => futStem(p) + e);
    case 'condicional': return END.imp.map((e) => futStem(p) + e);
    case 'subjuntivo': return p.def.subj ?? END.subj.map((e, i) => (i === 3 || i === 4 ? join(p, impStem(p), e) : subjStem(p) + e));
    default: return null;
  }
}

export function conjugateFr(inf: string, tense: Tense): (string | null)[] {
  const def = VERB_MAP_FR[inf];
  if (!def) return [null, null, null, null, null, null];
  const p = parse(def);
  if (tense === 'perfecto') {
    const part = participleFr(def);
    return (usesEtre(p) ? ETRE : AVOIR).map((aux, i) => {
      const pp = usesEtre(p) && i >= 3 ? part + 's' : part;
      return p.reflexive ? withPronoun(REFL[i], `${aux} ${pp}`) : `${aux} ${pp}`;
    });
  }
  if (tense === 'imperativo') {
    const pres = present(p);
    // tu: the present without its s for -er verbs (and aller, ouvrir): parle, va, ouvre.
    const tu = /es$|^vas$/.test(pres[1]) ? pres[1].slice(0, -1) : pres[1];
    const [t, n, v] = def.imper ?? [tu, pres[3], pres[4]];
    const r = (f: string | null, i: number) => (f && p.reflexive ? `${f}-${REFL_IMP[i]}` : f);
    return [null, r(t, 1), null, r(n, 3), r(v, 4), null];
  }
  const forms = simple(p, tense);
  if (!forms) return [null, null, null, null, null, null];
  return p.reflexive ? forms.map((f, i) => withPronoun(REFL[i], f)) : forms;
}

export interface FormPartsFr {
  pre: string;
  stem: string;
  ending: string;
  changed: boolean;
  post?: string;
}

/** Splits forms into stem + ending for the teaching tables. */
export function splitFormsFr(inf: string, tense: Tense): (FormPartsFr | null)[] {
  const def = VERB_MAP_FR[inf];
  const p = parse(def);
  return conjugateFr(inf, tense).map((full, i) => {
    if (!full) return null;
    if (tense === 'perfecto') {
      const words = full.split(' ');
      const part = words.pop()!;
      return { pre: words.join(' '), stem: part, ending: '', changed: !!def.part };
    }
    if (tense === 'imperativo') {
      const [f, post] = full.split('-');
      return { pre: '', stem: f, ending: '', changed: !!def.imper, post: post ? '-' + post : undefined };
    }
    let pre = '';
    let form = full;
    if (p.reflexive) {
      const m = /^(\S+?'|\S+ )(.+)$/.exec(full)!;
      pre = m[1].trim();
      form = m[2];
    }
    const regular: Record<string, [string, string[]]> = {
      presente: p.group === 'iss' ? [p.base.slice(0, -2), END.iss] : [p.stem, p.group === 're' ? END.re : END.er],
      imperfecto: [impStem(p), END.imp],
      futuro: [futStem(p), END.fut],
      condicional: [futStem(p), END.imp],
      subjuntivo: [i === 3 || i === 4 ? impStem(p) : subjStem(p), END.subj],
    };
    const [stem0, ends] = regular[tense];
    // Irregular presents still mostly end in -s, -s, -t / -x, -x, -t.
    const extra = tense === 'presente' ? [['s', 'x'], ['s', 'x'], ['t', 'a'], ['ons'], ['es', 'ez'], ['ent', 'ont']][i] : [];
    const candidates = ends[i] ? [ends[i], ...extra] : [...extra, ''];
    const e = candidates.find((c) => form.endsWith(c) && form.length > c.length) ?? '';
    const stem = form.slice(0, form.length - e.length);
    const regStem = join(p, stem0, e).slice(0, -e.length || undefined);
    return { pre, stem, ending: e, changed: !!(def.pres || def.subj) && stem !== regStem && stem !== stem0 };
  });
}

export function allFormsFr(): { inf: string; tense: Tense; person: number; form: string }[] {
  const out: { inf: string; tense: Tense; person: number; form: string }[] = [];
  for (const v of VERBS_FR) {
    for (const t of TENSES_FR) {
      conjugateFr(v.inf, t.id).forEach((f, person) => {
        if (f && !f.includes(' ') && !f.includes("'")) out.push({ inf: v.inf, tense: t.id, person, form: f });
      });
    }
  }
  return out;
}
