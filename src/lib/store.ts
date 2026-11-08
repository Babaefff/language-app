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
  /** Type the answer instead of choosing from options. */
  typeChoices: boolean;
  /** Accents, special letters and capitals must be exactly right. */
  strictSpelling: boolean;
}

export interface ExamResult { at: number; scores: Record<string, number>; best: number }

export interface Progress {
  version: 1;
  cards: Record<string, Card>;
  units: Record<string, { completedAt: number; best: number }>;
  /** Best score (0–100) per unit step, keyed `${unitId}:${step}`. */
  steps: Record<string, number>;
  readings: Record<string, { readAt: number; score: number }>;
  /** Best practice score (0–100) per grammar lesson. */
  grammar: Record<string, number>;
  /** Mock exams: latest and best result per exam, as percentages per module. */
  exams: Record<string, ExamResult>;
  xp: Record<string, number>;
  conj: { right: number; wrong: number };
  settings: Settings;
}

import { LANG } from '../data/lang';

/** Each language keeps its own progress (Spanish keeps the original key). */
const KEY = LANG === 'es' ? 'hablo:progress:v1' : `hablo:progress:${LANG}:v1`; // keep in sync with progressKeyFor

const DEFAULT: Progress = {
  version: 1,
  cards: {},
  units: {},
  steps: {},
  readings: {},
  grammar: {},
  exams: {},
  xp: {},
  conj: { right: 0, wrong: 0 },
  settings: { rate: 0.9, voiceURI: null, accent: 'es-ES', autoplay: true, ticker: true, natural: true, dailyGoal: 50, typeChoices: false, strictSpelling: false },
};

const isObj = (v: unknown): v is Record<string, never> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Loads saved progress, falling back field by field to defaults if anything is malformed. */
function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? parseProgress(JSON.parse(raw)) : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

/** Turns stored data (from this browser or the cloud) into valid progress, field by field. */
export function parseProgress(parsed: unknown): Progress {
  try {
    if (!isObj(parsed)) return DEFAULT;
    const pick = <K extends keyof Progress>(k: K): Progress[K] => (isObj(parsed[k]) ? (parsed[k] as Progress[K]) : DEFAULT[k]);
    return {
      version: 1,
      cards: pick('cards'),
      units: pick('units'),
      steps: pick('steps'),
      readings: pick('readings'),
      grammar: pick('grammar'),
      exams: pick('exams'),
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

export function completeExam(id: string, scores: Record<string, number>) {
  const total = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Math.max(1, Object.keys(scores).length));
  const best = Math.max(total, state.exams[id]?.best ?? 0);
  set({ ...state, exams: { ...state.exams, [id]: { at: Date.now(), scores, best } } });
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

/** Listens to every progress change (used by cloud sync). */
export function onProgressChange(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** Replaces progress (keeping this device's settings), e.g. after loading it from the cloud. */
export function replaceProgress(p: Progress) {
  set({ ...p, settings: state.settings });
}

const maxRec = (a: Record<string, number>, b: Record<string, number>) => {
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = Math.max(v, out[k] ?? 0);
  return out;
};

/** Combines two copies of progress (this device and the cloud) without losing anything. */
export function mergeProgress(a: Progress, b: Progress): Progress {
  const cards = { ...a.cards };
  for (const [id, c] of Object.entries(b.cards)) {
    const mine = cards[id];
    // The copy that was practised more is the more up-to-date one.
    if (!mine || c.seen > mine.seen || (c.seen === mine.seen && c.due > mine.due)) cards[id] = c;
  }
  const units = { ...a.units };
  for (const [id, u] of Object.entries(b.units)) {
    const mine = units[id];
    units[id] = mine ? { completedAt: Math.min(mine.completedAt, u.completedAt), best: Math.max(mine.best, u.best) } : u;
  }
  const readings = { ...a.readings };
  for (const [id, r] of Object.entries(b.readings)) {
    const mine = readings[id];
    readings[id] = mine ? { readAt: Math.max(mine.readAt, r.readAt), score: Math.max(mine.score, r.score) } : r;
  }
  const exams = { ...a.exams };
  for (const [id, e] of Object.entries(b.exams ?? {})) {
    const mine = exams[id];
    exams[id] = !mine ? e : { ...(e.at > mine.at ? e : mine), best: Math.max(e.best, mine.best) };
  }
  return {
    version: 1,
    cards,
    units,
    steps: maxRec(a.steps, b.steps),
    readings,
    grammar: maxRec(a.grammar, b.grammar),
    exams,
    // XP per day: the larger count wins, so syncing twice never doubles it.
    xp: maxRec(a.xp, b.xp),
    conj: { right: Math.max(a.conj.right, b.conj.right), wrong: Math.max(a.conj.wrong, b.conj.wrong) },
    settings: a.settings,
  };
}

/** Where each language keeps its progress in this browser. */
export const progressKeyFor = (lang: string) => (lang === 'es' ? 'hablo:progress:v1' : `hablo:progress:${lang}:v1`);

/** Progress of another language saved in this browser (the current one comes from useProgress). */
export function readProgressFor(lang: string): Progress {
  try {
    const raw = localStorage.getItem(progressKeyFor(lang));
    return raw ? parseProgress(JSON.parse(raw)) : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

/** Longest run of consecutive days with XP. */
export function bestStreak(xp: Record<string, number>): number {
  const days = Object.keys(xp).filter((k) => xp[k] > 0).sort();
  let best = 0;
  let run = 0;
  let prev: number | null = null;
  for (const d of days) {
    const t = Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10));
    run = prev !== null && t - prev === 86_400_000 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = t;
  }
  return best;
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
