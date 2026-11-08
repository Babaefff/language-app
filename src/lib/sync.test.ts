import { afterEach, expect, it, vi } from 'vitest';

const mock = vi.hoisted(() => {
  const select = vi.fn();
  const upsert = vi.fn(async (_row: unknown) => ({ error: null }));
  let listener: (event: string, session: { user: { id: string } } | null) => void;
  const client = {
    auth: {
      onAuthStateChange: vi.fn((cb: typeof listener) => { listener = cb; }),
      getSession: vi.fn(async () => ({ data: { session: null } })),
    },
    from: () => ({ select: () => ({ eq: () => ({ eq: () => ({ maybeSingle: select }) }) }), upsert }),
  };
  return { client, select, upsert, emit: (id: string | null) => listener('SIGNED_IN', id ? { user: { id } } : null) };
});
vi.mock('@supabase/supabase-js', () => ({ createClient: () => mock.client }));
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

it('does not apply an old account response after a different account signs in', async () => {
  vi.stubEnv('VITE_SUPABASE_URL', 'https://example.supabase.co');
  vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_test');
  const memory = new Map<string, string>();
  vi.stubGlobal('localStorage', { getItem: (k: string) => memory.get(k) ?? null,
    setItem: (k: string, v: string) => memory.set(k, v), removeItem: (k: string) => memory.delete(k) });
  vi.stubGlobal('window', { location: { search: '' }, addEventListener: vi.fn() });
  vi.stubGlobal('document', { addEventListener: vi.fn() });
  let resolveAlice!: (value: unknown) => void;
  mock.select.mockImplementationOnce(() => new Promise(resolve => { resolveAlice = resolve; }))
    .mockResolvedValue({ data: null, error: null });
  const { initSync } = await import('./sync');
  const store = await import('./store');
  await initSync();
  store.addXp(77); // Guest activity moves into the first account only, never a later one.
  mock.emit('alice');
  await vi.waitFor(() => expect(mock.select).toHaveBeenCalledTimes(1));
  mock.emit('bob');
  await vi.waitFor(() => expect(mock.upsert).toHaveBeenCalledTimes(1));
  expect(mock.upsert.mock.calls[0][0]).toMatchObject({ user_id: 'bob', data: { xp: {} } });
  resolveAlice({ data: { data: { xp: { secret: 123 } } }, error: null });
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(store.getProgress().xp).toEqual({});
  expect(mock.upsert).toHaveBeenCalledTimes(1);
  mock.emit(null);
  expect(store.getProgress().xp).toEqual({});
  const aliceKey = [...memory.keys()].find(k => k.endsWith(':user:alice'))!;
  expect(Object.values(JSON.parse(memory.get(aliceKey)!).xp)).toEqual([77]);
});
