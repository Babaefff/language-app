import { useCallback, useEffect, useState } from 'react';
import { Link } from '../components/Nav';
import { LANGS, type LangId } from '../data/lang';
import { allFeedback, CATEGORIES, EXERCISE_KIND, isAdmin, markSeen, myFeedback, openFeedbackPlace, resolveFeedback, type Feedback } from '../lib/feedback';
import { accountsEnabled, useSync } from '../lib/sync';

const CAT = Object.fromEntries(CATEGORIES) as Record<string, string>;
const STATUS: Record<Feedback['status'], string> = { open: 'Open', resolved: 'Fixed', declined: 'No change needed' };
const when = (iso: string) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

/** "2 hours ago", "yesterday", or the date. */
function ago(iso: string) {
  const min = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min} min ago`;
  if (min < 24 * 60) return `${Math.round(min / 60)} h ago`;
  if (min < 48 * 60) return 'yesterday';
  return new Date(iso).toLocaleDateString(undefined, { dateStyle: 'medium' });
}

/** Where the report comes from and what was on screen, in plain words. */
function Where({ f }: { f: Feedback }) {
  const c = f.context;
  const lang = LANGS[f.lang as LangId];
  const e = c.exercise;
  return (
    <dl className="fb-where">
      <dt>Language</dt><dd>{lang ? `${lang.flag} ${lang.name}` : f.lang}</dd>
      <dt>Where</dt><dd>{c.where ? `${c.where} — ` : ''}<strong>{c.title ?? c.route}</strong></dd>
      {c.step && <><dt>Step</dt><dd>{c.step}</dd></>}
      {e && <>
        <dt>Exercise</dt>
        <dd>
          {EXERCISE_KIND[e.kind] ?? e.kind}{e.label ? ` — “${e.label}”` : ''}
          {e.prompt && <div><span className="muted">Shown:</span> {e.prompt}</div>}
          {e.options && <div><span className="muted">Options:</span> {e.options.join(' · ')}</div>}
          {e.answer && <div><span className="muted">Expected answer:</span> <strong>{e.answer}</strong></div>}
          {c.typed && <div><span className="muted">Learner answered:</span> <strong>{c.typed}</strong></div>}
        </dd>
      </>}
    </dl>
  );
}

/** The learner's own reports, with their status and the reply. */
export function MyFeedback() {
  const { user } = useSync();
  const [items, setItems] = useState<Feedback[] | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { if (user) myFeedback().then(setItems, (e) => setError(String(e.message ?? e))); }, [user]);
  if (!accountsEnabled) return <div className="page narrow"><h1>My feedback</h1><p className="muted">Feedback needs an account, which isn’t available here.</p></div>;
  if (!user) return <div className="page narrow"><h1>My feedback</h1><p>Sign in to see your reports.</p><Link className="btn primary" to="/account">Sign in</Link></div>;
  return (
    <div className="page narrow">
      <h1>My feedback</h1>
      <p className="muted">Problems you reported. When one is fixed, you’ll see a thank-you here and on the home page.</p>
      {error && <p className="warn">{error}</p>}
      {items?.length === 0 && <p className="card">No reports yet. Use the flag button in any lesson to report a problem.</p>}
      {items?.map((f) => (
        <section key={f.id} className={`card fb-item ${f.status}`}>
          <div className="row between wrap"><span className={`fb-status ${f.status}`}>{STATUS[f.status]}</span><span className="muted small" title={when(f.created_at)}>{ago(f.created_at)}</span></div>
          <p className="fb-problem"><strong>{CAT[f.category]}</strong>{f.message ? <> — “{f.message}”</> : ''}</p>
          <Where f={f} />
          {f.reply && <p className="fb-reply">💬 {f.reply}</p>}
        </section>
      ))}
    </div>
  );
}

/** Admins: every report, newest first; open the place, then mark it fixed with a thank-you. */
export function AdminFeedback() {
  const { user } = useSync();
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<Feedback['status'] | 'all'>('open');
  const [items, setItems] = useState<Feedback[] | null>(null);
  const [error, setError] = useState('');
  const load = useCallback(() => { allFeedback(filter).then(setItems, (e) => setError(String(e.message ?? e))); }, [filter]);
  useEffect(() => { if (user) isAdmin().then(setAdmin); }, [user]);
  useEffect(() => { if (admin) load(); }, [admin, load]);
  if (!user) return <div className="page narrow"><h1>Feedback inbox</h1><p>Sign in as an admin.</p></div>;
  if (admin === false) return <div className="page narrow"><h1>Feedback inbox</h1><p className="muted">This account isn’t an admin.</p></div>;
  return (
    <div className="page">
      <h1>Feedback inbox</h1>
      <div className="segmented" role="radiogroup" aria-label="Show">
        {(['open', 'resolved', 'declined', 'all'] as const).map((s) => <button key={s} role="radio" aria-checked={filter === s} className={filter === s ? 'on' : ''} onClick={() => setFilter(s)}>{s === 'all' ? 'All' : STATUS[s]}</button>)}
      </div>
      {error && <p className="warn">{error}</p>}
      {items?.length === 0 && <p className="card">Nothing here.</p>}
      {items?.map((f) => <AdminItem key={f.id} f={f} onDone={load} />)}
    </div>
  );
}

function AdminItem({ f, onDone }: { f: Feedback; onDone: () => void }) {
  const [reply, setReply] = useState(f.reply ?? 'Thank you for your report! We fixed it.');
  const [busy, setBusy] = useState(false);
  const set = async (status: Feedback['status'], text: string) => {
    setBusy(true);
    try { await resolveFeedback(f.id, status, text); onDone(); } catch (e) { alert(e instanceof Error ? e.message : String(e)); } finally { setBusy(false); }
  };
  return (
    <section className={`card fb-item ${f.status}`}>
      <div className="row between wrap"><span className={`fb-status ${f.status}`}>{STATUS[f.status]}</span><span className="muted small" title={when(f.created_at)}>{ago(f.created_at)}</span></div>
      <p className="fb-problem"><strong>{CAT[f.category]}</strong>{f.message ? <> — “{f.message}”</> : ''}</p>
      <Where f={f} />
      <div className="row wrap">
        <button className="btn" onClick={() => openFeedbackPlace(f)}>Open {f.context.title ?? 'this lesson'} {LANGS[f.lang as LangId] ? `(${LANGS[f.lang as LangId].name})` : ''} →</button>
      </div>
      <label className="field">Reply to the learner<textarea rows={2} maxLength={2000} value={reply} onChange={(e) => setReply(e.target.value)} /></label>
      <div className="row wrap">
        <button className="btn primary" disabled={busy} onClick={() => void set('resolved', reply)}>Mark fixed &amp; thank</button>
        <button className="btn" disabled={busy} onClick={() => void set('declined', reply === 'Thank you for your report! We fixed it.' ? 'Thank you for your report! We checked it and this one is correct as it is.' : reply)}>No change needed</button>
        {f.status !== 'open' && <button className="btn" disabled={busy} onClick={() => void set('open', '')}>Reopen</button>}
      </div>
    </section>
  );
}

/** Shown once after a report is resolved: "Thank you — it's fixed". */
export function FeedbackThanks() {
  const { user } = useSync();
  const [items, setItems] = useState<Feedback[]>([]);
  useEffect(() => {
    if (!user) { setItems([]); return; }
    myFeedback().then((all) => setItems(all.filter((f) => f.status !== 'open' && !f.seen)), () => setItems([]));
  }, [user]);
  if (!items.length) return null;
  const f = items[0];
  const close = () => { void markSeen(f.id); setItems(items.slice(1)); };
  return (
    <div className="card fb-thanks" role="status">
      <div>
        <strong>{f.status === 'resolved' ? '🎉 Thank you — your report helped!' : 'Thank you for your report!'}</strong>
        <div className="small">About {f.context.title ?? f.context.route}: {f.reply ?? (f.status === 'resolved' ? 'it’s fixed now.' : 'we checked it.')}</div>
      </div>
      <div className="row"><Link className="btn" to="/feedback" onClick={close}>My feedback</Link><button className="icon-btn" aria-label="Dismiss" onClick={close}>✕</button></div>
    </div>
  );
}
