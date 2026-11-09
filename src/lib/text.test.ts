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

describe('comfortable Spanish answers', () => {
  it('accepts numbers as digits and an optional subject pronoun', () => {
    expect(checkAnswer('Tengo 25 años.', 'Tengo veinticinco años.').ok).toBe(true);
    expect(checkAnswer('Tengo 31 años.', 'Tengo treinta y un años.').ok).toBe(true);
    expect(checkAnswer('Tengo 21 años.', 'Tengo veintiún años.').ok).toBe(true);
    expect(checkAnswer('Soy estudiante.', 'Yo soy estudiante.').ok).toBe(true);
    expect(checkAnswer('Yo soy estudiante.', 'Soy estudiante.').ok).toBe(true);
    expect(checkAnswer('Él habla español.', 'Ella habla español.').ok).toBe(false);
  });
  it('a one-letter slip: wrong (but "almost") for a word, accepted in a sentence, never a real other form', () => {
    const isWord = (w: string) => ['vas', 'hablas'].includes(w);
    expect(checkAnswer('la biblioteka', 'la biblioteca', false, { typos: true, isWord })).toEqual({ ok: false, nearMiss: true });
    expect(checkAnswer('biblioteka', 'la biblioteca', false, { typos: true, isWord })).toEqual({ ok: false, nearMiss: true });
    expect(checkAnswer('Estudio en la biblioteka.', 'Estudio en la biblioteca.', false, { typos: true, isWord })).toEqual({ ok: true, typo: true });
    expect(checkAnswer('Mañana vas a la playa.', 'Mañana voy a la playa.', false, { typos: true, isWord }).ok).toBe(false);
    expect(checkAnswer('el gado', 'el gato', false, { typos: true, isWord }).ok).toBe(false);
  });
});
