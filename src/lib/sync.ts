import { useSyncExternalStore } from 'react';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import { LANG } from '../data/lang';
import { isNative } from './native';
import { getProgress, mergeProgress, onProgressChange, parseProgress, replaceProgress, selectProgressAccount, updateSettings } from './store';

/**
 * Optional accounts (Supabase). Without VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY the app works
 * exactly as before, saving progress only in this browser. Signed in, progress for each language
 * is merged with the cloud copy and saved back a few seconds after every change.
 */
/** Removes spaces and quotes that are easy to paste by accident. */
const clean = (v: unknown) =>
  (typeof v === 'string' ? v.trim().replace(/^[A-Z_]+\s*=\s*/, '').trim().replace(/^["']|["']$/g, '').trim() : '') || undefined;
const URL_ = clean(import.meta.env.VITE_SUPABASE_URL)?.replace(/\/+$/, '');
// The publishable key (sb_publishable_…, formerly "anon") is public by design; never use a secret key here.
const KEY = clean(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) ?? clean(import.meta.env.VITE_SUPABASE_ANON_KEY);

/** Problems with the configured values, explained in plain words (shown on the Account card). */
export const configProblem: string | null = (() => {
  if (!URL_ || !KEY) return null;
  if (KEY.startsWith('sb_secret_')) return 'The SECRET key was configured. Never put it in the app: replace it with the publishable key (sb_publishable_…) and delete/rotate the secret key in Supabase → API Keys.';
  if (KEY.startsWith('eyJ')) {
    try {
      const role = (JSON.parse(atob(KEY.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))) as { role?: string }).role;
      if (role === 'service_role') return 'The service_role key was configured. Never put it in the app: use the publishable (or anon) key, and rotate the service_role key in Supabase.';
    } catch { /* not a readable token */ }
  }
  if (/x{6,}|your-project/i.test(KEY + URL_)) return 'The example placeholder text is still in the settings — paste your real Project URL and publishable key.';
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(URL_)) return `The Project URL looks wrong: "${URL_}". It should look like https://abcdefgh.supabase.co`;
  if (/^https?:/.test(KEY)) return 'The key setting contains a web address — the URL and the key seem to be swapped. VITE_SUPABASE_URL is the https://… address, VITE_SUPABASE_PUBLISHABLE_KEY is the sb_publishable_… key.';
  if (!KEY.startsWith('sb_publishable_') && !KEY.startsWith('eyJ')) return `The key doesn’t look like a Supabase publishable key: it starts with “${KEY.slice(0, 6)}…” (${KEY.length} characters), but it should start with “sb_publishable_”. Copy it again from Supabase → Project Settings → API Keys → Publishable key.`;
  return null;
})();
/** Safe-to-show summary of the configuration, to compare with the Supabase dashboard. */
export const configSummary = URL_ && KEY ? `${URL_.replace('https://', '')} · ${KEY.slice(0, 18)}…` : '';
const ANON = configProblem?.includes('secret') || configProblem?.includes('service_role') ? undefined : KEY;
// In the Android/iOS app, Google's web sign-in and email links (which open the website) don't
// work yet: accounts arrive there with native sign-in. Until then the app saves on the phone.
export const accountsEnabled = !!(URL_ && KEY) && !isNative;
export const googleEnabled = clean(import.meta.env.VITE_SUPABASE_GOOGLE) === '1';

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
    client = createClient(URL_!, ANON ?? '', { auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true } });
  }
  return client;
}

const redirectTo = () => window.location.origin + window.location.pathname;

export async function signInWithEmail(email: string) {
  const sb = await getClient();
  const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo() } });
  if (error) throw error;
}

/** Google's own sign-in button (Google Identity Services): sign-in happens on this site, so Google
 * shows this site's address instead of the Supabase project's. Needs VITE_GOOGLE_CLIENT_ID. */
export const googleClientId = clean(import.meta.env.VITE_GOOGLE_CLIENT_ID);

/** Signs in with the ID token from Google's button; the nonce ties the token to this attempt. */
export async function signInWithGoogleIdToken(token: string, nonce: string) {
  const sb = await getClient();
  const { error } = await sb.auth.signInWithIdToken({ provider: 'google', token, nonce });
  if (error) throw error;
}

export async function signInWithGoogle() {
  const sb = await getClient();
  const { error } = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: redirectTo() } });
  if (error) throw error;
}

export async function signOut() {
  const sb = await getClient();
  const { error } = await sb.auth.signOut();
  if (error) throw error;
}

/** Deletes the account itself and all its cloud data (progress on this device stays). */
export async function deleteAccount() {
  const sb = await getClient();
  if (!sync.user) return;
  const { error } = await sb.rpc('delete_my_account');
  if (error) throw error;
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

let accountRevision = 0;

async function pull(user: User) {
  const revision = accountRevision;
  const sb = await getClient();
  setSync({ status: 'syncing' });
  const { data, error } = await sb.from('progress').select('data').eq('user_id', user.id).eq('lang', LANG).maybeSingle();
  if (error) throw error;
  if (revision !== accountRevision || sync.user?.id !== user.id) return;
  if (data?.data) {
    replaceProgress(mergeProgress(getProgress(), parseProgress(data.data)));
    // The avatar choice follows the account: the most recent change (on any device) wins.
    const a = (data.data as { avatar?: { glyph?: unknown; shuffle?: unknown; at?: unknown } }).avatar;
    if (a && typeof a.at === 'number' && a.at > getProgress().settings.avatarAt) {
      updateSettings({ avatarGlyph: typeof a.glyph === 'string' ? a.glyph.slice(0, 4) : '', avatarShuffle: Number(a.shuffle) || 0, avatarAt: a.at });
    }
  }
  await push();
}

async function push() {
  const user = sync.user;
  const revision = accountRevision;
  if (!user) return;
  const { settings, ...progress } = getProgress();
  const sb = await getClient();
  if (revision !== accountRevision) return;
  setSync({ status: 'syncing' });
  const data = { ...progress, avatar: { glyph: settings.avatarGlyph, shuffle: settings.avatarShuffle, at: settings.avatarAt } };
  const { error } = await sb.from('progress').upsert({ user_id: user.id, lang: LANG, data, updated_at: new Date().toISOString() });
  if (error) throw error;
  if (revision !== accountRevision) return;
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
    const revision = ++accountRevision;
    clearTimeout(timer);
    timer = undefined;
    pulling = true;
    // Clear the old identity before notifying progress subscribers.
    setSync({ user: null, status: 'idle', lastSync: null, error: undefined });
    selectProgressAccount(user?.id ?? null);
    setSync({ user, status: user ? 'syncing' : 'idle' });
    if (!user) { pulling = false; return; }
    if (window.location.search.includes('code=')) window.history.replaceState(null, '', redirectTo() + window.location.hash);
    try { await pull(user); } catch (e) { if (revision === accountRevision) fail(e); }
    finally { if (revision === accountRevision) pulling = false; }
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
    const revision = accountRevision;
    pulling = true;
    pull(sync.user).catch(e => { if (revision === accountRevision) fail(e); })
      .finally(() => { if (revision === accountRevision) pulling = false; });
  });
}
