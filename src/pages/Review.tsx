import { useCheckpointState, useCheckpoint } from '../components/Checkpoint';
import { Icon } from '../components/Icon';
import { MistakeNotebook } from '../components/MistakeNotebook';
import { LANG } from '../data/lang';
import { useEffect } from 'react';
import { Link } from '../components/Nav';
import { WORD_MAP } from '../data/course';
import type { Word } from '../data/types';
import { reviewExercise, type Exercise } from '../lib/exercises';
import { addXp, applyWordResults, getProgress, gradeWord, recordLearning, useProgress } from '../lib/store';
import { describeInterval, isLeech, recallChance, review, type Grade } from '../lib/srs';
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
    .sort((a, b) => recallChance(a[1]) - recallChance(b[1]))
    .slice(0, n)
    .map(([id]) => WORD_MAP[id]);
}

export function Review() {
  const p = useProgress();
  const [mode, setMode] = useCheckpointState<Mode>('review', { name: 'menu' });
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
          if (mode.grade) applyWordResults(summary.words, summary.close);
          else applyWordResults(Object.fromEntries(Object.entries(summary.words).filter(([, ok]) => !ok)), summary.close);
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
        Due words and saved mistakes.
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
            {due.length > BATCH && <p className="small muted">No need to do them all today: {BATCH} at a time is plenty. The most overdue come first, and the rest wait safely.</p>}
          </div>
          {due.length > 0 ? (
            <div className="grid-2">
              <button className="card action" onClick={() => setMode({ name: 'cards', words: due.slice(0, BATCH) })}>
                <h2>Recall with flashcards</h2>
                <p className="muted">See the word, recall the meaning, rate yourself. At your own pace.</p>
              </button>
              <button className="card action" onClick={() => quiz(due.slice(0, BATCH), true)}>
                <h2>Check with a quiz</h2>
                <p className="muted">Type, listen and choose. A mix of recognition and recall.</p>
              </button>
            </div>
          ) : (
            <div className="card">
              <p>🎉 You're all caught up! Come back later — or practise your weakest words now (won't change their schedule unless you miss one).</p>
              <button className="btn primary" onClick={() => quiz(weakestWords(15), false)}>Practise weakest words</button>
            </div>
          )}
          <TrickyWords onPractise={(words) => quiz(words, false)} />
        </>
      )}
      <MistakeNotebook onPractise={exercises => setMode({ name: 'quiz', grade: false, exercises })} />
      <Link to="/progress" className="link small">See delayed recall and sentence checks →</Link>
    </div>
  );
}

/** Words forgotten 3+ times ("leeches"): shown with a memory tip and their own drill. */
function TrickyWords({ onPractise }: { onPractise: (w: Word[]) => void }) {
  const { cards } = useProgress();
  const leeches = Object.entries(cards)
    .filter(([id, c]) => WORD_MAP[id] && isLeech(c))
    .sort((a, b) => b[1].lapses - a[1].lapses)
    .map(([id]) => WORD_MAP[id]);
  if (!leeches.length) return null;
  return (
    <div className="card">
      <h3><Icon name="sentences" size={18} /> Tricky words ({leeches.length})</h3>
      <p className="muted small">
        You've forgotten these several times. Try linking each one to an image or a similar-sounding English word
        (e.g. <em>la cara</em> — "a car with a face"), then drill them on their own.
      </p>
      <p lang={LANG}>{leeches.slice(0, 12).map((w) => w.es).join(' · ')}</p>
      <button className="btn" onClick={() => onPractise(leeches.slice(0, 15))}>Practise tricky words</button>
    </div>
  );
}

function Flashcards({ words, onDone, onExit }: { words: Word[]; onDone: (s: SessionSummary) => void; onExit: () => void }) {
  const checkpoint = useCheckpoint();
  const [i, setI] = useCheckpointState('flash:index', 0);
  const [shown, setShown] = useCheckpointState('flash:shown', false);
  const [results, setResults] = useCheckpointState<Record<string, boolean>>('flash:results', {});
  const w = words[i];

  useEffect(() => {
    if (w && getProgress().settings.autoplay) speak(w.es);
  }, [w]);

  const rate = (g: Grade) => {
    if (g === 0) recordLearning({ prompt: w.en, answer: w.es, wordId: w.id }, false);
    gradeWord(w.id, g);
    const next = { ...results, [w.id]: g > 0 };
    setResults(next);
    setShown(false);
    if (i + 1 >= words.length) {
      checkpoint?.finish();
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
        <button className="icon-btn" onClick={checkpoint?.pause ?? onExit} aria-label="Exit"><Icon name="close" /></button>
        <div className="bar"><div style={{ width: `${(i / words.length) * 100}%` }} /></div>
        <span className="muted small">{i + 1}/{words.length}</span>
      </div>
      <div className="session-body">
        <div className="learn-card flip" key={w.id}>
          <div className="learn-es" lang={LANG}>{w.es}</div>
          <div className="row center"><SpeakButton text={w.es} /></div>
          {shown ? (
            <>
              <div className="learn-en">{w.en}</div>
              {w.ex && <div className="learn-ex"><div lang={LANG}>{w.ex}</div><div className="muted">{w.exEn}</div></div>}
            </>
          ) : (
            <button className="btn primary" onClick={() => setShown(true)}>Reveal meaning</button>
          )}
        </div>
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
