import { AccountCard } from '../components/AccountCard';
import { accountsEnabled, useSync } from '../lib/sync';

export function Account() {
  const { user } = useSync();
  return (
    <div className="page narrow">
      <h1>{user ? 'Your account' : 'Sign in'}</h1>
      {!user && (
        <ul className="benefits">
          <li>☁️ Your progress is saved safely — even if you clear your browser.</li>
          <li>📱 Continue on your phone, tablet or computer.</li>
          <li>🔒 No password to remember: we email you a sign-in link.</li>
        </ul>
      )}
      {accountsEnabled ? <AccountCard /> : <p className="card">Accounts are not available on this version of the app.</p>}
    </div>
  );
}
