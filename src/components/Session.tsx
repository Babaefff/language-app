import { useEffect, useMemo, useRef, useState } from 'react';
import type { Exercise } from '../lib/exercises';
import { personLabel, tenseLabel } from '../lib/exercises';
import { checkAnswer, normalize, shuffle } from '../lib/text';
import { speak } from '../lib/speech';
import { getProgress } from '../lib/store';
import { VERB_MAP } from '../data/verbs';
import { SpeakButton } from './SpeakButton';
import { AccentKeys } from './AccentKeys';

export interface Result {
  ok: boolean;
  /** The correct answer to show when wrong. */
  answer: string;
  note?: string;
  /** Per-word outcome (for match exercises that cover several words). */
  words?: Record<string, boolean>;
}

export interface SessionSummary {
  correct: number;
  total: number;
  /** wordId → answered correctly every time in this session. */
  words: Record<string, boolean>;
}

const wordsOf = (ex: Exercise): string[] =>
  ex.kind === 'match' ? ex.pairs.map((p) => p.wordId) : 'wordId' in ex && ex.wordId ? [ex.wordId] : [];

export function Session({ exercises, onFinish, onExit, title }: { exercises: Exercise[]; onFinish: (s: SessionSummary) => void; onExit: () => void; title?: string }) {
  const [queue, setQueue] = useState(exercises);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const stats = useRef({ correct: 0, words: {} as Record<string, boolean>, retried: new Set<string>() });
  const ex = queue[index];

  const answer = (r: Result) => {
    if (result) return;
    setResult(r);
    const s = stats.current;
    const firstTry = !s.retried.has(ex.key);
    if (r.ok && firstTry) s.correct++;
    for (const id of wordsOf(ex)) {
      const ok = r.words ? r.words[id] !== false : r.ok;
      s.words[id] = (s.words[id] ?? true) && ok;
    }
    if (!r.ok && firstTry && ex.kind !== 'match') {
      s.retried.add(ex.key);
      setQueue((q) => [...q, ex]);
    }
  };

  const next = () => {
    setResult(null);
    if (index + 1 >= queue.length) onFinish({ correct: stats.current.correct, total: exercises.length, words: stats.current.words });
    else setIndex(index + 1);
  };

  useEffect(() => {
    if (!result) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        next();
      }
    };
    // Defer so the Enter that submitted the answer doesn't also skip the feedback.
    const t = setTimeout(() => window.addEventListener('keydown', onKey), 50);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  });

  if (!ex) return null;
  const progress = Math.min(100, (index / queue.length) * 100);

  return (
    <div className="session">
      <div className="session-top">
        <button className="icon-btn" onClick={onExit} aria-label="Exit">✕</button>
        <div className="bar"><div style={{ width: `${progress}%` }} /></div>
        {title && <span className="muted small">{title}</span>}
      </div>
      <div className="session-body" key={`${ex.key}-${index}`}>
        <ExerciseView ex={ex} onResult={answer} locked={!!result} />
      </div>
      {result && (
        <div className={`feedback ${result.ok ? 'good' : 'bad'}`}>
          <div>
            <strong>{result.ok ? pick(['¡Muy bien!', '¡Perfecto!', '¡Genial!', '¡Correcto!']) : 'Not quite'}</strong>
            {!result.ok && (
              <div className="feedback-answer">
                Correct answer: <span lang="es">{result.answer}</span> <SpeakButton text={result.answer} />
              </div>
            )}
            {result.note && <div className="small">{result.note}</div>}
          </div>
          <button className="btn primary" onClick={next} autoFocus>Continue</button>
        </div>
      )}
    </div>
  );
}

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

function ExerciseView({ ex, onResult, locked }: { ex: Exercise; onResult: (r: Result) => void; locked: boolean }) {
  switch (ex.kind) {
    case 'choice': return <ChoiceView ex={ex} onResult={onResult} locked={locked} />;
    case 'type': return <TypeView ex={ex} onResult={onResult} locked={locked} />;
    case 'listen': return <ListenView ex={ex} onResult={onResult} locked={locked} />;
    case 'build': return <BuildView ex={ex} onResult={onResult} locked={locked} />;
    case 'match': return <MatchView ex={ex} onResult={onResult} />;
    case 'conj': return <ConjView ex={ex} onResult={onResult} locked={locked} />;
  }
}

function useAutoplay(text: string | undefined) {
  useEffect(() => {
    if (text && getProgress().settings.autoplay) speak(text);
  }, [text]);
}

function ChoiceView({ ex, onResult, locked }: { ex: Extract<Exercise, { kind: 'choice' }>; onResult: (r: Result) => void; locked: boolean }) {
  const [chosen, setChosen] = useState<string | null>(null);
  useAutoplay(ex.audio);
  const choose = (o: string) => {
    if (locked) return;
    setChosen(o);
    if (ex.optionsSpanish) speak(o);
    onResult({ ok: o === ex.answer, answer: ex.answer });
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= ex.options.length) choose(ex.options[n - 1]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
  return (
    <>
      <p className="ex-label">{ex.label}</p>
      <div className="ex-prompt">
        <span lang={ex.audio ? 'es' : 'en'}>{ex.prompt}</span>
        {ex.audio && <SpeakButton text={ex.audio} />}
      </div>
      <div className="options">
        {ex.options.map((o, i) => (
          <button
            key={o}
            className={`option ${locked && o === ex.answer ? 'right' : ''} ${locked && o === chosen && o !== ex.answer ? 'wrong' : ''}`}
            onClick={() => choose(o)}
            disabled={locked}
            lang={ex.optionsSpanish ? 'es' : 'en'}
          >
            <span className="key">{i + 1}</span>
            {o}
          </button>
        ))}
      </div>
    </>
  );
}

function TextAnswer({ onSubmit, locked, placeholder }: { onSubmit: (v: string) => void; locked: boolean; placeholder?: string }) {
  const [value, setValue] = useState('');
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    input.current?.focus();
  }, []);
  return (
    <form
      className="answer-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!locked && value.trim()) onSubmit(value);
      }}
    >
      <input
        ref={input}
        lang="es"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder ?? 'Type in Spanish…'}
        disabled={locked}
      />
      <AccentKeys onKey={(ch) => { setValue((v) => v + ch); input.current?.focus(); }} disabled={locked} />
      <button className="btn primary" disabled={locked || !value.trim()}>Check</button>
    </form>
  );
}

function feedbackFor(input: string, expected: string): Result {
  const c = checkAnswer(input, expected);
  const note = c.accent ? `Watch the accents: ${expected}` : c.article ? `Remember the article: ${expected}` : undefined;
  if (c.ok) speak(expected);
  return { ok: c.ok, answer: expected, note };
}

function TypeView({ ex, onResult, locked }: { ex: Extract<Exercise, { kind: 'type' }>; onResult: (r: Result) => void; locked: boolean }) {
  return (
    <>
      <p className="ex-label">{ex.label}</p>
      <div className="ex-prompt"><span lang="en">{ex.prompt}</span></div>
      <TextAnswer locked={locked} onSubmit={(v) => onResult(feedbackFor(v, ex.answer))} />
    </>
  );
}

function ListenView({ ex, onResult, locked }: { ex: Extract<Exercise, { kind: 'listen' }>; onResult: (r: Result) => void; locked: boolean }) {
  useEffect(() => { speak(ex.answer); }, [ex.answer]);
  return (
    <>
      <p className="ex-label">Type what you hear</p>
      <div className="ex-prompt listen">
        <SpeakButton text={ex.answer} className="big" />
        <SpeakButton text={ex.answer} slow />
      </div>
      <TextAnswer locked={locked} onSubmit={(v) => {
        const r = feedbackFor(v, ex.answer);
        onResult({ ...r, note: [r.note, `Meaning: ${ex.en}`].filter(Boolean).join(' · ') });
      }} />
    </>
  );
}

function BuildView({ ex, onResult, locked }: { ex: Extract<Exercise, { kind: 'build' }>; onResult: (r: Result) => void; locked: boolean }) {
  const tiles = useMemo(() => ex.tiles.map((t, i) => ({ t, i })), [ex.tiles]);
  const [picked, setPicked] = useState<number[]>([]);
  const check = () => {
    const attempt = picked.map((i) => tiles[i].t).join(' ');
    const ok = normalize(attempt) === normalize(ex.es);
    if (ok) speak(ex.es);
    onResult({ ok, answer: ex.es });
  };
  return (
    <>
      <p className="ex-label">Build the sentence in Spanish</p>
      <div className="ex-prompt"><span lang="en">{ex.en}</span></div>
      <div className="build-line" lang="es">
        {picked.length === 0 && <span className="muted">Tap the words below…</span>}
        {picked.map((i) => (
          <button key={i} className="tile" disabled={locked} onClick={() => setPicked(picked.filter((p) => p !== i))}>{tiles[i].t}</button>
        ))}
      </div>
      <div className="tiles" lang="es">
        {tiles.map(({ t, i }) => (
          <button key={i} className={`tile ${picked.includes(i) ? 'used' : ''}`} disabled={locked || picked.includes(i)} onClick={() => { speak(t); setPicked([...picked, i]); }}>{t}</button>
        ))}
      </div>
      <div className="row end">
        <button className="btn" disabled={locked || !picked.length} onClick={() => setPicked([])}>Clear</button>
        <button className="btn primary" disabled={locked || !picked.length} onClick={check}>Check</button>
      </div>
    </>
  );
}

function MatchView({ ex, onResult }: { ex: Extract<Exercise, { kind: 'match' }>; onResult: (r: Result) => void }) {
  const left = useMemo(() => shuffle(ex.pairs), [ex.pairs]);
  const right = useMemo(() => shuffle(ex.pairs), [ex.pairs]);
  const [sel, setSel] = useState<{ side: 'es' | 'en'; id: string } | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const missed = useRef<Record<string, boolean>>({});

  const tap = (side: 'es' | 'en', id: string) => {
    if (done.includes(id)) return;
    if (side === 'es') speak(ex.pairs.find((p) => p.wordId === id)!.es);
    if (!sel || sel.side === side) return setSel({ side, id });
    if (sel.id === id) {
      const nextDone = [...done, id];
      setDone(nextDone);
      setSel(null);
      if (nextDone.length === ex.pairs.length) {
        const words = Object.fromEntries(ex.pairs.map((p) => [p.wordId, !missed.current[p.wordId]]));
        const mistakes = Object.values(missed.current).filter(Boolean).length;
        onResult({ ok: mistakes <= 1, answer: ex.pairs.map((p) => `${p.es} = ${p.en}`).join(' · '), words });
      }
    } else {
      missed.current[sel.id] = true;
      missed.current[id] = true;
      setWrong(id);
      setTimeout(() => setWrong(null), 400);
      setSel(null);
    }
  };

  const cls = (side: 'es' | 'en', id: string) =>
    `option ${done.includes(id) ? 'right' : ''} ${sel?.side === side && sel.id === id ? 'selected' : ''} ${wrong === id ? 'shake' : ''}`;

  return (
    <>
      <p className="ex-label">Match the pairs</p>
      <div className="match">
        <div>{left.map((p) => <button key={p.wordId} lang="es" className={cls('es', p.wordId)} disabled={done.includes(p.wordId)} onClick={() => tap('es', p.wordId)}>{p.es}</button>)}</div>
        <div>{right.map((p) => <button key={p.wordId} lang="en" className={cls('en', p.wordId)} disabled={done.includes(p.wordId)} onClick={() => tap('en', p.wordId)}>{p.en}</button>)}</div>
      </div>
    </>
  );
}

function ConjView({ ex, onResult, locked }: { ex: Extract<Exercise, { kind: 'conj' }>; onResult: (r: Result) => void; locked: boolean }) {
  return (
    <>
      <p className="ex-label">Conjugate · {tenseLabel(ex.tense)}</p>
      <div className="ex-prompt conj">
        <span className="pill">{personLabel(ex.tense, ex.person)}</span>
        <span lang="es">{ex.inf}</span>
        <span className="muted small">{VERB_MAP[ex.inf]?.en}</span>
      </div>
      <TextAnswer locked={locked} placeholder="Conjugated form…" onSubmit={(v) => onResult(feedbackFor(v, ex.answer))} />
    </>
  );
}
