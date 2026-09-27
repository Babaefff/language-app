import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UNIT_MAP, UNITS } from '../data/course';
import { STEPS, stepExercises, type Exercise } from '../lib/exercises';
import { addXp, applyWordResults, completeStep, useProgress } from '../lib/store';
import { strength } from '../lib/srs';
import { Session, type SessionSummary } from '../components/Session';
import { LearnCards } from '../components/LearnCards';
import { Summary } from '../components/Summary';
import { Grammar } from '../components/Grammar';
import { SpeakButton } from '../components/SpeakButton';

type Mode =
  | { name: 'overview' }
  | { name: 'learn' }
  | { name: 'grammar' }
  | { name: 'quiz'; step: number; exercises: Exercise[] }
  | { name: 'done'; step: number; summary: SessionSummary; xp: number };

export function UnitPage() {
  const { id = '' } = useParams();
  const unit = UNIT_MAP[id];
  const p = useProgress();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>({ name: 'overview' });

  if (!unit) return <div className="page"><p>Unit not found. <Link to="/course">Back to the course</Link></p></div>;

  const start = (step: number) => {
    if (step === 0) return setMode({ name: 'learn' });
    if (step === 2) return setMode({ name: 'grammar' });
    setMode({ name: 'quiz', step, exercises: stepExercises(unit, step) });
  };

  const finish = (step: number, summary: SessionSummary) => {
    const score = Math.round((summary.correct / Math.max(1, summary.total)) * 100);
    const xp = summary.correct + 10;
    applyWordResults(summary.words);
    completeStep(unit.id, step, score, STEPS.length);
    addXp(xp);
    setMode({ name: 'done', step, summary, xp });
  };

  if (mode.name === 'learn') {
    return <LearnCards words={unit.words} onExit={() => setMode({ name: 'overview' })} onDone={() => setMode({ name: 'quiz', step: 0, exercises: stepExercises(unit, 0) })} />;
  }
  if (mode.name === 'quiz') {
    return <Session exercises={mode.exercises} title={STEPS[mode.step].title} onExit={() => setMode({ name: 'overview' })} onFinish={(s) => finish(mode.step, s)} />;
  }
  if (mode.name === 'done') {
    const nextStep = mode.step + 1 < STEPS.length ? mode.step + 1 : null;
    const nextUnit = UNITS[UNITS.indexOf(unit) + 1];
    return (
      <div className="page narrow">
        <Summary
          summary={mode.summary}
          xp={mode.xp}
          onRetry={() => start(mode.step)}
          doneLabel={nextStep !== null ? `Next: ${STEPS[nextStep].title}` : nextUnit ? `Next unit: ${nextUnit.title}` : 'Back to course'}
          onDone={() => {
            if (nextStep !== null) start(nextStep);
            else if (nextUnit) { setMode({ name: 'overview' }); navigate(`/unit/${nextUnit.id}`); }
            else navigate('/course');
          }}
        />
      </div>
    );
  }
  if (mode.name === 'grammar') {
    return (
      <div className="page narrow">
        <button className="link" onClick={() => setMode({ name: 'overview' })}>← {unit.title}</button>
        <div className="card">
          <span className="tag">Grammar</span>
          <Grammar source={unit.grammar} />
        </div>
        <div className="row end">
          <button className="btn primary" onClick={() => setMode({ name: 'quiz', step: 2, exercises: stepExercises(unit, 2) })}>Start exercises</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <Link className="link" to="/course">← Course</Link>
      <header className="unit-head">
        <span className="unit-emoji big">{unit.emoji}</span>
        <div>
          <span className={`badge ${unit.level}`}>{unit.level}</span>
          <h1>{unit.title}</h1>
          <p className="muted" lang="es">{unit.titleEs} · {unit.description}</p>
        </div>
      </header>

      <div className="steps">
        {STEPS.map((s, i) => {
          const score = p.steps[`${unit.id}:${i}`];
          return (
            <button key={i} className={`card step ${score !== undefined ? 'done' : ''}`} onClick={() => start(i)}>
              <span className="step-num">{score !== undefined ? '✓' : i + 1}</span>
              <div>
                <strong>{s.title}</strong>
                <span className="muted small">{s.description}</span>
              </div>
              {score !== undefined && <span className="small muted">{score}%</span>}
            </button>
          );
        })}
      </div>

      <section className="card">
        <h3>Words in this unit</h3>
        <ul className="word-list">
          {unit.words.map((w) => (
            <li key={w.id}>
              <span className={`dot ${strength(p.cards[w.id])}`} title={strength(p.cards[w.id])} />
              <span lang="es" className="es">{w.es}</span>
              <span className="muted">{w.en}</span>
              <SpeakButton text={w.es} />
            </li>
          ))}
        </ul>
      </section>

      <details className="card">
        <summary><strong>Grammar notes</strong></summary>
        <Grammar source={unit.grammar} />
      </details>

      <section className="card">
        <h3>Example sentences</h3>
        <ul className="sentence-list">
          {unit.sentences.map((s) => (
            <li key={s.es}>
              <div lang="es">{s.es} <SpeakButton text={s.es} /></div>
              <div className="muted small">{s.en}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
