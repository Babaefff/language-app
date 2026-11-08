import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '../components/Nav';
import { UNITS, WORDS } from '../data/course';
import { LANG } from '../data/lang';
import { WRITING, type WritingPrompt } from '../data/writing';
import { addXp } from '../lib/store';
import { normalize, stripAccents } from '../lib/text';

const flat = (s: string) => ` ${stripAccents(normalize(s))} `;
const draftKey = (id: string) => `hablo:draft:${id}`;
const load = (id: string) => { try { return localStorage.getItem(draftKey(id)) ?? ''; } catch { return ''; } };
const save = (id: string, t: string) => { try { localStorage.setItem(draftKey(id), t); } catch { /* storage blocked */ } };

/** Automatic checks: length, points covered, topic words used, and a few mechanical rules. */
function check(p: WritingPrompt, text: string) {
  const t = flat(text);
  const count = text.trim() ? text.trim().split(/\s+/).length : 0;
  const points = p.points.map((pt) => ({ ...pt, ok: pt.keys.some((k) => t.includes(` ${stripAccents(k.toLowerCase())} `)) }));
  const words = UNITS.filter((u) => p.units.includes(u.id)).flatMap((u) => u.words);
  const bareOf = (es: string) => es.replace(/^(?:(?:der|die|das|el|la|los|las|le|les)\s+|l')/i, '');
  const used = words.filter((w) => t.includes(` ${stripAccents(normalize(bareOf(w.es)))} `));
  // Suggest single words (not set phrases), in a different order each time the text changes length.
  const unused = words.filter((w) => !used.includes(w) && !/[?!]/.test(w.es) && bareOf(w.es).split(' ').length === 1);
  const shift = unused.length ? Math.floor(count / 10) % unused.length : 0;
  const suggest = [...unused.slice(shift), ...unused.slice(0, shift)].slice(0, 6);
  const tips: string[] = [];
  if (LANG === 'de') {
    // Nouns are capitalised in German: flag course nouns written in lower case.
    const lower = WORDS.filter((w) => /^(der|die|das) /.test(w.es)).map((w) => bareOf(w.es)).filter((n) => new RegExp(`(^|[^\\p{L}])${n.toLowerCase()}([^\\p{L}]|$)`, 'u').test(text));
    if (lower.length) tips.push(`Nouns start with a capital letter: ${[...new Set(lower)].slice(0, 4).join(', ')}.`);
  } else if (LANG === 'fr') {
    if (/\S[?!:;]/.test(text)) tips.push('French puts a space before ? ! : and ; — Ça va ?');
  } else {
    if (/[^¿]*\?/.test(text) && !text.includes('¿')) tips.push('Spanish questions open with ¿ — ¿Qué tal?');
    if (text.includes('!') && !text.includes('¡')) tips.push('Exclamations open with ¡ — ¡Hola!');
  }
  if (text.trim() && !/^[\p{Lu}¿¡]/u.test(text.trim())) tips.push('Start your text with a capital letter.');
  const sentences = text.split(/[.!?]+/).filter((x) => x.trim());
  if (sentences.length >= 3 && sentences.every((x) => x.trim().split(/\s+/).length < 5)) tips.push(`Try joining short sentences with ${LANG === 'de' ? 'und / aber / weil' : LANG === 'fr' ? 'et / mais / parce que' : 'y / pero / porque'}.`);
  return { count, points, used, unused: suggest, tips };
}

export function WritingList() {
  return (
    <div className="page">
      <Link className="link" to="/practice">← Practice</Link>
      <h1>✍️ Writing</h1>
      <p className="muted">Write your own texts. The app checks length, whether you covered each point, which topic words you used and common mistakes — then compare with a model answer. Your draft is saved on this device.</p>
      <div className="grid-2">
        {WRITING.map((w) => (
          <Link key={w.id} to={`/writing/${w.id}`} className="card action">
            <span className={`badge ${w.level}`}>{w.level}</span>
            <h2>{w.title}</h2>
            <p className="muted small">{w.prompt}</p>
            {load(w.id) && <span className="small">📝 Draft saved</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function WritingPage() {
  const { id } = useParams();
  const p = WRITING.find((w) => w.id === id);
  const [text, setText] = useState(() => (p ? load(p.id) : ''));
  const [checked, setChecked] = useState(false);
  const [model, setModel] = useState(false);
  if (!p) return <div className="page"><p>Task not found. <Link to="/writing">Back</Link></p></div>;
  const r = check(p, text);
  const inRange = r.count >= p.words[0] && r.count <= p.words[1] * 1.3;
  const update = (t: string) => { setText(t); save(p.id, t); };

  return (
    <div className="page narrow">
      <Link className="link" to="/writing">← Writing</Link>
      <span className={`badge ${p.level}`}>{p.level}</span>
      <h1>{p.title}</h1>
      <p><strong>{p.prompt}</strong> Write {p.words[0]}–{p.words[1]} words and include:</p>
      <ul className="checklist">
        {r.points.map((pt) => <li key={pt.text} className={checked ? (pt.ok ? 'heard-ok' : 'heard-miss') : ''}>{checked ? (pt.ok ? '✓ ' : '✗ ') : '• '}{pt.text}</li>)}
      </ul>
      <textarea className="exam-write" lang={LANG} rows={9} value={text} onChange={(e) => update(e.target.value)} placeholder="Write here…" spellCheck />
      <p className="small">{r.count} words {inRange ? '✓' : `· aim for ${p.words[0]}–${p.words[1]}`}</p>
      <div className="row wrap">
        <button className="btn primary" disabled={r.count < 5} onClick={() => { if (!checked) addXp(5); setChecked(true); }}>Check my text</button>
        <button className="btn" onClick={() => setModel(!model)}>{model ? 'Hide' : 'Show'} model answer</button>
      </div>

      {checked && (
        <section className="card">
          <h3>Feedback</h3>
          <p>{r.points.filter((x) => x.ok).length}/{r.points.length} points covered · {r.used.length} topic words used · {inRange ? 'good length' : r.count < p.words[0] ? 'a bit short' : 'a bit long'}</p>
          {r.points.some((x) => !x.ok) && <p className="muted small">Missing: {r.points.filter((x) => !x.ok).map((x) => x.text.toLowerCase()).join(', ')}.</p>}
          {r.used.length > 0 && <p className="small">✓ Used: <span lang={LANG}>{r.used.map((w) => w.es).join(', ')}</span></p>}
          {r.unused.length > 0 && <p className="small">💡 Words you could add: <span lang={LANG}>{r.unused.map((w) => `${w.es} (${w.en})`).join(', ')}</span></p>}
          {r.tips.map((t) => <p key={t} className="warn small">{t}</p>)}
          <p className="muted small">These checks can’t judge grammar fully — compare carefully with the model answer.</p>
        </section>
      )}
      {model && <div className="exam-text" lang={LANG}><strong>Model answer:</strong> {p.model}</div>}
    </div>
  );
}
