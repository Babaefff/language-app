import type { Exam } from './types';

// Original practice tasks that follow the structure of the DELE exams (Instituto Cervantes):
// task types, number of plays and a 60 % target per module. Not official exam material.
const VF = ['Verdadero', 'Falso'];

const A1: Exam = {
  id: 'es-exam-a1', level: 'A1', title: 'Mock exam A1',
  basedOn: 'Format of the DELE A1 (Instituto Cervantes)',
  modules: [
    {
      id: 'lesen', title: 'Comprensión de lectura', titleEn: 'Reading', minutes: 45,
      parts: [
        {
          title: 'Tarea 1',
          instructions: 'Lea el correo electrónico y conteste a las preguntas.',
          instructionsEn: 'Read the email and answer the questions.',
          text: '¡Hola, Marta!\n¿Qué tal? Yo estoy muy contenta en Salamanca. Vivo en un piso pequeño con dos chicas de Italia. Por las mañanas estudio español en una academia y por las tardes trabajo en una cafetería. Los fines de semana visito la ciudad con mis compañeras. El sábado vamos a ir a un concierto en la Plaza Mayor. ¿Por qué no vienes en mayo?\nUn beso,\nLaura',
          items: [
            { q: '¿Con quién vive Laura?', options: ['Con su familia', 'Con dos chicas italianas', 'Sola'], answer: 1 },
            { q: '¿Qué hace Laura por las mañanas?', options: ['Estudia español', 'Trabaja en una cafetería', 'Visita la ciudad'], answer: 0 },
            { q: '¿Dónde es el concierto?', options: ['En una cafetería', 'En la academia', 'En la Plaza Mayor'], answer: 2 },
            { q: '¿Qué quiere Laura?', options: ['Que Marta la visite en mayo', 'Ir a Italia', 'Cambiar de piso'], answer: 0 },
          ],
        },
        {
          title: 'Tarea 2',
          instructions: 'Lea los anuncios y elija la opción correcta.',
          instructionsEn: 'Read the notices and choose the right option.',
          items: [
            { text: 'FARMACIA CENTRAL\nAbierto de lunes a sábado de 9:00 a 21:00.\nDomingos: cerrado.', q: 'La farmacia abre…', options: ['todos los días.', 'el domingo por la mañana.', 'el sábado por la tarde.'], answer: 2 },
            { text: 'SE ALQUILA HABITACIÓN\nCerca de la universidad. 300 € al mes con agua y luz. Solo estudiantes. Tel. 612 345 789', q: 'La habitación…', options: ['es para estudiantes.', 'cuesta 300 € a la semana.', 'está lejos de la universidad.'], answer: 0 },
            { text: 'BIBLIOTECA MUNICIPAL\nHoy no hay servicio de préstamo de libros. Las salas de estudio están abiertas.', q: 'Hoy en la biblioteca…', options: ['no se puede estudiar.', 'no se pueden llevar libros a casa.', 'todo está cerrado.'], answer: 1 },
            { text: 'CLASES DE GUITARRA\nPara niños y adultos. Primera clase gratis. Martes y jueves por la tarde.', q: 'La primera clase…', options: ['es solo para niños.', 'es los lunes.', 'no cuesta dinero.'], answer: 2 },
          ],
        },
        {
          title: 'Tarea 3',
          instructions: 'Lea las frases y diga si son verdaderas o falsas según el texto.',
          instructionsEn: 'Read the text. Are the sentences true or false?',
          text: 'Me llamo Diego y soy de Valencia. Tengo treinta y dos años y soy profesor de matemáticas en un instituto. Estoy casado y tengo una hija de cuatro años, Lucía. Me gusta mucho el deporte: juego al tenis los martes y corro por la playa los domingos. No me gusta nada ver la televisión.',
          items: [
            { q: 'Diego trabaja en un instituto.', options: VF, answer: 0 },
            { q: 'Diego tiene dos hijos.', options: VF, answer: 1 },
            { q: 'Diego corre los domingos.', options: VF, answer: 0 },
            { q: 'A Diego le gusta ver la televisión.', options: VF, answer: 1 },
          ],
        },
      ],
    },
    {
      id: 'hoeren', title: 'Comprensión auditiva', titleEn: 'Listening', minutes: 20,
      parts: [
        {
          title: 'Tarea 1', plays: 2,
          instructions: 'Escuche las conversaciones y elija la opción correcta.',
          instructionsEn: 'Listen to the conversations and choose the right option. Each plays twice.',
          items: [
            { audio: '– Perdone, ¿cuánto cuesta este libro? – Doce euros con cincuenta.', q: '¿Cuánto cuesta el libro?', options: ['2,50 €', '12,50 €', '20,50 €'], answer: 1 },
            { audio: '– ¿A qué hora sale el autobús para Toledo? – A las diez y cuarto.', q: '¿A qué hora sale el autobús?', options: ['A las 10:15', 'A las 10:45', 'A las 11:15'], answer: 0 },
            { audio: '– ¿Qué vas a tomar? – Un zumo de naranja, por favor. Hoy no quiero café.', q: '¿Qué toma?', options: ['Un café', 'Un té', 'Un zumo de naranja'], answer: 2 },
            { audio: '– ¿Dónde está el baño, por favor? – Al final del pasillo, a la derecha.', q: '¿Dónde está el baño?', options: ['Al final del pasillo, a la derecha', 'En el primer piso', 'A la izquierda de la entrada'], answer: 0 },
            { audio: '– ¿Cuándo es tu cumpleaños? – El catorce de marzo.', q: '¿Cuándo es el cumpleaños?', options: ['El 4 de marzo', 'El 14 de mayo', 'El 14 de marzo'], answer: 2 },
          ],
        },
        {
          title: 'Tarea 2', plays: 2,
          instructions: 'Escuche los mensajes y elija la opción correcta.',
          instructionsEn: 'Listen to the messages and choose the right option. Each plays twice.',
          items: [
            { audio: 'Hola, Pablo, soy Carmen. Esta noche no puedo ir al cine porque estoy enferma. ¿Vamos mañana? Llámame, por favor.', q: '¿Por qué no va Carmen al cine?', options: ['Porque trabaja', 'Porque está enferma', 'Porque no tiene dinero'], answer: 1 },
            { audio: 'Buenos días, le llamamos de la clínica dental. Su cita del lunes es ahora el miércoles a las cinco de la tarde.', q: '¿Cuándo es la nueva cita?', options: ['El miércoles a las 17:00', 'El lunes a las 17:00', 'El miércoles a las 15:00'], answer: 0 },
            { audio: 'Mamá, estoy en el supermercado. ¿Necesitas algo? Voy a comprar leche, pan y tomates.', q: '¿Dónde está la persona?', options: ['En casa', 'En el mercado', 'En el supermercado'], answer: 2 },
            { audio: 'Atención, señores pasajeros: el tren con destino a Sevilla sale hoy del andén cuatro.', q: '¿De qué andén sale el tren?', options: ['Del andén 4', 'Del andén 14', 'Del andén 2'], answer: 0 },
          ],
        },
        {
          title: 'Tarea 3', plays: 2,
          instructions: 'Escuche la conversación. ¿Qué hace Elena cada día?',
          instructionsEn: 'Listen to the conversation. What does Elena do on each day? It plays twice.',
          audio: '– Elena, ¿qué haces esta semana? – Pues el lunes tengo clase de inglés. El martes voy al gimnasio. El miércoles ceno con mis padres y el jueves trabajo hasta muy tarde. – ¿Y el viernes? – El viernes voy a una fiesta de cumpleaños.',
          items: [
            { q: 'Lunes', options: ['Gimnasio', 'Clase de inglés', 'Fiesta'], answer: 1 },
            { q: 'Martes', options: ['Gimnasio', 'Cena con sus padres', 'Trabajo'], answer: 0 },
            { q: 'Miércoles', options: ['Clase de inglés', 'Fiesta', 'Cena con sus padres'], answer: 2 },
            { q: 'Viernes', options: ['Fiesta de cumpleaños', 'Gimnasio', 'Trabajo'], answer: 0 },
          ],
        },
      ],
    },
  ],
  writing: [
    {
      title: 'Expresión escrita',
      prompt: 'Usted va a pasar un fin de semana en casa de su amigo Andrés. Escríbale un mensaje.',
      promptEn: 'You are going to spend a weekend at your friend Andrés’s house. Write him a message covering all three points.',
      points: ['¿Cuándo llega?', '¿Qué quiere hacer?', '¿Qué lleva?'],
      words: [25, 40],
      model: '¡Hola, Andrés! Llego el viernes a las seis de la tarde en tren. El sábado quiero visitar el museo y pasear por el centro. Por la noche podemos cenar en un restaurante. Llevo un pastel de chocolate. ¡Hasta el viernes! Un abrazo, Sara',
      checklist: ['Greeting and sign-off', 'All three points', 'Verbs correctly conjugated (llego, quiero, llevo)', '¡ ! and ¿ ? where needed', 'About 30 words'],
    },
  ],
};

const A2: Exam = {
  id: 'es-exam-a2', level: 'A2', title: 'Mock exam A2',
  basedOn: 'Format of the DELE A2 (Instituto Cervantes)',
  modules: [
    {
      id: 'lesen', title: 'Comprensión de lectura', titleEn: 'Reading', minutes: 60,
      parts: [
        {
          title: 'Tarea 1',
          instructions: 'Lea el texto y conteste a las preguntas.',
          instructionsEn: 'Read the text and answer the questions.',
          text: 'Un mercado con historia\nEl Mercado de San Miguel, en Madrid, abrió sus puertas en 1916. Durante muchos años fue un mercado tradicional donde los vecinos compraban fruta, carne y pescado. En 2009, después de una gran reforma, se convirtió en un mercado gastronómico. Hoy los visitantes pueden probar tapas, quesos, ostras y vinos de toda España. Está abierto todos los días hasta la medianoche y es uno de los lugares favoritos de los turistas, aunque muchos madrileños dicen que es demasiado caro.',
          items: [
            { q: 'El mercado abrió…', options: ['en 2009.', 'en 1916.', 'hace diez años.'], answer: 1 },
            { q: 'Antes de 2009 el mercado era…', options: ['un restaurante.', 'un museo.', 'un mercado tradicional.'], answer: 2 },
            { q: 'Hoy en el mercado se puede…', options: ['probar comida de toda España.', 'comprar ropa.', 'dormir.'], answer: 0 },
            { q: 'Según muchos madrileños, el mercado…', options: ['cierra muy pronto.', 'es demasiado caro.', 'es muy tranquilo.'], answer: 1 },
          ],
        },
        {
          title: 'Tarea 2',
          instructions: 'Lea los anuncios. ¿Qué anuncio corresponde a cada persona?',
          instructionsEn: 'Read the adverts. Which one suits each person?',
          items: [
            { q: 'Andrea quiere aprender a cocinar platos vegetarianos.', options: ['Taller de cocina sin carne: sábados de 10 a 13 h.', 'Restaurante El Asador: las mejores carnes de la ciudad.', 'Curso de fotografía de comida.'], answer: 0 },
            { q: 'Jorge busca trabajo los fines de semana.', options: ['Se busca camarero de lunes a viernes.', 'Tienda de deportes busca dependiente para sábados y domingos.', 'Clases particulares de inglés.'], answer: 1 },
            { q: 'Los Martínez quieren pasar unas vacaciones tranquilas con sus hijos.', options: ['Hotel Fiesta: música y discoteca toda la noche.', 'Viaje cultural por Europa: 10 países en 12 días.', 'Casa rural en la montaña: piscina y animales para niños.'], answer: 2 },
            { q: 'Sofía necesita arreglar su ordenador.', options: ['Servicio técnico InfoRápido: reparamos portátiles en 24 horas.', 'Venta de muebles de oficina.', 'Academia de informática para mayores.'], answer: 0 },
          ],
        },
        {
          title: 'Tarea 3',
          instructions: 'Lea el correo y elija la opción correcta.',
          instructionsEn: 'Read the email and choose the right option.',
          text: 'Querida Paula:\nTe escribo desde Lima. Llegué hace una semana y ya he visitado el centro histórico y varios museos. La comida es buenísima: ayer comí ceviche por primera vez y me encantó. El tiempo, en cambio, no es como esperaba: está nublado casi todos los días. El próximo lunes viajo a Cuzco y después voy a hacer el Camino Inca. Estoy un poco nerviosa porque son cuatro días caminando.\nBesos,\nIrene',
          items: [
            { q: 'Irene está en Lima desde hace…', options: ['un mes.', 'una semana.', 'un día.'], answer: 1 },
            { q: 'Sobre la comida, Irene dice que…', options: ['no le gusta el ceviche.', 'es muy cara.', 'le encantó el ceviche.'], answer: 2 },
            { q: 'El tiempo en Lima…', options: ['está casi siempre nublado.', 'es muy caluroso.', 'es perfecto.'], answer: 0 },
            { q: 'Irene está nerviosa porque…', options: ['tiene que volver a casa.', 'va a caminar cuatro días.', 'ha perdido el pasaporte.'], answer: 1 },
          ],
        },
      ],
    },
    {
      id: 'hoeren', title: 'Comprensión auditiva', titleEn: 'Listening', minutes: 35,
      parts: [
        {
          title: 'Tarea 1', plays: 2,
          instructions: 'Escuche los anuncios y elija la opción correcta.',
          instructionsEn: 'Listen to the announcements and choose the right option. Each plays twice.',
          items: [
            { audio: 'Les informamos de que, por obras, la línea tres del metro no funciona este fin de semana. Pueden utilizar los autobuses gratuitos que salen cada diez minutos.', q: 'Este fin de semana los viajeros pueden…', options: ['usar la línea tres.', 'tomar un autobús gratis.', 'pagar menos en el metro.'], answer: 1 },
            { audio: 'Y ahora, el tiempo: mañana lloverá en el norte del país, mientras que en el sur hará sol y temperaturas de hasta treinta grados.', q: '¿Qué tiempo hará mañana en el sur?', options: ['Lloverá', 'Hará frío', 'Hará sol y calor'], answer: 2 },
            { audio: 'Grandes rebajas en Almacenes Sol: toda la ropa de invierno al cincuenta por ciento. Solo hasta el domingo.', q: '¿Qué está rebajado?', options: ['La ropa de invierno', 'Los zapatos de verano', 'Los electrodomésticos'], answer: 0 },
            { audio: 'Señores clientes, el supermercado cerrará en quince minutos. Por favor, vayan pasando por caja.', q: '¿Qué pasará en quince minutos?', options: ['Empezarán las ofertas', 'Cerrará el supermercado', 'Abrirá una caja nueva'], answer: 1 },
          ],
        },
        {
          title: 'Tarea 2', plays: 2,
          instructions: 'Escuche las conversaciones y elija la opción correcta.',
          instructionsEn: 'Listen to the conversations and choose the right option. Each plays twice.',
          items: [
            { audio: '– ¿Qué tal el fin de semana? – Muy bien. Fui a la sierra con unos amigos e hicimos una ruta de seis horas. Terminé cansadísimo.', q: '¿Qué hizo el chico el fin de semana?', options: ['Fue a la playa', 'Hizo una ruta por la montaña', 'Se quedó en casa'], answer: 1 },
            { audio: '– Buenos días, ¿qué le pasa? – Me duele mucho la espalda desde ayer. – Bueno, tome estas pastillas y descanse dos días.', q: '¿Qué le duele a la paciente?', options: ['La espalda', 'La cabeza', 'El estómago'], answer: 0 },
            { audio: '– ¿Has comprado ya el regalo para Luis? – Sí, al final le he comprado una camiseta del Real Madrid. Le encanta el fútbol.', q: '¿Qué ha comprado para Luis?', options: ['Un balón', 'Una entrada para el partido', 'Una camiseta'], answer: 2 },
            { audio: '– ¿Cómo vienes mañana a la oficina? – En bici. El coche está en el taller hasta el jueves.', q: '¿Cómo va a ir a la oficina?', options: ['En coche', 'En bicicleta', 'En metro'], answer: 1 },
          ],
        },
        {
          title: 'Tarea 3', plays: 2,
          instructions: 'Escuche la entrevista y diga si las frases son verdaderas o falsas.',
          instructionsEn: 'Listen to the interview. True or false? It plays twice.',
          audio: '– Rosa, usted dejó Barcelona hace tres años para vivir en un pueblo. ¿Por qué? – En la ciudad trabajaba muchísimo y nunca veía a mis hijos. Ahora tengo una pequeña tienda de productos naturales y trabajo menos horas. – ¿Echa de menos algo de la ciudad? – Los cines y los teatros, sí. Pero voy a Barcelona una vez al mes, así que no es un problema.',
          items: [
            { q: 'Rosa vive en Barcelona.', options: VF, answer: 1 },
            { q: 'En la ciudad trabajaba mucho.', options: VF, answer: 0 },
            { q: 'Ahora tiene una tienda.', options: VF, answer: 0 },
            { q: 'Nunca vuelve a Barcelona.', options: VF, answer: 1 },
          ],
        },
      ],
    },
  ],
  writing: [
    {
      title: 'Expresión escrita 1',
      prompt: 'Un amigo le ha invitado a su fiesta de cumpleaños el sábado, pero usted no puede ir. Escríbale un correo.',
      promptEn: 'A friend has invited you to his birthday party on Saturday but you can’t go. Write him an email.',
      points: ['Dé las gracias por la invitación.', 'Explique por qué no puede ir.', 'Proponga quedar otro día.'],
      words: [60, 70],
      model: '¡Hola, Javier! Muchas gracias por invitarme a tu fiesta de cumpleaños. Me encantaría ir, pero el sábado tengo la boda de mi prima en Valencia y voy a estar allí todo el fin de semana. ¡Lo siento mucho! ¿Qué te parece si quedamos el martes para cenar? Te invito yo para celebrar tu cumpleaños. ¡Que lo pases muy bien el sábado! Un abrazo, Marta',
      checklist: ['Greeting and sign-off', 'Thanks, reason and a new plan', 'Present + ir a + a question to propose', '¡ ! and ¿ ? where needed', '60–70 words'],
    },
    {
      title: 'Expresión escrita 2',
      prompt: 'Escriba un texto sobre un viaje que hizo y que le gustó mucho.',
      promptEn: 'Write about a trip you took and really enjoyed (use the past tenses).',
      points: ['¿Adónde fue y con quién?', '¿Qué hizo allí?', '¿Cómo era el lugar?', '¿Por qué le gustó?'],
      words: [70, 80],
      model: 'El verano pasado fui a Granada con mi hermana. Estuvimos cinco días allí. Visitamos la Alhambra, que es increíble, y paseamos por el barrio del Albaicín. La ciudad era muy bonita y tranquila, y hacía mucho calor. Por las noches salíamos a tomar tapas: en Granada las tapas son gratis con la bebida. Me gustó mucho porque la gente era muy simpática y la comida era buenísima. Quiero volver pronto.',
      checklist: ['Preterite for actions (fui, visitamos)', 'Imperfect for descriptions (era, hacía)', 'All four points', 'Connectors: y, pero, porque, por las noches', '70–80 words'],
    },
  ],
};

const B1: Exam = {
  id: 'es-exam-b1', level: 'B1', title: 'Mock exam B1',
  basedOn: 'Format of the DELE B1 (Instituto Cervantes)',
  modules: [
    {
      id: 'lesen', title: 'Comprensión de lectura', titleEn: 'Reading', minutes: 70,
      parts: [
        {
          title: 'Tarea 1',
          instructions: 'Lea los textos de estas personas. ¿Qué actividad le recomienda a cada una?',
          instructionsEn: 'Read what each person wants. Which activity do you recommend?',
          items: [
            { text: 'Nuria: «Trabajo todo el día delante del ordenador y necesito moverme, pero no me gustan los deportes de equipo.»', q: '¿Qué le recomienda a Nuria?', options: ['Clases de natación individuales', 'Liga de fútbol de empresas', 'Club de lectura'], answer: 0 },
            { text: 'Álvaro: «Acabo de llegar a la ciudad y quiero conocer gente mientras practico mi español.»', q: '¿Qué le recomienda a Álvaro?', options: ['Curso de español en línea', 'Intercambio de idiomas en un bar del centro', 'Visita guiada en audio'], answer: 1 },
            { text: 'Teresa: «Me encanta la naturaleza y quiero ayudar a proteger el medio ambiente los fines de semana.»', q: '¿Qué le recomienda a Teresa?', options: ['Taller de cocina', 'Curso de jardinería en casa', 'Voluntariado de limpieza de playas'], answer: 2 },
          ],
        },
        {
          title: 'Tarea 2',
          instructions: 'Lea el texto y elija la opción correcta.',
          instructionsEn: 'Read the text and choose the right option.',
          text: 'Teletrabajo: ventajas e inconvenientes\nDesde hace unos años, cada vez más españoles trabajan desde casa al menos un día a la semana. Según una encuesta reciente, la mayoría valora sobre todo el tiempo que ahorra al no tener que desplazarse. Muchos aseguran, además, que pueden concentrarse mejor sin las interrupciones de la oficina. Sin embargo, no todo son ventajas. Algunos trabajadores reconocen que les cuesta separar la vida laboral de la personal y que terminan trabajando más horas. Otros echan de menos el contacto con los compañeros. Por eso, los expertos recomiendan un modelo mixto: dos o tres días en casa y el resto en la oficina.',
          items: [
            { q: 'Lo que más valoran los que teletrabajan es…', options: ['ganar más dinero.', 'ahorrar tiempo en desplazamientos.', 'trabajar menos días.'], answer: 1 },
            { q: 'Algunos trabajadores dicen que en casa…', options: ['trabajan más horas.', 'se aburren mucho.', 'no tienen ordenador.'], answer: 0 },
            { q: 'Los expertos recomiendan…', options: ['trabajar siempre en casa.', 'volver a la oficina todos los días.', 'combinar casa y oficina.'], answer: 2 },
          ],
        },
        {
          title: 'Tarea 3',
          instructions: 'Lea las opiniones. ¿Está la persona a favor de prohibir los móviles en los colegios?',
          instructionsEn: 'Read the opinions. Is the person in favour of banning phones in schools?',
          items: [
            { text: 'Carlos, profesor: «Cada día veo alumnos que no prestan atención porque están pendientes del móvil. Prohibirlo sería lo mejor para todos.»', q: '¿Está Carlos a favor?', options: ['Sí', 'No'], answer: 0 },
            { text: 'Lucía, 16 años: «Entiendo el problema, pero el móvil también sirve para buscar información en clase. Prefiero normas claras a una prohibición total.»', q: '¿Está Lucía a favor?', options: ['Sí', 'No'], answer: 1 },
            { text: 'Marisa, madre: «Desde que en el colegio de mi hijo no se permiten los móviles, juega más con sus amigos en el recreo. Estoy encantada.»', q: '¿Está Marisa a favor?', options: ['Sí', 'No'], answer: 0 },
            { text: 'Ramón, abuelo: «Los jóvenes tienen que aprender a usar la tecnología con responsabilidad, y eso no se consigue prohibiendo.»', q: '¿Está Ramón a favor?', options: ['Sí', 'No'], answer: 1 },
          ],
        },
        {
          title: 'Tarea 5',
          instructions: 'Lea el texto y elija la palabra correcta para cada hueco.',
          instructionsEn: 'Read the text and choose the right word for each gap.',
          text: 'Querido Juan:\nTe escribo para contarte que el mes pasado (1) ___ a vivir a Bilbao. Me (2) ___ mucho la ciudad, aunque llueve bastante. Ojalá (3) ___ venir a visitarme pronto. Si (4) ___ tiempo, te enseñaría el museo Guggenheim.\nUn abrazo,\nPedro',
          items: [
            { q: '(1)', options: ['me mudé', 'me mudaba', 'me mudaré'], answer: 0 },
            { q: '(2)', options: ['gusto', 'gustan', 'gusta'], answer: 2 },
            { q: '(3)', options: ['puedes', 'puedas', 'podrás'], answer: 1 },
            { q: '(4)', options: ['tengo', 'tuvieras', 'tendrías'], answer: 1 },
          ],
        },
      ],
    },
    {
      id: 'hoeren', title: 'Comprensión auditiva', titleEn: 'Listening', minutes: 40,
      parts: [
        {
          title: 'Tarea 1', plays: 2,
          instructions: 'Escuche los mensajes y elija la opción correcta.',
          instructionsEn: 'Listen to the messages and choose the right option. Each plays twice.',
          items: [
            { audio: 'Hola, Sr. Gómez, le llamo del taller. Ya hemos revisado su coche: hay que cambiar los frenos y costará unos trescientos euros. Llámenos para decirnos si quiere que hagamos la reparación.', q: '¿Qué tiene que hacer el Sr. Gómez?', options: ['Recoger el coche hoy', 'Llamar al taller', 'Pagar trescientos euros ahora'], answer: 1 },
            { audio: 'Queridos oyentes, este fin de semana se celebran las fiestas del barrio. Por eso, el centro estará cerrado al tráfico el sábado y el domingo.', q: 'Durante las fiestas…', options: ['no se puede entrar en coche al centro.', 'el metro es gratis.', 'las tiendas están cerradas.'], answer: 0 },
            { audio: 'Hola, Ana, soy Javi. ¡He ganado dos entradas para el concierto del viernes! Empieza a las nueve y media. ¿Te vienes? Contéstame antes de mañana.', q: '¿A qué hora empieza el concierto?', options: ['A las 21:00', 'A las 19:30', 'A las 21:30'], answer: 2 },
            { audio: 'Atención: el tren AVE con destino Barcelona finalizará hoy su recorrido en Zaragoza por una avería. Los viajeros a Barcelona deberán tomar el autobús que les espera en la salida.', q: 'Los viajeros a Barcelona deben…', options: ['tomar un autobús.', 'esperar otro tren.', 'quedarse en Zaragoza.'], answer: 0 },
          ],
        },
        {
          title: 'Tarea 2', plays: 2,
          instructions: 'Escuche la visita guiada y elija la opción correcta.',
          instructionsEn: 'Listen to the guided tour and choose the right option. It plays twice.',
          audio: 'Bienvenidos al Museo de la Ciudad. Soy Clara y voy a acompañarles durante la visita, que dura aproximadamente una hora. Empezamos en la planta baja, dedicada a la época romana. Después subiremos a la primera planta, donde verán fotografías de la ciudad en el siglo veinte. Les recuerdo que pueden hacer fotos, pero sin flash. Al final de la visita, pueden tomar algo en la cafetería del último piso: con su entrada tienen un diez por ciento de descuento.',
          items: [
            { q: 'La visita dura…', options: ['media hora.', 'una hora más o menos.', 'dos horas.'], answer: 1 },
            { q: 'En la primera planta hay…', options: ['fotografías del siglo XX.', 'objetos romanos.', 'arte moderno.'], answer: 0 },
            { q: 'Hacer fotos…', options: ['está prohibido.', 'solo se permite en la cafetería.', 'está permitido sin flash.'], answer: 2 },
            { q: 'Con la entrada…', options: ['el café es gratis.', 'hay descuento en la cafetería.', 'se puede volver otro día.'], answer: 1 },
          ],
        },
        {
          title: 'Tarea 3', plays: 2,
          instructions: 'Escuche la conversación y diga si las frases son verdaderas o falsas.',
          instructionsEn: 'Listen to the conversation. True or false? It plays twice.',
          audio: '– ¡Hola, Marcos! ¿Qué tal las vacaciones en Escocia? – Geniales, aunque no salió todo como habíamos planeado. Queríamos ir de camping, pero llovió casi todos los días, así que alquilamos una casita. – ¿Y no fue muy caro? – Bastante, sí, pero ahorramos en comida porque cocinábamos nosotros. – ¿Qué fue lo mejor? – Una excursión a un lago en las montañas. Fue agotadora, pero el paisaje era impresionante. El año que viene quiero volver, pero en julio, no en septiembre.',
          items: [
            { q: 'Marcos y sus amigos durmieron siempre en tiendas de campaña.', options: VF, answer: 1 },
            { q: 'La casita les costó bastante dinero.', options: VF, answer: 0 },
            { q: 'Comieron casi siempre en restaurantes.', options: VF, answer: 1 },
            { q: 'Marcos quiere volver en verano.', options: VF, answer: 0 },
          ],
        },
        {
          title: 'Tarea 4', plays: 2,
          instructions: 'Escuche el debate en la radio. ¿Quién dice cada cosa?',
          instructionsEn: 'Listen to the radio debate. Who says what? It plays twice.',
          audio: 'Hoy debatimos: ¿deberían prohibirse los coches en el centro de las ciudades? Nos acompañan Elena Ruiz, concejala de medio ambiente, y Tomás Vidal, dueño de una zapatería. Elena… – Estoy convencida de que un centro sin coches mejora la calidad de vida. El aire está más limpio y la gente tiene más espacio para pasear. – Suena muy bien, pero muchos de mis clientes vienen en coche, sobre todo las personas mayores. Si no pueden aparcar, comprarán por internet. – Por eso vamos a mejorar mucho el transporte público y habrá aparcamientos en las afueras. – Aun así, me temo que el pequeño comercio va a sufrir. Habría que probarlo primero durante un año.',
          items: [
            { q: 'El aire estará más limpio.', options: ['Elena Ruiz', 'Tomás Vidal'], answer: 0 },
            { q: 'Las personas mayores necesitan el coche.', options: ['Elena Ruiz', 'Tomás Vidal'], answer: 1 },
            { q: 'Se mejorará el transporte público.', options: ['Elena Ruiz', 'Tomás Vidal'], answer: 0 },
            { q: 'Primero habría que hacer una prueba.', options: ['Elena Ruiz', 'Tomás Vidal'], answer: 1 },
          ],
        },
      ],
    },
  ],
  writing: [
    {
      title: 'Expresión escrita 1',
      prompt: 'Se ha mudado recientemente. Escriba un correo a su amiga Inés.',
      promptEn: 'You have recently moved. Write an email to your friend Inés (100–120 words).',
      points: ['Describa su nueva casa.', 'Cuente qué es diferente en el nuevo barrio.', 'Invítela a una fiesta para celebrarlo.'],
      words: [100, 120],
      model: '¡Hola, Inés! ¿Cómo estás? Por fin me he mudado. Mi nuevo piso tiene dos habitaciones y una terraza pequeña donde desayuno todas las mañanas. El barrio es muy diferente del anterior: es mucho más tranquilo y hay un parque enorme justo enfrente de casa. Lo único malo es que el supermercado está bastante lejos, así que tengo que ir en coche. Para celebrarlo, voy a hacer una pequeña fiesta el sábado 12 por la noche. Vendrán algunos compañeros de trabajo y mi hermano. ¿Te apetece venir? Me encantaría que conocieras la casa. Si quieres, puedes quedarte a dormir. ¡Espero tu respuesta! Un abrazo, Sam',
      checklist: ['Greeting and sign-off for a friend', 'All three points with details', 'Pretérito perfecto (me he mudado) and future (voy a, vendrán)', 'At least one subjunctive (me encantaría que…)', '100–120 words'],
    },
    {
      title: 'Expresión escrita 2',
      prompt: 'En un foro se discute: «¿Es necesario tener coche en la ciudad?». Escriba su opinión.',
      promptEn: 'A forum asks: “Do you need a car in the city?” Give your opinion (130–150 words).',
      points: ['Su opinión', 'Argumentos a favor o en contra', 'Un ejemplo de su experiencia'],
      words: [130, 150],
      model: 'En mi opinión, en una gran ciudad no es necesario tener coche. En primer lugar, el transporte público suele ser más rápido, porque no hay atascos y no hay que buscar aparcamiento, algo que en el centro puede llevar media hora. En segundo lugar, tener coche es muy caro: el seguro, la gasolina y las reparaciones cuestan mucho dinero cada mes. Además, contaminar menos es responsabilidad de todos. Hace dos años vendí mi coche y desde entonces voy al trabajo en bicicleta o en metro. Al principio me costó acostumbrarme, pero ahora estoy más en forma y tengo más dinero para viajar. Es cierto que para algunas personas, por ejemplo las que viven en las afueras o tienen hijos pequeños, el coche es útil. Para ellas, compartir coche o alquilarlo cuando lo necesitan puede ser una buena solución.',
      checklist: ['A clear opinion (En mi opinión / Creo que…)', 'Ordered arguments: en primer lugar, además, sin embargo', 'A personal example in the past', 'A counter-argument and a conclusion', '130–150 words'],
    },
  ],
};

export const EXAMS_ES: Exam[] = [A1, A2, B1];
