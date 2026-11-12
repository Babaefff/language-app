import { useState } from 'react';
import { Link } from './Nav';
import { useProgress } from '../lib/store';
import { lastWeek, weekSummary, type WeekSummary } from '../lib/weekly';
import { drillDanger } from '../lib/reminders';

const DISMISS_KEY = 'hablo:week-card';

/** "Your week": days practised, new words, lessons, accuracy and danger words, with last week to compare. */
export function WeekCard({ which = 'this', dismissible = false }: { which?: 'this' | 'last'; dismissible?: boolean }) {
  const p = useProgress();
  const w = which === 'last' ? lastWeek(p) : weekSummary(p);
  const before = which === 'last' ? weekSummary(p, new Date(Date.now() - 14 * 86_400_000)) : lastWeek(p);
  const id = w.days[0];
  const [hidden, setHidden] = useState(() => { try { return localStorage.getItem(DISMISS_KEY) === id; } catch { return false; } });
  if (dismissible && hidden) return null;
  const personalDanger = drillDanger();
  return (
    <section className="card week-card">
      <div className="row between">
        <h2>📬 {which === 'last' ? 'Your last week' : 'Your week so far'}</h2>
        {dismissible && <button className="icon-btn" aria-label="Hide until next week" onClick={() => { setHidden(true); try { localStorage.setItem(DISMISS_KEY, id); } catch { /* this visit only */ } }}>✕</button>}
      </div>
      <div className="week-stats">
        <Stat n={`${w.active}/7`} label="days practised" />
        <Stat n={w.newWords} label="new words" />
        <Stat n={w.lessons} label={w.lessons === 1 ? 'lesson' : 'lessons'} />
        <Stat n={w.accuracy === null ? '–' : `${Math.round(w.accuracy * 100)}%`} label={`right of ${w.answers} answers`} />
      </div>
      <p className="small">{verdict(w, before)}</p>
      {(w.danger > 0 || personalDanger > 0) && (
        <p className="small"><strong className="bad-text">⚠️ {w.danger + personalDanger} danger {w.danger + personalDanger === 1 ? 'word' : 'words'} left</strong>: words you keep forgetting. {w.danger > 0 && <Link to="/review">Review them →</Link>} {personalDanger > 0 && <Link to="/mine">Word drill →</Link>}</p>
      )}
    </section>
  );
}

function Stat({ n, label }: { n: number | string; label: string }) {
  return <div><div className="big-number">{n}</div><span className="small muted">{label}</span></div>;
}

/** One honest, encouraging line comparing with the week before. */
function verdict(w: WeekSummary, before: WeekSummary): string {
  if (!w.active) return 'No practice yet. Five minutes today is enough to start a streak.';
  if (w.active >= 5) return `Excellent: ${w.active} days. Little and often is exactly how memory works.`;
  if (before.xp && w.xp > before.xp) return `More than the week before (${w.xp} XP vs ${before.xp}). Keep it up!`;
  return `${w.xp} XP so far. Spreading practice over more days helps words stick.`;
}
