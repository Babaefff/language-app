import { useState } from 'react';
import { SENTENCES, WORDS } from '../data/course';
import { LEVELS, type Level } from '../data/types';
import { build, type Exercise } from '../lib/exercises';
import { sample } from '../lib/text';
import { addXp } from '../lib/store';
import { Session, type SessionSummary } from '../components/Session';
import { Summary } from '../components/Summary';

let n = 0;

export function Sentences() {
  const [levels, setLevels] = useState<Level[]>(['A1']);
  const [mode, setMode] = useState<'build' | 'write'>('build');
  const [session, setSession] = useState<Exercise[] | null>(null);
  const [done, setDone] = useState<SessionSummary | null>(null);
  const pool = SENTENCES.filter((s) => levels.includes(s.level));

  const start = () => {
    const picked = sample(pool, 10);
    setDone(null);
    setSession(
      picked.map((s): Exercise =>
        mode === 'build'
          ? build(s, WORDS.filter((w) => w.unitId === s.unitId))
          : { kind: 'type', key: `s${++n}`, label: 'Translate into Spanish', prompt: s.en, answer: s.es },
      ),
    );
  };

  if (session) {
    return <Session exercises={session} title="Sentences" onExit={() => setSession(null)} onFinish={(s) => { addXp(s.correct); setSession(null); setDone(s); }} />;
  }

  return (
    <div className="page narrow">
      <h1>Sentences</h1>
      <p className="muted">Real sentences from the course. Building them word by word trains word order; writing them from scratch trains recall.</p>
      {done && <Summary summary={done} xp={done.correct} onRetry={start} onDone={() => setDone(null)} doneLabel="Done" />}
      {!done && (
        <div className="card">
          <h3>Mode</h3>
          <div className="chips">
            <button className={`chip ${mode === 'build' ? 'on' : ''}`} onClick={() => setMode('build')}>🧩 Build with tiles</button>
            <button className={`chip ${mode === 'write' ? 'on' : ''}`} onClick={() => setMode('write')}>✍️ Write it</button>
          </div>
          <h3>Levels</h3>
          <div className="chips">
            {LEVELS.map((l) => (
              <button key={l} className={`chip ${levels.includes(l) ? 'on' : ''}`} onClick={() => setLevels(levels.includes(l) ? (levels.length > 1 ? levels.filter((x) => x !== l) : levels) : [...levels, l])}>{l}</button>
            ))}
          </div>
          <div className="row between">
            <span className="muted small">{pool.length} sentences</span>
            <button className="btn primary" onClick={start}>Start</button>
          </div>
        </div>
      )}
    </div>
  );
}
