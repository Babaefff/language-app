import { AccountCard } from '../components/AccountCard';
import { LinguaBloom, useBloomData } from '../components/LinguaBloom';
import { userName } from '../components/AccountButton';
import { UNITS, WORDS } from '../data/course';
import { EXAMS } from '../data/exams';
import { LANG, LANGS, switchLanguage, type LangId } from '../data/lang';
import { SONGS } from '../data/readings';
import { bestStreak, readProgressFor, streak, updateSettings, useProgress, type Progress } from '../lib/store';
import { strength } from '../lib/srs';
import { accountsEnabled, configProblem, useSync } from '../lib/sync';

const totalXp = (p: Progress) => Object.values(p.xp).reduce((a, b) => a + b, 0);
const learned = (p: Progress) => Object.values(p.cards).filter((c) => strength(c) !== 'new').length;

export function Account() {
  const p = useProgress();
  const { user, status, lastSync } = useSync();
  const signedIn = !!user;
  const days = streak(p.xp);
  const best = Math.max(days, bestStreak(p.xp));
  const lessons = Object.keys(p.units).length;
  const examsPassed = EXAMS.filter((e) => p.exams[e.id] && Object.values(p.exams[e.id].scores).every((s) => s >= 60)).length;
  const songsDone = SONGS.filter((s) => p.readings[s.id]).length;
  const a1 = UNITS.filter((u) => u.level === 'A1');

  const achievements = [
    { icon: '🌱', title: 'First steps', text: 'Finish your first lesson', done: lessons >= 1 },
    { icon: '🔥', title: 'On fire', text: 'Reach a 7-day streak', done: best >= 7 },
    { icon: '📚', title: 'Word collector', text: 'Learn 100 words', done: learned(p) >= 100 },
    { icon: '🧠', title: 'Word master', text: 'Learn 500 words', done: learned(p) >= 500 },
    { icon: '🏅', title: 'A1 complete', text: 'Finish every A1 lesson', done: a1.length > 0 && a1.every((u) => p.units[u.id]) },
    { icon: '🎓', title: 'Exam ready', text: 'Pass a mock exam', done: examsPassed > 0 },
    { icon: '🎵', title: 'Singer', text: 'Finish a song', done: songsDone > 0 },
    { icon: '⚡', title: '1,000 XP', text: 'Earn 1,000 XP', done: totalXp(p) >= 1000 },
  ];
  const earned = achievements.filter((a) => a.done).length;
  const name = user ? userName(user) : undefined;
  const bloom = useBloomData();
  const glyph = p.settings.avatarGlyph || (name ? name[0].toUpperCase() : '★');
  const seed = `${user?.id ?? 'guest'}:${p.settings.avatarShuffle}`;
  const since = user?.created_at ? new Date(user.created_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : null;
  const langs = (Object.keys(LANGS) as LangId[]).map((id) => {
    const lp = id === LANG ? p : readProgressFor(id);
    return { id, xp: totalXp(lp), lessons: Object.keys(lp.units).length, words: learned(lp) };
  });

  return (
    <div className="page narrow">
      <section className="card profile-head">
        <LinguaBloom seed={seed} glyph={glyph} data={bloom} size={92} />
        <div className="profile-who">
          <h1>{signedIn ? name : 'Your profile'}</h1>
          {signedIn && <p className="small profile-email">{user!.email}</p>}
          <p className="muted small">
            {signedIn
              ? <>{since && <>Learning since {since} · </>}{status === 'error' ? '⚠️ Sync problem' : status === 'syncing' ? 'Saving…' : `☁️ Synced${lastSync ? ` ${new Date(lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}`}</>
              : 'Not signed in — your progress is saved on this device only.'}
          </p>
        </div>
      </section>

      {!signedIn && accountsEnabled && !configProblem && (
        <section className="card signin-panel">
          <h2>Save your progress</h2>
          <ul className="benefits">
            <li>☁️ Keep your progress safe — even if you clear your browser.</li>
            <li>📱 Continue on your phone, tablet or computer.</li>
            <li>🔒 No password: sign in with Google or an email link.</li>
          </ul>
          <AccountCard bare />
        </section>
      )}

      <section className="card bloom-card">
        <div className="row between wrap">
          <h2>🌸 Your Lingua Bloom</h2>
          <button className="btn small-btn" onClick={() => updateSettings({ avatarShuffle: p.settings.avatarShuffle + 1 })}>🎲 New pattern</button>
        </div>
        <p className="muted small">Your avatar is unique to you and grows as you learn: <strong>every lesson adds a petal</strong> (a second ring opens after 10), petals wear the colours of the language you’re learning, the <strong>gold dots</strong> are your streak days and the <strong>outer ring</strong> shows your level — grey, then green A1, blue A2, purple B1.</p>
        <div className="glyphs" role="radiogroup" aria-label="Avatar centre">
          {['', '🦉', '🦊', '🐻', '🐱', '🐸', '🌻', '⭐', '🚀', '🎧', '📚'].map((g) => (
            <button key={g || 'initial'} role="radio" aria-checked={p.settings.avatarGlyph === g} className={p.settings.avatarGlyph === g ? 'on' : ''} onClick={() => updateSettings({ avatarGlyph: g })}>
              {g || (name ? name[0].toUpperCase() : '★')}
            </button>
          ))}
        </div>
      </section>

      <section className="stat-grid">
        <div className="card stat"><span>🔥</span><strong>{days}</strong><small>day streak</small></div>
        <div className="card stat"><span>🏆</span><strong>{best}</strong><small>best streak</small></div>
        <div className="card stat"><span>⚡</span><strong>{totalXp(p).toLocaleString()}</strong><small>total XP</small></div>
        <div className="card stat"><span>📚</span><strong>{learned(p)}</strong><small>of {WORDS.length} words</small></div>
        <div className="card stat"><span>✅</span><strong>{lessons}</strong><small>of {UNITS.length} lessons</small></div>
        <div className="card stat"><span>📝</span><strong>{examsPassed}</strong><small>exams passed</small></div>
      </section>

      <section className="card">
        <h2>Languages</h2>
        <p className="muted small">Each language keeps its own progress.</p>
        {langs.map((l) => (
          <div key={l.id} className={`lang-row ${l.id === LANG ? 'current' : ''}`}>
            <span className="lang-flag">{LANGS[l.id].flag}</span>
            <div className="lang-info">
              <strong>{LANGS[l.id].name}</strong>
              <span className="muted small">{l.xp.toLocaleString()} XP · {l.lessons} {l.lessons === 1 ? 'lesson' : 'lessons'} · {l.words} {l.words === 1 ? 'word' : 'words'}</span>
            </div>
            {l.id === LANG ? <span className="tag">Learning now</span> : <button className="btn small-btn" onClick={() => switchLanguage(l.id)}>Switch</button>}
          </div>
        ))}
      </section>

      <section className="card">
        <div className="row between"><h2>Achievements</h2><span className="muted small">{earned}/{achievements.length}</span></div>
        <div className="badges">
          {achievements.map((a) => (
            <div key={a.title} className={`badge-tile ${a.done ? 'earned' : ''}`} title={a.text}>
              <span>{a.icon}</span>
              <strong>{a.title}</strong>
              <small>{a.text}</small>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
