import { useState } from 'react';
import { accountsEnabled, deleteAccount, deleteCloudData, googleEnabled, signInWithEmail, signInWithGoogle, signOut, useSync } from '../lib/sync';

/** Optional sign-in so progress is saved in the cloud and follows you to other devices. */
export function AccountCard() {
  const { user, status, lastSync, error } = useSync();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  if (!accountsEnabled) return null;

  const run = async (f: () => Promise<void>) => {
    setBusy(true);
    setMsg('');
    try { await f(); } catch (e) { setMsg((e as Error).message); } finally { setBusy(false); }
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
      {sent ? (
        <p>📧 Check your inbox: we sent a sign-in link to <strong>{email}</strong>. Open it on this device and browser.</p>
      ) : (
        <form className="row wrap" onSubmit={(e) => { e.preventDefault(); void run(async () => { await signInWithEmail(email.trim()); setSent(true); }); }}>
          <input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="account-email" autoComplete="email" />
          <button className="btn primary" disabled={busy || !email.includes('@')}>Email me a sign-in link</button>
        </form>
      )}
      {googleEnabled && <button className="btn" disabled={busy} onClick={() => run(signInWithGoogle)}>Continue with Google</button>}
      {msg && <p className="warn small">{msg}</p>}
      <p className="muted small">We store only your email and your learning progress — nothing else, and it is never shared.</p>
    </section>
  );
}
