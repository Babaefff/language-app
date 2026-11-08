import { L, LANG } from '../data/lang';
import { Link } from '../components/Nav';
import { UNITS, WORDS } from '../data/course';
import { LEVELS } from '../data/types';
import { useProgress, streak, today } from '../lib/store';
import { STEPS } from '../lib/exercises';
import { SpeakButton } from '../components/SpeakButton';
import { dueMistakes } from '../lib/learning';

export function Home() {
  const p = useProgress();
  const due = Object.values(p.cards).filter(c => c.due <= Date.now()).length;
  const next = UNITS.find(u => !p.units[u.id] && STEPS.some((_, i) => p.steps[`${u.id}:${i}`] === undefined));
  const step = next ? Math.max(0, STEPS.findIndex((_, i) => p.steps[`${next.id}:${i}`] === undefined)) : 0;
  const date = new Date();
  const seed = date.getFullYear() * 372 + date.getMonth() * 31 + date.getDate();
  const word = WORDS[(seed * 7919) % WORDS.length];
  const mistakes = dueMistakes(p.learning).length;
  const complete = p.learning.daily.includes(today());
  const done = UNITS.filter(u => p.units[u.id]).length;
  return <div className="page home-page">
    <header className="home-heading"><div><span className="eyebrow">Your everyday language practice</span><h1>{L.hello} <span className="muted">Let’s make it stick.</span></h1></div><span className="date-label">{date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</span></header>
    <section className="daily-hero">
      <div className="hero-copy"><span className="eyebrow">{complete ? 'Today’s session completed' : `${L.name} · A little, often`}</span><h2>Small steps.<br />Lasting words.</h2>
        <p>Recall something familiar. Learn something new.<br className="desktop-break" /> Put it into a sentence. Then take a well-earned pause.</p>
        <Link to="/daily" className="btn primary big-btn">{complete ? 'Practise a little more' : 'Start today’s session'} <span aria-hidden="true">→</span></Link>
        <span className="small muted">One lesson step, plus a small review batch. No rush.</span>
      </div>
      <div className="session-preview" aria-label="Daily session plan">
        <span className="eyebrow">A plan for today</span>
        <div><span className="plan-dot">01</span><p><strong>Bring it back</strong><span>{due ? `${Math.min(due, 5)} due words to recall` : 'Reviews appear as you learn'}</span></p><span aria-hidden="true">↺</span></div>
        <div><span className="plan-dot">02</span><p><strong>Build on what you know</strong><span>{next ? next.title : 'Your course is complete'}</span></p><span aria-hidden="true">＋</span></div>
        <div><span className="plan-dot">03</span><p><strong>Make it useful</strong><span>Sentence checks as you progress</span></p><span aria-hidden="true">→</span></div>
      </div>
    </section>
    <div className="section-heading"><h2>Pick up where you left off</h2><Link className="link small" to="/practice">Explore practice →</Link></div>
    <div className="focus-grid">
      <Link to={next ? `/unit/${next.id}` : '/course'} className="card focus-card"><span className="focus-icon" aria-hidden="true">▤</span><span className="eyebrow">Continue your course</span><h3>{next?.title ?? 'Course complete'}</h3><p className="muted small">{next ? `${next.level} · ${STEPS[step].title}` : 'Revisit a lesson at your own pace.'}</p><span className="text-action">Open lesson <span aria-hidden="true">→</span></span></Link>
      <Link to="/review" className="card focus-card"><span className="focus-icon" aria-hidden="true">↺</span><span className="eyebrow">Keep it in memory</span><h3>{due ? `${due} words ready to review` : 'Your review space'}</h3><p className="muted small">{mistakes ? `${mistakes} mistakes ready for another try.` : 'Recall first. Check your answer. Let time do its part.'}</p><span className="text-action">Open review <span aria-hidden="true">→</span></span></Link>
      <Link to="/progress" className="card focus-card"><span className="focus-icon" aria-hidden="true">⌁</span><span className="eyebrow">Notice your learning</span><h3>Beyond the streak</h3><p className="muted small">See what you remember after a break and use in a sentence.</p><span className="text-action">Learning insights <span aria-hidden="true">→</span></span></Link>
    </div>
    <div className="home-lower">
      <section className="card course-glance"><div className="section-heading"><h2>Your path through {L.name}</h2><Link className="link small" to="/course">View course →</Link></div>
        <p className="muted small">{done} of {UNITS.length} lessons completed · {streak(p.xp, p.frozen)} day streak</p>
        {LEVELS.map(level => { const units = UNITS.filter(u => u.level === level); const finished = units.filter(u => p.units[u.id]).length; return <div className="level-progress" key={level}><span className={`badge ${level}`}>{level}</span><div className="bar" role="progressbar" aria-label={`${level} lessons`} aria-valuenow={finished} aria-valuemin={0} aria-valuemax={units.length}><div style={{ width: `${finished / Math.max(1, units.length) * 100}%` }} /></div><span className="small muted">{finished}/{units.length}</span></div>; })}
      </section>
      {word && <section className="card word-feature"><span className="eyebrow">A word for today</span><div className="row"><h2 lang={LANG}>{word.es}</h2><SpeakButton text={word.es} /></div><p>{word.en}</p>{word.ex && <p className="muted small" lang={LANG}>{word.ex}</p>}<Link to="/practice/words" className="link small">Explore your word bank →</Link></section>}
    </div>
    <p className="small muted center-text">A little practice, a little space, a little progress. <a className="link" href="./privacy.html">Privacy</a></p>
  </div>;
}
