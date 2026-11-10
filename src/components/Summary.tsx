import { WORD_MAP } from '../data/course';
import { LANG } from '../data/lang';
import type { ReactNode } from 'react';
import type { SessionSummary } from './Session';
import { t } from '../lib/ui-text';
import { goalStreak, daysInWeek, today, useProgress } from '../lib/store';

export function Summary({ summary, xp, onDone, onRetry, doneLabel = 'Continue', canDo, extra }: { summary: SessionSummary; xp: number; onDone: () => void; onRetry?: () => void; doneLabel?: string; canDo?: string; extra?: ReactNode }) {
  const pct = summary.total ? Math.round((summary.correct / summary.total) * 100) : 100;
  const missed = Object.entries(summary.words).filter(([, ok]) => !ok).map(([id]) => id);
  const p = useProgress();
  const xpToday = p.xp[today()] ?? 0;
  const goal = p.settings.dailyGoal;
  const st = goalStreak(p);
  const weekDays = daysInWeek(p.xp);
  // Specific, effort-focused feedback: what went well and what happens next, never a bare score.
  const headline = t(pct >= 90 ? 'Excellent work!' : pct >= 70 ? 'Nice progress!' : 'Good effort — this is how it sticks.');
  return (
    <div className="summary card">
      <div className="summary-emoji">{pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : '💪'}</div>
      <h2>{canDo ? 'Lesson complete!' : headline}</h2>
      {canDo && <p className="can-do"><strong>You can now</strong> {canDo}.</p>}
      {extra}
      <p className="summary-streak"><span aria-hidden="true">🔥</span> {st.n > 0 ? st.label : 'Streak started'}{st.weekly ? ` · ${Math.min(weekDays, p.settings.weeklyDays)} of ${p.settings.weeklyDays} days this week` : ''} · {xpToday >= goal ? 'daily goal reached' : `${goal - xpToday} XP to today’s goal`}</p>
      <div className="bar summary-goal" role="progressbar" aria-label="Today’s goal" aria-valuenow={Math.min(xpToday, goal)} aria-valuemin={0} aria-valuemax={goal}><div style={{ width: `${Math.min(100, xpToday / Math.max(1, goal) * 100)}%` }} /></div>
      <div className="stats">
        <div><strong>{pct}%</strong><span>{t('accuracy')}</span></div>
        <div><strong>+{xp}</strong><span>XP</span></div>
        <div><strong>{summary.correct}/{summary.total}</strong><span>{t('first try')}</span></div>
      </div>
      {missed.length > 0 && (
        <p className="muted small">Words to watch — they'll come back sooner in your reviews: <span lang={LANG}>{missed.map(id => WORD_MAP[id]?.es ?? id).join(', ')}</span></p>
      )}
      <div className="row center">
        {onRetry && <button className="btn" onClick={onRetry}>{t('Practise again')}</button>}
        <button className="btn primary" onClick={onDone} autoFocus>{doneLabel}</button>
      </div>
    </div>
  );
}
