import type { GrammarLesson } from '../types';

export const GRAMMAR_DE_B1: GrammarLesson[] = [
  {
    id: 'de-g-futur', level: 'B1', title: 'The future: werden + infinitive', titleEs: 'Futur I',
    summary: 'Predictions, promises and plans — and when the present is enough.',
    blocks: [
      { t: 'table', verbs: ['werden'], tense: 'presente', caption: 'werden — the helper verb' },
      { t: 'text', md: `
## werden + infinitive at the end
*Ich **werde** nächstes Jahr in Wien **studieren**.*

## When do Germans use it?
- **Predictions**: *Es **wird** morgen **schneien**.*
- **Promises / intentions**: *Ich **werde** dir **helfen**.*
- **Guesses about now** (+ wohl / wahrscheinlich): *Er **wird** wohl krank **sein**.* — He's probably ill.

For clear plans with a time word, the **present** is more common: *Morgen **fahre** ich nach Wien.*` },
      { t: 'table', verbs: ['spielen', 'fahren'], tense: 'futuro' },
      { t: 'mistakes', items: [['Ich werde gehen morgen.', 'Ich werde morgen gehen.', 'The infinitive goes to the end.'], ['Ich will morgen regnen.', 'Es wird morgen regnen.', 'wollen means "want", not "will".']] },
    ],
    practice: {
      conj: { verbs: ['werden', 'spielen', 'fahren', 'kommen', 'machen', 'sein', 'haben'], tenses: ['futuro'], count: 10 },
      choice: [
        { q: 'Morgen ___ es regnen.', options: ['wird', 'will', 'werdet'], answer: 0 },
        { q: 'Wir ___ dich besuchen.', options: ['werden', 'wird', 'würden'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-konjunktiv', level: 'B1', title: 'Would, could, if: Konjunktiv II', titleEs: 'Konjunktiv II',
    summary: 'würde + infinitive, and the short forms wäre, hätte, könnte, müsste.',
    blocks: [
      { t: 'text', md: `
## würde + infinitive
Most verbs: *Ich **würde** gern nach Japan **reisen**.* — I would like to travel to Japan.` },
      { t: 'table', verbs: ['spielen', 'sein', 'haben'], tense: 'condicional', caption: 'sein and haben have their own forms: wäre, hätte' },
      { t: 'text', md: `
## Short forms you must know
| sein → **wäre** | haben → **hätte** |
| können → **könnte** | müssen → **müsste** |
| dürfen → **dürfte** | sollen → **sollte** |
| werden → **würde** | mögen → **möchte** |

## Uses
- **Unreal conditions**: *Wenn ich Zeit **hätte**, **würde** ich mitkommen.*
- **Wishes**: *Ich **wäre** gern am Meer.* · *Wenn ich nur mehr Geld **hätte**!*
- **Advice**: *Du **solltest** zum Arzt gehen.*
- **Politeness**: ***Könnten** Sie mir helfen? Ich **hätte** gern einen Kaffee.*` },
      { t: 'mistakes', items: [['Wenn ich reich würde sein, …', 'Wenn ich reich wäre, …', 'sein uses the short form wäre.'], ['Ich würde haben mehr Zeit.', 'Ich hätte mehr Zeit.', 'haben uses hätte.']] },
    ],
    practice: {
      conj: { verbs: ['sein', 'haben', 'können', 'müssen', 'spielen', 'machen', 'kaufen'], tenses: ['condicional'], count: 10 },
      choice: [
        { q: 'Wenn ich Zeit ___, würde ich kommen.', options: ['hätte', 'habe', 'hatte'], answer: 0 },
        { q: '___ Sie mir bitte helfen?', options: ['Könnten', 'Können', 'Konnten'], answer: 0 },
        { q: 'Ich ___ gern am Strand.', options: ['wäre', 'war', 'bin'], answer: 0 },
        { q: 'Du ___ mehr schlafen.', options: ['solltest', 'sollst', 'solltet'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-relative', level: 'B1', title: 'Relative clauses', titleEs: 'Relativsätze',
    summary: 'der Mann, der… / den… / dem… — and the verb at the end.',
    blocks: [
      { t: 'text', md: `
## Joining two sentences
*Das ist der Mann. **Der** Mann wohnt neben mir.* → *Das ist der Mann, **der** neben mir **wohnt**.*

The relative pronoun takes its **gender** from the noun it refers to and its **case** from its role in the relative clause. The verb goes to the end.

| | masc. | fem. | neuter | plural |
| nominative | der | die | das | die |
| accusative | **den** | die | das | die |
| dative | **dem** | **der** | **dem** | **denen** |
| genitive | dessen | deren | dessen | deren |

## Examples
- *Der Film, **den** ich gesehen habe, war toll.* (ich habe **den** Film gesehen → accusative)
- *Die Frau, **der** ich geholfen habe, war sehr dankbar.* (helfen + dative)
- *Die Freunde, **mit denen** ich reise, kommen aus Spanien.* (preposition first)` },
      { t: 'tip', md: 'Always a **comma** before the relative clause, and the conjugated verb **at the end**.' },
      { t: 'mistakes', items: [['Der Mann, der wohnt neben mir', 'Der Mann, der neben mir wohnt', 'Verb to the end.'], ['Der Film, der ich gesehen habe', 'Der Film, den ich gesehen habe', 'ich is the subject; the film is the accusative object → den.']] },
    ],
    practice: {
      choice: [
        { q: 'Das ist die Frau, ___ in Berlin wohnt.', options: ['die', 'der', 'den'], answer: 0 },
        { q: 'Der Kuchen, ___ ich gebacken habe, ist lecker.', options: ['den', 'der', 'dem'], answer: 0 },
        { q: 'Das Kind, ___ ich geholfen habe, lacht.', options: ['dem', 'das', 'den'], answer: 0 },
        { q: 'Die Leute, mit ___ ich arbeite, sind nett.', options: ['denen', 'die', 'den'], answer: 0 },
        { q: 'Das ist das Buch, ___ mir gefällt.', options: ['das', 'dem', 'den'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-passive', level: 'B1', title: 'The passive', titleEs: 'Das Passiv',
    summary: 'werden + participle: what happens, not who does it.',
    blocks: [
      { t: 'text', md: `
## werden + past participle
| active | passive |
| Der Koch **macht** die Suppe. | Die Suppe **wird** (vom Koch) **gemacht**. |
| Man **baute** das Haus 1900. | Das Haus **wurde** 1900 **gebaut**. |

- present: **wird / werden** + participle
- past: **wurde / wurden** + participle
- perfect: **ist … worden**: *Das Haus **ist** 1900 **gebaut worden**.*
- with a modal: **muss … werden**: *Das Auto **muss repariert werden**.*

Who does it: **von** + dative — *von dem Koch → vom Koch*.

## Where you'll see it
News, instructions, recipes, signs: *Hier **wird** Deutsch **gesprochen**.*` },
      { t: 'mistakes', items: [['Das Haus ist 1900 gebaut.', 'Das Haus wurde 1900 gebaut.', 'Past passive uses wurde.'], ['Die Suppe wird von der Koch gemacht.', 'Die Suppe wird vom Koch gemacht.', 'von + dative: dem Koch → vom Koch.']] },
    ],
    practice: {
      choice: [
        { q: 'Die Zeitung ___ jeden Tag gelesen.', options: ['wird', 'ist', 'hat'], answer: 0 },
        { q: 'Das Auto ___ gestern repariert.', options: ['wurde', 'wird', 'würde'], answer: 0 },
        { q: 'Die Fenster ___ jeden Monat geputzt.', options: ['werden', 'wird', 'wurde'], answer: 0 },
        { q: 'Das Telefon wurde 1876 ___.', options: ['erfunden', 'erfinden', 'erfand'], answer: 0 },
        { q: 'Der Brief muss heute geschrieben ___.', options: ['werden', 'wird', 'worden'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-zu-inf', level: 'B1', title: 'zu + infinitive and um … zu', titleEs: 'Infinitiv mit zu',
    summary: 'Ich habe keine Lust, … zu gehen; ich lerne, um … zu arbeiten.',
    blocks: [
      { t: 'text', md: `
## zu + infinitive at the end
After many verbs and expressions the second verb takes **zu** and goes to the end:
- *Ich habe keine Zeit, ins Kino **zu gehen**.*
- *Es ist wichtig, viel Wasser **zu trinken**.*
- *Ich versuche, mehr **zu lesen**.* · *Hör auf **zu rauchen**!*

Separable verbs put **zu** in the middle: *auf**zu**stehen, an**zu**rufen, ein**zu**kaufen*.

**No zu** after modal verbs, *werden*, *lassen*, and motion verbs like *gehen*: *Ich **muss gehen**. Wir gehen **schwimmen**.*

## um … zu, ohne … zu, statt … zu
- **um … zu** = in order to: *Ich lerne Deutsch, **um** in Berlin **zu arbeiten**.*
- **ohne … zu** = without …-ing: *Er ging, **ohne** Tschüss **zu sagen**.*
- **statt … zu** = instead of …-ing: ***Statt** zu lernen, sieht er fern.*` },
      { t: 'mistakes', items: [['Ich muss zu arbeiten.', 'Ich muss arbeiten.', 'No zu after modal verbs.'], ['Ich versuche zu früh aufstehen.', 'Ich versuche, früh aufzustehen.', 'zu goes inside separable verbs: aufzustehen.']] },
    ],
    practice: {
      choice: [
        { q: 'Ich habe keine Lust, heute ___.', options: ['zu arbeiten', 'arbeiten', 'arbeite'], answer: 0 },
        { q: 'Ich lerne Deutsch, ___ in Wien zu studieren.', options: ['um', 'ohne', 'damit'], answer: 0 },
        { q: 'Ich kann heute nicht ___.', options: ['kommen', 'zu kommen', 'gekommen'], answer: 0 },
        { q: 'Es ist schwer, früh ___.', options: ['aufzustehen', 'zu aufstehen', 'aufstehen'], answer: 0 },
        { q: 'Er ging, ___ etwas zu sagen.', options: ['ohne', 'um', 'statt'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-genitive', level: 'B1', title: 'The genitive', titleEs: 'Der Genitiv',
    summary: 'des Mannes, der Frau — and wegen, trotz, während.',
    blocks: [
      { t: 'text', md: `
## Possession: of the …
| masculine | **des** Vater**s** / eines Vaters |
| feminine | **der** Mutter / einer Mutter |
| neuter | **des** Kind**es** / eines Kindes |
| plural | **der** Eltern |

Masculine and neuter nouns add **-s** (short words often **-es**): *das Auto **des** Mann**es***.
Names just add **-s** (no apostrophe): *Annas Buch, Peters Auto*.

## In speech: von + dative
*das Auto **von meinem** Vater* is very common when speaking.

## Genitive prepositions
**wegen** (because of), **trotz** (despite), **während** (during), **statt** (instead of):
*Wegen **des** Regens bleiben wir zu Hause.* · *Trotz **der** Kälte gehen wir spazieren.*` },
      { t: 'mistakes', items: [["Anna's Buch", 'Annas Buch', 'No apostrophe for names in German.'], ['wegen dem Wetter (in writing)', 'wegen des Wetters', 'Written German uses the genitive after wegen.']] },
    ],
    practice: {
      choice: [
        { q: 'Das ist das Auto ___ Lehrers.', options: ['des', 'der', 'dem'], answer: 0 },
        { q: 'Die Farbe ___ Tasche gefällt mir.', options: ['der', 'des', 'die'], answer: 0 },
        { q: '___ des Regens bleiben wir zu Hause.', options: ['Wegen', 'Trotz', 'Ohne'], answer: 0 },
        { q: '___ der Pause trinken wir Kaffee.', options: ['Während', 'Wegen', 'Seit'], answer: 0 },
        { q: 'Das ist ___ Fahrrad.', options: ['Peters', "Peter's", 'des Peter'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-prep-verbs', level: 'B1', title: 'Verbs with prepositions', titleEs: 'Verben mit Präpositionen',
    summary: 'warten auf, denken an, sich freuen über… plus darauf / worauf.',
    blocks: [
      { t: 'text', md: `
## Learn the verb with its preposition
| warten **auf** + acc. | to wait for |
| denken **an** + acc. | to think of |
| sich freuen **auf** + acc. | to look forward to |
| sich freuen **über** + acc. | to be happy about |
| sich interessieren **für** + acc. | to be interested in |
| träumen **von** + dat. | to dream of |
| Angst haben **vor** + dat. | to be afraid of |
| sprechen **über** + acc. | to talk about |
| teilnehmen **an** + dat. | to take part in |

## Things: da- / wo- compounds
For things (not people), replace the preposition + pronoun:
- *Ich warte **auf den Bus**. → Ich warte **darauf**.* · ***Worauf** wartest du?*
- **dar-** before a vowel: dar**auf**, dar**über**, dar**an**; otherwise **da-**: da**für**, da**von**, da**mit**.

For people: *Ich warte **auf ihn**. **Auf wen** wartest du?*` },
      { t: 'mistakes', items: [['Ich warte für den Bus.', 'Ich warte auf den Bus.', 'warten takes auf.'], ['Ich interessiere mich in Musik.', 'Ich interessiere mich für Musik.', 'sich interessieren für.']] },
    ],
    practice: {
      choice: [
        { q: 'Ich warte ___ meine Freundin.', options: ['auf', 'für', 'an'], answer: 0 },
        { q: 'Denkst du oft ___ deine Kindheit?', options: ['an', 'über', 'von'], answer: 0 },
        { q: 'Ich freue mich ___ die Ferien.', options: ['auf', 'an', 'für'], answer: 0 },
        { q: 'Sie interessiert sich ___ Kunst.', options: ['für', 'in', 'an'], answer: 0 },
        { q: '___ träumst du?', options: ['Wovon', 'Davon', 'Von was'], answer: 0 },
        { q: 'Ich habe Angst ___ Spinnen.', options: ['vor', 'von', 'für'], answer: 0 },
      ],
    },
  },
  {
    id: 'de-g-indirect', level: 'B1', title: 'Indirect questions', titleEs: 'Indirekte Fragen',
    summary: 'Können Sie mir sagen, wo der Bahnhof ist? — polite questions, verb at the end.',
    blocks: [
      { t: 'text', md: `
## A polite way to ask
Put a question inside another sentence — the verb moves to the **end**:
| direct | indirect |
| Wo **ist** der Bahnhof? | Können Sie mir sagen, wo der Bahnhof **ist**? |
| Wann **beginnt** der Film? | Weißt du, wann der Film **beginnt**? |
| **Kommt** er morgen? | Ich weiß nicht, **ob** er morgen **kommt**. |

- W-questions keep their question word: **wo, wann, wie, warum, wer, was…**
- Yes/no questions use **ob** (whether).

## Useful openers
*Können Sie mir sagen, … · Wissen Sie, … · Ich möchte wissen, … · Ich frage mich, …*` },
      { t: 'mistakes', items: [['Wissen Sie, wo ist der Bahnhof?', 'Wissen Sie, wo der Bahnhof ist?', 'Verb to the end.'], ['Ich weiß nicht, wenn er kommt.', 'Ich weiß nicht, ob er kommt.', 'Yes/no → ob (whether).']] },
    ],
    practice: {
      choice: [
        { q: 'Können Sie mir sagen, wo die Post ___?', options: ['ist', 'ist sie', 'sein'], answer: 0 },
        { q: 'Ich weiß nicht, ___ er heute kommt.', options: ['ob', 'wenn', 'dass'], answer: 0 },
        { q: 'Weißt du, wann der Zug ___?', options: ['abfährt', 'fährt ab', 'abfahren'], answer: 0 },
        { q: 'Ich frage mich, warum sie nicht ___.', options: ['anruft', 'ruft an', 'anrufen'], answer: 0 },
      ],
    },
  },
];
