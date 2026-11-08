import { useState } from 'react';
import { L } from '../data/lang';

const KEYS = L.keys;
/** Russian: the standard ЙЦУКЕН layout, for devices without a Russian keyboard. */
const RU_ROWS = ['йцукенгшщзхъ', 'фывапролджэ', 'ячсмитьбюё'];
const STORE = 'hablo:ruKeyboard';

/** onKey receives a character, a space, or '\b' for delete (Russian keyboard only). */
export function AccentKeys({ onKey, disabled }: { onKey: (ch: string) => void; disabled?: boolean }) {
  const [full, setFull] = useState(() => { try { return localStorage.getItem(STORE) === '1'; } catch { return false; } });
  const key = (k: string) => (
    <button key={k} type="button" tabIndex={-1} disabled={disabled} onMouseDown={(e) => e.preventDefault()} onClick={() => onKey(k)}>
      {k}
    </button>
  );
  if (L.id === 'ru') {
    const toggle = () => { const v = !full; setFull(v); try { localStorage.setItem(STORE, v ? '1' : '0'); } catch { /* storage blocked */ } };
    return (
      <div className="accent-keys ru-keys" aria-label="Russian letters">
        {full ? (
          <>
            {RU_ROWS.map((row) => <div key={row} className="ru-row">{[...row].map(key)}</div>)}
            <div className="ru-row">
              <button type="button" tabIndex={-1} disabled={disabled} className="ru-space" onMouseDown={(e) => e.preventDefault()} onClick={() => onKey(' ')}>space</button>
              <button type="button" tabIndex={-1} disabled={disabled} className="ru-back" aria-label="Delete" onMouseDown={(e) => e.preventDefault()} onClick={() => onKey('\b')}>⌫</button>
            </div>
          </>
        ) : <div className="ru-row ru-few">{KEYS.map(key)}</div>}
        <button type="button" tabIndex={-1} className="ru-toggle" onMouseDown={(e) => e.preventDefault()} onClick={toggle}>{full ? 'Hide keyboard' : '⌨ Russian keyboard'}</button>
      </div>
    );
  }
  return <div className="accent-keys" aria-label={`${L.name} characters`}>{KEYS.map(key)}</div>;
}
