import { createContext, useContext, useEffect, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from './Nav';
import { accountScope } from '../lib/accountScope';
import { checkpointKey, readCheckpoint, removeCheckpoint, writeCheckpoint } from '../lib/checkpoint';

interface Store {
  fields: Record<string, unknown>;
  write: (name: string, value: unknown, initialize?: boolean) => void;
  save: () => void;
  pause: () => void;
  finish: () => void;
}
const Context = createContext<Store | null>(null);
const FieldPrefix = createContext('');
export function CheckpointFields({ name, children }: { name: string; children: ReactNode }) {
  return <FieldPrefix.Provider value={name}>{children}</FieldPrefix.Provider>;
}
export function useCheckpoint() { return useContext(Context); }

/** Same-device resume only. Never sync answers or migrate drafts between identities. */
export function CheckpointPage({ children }: { children: ReactNode }) {
  const location = useLocation();
  return <CheckpointPageInner key={location.pathname + location.search} children={children} />;
}
function CheckpointPageInner({ children }: { children: ReactNode }) {
  const location = useLocation();
  const route = location.pathname + location.search;
  const [key] = useState(() => checkpointKey(route));
  const [revision] = useState(accountScope.revision);
  const [initial] = useState(() => readCheckpoint(key));
  const [paused, setPaused] = useState(!!initial);
  const [epoch, setEpoch] = useState(0);
  const [error, setError] = useState(false);
  const active = useRef(!!initial);
  const store = useRef<Store | null>(null);
  if (!store.current) {
    const fields = initial?.fields ?? {};
    const save = () => {
      if (revision !== accountScope.revision) return;
      try { if (active.current) writeCheckpoint(key, route, fields); else removeCheckpoint(key); }
      catch { setError(true); }
    };
    store.current = { fields, save,
      write(name, value, initialize = false) {
        if (revision !== accountScope.revision) return;
        if (['unit', 'review', 'personal', 'daily'].includes(name)) {
          // A new stage gets fresh question/card state; preserved parent state keeps the frozen plan.
          if (!initialize) for (const k of Object.keys(fields)) if (/^(session|learn|flash|answer):/.test(k) || name === 'daily' && k === 'unit') delete fields[k];
          const state = value as { name?: string; index?: number; finished?: boolean };
          active.current = name === 'daily' ? !state.finished && (state.index ?? -1) >= 0 : !['overview', 'menu', 'list', 'done'].includes(state.name ?? '');
          // A completed lesson inside a daily plan must keep the daily stage and its summary.
          if (name === 'unit' && fields.daily) active.current = !(fields.daily as { finished?: boolean }).finished;
        }
        fields[name] = value; save();
      },
      pause() { save(); setPaused(true); },
      finish() { active.current = false; removeCheckpoint(key); },
    };
  }
  useEffect(() => {
    const save = () => store.current?.save();
    window.addEventListener('pagehide', save);
    document.addEventListener('visibilitychange', save);
    return () => { window.removeEventListener('pagehide', save); document.removeEventListener('visibilitychange', save); };
  }, []);
  return <Context.Provider value={store.current}>
    {error && <p role="alert" className="warn">Couldn’t save this session on this device. Keep this tab open.</p>}
    {paused ? <section className="page narrow"><h1>Saved session</h1><p className="muted">Your place and answers are saved on this device.</p><div className="row wrap">
      <button className="btn primary" onClick={() => setPaused(false)}>Resume session</button>
      <button className="btn" onClick={() => { for (const k of Object.keys(store.current!.fields)) delete store.current!.fields[k]; active.current = false; removeCheckpoint(key); setEpoch(e => e + 1); setPaused(false); }}>Start over</button>
      <Link className="link" to="/">Back home</Link>
    </div></section> : <div key={epoch}>{children}</div>}
  </Context.Provider>;
}

export function useCheckpointState<T>(name: string, initial: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  const store = useContext(Context);
  const prefix = useContext(FieldPrefix);
  const key = prefix + name;
  const [value, setValue] = useState<T>(() => Object.hasOwn(store?.fields ?? {}, key) ? store!.fields[key] as T : typeof initial === 'function' ? (initial as () => T)() : initial);
  const current = useRef(value); current.current = value;
  // Initial randomized queues/order must be saved too, before the first answer.
  useEffect(() => { if (store && !Object.hasOwn(store.fields, key)) store.write(key, current.current, true); }, [store, key]);
  const set: Dispatch<SetStateAction<T>> = next => {
    const v = typeof next === 'function' ? (next as (prev: T) => T)(current.current) : next;
    current.current = v; store?.write(key, v); setValue(v);
  };
  return [value, set];
}
