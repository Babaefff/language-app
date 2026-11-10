import { expect, it } from 'vitest';
import { hasCanDo } from './can-do';

it('every topic lesson in every language has a "You can now" statement', async () => {
  const { loadContent } = await import('./load');
  const { content } = await import('./content');
  for (const lang of ['es', 'de', 'fr', 'ru'] as const) {
    await loadContent(lang);
    const missing = content().units.filter(u => !/(^|-)(core|ess|more)-/.test(u.id) && !hasCanDo(u.id)).map(u => u.id);
    expect(missing, lang).toEqual([]);
  }
});
