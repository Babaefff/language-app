import { Icon, type IconName } from '../components/Icon';
import { L, LANG } from '../data/lang';
import { Link } from '../components/Nav';
import { UNITS, WORDS } from '../data/course';
import { LEVELS } from '../data/types';
import { useProgress, streak, today } from '../lib/store';
import { STEPS } from '../lib/exercises';
import { SpeakButton } from '../components/SpeakButton';
import { dueMistakes } from '../lib/learning';

const ACTIVITIES: [string, string, IconName][] = [
  ['/grammar', 'Grammar', 'grammar'], ['/practice/verbs', 'Verbs', 'review'], ['/practice/sentences', 'Sentences', 'sentences'],
  ['/reading', 'Reading', 'reading'], ['/practice/listen', 'Listening', 'volume'], ['/practice/speaking', 'Speaking', 'mic'],
  ['/writing', 'Writing', 'practice'], ['/songs', 'Songs', 'songs'], ['/exam', 'Exams', 'exam'],
];

export function Home() {
  const p = useProgress();
  const due = Object.values(p.cards).filter(c => c.due <= Date.now()).length;
  const next = UNITS.find(u => !p.units[u.id] && STEPS.some((_, i) => p.steps[`${u.id}:${i}`] === undefined));
  const step = next ? Math.max(0, STEPS.findIndex((_, i) => p.steps[`${next.id}:${i}`] === undefined)) : 0;
  const date = new Date();
  const seed = date.getFullYear() * 372 + date.getMonth() * 31 + date.getDate();
  const word = WORDS[(seed * 7919) % WORDS.length];
  const mistakes = dueMistakes(p.learning).length;
  const done = UNITS.filter(u => p.units[u.id]).length;
  return <div className="page dashboard">
    <header className="dashboard-heading"><h1>{L.name}</h1><span className="muted small">{streak(p.xp, p.frozen)} day streak · {p.xp[today()] ?? 0} XP today</span></header>
    <div className="dashboard-main">
      <section className="card dashboard-lesson">
        <span className="tag">{next ? `${next.level} · Lesson ${UNITS.indexOf(next) + 1}` : 'Course complete'}</span>
        <h2>{next?.title ?? 'All lessons completed'}</h2>
        {next && <><p className="muted" lang={LANG}>{next.titleEs}</p><div className="steps-dots">{STEPS.map((s, i) => <span key={s.title} className={p.steps[`${next.id}:${i}`] !== undefined ? 'done' : i === step ? 'now' : ''}>{p.steps[`${next.id}:${i}`] !== undefined ? '✓' : i + 1} {s.title}</span>)}</div></>}
        <div className="row wrap"><Link className="btn primary" to={next ? `/unit/${next.id}` : '/course'}>{next ? 'Continue lesson' : 'Browse course'}</Link><Link className="btn" to="/course">All lessons</Link></div>
      </section>
      <aside className="dashboard-sidebar">
        <section className="card dashboard-review"><h2>Review</h2><p><strong>{due}</strong> words due{mistakes > 0 ? ` · ${mistakes} mistakes` : ''}</p><Link className="btn" to="/review">Open review</Link></section>
        <section className="card dashboard-daily"><h2>Daily session</h2><p className="muted small">{p.learning.daily.includes(today()) ? 'Completed today' : 'Review + one lesson step'}</p><Link className="link" to="/daily">{p.learning.daily.includes(today()) ? 'Open session' : 'Start session'} →</Link></section>
      </aside>
    </div>
    <section className="card"><div className="section-heading"><h2>Practice</h2><Link className="link small" to="/practice">All activities →</Link></div><div className="activity-links">{ACTIVITIES.map(([to,label,icon]) => <Link key={to} to={to} className="activity-link"><span className="activity-label"><Icon name={icon} size={17} />{label}</span><span aria-hidden="true">→</span></Link>)}</div></section>
    <div className="dashboard-bottom">
      <section className="card"><div className="section-heading"><h2>Course progress</h2><Link className="link small" to="/progress">Progress →</Link></div><p className="small muted">{done}/{UNITS.length} lessons</p>
        {LEVELS.map(level => { const units = UNITS.filter(u => u.level === level); const finished = units.filter(u => p.units[u.id]).length; return <div className="level-progress" key={level}><span className={`badge ${level}`}>{level}</span><div className="bar" role="progressbar" aria-label={`${level} lessons`} aria-valuenow={finished} aria-valuemin={0} aria-valuemax={units.length}><div style={{ width: `${finished / Math.max(1, units.length) * 100}%` }} /></div><span className="small muted">{finished}/{units.length}</span></div>; })}
      </section>
      {word && <section className="card dashboard-word"><span className="tag">Word of the day</span><div className="row"><h2 lang={LANG}>{word.es}</h2><SpeakButton text={word.es} /></div><p>{word.en}</p><Link className="link small" to="/practice/words">Word bank →</Link></section>}
    </div>
  </div>;
}
