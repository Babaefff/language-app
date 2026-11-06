import { units } from '../build';

// Extra topic units: animals, time, countries, school (A1); sport, transport, celebrations,
// housework, money (A2); healthy living, complaints, digital life, job applications (B1).

export const DE_MORE_A1 = units('A1', [
  {
    id: 'de-a1-11', title: 'Animals & nature', titleEs: 'Tiere und Natur', emoji: '🐶',
    description: 'Pets, farm animals and the countryside.',
    words: [
      ['das Kaninchen', 'the rabbit', 'Das Kaninchen frisst eine Karotte.', 'The rabbit is eating a carrot.'], ['das Schaf', 'the sheep'], ['das Tier', 'the animal'],
      ['der Vogel', 'the bird'], ['das Pferd', 'the horse'], ['die Kuh', 'the cow'], ['das Schwein', 'the pig'], ['die Ente', 'the duck'],
      ['die Maus', 'the mouse'], ['der Baum', 'the tree'], ['die Blume', 'the flower'], ['der Wald', 'the forest'], ['der Berg', 'the mountain'],
      ['der See', 'the lake'], ['die Insel', 'the island'], ['der Fluss', 'the river'], ['die Wiese', 'the meadow'], ['das Haustier', 'the pet'],
      ['füttern', 'to feed'], ['süß', 'cute / sweet'],
      ['der Hase', 'the hare'], ['die Ziege', 'the goat'], ['das Huhn', 'the chicken'], ['der Bauernhof', 'the farm'], ['das Gras', 'the grass'],
    ],
    sentences: [
      ['Hast du ein Haustier?', 'Do you have a pet?'],
      ['Ich habe einen Hund und zwei Katzen.', 'I have a dog and two cats.'],
      ['Am Sonntag gehen wir im Wald spazieren.', 'On Sunday we go for a walk in the forest.'],
      ['Die Kühe stehen auf der Wiese.', 'The cows are standing in the meadow.'],
      ['Im Sommer schwimmen wir im See.', 'In summer we swim in the lake.'],
    ],
    grammar: `
## Plurals: learn them with the noun
German plurals have several patterns — learn each noun as a pair:
| der Hund → die Hund**e** | die Katze → die Katze**n** |
| der Vogel → die V**ö**gel | das Tier → die Tier**e** |
| die Maus → die M**äu**se | das Pferd → die Pferd**e** |

- The plural article is always **die**.
- Many feminine nouns add **-n / -en**: *die Blume → die Blumen*.
`,
    conj: { verbs: ['haben', 'sehen', 'schwimmen'], tenses: ['presente'] },
  },
  {
    id: 'de-a1-12', title: 'Time & the clock', titleEs: 'Die Uhrzeit', emoji: '🕒',
    description: 'Tell the time and talk about when things happen.',
    words: [
      ['die Uhrzeit', 'the time (of day)'], ['die Stunde', 'the hour'], ['die Minute', 'the minute'], ['die Sekunde', 'the second'],
      ['halb', 'half', 'Es ist halb acht.', "It's half past seven."], ['Viertel nach', 'quarter past'], ['Viertel vor', 'quarter to'],
      ['um wie viel Uhr?', 'at what time?'], ['der Mittag', 'midday'], ['die Mitternacht', 'midnight'], ['morgens', 'in the mornings'], ['abends', 'in the evenings'],
      ['pünktlich', 'on time'], ['die Viertelstunde', 'a quarter of an hour'], ['die Pünktlichkeit', 'punctuality'], ['rechtzeitig', 'in time'], ['vorhin', 'a moment ago'],
      ['der Wecker', 'the alarm clock'], ['das Jahrhundert', 'the century'], ['der Termin', 'the appointment'],
      ['der Vormittag', 'the morning (until noon)'], ['die Tageszeit', 'the time of day'], ['der Kalender', 'the calendar'], ['morgen früh', 'tomorrow morning'], ['zu spät kommen', 'to be late'],
    ],
    sentences: [
      ['Wie spät ist es?', 'What time is it?'],
      ['Es ist Viertel nach drei.', "It's quarter past three."],
      ['Der Kurs beginnt um halb neun.', 'The course starts at half past eight.'],
      ['Ich habe um zehn Uhr einen Termin.', 'I have an appointment at ten.'],
      ['Bist du schon fertig?', 'Are you finished already?'],
    ],
    grammar: `
## Telling the time
| 8:00 | acht Uhr |
| 8:15 | Viertel nach acht |
| 8:30 | **halb neun** (half *to* nine!) |
| 8:45 | Viertel vor neun |
| 8:10 | zehn nach acht |

- **halb** looks forward: *halb neun* = 8:30, not 9:30.
- **um** + time: *um acht Uhr* (at eight) · **am** + day: *am Montag* · **im** + month: *im Mai*
`,
    conj: { verbs: ['beginnen', 'anfangen', 'warten'], tenses: ['presente'] },
  },
  {
    id: 'de-a1-13', title: 'Countries & languages', titleEs: 'Länder und Sprachen', emoji: '🌍',
    description: 'Where people come from and which languages they speak.',
    words: [
      ['Spanien', 'Spain'], ['die Muttersprache', 'the mother tongue'], ['Deutschland', 'Germany'], ['Österreich', 'Austria'],
      ['die Schweiz', 'Switzerland'], ['Frankreich', 'France'], ['Italien', 'Italy'], ['England', 'England'], ['die Türkei', 'Turkey'],
      ['Deutsch', 'German (language)'], ['Englisch', 'English (language)'], ['Französisch', 'French (language)'], ['der Ausländer', 'the foreigner'],
      ['international', 'international'], ['woher?', 'where from?', 'Woher kommst du?', 'Where do you come from?'], ['die Hauptstadt', 'the capital'],
      ['die Grenze', 'the border'], ['ein bisschen', 'a little'], ['fließend', 'fluently'], ['übersetzen', 'to translate'],
      ['Spanisch', 'Spanish (language)'], ['Europa', 'Europe'], ['die Nationalität', 'the nationality'], ['der Dialekt', 'the dialect'], ['Amerika', 'America'],
    ],
    sentences: [
      ['Woher kommen Sie?', 'Where do you come from?'],
      ['Ich komme aus der Türkei, aber ich wohne in Wien.', 'I come from Turkey, but I live in Vienna.'],
      ['Sprichst du Französisch?', 'Do you speak French?'],
      ['Ich spreche ein bisschen Deutsch.', 'I speak a little German.'],
      ['Bern ist die Hauptstadt der Schweiz.', 'Bern is the capital of Switzerland.'],
    ],
    grammar: `
## aus + country
- Most countries have no article: *Ich komme **aus** Italien.*
- A few have one — then use the dative: **die** Schweiz → *aus **der** Schweiz*, **die** Türkei → *aus **der** Türkei*, **die** USA → *aus **den** USA*

## Languages
Language names are adjectives written with a capital: *Ich spreche **Deutsch** und **Englisch**.*
`,
    conj: { verbs: ['sprechen', 'kommen', 'wohnen'], tenses: ['presente'] },
  },
  {
    id: 'de-a1-14', title: 'School & learning', titleEs: 'Schule und Lernen', emoji: '📚',
    description: 'The classroom, subjects and studying.',
    words: [
      ['die Grundschule', 'the primary school'], ['die Klasse', 'the class'], ['der Unterricht', 'the lessons / teaching'], ['die Schultasche', 'the school bag'],
      ['der Schüler', 'the pupil'], ['das Heft', 'the exercise book'], ['der Stift', 'the pen'], ['die Tafel', 'the board'],
      ['die Hausaufgabe', 'the homework'], ['der Test', 'the test'], ['die Note', 'the grade / mark'], ['die Pause', 'the break'],
      ['das Lineal', 'the ruler'], ['Mathe', 'maths'], ['das Wörterbuch', 'the dictionary'], ['der Radiergummi', 'the rubber / eraser'],
      ['das Zeugnis', 'the school report'], ['buchstabieren', 'to spell'], ['wiederholen', 'to repeat / revise'], ['üben', 'to practise'],
      ['der Kugelschreiber', 'the ballpoint pen'], ['der Kurs', 'the course'], ['das Beispiel', 'the example'], ['die Seite', 'the page'], ['der Satz', 'the sentence'],
    ],
    sentences: [
      ['Wir schreiben morgen eine Prüfung.', "We're taking an exam tomorrow."],
      ['Hast du die Hausaufgaben gemacht?', 'Have you done the homework?'],
      ['Mein Lieblingsfach ist Mathe.', 'My favourite subject is maths.'],
      ['Können Sie das bitte wiederholen?', 'Could you repeat that, please?'],
      ['Die Antwort ist richtig.', 'The answer is correct.'],
    ],
    grammar: `
## Classroom phrases
- *Wie sagt man … auf Deutsch?* — How do you say … in German?
- *Was bedeutet …?* — What does … mean?
- *Ich verstehe das nicht.* — I don't understand that.
- *Langsamer, bitte.* — Slower, please.

## Lieblings- (favourite)
Put **Lieblings-** in front of any noun: *das Lieblingsfach, die Lieblingsfarbe, das Lieblingsessen*.
`,
    conj: { verbs: ['lernen', 'schreiben', 'verstehen'], tenses: ['presente', 'perfecto'] },
  },
]);

export const DE_MORE_A2 = units('A2', [
  {
    id: 'de-a2-09', title: 'Sport & fitness', titleEs: 'Sport und Fitness', emoji: '🏃',
    description: 'Sports, training and staying fit.',
    words: [
      ['die Sportart', 'the (type of) sport'], ['das Training', 'the training'], ['trainieren', 'to train'], ['das Fitnessstudio', 'the gym'],
      ['die Mannschaft', 'the team'], ['das Spiel', 'the game / match'], ['das Tor', 'the goal'], ['der Ball', 'the ball'],
      ['joggen', 'to jog'], ['Rad fahren', 'to cycle'], ['wandern', 'to hike'], ['Ski fahren', 'to ski'], ['der Verein', 'the club'],
      ['fit', 'fit'], ['stark', 'strong'], ['schwach', 'weak'], ['das Rennen', 'the race'], ['die Niederlage', 'the defeat'], ['der Schiedsrichter', 'the referee'],
      ['der Sieg', 'the victory'],
      ['das Stadion', 'the stadium'], ['der Spieler', 'the player'], ['das Schwimmbad', 'the swimming pool'], ['der Trainer', 'the coach'], ['verletzt', 'injured'],
    ],
    sentences: [
      ['Ich gehe dreimal pro Woche ins Fitnessstudio.', 'I go to the gym three times a week.'],
      ['Unsere Mannschaft hat das Spiel gewonnen.', 'Our team won the match.'],
      ['Am Wochenende wandern wir in den Alpen.', 'At the weekend we hike in the Alps.'],
      ['Er ist Mitglied in einem Fußballverein.', 'He is a member of a football club.'],
      ['Ich bin schneller gelaufen als letztes Jahr.', 'I ran faster than last year.'],
    ],
    grammar: `
## Movement verbs take sein in the Perfekt
*Ich **bin** gelaufen, gejoggt, gewandert, Rad gefahren, geschwommen.*
But: *Ich **habe** trainiert, Fußball gespielt.*

## How often?
**einmal, zweimal, dreimal** (once, twice, three times) · **pro Woche** (per week) · **jeden Tag** (every day)
`,
    conj: { verbs: ['laufen', 'gewinnen', 'trainieren'], tenses: ['perfecto', 'presente'] },
  },
  {
    id: 'de-a2-10', title: 'Getting around', titleEs: 'Unterwegs', emoji: '🚆',
    description: 'Public transport, tickets and asking the way.',
    words: [
      ['der Hauptbahnhof', 'the main station'], ['die Linie', 'the (bus / tram) line'], ['der Fahrplan', 'the timetable'], ['der Fahrkartenautomat', 'the ticket machine'],
      ['das Gleis', 'the platform / track'], ['umsteigen', 'to change (trains)', 'Wo muss ich umsteigen?', 'Where do I have to change?'],
      ['einsteigen', 'to get on'], ['aussteigen', 'to get off'], ['die Verspätung', 'the delay'], ['die Straßenbahn', 'the tram'],
      ['abbiegen', 'to turn (left / right)'], ['die Richtung', 'the direction'], ['der Bahnsteig', 'the platform'], ['die Ecke', 'the corner'], ['die Ampel', 'the traffic light'],
      ['die Kreuzung', 'the crossroads'], ['entfernt', 'away / distant'], ['in der Nähe', 'nearby'], ['der Stau', 'the traffic jam'], ['der Fußgänger', 'the pedestrian'],
      ['die Brücke', 'the bridge'], ['das Taxi', 'the taxi'], ['die Einbahnstraße', 'the one-way street'], ['der Parkplatz', 'the car park / parking space'], ['zu Fuß', 'on foot'],
    ],
    sentences: [
      ['Entschuldigung, wie komme ich zum Bahnhof?', 'Excuse me, how do I get to the station?'],
      ['Gehen Sie geradeaus und dann an der Ampel links.', 'Go straight on and then left at the traffic light.'],
      ['Der Zug hat zehn Minuten Verspätung.', 'The train is ten minutes late.'],
      ['In Köln müssen Sie umsteigen.', 'You have to change in Cologne.'],
      ['Ist die Haltestelle weit von hier?', 'Is the stop far from here?'],
    ],
    grammar: `
## Asking the way politely
- *Wie komme ich **zum** Bahnhof / **zur** Post?* — zu + dem = zum, zu + der = zur
- *Gibt es hier **in der Nähe** eine Apotheke?*

## Separable travel verbs
**einsteigen, aussteigen, umsteigen, abfahren, ankommen** — the prefix goes to the end:
*Wir **steigen** in Köln **um**.* · Perfekt: *Wir sind **umgestiegen**.*
`,
    conj: { verbs: ['abfahren', 'ankommen', 'fahren'], tenses: ['presente', 'perfecto'] },
  },
  {
    id: 'de-a2-11', title: 'Celebrations', titleEs: 'Feste und Feiertage', emoji: '🎉',
    description: 'Birthdays, Christmas and other German celebrations.',
    words: [
      ['das Fest', 'the celebration / festival'], ['der Sekt', 'sparkling wine'], ['der Geburtstag', 'the birthday'], ['das Geschenk', 'the present'],
      ['die Einladung', 'the invitation'], ['einladen', 'to invite', 'Ich lade dich zu meiner Party ein.', "I'm inviting you to my party."],
      ['gratulieren', 'to congratulate'], ['Herzlichen Glückwunsch!', 'Congratulations! / Happy birthday!'], ['Weihnachten', 'Christmas'],
      ['Ostern', 'Easter'], ['Silvester', "New Year's Eve"], ['der Feiertag', 'the public holiday'], ['die Hochzeit', 'the wedding'],
      ['die Kerze', 'the candle'], ['der Kuchen', 'the cake'], ['schenken', 'to give (a present)'], ['Frohe Weihnachten!', 'Merry Christmas!'],
      ['Prost!', 'Cheers!'], ['der Gast', 'the guest'], ['das Feuerwerk', 'the fireworks'],
      ['der Luftballon', 'the balloon'], ['die Tradition', 'the tradition'], ['der Adventskalender', 'the Advent calendar'], ['der Weihnachtsbaum', 'the Christmas tree'], ['das Neujahr', 'New Year’s Day'],
    ],
    sentences: [
      ['Ich habe am Samstag Geburtstag.', "It's my birthday on Saturday."],
      ['Was schenkst du deiner Mutter?', 'What are you giving your mother?'],
      ['Herzlichen Glückwunsch zum Geburtstag!', 'Happy birthday!'],
      ['An Silvester gibt es überall Feuerwerk.', "On New Year's Eve there are fireworks everywhere."],
      ['Wir haben zwanzig Gäste zur Hochzeit eingeladen.', 'We invited twenty guests to the wedding.'],
    ],
    grammar: `
## Two objects: dative person, accusative thing
*Ich schenke **meiner Mutter** (dat.) **einen Schal** (acc.).*
Who gets it → dative · What you give → accusative.

## Festive phrases
**zu** + occasion: *Herzlichen Glückwunsch **zum** Geburtstag / **zur** Hochzeit!*
**an** + holiday: *an Weihnachten, an Ostern, an Silvester*
`,
    conj: { verbs: ['schenken', 'geben', 'bringen'], tenses: ['presente', 'perfecto'] },
  },
  {
    id: 'de-a2-12', title: 'Housework', titleEs: 'Hausarbeit', emoji: '🧹',
    description: 'Chores, cleaning and sharing a home.',
    words: [
      ['putzen', 'to clean'], ['spülen', 'to wash up'], ['abwaschen', 'to do the dishes'], ['staubsaugen', 'to vacuum'],
      ['die Wäsche', 'the laundry'], ['bügeln', 'to iron'], ['der Mülleimer', 'the bin'], ['rausbringen', 'to take out'],
      ['das Bett machen', 'to make the bed'], ['gießen', 'to water (plants)'], ['die Pflanze', 'the plant'], ['der Staubsauger', 'the vacuum cleaner'],
      ['die Waschmaschine', 'the washing machine'], ['die Spülmaschine', 'the dishwasher'], ['schmutzig', 'dirty'], ['sauber', 'clean'],
      ['ordentlich', 'tidy'], ['unordentlich', 'messy'], ['der Haushalt', 'the household'], ['erledigen', 'to get done'],
      ['der Lappen', 'the cloth'], ['der Besen', 'the broom'], ['wischen', 'to wipe / mop'], ['die Ordnung', 'order / tidiness'], ['der Staub', 'the dust'],
    ],
    sentences: [
      ['Wer bringt heute den Müll raus?', 'Who is taking out the rubbish today?'],
      ['Ich putze jeden Samstag das Bad.', 'I clean the bathroom every Saturday.'],
      ['Die Küche ist schon wieder schmutzig!', 'The kitchen is dirty again!'],
      ['Kannst du bitte die Blumen gießen?', 'Can you water the flowers, please?'],
      ['Wir teilen uns die Hausarbeit.', 'We share the housework.'],
    ],
    grammar: `
## Asking someone to do something
- **Kannst du** bitte den Müll **rausbringen**? (friendly)
- **Könnten Sie** bitte …? (very polite)
- Imperative: *Bring bitte den Müll raus!* — see the grammar lesson **Giving instructions**.

## Every / each
**jeden** Tag (m), **jede** Woche (f), **jedes** Jahr (n) — accusative for time.
`,
    conj: { verbs: ['aufräumen', 'waschen', 'putzen'], tenses: ['presente', 'imperativo'] },
  },
  {
    id: 'de-a2-13', title: 'Money & the bank', titleEs: 'Geld und Bank', emoji: '💶',
    description: 'Paying, banking and talking about prices.',
    words: [
      ['das Bargeld', 'cash'], ['die Bankkarte', 'the bank card'], ['das Konto', 'the (bank) account'], ['die Karte', 'the card'],
      ['bar', 'in cash', 'Kann ich bar bezahlen?', 'Can I pay in cash?'], ['der Geldautomat', 'the cash machine'], ['abheben', 'to withdraw'],
      ['überweisen', 'to transfer'], ['der Betrag', 'the amount'], ['die Geldbörse', 'the purse / wallet'], ['der Kontoauszug', 'the bank statement'],
      ['die Gebühr', 'the fee'], ['günstig', 'good value'], ['das Angebot', 'the offer'], ['der Rabatt', 'the discount'], ['die Münze', 'the coin'],
      ['der Schein', 'the banknote'], ['leihen', 'to lend / borrow'], ['ausgeben', 'to spend'], ['die Zinsen', 'the interest (on money)'],
      ['die PIN', 'the PIN'], ['das Wechselgeld', 'the change (money)'], ['wechseln', 'to change (money)'], ['die Kosten', 'the costs'], ['umsonst', 'for free'],
    ],
    sentences: [
      ['Kann ich mit Karte bezahlen?', 'Can I pay by card?'],
      ['Wo ist der nächste Geldautomat?', 'Where is the nearest cash machine?'],
      ['Ich muss noch die Miete überweisen.', 'I still have to transfer the rent.'],
      ['Kannst du mir zwanzig Euro leihen?', 'Can you lend me twenty euros?'],
      ['Ich gebe zu viel Geld für Kleidung aus.', 'I spend too much money on clothes.'],
    ],
    grammar: `
## Prices
*Was kostet das?* / *Wie viel kostet das?* — *Das kostet 4,50 € (vier Euro fünfzig).*
German uses a **comma** for decimals and a **dot** for thousands: 1.250,99 €

## zu + adjective
**zu** = too: *Das ist mir **zu** teuer.* — That's too expensive for me.
`,
    conj: { verbs: ['bezahlen', 'kosten', 'sparen'], tenses: ['presente', 'perfecto'] },
  },
]);

export const DE_MORE_B1 = units('B1', [
  {
    id: 'de-b1-09', title: 'Healthy living', titleEs: 'Gesund leben', emoji: '🥗',
    description: 'Diet, sleep, stress and habits.',
    words: [
      ['die Ernährung', 'the diet / nutrition'], ['sich ernähren', 'to eat (a diet)'], ['der Blutdruck', 'the blood pressure'], ['ungesund', 'unhealthy'],
      ['der Stress', 'stress'], ['sich entspannen', 'to relax'], ['die Gewohnheit', 'the habit'], ['abnehmen', 'to lose weight'],
      ['zunehmen', 'to put on weight'], ['das Gewicht', 'the weight'], ['vegetarisch', 'vegetarian'], ['der Zucker', 'the sugar'],
      ['rauchen', 'to smoke'], ['die Bewegung', 'exercise / movement'], ['ausreichend', 'enough / sufficient'], ['regelmäßig', 'regularly'],
      ['die Vorsorge', 'prevention / check-ups'], ['schlaflos', 'sleepless'], ['erschöpft', 'exhausted'], ['das Gleichgewicht', 'the balance'],
      ['die Vitamine', 'vitamins'], ['der Alkohol', 'alcohol'], ['das Übergewicht', 'being overweight'], ['meditieren', 'to meditate'], ['die Ruhe', 'peace and quiet'],
    ],
    sentences: [
      ['Ich versuche, mich gesünder zu ernähren.', "I'm trying to eat more healthily."],
      ['Seit ich regelmäßig Sport mache, schlafe ich besser.', 'Since I started doing sport regularly, I sleep better.'],
      ['Er hat vor zwei Jahren mit dem Rauchen aufgehört.', 'He stopped smoking two years ago.'],
      ['Zu viel Stress ist schlecht für die Gesundheit.', 'Too much stress is bad for your health.'],
      ['Wie entspannst du dich am besten?', 'How do you relax best?'],
    ],
    grammar: `
## Verbs as nouns
Any infinitive can become a neuter noun: **das** Rauchen, **das** Schlafen, **das** Essen.
*Mit dem Rauchen aufhören* — to stop smoking.

## seit (since / for)
**seit** + dative, with the **present** tense for things still going on:
*Ich lerne **seit** drei Jahren Deutsch.* — I have been learning German for three years.
`,
    conj: { verbs: ['aufhören', 'versuchen', 'schlafen'], tenses: ['perfecto', 'presente'] },
  },
  {
    id: 'de-b1-10', title: 'Problems & complaints', titleEs: 'Probleme und Beschwerden', emoji: '😤',
    description: 'Complain politely and sort out problems.',
    words: [
      ['sich beschweren', 'to complain'], ['die Beschwerde', 'the complaint'], ['die Reklamation', 'the complaint (about a product)'], ['kaputt', 'broken'],
      ['funktionieren', 'to work (machine)', 'Die Heizung funktioniert nicht.', "The heating isn't working."], ['umtauschen', 'to exchange (goods)'],
      ['zurückgeben', 'to give back / return'], ['reklamieren', 'to complain about (a product)'], ['die Quittung', 'the receipt'], ['die Garantie', 'the warranty'],
      ['der Kundenservice', 'customer service'], ['ärgerlich', 'annoying'], ['frech', 'cheeky / rude'], ['unzufrieden', 'dissatisfied'],
      ['der Schaden', 'the damage'], ['ersetzen', 'to replace'], ['sich entschuldigen', 'to apologise'], ['das Missverständnis', 'the misunderstanding'],
      ['verlangen', 'to demand'], ['die Entschädigung', 'the compensation'],
      ['der Mangel', 'the defect'], ['beschädigt', 'damaged'], ['die Frist', 'the deadline'], ['zuständig', 'responsible (in charge)'], ['die Lieferung', 'the delivery'],
    ],
    sentences: [
      ['Ich möchte mich über das Zimmer beschweren.', 'I would like to complain about the room.'],
      ['Leider funktioniert der Fernseher nicht.', "Unfortunately the TV isn't working."],
      ['Kann ich die Schuhe umtauschen?', 'Can I exchange the shoes?'],
      ['Haben Sie die Quittung noch?', 'Do you still have the receipt?'],
      ['Das war wohl ein Missverständnis.', 'That was probably a misunderstanding.'],
    ],
    grammar: `
## Complaining politely
- *Ich möchte mich **über** … beschweren.* (über + accusative)
- *Leider … · Es tut mir leid, aber … · Könnten Sie bitte …?*
- *Ich hätte gern mein Geld zurück.* — I'd like a refund.

## sich entschuldigen
*Ich entschuldige **mich für** die Verspätung.* — I apologise **for** the delay.
`,
    conj: { verbs: ['reparieren', 'kündigen', 'bestellen'], tenses: ['presente', 'perfecto'] },
  },
  {
    id: 'de-b1-11', title: 'Digital life', titleEs: 'Digitales Leben', emoji: '💻',
    description: 'Social media, privacy and life online.',
    words: [
      ['soziale Medien', 'social media'], ['das Netzwerk', 'the network'], ['der Beitrag', 'the post'], ['posten', 'to post'],
      ['liken', 'to like (a post)'], ['der Datenschutz', 'data protection / privacy'], ['die Daten', 'data'], ['das Profil', 'the profile'],
      ['sich anmelden', 'to log in / sign up'], ['sich abmelden', 'to log out'], ['der Nutzer', 'the user'], ['hochladen', 'to upload'],
      ['der Algorithmus', 'the algorithm'], ['abhängig', 'dependent / addicted'], ['online', 'online'], ['die Bildschirmzeit', 'screen time'],
      ['der Kommentar', 'the comment'], ['die Privatsphäre', 'privacy'], ['gefälscht', 'fake'], ['vorsichtig', 'careful'],
      ['der Link', 'the link'], ['die Suchmaschine', 'the search engine'], ['speichern', 'to save (a file)'], ['löschen', 'to delete'], ['der Hacker', 'the hacker'],
    ],
    sentences: [
      ['Ich verbringe zu viel Zeit am Handy.', 'I spend too much time on my phone.'],
      ['Man sollte nicht jedes Foto online posten.', "You shouldn't post every photo online."],
      ['Hast du dein Passwort vergessen?', 'Have you forgotten your password?'],
      ['Viele Nachrichten im Internet sind gefälscht.', 'Many news stories on the internet are fake.'],
      ['Ohne Internet könnte ich nicht arbeiten.', "I couldn't work without the internet."],
    ],
    grammar: `
## man (one / you / people)
**man** + 3rd person singular: *Man **sollte** vorsichtig sein.* — You should be careful.
It's never replaced by *er* — keep saying *man*.

## ohne / statt + zu
*Er postet Fotos, **ohne** zu fragen.* — He posts photos without asking.
**Statt** zu lernen, sieht sie fern. — Instead of studying, she watches TV.
`,
    conj: { verbs: ['schicken', 'vergessen', 'können'], tenses: ['condicional', 'perfecto'] },
  },
  {
    id: 'de-b1-12', title: 'Applying for a job', titleEs: 'Die Bewerbung', emoji: '📝',
    description: 'CVs, cover letters and job interviews.',
    words: [
      ['die Bewerbungsunterlagen', 'the application documents'], ['sich bewerben', 'to apply', 'Ich bewerbe mich um die Stelle.', "I'm applying for the position."],
      ['die Probezeit', 'the probation period'], ['die Stellenanzeige', 'the job advert'], ['die Qualifikation', 'the qualification'], ['das Anschreiben', 'the cover letter'],
      ['die Absage', 'the rejection'], ['die Berufserfahrung', 'work experience'], ['die Kenntnisse', 'the skills / knowledge'],
      ['die Stärke', 'the strength'], ['die Schwäche', 'the weakness'], ['die Gehaltsvorstellung', 'the salary expectation'], ['die Teilzeit', 'part-time'],
      ['die Vollzeit', 'full-time'], ['der Arbeitgeber', 'the employer'], ['der Arbeitnehmer', 'the employee'], ['zuverlässig', 'reliable'],
      ['flexibel', 'flexible'], ['die Weiterbildung', 'further training'], ['die Zusage', 'the acceptance / job offer'],
      ['die Branche', 'the industry / sector'], ['der Bereich', 'the field / area'], ['die Fähigkeit', 'the ability'], ['überzeugen', 'to convince'], ['der Vertrag', 'the contract'],
    ],
    sentences: [
      ['Ich habe mich bei drei Firmen beworben.', "I've applied to three companies."],
      ['Morgen habe ich ein Vorstellungsgespräch.', 'Tomorrow I have a job interview.'],
      ['Welche Erfahrungen haben Sie in diesem Bereich?', 'What experience do you have in this field?'],
      ['Meine größte Stärke ist, dass ich sehr zuverlässig bin.', 'My greatest strength is that I am very reliable.'],
      ['Ich habe endlich eine Zusage bekommen!', 'I finally got a job offer!'],
    ],
    grammar: `
## sich bewerben
- **um** + accusative = for (the job): *sich **um** eine Stelle bewerben*
- **bei** + dative = at (the company): *sich **bei** Siemens bewerben*
- Perfekt: *Ich habe mich **beworben**.*

## Formal letters
Start: *Sehr geehrte Damen und Herren,* · End: *Mit freundlichen Grüßen*
`,
    conj: { verbs: ['arbeiten', 'verdienen', 'erklären'], tenses: ['perfecto', 'presente'] },
  },
]);

export const DE_MORE_UNIT_LESSONS: Record<string, string[]> = {
  'de-a1-11': ['de-g-plural'],
  'de-a1-12': ['de-g-word-order'],
  'de-a1-13': ['de-g-negation'],
  'de-a1-14': ['de-g-negation', 'de-g-perfekt'],
  'de-a2-09': ['de-g-perfekt'],
  'de-a2-10': ['de-g-separable', 'de-g-dative'],
  'de-a2-11': ['de-g-dative'],
  'de-a2-12': ['de-g-imperative'],
  'de-a2-13': ['de-g-comparison'],
  'de-b1-09': ['de-g-connectors'],
  'de-b1-10': ['de-g-konjunktiv', 'de-g-connectors'],
  'de-b1-11': ['de-g-zu-inf'],
  'de-b1-12': ['de-g-prep-verbs', 'de-g-connectors'],
};
