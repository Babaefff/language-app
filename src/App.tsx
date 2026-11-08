import { ExamList, ExamPage } from './pages/Exam';
import { Speaking } from './pages/Speaking';
import { Account } from './pages/Account';
import { AccountButton } from './components/AccountButton';
import { Pronunciation } from './pages/Pronunciation';
import { WritingList, WritingPage } from './pages/Writing';
import { HashRouter, MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Link, NavLink, PREVIEW } from './components/Nav';
import { useEffect } from 'react';
import { Home } from './pages/Home';
import { Course } from './pages/Course';
import { UnitPage } from './pages/UnitPage';
import { Review } from './pages/Review';
import { Practice } from './pages/Practice';
import { Verbs } from './pages/Verbs';
import { Sentences } from './pages/Sentences';
import { Listen } from './pages/Listen';
import { Words } from './pages/Words';
import { Readings, ReadingPage, Songs } from './pages/Reading';
import { Settings } from './pages/Settings';
import { GrammarLessonPage, GrammarList } from './pages/GrammarPage';
import { WordTicker } from './components/WordTicker';
import { streak, useProgress } from './lib/store';
import { LANG, LANGS, switchLanguage, type LangId } from './data/lang';

const NAV = [
  { to: '/', icon: '🏠', label: 'Home' },
  { to: '/course', icon: '🗺️', label: 'Course' },
  { to: '/grammar', icon: '📐', label: 'Grammar' },
  { to: '/review', icon: '🧠', label: 'Review' },
  { to: '/practice', icon: '🎯', label: 'Practice' },
  { to: '/reading', icon: '📖', label: 'Reading' },
  { to: '/songs', icon: '🎵', label: 'Songs' },
];

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Shell() {
  const p = useProgress();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const now = Date.now();
  const due = Object.values(p.cards).filter((c) => c.due <= now).length;
  const days = streak(p.xp);
  return (
    <>
      <ScrollTop />
      <header className="topbar">
        <Link to="/" className="brand">Hablo<span>.</span></Link>
        <nav className="topnav">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'}>
              {n.label}
              {n.to === '/review' && due > 0 && <span className="count">{due}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="row">
          <select
            className="lang-switch"
            aria-label="Language you are learning"
            value={LANG}
            onChange={(e) => switchLanguage(e.target.value as LangId)}
          >
            {Object.values(LANGS).map((l) => (
              <option key={l.id} value={l.id}>{l.flag} {l.name}</option>
            ))}
          </select>
          <span className="streak" title="Day streak">🔥 {days}</span>
          <AccountButton />
        </div>
      </header>
      <WordTicker />
      <main>
        <ErrorBoundary key={pathname} onReset={() => navigate('/')}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={<Course />} />
          <Route path="/unit/:id" element={<UnitPage />} />
          <Route path="/review" element={<Review />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/verbs" element={<Verbs />} />
          <Route path="/practice/sentences" element={<Sentences />} />
          <Route path="/practice/listen" element={<Listen />} />
          <Route path="/practice/words" element={<Words />} />
          <Route path="/reading" element={<Readings />} />
          <Route path="/reading/:id" element={<ReadingPage />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/songs/:id" element={<ReadingPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/practice/speaking" element={<Speaking />} />
          <Route path="/pronunciation" element={<Pronunciation />} />
          <Route path="/writing" element={<WritingList />} />
          <Route path="/writing/:id" element={<WritingPage />} />
          <Route path="/exam" element={<ExamList />} />
          <Route path="/exam/:id" element={<ExamPage />} />
          <Route path="/grammar" element={<GrammarList />} />
          <Route path="/grammar/:id" element={<GrammarLessonPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
        </ErrorBoundary>
      </main>
      <nav className="bottomnav">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'}>
            <span className="nav-icon">{n.icon}</span>
            {n.label}
            {n.to === '/review' && due > 0 && <span className="count">{due}</span>}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

// The preview keeps routes in memory: embedded viewers don't allow hash/URL navigation.
const Router = PREVIEW ? MemoryRouter : HashRouter;

export default function App() {
  return (
    <Router>
      <ErrorBoundary onReset={() => { window.location.hash = '#/'; }}>
        <Shell />
      </ErrorBoundary>
    </Router>
  );
}
