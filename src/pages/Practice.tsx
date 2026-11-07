import { Link } from '../components/Nav';

const ITEMS = [
  { to: '/pronunciation', icon: '🔤', title: 'Pronunciation', text: 'How every letter and letter combination sounds, with examples to hear and a listening quiz.' },
  { to: '/practice/speaking', icon: '🎤', title: 'Speaking', text: 'Repeat sentences or say them from English — the microphone shows which words were understood.' },
  { to: '/writing', icon: '✍️', title: 'Writing', text: 'Write your own texts on everyday topics, get automatic feedback and a model answer.' },
  { to: '/exam', icon: '📝', title: 'Mock exams', text: 'Full A1, A2 and B1 exams in the official certificate format — check that you really are at that level.' },
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
