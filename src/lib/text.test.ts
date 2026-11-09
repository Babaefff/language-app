import { describe, expect, it } from 'vitest';
import { checkAnswer, stripAccents } from './text';

describe('checkAnswer', () => {
  it('accepts exact, accent-less and article-less answers', () => {
    expect(checkAnswer('El perro', 'el perro')).toEqual({ ok: true });
    expect(checkAnswer('adios', 'adiós')).toEqual({ ok: true, accent: true });
    expect(checkAnswer('perro', 'el perro')).toEqual({ ok: true, article: true });
    expect(checkAnswer('que tal', '¿qué tal?')).toEqual({ ok: true, accent: true });
    expect(checkAnswer('gato', 'el perro').ok).toBe(false);
  });
  it('keeps ñ distinct', () => {
    expect(stripAccents('año')).toBe('año');
    expect(checkAnswer('ano', 'año').ok).toBe(false);
  });
  it('flags capitals and accents, and fails them in strict mode', () => {
    expect(checkAnswer('Hola', 'hola')).toEqual({ ok: true });
    expect(checkAnswer('yo me llamo Ana', 'Yo me llamo Ana')).toEqual({ ok: true });
    expect(checkAnswer('me llamo ana', 'Me llamo Ana')).toEqual({ ok: true, letterCase: true });
    expect(checkAnswer('adios', 'adiós', true)).toEqual({ ok: false, accent: true });
    expect(checkAnswer('adiós', 'adiós', true)).toEqual({ ok: true });
    expect(checkAnswer('car', 'caer').ok).toBe(false);
  });
});

describe('equivalent spellings count as the same answer', () => {
  it('treats every apostrophe-like character the same', async () => {
    const { equivalentForm } = await import('./text');
    for (const ap of ['’', '‘', 'ʼ', '´', '`', '”', '“', "'"]) expect(equivalentForm(`s${ap}il`, 'fr')).toBe("s'il");
  });
  it('German: a contracted es is the full word', async () => {
    const { equivalentForm } = await import('./text');
    expect(equivalentForm('Wie geht”s?', 'de')).toBe(equivalentForm('Wie geht es?', 'de'));
    expect(equivalentForm('Gibt’s hier Kaffee?', 'de')).toBe(equivalentForm('Gibt es hier Kaffee?', 'de'));
    expect(equivalentForm("Ich hab' Zeit", 'de')).toBe(equivalentForm('Ich habe Zeit', 'de'));
  });
  it('Russian: ё and е are the same letter', async () => {
    const { equivalentForm } = await import('./text');
    expect(equivalentForm('Всё хорошо, ещё', 'ru')).toBe(equivalentForm('Все хорошо, еще', 'ru'));
  });
});
