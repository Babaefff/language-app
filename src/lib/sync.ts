import { useSyncExternalStore } from 'react';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import { LANG } from '../data/lang';
import { getProgress, mergeProgress, onProgressChange, parseProgress, replaceProgress } from './store';

/**
 * Optional accounts (Supabase). Without VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY the app works
 * exactly as before, saving progress only in this browser. Signed in, progress for each language
 * is merged with the cloud copy and saved back a few seconds after every change.
 */
const URL_ = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
export const accountsEnabled = !!(URL_ && ANON);
export const googleEnabled = import.meta.env.VITE_SUPABASE_GOOGLE === '1';

type SyncState = { user: User | null; status: 'off' | 'idle' | 'syncing' | 'synced' | 'error'; lastSync: number | null; error?: string };
let sync: SyncState = { user: null, status: accountsEnabled ? 'idle' : 'off', lastSync: null };
const listeners = new Set<() => void>();
const setSync = (patch: Partial<SyncState>) => { sync = { ...sync, ...patch }; listeners.forEach((l) => l()); };

export function useSync(): SyncState {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => sync);
}

let client: SupabaseClient | null = null;
async function getClient() {
  if (!client) {
    const { createClient } = await import('@supabase/supabase-js');
    // PKCE puts the sign-in code in ?code=…, which doesn't clash with the app's #/routes.
    client = createClient(URL_!, ANON!, { auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true } });
  }
  return client;
}

const redirectTo = () => window.location.origin + window.location.pathname;

export async function signInWithEmail(email: string) {
  const sb = await getClient();
  const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo() } });
  if (error) throw error;
}

export async function signInWithGoogle() {
  const sb = await getClient();
  const { error } = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: redirectTo() } });
  if (error) throw error;
}

export async function signOut() {
  const sb = await getClient();
  await sb.auth.signOut();
}

/** Deletes this account's saved progress in the cloud (all languages). Local progress stays. */
export async function deleteCloudData() {
  const sb = await getClient();
  if (!sync.user) return;
  const { error } = await sb.from('progress').delete().eq('user_id', sync.user.id);
  if (error) throw error;
  setSync({ lastSync: null });
}

async function pull(user: User) {
  const sb = await getClient();
  setSync({ status: 'syncing' });
  const { data, error } = await sb.from('progress').select('data').eq('user_id', user.id).eq('lang', LANG).maybeSingle();
  if (error) throw error;
  if (data?.data) replaceProgress(mergeProgress(getProgress(), parseProgress(data.data)));
  await push();
}

async function push() {
  if (!sync.user) return;
  const sb = await getClient();
  setSync({ status: 'syncing' });
  const { settings: _settings, ...data } = getProgress();
  const { error } = await sb.from('progress').upsert({ user_id: sync.user.id, lang: LANG, data, updated_at: new Date().toISOString() });
  if (error) throw error;
  setSync({ status: 'synced', lastSync: Date.now(), error: undefined });
}

const fail = (e: unknown) => setSync({ status: 'error', error: (e as Error).message ?? String(e) });

let timer: ReturnType<typeof setTimeout> | undefined;
let pulling = false;

/** Starts accounts: restores a session (or finishes a sign-in link) and keeps progress in sync. */
export async function initSync() {
  if (!accountsEnabled || typeof window === 'undefined') return;
  const sb = await getClient();
  const onUser = async (user: User | null) => {
    if (user?.id === sync.user?.id) return;
    setSync({ user, status: user ? 'syncing' : 'idle', lastSync: null });
    if (!user) return;
    // Remove ?code=… left by the sign-in link.
    if (window.location.search.includes('code=')) window.history.replaceState(null, '', redirectTo() + window.location.hash);
    pulling = true;
    try { await pull(user); } catch (e) { fail(e); } finally { pulling = false; }
  };
  sb.auth.onAuthStateChange((_event, session) => { void onUser(session?.user ?? null); });
  const { data } = await sb.auth.getSession();
  await onUser(data.session?.user ?? null);
  onProgressChange(() => {
    if (!sync.user || pulling) return;
    clearTimeout(timer);
    timer = setTimeout(() => push().catch(fail), 3000);
  });
  // Save right away when the tab is hidden (closing the app, switching apps on a phone).
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && sync.user && timer) { clearTimeout(timer); timer = undefined; push().catch(fail); }
  });
  // Coming back to the tab: pick up progress made on another device meanwhile.
  let lastPull = Date.now();
  window.addEventListener('focus', () => {
    if (!sync.user || pulling || Date.now() - lastPull < 60_000) return;
    lastPull = Date.now();
    pull(sync.user).catch(fail);
  });
}
