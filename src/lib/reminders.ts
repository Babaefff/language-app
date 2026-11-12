import { L, LANG } from '../data/lang';
import { isNative } from './native';
import { getProgress, today } from './store';
import { weekLine, weekSummary } from './weekly';

/**
 * Daily reminders in the app ("🇩🇪 12 words waiting"). Notifications are scheduled on the phone, so
 * they work offline and with no server: the next 7 days are planned ahead, each with the number of
 * words that will be due by then (due dates are known in advance). Re-planned whenever the app is
 * opened or closed, so the numbers stay right. Today is skipped once you have practised.
 */
const DAYS = 7;
const BASE: Record<string, number> = { es: 10, de: 20, fr: 30, ru: 40 };
const base = () => BASE[LANG] ?? 90;
/** The single repeating reminder of older app versions (ids 1–4): replaced by these. */
const OLD_ID: Record<string, number> = { es: 1, de: 2, fr: 3, ru: 4 };

/** Words left in the personal word drill (set by the personal tab), for the reminder text. */
const DRILL_KEY = `hablo:drill-left:${LANG}`;
const DANGER_KEY = `hablo:drill-danger:${LANG}`;
export function setDrillLeft(n: number, danger = 0) {
  try { localStorage.setItem(DRILL_KEY, String(n)); localStorage.setItem(DANGER_KEY, String(danger)); } catch { /* reminder just won't mention it */ }
}
/** Danger words in the personal word drill (from the last visit to the personal tab). */
export const drillDanger = () => { try { return Number(localStorage.getItem(DANGER_KEY)) || 0; } catch { return 0; } };
const drillLeft = () => { try { return Number(localStorage.getItem(DRILL_KEY)) || 0; } catch { return 0; } };

/** Sunday-evening weekly summary: one id per language after the daily ones. */
const weeklyId = () => base() + DAYS;
const ids = () => [OLD_ID[LANG] ?? 9, ...Array.from({ length: DAYS }, (_, k) => base() + k), weeklyId()];

export interface Reminder { at: Date; title: string; body: string; route: string }

/** What each day's reminder says (pure, for tests). */
export function planReminders(now = new Date()): Reminder[] {
  const p = getProgress();
  const { planTime, planCue, planMinutes } = p.settings;
  if (!planTime) return [];
  const [h, m] = planTime.split(':').map(Number);
  const drill = drillLeft();
  const out: Reminder[] = [];
  for (let k = 0; k < DAYS; k++) {
    const at = new Date(now.getFullYear(), now.getMonth(), now.getDate() + k, h, m);
    if (at <= now) continue;
    // Already practised today: no nagging.
    if (k === 0 && (p.xp[today(now)] ?? 0) > 0) continue;
    const due = Object.values(p.cards).filter((c) => c.due <= at.getTime()).length;
    const cue = planCue ? `${planCue}: ` : '';
    if (due > 0) {
      out.push({ at, route: '/review', title: `${L.flag} ${due} ${due === 1 ? 'word' : 'words'} waiting`,
        body: `${cue}${Math.min(due, 10)} ${Math.min(due, 10) === 1 ? 'word' : 'words'} in ${planMinutes || 5} minutes keeps them fresh. Tap to review.` });
    } else if (drill > 0) {
      out.push({ at, route: '/mine', title: `${L.flag} ${drill} words in your word drill`,
        body: `${cue}10 at a time. Tap to start.` });
    } else {
      out.push({ at, route: '/', title: `${L.flag} Time for ${L.name}`,
        body: `${cue}${planMinutes || 10} minutes today keeps your streak going.` });
    }
  }
  return out;
}

/** Sunday 19:00: "Your week: 5 days · 48 new words · 3 danger words left". Re-planned with each visit. */
export function weeklyReminder(now = new Date()): Reminder | null {
  if (!getProgress().settings.planTime) return null;
  const at = new Date(now.getFullYear(), now.getMonth(), now.getDate() + ((7 - now.getDay()) % 7), 19, 0);
  if (at <= now) return null;
  const w = weekSummary(getProgress(), now);
  return { at, route: '/progress', title: `${L.flag} Your week in ${L.name}`, body: weekLine({ ...w, danger: w.danger + drillDanger() }) };
}

let listening = false;

/** Re-plans this language's reminders (app only). Asks for permission only when `ask` is true. */
export async function refreshReminders(ask = false): Promise<boolean> {
  if (!isNative) return false;
  try {
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    if (!listening) {
      listening = true;
      // Tapping a reminder opens the screen it talks about.
      await LocalNotifications.addListener('localNotificationActionPerformed', (e) => {
        const route = (e.notification.extra as { route?: string } | undefined)?.route;
        if (route) window.location.hash = `#${route}`;
      });
    }
    const perm = ask ? await LocalNotifications.requestPermissions() : await LocalNotifications.checkPermissions();
    await LocalNotifications.cancel({ notifications: ids().map((id) => ({ id })) });
    if (perm.display !== 'granted') return false;
    const plan = planReminders();
    const week = weeklyReminder();
    const all = [
      ...plan.map((r, k) => ({ id: base() + k, r })),
      ...(week ? [{ id: weeklyId(), r: week }] : []),
    ];
    if (all.length) {
      await LocalNotifications.schedule({ notifications: all.map(({ id, r }) => ({
        id, title: r.title, body: r.body, extra: { route: r.route },
        schedule: { at: r.at, allowWhileIdle: true },
      })) });
    }
    return true;
  } catch {
    return false;
  }
}

/** Turns reminders off for this language. */
export async function cancelReminders() {
  if (!isNative) return;
  try {
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    await LocalNotifications.cancel({ notifications: ids().map((id) => ({ id })) });
  } catch { /* nothing scheduled */ }
}

/** Keeps reminders up to date: on start, and each time the app goes to the background. */
export function startReminders() {
  if (!isNative) return;
  void refreshReminders();
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') void refreshReminders(); });
}
