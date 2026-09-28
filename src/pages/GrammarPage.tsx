import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GRAMMAR, GRAMMAR_MAP } from '../data/grammar';
import { LEVEL_INFO, LEVELS } from '../data/types';
import { grammarExercises, type Exercise } from '../lib/exercises';
import { addXp, completeGrammar, useProgress } from '../lib/store';
import { Link } from '../components/Nav';
import { Grammar } from '../components/Grammar';
import { VerbTable } from '../components/VerbTable';
import { Session, type SessionSummary } from '../components/Session';
import { Summary } from '../components/Summary';
import { SpeakButton } from '../components/SpeakButton';

export function GrammarList() {
  const { grammar } = useProgress();
  return (
    <div className="page">
      <h1>Grammar</h1>
      <p className="muted">Short lessons that explain the logic behind Spanish: why verbs change, which ones behave alike, and when to use what. Each ends with practice.</p>
      {LEVELS.map((level) => (
        <section key={level} className="level">
          <div className="level-head">
            <h2><span className={`badge ${level}`}>{level}</span> {LEVEL_INFO[level].name}</h2>
          </div>
          <div className="unit-list">
            {GRAMMAR.filter((g) => g.level === level).map((g) => (
              <Link key={g.id} to={`/grammar/${g.id}`} className={`card unit ${grammar[g.id] !== undefined ? 'done' : ''}`}>
                <div className="unit-text">
                  <strong>{g.title}</strong>
                  <span className="muted small" lang="es">{g.titleEs}</span>
                  <span className="small">{g.summary}</span>
                </div>
                {grammar[g.id] !== undefined && <span className="check">✓</span>}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function GrammarLessonPage() {
  const { id = '' } = useParams();
  const lesson = GRAMMAR_MAP[id];
  const { grammar } = useProgress();
  const [session, setSession] = useState<Exercise[] | null>(null);
  const [done, setDone] = useState<{ summary: SessionSummary; xp: number } | null>(null);

  if (!lesson) return <div className="page"><p>Lesson not found. <Link to="/grammar">Back to grammar</Link></p></div>;
  const index = GRAMMAR.indexOf(lesson);
  const next = GRAMMAR[index + 1];

  const start = () => { setDone(null); setSession(grammarExercises(lesson)); };

  if (session) {
    return (
      <Session
        exercises={session}
        title={lesson.title}
        onExit={() => setSession(null)}
        onFinish={(summary) => {
          const xp = summary.correct + 5;
          completeGrammar(lesson.id, Math.round((summary.correct / Math.max(1, summary.total)) * 100));
          addXp(xp);
          setSession(null);
          setDone({ summary, xp });
        }}
      />
    );
  }

  return (
    <div className="page narrow">
      <Link className="link" to="/grammar">← Grammar</Link>
      <header>
        <span className={`badge ${lesson.level}`}>{lesson.level}</span>
        <h1>{lesson.title}</h1>
        <p className="muted" lang="es">{lesson.titleEs}</p>
      </header>

      {done && (
        <Summary
          summary={done.summary}
          xp={done.xp}
          onRetry={start}
          onDone={() => setDone(null)}
          doneLabel="Back to the lesson"
        />
      )}

      <article className="card lesson">
        {lesson.blocks.map((b, i) => {
          switch (b.t) {
            case 'text':
              return <Grammar key={i} source={b.md} />;
            case 'tip':
              return <div key={i} className="tip"><Grammar source={b.md} /></div>;
            case 'table':
              return <VerbTable key={i} verbs={b.verbs} tense={b.tense} caption={b.caption} />;
            case 'examples':
              return (
                <div key={i} className="examples">
                  {b.title && <h3>{b.title}</h3>}
                  <ul>
                    {b.items.map(([es, en]) => (
                      <li key={es}>
                        <span lang="es">{es}</span> <SpeakButton text={es} />
                        <div className="muted small">{en}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
          }
        })}
      </article>

      <div className="row between wrap">
        <span className="muted small">{grammar[lesson.id] !== undefined ? `Best score: ${grammar[lesson.id]}%` : 'Practice to complete this lesson'}</span>
        <div className="row">
          {next && <Link className="btn" to={`/grammar/${next.id}`}>Next lesson →</Link>}
          <button className="btn primary" onClick={start}>Practise</button>
        </div>
      </div>
    </div>
  );
}
