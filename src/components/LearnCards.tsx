import { useCheckpoint, useCheckpointState } from './Checkpoint';
import { WordParts } from './WordParts';
import { phrasesIn } from '../lib/phrases';
import { PhraseNote } from './PhraseNote';
import { Icon } from './Icon';
import { LANG } from '../data/lang';
import { useEffect } from 'react';
import type { Word } from '../data/types';
import { speak } from '../lib/speech';
import { getProgress } from '../lib/store';
import { t } from '../lib/ui-text';
import { SpeakButton } from './SpeakButton';

/** Introduces new words one at a time with audio before they are quizzed. */
export function LearnCards({ words, onDone, onExit }: { words: Word[]; onDone: () => void; onExit: () => void }) {
  const checkpoint = useCheckpoint();
  const [i, setI] = useCheckpointState('learn:index', 0);
  const w = words[i];
  useEffect(() => {
    if (w && getProgress().settings.autoplay) speak(w.es);
  }, [w]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof Element && e.target.closest('button, input, textarea, select, a')) return;
      if (e.key === 'ArrowRight' || e.key === 'Enter') i + 1 < words.length ? setI(i + 1) : onDone();
      if (e.key === 'ArrowLeft') setI(Math.max(0, i - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
  if (!w) return null;
  return (
    <div className="session">
      <div className="session-top">
        <button className="icon-btn" onClick={checkpoint?.pause ?? onExit} aria-label="Exit"><Icon name="close" /></button>
        <div className="bar"><div style={{ width: `${(i / words.length) * 100}%` }} /></div>
        <span className="muted small">{i + 1}/{words.length}</span>
      </div>
      <div className="session-body">
        <p className="ex-label">{t('New word')}</p>
        <div className="learn-card" key={w.id}>
          <div className="learn-es" lang={LANG}>{w.es}</div>
          <div className="row center">
            <SpeakButton text={w.es} />
          </div>
          <div className="learn-en">{w.en}</div>
          <WordParts word={w} />
          {w.ex && (
            <div className="learn-ex">
              <div lang={LANG}>{w.ex} <SpeakButton text={w.ex} /></div>
              <div className="muted">{w.exEn}</div>
              {phrasesIn(w.ex).map((ph) => <PhraseNote key={ph.phrase} p={ph} compact />)}
            </div>
          )}
        </div>
      </div>
      <div className="row between session-foot">
        <button className="btn" disabled={i === 0} onClick={() => setI(i - 1)}>{t('Back')}</button>
        {i + 1 < words.length ? (
          <button className="btn primary" onClick={() => setI(i + 1)}>{t('Next')}</button>
        ) : (
          <button className="btn primary" onClick={onDone}>{t('Start quiz')}</button>
        )}
      </div>
    </div>
  );
}
