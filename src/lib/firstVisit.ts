/**
 * Who sees the welcome screen: only a brand-new device. Decided from this device's storage at
 * start-up, so a returning learner is never caught while their account is still loading:
 * a saved sign-in, progress in any language, or an earlier welcome all count as "been here".
 */
const KEY = 'hablo:welcomed';

export function markWelcomed() {
  try { localStorage.setItem(KEY, '1'); } catch { /* shown again next time: harmless */ }
}

function storedKeys(): string[] {
  try { return Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i) ?? ''); } catch { return []; }
}

/** True only on a device with no account, no progress and no earlier welcome. */
export function isNewDevice(keys: string[] = storedKeys(), get = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } }): boolean {
  if (get(KEY)) return false;
  // A Supabase session saved on this device: a returning learner.
  if (keys.some((k) => k.startsWith('sb-') && k.endsWith('-auth-token'))) return false;
  // Any progress in any language or account on this device.
  for (const k of keys) {
    if (!k.startsWith('hablo:progress')) continue;
    try {
      const p = JSON.parse(get(k) ?? '{}') as { xp?: Record<string, number>; units?: Record<string, unknown>; cards?: Record<string, unknown> };
      if (Object.keys(p.xp ?? {}).length || Object.keys(p.units ?? {}).length || Object.keys(p.cards ?? {}).length) return false;
    } catch { return false; }
  }
  return true;
}

/** Decided once per app start (not re-checked while the account loads). */
export const NEW_DEVICE = typeof window !== 'undefined' && isNewDevice();

/** "New to this language?" card on Home, hidden per language once used or closed. */
const langKey = (lang: string) => `hablo:start-card:${lang}`;
export const startCardHidden = (lang: string) => { try { return !!localStorage.getItem(langKey(lang)); } catch { return true; } };
export const hideStartCard = (lang: string) => { try { localStorage.setItem(langKey(lang), '1'); } catch { /* this visit only */ } };

/** A sign-in is saved on this device (the account may still be loading). */
export const hasSavedSession = () => storedKeys().some((k) => k.startsWith('sb-') && k.endsWith('-auth-token'));
