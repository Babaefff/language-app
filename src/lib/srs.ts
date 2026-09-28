/**
 * Spaced repetition with FSRS (Free Spaced Repetition Scheduler, v4.5 default parameters).
 *
 * Each card tracks:
 * - stability S: days until the chance of recalling it drops to 90%
 * - difficulty D: 1 (easy) … 10 (hard), how quickly stability grows
 * Reviews are scheduled when predicted recall reaches the target retention (90%).
 * Cards saved by the old SM-2 scheduler are converted on their next review.
 */
export interface Card {
  /** Days until the next review (kept for display and for older code). */
  interval: number;
  due: number;
  reps: number;
  lapses: number;
  seen: number;
  stability?: number;
  difficulty?: number;
  /** Legacy SM-2 ease factor (older saves). */
  ease?: number;
}

export type Grade = 0 | 1 | 2 | 3; // again, hard, good, easy

const DAY = 24 * 60 * 60 * 1000;
const MINUTE = 60 * 1000;

const W = [0.4872, 1.4003, 3.7145, 13.8206, 5.1618, 1.2298, 0.8975, 0.031, 1.6474, 0.1367, 1.0461, 2.1072, 0.0793, 0.3246, 1.587, 0.2272, 2.8755];
const DECAY = -0.5;
const FACTOR = 19 / 81; // makes R(S) = 0.9
export const RETENTION = 0.9;

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

/** Probability of recalling a card `elapsed` days after the last review. */
export function retrievability(elapsedDays: number, stability: number): number {
  return Math.pow(1 + (FACTOR * elapsedDays) / stability, DECAY);
}

/** Days until recall probability falls to `retention`. */
function nextInterval(stability: number, retention = RETENTION): number {
  return (stability / FACTOR) * (Math.pow(retention, 1 / DECAY) - 1);
}

const initStability = (g: number) => W[g - 1];
const initDifficulty = (g: number) => clamp(W[4] - Math.exp(W[5] * (g - 1)) + 1, 1, 10);

function nextDifficulty(d: number, g: number): number {
  const delta = -W[6] * (g - 3);
  const d2 = d + (delta * (10 - d)) / 9; // "linear damping": changes shrink near 10
  return clamp(W[7] * initDifficulty(4) + (1 - W[7]) * d2, 1, 10); // mean reversion
}

function recallStability(d: number, s: number, r: number, g: number): number {
  const hard = g === 2 ? W[15] : 1;
  const easy = g === 4 ? W[16] : 1;
  return s * (Math.exp(W[8]) * (11 - d) * Math.pow(s, -W[9]) * (Math.exp(W[10] * (1 - r)) - 1) * hard * easy + 1);
}

function forgetStability(d: number, s: number, r: number): number {
  return Math.min(s, W[11] * Math.pow(d, -W[12]) * (Math.pow(s + 1, W[13]) - 1) * Math.exp(W[14] * (1 - r)));
}

export function newCard(now = Date.now()): Card {
  return { interval: 0, due: now, reps: 0, lapses: 0, seen: now };
}

/** FSRS state for a card, converting older SM-2 cards on the fly. */
function state(c: Card): { s: number; d: number } | null {
  if (c.stability && c.difficulty) return { s: c.stability, d: c.difficulty };
  if (!c.reps) return null;
  // Old SM-2 card: its interval approximates stability; ease 2.5 ≈ average difficulty.
  const ease = c.ease ?? 2.5;
  return { s: Math.max(c.interval, 0.5), d: clamp(11 - ease * 2.4, 1, 10) };
}

export function review(card: Card | undefined, grade: Grade, now = Date.now()): Card {
  const c = card ?? newCard(now);
  const g = grade + 1; // FSRS grades are 1..4
  const prev = state(c);
  let s: number;
  let d: number;
  if (!prev) {
    s = initStability(g);
    d = initDifficulty(g);
  } else {
    const elapsed = Math.max(0, (now - c.seen) / DAY);
    const r = retrievability(elapsed, prev.s);
    d = nextDifficulty(prev.d, g);
    s = g === 1 ? forgetStability(prev.d, prev.s, r) : recallStability(prev.d, prev.s, r, g);
  }
  // A failed card comes back in a minute (same session); others follow the model.
  const interval = g === 1 ? 0 : clamp(nextInterval(s), 1 / 24, 365);
  return {
    interval,
    due: now + (g === 1 ? MINUTE : interval * DAY),
    reps: g === 1 ? 0 : c.reps + 1,
    lapses: c.lapses + (g === 1 && c.reps > 0 ? 1 : 0),
    seen: now,
    stability: s,
    difficulty: d,
  };
}

export type Strength = 'new' | 'learning' | 'familiar' | 'known';

export function strength(card: Card | undefined): Strength {
  if (!card) return 'new';
  if (card.interval < 1) return 'learning';
  if (card.interval < 14) return 'familiar';
  return 'known';
}

/** Current chance (0–1) of remembering a card, used to find the weakest words. */
export function recallChance(card: Card, now = Date.now()): number {
  const st = state(card);
  if (!st) return 0;
  return retrievability(Math.max(0, (now - card.seen) / DAY), st.s);
}

/** A "leech": a word you keep forgetting. Gets extra practice and a mnemonic prompt. */
export const isLeech = (card: Card) => card.lapses >= 3;

export const isDue = (card: Card, now = Date.now()) => card.due <= now;

/** Human-readable time until next review, for the flashcard buttons. */
export function describeInterval(days: number): string {
  if (days < 1 / 24) return `${Math.max(1, Math.round(days * 24 * 60))} min`;
  if (days < 1) return `${Math.round(days * 24)} h`;
  if (days < 30) return `${Math.round(days)} d`;
  if (days < 365) return `${Math.round(days / 30)} mo`;
  return `${Math.round(days / 365)} y`;
}
