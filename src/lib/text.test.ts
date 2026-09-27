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
});
