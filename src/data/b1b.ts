import { units } from './build';

export const B1B = units('B1', [
  {
    id: 'b1-08',
    title: 'News & media',
    titleEs: 'Los medios de comunicación',
    emoji: '📰',
    description: 'Talk about the news, report what people said.',
    words: [
      ['la noticia', 'the piece of news', '¿Has oído la noticia?', 'Have you heard the news?'],
      ['las noticias', 'the news (programme)'],
      ['el periódico', 'the newspaper'],
      ['la revista', 'the magazine'],
      ['el artículo', 'the article'],
      ['el titular', 'the headline'],
      ['la prensa', 'the press'],
      ['la radio', 'the radio'],
      ['la televisión', 'the television'],
      ['el programa', 'the programme / show'],
      ['la serie', 'the series'],
      ['el anuncio', 'the advert'],
      ['la información', 'the information'],
      ['publicar', 'to publish / to post'],
      ['informar', 'to inform / to report'],
      ['ocurrir', 'to happen'],
      ['según', 'according to', 'Según el periódico, mañana lloverá.', 'According to the newspaper, it will rain tomorrow.'],
      ['la fuente', 'the source / the fountain'],
      ['falso', 'false / fake'],
    ],
    sentences: [
      ['Leo el periódico todas las mañanas.', 'I read the newspaper every morning.'],
      ['Dijo que llegaría tarde.', 'He said he would arrive late.'],
      ['Según las noticias, hubo un accidente.', 'According to the news, there was an accident.'],
      ['Esta serie tiene muy buenas críticas.', 'This series has very good reviews.'],
      ['No te creas todo lo que lees en internet.', "Don't believe everything you read on the internet."],
    ],
    grammar: `
## Reported speech
When you report what someone said, the tense moves one step back:

| they said (direct) | you report |
| «**Estoy** cansado.» | Dijo que **estaba** cansado. |
| «**Llegaré** tarde.» | Dijo que **llegaría** tarde. |
| «**He terminado**.» | Dijo que **había terminado**. |
| «**Fui** al cine.» | Dijo que **había ido** al cine. |

If the statement is still true, you can keep the present: *Dice que **está** cansado.* (says, present)

## Verbs for reporting
**decir que, contar que, explicar que, comentar que, preguntar si / qué…**
- *Me preguntó **si** quería venir.* (whether)
`,
    conj: { verbs: ['decir', 'publicar', 'ocurrir', 'leer'], tenses: ['preterito', 'imperfecto', 'condicional'] },
  },
  {
    id: 'b1-09',
    title: 'Money & services',
    titleEs: 'El dinero y los servicios',
    emoji: '💳',
    description: 'Banks, bills, complaints and returning things.',
    words: [
      ['la cuenta bancaria', 'the bank account'],
      ['el cajero automático', 'the cash machine / ATM'],
      ['el efectivo', 'cash', '¿Puedo pagar en efectivo?', 'Can I pay in cash?'],
      ['la factura', 'the invoice / the bill'],
      ['el recibo', 'the receipt'],
      ['el precio', 'the price'],
      ['el descuento', 'the discount'],
      ['las rebajas', 'the sales'],
      ['la oferta', 'the offer'],
      ['gastar', 'to spend (money)'],
      ['ganar', 'to earn / to win'],
      ['cobrar', 'to charge / to get paid'],
      ['devolver', 'to return (something) / to give back'],
      ['cambiar', 'to change / to exchange'],
      ['la queja', 'the complaint'],
      ['quejarse', 'to complain'],
      ['la garantía', 'the guarantee / warranty'],
      ['el préstamo', 'the loan'],
      ['invertir', 'to invest'],
    ],
    sentences: [
      ['Quiero devolver estos pantalones.', 'I want to return these trousers.'],
      ['¿Tiene el recibo?', 'Do you have the receipt?'],
      ['Me han cobrado dos veces.', 'They have charged me twice.'],
      ['En las rebajas todo está más barato.', 'In the sales everything is cheaper.'],
      ['Gasto demasiado dinero en ropa.', 'I spend too much money on clothes.'],
    ],
    grammar: `
## Making a polite complaint
- **Quería** + inf.: *Quería devolver esto.* — I'd like to return this.
- **¿Sería posible** + inf.**?** — Would it be possible to …?
- **Me gustaría hablar con** el encargado. — I'd like to speak to the manager.
- **Creo que hay un error** en la factura.

## Devolver (o → ue)
*devuelvo, devuelves, devuelve, devolvemos, devolvéis, devuelven* — participle **devuelto** (like *volver → vuelto*).

## Se impersonal
*¿**Se puede** pagar con tarjeta?* — Can one / Can you pay by card? · *Aquí **se habla** inglés.*
`,
    conj: { verbs: ['gastar', 'ganar', 'cobrar', 'invertir', 'quejarse'], tenses: ['presente', 'preterito', 'perfecto'] },
  },
  {
    id: 'b1-10',
    title: 'Linking your ideas',
    titleEs: 'Conectores',
    emoji: '🔗',
    description: 'Connectors to sound fluent when you speak and write.',
    words: [
      ['además', 'besides / in addition'],
      ['sin embargo', 'however'],
      ['aunque', 'although / even though', 'Aunque llueve, voy a salir.', "Although it's raining, I'm going out."],
      ['por eso', "that's why / so"],
      ['por lo tanto', 'therefore'],
      ['en cambio', 'on the other hand / instead'],
      ['a pesar de', 'despite'],
      ['es decir', 'that is to say'],
      ['de hecho', 'in fact'],
      ['por un lado', 'on the one hand'],
      ['por otro lado', 'on the other hand'],
      ['en primer lugar', 'firstly'],
      ['al final', 'in the end'],
      ['en resumen', 'in short'],
      ['así que', 'so'],
      ['ya que', 'since / as'],
      ['mientras tanto', 'meanwhile'],
      ['sobre todo', 'above all / especially'],
      ['por ejemplo', 'for example'],
    ],
    sentences: [
      ['Estaba cansado; sin embargo, terminé el trabajo.', 'I was tired; however, I finished the work.'],
      ['Llovía mucho, así que nos quedamos en casa.', "It was raining a lot, so we stayed at home."],
      ['A pesar de la lluvia, fuimos a la playa.', 'Despite the rain, we went to the beach.'],
      ['Me encanta viajar, sobre todo por Latinoamérica.', 'I love travelling, especially around Latin America.'],
      ['Ya que estás aquí, ¿me ayudas?', "Since you're here, will you help me?"],
    ],
    grammar: `
## Groups of connectors
| adding | además, también, incluso, sobre todo |
| contrast | pero, sin embargo, en cambio, aunque, a pesar de |
| cause | porque, ya que, como, debido a |
| result | así que, por eso, por lo tanto |
| ordering | en primer lugar, luego, después, al final |
| summing up | en resumen, en conclusión, es decir |

## Watch the grammar after them
- **a pesar de** + noun / infinitive: *a pesar **del** frío*, *a pesar **de estar** cansado*
- **como** (cause) goes at the **start**: ***Como** no tenía dinero, no fui.*
- **aunque** + indicative = fact; + subjunctive = possibility: *Aunque **llueva**, iré.* (even if it rains)
`,
  },
  {
    id: 'b1-11',
    title: 'Health & lifestyle',
    titleEs: 'La salud y el estilo de vida',
    emoji: '🏃',
    description: 'Healthy habits, sport, sleep and stress.',
    words: [
      ['la salud', 'the health'],
      ['el estrés', 'the stress'],
      ['la dieta', 'the diet'],
      ['el ejercicio', 'the exercise', 'Hago ejercicio tres veces por semana.', 'I exercise three times a week.'],
      ['el gimnasio', 'the gym'],
      ['correr', 'to run'],
      ['caminar', 'to walk'],
      ['adelgazar', 'to lose weight'],
      ['engordar', 'to put on weight'],
      ['fumar', 'to smoke'],
      ['el hábito', 'the habit'],
      ['la costumbre', 'the custom / the habit'],
      ['relajarse', 'to relax'],
      ['la cita', 'the appointment / the date'],
      ['la receta médica', 'the prescription'],
      ['la pastilla', 'the pill'],
      ['estar en forma', 'to be fit'],
      ['el sobrepeso', 'being overweight'],
      ['equilibrado', 'balanced'],
    ],
    sentences: [
      ['Deberías dormir al menos ocho horas.', 'You should sleep at least eight hours.'],
      ['Es importante que lleves una dieta equilibrada.', "It's important that you eat a balanced diet."],
      ['Dejé de fumar hace dos años.', 'I stopped smoking two years ago.'],
      ['Tengo cita con el médico a las diez.', 'I have a doctor’s appointment at ten.'],
      ['Si haces ejercicio, te sentirás mejor.', 'If you exercise, you will feel better.'],
    ],
    grammar: `
## Real conditions: si + present
**Si** + present, + present / future / command:
- *Si **duermes** poco, **estás** cansado.* (general truth)
- *Si **haces** ejercicio, te **sentirás** mejor.* (future result)
- *Si te **duele**, **ve** al médico.* (advice)

Never use the future or the present subjunctive right after **si**: *Si ~~lloverá~~ **llueve**, no salgo.*

## Frequency
*una vez / dos veces **por** semana (**a la** semana)* · *cada día* · *casi nunca* · *de vez en cuando*

## Spelling: -zar verbs
*adelgazar → adelgacé* (yo, preterite), *que adelgace* (subjunctive) — z becomes c before e.
`,
    conj: { verbs: ['correr', 'caminar', 'relajarse', 'dormir'], tenses: ['presente', 'futuro'] },
  },
]);
