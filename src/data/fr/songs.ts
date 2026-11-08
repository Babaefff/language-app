import type { Reading } from '../types';

// Traditional French songs, all in the public domain (17th–19th century or older).
// A sung YouTube performance and line timings can be added per song once one is chosen.
export const SONGS_FR: Reading[] = [
  {
    id: 'fr-s-jacques', song: true, level: 'A1', title: 'Frère Jacques',
    source: 'Traditional round, 18th century (public domain)',
    paragraphs: [
      'Frère Jacques, frère Jacques,\nDormez-vous ? Dormez-vous ?\nSonnez les matines ! Sonnez les matines !\nDing, dang, dong. Ding, dang, dong.',
    ],
    translation: [
      'Brother Jacques, Brother Jacques,\nAre you sleeping? Are you sleeping?\nRing the morning bells! Ring the morning bells!\nDing, dang, dong. Ding, dang, dong.',
    ],
    glossary: { 'frère': 'brother (here: a monk)', dormez: 'are you sleeping (dormir, vous)', sonnez: 'ring! (sonner, command)', matines: 'the early-morning prayers (matins)' },
    questions: [
      { q: 'Que fait Jacques ?', options: ['Il dort', 'Il chante', 'Il mange'], answer: 0 },
      { q: 'Qu’est-ce qu’il doit sonner ?', options: ['Les matines', 'La porte', 'Le téléphone'], answer: 0 },
    ],
  },
  {
    id: 'fr-s-lune', song: true, level: 'A1', title: 'Au clair de la lune',
    source: 'Traditional song, 18th century (public domain)',
    paragraphs: [
      'Au clair de la lune,\nMon ami Pierrot,\nPrête-moi ta plume\nPour écrire un mot.\nMa chandelle est morte,\nJe n’ai plus de feu.\nOuvre-moi ta porte\nPour l’amour de Dieu.',
      'Au clair de la lune,\nPierrot répondit :\n« Je n’ai pas de plume,\nJe suis dans mon lit.\nVa chez la voisine,\nJe crois qu’elle y est,\nCar dans sa cuisine\nOn bat le briquet. »',
    ],
    translation: [
      'By the light of the moon,\nMy friend Pierrot,\nLend me your pen\nTo write a word.\nMy candle has gone out,\nI have no more fire.\nOpen your door to me\nFor the love of God.',
      'By the light of the moon,\nPierrot answered:\n“I have no pen,\nI am in my bed.\nGo to the neighbour’s,\nI think she is in,\nBecause in her kitchen\nSomeone is striking a light.”',
    ],
    glossary: { clair: 'light', lune: 'moon', 'prête-moi': 'lend me (prêter, command)', plume: 'quill pen / feather', mot: 'word / note', chandelle: 'candle', morte: 'dead (here: gone out)', feu: 'fire', 'répondit': 'answered (passé simple of répondre)', voisine: 'neighbour (f)', car: 'because', bat: 'strikes (battre)', briquet: 'flint and steel / lighter' },
    questions: [
      { q: 'Qu’est-ce que la personne veut emprunter ?', options: ['Une plume', 'Une chandelle', 'Un lit'], answer: 0 },
      { q: 'Pourquoi Pierrot ne peut pas aider ?', options: ['Il n’a pas de plume et il est au lit', 'Il n’est pas à la maison', 'Il dort chez la voisine'], answer: 0 },
      { q: 'Où faut-il aller ?', options: ['Chez la voisine', 'À la cuisine de Pierrot', 'À l’église'], answer: 0 },
    ],
  },
  {
    id: 'fr-s-avignon', song: true, level: 'A1', title: 'Sur le pont d’Avignon',
    source: 'Traditional song, 15th century (public domain)',
    paragraphs: [
      'Sur le pont d’Avignon,\nL’on y danse, l’on y danse,\nSur le pont d’Avignon,\nL’on y danse tous en rond.',
      'Les beaux messieurs font comme ça,\nEt puis encore comme ça.',
      'Les belles dames font comme ça,\nEt puis encore comme ça.',
      'Sur le pont d’Avignon,\nL’on y danse, l’on y danse,\nSur le pont d’Avignon,\nL’on y danse tous en rond.',
    ],
    translation: [
      'On the bridge of Avignon,\nPeople dance there, people dance there,\nOn the bridge of Avignon,\nEveryone dances there in a ring.',
      'The fine gentlemen go like this,\nAnd then again like this.',
      'The fine ladies go like this,\nAnd then again like this.',
      'On the bridge of Avignon,\nPeople dance there, people dance there,\nOn the bridge of Avignon,\nEveryone dances there in a ring.',
    ],
    glossary: { pont: 'bridge', "l'on": 'one / people (= on)', y: 'there', danse: 'dances (danser)', 'tous en rond': 'all in a ring', messieurs: 'gentlemen', dames: 'ladies', 'comme ça': 'like this', puis: 'then', encore: 'again' },
    questions: [
      { q: 'Où est-ce qu’on danse ?', options: ['Sur le pont d’Avignon', 'Dans la cuisine', 'À Paris'], answer: 0 },
      { q: 'Comment est-ce qu’on danse ?', options: ['Tous en rond', 'Seul', 'Assis'], answer: 0 },
    ],
  },
  {
    id: 'fr-s-alouette', song: true, level: 'A2', title: 'Alouette',
    source: 'Traditional song, 19th century (public domain)',
    paragraphs: [
      'Alouette, gentille alouette,\nAlouette, je te plumerai.',
      'Je te plumerai la tête,\nJe te plumerai la tête,\nEt la tête, et la tête,\nAlouette, alouette.',
      'Alouette, gentille alouette,\nAlouette, je te plumerai.',
      'Je te plumerai le bec,\nJe te plumerai le bec,\nEt le bec, et le bec,\nEt la tête, et la tête,\nAlouette, alouette.',
      'Alouette, gentille alouette,\nAlouette, je te plumerai.',
    ],
    translation: [
      'Lark, nice lark,\nLark, I will pluck you.',
      'I will pluck your head,\nI will pluck your head,\nAnd the head, and the head,\nLark, lark.',
      'Lark, nice lark,\nLark, I will pluck you.',
      'I will pluck your beak,\nI will pluck your beak,\nAnd the beak, and the beak,\nAnd the head, and the head,\nLark, lark.',
      'Lark, nice lark,\nLark, I will pluck you.',
    ],
    glossary: { alouette: 'lark (a bird)', gentille: 'nice / kind (f)', plumerai: 'I will pluck (plumer, futur)', 'tête': 'head', bec: 'beak' },
    questions: [
      { q: 'Quel temps est utilisé dans « je te plumerai » ?', options: ['Le futur simple', 'Le passé composé', 'L’imparfait'], answer: 0 },
      { q: 'Quelles parties de l’oiseau sont dans la chanson ?', options: ['La tête et le bec', 'Les pieds et les ailes', 'Le dos et les yeux'], answer: 0 },
    ],
  },
  {
    id: 'fr-s-fontaine', song: true, level: 'B1', title: 'À la claire fontaine',
    source: 'Traditional song, 17th century (public domain)',
    paragraphs: [
      'À la claire fontaine\nM’en allant promener,\nJ’ai trouvé l’eau si belle\nQue je m’y suis baigné.\nIl y a longtemps que je t’aime,\nJamais je ne t’oublierai.',
      'Sous les feuilles d’un chêne,\nJe me suis fait sécher.\nSur la plus haute branche,\nLe rossignol chantait.\nIl y a longtemps que je t’aime,\nJamais je ne t’oublierai.',
      'Chante, rossignol, chante,\nToi qui as le cœur gai.\nTu as le cœur à rire,\nMoi je l’ai à pleurer.\nIl y a longtemps que je t’aime,\nJamais je ne t’oublierai.',
    ],
    translation: [
      'At the clear fountain,\nAs I went for a walk,\nI found the water so beautiful\nThat I bathed in it.\nI have loved you for a long time,\nI will never forget you.',
      'Under the leaves of an oak,\nI dried myself.\nOn the highest branch,\nThe nightingale was singing.\nI have loved you for a long time,\nI will never forget you.',
      'Sing, nightingale, sing,\nYou who have a cheerful heart.\nYour heart is ready to laugh,\nMine is ready to cry.\nI have loved you for a long time,\nI will never forget you.',
    ],
    glossary: { claire: 'clear', fontaine: 'fountain / spring', "m'en allant promener": 'as I went for a walk', 'baigné': 'bathed (se baigner)', longtemps: 'a long time', jamais: 'never', 'oublierai': 'will forget (oublier, futur)', feuilles: 'leaves', 'chêne': 'oak tree', 'sécher': 'to dry', branche: 'branch', rossignol: 'nightingale', 'chantait': 'was singing (imparfait)', 'cœur': 'heart', gai: 'cheerful', rire: 'to laugh', pleurer: 'to cry' },
    questions: [
      { q: 'Qu’est-ce que le chanteur a fait dans la fontaine ?', options: ['Il s’est baigné', 'Il a bu', 'Il a pêché'], answer: 0 },
      { q: 'Pourquoi « chantait » est à l’imparfait ?', options: ['C’est l’arrière-plan de la scène', 'C’est une action unique et finie', 'C’est le futur'], answer: 0 },
      { q: 'Comment est le cœur du chanteur ?', options: ['Triste : il veut pleurer', 'Gai : il veut rire', 'Calme'], answer: 0 },
    ],
  },
  {
    id: 'fr-s-divin', song: true, level: 'B1', title: 'Il est né le divin Enfant',
    source: 'Traditional Christmas carol, 19th century (public domain)',
    paragraphs: [
      'Il est né le divin Enfant,\nJouez hautbois, résonnez musettes !\nIl est né le divin Enfant,\nChantons tous son avènement !',
      'Depuis plus de quatre mille ans,\nNous le promettaient les prophètes,\nDepuis plus de quatre mille ans,\nNous attendions cet heureux temps.',
      'Il est né le divin Enfant,\nJouez hautbois, résonnez musettes !\nIl est né le divin Enfant,\nChantons tous son avènement !',
    ],
    translation: [
      'He is born, the divine Child,\nPlay, oboes, sound, bagpipes!\nHe is born, the divine Child,\nLet us all sing of his coming!',
      'For more than four thousand years,\nThe prophets promised him to us,\nFor more than four thousand years,\nWe had been waiting for this happy time.',
      'He is born, the divine Child,\nPlay, oboes, sound, bagpipes!\nHe is born, the divine Child,\nLet us all sing of his coming!',
    ],
    glossary: { 'né': 'born (naître)', divin: 'divine', enfant: 'child', hautbois: 'oboes', 'résonnez': 'sound! (résonner)', musettes: 'bagpipes', chantons: "let's sing", 'avènement': 'coming / arrival', 'promettaient': 'were promising (promettre, imparfait)', 'prophètes': 'prophets', attendions: 'were waiting (attendre, imparfait)', heureux: 'happy' },
    questions: [
      { q: 'Quels instruments sont dans la chanson ?', options: ['Les hautbois et les musettes', 'Le piano et la guitare', 'Les tambours'], answer: 0 },
      { q: '« Depuis plus de quatre mille ans… nous attendions » : pourquoi l’imparfait ?', options: ['Une attente longue, en cours', 'Une action d’un seul moment', 'Une politesse'], answer: 0 },
      { q: 'Quelle forme est « Chantons » ?', options: ['L’impératif (nous)', 'Le présent (vous)', 'Le futur'], answer: 0 },
    ],
  },
];
