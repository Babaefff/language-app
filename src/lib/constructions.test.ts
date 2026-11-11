import { describe, expect, it, vi } from 'vitest';

// Constructions that must always be explained in the lesson before a sentence uses them.
const SAMPLES: Record<string, [string, string][]> = {
  es: [['Trabajo de lunes a viernes.', 'de … a …'], ['Vivo aquí desde hace dos años.', 'desde hace + time'], ['Llegué hace dos días.', 'hace + time'], ['Juego al fútbol.', 'jugar al …'], ['Estoy comiendo.', 'estar + -ando / -iendo']],
  de: [['Ich arbeite von Montag bis Freitag.', 'von … bis …'], ['Ich wohne seit zwei Jahren hier.', 'seit + time'], ['Wir treffen uns um acht Uhr.', 'um … Uhr'], ['Mir ist kalt.', 'Mir ist kalt.']],
  fr: [['Je travaille du lundi au vendredi.', 'de … à …'], ['J’habite ici depuis deux ans.', 'depuis + time'], ['Je ne mange jamais de viande.', 'ne … jamais / plus / rien'], ['Je joue au foot.', 'jouer au … / jouer du …']],
  ru: [['Я работаю с понедельника до пятницы.', 'с … до …'], ['Я говорю по-русски.', 'по-русски'], ['Два года назад я жил в Москве.', '… назад']],
};

describe('constructions and accents are explained', () => {
  for (const lang of Object.keys(SAMPLES)) {
    it(`${lang}: common constructions are found in sentences`, async () => {
      vi.resetModules();
      vi.stubEnv('HABLO_LANG', lang);
      await (await import('../data/load')).loadContent();
      const { phrasesIn } = await import('./phrases');
      for (const [s, phrase] of SAMPLES[lang]) expect(phrasesIn(s).map((p) => p.phrase), s).toContain(phrase);
    }, 30000);
  }
  it('es: accent pairs are taught and explained', async () => {
    vi.resetModules();
    vi.stubEnv('HABLO_LANG', 'es');
    await (await import('../data/load')).loadContent();
    const { accentPairOf, accentPairsIn, explainPair } = await import('../data/accent-pairs');
    expect(accentPairsIn('¿Dónde está el baño?').map((p) => p[0])).toContain('dónde');
    expect(explainPair(accentPairOf('donde')!)).toMatch(/dónde = where\? .* donde = where/);
  }, 30000);
});
