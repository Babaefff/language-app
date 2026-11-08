import { LANG } from './lang';

/** One spelling and how it sounds, explained for English speakers, with words to hear. */
export interface PronItem {
  spelling: string;
  sound: string;
  tip?: string;
  examples: [string, string][];
}
export interface PronSection {
  title: string;
  intro?: string;
  items: PronItem[];
}

const DE: PronSection[] = [
  {
    title: 'Vowels and umlauts',
    intro: 'German vowels are pure — no gliding like English “go” (go-oo). Most can be long or short: a vowel is usually long before one consonant (Tag) and short before two (Mann).',
    items: [
      { spelling: 'a', sound: 'like “a” in father — long or short', examples: [['Tag', 'day'], ['Mann', 'man'], ['Vater', 'father']] },
      { spelling: 'e', sound: 'long: like “ay” in say, but without the y-glide · short: like “e” in bed', tip: 'An unstressed -e at the end sounds like the “a” in sofa: bitte, Tasse.', examples: [['See', 'lake'], ['Bett', 'bed'], ['bitte', 'please']] },
      { spelling: 'i', sound: 'long: like “ee” in see · short: like “i” in sit', examples: [['Kino', 'cinema'], ['ist', 'is'], ['Kind', 'child']] },
      { spelling: 'o', sound: 'long: a pure “oh” (lips rounded, no “w” at the end) · short: like “o” in British “hot”', examples: [['Boot', 'boat'], ['so', 'so'], ['Sonne', 'sun']] },
      { spelling: 'u', sound: 'long: like “oo” in food · short: like “u” in put', examples: [['gut', 'good'], ['Mutter', 'mother'], ['Uhr', 'clock']] },
      { spelling: 'ä', sound: 'like “e” in bed (long: like “ai” in hair, without the r)', examples: [['Käse', 'cheese'], ['Männer', 'men'], ['spät', 'late']] },
      { spelling: 'ö', sound: 'say “ay” (as in say) and round your lips as for “o”', tip: 'No English word has this sound — keep your tongue where it is for “e”, only the lips change.', examples: [['schön', 'beautiful'], ['Öl', 'oil'], ['können', 'can']] },
      { spelling: 'ü', sound: 'say “ee” and round your lips as for “oo”', tip: 'Like French “u”. Keep saying “ee” while pushing your lips forward.', examples: [['über', 'over'], ['Tür', 'door'], ['müde', 'tired']] },
    ],
  },
  {
    title: 'Vowel pairs',
    intro: 'Two vowels together often make one new sound. The most common trap: ei and ie are opposites.',
    items: [
      { spelling: 'ei / ai', sound: 'like “eye”', tip: 'Read the second letter: ei → “i” in English “eye”.', examples: [['mein', 'my'], ['Ei', 'egg'], ['Mai', 'May']] },
      { spelling: 'ie', sound: 'like “ee” in see', tip: 'Read the second letter: ie → “ee”. die, wie, Bier.', examples: [['die', 'the'], ['wie', 'how'], ['Brief', 'letter']] },
      { spelling: 'eu / äu', sound: 'like “oy” in boy', examples: [['heute', 'today'], ['neu', 'new'], ['Häuser', 'houses']] },
      { spelling: 'au', sound: 'like “ow” in how', examples: [['Haus', 'house'], ['Frau', 'woman'], ['auch', 'also']] },
    ],
  },
  {
    title: 'Consonants that differ from English',
    items: [
      { spelling: 'w', sound: 'like English “v”', examples: [['Wasser', 'water'], ['wie', 'how'], ['Wein', 'wine']] },
      { spelling: 'v', sound: 'usually like English “f”', tip: 'In some foreign words it stays “v”: Vase, Klavier.', examples: [['Vater', 'father'], ['viel', 'much'], ['vier', 'four']] },
      { spelling: 'z', sound: 'like “ts” in cats — also at the start of a word', examples: [['Zeit', 'time'], ['Zug', 'train'], ['zehn', 'ten']] },
      { spelling: 'j', sound: 'like “y” in yes', examples: [['ja', 'yes'], ['Jahr', 'year'], ['jung', 'young']] },
      { spelling: 's', sound: 'before a vowel: like “z” in zoo · elsewhere: like “s”', examples: [['Sonne', 'sun'], ['sehen', 'to see'], ['Haus', 'house']] },
      { spelling: 'ß / ss', sound: 'always a sharp “s” as in kiss', tip: 'ß comes after long vowels and au/ei (Straße, Fuß, heißen); ss after short vowels (Wasser, muss).', examples: [['Straße', 'street'], ['Fuß', 'foot'], ['Wasser', 'water']] },
      { spelling: 'sch', sound: 'like “sh” in shoe', examples: [['Schule', 'school'], ['schön', 'beautiful'], ['Tisch', 'table']] },
      { spelling: 'sp / st', sound: 'at the start of a word (or word part): “shp” / “sht”', tip: 'In the middle or at the end they stay “sp” / “st”: Fenster, ist.', examples: [['Sport', 'sport'], ['Stadt', 'city'], ['verstehen', 'to understand']] },
      { spelling: 'ch (ich)', sound: 'after e, i, ä, ö, ü, ei, eu and consonants: a soft hiss, like a whispered “h” in huge', tip: 'Smile and say “yes” without voice — that is the ich-sound.', examples: [['ich', 'I'], ['nicht', 'not'], ['Milch', 'milk']] },
      { spelling: 'ch (ach)', sound: 'after a, o, u, au: a throaty sound like Scottish “loch”', examples: [['Bach', 'stream'], ['Buch', 'book'], ['auch', 'also']] },
      { spelling: '-ig', sound: 'at the end of a word: like “ich”', examples: [['richtig', 'correct'], ['König', 'king'], ['zwanzig', 'twenty']] },
      { spelling: 'chs', sound: 'like “ks” (x)', examples: [['sechs', 'six'], ['wachsen', 'to grow'], ['Fuchs', 'fox']] },
      { spelling: 'qu', sound: 'like “kv”', examples: [['Quatsch', 'nonsense'], ['bequem', 'comfortable'], ['Qualität', 'quality']] },
      { spelling: 'pf', sound: '“p” and “f” together, quickly', examples: [['Apfel', 'apple'], ['Pferd', 'horse'], ['Kopf', 'head']] },
      { spelling: 'r', sound: 'at the start of a syllable: in the back of the throat (like a light gargle) · at the end: almost a vowel, like “a” in sofa', examples: [['rot', 'red'], ['Brot', 'bread'], ['Vater', 'father']] },
      { spelling: 'h', sound: 'at the start: like English “h” · after a vowel: silent — it only makes the vowel long', examples: [['Haus', 'house'], ['Sohn', 'son'], ['gehen', 'to go']] },
      { spelling: 'b, d, g at the end', sound: 'become p, t, k', tip: 'Hund sounds like “Hunt”, Tag like “Tak”. In the plural they come back: Hunde, Tage.', examples: [['halb', 'half'], ['Hund', 'dog'], ['Tag', 'day']] },
    ],
  },
  {
    title: 'Stress',
    items: [
      { spelling: '1st syllable', sound: 'most German words are stressed on the first syllable', examples: [['Arbeit', 'work'], ['Mutter', 'mother'], ['Fenster', 'window']] },
      { spelling: 'be- ge- ver- er-', sound: 'these prefixes are never stressed — the stress moves to the stem', examples: [['bekommen', 'to get'], ['verstehen', 'to understand'], ['Gespräch', 'conversation']] },
      { spelling: 'loanwords', sound: 'words from French or Latin are often stressed at the end', examples: [['Universität', 'university'], ['Musik', 'music'], ['Restaurant', 'restaurant']] },
    ],
  },
];

const ES: PronSection[] = [
  {
    title: 'Vowels',
    intro: 'Spanish has only five vowel sounds, always short and pure — they never change, whatever the word. Getting them right does most of the work.',
    items: [
      { spelling: 'a', sound: 'like “a” in father, but short', examples: [['casa', 'house'], ['mapa', 'map'], ['agua', 'water']] },
      { spelling: 'e', sound: 'like “e” in bed', examples: [['mesa', 'table'], ['leche', 'milk'], ['tren', 'train']] },
      { spelling: 'i', sound: 'like “ee” in see, but short', examples: [['libro', 'book'], ['sí', 'yes'], ['vino', 'wine']] },
      { spelling: 'o', sound: 'a pure “o” — no “w” glide like English “go”', examples: [['oso', 'bear'], ['todo', 'everything'], ['ojo', 'eye']] },
      { spelling: 'u', sound: 'like “oo” in food, but short', examples: [['uno', 'one'], ['luna', 'moon'], ['mucho', 'a lot']] },
    ],
  },
  {
    title: 'Vowel pairs',
    intro: 'When i or u meet another vowel they glide together into one syllable.',
    items: [
      { spelling: 'ue', sound: 'like “weh”', examples: [['bueno', 'good'], ['puerta', 'door'], ['nueve', 'nine']] },
      { spelling: 'ie', sound: 'like “yeh”', examples: [['tiempo', 'time / weather'], ['bien', 'well'], ['siete', 'seven']] },
      { spelling: 'ai / ay', sound: 'like “eye”', examples: [['hay', 'there is'], ['baile', 'dance'], ['aire', 'air']] },
      { spelling: 'ei / ey', sound: 'like “ay” in say', examples: [['seis', 'six'], ['rey', 'king'], ['peine', 'comb']] },
      { spelling: 'au', sound: 'like “ow” in how', examples: [['auto', 'car'], ['aula', 'classroom'], ['causa', 'cause']] },
    ],
  },
  {
    title: 'Consonants that differ from English',
    items: [
      { spelling: 'h', sound: 'always silent', examples: [['hola', 'hello'], ['hablar', 'to speak'], ['ahora', 'now']] },
      { spelling: 'j', sound: 'a throaty “h”, like Scottish “loch”', examples: [['jamón', 'ham'], ['joven', 'young'], ['ojo', 'eye']] },
      { spelling: 'g + e / i', sound: 'the same throaty sound as j', tip: 'Before a, o, u, g is hard as in “go”: gato, gol, gusto.', examples: [['gente', 'people'], ['girar', 'to turn'], ['gato', 'cat']] },
      { spelling: 'gue / gui', sound: 'hard “g” — the u is silent, it only keeps the g hard', examples: [['guerra', 'war'], ['guitarra', 'guitar'], ['sigue', 'continues']] },
      { spelling: 'güe / güi', sound: 'the two dots make the u heard: “gweh”, “gwee”', examples: [['pingüino', 'penguin'], ['vergüenza', 'shame'], ['bilingüe', 'bilingual']] },
      { spelling: 'c + e / i, z', sound: 'Spain: like “th” in think · Latin America: like “s”', tip: 'Both are correct — choose one and be consistent.', examples: [['cena', 'dinner'], ['cine', 'cinema'], ['zapato', 'shoe']] },
      { spelling: 'c + a / o / u, qu', sound: 'like “k” (the u after q is silent)', examples: [['casa', 'house'], ['queso', 'cheese'], ['quien', 'who']] },
      { spelling: 'll / y', sound: 'like “y” in yes (in Argentina and Uruguay: like “sh”)', examples: [['llamar', 'to call'], ['calle', 'street'], ['yo', 'I']] },
      { spelling: 'ñ', sound: 'like “ny” in canyon', tip: 'ñ is its own letter: año (year) and ano (anus) are different words!', examples: [['España', 'Spain'], ['niño', 'child'], ['año', 'year']] },
      { spelling: 'r', sound: 'between vowels: one quick tap, like the “tt” in American “butter”', examples: [['pero', 'but'], ['caro', 'expensive'], ['hora', 'hour']] },
      { spelling: 'rr / r- at the start', sound: 'a rolled trill — the tongue flutters several times', tip: 'pero (but) vs perro (dog): the tap and the trill change the meaning.', examples: [['perro', 'dog'], ['carro', 'car'], ['rojo', 'red']] },
      { spelling: 'b / v', sound: 'the same sound: at the start like “b”, between vowels soft (lips almost touching)', examples: [['vino', 'wine'], ['beber', 'to drink'], ['uva', 'grape']] },
      { spelling: 'd between vowels', sound: 'soft, like “th” in this', examples: [['nada', 'nothing'], ['cansado', 'tired'], ['todo', 'everything']] },
      { spelling: 'ch', sound: 'like “ch” in church', examples: [['chico', 'boy'], ['mucho', 'a lot'], ['noche', 'night']] },
      { spelling: 'x', sound: 'usually “ks” · in México and some place names: like j', examples: [['taxi', 'taxi'], ['examen', 'exam'], ['México', 'Mexico']] },
    ],
  },
  {
    title: 'Stress and accent marks',
    intro: 'The rules are regular, so you can always tell where the stress goes from the spelling.',
    items: [
      { spelling: 'ends in vowel, n, s', sound: 'stress on the second-to-last syllable', examples: [['casa', 'house'], ['hablan', 'they speak'], ['zapatos', 'shoes']] },
      { spelling: 'ends in other consonant', sound: 'stress on the last syllable', examples: [['hablar', 'to speak'], ['ciudad', 'city'], ['español', 'Spanish']] },
      { spelling: 'á é í ó ú', sound: 'an accent mark breaks the rules: stress exactly there', examples: [['café', 'coffee'], ['árbol', 'tree'], ['también', 'also']] },
      { spelling: 'accent = meaning', sound: 'some short words differ only by the accent', tip: 'sí (yes) / si (if), tú (you) / tu (your), él (he) / el (the).', examples: [['sí', 'yes'], ['tú', 'you'], ['él', 'he']] },
    ],
  },
];

const FR: PronSection[] = [
  {
    title: 'Silent letters',
    intro: 'French writes many letters it no longer says. The good news: the rules are regular.',
    items: [
      { spelling: 'final consonant', sound: 'usually silent', tip: 'Except c, r, f, l (think of "CaReFuL"): avec, bonjour, neuf, avril.', examples: [['petit', 'small'], ['vous', 'you'], ['grand', 'big']] },
      { spelling: 'final -e', sound: 'silent, but it makes the consonant before it heard', tip: 'That is why you hear the feminine: petit (pti) / petite (ptit).', examples: [['petite', 'small (f)'], ['verte', 'green (f)'], ['grande', 'big (f)']] },
      { spelling: '-ent (verbs)', sound: 'completely silent in ils / elles forms', examples: [['ils parlent', 'they speak'], ['elles aiment', 'they like'], ['ils mangent', 'they eat']] },
      { spelling: 'h', sound: 'always silent', examples: [['hôtel', 'hotel'], ['homme', 'man'], ['heure', 'hour']] },
    ],
  },
  {
    title: 'Vowels',
    intro: 'French vowels are short, tense and pure, with no glide at the end.',
    items: [
      { spelling: 'u', sound: 'say "ee" and round your lips as for "oo"', tip: 'The sound of German ü. Keep your tongue at "ee".', examples: [['tu', 'you'], ['rue', 'street'], ['salut', 'hi']] },
      { spelling: 'ou', sound: 'like "oo" in food', examples: [['vous', 'you'], ['rouge', 'red'], ['jour', 'day']] },
      { spelling: 'é / -er / -ez', sound: 'a closed "ay", without the y-glide', examples: [['café', 'coffee'], ['parler', 'to speak'], ['vous avez', 'you have']] },
      { spelling: 'è / ê / ai', sound: 'an open "e", as in "bed"', examples: [['mère', 'mother'], ['fête', 'party'], ['lait', 'milk']] },
      { spelling: 'au / eau / o', sound: 'a pure "oh"', examples: [['eau', 'water'], ['beau', 'beautiful'], ['chaud', 'hot']] },
      { spelling: 'oi', sound: 'like "wa"', examples: [['moi', 'me'], ['trois', 'three'], ['soir', 'evening']] },
      { spelling: 'eu', sound: 'say "ay" with rounded lips', examples: [['deux', 'two'], ['bleu', 'blue'], ['peu', 'little']] },
    ],
  },
  {
    title: 'Nasal vowels',
    intro: 'A vowel + n or m at the end of a syllable becomes a vowel through the nose; the n itself is not pronounced.',
    items: [
      { spelling: 'an / en / am / em', sound: 'a nasal "ah"', examples: [['enfant', 'child'], ['France', 'France'], ['temps', 'time']] },
      { spelling: 'on / om', sound: 'a nasal "oh"', examples: [['bonjour', 'hello'], ['nom', 'name'], ['maison', 'house']] },
      { spelling: 'in / ain / ein / un', sound: 'a nasal "a" as in "cat"', examples: [['vin', 'wine'], ['pain', 'bread'], ['un', 'one']] },
      { spelling: 'n + vowel', sound: 'no nasal: the n is a normal n', tip: 'bon (nasal) / bonne (bonn): the feminine undoes the nasal.', examples: [['bonne', 'good (f)'], ['ami', 'friend'], ['fine', 'thin (f)']] },
    ],
  },
  {
    title: 'Consonants',
    intro: 'Most consonants are like English; these are the ones to watch.',
    items: [
      { spelling: 'r', sound: 'at the back of the throat, like a soft gargle', examples: [['rouge', 'red'], ['Paris', 'Paris'], ['merci', 'thank you']] },
      { spelling: 'ç / c + e, i', sound: '"s"', examples: [['ça', 'that'], ['garçon', 'boy'], ['merci', 'thank you']] },
      { spelling: 'g + e, i / j', sound: 'like "s" in measure', examples: [['rouge', 'red'], ['je', 'I'], ['manger', 'to eat']] },
      { spelling: 'ch', sound: 'like "sh"', examples: [['chat', 'cat'], ['chocolat', 'chocolate'], ['chambre', 'bedroom']] },
      { spelling: 'gn', sound: 'like "ny" in canyon', examples: [['montagne', 'mountain'], ['Espagne', 'Spain'], ['champagne', 'champagne']] },
      { spelling: '-ill-', sound: 'usually "y"', tip: 'Except ville, mille, tranquille: there it is "l".', examples: [['fille', 'girl'], ['famille', 'family'], ['travailler', 'to work']] },
    ],
  },
  {
    title: 'Linking words: liaison',
    intro: 'A silent final consonant comes back to life when the next word starts with a vowel.',
    items: [
      { spelling: 's / x + vowel', sound: 'linked as "z"', examples: [['les amis', 'the friends'], ['vous avez', 'you have'], ['deux enfants', 'two children']] },
      { spelling: 'n + vowel', sound: 'linked as "n"', examples: [['un ami', 'a friend'], ['on a', 'we have'], ['mon école', 'my school']] },
      { spelling: 't / d + vowel', sound: 'linked as "t"', examples: [['petit ami', 'boyfriend'], ['c\'est un', 'it is a'], ['quand il', 'when he']] },
    ],
  },
];

export const PRONUNCIATION: PronSection[] = LANG === 'de' ? DE : LANG === 'fr' ? FR : ES;
