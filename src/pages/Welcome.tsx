import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpeakButton } from '../components/SpeakButton';
import { AccountCard } from '../components/AccountCard';
import { L, LANG } from '../data/lang';
import { UNITS } from '../data/course';
import { LEVEL_INFO, LEVELS, type Level } from '../data/types';
import { PER_CHECKPOINT, checkpoints, decide, questionsFor, startUnit } from '../lib/placement';
import { placeAt, updateSettings } from '../lib/store';
import { accountsEnabled, configProblem, useSync } from '../lib/sync';

type Step =
  | { name: 'choose' }
  | { name: 'levels' }
  | { name: 'intro' }
  | { name: 'test'; cp: number; q: number; right: number }
  | { name: 'result'; passed: number }
  | { name: 'account'; startId: string };

const ORDER = UNITS.map((u) => u.id);
const lessonNo = (id: string) => ORDER.indexOf(id) + 1;

/** First visit: where to start (beginner, level test or a chosen level), then an optional sign-in. */
export function Welcome() {
  const navigate = useNavigate();
  const { user } = useSync();
  const [step, setStep] = useState<Step>({ name: 'choose' });
  const cps = useMemo(() => checkpoints(), []);
  const [qs, setQs] = useState(() => questionsFor(cps[0], 0));
  // Signed in from the welcome: returning learners go straight to their course.
  const [wasSignedIn] = useState(!!user);
  useEffect(() => {
    if (!user || wasSignedIn) return;
    if (step.name === 'choose') { updateSettings({ welcomed: true }); navigate('/', { replace: true }); }
    else if (step.name === 'account') { updateSettings({ welcomed: true }); navigate(step.startId === ORDER[0] ? '/' : `/unit/${step.startId}`, { replace: true }); }
  }, [user, wasSignedIn, step, navigate]);

  const begin = (startId: string) => {
    placeAt(ORDER, startId);
    // Sign-in is offered once, never required.
    if (accountsEnabled && !configProblem && !user) setStep({ name: 'account', startId });
    else finish(startId);
  };
  const finish = (startId: string) => {
    updateSettings({ welcomed: true });
    navigate(startId === ORDER[0] ? '/' : `/unit/${startId}`, { replace: true });
  };
  const answer = (ok: boolean) => {
    if (step.name !== 'test') return;
    const right = step.right + (ok ? 1 : 0);
    const q = step.q + 1;
    const d = decide(qs.length, q, right);
    if (d === 'pass') {
      if (step.cp + 1 < cps.length) {
        setQs(questionsFor(cps[step.cp + 1], step.cp + 1));
        setStep({ name: 'test', cp: step.cp + 1, q: 0, right: 0 });
      } else setStep({ name: 'result', passed: cps.length });
      return;
    }
    if (d === 'extend') {
      // Ask 2 more questions from the same lessons (not repeating any).
      const asked = new Set(qs.map((x) => x.prompt));
      const more = questionsFor(cps[step.cp], step.cp).filter((x) => !asked.has(x.prompt)).slice(0, 2);
      if (more.length === 2) { setQs([...qs, ...more]); setStep({ ...step, q, right }); return; }
    }
    if (d !== 'continue') { setStep({ name: 'result', passed: step.cp }); return; }
    setStep({ ...step, q, right });
  };

  if (step.name === 'choose') {
    return (
      <div className="page narrow welcome">
        <header className="welcome-hero">
          <span className="welcome-flag" aria-hidden="true">{L.flag}</span>
          <h1>Welcome to Hablo</h1>
          <p className="muted">Where would you like to start with {L.name}?</p>
        </header>
        <div className="welcome-options">
          <Option emoji="🌱" title={`I’m new to ${L.name}`} text="Start with the first lesson: hello, names, numbers." onClick={() => begin(ORDER[0])} />
          <Option emoji="🧭" title="I know some: find my level" text="A short test, 2–8 minutes. It stops as soon as it finds your level." onClick={() => setStep({ name: 'intro' })} />
          <Option emoji="📚" title="I’ll choose my level" text="A1, A2 or B1." onClick={() => setStep({ name: 'levels' })} />
        </div>
        {accountsEnabled && !configProblem && !user && (
          <section className="card welcome-signin">
            <h2>Already learning with Hablo?</h2>
            <p className="muted small">Sign in to continue where you left off, on any device.</p>
            <AccountCard bare />
          </section>
        )}
      </div>
    );
  }

  if (step.name === 'levels') {
    return (
      <div className="page narrow welcome">
        <button className="link" onClick={() => setStep({ name: 'choose' })}>← Back</button>
        <h1>Choose your level</h1>
        <p className="muted">Lessons before it are marked as known. You can open any of them later to revise.</p>
        <div className="welcome-options">
          {LEVELS.map((lv: Level) => {
            const first = UNITS.find((u) => u.level === lv);
            if (!first) return null;
            return (
              <Option key={lv} badge={lv} title={LEVEL_INFO[lv].name} text={L.levels[lv]} onClick={() => begin(first.id)} />
            );
          })}
        </div>
        <p className="small muted">Not sure? <button className="link" onClick={() => setStep({ name: 'intro' })}>Take the level test</button></p>
      </div>
    );
  }

  if (step.name === 'intro') {
    return (
      <div className="page narrow welcome">
        <button className="link" onClick={() => setStep({ name: 'choose' })}>← Back</button>
        <h1>Find your level</h1>
        <ul className="welcome-rules">
          <li>Questions get harder step by step, from A1 to B1. The test stops as soon as it finds your level.</li>
          <li>Answers aren’t marked one by one: no pressure.</li>
          <li><strong>Don’t guess.</strong> Tap “I don’t know” instead: a lucky guess would start you too high, and the lessons would feel too hard.</li>
        </ul>
        <button className="btn primary" onClick={() => { setQs(questionsFor(cps[0], 0)); setStep({ name: 'test', cp: 0, q: 0, right: 0 }); }}>Start the test</button>
      </div>
    );
  }

  if (step.name === 'test') {
    const q = qs[step.q];
    const total = cps.length;
    return (
      <div className="page narrow welcome">
        <div className="row between"><span className="tag">Level test · {cps[step.cp].level}</span><span className="muted small">Step {step.cp + 1} of {total}</span></div>
        <div className="bar welcome-bar" role="progressbar" aria-valuenow={step.cp} aria-valuemin={0} aria-valuemax={total}><div style={{ width: `${((step.cp + step.q / PER_CHECKPOINT) / total) * 100}%` }} /></div>
        <section className="card placement-q" key={`${step.cp}:${step.q}`}>
          <p className="muted small">{q.kind === 'say' ? `How do you say this in ${L.name}?` : q.kind === 'sentence' ? 'What does this sentence mean?' : 'What does this word mean?'}</p>
          <div className="row placement-prompt">
            <strong lang={q.kind === 'say' ? 'en' : LANG}>{q.prompt}</strong>
            {q.audio && <SpeakButton text={q.audio} />}
          </div>
          <div className="placement-options">
            {q.options.map((o, i) => <button key={i} className="option" lang={q.kind === 'say' ? LANG : 'en'} onClick={() => answer(i === q.answer)}>{o}</button>)}
          </div>
          <button className="btn welcome-dontknow" onClick={() => answer(false)}>🤷 I don’t know</button>
        </section>
        <p className="small muted"><button className="link" onClick={() => setStep({ name: 'result', passed: step.cp })}>Stop here</button> and start from this level.</p>
      </div>
    );
  }

  if (step.name === 'result') {
    const start = startUnit(step.passed, cps) ?? UNITS[UNITS.length - 1];
    const known = step.passed;
    return (
      <div className="page narrow welcome">
        <h1>{known === 0 ? 'Start from the beginning 🌱' : `Your level: ${start.level}`}</h1>
        {known === 0 ? (
          <p>The first lessons will build a strong base. You’ll move fast through anything you already know.</p>
        ) : (
          <p>You know the words and sentences of the first {lessonNo(start.id) - 1} lessons. We suggest starting at <strong>lesson {lessonNo(start.id)}: {start.title}</strong> ({start.level}).</p>
        )}
        {known > 0 && <p className="muted small">The lessons before it are marked as known. Open any of them in the course to revise.</p>}
        <div className="welcome-actions">
          <button className="btn primary" onClick={() => begin(start.id)}>{known === 0 ? 'Start lesson 1' : `Start at lesson ${lessonNo(start.id)}`}</button>
          {known > 0 && <button className="btn" onClick={() => begin(ORDER[0])}>Start from lesson 1 instead</button>}
          <button className="link" onClick={() => setStep({ name: 'levels' })}>Choose another level</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page narrow welcome">
      <h1>Save your progress?</h1>
      <p className="muted">Optional. With a free account your progress is kept safe and follows you to your phone, tablet or computer. You can also do this later in Settings.</p>
      <AccountCard bare />
      <button className="btn primary welcome-skip" onClick={() => finish(step.startId)}>{user ? 'Continue' : 'Not now, start learning'}</button>
    </div>
  );
}

function Option({ emoji, badge, title, text, onClick }: { emoji?: string; badge?: Level; title: string; text: string; onClick: () => void }) {
  return (
    <button className="welcome-option" onClick={onClick}>
      <span className="welcome-icon" aria-hidden="true">{badge ? <span className={`badge ${badge}`}>{badge}</span> : emoji}</span>
      <span className="welcome-text"><strong>{title}</strong><span className="muted small">{text}</span></span>
      <span className="welcome-chevron" aria-hidden="true">›</span>
    </button>
  );
}
