import { describe, expect, it, vi } from 'vitest';

describe('explaining a wrong or missing article', () => {
  it('Spanish: an extra article, a missing one, the wrong one', async () => {
    vi.stubEnv('HABLO_LANG', 'es');
    await (await import('../data/load')).loadContent();
    const { articleHint } = await import('./articles');
    expect(articleHint('No como la carne', 'No como carne.')).toMatch(/No article here/);
    expect(articleHint('Me gusta café', 'Me gusta el café.')).toMatch(/needs the article/);
    expect(articleHint('No como la pescado', 'No como el pescado.')).toMatch(/la → el/);
    // Anything else wrong too: no article explanation.
    expect(articleHint('No bebo la leche', 'No como carne.')).toBeUndefined();
    expect(articleHint('No como carne', 'No como carne.')).toBeUndefined();
  });
});
