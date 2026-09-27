import { useEffect, useState } from 'react';
import { Link } from '../components/Nav';
import { WORD_MAP } from '../data/course';
import type { Word } from '../data/types';
import { reviewExercise, type Exercise } from '../lib/exercises';
import { addXp, applyWordResults, getProgress, gradeWord, useProgress } from '../lib/store';
import { describeInterval, review, type Grade } from '../lib/srs';
import { speak } from '../lib/speech';
import { Session, type SessionSummary } from '../components/Session';
import { Summary } from '../components/Summary';
import { SpeakButton } from '../components/SpeakButton';

const BATCH = 20;

type Mode =
  | { name: 'menu' }
  | { name: 'cards'; words: Word[] }
  | { name: 'quiz'; exercises: Exercise[]; grade: boolean }
  | { name: 'done'; summary: SessionSummary; xp: number };

function dueWords(): Word[] {
  const now = Date.now();
  return Object.entries(getProgress().cards)
    .filter(([id, c]) => c.due <= now && WORD_MAP[id])
    .sort((a, b) => a[1].due - b[1].due)
    .map(([id]) => WORD_MAP[id]);
}

function weakestWords(n: number): Word[] {
  return Object.entries(getProgress().cards)
    .filter(([id]) => WORD_MAP[id])
    .sort((a, b) => a[1].interval - b[1].interval || b[1].lapses - a[1].lapses)
    .slice(0, n)
    .map(([id]) => WORD_MAP[id]);
}

export function Review() {
  const p = useProgress();
  const [mode, setMode] = useState<Mode>({ name: 'menu' });
  const due = dueWords();
  const total = Object.keys(p.cards).length;

  const quiz = (words: Word[], grade: boolean) =>
    setMode({ name: 'quiz', grade, exercises: words.map((w) => reviewExercise(w, getProgress().cards[w.id]?.reps ?? 0)) });

  if (mode.name === 'cards') {
    return <Flashcards words={mode.words} onExit={() => setMode({ name: 'menu' })} onDone={(summary) => { addXp(summary.total); setMode({ name: 'done', summary, xp: summary.total }); }} />;
  }
  if (mode.name === 'quiz') {
    return (
      <Session
        exercises={mode.exercises}
        title="Review"
        onExit={() => setMode({ name: 'menu' })}
        onFinish={(summary) => {
          if (mode.grade) applyWordResults(summary.words);
          else applyWordResults(Object.fromEntries(Object.entries(summary.words).filter(([, ok]) => !ok)));
          addXp(summary.correct);
          setMode({ name: 'done', summary, xp: summary.correct });
        }}
      />
    );
  }
  if (mode.name === 'done') {
    return <div className="page narrow"><Summary summary={mode.summary} xp={mode.xp} onDone={() => setMode({ name: 'menu' })} /></div>;
  }

  return (
    <div className="page narrow">
      <h1>Review</h1>
      <p className="muted">
        Words come back just before you're likely to forget them. Get one right and you'll see it again in a few days, then weeks.
        Miss it and it comes back soon.
      </p>
      {total === 0 ? (
        <div className="card">
          <p>No words yet. Finish the first step of a unit and its words will appear here.</p>
          <Link className="btn primary" to="/course">Go to the course</Link>
        </div>
      ) : (
        <>
          <div className="card review-due">
            <div className="big-number">{due.length}</div>
            <div>{due.length === 1 ? 'word is' : 'words are'} due now · {total} in your deck</div>
          </div>
          {due.length > 0 ? (
            <div className="grid-2">
              <button className="card action" onClick={() => setMode({ name: 'cards', words: due.slice(0, BATCH) })}>
                <h2>🃏 Flashcards</h2>
                <p className="muted">See the word, recall the meaning, rate yourself. Fast.</p>
              </button>
              <button className="card action" onClick={() => quiz(due.slice(0, BATCH), true)}>
                <h2>✍️ Quiz</h2>
                <p className="muted">Type, listen and choose. Harder, sticks better.</p>
              </button>
            </div>
          ) : (
            <div className="card">
              <p>🎉 You're all caught up! Come back later — or practise your weakest words now (won't change their schedule unless you miss one).</p>
              <button className="btn primary" onClick={() => quiz(weakestWords(15), false)}>Practise weakest words</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Flashcards({ words, onDone, onExit }: { words: Word[]; onDone: (s: SessionSummary) => void; onExit: () => void }) {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const w = words[i];

  useEffect(() => {
    if (w && getProgress().settings.autoplay) speak(w.es);
  }, [w]);

  const rate = (g: Grade) => {
    gradeWord(w.id, g);
    const next = { ...results, [w.id]: g > 0 };
    setResults(next);
    setShown(false);
    if (i + 1 >= words.length) {
      onDone({ correct: Object.values(next).filter(Boolean).length, total: words.length, words: next });
    } else setI(i + 1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!shown && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); setShown(true); }
      else if (shown && ['1', '2', '3', '4'].includes(e.key)) rate((Number(e.key) - 1) as Grade);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!w) return null;
  const card = getProgress().cards[w.id];
  const labels: [Grade, string][] = [[0, 'Again'], [1, 'Hard'], [2, 'Good'], [3, 'Easy']];

  return (
    <div className="session">
      <div className="session-top">
        <button className="icon-btn" onClick={onExit} aria-label="Exit">✕</button>
        <div className="bar"><div style={{ width: `${(i / words.length) * 100}%` }} /></div>
        <span className="muted small">{i + 1}/{words.length}</span>
      </div>
      <div className="session-body">
        <button className="learn-card flip" onClick={() => setShown(true)} key={w.id}>
          <div className="learn-es" lang="es">{w.es}</div>
          <div className="row center"><SpeakButton text={w.es} /></div>
          {shown ? (
            <>
              <div className="learn-en">{w.en}</div>
              {w.ex && <div className="learn-ex"><div lang="es">{w.ex}</div><div className="muted">{w.exEn}</div></div>}
            </>
          ) : (
            <div className="muted">Tap to reveal</div>
          )}
        </button>
      </div>
      {shown && (
        <div className="grades">
          {labels.map(([g, label]) => (
            <button key={g} className={`btn grade g${g}`} onClick={() => rate(g)}>
              {label}
              <span className="small">{describeInterval(review(card, g).interval || 1 / 1440)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
