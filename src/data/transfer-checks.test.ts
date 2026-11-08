import { expect, it } from 'vitest';
import { TRANSFER_CHECKS } from './transfer-checks';
import { loadContent } from './load';
import { content } from './content';
import { normalize } from '../lib/text';
import type { LangId } from './lang';

for (const lang of Object.keys(TRANSFER_CHECKS) as LangId[]) {
  it(`${lang}: held-out checks have a prerequisite and are absent from lesson examples`, async () => {
    await loadContent(lang);
    const units = content().units;
    for (const check of TRANSFER_CHECKS[lang]) {
      expect(units.some(u => u.id === check.unitId)).toBe(true);
      expect(units.flatMap(u => u.sentences).some(s => normalize(s.es) === normalize(check.answer))).toBe(false);
    }
  });
}
