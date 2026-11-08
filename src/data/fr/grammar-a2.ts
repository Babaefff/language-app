import type { GrammarLesson } from '../types';
import { ex, q } from './registry';

/** French A2 grammar, in the order of the A2 units. */
export const GRAMMAR_FR_A2: GrammarLesson[] = [
  {
    id: 'fr-g-demonstratives', level: 'A2', title: 'this and these: ce, cet, cette, ces', titleEs: 'Les démonstratifs',
    summary: 'One word for this / that, which agrees like an article.',
    blocks: [
      { t: 'text', md: `
## Four forms
| | singular | plural |
| masculine | **ce** pull · **cet** anorak (vowel) | **ces** pulls |
| feminine | **cette** robe | **ces** robes |

French doesn't separate *this* and *that*: **ce livre** is both. Add **-ci** / **-là** only to contrast: ${ex('Je préfère ce livre-ci, pas ce livre-là.', 'I prefer this book, not that one.')}

## ce, cet, cette with time
**ce matin** (this morning), **cet après-midi**, **ce soir** (tonight), **cette semaine**, **cet été**.` },
      { t: 'logic', md: `**cet** is elision again: *ce anorak* would put two vowels together, so French adds a **t** (like *a-t-il*) instead of dropping a letter. Masculine and feminine sound the same there: *cet ami* / *cette amie*.` },
      { t: 'mistakes', items: [['ce hôtel', 'cet hôtel', 'h is silent, so hôtel starts with a vowel sound: cet.'], ['cette pantalon', 'ce pantalon', 'pantalon is masculine.'], ['ce chaussures', 'ces chaussures', 'Plural is always ces.']] },
    ],
    practice: {
      choice: [
        q('Je peux essayer ___ robe ?', ['cette', 'ce', 'cet'], 'robe is feminine: cette.', 'Can I try on this dress?'),
        q('___ anorak est trop grand.', ['Cet', 'Ce', 'Cette'], 'anorak is masculine and starts with a vowel: cet.', 'This anorak is too big.'),
        q('___ chaussures sont chères.', ['Ces', 'Ce', 'Cettes'], 'Plural, whatever the gender: ces.', 'These shoes are expensive.'),
        q('Je vais au cinéma ___ soir.', ['ce', 'cet', 'cette'], 'soir is masculine and starts with a consonant: ce soir.', "I'm going to the cinema tonight."),
        q('___ hôtel est très calme.', ['Cet', 'Ce', 'Cette'], 'The h is silent, so hôtel counts as a vowel: cet.', 'This hotel is very quiet.'),
      ],
    },
  },
  {
    id: 'fr-g-passe-compose', level: 'A2', title: 'The passé composé with avoir', titleEs: 'Le passé composé avec avoir',
    summary: 'avoir + participle: the everyday past tense.',
    blocks: [
      { t: 'text', md: `
## Two parts: helper + participle
The helper **avoir** is conjugated as in the present; the **participle** never changes (with avoir).` },
      { t: 'table', verbs: ['parler', 'finir', 'attendre'], tense: 'perfecto', caption: 'Regular participles: -é, -i, -u' },
      { t: 'text', md: `
## The irregular participles to learn
| faire → **fait** | prendre → **pris** | mettre → **mis** |
| dire → **dit** | écrire → **écrit** | ouvrir → **ouvert** |
| voir → **vu** | boire → **bu** | lire → **lu** |
| avoir → **eu** | être → **été** | pouvoir → **pu** |
| vouloir → **voulu** | devoir → **dû** | savoir → **su** |

## Negative and questions
The sandwich and the inversion use **avoir**: ${ex("Je n'ai pas vu le film.", "I didn't see the film.")} · ${ex('As-tu fini ?', 'Have you finished?')}
Short adverbs go between: ${ex("J'ai déjà mangé.", "I've already eaten.")} · ${ex("J'ai bien dormi.", 'I slept well.')}` },
      { t: 'table', verbs: ['faire', 'prendre', 'voir'], tense: 'perfecto', caption: 'Common irregular participles' },
      { t: 'logic', md: `The passé composé is built exactly like the English present perfect (*I have spoken* → *j'ai parlé*), but it is used for **every finished action**, also where English says "I spoke". The participle endings follow the infinitive's family: **-er → é, -ir → i, -re → u**, and the irregular ones are mostly short: *fait, pris, vu, bu, lu*.` },
      { t: 'mistakes', items: [["J'ai allé au cinéma.", 'Je suis allé au cinéma.', 'aller uses être (next lesson).'], ["J'ai prendu le bus.", "J'ai pris le bus.", 'prendre → pris.'], ["Je n'ai vu pas le film.", "Je n'ai pas vu le film.", 'ne … pas wraps avoir.']] },
    ],
    practice: {
      conj: { verbs: ['parler', 'manger', 'finir', 'attendre', 'faire', 'prendre', 'voir', 'boire', 'lire', 'écrire', 'mettre', 'dire'], tenses: ['perfecto'], count: 12 },
      choice: [
        q("Hier, j'___ un bon film.", ['ai vu', 'ai voir', 'suis vu'], 'avoir + participle; voir → vu.', 'Yesterday I saw a good film.'),
        q('Nous avons ___ le train.', ['pris', 'prendu', 'prenu'], 'prendre has an irregular participle: pris.', 'We took the train.'),
        q('Ils ___ leurs devoirs.', ['ont fini', 'sont finis', 'ont finu'], 'finir takes avoir and the participle fini.', 'They finished their homework.'),
        q("Je ___ pas compris.", ["n'ai", 'ne suis', 'ai'], 'ne … pas wraps the helper avoir; ne becomes n\' before ai.', "I didn't understand."),
        q('Tu as ___ la porte ?', ['ouvert', 'ouvri', 'ouvré'], 'ouvrir → ouvert.', 'Did you open the door?'),
      ],
    },
  },
  {
    id: 'fr-g-etre-verbs', level: 'A2', title: 'The passé composé with être', titleEs: 'Le passé composé avec être',
    summary: 'Verbs of movement and reflexive verbs take être, and the participle agrees.',
    blocks: [
      { t: 'text', md: `
## Which verbs take être?
1. About 15 verbs of **coming, going and becoming**: aller / venir, arriver / partir, entrer / sortir, monter / descendre, naître / mourir, rester, tomber, retourner, rentrer, revenir, devenir.
2. **All reflexive verbs**: *je me suis levé*.

They come in pairs of opposites, which makes them easier to remember.` },
      { t: 'table', verbs: ['aller', 'partir', 'se lever'], tense: 'perfecto', caption: 'With être: the participle agrees in the plural (and with a female subject)' },
      { t: 'text', md: `
## Agreement, like an adjective
After **être**, the participle behaves like an adjective: **-e** feminine, **-s** plural.
- ${ex('Il est arrivé.', 'He arrived.')} · ${ex('Elle est arrivée.', 'She arrived.')}
- ${ex('Ils sont partis.', 'They left.')} · ${ex('Elles sont parties.', 'They (f) left.')}
- ${ex('Nous nous sommes levés tôt.', 'We got up early.')}

The table shows the masculine; a woman writes *je suis allée*. You usually can't hear the difference.

## Negative
${ex('Je ne suis pas sorti.', "I didn't go out.")} · ${ex('Elle ne s\'est pas levée.', "She didn't get up.")}` },
      { t: 'logic', md: `With **avoir** the participle is like a verb part and never changes; with **être** it describes the subject, exactly like an adjective after *être* (*elle est grande* → *elle est partie*). These verbs take être because they describe a **change of place or state** of the subject itself.` },
      { t: 'mistakes', items: [["J'ai arrivé à midi.", 'Je suis arrivé à midi.', 'arriver takes être.'], ['Elle est allé à Paris.', 'Elle est allée à Paris.', 'With être the participle agrees: add -e.'], ['Je me ai levé.', 'Je me suis levé.', 'Reflexive verbs take être.']] },
    ],
    practice: {
      conj: { verbs: ['aller', 'venir', 'arriver', 'partir', 'sortir', 'rester', 'tomber', 'se lever', 'se coucher'], tenses: ['perfecto'], count: 12 },
      choice: [
        q('Nous ___ au cinéma.', ['sommes allés', 'avons allé', 'sommes allé'], 'aller takes être, and with nous the participle is plural: allés.', 'We went to the cinema.'),
        q('Marie est ___ à huit heures.', ['partie', 'parti', 'partis'], 'Marie is feminine singular: partie.', 'Marie left at eight.'),
        q('Hier, je ___ tard.', ['me suis couché', "m'ai couché", 'ai couché'], 'Reflexive verbs take être: je me suis couché.', 'Yesterday I went to bed late.'),
        q('Ils ___ trois jours à Nice.', ['sont restés', 'ont resté', 'sont resté'], 'rester takes être; ils → restés.', 'They stayed three days in Nice.'),
        q("Elle ___ dans l'escalier.", ['est tombée', 'a tombé', 'est tombé'], 'tomber takes être; elle → tombée.', 'She fell on the stairs.'),
      ],
    },
  },
  {
    id: 'fr-g-imparfait', level: 'A2', title: 'The imparfait', titleEs: 'L’imparfait',
    summary: 'The nous stem + -ais: how things were and used to be.',
    blocks: [
      { t: 'text', md: `
## One rule for (almost) every verb
Take **nous** in the present, drop **-ons**, add the endings. Even irregular verbs follow it:
| nous **parl**ons | je parlais |
| nous **finiss**ons | je finissais |
| nous **pren**ons | je prenais |
| nous **buv**ons | je buvais |
| nous **fais**ons | je faisais |

The only exception is **être → ét-**.` },
      { t: 'table', verbs: ['parler', 'finir', 'être'], tense: 'imperfecto', caption: 'Imparfait endings: -ais, -ais, -ait, -ions, -iez, -aient' },
      { t: 'text', md: `
## What it describes
- **background**: ${ex('Il faisait froid et il pleuvait.', 'It was cold and it was raining.')}
- **habits**: ${ex("Quand j'étais petit, je jouais au foot.", 'When I was little, I used to play football.')}
- **states**: age, feelings, thoughts: ${ex("J'avais peur.", 'I was scared.')}
- **an action in progress**: ${ex('Je lisais.', 'I was reading.')}` },
      { t: 'logic', md: `The imparfait reuses what you already know: the **nous stem** of the present (which already contains the irregularities: *buv-, fais-, finiss-*) and the person code (**-ions, -iez**, silent **-ais / -ait / -aient**). It is the French form of Spanish *-aba / -ía*: the past seen from the inside, without a beginning or end.` },
      { t: 'mistakes', items: [["J'étions content.", "J'étais content.", 'je takes -ais.'], ['Nous parlaions.', 'Nous parlions.', 'nous takes -ions, not -aions.'], ['Je buais.', 'Je buvais.', 'Start from nous buvons → buv-.']] },
    ],
    practice: {
      conj: { verbs: ['parler', 'habiter', 'finir', 'être', 'avoir', 'faire', 'aller', 'prendre', 'boire', 'manger'], tenses: ['imperfecto'], count: 12 },
      choice: [
        q("Quand j'___ petit, j'habitais à Lyon.", ['étais', 'ai été', 'étions'], 'A state in the past, with je: étais (être → ét-).', 'When I was little, I lived in Lyon.'),
        q('Nous ___ au foot tous les samedis.', ['jouions', 'jouaions', 'avons joué'], 'A habit: imparfait, nous → -ions.', 'We used to play football every Saturday.'),
        q('Il ___ beau.', ['faisait', 'fesait', 'a fait'], 'Background weather: imparfait of faire, from nous faisons → fais-.', 'The weather was nice.'),
        q('Tu ___ du lait le matin ?', ['buvais', 'boivais', 'buais'], 'From nous buvons → buv-: tu buvais.', 'Did you use to drink milk in the morning?'),
        q('Elles ___ dix ans.', ['avaient', 'avait', 'avions'], 'Age in the past uses the imparfait; elles → -aient.', 'They were ten.'),
      ],
    },
  },
  {
    id: 'fr-g-pc-vs-imp', level: 'A2', title: 'Passé composé or imparfait?', titleEs: 'Passé composé ou imparfait ?',
    summary: 'The event in the foreground, the background behind it.',
    blocks: [
      { t: 'text', md: `
## Both forms side by side
| | passé composé: an event | imparfait: background, habit |
| parler | j'ai parlé | je parlais |
| aller | je suis allé | j'allais |
| être | j'ai été | j'étais |
| avoir | j'ai eu | j'avais |

## The film test
Imagine a film: the **imparfait** is the scenery and what was going on; the **passé composé** is what happens next on screen.
${ex('Je lisais quand le téléphone a sonné.', 'I was reading when the phone rang.')}

## Signal words
- passé composé: **un jour, soudain, hier, une fois, trois fois, à 8 heures**
- imparfait: **toujours, tous les jours, d'habitude, souvent, quand j'étais petit, pendant que**

${ex("D'habitude, je prenais le bus, mais hier j'ai pris le train.", 'Usually I took the bus, but yesterday I took the train.')}` },
      { t: 'logic', md: `It's the same choice as Spanish **pretérito / imperfecto**: is the action a **finished point** on the timeline (passé composé) or an **ongoing stretch** you're looking at from inside (imparfait)? The verb doesn't decide; the way you see the moment does.` },
      { t: 'mistakes', items: [['Quand j\'ai été petit, j\'ai habité à Nice.', "Quand j'étais petit, j'habitais à Nice.", 'Childhood is background: imparfait.'], ['Je dormais quand tu appelais.', "Je dormais quand tu as appelé.", 'The call interrupts: it is the event.'], ['Hier il pleuvait toute la journée, alors je restais.', 'Hier il pleuvait, alors je suis resté à la maison.', 'Your decision to stay is one finished event.']] },
    ],
    practice: {
      choice: [
        q('Je ___ la télé quand tu as appelé.', ['regardais', 'ai regardé', 'regarde'], 'An action in progress, interrupted: imparfait.', 'I was watching TV when you called.'),
        q('Hier, nous ___ à la plage.', ['sommes allés', 'allions', 'allons'], 'One finished event (hier): passé composé.', 'Yesterday we went to the beach.'),
        q('Quand il était petit, il ___ souvent.', ['tombait', 'est tombé', 'tombe'], 'A repeated habit (souvent): imparfait.', 'When he was little he often fell.'),
        q('Soudain, le téléphone ___.', ['a sonné', 'sonnait', 'sonne'], 'soudain marks a single event: passé composé.', 'Suddenly the phone rang.'),
        q('Il ___ froid, alors j\'ai mis un pull.', ['faisait', 'a fait', 'fait'], 'The weather is the background: imparfait.', 'It was cold, so I put on a jumper.'),
      ],
    },
  },
  {
    id: 'fr-g-pronouns-direct', level: 'A2', title: 'Object pronouns: le, la, les', titleEs: 'Les pronoms COD',
    summary: 'it, him, her, them: before the verb.',
    blocks: [
      { t: 'text', md: `
## Before the verb
English puts "it" after the verb; French puts it **before**:
| me / m' | me | nous | us |
| te / t' | you | vous | you |
| le / l' | him, it (m) | les | them |
| la / l' | her, it (f) | | |

- ${ex('Le gâteau ? Je le prends.', "The cake? I'll take it.")}
- ${ex('Je t\'aime.', 'I love you.')}
- ${ex('Les clés ? Je les cherche.', 'The keys? I\'m looking for them.')}

## With two verbs
The pronoun goes before the verb it belongs to, usually the infinitive: ${ex('Je vais le faire.', "I'm going to do it.")} · ${ex('Tu peux m\'aider ?', 'Can you help me?')}

## Negative and passé composé
${ex('Je ne le connais pas.', "I don't know him.")} · ${ex("Je l'ai vu hier.", 'I saw him yesterday.')} (before the helper)` },
      { t: 'logic', md: `It's the same slot as the reflexive pronouns: **right before the verb it belongs to** (*je me lève* / *je le prends*). In the passé composé that verb is the helper: *je l'ai vu*, *je me suis levé*. Learn the slot once and every pronoun fits it.` },
      { t: 'mistakes', items: [['Je prends le.', 'Je le prends.', 'Object pronouns go before the verb.'], ['Je le vais faire.', 'Je vais le faire.', 'It belongs to faire, so it goes before faire.'], ['Je ai le vu.', "Je l'ai vu.", 'Before the helper, with elision.']] },
    ],
    practice: {
      choice: [
        q('Le pain ? Je ___ achète.', ["l'", 'le', 'la'], 'pain is masculine, and achète starts with a vowel: l\'.', "The bread? I'm buying it."),
        q('La voiture ? Je ___ prends.', ['la', 'le', 'lui'], 'voiture is feminine and a direct object: la.', "The car? I'm taking it."),
        q('Tes amis ? Je ___ vois demain.', ['les', 'leur', 'le'], 'amis is plural and a direct object: les.', "Your friends? I'm seeing them tomorrow."),
        q('Ce film ? Je vais ___ regarder.', ['le', 'les', 'la'], 'film is masculine; it goes before the infinitive it belongs to.', "This film? I'm going to watch it."),
        q('Ta sœur ? Je ne ___ connais pas.', ['la', 'le', 'lui'], 'sœur is feminine; connaître takes a direct object: la.', "Your sister? I don't know her."),
      ],
    },
  },
  {
    id: 'fr-g-time', level: 'A2', title: 'depuis, il y a, venir de', titleEs: 'Le temps : depuis, il y a, venir de',
    summary: 'How long, how long ago, and what just happened.',
    blocks: [
      { t: 'text', md: `
## depuis + present
If it's **still going on**, French uses the present: ${ex("J'habite à Paris depuis cinq ans.", "I've lived in Paris for five years.")}
Ask: **Depuis quand…? / Depuis combien de temps…?**

## il y a + past: ago
${ex("Je suis arrivé il y a deux heures.", 'I arrived two hours ago.')}

## pendant: during, for (finished)
${ex("J'ai habité à Rome pendant un an.", 'I lived in Rome for a year.')} (it's over)

## venir de + infinitive: just
${ex('Il vient de partir.', 'He has just left.')}
| near past | venir de + infinitive |
| near future | aller + infinitive |` },
      { t: 'logic', md: `French ties the tense to the **reality now**: if it's still true, it's the **present** (*depuis*); if it's over, it's the **past** (*il y a, pendant*). And the near past mirrors the near future: **venir de** (coming from doing) vs **aller** (going to do).` },
      { t: 'mistakes', items: [["J'ai habité ici depuis deux ans.", "J'habite ici depuis deux ans.", 'Still true: present + depuis.'], ['Je suis arrivé avant deux jours.', 'Je suis arrivé il y a deux jours.', 'ago = il y a.'], ["Je viens de mangé.", 'Je viens de manger.', 'venir de + infinitive.']] },
    ],
    practice: {
      conj: { verbs: ['venir', 'revenir'], tenses: ['presente'], count: 6 },
      choice: [
        q("J'apprends le français ___ un an.", ['depuis', 'il y a', 'pendant'], 'Still learning now: present + depuis.', "I've been learning French for a year."),
        q("Elle est partie ___ dix minutes.", ['il y a', 'depuis', 'pendant'], 'A finished moment in the past: il y a = ago.', 'She left ten minutes ago.'),
        q("Nous ___ de manger.", ['venons', 'allons', 'avons'], 'Just did: venir de + infinitive.', "We've just eaten."),
        q("J'ai travaillé à Londres ___ trois ans.", ['pendant', 'depuis', 'il y a'], 'A finished period: pendant.', 'I worked in London for three years.'),
        q("Le film vient de ___.", ['commencer', 'commencé', 'commence'], 'After venir de, the verb stays in the infinitive.', 'The film has just started.'),
      ],
    },
  },
  {
    id: 'fr-g-comparison', level: 'A2', title: 'Comparing: plus, moins, aussi', titleEs: 'La comparaison',
    summary: 'plus … que, moins … que, aussi … que, and meilleur / mieux.',
    blocks: [
      { t: 'text', md: `
## Three building blocks
**plus** (more) / **moins** (less) / **aussi** (as) + adjective + **que**:
- ${ex('Lyon est plus petit que Paris.', 'Lyon is smaller than Paris.')}
- ${ex('Le bus est moins rapide que le train.', 'The bus is slower than the train.')}
- ${ex('Elle est aussi grande que moi.', 'She is as tall as me.')}

With nouns use **plus de / moins de / autant de**: ${ex("J'ai plus de temps que toi.", 'I have more time than you.')}

## bon / bien
| adjective | bon → **meilleur** | le meilleur |
| adverb | bien → **mieux** | le mieux |

${ex('Ce gâteau est meilleur.', 'This cake is better.')} · ${ex('Tu chantes mieux que moi.', 'You sing better than me.')}

## The superlative
**le / la / les + plus / moins** + adjective (+ **de**): ${ex("C'est la plus belle ville de France.", "It's the most beautiful town in France.")}` },
      { t: 'logic', md: `As in Spanish, the superlative is just the comparative with an **article** in front: *plus grand* → *le plus grand*. The adjective keeps all its usual habits: it agrees, and goes before or after the noun as it always does.` },
      { t: 'mistakes', items: [['Il est plus bon.', 'Il est meilleur.', 'bon → meilleur, never plus bon.'], ['Elle est plus grand que moi.', 'Elle est plus grande que moi.', 'The adjective still agrees.'], ['la ville la plus belle en France', 'la ville la plus belle de France', 'After a superlative, "in" is de.']] },
    ],
    practice: {
      choice: [
        q('Paris est plus grand ___ Lyon.', ['que', 'de', 'comme'], 'Comparisons use que.', 'Paris is bigger than Lyon.'),
        q('Ce restaurant est ___ que l\'autre.', ['meilleur', 'plus bon', 'mieux'], 'bon is irregular: meilleur.', 'This restaurant is better than the other one.'),
        q('Il parle ___ que moi.', ['mieux', 'meilleur', 'plus bien'], 'An adverb (how he speaks): bien → mieux.', 'He speaks better than me.'),
        q('Ma sœur est aussi ___ que mon frère.', ['grande', 'grand', 'grands'], 'The adjective agrees with sœur: grande.', 'My sister is as tall as my brother.'),
        q("C'est le plus haut bâtiment ___ la ville.", ['de', 'en', 'dans'], 'After a superlative, "in" is de.', "It's the tallest building in the town."),
      ],
    },
  },
  {
    id: 'fr-g-pronouns-indirect', level: 'A2', title: 'To whom? lui and leur', titleEs: 'Les pronoms COI',
    summary: 'Verbs with à + person: je lui parle, je leur écris.',
    blocks: [
      { t: 'text', md: `
## à + person → lui / leur
Many verbs take a person with **à**: *parler à, téléphoner à, donner à, écrire à, dire à, envoyer à, demander à, répondre à*.
| à moi → **me** | à nous → **nous** |
| à toi → **te** | à vous → **vous** |
| à lui / à elle → **lui** | à eux / à elles → **leur** |

- ${ex('Je parle à Julie. → Je lui parle.', 'I talk to Julie. → I talk to her.')}
- ${ex('Tu écris à tes parents ? → Tu leur écris ?', 'Do you write to your parents? → Do you write to them?')}

## Same slot as le / la
${ex('Je lui ai téléphoné.', 'I phoned him / her.')} · ${ex('Je vais leur dire.', "I'm going to tell them.")}

## le or lui?
Ask: is there an **à** before the person? *voir quelqu'un* → **le**; *parler à quelqu'un* → **lui**. English doesn't always help: *téléphoner à* (to phone **to**), but *attendre* / *chercher* / *écouter* take le.` },
      { t: 'logic', md: `French splits the object into **direct** (le / la / les: *I see him*) and **indirect** (lui / leur: *I speak to him*). Only the third person shows the difference; **me, te, nous, vous** work for both. And **leur** never takes an s: it's a pronoun, not the possessive *leurs*.` },
      { t: 'mistakes', items: [['Je le téléphone.', 'Je lui téléphone.', 'téléphoner à: indirect → lui.'], ['Je leurs parle.', 'Je leur parle.', 'The pronoun leur has no s.'], ['Je lui attends.', "Je l'attends.", 'attendre takes a direct object: le.']] },
    ],
    practice: {
      choice: [
        q('Je téléphone à ma mère. → Je ___ téléphone.', ['lui', 'la', 'leur'], 'téléphoner à + one person → lui.', 'I phone my mother. → I phone her.'),
        q('Tu écris à tes grands-parents ? Oui, je ___ écris.', ['leur', 'les', 'leurs'], 'écrire à + several people → leur (no s).', 'Do you write to your grandparents? Yes, I write to them.'),
        q("J'attends Paul. → Je ___ attends.", ["l'", 'lui', 'le'], 'attendre has no à: direct → le, elided before a vowel.', "I'm waiting for Paul. → I'm waiting for him."),
        q('Il ___ a donné un cadeau.', ['nous', 'leur nous', 'à nous'], 'à nous → nous, before the helper.', 'He gave us a present.'),
        q('Je vais ___ dire la vérité. (à Léa)', ['lui', 'la', 'elle'], 'dire à + one person → lui, before the infinitive.', "I'm going to tell her the truth."),
      ],
    },
  },
  {
    id: 'fr-g-y-en', level: 'A2', title: 'y and en', titleEs: 'Les pronoms y et en',
    summary: 'y = there, en = some / of it.',
    blocks: [
      { t: 'text', md: `
## y: there, and à + thing
**y** replaces a **place** (à, en, dans, chez…) or **à + thing**:
- ${ex('Tu vas à la gare ? Oui, j\'y vais.', "Are you going to the station? Yes, I'm going there.")}
- ${ex('Tu penses à ton examen ? Oui, j\'y pense.', 'Are you thinking about your exam? Yes, I\'m thinking about it.')}

## en: some, of it
**en** replaces **de + something**: an amount (*du, de la, des*), a number, or verbs with *de*:
- ${ex("Tu veux du café ? Oui, j'en veux.", 'Do you want coffee? Yes, I want some.')}
- ${ex("Tu as des enfants ? Oui, j'en ai trois.", 'Do you have children? Yes, I have three.')}
- ${ex("Tu parles de ton voyage ? Oui, j'en parle.", 'Are you talking about your trip? Yes, I\'m talking about it.')}

**Il y en a** = there is some / there are some. Negative: ${ex("Il n'y en a plus.", "There isn't any left.")}

## Same slot
${ex("J'y suis allé.", 'I went there.')} · ${ex("Je n'en ai pas.", "I don't have any.")}` },
      { t: 'logic', md: `**y** and **en** are the pronoun versions of the two little words you meet everywhere: **y ≈ à** (place, direction) and **en ≈ de** (amount, origin). Look at the preposition you'd use, and the pronoun follows.` },
      { t: 'mistakes', items: [["Je vais y demain.", "J'y vais demain.", 'y goes before the verb.'], ["J'ai deux.", "J'en ai deux.", 'With a number, French needs en.'], ['Je le veux. (du pain)', "J'en veux.", 'du pain is an amount: en.']] },
    ],
    practice: {
      choice: [
        q('Tu vas au cinéma ? Oui, j\'___ vais ce soir.', ['y', 'en', 'le'], 'A place with à → y.', "Are you going to the cinema? Yes, I'm going there tonight."),
        q("Tu veux de l'eau ? Oui, j'___ veux.", ['en', 'y', 'la'], 'An amount (de l\') → en.', 'Do you want water? Yes, I want some.'),
        q("Tu as des sœurs ? Oui, j'___ ai deux.", ['en', 'les', 'y'], 'A number of something → en.', 'Do you have sisters? Yes, I have two.'),
        q("Il ___ a beaucoup de touristes.", ['y', 'en', 'lui'], 'Fixed phrase il y a: there is / are.', 'There are a lot of tourists.'),
        q("Tu es déjà allé à Rome ? Oui, j'___ suis allé l'an dernier.", ['y', 'en', 'le'], 'A place with à → y, before the helper.', 'Have you been to Rome? Yes, I went there last year.'),
      ],
    },
  },
];
