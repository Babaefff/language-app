import { afterEach, beforeEach, expect, it, vi } from 'vitest';
const fake = vi.hoisted(() => ({ uid: 'alice', pending: null as unknown, writes: [] as Record<string, unknown>[], failOnce: false, entered: null as (() => void) | null, release: null as Promise<void> | null }));
vi.mock('./sync', () => ({ accountsEnabled: true, supabase: async () => ({
  auth: { getSession: async () => ({ data: { session: { user: { id: fake.uid } } } }) },
  from: () => ({
    select: () => ({ eq: async () => ({ data: [{ set_id: 'private-A', tab_name: 'Private A' }] }), in: () => fake.pending }),
    upsert: async (row: Record<string, unknown>, options: unknown) => {
      expect(options).toEqual({ onConflict: 'id', ignoreDuplicates: true });
      fake.writes.push(row); fake.entered?.();
      if (fake.release) await fake.release;
      if (fake.failOnce) { fake.failOnce = false; return { error: { message: 'Failed to fetch' } }; }
      return { error: null };
    },
  }),
}) }));
beforeEach(async () => {
  vi.resetModules(); await (await import('../data/load')).loadContent();
  fake.uid = 'alice'; fake.writes = []; fake.failOnce = false; fake.entered = null; fake.release = null;
  const memory = new Map<string, string>();
  vi.stubGlobal('localStorage', { getItem: (k: string) => memory.get(k) ?? null, setItem: (k: string, v: string) => memory.set(k, v) });
  vi.stubGlobal('navigator', { onLine: true });
  (await import('./accountScope')).setAccountScope('alice');
  (await import('./personal')).setPersonalAccount('alice');
});
afterEach(() => vi.unstubAllGlobals());
it('discards a private response after switching accounts, even before the next React effect', async () => {
  let resolve!: (v: unknown) => void; fake.pending = new Promise(r => { resolve = r; });
  const p = await import('./personal'); const request = p.loadPersonal();
  await new Promise(r => setTimeout(r, 10));
  fake.uid = 'bob'; (await import('./accountScope')).setAccountScope('bob');
  resolve({ data: [{ id: 'private-A', title: 'Private', lang: 'de', content: { lessons: [{ id: 'l', title: 'L', words: [] }], tests: [] } }] });
  expect(await request).toEqual([]);
});
it('serializes simultaneous flushes and migrates legacy IDs before upload', async () => {
  localStorage.setItem('hablo:personal:outbox:alice', JSON.stringify([{ id: 'local-1', set_id: 'set', test_id: 't', score: 1, total: 1, answers: [], created_at: new Date().toISOString() }]));
  const p = await import('./personal'); await Promise.all([p.flushResults(), p.flushResults()]);
  expect(fake.writes).toHaveLength(1); expect(fake.writes[0].id).toMatch(/^[0-9a-f-]{36}$/);
  expect(await p.pendingResults()).toBe(0);
});
it('uses the same server ID after an ambiguous failure', async () => {
  const p = await import('./personal'); fake.failOnce = true;
  expect(await p.saveResult('set', 'test', 1, 1, [])).toBe('queued');
  await p.flushResults(); expect(fake.writes).toHaveLength(2);
  expect(fake.writes[0].id).toBe(fake.writes[1].id); expect(await p.pendingResults()).toBe(0);
});
it('does not drop a new result submitted while a flush is in progress', async () => {
  const p = await import('./personal'); fake.failOnce = true;
  await p.saveResult('set', 'first', 1, 1, []);
  let release!: () => void; fake.release = new Promise<void>(r => { release = r; });
  const entered = new Promise<void>(r => { fake.entered = r; });
  const flush = p.flushResults(); await entered;
  const save = p.saveResult('set', 'second', 1, 1, []); release();
  await Promise.all([flush, save]);
  expect(fake.writes.map(x => x.test_id)).toEqual(['first', 'first', 'second']);
  expect(await p.pendingResults()).toBe(0);
});
it('does not claim queued success when storage cannot save the result', async () => {
  localStorage.setItem = () => { throw new Error('Quota exceeded'); };
  await expect((await import('./personal')).saveResult('set', 'test', 1, 1, [])).rejects.toThrow('Quota');
  expect(fake.writes).toHaveLength(0);
});
it('rejects missing prompts, wrong option types, duplicate IDs and broken translations', async () => {
  const p = await import('./personal');
  const test = { id: 't', title: 'T', questions: [{ type: 'choice', options: ['a', 'b'], answer: 0 }] };
  expect(p.validateContent({ title: 'X', lang: 'de', tests: [test] }).ok).toBe(false);
  test.questions[0] = { ...test.questions[0], q: 'Question' } as typeof test.questions[0];
  expect(p.validateContent({ title: 'X', lang: 'de', tests: [test] }).ok).toBe(true);
  expect(p.validateContent({ title: 'X', lang: 'de', tests: [test, test] }).ok).toBe(false);
  expect(p.validateContent({ title: 'X', lang: 'de', tests: [test], i18n: { et: { strings: { Question: [] } } } }).ok).toBe(false);
  expect(p.validateContent({ title: 'X', lang: 'de', tests: [{ ...test, questions: [{ type: 'choice', q: 'Q', options: ['a', {}], answer: 0 }] }] }).ok).toBe(false);
});
