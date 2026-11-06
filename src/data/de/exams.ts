import type { Exam } from '../types';

// Original practice tasks that follow the structure of the Goethe-Zertifikat exams
// (parts, task types, number of plays, 60 % pass mark). Not official exam material.
const RF = ['Richtig', 'Falsch'];
const JN = ['Ja', 'Nein'];

const A1: Exam = {
  id: 'de-exam-a1', level: 'A1', title: 'Mock exam A1',
  basedOn: 'Format of the Goethe-Zertifikat A1: Start Deutsch 1',
  modules: [
    {
      id: 'hoeren', title: 'Hören', titleEn: 'Listening', minutes: 20,
      parts: [
        {
          title: 'Teil 1', plays: 2,
          instructions: 'Sie hören kurze Gespräche. Kreuzen Sie an: a, b oder c.',
          instructionsEn: 'You hear short conversations. Choose a, b or c. Each recording plays twice.',
          items: [
            { audio: '– Entschuldigung, wie viel kostet der Apfelsaft? – Der Apfelsaft? Eine Flasche kostet ein Euro neunzig.', q: 'Wie viel kostet der Apfelsaft?', options: ['1,19 €', '1,90 €', '9,10 €'], answer: 1 },
            { audio: '– Wann kommt der Bus zur Bahnhofstraße? – Der nächste Bus kommt um zehn nach acht.', q: 'Wann kommt der Bus?', options: ['Um 8:10 Uhr', 'Um 8:20 Uhr', 'Um 7:50 Uhr'], answer: 0 },
            { audio: '– Hallo Maria, gehen wir heute Abend ins Kino? – Heute kann ich nicht, ich muss arbeiten. Aber morgen gern!', q: 'Wann gehen sie ins Kino?', options: ['Heute Abend', 'Am Wochenende', 'Morgen'], answer: 2 },
            { audio: '– Wo ist hier die Toilette, bitte? – Gehen Sie die Treppe hoch, im ersten Stock links.', q: 'Wo ist die Toilette?', options: ['Im Erdgeschoss', 'Im ersten Stock links', 'Im ersten Stock rechts'], answer: 1 },
            { audio: '– Was möchten Sie trinken? – Einen Tee mit Milch, bitte. Keinen Kaffee, danke.', q: 'Was trinkt die Frau?', options: ['Tee mit Milch', 'Kaffee', 'Wasser'], answer: 0 },
            { audio: '– Wie ist deine Telefonnummer? – Null eins sieben eins, drei vier fünf, sechs zwei acht.', q: 'Wie ist die Telefonnummer?', options: ['0171 354 628', '0117 345 268', '0171 345 628'], answer: 2 },
          ],
        },
        {
          title: 'Teil 2', plays: 1,
          instructions: 'Sie hören Durchsagen. Kreuzen Sie an: Richtig oder Falsch.',
          instructionsEn: 'You hear announcements. True or false? Each recording plays once.',
          items: [
            { audio: 'Achtung am Gleis drei: Der Intercity nach Hamburg hat heute zwanzig Minuten Verspätung.', q: 'Der Zug nach Hamburg kommt pünktlich.', options: RF, answer: 1 },
            { audio: 'Liebe Kunden, heute im Angebot: Bananen, ein Kilo nur neunundneunzig Cent.', q: 'Bananen sind heute billig.', options: RF, answer: 0 },
            { audio: 'Sehr geehrte Fahrgäste, der Bus fährt heute nicht zum Marktplatz. Bitte nehmen Sie die Straßenbahn Linie fünf.', q: 'Zum Marktplatz soll man heute die Straßenbahn nehmen.', options: RF, answer: 0 },
            { audio: 'Das Schwimmbad ist am Montag geschlossen. Von Dienstag bis Sonntag ist es von neun bis zwanzig Uhr geöffnet.', q: 'Das Schwimmbad ist am Montag geöffnet.', options: RF, answer: 1 },
          ],
        },
        {
          title: 'Teil 3', plays: 2,
          instructions: 'Sie hören Nachrichten am Telefon. Kreuzen Sie an: a, b oder c.',
          instructionsEn: 'You hear phone messages. Choose a, b or c. Each recording plays twice.',
          items: [
            { audio: 'Hallo Tim, hier ist Anna. Ich bin krank und kann morgen nicht zum Deutschkurs kommen. Kannst du mir bitte die Hausaufgaben schicken? Danke!', q: 'Was soll Tim machen?', options: ['Anna besuchen', 'Die Hausaufgaben schicken', 'Zum Arzt gehen'], answer: 1 },
            { audio: 'Guten Tag, hier ist die Praxis Dr. Weber. Ihr Termin am Donnerstag um neun Uhr ist leider nicht möglich. Können Sie am Freitag um elf Uhr kommen?', q: 'Wann ist der neue Termin?', options: ['Am Donnerstag um 9 Uhr', 'Am Freitag um 9 Uhr', 'Am Freitag um 11 Uhr'], answer: 2 },
            { audio: 'Hallo Mama, ich bin noch im Büro. Ich komme heute erst um sieben nach Hause. Esst bitte schon ohne mich.', q: 'Wann kommt die Person nach Hause?', options: ['Um sieben', 'Um sechs', 'Um acht'], answer: 0 },
            { audio: 'Hallo Herr Braun, hier ist das Autohaus Müller. Ihr Auto ist fertig. Sie können es heute bis achtzehn Uhr abholen.', q: 'Was kann Herr Braun heute machen?', options: ['Ein Auto kaufen', 'Sein Auto abholen', 'Sein Auto in die Werkstatt bringen'], answer: 1 },
          ],
        },
      ],
    },
    {
      id: 'lesen', title: 'Lesen', titleEn: 'Reading', minutes: 25,
      parts: [
        {
          title: 'Teil 1',
          instructions: 'Lesen Sie die E-Mail. Kreuzen Sie an: Richtig oder Falsch.',
          instructionsEn: 'Read the email. True or false?',
          text: 'Liebe Julia,\nwie geht es dir? Ich bin jetzt in Wien. Die Stadt ist sehr schön, aber das Wetter ist schlecht: Es regnet jeden Tag. Ich wohne bei meiner Tante. Sie hat eine große Wohnung im Zentrum. Morgen besuche ich mit ihr das Museum. Am Samstag fahre ich zurück nach Berlin.\nViele Grüße\nLena',
          items: [
            { q: 'Lena ist im Moment in Berlin.', options: RF, answer: 1 },
            { q: 'Das Wetter in Wien ist gut.', options: RF, answer: 1 },
            { q: 'Lena wohnt bei ihrer Tante.', options: RF, answer: 0 },
            { q: 'Lena fährt am Samstag nach Berlin.', options: RF, answer: 0 },
          ],
        },
        {
          title: 'Teil 2',
          instructions: 'Lesen Sie die Aufgaben und die Anzeigen. Wo finden Sie Informationen? Kreuzen Sie an: a oder b.',
          instructionsEn: 'Read the tasks and the adverts. Where do you find the information? Choose a or b.',
          items: [
            { q: 'Sie möchten am Sonntag Brot kaufen.', options: ['Bäckerei Schulz: Mo–Sa 6–18 Uhr', 'Bäckerei Krause: täglich 7–12 Uhr, auch sonntags'], answer: 1 },
            { q: 'Sie suchen einen Deutschkurs am Abend.', options: ['Volkshochschule: Deutsch A1, Mo + Mi, 18:30–20:00 Uhr', 'Sprachschule Lingua: Deutsch A1, Mo–Fr, 9:00–12:00 Uhr'], answer: 0 },
            { q: 'Sie möchten ein gebrauchtes Fahrrad kaufen.', options: ['Fahrrad Meier: neue Räder ab 499 €', 'Flohmarkt am Samstag: Kleidung, Bücher, alte Fahrräder'], answer: 1 },
            { q: 'Sie wollen mit Ihren Kindern essen gehen.', options: ['Restaurant Bella: Kinderkarte und Spielecke', 'Bar Nachtlicht: ab 22 Uhr, Eintritt ab 18 Jahren'], answer: 0 },
          ],
        },
        {
          title: 'Teil 3',
          instructions: 'Lesen Sie die Schilder. Kreuzen Sie an: Richtig oder Falsch.',
          instructionsEn: 'Read the signs. True or false?',
          items: [
            { text: 'Praxis Dr. Klein\nWir sind vom 1. bis 14. August im Urlaub.\nVertretung: Dr. Roth, Hauptstraße 5', q: 'Im August kann man zu Dr. Roth gehen.', options: RF, answer: 0 },
            { text: 'Bitte keine Hunde im Supermarkt!', q: 'Man darf mit dem Hund in den Supermarkt.', options: RF, answer: 1 },
            { text: 'Museum heute kostenlos für Studenten — bitte Ausweis zeigen.', q: 'Studenten bezahlen heute nichts.', options: RF, answer: 0 },
            { text: 'Aufzug kaputt! Bitte benutzen Sie die Treppe.', q: 'Man kann heute mit dem Aufzug fahren.', options: RF, answer: 1 },
          ],
        },
      ],
    },
  ],
  writing: [
    {
      title: 'Schreiben',
      prompt: 'Sie möchten Ihre Freundin Eva am Wochenende besuchen. Schreiben Sie Eva eine kurze Nachricht.',
      promptEn: 'You want to visit your friend Eva at the weekend. Write her a short message covering all three points.',
      points: ['Wann kommen Sie?', 'Was möchten Sie zusammen machen?', 'Was bringen Sie mit?'],
      words: [25, 40],
      model: 'Liebe Eva, ich möchte dich am Samstag besuchen. Ich komme um zwei Uhr mit dem Zug. Wollen wir zusammen in die Stadt gehen und Kaffee trinken? Ich bringe einen Kuchen mit. Bis bald! Deine Anna',
      checklist: ['Greeting (Liebe Eva / Hallo Eva) and a sign-off', 'All three points answered', 'The verb is in second position in every sentence', 'About 30 words'],
    },
  ],
};

const A2: Exam = {
  id: 'de-exam-a2', level: 'A2', title: 'Mock exam A2',
  basedOn: 'Format of the Goethe-Zertifikat A2',
  modules: [
    {
      id: 'hoeren', title: 'Hören', titleEn: 'Listening', minutes: 30,
      parts: [
        {
          title: 'Teil 1', plays: 2,
          instructions: 'Sie hören fünf kurze Texte. Kreuzen Sie an: a, b oder c.',
          instructionsEn: 'You hear five short texts. Choose a, b or c. Each plays twice.',
          items: [
            { audio: 'Und nun das Wetter für morgen: Im Norden bleibt es kühl und regnerisch, im Süden scheint die Sonne bei bis zu fünfundzwanzig Grad.', q: 'Wie wird das Wetter morgen im Süden?', options: ['Kühl und regnerisch', 'Sonnig und warm', 'Kalt mit Schnee'], answer: 1 },
            { audio: 'Hallo, hier ist Peter. Unser Treffen heute Abend muss leider ausfallen, weil ich noch arbeiten muss. Können wir uns stattdessen am Donnerstag treffen?', q: 'Warum sagt Peter das Treffen ab?', options: ['Er ist krank.', 'Er hat keine Lust.', 'Er muss arbeiten.'], answer: 2 },
            { audio: 'Liebe Fahrgäste, wegen Bauarbeiten fahren zwischen Hauptbahnhof und Stadtpark heute keine U-Bahnen. Bitte benutzen Sie die Ersatzbusse.', q: 'Was sollen die Fahrgäste tun?', options: ['Ersatzbusse nehmen', 'Zu Fuß gehen', 'Ein Taxi nehmen'], answer: 0 },
            { audio: 'Guten Tag, hier spricht Frau Lange vom Reisebüro Sonnenschein. Ihre Tickets für Mallorca sind jetzt da. Sie können sie ab morgen bei uns abholen.', q: 'Was kann man ab morgen machen?', options: ['Nach Mallorca fliegen', 'Die Tickets abholen', 'Die Reise buchen'], answer: 1 },
            { audio: 'Achtung, liebe Kunden: Unser Geschäft schließt heute schon um achtzehn Uhr. Morgen sind wir wie immer bis zwanzig Uhr für Sie da.', q: 'Bis wann ist das Geschäft heute geöffnet?', options: ['Bis 20 Uhr', 'Bis 19 Uhr', 'Bis 18 Uhr'], answer: 2 },
          ],
        },
        {
          title: 'Teil 2', plays: 1,
          instructions: 'Sie hören ein Gespräch. Was macht Jonas wann? Wählen Sie die richtige Lösung.',
          instructionsEn: 'You hear a conversation. What is Jonas doing on which day? The recording plays once.',
          audio: '– Sag mal, Jonas, was machst du eigentlich diese Woche? – Am Montag habe ich Fußballtraining, wie immer. Am Dienstag besuche ich meine Oma im Krankenhaus. Am Mittwoch gehe ich mit Lisa ins Kino, und am Donnerstag muss ich für meine Prüfung lernen. – Und am Freitag? – Da feiern wir den Geburtstag von meinem Bruder.',
          items: [
            { q: 'Montag', options: ['Kino', 'Fußballtraining', 'Lernen'], answer: 1 },
            { q: 'Dienstag', options: ['Oma besuchen', 'Geburtstag feiern', 'Fußballtraining'], answer: 0 },
            { q: 'Mittwoch', options: ['Lernen', 'Oma besuchen', 'Kino'], answer: 2 },
            { q: 'Donnerstag', options: ['Für die Prüfung lernen', 'Kino', 'Einkaufen'], answer: 0 },
            { q: 'Freitag', options: ['Fußballtraining', 'Geburtstag feiern', 'Oma besuchen'], answer: 1 },
          ],
        },
        {
          title: 'Teil 3', plays: 1,
          instructions: 'Sie hören kurze Gespräche. Kreuzen Sie an: a, b oder c.',
          instructionsEn: 'You hear short conversations. Choose a, b or c. Each plays once.',
          items: [
            { audio: '– Ich hätte gern ein Kilo Tomaten und zwei Gurken. – Gern. Möchten Sie noch etwas? – Nein, danke. Ach doch: noch sechs Eier, bitte.', q: 'Was kauft die Frau NICHT?', options: ['Tomaten', 'Kartoffeln', 'Eier'], answer: 1 },
            { audio: '– Wie bist du heute zur Arbeit gekommen? Dein Auto ist doch kaputt. – Ich bin mit dem Fahrrad gefahren. Das hat nur zwanzig Minuten gedauert.', q: 'Wie ist der Mann zur Arbeit gekommen?', options: ['Mit dem Auto', 'Mit dem Bus', 'Mit dem Fahrrad'], answer: 2 },
            { audio: '– Was fehlt Ihnen denn? – Ich habe seit drei Tagen Halsschmerzen und Fieber. – Dann schreibe ich Sie bis Freitag krank.', q: 'Was hat der Patient?', options: ['Halsschmerzen und Fieber', 'Kopfschmerzen', 'Bauchschmerzen'], answer: 0 },
            { audio: '– Hast du schon ein Geschenk für Papa? – Ja, ich habe ihm ein Buch über Italien gekauft. Er fährt doch im Sommer nach Rom.', q: 'Was hat sie für ihren Vater gekauft?', options: ['Eine Reise', 'Ein Buch', 'Einen Pullover'], answer: 1 },
          ],
        },
        {
          title: 'Teil 4', plays: 2,
          instructions: 'Sie hören ein Interview. Kreuzen Sie an: Ja oder Nein.',
          instructionsEn: 'You hear an interview. Yes or no? The recording plays twice.',
          audio: '– Frau Schneider, Sie sind vor zwei Jahren aus Hamburg aufs Land gezogen. Warum? – In Hamburg war unsere Wohnung zu klein und zu teuer. Jetzt haben wir ein Haus mit Garten, und die Kinder können draußen spielen. – Vermissen Sie die Stadt? – Manchmal schon. Ins Theater gehen ist jetzt schwierig. Aber ich arbeite zweimal pro Woche im Homeoffice, deshalb muss ich nicht jeden Tag nach Hamburg fahren.',
          items: [
            { q: 'Frau Schneider wohnt jetzt in Hamburg.', options: JN, answer: 1 },
            { q: 'Die Wohnung in Hamburg war teuer.', options: JN, answer: 0 },
            { q: 'Sie vermisst manchmal das Theater.', options: JN, answer: 0 },
            { q: 'Sie fährt jeden Tag nach Hamburg.', options: JN, answer: 1 },
          ],
        },
      ],
    },
    {
      id: 'lesen', title: 'Lesen', titleEn: 'Reading', minutes: 30,
      parts: [
        {
          title: 'Teil 1',
          instructions: 'Lesen Sie den Zeitungstext. Kreuzen Sie an: a, b oder c.',
          instructionsEn: 'Read the newspaper article. Choose a, b or c.',
          text: 'Ein Café für alle\nIn der Berliner Lindenstraße hat letzten Monat ein besonderes Café eröffnet. Im „Café Miteinander“ arbeiten Menschen mit und ohne Behinderung zusammen. Die Idee hatte Sandra Kühn, 34. „Ich wollte einen Ort schaffen, an dem jeder willkommen ist“, sagt sie. Das Café ist von Dienstag bis Sonntag geöffnet. Besonders beliebt ist der Kuchen, den die Mitarbeiter jeden Morgen selbst backen. Am Wochenende gibt es außerdem Konzerte mit Musikern aus der Nachbarschaft.',
          items: [
            { q: 'Das Café gibt es …', options: ['seit einem Jahr.', 'seit einem Monat.', 'seit einer Woche.'], answer: 1 },
            { q: 'Im Café arbeiten …', options: ['Menschen mit und ohne Behinderung.', 'nur Studenten.', 'nur Musiker.'], answer: 0 },
            { q: 'Am Montag ist das Café …', options: ['ab Mittag geöffnet.', 'den ganzen Tag geöffnet.', 'geschlossen.'], answer: 2 },
            { q: 'Am Wochenende gibt es …', options: ['Kochkurse.', 'Konzerte.', 'einen Flohmarkt.'], answer: 1 },
          ],
        },
        {
          title: 'Teil 2',
          instructions: 'Lesen Sie die Informationstafel im Kaufhaus. In welchen Stock gehen Sie?',
          instructionsEn: 'Read the department store directory. Which floor do you go to?',
          text: 'Kaufhaus Merkur\nErdgeschoss: Kosmetik, Schmuck, Zeitschriften\n1. Stock: Damenmode, Schuhe\n2. Stock: Herrenmode, Sportbekleidung\n3. Stock: Spielwaren, Bücher, Schreibwaren\n4. Stock: Elektronik, Haushaltsgeräte, Restaurant',
          items: [
            { q: 'Sie suchen ein Puzzle für ein Kind.', options: ['2. Stock', '3. Stock', '4. Stock'], answer: 1 },
            { q: 'Sie möchten einen Wasserkocher kaufen.', options: ['Erdgeschoss', '1. Stock', '4. Stock'], answer: 2 },
            { q: 'Sie brauchen eine Zeitschrift für die Zugfahrt.', options: ['Erdgeschoss', '3. Stock', '4. Stock'], answer: 0 },
            { q: 'Sie suchen eine Hose für Ihren Mann.', options: ['1. Stock', '2. Stock', '3. Stock'], answer: 1 },
          ],
        },
        {
          title: 'Teil 3',
          instructions: 'Lesen Sie die E-Mail. Kreuzen Sie an: a, b oder c.',
          instructionsEn: 'Read the email. Choose a, b or c.',
          text: 'Hallo Markus,\nvielen Dank für deine Einladung zur Grillparty am Samstag! Ich komme sehr gern, aber ich kann erst gegen acht Uhr da sein, weil ich bis sieben arbeiten muss. Soll ich etwas mitbringen? Ich kann einen Salat machen oder Getränke kaufen. Meine Schwester ist gerade zu Besuch — darf ich sie mitbringen? Sie ist sehr nett und isst übrigens kein Fleisch.\nBis Samstag!\nCarla',
          items: [
            { q: 'Carla kommt zur Party …', options: ['pünktlich.', 'später.', 'nicht.'], answer: 1 },
            { q: 'Warum?', options: ['Sie arbeitet bis sieben.', 'Sie hat Besuch.', 'Sie ist krank.'], answer: 0 },
            { q: 'Carla möchte …', options: ['einen Kuchen backen.', 'Fleisch kaufen.', 'einen Salat oder Getränke mitbringen.'], answer: 2 },
            { q: 'Carlas Schwester …', options: ['wohnt bei Markus.', 'isst vegetarisch.', 'kann nicht kommen.'], answer: 1 },
          ],
        },
      ],
    },
  ],
  writing: [
    {
      title: 'Schreiben Teil 1',
      prompt: 'Sie sind heute Abend mit Ihrem Freund Paul im Kino verabredet. Sie kommen zu spät. Schreiben Sie Paul eine SMS.',
      promptEn: 'You are meeting your friend Paul at the cinema tonight, but you will be late. Write him a text message.',
      points: ['Entschuldigen Sie sich.', 'Sagen Sie, warum Sie zu spät kommen.', 'Wann sind Sie da?'],
      words: [20, 30],
      model: 'Hallo Paul, es tut mir leid, aber ich komme etwa zwanzig Minuten zu spät. Mein Bus hat Verspätung. Ich bin um acht Uhr da. Kauf bitte schon die Karten! Bis gleich, Sara',
      checklist: ['Greeting and sign-off', 'An apology (Es tut mir leid / Entschuldigung)', 'A reason with weil or a separate sentence', 'A time', '20–30 words'],
    },
    {
      title: 'Schreiben Teil 2',
      prompt: 'Sie können morgen nicht zum Deutschkurs kommen. Schreiben Sie Ihrer Kursleiterin, Frau Wagner, eine E-Mail.',
      promptEn: 'You cannot attend your German class tomorrow. Write an email to your teacher, Ms Wagner (formal: Sie).',
      points: ['Sagen Sie, warum Sie nicht kommen können.', 'Fragen Sie nach den Hausaufgaben.', 'Wann kommen Sie wieder?'],
      words: [30, 40],
      model: 'Liebe Frau Wagner, leider kann ich morgen nicht zum Kurs kommen, weil ich einen Termin beim Arzt habe. Können Sie mir bitte die Hausaufgaben schicken? Am Donnerstag bin ich wieder da. Viele Grüße, Maria Lopez',
      checklist: ['Formal greeting (Liebe / Sehr geehrte Frau Wagner) and Sie throughout', 'All three points', 'weil + verb at the end', 'A formal sign-off (Viele Grüße / Mit freundlichen Grüßen)', '30–40 words'],
    },
  ],
};

const B1: Exam = {
  id: 'de-exam-b1', level: 'B1', title: 'Mock exam B1',
  basedOn: 'Format of the Goethe-Zertifikat B1',
  modules: [
    {
      id: 'lesen', title: 'Lesen', titleEn: 'Reading', minutes: 65,
      parts: [
        {
          title: 'Teil 1',
          instructions: 'Lesen Sie den Blogeintrag. Sind die Aussagen richtig oder falsch?',
          instructionsEn: 'Read the blog post. Are the statements true or false?',
          text: 'Mein erstes Jahr in Leipzig\nVor einem Jahr bin ich für mein Studium von einem kleinen Dorf in Bayern nach Leipzig gezogen. Am Anfang war alles neu und ehrlich gesagt ein bisschen zu viel: die vielen Menschen, der Lärm, die Straßenbahnen. In den ersten Wochen habe ich mich oft einsam gefühlt, weil ich niemanden kannte. Das hat sich geändert, als ich mich in einem Chor angemeldet habe. Dort habe ich nicht nur nette Leute kennengelernt, sondern auch meine jetzige Mitbewohnerin Hanna. Inzwischen fühle ich mich hier richtig zu Hause. Nur das Essen meiner Mutter vermisse ich immer noch — deshalb fahre ich jeden zweiten Monat nach Hause.',
          items: [
            { q: 'Die Autorin kommt aus einer Großstadt.', options: RF, answer: 1 },
            { q: 'Am Anfang fand sie Leipzig anstrengend.', options: RF, answer: 0 },
            { q: 'In den ersten Wochen hatte sie schon viele Freunde.', options: RF, answer: 1 },
            { q: 'Im Chor hat sie ihre Mitbewohnerin kennengelernt.', options: RF, answer: 0 },
            { q: 'Sie fühlt sich in Leipzig immer noch fremd.', options: RF, answer: 1 },
            { q: 'Sie fährt jeden Monat zu ihren Eltern.', options: RF, answer: 1 },
          ],
        },
        {
          title: 'Teil 2',
          instructions: 'Lesen Sie den Text aus der Presse. Kreuzen Sie an: a, b oder c.',
          instructionsEn: 'Read the press article. Choose a, b or c.',
          text: 'Vier-Tage-Woche: Mehr Freizeit, gleiche Leistung?\nImmer mehr Firmen in Deutschland testen die Vier-Tage-Woche. Die Mitarbeiter arbeiten nur noch vier Tage pro Woche, bekommen aber das gleiche Gehalt. Erste Ergebnisse einer Studie zeigen: Die meisten Beschäftigten sind zufriedener und seltener krank. Auch die Produktivität ist in vielen Betrieben nicht gesunken. Kritiker warnen jedoch, dass das Modell nicht für alle Branchen passt. In Krankenhäusern oder Restaurants zum Beispiel fehlen schon jetzt Arbeitskräfte. Hier würde eine kürzere Arbeitswoche das Problem noch größer machen.',
          items: [
            { q: 'Bei der Vier-Tage-Woche …', options: ['verdienen die Mitarbeiter weniger.', 'bekommen die Mitarbeiter das gleiche Gehalt.', 'arbeiten die Mitarbeiter am Wochenende.'], answer: 1 },
            { q: 'Die Studie zeigt, dass die Beschäftigten …', options: ['zufriedener sind.', 'öfter krank sind.', 'weniger leisten.'], answer: 0 },
            { q: 'Die Kritiker meinen, dass …', options: ['das Modell für alle Firmen gut ist.', 'die Studie falsch ist.', 'es in manchen Branchen Probleme gibt.'], answer: 2 },
          ],
        },
        {
          title: 'Teil 4',
          instructions: 'Lesen Sie die Kommentare. Ist die Person für ein Handyverbot an Schulen?',
          instructionsEn: 'Read the comments. Is the person in favour of banning phones at school?',
          items: [
            { text: 'Michael, 45: Als Lehrer sehe ich jeden Tag, wie die Handys die Schüler ablenken. In der Pause spielen sie nicht mehr zusammen, sondern starren auf ihre Bildschirme. Ein Verbot wäre für alle eine Erleichterung.', q: 'Ist Michael für ein Handyverbot?', options: JN, answer: 0 },
            { text: 'Sophie, 17: Ich verstehe die Lehrer, aber ein komplettes Verbot finde ich übertrieben. Wir brauchen das Handy auch im Unterricht, zum Beispiel für Recherchen. Besser wären klare Regeln.', q: 'Ist Sophie für ein Handyverbot?', options: JN, answer: 1 },
            { text: 'Ahmet, 39: Mein Sohn ist zwölf. Seit seine Schule Handys verboten hat, ist er viel konzentrierter und trifft sich wieder mit echten Freunden. Ich kann das nur empfehlen.', q: 'Ist Ahmet für ein Handyverbot?', options: JN, answer: 0 },
            { text: 'Renate, 63: Kinder müssen lernen, vernünftig mit Technik umzugehen. Das lernen sie nicht, wenn man ihnen alles verbietet.', q: 'Ist Renate für ein Handyverbot?', options: JN, answer: 1 },
          ],
        },
        {
          title: 'Teil 5',
          instructions: 'Lesen Sie die Hausordnung. Kreuzen Sie an: a, b oder c.',
          instructionsEn: 'Read the house rules. Choose a, b or c.',
          text: 'Hausordnung — Studentenwohnheim Am Park\n1. Ruhezeiten: Von 22 bis 7 Uhr und sonntags ganztägig ist Ruhe einzuhalten.\n2. Gäste dürfen höchstens drei Nächte bleiben und müssen beim Hausmeister angemeldet werden.\n3. Der Müll wird getrennt: Papier, Plastik und Restmüll gehören in die Container im Hof.\n4. Fahrräder dürfen nicht im Treppenhaus abgestellt werden. Bitte nutzen Sie den Fahrradkeller.\n5. Bei Schäden in der Wohnung informieren Sie bitte sofort die Hausverwaltung.',
          items: [
            { q: 'Am Sonntag …', options: ['darf man den ganzen Tag laut sein.', 'muss man den ganzen Tag leise sein.', 'ist nur abends Ruhe.'], answer: 1 },
            { q: 'Gäste …', options: ['müssen angemeldet werden.', 'dürfen eine Woche bleiben.', 'sind nicht erlaubt.'], answer: 0 },
            { q: 'Fahrräder …', options: ['dürfen im Treppenhaus stehen.', 'müssen im Hof stehen.', 'gehören in den Keller.'], answer: 2 },
          ],
        },
      ],
    },
    {
      id: 'hoeren', title: 'Hören', titleEn: 'Listening', minutes: 40,
      parts: [
        {
          title: 'Teil 1', plays: 2,
          instructions: 'Sie hören fünf kurze Texte. Sind die Aussagen richtig oder falsch?',
          instructionsEn: 'You hear five short texts. True or false? Each plays twice.',
          items: [
            { audio: 'Guten Tag, Frau Becker, hier ist die Autowerkstatt Fischer. Wir haben Ihr Auto untersucht. Die Bremsen müssen repariert werden, das kostet etwa dreihundert Euro. Bitte rufen Sie uns zurück, ob wir die Reparatur machen sollen.', q: 'Frau Becker soll die Werkstatt zurückrufen.', options: RF, answer: 0 },
            { audio: 'Liebe Hörerinnen und Hörer, am Wochenende findet auf dem Marktplatz wieder das große Stadtfest statt. Wegen des Festes ist die Innenstadt am Samstag und Sonntag für Autos gesperrt.', q: 'Am Wochenende kann man mit dem Auto in die Innenstadt fahren.', options: RF, answer: 1 },
            { audio: 'Hi Lukas, ich bin’s, Mia. Ich habe zwei Karten für das Konzert am Freitag gewonnen! Hast du Lust mitzukommen? Es fängt um halb neun an. Sag mir bitte bis morgen Bescheid.', q: 'Das Konzert beginnt um 20:30 Uhr.', options: RF, answer: 0 },
            { audio: 'Eine Durchsage für die Fahrgäste des ICE nach München: Wegen einer Störung endet der Zug heute in Nürnberg. Reisende nach München nehmen bitte den Regionalzug auf Gleis sieben.', q: 'Der ICE fährt heute bis München.', options: RF, answer: 1 },
            { audio: 'Guten Tag, hier ist die Stadtbibliothek. Das Buch, das Sie bestellt haben, ist jetzt da. Sie können es bis zum fünfzehnten März abholen. Danach geht es an den nächsten Leser.', q: 'Man kann das Buch bis Mitte März abholen.', options: RF, answer: 0 },
          ],
        },
        {
          title: 'Teil 2', plays: 1,
          instructions: 'Sie nehmen an einer Museumsführung teil. Kreuzen Sie an: a, b oder c.',
          instructionsEn: 'You are on a museum tour. Choose a, b or c. The recording plays once.',
          audio: 'Herzlich willkommen im Stadtmuseum! Mein Name ist Karin Vogel, und ich begleite Sie heute durch unsere Ausstellung. Unsere Führung dauert ungefähr eine Stunde. Wir beginnen im Erdgeschoss mit der Geschichte der Stadt im Mittelalter. Danach gehen wir in den ersten Stock, wo Sie Fotos aus dem zwanzigsten Jahrhundert sehen. Bitte beachten Sie: In der Ausstellung darf man fotografieren, aber ohne Blitz. Ihre Taschen und Jacken können Sie kostenlos in den Schließfächern neben dem Eingang lassen. Nach der Führung lädt Sie unser Museumscafé im zweiten Stock ein. Mit Ihrer Eintrittskarte bekommen Sie dort zehn Prozent Rabatt.',
          items: [
            { q: 'Die Führung dauert …', options: ['eine halbe Stunde.', 'ungefähr eine Stunde.', 'zwei Stunden.'], answer: 1 },
            { q: 'Im ersten Stock sieht man …', options: ['Fotos aus dem 20. Jahrhundert.', 'Bilder aus dem Mittelalter.', 'moderne Kunst.'], answer: 0 },
            { q: 'Fotografieren ist …', options: ['verboten.', 'ohne Blitz erlaubt.', 'nur im Café erlaubt.'], answer: 1 },
            { q: 'Mit der Eintrittskarte …', options: ['ist der Kaffee kostenlos.', 'kann man zweimal kommen.', 'bekommt man im Café Rabatt.'], answer: 2 },
          ],
        },
        {
          title: 'Teil 3', plays: 1,
          instructions: 'Sie hören ein Gespräch. Sind die Aussagen richtig oder falsch?',
          instructionsEn: 'You hear a conversation. True or false? The recording plays once.',
          audio: '– Hallo Jan, wie war dein Urlaub in Norwegen? – Super, aber ganz anders als geplant. Eigentlich wollten wir zelten, aber es hat fast jeden Tag geregnet. Deshalb haben wir dann eine kleine Hütte gemietet. – Oh, war das nicht teuer? – Doch, ziemlich. Aber wir haben beim Essen gespart, weil wir immer selbst gekocht haben. – Und was hat dir am besten gefallen? – Die Wanderung zu einem Gletscher. Das war anstrengend, aber die Aussicht war unglaublich. Nächstes Jahr möchte ich unbedingt wieder hin — dann aber im Juli, nicht im September.',
          items: [
            { q: 'Jan und seine Freunde haben die ganze Zeit gezeltet.', options: RF, answer: 1 },
            { q: 'Die Hütte war ziemlich teuer.', options: RF, answer: 0 },
            { q: 'Sie sind oft ins Restaurant gegangen.', options: RF, answer: 1 },
            { q: 'Jan möchte nächstes Jahr im Sommer wieder nach Norwegen.', options: RF, answer: 0 },
          ],
        },
        {
          title: 'Teil 4', plays: 2,
          instructions: 'Sie hören eine Radiodiskussion. Wer sagt was?',
          instructionsEn: 'You hear a radio discussion. Who says what? The recording plays twice.',
          audio: 'Heute diskutieren wir: Sollen Autos aus der Innenstadt verschwinden? Bei mir sind Frau Hoffmann, Stadträtin, und Herr Krüger, Inhaber eines Schuhgeschäfts. Frau Hoffmann? – Ich bin überzeugt, dass eine autofreie Innenstadt die Lebensqualität verbessert. Die Luft wird sauberer, und die Menschen haben mehr Platz zum Spazierengehen. – Das klingt schön, aber viele meiner Kunden kommen mit dem Auto, besonders ältere Menschen. Wenn sie nicht mehr parken können, kaufen sie im Internet. – Was sagen Sie dazu, Frau Hoffmann? – Wir wollen die Busverbindungen deutlich verbessern, und es wird Parkhäuser am Stadtrand geben. – Trotzdem fürchte ich, dass kleine Geschäfte darunter leiden werden. Man sollte das Projekt erst ein Jahr lang testen.',
          items: [
            { q: 'Die Luft in der Stadt wird besser.', options: ['Frau Hoffmann', 'Herr Krüger'], answer: 0 },
            { q: 'Ältere Kunden brauchen ihr Auto.', options: ['Frau Hoffmann', 'Herr Krüger'], answer: 1 },
            { q: 'Es soll bessere Busverbindungen geben.', options: ['Frau Hoffmann', 'Herr Krüger'], answer: 0 },
            { q: 'Man sollte das Projekt zuerst testen.', options: ['Frau Hoffmann', 'Herr Krüger'], answer: 1 },
          ],
        },
      ],
    },
  ],
  writing: [
    {
      title: 'Schreiben Teil 1',
      prompt: 'Sie sind vor Kurzem umgezogen. Schreiben Sie Ihrer Freundin Lea eine E-Mail.',
      promptEn: 'You have recently moved. Write an email to your friend Lea (about 80 words).',
      points: ['Beschreiben Sie Ihre neue Wohnung.', 'Erzählen Sie, was in der neuen Gegend anders ist.', 'Laden Sie Lea zu einer Einweihungsparty ein.'],
      words: [70, 100],
      model: 'Liebe Lea, wie geht es dir? Ich bin endlich umgezogen! Meine neue Wohnung hat zwei Zimmer und einen kleinen Balkon, auf dem ich morgens frühstücke. Die Gegend ist ganz anders als früher: Es ist viel ruhiger, und es gibt einen schönen Park direkt vor dem Haus. Leider ist der nächste Supermarkt ziemlich weit weg. Am Samstag, dem 12. Mai, mache ich eine kleine Einweihungsparty. Hast du Lust zu kommen? Ich würde mich sehr freuen! Liebe Grüße, Sam',
      checklist: ['Greeting and sign-off for a friend', 'All three points, each with a detail', 'At least one subordinate clause (weil, dass, wenn, Relativsatz)', 'Connectors: aber, deshalb, außerdem, leider…', 'About 80 words'],
    },
    {
      title: 'Schreiben Teil 2',
      prompt: 'Im Online-Forum einer Zeitung diskutieren Leser über das Thema „Sollte man in der Stadt ein Auto haben?“. Schreiben Sie Ihre Meinung.',
      promptEn: 'In a newspaper’s online forum readers discuss: “Should you own a car in the city?” Give your opinion (about 80 words).',
      points: ['Ihre Meinung', 'Gründe dafür oder dagegen', 'ein Beispiel aus Ihrer Erfahrung'],
      words: [70, 100],
      model: 'Meiner Meinung nach braucht man in einer Großstadt kein eigenes Auto. Erstens sind Busse und Bahnen meistens schneller, weil man nicht im Stau steht und keinen Parkplatz suchen muss. Zweitens ist ein Auto sehr teuer: Versicherung, Benzin und Reparaturen kosten jeden Monat viel Geld. Ich habe mein Auto vor zwei Jahren verkauft und fahre seitdem mit dem Fahrrad zur Arbeit. Das ist gesünder und besser für die Umwelt. Für den Urlaub kann man sich ja ein Auto mieten.',
      checklist: ['A clear opinion (Meiner Meinung nach / Ich finde, dass …)', 'At least two reasons', 'A personal example in the past (Perfekt)', 'Ordered argument: erstens, zweitens, außerdem', 'About 80 words'],
    },
  ],
};

export const EXAMS_DE: Exam[] = [A1, A2, B1];
