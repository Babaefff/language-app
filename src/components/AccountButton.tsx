import { Link } from './Nav';
import { accountsEnabled, configProblem, useSync } from '../lib/sync';

/** Top-bar entry to accounts: "Sign in" when signed out, the user's initial when signed in. */
export function AccountButton() {
  const { user, status } = useSync();
  if (!accountsEnabled || configProblem) return null;
  if (user) {
    const initial = (user.email ?? '?').slice(0, 1).toUpperCase();
    return (
      <Link to="/account" className={`avatar ${status === 'error' ? 'avatar-error' : ''}`} aria-label={`Account: ${user.email}`}>
        {initial}
      </Link>
    );
  }
  return <Link to="/account" className="btn signin-btn">Sign in</Link>;
}
