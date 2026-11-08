import { describe, expect, it } from 'vitest';
import { dueMistakes, emptyLearning, learningOutcome, mergeLearning, parseLearning, questionId } from './learning';
const task = { prompt: 'hello', answer: 'hola', wordId: 'hola' };
const DAY = 86_400_000;
describe('learning history', () => {
  it('spaces mistakes and only resolves them with later correct retrieval', () => {
    const missed = learningOutcome(emptyLearning(), task, false, {}, 100);
    const retry = learningOutcome(missed, task, true, {}, 200);
    expect(dueMistakes(retry, 1000)).toHaveLength(0);
    expect(dueMistakes(retry, DAY + 100)).toHaveLength(1);
    const recalled = learningOutcome(retry, task, true, {}, DAY + 100);
    expect(dueMistakes(recalled, DAY * 2)).toHaveLength(0);
    // A stale cloud copy must not resurrect a resolved mistake.
    expect(dueMistakes(mergeLearning(recalled, missed), DAY * 2)).toHaveLength(0);
  });
  it('keeps measured first-attempt outcomes separate from ordinary practice', () => {
    const normal = learningOutcome(emptyLearning(), task, false);
    expect(normal.attempts).toHaveLength(0);
    const measured = learningOutcome(normal, task, true, { delayed: true });
    expect(measured.attempts).toMatchObject([{ ok: true, delayed: true, context: false }]);
    expect(mergeLearning(measured, measured).attempts).toHaveLength(1);
    expect(measured.practiced).toEqual([questionId(task.prompt, task.answer)]);
  });
  it('discards malformed history and bounds retained checks', () => {
    expect(parseLearning({ mistakes: { bad: null }, attempts: [{ ok: 'true' }], daily: [null] })).toEqual(emptyLearning());
    const samples = Array.from({ length: 600 }, (_, i) => ({ id: String(i), at: i, ok: true, delayed: true, context: false }));
    expect(parseLearning({ attempts: samples }).attempts).toHaveLength(500);
    const malicious = JSON.parse('{"mistakes":{"__proto__":{"prompt":"bad","answer":"bad","due":1,"lastMissed":1,"updatedAt":1,"misses":1}}}');
    expect(Object.keys(parseLearning(malicious).mistakes)).toEqual([]);
  });
});

it('does not treat a recent aborted exercise as a fresh delayed-recall check', async () => {
  const { eligibleDelayedRecall } = await import('./learning');
  const now = 3 * DAY;
  const history = learningOutcome(emptyLearning(), task, false, {}, now - 1000);
  expect(eligibleDelayedRecall(history, questionId(task.prompt, task.answer), 1, now)).toBe(false);
  expect(eligibleDelayedRecall(history, questionId(task.prompt, task.answer), 1, now + DAY)).toBe(true);
  expect(eligibleDelayedRecall(emptyLearning(), 'new', undefined, now)).toBe(false);
});
