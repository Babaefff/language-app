import { describe, expect, it } from 'vitest';
import { parseProgress } from './store';
import { TRANSFER_CHECKS } from '../data/transfer-checks';
import { questionId } from './learning';
import { loadContent } from '../data/load';
await loadContent('es');
const { UNITS, WORD_MAP } = await import('../data/course');
const { dailyPlan } = await import('./daily');

describe('daily plan', () => {
  it('starts a new learner with a complete first lesson step, without invented review', () => {
    const plan = dailyPlan(parseProgress({}), UNITS, WORD_MAP);
    expect(plan.review).toEqual([]);
    expect(plan.context).toEqual([]);
    expect(plan.lesson).toMatchObject({ unit: { id: UNITS[0].id }, step: 0 });
  });
  it('bounds reviews and excludes seen sentences from new-context checks', () => {
    const unit = UNITS[0];
    const p = parseProgress({ cards: Object.fromEntries(unit.words.map(w => [w.id, { due: 1, interval: 1, reps: 2, lapses: 0, seen: 1 }])),
      steps: { [`${unit.id}:0`]: 80, [`${unit.id}:1`]: 80 } });
    const plan = dailyPlan(p, [unit], WORD_MAP);
    expect(plan.review.length).toBeLessThanOrEqual(5);
    expect(plan.lesson?.step).toBe(2);
    expect(plan.context).toHaveLength(1);
    const s = TRANSFER_CHECKS.es[0];
    p.learning.practiced.push(questionId(s.en, s.answer));
    const next = dailyPlan(p, [unit], WORD_MAP).context[0];
    if (next?.kind === 'type') expect(next.answer).not.toBe(s.answer);
  });
});

it('does not send an older completed-unit save back to its first step', () => {
  const unit = UNITS[0];
  const p = parseProgress({ units: { [unit.id]: { completedAt: 1, best: 100 } } });
  expect(dailyPlan(p, UNITS, WORD_MAP).lesson?.unit.id).toBe(UNITS[1].id);
});
