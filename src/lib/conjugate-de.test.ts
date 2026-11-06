import { describe, expect, it } from 'vitest';
import { conjugateDe, participleDe, splitFormsDe } from './conjugate-de';
import { VERB_MAP_DE } from '../data/verbs-de';

const c = (inf: string, t: Parameters<typeof conjugateDe>[1]) => conjugateDe(inf, t).join(',');

describe('German conjugation', () => {
  it('regular present', () => {
    expect(c('spielen', 'presente')).toBe('spiele,spielst,spielt,spielen,spielt,spielen');
    expect(c('arbeiten', 'presente')).toBe('arbeite,arbeitest,arbeitet,arbeiten,arbeitet,arbeiten');
    expect(c('öffnen', 'presente')).toBe('öffne,öffnest,öffnet,öffnen,öffnet,öffnen');
    expect(c('tanzen', 'presente')).toBe('tanze,tanzt,tanzt,tanzen,tanzt,tanzen');
    expect(c('heißen', 'presente')).toBe('heiße,heißt,heißt,heißen,heißt,heißen');
  });
  it('vowel changes and irregulars', () => {
    expect(c('fahren', 'presente')).toBe('fahre,fährst,fährt,fahren,fahrt,fahren');
    expect(c('lesen', 'presente')).toBe('lese,liest,liest,lesen,lest,lesen');
    expect(c('essen', 'presente')).toBe('esse,isst,isst,essen,esst,essen');
    expect(c('nehmen', 'presente')).toBe('nehme,nimmst,nimmt,nehmen,nehmt,nehmen');
    expect(c('sein', 'presente')).toBe('bin,bist,ist,sind,seid,sind');
    expect(c('können', 'presente')).toBe('kann,kannst,kann,können,könnt,können');
    expect(c('finden', 'presente')).toBe('finde,findest,findet,finden,findet,finden');
  });
  it('separable verbs', () => {
    expect(c('aufstehen', 'presente')).toBe('stehe auf,stehst auf,steht auf,stehen auf,steht auf,stehen auf');
    expect(c('aufstehen', 'perfecto')).toBe('bin aufgestanden,bist aufgestanden,ist aufgestanden,sind aufgestanden,seid aufgestanden,sind aufgestanden');
    expect(c('einkaufen', 'perfecto').split(',')[0]).toBe('habe eingekauft');
    expect(c('anrufen', 'preterito').split(',')[0]).toBe('rief an');
  });
  it('past tenses and participles', () => {
    expect(c('spielen', 'preterito')).toBe('spielte,spieltest,spielte,spielten,spieltet,spielten');
    expect(c('arbeiten', 'preterito')).toBe('arbeitete,arbeitetest,arbeitete,arbeiteten,arbeitetet,arbeiteten');
    expect(c('fahren', 'preterito')).toBe('fuhr,fuhrst,fuhr,fuhren,fuhrt,fuhren');
    expect(c('finden', 'preterito')).toBe('fand,fandst,fand,fanden,fandet,fanden');
    expect(c('bringen', 'preterito')).toBe('brachte,brachtest,brachte,brachten,brachtet,brachten');
    expect(c('können', 'preterito')).toBe('konnte,konntest,konnte,konnten,konntet,konnten');
    expect(participleDe(VERB_MAP_DE.spielen)).toBe('gespielt');
    expect(participleDe(VERB_MAP_DE.arbeiten)).toBe('gearbeitet');
    expect(participleDe(VERB_MAP_DE.studieren)).toBe('studiert');
    expect(participleDe(VERB_MAP_DE.besuchen)).toBe('besucht');
    expect(c('fahren', 'perfecto').split(',')[0]).toBe('bin gefahren');
    expect(c('essen', 'perfecto').split(',')[2]).toBe('hat gegessen');
  });
  it('future, conditional, imperative', () => {
    expect(c('spielen', 'futuro').split(',')[1]).toBe('wirst spielen');
    expect(c('spielen', 'condicional').split(',')[0]).toBe('würde spielen');
    expect(c('haben', 'condicional').split(',')[0]).toBe('hätte');
    expect(c('lesen', 'imperativo')).toBe(',lies,lesen Sie,lesen wir,lest,');
    expect(c('fahren', 'imperativo').split(',')[1]).toBe('fahr');
    expect(c('arbeiten', 'imperativo').split(',')[1]).toBe('arbeite');
    expect(c('aufstehen', 'imperativo')).toBe(',steh auf,stehen Sie auf,stehen wir auf,steht auf,');
    expect(c('sein', 'imperativo').split(',')[1]).toBe('sei');
  });
  it('splits stems and endings', () => {
    const show = (inf: string) => splitFormsDe(inf, 'presente').map((f) => `${f!.changed ? '*' : ''}${f!.stem}|${f!.ending}${f!.post ? ' ' + f!.post : ''}`).join(',');
    expect(show('spielen')).toBe('spiel|e,spiel|st,spiel|t,spiel|en,spiel|t,spiel|en');
    expect(show('fahren')).toBe('fahr|e,*fähr|st,*fähr|t,fahr|en,fahr|t,fahr|en');
    expect(show('arbeiten')).toBe('arbeit|e,arbeit|est,arbeit|et,arbeit|en,arbeit|et,arbeit|en');
    expect(show('aufstehen').split(',')[0]).toBe('steh|e auf');
  });
});
