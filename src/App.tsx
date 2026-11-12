import { Icon, type IconName } from './components/Icon';
import { Daily } from './pages/Daily';
import { Insights } from './pages/Insights';
import { AdminFeedback, FeedbackThanks, MyFeedback } from './pages/FeedbackPages';
import { Personal } from './pages/Personal';
import { AdminPersonal } from './pages/AdminPersonal';
import { AdminLearner, AdminLearners } from './pages/AdminLearners';
import { usePersonal } from './lib/personal';
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
import { useSync } from './lib/sync';
import { WordTicker } from './components/WordTicker';
import { goalStreak, useProgress, applyShields } from './lib/store';
import { LANG, LANGS, switchLanguage, type LangId } from './data/lang';

const NAV: { to: string; icon: IconName; label: string }[] = [
  { to: '/', icon: 'home', label: 'Home' },
  { to: '/course', icon: 'book', label: 'Course' },
  { to: '/review', icon: 'review', label: 'Review' },
  { to: '/practice', icon: 'practice', label: 'Practice' },
  { to: '/reading', icon: 'reading', label: 'Reading' },
];

const DESKTOP_NAV = [...NAV.slice(0, 2), { to: '/grammar', icon: 'grammar' as const, label: 'Grammar' }, ...NAV.slice(2)];

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Shell() {
  // A missed day is covered by a streak shield, if there is one.
  // Wait a moment so practice synced from another device is counted first.
  useEffect(() => { const t = setTimeout(applyShields, 5000); return () => clearTimeout(t); }, []);
  const p = useProgress();
  const { user } = useSync();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const now = Date.now();
  const due = Object.values(p.cards).filter((c) => c.due <= now).length;
  const st = goalStreak(p);
  // Personal material shows as its own tab, only for the person it was given to.
  const personal = usePersonal(user?.id);
  const mine = personal?.find((s) => s.lang === LANG);
  const mineItem = mine ? [{ to: '/mine', icon: 'heart' as const, label: mine.tabName }] : [];
  const desktopNav = [...DESKTOP_NAV, ...mineItem];
  const mobileNav = [...NAV, ...mineItem];
  return (
    <>
      <ScrollTop />
      <header className="topbar">
        <Link to="/" className="brand">Hablo<span>.</span></Link>
        <nav className="topnav" aria-label="Main navigation">
          {desktopNav.map((n) => (
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
          <span className="streak" title={st.weekly ? 'Week streak' : 'Day streak'} aria-label={st.label}><span className="streak-fire" aria-hidden="true">🔥</span><span>{st.n}{st.weekly ? 'w' : ''}</span></span>
          <AccountButton />
        </div>
      </header>
      <WordTicker />
      <main>
        <FeedbackThanks />
        <ErrorBoundary key={`${pathname}:${user?.id ?? 'guest'}`} onReset={() => navigate('/')}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/progress" element={<Insights />} />
          <Route path="/feedback" element={<MyFeedback />} />
          <Route path="/admin" element={<AdminFeedback />} />
          <Route path="/admin/personal" element={<AdminPersonal />} />
          <Route path="/admin/learners" element={<AdminLearners />} />
          <Route path="/admin/learners/:id" element={<AdminLearner />} />
          <Route path="/mine" element={<Personal />} />
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
      <nav className="bottomnav" aria-label="Mobile navigation">
        {mobileNav.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'}>
            <span className="nav-icon" aria-hidden="true"><Icon name={n.icon} /></span>
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
