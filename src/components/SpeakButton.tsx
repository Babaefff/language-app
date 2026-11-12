import { Icon } from './Icon';
import { useState } from 'react';
import { speak } from '../lib/speech';

/**
 * Listen button. By default a 🐢 slow button comes with it (slower, same pitch), so every text can
 * be heard slowly; `single` shows just one (tight spots such as verb tables).
 */
export function SpeakButton({ text, slow, single, label, className = '' }: { text: string; slow?: boolean; single?: boolean; label?: string; className?: string }) {
  if (!slow && !single) {
    return (
      <span className="speak-pair">
        <OneButton text={text} label={label} className={className} />
        <OneButton text={text} slow />
      </span>
    );
  }
  return <OneButton text={text} slow={slow} label={label} className={className} />;
}

function OneButton({ text, slow, label, className = '' }: { text: string; slow?: boolean; label?: string; className?: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <button
      type="button"
      className={`speak ${playing ? 'playing' : ''} ${className}`}
      aria-label={label ?? `${slow ? 'Listen slowly' : 'Listen'}: ${text}`}
      title={slow ? 'Listen slowly' : 'Listen'}
      onClick={(e) => {
        e.stopPropagation();
        setPlaying(true);
        speak(text, slow ? { rate: 0.6 } : {}).then(() => setPlaying(false));
      }}
    >
      {slow ? <span className="speak-slow" aria-hidden="true">🐢</span> : <Icon name="volume" size={18} />}
    </button>
  );
}
