import { units } from './build';

export const B1 = units('B1', [
  {
    id: 'b1-01',
    title: 'Plans & the future',
    titleEs: 'Planes y futuro',
    emoji: '🚀',
    description: 'The future tense and making predictions.',
    words: [
      ['el futuro', 'the future'],
      ['el plan', 'the plan'],
      ['el proyecto', 'the project'],
      ['el año que viene', 'next year'],
      ['a largo plazo', 'in the long term', 'A largo plazo quiero vivir en la costa.', 'In the long term I want to live on the coast.'],
      ['probablemente', 'probably'],
      ['quizás', 'perhaps / maybe'],
      ['conseguir', 'to achieve / to get'],
      ['el sueño', 'the dream / sleepiness'],
      ['la meta', 'the goal'],
      ['mudarse', 'to move (house)'],
      ['ahorrar', 'to save (money, time)'],
      ['el extranjero', 'abroad / the foreigner'],
      ['seguro', 'sure / safe'],
      ['la oportunidad', 'the opportunity'],
    ],
    sentences: [
      ['El año que viene viviré en Barcelona.', 'Next year I will live in Barcelona.'],
      ['Dentro de dos años terminaré la carrera.', 'In two years I will finish my degree.'],
      ['Probablemente lloverá mañana.', 'It will probably rain tomorrow.'],
      ['¿Qué harás este verano?', 'What will you do this summer?'],
      ['Algún día tendré mi propia casa.', 'One day I will have my own house.'],
    ],
    grammar: `
## Future simple
Add the endings to the **whole infinitive** — same for -ar, -er, -ir:

| yo hablaré | nosotros hablaremos |
| tú hablarás | vosotros hablaréis |
| él/ella/usted hablará | ellos/ustedes hablarán |

## Irregular stems (same endings)
| tener → tendr- | poner → pondr- |
| venir → vendr- | salir → saldr- |
| poder → podr- | saber → sabr- |
| querer → querr- | hacer → har- |
| decir → dir- | haber → habr- |

## Time expressions
- **dentro de** + time = in … from now: *Dentro de dos años terminaré.*
- **el año que viene**, **la semana que viene**, **a largo plazo**

## Future vs ir a
- **ir a + infinitive** — plans, things already decided: *Voy a mudarme en junio.*
- **future** — predictions, promises, less certain plans: *Algún día **viviré** en la playa.*

The future can also express a guess about the present: *¿Dónde **estará** Juan?* — Where can Juan be?
`,
    conj: { verbs: ['tener', 'hacer', 'poder', 'salir', 'decir', 'venir', 'saber', 'poner', 'querer'], tenses: ['futuro'] },
  },
  {
    id: 'b1-02',
    title: 'Advice & polite requests',
    titleEs: 'Consejos',
    emoji: '💡',
    description: 'The conditional: would, could, should.',
    words: [
      ['deber', 'must / should', 'Debes descansar.', 'You should rest.'],
      ['aconsejar', 'to advise'],
      ['el consejo', 'the (piece of) advice'],
      ['recomendar', 'to recommend'],
      ['en tu lugar', 'in your place / if I were you'],
      ['me gustaría', 'I would like'],
      ['la ayuda', 'the help'],
      ['el problema', 'the problem'],
      ['la solución', 'the solution'],
      ['intentar', 'to try'],
      ['mejor', 'better / best'],
      ['peor', 'worse / worst'],
      ['sano', 'healthy'],
      ['dejar de', 'to stop (doing)', 'Deberías dejar de fumar.', 'You should stop smoking.'],
      ['preocuparse', 'to worry'],
    ],
    sentences: [
      ['Deberías dormir más.', 'You should sleep more.'],
      ['Yo en tu lugar hablaría con él.', 'If I were you, I would talk to him.'],
      ['Me gustaría viajar por todo el mundo.', 'I would like to travel all around the world.'],
      ['¿Podrías ayudarme, por favor?', 'Could you help me, please?'],
      ['Te recomiendo este restaurante.', 'I recommend this restaurant to you.'],
    ],
    grammar: `
## Conditional
Infinitive + **-ía** endings (the same irregular stems as the future):

| yo hablaría | nosotros hablaríamos |
| tú hablarías | vosotros hablaríais |
| él/ella/usted hablaría | ellos/ustedes hablarían |

*tener → tendría, poder → podría, hacer → haría, decir → diría…*

## Uses
- **Advice**: *Deberías descansar.* · *Yo en tu lugar **iría** al médico.*
- **Polite requests**: *¿**Podrías** cerrar la ventana?*
- **Wishes**: ***Me gustaría** aprender a cocinar.*
- **Hypotheses**: *Con más dinero, **viajaría** más.*

**recomendar** changes e → ie in the present: *te recomiendo, nos recomienda…*
`,
    conj: { verbs: ['deber', 'poder', 'hacer', 'decir', 'tener', 'querer', 'ir'], tenses: ['condicional'] },
  },
  {
    id: 'b1-03',
    title: 'Wishes & hopes',
    titleEs: 'Deseos',
    emoji: '🌠',
    description: 'The present subjunctive after wishes and requests.',
    words: [
      ['ojalá', 'I hope / hopefully', 'Ojalá haga sol mañana.', 'I hope it is sunny tomorrow.'],
      ['esperar', 'to hope / to wait'],
      ['es importante que', 'it is important that'],
      ['es necesario que', 'it is necessary that'],
      ['el deseo', 'the wish'],
      ['la suerte', 'the luck'],
      ['el cumpleaños', 'the birthday'],
      ['felicidades', 'congratulations / happy birthday'],
      ['que te vaya bien', 'all the best (lit. may it go well for you)'],
      ['pedir', 'to ask for / to order'],
      ['permitir', 'to allow'],
      ['prohibir', 'to forbid'],
      ['el permiso', 'the permission'],
    ],
    sentences: [
      ['Ojalá tengas mucha suerte.', 'I hope you have a lot of luck.'],
      ['Quiero que vengas a mi fiesta.', 'I want you to come to my party.'],
      ['Es importante que estudies todos los días.', 'It is important that you study every day.'],
      ['Espero que estés bien.', 'I hope you are well.'],
      ['Mis padres no permiten que salga tarde.', "My parents don't allow me to go out late."],
    ],
    grammar: `
## Forming the present subjunctive
Take the **yo** form of the present, drop **-o**, and add the "opposite" vowel:

| | hablar (hablo) | comer (como) | tener (tengo) |
| yo | hable | coma | tenga |
| tú | hables | comas | tengas |
| él/ella/usted | hable | coma | tenga |
| nosotros | hablemos | comamos | tengamos |
| vosotros | habléis | comáis | tengáis |
| ellos/ustedes | hablen | coman | tengan |

Irregular: **ser** (sea), **estar** (esté), **ir** (vaya), **saber** (sepa), **dar** (dé), **haber** (haya).

## When? Two different subjects + a wish / request
- *Quiero **viajar**.* — I want to travel (same subject → infinitive)
- *Quiero **que viajes**.* — I want you to travel (different subject → subjunctive)

Triggers: **querer que, esperar que, pedir que, permitir que, es importante que, ojalá (que)**.
`,
    conj: { verbs: ['ser', 'estar', 'ir', 'tener', 'hacer', 'venir', 'pedir', 'estudiar', 'saber'], tenses: ['subjuntivo'] },
  },
  {
    id: 'b1-04',
    title: 'Work & studies',
    titleEs: 'El trabajo y los estudios',
    emoji: '💼',
    description: 'Jobs, interviews, exams and "cuando + subjunctive".',
    words: [
      ['el trabajo', 'the job / work'],
      ['la empresa', 'the company'],
      ['el jefe', 'the boss'],
      ['el compañero', 'the colleague / classmate'],
      ['la reunión', 'the meeting'],
      ['el sueldo', 'the salary'],
      ['la entrevista', 'the interview'],
      ['el currículum', 'the CV / résumé'],
      ['la universidad', 'the university'],
      ['la carrera', 'the degree / career / race'],
      ['el examen', 'the exam'],
      ['aprobar', 'to pass (an exam)'],
      ['suspender', 'to fail (an exam)'],
      ['el horario', 'the timetable / schedule'],
      ['contratar', 'to hire'],
    ],
    sentences: [
      ['Cuando termine la carrera, buscaré trabajo.', 'When I finish my degree, I will look for work.'],
      ['Mañana tengo una entrevista de trabajo.', 'Tomorrow I have a job interview.'],
      ['Mi jefe quiere que llegue antes.', 'My boss wants me to arrive earlier.'],
      ['He aprobado todos los exámenes.', 'I have passed all the exams.'],
      ['La reunión empezó a las diez.', 'The meeting started at ten.'],
    ],
    grammar: `
## Cuando + subjunctive (future actions)
When *cuando* refers to the **future**, the verb after it goes in the subjunctive:

- ***Cuando termine** la carrera, buscaré trabajo.* — When I finish…
- ***Cuando tenga** dinero, compraré un coche.* — When I have…

For habits or the past, use the indicative:
- ***Cuando termino** de trabajar, voy al gimnasio.* (habit)
- ***Cuando terminé**, me fui a casa.* (past)

## Useful verb phrases
- **empezar a** + inf. — to start doing · *Empecé a trabajar en 2020.*
- **acabar de** + inf. — to have just done · *Acabo de llegar.*
- **seguir** + gerund — to keep doing · *Sigo estudiando.*
`,
    conj: { verbs: ['empezar', 'conseguir', 'buscar', 'aprobar', 'seguir', 'terminar'], tenses: ['presente', 'preterito', 'subjuntivo'] },
  },
  {
    id: 'b1-05',
    title: 'Society & the environment',
    titleEs: 'La sociedad y el medio ambiente',
    emoji: '🌱',
    description: 'Give opinions: creo que vs no creo que.',
    words: [
      ['el medio ambiente', 'the environment'],
      ['la contaminación', 'the pollution'],
      ['reciclar', 'to recycle'],
      ['la basura', 'the rubbish / trash'],
      ['el cambio climático', 'climate change'],
      ['la energía', 'the energy'],
      ['proteger', 'to protect'],
      ['el planeta', 'the planet'],
      ['la naturaleza', 'the nature'],
      ['el gobierno', 'the government'],
      ['la ley', 'the law'],
      ['creo que', 'I think that'],
      ['no creo que', "I don't think that"],
      ['la opinión', 'the opinion'],
      ['estar de acuerdo', 'to agree', 'No estoy de acuerdo contigo.', "I don't agree with you."],
    ],
    sentences: [
      ['Creo que es un problema grave.', 'I think it is a serious problem.'],
      ['No creo que el gobierno haga lo suficiente.', "I don't think the government is doing enough."],
      ['Tenemos que proteger la naturaleza.', 'We have to protect nature.'],
      ['Reciclo el plástico y el papel.', 'I recycle plastic and paper.'],
      ['Estoy de acuerdo contigo.', 'I agree with you.'],
    ],
    grammar: `
## Opinions: indicative or subjunctive?
**Positive** opinion → indicative:
- ***Creo que** es importante.* · ***Pienso que** tienes razón.*

**Negative** opinion or doubt → subjunctive:
- ***No creo que sea** importante.* · ***No pienso que tengas** razón.*
- ***Dudo que** llueva.*

## Value judgements + subjunctive
***Es necesario / importante / mejor que*** + subjunctive:
- *Es necesario que **reciclemos** más.*

## Giving your opinion
- **En mi opinión…** · **Para mí…** · **Desde mi punto de vista…**
- **(No) estoy de acuerdo con…**
- **Tienes razón.** — You're right.
`,
    conj: { verbs: ['proteger', 'reciclar', 'creer', 'pensar', 'hacer', 'ser'], tenses: ['presente', 'subjuntivo'] },
  },
  {
    id: 'b1-06',
    title: 'Feelings & relationships',
    titleEs: 'Sentimientos y relaciones',
    emoji: '❤️',
    description: 'Emotions, love, friendship and "me alegra que".',
    words: [
      ['el amor', 'the love'],
      ['la amistad', 'the friendship'],
      ['el novio', 'the boyfriend'],
      ['la novia', 'the girlfriend'],
      ['la pareja', 'the couple / partner'],
      ['enamorarse', 'to fall in love'],
      ['casarse', 'to get married'],
      ['discutir', 'to argue'],
      ['enfadarse', 'to get angry'],
      ['feliz', 'happy'],
      ['triste', 'sad'],
      ['nervioso', 'nervous'],
      ['orgulloso', 'proud'],
      ['echar de menos', 'to miss (someone)', 'Te echo de menos.', 'I miss you.'],
      ['confiar', 'to trust'],
    ],
    sentences: [
      ['Te echo mucho de menos.', 'I miss you a lot.'],
      ['Me alegra que estés aquí.', 'I am glad you are here.'],
      ['Se conocieron en la universidad.', 'They met at university.'],
      ['Nos casamos el año pasado.', 'We got married last year.'],
      ['Estoy orgulloso de ti.', 'I am proud of you.'],
    ],
    grammar: `
## Emotions + que + subjunctive
When one person feels something about **another person's** action:

- ***Me alegra que** estés aquí.* — I'm glad you're here.
- ***Me molesta que** llegues tarde.* — It bothers me that you arrive late.
- ***Tengo miedo de que** se enfade.* — I'm afraid he'll get angry.

Same subject → infinitive: *Me alegra **estar** aquí.*

## Reciprocal se
*se* / *nos* can mean "each other":
- ***Se conocieron** en 2015.* — They met (each other) in 2015.
- ***Nos queremos** mucho.* — We love each other a lot.

## Ponerse + adjective = to become (mood)
*Me pongo nervioso antes de un examen.* — I get nervous before an exam.
`,
    conj: { verbs: ['sentirse', 'enfadarse', 'casarse', 'enamorarse', 'discutir', 'conocer'], tenses: ['presente', 'preterito', 'subjuntivo'] },
  },
  {
    id: 'b1-07',
    title: 'In the kitchen',
    titleEs: 'En la cocina',
    emoji: '🍳',
    description: 'Follow a recipe with the imperative.',
    words: [
      ['la receta', 'the recipe'],
      ['cortar', 'to cut'],
      ['añadir', 'to add'],
      ['mezclar', 'to mix'],
      ['hervir', 'to boil'],
      ['la sartén', 'the frying pan'],
      ['la olla', 'the pot / saucepan'],
      ['el horno', 'the oven'],
      ['el aceite', 'the oil'],
      ['la sal', 'the salt'],
      ['el huevo', 'the egg'],
      ['la cebolla', 'the onion'],
      ['la patata', 'the potato'],
      ['el ajo', 'the garlic'],
      ['el tomate', 'the tomato'],
    ],
    sentences: [
      ['Corta la cebolla en trozos pequeños.', 'Cut the onion into small pieces.'],
      ['Añade un poco de sal.', 'Add a little salt.'],
      ['Pon el aceite en la sartén.', 'Put the oil in the frying pan.'],
      ['No abras el horno todavía.', "Don't open the oven yet."],
      ['Mezcla los huevos con las patatas.', 'Mix the eggs with the potatoes.'],
    ],
    grammar: `
## Affirmative imperative
| | cortar | añadir |
| tú | corta | añade |
| usted | corte | añada |
| nosotros | cortemos | añadamos |
| vosotros | cortad | añadid |
| ustedes | corten | añadan |

- **tú** = the *él* form of the present: *corta, mezcla, añade*
- **usted / ustedes / nosotros** = subjunctive forms

## Irregular tú commands
| poner → pon | hacer → haz |
| tener → ten | venir → ven |
| salir → sal | decir → di |
| ir → ve | ser → sé |

## Pronouns attach to affirmative commands
*Córta**la**.* · *Pon**lo** en la sartén.* · *Di**me**.* (note the accent to keep the stress)

## Negative commands use the subjunctive
*No **cortes** la cebolla.* · *No **abras** el horno.*
`,
    conj: { verbs: ['cortar', 'añadir', 'mezclar', 'poner', 'hacer', 'venir', 'decir', 'salir', 'tener'], tenses: ['imperativo'] },
  },
]);
