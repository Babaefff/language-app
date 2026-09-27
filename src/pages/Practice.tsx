import { Link } from '../components/Nav';

const ITEMS = [
  { to: '/practice/verbs', icon: '🔁', title: 'Conjugation', text: 'Drill any tense, or browse full verb tables with audio.' },
  { to: '/practice/sentences', icon: '🧩', title: 'Sentence builder', text: 'Put words in order, or write whole sentences yourself.' },
  { to: '/practice/listen', icon: '🎧', title: 'Listen mode', text: 'Hands-free: words and examples play one after another. Great on a walk or commute.' },
  { to: '/practice/words', icon: '📚', title: 'Word bank', text: 'Every word in the course, with audio and how well you know it.' },
];

export function Practice() {
  return (
    <div className="page">
      <h1>Practice</h1>
      <div className="grid-2">
        {ITEMS.map((i) => (
          <Link key={i.to} to={i.to} className="card action">
            <h2>{i.icon} {i.title}</h2>
            <p className="muted">{i.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
