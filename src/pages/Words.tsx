import { useMemo, useState } from 'react';
import { WORDS, UNIT_MAP } from '../data/course';
import { LEVELS, type Level } from '../data/types';
import { useProgress } from '../lib/store';
import { strength, type Strength } from '../lib/srs';
import { normalize, stripAccents } from '../lib/text';
import { SpeakButton } from '../components/SpeakButton';

const STRENGTHS: Strength[] = ['new', 'learning', 'familiar', 'known'];

export function Words() {
  const { cards } = useProgress();
  const [q, setQ] = useState('');
  const [level, setLevel] = useState<Level | 'all'>('all');
  const [filter, setFilter] = useState<Strength | 'all'>('all');

  const list = useMemo(() => {
    const nq = stripAccents(normalize(q));
    return WORDS.filter(
      (w) =>
        (level === 'all' || w.level === level) &&
        (filter === 'all' || strength(cards[w.id]) === filter) &&
        (!nq || stripAccents(normalize(w.es)).includes(nq) || w.en.toLowerCase().includes(nq)),
    );
  }, [q, level, filter, cards]);

  return (
    <div className="page">
      <h1>Word bank</h1>
      <div className="card">
        <input className="search" placeholder="Search Spanish or English…" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="chips">
          {(['all', ...LEVELS] as const).map((l) => (
            <button key={l} className={`chip ${level === l ? 'on' : ''}`} onClick={() => setLevel(l)}>{l === 'all' ? 'All levels' : l}</button>
          ))}
        </div>
        <div className="chips">
          {(['all', ...STRENGTHS] as const).map((s) => (
            <button key={s} className={`chip ${filter === s ? 'on' : ''}`} onClick={() => setFilter(s)}>
              {s !== 'all' && <span className={`dot ${s}`} />} {s === 'all' ? 'Any status' : s}
            </button>
          ))}
        </div>
      </div>
      <p className="muted small">{list.length} words</p>
      <ul className="card word-list">
        {list.map((w) => (
          <li key={w.id}>
            <span className={`dot ${strength(cards[w.id])}`} title={strength(cards[w.id])} />
            <span lang="es" className="es">{w.es}</span>
            <span className="muted">{w.en}</span>
            <span className="small muted hide-sm">{w.level} · {UNIT_MAP[w.unitId].title}</span>
            <SpeakButton text={w.es} />
          </li>
        ))}
      </ul>
    </div>
  );
}
