import { useState } from 'react';
import { Link } from '../components/Nav';
import { Session, type SessionSummary } from '../components/Session';
import { UnitPage } from './UnitPage';
import { dailyPlan } from '../lib/daily';
import { UNITS, WORD_MAP } from '../data/course';
import { addXp, applyWordResults, completeDailySession, getProgress } from '../lib/store';

export function Daily() {
  const [plan] = useState(() => dailyPlan(getProgress(), UNITS, WORD_MAP));
  const [index, setIndex] = useState(-1);
  const [finished, setFinished] = useState(false);
  const stages = [
    ...(plan.review.length ? [{ title: 'Recall due words', exercises: plan.review }] : []),
    ...(plan.mistakes.length ? [{ title: 'Revisit mistakes', exercises: plan.mistakes }] : []),
    ...(plan.lesson ? [{ title: 'One lesson step', lesson: plan.lesson }] : []),
    ...(plan.context.length ? [{ title: 'Use it in a sentence', exercises: plan.context }] : []),
  ];
  const advance = () => {
    if (index + 1 >= stages.length) { completeDailySession(); setFinished(true); }
    else setIndex(index + 1);
  };
  const finishPractice = (s: SessionSummary) => { applyWordResults(s.words); addXp(s.correct); advance(); };
  if (finished) return <div className="page narrow"><section className="card daily-finish">
    <span className="eyebrow">Today’s session · complete</span><h1>A good place to pause.</h1>
    <p>You’ve made time for your learning. Come back tomorrow to practise after a break.</p>
    <p className="muted">Mistakes will return in a later review. A corrected retry is practice, not a delayed-recall score.</p>
    <Link className="btn primary" to="/progress">See learning insights</Link> <Link className="btn" to="/">Back home</Link>
  </section></div>;
  const stage = stages[index];
  if (stage) return <div className="page">
    <div className="daily-strip"><span className="eyebrow">Daily session · {index + 1} of {stages.length}</span><strong>{stage.title}</strong></div>
    {'lesson' in stage && stage.lesson ? <UnitPage key={`lesson:${index}`} unitId={stage.lesson.unit.id} initialStep={stage.lesson.step} onComplete={advance} /> :
      <Session key={`practice:${index}`} title={stage.title} exercises={stage.exercises ?? []} onFinish={finishPractice} onExit={() => setIndex(-1)} />}
  </div>;
  return <div className="page narrow">
    <Link className="link" to="/">← Home</Link>
    <header className="page-heading"><span className="eyebrow">A little, often</span><h1>Your daily session</h1>
      <p className="muted">A small review batch, one complete lesson step, and a chance to use what you know. Go at your own pace.</p></header>
    <section className="card"><ol className="daily-agenda">{stages.map((s, i) => <li key={s.title}><span className="step-num">{i + 1}</span><div><strong>{s.title}</strong><p className="small muted">{'lesson' in s && s.lesson ? s.lesson.unit.title : `${s.exercises?.length} questions`}</p></div></li>)}</ol>
      {!plan.context.length && <p className="small muted">Sentence checks appear after a practice step, when there’s a fresh combination of familiar phrases to try.</p>}
      {stages.length ? <button className="btn primary" onClick={() => setIndex(0)}>Begin daily session</button> : <p>You’re caught up. Return tomorrow, or explore a reading.</p>}
    </section>
    <p className="muted small">You can stop at any time. Completed lesson steps and finished review batches are saved; an unfinished daily session starts again when you return.</p>
  </div>;
}
