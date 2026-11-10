import { useEffect, useMemo, useState } from 'react';
import { Link } from '../components/Nav';
import { LANG } from '../data/lang';
import { Session, type SessionSummary } from '../components/Session';
import { LearnCards } from '../components/LearnCards';
import { Summary } from '../components/Summary';
import { Grammar } from '../components/Grammar';
import { SpeakButton } from '../components/SpeakButton';
import { WordParts } from '../components/WordParts';
import { stepExercises, type Exercise } from '../lib/exercises';
import { addXp, applyWordResults, completeStep, useProgress } from '../lib/store';
import { strength } from '../lib/srs';
import { useSync } from '../lib/sync';
import { setUiText } from '../lib/ui-text';
import {
  MIXED_ID, clock, drillState, drillTest, lessonUnit, localize, mixedTest, myResults, saveResult, testExercises, usePersonal,
  type PersonalResult, type PersonalSet, type PersonalTest,
} from '../lib/personal';
import type { Unit } from '../data/types';

type Mode =
  | { name: 'list' }
  | { name: 'learn'; unit: Unit }
  | { name: 'quiz'; unit: Unit; step: number; exercises: Exercise[] }
  | { name: 'notes'; unit: Unit }
  | { name: 'test'; set: PersonalSet; test: PersonalTest; exercises: Exercise[]; started: number; drill?: boolean }
  | { name: 'done'; summary: SessionSummary; xp: number; label: string; saved?: string; exam?: { pass: number; passed: boolean; seconds: number; minutes: number }; drill?: boolean };

// ---- Interface language of this tab: English or Estonian -----------------------------------
type UiLang = 'en' | 'et';
const UI_KEY = 'hablo:personal-ui';
const PICK_KEY = 'hablo:personal-material';
const readUi = (): UiLang => { try { return localStorage.getItem(UI_KEY) === 'et' ? 'et' : 'en'; } catch { return 'en'; } };
const saveUi = (v: UiLang) => { try { localStorage.setItem(UI_KEY, v); } catch { /* private mode: just this visit */ } };

/** Estonian for this tab and for the exercise screens it opens. */
const ET: Record<string, string> = {
  // this page
  'Learn the words': 'Õpi sõnu', Practise: 'Harjuta', Sentences: 'Laused', Lessons: 'Tunnid', Tests: 'Testid', 'Mock exams': 'Proovieksamid',
  Start: 'Alusta', 'Practise again': 'Harjuta uuesti', 'Continue:': 'Jätka:', 'Word list': 'Sõnade nimekiri', words: 'sõna', sentences: 'lauset',
  known: 'selgeks õpitud', questions: 'küsimust', min: 'min', pass: 'läbimiseks', best: 'parim', try: 'katse', tries: 'katset', 'passed': 'sooritatud',
  'Start the test': 'Alusta testi', 'Start the exam': 'Alusta eksamit', 'Take it again': 'Tee uuesti', 'Mixed test': 'Segatest',
  '20 questions from all lessons, different every time': '20 küsimust kõigist tundidest, iga kord erinevad', last: 'viimati',
  'Start a mixed test': 'Alusta segatesti', 'To look at again': 'Vaata üle', you: 'sina', 'Your result is saved.': 'Sinu tulemus on salvestatud.',
  'Couldn’t save the result:': 'Tulemust ei õnnestunud salvestada:', Notes: 'Selgitus', 'Start exercises': 'Alusta harjutusi', Back: 'Tagasi',
  'Passed ✓': 'Sooritatud ✓', 'Not passed yet': 'Veel mitte sooritatud', 'pass mark': 'läbimise piir', time: 'aeg', of: '/', 'over time': 'aeg ületatud',
  'Go through the answers below, practise those lessons again, then retry.': 'Vaata allolevad vastused läbi, harjuta neid tunde uuesti ja proovi siis veel kord.',
  'Word drill': 'Sõnaharjutus', 'Danger words': 'Ohtlikud sõnad',
  '10 words at a time. A wrong word comes back until you get it right.': '10 sõna korraga. Vale sõna tuleb tagasi, kuni vastad õigesti.',
  'words known': 'sõna selgeks õpitud', 'Next 10 words': 'Järgmised 10 sõna', 'Practise danger words': 'Harjuta ohtlikke sõnu',
  'Words you got wrong 3 times or more. They leave this list when you get them right twice in a row.': 'Sõnad, millega eksisid 3 või enam korda. Need lähevad nimekirjast ära, kui vastad kaks korda järjest õigesti.',
  'All words known — well done! Practise again to keep them fresh.': 'Kõik sõnad on selged – tubli! Harjuta uuesti, et need meelde jääksid.',
  'mistakes': 'viga', 'Language': 'Keel', time_left: 'jäänud', "time's up": 'aeg on läbi',
  // exercise screens
  'Write in German': 'Kirjuta saksa keeles', 'What does this mean?': 'Mida see tähendab?', 'Choose the German': 'Vali saksakeelne vaste',
  'Choose the right word': 'Vali õige sõna', 'Choose the answer': 'Vali vastus', 'Now write it yourself in German': 'Nüüd kirjuta ise saksa keeles',
  'Build the sentence in German': 'Pane lause saksa keeles kokku', 'Type it in German': 'Kirjuta saksa keeles', 'Type the missing word': 'Kirjuta puuduv sõna',
  'Type what you hear': 'Kirjuta, mida kuuled', 'Type in German…': 'Kirjuta saksa keeles…', 'Say it in German': 'Ütle saksa keeles',
  Correct: 'Õige', Almost: 'Peaaegu', 'Partly correct': 'Osaliselt õige', Incorrect: 'Vale', 'Correct answer:': 'Õige vastus:',
  'Saved for review.': 'Salvestatud kordamiseks.', 'Why?': 'Miks?', Continue: 'Jätka', Check: 'Kontrolli', Clear: 'Tühjenda',
  'Type the answer instead': 'Kirjuta vastus hoopis ise', 'Tap the words below…': 'Puuduta allolevaid sõnu…',
  'Show word meanings': 'Näita sõnade tähendusi', 'Hide word meanings': 'Peida sõnade tähendused',
  'One small slip in the spelling — the rest is right.': 'Üks väike kirjaviga – muu on õige.',
  'Almost — just one letter off. Look at the spelling and it’ll come back soon.': 'Peaaegu – ainult üks täht on vale. Vaata kirjapilti, see sõna tuleb varsti tagasi.',
  'Watch the special letters (ä ö ü ß).': 'Pane tähele erilisi tähti (ä ö ü ß).',
  'Watch the capitals: nouns and Sie start with a capital letter.': 'Pane tähele suurtähti: nimisõnad ja Sie algavad suure tähega.',
  'Remember the article.': 'Ära unusta artiklit (der/die/das).', 'is the typical mistake here.': 'on siin tüüpiline viga.', 'Also right:': 'Samuti õige:',
  'New word': 'Uus sõna', Next: 'Edasi', 'Start quiz': 'Alusta harjutust', accuracy: 'täpsus', 'first try': 'esimesel katsel',
  'Excellent work!': 'Suurepärane!', 'Nice progress!': 'Hea edasiminek!', 'Good effort — this is how it sticks.': 'Hea töö – nii jääb meelde.',
};

/** The learner's own tab ("Mu kalli jaoks"): lessons and tests made from their own material. */
export function Personal() {
  const { user } = useSync();
  const sets = usePersonal(user?.id);
  const p = useProgress();
  const [mode, setMode] = useState<Mode>({ name: 'list' });
  const [results, setResults] = useState<PersonalResult[]>([]);
  const [ui, setUi] = useState<UiLang>(readUi);
  // Several materials (e.g. one per chapter): one is shown at a time, with a switch at the top.
  const [pick, setPick] = useState<string | null>(() => { try { return localStorage.getItem(PICK_KEY); } catch { return null; } });
  useEffect(() => { if (user) void myResults().then(setResults); }, [user, mode.name]);
  // The exercise screens follow this tab's language while it is open, and go back to English after.
  useEffect(() => { setUiText(ui === 'et' ? ET : null); return () => setUiText(null); }, [ui]);
  const raw = useMemo(() => (sets ?? []).filter((s) => s.lang === LANG).sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true })), [sets]);
  const hasEt = raw.some((s) => s.content.i18n?.et);
  const mine = useMemo(() => raw.map((s) => (ui === 'et' ? { ...s, content: localize(s.content, 'et') } : s)), [raw, ui]);
  const tr = (s: string) => (ui === 'et' ? ET[s] ?? s : s);
  const STEP_NAMES = ['Learn the words', 'Practise', 'Sentences'].map(tr);

  if (!user) return <div className="page narrow"><p>Sign in to see your personal lessons.</p><Link className="btn primary" to="/account">Sign in</Link></div>;
  if (sets === null) return <div className="page narrow"><p className="muted">Loading…</p></div>;
  if (!mine.length) return <div className="page narrow"><h1>Personal lessons</h1><p className="muted">There’s nothing here for this language yet.</p></div>;

  const back = () => setMode({ name: 'list' });
  const finishStep = (unit: Unit, step: number, s: SessionSummary) => {
    const score = Math.round((s.correct / Math.max(1, s.total)) * 100);
    const xp = s.correct + 10;
    applyWordResults(s.words, s.close);
    completeStep(unit.id, step, score, unit.sentences.length ? 3 : 2);
    addXp(xp);
    setMode({ name: 'done', summary: s, xp, label: `${unit.title} · ${STEP_NAMES[step]}` });
  };
  const start = (unit: Unit, step: number) => {
    if (step === 0) return setMode({ name: 'learn', unit });
    if (step === 2) return setMode({ name: 'notes', unit });
    setMode({ name: 'quiz', unit, step, exercises: stepExercises(unit, step, []) });
  };
  const startTest = (set: PersonalSet, t: PersonalTest, drill = false) => setMode({ name: 'test', set, test: t, exercises: testExercises(t), started: Date.now(), drill });

  if (mode.name === 'learn') return <LearnCards words={mode.unit.words} onExit={back} onDone={() => setMode({ name: 'quiz', unit: mode.unit, step: 0, exercises: stepExercises(mode.unit, 0) })} />;
  if (mode.name === 'quiz') return <Session title={`${mode.unit.title} · ${STEP_NAMES[mode.step]}`} exercises={mode.exercises} onExit={back} onFinish={(s) => finishStep(mode.unit, mode.step, s)} />;
  if (mode.name === 'notes') {
    return (
      <div className="page narrow">
        <button className="link" onClick={back}>← {mine[0].tabName}</button>
        {mode.unit.grammar && <div className="card"><span className="tag">{tr('Notes')}</span><Grammar source={mode.unit.grammar} /></div>}
        <div className="page-actions"><button className="btn primary" onClick={() => setMode({ name: 'quiz', unit: mode.unit, step: 2, exercises: stepExercises(mode.unit, 2) })}>{tr('Start exercises')}</button></div>
      </div>
    );
  }
  if (mode.name === 'test') {
    const { test: t } = mode;
    return (
      <>
        {t.exam && <ExamClock started={mode.started} minutes={t.exam.minutes} tr={tr} />}
        <Session test={!mode.drill} untilRight={mode.drill} title={t.title} exercises={mode.exercises} onExit={back} onFinish={async (s) => {
          const xp = s.correct * 2 + 5;
          addXp(xp);
          const seconds = Math.round((Date.now() - mode.started) / 1000);
          let saved = tr('Your result is saved.');
          // A drill round counts the words once each (its answers list every attempt).
          const total = mode.drill ? t.questions.length : Math.max(1, s.total);
          try { await saveResult(mode.set.id, t.id, Math.min(s.correct, total), total, s.answers ?? [], seconds); } catch (e) { saved = `${tr('Couldn’t save the result:')} ${e instanceof Error ? e.message : e}`; }
          const pct = Math.round((s.correct / Math.max(1, s.total)) * 100);
          setMode({ name: 'done', summary: s, xp, label: t.title, saved, drill: mode.drill, exam: t.exam && { pass: t.exam.pass, passed: pct >= t.exam.pass, seconds, minutes: t.exam.minutes } });
        }} />
      </>
    );
  }
  if (mode.name === 'done') {
    // A drill lists every attempt: show each word once, with the wrong tries.
    const seen = new Set<string>();
    const wrong = (mode.summary.answers ?? []).filter((a) => !a.ok && !seen.has(a.expected) && seen.add(a.expected));
    return (
      <div className="page narrow">
        {mode.exam && (
          <section className={`card exam-verdict ${mode.exam.passed ? 'pass' : 'fail'}`}>
            <h2>{tr(mode.exam.passed ? 'Passed ✓' : 'Not passed yet')}</h2>
            <p>{Math.round((mode.summary.correct / Math.max(1, mode.summary.total)) * 100)}% · {tr('pass mark')} {mode.exam.pass}% · {tr('time')} {clock(mode.exam.seconds)} {tr('of')} {mode.exam.minutes}:00{mode.exam.seconds > mode.exam.minutes * 60 ? ` (${tr('over time')})` : ''}</p>
            {!mode.exam.passed && <p className="small muted">{tr('Go through the answers below, practise those lessons again, then retry.')}</p>}
          </section>
        )}
        <Summary summary={mode.summary} xp={mode.xp} onDone={back} doneLabel={tr('Back')} />
        {mode.saved && <p className="small muted center-text">{mode.saved}</p>}
        {wrong.length > 0 && (
          <section className="card">
            <h3>{tr('To look at again')}</h3>
            <ul className="answer-list">{wrong.map((a, i) => <li key={i}><span className="muted">{a.q}</span> → <strong lang={LANG}>{a.expected}</strong>{a.given && <span className="bad-text"> ({tr('you')}: {a.given})</span>}</li>)}</ul>
          </section>
        )}
      </div>
    );
  }

  const shown = mine.find((s) => s.id === pick) ?? mine[mine.length - 1];
  const tries = (n: number) => `${n} ${tr(n === 1 ? 'try' : 'tries')}`;
  return (
    <div className="page">
      {mine.length > 1 && (
        <nav className="material-tabs" aria-label="Materials">
          {mine.map((s) => <button key={s.id} className={s.id === shown.id ? 'on' : ''} aria-pressed={s.id === shown.id} onClick={() => { setPick(s.id); try { localStorage.setItem(PICK_KEY, s.id); } catch { /* just this visit */ } }}>{s.title.split(/\s[–-]\s/).pop()}</button>)}
        </nav>
      )}
      {[shown].map((set) => {
        const drill = drillState(set.content, results, set.id);
        const knownN = drill.filter((w) => w.known).length;
        const danger = drill.filter((w) => w.danger);
        return (
          <div key={set.id} className="personal-set">
            <div className="row personal-head">
              <div><h1>{set.tabName}</h1><p className="muted">{set.title}</p></div>
              {hasEt && (
                <div className="seg" role="group" aria-label={tr('Language')}>
                  <button className={ui === 'en' ? 'on' : ''} aria-pressed={ui === 'en'} onClick={() => { setUi('en'); saveUi('en'); }}>English</button>
                  <button className={ui === 'et' ? 'on' : ''} aria-pressed={ui === 'et'} onClick={() => { setUi('et'); saveUi('et'); }}>Eesti</button>
                </div>
              )}
            </div>

            <section className="card drill-card">
              <h3>🎯 {tr('Word drill')}</h3>
              <p className="small muted">{tr('10 words at a time. A wrong word comes back until you get it right.')}</p>
              <div className="drill-bar" aria-hidden="true"><div style={{ width: `${Math.round((knownN / Math.max(1, drill.length)) * 100)}%` }} /></div>
              <p className="small"><strong>{knownN}</strong> / {drill.length} {tr('words known')}</p>
              {knownN === drill.length && <p className="small">{tr('All words known — well done! Practise again to keep them fresh.')}</p>}
              <div className="row wrap">
                <button className="btn primary" onClick={() => startTest(set, { ...drillTest(drill), title: tr('Word drill') }, true)}>{tr('Next 10 words')}</button>
                {danger.length > 0 && <button className="btn danger-btn" onClick={() => startTest(set, { ...drillTest(drill, true), title: tr('Danger words') }, true)}>⚠️ {tr('Practise danger words')} ({danger.length})</button>}
              </div>
              {danger.length > 0 && (
                <details className="danger-list">
                  <summary className="small">⚠️ {tr('Danger words')} ({danger.length})</summary>
                  <p className="small muted">{tr('Words you got wrong 3 times or more. They leave this list when you get them right twice in a row.')}</p>
                  <ul className="word-list">{danger.map((w) => <li key={w.de}><span lang={LANG} className="es">{w.de}</span><span className="muted">{w.en} · {w.wrong} {tr('mistakes')}</span><SpeakButton text={w.de} /></li>)}</ul>
                </details>
              )}
            </section>

            {set.content.lessons.length > 0 && <h2 className="eyebrow">{tr('Lessons')}</h2>}
            <div className="grid-2">
              {set.content.lessons.map((l) => {
                const unit = lessonUnit(set, l);
                const steps = unit.sentences.length ? 3 : 2;
                const done = Array.from({ length: steps }, (_, i) => p.steps[`${unit.id}:${i}`] !== undefined);
                const next = done.findIndex((d) => !d);
                const known = unit.words.filter((w) => strength(p.cards[w.id]) === 'known').length;
                return (
                  <section key={l.id} className="card personal-lesson">
                    <div className="row"><span className="unit-emoji">{unit.emoji}</span><div><h3>{unit.title}</h3><span className="muted small" lang={LANG}>{unit.titleEs !== unit.title ? unit.titleEs : ''}</span></div></div>
                    <p className="small muted">{unit.words.length} {tr('words')}{unit.sentences.length ? ` · ${unit.sentences.length} ${tr('sentences')}` : ''}{known ? ` · ${known} ${tr('known')}` : ''}</p>
                    <div className="steps-dots">{STEP_NAMES.slice(0, steps).map((n, i) => <button key={n} className={`chip ${done[i] ? 'on' : ''}`} onClick={() => start(unit, i)}>{done[i] ? '✓' : i + 1} {n}</button>)}</div>
                    <button className="btn primary" onClick={() => start(unit, next === -1 ? 1 : next)}>{next === -1 ? tr('Practise again') : done.some(Boolean) ? `${tr('Continue:')} ${STEP_NAMES[next]}` : tr('Start')}</button>
                    <details><summary className="small">{tr('Word list')}</summary>
                      <ul className="word-list">{unit.words.map((w) => <li key={w.id}><span lang={LANG} className="es">{w.es}</span><span className="muted">{w.en}</span><SpeakButton text={w.es} /></li>)}</ul>
                      {ui === 'en' && unit.words.map((w) => <WordParts key={w.id} word={w} compact />)}
                    </details>
                  </section>
                );
              })}
            </div>

            {set.content.tests.length > 0 && (() => {
              const mineR = results.filter((r) => r.set_id === set.id && r.test_id === MIXED_ID);
              const last = mineR[0];
              return (
                <section className="card mixed-card">
                  <h3>🔀 {tr('Mixed test')}</h3>
                  <p className="small muted">{tr('20 questions from all lessons, different every time')}{last ? ` · ${tr('last')} ${Math.round((last.score / last.total) * 100)}% (${tries(mineR.length)})` : ''}</p>
                  <button className="btn primary" onClick={() => startTest(set, { ...mixedTest(set.content), title: tr('Mixed test') })}>{tr('Start a mixed test')}</button>
                </section>
              );
            })()}

            {(['exam', 'test'] as const).map((kind) => {
              const list = set.content.tests.filter((t) => (kind === 'exam') === !!t.exam);
              if (!list.length) return null;
              return (
                <div key={kind}>
                  <h2 className="eyebrow">{tr(kind === 'exam' ? 'Mock exams' : 'Tests')}</h2>
                  <div className="grid-2">
                    {list.map((t) => {
                      const mineR = results.filter((r) => r.set_id === set.id && r.test_id === t.id);
                      const best = mineR.reduce((b, r) => Math.max(b, Math.round((r.score / r.total) * 100)), -1);
                      return (
                        <section key={t.id} className="card">
                          <h3>{t.title}</h3>
                          <p className="small muted">
                            {t.questions.length} {tr('questions')}{t.exam ? ` · ${t.exam.minutes} ${tr('min')} · ${tr('pass')} ${t.exam.pass}%` : ''}
                            {best >= 0 ? ` · ${tr('best')} ${best}%${t.exam && best >= t.exam.pass ? ` ✓ ${tr('passed')}` : ''} (${tries(mineR.length)})` : ''}
                          </p>
                          <button className="btn primary" onClick={() => startTest(set, t)}>{best >= 0 ? tr('Take it again') : tr(t.exam ? 'Start the exam' : 'Start the test')}</button>
                        </section>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/** The time left in a mock exam. It keeps counting past zero, so the result shows "over time". */
function ExamClock({ started, minutes, tr }: { started: number; minutes: number; tr: (s: string) => string }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const left = minutes * 60 - Math.round((now - started) / 1000);
  const leftWord = tr('time_left') === 'time_left' ? 'left' : tr('time_left');
  return <div className={`exam-clock ${left <= 60 ? 'low' : ''}`} role="timer" aria-live="off">{left >= 0 ? `⏱ ${clock(left)} ${leftWord}` : `⏱ ${tr("time's up")} (+${clock(-left)})`}</div>;
}

