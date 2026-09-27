import { useState } from 'react';
import { speak } from '../lib/speech';

export function SpeakButton({ text, slow, label, className = '' }: { text: string; slow?: boolean; label?: string; className?: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <button
      type="button"
      className={`speak ${playing ? 'playing' : ''} ${className}`}
      aria-label={label ?? `Listen: ${text}`}
      title={slow ? 'Listen slowly' : 'Listen'}
      onClick={(e) => {
        e.stopPropagation();
        setPlaying(true);
        speak(text, slow ? { rate: 0.6 } : {}).then(() => setPlaying(false));
      }}
    >
      {slow ? '🐢' : '🔊'}
    </button>
  );
}
