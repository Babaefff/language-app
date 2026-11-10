import { useEffect, useState } from 'react';
import { Link } from '../components/Nav';
import { LANG } from '../data/lang';
import { Session, type SessionSummary } from '../components/Session';
import { LearnCards } from '../components/LearnCards';
import { Summary } from '../components/Summary';
import { Grammar } from '../components/Grammar';
import { SpeakButton } from '../components/SpeakButton';
import { WordParts } from '../components/WordParts';
import { stepExercises, type Exercise } from '../lib/exercises';
import { addXp, applyWordResults, completeStep, useProgress } from '../lib/store';
import { strength } from '../lib/srs';
import { useSync } from '../lib/sync';
import { clock, lessonUnit, myResults, saveResult, testExercises, usePersonal, type PersonalResult, type PersonalSet, type PersonalTest } from '../lib/personal';
import type { Unit } from '../data/types';

const STEP_NAMES = ['Learn the words', 'Practise', 'Sentences'];

type Mode =
  | { name: 'list' }
  | { name: 'learn'; unit: Unit }
  | { name: 'quiz'; unit: Unit; step: number; exercises: Exercise[] }
  | { name: 'notes'; unit: Unit }
  | { name: 'test'; set: PersonalSet; test: PersonalTest; exercises: Exercise[]; started: number }
  | { name: 'done'; summary: SessionSummary; xp: number; label: string; saved?: string; exam?: { pass: number; passed: boolean; seconds: number; minutes: number } };

/** The learner's own tab ("Mu kalli jaoks"): lessons and tests made from their own material. */
export function Personal() {
  const { user } = useSync();
  const sets = usePersonal(user?.id);
  const p = useProgress();
  const [mode, setMode] = useState<Mode>({ name: 'list' });
  const [results, setResults] = useState<PersonalResult[]>([]);
  useEffect(() => { if (user) void myResults().then(setResults); }, [user, mode.name]);
  const mine = (sets ?? []).filter((s) => s.lang === LANG);

  if (!user) return <div className="page narrow"><p>Sign in to see your personal lessons.</p><Link className="btn primary" to="/account">Sign in</Link></div>;
  if (sets === null) return <div className="page narrow"><p className="muted">Loading…</p></div>;
  if (!mine.length) return <div className="page narrow"><h1>Personal lessons</h1><p className="muted">There’s nothing here for this language yet.</p></div>;

  const back = () => setMode({ name: 'list' });
  const finishStep = (unit: Unit, step: number, s: SessionSummary) => {
    const score = Math.round((s.correct / Math.max(1, s.total)) * 100);
    const xp = s.correct + 10;
    applyWordResults(s.words, s.close);
    completeStep(unit.id, step, score, unit.sentences.length ? 3 : 2);
    addXp(xp);
    setMode({ name: 'done', summary: s, xp, label: `${unit.title} · ${STEP_NAMES[step]}` });
  };
  const start = (unit: Unit, step: number) => {
    if (step === 0) return setMode({ name: 'learn', unit });
    if (step === 2) return setMode({ name: 'notes', unit });
    setMode({ name: 'quiz', unit, step, exercises: stepExercises(unit, step, []) });
  };

  if (mode.name === 'learn') return <LearnCards words={mode.unit.words} onExit={back} onDone={() => setMode({ name: 'quiz', unit: mode.unit, step: 0, exercises: stepExercises(mode.unit, 0) })} />;
  if (mode.name === 'quiz') return <Session title={`${mode.unit.title} · ${STEP_NAMES[mode.step]}`} exercises={mode.exercises} onExit={back} onFinish={(s) => finishStep(mode.unit, mode.step, s)} />;
  if (mode.name === 'notes') {
    return (
      <div className="page narrow">
        <button className="link" onClick={back}>← {mine[0].tabName}</button>
        {mode.unit.grammar && <div className="card"><span className="tag">Notes</span><Grammar source={mode.unit.grammar} /></div>}
        <div className="page-actions"><button className="btn primary" onClick={() => setMode({ name: 'quiz', unit: mode.unit, step: 2, exercises: stepExercises(mode.unit, 2) })}>Start exercises</button></div>
      </div>
    );
  }
  if (mode.name === 'test') {
    const { test: t } = mode;
    return (
      <>
        {t.exam && <ExamClock started={mode.started} minutes={t.exam.minutes} />}
        <Session test title={t.title} exercises={mode.exercises} onExit={back} onFinish={async (s) => {
          const xp = s.correct * 2 + 5;
          addXp(xp);
          const seconds = Math.round((Date.now() - mode.started) / 1000);
          let saved = 'Your result is saved.';
          try { await saveResult(mode.set.id, t.id, s.correct, Math.max(1, s.total), s.answers ?? [], seconds); } catch (e) { saved = `Couldn’t save the result: ${e instanceof Error ? e.message : e}`; }
          const pct = Math.round((s.correct / Math.max(1, s.total)) * 100);
          setMode({ name: 'done', summary: s, xp, label: t.title, saved, exam: t.exam && { pass: t.exam.pass, passed: pct >= t.exam.pass, seconds, minutes: t.exam.minutes } });
        }} />
      </>
    );
  }
  if (mode.name === 'done') {
    const wrong = (mode.summary.answers ?? []).filter((a) => !a.ok);
    return (
      <div className="page narrow">
        {mode.exam && (
          <section className={`card exam-verdict ${mode.exam.passed ? 'pass' : 'fail'}`}>
            <h2>{mode.exam.passed ? 'Passed ✓' : 'Not passed yet'}</h2>
            <p>{Math.round((mode.summary.correct / Math.max(1, mode.summary.total)) * 100)}% · pass mark {mode.exam.pass}% · time {clock(mode.exam.seconds)} of {mode.exam.minutes}:00{mode.exam.seconds > mode.exam.minutes * 60 ? ' (over time)' : ''}</p>
            {!mode.exam.passed && <p className="small muted">Go through the answers below, practise those lessons again, then retry.</p>}
          </section>
        )}
        <Summary summary={mode.summary} xp={mode.xp} onDone={back} doneLabel="Back" />
        {mode.saved && <p className="small muted center-text">{mode.saved}</p>}
        {wrong.length > 0 && (
          <section className="card">
            <h3>To look at again</h3>
            <ul className="answer-list">{wrong.map((a, i) => <li key={i}><span className="muted">{a.q}</span> → <strong lang={LANG}>{a.expected}</strong>{a.given && <span className="bad-text"> (you: {a.given})</span>}</li>)}</ul>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="page">
      {mine.map((set) => (
        <div key={set.id} className="personal-set">
          <h1>{set.tabName}</h1>
          <p className="muted">{set.title}</p>
          {set.content.lessons.length > 0 && <h2 className="eyebrow">Lessons</h2>}
          <div className="grid-2">
            {set.content.lessons.map((l) => {
              const unit = lessonUnit(set, l);
              const steps = unit.sentences.length ? 3 : 2;
              const done = Array.from({ length: steps }, (_, i) => p.steps[`${unit.id}:${i}`] !== undefined);
              const next = done.findIndex((d) => !d);
              const known = unit.words.filter((w) => strength(p.cards[w.id]) === 'known').length;
              return (
                <section key={l.id} className="card personal-lesson">
                  <div className="row"><span className="unit-emoji">{unit.emoji}</span><div><h3>{unit.title}</h3><span className="muted small" lang={LANG}>{unit.titleEs !== unit.title ? unit.titleEs : ''}</span></div></div>
                  <p className="small muted">{unit.words.length} words{unit.sentences.length ? ` · ${unit.sentences.length} sentences` : ''}{known ? ` · ${known} known` : ''}</p>
                  <div className="steps-dots">{STEP_NAMES.slice(0, steps).map((n, i) => <button key={n} className={`chip ${done[i] ? 'on' : ''}`} onClick={() => start(unit, i)}>{done[i] ? '✓' : i + 1} {n}</button>)}</div>
                  <button className="btn primary" onClick={() => start(unit, next === -1 ? 1 : next)}>{next === -1 ? 'Practise again' : done.some(Boolean) ? `Continue: ${STEP_NAMES[next]}` : 'Start'}</button>
                  <details><summary className="small">Word list</summary>
                    <ul className="word-list">{unit.words.map((w) => <li key={w.id}><span lang={LANG} className="es">{w.es}</span><span className="muted">{w.en}</span><SpeakButton text={w.es} /></li>)}</ul>
                    {unit.words.map((w) => <WordParts key={w.id} word={w} compact />)}
                  </details>
                </section>
              );
            })}
          </div>
          {(['exam', 'test'] as const).map((kind) => {
            const list = set.content.tests.filter((t) => (kind === 'exam') === !!t.exam);
            if (!list.length) return null;
            return (
              <div key={kind}>
                <h2 className="eyebrow">{kind === 'exam' ? 'Mock exams' : 'Tests'}</h2>
                <div className="grid-2">
                  {list.map((t) => {
                    const mineR = results.filter((r) => r.set_id === set.id && r.test_id === t.id);
                    const best = mineR.reduce((b, r) => Math.max(b, Math.round((r.score / r.total) * 100)), -1);
                    return (
                      <section key={t.id} className="card">
                        <h3>{t.title}</h3>
                        <p className="small muted">
                          {t.questions.length} questions{t.exam ? ` · ${t.exam.minutes} min · pass ${t.exam.pass}%` : ''}
                          {best >= 0 ? ` · best ${best}%${t.exam ? (best >= t.exam.pass ? ' ✓ passed' : '') : ''} (${mineR.length} ${mineR.length === 1 ? 'try' : 'tries'})` : ''}
                        </p>
                        <button className="btn primary" onClick={() => setMode({ name: 'test', set, test: t, exercises: testExercises(t), started: Date.now() })}>{best >= 0 ? 'Take it again' : t.exam ? 'Start the exam' : 'Start the test'}</button>
                      </section>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** The time left in a mock exam. It keeps counting past zero, so the result shows "over time". */
function ExamClock({ started, minutes }: { started: number; minutes: number }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const left = minutes * 60 - Math.round((now - started) / 1000);
  return <div className={`exam-clock ${left <= 60 ? 'low' : ''}`} role="timer" aria-live="off">{left >= 0 ? `⏱ ${clock(left)} left` : `⏱ time's up (+${clock(-left)})`}</div>;
}
