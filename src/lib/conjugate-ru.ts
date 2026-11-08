import type { Tense } from '../data/types';
import { VERB_MAP_RU, VERBS_RU, type VerbRu } from '../data/verbs-ru';

/** Russian conjugation. Tense ids are shared with Spanish; labels differ (see TENSES_RU). */
export const PERSONS_RU = ['я', 'ты', 'он / она', 'мы', 'вы', 'они'];
export const IMP_PERSONS_RU = ['—', 'ты', '—', '—', 'вы', '—'];
/** The past and the conditional change by gender and number, not by person. */
export const GENDER_ROWS_RU = ['он (m)', 'она (f)', 'оно (n)', 'они (pl)', '', ''];
export const usesGenderRows = (tense: Tense) => tense === 'preterito' || tense === 'condicional';

export const TENSES_RU: { id: Tense; es: string; en: string; level: 'A1' | 'A2' | 'B1'; hint: string }[] = [
  { id: 'presente', es: 'Настоящее время', en: 'Present', level: 'A1', hint: 'I read / I am reading (imperfective verbs only)' },
  { id: 'preterito', es: 'Прошедшее время', en: 'Past', level: 'A1', hint: 'Changes by gender: он читал, она читала' },
  { id: 'futuro', es: 'Будущее время', en: 'Future', level: 'A2', hint: 'буду + infinitive (imperfective) or the perfective present (one completed action)' },
  { id: 'imperativo', es: 'Повелительное наклонение', en: 'Imperative', level: 'A2', hint: 'Commands: читай! читайте!' },
  { id: 'condicional', es: 'Сослагательное наклонение', en: 'Conditional', level: 'B1', hint: 'past + бы: I would read' },
];

const BUDU = ['буду', 'будешь', 'будет', 'будем', 'будете', 'будут'];
const isRefl = (inf: string) => /(ся|сь)$/.test(inf);
const unRefl = (s: string) => s.replace(/(ся|сь)$/, '');
/** Reflexive ending after a vowel is -сь, after a consonant -ся. */
const refl = (form: string) => form + (/[аеёиоуыэюя]$/.test(form) ? 'сь' : 'ся');

function past(v: VerbRu): string[] {
  if (v.past) return v.past;
  const base = unRefl(v.inf).replace(/ть$/, '');
  const forms = ['л', 'ла', 'ло', 'ли'].map((e) => base + e);
  return isRefl(v.inf) ? forms.map(refl) : forms;
}

function imperative(v: VerbRu): (string | null)[] {
  if (v.imp) return v.imp;
  // From the они form: a stem ending in a vowel takes -й, otherwise -и.
  const they = unRefl(v.pres[5]).replace(/(ют|ут|ят|ат)$/, '');
  const ty = /[аеёиоуыэюя]$/.test(they) ? they + 'й' : they + 'и';
  const vy = ty + 'те';
  return isRefl(v.inf) ? [refl(ty), refl(vy)] : [ty, vy];
}

export function conjugateRu(inf: string, tense: Tense): (string | null)[] {
  const v = VERB_MAP_RU[inf];
  const none = [null, null, null, null, null, null];
  if (!v) return none;
  switch (tense) {
    // Perfective verbs have no present: their "present" forms mean the future.
    case 'presente': return v.aspect === 'impf' && v.inf !== 'быть' ? v.pres : none;
    case 'preterito': return [...past(v), null, null];
    case 'futuro': return v.aspect === 'pf' ? v.pres : v.inf === 'быть' ? v.pres : BUDU.map((b) => `${b} ${v.inf}`);
    case 'condicional': return [...past(v).map((p) => `${p} бы`), null, null];
    case 'imperativo': { const [ty, vy] = imperative(v); return [null, ty, null, null, vy, null]; }
    default: return none;
  }
}

export function participleRu(): string {
  return '';
}

export interface FormPartsRu { pre: string; stem: string; ending: string; changed: boolean; post?: string }

const PRES_ENDINGS = [['ю', 'у'], ['ешь', 'ёшь', 'ишь'], ['ет', 'ёт', 'ит'], ['ем', 'ём', 'им'], ['ете', 'ёте', 'ите'], ['ют', 'ут', 'ят', 'ат']];

/** Splits forms into stem + ending for the teaching tables. */
export function splitFormsRu(inf: string, tense: Tense): (FormPartsRu | null)[] {
  const v = VERB_MAP_RU[inf];
  const infStem = unRefl(inf).replace(/(ать|ять|еть|ить|ыть|уть|ть|ти|чь)$/, '');
  return conjugateRu(inf, tense).map((full, i) => {
    if (!full) return null;
    if (tense === 'futuro' && v.aspect === 'impf' && v.inf !== 'быть') {
      const [aux, ...rest] = full.split(' ');
      return { pre: aux, stem: rest.join(' '), ending: '', changed: false };
    }
    let form = full;
    let post: string | undefined;
    if (tense === 'condicional') { form = full.replace(/ бы$/, ''); post = 'бы'; }
    let reflEnd = '';
    if (isRefl(inf) && /(ся|сь)$/.test(form)) { reflEnd = form.slice(-2); form = form.slice(0, -2); }
    const ends = tense === 'presente' || tense === 'futuro' ? PRES_ENDINGS[i] : tense === 'imperativo' ? ['йте', 'ите', 'ьте', 'й', 'и', 'ь'] : ['ла', 'ло', 'ли', 'л'];
    const e = ends.find((x) => form.endsWith(x) && form.length > x.length) ?? '';
    const stem = form.slice(0, form.length - e.length);
    return { pre: '', stem, ending: e + reflEnd, changed: !stem.startsWith(infStem.slice(0, Math.max(1, infStem.length - 1))), post };
  });
}

export function allFormsRu(): { inf: string; tense: Tense; person: number; form: string }[] {
  const out: { inf: string; tense: Tense; person: number; form: string }[] = [];
  for (const v of VERBS_RU) {
    for (const t of TENSES_RU) {
      conjugateRu(v.inf, t.id).forEach((f, person) => {
        if (f && !f.includes(' ')) out.push({ inf: v.inf, tense: t.id, person, form: f });
      });
    }
  }
  return out;
}
