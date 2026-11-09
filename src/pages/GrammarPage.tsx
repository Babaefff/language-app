import { L, LANG } from '../data/lang';
import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { UNIT_LESSONS, UNIT_MAP } from '../data/course';
import { GRAMMAR, GRAMMAR_MAP } from '../data/grammar';
import { LEVEL_INFO, LEVELS } from '../data/types';
import { grammarExercises, lessonGlossary, type Exercise } from '../lib/exercises';
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
      <p className="muted">Short lessons that explain the logic behind {L.name}: why verbs change, which ones behave alike, and when to use what. Each ends with practice.</p>
      <Link to="/pronunciation" className="card action pron-link">
        <h2>Pronunciation</h2>
        <p className="muted small">Start here: how every letter and letter combination sounds, with examples to hear.</p>
      </Link>
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
                  <span className="muted small" lang={LANG}>{g.titleEs}</span>
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
  const [params] = useSearchParams();
  const fromUnit = params.get('from');
  const navigate = useNavigate();
  const { grammar } = useProgress();
  const [session, setSession] = useState<Exercise[] | null>(null);
  const [done, setDone] = useState<{ summary: SessionSummary; xp: number } | null>(null);

  if (!lesson) return <div className="page"><p>Lesson not found. <Link to="/grammar">Back to grammar</Link></p></div>;
  const index = GRAMMAR.indexOf(lesson);
  // Opened from a course lesson: stay in the course. "Next" is that lesson's next grammar topic,
  // or back to the course lesson; only the Grammar section walks through grammar in order.
  const unit = fromUnit ? UNIT_MAP[fromUnit] : undefined;
  const related = unit ? UNIT_LESSONS[unit.id] ?? [] : [];
  const nextRelated = unit ? related[related.indexOf(lesson.id) + 1] : undefined;
  const next = unit ? (nextRelated ? GRAMMAR_MAP[nextRelated] : undefined) : GRAMMAR[index + 1];
  const nextHref = (g: { id: string }) => `/grammar/${g.id}${unit ? `?from=${unit.id}` : ''}`;

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
      {unit ? <Link className="link" to={`/unit/${unit.id}`}>← {unit.title}</Link> : <Link className="link" to="/grammar">← Grammar</Link>}
      <header>
        <span className={`badge ${lesson.level}`}>{lesson.level}</span>
        <h1>{lesson.title}</h1>
        <p className="muted" lang={LANG}>{lesson.titleEs}</p>
      </header>

      {done && (
        <Summary
          summary={done.summary}
          xp={done.xp}
          onRetry={start}
          onDone={() => (unit && !next ? navigate(`/unit/${unit.id}`) : setDone(null))}
          doneLabel={unit && !next ? `Back to ${unit.title}` : 'Back to the lesson'}
        />
      )}

      <article className="card lesson">
        {(() => {
          // Every word the lesson and its practice use, with its meaning: nothing appears untranslated.
          const words = lessonGlossary(lesson);
          return words.length > 0 && (
            <section className="lesson-words">
              <h3>Words in this lesson</h3>
              <ul className="glossary-list">{words.map((w) => <li key={w.word}><strong lang={LANG}>{w.word}</strong> <span>{w.en}</span></li>)}</ul>
            </section>
          );
        })()}
        {lesson.blocks.map((b, i) => {
          switch (b.t) {
            case 'text':
              return <Grammar key={i} source={b.md} />;
            case 'logic':
              return <div key={i} className="logic"><h3>The logic</h3><Grammar source={b.md} /></div>;
            case 'tip':
              return <div key={i} className="tip"><Grammar source={b.md} /></div>;
            case 'table':
              return <VerbTable key={i} verbs={b.verbs} tense={b.tense} caption={b.caption} />;
            case 'mistakes':
              return (
                <div key={i} className="mistakes">
                  <h3>Common mistakes</h3>
                  <ul>
                    {b.items.map(([wrong, right, why]) => (
                      <li key={wrong}>
                        <div><span className="wrong" lang={LANG}>✗ {wrong}</span> <span className="right" lang={LANG}>✓ {right}</span> <SpeakButton text={right} /></div>
                        <div className="muted small">{why}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            case 'examples':
              return (
                <div key={i} className="examples">
                  {b.title && <h3>{b.title}</h3>}
                  <ul>
                    {b.items.map(([es, en]) => (
                      <li key={es}>
                        <span lang={LANG}>{es}</span> <SpeakButton text={es} />
                        <div className="muted small">{en}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
          }
        })}
      </article>

      <div className="page-actions">
        <span className="muted small">{grammar[lesson.id] !== undefined ? `Best score: ${grammar[lesson.id]}%` : 'Practice to complete this lesson'}</span>
        <div className="row wrap">
          <button className="btn primary" onClick={start}>Practise</button>
          {next && <Link className="btn" to={nextHref(next)}>{unit ? `Next: ${next.title}` : 'Next lesson'} →</Link>}
          {unit && !next && <Link className="btn" to={`/unit/${unit.id}`}>Back to {unit.title} →</Link>}
        </div>
      </div>
    </div>
  );
}
