/** Small, portable learning history. Never store the learner's free-text answers. */
export interface Mistake {
  id: string;
  prompt: string;
  answer: string;
  wordId?: string;
  why?: string;
  lastMissed: number;
  updatedAt: number;
  due: number; // 0 = resolved by a later successful retrieval
  misses: number;
}
export interface Attempt { id: string; at: number; ok: boolean; delayed: boolean; context: boolean }
export interface Learning {
  mistakes: Record<string, Mistake>;
  attempts: Attempt[];
  practiced: string[];
  lastPractice: Record<string, number>;
  daily: string[];
}
export const emptyLearning = (): Learning => ({ mistakes: {}, attempts: [], practiced: [], lastPractice: {}, daily: [] });
export const questionId = (prompt: string, answer: string) => `${prompt.trim().toLowerCase()} → ${answer.trim().toLowerCase()}`.slice(0, 1000);
const obj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const text = (v: unknown): v is string => typeof v === 'string' && v.length <= 2000;
const number = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && v >= 0;
export function parseLearning(value: unknown): Learning {
  if (!obj(value)) return emptyLearning();
  const mistakes: Record<string, Mistake> = {};
  if (obj(value.mistakes)) for (const [id, v] of Object.entries(value.mistakes).sort(([, a], [, b]) =>
    (obj(a) && number(a.updatedAt) ? a.updatedAt : 0) - (obj(b) && number(b.updatedAt) ? b.updatedAt : 0)).slice(-100)) {
    if (['__proto__', 'constructor', 'prototype'].includes(id) || !obj(v) || !text(v.prompt) || !text(v.answer) ||
      !['lastMissed', 'updatedAt', 'due', 'misses'].every(k => number(v[k]))) continue;
    mistakes[id] = { id, prompt: v.prompt, answer: v.answer,
      ...(text(v.wordId) ? { wordId: v.wordId } : {}), ...(text(v.why) ? { why: v.why } : {}),
      lastMissed: v.lastMissed as number, updatedAt: v.updatedAt as number, due: v.due as number, misses: v.misses as number };
  }
  const attempts: Attempt[] = Array.isArray(value.attempts) ? value.attempts.filter((v): v is Attempt => obj(v) && text(v.id) && number(v.at) &&
    typeof v.ok === 'boolean' && typeof v.delayed === 'boolean' && typeof v.context === 'boolean').slice(-500)
    .map(v => ({ id: v.id, at: v.at, ok: v.ok, delayed: v.delayed, context: v.context })) : [];
  const strings = (v: unknown, n: number) => Array.isArray(v) ? [...new Set(v.filter(text))].slice(-n) : [];
  return { mistakes, attempts, practiced: strings(value.practiced, 1000),
    lastPractice: obj(value.lastPractice) ? Object.fromEntries(Object.entries(value.lastPractice).filter(([k,v]) => k.length <= 1000 && number(v)).sort((a,b) => Number(a[1]) - Number(b[1])).slice(-1000)) as Record<string, number> : {}, daily: strings(value.daily, 90) };
}
export function mergeLearning(a: Learning, b: Learning): Learning {
  const mistakes = { ...a.mistakes };
  for (const [id, m] of Object.entries(b.mistakes)) if (!mistakes[id] || m.updatedAt > mistakes[id].updatedAt) mistakes[id] = m;
  return parseLearning({
    mistakes: Object.fromEntries(Object.entries(mistakes).sort((a, b) => a[1].updatedAt - b[1].updatedAt)),
    attempts: [...new Map([...a.attempts, ...b.attempts].map(v => [v.id, v])).values()].sort((a, b) => a.at - b.at),
    lastPractice: Object.fromEntries([...new Set([...Object.keys(a.lastPractice), ...Object.keys(b.lastPractice)])].map(k => [k, Math.max(a.lastPractice[k] ?? 0, b.lastPractice[k] ?? 0)])),
    practiced: [...new Set([...a.practiced, ...b.practiced])], daily: [...new Set([...a.daily, ...b.daily])].sort(),
  });
}
export function learningOutcome(history: Learning, task: Pick<Mistake, 'prompt' | 'answer' | 'wordId' | 'why'>,
  ok: boolean, flags: { delayed?: boolean; context?: boolean } = {}, now = Date.now()): Learning {
  const id = questionId(task.prompt, task.answer);
  const previous = history.mistakes[id];
  const mistakes = { ...history.mistakes };
  if (!ok) mistakes[id] = { ...task, id, lastMissed: now, updatedAt: now, due: now + 86_400_000, misses: (previous?.misses ?? 0) + 1 };
  else if (previous && previous.due > 0 && now >= previous.due) mistakes[id] = { ...previous, due: 0, updatedAt: now };
  return parseLearning({ ...history, mistakes,
    practiced: [...history.practiced, id], lastPractice: { ...history.lastPractice, [id]: now },
    attempts: flags.delayed || flags.context ? [...history.attempts, { id: crypto.randomUUID(), at: now, ok,
      delayed: !!flags.delayed, context: !!flags.context }] : history.attempts,
  });
}
export const dueMistakes = (learning: Learning, now = Date.now()) => Object.values(learning.mistakes)
  .filter(m => m.due > 0 && m.due <= now).sort((a, b) => a.due - b.due);

/** Excludes recent aborted sessions and other practice even if SRS wasn't updated. */
export const eligibleDelayedRecall = (learning: Learning, id: string, cardSeen: number | undefined, now = Date.now()) =>
  !!cardSeen && now - Math.max(cardSeen, learning.lastPractice[id] ?? 0) >= 86_400_000;
