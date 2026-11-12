import { isLeech } from './srs';
import { isPlaced, thisWeek, type Progress } from './store';

/** A Monday–Sunday week of learning, for the "Your week" summary. */
export interface WeekSummary {
  /** Date keys Monday → Sunday. */
  days: string[];
  /** Days with any practice. */
  active: number;
  xp: number;
  /** Words learned for the first time this week. */
  newWords: number;
  /** Answers given this week (reviews and exercises). */
  answers: number;
  /** Share of them right (0–1), or null without answers. */
  accuracy: number | null;
  lessons: number;
  /** Words forgotten again and again (3+ lapses), right now. */
  danger: number;
}

const DAY = 86_400_000;

export function weekSummary(p: Progress, anyDayOfWeek = new Date()): WeekSummary {
  const days = thisWeek(anyDayOfWeek);
  const [y, m, d] = days[0].split('-').map(Number);
  const from = new Date(y, m - 1, d).getTime();
  const to = from + 7 * DAY;
  const inWeek = (t: number | undefined) => t !== undefined && t >= from && t < to;
  const attempts = p.learning.attempts.filter((a) => inWeek(a.at));
  return {
    days,
    active: days.filter((k) => (p.xp[k] ?? 0) > 0).length,
    xp: days.reduce((n, k) => n + (p.xp[k] ?? 0), 0),
    newWords: Object.values(p.cards).filter((c) => inWeek(c.added)).length,
    answers: attempts.length,
    accuracy: attempts.length ? attempts.filter((a) => a.ok).length / attempts.length : null,
    lessons: Object.values(p.units).filter((u) => !isPlaced(u) && inWeek(u.completedAt)).length,
    danger: Object.values(p.cards).filter(isLeech).length,
  };
}

/** Last week's summary (Monday–Sunday before the current week). */
export const lastWeek = (p: Progress, now = new Date()) => weekSummary(p, new Date(now.getTime() - 7 * DAY));

/** One line, e.g. for a notification: "5 days · 48 new words · 3 danger words left". */
export function weekLine(w: WeekSummary): string {
  const parts = [`${w.active} ${w.active === 1 ? 'day' : 'days'}`, `${w.newWords} new ${w.newWords === 1 ? 'word' : 'words'}`];
  if (w.lessons) parts.push(`${w.lessons} ${w.lessons === 1 ? 'lesson' : 'lessons'}`);
  parts.push(w.danger ? `${w.danger} danger ${w.danger === 1 ? 'word' : 'words'} left` : 'no danger words 🎉');
  return parts.join(' · ');
}
