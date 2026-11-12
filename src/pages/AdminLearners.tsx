import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '../components/Nav';
import { LANG, LANGS, type LangId } from '../data/lang';
import { WORD_MAP } from '../data/course';
import { EXAMS } from '../data/exams';
import { allFeedback, isAdmin, type Feedback } from '../lib/feedback';
import { adminLearners, adminSets, drillState, type Learner, type PersonalContent } from '../lib/personal';
import { streak, today } from '../lib/store';
import { useSync } from '../lib/sync';

type Sets = Awaited<ReturnType<typeof adminSets>>;
interface Data { learners: Learner[]; sets: Sets; feedback: Feedback[] }

const DAY = 86_400_000;
const ago = (iso: string | null | undefined) => {
  if (!iso) return 'never';
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / DAY);
  return d <= 0 ? 'today' : d === 1 ? 'yesterday' : `${d} days ago`;
};
const flag = (lang: string) => LANGS[lang as LangId]?.flag ?? lang;

/** All XP of a learner by day, across languages. */
function xpByDay(l: Learner) {
  const out: Record<string, number> = {};
  for (const p of l.progress) for (const [d, n] of Object.entries(p.xp)) out[d] = (out[d] ?? 0) + n;
  return out;
}
function xpLast(xp: Record<string, number>, days: number) {
  let sum = 0;
  for (let k = 0; k < days; k++) sum += xp[today(new Date(Date.now() - k * DAY))] ?? 0;
  return sum;
}

/** Summary of a learner's personal material: drill progress, danger words, mock exams. */
function personalSummary(d: Data, uid: string) {
  const mine = d.sets.access.filter((a) => a.user_id === uid);
  return mine.map((a) => {
    const set = d.sets.sets.find((s) => s.id === a.set_id);
    if (!set) return null;
    const c = set.content as PersonalContent;
    const results = d.sets.results.filter((r) => r.user_id === uid && r.set_id === set.id);
    const drill = drillState(c, results, set.id);
    const exams = c.tests.filter((t) => t.exam).map((t) => {
      const tries = results.filter((r) => r.test_id === t.id);
      const best = tries.length ? Math.max(...tries.map((r) => Math.round((r.score / r.total) * 100))) : null;
      return { id: t.id, title: t.title, pass: t.exam!.pass, best, tries: tries.length };
    });
    return { set, tab: a.tab_name, results, drill, exams };
  }).filter((x): x is NonNullable<typeof x> => !!x);
}

function useAdminData() {
  const { user } = useSync();
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [msg, setMsg] = useState('');
  useEffect(() => { if (user) void isAdmin().then(setAdmin); }, [user]);
  useEffect(() => {
    if (!admin) return;
    Promise.all([adminLearners(), adminSets(), allFeedback('all')])
      .then(([learners, sets, feedback]) => setData({ learners, sets, feedback }), (e) => setMsg(String(e.message ?? e)));
  }, [admin]);
  return { user, admin, data, msg };
}

/** Admins: every learner at a glance. */
export function AdminLearners() {
  const { user, admin, data, msg } = useAdminData();
  if (!user) return <div className="page narrow"><h1>Learners</h1><p>Sign in as an admin.</p></div>;
  if (admin === false) return <div className="page narrow"><h1>Learners</h1><p className="muted">This account isn’t an admin.</p></div>;
  return (
    <div className="page">
      <h1>Learners</h1>
      <p className="muted">Everyone with an account. Tap a learner for their activity, words, exams and feedback.</p>
      {msg && <p className="warn">{msg}</p>}
      {!data && !msg && <p className="muted">Loading…</p>}
      <div className="learner-list">
        {data?.learners.map((l) => {
          const xp = xpByDay(l);
          const known = l.progress.reduce((n, p) => n + p.known, 0);
          const personal = personalSummary(data, l.user_id);
          const danger = l.progress.reduce((n, p) => n + p.danger.length, 0) + personal.reduce((n, p) => n + p.drill.filter((w) => w.danger).length, 0);
          const open = data.feedback.filter((f) => f.user_id === l.user_id && f.status === 'open').length;
          const lastResult = personal.flatMap((p) => p.results).map((r) => r.created_at).sort().at(-1);
          const last = [l.progress[0]?.updated_at, lastResult].filter(Boolean).sort().at(-1) ?? l.last_sign_in_at;
          return (
            <Link key={l.user_id} to={`/admin/learners/${l.user_id}`} className="card action learner-row">
              <div className="learner-top">
                <strong className="learner-email">{l.email}</strong>
                <span className="muted small">{l.progress.map((p) => flag(p.lang)).join(' ')}{personal.length ? ' 💛' : ''}</span>
              </div>
              <div className="learner-stats small">
                <span>Active {ago(last)}</span>
                <span>{xpLast(xp, 7)} XP this week</span>
                <span>{known} words known</span>
                {danger > 0 && <span className="bad-text">{danger} danger</span>}
                {open > 0 && <span className="warn-text">{open} open feedback</span>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/** Admins: one learner in detail. */
export function AdminLearner() {
  const { id } = useParams();
  const { user, admin, data, msg } = useAdminData();
  if (!user || admin === false) return <AdminLearners />;
  const l = data?.learners.find((x) => x.user_id === id);
  if (!data || !l) return <div className="page narrow"><p><Link to="/admin/learners">← Learners</Link></p>{msg ? <p className="warn">{msg}</p> : <p className="muted">{data ? 'Learner not found.' : 'Loading…'}</p>}</div>;

  const xp = xpByDay(l);
  const personal = personalSummary(data, l.user_id);
  const feedback = data.feedback.filter((f) => f.user_id === l.user_id);
  const open = feedback.filter((f) => f.status === 'open');
  // Days with personal tests count as active too.
  const testDays = new Set(personal.flatMap((p) => p.results).map((r) => today(new Date(r.created_at))));
  const days = Array.from({ length: 28 }, (_, k) => { const d = today(new Date(Date.now() - (27 - k) * DAY)); return { d, xp: xp[d] ?? 0, test: testDays.has(d) }; });
  const activeDays = days.filter((d) => d.xp > 0 || d.test).length;

  return (
    <div className="page learner-page">
      <p><Link to="/admin/learners">← Learners</Link></p>
      <h1 className="learner-email">{l.email}</h1>
      <p className="muted small">Joined {ago(l.created_at)} · last sign-in {ago(l.last_sign_in_at)}</p>

      <section className="card">
        <h2>Activity</h2>
        <div className="learner-kpis">
          <div><div className="big-number">{activeDays}</div><span className="small muted">active days of 28</span></div>
          <div><div className="big-number">{streak(xp)}</div><span className="small muted">day streak</span></div>
          <div><div className="big-number">{xpLast(xp, 7)}</div><span className="small muted">XP this week</span></div>
        </div>
        <div className="activity-grid" aria-label="Last 28 days">
          {days.map((d) => <span key={d.d} title={`${d.d}: ${d.xp} XP${d.test ? ', personal test' : ''}`} className={`act-cell ${d.xp >= 50 ? 'a3' : d.xp >= 20 ? 'a2' : d.xp > 0 || d.test ? 'a1' : ''}`} />)}
        </div>
        <p className="small muted">Last 28 days, oldest first. Darker = more XP.</p>
      </section>

      {personal.map((p) => {
        const known = p.drill.filter((w) => w.known).length;
        const danger = p.drill.filter((w) => w.danger);
        return (
          <section key={p.set.id} className="card">
            <h2>💛 {p.tab} · {p.set.title}</h2>
            <p><strong>{known}</strong> of {p.drill.length} words known in the drill · {p.drill.filter((w) => !w.seen).length} not tried yet · {p.results.length} tests taken</p>
            <h3>Danger words ({danger.length})</h3>
            {danger.length ? <p className="danger-words">{danger.map((w) => <span key={w.de} className="chip" title={`${w.wrong} mistakes`}>{w.de} <span className="muted">· {w.en}</span></span>)}</p> : <p className="small muted">None 🎉</p>}
            <h3>Mock exams</h3>
            {p.exams.length === 0 && <p className="small muted">This material has no mock exams.</p>}
            <ul className="answer-list">
              {p.exams.map((e) => <li key={e.id}>{e.title}: {e.best == null ? <span className="muted">not taken</span> : <><strong>best {e.best}%</strong> {e.best >= e.pass ? '✓ passed' : `✗ pass mark ${e.pass}%`} · {e.tries} {e.tries === 1 ? 'try' : 'tries'}</>}</li>)}
            </ul>
            <p className="small"><Link to="/admin/personal">See every answer →</Link></p>
          </section>
        );
      })}

      {l.progress.map((p) => (
        <section key={p.lang} className="card">
          <h2>{flag(p.lang)} {LANGS[p.lang as LangId]?.name ?? p.lang} course</h2>
          <p className="small muted">Last saved {ago(p.updated_at)}</p>
          <div className="learner-kpis">
            <div><div className="big-number">{p.known}</div><span className="small muted">words known</span></div>
            <div><div className="big-number">{p.words - p.known - p.learning}</div><span className="small muted">familiar</span></div>
            <div><div className="big-number">{p.learning}</div><span className="small muted">learning</span></div>
            <div><div className="big-number">{p.due}</div><span className="small muted">due now</span></div>
          </div>
          <p className="small">{p.units} lessons finished</p>
          <h3>Danger words ({p.danger.length})</h3>
          {p.danger.length ? (
            <p className="danger-words">{p.danger.map((k) => { const w = p.lang === LANG ? WORD_MAP[k] : undefined; return <span key={k} className="chip">{w ? <>{w.es} <span className="muted">· {w.en}</span></> : k}</span>; })}</p>
          ) : <p className="small muted">None 🎉</p>}
          <h3>Mock exams</h3>
          {Object.keys(p.exams).length === 0 ? <p className="small muted">None taken.</p> : (
            <ul className="answer-list">
              {Object.entries(p.exams).map(([eid, r]) => <li key={eid}>{(p.lang === LANG ? EXAMS.find((e) => e.id === eid)?.title : undefined) ?? eid}: <strong>best {Math.round(r.best)}%</strong> · {ago(new Date(r.at).toISOString())}</li>)}
            </ul>
          )}
        </section>
      ))}
      {l.progress.length === 0 && personal.length === 0 && <p className="muted">No progress saved to the account yet.</p>}

      <section className="card">
        <h2>Feedback ({open.length} open)</h2>
        {feedback.length === 0 && <p className="small muted">No feedback sent.</p>}
        <ul className="answer-list">
          {feedback.slice(0, 20).map((f) => <li key={f.id}><span className={`fb-status ${f.status}`}>{f.status}</span> {flag(f.lang)} <strong>{f.context.title ?? f.context.route}</strong>: {f.message || <span className="muted">({f.category})</span>} <span className="muted small">· {ago(f.created_at)}</span></li>)}
        </ul>
        {open.length > 0 && <p className="small"><Link to="/admin">Answer in the feedback inbox →</Link></p>}
      </section>
    </div>
  );
}
