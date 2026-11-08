import { setContent } from './content';
import { LANG, type LangId } from './lang';

/** Downloads only the course of the language being studied (each is its own chunk). */
export async function loadContent(lang: LangId = LANG): Promise<void> {
  const m = lang === 'de' ? await import('./content-de') : lang === 'fr' ? await import('./content-fr') : await import('./content-es');
  setContent(m.CONTENT);
}
