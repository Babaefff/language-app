import { afterEach, beforeEach, expect, it, vi } from 'vitest';
const fake = vi.hoisted(() => ({ paused: false, error: false, pushes: vi.fn(async (_row: unknown) => ({ error: null })), rpc: vi.fn(), events: {} as Record<string, () => void> }));
vi.mock('@supabase/supabase-js', () => ({ createClient: () => ({
  auth: { onAuthStateChange: vi.fn(), getSession: async () => ({ data: { session: { user: { id: 'alice' } } } }) },
  rpc: fake.rpc,
  from: () => ({ select: () => ({ eq: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }) }) }), upsert: fake.pushes }),
}) }));
beforeEach(() => {
  vi.resetModules(); vi.useFakeTimers(); fake.paused = false; fake.error = false; fake.pushes.mockClear(); fake.rpc.mockReset(); fake.events = {};
  fake.rpc.mockImplementation(async (name: string, args: unknown) => {
    if (name === 'delete_cloud_progress') { expect(args).toEqual({ expected_user: 'alice' }); if (fake.error) return { error: { message: 'Migration missing' } }; fake.paused = true; }
    if (name === 'resume_cloud_progress') { expect(args).toEqual({ expected_user: 'alice' }); fake.paused = false; }
    return { data: name === 'cloud_progress_paused' ? fake.paused : null, error: null };
  });
  vi.stubEnv('VITE_SUPABASE_URL', 'https://example.supabase.co');vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_test');
  const m = new Map<string, string>();vi.stubGlobal('localStorage', { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => m.set(k, v), removeItem: (k: string) => m.delete(k) });
  vi.stubGlobal('window', { location: { search: '' }, addEventListener: (name: string, cb: () => void) => { fake.events[name] = cb; } });
  vi.stubGlobal('document', { visibilityState: 'hidden', addEventListener: (name: string, cb: () => void) => { fake.events[name] = cb; } });
  vi.stubGlobal('navigator', { onLine: true });
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
it('cancels queued uploads and does not resurrect progress on focus, then resumes explicitly', async () => {
  const sync = await import('./sync');const store = await import('./store');await sync.initSync();expect(fake.pushes).toHaveBeenCalledTimes(1);
  store.addXp(4);await sync.deleteCloudData();store.addXp(5);await vi.advanceTimersByTimeAsync(61000);fake.events.focus();fake.events.visibilitychange();await vi.advanceTimersByTimeAsync(1);
  expect(fake.pushes).toHaveBeenCalledTimes(1);expect(Object.values(store.getProgress().xp)).toContain(9);
  await sync.resumeCloudProgress();expect(fake.pushes).toHaveBeenCalledTimes(2);
});
it('respects a server pause after reopening the app', async () => {
  fake.paused = true;const sync = await import('./sync');await sync.initSync();
  (await import('./store')).addXp(4);await vi.advanceTimersByTimeAsync(4000);expect(fake.pushes).not.toHaveBeenCalled();
});
it('reports failed deletion without falling back to an unsafe DELETE', async () => {
  const sync = await import('./sync');await sync.initSync();fake.error = true;
  await expect(sync.deleteCloudData()).rejects.toThrow('not deleted');expect(fake.paused).toBe(false);
  (await import('./store')).addXp(4);await vi.advanceTimersByTimeAsync(4000);expect(fake.pushes).toHaveBeenCalledTimes(1);
});
