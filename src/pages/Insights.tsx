import { Link } from '../components/Nav';
import { WeekCard } from '../components/WeekCard';
import { useProgress } from '../lib/store';
import { dueMistakes } from '../lib/learning';
import { UNITS } from '../data/course';
import { LEVELS } from '../data/types';
import { L } from '../data/lang';
import { canDoFor, hasCanDo } from '../data/can-do';

export function Insights() {
  const { learning, units } = useProgress();
  const done = UNITS.filter(u => units[u.id]);
  const words = done.filter(u => !hasCanDo(u.id)).reduce((n, u) => n + u.words.length, 0);
  const recent = learning.attempts.filter(a => a.at >= Date.now() - 30 * 86_400_000);
  const delayed = recent.filter(a => a.delayed);
  const context = recent.filter(a => a.context);
  const metric = (samples: typeof recent) => samples.length ? `${Math.round(samples.filter(a => a.ok).length / samples.length * 100)}%` : '—';
  return <div className="page narrow">
    <Link to="/" className="link">← Home</Link>
    <h1>Progress</h1>
    <WeekCard />
    <WeekCard which="last" />
    <section className="card">
      <h2>What you can do in {L.name}</h2>
      {done.length === 0 ? <p className="muted">Finish your first lesson and your new abilities will appear here.</p> : <>
        {LEVELS.map(level => {
          const items = done.filter(u => u.level === level && hasCanDo(u.id));
          return items.length ? <div key={level}><span className={`badge ${level}`}>{level}</span><ul className="can-do-list">{items.map(u => <li key={u.id}>{canDoFor(u, L.name)}</li>)}</ul></div> : null;
        })}
        {words > 0 && <p className="small muted">Plus {words} everyday words from the word sets.</p>}
      </>}
    </section>
    <div className="grid-2">
      <section className="card insight"><span className="eyebrow">Delayed recall</span><strong className="metric">{metric(delayed)}</strong><p>{delayed.filter(a => a.ok).length} correct / {delayed.length} checks</p><details><summary>How is this measured?</summary><p className="small muted">Typed word answers at least 24 hours after the previous scheduled practice. In-session retries and mistake drills are excluded.</p></details></section>
      <section className="card insight"><span className="eyebrow">New sentence checks</span><strong className="metric">{metric(context)}</strong><p>{context.filter(a => a.ok).length} correct / {context.length} checks</p><details><summary>How is this measured?</summary><p className="small muted">First attempts at new combinations of familiar phrases, kept out of lesson practice. This small set checks use in context; it is not a proficiency test.</p></details></section>
    </div>
    <section className="card"><h2>Mistake review</h2><p className="muted">{dueMistakes(learning).length} mistakes ready to revisit. Practise before opening the corrections, then check the explanation.</p><Link to="/review" className="btn">Open review</Link></section>
    <details className="card"><summary>About these measurements</summary><p className="muted">These figures use the last 30 days, within the most recent 500 measured checks. They begin with this update; old XP isn’t converted into learning evidence. Small samples can change a lot.</p><p className="small muted">History stays with your progress and follows the same backup and account-sync settings. No typed answers are kept. {learning.daily.length} daily sessions completed on distinct days in the retained history.</p></details>
  </div>;
}
