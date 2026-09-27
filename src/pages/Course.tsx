import { Link } from 'react-router-dom';
import { unitsForLevel } from '../data/course';
import { LEVEL_INFO, LEVELS } from '../data/types';
import { useProgress } from '../lib/store';
import { STEPS } from '../lib/exercises';

export function Course() {
  const p = useProgress();
  return (
    <div className="page">
      <h1>Course</h1>
      <p className="muted">Work through the units in order — each builds on the last. You can jump ahead any time.</p>
      {LEVELS.map((level) => {
        const units = unitsForLevel(level);
        const done = units.filter((u) => p.units[u.id]).length;
        return (
          <section key={level} className="level">
            <div className="level-head">
              <h2><span className={`badge ${level}`}>{level}</span> {LEVEL_INFO[level].name}</h2>
              <span className="muted small">{done}/{units.length} units</span>
            </div>
            <p className="muted small">{LEVEL_INFO[level].description}</p>
            <div className="unit-list">
              {units.map((u) => {
                const steps = STEPS.filter((_, i) => p.steps[`${u.id}:${i}`] !== undefined).length;
                return (
                  <Link key={u.id} to={`/unit/${u.id}`} className={`card unit ${p.units[u.id] ? 'done' : ''}`}>
                    <span className="unit-emoji">{u.emoji}</span>
                    <div className="unit-text">
                      <strong>{u.title}</strong>
                      <span className="muted small" lang="es">{u.titleEs}</span>
                      <div className="dots">{STEPS.map((_, i) => <i key={i} className={i < steps ? 'on' : ''} />)}</div>
                    </div>
                    {p.units[u.id] && <span className="check">✓</span>}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
