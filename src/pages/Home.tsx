import { Link } from '../components/Nav';
import { UNITS, WORDS } from '../data/course';
import { useProgress, streak, today } from '../lib/store';
import { strength } from '../lib/srs';
import { SpeakButton } from '../components/SpeakButton';

export function Home() {
  const p = useProgress();
  const now = Date.now();
  const due = Object.values(p.cards).filter((c) => c.due <= now).length;
  const next = UNITS.find((u) => !p.units[u.id]);
  const xpToday = p.xp[today()] ?? 0;
  const goalPct = Math.min(100, (xpToday / p.settings.dailyGoal) * 100);
  const days = streak(p.xp);
  const counts = { learning: 0, familiar: 0, known: 0 };
  for (const c of Object.values(p.cards)) {
    const s = strength(c);
    if (s !== 'new') counts[s]++;
  }
  const d = new Date();
  const seed = d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate();
  const wotd = WORDS[(seed * 7919) % WORDS.length];

  return (
    <div className="page">
      <section className="hero card">
        <div>
          <h1>¡Hola! 👋</h1>
          <p className="muted">{days > 0 ? `🔥 ${days}-day streak — keep it going!` : 'Start a streak today: a few minutes a day is all it takes.'}</p>
        </div>
        <div className="goal">
          <div className="row between small"><span>Today's goal</span><span>{xpToday}/{p.settings.dailyGoal} XP</span></div>
          <div className="bar"><div style={{ width: `${goalPct}%` }} /></div>
        </div>
      </section>

      <div className="grid-2">
        {next ? (
          <Link to={`/unit/${next.id}`} className="card action">
            <span className="tag">{next.level} · Next lesson</span>
            <h2>{next.emoji} {next.title}</h2>
            <p className="muted" lang="es">{next.titleEs}</p>
            <span className="btn primary">{Object.keys(p.units).length ? 'Continue' : 'Start learning'}</span>
          </Link>
        ) : (
          <Link to="/course" className="card action">
            <span className="tag">Course complete</span>
            <h2>🎓 ¡Enhorabuena!</h2>
            <p className="muted">You finished A1–B1. Keep reviewing to lock it in.</p>
          </Link>
        )}
        <Link to="/review" className="card action">
          <span className="tag">Spaced repetition</span>
          <h2>🧠 {due} {due === 1 ? 'word' : 'words'} to review</h2>
          <p className="muted">Reviewing right before you forget is the fastest way to remember.</p>
          <span className={`btn ${due ? 'primary' : ''}`}>{due ? 'Review now' : 'Extra practice'}</span>
        </Link>
      </div>

      <section className="card wotd">
        <span className="tag">Palabra del día · Word of the day</span>
        <div className="row">
          <h2 lang="es">{wotd.es}</h2>
          <SpeakButton text={wotd.es} />
        </div>
        <p>{wotd.en}</p>
        {wotd.ex && <p className="muted" lang="es">“{wotd.ex}” <SpeakButton text={wotd.ex} /> <br /><span className="small">{wotd.exEn}</span></p>}
      </section>

      <section className="grid-4">
        <Link to="/practice/verbs" className="card tile-link"><span>🔁</span>Conjugation</Link>
        <Link to="/practice/sentences" className="card tile-link"><span>🧩</span>Sentences</Link>
        <Link to="/practice/listen" className="card tile-link"><span>🎧</span>Listen mode</Link>
        <Link to="/reading" className="card tile-link"><span>📖</span>Reading</Link>
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
    </div>
  );
}
