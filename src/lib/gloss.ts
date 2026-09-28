import { lookupWord } from '../data/course';
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
  const w = lookupWord(t);
  const forms = lookupForm(t);
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
  return { word: token, meaning: '—', detail: 'Not in the course dictionary yet' };
}
