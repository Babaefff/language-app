import { Icon } from './Icon';
import { L, LANG } from '../data/lang';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import type { Exercise } from '../lib/exercises';
import { personLabel, tenseLabel, typeEnEs } from '../lib/exercises';
import { cleanWord, newWordsIn } from '../lib/taught';
import { setFeedbackContext } from '../lib/feedback';
import { FeedbackButton } from './FeedbackButton';
import { WordParts } from './WordParts';
import { isQuiet, setQuiet, type Quiet } from '../lib/quiet';
import { compareSpeech, listenOnce, recognitionSupported, RECOGNITION_ERRORS, stopListening } from '../lib/recognize';
import { phrasesIn, phraseForWord } from '../lib/phrases';
import { checkAnswer, normalize, shuffle, wrongWords } from '../lib/text';
import { speak, stopSpeaking } from '../lib/speech';
import { getProgress, recordLearning, updateSettings } from '../lib/store';
import { lookupWord, WORD_MAP } from '../data/course';
import { lookupForm } from '../lib/conjugate';
import { questionId, eligibleDelayedRecall } from '../lib/learning';
import { VERB_MAP } from '../data/verbs';
import { SpeakButton } from './SpeakButton';
import { AccentKeys } from './AccentKeys';
import { VerbTable } from './VerbTable';
import { gloss } from '../lib/gloss';
import { t } from '../lib/ui-text';
import { otherOrders } from '../lib/word-order';
import { accentPairOf, explainPair } from '../data/accent-pairs';
import { articleHint } from '../lib/articles';

export interface Result {
  ok: boolean;
  /** Right, but in other words or another order: no spelling highlight. */
  alike?: boolean;
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
  /** The option chosen (multiple choice), for "Report a problem". */
  picked?: string;
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
  /** Every first answer (tests save these for the teacher to see). */
  answers?: { q: string; expected: string; given: string; ok: boolean }[];
}

const wordsOf = (ex: Exercise): string[] =>
  ex.kind === 'match' ? ex.pairs.map((p) => p.wordId) : 'wordId' in ex && ex.wordId ? [ex.wordId] : [];

/**
 * Respects "can't listen / speak now": a listening exercise becomes the same word without audio
 * (written from English), a speaking exercise is left out (also where the browser can't listen).
 */
function adapt(ex: Exercise): Exercise | null {
  if (ex.kind === 'listen' && isQuiet('listen')) {
    const w = ex.wordId ? WORD_MAP[ex.wordId] : undefined;
    return w ? { ...typeEnEs(w), key: ex.key + ':quiet' } : null;
  }
  if (ex.kind === 'speak' && (isQuiet('speak') || !recognitionSupported())) return null;
  return ex;
}
const adaptAll = (list: Exercise[]) => list.map(adapt).filter((e): e is Exercise => !!e);

/**
 * Typing the answer to a multiple-choice question: the wrong option it matches, if any.
 * The right answer typed exactly is never a trap, and when a wrong option differs from the
 * answer only in capitals or accents (Ihre / ihre), only that exact spelling counts as the trap.
 */
export function typedTrap(options: string[], answer: string, typed: string): string | undefined {
  const v = typed.trim();
  if (v === answer.trim()) return undefined;
  return options.find((o) => o !== answer && (normalize(o) === normalize(answer) ? o.trim() === v : normalize(o) === normalize(v)));
}

export function Session({ exercises, onFinish, onExit, title, test = false, untilRight = false }: { exercises: Exercise[]; onFinish: (s: SessionSummary) => void; onExit: () => void; title?: string; /** A test: wrong answers aren't asked again. */ test?: boolean; /** A drill: a wrong answer comes back until it is right, and every attempt is recorded. */ untilRight?: boolean }) {
  const [queue, setQueue] = useState(() => adaptAll(exercises));
  const [total, setTotal] = useState(() => adaptAll(exercises).filter((e) => e.kind !== 'study').length);
  const [quiet, setQuietState] = useState({ listen: isQuiet('listen'), speak: isQuiet('speak') });
  /** "Can't listen / speak now": from this exercise on, for an hour. */
  const goQuiet = (what: Quiet, on = true) => {
    setQuiet(what, on);
    setQuietState((q) => ({ ...q, [what]: on }));
    if (!on) return;
    setResult(null);
    setQueue((q) => {
      const rest = adaptAll(q.slice(index));
      setTotal((t) => t - (q.length - index - rest.length));
      if (!rest.length) setTimeout(() => onFinish({ correct: stats.current.correct, total: Math.max(1, total), words: stats.current.words, close: stats.current.close }), 0);
      return [...q.slice(0, index), ...rest];
    });
  };
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const stats = useRef({ correct: 0, words: {} as Record<string, boolean>, close: {} as Record<string, boolean>, retried: new Set<string>(), exposed: new Set<string>(), answers: [] as NonNullable<SessionSummary['answers']> });
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
        ex.kind === 'listen' ? { prompt: ex.en, answer: ex.answer } :
        ex.kind === 'speak' ? { prompt: `(say) ${ex.en}`, answer: ex.es } : { prompt: ex.prompt, answer: ex.answer, why: 'why' in ex ? ex.why : undefined };
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
    // Speaking isn't repeated: speech recognition can miss words, so no endless retries.
    if (firstTry || untilRight) {
      const q = ex.kind === 'build' ? ex.en : ex.kind === 'speak' ? ex.en : ex.kind === 'listen' ? `(audio) ${ex.en}` : ex.kind === 'match' ? 'Match the pairs' : ex.kind === 'study' ? '' : ex.kind === 'conj' ? `${personLabel(ex.tense, ex.person)} · ${ex.inf}` : ex.prompt;
      const expected = ex.kind === 'build' || ex.kind === 'speak' ? ex.es : 'answer' in ex ? ex.answer : '';
      if (q) s.answers.push({ q, expected, given: r.typed ?? r.picked ?? '', ok: r.ok });
    }
    if (!test && !r.ok && (firstTry || untilRight) && ex.kind !== 'match' && ex.kind !== 'speak') {
      s.retried.add(ex.key);
      setQueue((q) => [...q, ex]);
    }
  };

  const next = () => {
    setResult(null);
    if (index + 1 >= queue.length) onFinish({ correct: stats.current.correct, total, words: stats.current.words, close: stats.current.close, answers: stats.current.answers });
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
      ex.kind === 'speak' ? { prompt: `Say: ${ex.es} (${ex.en})`, answer: ex.es } :
      { prompt: ex.prompt, answer: ex.answer };
    const label = 'label' in ex ? ex.label : ex.kind === 'listen' ? 'Type what you hear' : ex.kind === 'build' ? `Build the sentence in ${L.name}` : ex.kind === 'speak' ? `Say it in ${L.name}` : undefined;
    const options = ex.kind === 'choice' ? ex.options : ex.kind === 'conj' ? ex.options : undefined;
    setFeedbackContext({ exercise: { kind: ex.kind, label, ...d, ...(options ? { options } : {}) }, typed: result?.typed ?? result?.picked });
  }, [ex, result]);

  return (
    <div className="session">
      <div className="session-top">
        <button className="icon-btn" onClick={onExit} aria-label="Exit"><Icon name="close" /></button>
        <div className="bar" role="progressbar" aria-label="Session progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><div style={{ width: `${progress}%` }} /></div>
        {title && <span className="muted small">{title}</span>}
        <FeedbackButton compact />
      </div>
      {(quiet.listen || quiet.speak) && (
        <p className="quiet-note small muted">
          {quiet.listen && <>🔇 Listening is off for an hour · <button className="link small" onClick={() => goQuiet('listen', false)}>turn back on</button> </>}
          {quiet.speak && <>🎤 Speaking is off for an hour · <button className="link small" onClick={() => goQuiet('speak', false)}>turn back on</button></>}
        </p>
      )}
      <div className="session-body" key={`${ex.key}-${index}`}>
        <ExerciseView ex={ex} onResult={answer} locked={!!result} onQuiet={goQuiet} />
      </div>
      {result && (
        <div role="status" className={`feedback ${result.ok ? 'good' : result.grade ? 'close' : 'bad'}`}>
          <div>
            <strong>{t(result.ok ? 'Correct' : result.grade === 'almost' ? 'Almost' : result.grade === 'partly' ? 'Partly correct' : 'Incorrect')}</strong>
            {!result.ok && (
              <div className="feedback-answer">
                {t('Correct answer:')} <span lang={LANG}>{result.answer}</span> <SpeakButton text={result.answer} />
              </div>
            )}
            {/* After a slip, seeing how the word is built helps it stick (Brief + Träger). */}
            {!result.ok && 'wordId' in ex && ex.wordId && WORD_MAP[ex.wordId] && <WordParts word={WORD_MAP[ex.wordId]} compact />}
            {result.note && <div className="small">{result.note}</div>}
            {/* Spelling highlight — not for answers that are right in other words or another order. */}
            {result.typed && result.note && !result.alike && <Highlight typed={result.typed} expected={result.answer} />}
            {!result.ok && <p className="small">{t('Saved for review.')}</p>}
            {result.why && <details className="why"><summary>{t('Why?')}</summary><p>{result.why}</p></details>}
          </div>
          <button className="btn primary" onClick={next} autoFocus>{t('Continue')}</button>
        </div>
      )}
    </div>
  );
}


function ExerciseView(props: { ex: Exercise; onResult: (r: Result) => void; locked: boolean; onQuiet: (what: Quiet) => void }) {
  const from = 'from' in props.ex ? props.ex.from : undefined;
  // Review words from earlier units are labelled, so they never feel like a slip in this lesson.
  return from ? <><p className="review-tag">Review · from “{from}”</p><ExerciseBody {...props} /></> : <ExerciseBody {...props} />;
}

function ExerciseBody({ ex, onResult, locked, onQuiet }: { ex: Exercise; onResult: (r: Result) => void; locked: boolean; onQuiet: (what: Quiet) => void }) {
  switch (ex.kind) {
    case 'speak': return <SpeakView ex={ex} onResult={onResult} locked={locked} onQuiet={onQuiet} />;
    case 'choice': return <ChoiceView ex={ex} onResult={onResult} locked={locked} />;
    case 'type': return <TypeView ex={ex} onResult={onResult} locked={locked} />;
    case 'listen': return <ListenView ex={ex} onResult={onResult} locked={locked} onQuiet={onQuiet} />;
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
    onResult({ ok: o === ex.answer, answer: ex.answer, why: ex.why, picked: o });
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
        <p className="ex-label">{t(ex.promptSpanish ? 'Type the missing word' : `Type it in ${L.name}`)}</p>
        <div className="ex-prompt">
          <span lang={ex.audio || ex.promptSpanish ? LANG : 'en'}>{ex.prompt}</span>
          {ex.audio && <SpeakButton text={ex.audio} />}
        </div>
        {ex.base && <p className="base-hint">Use: <strong lang={LANG}>{ex.base.split(' — ')[0]}</strong> <span className="muted">— {ex.base.split(' — ').slice(1).join(' — ')}</span></p>}
        {ex.hint && <p className="muted">{ex.hint}</p>}
        <TextAnswer locked={locked} onSubmit={(v) => {
          // The wrong options are the typical mistakes this question is about (Fähr, levent…):
          // typing one of them exactly is wrong, even if it looks like a small slip.
          const trap = typedTrap(ex.options, ex.answer, v);
          if (trap) return onResult({ ok: false, answer: ex.answer, typed: v, note: `“${trap}” ${t('is the typical mistake here.')}`, why: ex.why });
          onResult(withWhy(feedbackFor(v, ex.answer, ex.accept), ex.why));
        }} />
        {!locked && !ex.typed && <button className="link small" onClick={toggle}>☰ Show options instead</button>}
      </>
    );
  }
  return (
    <>
      <p className="ex-label">{t(ex.label)}</p>
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
      {canType && !locked && <button className="link small" onClick={toggle}>⌨️ {t('Type the answer instead')}</button>}
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
        placeholder={placeholder ?? t(`Type in ${L.name}…`)}
        disabled={locked}
      />
      <AccentKeys onKey={(ch) => { setValue((v) => (ch === '\b' ? v.slice(0, -1) : v + ch)); input.current?.focus(); }} disabled={locked} />
      <button className="btn primary" disabled={locked || !value.trim()}>{t('Check')}</button>
    </form>
  );
}

/** The question's own explanation, or the one the answer check found (e.g. about an article). */
const withWhy = (r: Result, why?: string): Result => ({ ...r, why: why ?? r.why });

function feedbackFor(input: string, expected: string, accept: string[] = [], typos = false): Result {
  const strict = getProgress().settings.strictSpelling;
  // Another word with the same meaning (a synonym in the course) is right too.
  const alt = accept.find((a) => checkAnswer(input, a, strict).ok && !checkAnswer(input, a, strict).article);
  if (alt && !checkAnswer(input, expected, strict).ok) {
    speak(alt);
    return { ok: true, alike: true, answer: alt, note: `${t('Also right:')} ${expected}.`, typed: input };
  }
  const c = checkAnswer(input, expected, strict, { typos, isWord: (w) => !!lookupWord(w, false) || lookupForm(w).length > 0 });
  // The same sentence in another natural order is right too; show the order the lesson uses.
  if (!c.ok && input.trim().split(/\s+/).length >= 3) {
    const order = otherOrders(expected).find((o) => checkAnswer(input, o, strict, { isWord: (w) => !!lookupWord(w, false) || lookupForm(w).length > 0 }).ok);
    if (order) { speak(input); return { ok: true, alike: true, answer: expected, note: `${t('Also right — the lesson’s order is:')} ${expected}`, typed: input }; }
  }
  const notes = [
    c.otherWord && (() => {
      const pair = accentPairOf(c.otherWord!);
      const mark = LANG === 'de' ? 'umlaut' : 'accent';
      return pair ? `“${c.otherWord}” ${t(`is a different word — the ${mark} changes the meaning:`)} ${explainPair(pair)}.` : `“${c.otherWord}” ${t(`is a different word: the ${mark} matters here.`)}`;
    })(),
    c.typo && t('One small slip in the spelling — the rest is right.'),
    c.nearMiss && t('Almost — just one letter off. Look at the spelling and it’ll come back soon.'),
    c.accent && t(LANG === 'de' ? 'The two dots are part of the spelling (ä ö ü ß) — without them the word is misspelt.' : LANG === 'fr' ? 'The accents are part of the spelling (é è ê à ç ô…) — without them the word is misspelt.' : LANG === 'ru' ? 'Watch the soft sign ь and the accents.' : 'The accent is part of the spelling (á é í ó ú ñ) — without it the word is misspelt.'),
    c.letterCase && t(LANG === 'de' ? 'Watch the capitals: nouns and Sie start with a capital letter.' : 'Watch the capital letters.'),
    c.article && t('Remember the article.'),
  ].filter(Boolean);
  // Only an article is different: explain the rule instead of a bare "Incorrect".
  const art = !c.ok ? articleHint(input, expected) : undefined;
  // A missing accent / umlaut is a spelling mistake: never "Correct". One word → Almost, a sentence → Partly correct.
  if (c.ok && c.accent) {
    const sentence = expected.trim().split(/\s+/).length >= 3;
    return { ok: false, answer: expected, typed: input, grade: sentence ? 'partly' : 'almost', note: notes.join(' ') || undefined };
  }
  if (c.ok) speak(expected);
  return { ok: c.ok, answer: expected, ...(art ? { why: art } : {}), note: notes.length ? notes.join(' ') : undefined, typed: input, ...(c.nearMiss ? { grade: 'almost' as const } : c.typo ? { grade: 'partly' as const } : {}) };
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
      <p className="ex-label">{t(ex.label)}</p>
      <div className="ex-prompt"><span lang="en">{ex.prompt}</span></div>
      <TextAnswer locked={locked} onSubmit={(v) => onResult(withWhy(feedbackFor(v, ex.answer, ex.accept, true), ex.why))} />
    </>
  );
}

function ListenView({ ex, onResult, locked, onQuiet }: { ex: Extract<Exercise, { kind: 'listen' }>; onResult: (r: Result) => void; locked: boolean; onQuiet: (what: Quiet) => void }) {
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
      {!locked && <button className="link small quiet-btn" onClick={() => { stopSpeaking(); onQuiet('listen'); }}>🔇 Can’t listen now</button>}
    </>
  );
}

/** Say a sentence aloud: speech recognition shows which words were understood. */
function SpeakView({ ex, onResult, locked, onQuiet }: { ex: Extract<Exercise, { kind: 'speak' }>; onResult: (r: Result) => void; locked: boolean; onQuiet: (what: Quiet) => void }) {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { if (!isQuiet('listen')) void speak(ex.es); return () => stopListening(); }, [ex.es]);
  const record = async () => {
    if (listening || locked) return;
    stopSpeaking();
    setError('');
    setListening(true);
    try {
      const r = compareSpeech(ex.es, await listenOnce());
      // Most words understood → correct; about half → partly correct; otherwise try it again later.
      const grade = r.pct >= 80 ? 'ok' : r.pct >= 50 ? 'partly' : 'no';
      onResult({ ok: grade === 'ok', answer: ex.es, typed: r.heard || undefined, note: r.heard ? `We heard: “${r.heard}” (${r.pct}% of the words).` : 'Nothing was understood. Speak a little louder and closer to the microphone.', ...(grade === 'partly' ? { grade: 'partly' as const } : {}) });
    } catch (e) {
      const code = (e as Error).message;
      setError(RECOGNITION_ERRORS[code] ?? `Speech recognition failed (${code}).`);
    } finally {
      setListening(false);
    }
  };
  return (
    <>
      <p className="ex-label">Say it in {L.name}</p>
      <div className="ex-prompt"><span lang={LANG}>{ex.es}</span><SpeakButton text={ex.es} /></div>
      <p className="muted">{ex.en}</p>
      <div className="speak-row">
        <button className={`btn primary big-btn mic-btn ${listening ? 'on' : ''}`} disabled={locked || listening} onClick={() => void record()}>
          <Icon name="mic" /> {listening ? 'Listening… speak now' : 'Tap and say it'}
        </button>
      </div>
      {error && <p className="warn small">{error}</p>}
      {!locked && <button className="link small quiet-btn" onClick={() => { stopListening(); onQuiet('speak'); }}>🎤 Can’t speak now</button>}
    </>
  );
}

const MEANINGS_KEY = 'hablo:showMeanings';
/** Tiles start in lower case, so outside German a capitalised tile is a name (Rosa, París): no meaning for it. */
const isName = (tile: string) => LANG !== 'de' && /^\p{Lu}/u.test(tile) && tile !== 'I';
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
    const other = normalize(attempt) !== normalize(ex.es) && otherOrders(ex.es).some((o) => normalize(o) === normalize(attempt));
    const ok = normalize(attempt) === normalize(ex.es) || other;
    if (ok) speak(other ? attempt : ex.es);
    // Explain fixed phrases after every answer: "Mir geht es gut = I'm fine (literally: to me it goes well)".
    const ph = phrasesIn(ex.es).map((x) => `${x.phrase} = ${x.en} (literally “${x.literal}”). ${x.note.replace(/\*/g, '')}`).join(' ');
    onResult({ ok, answer: ex.es, picked: attempt, ...(other ? { alike: true, note: `${t('Also right — the lesson’s order is:')} ${ex.es}` } : {}), ...(ph ? { why: ph } : {}) });
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
  // Drag from the word bank straight into the sentence, at the spot where it is dropped.
  type BankDrag = { tile: number; startX: number; startY: number; dx: number; dy: number; moved: boolean; to: number | null };
  const [bankDrag, setBankDragState] = useState<BankDrag | null>(null);
  // Pointer events come faster than React re-renders: keep the live value in a ref too.
  const bankRef = useRef<BankDrag | null>(null);
  const setBankDrag = (v: BankDrag | null) => { bankRef.current = v; setBankDragState(v); };
  const afterDrag = useRef(false);
  const overLine = (x: number, y: number) => {
    const r = line.current?.getBoundingClientRect();
    return !!r && x >= r.left - 24 && x <= r.right + 24 && y >= r.top - 40 && y <= r.bottom + 40;
  };
  const bankDragProps = (i: number) => ({
    onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => {
      if (locked || picked.includes(i) || e.button > 0) return;
      // Hold on to the pointer, so the word follows it even when it leaves the word quickly.
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* not supported */ }
      setBankDrag({ tile: i, startX: e.clientX, startY: e.clientY, dx: 0, dy: 0, moved: false, to: null });
    },
    onPointerMove: (e: React.PointerEvent<HTMLButtonElement>) => {
      const d = bankRef.current;
      if (!d || d.tile !== i) return;
      const dx = e.clientX - d.startX, dy = e.clientY - d.startY;
      const moved = d.moved || Math.hypot(dx, dy) > 8;
      setBankDrag({ ...d, dx, dy, moved, to: moved && overLine(e.clientX, e.clientY) ? targetIndex(e.clientX, e.clientY, -1) : null });
    },
    onPointerUp: () => {
      const d = bankRef.current;
      if (d?.moved) {
        afterDrag.current = true;
        if (d.to !== null) {
          const next = [...picked];
          next.splice(d.to, 0, d.tile);
          setPicked(next);
          speak(tiles[d.tile].t);
        }
      }
      setBankDrag(null);
    },
    onPointerCancel: () => setBankDrag(null),
    style: bankDrag?.moved && bankDrag.tile === i ? { transform: `translate(${bankDrag.dx}px, ${bankDrag.dy}px)`, zIndex: 5, position: 'relative' as const } : undefined,
  });
  const move = (from: number, by: number) => {
    const to = Math.max(0, Math.min(picked.length - 1, from + by));
    const next = [...picked];
    const [t] = next.splice(from, 1);
    next.splice(to, 0, t);
    setPicked(next);
  };

  return (
    <>
      <p className="ex-label">{t(`Build the sentence in ${L.name}`)}</p>
      <div className="ex-prompt"><span lang="en">{ex.en}</span></div>
      <div className="build-line" lang={LANG} ref={line}>
        {picked.length === 0 && <span className="muted">{t('Tap the words below…')}</span>}
        {picked.map((i, pos) => {
          const dragging = drag?.moved && drag.tile === i;
          const marker = (drag?.moved && !dragging && others.indexOf(i) === drag.to) || (bankDrag?.moved && bankDrag.to === pos);
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
        {((drag?.moved && drag.to >= others.length) || (bankDrag?.moved && bankDrag.to !== null && bankDrag.to >= picked.length)) && <span className="drop-marker" aria-hidden="true" />}
      </div>
      <div className={`tiles ${meanings ? 'with-meanings' : ''}`} lang={LANG}>
        {tiles.map(({ t, i }) => (
          <HintTile key={i} text={t} used={picked.includes(i)} disabled={locked || picked.includes(i)} showMeaning={!isName(t) && (meanings || fresh.has(cleanWord(t)))} isNew={!isName(t) && fresh.has(cleanWord(t))} phrase={phraseForWord(ex.es, t)?.en} drag={bankDragProps(i)} onPick={() => { if (afterDrag.current) { afterDrag.current = false; return; } speak(t); setPicked([...picked, i]); }} />
        ))}
      </div>
      <div className="row between wrap">
        <button className="link small" onClick={toggleMeanings} aria-pressed={meanings}>{t(meanings ? 'Hide word meanings' : 'Show word meanings')}</button>
        <div className="row">
          <button className="btn" disabled={locked || !picked.length} onClick={() => setPicked([])}>{t('Clear')}</button>
          <button className="btn primary" disabled={locked || !picked.length} onClick={check}>{t('Check')}</button>
        </div>
      </div>
      {!locked && <p className="small muted build-help">{t(picked.length ? 'Tap a word to add it, or drag it to the right spot. Tap a placed word to send it back.' : 'Tap a word to add it, or drag it to the right spot.')}</p>}
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
        <TextAnswer locked={locked} placeholder="Conjugated form…" onSubmit={(v) => onResult(withWhy(feedbackFor(v, ex.answer), ex.why))} />
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
type TileDrag = { onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => void; onPointerMove: (e: React.PointerEvent<HTMLButtonElement>) => void; onPointerUp: () => void; onPointerCancel: () => void; style?: React.CSSProperties };
function HintTile({ text, used, disabled, onPick, showMeaning = false, isNew = false, phrase, drag }: { text: string; used: boolean; disabled: boolean; onPick: () => void; showMeaning?: boolean; isNew?: boolean; phrase?: string; drag?: TileDrag }) {
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
        className={`tile ${used ? 'used' : ''} ${showMeaning ? 'has-meaning' : ''} ${drag?.style ? 'dragging' : ''}`}
        disabled={disabled}
        {...(drag ? { onPointerDown: drag.onPointerDown, onPointerMove: (e: React.PointerEvent<HTMLButtonElement>) => { if (Math.abs(e.movementX) + Math.abs(e.movementY) > 0) hide(); drag.onPointerMove(e); }, onPointerUp: drag.onPointerUp, onPointerCancel: drag.onPointerCancel, style: drag.style } : {})}
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
