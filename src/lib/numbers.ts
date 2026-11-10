/**
 * Number words → digits (0–100), so "Ich bin 20 Jahre alt" matches "Ich bin zwanzig Jahre alt"
 * and speech recognition (which writes digits) matches the course text. "One" is left out where
 * it is also the article (un / una / ein / une): turning "un libro" into "1 libro" would hide a
 * missing article.
 */
const UNITS_ES = ['cero', '', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
const TENS_ES = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const ONE_ES = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];

const UNITS_DE = ['null', '', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
const TENS_DE = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];
const ONE_DE = ['', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'];

const UNITS_FR = ['zéro', '', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
const TENS_FR = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante'];
const ONE_FR = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];

const UNITS_RU = ['ноль', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
const TENS_RU = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];

function table(lang: string): [string, number][] {
  const out: [string, number][] = [];
  const add = (w: string, n: number) => { if (w) out.push([w, n]); };
  if (lang === 'es') {
    UNITS_ES.forEach((w, n) => add(w, n));
    for (let t = 3; t <= 9; t++) {
      add(TENS_ES[t], t * 10);
      for (let u = 1; u <= 9; u++) add(`${TENS_ES[t]} y ${ONE_ES[u]}`, t * 10 + u);
      add(`${TENS_ES[t]} y un`, t * 10 + 1); add(`${TENS_ES[t]} y una`, t * 10 + 1);
    }
    add('veintiún', 21); add('veintiuna', 21); add('cien', 100);
  } else if (lang === 'de') {
    UNITS_DE.forEach((w, n) => add(w, n));
    for (let t = 2; t <= 9; t++) { add(TENS_DE[t], t * 10); for (let u = 1; u <= 9; u++) add(`${ONE_DE[u]}und${TENS_DE[t]}`, t * 10 + u); }
    add('eins', 1); add('hundert', 100); add('einhundert', 100);
  } else if (lang === 'fr') {
    UNITS_FR.forEach((w, n) => add(w, n));
    for (let t = 2; t <= 6; t++) {
      add(TENS_FR[t], t * 10);
      add(`${TENS_FR[t]} et un`, t * 10 + 1); add(`${TENS_FR[t]}-et-un`, t * 10 + 1);
      for (let u = 2; u <= 9; u++) add(`${TENS_FR[t]}-${ONE_FR[u]}`, t * 10 + u);
    }
    // 70–79: soixante-dix…, 80–99: quatre-vingt(s)…
    add('soixante-dix', 70); add('soixante et onze', 71); add('soixante-et-onze', 71);
    for (let u = 2; u <= 9; u++) add(`soixante-${UNITS_FR[10 + u]}`, 70 + u);
    add('quatre-vingts', 80); add('quatre-vingt', 80);
    for (let u = 1; u <= 19; u++) add(`quatre-vingt-${u === 1 ? 'un' : UNITS_FR[u]}`, 80 + u);
    add('cent', 100);
  } else if (lang === 'ru') {
    UNITS_RU.forEach((w, n) => add(w, n));
    for (let t = 2; t <= 9; t++) { add(TENS_RU[t], t * 10); for (let u = 1; u <= 9; u++) add(`${TENS_RU[t]} ${UNITS_RU[u]}`, t * 10 + u); }
    add('сто', 100); add('две', 2); add('одна', 1); add('одно', 1);
  }
  return out.sort((a, b) => b[0].length - a[0].length);
}

const cache = new Map<string, RegExp & { map?: Map<string, number> }>();
/** Replaces number words with digits ("veinticinco" → "25", "двадцать пять" → "25"). */
export function numbersToDigits(s: string, lang: string): string {
  let rx = cache.get(lang);
  if (!rx) {
    const t = table(lang);
    if (!t.length) return s;
    const esc = (w: string) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    rx = new RegExp(`(?<![\\p{L}-])(${t.map(([w]) => esc(w)).join('|')})(?![\\p{L}-])`, 'giu');
    rx.map = new Map(t.map(([w, n]) => [w, n]));
    cache.set(lang, rx);
  }
  const map = rx.map!;
  return s.replace(rx, (m) => String(map.get(m.toLowerCase()) ?? m));
}
