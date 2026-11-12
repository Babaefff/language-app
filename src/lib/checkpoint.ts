import { LANG } from '../data/lang';
import { accountScope } from './accountScope';

const PREFIX = 'hablo:session:v1:';
const MAX_AGE = 7 * 86400000;
const MAX_BYTES = 2_000_000;
export interface Checkpoint { version: 1; at: number; route: string; fields: Record<string, unknown>; checksum: number }
export const checkpointKey = (route: string, owner = accountScope.id, lang = LANG) => `${PREFIX}${encodeURIComponent(owner ?? 'guest')}:${lang}:${encodeURIComponent(route)}`;
const encode = (_key: string, value: unknown) => value instanceof Set ? { $set: [...value] } : value instanceof Map ? { $map: [...value] } : value;
function decode(key: string, value: unknown): unknown {
  if (['__proto__', 'constructor', 'prototype'].includes(key)) return undefined;
  if (value && typeof value === 'object') {
    const v = value as Record<string, unknown>;
    if (Object.keys(v).length === 1 && Array.isArray(v.$set)) return new Set(v.$set);
    if (Object.keys(v).length === 1 && Array.isArray(v.$map) && v.$map.every(x => Array.isArray(x) && x.length === 2)) return new Map(v.$map as [unknown, unknown][]);
  }
  return value;
}
const hash = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; };
export function readCheckpoint(key: string, now = Date.now()): Checkpoint | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    if (raw.length > MAX_BYTES) throw new Error('Too large');
    const v = JSON.parse(raw);
    if (v.version !== 1 || !Number.isFinite(v.at) || now - v.at > MAX_AGE || v.at > now + 60000 || typeof v.route !== 'string' || !/^\/(unit\/[^/?#]+|review|mine|daily)(\?[^#]*)?$/.test(v.route) || !v.fields || typeof v.fields !== 'object' || Array.isArray(v.fields) || hash(JSON.stringify(v.fields)) !== v.checksum) throw new Error('Invalid checkpoint');
    return JSON.parse(raw, decode) as Checkpoint;
  } catch { try { localStorage.removeItem(key); } catch { /* unavailable */ } return null; }
}
export function writeCheckpoint(key: string, route: string, fields: Record<string, unknown>) {
  const encoded = JSON.stringify(fields, encode);
  const raw = JSON.stringify({ version: 1, at: Date.now(), route, fields: JSON.parse(encoded), checksum: hash(encoded) });
  if (raw.length > MAX_BYTES) throw new Error('Session exceeds local storage limit');
  // Keep a bounded number of drafts for this account and language.
  const prefix = key.slice(0, key.lastIndexOf(':') + 1);
  const others: { key: string; at: number }[] = [];
  for (const k of Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i))) {
    if (k && k !== key && k.startsWith(prefix)) { const v = readCheckpoint(k); if (v) others.push({ key: k, at: v.at }); }
  }
  for (const v of others.sort((a, b) => b.at - a.at).slice(7)) removeCheckpoint(v.key);
  localStorage.setItem(key, raw);
}
export function removeCheckpoint(key: string) { try { localStorage.removeItem(key); } catch { /* unavailable */ } }
export function latestCheckpoint(): Checkpoint | null {
  try {
    const prefix = checkpointKey('');
    const found: Checkpoint[] = [];
    for (const key of Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i))) {
      if (key?.startsWith(prefix)) { const saved = readCheckpoint(key); if (saved) found.push(saved); }
    }
    return found.sort((a, b) => b.at - a.at)[0] ?? null;
  } catch { return null; }
}

export function clearCheckpoints() {
  try {
    const prefix = checkpointKey('');
    const keys = Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i));
    for (const key of keys) if (key?.startsWith(prefix)) removeCheckpoint(key);
  } catch { /* unavailable */ }
}
