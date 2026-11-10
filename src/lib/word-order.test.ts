import { describe, expect, it, vi } from 'vitest';

describe('other correct word orders', () => {
  it('German: the front phrase and the subject swap around the verb', async () => {
    vi.stubEnv('HABLO_LANG', 'de');
    await (await import('../data/load')).loadContent();
    const { otherOrders } = await import('./word-order');
    expect(otherOrders('Im Sommer haben wir draußen übernachtet.')).toContain('Wir haben im Sommer draußen übernachtet.');
    expect(otherOrders('Wir haben im Sommer draußen übernachtet.')).toContain('Im Sommer haben wir draußen übernachtet.');
    expect(otherOrders('Letzte Woche war ich krank.')).toContain('Ich war letzte Woche krank.');
    expect(otherOrders('Ich war letzte Woche krank.')).toContain('Letzte Woche war ich krank.');
    // The participle stays last: no order puts it in the middle.
    expect(otherOrders('Im Sommer haben wir draußen übernachtet.').some((s) => /übernachtet (?!\.)/.test(s))).toBe(false);
    expect(otherOrders('Hallo!')).toEqual([]);
  });
});
