import { Icon, type IconName } from '../components/Icon';
import { L, LANG } from '../data/lang';
import { Link } from '../components/Nav';
import { UNITS, WORDS } from '../data/course';
import { LEVELS } from '../data/types';
import { useState } from 'react';
import { useProgress, streak, today, shields, MAX_SHIELDS } from '../lib/store';
import { strength } from '../lib/srs';
import { accountsEnabled, configProblem, useSync } from '../lib/sync';
import { STEPS } from '../lib/exercises';
import { SpeakButton } from '../components/SpeakButton';
import { dueMistakes } from '../lib/learning';

const ACTIVITIES: [string, string, IconName][] = [
  ['/grammar', 'Grammar', 'grammar'], ['/practice/verbs', 'Verbs', 'review'], ['/practice/sentences', 'Sentences', 'sentences'],
  ['/reading', 'Reading', 'reading'], ['/practice/listen', 'Listening', 'volume'], ['/practice/speaking', 'Speaking', 'mic'],
  ['/writing', 'Writing', 'practice'], ['/songs', 'Songs', 'songs'], ['/exam', 'Exams', 'exam'],
];

const BANNER_KEY = 'hablo:hideSigninBanner';
const bannerHidden = () => { try { return localStorage.getItem(BANNER_KEY) === '1'; } catch { return false; } };

/** Daily goal as a ring around today's XP. */
function GoalRing({ value, goal }: { value: number; goal: number }) {
  const pct = Math.min(100, Math.round((value / Math.max(1, goal)) * 100));
  return (
    <div className="ring" style={{ background: `conic-gradient(var(--primary) ${pct * 3.6}deg, var(--surface-2) 0)` }} role="img" aria-label={`Today: ${value} of ${goal} XP`}>
      <div><strong>{value}</strong><span>/{goal} XP</span></div>
    </div>
  );
}

export function Home() {
  const p = useProgress();
  const { user } = useSync();
  const [hideBanner, setHideBanner] = useState(bannerHidden);
  const now = Date.now();
  const due = Object.values(p.cards).filter(c => c.due <= now).length;
  const next = UNITS.find(u => !p.units[u.id] && STEPS.some((_, i) => p.steps[`${u.id}:${i}`] === undefined));
  const step = next ? Math.max(0, STEPS.findIndex((_, i) => p.steps[`${next.id}:${i}`] === undefined)) : 0;
  const started = !!next && STEPS.some((_, i) => p.steps[`${next.id}:${i}`] !== undefined);
  const date = new Date();
  const seed = date.getFullYear() * 372 + date.getMonth() * 31 + date.getDate();
  const word = WORDS[(seed * 7919) % WORDS.length];
  const mistakes = dueMistakes(p.learning).length;
  const done = UNITS.filter(u => p.units[u.id]).length;
  const dailyDone = p.learning.daily.includes(today());
  const xpToday = p.xp[today()] ?? 0;
  const goal = p.settings.dailyGoal;
  const days = streak(p.xp, p.frozen);
  const shieldCount = shields(p);
  const y = new Date(); y.setDate(y.getDate() - 1);
  const savedYesterday = !!p.frozen[today(y)];
  // Spacing beats cramming: after a big day, encourage coming back tomorrow rather than more today.
  const unitsToday = Object.values(p.units).filter(u => today(new Date(u.completedAt)) === today()).length;
  const counts = { learning: 0, familiar: 0, known: 0 };
  for (const c of Object.values(p.cards)) { const st = strength(c); if (st !== 'new') counts[st]++; }
  const showBanner = accountsEnabled && !configProblem && !user && !hideBanner;
  const plan = [due ? `${Math.min(due, 5)} words to review` : '', mistakes ? `${Math.min(mistakes, 3)} mistakes` : '', next ? `${STEPS[step].title.toLowerCase()}` : ''].filter(Boolean);
  const lessonLink = next ? `/unit/${next.id}` : '/course';
  const lessonLabel = next ? (started ? 'Continue lesson' : done ? 'Start next lesson' : 'Start first lesson') : 'Browse course';

  return <div className="page dashboard">
    {showBanner && (
      <div className="card signin-banner">
        <span><strong>Save your progress</strong> — sign in to keep it safe and continue on any device.</span>
        <div className="row">
          <Link to="/account" className="btn primary">Sign in</Link>
          <button className="icon-btn" aria-label="Hide" onClick={() => { setHideBanner(true); try { localStorage.setItem(BANNER_KEY, '1'); } catch { /* storage blocked */ } }}><Icon name="close" size={18} /></button>
        </div>
      </div>
    )}
    <header className="dashboard-heading"><h1>{L.hello}</h1><span className="muted small">{L.name}</span></header>
    <div className="dashboard-main">
      <section className="card dashboard-lesson">
        <span className="tag">{next ? `${next.level} · Lesson ${UNITS.indexOf(next) + 1} of ${UNITS.length}` : 'Course complete'}</span>
        <h2>{next?.title ?? 'You finished A1–B1!'}</h2>
        {next ? <><p className="muted" lang={LANG}>{next.titleEs}</p><div className="steps-dots">{STEPS.map((s, i) => <span key={s.title} className={p.steps[`${next.id}:${i}`] !== undefined ? 'done' : i === step ? 'now' : ''}>{p.steps[`${next.id}:${i}`] !== undefined ? '✓' : i + 1} {s.title}</span>)}</div></>
          : <p className="muted">Keep reviewing, or test yourself with a mock exam.</p>}
        {dailyDone
          ? <><p className="small daily-note"><Icon name="shield" size={16} /> Daily session done today.</p>
            <div className="row wrap"><Link className="btn primary" to={lessonLink}>{lessonLabel}</Link><Link className="btn" to="/course">All lessons</Link></div></>
          : <><p className="small muted daily-note">Today’s session{plan.length ? `: ${plan.join(' · ')}` : ''}. About 10 minutes.</p>
            <div className="row wrap"><Link className="btn primary" to="/daily">Start daily session</Link><Link className="btn" to={lessonLink}>{next ? 'Lesson only' : 'Browse course'}</Link></div></>}
      </section>
      <aside className="dashboard-sidebar">
        <section className="card dashboard-streak">
          <div className="streak-row">
            <div>
              <h2><span aria-hidden="true">🔥</span> {days}-day streak</h2>
              <p className="small muted">{xpToday >= goal ? 'Daily goal reached!' : days > 0 ? `${goal - xpToday} XP to today’s goal` : 'A few minutes a day builds a streak.'}</p>
              <p className="small muted" title="Every 7 days of practice earns a shield. A shield keeps your streak alive on a day you miss.">
                <span aria-hidden="true">🛡️</span> {shieldCount}/{MAX_SHIELDS} streak shields{shieldCount === 0 ? ' · practise 7 days to earn one' : ''}
              </p>
            </div>
            <GoalRing value={xpToday} goal={goal} />
          </div>
          {savedYesterday && <p className="small">A shield kept your streak alive yesterday. Welcome back!</p>}
          {unitsToday >= 3 && <p className="small">Great work today! Your memory sorts new words while you sleep, so tomorrow’s review will make them stick.</p>}
        </section>
        <section className="card dashboard-review">
          <div className="section-heading"><h2>Your words</h2><Link className="link small" to="/review">{due ? `${due} due →` : 'Review →'}</Link></div>
          <div className="stats">
            <div><strong>{counts.learning}</strong><span>learning</span></div>
            <div><strong>{counts.familiar}</strong><span>familiar</span></div>
            <div><strong>{counts.known}</strong><span>known</span></div>
          </div>
          {mistakes > 0 && <p className="small muted">{mistakes} mistakes ready to revisit</p>}
        </section>
      </aside>
    </div>
    <section className="card"><div className="section-heading"><h2>Practice</h2><Link className="link small" to="/practice">All activities →</Link></div><div className="activity-links">{ACTIVITIES.map(([to,label,icon]) => <Link key={to} to={to} className="activity-link"><span className="activity-label"><Icon name={icon} size={17} />{label}</span><span aria-hidden="true">→</span></Link>)}</div></section>
    <div className="dashboard-bottom">
      <section className="card"><div className="section-heading"><h2>Course progress</h2><Link className="link small" to="/progress">Progress →</Link></div><p className="small muted">{done}/{UNITS.length} lessons</p>
        {LEVELS.map(level => { const units = UNITS.filter(u => u.level === level); const finished = units.filter(u => p.units[u.id]).length; return <div className="level-progress" key={level}><span className={`badge ${level}`}>{level}</span><div className="bar" role="progressbar" aria-label={`${level} lessons`} aria-valuenow={finished} aria-valuemin={0} aria-valuemax={units.length}><div style={{ width: `${finished / Math.max(1, units.length) * 100}%` }} /></div><span className="small muted">{finished}/{units.length}</span></div>; })}
      </section>
      {word && <section className="card dashboard-word"><span className="tag">Word of the day</span><div className="row"><h2 lang={LANG}>{word.es}</h2><SpeakButton text={word.es} /></div><p>{word.en}</p><Link className="link small" to="/practice/words">Word bank →</Link></section>}
    </div>
    <p className="small muted center-text"><a href="./privacy.html">Privacy policy</a></p>
  </div>;
}
