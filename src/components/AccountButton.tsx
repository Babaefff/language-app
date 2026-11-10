import { Icon } from './Icon';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from './Nav';
import { LinguaBloom, useBloomData } from './LinguaBloom';
import { accountsEnabled, configProblem, signOut, useSync } from '../lib/sync';
import { updateSettings, useProgress } from '../lib/store';
import { isAdmin } from '../lib/feedback';

const THEMES = { system: 'Theme: System', light: 'Theme: Light', dark: 'Theme: Dark' } as const;
const NEXT = { system: 'dark', dark: 'light', light: 'system' } as const;

/**
 * Top-bar account entry. Signed out: "Sign in" + settings gear. Signed in: the user's Lingua Bloom
 * avatar, opening a menu with profile, settings, theme, privacy and sign out.
 */
export function AccountButton() {
  const { user } = useSync();
  const { settings } = useProgress();
  const bloom = useBloomData();
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  useEffect(() => { if (user) void isAdmin().then(setAdmin); else setAdmin(false); }, [user]);
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

  const gear = <Link to="/settings" className="icon-btn" aria-label="Settings"><Icon name="settings" /></Link>;
  if (!accountsEnabled || configProblem) return gear;
  if (!user) return <>{<Link to="/account" className="btn signin-btn">Sign in</Link>}{gear}</>;

  const name = userName(user);
  const glyph = settings.avatarGlyph || name[0].toUpperCase();
  const seed = `${user.id}:${settings.avatarShuffle}`;
  return (
    <div className="account-menu" ref={box}>
      <button className="avatar-btn" aria-haspopup="menu" aria-expanded={open} aria-label="Account menu" onClick={() => setOpen(!open)}>
        <LinguaBloom seed={seed} glyph={glyph} data={bloom} size={36} detail={false} />
      </button>
      {open && (
        <div className="menu-pop" role="menu">
          <div className="menu-who">
            <LinguaBloom seed={seed} glyph={glyph} data={bloom} size={44} />
            <div><strong>{name}</strong><span className="muted small">{user.email}</span></div>
          </div>
          <Link to="/account" className="menu-item"><Icon name="chart" /> Profile &amp; progress</Link>
          <Link to="/settings" className="menu-item"><Icon name="settings" /> Settings</Link>
          <Link to="/feedback" className="menu-item"><Icon name="flag" /> My feedback</Link>
          {admin && <Link to="/admin" className="menu-item"><Icon name="inbox" /> Feedback inbox (admin)</Link>}
          {admin && <Link to="/admin/personal" className="menu-item"><Icon name="heart" /> Personal material (admin)</Link>}
          <button className="menu-item" role="menuitem" onClick={() => updateSettings({ theme: NEXT[settings.theme] })}><Icon name="settings" /> {THEMES[settings.theme]}</button>
          <a href="./privacy.html" className="menu-item" role="menuitem"><Icon name="shield" /> Privacy</a>
          <button className="menu-item" role="menuitem" onClick={() => { setOpen(false); void signOut(); }}><Icon name="logout" /> Sign out</button>
        </div>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userName = (user: { email?: string; user_metadata?: any }) =>
  (user.user_metadata?.full_name as string | undefined) ?? (user.user_metadata?.name as string | undefined) ?? user.email?.split('@')[0] ?? 'Learner';
