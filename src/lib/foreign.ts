import { LANG } from '../data/lang';
import { lookupWord } from '../data/course';
import { content } from '../data/content';
import { lookupForm } from './conjugate';
import { numbersToDigits } from './numbers';

/** Very common English words, so "units come first" isn't mistaken for Spanish ("come" = eats). */
const EN = new Set(`the a an of to and or in on at for with by from is are was were be been am do does did have has had not no
it its this that these those he she they we you i me my your his her our their them him us what which who how when where why
can could will would should may might must shall about after again all also as because before but each every few here just
like many more most much now only other some such than then there very well yes one two three first last next new old good
bad big small same different word words form forms ending endings stem verb verbs noun nouns adjective plural singular
masculine feminine neuter person people thing things time day week year say says said use used means mean meaning
come comes go goes get make makes see look know think take give find tell ask work want need into over under out up down
off only own still too both either neither whole part parts example examples sentence sentences rule rules question answer
literally often always never sometimes usually here's it's that's don't doesn't can't isn't`.split(/\s+/));

/** Words that are English but also very common in the language being learned. */
const SHARED: Record<string, string[]> = { de: ['am', 'in', 'an', 'so', 'was', 'bad', 'will', 'also', 'bin', 'hat', 'die', 'man', 'war'], es: ['a', 'no', 'me', 'has', 'son', 'come', 'he', 'mean'], fr: ['a', 'on', 'as', 'est', 'me', 'te', 'son', 'pas', 'font'] };
const isEnglish = (w: string) => EN.has(w) && !(SHARED[LANG] ?? []).includes(w);

const words = (s: string) => s.toLowerCase().match(/\p{L}+(?:['’]\p{L}+)?/gu) ?? [];

// Brackets: "(Jahre alt)" is read, "(to have)" is English and left out.
const stripMarks = (s: string) => s.replace(/\*+/g, '').replace(/^#+\s*/, '').replace(/\(([^)]*)\)/g, (_, inner: string) => (foreignPart(inner) ? ` ${inner} ` : ' '));

/** How many words of a text are in the language being learned, and how many are English. */
function score(t: string): { known: number; english: number; total: number } {
  const ws = words(t);
  const small = content().smallWords ?? {};
  let known = 0, english = 0;
  for (const w of ws) {
    if (isEnglish(w)) { english++; continue; }
    const tail = w.replace(/^\p{L}{1,3}['’]/u, '');
    if (tail !== w && (lookupWord(tail, false) || lookupForm(tail).length > 0 || small[tail])) { known++; continue; }
    if (lookupWord(w, false) || lookupForm(w).length > 0 || small[w] || numbersToDigits(w, LANG) !== w || (w.length >= 5 && lookupWord(w))) known++;
  }
  // Letters English doesn't use (ñ, ä, ß, é, ç…) are a strong sign too.
  if (/[ñáíóúüäößéèêëàâçîïôûœ]/i.test(t)) known++;
  return { known, english, total: ws.length };
}
const foreignPart = (t: string) => {
  if (LANG === 'ru') return /[а-яё]/i.test(t);
  const { known, english, total } = score(t);
  return known > english && known * 2 >= total;
};

/** The text to speak: only the foreign parts ("liegen — to lie" → "liegen"), no English words. */
export function speakableForeign(s: string): string {
  const parts = stripMarks(s).split(/\s+[—–=:]\s+|\s*→\s*|\s*\/\s*|,\s*/).map((x) => x.trim()).filter(Boolean);
  const kept = parts.filter(foreignPart).map((x) => (LANG === 'ru' ? x.replace(/[A-Za-z][A-Za-z'’ ]*/g, ' ') : x.split(/\s+/).filter((w) => !isEnglish(w.toLowerCase().replace(/[^\p{L}'’]/gu, ''))).join(' ')).trim());
  return kept.filter((x) => /\p{L}/u.test(x)).join(', ');
}

/** Is this bit of a grammar note in the language being learned (so it can be read aloud)? */
export function isForeign(s: string): boolean {
  const t = stripMarks(s);
  if (!/\p{L}/u.test(t)) return false;
  if (LANG === 'ru') return /[а-яё]/i.test(t);
  const { known, english, total } = score(t);
  return known > english && known * 2 >= total && speakableForeign(s).length > 0;
}
