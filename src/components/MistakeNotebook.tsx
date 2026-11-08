import { useProgress } from '../lib/store';
import type { Exercise } from '../lib/exercises';
import { dueMistakes } from '../lib/learning';
import { LANG } from '../data/lang';

export function MistakeNotebook({ onPractise }: { onPractise: (exercises: Exercise[]) => void }) {
  const { learning } = useProgress();
  const pending = Object.values(learning.mistakes).filter(m => m.due > 0).sort((a, b) => a.due - b.due);
  const due = dueMistakes(learning);
  const start = () => onPractise(due.slice(0, 8).map(m => ({ kind: 'type', key: `notebook:${m.id}`,
    label: 'Recall the correction', prompt: m.prompt, answer: m.answer, wordId: m.wordId, why: m.why, assessment: 'practice' })));
  return <section className="card notebook">
    <span className="eyebrow">Your mistake notebook</span><h2>Turn a wrong answer into a next step.</h2>
    <p className="muted">{pending.length ? `${pending.length} items to revisit · ${due.length} ready now.` : 'Missed answers from exercises will appear here. Nothing to fix yet.'}</p>
    <p className="small muted">Corrections return after 24 hours. A later correct first attempt clears them; immediate retries don’t. Practise before opening the answers.</p>
    {due.length > 0 && <button className="btn primary" onClick={start}>Practise mistakes ({Math.min(due.length, 8)})</button>}
    {pending.slice(0, 8).map(m => <details key={m.id} className="notebook-item"><summary><span>{m.prompt}</span><span className="small muted">{m.due <= Date.now() ? 'Ready' : `After ${new Date(m.due).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`}</span></summary><p lang={LANG}><strong>{m.answer}</strong></p>{m.why && <p className="small muted">{m.why}</p>}<p className="small muted">Recall this again after a break, rather than rereading it repeatedly.</p></details>)}
  </section>;
}
