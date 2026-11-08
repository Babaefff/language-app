import type { Exam } from '../types';
import { vary } from './registry';

// Original practice tasks that follow the structure of the DELF exams (France Éducation international):
// task types and number of plays. Not official exam material.
const VF = ['Vrai', 'Faux'];

const A1: Exam = {
  id: 'fr-exam-a1', level: 'A1', title: 'Mock exam A1',
  basedOn: 'Format of the DELF A1 (France Éducation international)',
  modules: [
    {
      id: 'hoeren', title: 'Compréhension de l’oral', titleEn: 'Listening', minutes: 20,
      parts: [
        {
          title: 'Exercice 1', plays: 2,
          instructions: 'Écoutez et choisissez la bonne réponse.',
          instructionsEn: 'Listen and choose the right answer. Each recording plays twice.',
          items: [
            { audio: '– Bonjour, un croissant et un café, s’il vous plaît. – Ça fait trois euros vingt.', q: 'Combien ça coûte ?', options: ['3,20 €', '2,30 €', '13,20 €'], answer: 0 },
            { audio: '– Le train pour Lyon part à quelle heure ? – À dix heures et quart, voie six.', q: 'Le train part…', options: ['à 10 h 15.', 'à 10 h 45.', 'à 6 h 15.'], answer: 0 },
            { audio: '– Tu veux venir au cinéma samedi ? – Samedi, je ne peux pas, je travaille. Dimanche ?', q: 'La personne est libre…', options: ['dimanche.', 'samedi.', 'vendredi.'], answer: 0 },
            { audio: '– Excusez-moi, la pharmacie, s’il vous plaît ? – Tout droit, puis la deuxième rue à gauche.', q: 'Pour aller à la pharmacie…', options: ['tout droit puis à gauche.', 'à droite.', 'tout droit puis à droite.'], answer: 0 },
            { audio: '– Ton anniversaire, c’est quand ? – Le douze juin.', q: 'L’anniversaire est…', options: ['le 12 juin.', 'le 2 juin.', 'le 12 juillet.'], answer: 0 },
          ],
        },
        {
          title: 'Exercice 2', plays: 2,
          instructions: 'Écoutez les messages et répondez.',
          instructionsEn: 'Listen to the messages and answer. Each plays twice.',
          items: [
            { audio: 'Salut Léo, c’est Emma. Je suis malade, je ne viens pas au cours ce soir. Tu peux me prendre les notes ? Merci !', q: 'Pourquoi Emma ne va pas au cours ?', options: ['Elle est malade.', 'Elle travaille.', 'Elle est en vacances.'], answer: 0 },
            { audio: 'Bonjour madame, ici le cabinet du docteur Martin. Votre rendez-vous de lundi est déplacé à mercredi, quatorze heures.', q: 'Le nouveau rendez-vous est…', options: ['mercredi à 14 h.', 'lundi à 14 h.', 'mercredi à 4 h.'], answer: 0 },
            { audio: 'Chéri, je suis au supermarché. On a besoin de lait ? J’achète aussi des pommes et du fromage.', q: 'Où est la personne ?', options: ['Au supermarché', 'À la maison', 'Au marché'], answer: 0 },
            { audio: 'Mesdames et messieurs, le magasin ferme dans quinze minutes. Merci de vous diriger vers les caisses.', q: 'Le magasin ferme…', options: ['dans 15 minutes.', 'dans 50 minutes.', 'à 15 heures.'], answer: 0 },
          ],
        },
      ],
    },
    {
      id: 'lesen', title: 'Compréhension des écrits', titleEn: 'Reading', minutes: 30,
      parts: [
        {
          title: 'Exercice 1',
          instructions: 'Lisez le courriel et répondez aux questions.',
          instructionsEn: 'Read the email and answer the questions.',
          text: 'Salut Chloé !\nJe suis à Nantes depuis une semaine. J’habite chez une famille très sympa : les parents, deux enfants et un chien. Le matin, j’ai des cours de français à l’université et l’après-midi, je visite la ville. Samedi, on va faire un pique-nique au bord de la Loire avec la famille. Tu viens me voir en juillet ?\nBisous,\nAnna',
          items: [
            { q: 'Anna habite…', options: ['dans une famille.', 'seule.', 'avec des étudiants.'], answer: 0 },
            { q: 'Le matin, Anna…', options: ['a des cours de français.', 'visite la ville.', 'travaille.'], answer: 0 },
            { q: 'Samedi, Anna va…', options: ['faire un pique-nique.', 'aller au cinéma.', 'partir à Paris.'], answer: 0 },
            { q: 'Anna invite Chloé…', options: ['en juillet.', 'samedi.', 'en juin.'], answer: 0 },
          ],
        },
        {
          title: 'Exercice 2',
          instructions: 'Lisez les annonces et choisissez la bonne réponse.',
          instructionsEn: 'Read the notices and choose the right answer.',
          items: [
            { text: 'BOULANGERIE DU CENTRE\nOuvert du mardi au dimanche, 7 h – 19 h 30.\nFermé le lundi.', q: 'La boulangerie est fermée…', options: ['le lundi.', 'le dimanche.', 'le mardi matin.'], answer: 0 },
            { text: 'À VENDRE : vélo de ville, très bon état, 80 €. Appelez Marc le soir : 06 45 23 11 09.', q: 'On peut appeler Marc…', options: ['le soir.', 'le matin.', 'à midi.'], answer: 0 },
            { text: 'PISCINE MUNICIPALE\nLe bonnet de bain est obligatoire.\nEnfants de moins de 8 ans : accompagnés d’un adulte.', q: 'À la piscine, il faut…', options: ['un bonnet de bain.', 'venir avec un enfant.', 'avoir plus de 8 ans.'], answer: 0 },
            { text: 'COURS DE CUISINE\nTous les jeudis à 18 h. Premier cours gratuit !', q: 'Le premier cours…', options: ['ne coûte rien.', 'est le mardi.', 'est à 8 h.'], answer: 0 },
          ],
        },
        {
          title: 'Exercice 3',
          instructions: 'Lisez le texte. Vrai ou faux ?',
          instructionsEn: 'Read the text. True or false?',
          text: 'Je m’appelle Karim, j’ai vingt-huit ans et je suis cuisinier dans un restaurant à Marseille. Je travaille le soir et le week-end. J’ai une sœur, Nadia, qui est infirmière. Le lundi, mon jour libre, je joue au football avec des amis et je me promène sur la plage. Je n’aime pas beaucoup la télévision.',
          items: [
            { q: 'Karim travaille dans un restaurant.', options: VF, answer: 0 },
            { q: 'Karim travaille le lundi.', options: VF, answer: 1 },
            { q: 'Nadia est infirmière.', options: VF, answer: 0 },
            { q: 'Karim adore regarder la télévision.', options: VF, answer: 1 },
          ],
        },
      ],
    },
  ],
  writing: [
    {
      title: 'Production écrite',
      prompt: 'Vous passez le week-end chez votre ami Thomas. Écrivez-lui un message : quand vous arrivez, ce que vous voulez faire, ce que vous apportez.',
      promptEn: 'You are spending the weekend at your friend Thomas’s. Write him a message: when you arrive, what you want to do, what you are bringing.',
      points: ['Quand arrivez-vous ?', 'Qu’est-ce que vous voulez faire ?', 'Qu’est-ce que vous apportez ?'],
      words: [30, 50],
      model: 'Salut Thomas ! J’arrive vendredi à dix-huit heures en train. Samedi, je voudrais visiter le musée et me promener dans le centre. Le soir, on peut manger au restaurant. J’apporte un gâteau au chocolat ! À vendredi, Sophie',
      checklist: ['Greeting and sign-off', 'All three points', 'Verbs conjugated (j’arrive, je voudrais, j’apporte)', 'Elision: j’arrive, not je arrive', 'About 40 words'],
    },
  ],
};

const A2: Exam = {
  id: 'fr-exam-a2', level: 'A2', title: 'Mock exam A2',
  basedOn: 'Format of the DELF A2 (France Éducation international)',
  modules: [
    {
      id: 'hoeren', title: 'Compréhension de l’oral', titleEn: 'Listening', minutes: 25,
      parts: [
        {
          title: 'Exercice 1', plays: 2,
          instructions: 'Écoutez les dialogues et choisissez la bonne réponse.',
          instructionsEn: 'Listen to the dialogues and choose the right answer. Each plays twice.',
          items: [
            { audio: '– Alors, tes vacances ? – Super ! On est allés en Corse. Il a fait beau tous les jours, sauf le dernier.', q: 'Le temps pendant les vacances :', options: ['Beau, sauf le dernier jour', 'Mauvais tous les jours', 'Il a plu au début'], answer: 0 },
            { audio: '– Tu as vu le film hier ? – Non, j’étais trop fatigué, je me suis couché à neuf heures.', q: 'Pourquoi il n’a pas vu le film ?', options: ['Il était fatigué.', 'Il travaillait.', 'Il était malade.'], answer: 0 },
            { audio: '– Je voudrais essayer cette veste en 40. – Désolée, il ne reste que du 38 et du 42.', q: 'Quelle taille n’existe plus ?', options: ['Le 40', 'Le 38', 'Le 42'], answer: 0 },
            { audio: '– Ça fait longtemps que tu habites ici ? – Depuis trois ans. Avant, j’habitais à Lille.', q: 'Depuis quand habite-t-il ici ?', options: ['Depuis trois ans', 'Depuis trois mois', 'Il habite à Lille'], answer: 0 },
          ],
        },
        {
          title: 'Exercice 2', plays: 2,
          instructions: 'Écoutez les annonces et répondez.',
          instructionsEn: 'Listen to the announcements and answer. Each plays twice.',
          items: [
            { audio: 'Le TGV à destination de Bordeaux, prévu à 14 h 10, partira avec environ vingt minutes de retard. Nous vous prions de nous excuser.', q: 'Le train partira vers…', options: ['14 h 30.', '14 h 10.', '14 h 20.'], answer: 0 },
            { audio: 'Bonjour, vous êtes bien chez Julien. Je ne suis pas là pour le moment. Laissez-moi un message, je vous rappellerai dès que possible.', q: 'Que doit faire la personne qui appelle ?', options: ['Laisser un message', 'Rappeler demain', 'Envoyer un courriel'], answer: 0 },
            { audio: 'Ce week-end, la bibliothèque municipale organise un atelier de dessin pour les enfants de 6 à 10 ans. L’inscription est gratuite mais obligatoire.', q: 'Pour l’atelier, il faut…', options: ['s’inscrire.', 'payer.', 'avoir plus de 10 ans.'], answer: 0 },
          ],
        },
      ],
    },
    {
      id: 'lesen', title: 'Compréhension des écrits', titleEn: 'Reading', minutes: 30,
      parts: [
        {
          title: 'Exercice 1',
          instructions: 'Lisez le courriel et répondez aux questions.',
          instructionsEn: 'Read the email and answer the questions.',
          text: 'Bonjour à tous,\nComme vous le savez, Sophie quitte l’entreprise à la fin du mois après huit ans parmi nous. Pour lui dire au revoir, nous organisons une petite fête le vendredi 28 à 17 h dans la salle de réunion du deuxième étage. Chacun peut apporter quelque chose à manger ou à boire. Nous voudrions aussi lui offrir un cadeau : si vous souhaitez participer, donnez 5 € à Paul avant mercredi.\nMerci et à vendredi !\nCamille',
          items: [
            { q: 'Pourquoi organise-t-on une fête ?', options: ['Sophie quitte l’entreprise.', 'C’est l’anniversaire de Sophie.', 'Sophie arrive dans l’entreprise.'], answer: 0 },
            { q: 'Depuis combien de temps Sophie travaille-t-elle là ?', options: ['Huit ans', 'Deux ans', 'Vingt-huit ans'], answer: 0 },
            { q: 'Pour le cadeau, il faut donner de l’argent…', options: ['à Paul, avant mercredi.', 'à Camille, vendredi.', 'à Sophie.'], answer: 0 },
          ],
        },
        {
          title: 'Exercice 2',
          instructions: 'Lisez le texte. Vrai ou faux ?',
          instructionsEn: 'Read the text. True or false?',
          text: 'Quand j’étais enfant, nous vivions à la campagne. Mon père était agriculteur et ma mère travaillait à la poste du village. Je prenais le bus pour aller à l’école, qui était à dix kilomètres. À dix-huit ans, je suis parti à Paris pour mes études. Au début, la campagne me manquait beaucoup, mais aujourd’hui, je ne pourrais plus vivre loin de la ville.',
          items: [
            { q: 'Ses parents travaillaient tous les deux à la ferme.', options: VF, answer: 1 },
            { q: 'Il allait à l’école en bus.', options: VF, answer: 0 },
            { q: 'Il est parti à Paris pour travailler.', options: VF, answer: 1 },
            { q: 'Aujourd’hui, il préfère vivre en ville.', options: VF, answer: 0 },
          ],
        },
        {
          title: 'Exercice 3',
          instructions: 'Lisez les petites annonces et choisissez la bonne réponse.',
          instructionsEn: 'Read the small ads and choose the right answer.',
          items: [
            { text: 'Cherche baby-sitter pour deux enfants (4 et 7 ans), mercredi après-midi. Expérience demandée. 12 €/heure.', q: 'Le baby-sitter doit…', options: ['avoir de l’expérience.', 'travailler le matin.', 'avoir des enfants.'], answer: 0 },
            { text: 'Colocation : chambre libre dans un grand appartement, 450 € charges comprises. Non-fumeurs uniquement.', q: 'Dans cet appartement…', options: ['on ne peut pas fumer.', 'les charges sont en plus.', 'il y a deux chambres libres.'], answer: 0 },
            { text: 'Perdu dimanche au parc : petit chat noir avec un collier rouge. Récompense.', q: 'Le chat a été perdu…', options: ['au parc.', 'au marché.', 'samedi.'], answer: 0 },
          ],
        },
      ],
    },
  ],
  writing: [
    {
      title: 'Production écrite',
      prompt: 'Vous avez passé un week-end dans une ville. Écrivez un message à un ami pour raconter : où vous êtes allé(e), ce que vous avez fait, comment c’était.',
      promptEn: 'You spent a weekend in a city. Write to a friend about where you went, what you did and what it was like.',
      points: ['Où êtes-vous allé(e) ?', 'Qu’est-ce que vous avez fait ?', 'C’était comment ?'],
      words: [60, 80],
      model: 'Salut Léa ! Le week-end dernier, je suis allée à Strasbourg avec ma sœur. Nous sommes parties samedi matin en train. Il faisait froid, mais la ville était magnifique. Nous avons visité la cathédrale et nous avons fait un tour en bateau. Le soir, nous avons mangé une choucroute dans un petit restaurant. C’était délicieux ! Dimanche, nous sommes rentrées fatiguées mais contentes. Et toi, ça va ? Bises, Manon',
      checklist: ['Passé composé for events (je suis allée, nous avons visité)', 'Imparfait for description (il faisait froid, c’était)', 'être verbs agree (allée, parties)', 'Greeting and sign-off', '60–80 words'],
    },
  ],
};

const B1: Exam = {
  id: 'fr-exam-b1', level: 'B1', title: 'Mock exam B1',
  basedOn: 'Format of the DELF B1 (France Éducation international)',
  modules: [
    {
      id: 'hoeren', title: 'Compréhension de l’oral', titleEn: 'Listening', minutes: 25,
      parts: [
        {
          title: 'Exercice 1', plays: 2,
          instructions: 'Écoutez l’interview et répondez aux questions.',
          instructionsEn: 'Listen to the interview and answer the questions. It plays twice.',
          audio: '– Bonjour Lucas, vous avez ouvert un café-réparation à Grenoble. De quoi s’agit-il ? – C’est un lieu où les gens apportent un objet cassé, un grille-pain, une lampe, un vélo, et où des bénévoles les aident à le réparer gratuitement. – Pourquoi avez-vous eu cette idée ? – Je trouvais dommage qu’on jette des objets qui pourraient encore servir. Et puis, c’est un moment convivial : les gens discutent, apprennent. – Et ça marche ? – Très bien ! Nous avons réparé plus de mille objets la première année. J’aimerais qu’il y ait un café-réparation dans chaque quartier.',
          items: [
            { q: 'Dans un café-réparation, on…', options: ['répare des objets avec l’aide de bénévoles.', 'achète des objets d’occasion.', 'boit un café en attendant un réparateur payant.'], answer: 0 },
            { q: 'Pourquoi Lucas a-t-il eu cette idée ?', options: ['Il n’aimait pas qu’on jette des objets utiles.', 'Il voulait gagner de l’argent.', 'Il était réparateur.'], answer: 0 },
            { q: 'Combien d’objets ont été réparés la première année ?', options: ['Plus de mille', 'Une centaine', 'Dix mille'], answer: 0 },
            { q: 'Que souhaite Lucas ?', options: ['Un café-réparation dans chaque quartier', 'Ouvrir un restaurant', 'Vendre son café'], answer: 0 },
          ],
        },
        {
          title: 'Exercice 2', plays: 1,
          instructions: 'Écoutez les messages et répondez. Vous entendez chaque message une fois.',
          instructionsEn: 'Listen to the messages and answer. You hear each message once.',
          items: [
            { audio: 'Bonjour, c’est l’agence immobilière. L’appartement que vous avez visité mardi est toujours disponible, mais le propriétaire voudrait une réponse avant vendredi. Si vous êtes intéressé, rappelez-moi rapidement.', q: 'Que demande l’agence ?', options: ['Une réponse avant vendredi', 'Une deuxième visite mardi', 'Un paiement immédiat'], answer: 0 },
            { audio: 'Salut, c’est Nina. Je suis désolée, mais je ne pourrai pas venir à ton anniversaire samedi : mon vol a été annulé et je ne rentrerai que dimanche. On se voit la semaine prochaine ?', q: 'Pourquoi Nina ne viendra pas ?', options: ['Son vol a été annulé.', 'Elle est malade.', 'Elle travaille samedi.'], answer: 0 },
            { audio: 'Information aux voyageurs : en raison de travaux, la ligne 4 du métro sera fermée ce week-end entre les stations Châtelet et Montparnasse. Des bus de remplacement seront mis en place.', q: 'Pendant le week-end…', options: ['des bus remplacent une partie de la ligne 4.', 'tout le métro est fermé.', 'la ligne 4 fonctionne normalement.'], answer: 0 },
          ],
        },
      ],
    },
    {
      id: 'lesen', title: 'Compréhension des écrits', titleEn: 'Reading', minutes: 35,
      parts: [
        {
          title: 'Exercice 1',
          instructions: 'Lisez l’article et répondez aux questions.',
          instructionsEn: 'Read the article and answer the questions.',
          text: 'La semaine de quatre jours : l’expérience d’une entreprise nantaise\nDepuis un an, les quarante salariés d’une entreprise informatique de Nantes travaillent quatre jours par semaine, sans baisse de salaire. Le directeur explique : « Nous voulions que nos employés soient moins stressés et plus motivés. » Le résultat est positif : les absences pour maladie ont diminué de moitié et la production n’a pas baissé. Certains salariés reconnaissent pourtant que les journées sont plus intenses. « Le vendredi libre, c’est formidable, mais il faut être très organisé le reste de la semaine », dit une développeuse. D’autres entreprises s’intéressent maintenant à cette expérience, bien que tous les secteurs ne puissent pas l’appliquer facilement.',
          items: [
            { q: 'Pendant cette expérience, les salariés…', options: ['gagnent le même salaire.', 'gagnent moins.', 'travaillent cinq jours.'], answer: 0 },
            { q: 'Quel était l’objectif du directeur ?', options: ['Réduire le stress et motiver les employés', 'Faire des économies', 'Embaucher plus de personnes'], answer: 0 },
            { q: 'Quel résultat est mentionné ?', options: ['Moins d’absences pour maladie', 'Une baisse de la production', 'Des salaires plus élevés'], answer: 0 },
            { q: 'Quel inconvénient citent certains salariés ?', options: ['Les journées sont plus intenses.', 'Le vendredi est trop long.', 'Ils ont moins de vacances.'], answer: 0 },
          ],
        },
        {
          title: 'Exercice 2',
          instructions: 'Lisez les annonces. Quelle activité convient à chaque personne ?',
          instructionsEn: 'Read the notices. Which activity suits each person?',
          text: 'A. Club de randonnée : sorties en montagne chaque dimanche, tous niveaux.\nB. Atelier théâtre : pour adultes timides qui veulent prendre la parole en public, le mardi soir.\nC. Chorale du quartier : aucune expérience nécessaire, répétitions le jeudi.\nD. Cours de cuisine du monde : un pays différent chaque semaine, le samedi matin.',
          items: [
            { q: 'Marie aimerait avoir plus confiance en elle quand elle parle devant un groupe.', options: ['B', 'A', 'C'], answer: 0 },
            { q: 'Ahmed adore la nature et il est libre le week-end.', options: ['A', 'D', 'B'], answer: 0 },
            { q: 'Julie voudrait chanter mais elle n’a jamais pris de cours.', options: ['C', 'B', 'D'], answer: 0 },
            { q: 'Tom aime découvrir de nouveaux plats et il ne travaille pas le samedi.', options: ['D', 'A', 'C'], answer: 0 },
          ],
        },
      ],
    },
  ],
  writing: [
    {
      title: 'Production écrite',
      prompt: 'Sur un forum, on pose la question : « Faut-il interdire les voitures dans le centre des villes ? » Donnez votre opinion avec des arguments et des exemples.',
      promptEn: 'On a forum, someone asks: “Should cars be banned from town centres?” Give your opinion with arguments and examples.',
      points: ['Votre opinion', 'Deux arguments avec des exemples', 'Une conclusion'],
      words: [160, 180],
      model: 'À mon avis, il faudrait limiter fortement les voitures dans le centre des villes, sans forcément les interdire complètement. D’abord, la pollution de l’air est un vrai problème de santé : dans ma ville, beaucoup d’enfants souffrent d’asthme. Si les voitures étaient moins nombreuses, l’air serait plus propre et les rues plus calmes. Ensuite, un centre sans voitures est plus agréable pour se promener : les gens restent plus longtemps et les commerces en profitent, comme on le voit à Strasbourg. Pourtant, je ne pense pas qu’on puisse tout interdire du jour au lendemain. Les personnes âgées, les livreurs et les artisans ont besoin d’accéder au centre. Il faut donc que les transports en commun soient efficaces et bon marché avant de fermer les rues. En conclusion, je suis pour un centre-ville largement piéton, à condition que chacun puisse continuer à s’y déplacer facilement.',
      checklist: ['A clear opinion (à mon avis, je pense que)', 'Connectors: d’abord, ensuite, pourtant, donc, en conclusion', 'Subjonctif after il faut que / je ne pense pas que', 'A si-sentence (si + imparfait → conditionnel)', '160–180 words'],
    },
  ],
};

/** Spread the right answers over all positions (the data lists them first). */
const spread = (e: Exam): Exam => ({ ...e, modules: e.modules.map((m) => ({ ...m, parts: m.parts.map((p) => ({ ...p, items: vary(p.items) })) })) });

export const EXAMS_FR: Exam[] = [A1, A2, B1].map(spread);
