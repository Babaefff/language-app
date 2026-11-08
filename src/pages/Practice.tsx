import { Icon, type IconName } from '../components/Icon';
import { Link } from '../components/Nav';

const ITEMS: { to: string; icon: IconName; title: string; text: string }[] = [
  { to: '/grammar', icon: 'grammar', title: 'Grammar', text: 'Understand the patterns, then recall and use them in practice.' },
  { to: '/songs', icon: 'songs', title: 'Songs', text: 'Listen to lyrics and explore their meaning.' },
  { to: '/daily', icon: 'arrow', title: 'Daily session', text: 'A small review batch, one lesson step and a sentence check when you’re ready.' },
  { to: '/pronunciation', icon: 'volume', title: 'Pronunciation', text: 'How every letter and letter combination sounds, with examples to hear and a listening quiz.' },
  { to: '/practice/speaking', icon: 'mic', title: 'Speaking', text: 'Repeat sentences or say them from English — the microphone shows which words were understood.' },
  { to: '/writing', icon: 'practice', title: 'Writing', text: 'Write your own texts on everyday topics, get automatic feedback and a model answer.' },
  { to: '/exam', icon: 'exam', title: 'Mock exams', text: 'Full A1, A2 and B1 exams in the official certificate format — explore the kinds of tasks used at that level. This is not a certified proficiency result.' },
  { to: '/practice/verbs', icon: 'review', title: 'Conjugation', text: 'Drill any tense, or browse full verb tables with audio.' },
  { to: '/practice/sentences', icon: 'sentences', title: 'Sentence builder', text: 'Put words in order, or write whole sentences yourself.' },
  { to: '/practice/listen', icon: 'volume', title: 'Listen mode', text: 'Hands-free: words and examples play one after another. Great on a walk or commute.' },
  { to: '/practice/words', icon: 'book', title: 'Word bank', text: 'Every word in the course, with audio and how well you know it.' },
];

export function Practice() {
  return (
    <div className="page">
      <h1>Practice</h1>
      <div className="grid-2">
        {ITEMS.map((i) => (
          <Link key={i.to} to={i.to} className="card action">
            <h2><Icon name={i.icon} /> {i.title}</h2>
            <p className="muted">{i.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
