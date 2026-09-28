import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '../components/Nav';
import { READINGS } from '../data/readings';
import { tokenize } from '../lib/text';
import { gloss, type Gloss } from '../lib/gloss';
import { speak, stopSpeaking } from '../lib/speech';
import { addXp, completeReading, gradeWord, useProgress } from '../lib/store';
import { SpeakButton } from '../components/SpeakButton';

export function Readings() {
  const { readings } = useProgress();
  return (
    <div className="page">
      <h1>Reading</h1>
      <p className="muted">Short graded texts. Tap any word for its meaning, listen to the whole text read aloud, then check your understanding.</p>
      <div className="grid-2">
        {READINGS.map((r) => (
          <Link key={r.id} to={`/reading/${r.id}`} className="card action">
            <span className={`badge ${r.level.replace('+', 'plus')}`}>{r.level}</span>
            <h2 lang="es">{r.title}</h2>
            <p className="muted small">{r.source ?? r.paragraphs[0].slice(0, 90) + '…'}</p>
            {readings[r.id] && <span className="small">✓ Read · {readings[r.id].score}/{r.questions.length} correct</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

/** Splits a paragraph into sentences so read-aloud can highlight as it goes. */
const sentences = (p: string) => p.match(/[^.!?]+[.!?]+["”»]?\s*|[^.!?]+$/g) ?? [p];

export function ReadingPage() {
  const { id } = useParams();
  const r = READINGS.find((x) => x.id === id);
  const { cards } = useProgress();
  const [showEn, setShowEn] = useState(false);
  const [popup, setPopup] = useState<Gloss | null>(null);
  const [current, setCurrent] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const playId = useRef(0);

  useEffect(() => () => { playId.current++; stopSpeaking(); }, []);

  if (!r) return <div className="page"><p>Text not found. <Link to="/reading">Back</Link></p></div>;

  const play = async (from = 0) => {
    const me = ++playId.current;
    const all = r.paragraphs.flatMap((p, pi) => sentences(p).map((s, si) => ({ key: `${pi}:${si}`, s })));
    for (const { key, s } of all.slice(from)) {
      if (playId.current !== me) return;
      setCurrent(key);
      await speak(s);
    }
    if (playId.current === me) setCurrent(null);
  };
  const stop = () => { playId.current++; stopSpeaking(); setCurrent(null); };

  const score = r.questions.filter((q, i) => answers[i] === q.answer).length;

  return (
    <div className="page narrow">
      <Link className="link" to="/reading">← Reading</Link>
      <div className="row wrap between">
        <div>
          <span className={`badge ${r.level.replace('+', 'plus')}`}>{r.level}</span>
          <h1 lang="es">{r.title}</h1>
          {r.source && <p className="muted small">{r.source}</p>}
        </div>
        <div className="row">
          {current ? <button className="btn" onClick={stop}>⏹ Stop</button> : <button className="btn primary" onClick={() => play()}>▶ Read aloud</button>}
          <label className="toggle"><input type="checkbox" checked={showEn} onChange={(e) => setShowEn(e.target.checked)} /> English</label>
        </div>
      </div>

      <article className="card reading">
        {r.paragraphs.map((p, pi) => (
          <div key={pi} className="para">
            <p lang="es">
              {sentences(p).map((s, si) => (
                <span key={si} className={current === `${pi}:${si}` ? 'reading-now' : ''}>
                  {tokenize(s).map((t, ti) =>
                    t.word ? (
                      <button key={ti} className="w" onClick={() => { const g = gloss(t.text, r.glossary); setPopup(g); speak(t.text); }}>{t.text}</button>
                    ) : (
                      <span key={ti}>{t.text}</span>
                    ),
                  )}
                </span>
              ))}
            </p>
            {showEn && <p className="muted translation">{r.translation[pi]}</p>}
          </div>
        ))}
      </article>

      {popup && (
        <div className="popup card" role="dialog">
          <div className="row between">
            <div className="row"><strong lang="es">{popup.word}</strong><SpeakButton text={popup.word} /></div>
            <button className="icon-btn" onClick={() => setPopup(null)} aria-label="Close">✕</button>
          </div>
          <div>{popup.meaning}</div>
          {popup.detail && <div className="muted small" lang="es">{popup.detail}</div>}
          {popup.wordId && !cards[popup.wordId] && <button className="btn small-btn" onClick={() => { gradeWord(popup.wordId!, 0); setPopup(null); }}>+ Add to my reviews</button>}
        </div>
      )}

      <section className="card">
        <h3>Comprensión</h3>
        {r.questions.map((q, qi) => (
          <div key={qi} className="question">
            <p lang="es"><strong>{qi + 1}. {q.q}</strong></p>
            <div className="options">
              {q.options.map((o, oi) => (
                <button
                  key={oi}
                  lang="es"
                  className={`option ${answers[qi] === oi ? 'selected' : ''} ${submitted && oi === q.answer ? 'right' : ''} ${submitted && answers[qi] === oi && oi !== q.answer ? 'wrong' : ''}`}
                  disabled={submitted}
                  onClick={() => setAnswers({ ...answers, [qi]: oi })}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        ))}
        {submitted ? (
          <p><strong>{score}/{r.questions.length} correct.</strong> {score === r.questions.length ? '¡Perfecto! 🎉' : 'Re-read with the English toggle and try again later.'}</p>
        ) : (
          <button
            className="btn primary"
            disabled={Object.keys(answers).length < r.questions.length}
            onClick={() => { setSubmitted(true); completeReading(r.id, score); addXp(10 + score * 2); }}
          >
            Check answers
          </button>
        )}
      </section>
    </div>
  );
}
