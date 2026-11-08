import { Icon, type IconName } from '../components/Icon';
import { Link } from '../components/Nav';

type Item = { to: string; icon: IconName; title: string; text: string };
/** Grouped by what the learner wants to do, so the page scans quickly on a phone. */
const GROUPS: { title: string; items: Item[] }[] = [
  { title: 'Today', items: [
    { to: '/daily', icon: 'arrow', title: 'Daily session', text: 'Review, one lesson step and a sentence check.' },
  ] },
  { title: 'Build your knowledge', items: [
    { to: '/grammar', icon: 'grammar', title: 'Grammar', text: 'Understand the patterns, then use them.' },
    { to: '/practice/verbs', icon: 'review', title: 'Conjugation', text: 'Drill any tense, or browse verb tables.' },
    { to: '/practice/sentences', icon: 'sentences', title: 'Sentence builder', text: 'Put words in order or write whole sentences.' },
    { to: '/practice/words', icon: 'book', title: 'Word bank', text: 'Every word, with audio and how well you know it.' },
  ] },
  { title: 'Use the language', items: [
    { to: '/practice/speaking', icon: 'mic', title: 'Speaking', text: 'Say sentences and see which words were understood.' },
    { to: '/practice/listen', icon: 'volume', title: 'Listen mode', text: 'Hands-free audio for a walk or commute.' },
    { to: '/pronunciation', icon: 'volume', title: 'Pronunciation', text: 'How every sound works, with a listening quiz.' },
    { to: '/writing', icon: 'practice', title: 'Writing', text: 'Write your own texts and compare with a model.' },
    { to: '/reading', icon: 'reading', title: 'Reading', text: 'Short graded texts with questions.' },
    { to: '/songs', icon: 'songs', title: 'Songs', text: 'Lyrics line by line, with a gap game.' },
  ] },
  { title: 'Check your level', items: [
    { to: '/exam', icon: 'exam', title: 'Mock exams', text: 'A1, A2 and B1 in the official exam format (not a certificate).' },
  ] },
];

export function Practice() {
  return (
    <div className="page">
      <h1>Practice</h1>
      {GROUPS.map((g) => (
        <section key={g.title} className="practice-group">
          <h2 className="eyebrow">{g.title}</h2>
          <div className="practice-tiles">
            {g.items.map((i) => (
              <Link key={i.to} to={i.to} className="card practice-tile">
                <span className="tile-icon" aria-hidden="true"><Icon name={i.icon} /></span>
                <span><strong>{i.title}</strong><span className="muted small">{i.text}</span></span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
