import { useCallback, useEffect, useState } from 'react';
import { LANGS, type LangId } from '../data/lang';
import { isAdmin } from '../lib/feedback';
import { useSync } from '../lib/sync';
import { adminSets, clock, assignSet, deleteSet, replaceSet, unassign, uploadSet, validateContent, type PersonalContent } from '../lib/personal';

type Data = Awaited<ReturnType<typeof adminSets>>;
const when = (iso: string) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

/** Admins: upload personal material (a JSON file), give it to a learner by email, see their test results. */
export function AdminPersonal() {
  const { user } = useSync();
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [msg, setMsg] = useState('');
  const load = useCallback(() => { adminSets().then(setData, (e) => setMsg(String(e.message ?? e))); }, []);
  useEffect(() => { if (user) void isAdmin().then(setAdmin); }, [user]);
  useEffect(() => { if (admin) load(); }, [admin, load]);
  if (!user) return <div className="page narrow"><h1>Personal material</h1><p>Sign in as an admin.</p></div>;
  if (admin === false) return <div className="page narrow"><h1>Personal material</h1><p className="muted">This account isn’t an admin.</p></div>;

  return (
    <div className="page">
      <h1>Personal material</h1>
      <p className="muted">Lessons and tests for one learner. Only the people you give it to (and admins) can see it.</p>
      {msg && <p className="warn">{msg}</p>}
      <Upload sets={data?.sets ?? []} onDone={(m) => { setMsg(m); load(); }} />
      {data?.sets.map((s) => {
        const access = data.access.filter((a) => a.set_id === s.id);
        const results = data.results.filter((r) => r.set_id === s.id);
        const c = s.content as PersonalContent;
        return (
          <section key={s.id} className="card admin-set">
            <div className="row between wrap">
              <h2>{LANGS[s.lang as LangId]?.flag} {s.title}</h2>
              <button className="btn danger small-btn" onClick={() => { if (confirm(`Delete “${s.title}” and all its results?`)) void deleteSet(s.id).then(load, (e) => setMsg(e.message)); }}>Delete</button>
            </div>
            <p className="small muted">{c.lessons.length} lessons · {c.lessons.reduce((n, l) => n + l.words.length, 0)} words · {c.tests.length} tests · uploaded {when(s.created_at)}</p>
            <h3>Who can see it</h3>
            {access.length === 0 && <p className="small muted">Nobody yet.</p>}
            <ul className="answer-list">{access.map((a) => <li key={a.user_id}><strong>{a.email}</strong> · tab “{a.tab_name}” <button className="link small" onClick={() => void unassign(s.id, a.user_id).then(load, (e) => setMsg(e.message))}>remove</button></li>)}</ul>
            <Assign setId={s.id} onDone={(m) => { setMsg(m); load(); }} />
            <h3>Test results</h3>
            {results.length === 0 && <p className="small muted">No tests taken yet.</p>}
            {results.map((r) => {
              const t = r.test_id === 'mixed' ? { title: 'Mixed test', exam: undefined } : c.tests.find((x) => x.id === r.test_id);
              const who = data.access.find((a) => a.user_id === r.user_id)?.email ?? 'a learner';
              const pct = Math.round((r.score / r.total) * 100);
              return (
                <details key={r.id} className="result-row">
                  <summary>{t?.exam && <span className="tag">Mock exam</span>} <strong>{t?.title ?? r.test_id}</strong> · {r.score}/{r.total} ({pct}%){t?.exam ? (pct >= t.exam.pass ? ' ✓ passed' : ' ✗ not passed') : ''}{r.seconds != null ? ` · ${clock(r.seconds)} min` : ''} · {who} · <span className="muted">{when(r.created_at)}</span></summary>
                  <table className="answers-table">
                    <thead><tr><th>Question</th><th>Expected</th><th>Answered</th><th /></tr></thead>
                    <tbody>{r.answers.map((a, i) => <tr key={i} className={a.ok ? '' : 'wrong'}><td>{a.q}</td><td>{a.expected}</td><td>{a.given || '—'}</td><td>{a.ok ? '✓' : '✗'}</td></tr>)}</tbody>
                  </table>
                </details>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}

function Upload({ sets, onDone }: { sets: { id: string; title: string }[]; onDone: (m: string) => void }) {
  const [file, setFile] = useState<{ title: string; lang: string; content: PersonalContent } | null>(null);
  const [error, setError] = useState('');
  const [target, setTarget] = useState('new');
  const read = async (f: File) => {
    setError(''); setFile(null);
    try {
      const v = validateContent(JSON.parse(await f.text()));
      if (!v.ok) setError(v.error); else setFile(v);
    } catch { setError('That file isn’t valid JSON.'); }
  };
  const save = async () => {
    if (!file) return;
    try {
      if (target === 'new') await uploadSet(file.title, file.lang, file.content); else await replaceSet(target, file.title, file.content);
      setFile(null);
      onDone(target === 'new' ? `“${file.title}” uploaded. Now give it to a learner below.` : `“${file.title}” updated (results kept).`);
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); }
  };
  return (
    <section className="card">
      <h2>Upload material</h2>
      <label className="field">Material file (.json)<input type="file" accept="application/json,.json" onChange={(e) => e.target.files?.[0] && void read(e.target.files[0])} /></label>
      {error && <p className="warn small">{error}</p>}
      {file && <>
        <p className="small">{LANGS[file.lang as LangId]?.flag} <strong>{file.title}</strong>: {file.content.lessons.length} lessons, {file.content.lessons.reduce((n, l) => n + l.words.length, 0)} words, {file.content.tests.length} tests, {file.content.tests.reduce((n, t) => n + t.questions.length, 0)} questions.</p>
        <label className="field">Save as<select value={target} onChange={(e) => setTarget(e.target.value)}><option value="new">New material</option>{sets.map((s) => <option key={s.id} value={s.id}>Replace “{s.title}” (keeps who can see it and results)</option>)}</select></label>
        <button className="btn primary" onClick={() => void save()}>Save</button>
      </>}
    </section>
  );
}

function Assign({ setId, onDone }: { setId: string; onDone: (m: string) => void }) {
  const [email, setEmail] = useState('');
  const [tab, setTab] = useState('Mu kalli jaoks');
  const [busy, setBusy] = useState(false);
  return (
    <form className="row wrap assign-form" onSubmit={(e) => { e.preventDefault(); setBusy(true); void assignSet(setId, email, tab).then(() => { onDone(`Given to ${email}.`); setEmail(''); }, (err) => onDone(err.message)).finally(() => setBusy(false)); }}>
      <input type="email" required placeholder="Learner’s email (they must have signed in once)" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" required maxLength={60} placeholder="Tab name" value={tab} onChange={(e) => setTab(e.target.value)} aria-label="Tab name" />
      <button className="btn" disabled={busy}>Give access</button>
    </form>
  );
}
