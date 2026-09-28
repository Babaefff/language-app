import { useSyncExternalStore } from 'react';
import { review, type Card, type Grade } from './srs';

export interface Settings {
  rate: number;
  voiceURI: string | null;
  accent: 'es-ES' | 'es-MX' | 'any';
  autoplay: boolean;
  ticker: boolean;
  /** Use generated natural-voice clips when available. */
  natural: boolean;
  dailyGoal: number;
}

export interface Progress {
  version: 1;
  cards: Record<string, Card>;
  units: Record<string, { completedAt: number; best: number }>;
  /** Best score (0–100) per unit step, keyed `${unitId}:${step}`. */
  steps: Record<string, number>;
  readings: Record<string, { readAt: number; score: number }>;
  /** Best practice score (0–100) per grammar lesson. */
  grammar: Record<string, number>;
  xp: Record<string, number>;
  conj: { right: number; wrong: number };
  settings: Settings;
}

const KEY = 'hablo:progress:v1';

const DEFAULT: Progress = {
  version: 1,
  cards: {},
  units: {},
  steps: {},
  readings: {},
  grammar: {},
  xp: {},
  conj: { right: 0, wrong: 0 },
  settings: { rate: 0.9, voiceURI: null, accent: 'es-ES', autoplay: true, ticker: true, natural: true, dailyGoal: 50 },
};

const isObj = (v: unknown): v is Record<string, never> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Loads saved progress, falling back field by field to defaults if anything is malformed. */
function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (!isObj(parsed)) return DEFAULT;
    const pick = <K extends keyof Progress>(k: K): Progress[K] => (isObj(parsed[k]) ? (parsed[k] as Progress[K]) : DEFAULT[k]);
    return {
      version: 1,
      cards: pick('cards'),
      units: pick('units'),
      steps: pick('steps'),
      readings: pick('readings'),
      grammar: pick('grammar'),
      xp: pick('xp'),
      conj: { ...DEFAULT.conj, ...pick('conj') },
      settings: { ...DEFAULT.settings, ...pick('settings') },
    };
  } catch {
    return DEFAULT;
  }
}

let state: Progress = load();
const listeners = new Set<() => void>();

function set(next: Progress) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage can be unavailable (private mode); progress then lasts for the session only.
  }
  listeners.forEach((l) => l());
}

export const getProgress = () => state;

export function useProgress(): Progress {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
  );
}

export const today = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function addXp(amount: number) {
  const key = today();
  set({ ...state, xp: { ...state.xp, [key]: (state.xp[key] ?? 0) + amount } });
}

export function gradeWord(wordId: string, grade: Grade) {
  set({ ...state, cards: { ...state.cards, [wordId]: review(state.cards[wordId], grade) } });
}

/** Records a finished unit step; the unit counts as complete once every step is done. */
export function completeStep(unitId: string, step: number, score: number, stepCount: number) {
  const k = `${unitId}:${step}`;
  const steps = { ...state.steps, [k]: Math.max(score, state.steps[k] ?? 0) };
  let units = state.units;
  const scores = Array.from({ length: stepCount }, (_, i) => steps[`${unitId}:${i}`]);
  if (scores.every((s) => s !== undefined)) {
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / stepCount);
    units = { ...units, [unitId]: { completedAt: units[unitId]?.completedAt ?? Date.now(), best: Math.max(avg, units[unitId]?.best ?? 0) } };
  }
  set({ ...state, steps, units });
}

export function completeReading(id: string, score: number) {
  set({ ...state, readings: { ...state.readings, [id]: { readAt: Date.now(), score } } });
}

export function completeGrammar(id: string, score: number) {
  set({ ...state, grammar: { ...state.grammar, [id]: Math.max(score, state.grammar[id] ?? 0) } });
}

export function recordConj(right: number, wrong: number) {
  set({ ...state, conj: { right: state.conj.right + right, wrong: state.conj.wrong + wrong } });
}

export function updateSettings(patch: Partial<Settings>) {
  set({ ...state, settings: { ...state.settings, ...patch } });
}

export function resetProgress() {
  set({ ...DEFAULT, settings: state.settings });
}

export function exportProgress(): string {
  return JSON.stringify(state);
}

export function importProgress(json: string) {
  const parsed = JSON.parse(json) as Progress;
  if (parsed.version !== 1 || typeof parsed.cards !== 'object') throw new Error('Not a Hablo backup file');
  set({ ...DEFAULT, ...parsed, settings: { ...DEFAULT.settings, ...parsed.settings } });
}

/** Consecutive days (ending today, or yesterday if today has no XP yet) with any XP. */
export function streak(xp: Record<string, number>): number {
  const d = new Date();
  if (!xp[today(d)]) d.setDate(d.getDate() - 1);
  let n = 0;
  while (xp[today(d)]) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

/**
 * Feeds quiz outcomes into spaced repetition. New or due words are scheduled normally; words
 * that are not yet due are only touched when answered wrong, so extra practice can't inflate
 * intervals.
 */
export function applyWordResults(words: Record<string, boolean>) {
  const now = Date.now();
  const cards = { ...state.cards };
  for (const [id, ok] of Object.entries(words)) {
    const c = cards[id];
    if (!c || c.due <= now) cards[id] = review(c, ok ? 2 : 0, now);
    else if (!ok) cards[id] = review(c, 0, now);
  }
  set({ ...state, cards });
}
