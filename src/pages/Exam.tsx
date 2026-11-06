import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '../components/Nav';
import { EXAMS } from '../data/exams';
import { LANG, L } from '../data/lang';
import type { Exam, ExamModule } from '../data/types';
import { speak, stopSpeaking } from '../lib/speech';
import { addXp, completeExam, useProgress } from '../lib/store';

/** Goethe-style grade bands; DELE simply needs 60 % per module too. */
export function grade(pct: number) {
  if (pct >= 90) return { label: 'sehr gut — very good', pass: true };
  if (pct >= 80) return { label: 'gut — good', pass: true };
  if (pct >= 70) return { label: 'befriedigend — satisfactory', pass: true };
  if (pct >= 60) return { label: 'ausreichend — pass', pass: true };
  return { label: 'not passed yet', pass: false };
}
const verdict = (pct: number) => (LANG === 'de' ? grade(pct).label : grade(pct).pass ? 'apto — pass' : 'not passed yet');

export function ExamList() {
  const { exams } = useProgress();
  return (
    <div className="page">
      <Link className="link" to="/practice">← Practice</Link>
      <h1>📝 Mock exams</h1>
      <p className="muted">
        Full practice exams that follow the format of the official {L.name} certificates: the same parts, task types,
        number of listening plays and the 60 % pass mark per module. The tasks are original, not official exam papers, so a pass
        here means you are very likely ready, not that you hold the certificate.
      </p>
      {EXAMS.length === 0 && <p className="card">Mock exams for {L.name} are coming soon.</p>}
      <div className="grid-2">
        {EXAMS.map((e) => {
          const r = exams[e.id];
          return (
            <Link key={e.id} to={`/exam/${e.id}`} className="card action">
              <span className={`badge ${e.level}`}>{e.level}</span>
              <h2>{e.title}</h2>
              <p className="muted small">{e.basedOn}</p>
              <p className="muted small">{e.modules.map((m) => `${m.titleEn} ${m.minutes} min`).join(' · ')} · Writing</p>
              {r && <span className="small">{Object.values(r.scores).every((s) => s >= 60) ? '✅ Passed' : '⏳ Not passed yet'} · best {r.best}%</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const key = (mi: number, pi: number, ii: number) => `${mi}-${pi}-${ii}`;

function moduleScore(m: ExamModule, mi: number, answers: Record<string, number>) {
  let right = 0;
  let total = 0;
  m.parts.forEach((p, pi) => p.items.forEach((it, ii) => { total++; if (answers[key(mi, pi, ii)] === it.answer) right++; }));
  return { right, total, pct: Math.round((right / Math.max(1, total)) * 100) };
}

/** A recording that may only be played a limited number of times until the module is submitted. */
function Recording({ text, max, unlimited }: { text: string; max: number; unlimited: boolean }) {
  const [used, setUsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const left = unlimited ? Infinity : max - used;
  const play = async () => {
    if (left <= 0 || playing) return;
    setUsed(used + 1);
    setPlaying(true);
    await speak(text);
    setPlaying(false);
  };
  return (
    <button className={`btn small-btn ${playing ? 'playing' : ''}`} disabled={left <= 0 && !playing} onClick={play}>
      {playing ? '🔊 Playing…' : left <= 0 ? '🔇 No plays left' : `▶ Play${unlimited ? '' : ` (${left} left)`}`}
    </button>
  );
}

function ModuleView({ exam, m, mi, answers, setAnswer, done, onSubmit }: {
  exam: Exam; m: ExamModule; mi: number; answers: Record<string, number>;
  setAnswer: (k: string, v: number) => void; done: boolean; onSubmit: () => void;
}) {
  const s = moduleScore(m, mi, answers);
  const answered = m.parts.every((p, pi) => p.items.every((_, ii) => answers[key(mi, pi, ii)] !== undefined));
  return (
    <section className="card exam-module">
      <div className="row between wrap">
        <h2>{m.title} <span className="muted small">· {m.titleEn}</span></h2>
        <span className="muted small">⏱ about {m.minutes} min</span>
      </div>
      {m.parts.map((p, pi) => (
        <div key={pi} className="exam-part">
          <h3>{p.title}</h3>
          <p lang={LANG}><strong>{p.instructions}</strong></p>
          <p className="muted small">{p.instructionsEn}</p>
          {p.audio && (
            <div className="row wrap">
              <Recording key={`${exam.id}${mi}${pi}${done}`} text={p.audio} max={p.plays ?? 2} unlimited={done} />
              {done && <details><summary className="small">Transcript</summary><p className="muted small" lang={LANG}>{p.audio}</p></details>}
            </div>
          )}
          {p.text && <div className="exam-text" lang={LANG}>{p.text}</div>}
          {p.items.map((it, ii) => {
            const k = key(mi, pi, ii);
            return (
              <div key={ii} className="question">
                {it.text && <div className="exam-text" lang={LANG}>{it.text}</div>}
                {it.audio && (
                  <div className="row wrap">
                    <Recording key={`${k}${done}`} text={it.audio} max={p.plays ?? 2} unlimited={done} />
                    {done && <details><summary className="small">Transcript</summary><p className="muted small" lang={LANG}>{it.audio}</p></details>}
                  </div>
                )}
                <p lang={LANG}><strong>{ii + 1}. {it.q}</strong></p>
                <div className="options">
                  {it.options.map((o, oi) => (
                    <button
                      key={oi}
                      lang={LANG}
                      disabled={done}
                      className={`option ${answers[k] === oi ? 'selected' : ''} ${done && oi === it.answer ? 'right' : ''} ${done && answers[k] === oi && oi !== it.answer ? 'wrong' : ''}`}
                      onClick={() => setAnswer(k, oi)}
                    >
                      {String.fromCharCode(97 + oi)}) {o}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
      {done ? (
        <p className={`exam-score ${s.pct >= 60 ? 'pass' : 'fail'}`}>
          <strong>{m.title}: {s.right}/{s.total} = {s.pct}%</strong> — {verdict(s.pct)}
        </p>
      ) : (
        <button className="btn primary" disabled={!answered} onClick={onSubmit}>
          {answered ? `Submit ${m.titleEn.toLowerCase()}` : 'Answer every question to submit'}
        </button>
      )}
    </section>
  );
}

function Writing({ exam }: { exam: Exam }) {
  const [texts, setTexts] = useState<string[]>(() => exam.writing.map(() => ''));
  const [shown, setShown] = useState<boolean[]>(() => exam.writing.map(() => false));
  return (
    <section className="card exam-module">
      <h2>{LANG === 'de' ? 'Schreiben' : 'Expresión escrita'} <span className="muted small">· Writing</span></h2>
      <p className="muted small">Writing can't be marked automatically. Write your answer, then compare it with the model answer and tick the checklist honestly. In the real exam this module also needs 60%.</p>
      {exam.writing.map((w, wi) => {
        const words = texts[wi].trim() ? texts[wi].trim().split(/\s+/).length : 0;
        return (
          <div key={wi} className="exam-part">
            <h3>{w.title}</h3>
            <p lang={LANG}><strong>{w.prompt}</strong></p>
            <p className="muted small">{w.promptEn}</p>
            <ul lang={LANG}>{w.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <textarea
              className="exam-write"
              lang={LANG}
              rows={6}
              value={texts[wi]}
              onChange={(e) => setTexts(texts.map((t, i) => (i === wi ? e.target.value : t)))}
              placeholder="Write here…"
            />
            <p className={`small ${words < w.words[0] || words > w.words[1] * 1.3 ? 'muted' : ''}`}>{words} words · aim for {w.words[0]}–{w.words[1]}</p>
            {shown[wi] ? (
              <>
                <div className="exam-text" lang={LANG}><strong>Model answer:</strong> {w.model}</div>
                <p className="small"><strong>Checklist</strong></p>
                {w.checklist.map((c) => <label key={c} className="toggle small"><input type="checkbox" /> {c}</label>)}
              </>
            ) : (
              <button className="btn" disabled={words < 5} onClick={() => setShown(shown.map((s, i) => (i === wi ? true : s)))}>Show model answer &amp; checklist</button>
            )}
          </div>
        );
      })}
    </section>
  );
}

export function ExamPage() {
  const { id } = useParams();
  const exam = EXAMS.find((e) => e.id === id);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => () => stopSpeaking(), []);
  if (!exam) return <div className="page"><p>Exam not found. <Link to="/exam">Back</Link></p></div>;

  const submit = (mi: number) => {
    const next = { ...done, [exam.modules[mi].id]: true };
    setDone(next);
    addXp(10);
    if (exam.modules.every((m) => next[m.id])) {
      const scores = Object.fromEntries(exam.modules.map((m, i) => [m.id, moduleScore(m, i, answers).pct]));
      completeExam(exam.id, scores);
      addXp(30);
    }
  };
  const allDone = exam.modules.every((m) => done[m.id]);
  const results = exam.modules.map((m, i) => ({ m, ...moduleScore(m, i, answers) }));

  return (
    <div className="page narrow">
      <Link className="link" to="/exam">← Mock exams</Link>
      <span className={`badge ${exam.level}`}>{exam.level}</span>
      <h1>{exam.title}</h1>
      <p className="muted small">{exam.basedOn}. Original practice tasks; recordings use the app voice. In the real exam you may hear a recording only as often as stated, so the play buttons count down.</p>
      {exam.modules.map((m, mi) => (
        <ModuleView key={m.id} exam={exam} m={m} mi={mi} answers={answers} setAnswer={(k, v) => setAnswers({ ...answers, [k]: v })} done={!!done[m.id]} onSubmit={() => submit(mi)} />
      ))}
      <Writing exam={exam} />
      {allDone && (
        <section className="card">
          <h2>Result</h2>
          {results.map((r) => <p key={r.m.id} className={`exam-score ${r.pct >= 60 ? 'pass' : 'fail'}`}>{r.m.titleEn}: <strong>{r.pct}%</strong> — {verdict(r.pct)}</p>)}
          <p>
            {results.every((r) => r.pct >= 60)
              ? `✅ You passed the listening and reading modules at ${exam.level}. Check your writing against the model answers too, then you're ready to book the real exam.`
              : `Not yet: each module needs at least 60%. Review the transcripts and the ${exam.level} units, then try again.`}
          </p>
          <button className="btn" onClick={() => { setAnswers({}); setDone({}); window.scrollTo(0, 0); }}>↻ Retake</button>
        </section>
      )}
    </div>
  );
}
