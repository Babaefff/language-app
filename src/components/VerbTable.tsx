import { LANG } from '../data/lang';
import { Fragment } from 'react';
import type { Tense } from '../data/types';
import { splitForms, TENSE_MAP } from '../lib/conjugate';
import { VERB_MAP } from '../data/verbs';
import { speak } from '../lib/speech';

/**
 * Teaching table: one column per verb, stems in plain text, endings coloured, and stems that
 * changed (pienso, tuve…) highlighted so patterns such as the "boot" shape jump out.
 */
const PICK = <T,>(es: T, de: T, fr: T, ru: T) => (LANG === 'de' ? de : LANG === 'fr' ? fr : LANG === 'ru' ? ru : es);
const LABELS = PICK(['yo', 'tú', 'él / ella', 'nosotros', 'vosotros', 'ellos / ellas'], ['ich', 'du', 'er / sie / es', 'wir', 'ihr', 'sie / Sie'], ["je / j'", 'tu', 'il / elle / on', 'nous', 'vous', 'ils / elles'], ['я', 'ты', 'он / она', 'мы', 'вы', 'они']);
const LABELS_IMP = PICK(['', 'tú', 'usted', 'nosotros', 'vosotros', 'ustedes'], ['', 'du', 'Sie', 'wir', 'ihr', ''], ['', 'tu', '', 'nous', 'vous', ''], ['', 'ты', '', '', 'вы', '']);
/** Phone-width abbreviations so three verb columns fit without sideways scrolling. */
const TINY = PICK(['yo', 'tú', 'él', 'nos.', 'vos.', 'ellos'], ['ich', 'du', 'er', 'wir', 'ihr', 'sie'], ['je', 'tu', 'il', 'nous', 'vous', 'ils'], ['я', 'ты', 'он', 'мы', 'вы', 'они']);
const TINY_IMP = PICK(['', 'tú', 'Ud.', 'nos.', 'vos.', 'Uds.'], ['', 'du', 'Sie', 'wir', 'ihr', ''], ['', 'tu', '', 'nous', 'vous', ''], ['', 'ты', '', '', 'вы', '']);
/** Russian past and conditional change by gender and number, not person. */
const GENDER = ['он (m)', 'она (f)', 'оно (n)', 'они (pl)', '', ''];
const GENDER_TINY = ['он', 'она', 'оно', 'они', '', ''];
const byGender = (t: Tense) => LANG === 'ru' && (t === 'preterito' || t === 'condicional');
/** No space after an elided pronoun (m'appelle) or before a hyphenated one (lève-toi). */
const gapAfter = (pre: string) => (pre.endsWith("'") ? '' : ' ');
const gapBefore = (post: string) => (post.startsWith('-') ? '' : ' ');

export function VerbTable({ verbs, tense, caption }: { verbs: string[]; tense: Tense; caption?: string }) {
  const columns = verbs.map((v) => splitForms(v, tense));
  return (
    <figure className="verb-table">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th />
              {verbs.map((v) => (
                <th key={v}>
                  <span lang={LANG}>{v}</span>
                  <span className="vt-meaning">{VERB_MAP[v]?.en}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3, 4, 5].map((i) =>
              columns.every((c) => !c[i]) ? null : (
                <tr key={i}>
                  <td className="muted vt-person">
                    <span className="vt-long">{(byGender(tense) ? GENDER : tense === 'imperativo' ? LABELS_IMP : LABELS)[i]}</span>
                    <span className="vt-short">{(byGender(tense) ? GENDER_TINY : tense === 'imperativo' ? TINY_IMP : TINY)[i]}</span>
                  </td>
                  {columns.map((c, ci) => {
                    const f = c[i];
                    if (!f) return <td key={ci}>—</td>;
                    const text = `${f.pre ? f.pre + gapAfter(f.pre) : ''}${f.stem}${f.ending}${f.post ? gapBefore(f.post) + f.post : ''}`;
                    return (
                      <td key={ci} lang={LANG}>
                        <button className="vt-form" onClick={() => speak(text)} title="Listen">
                          {f.pre && <Fragment><span className="vt-pre">{f.pre}</span>{gapAfter(f.pre)}</Fragment>}
                          <span className={f.changed ? 'vt-changed' : 'vt-stem'}>{f.stem}</span>
                          <span className="vt-end">{f.ending}</span>
                          {f.post && <Fragment>{gapBefore(f.post)}<span className="vt-post">{f.post}</span></Fragment>}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
      <figcaption className="small muted">
        {caption ?? TENSE_MAP[tense].es} · <span className="vt-end">ending</span> · <span className="vt-changed">changed stem</span> · tap a form to hear it
      </figcaption>
    </figure>
  );
}
