import type { LangId } from './lang';
/** Held-out combinations: not included in lesson examples or ordinary practice. */
export const TRANSFER_CHECKS: Record<LangId, { unitId: string; en: string; answer: string; accept?: string[] }[]> = {
  es: [
    { unitId: 'a1-01', en: 'Good evening, my name is Alex.', answer: 'Buenas noches, me llamo Alex.' },
    { unitId: 'a1-01', en: 'Hello, thank you. See you later.', answer: 'Hola, gracias. Hasta luego.' },
  ],
  de: [
    { unitId: 'de-a1-01', en: 'Good evening, my name is Alex.', answer: 'Guten Abend, ich heiße Alex.', accept: ['Guten Abend, ich heisse Alex.'] },
    { unitId: 'de-a1-01', en: 'Thank you, see you later.', answer: 'Danke, bis später.' },
  ],
  fr: [
    { unitId: 'fr-a1-01', en: 'Good evening, madam. Thank you.', answer: 'Bonsoir, madame. Merci.' },
    { unitId: 'fr-a1-01', en: 'Hello, sir. See you soon.', answer: 'Bonjour, monsieur. À bientôt.' },
  ],
  ru: [
    { unitId: 'ru-a1-01', en: 'Good evening, my name is Alex.', answer: 'Добрый вечер, меня зовут Алекс.' },
    { unitId: 'ru-a1-01', en: 'Thank you, goodbye.', answer: 'Спасибо, до свидания.' },
  ],
};
