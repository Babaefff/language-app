import { useState } from 'react';
import { Link } from '../components/Nav';
import { L, LANG } from '../data/lang';
import { PRONUNCIATION } from '../data/pronunciation';
import { speak } from '../lib/speech';
import { addXp } from '../lib/store';
import { shuffle } from '../lib/text';

/** Listening quiz: hear a word, pick it from words with similar spellings in the same section. */
function makeQuiz() {
  return shuffle(PRONUNCIATION.flatMap((sec) => sec.items.flatMap((it) => it.examples.map(([w]) => ({ w, sec })))))
    .slice(0, 8)
    .map(({ w, sec }) => {
      const others = shuffle([...new Set(sec.items.flatMap((it) => it.examples.map(([x]) => x)))].filter((x) => x !== w)).slice(0, 2);
      return { word: w, options: shuffle([w, ...others]) };
    });
}

function Quiz() {
  const [qs, setQs] = useState(makeQuiz);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const q = qs[i];
  const restart = () => { setQs(makeQuiz()); setI(0); setPicked(null); setScore(0); };
  if (!q) {
    return (
      <section className="card">
        <h2>Which word do you hear?</h2>
        <p><strong>{score}/{qs.length} correct.</strong> {score === qs.length ? '🎉' : 'Read the rules above again and listen to the examples.'}</p>
        <button className="btn" onClick={restart}>↻ New round</button>
      </section>
    );
  }
  return (
    <section className="card">
      <div className="row between"><h2>Which word do you hear?</h2><span className="muted small">{i + 1}/{qs.length}</span></div>
      <button className="btn primary" onClick={() => speak(q.word)}>🔊 Play the word</button>
      <div className="options">
        {q.options.map((o) => (
          <button
            key={o}
            lang={LANG}
            disabled={!!picked}
            className={`option ${picked && o === q.word ? 'right' : ''} ${picked === o && o !== q.word ? 'wrong' : ''}`}
            onClick={() => { setPicked(o); if (o === q.word) { setScore(score + 1); addXp(1); } }}
          >
            {o}
          </button>
        ))}
      </div>
      {picked && <button className="btn" onClick={() => { setPicked(null); setI(i + 1); }}>Next →</button>}
    </section>
  );
}

export function Pronunciation() {
  return (
    <div className="page narrow">
      <Link className="link" to="/grammar">← Grammar</Link>
      <h1>Pronunciation</h1>
      <p className="muted">How {L.name} letters and letter combinations sound, explained for English speakers. Tap any example to hear it.</p>
      <nav className="chips">
        {PRONUNCIATION.map((s, i) => <a key={s.title} className="chip" href={`#pron-${i}`} onClick={(e) => { e.preventDefault(); document.getElementById(`pron-${i}`)?.scrollIntoView({ behavior: 'smooth' }); }}>{s.title}</a>)}
      </nav>
      {PRONUNCIATION.map((sec, si) => (
        <section key={sec.title} id={`pron-${si}`} className="card pron-section">
          <h2>{sec.title}</h2>
          {sec.intro && <p className="muted">{sec.intro}</p>}
          {sec.items.map((it) => (
            <div key={it.spelling} className="pron-item">
              <div className="pron-spelling" lang={LANG}>{it.spelling}</div>
              <div className="pron-body">
                <p>{it.sound}</p>
                <div className="pron-examples">
                  {it.examples.map(([w, en]) => (
                    <button key={w} className="pron-word" onClick={() => speak(w)} title={en}>
                      <span lang={LANG}>{w}</span> <span className="muted small">{en}</span> 🔊
                    </button>
                  ))}
                </div>
                {it.tip && <p className="muted small">💡 {it.tip}</p>}
              </div>
            </div>
          ))}
        </section>
      ))}
      <Quiz />
    </div>
  );
}
