import { useState } from 'react';
import { L, LANG } from '../data/lang';
import { PracticePlan } from '../components/PracticePlan';
import { Link } from '../components/Nav';
import { UNITS, WORDS } from '../data/course';
import { LEVELS } from '../data/types';
import { useProgress, streak, today, shields, MAX_SHIELDS } from '../lib/store';
import { strength } from '../lib/srs';
import { STEPS } from '../lib/exercises';
import { SpeakButton } from '../components/SpeakButton';
import { accountsEnabled, configProblem, useSync } from '../lib/sync';

const BANNER_KEY = 'hablo:hideSigninBanner';
const bannerHidden = () => { try { return localStorage.getItem(BANNER_KEY) === '1'; } catch { return false; } };

/** Daily goal as a ring around today's XP. */
function GoalRing({ value, goal }: { value: number; goal: number }) {
  const pct = Math.min(100, Math.round((value / Math.max(1, goal)) * 100));
  return (
    <div className="ring" style={{ background: `conic-gradient(var(--primary) ${pct * 3.6}deg, var(--surface-2) 0)` }} aria-label={`Today: ${value} of ${goal} XP`}>
      <div><strong>{value}</strong><span>/{goal} XP</span></div>
    </div>
  );
}

export function Home() {
  const p = useProgress();
  const { user } = useSync();
  const [hideBanner, setHideBanner] = useState(bannerHidden);
  const now = Date.now();
  const due = Object.values(p.cards).filter((c) => c.due <= now).length;
  const nextIndex = UNITS.findIndex((u) => !p.units[u.id]);
  const next = nextIndex >= 0 ? UNITS[nextIndex] : null;
  const stepDone = (i: number) => !!next && p.steps[`${next.id}:${i}`] !== undefined;
  const step = next ? Math.max(0, STEPS.findIndex((_, i) => !stepDone(i))) : 0;
  const started = !!next && STEPS.some((_, i) => stepDone(i));
  const xpToday = p.xp[today()] ?? 0;
  const days = streak(p.xp, p.frozen);
  const shieldCount = shields(p);
  const y = new Date(); y.setDate(y.getDate() - 1);
  const savedYesterday = !!p.frozen[today(y)];
  // Spacing beats cramming: after a big day, encourage coming back tomorrow rather than more today.
  const unitsToday = Object.values(p.units).filter((u) => today(new Date(u.completedAt)) === today()).length;
  const counts = { learning: 0, familiar: 0, known: 0 };
  for (const c of Object.values(p.cards)) {
    const s = strength(c);
    if (s !== 'new') counts[s]++;
  }
  const d = new Date();
  const seed = d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate();
  const wotd = WORDS[(seed * 7919) % WORDS.length];
  const showBanner = accountsEnabled && !configProblem && !user && !hideBanner;

  return (
    <div className="page">
      {showBanner && (
        <div className="card signin-banner">
          <span>☁️ <strong>Save your progress</strong> — sign in to keep it safe and continue on any device.</span>
          <div className="row">
            <Link to="/account" className="btn primary">Sign in</Link>
            <button className="icon-btn" aria-label="Hide" onClick={() => { setHideBanner(true); try { localStorage.setItem(BANNER_KEY, '1'); } catch { /* storage blocked */ } }}>✕</button>
          </div>
        </div>
      )}

      <section className="hero card">
        <div className="hero-text">
          <h1>{L.hello} 👋</h1>
          <p className="muted">{days > 0 ? `🔥 ${days}-day streak — keep it going!` : 'Start a streak today: a few minutes a day is all it takes.'}</p>
          <p className="small muted">{xpToday >= p.settings.dailyGoal ? '🎉 Daily goal reached!' : `${p.settings.dailyGoal - xpToday} XP to today’s goal — about one lesson step.`}</p>
          <p className="small muted" title="Every 7 days of practice earns a shield. A shield keeps your streak alive on a day you miss.">
            🛡️ {shieldCount} of {MAX_SHIELDS} streak shields{shieldCount === 0 ? ' — practise 7 days to earn one' : ''}
          </p>
          {savedYesterday && <p className="small">🛡️ A shield kept your streak alive yesterday. Welcome back!</p>}
          {unitsToday >= 3 && <p className="small">💪 Great work today! Your memory sorts new words while you sleep, so tomorrow's review will make them stick.</p>}
        </div>
        <GoalRing value={xpToday} goal={p.settings.dailyGoal} />
      </section>


      {next ? (
        <Link to={`/unit/${next.id}`} className="card lesson-cta">
          <div className="lesson-emoji">{next.emoji}</div>
          <div className="lesson-body">
            <span className="tag">{next.level} · Lesson {nextIndex + 1} of {UNITS.length}</span>
            <h2>{next.title}</h2>
            <p className="muted" lang={LANG}>{next.titleEs}</p>
            <div className="steps-dots">
              {STEPS.map((s, i) => (
                <span key={s.title} className={stepDone(i) ? 'done' : i === step ? 'now' : ''}>{stepDone(i) ? '✓' : i + 1} {s.title}</span>
              ))}
            </div>
            <span className="btn primary big-btn">▶ {started ? `Continue: ${STEPS[step].title}` : Object.keys(p.units).length ? 'Start next lesson' : 'Start your first lesson'}</span>
          </div>
        </Link>
      ) : (
        <Link to="/course" className="card lesson-cta">
          <div className="lesson-emoji">🎓</div>
          <div className="lesson-body">
            <span className="tag">Course complete</span>
            <h2>You finished A1–B1!</h2>
            <p className="muted">Keep reviewing, or test yourself with a mock exam.</p>
          </div>
        </Link>
      )}

      {!p.settings.planTime && Object.keys(p.units).length > 0 && days < 30 && <PracticePlan />}
      <section className="card">
        <div className="row between"><h3>Your course</h3><Link to="/course" className="link small">All lessons →</Link></div>
        {LEVELS.map((lv) => {
          const units = UNITS.filter((u) => u.level === lv);
          const done = units.filter((u) => p.units[u.id]).length;
          return (
            <div key={lv} className="level-progress">
              <span className={`badge ${lv}`}>{lv}</span>
              <div className="bar"><div style={{ width: `${(done / Math.max(1, units.length)) * 100}%` }} /></div>
              <span className="small muted">{done}/{units.length}</span>
            </div>
          );
        })}
      </section>

      <div className="grid-2">
        <Link to="/review" className="card action">
          <span className="tag">Spaced repetition</span>
          <h2>🧠 {due} {due === 1 ? 'word' : 'words'} to review</h2>
          <p className="muted">Reviewing right before you forget is the fastest way to remember.</p>
          <span className={`btn ${due ? 'primary' : ''}`}>{due ? 'Review now' : 'Extra practice'}</span>
        </Link>
        <section className="card wotd">
          <span className="tag">{L.wordOfDay} · Word of the day</span>
          <div className="row">
            <h2 lang={LANG}>{wotd.es}</h2>
            <SpeakButton text={wotd.es} />
          </div>
          <p>{wotd.en}</p>
          {wotd.ex && <p className="muted" lang={LANG}>“{wotd.ex}” <SpeakButton text={wotd.ex} /> <br /><span className="small">{wotd.exEn}</span></p>}
        </section>
      </div>

      <section className="grid-4">
        <Link to="/songs" className="card tile-link"><span>🎵</span>Songs</Link>
        <Link to="/practice/speaking" className="card tile-link"><span>🎤</span>Speaking</Link>
        <Link to="/pronunciation" className="card tile-link"><span>🔤</span>Pronunciation</Link>
        <Link to="/exam" className="card tile-link"><span>📝</span>Mock exams</Link>
        <Link to="/writing" className="card tile-link"><span>✍️</span>Writing</Link>
        <Link to="/practice/verbs" className="card tile-link"><span>🔁</span>Conjugation</Link>
        <Link to="/practice/sentences" className="card tile-link"><span>🧩</span>Sentences</Link>
        <Link to="/practice/listen" className="card tile-link"><span>🎧</span>Listen mode</Link>
      </section>

      <section className="card">
        <h3>Your words</h3>
        <div className="stats">
          <div><strong>{counts.learning}</strong><span>learning</span></div>
          <div><strong>{counts.familiar}</strong><span>familiar</span></div>
          <div><strong>{counts.known}</strong><span>known</span></div>
          <div><strong>{WORDS.length}</strong><span>in course</span></div>
        </div>
      </section>
      <p className="small muted center-text"><a href="./privacy.html">Privacy policy</a></p>
    </div>
  );
}
