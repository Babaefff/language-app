import { Icon } from './Icon';
import { L, LANG } from '../data/lang';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import type { Exercise } from '../lib/exercises';
import { personLabel, tenseLabel } from '../lib/exercises';
import { cleanWord, newWordsIn } from '../lib/taught';
import { setFeedbackContext } from '../lib/feedback';
import { FeedbackButton } from './FeedbackButton';
import { WordParts } from './WordParts';
import { phrasesIn, phraseForWord } from '../lib/phrases';
import { checkAnswer, normalize, shuffle, wrongWords } from '../lib/text';
import { speak } from '../lib/speech';
import { getProgress, recordLearning, updateSettings } from '../lib/store';
import { lookupWord, WORD_MAP } from '../data/course';
import { lookupForm } from '../lib/conjugate';
import { questionId, eligibleDelayedRecall } from '../lib/learning';
import { VERB_MAP } from '../data/verbs';
import { SpeakButton } from './SpeakButton';
import { AccentKeys } from './AccentKeys';
import { VerbTable } from './VerbTable';
import { gloss } from '../lib/gloss';

export interface Result {
  ok: boolean;
  /** The correct answer to show when wrong. */
  answer: string;
  note?: string;
  /** What was typed, to highlight the words that need fixing. */
  typed?: string;
  /** Why this is the answer (grammar practice). */
  why?: string;
  /** A study card was read: move on without feedback or score. */
  study?: boolean;
  /** Per-word outcome (for match exercises that cover several words). */
  words?: Record<string, boolean>;
  /** Not right, but close: "almost" (a word one letter off) or "partly" (a sentence with one slip). */
  grade?: 'almost' | 'partly';
}

export interface SessionSummary {
  correct: number;
  total: number;
  /** wordId → answered correctly every time in this session. */
  words: Record<string, boolean>;
  /** wordId → wrong only by "almost" (one letter): it comes back later than a real mistake. */
  close?: Record<string, boolean>;
}

const wordsOf = (ex: Exercise): string[] =>
  ex.kind === 'match' ? ex.pairs.map((p) => p.wordId) : 'wordId' in ex && ex.wordId ? [ex.wordId] : [];

export function Session({ exercises, onFinish, onExit, title }: { exercises: Exercise[]; onFinish: (s: SessionSummary) => void; onExit: () => void; title?: string }) {
  const [queue, setQueue] = useState(exercises);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const stats = useRef({ correct: 0, words: {} as Record<string, boolean>, close: {} as Record<string, boolean>, retried: new Set<string>(), exposed: new Set<string>() });
  const ex = queue[index];

  const answer = (r: Result) => {
    if (result) return;
    if (r.study) return next();
    setResult(r);
    const s = stats.current;
    const firstTry = !s.retried.has(ex.key);
    if (r.ok && firstTry) s.correct++;
    if (firstTry && ex.kind === 'match') for (const pair of ex.pairs) {
      recordLearning({ prompt: pair.en, answer: pair.es, wordId: pair.wordId }, r.words?.[pair.wordId] !== false);
      s.exposed.add(questionId(pair.en, pair.es));
    }
    if (firstTry && ex.kind !== 'study' && ex.kind !== 'match') {
      const word = 'wordId' in ex && ex.wordId ? WORD_MAP[ex.wordId] : undefined;
      const task = word ? { prompt: word.en, answer: word.es, wordId: word.id } :
        ex.kind === 'build' ? { prompt: ex.en, answer: ex.es } :
        ex.kind === 'conj' ? { prompt: `${personLabel(ex.tense, ex.person)} · ${ex.inf} · ${tenseLabel(ex.tense)}`, answer: ex.answer, why: ex.why } :
        ex.kind === 'listen' ? { prompt: ex.en, answer: ex.answer } : { prompt: ex.prompt, answer: ex.answer, why: 'why' in ex ? ex.why : undefined };
      const id = questionId(task.prompt, task.answer);
      const seen = word ? getProgress().cards[word.id]?.seen : undefined;
      const independent = !s.exposed.has(id);
      recordLearning(task, r.ok, {
        delayed: independent && ex.kind === 'type' && ex.assessment !== 'practice' && eligibleDelayedRecall(getProgress().learning, id, seen),
        context: independent && ex.kind === 'type' && ex.assessment === 'context' && !getProgress().learning.practiced.includes(id),
      });
      s.exposed.add(id);
    }
    for (const id of wordsOf(ex)) {
      const ok = r.words ? r.words[id] !== false : r.ok;
      // A real mistake outweighs a near miss: once wrong, the word isn't "close" any more.
      if (!ok && firstTry) s.close[id] = r.grade !== undefined && s.close[id] !== false;
      if (!ok && !r.grade) s.close[id] = false;
      s.words[id] = (s.words[id] ?? true) && ok;
    }
    if (!r.ok && firstTry && ex.kind !== 'match') {
      s.retried.add(ex.key);
      setQueue((q) => [...q, ex]);
    }
  };

  const next = () => {
    setResult(null);
    if (index + 1 >= queue.length) onFinish({ correct: stats.current.correct, total: exercises.filter((e) => e.kind !== 'study').length, words: stats.current.words, close: stats.current.close });
    else setIndex(index + 1);
  };

  useEffect(() => {
    if (!result) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.defaultPrevented &&
          !(e.target instanceof Element && e.target.closest('button, summary, a, input, textarea, select'))) {
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
  // "Report a problem" sends the exercise on screen and what was answered.
  useEffect(() => {
    if (!ex) return;
    const d = ex.kind === 'build' ? { prompt: ex.en, answer: ex.es } :
      ex.kind === 'conj' ? { prompt: `${personLabel(ex.tense, ex.person)} · ${ex.inf} · ${tenseLabel(ex.tense)}`, answer: ex.answer } :
      ex.kind === 'listen' ? { prompt: `(audio) ${ex.en}`, answer: ex.answer } :
      ex.kind === 'match' ? { prompt: 'Match the pairs', answer: ex.pairs.map((x) => `${x.es} = ${x.en}`).join('; ') } :
      ex.kind === 'study' ? { prompt: `New forms · ${ex.inf} · ${tenseLabel(ex.tense)}`, answer: '' } :
      { prompt: ex.prompt, answer: ex.answer };
    setFeedbackContext({ exercise: { kind: ex.kind, ...d }, typed: result?.typed });
  }, [ex, result]);

  return (
    <div className="session">
      <div className="session-top">
        <button className="icon-btn" onClick={onExit} aria-label="Exit"><Icon name="close" /></button>
        <div className="bar" role="progressbar" aria-label="Session progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><div style={{ width: `${progress}%` }} /></div>
        {title && <span className="muted small">{title}</span>}
        <FeedbackButton compact />
      </div>
      <div className="session-body" key={`${ex.key}-${index}`}>
        <ExerciseView ex={ex} onResult={answer} locked={!!result} />
      </div>
      {result && (
        <div role="status" className={`feedback ${result.ok ? 'good' : result.grade ? 'close' : 'bad'}`}>
          <div>
            <strong>{result.ok ? 'Correct' : result.grade === 'almost' ? 'Almost' : result.grade === 'partly' ? 'Partly correct' : 'Incorrect'}</strong>
            {!result.ok && (
              <div className="feedback-answer">
                Correct answer: <span lang={LANG}>{result.answer}</span> <SpeakButton text={result.answer} />
              </div>
            )}
            {/* After a slip, seeing how the word is built helps it stick (Brief + Träger). */}
            {!result.ok && 'wordId' in ex && ex.wordId && WORD_MAP[ex.wordId] && <WordParts word={WORD_MAP[ex.wordId]} compact />}
            {result.note && <div className="small">{result.note}</div>}
            {result.typed && result.note && <Highlight typed={result.typed} expected={result.answer} />}
            {!result.ok && <p className="small">Saved for review.</p>}
            {result.why && <details className="why"><summary>Why?</summary><p>{result.why}</p></details>}
          </div>
          <button className="btn primary" onClick={next} autoFocus>Continue</button>
        </div>
      )}
    </div>
  );
}


function ExerciseView(props: { ex: Exercise; onResult: (r: Result) => void; locked: boolean }) {
  const from = 'from' in props.ex ? props.ex.from : undefined;
  // Review words from earlier units are labelled, so they never feel like a slip in this lesson.
  return from ? <><p className="review-tag">Review · from “{from}”</p><ExerciseBody {...props} /></> : <ExerciseBody {...props} />;
}

function ExerciseBody({ ex, onResult, locked }: { ex: Exercise; onResult: (r: Result) => void; locked: boolean }) {
  switch (ex.kind) {
    case 'choice': return <ChoiceView ex={ex} onResult={onResult} locked={locked} />;
    case 'type': return <TypeView ex={ex} onResult={onResult} locked={locked} />;
    case 'listen': return <ListenView ex={ex} onResult={onResult} locked={locked} />;
    case 'build': return <BuildView ex={ex} onResult={onResult} locked={locked} />;
    case 'match': return <MatchView ex={ex} onResult={onResult} />;
    case 'conj': return <ConjView ex={ex} onResult={onResult} locked={locked} />;
    case 'study': return <StudyView ex={ex} onResult={onResult} />;
  }
}

function useAutoplay(text: string | undefined) {
  useEffect(() => {
    if (text && getProgress().settings.autoplay) speak(text);
  }, [text]);
}

function ChoiceView({ ex, onResult, locked }: { ex: Extract<Exercise, { kind: 'choice' }>; onResult: (r: Result) => void; locked: boolean }) {
  const [chosen, setChosen] = useState<string | null>(null);
  const [typing, setTyping] = useState(() => !!ex.typed || getProgress().settings.typeChoices);
  useAutoplay(ex.audio);
  // Options in the language being learned can be typed instead (the setting is remembered).
  const canType = ex.optionsSpanish;
  const toggle = () => { setTyping(!typing); updateSettings({ typeChoices: !typing }); };
  const choose = (o: string) => {
    if (locked) return;
    setChosen(o);
    if (ex.promptSpanish) speak(ex.prompt.replace(/_{2,}/, ex.answer));
    else if (ex.optionsSpanish) speak(o);
    onResult({ ok: o === ex.answer, answer: ex.answer, why: ex.why });
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (canType && typing) return;
      const n = Number(e.key);
      if (n >= 1 && n <= ex.options.length) choose(ex.options[n - 1]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
  if (canType && typing) {
    return (
      <>
        <p className="ex-label">{ex.promptSpanish ? 'Type the missing word' : `Type it in ${L.name}`}</p>
        <div className="ex-prompt">
          <span lang={ex.audio || ex.promptSpanish ? LANG : 'en'}>{ex.prompt}</span>
          {ex.audio && <SpeakButton text={ex.audio} />}
        </div>
        {ex.base && <p className="base-hint">Use: <strong lang={LANG}>{ex.base.split(' — ')[0]}</strong> <span className="muted">— {ex.base.split(' — ').slice(1).join(' — ')}</span></p>}
        {ex.hint && <p className="muted">{ex.hint}</p>}
        <TextAnswer locked={locked} onSubmit={(v) => {
          // The wrong options are the typical mistakes this question is about (Fähr, levent…):
          // typing one of them exactly is wrong, even if it looks like a small slip.
          const trap = ex.options.find((o) => o !== ex.answer && normalize(o) === normalize(v));
          if (trap) return onResult({ ok: false, answer: ex.answer, typed: v, note: `“${trap}” is the typical mistake here.`, why: ex.why });
          onResult({ ...feedbackFor(v, ex.answer, ex.accept), why: ex.why });
        }} />
        {!locked && !ex.typed && <button className="link small" onClick={toggle}>☰ Show options instead</button>}
      </>
    );
  }
  return (
    <>
      <p className="ex-label">{ex.label}</p>
      <div className="ex-prompt">
        <span lang={ex.audio || ex.promptSpanish ? LANG : 'en'}>{ex.prompt}</span>
        {ex.audio && <SpeakButton text={ex.audio} />}
      </div>
      {ex.hint && <p className="muted">{ex.hint}</p>}
      <div className="options">
        {ex.options.map((o, i) => (
          <button
            key={o}
            className={`option ${locked && o === ex.answer ? 'right' : ''} ${locked && o === chosen && o !== ex.answer ? 'wrong' : ''}`}
            onClick={() => choose(o)}
            disabled={locked}
            lang={ex.optionsSpanish ? LANG : 'en'}
          >
            <span className="key">{i + 1}</span>
            {o}
          </button>
        ))}
      </div>
      {canType && !locked && <button className="link small" onClick={toggle}>⌨️ Type the answer instead</button>}
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
        lang={LANG}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder ?? `Type in ${L.name}…`}
        disabled={locked}
      />
      <AccentKeys onKey={(ch) => { setValue((v) => (ch === '\b' ? v.slice(0, -1) : v + ch)); input.current?.focus(); }} disabled={locked} />
      <button className="btn primary" disabled={locked || !value.trim()}>Check</button>
    </form>
  );
}

function feedbackFor(input: string, expected: string, accept: string[] = [], typos = false): Result {
  const strict = getProgress().settings.strictSpelling;
  // Another word with the same meaning (a synonym in the course) is right too.
  const alt = accept.find((a) => checkAnswer(input, a, strict).ok && !checkAnswer(input, a, strict).article);
  if (alt && !checkAnswer(input, expected, strict).ok) {
    speak(alt);
    return { ok: true, answer: alt, note: `Also right: ${expected}.`, typed: input };
  }
  const c = checkAnswer(input, expected, strict, { typos, isWord: (w) => !!lookupWord(w, false) || lookupForm(w).length > 0 });
  const notes = [
    c.otherWord && `“${c.otherWord}” is a different word: the ${LANG === 'de' ? 'umlaut' : 'accent'} matters here.`,
    c.typo && 'One small slip in the spelling — the rest is right.',
    c.nearMiss && 'Almost — just one letter off. Look at the spelling and it’ll come back soon.',
    c.accent && (LANG === 'de' ? 'Watch the special letters (ä ö ü ß).' : LANG === 'fr' ? 'Watch the accents (é è ê à ç ô…).' : LANG === 'ru' ? 'Watch the soft sign ь and the accents.' : 'Watch the accents (á é í ó ú ñ ü).'),
    c.letterCase && (LANG === 'de' ? 'Watch the capitals: nouns and Sie start with a capital letter.' : 'Watch the capital letters.'),
    c.article && 'Remember the article.',
  ].filter(Boolean);
  if (c.ok) speak(expected);
  return { ok: c.ok, answer: expected, note: notes.length ? notes.join(' ') : undefined, typed: input, ...(c.nearMiss ? { grade: 'almost' as const } : c.typo ? { grade: 'partly' as const } : {}) };
}

/** The expected answer with the words that were typed differently marked. */
function Highlight({ typed, expected }: { typed: string; expected: string }) {
  const bad = wrongWords(typed, expected);
  return (
    <div className="fix" lang={LANG}>
      {expected.split('/')[0].trim().split(/\s+/).map((w, i) => <span key={i} className={bad.has(i) ? 'fix-word' : ''}>{w} </span>)}
    </div>
  );
}

function TypeView({ ex, onResult, locked }: { ex: Extract<Exercise, { kind: 'type' }>; onResult: (r: Result) => void; locked: boolean }) {
  return (
    <>
      <p className="ex-label">{ex.label}</p>
      <div className="ex-prompt"><span lang="en">{ex.prompt}</span></div>
      <TextAnswer locked={locked} onSubmit={(v) => onResult({ ...feedbackFor(v, ex.answer, ex.accept, true), why: ex.why })} />
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
        const r = feedbackFor(v, ex.answer, [], true);
        onResult({ ...r, note: [r.note, `Meaning: ${ex.en}`].filter(Boolean).join(' · ') });
      }} />
    </>
  );
}

const MEANINGS_KEY = 'hablo:showMeanings';
const readMeanings = () => { try { return localStorage.getItem(MEANINGS_KEY) === '1'; } catch { return false; } };

function BuildView({ ex, onResult, locked }: { ex: Extract<Exercise, { kind: 'build' }>; onResult: (r: Result) => void; locked: boolean }) {
  const tiles = useMemo(() => ex.tiles.map((t, i) => ({ t, i })), [ex.tiles]);
  const [picked, setPicked] = useState<number[]>([]);
  const [meanings, setMeanings] = useState(readMeanings);
  // Words this lesson hasn't taught yet always show their meaning, marked as new.
  const fresh = useMemo(() => newWordsIn(ex.es), [ex.es]);
  const toggleMeanings = () => {
    const v = !meanings;
    setMeanings(v);
    try { localStorage.setItem(MEANINGS_KEY, v ? '1' : '0'); } catch { /* storage blocked */ }
  };
  const check = () => {
    const attempt = picked.map((i) => tiles[i].t).join(' ');
    const ok = normalize(attempt) === normalize(ex.es);
    if (ok) speak(ex.es);
    // Explain fixed phrases after every answer: "Mir geht es gut = I'm fine (literally: to me it goes well)".
    const ph = phrasesIn(ex.es).map((x) => `${x.phrase} = ${x.en} (literally “${x.literal}”). ${x.note.replace(/\*/g, '')}`).join(' ');
    onResult({ ok, answer: ex.es, ...(ph ? { why: ph } : {}) });
  };

  // Drag to reorder: press a placed word and move it; a short tap still sends it back.
  const line = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<{ tile: number; startX: number; startY: number; dx: number; dy: number; moved: boolean; to: number } | null>(null);
  // Where the dragged word will land (the others stay put while dragging; a marker shows the spot).
  const dropped = (() => {
    if (!drag?.moved) return picked;
    const rest = picked.filter((p) => p !== drag.tile);
    rest.splice(drag.to, 0, drag.tile);
    return rest;
  })();
  const others = drag?.moved ? picked.filter((p) => p !== drag.tile) : picked;
  const targetIndex = (x: number, y: number, tile: number) => {
    const els = [...(line.current?.querySelectorAll<HTMLElement>('[data-tile]') ?? [])].filter((e) => Number(e.dataset.tile) !== tile);
    const i = els.findIndex((e) => {
      const r = e.getBoundingClientRect();
      return y < r.top || (y <= r.bottom && x < r.left + r.width / 2);
    });
    return i === -1 ? els.length : i;
  };
  const move = (from: number, by: number) => {
    const to = Math.max(0, Math.min(picked.length - 1, from + by));
    const next = [...picked];
    const [t] = next.splice(from, 1);
    next.splice(to, 0, t);
    setPicked(next);
  };

  return (
    <>
      <p className="ex-label">Build the sentence in {L.name}</p>
      <div className="ex-prompt"><span lang="en">{ex.en}</span></div>
      <div className="build-line" lang={LANG} ref={line}>
        {picked.length === 0 && <span className="muted">Tap the words below…</span>}
        {picked.map((i, pos) => {
          const dragging = drag?.moved && drag.tile === i;
          const marker = drag?.moved && !dragging && others.indexOf(i) === drag.to;
          return (
            <Fragment key={i}>
            {marker && <span className="drop-marker" aria-hidden="true" />}
            <button
              data-tile={i}
              className={`tile placed ${dragging ? 'dragging' : ''}`}
              disabled={locked}
              style={dragging ? { transform: `translate(${drag.dx}px, ${drag.dy}px)` } : undefined}
              aria-label={`${tiles[i].t}: tap to remove, drag or use arrow keys to move`}
              onPointerDown={(e) => {
                if (locked) return;
                e.currentTarget.setPointerCapture(e.pointerId);
                setDrag({ tile: i, startX: e.clientX, startY: e.clientY, dx: 0, dy: 0, moved: false, to: pos });
              }}
              onPointerMove={(e) => {
                if (!drag || drag.tile !== i) return;
                const dx = e.clientX - drag.startX, dy = e.clientY - drag.startY;
                const moved = drag.moved || Math.hypot(dx, dy) > 6;
                setDrag({ ...drag, dx, dy, moved, to: moved ? targetIndex(e.clientX, e.clientY, i) : drag.to });
              }}
              onPointerUp={() => {
                if (!drag) return;
                if (drag.moved) setPicked(dropped);
                else setPicked(picked.filter((p) => p !== i));
                setDrag(null);
              }}
              onPointerCancel={() => setDrag(null)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') { e.preventDefault(); move(pos, -1); }
                if (e.key === 'ArrowRight') { e.preventDefault(); move(pos, 1); }
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPicked(picked.filter((p) => p !== i)); }
              }}
            >
              {tiles[i].t}
            </button>
            </Fragment>
          );
        })}
        {drag?.moved && drag.to >= others.length && <span className="drop-marker" aria-hidden="true" />}
      </div>
      <div className={`tiles ${meanings ? 'with-meanings' : ''}`} lang={LANG}>
        {tiles.map(({ t, i }) => (
          <HintTile key={i} text={t} used={picked.includes(i)} disabled={locked || picked.includes(i)} showMeaning={meanings || fresh.has(cleanWord(t))} isNew={fresh.has(cleanWord(t))} phrase={phraseForWord(ex.es, t)?.en} onPick={() => { speak(t); setPicked([...picked, i]); }} />
        ))}
      </div>
      <div className="row between wrap">
        <button className="link small" onClick={toggleMeanings} aria-pressed={meanings}>{meanings ? 'Hide word meanings' : 'Show word meanings'}</button>
        <div className="row">
          <button className="btn" disabled={locked || !picked.length} onClick={() => setPicked([])}>Clear</button>
          <button className="btn primary" disabled={locked || !picked.length} onClick={check}>Check</button>
        </div>
      </div>
      {picked.length > 1 && !locked && <p className="small muted build-help">Drag a word to move it, or tap it to send it back.</p>}
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
        <div>{left.map((p) => <button key={p.wordId} lang={LANG} className={cls('es', p.wordId)} disabled={done.includes(p.wordId)} onClick={() => tap('es', p.wordId)}>{p.es}</button>)}</div>
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
        <span lang={LANG}>{ex.inf}</span>
        <span className="muted small">{VERB_MAP[ex.inf]?.en}</span>
      </div>
      {ex.options ? (
        <div className="options">
          {ex.options.map((o, i) => (
            <button key={o} lang={LANG} disabled={locked} className="option" onClick={() => { speak(o); onResult({ ok: o === ex.answer, answer: ex.answer, why: ex.why }); }}>
              <span className="key">{i + 1}</span>{o}
            </button>
          ))}
        </div>
      ) : (
        <TextAnswer locked={locked} placeholder="Conjugated form…" onSubmit={(v) => onResult({ ...feedbackFor(v, ex.answer), why: ex.why })} />
      )}
    </>
  );
}

/** Before practising a verb: its full table, to read and listen to. */
function StudyView({ ex, onResult }: { ex: Extract<Exercise, { kind: 'study' }>; onResult: (r: Result) => void }) {
  return (
    <>
      <p className="ex-label">New forms · {tenseLabel(ex.tense)}</p>
      <div className="ex-prompt conj">
        <span lang={LANG}>{ex.inf}</span>
        <span className="muted small">{VERB_MAP[ex.inf]?.en}</span>
      </div>
      <p className="muted small">Read the forms first: tap any form to hear it. Look at what changes from row to row, then practise.</p>
      <VerbTable verbs={[ex.inf]} tense={ex.tense} />
      <button className="btn primary" autoFocus onClick={() => onResult({ ok: true, answer: '', study: true })}>Got it, let's practise →</button>
    </>
  );
}

/** The English for a tile word, or a dash when the course has none. */
const meaningOf = (word: string) => { const g = gloss(word); return g.meaning === '—' ? '…' : g.meaning; };

/** Only one tile hint is visible at a time. */
let hideActiveHint: (() => void) | null = null;

/** A word tile that shows its meaning after hovering (or a long press on touch screens). */
function HintTile({ text, used, disabled, onPick, showMeaning = false, isNew = false, phrase }: { text: string; used: boolean; disabled: boolean; onPick: () => void; showMeaning?: boolean; isNew?: boolean; phrase?: string }) {
  const [hint, setHint] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const longPressed = useRef(false);
  const word = text.replace(/[¿?¡!.,;:"]/g, '');
  const show = (delay: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const g = gloss(word);
      if (g.meaning === '—') return; // unknown word: show nothing rather than a placeholder
      longPressed.current = true;
      if (hideActiveHint && hideActiveHint !== hide) hideActiveHint();
      hideActiveHint = hide;
      setHint(phrase ? `${g.meaning} · part of “${phrase}”` : g.meaning);
    }, delay);
  };
  const hide = () => { clearTimeout(timer.current); setHint(null); };
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <span className="tile-wrap">
      <button
        className={`tile ${used ? 'used' : ''} ${showMeaning ? 'has-meaning' : ''}`}
        disabled={disabled}
        onMouseEnter={() => show(600)}
        onMouseLeave={hide}
        onTouchStart={() => { longPressed.current = false; show(450); }}
        onTouchEnd={() => setTimeout(hide, 1200)}
        onClick={() => {
          // A long press only reveals the meaning; it shouldn't also place the tile.
          if (longPressed.current && hint) { longPressed.current = false; return; }
          hide();
          onPick();
        }}
      >
        {text}
        {showMeaning && <span className="tile-meaning" lang="en">{isNew && <b className="tile-new">new </b>}{meaningOf(word)}{phrase && <em className="tile-phrase"> · part of “{phrase}”</em>}</span>}
      </button>
      {hint && !used && !showMeaning && <span className="tile-hint" role="tooltip">{hint}</span>}
    </span>
  );
}
