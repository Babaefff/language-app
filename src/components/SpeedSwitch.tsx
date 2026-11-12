import { useRef, useState } from 'react';

/** Listening speed for longer audio (reading aloud, listen mode). Slow keeps the voice's pitch. */
export type Speed = 'slower' | 'slow' | 'normal';
const KEY = 'hablo:reading-speed';
/** rate: as in Settings (0.9 = normal); undefined = the speed chosen in Settings. pause: ms after each sentence. */
export const SPEEDS: Record<Speed, { label: string; rate?: number; pause: number }> = {
  slower: { label: '🐢 Slower', rate: 0.55, pause: 900 },
  slow: { label: 'Slow', rate: 0.7, pause: 500 },
  normal: { label: 'Normal', pause: 0 },
};
/** Options for speak() at this speed. */
export const speedOpts = (s: Speed) => (SPEEDS[s].rate ? { rate: SPEEDS[s].rate } : {});

/** The chosen speed (remembered on this device) and a ref for async loops that must read the latest. */
export function useSpeed() {
  const [speed, set] = useState<Speed>(() => { try { const v = localStorage.getItem(KEY); return v === 'slow' || v === 'slower' ? v : 'normal'; } catch { return 'normal'; } });
  const ref = useRef(speed);
  ref.current = speed;
  const setSpeed = (v: Speed) => { set(v); ref.current = v; try { localStorage.setItem(KEY, v); } catch { /* this visit only */ } };
  return { speed, setSpeed, ref };
}

export function SpeedSwitch({ speed, onChange }: { speed: Speed; onChange: (s: Speed) => void }) {
  return (
    <div className="seg speed-seg" role="group" aria-label="Listening speed">
      {(Object.keys(SPEEDS) as Speed[]).map((k) => <button key={k} className={speed === k ? 'on' : ''} aria-pressed={speed === k} onClick={() => onChange(k)}>{SPEEDS[k].label}</button>)}
    </div>
  );
}
