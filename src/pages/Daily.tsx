import { useCheckpointState } from '../components/Checkpoint';
import { useSearchParams } from 'react-router-dom';
import { Link } from '../components/Nav';
import { Session, type SessionSummary } from '../components/Session';
import { UnitPage } from './UnitPage';
import { dailyPlan } from '../lib/daily';
import { UNITS, WORD_MAP } from '../data/course';
import { addXp, applyWordResults, completeDailySession, getProgress } from '../lib/store';

export function Daily() {
  const [params] = useSearchParams();
  const catchup = params.get('catchup') === '1';
  const [state, setState] = useCheckpointState('daily', () => ({ plan: dailyPlan(getProgress(), UNITS, WORD_MAP, Date.now(), catchup), index: -1, finished: false }));
  const { plan, index, finished } = state;
  const setIndex = (index: number) => setState(s => ({ ...s, index }));
  const setFinished = (finished: boolean) => setState(s => ({ ...s, finished }));
  const stages = [
    ...(plan.review.length ? [{ title: 'Review', exercises: plan.review }] : []),
    ...(plan.mistakes.length ? [{ title: 'Mistakes', exercises: plan.mistakes }] : []),
    ...(plan.lesson ? [{ title: 'Lesson', lesson: plan.lesson }] : []),
    ...(plan.context.length ? [{ title: 'Sentence check', exercises: plan.context }] : []),
  ];
  const advance = () => {
    if (index + 1 >= stages.length) { completeDailySession(); setFinished(true); }
    else setIndex(index + 1);
  };
  const finishPractice = (s: SessionSummary) => { applyWordResults(s.words, s.close); addXp(s.correct); advance(); };
  if (finished) return <div className="page narrow"><section className="card daily-finish">
    <h1>Session complete</h1>
    <Link className="btn primary" to="/progress">Progress</Link> <Link className="btn" to="/">Back home</Link>
  </section></div>;
  const stage = stages[index];
  if (stage) return <div className="page">
    <div className="daily-strip"><span className="eyebrow">Daily session · {index + 1} of {stages.length}</span><strong>{stage.title}</strong></div>
    {'lesson' in stage && stage.lesson ? <UnitPage key={`lesson:${index}`} unitId={stage.lesson.unit.id} initialStep={stage.lesson.step} onComplete={advance} /> :
      <Session key={`practice:${index}`} title={stage.title} exercises={stage.exercises ?? []} onFinish={finishPractice} onExit={() => setIndex(-1)} />}
  </div>;
  return <div className="page narrow">
    <Link className="link" to="/">← Home</Link>
    <header className="page-heading"><h1>{catchup ? 'Welcome-back catch-up' : 'Daily session'}</h1>{catchup && <p className="muted">Just your most overdue words, about 5 minutes. The rest come back gradually over the next days.</p>}</header>
    <section className="card"><ol className="daily-agenda">{stages.map((s, i) => <li key={s.title}><span className="step-num">{i + 1}</span><div><strong>{s.title}</strong><p className="small muted">{'lesson' in s && s.lesson ? s.lesson.unit.title : `${s.exercises?.length} questions`}</p></div></li>)}</ol>
      {stages.length ? <button className="btn primary" onClick={() => setIndex(0)}>Begin daily session</button> : <p>You’re caught up. Return tomorrow, or explore a reading.</p>}
    </section>
    <p className="muted small">Unfinished sessions can be resumed on this device.</p>
  </div>;
}
