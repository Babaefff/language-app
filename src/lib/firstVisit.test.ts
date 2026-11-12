import { describe, expect, it } from 'vitest';
import { isNewDevice } from './firstVisit';

const check = (store: Record<string, string>) => isNewDevice(Object.keys(store), (k) => store[k] ?? null);

describe('welcome only on a brand-new device', () => {
  it('a new device', () => {
    expect(check({})).toBe(true);
    expect(check({ 'hablo:lang': 'ru', 'hablo:progress:ru:v1': JSON.stringify({ version: 1, xp: {}, units: {}, cards: {} }) })).toBe(true);
  });
  it('a signed-in learner whose account is still loading', () => {
    expect(check({ 'sb-abc-auth-token': '{}' })).toBe(false);
  });
  it('progress in another language or account', () => {
    expect(check({ 'hablo:progress:de:v1:user:42': JSON.stringify({ xp: { '2026-11-11': 20 } }) })).toBe(false);
    expect(check({ 'hablo:progress:v1': JSON.stringify({ cards: { hola: {} } }) })).toBe(false);
  });
  it('after the welcome', () => {
    expect(check({ 'hablo:welcomed': '1' })).toBe(false);
  });
});
