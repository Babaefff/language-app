import type { Morphology } from './types';

export const MORPH_DE: Morphology = {
  compounds: { links: ['s', 'es', 'n', 'en', 'e', 'er'] },
  prefixes: [
    ['un', 'not / un-'], ['ur', 'original / great-'], ['haupt', 'main'], ['lieblings', 'favourite'], ['ober', 'upper / head'],
  ],
  suffixes: [
    ['ung', 'the act of … (makes a noun from a verb)', 'noun'], ['heit', '-ness / -hood (makes a noun)', 'noun'], ['keit', '-ness / -ity (makes a noun)', 'noun'],
    ['schaft', '-ship (a group or state)', 'noun'], ['lich', '-ly / -ish (makes an adjective)', 'adj'], ['ig', '-y (makes an adjective)', 'adj'], ['bar', '-able', 'adj'],
    ['los', '-less / without', 'adj'], ['voll', '-ful', 'adj'], ['chen', 'little (and always das)', 'noun'], ['lein', 'little (and always das)', 'noun'],
    ['in', 'female form', 'noun'], ['innen', 'female form, plural', 'noun'], ['er', 'a person or thing that does it', 'noun'], ['ei', 'a place or activity', 'noun'],
  ],
  noSplit: ['Zeitung', 'Nachbar', 'Denkmal', 'möglich', 'Mittel', 'Kartoffel', 'Fernseher', 'Geschäft', 'Gesicht', 'Erfolg'],
  parts: {
    vor: 'before / pre-', nach: 'after', neben: 'side / extra', grund: 'basic / ground', durch: 'through', unter: 'under', über: 'over',
    mit: 'with / co-', bar: 'cash / bare', reich: 'rich (in)', haupt: 'main', zusammen: 'together', zurück: 'back', weiter: 'further',
    essen: 'food / meal (from essen, to eat)', stellen: 'job / position (Stelle)', mal: 'mark / sign', klein: 'small', groß: 'big / great (in family words: grand-)',
    gleich: 'same / equal', eigen: 'own', voll: 'full', frei: 'free', halb: 'half', schnell: 'fast', hoch: 'high',
    träger: 'carrier (from tragen, to carry)', führer: 'driver / leader (from führen, to lead)', halter: 'holder (from halten, to hold)',
    zeug: 'stuff / gear', werk: 'works / work', platz: 'place / square', stelle: 'place / point', laden: 'shop', mittel: 'means / agent',
    raum: 'room / space', gang: 'way / corridor (from gehen)', fahrt: 'journey (from fahren)', kunft: 'coming (from kommen)',
    stück: 'piece', tag: 'day', zeit: 'time', zimmer: 'room', haus: 'house', karte: 'card / ticket', geld: 'money', schein: 'note / certificate',
    früh: 'early', fern: 'far / remote', kühl: 'cool', wasch: 'wash (from waschen)', schreib: 'write (from schreiben)', spül: 'rinse (from spülen)',
    koch: 'cook (from kochen)', lese: 'read (from lesen)', fahr: 'drive (from fahren)', schlaf: 'sleep (from schlafen)', wohn: 'live (from wohnen)', ess: 'eat (from essen)',
    schrank: 'cupboard', topf: 'pot', zug: 'train / pull', bahn: 'railway / track', hof: 'yard / court', post: 'post', brief: 'letter',
  },
  overrides: {
    'Briefträger': 'Brief|letter + Träger|carrier (from tragen, to carry)',
    'Frühstück': 'Früh|early + Stück|piece',
    'Kühlschrank': 'Kühl|cool + Schrank|cupboard',
    'Handschuh': 'Hand|hand + Schuh|shoe',
    'Krankenhaus': 'Kranken|the sick + Haus|house',
    'Bahnhof': 'Bahn|railway + Hof|yard',
    'Flugzeug': 'Flug|flight + Zeug|gear / thing',
    'Fahrrad': 'Fahr|ride (from fahren) + Rad|wheel',
    'Staubsauger': 'Staub|dust + Sauger|sucker (from saugen, to suck)',
    'Geburtstag': 'Geburt|birth + s|(linking letter) + Tag|day',
    'Wochenende': 'Woche|week + n|(linking letter) + Ende|end',
    'Fernseher': 'Fern|far + Seher|seer (from sehen, to see)',
    'Hausaufgaben': 'Haus|house / home + Aufgaben|tasks',
    'Lebensmittel': 'Leben|life + s|(linking letter) + Mittel|means',
  },
};
