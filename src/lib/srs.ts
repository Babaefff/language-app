/** A small SM-2 style scheduler. Intervals are in days. */
export interface Card {
  ease: number;
  interval: number;
  due: number;
  reps: number;
  lapses: number;
  seen: number;
}

export type Grade = 0 | 1 | 2 | 3; // again, hard, good, easy

const DAY = 24 * 60 * 60 * 1000;
const MINUTE = 60 * 1000;

export function newCard(now = Date.now()): Card {
  return { ease: 2.5, interval: 0, due: now, reps: 0, lapses: 0, seen: now };
}

export function review(card: Card | undefined, grade: Grade, now = Date.now()): Card {
  const c = { ...(card ?? newCard(now)), seen: now };
  if (grade === 0) {
    return { ...c, reps: 0, lapses: c.lapses + (c.reps > 0 ? 1 : 0), ease: Math.max(1.3, c.ease - 0.2), interval: 0, due: now + MINUTE };
  }
  let interval: number;
  if (c.reps === 0) interval = [0, 0.25, 1, 3][grade];
  else if (c.reps === 1) interval = [0, 1.5, 3, 5][grade];
  else interval = c.interval * [0, 1.2, c.ease, c.ease * 1.3][grade];
  const ease = Math.max(1.3, c.ease + [0, -0.15, 0, 0.15][grade]);
  interval = Math.min(interval, 365);
  return { ...c, reps: c.reps + 1, ease, interval, due: now + interval * DAY };
}

export type Strength = 'new' | 'learning' | 'familiar' | 'known';

export function strength(card: Card | undefined): Strength {
  if (!card) return 'new';
  if (card.interval < 1) return 'learning';
  if (card.interval < 14) return 'familiar';
  return 'known';
}

export const isDue = (card: Card, now = Date.now()) => card.due <= now;

/** Human-readable time until next review, for the flashcard buttons. */
export function describeInterval(days: number): string {
  if (days < 1 / 24) return `${Math.max(1, Math.round(days * 24 * 60))} min`;
  if (days < 1) return `${Math.round(days * 24)} h`;
  if (days < 30) return `${Math.round(days)} d`;
  if (days < 365) return `${Math.round(days / 30)} mo`;
  return `${Math.round(days / 365)} y`;
}
