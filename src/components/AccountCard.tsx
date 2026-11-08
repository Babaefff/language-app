import { useState } from 'react';
import { accountsEnabled, configProblem, configSummary, deleteAccount, deleteCloudData, googleEnabled, signInWithEmail, signInWithGoogle, signOut, useSync } from '../lib/sync';

/** Optional sign-in so progress is saved in the cloud and follows you to other devices. */
export function AccountCard() {
  const { user, status, lastSync, error } = useSync();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  if (!accountsEnabled) return null;
  if (configProblem) {
    return (
      <section className="card">
        <h2>☁️ Account</h2>
        <p className="warn">Accounts are not set up correctly: {configProblem}</p>
        <p className="muted small">Fix it in Netlify → Environment variables, then redeploy.</p>
      </section>
    );
  }
  const help = (m: string) => (/invalid api key/i.test(m) ? `${m} — Supabase didn’t accept the key. Check that the publishable key in Netlify is copied completely from the same project as the URL (${configSummary}), then redeploy.` : m);

  const run = async (f: () => Promise<void>) => {
    setBusy(true);
    setMsg('');
    try { await f(); } catch (e) { setMsg(help((e as Error).message)); } finally { setBusy(false); }
  };

  if (user) {
    return (
      <section className="card">
        <h2>☁️ Account</h2>
        <p>Signed in as <strong>{user.email}</strong></p>
        <p className="muted small">
          {status === 'syncing' ? 'Saving…' : status === 'error' ? `⚠️ Sync problem: ${error}` : lastSync ? `✓ Progress saved to your account at ${new Date(lastSync).toLocaleTimeString()}` : '✓ Synced'}
        </p>
        <p className="muted small">Your progress in each language follows you to any device where you sign in.</p>
        <div className="row wrap">
          <button className="btn" disabled={busy} onClick={() => run(signOut)}>Sign out</button>
          <button className="btn" disabled={busy} onClick={() => { if (confirm('Delete your saved progress from the cloud? Progress on this device stays.')) void run(deleteCloudData); }}>Delete cloud data</button>
          <button className="btn" disabled={busy} onClick={() => { if (confirm('Delete your account permanently? Your email and cloud progress are removed. Progress on this device stays.')) void run(deleteAccount); }}>Delete account</button>
        </div>
        {msg && <p className="warn small">{msg}</p>}
      </section>
    );
  }

  return (
    <section className="card">
      <h2>☁️ Account</h2>
      <p className="muted small">Optional. Sign in to keep your progress safe and continue on your phone, tablet or computer. Without an account, progress is saved only in this browser.</p>
      {googleEnabled && (
        <>
          <button className="btn google-btn" disabled={busy} onClick={() => run(signInWithGoogle)}>
            <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Continue with Google
          </button>
          <p className="muted small or-line">or with your email</p>
        </>
      )}
      {sent ? (
        <p>📧 Check your inbox: we sent a sign-in link to <strong>{email}</strong>. Open it on this device and browser.</p>
      ) : (
        <form className="row wrap" onSubmit={(e) => { e.preventDefault(); void run(async () => { await signInWithEmail(email.trim()); setSent(true); }); }}>
          <input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="account-email" autoComplete="email" />
          <button className="btn primary" disabled={busy || !email.includes('@')}>Email me a sign-in link</button>
        </form>
      )}
      {msg && <p className="warn small">{msg}</p>}
      <p className="muted small">We store only your email and your learning progress — nothing else, and it is never shared. <a href="./privacy.html">Privacy policy</a></p>
      <p className="muted small">Server: {configSummary}</p>
    </section>
  );
}
