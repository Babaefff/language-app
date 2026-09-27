import { describe, expect, it } from 'vitest';
import { conjugate, gerund, lookupForm, participle } from './conjugate';
import { VERB_MAP } from '../data/verbs';

const c = (inf: string, t: Parameters<typeof conjugate>[1]) => conjugate(inf, t).join(',');

describe('conjugate', () => {
  it('regular present', () => {
    expect(c('hablar', 'presente')).toBe('hablo,hablas,habla,hablamos,habláis,hablan');
    expect(c('comer', 'presente')).toBe('como,comes,come,comemos,coméis,comen');
    expect(c('vivir', 'presente')).toBe('vivo,vives,vive,vivimos,vivís,viven');
  });

  it('stem changes and irregular yo', () => {
    expect(c('pensar', 'presente')).toBe('pienso,piensas,piensa,pensamos,pensáis,piensan');
    expect(c('dormir', 'presente')).toBe('duermo,duermes,duerme,dormimos,dormís,duermen');
    expect(c('jugar', 'presente')).toBe('juego,juegas,juega,jugamos,jugáis,juegan');
    expect(c('tener', 'presente')).toBe('tengo,tienes,tiene,tenemos,tenéis,tienen');
    expect(c('decir', 'presente')).toBe('digo,dices,dice,decimos,decís,dicen');
    expect(c('seguir', 'presente')).toBe('sigo,sigues,sigue,seguimos,seguís,siguen');
    expect(c('conocer', 'presente')).toBe('conozco,conoces,conoce,conocemos,conocéis,conocen');
  });

  it('reflexive', () => {
    expect(c('levantarse', 'presente')).toBe('me levanto,te levantas,se levanta,nos levantamos,os levantáis,se levantan');
    expect(c('acostarse', 'perfecto')).toBe('me he acostado,te has acostado,se ha acostado,nos hemos acostado,os habéis acostado,se han acostado');
  });

  it('preterite', () => {
    expect(c('hablar', 'preterito')).toBe('hablé,hablaste,habló,hablamos,hablasteis,hablaron');
    expect(c('buscar', 'preterito')).toBe('busqué,buscaste,buscó,buscamos,buscasteis,buscaron');
    expect(c('llegar', 'preterito')).toBe('llegué,llegaste,llegó,llegamos,llegasteis,llegaron');
    expect(c('empezar', 'preterito')).toBe('empecé,empezaste,empezó,empezamos,empezasteis,empezaron');
    expect(c('dormir', 'preterito')).toBe('dormí,dormiste,durmió,dormimos,dormisteis,durmieron');
    expect(c('pedir', 'preterito')).toBe('pedí,pediste,pidió,pedimos,pedisteis,pidieron');
    expect(c('leer', 'preterito')).toBe('leí,leíste,leyó,leímos,leísteis,leyeron');
    expect(c('tener', 'preterito')).toBe('tuve,tuviste,tuvo,tuvimos,tuvisteis,tuvieron');
    expect(c('decir', 'preterito')).toBe('dije,dijiste,dijo,dijimos,dijisteis,dijeron');
    expect(c('conducir', 'preterito')).toBe('conduje,condujiste,condujo,condujimos,condujisteis,condujeron');
    expect(c('ir', 'preterito')).toBe('fui,fuiste,fue,fuimos,fuisteis,fueron');
  });

  it('imperfect', () => {
    expect(c('hablar', 'imperfecto')).toBe('hablaba,hablabas,hablaba,hablábamos,hablabais,hablaban');
    expect(c('vivir', 'imperfecto')).toBe('vivía,vivías,vivía,vivíamos,vivíais,vivían');
    expect(c('ser', 'imperfecto')).toBe('era,eras,era,éramos,erais,eran');
  });

  it('future and conditional', () => {
    expect(c('hablar', 'futuro')).toBe('hablaré,hablarás,hablará,hablaremos,hablaréis,hablarán');
    expect(c('tener', 'futuro')).toBe('tendré,tendrás,tendrá,tendremos,tendréis,tendrán');
    expect(c('hacer', 'condicional')).toBe('haría,harías,haría,haríamos,haríais,harían');
    expect(c('ir', 'futuro')).toBe('iré,irás,irá,iremos,iréis,irán');
  });

  it('present subjunctive', () => {
    expect(c('hablar', 'subjuntivo')).toBe('hable,hables,hable,hablemos,habléis,hablen');
    expect(c('tener', 'subjuntivo')).toBe('tenga,tengas,tenga,tengamos,tengáis,tengan');
    expect(c('dormir', 'subjuntivo')).toBe('duerma,duermas,duerma,durmamos,durmáis,duerman');
    expect(c('sentirse', 'subjuntivo')).toBe('me sienta,te sientas,se sienta,nos sintamos,os sintáis,se sientan');
    expect(c('jugar', 'subjuntivo')).toBe('juegue,juegues,juegue,juguemos,juguéis,jueguen');
    expect(c('buscar', 'subjuntivo')).toBe('busque,busques,busque,busquemos,busquéis,busquen');
    expect(c('empezar', 'subjuntivo')).toBe('empiece,empieces,empiece,empecemos,empecéis,empiecen');
    expect(c('ver', 'subjuntivo')).toBe('vea,veas,vea,veamos,veáis,vean');
    expect(c('proteger', 'subjuntivo')).toBe('proteja,protejas,proteja,protejamos,protejáis,protejan');
  });

  it('imperative', () => {
    expect(c('hablar', 'imperativo')).toBe(',habla,hable,hablemos,hablad,hablen');
    expect(c('poner', 'imperativo')).toBe(',pon,ponga,pongamos,poned,pongan');
    expect(c('dormir', 'imperativo')).toBe(',duerme,duerma,durmamos,dormid,duerman');
    expect(c('ir', 'imperativo')).toBe(',ve,vaya,vamos,id,vayan');
  });

  it('participles and gerunds', () => {
    expect(participle(VERB_MAP.hablar)).toBe('hablado');
    expect(participle(VERB_MAP.leer)).toBe('leído');
    expect(participle(VERB_MAP.traer)).toBe('traído');
    expect(participle(VERB_MAP.escribir)).toBe('escrito');
    expect(gerund(VERB_MAP.dormir)).toBe('durmiendo');
    expect(gerund(VERB_MAP.leer)).toBe('leyendo');
    expect(gerund(VERB_MAP.decir)).toBe('diciendo');
    expect(gerund(VERB_MAP.venir)).toBe('viniendo');
    expect(c('comer', 'progresivo')).toBe('estoy comiendo,estás comiendo,está comiendo,estamos comiendo,estáis comiendo,están comiendo');
  });

  it('reverse lookup', () => {
    const fui = lookupForm('fui').map((f) => f.inf).sort();
    expect(fui).toEqual(['ir', 'ser']);
    expect(lookupForm('tengo')[0]).toMatchObject({ inf: 'tener', tense: 'presente', person: 0 });
  });
});
