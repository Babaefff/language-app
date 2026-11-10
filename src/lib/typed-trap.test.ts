import { describe, expect, it, vi } from 'vitest';

describe('typing the answer to a choice question', () => {
  it('accepts the right answer even when a wrong option differs only in capitals', async () => {
    vi.stubEnv('HABLO_LANG', 'de');
    await (await import('../data/load')).loadContent();
    const { typedTrap } = await import('../components/Session');
    const opts = ['Ihre', 'ihre', 'deine'];
    expect(typedTrap(opts, 'Ihre', 'Ihre')).toBeUndefined();
    expect(typedTrap(opts, 'Ihre', ' Ihre ')).toBeUndefined();
    expect(typedTrap(opts, 'Ihre', 'ihre')).toBe('ihre');
    expect(typedTrap(opts, 'Ihre', 'deine')).toBe('deine');
    // Typical mistakes are still caught regardless of capitals when they really differ.
    expect(typedTrap(['fährt', 'fahrt'], 'fährt', 'Fahrt')).toBe('fahrt');
  });
});
