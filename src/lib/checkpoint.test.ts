import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { checkpointKey, clearCheckpoints, latestCheckpoint, readCheckpoint, writeCheckpoint } from './checkpoint';
import { accountScope, setAccountScope } from './accountScope';
let memory: Map<string, string>;
beforeEach(() => {
  memory = new Map(); setAccountScope(null);
  vi.stubGlobal('localStorage', { getItem: (k: string) => memory.get(k) ?? null, setItem: (k: string, v: string) => memory.set(k, v), removeItem: (k: string) => memory.delete(k), key: (i: number) => [...memory.keys()][i] ?? null, get length() { return memory.size; } });
});
afterEach(() => vi.unstubAllGlobals());
it('round trips draft answers and scoring sets/maps', () => {
  const key = checkpointKey('/review');
  const fields = { review: { name: 'quiz' }, index: 2, typed: 'un', stats: { retried: new Set(['q1']), firstOk: new Map([['q1', false]]) } };
  writeCheckpoint(key, '/review', fields);expect(readCheckpoint(key)?.fields).toEqual(fields);
});
it('separates routes, query variants, languages, guests and accounts', () => {
  const keys = [checkpointKey('/review'), checkpointKey('/daily'), checkpointKey('/daily?catchup=1'), checkpointKey('/review', null, 'de'), checkpointKey('/review', 'alice'), checkpointKey('/review', 'bob')];
  expect(new Set(keys).size).toBe(keys.length);
  writeCheckpoint(checkpointKey('/review', 'alice'), '/review', { review: { name: 'cards' } });
  expect(latestCheckpoint()).toBeNull();setAccountScope('alice');expect(latestCheckpoint()?.route).toBe('/review');setAccountScope('bob');expect(latestCheckpoint()).toBeNull();
});
it('rejects expired, future-dated, unknown-version, corrupt and oversized checkpoints', () => {
  const key = checkpointKey('/review');writeCheckpoint(key, '/review', {});const raw = memory.get(key)!;
  expect(readCheckpoint(key, Date.now() + 8 * 86400000)).toBeNull();
  for (const patch of [{ version: 99 }, { at: Date.now() + 100000 }, { fields: { index: -100 } }, { route: 'https://example.com' }]) {
    memory.set(key, JSON.stringify({ ...JSON.parse(raw), ...patch }));expect(readCheckpoint(key)).toBeNull();
  }
  memory.set(key, '{');expect(readCheckpoint(key)).toBeNull();memory.set(key, 'x'.repeat(2_000_001));expect(readCheckpoint(key)).toBeNull();
});
it('keeps eight drafts and does not prune another account', () => {
  writeCheckpoint(checkpointKey('/review', 'alice'), '/review', {});
  for (let i = 0; i < 12; i++) writeCheckpoint(checkpointKey(`/unit/${i}`), `/unit/${i}`, { unit: { name: 'learn' } });
  expect(memory.size).toBe(9);expect(readCheckpoint(checkpointKey('/review', 'alice'))).not.toBeNull();
});
it('reset removes only this account and language drafts', () => {
  writeCheckpoint(checkpointKey('/review'), '/review', {});writeCheckpoint(checkpointKey('/review', 'alice'), '/review', {});writeCheckpoint(checkpointKey('/review', null, 'de'), '/review', {});
  clearCheckpoints();expect(memory.size).toBe(2);expect(accountScope.id).toBeNull();
});
it('reports storage failure rather than claiming a saved session', () => {
  localStorage.setItem = () => { throw new Error('Quota exceeded'); };
  expect(() => writeCheckpoint(checkpointKey('/review'), '/review', {})).toThrow('Quota');
});
