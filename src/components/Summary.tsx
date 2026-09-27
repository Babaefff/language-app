import type { SessionSummary } from './Session';

export function Summary({ summary, xp, onDone, onRetry, doneLabel = 'Continue' }: { summary: SessionSummary; xp: number; onDone: () => void; onRetry?: () => void; doneLabel?: string }) {
  const pct = summary.total ? Math.round((summary.correct / summary.total) * 100) : 100;
  const missed = Object.entries(summary.words).filter(([, ok]) => !ok).map(([id]) => id);
  return (
    <div className="summary card">
      <div className="summary-emoji">{pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : '💪'}</div>
      <h2>{pct >= 90 ? '¡Excelente!' : pct >= 70 ? '¡Muy bien!' : '¡Sigue así!'}</h2>
      <div className="stats">
        <div><strong>{pct}%</strong><span>accuracy</span></div>
        <div><strong>+{xp}</strong><span>XP</span></div>
        <div><strong>{summary.correct}/{summary.total}</strong><span>first try</span></div>
      </div>
      {missed.length > 0 && (
        <p className="muted small">Words to watch — they'll come back sooner in your reviews: <span lang="es">{missed.join(', ')}</span></p>
      )}
      <div className="row center">
        {onRetry && <button className="btn" onClick={onRetry}>Practise again</button>}
        <button className="btn primary" onClick={onDone} autoFocus>{doneLabel}</button>
      </div>
    </div>
  );
}
