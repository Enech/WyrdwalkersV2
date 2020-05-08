<template>
  <div>
    <v-card class="pa-3 text-justify" id="app-content-custom">
      <v-card-title class="headline">Rise of the Gods - Les Règles du Jeu</v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-tabs v-model="tabs">
        <v-tab>Le Jeu</v-tab>
        <v-tab>Annexes</v-tab>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <div class="panel panel-default mt-3" id="introduction">
              <div class="panel-heading">
                <h3 class="panel-title uppercase font-weight-light title">Présentation</h3>
              </div>
              <div class="panel-body">
                <p>
                  Bonjour puissante Divinité et bienvenue sur
                  <i>Rise of the Gods</i> !
                  <br />Cette expérience sur navigateur en tour par tour est un jeu à la fois compétitif et collaboratif où vous incarnerez un des 12 panthéons du multivers Wyrdwalkers. Vous pourrez jouer avec 11 autres personnes maximum pour reconquérir le Cosmos lors des évènements mythiques de la Seconde Titanomachie. Chaque jour, vous enverrez vos instructions par l’intermédiaire d’une
                  <v-icon small>fa-receipt</v-icon>&nbsp;Fiche d’Ordre comme chaque autre joueur. Grâce à ces ordres, vous pourrez avancer vers l'objectif commun de vaincre les Titans mais aussi de vous tailler une part du gâteau plus grande que celles de vos rivaux.
                </p>
                <bloc-1>
                  <titre>Le contexte</titre>
                  <content>
                    <p>
                      Nous sommes aux alentours de -1200 av. JC. Zeus s'est levé contre son père Kronus, devenu le Titan du Contrôle et de la Civilisation. Menant les Dieux contre les Titans, le jeune dieu grec a réussi à retrouver sa fratrie et à mener une guerre acharnée pour faire reculer les ennemis de l’humanité.
                      <br />Alors que Zeus a enfermé Kronus au Tartare au terme d'une bataille ayant secoué les fondations du Cosmos et que la guerre touche à sa fin, il est temps de vaincre les dernières places fortes titaniques et de préparer le nouvel univers qui émergera. Dans cette guerre, vous incarnez le leader d'un Panthéon de Dieux et votre objectif est de lui assurer une place primordiale dans le nouvel Ordre Cosmique émergent.
                    </p>
                  </content>
                </bloc-1>
                <bloc-1>
                  <titre>But du jeu</titre>
                  <content>
                    <p>
                      Le but du jeu est d’obtenir un maximum de
                      <v-icon small>fa-trophy</v-icon>&nbsp;Points de Victoire en 7 tours de jeu. Ces points sont obtenus en conquérant des
                      <v-icon small>mdi-layers-triple</v-icon>&nbsp;Plans Cosmiques occupés par les Titans. Pour conquérir ces plans occupés, vous devrez dépenser vos ressources intelligemment à travers des ordres compilés dans une
                      <v-icon small>fa-receipt</v-icon>&nbsp;Fiche d’Ordre quotidienne. Il faudra surtout vous concerter avec les autres joueurs pour que vos rares ressources soient dépensées judicieusement !
                    </p>
                    <span>
                      Il existe deux types de victoires différentes dans
                      <i>Rise of the Gods</i> :
                    </span>
                    <ul>
                      <li>
                        La victoire globale : à la fin du tour 7, les Dieux doivent posséder un nombre de
                        <v-icon small>mdi-layers-triple</v-icon>&nbsp;Plans Cosmiques dépendant du nombre de joueurs. Vous trouverez le détail en Annexes.
                      </li>
                      <li>
                        La victoire individuelle : que les Dieux remportent ou non la guerre de conquête contre les Titans, les Panthéons ont besoin de s'unir derrière un leader pour reconstruire le Cosmos. Vous devenez ce leader si à la fin du tour 7 vous êtes le joueur ayant accumulé le plus de
                        <v-icon small>fa-trophy</v-icon>&nbsp;Points de Victoire
                      </li>
                    </ul>
                    <p></p>
                  </content>
                </bloc-1>
                <bloc-1>
                  <titre>Les types de parties</titre>
                  <content>
                    <p>
                      <i>Rise of the Gods</i> peut se jouer suivant deux modes différents. Les règles et le gameplay restent identiques, seule la vitesse de jeu change.
                      <br />(
                      <b>Attention, une partie ne peut pas changer de mode de jeu une fois lancée !</b>)
                    </p>
                    <ul class="fa-ul">
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-check</v-icon>&nbsp;
                          <strong>
                            Le mode
                            <b>plateau</b>
                          </strong>
                        </div>
                        <p>Les fins de tours sont déclenchées manuellement et le résultat est donné immédiatement. C'est le mode de jeu idéal si vous voulez faire une partie rapide entre amis à la manière d'un jeu de société. (Temps de jeu estimé indicatif à 4 joueurs : ~1h30).</p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-check</v-icon>&nbsp;
                          <strong>
                            Le mode
                            <b>chronomètre</b>
                          </strong>
                        </div>
                        <p>Les fins de tours sont déclenchées automatiquement tous les jours entre 22h et 23h UTC (temps universel) et le résultat du tour est donné juste après. C'est le mode de jeu idéal si vous préférez passer quelques minutes par jour sur le jeu puis repartir vers d'autres horizons. Chaque joueur a donc 24h pour envoyer ses ordres du tour. Temps de jeu : 7 jours.</p>
                      </li>
                    </ul>
                  </content>
                </bloc-1>
                <bloc-1>
                  <titre>Démarrage d'une partie</titre>
                  <content>
                    <ul class="fa-ul">
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-circle</v-icon>&nbsp;
                          <strong>Créer votre partie</strong>
                        </div>
                        <p>Depuis la liste des parties, vous pouvez créer votre partie personnalisée. Donnez-lui un nom (ou prenez-en un généré aléatoirement) et choisissez un mode de jeu.</p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-circle</v-icon>&nbsp;
                          <strong>Choisissez vos Panthéons</strong>
                        </div>
                        <p>
                          Une fois sur l'interface de votre partie, cliquez sur le symbole&nbsp;
                          <v-icon>fa-dungeon</v-icon>&nbsp;pour vous inscrire dans la partie en choisissant le Panthéon que vous désirez incarner. Tous les joueurs désirant participer à la partie doivent choisir un Panthéon avant de la lancer.
                          <br />
                          <b>Il est impossible de rejoindre une partie en cours une fois lancée.</b>
                          <br />
                          <b>Le Panthéon que vous choisirez n'a pas d'influence sur la partie.</b>
                        </p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-circle</v-icon>&nbsp;
                          <strong>Lancez la partie</strong>
                        </div>
                        <p>
                          Une fois tous les joueurs présents, cliquez sur le symbole&nbsp;
                          <v-icon>play_arrow</v-icon>&nbsp;pour lancer la partie.
                        </p>
                      </li>
                    </ul>
                  </content>
                </bloc-1>
                <bloc-1>
                  <titre>Déroulement d'un tour de jeu</titre>
                  <content>
                    <ul class="fa-ul">
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-circle</v-icon>&nbsp;
                          <strong>Remplissage et envoi des ordres</strong>
                        </div>
                        <p>
                          Pour chaque ressource est disponible une liste d'ordres parmi laquelle il vous faut en choisir un au maximum à chaque tour.
                          <u>Cliquez sur le bouton "Valider"</u> de chaque ordre que vous choisirez pour chaque ressource. Lorsqu'une ressource possède déjà un ordre validé, son icône devient verte sur la
                          <v-icon small>fa-receipt</v-icon>&nbsp;Fiche d'Ordre. Une fois cela fait, envoyez votre fiche en appuyant sur le bouton "Envoyer ma Fiche d'Ordre".
                          <b>L'envoi de votre fiche est définitif, pensez bien à vérifier que vos ordres passés sont bien validés avant d'envoyer votre fiche.</b>
                        </p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-circle</v-icon>&nbsp;
                          <strong>Déclenchez/Attendez la fin du tour</strong>
                        </div>Suivant votre mode de jeu, attendez la fin du tour programmée ou bien déclenchez-la en cliquant sur le bouton
                        <v-icon>alarm_on</v-icon>.
                        <br />Les ordres envoyés sont appliqués de la manière suivante : (voir Annexes pour la résolution détaillée)
                        <ul>
                          <li>Application Mains du Destin (voir plus bas)</li>
                          <li>Traitement des ordres sans rapport avec la conquête</li>
                          <li>Résolution des conquêtes</li>
                          <li>Résolution des paris effectués sur les attaques.</li>
                          <li>
                            Augmentation des forces titaniques sur les
                            <v-icon small>mdi-layers-triple</v-icon>&nbsp;Plans Cosmiques encore aux mains des Titans après résolution des conquêtes.
                          </li>
                          <li>Les ressources de tous les joueurs sont augmentées du revenu de base indiqué dans les Annexes.</li>
                          <li>Si dernier tour : Vérification des conditions de victoire globale.</li>
                        </ul>
                        <p></p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-circle</v-icon>&nbsp;
                          <strong>Conséquence du Destin</strong>
                        </div>
                        <p>
                          Une fois le tour traité, une fenêtre s'affiche pour vous montrer les informations pertinentes du tour qui vient de s'écouler : les attaques qui ont été lancées, les bonus dont vous jouissez pour le tour qui vient, les ressources que vous avez gagnées et/ou perdues et...une Conséquence du Destin. Automatiquement après chaque tour, une Conséquence du Destin vous sera assignée aléatoirement parmi les 8 possibles. Quatre d'entre elles sont neutres et les quatre autres vous seront plus ou moins détrimentaires en fonction du nombre de
                          <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin que vous aurez accumulés à la fin du tour.
                          <br />Le détail des Conséquences du Destin possibles se trouve en Annexes.
                        </p>
                      </li>
                    </ul>
                  </content>
                </bloc-1>
              </div>
            </div>
            <div class="panel panel-default" id="introduction">
              <div class="panel-heading">
                <h3 class="panel-title uppercase font-weight-light title">Caractéristiques du jeu</h3>
              </div>
              <div class="panel-body">
                <bloc-1>
                  <titre>Terminologie</titre>
                  <content>
                    <p>
                      Dans <i>Rise of the Gods</i> certains termes sont directement empruntés à l'univers rôlistes. En particulier, vous verrez beaucoup de "1D6", "2D3" etc. Si vous êtes déjà familiers avec ces termes, vous pouvez passer ce paragraphe. Sinon, voici quelques explications.<br>
                      <br>
                      De manière très simple un D6 représente un dé à 6 faces. Les résultats de 1D6 représentent donc un lancer d'un dé à 6 faces et peuvent donc varier aléatoirement entre 1 et 6. De même, 2D6 représente un lancer de deux dés à 6 faces et les résultats varient aléatoirement entre 2 et 12.<br>
                      En suivant ce même principe, 1D3 donne des résultats entre 1 et 3, 1D4 donne des résultats entre 1 et 4 et 1D10 donne des résultats entre 1 et 10.
                    </p>
                  </content>
                </bloc-1>
                <bloc-1>
                  <titre>Les Ressources</titre>
                  <content>
                    <p>
                      Dans
                      <i>Rise of the Gods</i> il vous faudra gérer stratégiquement 6 ressources différentes, chacune amenant différents avantages dont il vous faudra tirer parti suivant les situations :
                    </p>
                    <ul class="fa-ul">
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-gem</v-icon>&nbsp;
                          <strong>L'Orichalque</strong>
                        </div>
                        <p>La monnaie des Dieux et donc le nerf de la guerre. Cette ressource est polyvalente et permet de s'adapter rapidement à toutes les situations.</p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-fist-raised</v-icon>&nbsp;
                          <strong>L'Armée</strong>
                        </div>
                        <p>
                          Vos troupes sur le champ de bataille et donc la source de toutes vos attaques. C'est principalement grâce à cette ressource que vous pourrez remporter les
                          <v-icon small>fa-trophy</v-icon>&nbsp;Points de Victoire nécessaires pour remporter la partie.
                        </p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-jedi</v-icon>&nbsp;
                          <strong>L'Héroïsme</strong>
                        </div>
                        <p>Cette ressource vous donne l'opportunité de retourner les situations, de changer de stratégie en cours de route et de faire face à l'inattendu.</p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-eye</v-icon>&nbsp;
                          <strong>Les Prophètes</strong>
                        </div>
                        <p>La ressource qui vous permet d'observer les coulisses de la guerre en déchiffrant les aléas du futur, en espionnant vos alliés ou en vous permettant de vous informer sur la situation des Titans.</p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-user-friends</v-icon>&nbsp;
                          <strong>La Population</strong>
                        </div>
                        <p>Ce sont les humains de tous bords et les créatures magiques sous l'influence de votre Panthéon. Cette ressource est comme un matériau brut qui vous permettra de stabiliser votre puissance.</p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-spider</v-icon>&nbsp;
                          <strong>Les Liens du Destin</strong>
                        </div>
                        <p>La mesure de votre implication dans le Cosmos. A mesure que vous créez votre Légende vous perturbez les plans du Destin et celui-ci n'aime pas ça. Contrairement aux autres ressources, il est conseillé de ne pas faire grimper celle-ci trop haut, ou bien les Conséquences du Destin que vous subissez chaque tour risquent bien de vous mettre hors jeu avec le passage inopiné d'un dragon volant votre argent et tuant votre population...</p>
                      </li>
                    </ul>
                  </content>
                </bloc-1>
                <bloc-1>
                  <titre>
                    Les
                    <v-icon small>mdi-layers-triple</v-icon>&nbsp;Plans Cosmiques
                  </titre>
                  <content>
                    Chaque partie comporte 10
                    <v-icon small>mdi-layers-triple</v-icon>&nbsp;Plans Cosmiques. Au lancement, chacun d'entre eux est aux mains des Titans. L'objectif des joueurs est d'en contrôler, si ce n'est le maximum, les plus stratégiques suivant la situation de la partie. Chaque Plan possède un nombre de forces titaniques que les dieux - donc vous, les joueurs - devront surpasser pour parvenir à le conquérir. Au départ, chaque Plan commence avec
                    <b>1D3 + 2</b> forces titaniques. Puis ces forces augmentent au fur et à mesure des tours et des conquêtes effectuées par les joueurs, jusqu'à ce que le Plan soit conquis.
                    <ul>
                      <li>
                        <b>Un Plan conquis, sauf évènement précisant le contraire, ne peut pas revenir aux mains des Titans et ne peut pas changer de propriétaire de manière générale.</b>
                      </li>
                      <li>
                        <b>De manière générale, les forces titaniques présentes sur les Plans contrôlés par les Titans ne sont pas visibles pour les Dieux. Seuls les ordres appropriés peuvent vous accorder l'accès à cette information pour un tour.</b>
                      </li>
                      <li>
                        <b>Chaque Plan est associé à une ressource. Le détails se trouve en Annexes.</b>
                      </li>
                    </ul>
                    <p></p>
                  </content>
                </bloc-1>
                <bloc-1>
                  <titre>Les Ordres</titre>
                  <content>
                    <p>
                      Chaque ressource dispose d'une liste d'ordre qui lui sont spécifiques. A chaque tour, un joueur peut choisir au maximum un ordre pour chaque ressource. Il existe aussi un ordre supplémentaire, associé à aucune ressource : la
                      <v-icon small>fa-bolt</v-icon>&nbsp;Main du Destin.
                      <br />
                      <br />Par exemple, la ressource
                      <v-icon small>fa-gem</v-icon>&nbsp;Orichalque est associée à 4 ordres différents : Prospérité, Opulence, Investissement et Anticipation. A chaque tour, vous pouvez en choisir au plus un d'entre eux à envoyer dans votre
                      <v-icon small>fa-receipt</v-icon>&nbsp;Fiche d'Ordre (du moment que vous possédez suffisamment de ressources). Il en va de même pour toutes les autres ressources.
                      <br />
                      <br />Pour envoyer une
                      <v-icon small>fa-receipt</v-icon>&nbsp;Fiche d'Ordre, il vous faut valider au minimum un seul ordre pour toute votre fiche. Si vous n'envoyez pas de
                      <v-icon small>fa-receipt</v-icon>&nbsp;Fiche d'Ordre pour le tour en cours, aucune action ne sera effectuée en votre nom et vous aurez passé votre tour (vos revenus vous seront tout de même attribués).
                    </p>
                  </content>
                </bloc-1>
              </div>
            </div>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col cols="12" md="6">
                <v-card class="pa-3" outlined>
                  <v-card-title>Panthéons disponibles</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Nom</th>
                            <th class="text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Aesir</td>
                            <td>Les dieux vikings. Déterminés, combatifs, courageux mais impulsifs et maudits par le Destin</td>
                          </tr>
                          <tr>
                            <td>Amatsukami</td>
                            <td>Les dieux japonais. Unis, fiers de leurs traditions et portés sur la diplomatie pour atteindre leurs objectifs</td>
                          </tr>
                          <tr>
                            <td>Ayllus</td>
                            <td>Les dieux incas. Sages et bienveillants mais encore très jeunes</td>
                          </tr>
                          <tr>
                            <td>Bureaucratie Céleste</td>
                            <td>Les dieux chinois. Organisés, efficaces et sans merci à la fois contre les Titans ou le Destin</td>
                          </tr>
                          <tr>
                            <td>Deva</td>
                            <td>Les dieux hindous. Anciens, sages et immensément puissants mais peu habitués à s'occuper des affaires du Monde</td>
                          </tr>
                          <tr>
                            <td>K'Asunel</td>
                            <td>Les dieux mayas. Profondément anti-Titans, à la limite du fanatisme</td>
                          </tr>
                          <tr>
                            <td>Neter</td>
                            <td>Les dieux égyptiens. Puissants, organisés et portés sur les arcanes mais un brin mystérieux et rigides</td>
                          </tr>
                          <tr>
                            <td>Nga Tama a Rangi</td>
                            <td>Les dieux maoris. Sages et forts à la fois, mais avec une tendance à rester reclus</td>
                          </tr>
                          <tr>
                            <td>Orisha</td>
                            <td>Les dieux africains. Guerriers avides de combats, axés sur l'expansion et peu portés sur la diplomatie</td>
                          </tr>
                          <tr>
                            <td>Teotl</td>
                            <td>Les dieux aztèques. Combattants violents et conquérants, adeptes de la magie du sang</td>
                          </tr>
                          <tr>
                            <td>Theoi</td>
                            <td>Les dieux grecs. Puissants, polyvalents et menés par Zeus en personne</td>
                          </tr>
                          <tr>
                            <td>Tuatha Dé Danann</td>
                            <td>Les dieux celtes. Fiers, combatifs et proches de la nature</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-3" outlined>
                  <v-card-title>Conséquences du Destin</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Nom</th>
                            <th class="text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Soleil Bienveillant</td>
                            <td>Hélios vous garde et vous protège du Destin pour l'instant</td>
                          </tr>
                          <tr>
                            <td>Lune Souriante</td>
                            <td>Séléné vous garde et vous protège du Destin pour l'instant</td>
                          </tr>
                          <tr>
                            <td>Légende Eternelle</td>
                            <td>Vous perdez un Lien du Destin, votre Légende n'est pas encore écrite</td>
                          </tr>
                          <tr>
                            <td>Fête Divine</td>
                            <td>Une petite musique semble guider votre histoire, vous protégeant temporairement du Destin</td>
                          </tr>
                          <tr>
                            <td>Prophétie Terrible</td>
                            <td>Vous perdez X d'Héroïsme et X de Prophètes, où X est votre nombre de Liens du Destin</td>
                          </tr>
                          <tr>
                            <td>Migration de réfugiés</td>
                            <td>X de votre Population sont transférés au(x) joueur(s) avec le moins de Points de Victoire</td>
                          </tr>
                          <tr>
                            <td>Survol d'un Dragon</td>
                            <td>Vous perdez X d'Orichalque et X de Population, où X est votre nombre de Liens du Destin</td>
                          </tr>
                          <tr>
                            <td>Perturbation de la Légende</td>
                            <td>Tous les joueurs gagnent mystérieusement 1 Lien du Destin par votre faute. A vous de leur avouer...ou pas !</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="5">
                <v-card class="pa-3" outlined>
                  <v-card-title>Traitement d'un tour de jeu</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <ul>
                      <li>Application Mains du Destin</li>
                      <li>
                        Détermination des forces de conquêtes envoyées sur les
                        <v-icon small>mdi-layers-triple</v-icon>&nbsp;Plans Cosmiques aux mains des Titans (attaques + infiltrations).
                      </li>
                      <li>Traitement des ordres sans rapport avec la conquête.</li>
                      <li>
                        Résolution des conquêtes :
                        <ul>
                          <li>
                            Sur chaque Plan, si les forces divines sont
                            <u>strictement</u> supérieures aux forces titaniques présentes, le Plan est conquis.
                          </li>
                          <li>
                            Attribution des
                            <v-icon small>fa-trophy</v-icon>&nbsp;Points de Victoire en fonction du classement des forces armées envoyées (infiltration comprise).
                          </li>
                          <li>Transfert de la propriété du Plan au joueur y ayant envoyé le plus de forces armées.</li>
                        </ul>
                      </li>
                      <li>Résolution des paris effectués sur les attaques.</li>
                      <li>
                        Augmentation des forces titaniques sur les
                        <v-icon small>mdi-layers-triple</v-icon>&nbsp;Plans Cosmiques encore aux mains des Titans après résolution des conquêtes. Si au moins une conquête a été victorieuse, les forces titaniques sont augmentées du nombre de joueurs divisé par deux (arrondi à l'inférieur) + le nombre de Plans pris par les dieux ce tour-ci. Si aucune prise n'a eu lieu, les forces titaniques restent inchangées.
                      </li>
                      <li>Les ressources de tous les joueurs sont augmentées du revenu de base indiqué dans les Annexes</li>
                      <li>Si dernier tour : vérification des conditions de victoire globale.</li>
                    </ul>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="2">
                <v-card class="pa-3" outlined>
                  <v-card-title>Victoire Globale</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Joueurs</th>
                            <th class="text-left">
                              <v-icon small>mdi-layers-triple</v-icon>&nbsp;Plans à contrôler
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>3</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>4</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>5</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>6</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>7</td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>8</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>8</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>8</td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td>9</td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>9</td>
                          </tr>
                          <tr>
                            <td>11</td>
                            <td>10</td>
                          </tr>
                          <tr>
                            <td>12</td>
                            <td>10</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="2">
                <v-card class="pa-3" outlined>
                  <v-card-title>Revenus de base</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Ressources</th>
                            <th class="text-left">Revenu/Tour</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <v-icon small>fa-gem</v-icon>&nbsp;Orichalque
                            </td>
                            <td>+2</td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon small>fa-fist-raised</v-icon>&nbsp;Armée
                            </td>
                            <td>+0</td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon small>fa-jedi</v-icon>&nbsp;Héroïsme
                            </td>
                            <td>+1</td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                            </td>
                            <td>+2</td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon small>fa-user-friends</v-icon>&nbsp;Population
                            </td>
                            <td>+2</td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin
                            </td>
                            <td>+0</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-3" outlined>
                  <v-card-title>Plans / Ressources</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Plan</th>
                            <th class="text-left">Ressource</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Le Monde</td>
                            <td>
                              <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin (diminution)
                            </td>
                          </tr>
                          <tr>
                            <td>Fairie</td>
                            <td>
                              <v-icon small>fa-gem</v-icon>&nbsp;Orichalque
                            </td>
                          </tr>
                          <tr>
                            <td>Shambhala</td>
                            <td>
                              <v-icon small>fa-gem</v-icon>&nbsp;Orichalque
                            </td>
                          </tr>
                          <tr>
                            <td>Aunu</td>
                            <td>
                              <v-icon small>fa-fist-raised</v-icon>&nbsp;Armée
                            </td>
                          </tr>
                          <tr>
                            <td>Aether</td>
                            <td>
                              <v-icon small>fa-fist-raised</v-icon>&nbsp;Armée
                            </td>
                          </tr>
                          <tr>
                            <td>Mont Olympe</td>
                            <td>
                              <v-icon small>fa-jedi</v-icon>&nbsp;Héroïsme
                            </td>
                          </tr>
                          <tr>
                            <td>Kosmos</td>
                            <td>
                              <v-icon small>fa-jedi</v-icon>&nbsp;Héroïsme
                            </td>
                          </tr>
                          <tr>
                            <td>Devaloka</td>
                            <td>
                              <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                            </td>
                          </tr>
                          <tr>
                            <td>Nyx</td>
                            <td>
                              <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                            </td>
                          </tr>
                          <tr>
                            <td>Sheol</td>
                            <td>
                              <v-icon small>fa-eye</v-icon>&nbsp;Population
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card class="pa-3" outlined>
                  <v-card-title>Les Ordres</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <bloc-1>
                      <titre>
                        <v-icon small>fa-gem</v-icon>&nbsp;Les ordres d'Orichalque
                      </titre>
                      <content>
                        <bloc-3>
                          <titre>Prospérité</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 2
                                <v-icon small>fa-gem</v-icon>&nbsp;Orichalque
                              </li>
                              <li>
                                Gains : 1
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophète et 1
                                <v-icon small>fa-user-friends</v-icon>&nbsp;Population
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Opulence</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 4
                                <v-icon small>fa-gem</v-icon>&nbsp;Orichalque
                              </li>
                              <li>
                                Gains : 3
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophètes et 3
                                <v-icon small>fa-user-friends</v-icon>&nbsp;Populations
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Investissement</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 2
                                <v-icon small>fa-gem</v-icon>&nbsp;Orichalque
                              </li>
                              <li>
                                Gains : 3
                                <v-icon small>fa-gem</v-icon>&nbsp;Orichalque + le nombre de
                                <v-icon small>mdi-layers-triple</v-icon>&nbsp;Plans Cosmiques que vous contrôlez ce tour-ci.
                              </li>
                            </ul>
                            <i>
                              <u>Exemple:</u> Si vous contrôlez 2 Plans ce tour-ci, en dépensant 2 Orichalque vous obtiendrez 5 Orichalque le tour prochain.
                            </i>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Anticipation</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : X
                                <v-icon small>fa-gem</v-icon>&nbsp;Orichalque
                              </li>
                              <li>
                                Gains : X/2
                                <v-icon small>fa-trophy</v-icon>&nbsp;Points de Victoire (si le pari est réussi)
                                <br />
                                <u>
                                  <b>OU</b>
                                </u> X
                                <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin (si le pari échoue)
                              </li>
                            </ul>
                            <i>
                              <u>Exemple :</u> Déclencher l'ordre "Anticipation" avec 7 d'Orichalque en misant sur la victoire de l'attaque sur le Plan Mont Olympe vous coûtera 7 d'Orichalque et vous rapportera 4 Points de Victoire si l'attaque sur le Mont Olympe a réussi, ou bien vous fera gagner 7 Liens du Destin si l'attaque sur le Mont Olympe a échoué.
                            </i>
                            <p></p>
                          </content>
                        </bloc-3>
                      </content>
                    </bloc-1>
                    <v-divider class="mb-3"></v-divider>
                    <bloc-1>
                      <titre>
                        <v-icon small>fa-fist-raised</v-icon>&nbsp;Les ordres d'Armée
                      </titre>
                      <content>
                        <bloc-3>
                          <titre>Attaquer</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : X
                                <v-icon small>fa-fist-raised</v-icon>&nbsp;Armées pour attaquer un plan contrôlé par les Titans
                              </li>
                              <li>
                                Gains : (si réussite de l'attaque)
                                <ul>
                                  <li>
                                    5
                                    <v-icon small>fa-trophy</v-icon>&nbsp;Points de Victoire et 2
                                    <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin si vous avez attaqué avec le plus de forces
                                  </li>
                                  <li>
                                    3
                                    <v-icon small>fa-trophy</v-icon>&nbsp;Points de Victoire si vous êtes en deuxième position
                                  </li>
                                  <li>
                                    2
                                    <v-icon small>fa-trophy</v-icon>&nbsp;Points de Victoire si vous êtes en troisième position
                                  </li>
                                </ul>
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Stabiliser</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 4
                                <v-icon small>fa-fist-raised</v-icon>&nbsp;Armées
                              </li>
                              <li>
                                Gains : Vous perdez 2
                                <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                      </content>
                    </bloc-1>
                    <v-divider class="mb-3"></v-divider>
                    <bloc-1>
                      <titre>
                        <v-icon small>fa-jedi</v-icon>&nbsp;Les ordres d'Héroïsme
                      </titre>
                      <content>
                        <bloc-3>
                          <titre>Engendrer un Godborn</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 2
                                <v-icon small>fa-jedi</v-icon>&nbsp;Héroïsme
                              </li>
                              <li>
                                Gains : 2
                                <v-icon small>fa-fist-raised</v-icon>&nbsp;Armées
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Exploration Risquée</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 3
                                <v-icon small>fa-jedi</v-icon>&nbsp;Héroïsme
                              </li>
                              <li>Gains : Au tour suivant, vous pourrez voir les forces titaniques sur les Plans contrôlés par les Titans.</li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Equipée Héroïque</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 3
                                <v-icon small>fa-jedi</v-icon>&nbsp;Héroïsme
                              </li>
                              <li>
                                Gains : 2D3
                                <v-icon small>fa-jedi</v-icon>&nbsp;Héroïsme
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Apothéose</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 6
                                <v-icon small>fa-jedi</v-icon>&nbsp;Héroïsme
                              </li>
                              <li>
                                Gains : 1D4
                                <v-icon small>fa-trophy</v-icon>&nbsp;Points de Victoire
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                      </content>
                    </bloc-1>
                    <v-divider class="mb-3"></v-divider>
                    <bloc-1>
                      <titre>
                        <v-icon small>fa-eye</v-icon>&nbsp;Les ordres de Prophètes
                      </titre>
                      <content>
                        <bloc-3>
                          <titre>Espionnage magique</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 2
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                              </li>
                              <li>
                                Gains : Au tour suivant, vous pourrez consulter les
                                <v-icon small>fa-receipt</v-icon>&nbsp;Fiches d'Ordre envoyées ce tour-ci de deux joueurs que vous aurez sélectionné.
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Infiltration</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 4
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                              </li>
                              <li>
                                Gains : Tous les plans attaqués à la fin de ce tour voient leurs armées divines augmentées de 1 en votre nom. Ceci ne consomme pas de ressource
                                <v-icon small>fa-fist-raised</v-icon>&nbsp; Armée. Si aucune attaque n'est déclenchée ce tour-ci, votre dépense sera remboursée.
                              </li>
                            </ul>
                            <i>
                              <u>Exemple :</u> Si durant le tour, le Mont Olympe, Nyx et Le Monde sont attaqués, déclencher l'ordre "Infiltration" vous coûtera 4 de Prophètes. Lors de la résolution des conquêtes sur ces Plans, votre présence militaire sera augmentée de 1 sur tous les Plans attaqués sans que vous ayez dépensé d'Armée.
                            </i>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Prophétie</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 3
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                              </li>
                              <li>Gains : Au prochain tour, vous serez en mesure de voir les forces titaniques présentes sur les Plans contrôlés par les Titans.</li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Oracles Prosélytes</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 2
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                              </li>
                              <li>
                                Gains : 2
                                <v-icon small>fa-gem</v-icon>&nbsp;Orichalque
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Augures</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 1
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophète
                              </li>
                              <li>
                                Gains : 1D3 - 1
                                <v-icon small>fa-fist-raised</v-icon>&nbsp;Armées
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Vision du Futur</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 1
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophète
                              </li>
                              <li>
                                Gains : Une chance sur deux de gagner ou de perdre 1
                                <v-icon small>fa-spider</v-icon>&nbsp;Lien du Destin
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Répartition de Légende</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 4
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                              </li>
                              <li>
                                Gains : Vous gagnez 2
                                <v-icon small>fa-user-friends</v-icon>&nbsp;Population et vous perdez 1
                                <v-icon small>fa-spider</v-icon>&nbsp;Lien du Destin.
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                      </content>
                    </bloc-1>
                    <v-divider class="mb-3"></v-divider>
                    <bloc-1>
                      <titre>
                        <v-icon small>fa-user-friends</v-icon>&nbsp;Les ordres de Population
                      </titre>
                      <content>
                        <bloc-3>
                          <titre>Habiter un Plan</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : X
                                <v-icon small>fa-user-friends</v-icon>&nbsp;Populations
                              </li>
                              <li>
                                Gains :
                                <ul>
                                  <li>Le contrôleur du Plan ciblé gagne X/2 de la ressource associée au Plan</li>
                                  <li>Vous gagnez X de cette même ressource</li>
                                </ul>
                                <i>
                                  <u>Exemple :</u> Déclencher l'ordre "Habiter un Plan" avec 5 de Population en ciblant le Plan Fairie vous coûtera 5 de Population et vous rapportera 5 d'Orichalque. Le contrôleur du Plan recevra 3 d'Orichalque. Si vous êtes le contrôleur du Plan ciblé, vous gagnez donc 8 d'Orichalque.
                                </i>
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Campagne de recrutement</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 2
                                <v-icon small>fa-user-friends</v-icon>&nbsp;Populations
                              </li>
                              <li>
                                Gains : 1
                                <v-icon small>fa-fist-raised</v-icon>&nbsp;Armée + le nombre de Plans que vous contrôlez ce tour-ci.
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Informateurs</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 2
                                <v-icon small>fa-user-friends</v-icon>&nbsp;Populations
                              </li>
                              <li>
                                Gains : 1D4
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Civilisation</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : 4
                                <v-icon small>fa-user-friends</v-icon>&nbsp;Populations
                              </li>
                              <li>
                                Gains : 1D3
                                <v-icon small>fa-user-friends</v-icon>&nbsp;Populations, 1D3
                                <v-icon small>fa-gem</v-icon>&nbsp;Orichalque et 3
                                <v-icon small>fa-fist-raised</v-icon>&nbsp;Armées
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                      </content>
                    </bloc-1>
                    <v-divider class="mb-3"></v-divider>
                    <bloc-1>
                      <titre>
                        <v-icon small>fa-spider</v-icon>&nbsp;Les ordres de Liens du Destin
                      </titre>
                      <content>
                        <bloc-3>
                          <titre>Célébration au sein du Panthéon</titre>
                          <content>
                            <ul>
                              <li>Coût : Aucun</li>
                              <li>
                                Gains : Vos
                                <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin évoluent de 1D6 - 1D10
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Destinée Epique</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : Vous gagnez 1
                                <v-icon small>fa-spider</v-icon>&nbsp;Lien du Destin
                              </li>
                              <li>
                                Gains : 2
                                <v-icon small>fa-jedi</v-icon>&nbsp;Héroïsme
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Ragots Mythiques</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : Vous gagnez 1
                                <v-icon small>fa-spider</v-icon>&nbsp;Lien du Destin
                              </li>
                              <li>
                                Gains : 1D3
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Alea Jacta Est</titre>
                          <content>
                            <ul>
                              <li>
                                Coût : Vous gagnez 4
                                <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin
                              </li>
                              <li>Gains : 2D3 de chaque autre ressource (Orichalque, Armée, Héroïsme, Prophètes et Population)</li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                      </content>
                    </bloc-1>
                    <v-divider class="mb-3"></v-divider>
                    <bloc-1>
                      <titre>
                        <v-icon small>fa-bolt</v-icon>&nbsp;La Main du Destin
                      </titre>
                      <content>
                        <ul>
                          <li>
                            Choisir 3
                            <v-icon small>mdi-layers-triple</v-icon>&nbsp;Plans Cosmiques où diminuer les forces titaniques de 1 Armée
                          </li>
                          <li>
                            Choisir un
                            <v-icon small>mdi-layers-triple</v-icon>&nbsp;Plan Cosmique où augmenter les forces titaniques de 3 Armées
                          </li>
                        </ul>
                        <i>
                          <u>Exemple:</u> A la fin de votre tour, vous pouvez décider de diminuer de 1 les forces titaniques sur les Plans de Fairie, du Mont Olympe et du Monde...tout en augmentant de 3 les forces titaniques présentes sur Aunu.
                          <b>Cet ordre n'est applicable que sur des Plans contrôlés par les Titans.</b>
                        </i>
                      </content>
                    </bloc-1>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import store from "../../store";

export default Vue.extend({
  name: "RulesVF",
  computed: {
    carouselHeight: function() {
      return this.$vuetify.breakpoint.xs ? "413px" : "650px";
    }
  },
  data: () => ({
    tabs: 0
  })
});
</script>