import { emptyLearning, parseLearning, mergeLearning, learningOutcome, type Learning, type Mistake } from './learning';
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
  /** Colour theme: follow the device, or always light / dark. */
  theme: 'system' | 'light' | 'dark';
  /** Lingua Bloom avatar: centre emoji ('' = initial) and pattern shuffle count. */
  avatarGlyph: string;
  avatarShuffle: number;
  /** When the avatar was last changed (the newest choice wins when syncing devices). */
  avatarAt: number;
  /** Practice plan (implementation intention): daily time, the cue it follows, and minutes. */
  planTime: string;
  planCue: string;
  planMinutes: number;
  /** Weekly goal: practise this many days a week (0 = aim for every day, with a daily streak). */
  weeklyDays: number;
}

export interface ExamResult { at: number; scores: Record<string, number>; best: number }

export interface Progress {
  version: 1;
  learning: Learning;
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
  /** Days kept alive by a streak shield (date → 1). */
  frozen: Record<string, number>;
  conj: { right: number; wrong: number };
  settings: Settings;
}

import { LANG, LANGS } from '../data/lang';

/** Each language keeps its own progress (Spanish keeps the original key). */
let progressOwner: string | null = null;
const storageKey = (lang: string, owner = progressOwner) => {
  const base = lang === 'es' ? 'hablo:progress:v1' : `hablo:progress:${lang}:v1`;
  return owner ? `${base}:user:${owner}` : base;
};

const DEFAULT: Progress = {
  version: 1,
  learning: emptyLearning(),
  cards: {},
  units: {},
  steps: {},
  readings: {},
  grammar: {},
  exams: {},
  xp: {},
  frozen: {},
  conj: { right: 0, wrong: 0 },
  settings: { rate: 0.9, voiceURI: null, accent: 'es-ES', autoplay: true, ticker: true, natural: true, dailyGoal: 50, typeChoices: false, strictSpelling: false, theme: 'system', avatarGlyph: '', avatarShuffle: 0, avatarAt: 0, planTime: '', planCue: '', planMinutes: 10, weeklyDays: 0 },
};

/** The colour theme is one choice for the whole app, not per language. */
const THEME_KEY = 'hablo:theme';
function sharedTheme(): Settings['theme'] | null {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === 'light' || t === 'dark' || t === 'system' ? t : null;
  } catch {
    return null;
  }
}
function saveTheme(t: Settings['theme']) {
  try { localStorage.setItem(THEME_KEY, t); } catch { /* storage unavailable */ }
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Loads saved progress, falling back field by field to defaults if anything is malformed. */
function load(): Progress {
  try {
    const raw = localStorage.getItem(storageKey(LANG));
    return parseProgress(raw ? JSON.parse(raw) : {});
  } catch {
    return parseProgress({});
  }
}

/** Turns stored data (from this browser or the cloud) into valid progress, field by field. */
export function parseProgress(parsed: unknown): Progress {
  try {
    if (!isObj(parsed)) return DEFAULT;
    const record = <T>(value: unknown, valid: (v: unknown) => boolean): Record<string, T> =>
      isObj(value) ? Object.fromEntries(Object.entries(value).filter(([k, v]) =>
        !['__proto__', 'constructor', 'prototype'].includes(k) && valid(v))) as Record<string, T> : {};
    const num = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && v >= 0;
    const fields = (v: unknown, names: string[]) => isObj(v) && names.every(k => num(v[k]));
    const numbers = (v: unknown) => record<number>(v, num);
    const settings = { ...DEFAULT.settings };
    if (isObj(parsed.settings)) {
      for (const k of Object.keys(settings) as (keyof Settings)[]) {
        const v = parsed.settings[k];
        const d = DEFAULT.settings[k];
        if ((typeof d === 'number' && num(v)) ||
            (typeof d === 'boolean' && typeof v === 'boolean') ||
            (typeof d === 'string' && typeof v === 'string' && v.length <= 1000) ||
            (k === 'voiceURI' && (v === null || typeof v === 'string' && v.length <= 1000))) {
          Object.assign(settings, { [k]: v });
        }
      }
    }
    if (!['system', 'light', 'dark'].includes(settings.theme)) settings.theme = DEFAULT.settings.theme;
    if (!['es-ES', 'es-MX', 'any'].includes(settings.accent)) settings.accent = DEFAULT.settings.accent;
    settings.rate = Math.min(1.3, Math.max(0.5, settings.rate));
    settings.weeklyDays = [0, 2, 3, 4, 5, 6].includes(settings.weeklyDays) ? settings.weeklyDays : 0;
    return {
      version: 1,
      learning: parseLearning(parsed.learning),
      cards: record<Card>(parsed.cards, v => fields(v, ['interval', 'due', 'reps', 'lapses', 'seen']) &&
        ['stability', 'difficulty', 'ease'].every(k => !isObj(v) || v[k] === undefined || num(v[k]))),
      units: record(parsed.units, v => fields(v, ['completedAt', 'best'])),
      steps: numbers(parsed.steps),
      readings: record(parsed.readings, v => fields(v, ['readAt', 'score'])),
      grammar: numbers(parsed.grammar),
      exams: record<ExamResult>(parsed.exams, v => fields(v, ['at', 'best']) && isObj(v) && isObj(v.scores) && Object.values(v.scores).every(num)),
      xp: numbers(parsed.xp),
      frozen: numbers(parsed.frozen),
      conj: { right: isObj(parsed.conj) && num(parsed.conj.right) ? parsed.conj.right : 0,
        wrong: isObj(parsed.conj) && num(parsed.conj.wrong) ? parsed.conj.wrong : 0 },
      settings: { ...settings, ...withSharedTheme() },
    };
  } catch {
    return DEFAULT;
  }
}

const withSharedTheme = (): Partial<Settings> => {
  const t = sharedTheme();
  return t ? { theme: t } : {};
};

let state: Progress = load();
// First run after this change: the language opened first decides the shared theme.
if (!sharedTheme()) saveTheme(state.settings.theme);
const listeners = new Set<() => void>();

function set(next: Progress) {
  state = next;
  try {
    localStorage.setItem(storageKey(LANG), JSON.stringify(state));
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
  const avatarChanged = ('avatarGlyph' in patch || 'avatarShuffle' in patch) && !('avatarAt' in patch);
  set({ ...state, settings: { ...state.settings, ...patch, ...(avatarChanged ? { avatarAt: Date.now() } : {}) } });
  if (patch.theme) {
    saveTheme(patch.theme);
    applyTheme(patch.theme);
  }
}

export function resetProgress() {
  set({ ...DEFAULT, settings: state.settings });
}

export function exportProgress(): string {
  return JSON.stringify(state);
}

export function importProgress(json: string) {
  if (new TextEncoder().encode(json).length > 1_000_000) throw new Error('Backup must be smaller than 1 MB');
  const parsed: unknown = JSON.parse(json);
  if (!isObj(parsed) || parsed.version !== 1 || !isObj(parsed.cards)) throw new Error('Not a Hablo backup file');
  set(parseProgress(parsed));
}

/** Applies the colour theme to the page (CSS reads :root[data-theme]). */
export function applyTheme(theme: Settings['theme'] = state.settings.theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'system') delete root.dataset.theme;
  else root.dataset.theme = theme;
  const dark = theme === 'dark' || (theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#171a1c' : '#d6cfc4');
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
    learning: mergeLearning(a.learning, b.learning),
    cards,
    units,
    steps: maxRec(a.steps, b.steps),
    readings,
    grammar: maxRec(a.grammar, b.grammar),
    exams,
    // XP per day: the larger count wins, so syncing twice never doubles it.
    xp: maxRec(a.xp, b.xp),
    frozen: maxRec(a.frozen ?? {}, b.frozen ?? {}),
    conj: { right: Math.max(a.conj.right, b.conj.right), wrong: Math.max(a.conj.wrong, b.conj.wrong) },
    settings: a.settings,
  };
}

/** Where each language keeps its progress in this browser. */
export const progressKeyFor = (lang: string) => storageKey(lang);

/**
 * Switch before syncing so one account can never inherit another account's device copy.
 * Progress made as a guest moves into the account that signs in next (every language), and the
 * guest copy is then removed, so a later account on the same device starts clean.
 */
export function selectProgressAccount(userId: string | null) {
  if (progressOwner === userId) return;
  progressOwner = userId;
  if (userId) moveGuestProgress(userId);
  state = load();
  listeners.forEach(l => l());
}

function moveGuestProgress(userId: string) {
  for (const lang of Object.keys(LANGS)) {
    try {
      const guest = localStorage.getItem(storageKey(lang, null));
      if (!guest) continue;
      const own = localStorage.getItem(storageKey(lang, userId));
      const merged = mergeProgress(parseProgress(own ? JSON.parse(own) : {}), parseProgress(JSON.parse(guest)));
      localStorage.setItem(storageKey(lang, userId), JSON.stringify(merged));
      localStorage.removeItem(storageKey(lang, null));
    } catch {
      // Storage unavailable or a damaged guest copy: leave it where it is.
    }
  }
}

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
export function streak(xp: Record<string, number>, frozen: Record<string, number> = {}): number {
  const active = (d: Date) => !!xp[today(d)] || !!frozen[today(d)];
  const d = new Date();
  if (!active(d)) d.setDate(d.getDate() - 1);
  let n = 0;
  while (active(d)) {
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
export function applyWordResults(words: Record<string, boolean>, close: Record<string, boolean> = {}) {
  const now = Date.now();
  const cards = { ...state.cards };
  for (const [id, ok] of Object.entries(words)) {
    const c = cards[id];
    // Right → "good"; almost (one letter off) → "hard": back sooner than right, later than wrong.
    const grade = ok ? 2 : close[id] ? 1 : 0;
    if (!c || c.due <= now) cards[id] = review(c, grade, now);
    else if (!ok && !close[id]) cards[id] = review(c, 0, now);
  }
  set({ ...state, cards });
}

/** Days since the last practice before today (0 if practised today, yesterday, or never). */
export function daysAway(xp: Record<string, number>, now = new Date()): number {
  if ((xp[today(now)] ?? 0) > 0) return 0;
  const days = Object.keys(xp).filter((k) => xp[k] > 0 && k < today(now)).sort();
  if (!days.length) return 0;
  const [y, m, d] = days[days.length - 1].split('-').map(Number);
  const last = new Date(y, m - 1, d);
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((start.getTime() - last.getTime()) / 86_400_000);
}

/** Monday of the week that contains d (weeks run Monday to Sunday). */
function weekStart(d: Date): Date {
  const s = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  s.setDate(s.getDate() - ((s.getDay() + 6) % 7));
  return s;
}

/** The 7 days (Monday–Sunday) of this week, as date keys. */
export function thisWeek(now = new Date()): string[] {
  const s = weekStart(now);
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(s); d.setDate(s.getDate() + i); return today(d); });
}

/** Practice days in the week containing `d`. */
export function daysInWeek(xp: Record<string, number>, d = new Date()): number {
  return thisWeek(d).filter((k) => (xp[k] ?? 0) > 0).length;
}

/**
 * Weekly goal streak: consecutive weeks with at least `target` practice days. This week counts
 * once the goal is met; until then the streak still stands on last week's result.
 */
export function weekStreak(xp: Record<string, number>, target: number, now = new Date()): number {
  const d = weekStart(now);
  if (daysInWeek(xp, d) < target) d.setDate(d.getDate() - 7);
  let n = 0;
  while (daysInWeek(xp, d) >= target) { n++; d.setDate(d.getDate() - 7); }
  return n;
}

/** The streak that matches the learner's goal: days (daily goal) or weeks (weekly goal). */
export function goalStreak(p: Pick<Progress, 'xp' | 'frozen' | 'settings'>): { n: number; weekly: boolean; label: string } {
  const weekly = p.settings.weeklyDays > 0;
  const n = weekly ? weekStreak(p.xp, p.settings.weeklyDays) : streak(p.xp, p.frozen);
  return { n, weekly, label: `${n}-${weekly ? 'week' : 'day'} streak` };
}

/** Most streak shields you can hold at once. */
export const MAX_SHIELDS = 2;

/**
 * Streak shields: every 7 days you practise earns one (hold up to 2). A missed day is covered
 * automatically, so one busy day doesn't wipe out weeks of work; the habit, not perfection, counts.
 * Derived from the practice days, so it syncs between devices like the rest of the progress.
 */
export function shields(p: Pick<Progress, 'xp' | 'frozen'>): number {
  const earned = Math.floor(Object.values(p.xp).filter((v) => v > 0).length / 7);
  return Math.max(0, Math.min(MAX_SHIELDS, earned - Object.keys(p.frozen ?? {}).length));
}

/** Uses shields for the days missed since the last practice, if that keeps the streak alive. */
export function applyShields(): number {
  const p = getProgress();
  const active = (d: Date) => !!p.xp[today(d)] || !!p.frozen[today(d)];
  const gap: string[] = [];
  const d = new Date();
  d.setDate(d.getDate() - 1);
  while (!active(d) && gap.length <= MAX_SHIELDS) {
    gap.push(today(d));
    d.setDate(d.getDate() - 1);
  }
  // Only a short gap right after an existing streak, and only if there are enough shields.
  if (!gap.length || gap.length > shields(p) || !active(d)) return 0;
  set({ ...p, frozen: { ...p.frozen, ...Object.fromEntries(gap.map((k) => [k, 1])) } });
  return gap.length;
}

/** Called once per independently answered exercise, before scheduling changes. */
export function recordLearning(task: Pick<Mistake, 'prompt' | 'answer' | 'wordId' | 'why'>, ok: boolean,
  flags: { delayed?: boolean; context?: boolean } = {}) {
  set({ ...state, learning: learningOutcome(state.learning, task, ok, flags) });
}
export function completeDailySession() {
  set({ ...state, learning: { ...state.learning, daily: [...new Set([...state.learning.daily, today()])].slice(-90) } });
}
