/**
 * "Can't listen now" / "Can't speak now": the learner is somewhere they can't use sound (a quiet
 * office, a noisy train). Listening exercises are swapped for ones without audio, speaking
 * exercises are left out, for an hour; then they come back by themselves.
 */
const KEY = { listen: 'hablo:noListenUntil', speak: 'hablo:noSpeakUntil' } as const;
export type Quiet = keyof typeof KEY;
const HOUR = 60 * 60 * 1000;

export function isQuiet(what: Quiet): boolean {
  try { return Number(localStorage.getItem(KEY[what]) ?? 0) > Date.now(); } catch { return false; }
}
export function setQuiet(what: Quiet, on: boolean) {
  try { if (on) localStorage.setItem(KEY[what], String(Date.now() + HOUR)); else localStorage.removeItem(KEY[what]); } catch { /* storage blocked */ }
}
