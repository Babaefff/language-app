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
