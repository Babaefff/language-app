import { Fragment } from 'react';
import type { Tense } from '../data/types';
import { splitForms, TENSE_MAP } from '../lib/conjugate';
import { speak } from '../lib/speech';

/**
 * Teaching table: one column per verb, stems in plain text, endings coloured, and stems that
 * changed (pienso, tuve…) highlighted so patterns such as the "boot" shape jump out.
 */
const LABELS = ['yo', 'tú', 'él / ella', 'nosotros', 'vosotros', 'ellos / ellas'];
const LABELS_IMP = ['', 'tú', 'usted', 'nosotros', 'vosotros', 'ustedes'];
/** Phone-width abbreviations so three verb columns fit without sideways scrolling. */
const TINY = ['yo', 'tú', 'él', 'nos.', 'vos.', 'ellos'];
const TINY_IMP = ['', 'tú', 'Ud.', 'nos.', 'vos.', 'Uds.'];

export function VerbTable({ verbs, tense, caption }: { verbs: string[]; tense: Tense; caption?: string }) {
  const columns = verbs.map((v) => splitForms(v, tense));
  return (
    <figure className="verb-table">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th />
              {verbs.map((v) => <th key={v} lang="es">{v}</th>)}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3, 4, 5].map((i) =>
              columns.every((c) => !c[i]) ? null : (
                <tr key={i}>
                  <td className="muted vt-person">
                    <span className="vt-long">{(tense === 'imperativo' ? LABELS_IMP : LABELS)[i]}</span>
                    <span className="vt-short">{(tense === 'imperativo' ? TINY_IMP : TINY)[i]}</span>
                  </td>
                  {columns.map((c, ci) => {
                    const f = c[i];
                    if (!f) return <td key={ci}>—</td>;
                    const text = `${f.pre ? f.pre + ' ' : ''}${f.stem}${f.ending}`;
                    return (
                      <td key={ci} lang="es">
                        <button className="vt-form" onClick={() => speak(text)} title="Listen">
                          {f.pre && <Fragment><span className="vt-pre">{f.pre}</span> </Fragment>}
                          <span className={f.changed ? 'vt-changed' : 'vt-stem'}>{f.stem}</span>
                          <span className="vt-end">{f.ending}</span>
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
