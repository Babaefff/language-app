import { Link } from '../components/Nav';
import { useProgress } from '../lib/store';
import { dueMistakes } from '../lib/learning';

export function Insights() {
  const { learning } = useProgress();
  const recent = learning.attempts.filter(a => a.at >= Date.now() - 30 * 86_400_000);
  const delayed = recent.filter(a => a.delayed);
  const context = recent.filter(a => a.context);
  const metric = (samples: typeof recent) => samples.length ? `${Math.round(samples.filter(a => a.ok).length / samples.length * 100)}%` : '—';
  return <div className="page narrow">
    <Link to="/" className="link">← Home</Link>
    <header className="page-heading"><span className="eyebrow">Learning insights</span><h1>What’s staying with you?</h1><p className="muted">First attempts after a break tell you more than repeated answers in the same session.</p></header>
    <div className="grid-2">
      <section className="card insight"><span className="eyebrow">Delayed recall</span><strong className="metric">{metric(delayed)}</strong><p>{delayed.filter(a => a.ok).length} correct / {delayed.length} checks</p><p className="small muted">Typed word answers at least 24 hours after the previous scheduled practice. In-session retries and mistake drills are excluded.</p></section>
      <section className="card insight"><span className="eyebrow">New sentence checks</span><strong className="metric">{metric(context)}</strong><p>{context.filter(a => a.ok).length} correct / {context.length} checks</p><p className="small muted">First attempts at new combinations of familiar phrases, kept out of lesson practice. This small set checks use in context; it is not a proficiency test.</p></section>
    </div>
    <section className="card"><h2>Make the next attempt count</h2><p className="muted">{dueMistakes(learning).length} mistakes ready to revisit. Practise before opening the corrections, then check the explanation.</p><Link to="/review" className="btn">Open review</Link></section>
    <section className="card"><h2>A small sample, not a verdict</h2><p className="muted">These figures use the last 30 days, within the most recent 500 measured checks. They begin with this update; old XP isn’t converted into learning evidence. Small samples can change a lot.</p><p className="small muted">History stays with your progress and follows the same backup and account-sync settings. No typed answers are kept. {learning.daily.length} daily sessions completed on distinct days in the retained history.</p></section>
  </div>;
}
