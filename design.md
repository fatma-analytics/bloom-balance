# Design produit — Bloom Balance

**Bloom Balance** est conçue comme une application mobile en orientation portrait, pensée pour un usage à une main, avec une esthétique **girly**, **créative**, mais suffisamment **sobre et réaliste** pour rester utile au quotidien. L’objectif produit est double : aider l’utilisatrice à se **recentrer mentalement** et à **s’organiser physiquement** dans ses routines, ses tâches, son énergie et ses micro-objectifs. L’expérience doit évoquer une sensation de douceur, de clarté et de petite victoire quotidienne, sans tomber dans une esthétique infantile ni dans un ton trop médical.

L’interface suit une logique proche des applications iOS contemporaines : hiérarchie visuelle nette, grands blocs tactiles, cartes lisibles, navigation par onglets, surfaces aérées, contrastes confortables, et micro-messages de soutien. La personnalité de marque repose sur des formulations amusantes, parfois légèrement taquines, mais toujours bienveillantes. Le produit doit donner l’impression de dire à l’utilisatrice : *tu peux reprendre le fil, sans pression, mais avec style*.

## Liste des écrans

| Écran | Rôle principal | Contenu affiché | Actions principales |
|---|---|---|---|
| Accueil | Donner une vue d’ensemble de la journée | Message d’encouragement, humeur du jour, résumé routines, tâches prioritaires, mini progrès | Cocher une action rapide, ouvrir une section, ajouter une tâche |
| Esprit | Soutenir l’organisation mentale | Sélection d’humeur, niveau d’énergie, respiration courte, note mentale, phrase drôle de soutien | Enregistrer l’humeur, écrire une note, lancer une mini pause |
| Routine | Structurer l’organisation physique et les habitudes | Routines du matin/soir, checklist corporelle, hydratation, mouvement, sommeil | Cocher une habitude, suivre une routine, visualiser le score du jour |
| Plan | Centraliser les tâches et priorités | Liste des tâches, priorité, filtres simples, état d’avancement | Ajouter, modifier, cocher, supprimer une tâche |
| Profil | Personnaliser l’expérience | Statistiques légères, ton des messages, objectif hebdomadaire, préférences visuelles | Changer l’objectif, ajuster l’ambiance, consulter les progrès |
|

## Contenu principal et logique d’interface

L’**écran d’accueil** est la pièce maîtresse. Il présente un en-tête chaleureux avec le prénom ou un salut personnalisé, suivi d’une carte de message motivant au ton drôle. Viennent ensuite trois blocs verticaux : l’état mental du jour, les priorités physiques ou routines à faire, puis la liste courte des tâches essentielles. Le but est d’éviter toute surcharge cognitive. En un seul coup d’œil, l’utilisatrice doit comprendre ce qui compte maintenant.

L’**écran Esprit** met en avant le recentrage. Il propose un sélecteur d’humeur simple, une jauge d’énergie, une zone de note libre de type *brain dump* et une action rapide de respiration ou pause. La logique de mise en page doit être rassurante : cartes arrondies, textes courts, et une sensation d’espace. Les messages d’encouragement doivent sembler humains, avec des formulations comme « on respire, diva » ou « ton cerveau fait de son mieux, aide-le un peu ».

L’**écran Routine** sert à l’ancrage physique. Il regroupe les actions concrètes qui stabilisent la journée : boire de l’eau, bouger, se préparer, ranger un mini espace, respecter un rythme de sommeil ou suivre une routine du matin. Les éléments doivent être présentés sous forme de cartes empilées ou de checklist avec grands boutons tactiles, afin de favoriser la progression rapide au pouce.

L’**écran Plan** se concentre sur l’exécution. Il affiche les tâches sous une forme claire, avec des niveaux de priorité visuels mais non anxiogènes. Le langage doit rester léger. Une tâche prioritaire peut être introduite par un libellé comme « mission du moment » au lieu d’un vocabulaire trop rigide. L’ajout d’une tâche doit être immédiat et simple, avec peu de champs.

L’**écran Profil** ne doit pas devenir un tableau de bord complexe. Il rassemble les préférences de ton, le style des encouragements, l’objectif dominant de la semaine et quelques indicateurs lisibles, par exemple le nombre de routines complétées ou de journées où l’humeur a été consignée.

## Flux utilisateurs clés

| Flux | Étapes |
|---|---|
| Démarrage quotidien | Ouvrir l’application → lire le message du jour → enregistrer l’humeur → cocher une première action simple |
| Recentrage mental | Ouvrir Esprit → choisir l’humeur → noter une pensée → lancer une mini pause respiration → revenir à l’accueil |
| Organisation physique | Ouvrir Routine → cocher hydratation, mouvement ou routine du matin → voir le progrès du jour mis à jour |
| Gestion des tâches | Ouvrir Plan → ajouter une tâche → la marquer comme prioritaire ou non → la cocher une fois terminée |
| Motivation légère | Revenir à l’accueil après une action → recevoir un message drôle et positif adapté au progrès |

## Choix de couleurs

L’identité visuelle doit évoquer une **douceur confiante**, avec une palette féminine contemporaine plutôt que stéréotypée. Les couleurs suivantes sont retenues pour donner un résultat girly, créatif et mature.

| Usage | Couleur | Hex | Intention |
|---|---|---|---|
| Couleur principale | Rose framboise doux | `#D85C9A` | Accent principal, boutons et éléments de marque |
| Couleur secondaire | Lavande claire | `#B79CFF` | Soutien visuel, badges, fonds doux |
| Fond principal | Crème rosée | `#FFF7FB` | Fond chaleureux et lumineux |
| Surface | Blanc lilas | `#FFFDFE` | Cartes et panneaux lisibles |
| Texte principal | Prune nuit | `#3C234A` | Lisibilité forte avec personnalité |
| Texte secondaire | Mauve grisé | `#7F6A86` | Informations secondaires et aides |
| Succès | Vert menthe doux | `#69C6A3` | Validation et complétion |
| Alerte | Abricot | `#F2A66A` | Rappels légers et niveaux d’attention |
| Erreur | Rose corail | `#E86A7A` | États d’erreur non agressifs |

## Direction tonale et microcopie

La voix du produit doit être chaleureuse, complice et encourageante. Elle ne doit jamais culpabiliser. Le système de messages peut mélanger motivation, humour léger et validation réaliste. Les formulations doivent ressembler à des petites relances affectueuses. Par exemple : « petit pas, grande aura », « tu n’es pas en retard, tu es en train de revenir à toi », « mission eau : ton corps réclame son budget glamour », ou encore « bravo, tu fais du ménage dans ta tête et dans ta vie, quelle polyvalence ». Le ton doit rester cohérent, même dans les confirmations d’action.

## Principes de mise en page

Chaque écran doit privilégier une structure verticale simple, avec des sections clairement séparées et des marges généreuses. Les boutons primaires doivent rester accessibles au bas de l’écran lorsque c’est pertinent, afin de favoriser l’usage à une main. Les composants doivent paraître tactiles, doux et contemporains, avec des rayons arrondis marqués, des ombres subtiles et un rythme typographique calme. L’application ne doit pas multiplier les écrans inutiles ; elle doit guider rapidement l’utilisatrice vers une action concrète, puis la récompenser avec un retour émotionnel léger mais satisfaisant.

## Portée fonctionnelle de la première version

La première version doit fournir une vraie valeur locale sur téléphone sans dépendre d’un compte ni d’un serveur. Elle doit inclure un tableau d’accueil, la saisie de l’humeur, des routines cochables, une gestion simple de tâches et une couche de messages motivants. Les données peuvent être conservées localement pour privilégier la rapidité, la simplicité et un démarrage sans friction.

## Résultat attendu

Le produit final doit ressembler à une **alliée quotidienne** qui aide à remettre de l’ordre dans l’esprit, le corps et la journée. L’application doit être jolie et expressive, mais surtout utilisable, rassurante et immédiatement compréhensible sur mobile.

