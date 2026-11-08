import type { GrammarLesson } from '../types';

/** Extra depth for each German lesson: a detailed section and "the logic behind it". */
export const DEEP_DE: Record<string, { more?: string; logic: string }> = {
  'de-g-verbs': {
    more: `
## Stem + ending
| | machen | arbeiten | heißen |
| ich | mach**e** | arbeit**e** | heiß**e** |
| du | mach**st** | arbeit**est** | heiß**t** |
| er / sie / es | mach**t** | arbeit**et** | heiß**t** |
| wir | mach**en** | arbeit**en** | heiß**en** |
| ihr | mach**t** | arbeit**et** | heiß**t** |
| sie / Sie | mach**en** | arbeit**en** | heiß**en** |

- Stems ending in **-t / -d** add an **e** so you can pronounce it: du arbeit**e**st, er find**e**t.
- Stems ending in **-s / -ß / -z** only add **-t** for du: du heißt, du tanzt.
- **wir** and **sie / Sie** are always the infinitive.

## Sie = polite "you"
Always capitalised, and always the same form as "they": *Kommen Sie aus Spanien?*`,
    logic: `There are only **four present-tense endings**: -e, -st, -t, -en. They come in pairs: **wir = sie/Sie** (-en) and, for regular verbs, **er = ihr** (-t). The infinitive alone already gives you two forms.`,
  },
  'de-g-sein-haben': {
    more: `
| | sein | haben |
| ich | bin | habe |
| du | bist | hast |
| er / sie / es | ist | hat |
| wir | sind | haben |
| ihr | seid | habt |
| sie / Sie | sind | haben |

## Two jobs each
1. As main verbs: *Ich bin müde. Ich habe Hunger.*
2. As helpers for the past (Perfekt): *Ich habe gegessen. Ich bin gefahren.*

## German says "have" where English says "be"
Hunger **haben** (to be hungry), Durst haben, Angst haben, Recht haben, Zeit haben, Glück haben.

## Age uses sein
*Ich bin 25 (Jahre alt).* Unlike Spanish and French, which use "have".`,
    logic: `sein and haben matter twice: as words in their own right, and as the **helpers of the Perfekt**. Rule of thumb for the past: **movement or change of state → sein**, everything else → haben.`,
  },
  'de-g-gender': {
    more: `
## Endings that predict gender
| der (masculine) | die (feminine) | das (neuter) |
| -er (people): der Lehrer | -ung: die Zeitung | -chen, -lein: das Mädchen |
| -ling: der Frühling | -heit, -keit: die Freiheit | -ment: das Instrument |
| -ismus: der Tourismus | -schaft: die Freundschaft | -um: das Museum |
| days, months, seasons: der Montag | -ion, -tät: die Nation, die Universität | verbs as nouns: das Essen |
| | most nouns in -e: die Lampe | |

## Compound nouns: the last word decides
*die Tür + **der** Schlüssel = **der** Türschlüssel*

## Grammar beats meaning
*das Mädchen* (the girl) is neuter because of -chen.`,
    logic: `About **80 % of nouns can be guessed from their ending**. Learn every noun as a set: **article + noun + plural** (der Tisch, die Tische). In compounds, **the last part rules**.`,
  },
  'de-g-vowel': {
    more: `
## Only du and er / sie / es change
| | fahren (a → ä) | sprechen (e → i) | sehen (e → ie) |
| ich | fahre | spreche | sehe |
| du | f**ä**hrst | spr**i**chst | s**ie**hst |
| er / sie / es | f**ä**hrt | spr**i**cht | s**ie**ht |
| wir | fahren | sprechen | sehen |

## The families
- **a → ä**: fahren, schlafen, tragen, waschen, fallen, laufen (au → äu)
- **e → i**: sprechen, essen (isst), geben, helfen, nehmen (nimmt), treffen, vergessen
- **e → ie**: sehen, lesen, empfehlen

## Where it comes back
The e → i change also appears in the **du command**: *Sprich! Iss! Nimm!* (but a → ä does not: *Fahr!*)`,
    logic: `These are "strong" verbs, and the change only ever hits **du and er/sie/es**. If you know the er form (fährt, spricht), you know the du form, and for e → i verbs the command form too.`,
  },
  'de-g-word-order': {
    more: `
## Position 2 belongs to the verb
| position 1 | verb | the rest |
| Ich | fahre | morgen nach Berlin. |
| Morgen | fahre | ich nach Berlin. |
| Nach Berlin | fahre | ich morgen. |
Whatever comes first, the conjugated verb stays **second**, and the subject moves behind it.

## The verb bracket (Satzklammer)
With two verb parts, the second goes to the **very end**:
*Ich **habe** gestern einen Film **gesehen**. Ich **will** heute Deutsch **lernen**. Ich **rufe** dich morgen **an**.*

## Inside the bracket: time, manner, place
*Ich fahre **morgen** **mit dem Zug** **nach Hamburg**.*

## Questions
W-questions keep the verb second: *Wann **kommst** du?* Yes/no questions start with it: ***Kommst** du?*`,
    logic: `A German sentence is a **frame**: the conjugated verb in slot 2, the other verb part at the end, everything else in between. Once you see this bracket, the **Perfekt, modal verbs, separable verbs, the future and the passive all have the same shape**.`,
  },
  'de-g-accusative': {
    more: `
## Only the masculine singular changes
| | nominative | accusative |
| masculine | der / ein / kein | **den / einen / keinen** |
| feminine | die / eine | die / eine |
| neuter | das / ein | das / ein |
| plural | die / – | die / – |

## When to use it
- the **direct object**: *Ich sehe den Hund. Ich habe einen Bruder.*
- after **es gibt**: *Es gibt einen Park.*
- after **durch, für, gegen, ohne, um, bis**: *für den Freund, ohne einen Plan*

## Pronouns change too
ich → **mich**, du → **dich**, er → **ihn**, wir → **uns**, ihr → **euch**`,
    logic: `Cases show **who does what**, so German word order can move freely: *Den Hund sieht der Mann* still means "the man sees the dog". The accusative only shows itself in the **masculine (-n / -en)** and in pronouns. Learn der → den and you have most of it.`,
  },
  'de-g-separable': {
    more: `
## The prefix goes to the end
*anrufen → Ich **rufe** dich morgen **an**.* · *einkaufen → Wir **kaufen** im Supermarkt **ein**.*

## Back together when the verb is at the end
- with modals: *Ich muss dich **anrufen**.*
- in subordinate clauses: *…, weil ich dich **anrufe**.*
- in the Perfekt, **ge** goes between them: an**ge**rufen, ein**ge**kauft, auf**ge**standen
- with zu: an**zu**rufen

## Spotting them
Separable prefixes are real words and are **stressed**: AN-rufen, AUF-stehen, MIT-kommen, EIN-kaufen, FERN-sehen.
Inseparable prefixes are **never stressed and never move**: be-, ge-, er-, ver-, zer-, ent-, emp-, miss- (bekommen, verstehen, erzählen).`,
    logic: `A separable prefix is simply **the far end of the verb bracket**. When the verb sits in position 2, the prefix closes the bracket at the end; when the verb itself goes to the end, the two join up again.`,
  },
  'de-g-modals': {
    more: `
| | können | müssen | wollen | dürfen | sollen | möchten |
| ich | kann | muss | will | darf | soll | möchte |
| du | kannst | musst | willst | darfst | sollst | möchtest |
| er / sie / es | kann | muss | will | darf | soll | möchte |
| wir | können | müssen | wollen | dürfen | sollen | möchten |

- **ich and er are identical**, with no ending.
- The vowel changes in the singular (except sollen).

## The infinitive goes to the end
*Ich **kann** gut **schwimmen**. Du **darfst** hier nicht **rauchen**.*

## Meanings to watch
- **nicht müssen** = don't have to: *Du musst nicht kommen.*
- **nicht dürfen** = mustn't: *Du darfst nicht kommen.*
- **möchte** = would like (polite): *Ich möchte einen Kaffee.*`,
    logic: `Modals are the simplest verb bracket: **modal in position 2, plain infinitive at the end**. Their singular forms behave like past-tense forms (ich = er, no -t). That's why they look irregular, and why they all look irregular in the same way.`,
  },
  'de-g-perfekt': {
    more: `
## haben / sein + participle at the end
*Ich **habe** einen Film **gesehen**. Wir **sind** nach Wien **gefahren**.*

## How the participle is built
| type | pattern | examples |
| weak (regular) | ge- … -t | gemacht, gekauft, gearbeitet |
| strong | ge- … -en, often a new vowel | gesehen, gegessen, getrunken, geschrieben |
| separable | prefix + ge + … | eingekauft, angerufen, aufgestanden |
| inseparable, -ieren | no ge- | bekommen, verstanden, studiert, telefoniert |

## sein or haben?
**sein** for movement from A to B (gehen, fahren, fliegen, kommen), changes of state (aufstehen, einschlafen, werden, sterben), and sein, bleiben, passieren. Everything else takes **haben**.`,
    logic: `The Perfekt is **the** spoken past tense. It's the verb bracket again: haben/sein in position 2, participle at the end. Weak verbs follow one rule (ge-…-t). Strong verbs share vowel patterns you'll see again in the Präteritum: singen – gesungen, trinken – getrunken.`,
  },
  'de-g-plural': {
    logic: `Plurals aren't random: they're linked to **gender and ending**. Most feminine nouns take **-(e)n**, many masculine nouns **-e**, short neuter nouns **-er** (with umlaut), nouns in -er/-el/-en **nothing**, and foreign words **-s**.

The plural article is always **die**, and the **dative plural always ends in -n**: mit den Kinder**n**.`,
  },
  'de-g-negation': {
    more: `
## nicht …, sondern / kein …, sondern
To correct something, use **sondern** (but rather): *Das ist nicht mein Hund, **sondern** dein Hund. Ich trinke keinen Kaffee, **sondern** Tee.*

## kein has the same endings as ein
*Ich habe **keinen** Bruder* (masculine accusative) · *mit **keinem** Freund* (dative) · ***keine** Zeit* · ***keine** Kinder* (plural).`,
    logic: `**kein** negates a noun that would otherwise have **ein** or no article. **nicht** negates everything else. nicht goes **right before** the part it negates, or **at the end** to negate the whole sentence, so its position tells you what is being denied.`,
  },
  'de-g-dative': {
    more: `
## Pronouns and the plural -n
Dative pronouns: **mir, dir, ihm, ihr, ihm, uns, euch, ihnen / Ihnen**. Plural nouns add **-n**: *mit den Kinder**n***.

## Verbs that take the dative
helfen, danken, gefallen, gehören, gratulieren, antworten, schmecken, passen, folgen, glauben (jemandem)

## Two objects: a person (dative) and a thing (accusative)
*Ich gebe **dem Kind** **einen Apfel**.* Also schenken, zeigen, bringen, erklären, schicken.
With two pronouns, the accusative comes first: *Ich gebe **ihn ihm**.*`,
    logic: `The dative marks **the receiver, or the person affected**: "to / for whom". Its endings form a pattern: **-m** for masculine and neuter (dem, einem, ihm), **-r** for feminine (der, einer, ihr), **-n** for plural (den … -n).`,
  },
  'de-g-pronouns': {
    logic: `Pronoun endings **mirror the article endings**: ih**n** – de**n** (accusative), ih**m** – de**m** (dative), ih**r** – de**r** (feminine dative), ihne**n** – de**n** (dative plural). Learn one table and the other follows.`,
  },
  'de-g-twoway': {
    more: `
## Wo? → dative · Wohin? → accusative
| Wo? (where it is) | Wohin? (where it goes) |
| Das Buch liegt **auf dem** Tisch. | Ich lege das Buch **auf den** Tisch. |
| Ich bin **in der** Stadt. | Ich gehe **in die** Stadt. |
| Das Bild hängt **an der** Wand. | Ich hänge das Bild **an die** Wand. |

## The verb pairs
| position (dative) | putting somewhere (accusative) |
| liegen (to lie) | legen (to lay) |
| stehen (to stand) | stellen (to stand something up) |
| sitzen (to sit) | setzen (to sit someone down) |
| hängen – hing (to hang) | hängen – hängte (to hang something up) |

## Short forms
**im** (in dem), **ins** (in das), **am** (an dem), **ans** (an das)`,
    logic: `The case shows whether something **moves to a new place** (accusative, "wohin?") or **stays where it is** (dative, "wo?"). Even the verbs come in pairs that encode the same idea: legen / liegen, stellen / stehen, setzen / sitzen.`,
  },
  'de-g-weil-dass': {
    more: `
## The verb goes to the end
*Ich bleibe zu Hause, weil ich krank **bin**.* · *Ich weiß, dass du Recht **hast**.*
- With two verbs, the conjugated one comes **last**: *…, weil ich arbeiten **muss**. …, weil ich ihn gesehen **habe**.*
- Separable verbs join up again: *…, weil der Zug um 8 Uhr **abfährt**.*

## Starting with the subordinate clause
The whole clause counts as position 1, so the main verb comes right after the comma: *Weil ich krank bin, **bleibe** ich zu Hause.* (verb, comma, verb)

## wenn, als, ob
- **wenn**: if, or whenever: *Wenn ich Zeit habe, …*
- **als**: one time in the past: *Als ich klein war, …*
- **ob**: whether: *Ich weiß nicht, ob er kommt.*`,
    logic: `Every subordinating word (weil, dass, wenn, ob, als, obwohl, damit…) **sends all the verbs to the end**, with the conjugated one last. A whole subordinate clause can fill position 1; then the main verb follows straight after it.`,
  },
  'de-g-praeteritum': {
    more: `
## Who uses it?
**Written** stories and news use the Präteritum. **Speech** mostly uses the Perfekt, except for **sein, haben, the modals** and a few common forms (es gab, ich wusste), which are spoken too.

## Weak verbs add -te-
| ich machte | wir machten |
| du machtest | ihr machtet |
| er machte | sie machten |

## Strong verbs change their vowel, with no ending in ich / er
gehen → **ging**, kommen → **kam**, sehen → **sah**, finden → **fand**, geben → **gab**, schreiben → **schrieb**
| ich ging | wir gingen |
| du gingst | ihr gingt |
| er ging | sie gingen |

## The essentials
sein: **war** · haben: **hatte** · werden: **wurde** · können: **konnte** · müssen: **musste** · wollen: **wollte**`,
    logic: `Weak verbs add **-te-**; strong verbs **change their vowel** instead, and the same vowel family often appears in the participle: sprechen – sprach – gesprochen. In the Präteritum, **ich and er are always identical**, just like in the modals.`,
  },
  'de-g-adjectives': {
    more: `
## The signal rule
The noun's gender and case must be shown **once**, by the article or by the adjective.
- If the **article** already shows it (der, die, das, dem, den…), the adjective takes a weak **-e** or **-en**: *der alt**e** Mann, mit dem alt**en** Mann*.
- If the article doesn't (ein, mein, kein in some forms) or there is **no article**, the adjective shows it with the **article's own ending**: *ein alt**er** Mann, ein klein**es** Kind, kalt**es** Wasser*.

## After der / die / das
**-e** in the five "basic" slots (nominative singular, and feminine/neuter accusative singular), **-en** everywhere else.

## With no article
The ending is the article's ending: *gut**er** Wein* (der), *frisch**e** Milch* (die), *kalt**es** Bier* (das), *mit heiß**em** Tee* (dem).`,
    logic: `The ending is **a signal that appears exactly once** per noun phrase. When the article carries it, the adjective relaxes into -e / -en. When the article is missing or doesn't show it (ein), the adjective takes over the article's ending (-er, -es, -em…).`,
  },
  'de-g-comparison': {
    more: `
## -er and -(e)st
| schnell | schneller | am schnellsten |
| klein | kleiner | am kleinsten |
| alt | älter | am ältesten |
| groß | größer | am größten |
Many one-syllable adjectives add an umlaut: alt – älter, jung – jünger, kalt – kälter, warm – wärmer.

## Irregular forms
gut – **besser** – am **besten** · viel – **mehr** – am **meisten** · gern – **lieber** – am **liebsten** · hoch – **höher** – am **höchsten**

## als / wie
*größer **als** ich* (comparing) · *so groß **wie** ich* (equal)

## Before a noun: normal adjective endings
*der schneller**e** Zug, das schönst**e** Haus*`,
    logic: `German never says "more beautiful": **every** adjective takes **-er** and **-st**, however long it is (interessanter, am interessantesten). After that, the comparative behaves like any other adjective, endings and all.`,
  },
  'de-g-reflexive': {
    more: `
| | accusative | dative |
| ich | mich | mir |
| du | dich | dir |
| er / sie / es | **sich** | **sich** |
| wir | uns | uns |
| ihr | euch | euch |
| sie / Sie | **sich** | **sich** |

## Accusative or dative?
If there's another direct object, the reflexive becomes **dative**: *Ich wasche **mich**.* but *Ich wasche **mir** die Hände.*

## Common reflexive verbs
sich freuen (auf / über), sich interessieren für, sich erinnern an, sich beeilen, sich setzen, sich treffen, sich ärgern über, sich vorstellen`,
    logic: `There is **only one new word: sich**, for every 3rd person and for Sie. All other reflexive pronouns are the ordinary accusative / dative pronouns you already know (mich / mir, dich / dir…).`,
  },
  'de-g-imperative': {
    logic: `Three kinds of command for three kinds of "you": **du** (stem, no pronoun: *Komm!*), **ihr** (the ihr form without ihr: *Kommt!*), **Sie** (the Sie form with the verb first: *Kommen Sie!*). The verb comes first, like a yes/no question, and **separable prefixes still go to the end**: *Ruf mich an!*`,
  },
  'de-g-futur': {
    more: `
## werden + infinitive
| ich werde | wir werden |
| du wirst | ihr werdet |
| er wird | sie werden |
*Ich **werde** nächstes Jahr in Wien **studieren**.*

## The present for the future
More common in speech, when a time word makes the meaning clear: *Morgen fahre ich nach Köln.*

## Guesses about now
*Er **wird** wohl krank **sein**.* (He's probably ill.)

## werden has three jobs
1. to become: *Sie wird Ärztin.* 2. the future: *Es wird regnen.* 3. the passive: *Das Haus wird gebaut.*`,
    logic: `werden always forms a bracket with something at the end: an **infinitive** (future), a **participle** (passive), or a **noun / adjective** (become). Look at the end of the sentence to see which job it's doing.`,
  },
  'de-g-konjunktiv': {
    more: `
## würde + infinitive: works with almost any verb
*Ich **würde** gern nach Japan **reisen**.*

## The short forms people use
**wäre** (sein), **hätte** (haben), **könnte, müsste, dürfte, sollte, wollte, möchte**; also gäbe, wüsste, käme.

## If-sentences
*Wenn ich Zeit **hätte**, **würde** ich mehr lesen.* · *Wenn ich reich **wäre**, …*

## Polite requests
*Könnten Sie mir helfen? Ich hätte gern einen Kaffee. Würden Sie das Fenster öffnen?*

## The past: hätte / wäre + participle
*Wenn ich das gewusst **hätte**, **wäre** ich gekommen.*`,
    logic: `Konjunktiv II is the **"unreal" mood**: wishes, dreams, politeness. Most of it comes from the **Präteritum plus an umlaut** (war → wäre, hatte → hätte, konnte → könnte). For all other verbs, use **würde + infinitive**.`,
  },
  'de-g-relative': {
    logic: `The relative pronoun is **almost the article** (der, die, das, den, dem…). It takes its **gender and number from the noun** it refers to, and its **case from its job inside the relative clause**. Only three forms look different: **denen** (dative plural), **dessen** and **deren** (genitive). It's a subordinate clause, so the verb goes to the end.`,
  },
  'de-g-passive': {
    more: `
## The process: werden + participle
| present | *Das Haus **wird** gebaut.* |
| Präteritum | *Das Haus **wurde** gebaut.* |
| Perfekt | *Das Haus **ist** gebaut **worden**.* (worden, not geworden) |
| with a modal | *Das Haus **muss** gebaut **werden**.* |

## Who did it? von + dative
*Das Buch wurde **von** Kafka geschrieben.* Use **durch** for a means or cause.

## The state: sein + participle
*Die Tür **wird** geschlossen* (someone is closing it) / *Die Tür **ist** geschlossen* (it is closed).

## "No one in particular"
*Hier **wird** nicht geraucht.* (No smoking here.) Often replaced by **man**: *Hier raucht man nicht.*`,
    logic: `The passive moves the focus **from who acts to what happens**. It's another werden bracket: werden in position 2, participle at the end. If you know your Perfekt participles, you already know the passive.`,
  },
  'de-g-zu-inf': {
    logic: `**zu + infinitive replaces a dass-clause when the subject is the same**: *Ich hoffe, dass ich dich sehe* → *Ich hoffe, dich zu sehen*. **um … zu** means "in order to" (same subject); with different subjects use **damit**. With separable verbs, zu goes inside: an**zu**rufen.`,
  },
  'de-g-genitive': {
    more: `
## The forms
| masculine | des Mann**es**, eines Mann**es** |
| feminine | der Frau, einer Frau |
| neuter | des Kind**es**, eines Kind**es** |
| plural | der Kinder |
Masculine and neuter nouns add **-(e)s**.

## Uses
- possession: *das Auto **meines Vaters***. Names just add -s: *Annas Buch*.
- after **wegen, trotz, während, statt, innerhalb**: *wegen **des** Wetters*

## In everyday speech
von + dative often takes its place: *das Auto von meinem Vater*. Casual speech also says *wegen dem Wetter*.`,
    logic: `The genitive answers **"whose?"** and links two nouns. Its signal is **-s** on masculine and neuter (des …-es) and **-r** on feminine and plural (der). It's standard in writing; in speech, **von + dative** usually replaces it.`,
  },
  'de-g-prep-verbs': {
    logic: `Many verbs come with a **fixed preposition**, which you learn together as one unit: warten **auf** + accusative, denken **an** + accusative, sich freuen **auf / über**, Angst haben **vor** + dative.

For things, ask with **wo(r) + preposition** (*Worauf wartest du?*) and refer back with **da(r) + preposition** (*Ich warte darauf.*). For people, use the preposition + a pronoun (*auf ihn*).`,
  },
  'de-g-indirect': {
    logic: `An indirect question is just a **subordinate clause**: the question word (or **ob** for yes/no questions) and then the **verb at the end**. Polite German uses them all the time: *Können Sie mir sagen, wo der Bahnhof **ist**?*`,
  },
  'de-g-connectors': {
    logic: `The **type of connector decides the word order**:
- **position 0** (und, aber, oder, denn, sondern) changes nothing;
- **subordinating** words (weil, obwohl, dass) send the verb to the end;
- **adverbs** (deshalb, trotzdem, dann) take position 1, so the verb comes straight after them.`,
  },
};

/** The overview lesson: the few ideas the whole German grammar is built on. */
export const BIG_PICTURE_DE: GrammarLesson = {
  id: 'de-g-big-picture', level: 'A1', title: 'The big picture: 7 patterns behind German', titleEs: 'Die Grammatik in 7 Ideen',
  summary: 'Start here: the few ideas that explain most German grammar.',
  blocks: [
    { t: 'text', md: `
## 1. The verb is second
In a main clause, the conjugated verb sits in **position 2**, whatever comes first: *Morgen **fahre** ich nach Berlin.*

## 2. The verb bracket
A second verb part goes to the **end**, so the sentence is framed by its verbs. It's the same shape for the Perfekt (*habe … gesehen*), modals (*kann … schwimmen*), separable verbs (*rufe … an*), the future (*werde … lernen*) and the passive (*wird … gebaut*).

## 3. Subordinate clauses close the bracket
After **weil, dass, wenn, ob, als, obwohl**, **all** verbs go to the end: *…, weil ich arbeiten **muss**.*

## 4. Cases show who does what
**nominative** (who), **accusative** (whom / what), **dative** (to whom / where), **genitive** (whose). The endings repeat everywhere: **-n** accusative masculine (den, einen, ihn), **-m** dative masculine and neuter (dem, einem, ihm), **-r** dative feminine (der, ihr).

## 5. The signal appears once
Either the article or the adjective shows gender and case, never both twice: *der alt**e** Mann* / *ein alt**er** Mann*.

## 6. Strong verbs change the vowel
The same verbs change their vowel in the present (fährt), the past (fuhr), the participle (gefahren) and the Konjunktiv (führe). Weak verbs just add -te / -t.

## 7. The ending tells the gender
-ung, -heit, -keit → die · -chen → das · -er (people), -ling → der. In compounds **the last word decides**.` },
    { t: 'tip', md: 'When a rule looks new, ask which of these 7 ideas it belongs to. Most German grammar is the verb bracket or the case endings in disguise.' },
  ],
  practice: {
    choice: [
      { q: 'Morgen ___ ich nach Berlin.', options: ['fahre', 'fahren', 'fährt'], answer: 0 },
      { q: 'Ich bleibe zu Hause, weil ich krank ___.', options: ['bin', 'sein', 'ist'], answer: 0 },
      { q: 'Ich sehe ___ Hund.', options: ['den', 'der', 'dem'], answer: 0 },
      { q: 'Ich fahre mit ___ Bus.', options: ['dem', 'den', 'der'], answer: 0 },
      { q: 'Das ist ein ___ Mann.', options: ['alter', 'alte', 'alten'], answer: 0 },
      { q: 'Which article does “Türschlüssel” (die Tür + der Schlüssel) take?', options: ['der', 'die', 'das'], answer: 0 },
    ],
  },
};
