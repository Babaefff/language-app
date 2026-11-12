import { L, LANG } from '../data/lang';
import { Link } from '../components/Nav';
import { unitsForLevel } from '../data/course';
import { LEVEL_INFO, LEVELS } from '../data/types';
import { isPlaced, useProgress } from '../lib/store';
import { STEPS } from '../lib/exercises';

export function Course() {
  const p = useProgress();
  return (
    <div className="page">
      <h1>Course</h1>
      <p className="muted">Work through the units in order — each builds on the last. You can jump ahead any time. <Link to="/welcome">Find your level</Link></p>
      {Object.values(p.units).some(isPlaced) && <p className="small muted">🧭 = known from the level test. Open any of them to revise.</p>}
      {LEVELS.map((level) => {
        const units = unitsForLevel(level);
        const done = units.filter((u) => p.units[u.id]).length;
        return (
          <section key={level} className="level">
            <div className="level-head">
              <h2><span className={`badge ${level}`}>{level}</span> {LEVEL_INFO[level].name}</h2>
              <span className="muted small">{done}/{units.length} units</span>
            </div>
            <p className="muted small">{L.levels[level]}</p>
            <div className="unit-list">
              {units.map((u) => {
                const steps = STEPS.filter((_, i) => p.steps[`${u.id}:${i}`] !== undefined).length;
                return (
                  <Link key={u.id} to={`/unit/${u.id}`} className={`card unit ${p.units[u.id] ? 'done' : ''} ${isPlaced(p.units[u.id]) ? 'placed' : ''}`}>
                    <span className="unit-emoji">{u.emoji}</span>
                    <div className="unit-text">
                      <strong>{u.title}</strong>
                      <span className="muted small" lang={LANG}>{u.titleEs}</span>
                      <div className="dots">{STEPS.map((_, i) => <i key={i} className={i < steps ? 'on' : ''} />)}</div>
                    </div>
                    {p.units[u.id] && <span className="check" title={isPlaced(p.units[u.id]) ? 'Known from the level test' : 'Finished'}>{isPlaced(p.units[u.id]) ? '🧭' : '✓'}</span>}
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
