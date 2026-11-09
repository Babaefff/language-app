import { lookupWord } from '../data/course';
import { content } from '../data/content';
import { VERB_MAP } from '../data/verbs';
import { lookupForm, TENSE_MAP } from './conjugate';
import { personLabel } from './exercises';

export interface Gloss {
  word: string;
  meaning: string;
  detail?: string;
  wordId?: string;
}

export function gloss(token: string, glossary: Record<string, string> = {}): Gloss {
  const t = token.toLowerCase();
  if (glossary[t]) return { word: token, meaning: glossary[t] };
  const small = content().smallWords ?? {};
  const forms = lookupForm(t);
  // Exact matches first (word, small word, verb form); a stem guess only as the last resort.
  const w = lookupWord(t, false) ?? (small[t] || forms.length ? undefined : lookupWord(t));
  if (!w && small[t]) return { word: token, meaning: small[t] };
  if (w) {
    // "como" is both "like" and "I eat": mention the verb reading too.
    const verb = forms[0] && !VERB_MAP[w.es] ? `also ${forms[0].inf} (${VERB_MAP[forms[0].inf].en})` : undefined;
    return { word: token, meaning: w.en, detail: [w.es !== t ? w.es : '', verb].filter(Boolean).join(' · ') || undefined, wordId: w.id };
  }
  if (forms.length) {
    const f = forms[0];
    const tense = f.tense === 'participio' ? 'participle' : f.tense === 'gerundio' ? 'gerund' : `${TENSE_MAP[f.tense].es}, ${personLabel(f.tense, f.person)}`;
    return { word: token, meaning: VERB_MAP[f.inf].en, detail: `${forms.map((x) => x.inf).filter((v, i, a) => a.indexOf(v) === i).join(' / ')} — ${tense}` };
  }
  // Elisions and joined forms: "j'ai" = j' + ai, "donne-moi" = donne + moi.
  const parts = t.split(/(?<=['’])|-/).filter(Boolean);
  if (parts.length > 1) {
    const each = parts.map((x) => small[x] ?? small[x.replace('’', "'")] ?? (gloss(x).meaning !== '—' ? gloss(x).meaning : null));
    if (each.every(Boolean)) return { word: token, meaning: each.join(' + '), detail: parts.join(' + ') };
  }
  return { word: token, meaning: '—', detail: 'Not in the course dictionary yet' };
}
