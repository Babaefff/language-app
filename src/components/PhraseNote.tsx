import type { Phrase } from '../data/phrases/types';
import { LANG } from '../data/lang';
import { SpeakButton } from './SpeakButton';
import { Grammar } from './Grammar';

/** "Mir geht es gut = I'm fine · literally: to me it goes well · why." */
export function PhraseNote({ p, compact = false }: { p: Phrase; compact?: boolean }) {
  return (
    <div className={`phrase-note ${compact ? 'compact' : ''}`}>
      <div className="phrase-head">
        <strong lang={LANG}>{p.phrase}</strong> <SpeakButton text={p.phrase} /> <span>= {p.en}</span>
      </div>
      <div className="small"><span className="muted">Literally:</span> “{p.literal}”</div>
      <div className="small muted"><Grammar source={p.note} /></div>
    </div>
  );
}
