import { TRANSFER_CHECKS } from '../data/transfer-checks';
import { LANG } from '../data/lang';
import type { Progress } from './store';
import type { Unit, Word } from '../data/types';
import { STEPS, typeEnEs, type Exercise } from './exercises';
import { dueMistakes, questionId } from './learning';

export interface DailyPlan {
  review: Exercise[];
  mistakes: Exercise[];
  lesson: { unit: Unit; step: number } | null;
  context: Exercise[];
}
/**
 * Today's plan: a few due words, past mistakes, the next lesson step and a sentence check.
 * Catch-up (after a break): only a short review of the most overdue words and mistakes, no new
 * lesson, so coming back feels doable instead of facing a mountain of overdue cards.
 */
export function dailyPlan(p: Progress, units: Unit[], words: Record<string, Word>, now = Date.now(), catchup = false): DailyPlan {
  const due = Object.entries(p.cards).filter(([id, c]) => words[id] && c.due <= now)
    .sort((a, b) => a[1].due - b[1].due).slice(0, catchup ? 8 : 5).map(([id]) => words[id]);
  const mistakes = dueMistakes(p.learning, now).filter(m => !due.some(w => w.id === m.wordId)).slice(0, catchup ? 2 : 3)
    .map((m): Exercise => ({ kind: 'type', key: `mistake:${m.id}`, label: 'Recall the correction', prompt: m.prompt,
      answer: m.answer, wordId: m.wordId, why: m.why, assessment: 'practice' }));
  const unit = catchup ? undefined : units.find(u => !p.units[u.id] && STEPS.some((_, i) => p.steps[`${u.id}:${i}`] === undefined));
  const step = unit ? STEPS.findIndex((_, i) => p.steps[`${unit.id}:${i}`] === undefined) : 0;
  const sentence = catchup ? undefined : TRANSFER_CHECKS[LANG].find(s => units.some(u => u.id === s.unitId) &&
    (p.units[s.unitId] || p.steps[`${s.unitId}:1`] !== undefined) &&
    !p.learning.practiced.includes(questionId(s.en, s.answer)));
  return {
    review: due.map(typeEnEs), mistakes, lesson: unit ? { unit, step } : null,
    context: sentence ? [{ kind: 'type', key: `context:${questionId(sentence.en, sentence.answer)}`, label: 'Use what you know · sentence check',
      prompt: sentence.en, answer: sentence.answer, accept: sentence.accept, assessment: 'context' }] : [],
  };
}
