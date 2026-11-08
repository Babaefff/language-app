import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from './Nav';
import { accountsEnabled, configProblem, signOut, useSync } from '../lib/sync';

/**
 * Top-bar account entry. Signed out: "Sign in" + settings gear. Signed in: the user's initial,
 * opening a menu with profile, settings, privacy and sign out (the gear then lives in the menu).
 */
export function AccountButton() {
  const { user } = useSync();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent | TouchEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', away);
    document.addEventListener('touchstart', away);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', away); document.removeEventListener('touchstart', away); document.removeEventListener('keydown', esc); };
  }, [open]);

  const gear = <Link to="/settings" className="icon-btn" aria-label="Settings">⚙️</Link>;
  if (!accountsEnabled || configProblem) return gear;
  if (!user) return <>{<Link to="/account" className="btn signin-btn">Sign in</Link>}{gear}</>;

  const name = (user.user_metadata?.full_name as string | undefined) ?? (user.user_metadata?.name as string | undefined) ?? user.email?.split('@')[0] ?? 'Account';
  return (
    <div className="account-menu" ref={box}>
      <button className="avatar" aria-haspopup="menu" aria-expanded={open} aria-label="Account menu" onClick={() => setOpen(!open)}>
        {name[0].toUpperCase()}
      </button>
      {open && (
        <div className="menu-pop" role="menu">
          <div className="menu-who">
            <strong>{name}</strong>
            <span className="muted small">{user.email}</span>
          </div>
          <Link to="/account" className="menu-item">📊 Profile &amp; progress</Link>
          <Link to="/settings" className="menu-item">⚙️ Settings</Link>
          <a href="./privacy.html" className="menu-item" role="menuitem">🔒 Privacy</a>
          <button className="menu-item" role="menuitem" onClick={() => { setOpen(false); void signOut(); }}>↩ Sign out</button>
        </div>
      )}
    </div>
  );
}
