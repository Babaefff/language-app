import { useMemo, useState } from 'react';
import { VERBS, VERB_MAP } from '../data/verbs';
import { LEVELS, type Level, type Tense } from '../data/types';
import { conjugate, gerund, participle, TENSES } from '../lib/conjugate';
import { conjItem, personLabel, type Exercise } from '../lib/exercises';
import { addXp, recordConj, useProgress } from '../lib/store';
import { Session, type SessionSummary } from '../components/Session';
import { Summary } from '../components/Summary';
import { SpeakButton } from '../components/SpeakButton';
import { normalize } from '../lib/text';

const rank = (l: Level) => LEVELS.indexOf(l);

export function Verbs() {
  const [tab, setTab] = useState<'drill' | 'tables'>('drill');
  return (
    <div className="page">
      <h1>Conjugation</h1>
      <div className="tabs">
        <button className={tab === 'drill' ? 'on' : ''} onClick={() => setTab('drill')}>Drill</button>
        <button className={tab === 'tables' ? 'on' : ''} onClick={() => setTab('tables')}>Verb tables</button>
      </div>
      {tab === 'drill' ? <Drill /> : <Tables />}
    </div>
  );
}

function Drill() {
  const p = useProgress();
  const [tenses, setTenses] = useState<Tense[]>(['presente']);
  const [level, setLevel] = useState<Level>('A1');
  const [count, setCount] = useState(15);
  const [session, setSession] = useState<Exercise[] | null>(null);
  const [done, setDone] = useState<SessionSummary | null>(null);

  const verbs = VERBS.filter((v) => rank(v.level) <= rank(level) && v.inf !== 'haber');

  const start = () => {
    const items: Exercise[] = [];
    let guard = 0;
    while (items.length < count && guard++ < count * 10) {
      const v = verbs[Math.floor(Math.random() * verbs.length)];
      const t = tenses[Math.floor(Math.random() * tenses.length)];
      const ex = conjItem(v.inf, t);
      if (ex) items.push(ex);
    }
    setDone(null);
    setSession(items);
  };

  if (session) {
    return (
      <Session
        exercises={session}
        title="Conjugation"
        onExit={() => setSession(null)}
        onFinish={(s) => {
          recordConj(s.correct, s.total - s.correct);
          addXp(s.correct);
          setSession(null);
          setDone(s);
        }}
      />
    );
  }
  if (done) return <Summary summary={done} xp={done.correct} onRetry={start} onDone={() => setDone(null)} doneLabel="Change settings" />;

  const total = p.conj.right + p.conj.wrong;
  return (
    <div className="card">
      <h3>Tenses</h3>
      <div className="chips">
        {TENSES.map((t) => (
          <button
            key={t.id}
            className={`chip ${tenses.includes(t.id) ? 'on' : ''}`}
            title={t.hint}
            onClick={() => setTenses(tenses.includes(t.id) ? (tenses.length > 1 ? tenses.filter((x) => x !== t.id) : tenses) : [...tenses, t.id])}
          >
            {t.es} <span className="small muted">{t.level}</span>
          </button>
        ))}
      </div>
      <h3>Verbs</h3>
      <div className="chips">
        {LEVELS.map((l) => (
          <button key={l} className={`chip ${level === l ? 'on' : ''}`} onClick={() => setLevel(l)}>
            Up to {l}
          </button>
        ))}
      </div>
      <p className="muted small">{verbs.length} verbs: {verbs.map((v) => v.inf).join(', ')}</p>
      <h3>Questions</h3>
      <div className="chips">
        {[10, 15, 25].map((n) => (
          <button key={n} className={`chip ${count === n ? 'on' : ''}`} onClick={() => setCount(n)}>{n}</button>
        ))}
      </div>
      <div className="row between">
        <span className="muted small">{total ? `Lifetime accuracy: ${Math.round((p.conj.right / total) * 100)}% of ${total}` : ''}</span>
        <button className="btn primary" onClick={start}>Start drill</button>
      </div>
    </div>
  );
}

function Tables() {
  const [query, setQuery] = useState('');
  const [inf, setInf] = useState('ser');
  const matches = useMemo(() => {
    const q = normalize(query);
    return VERBS.filter((v) => !q || v.inf.includes(q) || v.en.toLowerCase().includes(q)).slice(0, 30);
  }, [query]);
  const def = VERB_MAP[inf];

  return (
    <>
      <div className="card">
        <input className="search" placeholder="Search a verb (Spanish or English)…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="chips">
          {matches.map((v) => (
            <button key={v.inf} className={`chip ${v.inf === inf ? 'on' : ''}`} onClick={() => setInf(v.inf)} lang="es">{v.inf}</button>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="row">
          <h2 lang="es">{def.inf}</h2>
          <SpeakButton text={def.inf} />
          <span className="muted">{def.en}</span>
        </div>
        <p className="small">
          Participle: <strong lang="es">{participle(def)}</strong> · Gerund: <strong lang="es">{gerund(def)}</strong>
        </p>
        <div className="conj-grid">
          {TENSES.map((t) => {
            const forms = conjugate(def.inf, t.id);
            if (forms.every((f) => !f)) return null;
            return (
              <div key={t.id} className="conj-table">
                <h4>{t.es} <span className="muted small">{t.en} · {t.level}</span></h4>
                <table>
                  <tbody>
                    {forms.map((f, i) =>
                      f ? (
                        <tr key={i}>
                          <td className="muted">{personLabel(t.id, i)}</td>
                          <td lang="es">{f}</td>
                          <td><SpeakButton text={f} /></td>
                        </tr>
                      ) : null,
                    )}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
