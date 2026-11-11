import { LANG } from '../data/lang';
import { accentPairsIn, type AccentPair } from '../data/accent-pairs';
import type { Unit } from '../data/types';
import { SpeakButton } from './SpeakButton';

/** Pairs whose accented word the lesson uses (in its words or sentences): taught before the exercises. */
export function accentsOfUnit(u: Unit): AccentPair[] {
  const text = [...u.words.flatMap((w) => [w.es, w.ex ?? '']), ...u.sentences.map((s) => s.es)].join(' ');
  const used = new Set((text.toLowerCase().match(/\p{L}+/gu) ?? []));
  return accentPairsIn(text).filter(([a]) => used.has(a.toLowerCase()));
}

const INTRO: Record<string, string> = {
  es: 'An accent can make another word. Write it — without it, the answer is a different word.',
  de: 'Two dots (Umlaut) can make another word. Write them — without them, the answer is a different word.',
  fr: 'An accent can make another word. Write it — without it, the answer is a different word.',
};

/** "Watch the accent": each pair with both meanings, so the learner knows before being asked. */
export function AccentBox({ pairs, title = LANG === 'de' ? 'Watch the umlaut' : 'Watch the accent', intro }: { pairs: AccentPair[]; title?: string; intro?: string }) {
  return (
    <div className="accent-box">
      <h3>{title}</h3>
      <p className="muted small">{intro ?? INTRO[LANG] ?? ''}</p>
      <ul className="accent-pairs">
        {pairs.map(([a, ae, b, be]) => (
          <li key={a}>
            <span><strong lang={LANG}>{a}</strong> <SpeakButton text={a} /> = {ae}</span>
            <span className="muted"><strong lang={LANG}>{b}</strong> = {be}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
