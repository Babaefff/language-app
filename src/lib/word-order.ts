import { LANG } from '../data/lang';
import { lookupWord } from '../data/course';
import { lookupForm } from './conjugate';

/**
 * Other correct word orders of a sentence, so a learner who writes a right sentence in another
 * natural order isn't told it is wrong. Only a few safe patterns, and only ever accepted when the
 * learner types (or builds) exactly that order:
 * - German: what comes before the verb and the subject swap places around the verb
 *   (Im Sommer haben wir … ↔ Wir haben im Sommer …).
 * - Spanish, French, Russian: a phrase at the start moves to the end, or the other way round
 *   (En verano dormimos fuera. ↔ Dormimos fuera en verano.).
 */
export function otherOrders(sentence: string): string[] {
  const m = sentence.trim().match(/^(.*?)([.!?…]*)$/s);
  if (!m) return [];
  const body = m[1];
  const end = m[2];
  const toks = body.split(/\s+/).filter(Boolean);
  // Questions keep their order; sentences with a comma (weil-, dass-clauses…) are left alone.
  if (toks.length < 3 || body.includes(',') || /[¿?¡]/.test(body) || end.includes('?')) return [];
  const out = new Set<string>();
  const finish = (ws: string[]) => {
    const s = [...ws];
    s[0] = s[0].charAt(0).toUpperCase() + s[0].slice(1);
    return s.join(' ') + end;
  };
  if (LANG === 'de') {
    const finite = (w: string) => lookupForm(w.toLowerCase()).some((f) => f.tense !== 'participio' && f.person >= 0);
    const noun = (w: string) => { const x = lookupWord(w, false); return !!x && /^(der|die|das) /i.test(x.es); };
    // Not at the start of the sentence any more: lower-case it, unless it is a noun (or a name).
    const lower = (w: string) => (noun(w) || !lookupWord(w, false) && !finite(w) && /^[A-ZÄÖÜ]/.test(w) && !isSmall(w) ? w : w.charAt(0).toLowerCase() + w.slice(1));
    for (let k = 1; k <= Math.min(4, toks.length - 2); k++) {
      if (!finite(toks[k])) continue;
      // Front part (1–4 words) before the verb, subject (1–2 words) right after it.
      for (let s = 1; s <= 2 && k + 1 + s <= toks.length; s++) {
        const front = toks.slice(0, k), verb = toks[k], subj = toks.slice(k + 1, k + 1 + s), rest = toks.slice(k + 1 + s);
        out.add(finish([...subj, verb, lower(front[0]), ...front.slice(1), ...rest]));
      }
      // The other way: the subject is in front, a phrase of 1–3 words after the verb moves forward.
      for (let f = 1; f <= 3 && k + 1 + f < toks.length; f++) {
        const subj = toks.slice(0, k), verb = toks[k], phrase = toks.slice(k + 1, k + 1 + f), rest = toks.slice(k + 1 + f);
        if (!rest.length) continue;
        out.add(finish([...phrase, verb, lower(subj[0]), ...subj.slice(1), ...rest]));
      }
    }
  } else {
    const lower = (w: string) => (LANG === 'fr' || LANG === 'es' || LANG === 'ru') && !/^[A-ZÁÉÍÓÚÑÀÂÇÈÊËÎÏÔÛÙÜŒА-ЯЁ]{2,}$/.test(w) ? w.charAt(0).toLowerCase() + w.slice(1) : w;
    for (let f = 1; f <= 3 && f < toks.length - 1; f++) {
      out.add(finish([...toks.slice(f), lower(toks[0]), ...toks.slice(1, f)]));
      const tail = toks.slice(toks.length - f);
      out.add(finish([...tail, lower(toks[0]), ...toks.slice(1, toks.length - f)]));
    }
  }
  out.delete(sentence.trim());
  return [...out];
}

/** German words that are capitalised only at the start of a sentence. */
const SMALL = new Set('ich du er sie es wir ihr man mein dein sein unser euer im am in an auf mit nach vor bei zum zur heute gestern morgen jetzt dann hier dort letzte letzten letztes nächste nächsten nächstes jeden jede jedes vor seit früher als zuerst manchmal oft immer'.split(' '));
const isSmall = (w: string) => SMALL.has(w.toLowerCase());
