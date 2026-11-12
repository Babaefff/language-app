import { useState } from 'react';
import { Link } from './Nav';
import { L, LANG } from '../data/lang';
import { useProgress } from '../lib/store';
import { useSync } from '../lib/sync';
import { hasSavedSession, hideStartCard, startCardHidden } from '../lib/firstVisit';

/**
 * Home, for a language with no progress yet (e.g. a learner of German opening Russian): a small
 * offer to find their level, instead of taking over the screen. Waits until the account has loaded.
 */
export function StartCard() {
  const p = useProgress();
  const { user, status } = useSync();
  const [hidden, setHidden] = useState(() => startCardHidden(LANG));
  const empty = !Object.keys(p.xp).length && !Object.keys(p.units).length && !Object.keys(p.cards).length;
  const accountLoading = hasSavedSession() && (!user || status === 'syncing' || status === 'idle');
  if (hidden || !empty || accountLoading) return null;
  const close = () => { hideStartCard(LANG); setHidden(true); };
  return (
    <section className="card start-card">
      <div className="row between">
        <strong>New to {L.name}? {L.flag}</strong>
        <button className="icon-btn" aria-label="Close" onClick={close}>✕</button>
      </div>
      <p className="small muted">Start with lesson 1 below, or take a short test if you already know some {L.name}.</p>
      <Link to="/welcome" className="btn" onClick={close}>🧭 Find my level</Link>
    </section>
  );
}
