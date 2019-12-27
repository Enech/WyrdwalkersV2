<template>
  <div class="pa-3">
    <v-card class="pa-3 text-justify">
      <v-card-title class="headline">Guide de jeu</v-card-title>
      <v-divider class="mb-3"></v-divider>
      <div class="panel panel-default" id="introduction">
        <div class="panel-heading">
          <h3 class="panel-title uppercase font-weight-light title">Introduction</h3>
        </div>
        <div class="panel-body">
          <p>Bienvenue dans ce codex de Wyrdwalkers, un univers de jeu de rôle axé sur les mythes et les légendes. Ici, les dieux mythologiques de par le globe existent bel et bien et tentent d’influencer le monde grâce à vous, leurs enfants.</p>
          <bloc-1>
            <titre>Pourquoi jouer à Wyrdwalkers ?</titre>
            <content>
              <p>
                L’univers de Wyrdwalkers s’adresse à tous ceux que la mythologie intéresse de près ou de loin, petits et grands. Si incarner des demi-dieux et vous aventurer dans les plaines elfiques d’Alfheim ou dans la mystérieuse Mer de Jade à la recherche des sages
                dragons voir plus simplement lutter contre un cartel de nécromanciens à Mexico, alors ce jeu est fait pour vous.
                <br />Dans Wyrdwalkers vous aurez l’occasion de revisiter des mythes fondateurs mais aussi de créer les vôtres à votre guise. Et comme tout mythe, celui que vous vivrez vous permettra d’explorer des thèmes
                et de répondre à des questions posées par l’humanité depuis l’aube de la civilisation, le tout en explosant des perruques si le coeur vous en dit. Tel est parfois le chemin pour devenir une légende...
              </p>
            </content>
          </bloc-1>
          <v-divider class="mb-3"></v-divider>
          <bloc-1>
            <titre>Le contenu de ce guide</titre>
            <content>
              <p>Ce guide est divisé en trois sections principales permettant chacune d’aborder le jeu et ses mécanismes :</p>
              <ul class="fa-ul">
                <li>
                  <div class="list-title">
                    <v-icon small left>fa-check</v-icon>&nbsp;
                    <strong>La présentation des règles</strong>
                  </div>
                  <p>Là vous y trouverez tous éléments vous permettant de jouer dans l’univers de Wyrdwalkers. Des exemples récurrents sont utilisés et cette section s’adresse aussi bien aux vétérans du jeu de rôle qu’aux jeunes recrues.</p>
                </li>
                <li>
                  <div class="list-title">
                    <v-icon small left>fa-check</v-icon>&nbsp;
                    <strong>La création de personnage</strong>
                  </div>
                  <p>Vous y trouverez toutes les règles liées à la création et l’évolution des personnages. De la dépense des points d’expérience aux attributions de pouvoirs, tout y est.</p>
                </li>
                <li>
                  <div class="list-title">
                    <v-icon small left>fa-check</v-icon>&nbsp;
                    <strong>L'Atelier du MJ</strong>
                  </div>
                  <p>
                    Cette section est dédiée aux Maitres du Jeu désirant faire jouer un scénario simple ou complexe dans l’univers Wyrdwalkers. De nombreux conseils sont dispensés concernant la préparation, la mise en place et la gestion des éléments du codex au sein du
                    lore de l’univers.
                  </p>
                </li>
              </ul>
            </content>
          </bloc-1>
          <bloc-1>
            <titre>En savoir plus</titre>
            <content>
              <p>
                La présentation de l’univers dans ce guide vise à rester la plus succincte possible. Si des interrogations vous viennent lors de votre lecture, n’hésitez pas à visiter les liens vers le wiki disséminés un peu partout, celui-ci contient toutes les informations
                de l’univers dont vous aurez besoin. Ou alors, si vous avez peur de vous y perdre un mini-glossaire est présent en bas de la page.
              </p>
            </content>
          </bloc-1>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title uppercase font-weight-light title">Les règles du jeu</h3>
        </div>
        <div class="panel-body">
          <bloc-1>
            <titre>Un système différent</titre>
            <content>
              <p>
                Cela peut sembler étrange de commencer les explications d’un système par un “Pourquoi ?” mais ne vous en faites pas, il y a une raison à cela qui conditionne tous les aspects des règles qui vous seront détaillées. Contrairement à beaucoup de jeux de rôle
                dont le système de jeu repose sur une simulation se voulant la plus proche possible de la réalité et de sa cohérence, le système Wyrdwalkers (et l’univers par extension) n’a pas cette aspiration. Que vous
                soyez joueur ou Maitre du Jeu (MJ), il est important de garder en tête que les histoires se déroulant dans Wyrdwalkers n’ont pas besoin de suivre les règles grises et banales de la réalité. Les mythes et
                les légendes n’en ont pas (réalistiquement parlant en tout cas) et c’est bel et bien ce que vous allez faire en jouant dans l’univers Wyrdwalkers : créer une histoire digne de la Légende. Le système de jeu
                dans sa globalité est donc conçu pour faire en sorte que les actions des joueurs puissent être épiques et dignes de celles d’un Hercule, d’un Maui ou de n’importe quel demi-dieu (ou demi-déesse).
                <br />
                <br />
                <i>De par l’aspect non-conventionnel de ce système, les MJ évoluant dans Wyrdwalkers seront amenés à faire preuve d’improvisation très (très) souvent au cours de leurs parties, ne pouvant se contenter de lire les résultats des dés et associer un résultat scénaristique de manière mécanique. Bien entendu le système Wyrdwalkers offre la possibilité de se reposer sur un fonctionnement mécanique, mais les MJ découvriront très vite que la mécanique pure ne leur sera pas suffisante. Dans cet esprit, des valeurs de seuils et autres nombres sont donnés pour faciliter la compréhension des règles. Bien qu’ils soient standards et qu’ils permettent au système de fonctionner, ces nombres ne sont assujettis à aucune règle fixée dans le marbre et chaque MJ est libre de les adapter selon ses besoins/ses joueurs/son humeur/rayez-la-mention-inutile.</i>
              </p>
            </content>
          </bloc-1>
          <v-divider class="mb-3"></v-divider>
          <bloc-1>
            <titre>Les bases</titre>
            <content>
              <p>
                Le système Wyrdwalkers est basé sur le système de FATE Core, que vous pouvez trouver en français à
                <a
                  href="https://fate-srd.fr/wikifate/"
                  target="_blank"
                >cette adresse</a>. Il n’est pas primordial de visiter
                le site car nous en avons modifié le fonctionnement sur plusieurs notions. Cependant, cela peut être utile pour avoir une référence en tête.
              </p>
              <p>
                Cela étant dit, passons aux choses sérieuses. Les joueurs et MJ vétérans du jeu de rôle n’auront aucun mal à passer certaines explications, certaines d’entre elles étant destinées aux personnes n’ayant jamais pratiqué cet exercice mental. Si des termes
                vous paraissent étranges, n’hésitez pas à consulter le mini-glossaire en bas de la page.
              </p>

              <bloc-2>
                <titre>Parlons nombres</titre>
                <content>
                  <p>
                    Pour profiter pleinement de ce système, vous aurez besoin de deux types de dés : des dés à quatre faces pyramidaux et des dés Fudge (ou dés de Fate) ressemblant à des D6 classiques et portant comme valeurs +1, 0 ou -1. Ces types de dés sont facilement
                    trouvables dans les commerces liés au jeu de rôle et seront référencés dans la suite du livre respectivement en tant que “
                    <strong>D4</strong>”
                    et “
                    <strong>DF</strong>”.
                  </p>
                </content>
                <bloc-3 id="jets">
                  <titre>Les deux types de jets</titre>
                  <content>
                    <p>Il existe deux types de jets de dés dans Wyrdwalkers : les jets classiques et les jets de Légende. En l’essence, tous deux ont le même but et le même fonctionnement mais pas la même portée.</p>
                    <p>
                      Un jet classique se fait à l’aide de 4DF au résultat duquel on ajoute le bonus de la caractéristique associée.
                      <br />
                      <strong>Exemple :</strong>&nbsp;
                      <i>Un personnage désire intimider un suspect, avec une difficulté définie par le MJ de +2. Il fait donc un jet classique de Présence dont le bonus renseigné sur la fiche de personnage indique +2. Son jet de dés donne comme résultat (1,0,0,0) donc 1. Ajouté à son bonus de caractéristique (ici la Présence), son résultat final est donc de +3. La difficulté fixée par le MJ étant de 2, le suspect est donc intimidé et donne des renseignements.</i>
                    </p>
                    <p>
                      Un jet de légende fonctionne sur le même principe mais nécessite quelques conditions pour être utilisé : un tel jet demande l’utilisation d’une capacité légendaire présente sur la fiche de personnage. Le MJ doit évidemment valider l’utilisation faite
                      de cette capacité légendaire. Une fois cela convenu, le joueur remplace un de ses DF par un D4 et comptabilise le résultat des dés comme n’importe quel jet.
                      <br />
                      <strong>Exemple :</strong>&nbsp;
                      <i>Un personnage désire terrifier un suspect, avec une difficulté définie par le MJ de +2. Il décide d’utiliser la capacité légendaire “Invocation: Nuit - Terreur”. Il fait donc un jet de légende de Présence dont le bonus renseigné sur la fiche de personnage indique +2. Son jet de dés avec un D4 donne comme résultat (3,0,-1,+1) donc 3. Ajouté à son bonus de caractéristique, son résultat final est donc de +5. Il fait donc une Réussite à +3 en-delà de la difficulté: le suspect révèle tout ce qu’il sait et au-delà.</i>
                    </p>
                    <p>
                      <strong>Il est important de garder en tête qu’un jet de légende peut être réalisé à l’aide de n’importe quelle caractéristique du moment qu’elle justifie l’action associée au jet, tout comme un jet classique.</strong>
                    </p>
                    <p>
                      Lors des jets de dés, les
                      <strong>niveaux de Légende</strong> des personnages impliqués doivent être pris en compte : un personnage de niveau N bénéficiera d’un bonus de +2 à
                      <strong>tous</strong> ses jets face à des opposants de niveau N-1.
                    </p>
                  </content>
                </bloc-3>
                <v-divider class="mb-3"></v-divider>
                <bloc-3>
                  <titre>Cas particulier : les jets combinés</titre>
                  <content>
                    <p>
                      Lorsque une action est entreprise par plusieurs personnages à la fois, sélectionnez d'abord le personnage prenant le contrôle de l’action. C'est le leader de l'action. Tout personnage supplémentaire participant à l’action ajoute +1 au résultat du jet
                      combiné à condition qu'il dispose de la même compétence que le leader dans sa pyramide mais aussi qu'il ait le même niveau de Légende que le leader .
                    </p>
                  </content>
                </bloc-3>
                <v-divider class="mb-3"></v-divider>
                <bloc-3>
                  <titre>Gros risque, grosse récompense</titre>
                  <content>
                    <p>
                      La raison de l’existence de ces deux types de jets est double. D’abord au niveau scénaristique, lorsqu’un personnage utilise une capacité légendaire cela signifie qu’il puise dans sa propre Légende pour déformer la réalité et faire en sorte que les choses
                      les plus improbables puissent arriver. Un jet d’Athlétisme classique permettra (ou non) de sauter par-dessus le mur d’une prison (ou d’une maison pour rester modeste) alors qu’un jet de légende
                      en Athlétisme accompagné de la capacité adéquate permettra de s’envoler brièvement au-dessus d’un gratte-ciel et d'atterrir sans mal.
                    </p>
                    <p>
                      La seconde raison est purement numérique. Un jet classique produit des résultats entre -4 et +4, avec une moyenne de 0. Ces jets existent pour symboliser à quel point un personnage parvient à utiliser ses compétences à un moment donné. Un jet de légende,
                      quant à lui, produit des résultats en -2 et +7 avec une moyenne à 2.5. Les possibilités d’échecs sont réduites et les chances de succès augmentées, mais l’intervalle des succès possibles l’est
                      aussi. Lorsqu’un personnage puise dans sa Légende, littéralement
                      <strong>tout</strong> peut arriver...
                    </p>
                    <p>
                      <strong>
                        Pour tout ce qui concerne les règles de la création de personnage, vous trouverez votre bonheur dans
                        <a
                          href="#creation-personnage"
                        >section Création de Personnage</a> de ce guide.
                      </strong>
                    </p>
                  </content>
                </bloc-3>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2 id="competences">
                <titre>Les compétences</titre>
                <content>
                  <p>
                    Le système Wyrdwalkers met à disposition 13 compétences qu’ils peuvent choisir pour remplir leur pyramide de compétences. Les modalités d’assignation d’une compétence à un personnage sont détaillées dans la partie
                    <a
                      href="#creation-personnage"
                    >Création de personnage</a>.
                    <br />Vous trouverez ci-dessous la liste des compétences et des exemples d’utilisation.
                  </p>
                  <v-simple-table class="mb-3">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left subtitle-2">Compétence</th>
                          <th class="text-left subtitle-2">Exemple d'utilisation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Athlétisme</td>
                          <td>Agilité et coordination : sauter par-dessus un mur, courir un sprint, faire l’équilibriste, danser, esquiver une attaque...</td>
                        </tr>
                        <tr>
                          <td>Combat</td>
                          <td>Combat de mêlée, parer un coup, trancher un minotaure en deux, mettre un uppercut à un géant</td>
                        </tr>
                        <tr>
                          <td>Furtivité</td>
                          <td>Se faufiler sans être détecté, voler un objet dans un poche, faire de faux papier...</td>
                        </tr>
                        <tr>
                          <td>Ingénierie</td>
                          <td>Intelligence pratique : hacker un ordinateur, construire une grenade, piloter un navire...</td>
                        </tr>
                        <tr>
                          <td>Manipulation</td>
                          <td>Berner un ennemi, amadouer un vigile, bluffer, mentir...</td>
                        </tr>
                        <tr>
                          <td>Perception</td>
                          <td>Être attentif à son environnement, enquêter sur un lieu,...</td>
                        </tr>
                        <tr>
                          <td>Physique</td>
                          <td>La mécanique du corps. Force, endurance, constitution,...</td>
                        </tr>
                        <tr>
                          <td>Présence</td>
                          <td>Rayonnement charismatique, en imposer sans avoir besoin de choisir ses mots,...</td>
                        </tr>
                        <tr>
                          <td>Rapport</td>
                          <td>Instinct social, se faire des amis, faire l’intermédiaire dans une négociation,...</td>
                        </tr>
                        <tr>
                          <td>Ressources</td>
                          <td>
                            Indicateur de richesses, réseau financier, réseau d’alliés,...
                            <br />
                            <strong>
                              Cette compétence ne fait jamais l’objet de jets de dés
                              <sup>(*)</sup>
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Savoir</td>
                          <td>Savoir académique, culture générale,...</td>
                        </tr>
                        <tr>
                          <td>Tir</td>
                          <td>Tirer avec un pistolet ou un arc, lancer une boule de feu avec précision,...</td>
                        </tr>
                        <tr>
                          <td>Volonté</td>
                          <td>Résister aux attaques mentales, invoquer des pouvoirs magiques par la force de l’esprit,...</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                  <v-alert outlined type="info" border="left">
                    <sup>(*)</sup> La compétence
                    <i>Ressources</i> permet de s’acheter un certain nombre d’objets et/ou de services. A la place d’un jet de dés, un joueur sait immédiatement s’il possède les finances
                    ou contacts nécessaires pour réaliser son action si son bonus de Ressources est supérieur ou égal à la difficulté définie par le MJ. Si c’est le cas, un aspect temporaire sans invocation gratuite
                    est créé. (Voir ci-dessous pour en savoir plus sur les aspects)
                  </v-alert>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2 id="aspects">
                <titre>Les aspects</titre>
                <content>
                  <p>De toutes les notions du système de jeu, les aspects en sont l’élément central. Ils coordonnent la narration de l’histoire et orientent les décisions des joueurs.</p>
                  <p>
                    Qu’est-ce qu’un aspect ? Ce sont les descriptions de l’environnement dans lequel évoluent les personnages. Ils prennent la forme d’une phrase courte décrivant l’élément auquel ils sont rattachés.
                    <i>Poutre branlante</i>,
                    <i>Sol gelé</i>,
                    <i>Faible luminosité</i>,
                    <i>Armée en déroute</i>,...
                    <br />L’intitulé d’un aspect peut prendre n’importe quelle forme et n’est contraint que par sa nature descriptive de l’élément
                    scénaristique associé. Pour tout le reste, l’aspect est soumis à l’imagination des joueurs et du MJ.
                  </p>
                  <bloc-3>
                    <titre>Les types d'aspects</titre>
                    <content>
                      <p>
                        Il existe quatre types d’aspect en fonction de l’élément scénaristique auquel celui-ci est attaché : les aspects définis, les aspects de personnage, les aspects de situation et les aspects de campagne. Le type de ces aspects n’a pas d’impact réel sur
                        le jeu, ils sont générés et utilisés de la même façon. Néanmoins, ces termes permettent aux Joueurs et au MJ de comprendre l’étendue d’un aspect et en facilite l’utilisation dans la narration.
                      </p>
                      <bloc-4>
                        <titre>Les aspects définis</titre>
                        <content>
                          <p>
                            Chaque personnage, qu’il soit PJ ou PNJ, possède des aspects personnels qui le définissent et qui ont été choisis lors de la création du personnage. Les aspects définis désignent ces aspects-là, au nombre de cinq lors de la création du personnage. Par
                            les actions des joueurs, les aspects définis de ces derniers peuvent être amenés à être figés, signifiant que ceux-ci ne peuvent plus évoluer et qu’ils enfermeront les joueurs dans
                            un chemin de plus en plus étroit au fur et à mesure que leur légende prend forme. La création et l’utilisation de ces types d’aspects figés est décrite plus loin.
                          </p>
                        </content>
                      </bloc-4>
                      <v-divider class="mb-3"></v-divider>
                      <bloc-4>
                        <titre>Les aspects de personnage</titre>
                        <content>
                          <p>
                            Ce type d’aspects désigne ceux affectant directement un personnage. Contrairement aux aspects définis de ceux-ci (qui définissent leur nature), les aspects de personnage sont des aspects dont la durée d’action est relativement temporaire. Quelques secondes,
                            un mois, 10 ans, tout dépend de l’aspect créé (
                            <i>Bousculé.e</i>,
                            <i>Jambes Brisées</i>,...). Ces aspects,
                            dépendant de leur fonction, illustrent des faits qui affectent le ou les personnages en question.
                          </p>
                        </content>
                      </bloc-4>
                      <v-divider class="mb-3"></v-divider>
                      <bloc-4>
                        <titre>Les aspects de situation</titre>
                        <content>
                          <p>
                            Les aspects de ce type désignent des aspects touchant à l’environnement direct d’une situation donnée, qu’ils soient issus de l’action d’un joueur ou intrinsèques aux éléments de l’environnement. Une maison peut être en feu (
                            <i>Maison en Feu</i>),
                            la paroi d’un tunnel dans les égouts peut être glissante (
                            <i>Paroi Glissante</i>) que ce soit de par leur nature ou bien suite à une action des personnages. Ces aspects sont en général
                            valables le temps d’une scène et disparaissent par la suite une fois les joueurs sortis de la situation ciblée.
                          </p>
                        </content>
                      </bloc-4>
                      <v-divider class="mb-3"></v-divider>
                      <bloc-4>
                        <titre>Les aspects de campagne</titre>
                        <content>
                          <p>
                            Plus rares mais plus persistants, les aspects de campagnes sont valables d’une session à une autre et peuvent être issus d’une volonté du MJ de créer une ambiance particulière dès le début de la campagne ou bien peuvent être la conséquence directe des
                            actions des joueurs sur leur environnement (
                            <i>Recherchés par Interpol</i>,
                            <i>Course-poursuite jusqu’au trésor</i>,..).
                            Ces aspects sont largement moins utilisés en cours de jeu mais remplissent tout de même une fonction essentielle s’ils sont mis en place.
                          </p>
                        </content>
                      </bloc-4>
                    </content>
                  </bloc-3>
                  <v-divider class="mb-3"></v-divider>
                  <bloc-3>
                    <titre>Créer et utiliser les aspects</titre>
                    <content>
                      <bloc-4>
                        <titre>Créer des aspects</titre>
                        <content>
                          <p>
                            Pour créer un aspect, un test est requis pour déterminer la puissance de celui-ci. Un joueur peut réaliser ce test au moyen d’un jet classique ou bien d’un jet de légende. Tout jet est soumis à un seuil de réussite fixé par le MJ. En fonction des résultats
                            du jet, l’aspect peut être créé (ou non) avec des conséquences bénéfiques (ou non) pour le joueur ayant tenté l’action. Les bonus - et malus - accordés en fonction du niveau de réussite
                            d’un jet sont définis comme suit :
                          </p>
                          <ul class="mb-3">
                            <li>
                              <strong>Echec :</strong> Le MJ peut créer un aspect qui va défavoriser le joueur ayant fait le jet.
                            </li>
                            <li>
                              <strong>Réussite simple :</strong> Création de l’aspect avec une invocation gratuite.
                            </li>
                            <li>
                              <strong>Résussite exceptionnelle :</strong> Création de l’aspect avec une invocation gratuite supplémentaire par tranche de 3 points au-dessus du seuil de réussite.
                            </li>
                            <li>
                              <strong>Réussite Légendaire :</strong> Un jet dépassant le seuil de réussite d’au moins 6 points. Ce type de réussite spécial permet au joueur à l’initiative du jet de créer un
                              aspect supplémentaire - sans invocation gratuite - en plus de celui qu'il ou elle tentait de créer.
                            </li>
                          </ul>
                        </content>
                      </bloc-4>
                      <v-divider class="mb-3"></v-divider>
                      <bloc-4>
                        <titre>Utiliser des aspects</titre>
                        <content>
                          <p>
                            Le système Wyrdwalkers (et Fate Core de manière plus générale) est conditionné par l’utilisation des aspects qui permettent de rendre chaque action (jet de dé) unique en prenant en compte les circonstances. Ces utilisations se font par la dépense et le
                            gain de points du Destin. Avec la mécanique d’invocation et celle de contrainte, une économie du point de Destin va très vite s’installer pendant vos parties, les joueurs les dépensant
                            pour avantager leurs jets de dés et le MJ en distribuant via les contraintes. Ces échanges sont primordiaux pour construire la narration de vos parties.
                          </p>
                          <bloc-5>
                            <titre>Invoquer un aspect</titre>
                            <content>
                              <p>
                                L’invocation d’aspects est la mécanique principale des joueurs et la face “dépense” du système de jeu. Dès lors qu’un aspect est créé, il reste valable pendant une durée dépendant de son type (voir les 4 types d’aspects). Les joueurs peuvent dès lors
                                l’invoquer au prix d’un point de Destin afin d’obtenir un bonus de +2 à leur prochain jet de dés.
                                <br />Lors de la création d’un aspect, celui-ci peut bénéficier d’invocations gratuites dont le nombre dépend du niveau de réussite obtenu lors du jet de dés (voir la création des
                                aspects). Ces invocations gratuites dispensent de l’utilisation de points du Destin pour l’invocation de l’aspect auquel elles sont attachées. Une action ne peut profiter
                                que d’une seule invocation gratuite.
                                <br />L’invocation d’aspects est soumise à quelques conditions :
                              </p>
                              <ul class="mb-3">
                                <li>Pour chaque aspect, une seule invocation gratuite peut être utilisée par tour. Le nombre d’aspect desquels peuvent être utilisées des invocations gratuites n’a pas de limite.</li>
                                <li>L’invocation d’un aspect sans utiliser d’invocation gratuite se fait au coût d’un point de Destin et n’est pas soumise à une limite de nombre. La seule limite est la réserve de points du Destin du joueur.</li>
                              </ul>
                            </content>
                          </bloc-5>
                          <v-divider class="mb-3"></v-divider>
                          <bloc-5>
                            <titre>Contraindre un aspect</titre>
                            <content>
                              <p>
                                La contrainte d’aspect est la deuxième mécanique permettant au MJ de distribuer des Points du Destin à ses joueurs. Les aspects, comme vu précédemment, peuvent être utilisés pour tirer profit des situations qu’ils décrivent. Mais ils peuvent aussi être
                                utilisés pour orienter l’histoire et ainsi explorer des possibilités...qui sont loin d’être toujours bénéfiques pour les joueurs. La principale utilisation des contraintes
                                de la part d’un MJ reste de placer ses joueurs dans des situations contraignantes pour eux, pour le groupe et/ou pour l’histoire de manière générale. Cela se fait par l’intermédiaire
                                des contraintes, qui sont l’arme principale d’un MJ Wyrdwalkers.
                              </p>
                              <p>
                                A tout moment pendant la partie, le MJ ou un des joueurs peut contraindre un ou plusieurs personnages à suivre un aspect. Si le ou les personnages acceptent la contrainte, ils reçoivent un point du Destin de celui qui a lancé la contrainte. S’ils refusent,
                                ils doivent payer un point de Destin à celui qui a lancé la contrainte.
                                <strong>Un joueur n’ayant plus de point de Destin ne peut donc pas refuser une contrainte le visant</strong>.
                                <br />
                                <strong>Exemple :</strong>
                                <i>Un joueur ayant fait Voeu d’Aventure - possédant donc un aspect défini du même nom sur sa fiche de personnage - se retrouve face à une situation potentiellement dangereuse. Il peut voir son aspect</i> Voeu d’aventure
                                <i>
                                  contraint
                                  par le Maître du Jeu. S’il accepte, il gagne un point de Destin qu’il pourra utiliser pour invoquer un aspect plus tard. S’il refuse, il perd un point du Destin.
                                </i>
                              </p>
                              <v-alert
                                outlined
                                type="info"
                                border="left"
                              >Les contraintes sur les aspects définis figés doublent les récompenses et les pertes. Ainsi, un joueur acceptant une contrainte sur un de ses aspects définis figés gagnera 2 points du Destin et, s’il refuse, perdra 2 points du Destin.</v-alert>
                              <v-alert
                                outlined
                                type="warning"
                                border="left"
                              >Les points du Destin gagnés lors de contraintes ne peuvent pas être utilisés pendant la scène en cours.</v-alert>
                            </content>
                          </bloc-5>
                          <v-divider class="mb-3"></v-divider>
                          <bloc-5>
                            <titre>Détruire un aspect</titre>
                            <content>
                              <p>
                                Tout aspect créé peut être potentiellement détruit, soit par la narrative, soit par l’action directe d’un personnage. Une plaque de glace peut être fondue avec un souffle de feu, une jungle peut être absorbée de toute vie par une aura de mort, etc.
                                <br />Pour détruire un aspect directement, le personnage doit réussir un jet dont le seuil de réussite est égal ou supérieur au résultat obtenu lors de la création de l’aspect à
                                détruire.
                              </p>
                            </content>
                          </bloc-5>
                          <v-divider class="mb-3"></v-divider>
                          <v-alert
                            outlined
                            type="warning"
                            border="left"
                          >Afin d’éviter les usages répétés (voirs infinis) des contraintes et des invocations narratives d’aspects, les points du Destin reçus lors d’une scène ne peuvent pas être utilisés avant la résolution de ladite scène.</v-alert>
                        </content>
                      </bloc-4>
                      <v-divider class="mb-3"></v-divider>
                      <bloc-4>
                        <titre>Exemples d'aspects</titre>
                        <content>
                          <p>Ci-dessous vous trouverez quelques exemples d’aspects ainsi que les types de situations où ils peuvent être invoqués ou contraints.</p>
                          <v-row dense>
                            <v-col cols="12" md="4">
                              <v-card class="pa-3 float-card" color="blue-grey lighten-5">
                                <v-card-title>On n'abandonne personne</v-card-title>
                                <v-card-text>
                                  <p>
                                    <strong>Invocation pour :</strong> Secourir ses amis et ses alliés, Evacuer tout le monde en toute sécurité.
                                    <br />
                                    <br />
                                    <strong>Contrainte pour :</strong> Revenir chercher tous ceux que vous pouvez, Sauver la vie d'un ennemi.
                                  </p>
                                </v-card-text>
                              </v-card>
                            </v-col>
                            <v-col cols="12" md="4">
                              <v-card class="pa-3 float-card" color="blue-grey lighten-5">
                                <v-card-title>Escroc sur les bords</v-card-title>
                                <v-card-text>
                                  <p>
                                    <strong>Invocation pour :</strong> Négocier un bien à moindre prix, Connaître quelqu’un qui connait quelqu’un.
                                    <br />
                                    <br />
                                    <strong>Contrainte pour :</strong> Faire intervenir les conséquences d’un ancien accord franchement douteux, Refuser catégoriquement de payer le prix demandé.
                                  </p>
                                </v-card-text>
                              </v-card>
                            </v-col>
                            <v-col cols="12" md="4">
                              <v-card class="pa-3 float-card" color="blue-grey lighten-5">
                                <v-card-title>Force, Honneur et Foi</v-card-title>
                                <v-card-text>
                                  <p>
                                    <strong>Invocation pour :</strong> Etre courageux et appliquer votre code d’honneur, Punir les traîtres à leur serment.
                                    <br />
                                    <br />
                                    <strong>Contrainte pour :</strong> Défendre les autres zélotes de votre foi face à un danger ou un préjugé, Rester fidèle à votre code d’honneur quand vos alliés vous
                                    incitent à faire le contraire.
                                  </p>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                          <v-row dense>
                            <v-col cols="12" md="4">
                              <v-card class="pa-3 float-card" color="blue-grey lighten-5">
                                <v-card-title>Faible chance de survie ? Mais qu’attendons-nous ?</v-card-title>
                                <v-card-text>
                                  <p>
                                    <strong>Invocation pour :</strong> Combattre des ennemis en supériorité numérique, Tenir bon face à des chances de survie infimes.
                                    <br />
                                    <br />
                                    <strong>Contrainte pour :</strong> Être empêché de quitter un assaut, Être forcé de foncer tête baissée dans un assaut.
                                  </p>
                                </v-card-text>
                              </v-card>
                            </v-col>
                            <v-col cols="12" md="4">
                              <v-card class="pa-3 float-card" color="blue-grey lighten-5">
                                <v-card-title>It's a trap !</v-card-title>
                                <v-card-text>
                                  <p>
                                    <strong>Invocation pour :</strong> Sentir venir un piège ou une embuscade, Eviter le déclenchement d'un piège.
                                    <br />
                                    <br />
                                    <strong>Contrainte pour :</strong> Tomber dans plus de pièges que vous n'êtes censé le faire, Vous tromper dans l'identification d'un piège.
                                  </p>
                                </v-card-text>
                              </v-card>
                            </v-col>
                            <v-col cols="12" md="4">
                              <v-card class="pa-3 float-card" color="blue-grey lighten-5">
                                <v-card-title>Curiosité morbide</v-card-title>
                                <v-card-text>
                                  <p>
                                    <strong>Invocation pour :</strong> Connaître des faits sanglants ou anatomiques, Garder votre calme face à des situations morbides.
                                    <br />
                                    <br />
                                    <strong>Contrainte pour :</strong> Être distrait lorsque vous devriez être concentré sur autre chose, Dire des blagues ou des commentaires inappropriés.
                                  </p>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                          <v-row dense class="mb-3">
                            <v-col cols="12" md="4">
                              <v-card class="pa-3 float-card" color="blue-grey lighten-5">
                                <v-card-title>Scout toujours...</v-card-title>
                                <v-card-text>
                                  <p>
                                    <strong>Invocation pour :</strong> Toujours avoir un petit objet pratique en main lorsque vous en avez besoin, Ne jamais tomber à court de munitions ou de rations.
                                    <br />
                                    <br />
                                    <strong>Contrainte pour :</strong> Être ralenti lorsque vous essayez de trouver un objet en particulier, Avancer moins vite à cause du poids de tout ce que vous transportez.
                                  </p>
                                </v-card-text>
                              </v-card>
                            </v-col>
                            <v-col cols="12" md="4">
                              <v-card class="pa-3 float-card" color="blue-grey lighten-5">
                                <v-card-title>Charabia pseudo-scientifique</v-card-title>
                                <v-card-text>
                                  <p>
                                    <strong>Invocation pour :</strong> Rendre vrai un faux raisonnement, Trouver des solutions qui ont l’air logiques.
                                    <br />
                                    <br />
                                    <strong>Contrainte pour :</strong> Entraver toute forme de communication, Passer pour un imbécile face à de vrais scientifiques.
                                  </p>
                                </v-card-text>
                              </v-card>
                            </v-col>
                            <v-col cols="12" md="4">
                              <v-card class="pa-3 float-card" color="blue-grey lighten-5">
                                <v-card-title>Fils à Maman</v-card-title>
                                <v-card-text>
                                  <p>
                                    <strong>Invocation pour :</strong> Obtenir de l’aide de Maman d’une manière ou d’une autre, Faire quelque chose qui rendrait Maman fière.
                                    <br />
                                    <br />
                                    <strong>Contrainte pour :</strong> Être empêché de faire quelque chose que Maman n’approuverait pas, Se voir demandé par Maman de faire quelque chose que vous n’aimez
                                    pas.
                                  </p>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                        </content>
                      </bloc-4>
                    </content>
                  </bloc-3>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2 id="points-destin">
                <titre>Les Points du Destin</titre>
                <content>
                  <p>
                    Les points du Destin symbolisent la possibilité des personnages de réfuter ce que le Destin a prévu pour eux. Chaque personnage commence avec un maximum de 3 points du Destin lors de sa création. Ce maximum représente la réserve de points du Destin disponibles
                    pour le personnage et peut être sujet à évolution au cours des scénarios successifs et des niveaux de légende, notamment lors de l’attribution des Conséquences du Wyrd (voir plus loin).
                  </p>
                  <p>
                    A chaque session, cette réserve est remplie avec son nombre maximum. Au cours d’une session, un personnage peut excéder le maximum de sa réserve, auquel cas à la fin d’une session si un personnage termine avec un excédent de points du Destin, ces derniers
                    ne sont pas perdus et sont retrouvés à la session prochaine par le personnage.
                  </p>
                  <p>Comme vu précédemment, les points du Destin sont utilisés pour invoquer des aspects afin de bénéficier de bonus sur le prochain jet. Ils sont aussi la principale monnaie d’échange du MJ pour inciter ses joueurs à effectuer des actions risquées.</p>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2 id="combats">
                <titre>Les combats</titre>
                <content>
                  <p>Facette incontournable du jeu de rôle, le combat devient inévitable lorsque des enjeux cosmiques occupent les protagonistes.</p>
                  <p>
                    Wyrdwalkers propose un système de combat sortant des sentiers battus. En particulier, les personnages ne possèdent pas de points de vie et ne meurent donc pas lorsqu’une jauge arrive à zéro. A la place, chaque personnage possède du
                    <strong>Stress</strong> et des
                    <strong>Conséquences</strong>.
                  </p>
                  <p>
                    Le
                    <strong>Stress</strong> correspond à des blessures et des chocs dont le personnage pourra se remettre une fois le combat terminé. Elles permettent d’absorber les dégats reçus et réduire le niveau
                    des Conséquences subies suite à une attaque. Par défaut, un personnage possède 2 cases de stress : une de valeur 1 et une de valeur 2. Des cases supplémentaires (3, 4,...) peuvent être débloquées
                    en augmentant les compétences Volonté et/ou Physique. Plus de détails à ce sujet sont disponibles dans la section
                    <a
                      href="#creation-personnage"
                    >Création de personnage</a>.
                  </p>
                  <p>
                    Les
                    <strong>Conséquences</strong>, en revanche, symbolisent les blessures plus importantes dont le personnage ne pourra pas se débarrasser sans soins ou sans période de convalescence. Elles se décomposent
                    en quatre niveaux : légères, moyennes, graves et extrêmes. Chaque personnage possède par défaut un emplacement pour chacun des quatre niveaux de Conséquences.
                  </p>
                  <ul class="mb-3">
                    <li>Les Conséquences Légères sont des blessures type nez brisé, bras tordu ou des troubles mentaux légers comme une méfiance ou une confusion passagère.</li>
                    <li>Les Conséquences Moyennes sont des blessures ou des tourments plus accrus, comme une phobie ou un membre brisé.</li>
                    <li>Les Conséquences Graves sont des blessures ou des tourments pouvant mettre à bas le personnage comme une paralysie mentale ou une colonne vertébrale broyée.</li>
                    <li>Les Conséquences Extrêmes amènent généralement la mort ou des changements extrêmes dans la psychologie du personnage.</li>
                  </ul>
                  <bloc-3>
                    <titre>Le déroulement des combats</titre>
                    <content>
                      <v-alert outlined type="info" border="left">
                        Chaque phase de combat commence par un jet d’initiative de la part de tous les personnages impliqués afin de déterminer l’ordre des attaques. Ce jet d’initiative est basé sur la compétence
                        <i>Perception</i> ou
                        <i>Athlétisme</i> (au choix) des personnages.
                      </v-alert>
                      <p>
                        Une fois l’ordre des attaques établi, chaque personnage a - à son tour - le choix entre deux actions : attaquer ou créer un aspect (voir la section aspects). Une attaque vise toujours à infliger des Conséquences à la cible et provoque toujours une phase
                        de défense de la part de celle-ci. Une phase attaque-défense se déroule toujours comme suit :
                      </p>
                      <ol>
                        <li>L’attaquant désigne une ou plusieurs cibles (défenseurs) et réalise un jet classique ou légendaire en fonction de l’action qu’il désire réaliser.</li>
                        <li>Le ou les défenseurs réalisent à leur tour un jet classique ou légendaire pour se prémunir de l’attaque en cours.</li>
                        <li>L’attaquant peut décider d’invoquer des aspects (agressivement ou non) pour augmenter le résultat de son jet.</li>
                        <li>Le défenseur peut ensuite faire de même.</li>
                        <li>
                          Les résultats totaux de l’attaquant et du défenseur sont comparés. Si le résultat du défenseur est supérieur au résultat de l’attaquant, l’attaque a échoué. Si le résultat de l’attaquant est supérieur au résultat du défenseur alors celui-ci subit des
                          dégâts égaux à la différence entre les deux résultats.
                        </li>
                        <li>
                          La répartition des dégâts sur le défenseur se déroule comme suit :
                          <ul class="mb-3">
                            <li>Le défenseur commence par cocher une case de Stress (s’il en possède encore libres)</li>
                            <li>La valeur de la case de Stress cochée est déduite des dégâts subis.</li>
                            <li>
                              Si les dégâts restants à attribuer ne sont pas nuls, ces derniers déterminent le niveau de la Conséquence subie par le défenseur.
                              <ul class="mb-3">
                                <li>1 ou 2 dégâts infligent une Conséquence Légère</li>
                                <li>3 ou 4 dégâts infligent une Conséquence Moyenne</li>
                                <li>5 ou 6 dégâts infligent une Conséquence Grave</li>
                                <li>
                                  7 ou plus dégâts infligent une Conséquence Extrême.
                                  <v-alert
                                    outlined
                                    type="warning"
                                    border="left"
                                  >Les Conséquence Extrêmes ne se placent pas dans un des emplacements de Conséquence de la fiche de personnage, mais changent le personnage de façon si extrême qu’elles remplacent un de ses aspects défini.</v-alert>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ol>
                      <p>
                        Que vous soyez joueur ou MJ, il est important de garder l’information qui va suivre en tête lors de vos combats : du fait de l’absence de jauge de points de vie,
                        <u>
                          <strong>tout combat n’est pas nécessairement à mort</strong>
                        </u>
                        .
                        Un personnage lâche peut très bien s’enfuir une fois qu’il s’est pris une balle dans le bras et un personnage avec les deux jambes brisées aura du mal à continuer le combat. Dans Wyrdwalkers,
                        le but de chaque scène de combat est de mettre vos opposants hors d’état de nuire. Evidemment les exterminer jusqu’au dernier est le moyen le plus sûr pour qu’il ne reviennent plus (encore
                        que la mort reste une notion toute relative pour certaines créatures…) mais c’est aussi le plus long et le plus fastidieux surtout s’il suffit de faire craindre le personnage pour sa vie.
                      </p>
                    </content>
                  </bloc-3>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2 id="prouesses">
                <titre>Les prouesses</titre>
                <content>
                  <p>
                    Les prouesses sont une mécanique du système Wyrdwalkers permettant une grande variété de styles de jeu et d’adaptabilité des personnages. Pour commencer avec une simplification d’usage, les prouesses ressemblent beaucoup aux pouvoirs passifs des jeux
                    vidéos (majoritairement les RPG). Pour ceux à qui cette comparaison ne parle pas, pas de panique, des explications plus détaillées suivent.
                  </p>
                  <p>
                    Chaque personnage que vous allez jouer aura un minimum d’histoire, un passé qui l’aura conduit là où le scénario que vous jouez débute. Les prouesses, comme leur nom l’indiquent, sont donc des aptitudes exceptionnelles que votre personnage a développé
                    au fil du temps. Tout d’abord dans la période pré-scénario mais ensuite à travers les aventures que vous allez vivre. Le système Wyrdwalkers n’étant pas pourvu d’un système de classes comme on peut
                    trouver dans d’autres jeux, chaque personnage n’est pas limité dans ses attributs et son rôle dans un groupe. Chaque Prouesse coûtant bien entendu des points d’expérience pour les obtenir, il est
                    évident qu’un personnage axant toutes ses prouesses sur ses capacités martiales sera beaucoup plus efficaces en combat qu’un personnage voulant toucher un peu à tout...mais il deviendra beaucoup
                    moins utile que ce dernier dans n’importe quel autre type de situation. Le système des prouesses vous permet donc de décider en toute autonomie de la manière dont vous allez jouer votre personnage.
                    Ce sont les clés de voûte de votre personnage, les éléments qui vont lui permettre d’user de ses pouvoirs et de ses compétences de manière guidée...par vous.
                  </p>
                  <p>
                    Une prouesse est composée d’un titre et d’un texte. Autant le titre n’a aucune influence sur le jeu si ce n’est de pouvoir rire un bon coup en voyant jusqu’où l’humour de certains peuvent aller, autant le texte de la prouesse est capital car il incombera
                    au MJ de l’équilibrer en fonction du nombre de points d’XP dépensés (donc du niveau de la prouesse). C’est sans doute le travail le plus délicat du MJ lors de la création de personnage car c’est
                    grâce à ça qu’il évitera de se retrouver avec des personnages trop puissants (ou pas assez !).
                    <br />Mais n’ayez pas peur, jeune MJ, on couvre
                    vos arrières : ci-dessous vous trouverez quelques exemples de prouesses à des niveaux différents pour vous donner des idées.
                  </p>
                  <bloc-3>
                    <titre>
                      Niveau 1 -
                      <b>3 points d'XP</b>
                    </titre>
                    <content>
                      <div class="list-group">
                        <span class="list-group-item">
                          <h4 class="subtitle-1">Duelliste fourbe</h4>
                          <p
                            class="font-weight-light"
                          >Quand vous affrontez un ennemi en duel, vous avez +2 à vos tentatives de création d’aspect liées à ce duel.</p>
                        </span>
                        <span class="list-group-item">
                          <h4 class="subtitle-1">Monsieur personne</h4>
                          <p class="font-weight-light">
                            Vous pouvez utiliser la compétence
                            <b>Rapport</b> pour des jets de Furtivité pour vous dissimuler dans un groupe ou une foule.
                          </p>
                        </span>
                        <span class="list-group-item">
                          <h4 class="subtitle-1">Botaniste</h4>
                          <p class="font-weight-light">
                            Vous avez +2 à vos jets de
                            <b>Savoir</b> en ce qui concerne les plantes.
                          </p>
                        </span>
                        <span class="list-group-item">
                          <h4 class="subtitle-1">Démagogue</h4>
                          <p class="font-weight-light">
                            Vous avez +1 à vos jets de
                            <b>Rapport</b> en parlant à un groupe ou une foule.
                          </p>
                        </span>
                      </div>
                    </content>
                  </bloc-3>
                  <v-divider class="mb-3"></v-divider>
                  <bloc-3>
                    <titre>
                      Niveau 2 -
                      <b>6 points d'XP</b>
                    </titre>
                    <content>
                      <div class="list-group">
                        <span class="list-group-item">
                          <h4 class="subtitle-1">Duelliste d'élite</h4>
                          <p
                            class="font-weight-light"
                          >Quand vous affrontez un ennemi en duel, vous avez +2 à vos tentatives d’attaque et de création d’aspect liées à ce duel.</p>
                        </span>
                        <span class="list-group-item">
                          <h4 class="subtitle-1">Monsieur Tout-Le-Monde</h4>
                          <p class="font-weight-light">
                            Vous pouvez utiliser
                            <b>Rapport</b> avec un bonus de +2 pour des jets de Furtivité pour vous dissimuler dans un groupe ou une foule.
                          </p>
                        </span>
                        <span class="list-group-item">
                          <h4 class="subtitle-1">Biologiste</h4>
                          <p class="font-weight-light">
                            Vous avez +2 à vos jets de
                            <b>Savoir</b> liés à la biologie (anatomie, botanique, écologie, zoologie).
                          </p>
                        </span>
                        <span class="list-group-item">
                          <h4 class="subtitle-1">Populiste</h4>
                          <p class="font-weight-light">
                            Vous avez +2 à vos jets de
                            <b>Rapport</b> en parlant à un groupe ou une foule.
                          </p>
                        </span>
                      </div>
                    </content>
                  </bloc-3>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2 id="pouvoirs">
                <titre>Les Capacités Légendaires</titre>
                <content>
                  <p>Les capacités légendaires sont des pouvoirs manipulant la Légende afin de modifier la réalité pour y faire intervenir des évènements considérés comme impossibles par le commun des mortels.</p>
                  <p>
                    Pour utiliser une capacité légendaire, un personnage doit l’avoir appris en ayant dépensé les points d’expérience correspondants. La dépense de points d’expérience permet d’acquérir l’expertise nécessaire dans un domaine ciblé (Druidisme, Invocation :
                    Feu, Physiologie Epique, etc.). Si le domaine désiré par le joueur ne figure pas encore sur sa fiche de personnage, celui-ci est par défaut défini comme un domaine de niveau 1 pour le personnage.
                    Le joueur doit alors choisir une spécialité parmi celles proposées pour le domaine sélectionné. Pour chaque niveau supplémentaire désirés dans le domaine ciblé, le joueur peut y ajouter autant de
                    spécialités. Chaque domaine de capacité légendaire donne de plus accès à des prouesses (voir section suivantes) qui peuvent être achetées séparément contre des points d’expérience.
                  </p>
                  <p>
                    Le nombre d’utilisation d’une capacité légendaire par session est égale au niveau du domaine de magie associé.
                    <br />
                    <strong>Exemple :</strong>
                    <i>Un personnage possédant</i> Invocation : Feu
                    <i>avec les spécialités</i> Destruction
                    <i>et</i> Magma
                    <i>aura une Invocation : Feu au niveau 2. A chaque session il pourra donc utiliser Invocation : Feu 2 fois et choisir entre Destruction et Magma à chaque fois.</i>
                  </p>
                  <v-alert outlined type="info" border="left">
                    Pour avoir accès à la liste complète des Capacités Légendaires, c'est
                    <a
                      href="/wiki/gameplay/legendary-abilities "
                      target="_blank "
                    >par ici</a> !
                  </v-alert>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2 id="liens-wyrd">
                <titre>Les Liens du Wyrd</titre>
                <content>
                  <p>
                    Mécanique essentielle de Wyrdwalkers, les liens du Wyrd vont être les principaux obstacles dans l’évolution de vos personnages. Trop de liens du Wyrd vous conduiront inévitablement à vous emprisonner dans votre Légende et devenir esclaves de votre propre
                    nature sans aucun moyen de revenir en arrière. Mais pas assez de liens du Wyrd empêcheront votre Légende de prendre forme, vos ambitions d’éclore au grand jour et votre nom d’être inscrit dans les
                    étoiles. En effet, bâtir votre Destin est une condition primordiale pour gagner en puissance mais cela implique de s’impliquer sur le Monde de manière active. Il est presque garanti qu’un rapport
                    amour-haine s’instaurera entre vous et cette mécanique.
                  </p>
                  <p>
                    Chaque domaine de magie (<a
                      href="/wiki/gameplay/legendary-abilities"
                      target="_blank "
                    >ici</a>) est associé à un nombre de liens du Wyrd. Vous trouverez ci-dessous la table associée. Rappelez-vous que
                    ces valeurs ne sont données qu'à titre indicatif, en tant que MJ vous êtes libre de les adapter comme bon vous semble.
                  </p>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left subtitle-2">Domaine</th>
                          <th class="text-left subtitle-2">Liens générés</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Druidisme</td>
                          <td>4</td>
                        </tr>
                        <tr>
                          <td>Hématurgie</td>
                          <td>4</td>
                        </tr>
                        <tr>
                          <td>Magie des âmes</td>
                          <td>4</td>
                        </tr>
                        <tr>
                          <td>Vision du Wyrd</td>
                          <td>6</td>
                        </tr>
                        <tr>
                          <td>Physiologie Epique</td>
                          <td>2</td>
                        </tr>
                        <tr>
                          <td>Invocation : Feu</td>
                          <td>6</td>
                        </tr>
                        <tr>
                          <td>Invocation : Eau</td>
                          <td>6</td>
                        </tr>
                        <tr>
                          <td>Invocation : Lumière</td>
                          <td>6</td>
                        </tr>
                        <tr>
                          <td>Invocation : Nuit</td>
                          <td>6</td>
                        </tr>
                        <tr>
                          <td>Invocation : Terre</td>
                          <td>6</td>
                        </tr>
                        <tr>
                          <td>Invocation : Ciel</td>
                          <td>6</td>
                        </tr>
                        <tr>
                          <td>Invocation : Profondeurs</td>
                          <td>6</td>
                        </tr>
                        <tr>
                          <td>Invocation : Mort</td>
                          <td>6</td>
                        </tr>
                        <tr>
                          <td>Invocation : Ordre</td>
                          <td>
                            6
                            <sup>(*)</sup>
                          </td>
                        </tr>
                        <tr>
                          <td>Taiyi</td>
                          <td>8</td>
                        </tr>
                        <tr>
                          <td>Enech</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>Arcanes</td>
                          <td>0</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                  <v-alert outlined type="info" border="left">
                    <sup>(*)</sup> Les liens du Wyrd générés grâce à
                    <strong>Invocation : Ordre - Contrôle</strong> sont de 8 au lieu de 6.
                  </v-alert>
                  <p>
                    Lorsqu’un joueur ayant effectué un jet de légende obtient un résultat de 5 ou plus au résultat de ses dés, sans prise en compte d’éventuels modificateurs tels les bonus de compétences, un lien du Wyrd égal au nombre associé au domaine de magie employé
                    est automatiquement généré. La signification scénaristique d’un tel événement repose dans le boost soudain de Légende que le personnage a canalisé et qui lui permet de modifier la réalité plus que
                    prévu...mais au prix d’un lien plus fort avec le Monde et d’une légende encore plus forte racontant ses exploits. A ce titre, lorsqu’un lien du Wyrd est généré, les effets de l’action voulue sont
                    plus exacerbés qu’avec un résultat plus “classique”.
                  </p>
                  <p>Tout au long des parties, les personnages vont donc accumuler des liens du Wyrd afin de gagner en niveaux de Légende. Le résultat de cette accumulation est déterminé à chaque montée de niveau. Les étapes sont les suivantes :</p>
                  <ol>
                    <li>Les Conséquences du Wyrd non Extrême déjà endurées aux niveaux précédents diminuent d’un niveau de gravité. Les conséquences légères disparaissent, les conséquences moyennes deviennent légères et les conséquences graves deviennent moyennes.</li>
                    <li>Faire le total des liens du Wyrd accumulés depuis le dernier passage de niveau</li>
                    <li>Diviser par le nouveau niveau de Légende pour obtenir le nombre de points d’influence sur le Monde. Diviser par 2 lors d’un passage au niveau 2, etc.</li>
                    <li>
                      Assigner un niveau de Conséquence du Wyrd en fonction du résultat du calcul précédent.
                      <br />
                      <i>Conséquence Légère : 1 ou 2 points d’influence</i>
                      <br />
                      <i>Conséquence Moyenne : 3 ou 4 points d’influence</i>
                      <br />
                      <i>Conséquence Grave : 5 ou 6 points d’influence</i>
                      <br />
                      <i>Conséquence Extrême : 7 points d’influence ou plus</i>
                    </li>
                    <li>Les liens du Wyrd accumulés sont remis à zéro</li>
                  </ol>
                  <v-alert outlined type="warning" border="left">
                    Si un joueur est sur le point de recevoir une conséquence extrême du Wyrd, il perd un point du Destin de manière permanente, ce qui a pour effet de diminuer son nombre maximum de points du Destin de 1 mais aussi de figer un des aspects définis de son
                    personnage (comme toute conséquence Extrême).
                  </v-alert>
                  <p>
                    Si d’aventures le personnage ne peut plus sacrifier un point du Destin de cette manière (signifiant que son nombre maximum de points est déjà tombé à 0) lors de l’attribution des conséquences de Wyrd, celui-ci subit immédiatement une transformation irréversible
                    dépendant de sa nature d’origine :
                  </p>
                  <ul class="mb-3">
                    <li>
                      Si le personnage est un Godborn, un Wyrdborn, un humain éveillé ou un Mythborn, celui-ci se transforme immédiatement en engeance titanique et tous ses aspects deviennent figés pour symboliser le fait qu’il est devenu un concept sous forme physique et
                      que son libre-arbitre n’existe plus en-dehors du cadre de sa nature. Il ne pourra plus jamais en dévier, quoi qu’il arrive. En outre, ses points du Destin sont remplacés par des points d’Engeance,
                      suivant les mêmes règles que les points du Destin à ceci près qu’ils ne peuvent être utilisés que pour invoquer des aspects en accord avec le concept qu’il incarne désormais.
                    </li>
                    <li>
                      Si le personnage est une engeance titanique, il devient complètement indifférenciable de son concept père. Par exemple, une engeance titanique de l’Eau et de la Mer ne fera plus qu’un avec Océanus, le Royaume Titanique de l’Eau, devenant ainsi une part
                      de ce concept. Bien que scénaristiquement parlant le personnage ne soit pas mort, il devient de fait injouable par les joueurs et est donc retiré de la partie.
                    </li>
                  </ul>
                  <v-alert
                    outlined
                    type="info"
                    border="left"
                  >Les contraintes sur les aspects figés octroient 2 points de Destin si le joueur accepte la contrainte et coûtent 2 points de Destin si le joueur la refuse.</v-alert>
                  <p>
                    Les liens du Wyrd générés par l’usage de capacités légendaires représentent l’essentiel des liens qu’un joueur recevra durant ses parties, mais l’usage de capacités légendaires n’est pas le seul moyen de générer des liens du Wyrd. En effet, le MJ peut
                    décider à tout moment, lors de l’action d’un joueur pouvant être considérée comme réellement légendaire (ou épique), de lui attribuer des liens supplémentaires. Aucun standard n’est défini ici et
                    en tant que MJ vous avez toute latitude dans le nombre de liens à attribuer. En outre, il est possible pour le MJ d’attribuer ces liens supplémentaires lors de la montée de niveau après un bref passage
                    en revue des actions du personnage. Nous vous suggérons que vos joueurs développent une conséquence moyenne ou sévère à chaque passage de niveau. Cela apportera des opportunités scénaristiques intéressantes,
                    créera des personnages récurrent et favorisera l’aspect Légendaire, à la fois satisfaisant et pressurisant.
                  </p>
                  <p>
                    Les Conséquence du Wyrd, comme n’importe quelle autre conséquence, sont des aspects (voir les règles sur les Conséquences dans
                    <a
                      href="#combats"
                    >la section “Combat”</a>). Elles matérialisent l’impact
                    qu’ont les joueurs sur le Monde et la Légende qu’ils laissent derrière eux. A ce titre, il faut rester conscient que le niveau de Légende du joueur a un impact direct sur le type de marque et d’influence
                    qu’il peut laisser sur le Monde. Un personnage de niveau 1 pourra inspirer un voisinage ou un petit village, alors qu’un personnage de niveau 3 pourra plus facilement inspirer une ville entière.
                    De la même manière, Zeus aura beaucoup plus d’impact sur le Monde entier en ne faisant que lever le petit doigt. Une Conséquence du Wyrd légère pour un Godborn de niveau 1 sera donc moins impactante
                    en terme scénaristique qu’une Conséquence du Wyrd légère pour un Godborn de niveau 2, et ainsi de suite. Il est donc important que les intitulés de ces conséquences reflètent cette différence. Ces
                    conséquences doivent en outre disposer d’un intitulé directement tiré des capacités légendaires utilisées pour les générer.
                    <br />
                    <strong>Exemple :</strong>
                    <i>Un personnage ayant beaucoup utilisé la capacité</i> Invocation : Feu - Destruction
                    <i>aura une Conséquence du Wyrd en rapport avec le feu et la destruction. Un personnage ayant au contraire usé de druidisme aura une conséquence en rapport avec la nature.</i>
                  </p>
                  <p>
                    Ci-dessous vous trouverez un tableau d’exemples de Conséquences du Wyrd issues de trois capacités légendaires différentes pour un Godborn de niveau 1. Bien entendu, en tant que MJ, vous avez toute la latitude de nommer ces conséquences comme bon vous
                    semble et les exemples cités ci-dessous sont à prendre comme tels : de simples exemples.
                  </p>
                  <v-row dense class="mb-3">
                    <v-col cols="12" md="4">
                      <v-card>
                        <v-card-title>Feu - Destruction</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>Conséquence :</v-card-text>
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-content>Légère :</v-list-item-content>
                            <v-list-item-content>Tendances pyromanes</v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Moyenne :</v-list-item-content>
                            <v-list-item-content>Rage bouillante</v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Grave :</v-list-item-content>
                            <v-list-item-content>Cheveux de feu</v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Extrême :</v-list-item-content>
                            <v-list-item-content>Demi-Salamandre</v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-card>
                        <v-card-title>Druidisme Vert</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>Conséquence :</v-card-text>
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-content>Légère :</v-list-item-content>
                            <v-list-item-content>Proche de la Terre</v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Moyenne :</v-list-item-content>
                            <v-list-item-content>Allergique à la pollution</v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Grave :</v-list-item-content>
                            <v-list-item-content>Peau d’écorce</v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Extrême :</v-list-item-content>
                            <v-list-item-content>Homme-Arbre</v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-card>
                        <v-card-title>Force Epique</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>Conséquence :</v-card-text>
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-content>Légère :</v-list-item-content>
                            <v-list-item-content>Le gras c’est pour les faibles</v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Moyenne :</v-list-item-content>
                            <v-list-item-content>Accro au sport</v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Grave :</v-list-item-content>
                            <v-list-item-content>Brise-fer</v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Extrême :</v-list-item-content>
                            <v-list-item-content>Quatre-Bras</v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-col>
                  </v-row>
                </content>
              </bloc-2>
            </content>
          </bloc-1>
          <v-divider class="mb-3"></v-divider>
          <bloc-1 id="niveaux-legende">
            <titre>Les niveaux de Légende</titre>
            <content>
              <p>
                Chaque individu dans l’univers Wyrdwalkers possède un niveau de Légende. Celui-ci détermine sa capacité à créer de la Légende autour de lui mais aussi à l’utiliser. Une fois un personnage embarqué sur le chemin de la Légende, il ne peut y échapper car
                c’est un cercle vicieux où la Légende appelle la Légende. Plus un personnage est ancré dans la Légende (autrement dit légendaire), plus il est capable de déformer la réalité de manière improbable et plus
                il gagne en Légende et plus il peut déformer la réalité et plus...bref, vous voyez le tableau. Concrètement ça veut dire quoi ? Tout simplement qu’un personnage comme Zeus est aussi puissant parce-qu’il
                est légendaire, ce qui lui permet d’être encore plus légendaire et donc encore plus puissant. L’oeuf, la poule. C’est ainsi que les légendes naissent puis prennent de l’ampleur jusqu’à l’issue inévitable
                : l’apothéose ou la mort.
                <br />Chaque niveau de Légende désigne un niveau de puissance conséquent par rapport aux niveaux inférieurs. Ce niveau de puissance
                ne reflète pas seulement la puissance au combat, mais aussi l’impact scénaristique des décisions prises par le personnage. Ainsi, en terme de scénario, un individu de niveau N équivaut environ à 5 individus
                de niveau N-1. De la même manière, en terme de jeu, un personnage de niveau N aura un bonus de +2 à tous ses jets face à des opposants de niveau N-1.
              </p>
              <bloc-2>
                <titre>Niveau 0 : Humain</titre>
                <content>
                  <p>Ce sont les humains classiques, les figurants de la Légende, ceux que vous croisez dans vos aventures et n’ayant pas l’ombre d’une idée de la véritable nature du cosmos.</p>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2>
                <titre>Niveau 1 : Hors du commun</titre>
                <content>
                  <p>
                    Ce sont les jeunes Godborns/Wyrdborns/Eveillés qui découvrent les pouvoirs que leur donne la Légende. Bien qu’ils ne soient pas au niveau des demi-dieux, ils dominent largement un humain classique. Leur influence dépasse rarement celle d’un quartier ou
                    d’une petite ville.
                    <br />Exemples de personnages de fiction connus :
                  </p>
                  <ul class="mb-3">
                    <li>Hawkeye (Marvel)</li>
                    <li>Eomer (Seigneur des Anneaux)</li>
                    <li>Harley Quinn (DC)</li>
                    <li>Altaïr Ibn-La'Ahad (Assassin's Creed)</li>
                    <li>Tyrion Lannister (Le Trône de Fer)</li>
                  </ul>
                </content>
              </bloc-2>
              <v-divider class="mb-3 mt-3"></v-divider>
              <bloc-2>
                <titre>Niveau 2 : Inspiration</titre>
                <content>
                  <p>
                    Ce sont des Godborns expérimentés, de puissants Mythborns et des Eveillés impliqués dans la lutte contre les dieux. Pas tout à fait au niveau des demi-dieux, ils restent suffisamment expérimentés dans la création et l’utilisation de Légende pour pouvoir
                    influencer une grande ville.
                    <br />Exemples de personnages de fiction connus :
                  </p>
                  <ul class="mb-3">
                    <li>Commandant Shepard (Mass Effect)</li>
                    <li>Géralt De Riv (The Witcher)</li>
                    <li>Ezio Auditore (Assassin's Creed)</li>
                    <li>Green Arrow (DC)</li>
                    <li>Spider-man (Marvel)</li>
                    <li>Théoden (Seigneur des Anneaux)</li>
                    <li>Daenerys (Le Trône de Fer)</li>
                    <li>Hermione Granger (Harry Potter)</li>
                  </ul>
                </content>
              </bloc-2>
              <v-divider class="mb-3 mt-3"></v-divider>
              <bloc-2>
                <titre>Niveau 3 : Demi-dieu</titre>
                <content>
                  <p>
                    Ce sont les demi-dieux de la mythologie tel Hercule et les Mythborns d’élite. Leur influence peut aisément s’étendre sur une métropole ou une nation.
                    <br />Exemples de personnages de fiction connus
                    :
                  </p>
                  <ul class="mb-3">
                    <li>Aragorn (Seigneur des Anneaux)</li>
                    <li>Iron Man (Marvel)</li>
                    <li>Batman (DC)</li>
                    <li>Elizabeth (Bioshock: Infinite)</li>
                    <li>Luke Skywalker (Star Wars)</li>
                    <li>Lelouch (Code Geass)</li>
                  </ul>
                </content>
              </bloc-2>
              <v-divider class="mb-3 mt-3"></v-divider>
              <bloc-2>
                <titre>Niveau 4 : Immortel</titre>
                <content>
                  <p>
                    Ce sont les puissants immortels, les héros mythologiques et les personnages de légende n’ayant pas encore atteint le rang de divinité mais ayant suffisamment construit de Légende pour être devenus une source d’inspiration pour beaucoup d’humains. Leur
                    influence peut s’étendre sur plusieurs nations comme Sigmund pour l’Europe du Nord ou Xbalanque et Hunahpu en Amérique Centrale.
                    <br />Exemples
                    de personnages de fiction connus :
                  </p>
                  <ul class="mb-3">
                    <li>Hulk (Marvel)</li>
                    <li>Wonder Woman (DC)</li>
                    <li>Smaug (Seigneur des Anneaux)</li>
                    <li>Yoda (Star Wars)</li>
                    <li>Dumbledore (Harry Potter)</li>
                  </ul>
                </content>
              </bloc-2>
              <v-divider class="mb-3 mt-3"></v-divider>
              <bloc-2>
                <titre>Niveau 5 : Divinité mineure</titre>
                <content>
                  <p>
                    Ce sont les jeunes divinités et les leaders Mythborns comme Barnaby Wulf. L’extrême majorité des Eveillés n’atteignent pas ce niveau et seules les exceptions y parviennent comme le Roi Salomon. Leur influence atteint plusieurs continents voir le Monde.
                    <br />Exemples de personnages de fiction connus :
                  </p>
                  <ul class="mb-3">
                    <li>Galadriel (Seigneur des Anneaux)</li>
                    <li>Superman (DC)</li>
                    <li>Thanos - sans les Pierres d'Infinité (Marvel)</li>
                    <li>Tyraël (Diablo 3)</li>
                    <li>Godzilla</li>
                    <li>Le Roi de la Nuit (Le Trône de Fer)</li>
                  </ul>
                </content>
              </bloc-2>
              <v-divider class="mb-3 mt-3"></v-divider>
              <bloc-2>
                <titre>Niveau 6 : Divinité commune</titre>
                <content>
                  <p>
                    Ce sont les divinités les plus classiques telles Hermès ou Susano-o ou encore les généraux des Titans majeurs. Leur influence atteint le Monde mais pas seulement, l’Overworld est aussi leur terrain de Légende et ils possèdent suffisamment de puissance
                    pour influencer la marche d’un Royaume Divin.
                    <br />Exemples de personnages de fiction connus :
                  </p>
                  <ul class="mb-3">
                    <li>Gandalf (Seigneur des Anneaux)</li>
                    <li>Revan (Star Wars Legends)</li>
                    <li>Amon (Starcraft)</li>
                    <li>Diablo (Diablo 3)</li>
                    <li>Kratos (God of War)</li>
                  </ul>
                </content>
              </bloc-2>
              <v-divider class="mb-3 mt-3"></v-divider>
              <bloc-2>
                <titre>Niveau 7 : Divinité majeure</titre>
                <content>
                  <p>
                    Ce sont des entités qui sortent du rang dans l’Overworld. Ce sont des atouts politiques ou militaires majeurs. Ils occupent des places à haute responsabilité au sein des groupes auxquels ils appartiennent. On trouve parmi elles Arès, Titania, Mab, Horus,
                    Indra, les Rois Dragons et bien d’autres. Leur impact s’étend au-delà des Royaumes Divins, jusque dans les Royaumes Titaniques.
                    <br />Exemples de personnages de fiction connus :
                  </p>
                  <ul class="mb-3">
                    <li>Guilliman (Warhammer 40K)</li>
                    <li>Asura (Asura's Wrath)</li>
                    <li>Saitama (One Punch Man)</li>
                    <li>Parallax (DC)</li>
                  </ul>
                </content>
              </bloc-2>
              <v-divider class="mb-3 mt-3"></v-divider>
              <bloc-2>
                <titre>Niveau 8 : Divinité supérieure</titre>
                <content>
                  <p>
                    Ces entités ont un impact majeur sur l’Overworld et sa politique globale. Ce sont des leaders politiques, militaires, économiques et spirituels respectés et/ou craints. On y trouve Athéna, Sedna, Osiris ou encore Sun Wukong.
                    <br />Exemples
                    de personnages de fiction connus :
                  </p>
                  <ul class="mb-3">
                    <li>Morgoth (Seigneur des Anneaux)</li>
                    <li>Darkseid (DC)</li>
                    <li>Sparda (Devil May Cry)</li>
                    <li>Les Oris (Stargate SG-1)</li>
                  </ul>
                </content>
              </bloc-2>
              <v-divider class="mb-3 mt-3"></v-divider>
              <bloc-2>
                <titre>Niveau 9 : Haute divinité</titre>
                <content>
                  <p>
                    Ces entités sont les plus grands acteurs de l’Overworld. Leurs actions ont des répercussions dans tous les aspects du Cosmos, que ce soit de par leur puissance brute ou leur intellect. On y trouve les Titans majeurs comme Aten, Kronus ou Surtr mais aussi
                    les dieux les plus influents de l’Overworld comme Zeus, Shiva ou Râ (avant son empoisonnement par Isis).
                    <br />Exemples de personnages de fiction connus :
                  </p>
                  <ul class="mb-3">
                    <li>Dr Manhattan (Watchmen)</li>
                    <li>Aslan (Narnia)</li>
                    <li>Asmodeus (Donjons & Dragons)</li>
                    <li>Adama Warlock (Marvel)</li>
                    <li>Cthulhu</li>
                  </ul>
                </content>
              </bloc-2>
              <v-divider class="mb-3 mt-3"></v-divider>
              <bloc-2>
                <titre>Niveau 10+ : Transcendantaux</titre>
                <content>
                  <p>
                    Ces entités particulières transcendent les concepts du Cosmos et l’essence même de la réalité n’est pour eux qu’une pièce de plus dans le grand échiquier cosmique. Ces êtres sont extrêmement peu nombreux mais la moindre de leurs actions ont des répercussions
                    pouvant bouleverser de manière permanente la nature de la réalité. On y trouve Gaïa, Ouranos ou encore Chronos.
                    <br />Exemples de personnages
                    de fiction connus :
                  </p>
                  <ul class="mb-3">
                    <li>Thanos - avec les Pierres d'Infinité (Marvel)</li>
                    <li>Les Dieux du Chaos (Warhammer)</li>
                    <li>Lucifer Morningstar (DC)</li>
                    <li>Le Docteur (Docteur Who)</li>
                  </ul>
                </content>
              </bloc-2>
            </content>
          </bloc-1>
        </div>
      </div>
      <div class="panel panel-default" id="creation-personnage">
        <div class="panel-heading">
          <h3 class="panel-title uppercase font-weight-light title">Création de personnage</h3>
        </div>
        <div class="panel-body">
          <bloc-1>
            <titre>Première étape : le concept</titre>
            <content>
              <p>
                Avant de vous lancer dans l’attribution des statistiques, des pouvoirs et autres joyeusetés, il vous faudra vous poser deux minutes pour réfléchir au minimum vital de votre personnage. Un background complet de dix-huit pages n’est pas nécessaire (mais
                toujours apprécié des MJ s’il contient des éléments narratifs intéressants) et vous pouvez tout à fait commencer votre processus de création à partir d’une idée générale de ce qu’est votre personnage et
                de ce qu’il fait. Est-il un guerrier féroce venu d’une contrée lointaine ? Une navigatrice experte toujours prête à partir à l’aventure ? Un assassin de l’ombre fidèle à son panthéon ? Ou encore un membre
                des triades déterminé à tirer son épingle du jeu ? Un pirate hanté par un trésor introuvable ?
                <br />La seule limite est votre imagination, laissez-la vous emporter
                vers ce que vous adoreriez incarner.
              </p>
            </content>
          </bloc-1>
          <v-divider class="mb-3"></v-divider>
          <bloc-1>
            <titre>Deuxième étape : la fiche de personnage</titre>
            <content>
              <p>
                Vous pouvez télécharger
                <a href="/ressources/templates/Wyrdwalkers_Fiche.rar">ici</a> la fiche de personnage Wyrdwalkers qui vous permettra de réunir toutes les informations de votre personnage au même endroit.
                <i>A la fin de cette section vous trouverez un petit descriptif de la dite fiche pour les joueurs n’ayant pas encore l’habitude de ce type d’élément.</i>
              </p>
              <v-alert outlined type="info" border="left">
                Une version PDF de la fiche de personnage est disponible en suivant
                <a
                  href="/ressources/templates/CharacterSheet.pdf"
                  target="_blank"
                >
                  <u>ce lien</u>
                </a>. Cette version est modifiable depuis votre navigateur.
              </v-alert>
              <p>
                Lorsque vous créez un personnage pour la première fois, avant que votre MJ ne vous annonce avec mansuétude les points d’expérience que vous pourrez répartir, celui-ci est en possession de certains éléments le définissant : 5 aspects définis, une pyramide
                de compétences remplie jusqu’au niveau de bonus +3, trois prouesses de niveau 1 (
                <b>ou</b> une de niveau 1 et une de niveau 2
                <b>ou</b> une de niveau 3) et
                enfin trois capacités légendaires de niveau 1 (
                <b>ou</b> une de niveau 1 et une de niveau 2).
                <br />
                <i>Ces éléments sont bien entendu donnés à titre indicatif et chaque MJ peut user de différentes méthodes. Nous conseillons aux MJs débutant dans Wyrdwalkers de suivre cette règle, au moins jusqu’à ce qu’ils aient pu prendre leurs marques avec le système de jeu. Pour les MJ un peu plus confirmés il est tout à fait possible, par exemple, de permettre à un joueur d’utiliser les points d’XP équivalents à ses prouesses de départ pour les investir dans sa pyramide de compétences.</i>
              </p>
              <bloc-2>
                <titre>Choisir vos aspects</titre>
                <content>
                  <p>
                    A cette étape, il vous faudra avoir en tête suffisamment d’informations sur votre personnage pour vous permettre d’en résumer les différentes facettes en cinq aspects. Les deux premiers aspects de la liste sont sujets à de légères contraintes explicitées
                    plus loin. Les trois autres sont totalement libres. Tous doivent cependant satisfaire une condition minimale : leurs intitulés doivent ouvrir la voie dans certains contextes mais ne doivent pas être
                    trop généraux. Un aspect dont l’intitulé est trop général devient trop permissif et peut ainsi être invoqué ou contraint de trop nombreuses fois. Vous pouvez penser que le problème n’est pas si grave
                    que ça, mais vous vous souviendrez de ce conseil, chers MJ, lorsque vos joueurs pourront justifier des bonus d’attaques en permanence lors de votre combat final que vous aurez pris tant de temps
                    à préparer !
                  </p>
                  <p>
                    Le premier aspect de la liste est surnommé le
                    <b>Concept</b>. Il doit résumer en quelques mots le principe global de votre personnage.
                    <br />
                    <b>Exemple :</b>
                    <i>Navigatrice chevronnée</i>,
                    <i>Membre des Triades</i>, …
                  </p>
                  <p>
                    Le deuxième aspect de la liste est surnommé le
                    <b>Trouble</b>. Il doit représenter un défaut, un vice, un ralentissement ou un handicap de votre personnage.
                    <br />
                    <b>Exemple :</b>
                    <i>Un danger ? Cap droit dessus !</i>,
                    <i>Jambe raide</i>,
                    <i>Rage frénétique</i>,...
                  </p>
                  <p>
                    Les trois autres aspects décrivent d’autres facettes de votre personnage, que ce soit de sa personnalité ou bien des traits issus de ses expériences passées. Une expérience intéressante si vous évoluez dans un groupe de joueurs connus peut être d’élaborer
                    des expériences vécues ensemble par les (ou quelques) personnages du groupe dans un passé plus ou moins proche et d’en tirer les aspects correspondants. Cela a en outre le mérite de vous permettre
                    d’étoffer l’histoire de votre personnage sans trop d’effort.
                  </p>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2>
                <titre>Attribuer des compétences</titre>
                <content>
                  <p>
                    Maintenant que vous avez une idée plus claire de votre personnage, il vous est plus facile de penser ses attributs et donc de lui assigner des compétences.
                    <br />Chaque personnage possède une pyramide
                    de compétences dont chaque étage octroie un bonus de +1, +2, etc. à ses jets de dés. Chaque étage de la pyramide doit contenir au maximum une compétence de moins que l’étage supérieur.
                    <br />Les treize
                    compétences disponibles sont consultables dans la section correspondante des règles du jeu.
                  </p>
                  <v-alert
                    outlined
                    type="info"
                    border="left"
                  >Tous les personnages possèdent toutes les compétences disponibles dans l'éventail de talents; Celles ne figurant pas dans la pyramide octroient tout simplement un bonus de +0 aux lancers de dés du personnage.</v-alert>
                  <p>
                    Chaque étage de la pyramide correspond à un niveau d’expertise dans les compétences. Ainsi, le niveau 0 correspond au niveau d’expertise d’un humain normal. A titre de comparaison, un recordman du 100 mètres aux Jeux Olympiques a un niveau d’expertise
                    en
                    <i>Athlétisme</i> entre 0 et 1. Le personnage de Marvel Hulk posséderait un niveau d’expertise en
                    <i>Physique</i> entre 2 et 3.
                  </p>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2>
                <titre>Description de la fiche de personnage</titre>
                <content>
                  <p>Cette description suppose que vous, cher lecteur, êtes un novice dans l'univers de jeu de rôle dans son ensemble. Sachez donc que certaines de ces explications vous sembleront évidentes si vous êtes déjà un peu aguerri.</p>
                  <v-carousel class="mb-3" continuous cycle :height="carouselHeight">
                    <v-carousel-item v-for="(picture, index) in sheets" :key="index">
                      <img :src="picture" />
                    </v-carousel-item>
                  </v-carousel>
                </content>
              </bloc-2>
            </content>
          </bloc-1>
          <v-divider class="mb-3"></v-divider>
          <bloc-1>
            <titre>Troisième étape : XP et distribution</titre>
            <content>
              <p>Le système d’expérience (aussi noté XP) de Wyrdwalkers est un simple système de gain et de dépense dont les coûts restent fixes quelque soit le niveau du personnage.</p>
              <bloc-2>
                <titre>Gagner de l'expérience</titre>
                <content>
                  <p>
                    Les points d’expérience s’acquièrent au fil des parties, au terme desquelles le MJ attribue un certain nombre de points d’XP à ses joueurs. Chaque MJ est libre de distribuer ces points d’XP comme bon lui semble, que ce soit en terme de fréquence ou bien
                    en terme de quantité. Chers joueurs, ne l’oubliez pas : votre MJ est tout-puissant, votre MJ est beau et votre MJ possède vos âmes.
                  </p>
                  <p>Lors de la création de votre personnage, des points d’XP vous seront attribués par votre MJ et vous pourrez ensuite les dépenser comme bon vous semblera pour obtenir les bonus désirés. Le détail des moyens de dépenses est décrit dans les lignes qui suivent.</p>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2>
                <titre>Dépenser de l'expérience</titre>
                <content>
                  <p>
                    Pour que votre personnage puisse évoluer, il vous faudra dépenser les points d’XP durement acquis, parfois au prix de mille et une souffrance inculquée par votre MJ. Alors pour pouvoir vous venger sur les PNJ qui vous seront donnés d’affronter, il existe
                    trois possibilités de dépense de votre XP.
                  </p>
                  <bloc-3>
                    <titre>Les capacités légendaires</titre>
                    <content>
                      <p>
                        La première et la plus courante, obtenir une nouvelle capacité légendaire ou bien monter d’un niveau une capacité légendaire déjà maîtrisée. Chaque nouvelle capacité légendaire ajoutée (ou montée de niveau) vous coûtera
                        <b>6 points d’XP</b>.
                        <br />N’oubliez pas que lors de la montée en niveau d’une capacité légendaire, il vous faut (dans la mesure du possible) ajouter une spécialité liée à cette capacité. N’hésitez pas à vous référer
                        à la liste des capacités légendaires pour plus d’informations.
                      </p>
                    </content>
                  </bloc-3>
                  <v-divider class="mb-3"></v-divider>
                  <bloc-3>
                    <titre>Les prouesses</titre>
                    <content>
                      <p>
                        Les prouesses vous permettront d’affiner le gameplay de votre personnage et donc de dicter exactement la manière dont vous voulez le jouer. Le système de Wyrdwalkers ne possède pas de classes de jeu permettant d’avantager les situations de combat ou sociales
                        plus qu’une autre. Les joueurs sont totalement libres de créer leur propre manière de jouer et donc d’interpréter leurs personnages, qui sera de fait amenée à évoluer au fil de ses aventures.
                        Tout nouveau niveau de prouesse vous en coûtera
                        <b>3 points d’XP</b>. Pour plus d’informations au sujet des prouesses, n’hésitez
                        pas à consulter la section adéquate.
                      </p>
                    </content>
                  </bloc-3>
                  <v-divider class="mb-3"></v-divider>
                  <bloc-3>
                    <titre>Les compétences</titre>
                    <content>
                      <p>Un dernier et non des moindres, la pyramide des compétences. Il vous est possible d’en augmenter les compétences de deux manières :</p>
                      <ul class="mb-3">
                        <li>
                          Ajouter une nouvelle compétence depuis
                          <a href="#competences">la liste</a> référencée plus haut.
                        </li>
                        <li>Monter une compétence d’un étage dans la pyramide.</li>
                      </ul>
                      <p>Dans les deux cas, il vous faudra veiller à ce que la structure de la pyramide soit toujours respectée, à savoir :</p>
                      <ol>
                        <li>Le nombre de compétences à l’étage N doit être strictement inférieur à celui de l’étage N-1.</li>
                        <li>Le bonus maximal d’une pyramide est de +4 et une seule compétence peut être assignée à ce dernier étage de la pyramide.</li>
                      </ol>
                      <p>
                        Chaque nouvelle compétence ajoutée à la pyramide ou améliorée vous en coûtera
                        <b>3 points d’XP</b>. Ci-dessous, quelques explications en images.
                      </p>
                      <v-carousel class="mb-3" continuous cycle :height="carouselHeight">
                        <v-carousel-item v-for="(picture, index) in sheetsSkills" :key="index">
                          <img :src="picture" />
                        </v-carousel-item>
                      </v-carousel>
                    </content>
                  </bloc-3>
                </content>
              </bloc-2>
            </content>
          </bloc-1>
          <v-divider class="mb-3"></v-divider>
          <bloc-1>
            <titre>Quatrième étape : "y'a plus qu'à"</titre>
            <content>
              <p>Vous voilà en possession de votre personnage flambant neuf, prêt écrire sa Légende et écrire son nom dans les étoiles. Il ne vous reste plus qu’à attraper un set de dés, vous installer autour d’une table et de commencer votre aventure !</p>
            </content>
          </bloc-1>
        </div>
      </div>
      <div class="panel panel-default" id="atelier-mj">
        <div class="panel-heading">
          <h3 class="panel-title uppercase font-weight-light title">L'Atelier du Maître du Jeu</h3>
        </div>
        <div class="panel-body">
          <bloc-1>
            <titre>De nouveaux horizons</titre>
            <content>
              <p>
                Ce qui va suivre est principalement destiné aux MJ débutants et contiendra des conseils généraux sur la création de scénarios ou de campagnes. Si vous avez déjà une certaine expérience du rôle de Maître du Jeu dans un (ou plusieurs) autres univers de
                Jeu de Rôle, vous pouvez aller à la prochaine section directement. Ou alors vous pouvez lire ce qui va suivre, vous êtes libres comme la neige dans le vent.
              </p>
              <bloc-2>
                <titre>Quelques généralités</titre>
                <content>
                  <p>
                    Vous voilà parmis nous. Vous avez peut être déjà joué ou non, mais en tout cas vous êtes décidé à être MJ dans Wyrdwalkers. Mais comment faire ? Quelles pratiques mettre en place ? A quels genres de détails faut-il penser ? Les réponses arrivent. Préparez-vous,
                    vous allez passer de l’autre côté de la scène.
                  </p>
                  <bloc-3>
                    <titre>Platinum Rule</titre>
                    <content>
                      <p>
                        La toute première des choses à toujours garder en tête, c’est d’accepter qu’en définitive, l'enchaînement de péripéties qui se seront déroulées pendant votre scénario ou votre campagne raconteront
                        <b>l’histoire de vos joueurs</b>...ce
                        qui peut dévier sensiblement de ce que vous aviez prévu au départ. Vos joueurs prendront une direction que vous n’avez pas anticipé, trouveront le moyen de tuer votre boss final en cinq minutes,
                        provoqueront des révolutions dans vos villes si soigneusement préparées…
                      </p>
                    </content>
                  </bloc-3>
                  <v-divider class="mb-3"></v-divider>
                  <bloc-3>
                    <titre>Eviter la frustration</titre>
                    <content>
                      <p>
                        ...ce qui risque de provoquer en vous une certaine frustration. Après tout, ce serait compréhensible, vous aurez passé une certaine quantité d’heures à créer le monde dans lequel ils vont évoluer et voilà que tout part à la poubelle.
                        <br />Souvenez-vous, il s’agit de l’histoire de vos joueurs que vous contez, ils sont la priorité et votre rôle est de faire en sorte qu’ils s’amusent. D’autant que toute votre création n’est pas
                        forcée de partir par la fenêtre. Il peut vous être possible d’en réutiliser quelques parties , voire même la totalité. Comment le savoir ? Malheureusement, il n’y a pas de méthode particulière
                        pour ça, vous devrez vous fier à votre vision du moment présent et jauger la pertinence de l’insertion de votre création inutilisée sur le chemin des joueurs. Prenez en compte votre propre
                        expérience de joueur et demandez-vous comment vous auriez pris le fait d’être subitement et totalement contraint dans vos choix de joueur par votre MJ ? Posez-vous ensuite la question sur
                        vos joueurs : aiment-ils les histoires très guidées ou bien sont-ils plutôt adeptes de la liberté totale ? Sont ils adeptes d’une approche brutale ou veulent ils une intrigue digne d’un trône
                        de fer ? Veulent ils explorer des grands plans ou avoir une approche plus personnelles ? En clair, pour vous éviter de frustrer vos joueurs et pour éviter les risques de parachutages, il
                        vous faudra à la fois
                        <b>anticiper</b> et
                        <b>improviser</b>.
                      </p>
                    </content>
                  </bloc-3>
                  <v-divider class="mb-3"></v-divider>
                  <bloc-3>
                    <titre>Improvisation & Préparation</titre>
                    <content>
                      <p>
                        Tout scénario ou campagne se doit d’avoir un minimum de préparation. Certaines choses que vous pouvez préparer en avance sont les personnages, les lieux, les motivations, les évènements majeurs... Vous pouvez même aller plus loin en anticipant des lieux
                        de passage, les combats, répartir le butin par zones, etc. Encore une fois tout dépend de votre histoire mais aussi du niveau de préparation dont vous estimez avoir besoin (et dont vos joueurs
                        ont besoin aussi).
                        <br />Néanmoins, Wyrdwalkers, comme la mythologie, ne se fie pas à un système carré (c’est la narration qui
                        prime sur le réalisme) et est moins prévisible qu’un jeu de rôle plus “conventionnel”. Inévitablement, vous serez donc amenés à improviser. Cela peut se produire au beau milieu de la campagne
                        ou bien lors de la première scène. Et surtout, cela se passe rarement qu’une seule fois. Si vous vous sentez à l’aise avec l’improvisation, vous pouvez laisser aller votre imagination pour
                        adapter le scénario aux frasques de vos joueurs. Si ce n’est pas le cas, il n’y a rien de mal à se préparer quelques fiches maison à garder dans sa manche.
                        <br />Quelque soit votre méthode
                        privilégiée,
                        <b>être MJ demande de fournir une certaine quantité de travail</b>. Un travail dont vos joueurs ne réaliseront sans doute pas la portée (en étiez-vous conscient vous-mêmes avant
                        de faire vos débuts de MJ ?) et qui sera rarement concrétisé à 100%. Rassurez-vous tout de même, l’extrême majorité de votre travail sera vécu par vos joueurs !
                      </p>
                    </content>
                  </bloc-3>
                  <v-divider class="mb-3"></v-divider>
                  <bloc-3>
                    <titre>30 millions de joueurs</titre>
                    <content>
                      <p>
                        Il se peut, en tant que MJ, que vos plaisirs sadiques prennent vie pendant vos sessions et que vous preniez goût à faire souffrir les personnages de vos joueurs, à les placer dans des situations impossibles, à les faire craindre pour leur vie. On ne va
                        pas se mentir, tout ça fait partie des plaisirs du MJ. Tout comme un auteur de romans bien connus qui nous fait nous attacher à des personnages avant de les tuer de la manière la plus atroce
                        qui soit. Ce sont d’ailleurs ces moments dont les joueurs se souviendront le mieux. Plus vous leur ferez vivre d’émotions fortes, plus vos sessions seront appréciées.
                        <br />Seulement, il y a une condition sine qua none à tout ça : le groupe passe avant l’individu. Toujours. Si vous ne faites que frustrer votre groupe pour votre profit, l’amusement de vos sessions
                        s’en ira bien vite. Pensez toujours à récompenser vos joueurs d’une manière ou d’une autre, que ce soit leur initiative, leur inventivité voire même leur extraordinaire chance (ou malchance)
                        aux dés. N’hésitez pas à jouer avec les règles, à en oublier certaines, à en rajouter d’autres, à subitement oublier d’utiliser un pouvoir de votre PNJ pour éviter de tuer un personnage qui
                        accumule les mauvais jets de dés, etc.
                        <b>Vous êtes en total contrôle de votre environnement</b>, pour le meilleur et pour le pire. Et cela ne concerne pas que les éléments de l’histoire,
                        cela concerne aussi les personnes en face de vous. Vous êtes l’animateur de ce moment entre amis, vous contrôlez donc non seulement l’environnement imaginaire mais aussi l’environnement réel.
                        Ainsi, il vous faudra gérer les personnes en face de vous et veiller à ce qu’elles s’écoutent entre elles.
                        <br />N’oubliez pas qu’en tant que MJ, vous avez une certaine responsabilité car les
                        joueurs vous font confiance pour passer un moment de détente et d’amusement tous ensemble. Et ce sera le dernier conseil avant de vous lancer :
                        <b>tout ceci est un jeu</b> et comme tout jeu,
                        l’amusement de tous doit être la priorité en toute circonstance, qu’importe ce que les règles disent.
                      </p>
                    </content>
                  </bloc-3>
                  <v-divider class="mb-3"></v-divider>
                  <bloc-3>
                    <titre>Le mot des créateurs</titre>
                    <content>
                      <blockquote class="blockquote">
                        <i>Notre monde est composé de mythes et de narratives - nos egos, nos principes, nos espoirs et nos histoires. Etre MJ est une capacité que tout le monde possède, car la première chose que les humains ont appris est comment raconter des histoires. Laisser les joueurs créer leurs histoires, suivre le flot sans trop s’attacher au chemin voulu, est toujours important. En somme, trop de préparation et de structure est plus dangereux que pas assez ! Asseyez-vous, et faites ce que nos ancêtres font depuis que le langage existe: racontez une histoire !</i>
                        <br />
                        <span class="subtitle-1">- Emile</span>
                      </blockquote>
                      <blockquote class="blockquote">
                        <i>
                          Je fais du jeu de rôle depuis longtemps. J’ai MJ-sé et joué dans des univers variés, avec des systèmes de règles plus ou moins complexes. Être MJ, ça s’apprend. Cela demande beaucoup de qualités humaines (que vous pourrez mettre en pratique ailleurs)
                          comme savoir focaliser un groupe sur un objectif, s’adapter, prévoir mais surtout écouter. C’est par le dialogue avec vos joueurs que vous saurez ce que ensemble, vous allez créer. J’ai
                          gagné beaucoup de temps de préparation en observant mes joueurs et les meilleurs moments de session. J’ai appris que c’était finalement cette compétence qui était la plus importante :
                          être capable de revenir sur sa dernière session, se rendre compte de ce qui marche avec ce groupe de joueur ou non et s’adapter.
                        </i>
                        <br />
                        <span class="subtitle-1">- Sébastien</span>
                      </blockquote>
                      <blockquote class="blockquote">
                        <i>Ma première campagne en tant que MJ était écrite comme un jeu vidéo. J’avais tenté d’anticiper tous les chemins en restreignant les choix, à la manière d’un livre dont vous êtes le héros. Mais au bout de 5 minutes, tout l'enchaînement de la campagne était tombé à l’eau à cause d’un choix non-anticipé. Depuis je ne fonctionne quasiment qu’à l’improvisation. Je construis un cadre assez libre avec des checkpoints pour mes joueurs, ce qui donne un monde à la fois construit et qui continue de se construire à mesure que l’aventure avance. Une fois le cadre posé, ce sont les joueurs qui le peuplent.</i>
                        <br />
                        <span class="subtitle-1">- Thomas</span>
                      </blockquote>
                    </content>
                  </bloc-3>
                </content>
              </bloc-2>
            </content>
          </bloc-1>
          <v-divider class="mb-3"></v-divider>
          <bloc-1>
            <titre>Un univers de légendes</titre>
            <content>
              <p>
                Par rapport à d’autres univers de jeu de rôle, Wyrdwalkers est entièrement construit sur le
                <i>storytelling</i>. Chaque personnage, chaque lieu, chaque race et chaque faction est porteur d’un thème scénaristique
                et d’un concept. Grâce à cela, un MJ Wyrdwalkers peut choisir les éléments correspondants aux thèmes de son histoire et les faire interagir entre eux pour placer ses joueurs dans des situations particulières.
              </p>
              <p>Pour créer une histoire cohérente dans l’univers de Wyrdwalkers, un MJ doit garder quatres éléments en tête : le Destin, les 3 plans cosmiques, le Concordat de Stonehenge et la grande impasse mexicaine qui régit la situation générale de l’univers.</p>
              <bloc-2>
                <titre>Le Destin</titre>
                <content>
                  <p>
                    Le Destin est l'aspect le plus important de l'univers. Il explique pourquoi les choses sont comme elles sont, pourquoi les Dieux ne dirigent pas directement le Monde, comment on devient un Titan et ce qui lie toutes les différentes magies entre elles.
                    Bien que l'utilisation de Capacités Légendaires soit puissante en soi, les Liens du Wyrd sont une opportunité de jeu de rôle intéressante et le catalyseur de la perte de liberté d'un personnage alors
                    qu'il forge sa propre Légende en espérant devenir un Dieu sans devenir un titan en chemin. En sauvant une ville, il se peut qu’un personnage doive le faire encore et encore jusqu'à ce qu’il en devienne
                    son protecteur. En trichant à des jeux d'argent, il pourrait se retrouver à constamment perdre sans utiliser ses capacités surnaturelles… Les possibilités sont nombreuses mais le résultat final est
                    toujours le même: une fois que vous commencez à jouer avec le Destin, cette force essaiera de vous absorber, de vous enfermer dans une boite et vous faire revivre les mêmes expériences encore et
                    encore jusqu'à devenir un Titan, manifestation physique d'un concept sans libre-arbitre. Tous les êtres du Monde luttent face au Destin. Gardez vos joueurs au courant de ses implications vous permettra
                    de faire sortir des monstres au bon moment, d'adapter vos moments historiques favoris et de développer des personnages lentement mais sûrement.
                  </p>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2>
                <titre>Un univers en 3 niveaux</titre>
                <content>
                  <p>L'univers est divisé entre le Monde en-bas, l'Overworld en-haut et les Outres-Mondes entre les deux. Plus on est proche du Monde, plus violents sont les Liens du Wyrd.</p>
                  <p>
                    <b>Le Monde</b> est le lieu idéal pour une première campagne. C’est notre monde physique connu et facilement représentable dans l’imaginaire. À un niveau de Légende faible (niveau 3 ou en-dessous),
                    cela permet aux joueurs d'expérimenter leurs pouvoirs sans trop devoir plonger dans les implications politiques et les transformations de monde.
                  </p>
                  <p>
                    <b>Les Outres-Mondes</b> sont les mondes fantastiques peuplés de créatures de légendes comme les elfes ou les dragons. Ils sont plus proches des univers fantasy, ce qui vous permet de mettre en place
                    une approche plus subtile et plus spirituelle de la divinité et des mythes. Les joueurs n'ont pas à y cacher leur nature à la population, mais ont à la place à gérer la situation délicate d'être
                    des envoyés des Dieux dans des nations de Mythborns qui sont traitées comme des champs de bataille (à la fois militaire et politique) aussi bien par les Titans que les Panthéons.
                  </p>
                  <p>
                    Enfin,
                    <b>l'Overworld</b>, la dimension métaphysique où vivent les Dieux et les Titans, permet les plus grosses histoires. Il est fortement recommandé aux MJ de comprendre les implications de telles
                    campagnes du fait que l'Overworld est un lieu de concepts, d'idées et de politique ainsi que de batailles aux proportions littéralement épiques.
                  </p>
                  <p>
                    Pour finir, chaque plan communique avec les autres au moyen de portes mythiques appelées Axis Mundi, permettant de voyager entre concepts similaires: en se perdant dans la forêt Amazonienne, un être de Légende peut se retrouver dans la Forêt Noire. Cependant,
                    le moyen le plus simple et le plus sûr de voyager reste les Axes Mundorum, des portails fixes entre des mondes précis - comme le Mont Olympe.
                  </p>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2>
                <titre>Le Concordat de Stonehenge</titre>
                <content>
                  <p>Le Concordat de Stonehenge explique un peu plus pourquoi l'univers de Wyrdwalkers est comme il est.</p>
                  <p>
                    Depuis le 3ème siècle ap.J-C, les Dieux ont dû se résoudre à utiliser les Godborns pour influencer le Monde et même ces derniers ne peuvent accéder à des positions de gouvernance. Cela permet une ouverture vers l’Histoire-Fiction, où les MJ ont donc l’opportunité
                    d’expliquer les événements historiques, les individus exceptionnels et les transformations soudaines par des luttes de pouvoir entre Godborns et Sociétés Secrètes se déroulant en coulisse ou des
                    luttes face à des cultes titaniques.
                  </p>
                  <v-alert
                    outlined
                    type="info"
                    border="left"
                  >Le Concordat de Stonehenge est aussi un outil permettant aux MJ d’apporter d’immenses challenges aux joueurs tentant de contrôler des parties du Monde.</v-alert>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2>
                <titre>L'impasse mexicaine mythique</titre>
                <content>
                  <p>Les quatre forces principales de l'univers sont les les Dieux, les Mythborns, les Sociétés Secrètes et les Titans.</p>
                  <p>
                    <b>Les Dieux</b> représentent l'aspect le plus dense de l'univers: ils sont divisés et ils luttent en permanence pour plus de pouvoir et d'influence. Explorez-les graduellement, Panthéon par Panthéon,
                    il n'y a pas besoin de tous les connaitre par coeur. Presque n'importe quel concept de personnage ou idée de campagne peut être cohérent avec n'importe quel Panthéon. L’Explorateur vous permettra
                    aussi de trouver rapidement les Dieux correspondant à une certaine approche ou un certain comportement.
                  </p>
                  <p>
                    <b>Les Mythborns</b> sont un outil flexible: moins puissants que les Dieux ou les Titans, ils sont exploités et au milieu de la tourmente. Ils ne sont pas protégés par le Concordat de Stonehenge
                    et sont pourchassés. Des bêtes de somme aux elfes raffinés, ils font d'excellents alliés et/ou ennemis pour des personnage de niveau 3 à 6
                  </p>
                  <p>
                    <b>Les Sociétés Secrètes</b> sont un opposant intéressant pour les joueurs. Elles sont toujours du côté de l'humanité et la protègent avec zèle et efficacité. Bien qu'Elles manquent de puissance
                    brute, Elles sont souvent très bien connectées au monde humain et peuvent mener la vie dure à de nombreux Godborns, en particulier s'ils ont tendance à enfreindre le Concordat de Stonehenge.
                  </p>
                  <p>
                    Enfin
                    <b>les Titans</b>
                    sont les ennemis les plus évidents des Dieux. Ils sont puissants, sans relâche et fanatiques. Bien qu'un joueur puisse théoriquement jouer une engeance titanique, leur fermeture
                    d'esprit et leur absence de libre-arbitre les rend très difficiles à intégrer dans un groupe. Ils font en revanche de très bons ennemis, ils sont divers et variés en taille, forme et niveau de puissance.
                  </p>
                </content>
              </bloc-2>
            </content>
          </bloc-1>
          <v-divider class="mb-3"></v-divider>
          <bloc-1>
            <titre>Construire votre campagne</titre>
            <content>
              <p>Il y a plusieurs manières de MJ-ser une partie de jeu de rôle. Cependant, Wyrdwalkers possède quelques spécificités. Voilà donc trois conseils pour créer votre première campagne dans Wyrdwalkers.</p>
              <bloc-2>
                <titre>Être à l'écoute du groupe</titre>
                <content>
                  <p>
                    Discuter avec votre groupe de joueur de ce que vous avez envie de vivre. Voulez vous faire la campagne d’introduction ou quelque chose d’unique. A quelle époque ? Beaucoup de baston ? Gestion de guerre ? Voulez-vous que le ton soit sombre ? Ces questions
                    et bien d’autres peuvent vous orienter sur certains choix que vous ferez ensemble avant que trop de travail ne soit engagé dans la mauvaise direction.
                  </p>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2>
                <titre>Faire simple pour aller plus loin</titre>
                <content>
                  <p>
                    L'histoire d'Icare parle de fierté, celle d'Héraclès parle de rédemption, celle de Quetzacoatl du triomphe de la vie… La plupart des mythes sont extrêmement simples dans leur construction et leur histoire, mais sont porteurs de leçons intéressantes. Le
                    meilleur moyen de rendre votre histoire mythique est de rester proche de deux ou trois idées très simples (un ou deux Dieux cherchent à détruire le culte d'un Avatar, par exemple) et de réfléchir
                    au message que votre histoire porte.
                  </p>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2>
                <titre>Se limiter puis s'étendre</titre>
                <content>
                  <p>
                    N'hésitez pas à limiter vos premières campagnes à des panthéons connus, comme le Theoi Grec, le Neter Egyptien ou l'Aesir Scandinave et leurs opposants titaniques tels qu'Apophis, Aten, Kronus ou Surtr. Les créatures seront plus connues et familières,
                    ce qui permet de s’habituer plus facilement aux différentes mécaniques.
                  </p>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2>
                <titre>Ne pas avoir peur du linéaire</titre>
                <content>
                  <p>
                    Lors de vos premiers pas, vous et vos joueurs peuvent être un peu perdus entre le système de jeu et les possibilités qu'offre l'univers. Une campagne courte et linéaire conçue pour un niveau de Légende bas permet à la fois au MJ et aux joueurs de se concentrer
                    sur jouer leurs personnages RP et d'apprendre le système. La campagne d'introduction (voir plus bas) est un bon exemple d'histoire à portée "limitée" mais de qualité.
                  </p>
                </content>
              </bloc-2>
            </content>
          </bloc-1>
          <v-divider class="mb-3"></v-divider>
          <bloc-1>
            <titre>Préparer une partie</titre>
            <content>
              <p>Vous avez besoin de joueurs, d'au moins quatre dés de Fate et un D4, une feuille de personnage par joueur, un savoir raisonnable de l'univers Wyrdwalkers, un concept d'histoire et une bonne dose de préparation et d'improvisation.</p>
              <bloc-2>
                <titre>Joueuses et joueurs</titre>
                <content>
                  <p>
                    Trouver des joueurs autour de vous peut être compliqué. Si vos amis n'aiment pas l'univers ou le jeu de rôle en règle général, vous pouvez poster l'adresse du wiki sur les forums locaux de rôlistes pour inciter les gens qui s'y trouve à vous rejoindre.
                    N'hésitez pas à aller au magasin de jeux du coin pour y rencontrer des rôlistes ou à utiliser les réseaux sociaux. Il est conseillé de limiter le nombre de participants à 3 ou 4 joueurs en plus de
                    vous-même, le MJ. Vous pouvez pousser jusqu'à 5 ou 6 si vous vous sentez à l'aise avec l'univers et la gestion de groupe mais n'oubliez pas de prendre en compte les contraintes d'organisation.
                  </p>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2>
                <titre>Les personnages</titre>
                <content>
                  <bloc-3>
                    <titre>Les PJ</titre>
                    <content>
                      <p>
                        Jetez un oeil à la section
                        <a
                          href="#creation-personnage"
                        >Création de Personnage</a> pour en savoir plus sur le sujet. Il est conseillé de limiter le niveau de vos premiers joueurs pour que
                        vous puissiez tous vous familiariser avec le système et tracer votre propre route à partir de là. Essayez de définir des personnages ayant des failles, des faiblesses et un passé riche. Les
                        héros des mythes utilisent les aventures pour se définir eux-mêmes, pour changer et s'améliorer, pour faire face à leurs démons en mettant à bas des monstres et transformant le Monde.
                      </p>
                    </content>
                  </bloc-3>
                  <v-divider class="mb-3"></v-divider>
                  <bloc-3>
                    <titre>Les PNJ</titre>
                    <content>
                      <p>Souvent, il n'y a pas besoin de préparer une liste exhaustive de feuilles de personnages pour chaque PNJ que les joueurs rencontreront. Un personnage peut très vite être défini par ses aspects et ses meilleures stats. Ce qui nous amène au point suivant.</p>
                    </content>
                  </bloc-3>
                  <v-divider class="mb-3"></v-divider>
                  <bloc-3>
                    <titre>Préparation & Improvisation (encore !)</titre>
                    <content>
                      <p>
                        Il y a des centaines de guides sur le Web pour les jeunes MJ, il est recommandé d'en lire quelques-uns si vous débutez en tant que MJ. Il se ramènent très souvent à deux choses: préparation et improvisation. La préparation est la clé de la consistance
                        : en tant que MJ, vous devrez vous soucier du timing et faire en sorte que votre histoire avance (pas nécessairement dans la direction que vous voulez !).
                        <br />
                        <br />Ce que nous vous suggérons préparer :
                      </p>
                      <ul class="mb-3">
                        <li>Les lieux</li>
                        <li>Les principaux PNJ et leurs objectifs</li>
                        <li>Le nombre de camps impliqués et leur connexion entre eux</li>
                        <li>Le niveau de Légende global</li>
                        <li>La longueur approximative de votre campagne</li>
                        <li>Une opportunité pour chaque PJ dans votre campagne de briller : chacun doit se sentir utile</li>
                      </ul>
                      <p>
                        L'improvisation est le second outil du MJ, mais il ne s'acquière que d'une seule manière: la pratique. Pour l'apprendre graduellement, préparez des campagnes et des histoires qui sont, au début, très linéaires. Les actions et les objectifs peuvent être
                        définis et la manière d'y arriver ne reste qu'une histoire de stratégie. Soyez transparent avec vos joueurs : vous pouvez leur dire que la première histoire est très guidée pour que tout
                        le monde puisse prendre ses marques avec Wyrdwalkers.
                      </p>
                    </content>
                  </bloc-3>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2>
                <titre>Feuilles de personnages & dés</titre>
                <content>
                  <p>Vous trouverez les feuilles de personnage à la fin du livre. Quant aux dés ils peuvent être trouvés à peu près partout. Vous aurez besoin de dés Fudge et de D4.</p>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2>
                <titre>En connaître plus sur Wyrdwalkers</titre>
                <content>
                  <p>
                    Il est conseillé de naviguer dans le wiki pour y chercher les informations que tu cherches. La totalité de l’univers est disponible gratuitement en ligne, alors n’hésitez pas à aller y faire un tour. Parmi les pages qui peuvent vous intéresser, voici
                    une petite liste préliminaire pour vous permettre de bien démarrer :
                  </p>
                  <ul class="mb-3">
                    <li>
                      <a href="/wiki/destin" target="_blank">Destin</a>
                    </li>
                    <li>
                      <a
                        href="/wiki/concordat-de-stonehenge"
                        target="_blank"
                      >Concordat de Stonehenge</a>
                    </li>
                    <li>
                      <a href="/wiki/pantheons" target="_blank">Panthéons</a>
                    </li>
                    <li>
                      <a href="/wiki/godborn" target="_blank">Godborns</a>
                    </li>
                    <li>
                      <a href="/wiki/titans" target="_blank">Titans</a>
                    </li>
                    <li>
                      <a href="/wiki/societes-secretes" target="_blank">Sociétés Secrètes</a>
                    </li>
                  </ul>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2>
                <titre>Un concept d'histoire</titre>
                <content>
                  <p>Pour trouver une histoire dans Wyrdwalkers il ya bon nombre de moyens et ci-dessous en sont listés quelques exemples.</p>
                  <ul class="mb-3">
                    <li>
                      <b>Lire le wiki</b>
                      <br />Le wiki est rempli d'histoires cachées et trouver le dénouement à l'une d'entre elles peut se révéler une grande aventure. Pourquoi Odin a-t-il choisi Ullr comme son bras
                      droit ? Qu'est-il arrivé au livre d'Uke Mochi ? Est-ce que Mixcoatl est vraiment en liberté ? Qu'est-il arrivé à l'âme d'Achille ? Vous pouvez créer tes propres réponses et bien plus encore.
                      <br />
                    </li>
                    <li>
                      <b>Réinterpréter un ancien mythe</b>
                      <br />Une jeune femme est enlevée à son mari. Il assemble une armée et déclare la guerre à la famille du kidnappeur. Peut-être que les deux camps sont des organisations
                      de la pègre, ou même des Panthéons… Et c'est l'histoire de Troie qui recommence. Et c'est seulement un des nombreux mythes duquel vous pouvez vous inspirer. Le mythe de Ravana, les 12 travaux
                      d'Hercule, la saga de Beowulf, la mort de Maui… Vous n’avez qu’à qu'à choisir et adapter, les joueurs suivront d'eux-même les allégories et réécriront le destin.
                      <br />
                    </li>
                    <li>
                      <b>Une interaction simple</b>
                      <br />Choisissez A, B et C comme étant n'importe quelle personne ou organisation. A et B veulent obtenir quelque chose de C. A veut empêcher une alliance de B et C
                      contre lui A et B sont en guerre depuis des lustres, C veut y mettre un terme/en tirer profit A est mort/parti et laisse la place vacante pour B et C.
                      <br />
                    </li>
                    <li>
                      <b>Un peu de philosophie</b>
                      <br />Vous pouvez partir d'une question existentielle, c'est la manière la plus compliquée mais la plus fidèle aux mythes. Les mythes étaient racontés pour expliquer
                      le monde et la place des humains en son sein. Quelle morale voulez-vous que votre aventure véhicule ? Par exemple, si vous voulez raconter comment "La Plume est plus forte que l'Épée", pourquoi
                      pas faire s'affronter les forces de Coeus et d'Arès ? Ou bien Bragi affrontant les armées de Surtr ? Les possibilités sont sans limites.
                    </li>
                  </ul>
                </content>
              </bloc-2>
            </content>
          </bloc-1>
          <v-divider class="mb-3"></v-divider>
          <bloc-1>
            <titre>Gérer vos parties</titre>
            <content>
              <bloc-2>
                <titre>Le Role Play avant les dés</titre>
                <content>
                  <v-alert outlined type="success" border="left">
                    <b>Wyrdwalkers c'est du RP avant d'être du jet de dés.</b>
                  </v-alert>
                  <p>
                    Le système Wyrdwalkers est relativement léger : les actions sont déterminées en un seul jet de dés (ou deux en cas d’opposition). Créer des aspects qui enrichissent l'histoire et les descriptions est la clé, cela permet d'accomplir des actions de plus
                    en plus grandioses. Les joueurs qui préféreront se concentrer sur l'efficacité plutôt que sur la narration s'attireront des problèmes. Souvenez-vous que le Destin rattrape toujours l'arrogant qui
                    pense lui échapper.
                  </p>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2>
                <titre>Le coeur de l'univers</titre>
                <content>
                  <p>
                    Cet univers est un grand mélange de plusieurs mythologies, mais le thème principal reste le Destin, l'histoire qui se répète, les individus défiant les anciennes pratiques, les civilisations allant de l'avant… Ce n'est pas un univers propice aux histoires
                    traitant de guerres corporatistes, de survie post-apocalyptic ou d'intelligence artificielle. Les mythes nous entourent littéralement, il y a donc suffisamment de matériel où puiser. Le bâtiment
                    le plus ancien de votre ville qui se révèle être un passage vers un Outre-Monde, une légende urbaine comme opposant principal ou une figure historique célèbre se révélant être un Godborn peuvent
                    inciter vos joueurs à s'investir dans votre histoire.
                  </p>
                </content>
              </bloc-2>
              <v-divider class="mb-3"></v-divider>
              <bloc-2>
                <titre>C'est un jeu</titre>
                <content>
                  <p>
                    Comme cela a été dit plus haut, le jeu de rôle...est un jeu. Cela signifie qu'une clé première de l'univers reste l'amusement prime sur la congruence. Wyrdwalkers parle d'explorer les anciens mythes et légendes, leur donner de nouvelles interprétations.
                    Mais au milieu de tout ça, Wyrdwalkers c'est aussi taper sur du Titans, tromper des Dragons et trouver la destinée d'un héros. Si le besoin s'en fait sentir, n'hésitez pas à adapter l'univers pour
                    appâter vos joueurs un peu plus.
                  </p>
                </content>
              </bloc-2>
            </content>
          </bloc-1>
          <v-divider class="mb-3"></v-divider>
          <p>
            Avec tous ces éléments, vous voilà paré à tenter l’expérience du MJ dans Wyrdwalkers ! Pour vous aider à prendre pied dans cette nouvelle aventure, un scénario et une campagne d’introduction sont disponibles pour vous sur le site. N’hésitez pas à les
            faire jouer pour vous entrainer ou bien tout simplement pour faire découvrir l’univers à vos amis.
          </p>
        </div>
      </div>
      <div class="panel panel-default" id="glossaire">
        <div class="panel-heading">
          <h3 class="panel-title uppercase font-weight-light title">Glossaire</h3>
        </div>
        <div class="panel-body">
          <bloc-1>
            <titre>Les usuels</titre>
            <content>
              <p>
                <u>MJ :</u> Le Maitre du Jeu. La personne qui vous a tous réuni (ou piégés) pour vous faire souffrir mille tourments entre ses fils de marionnettiste. En bonus, il est aussi là pour vous faire vivre une
                histoire dont vous êtes les héros. Mais de manière générale, le MJ a tout pouvoir sur le temps de jeu, les règles, les jets de dés et toutes les interactions des personnages. Il est basiquement votre dieu
                et maître. Gloire au MJ !
                <br />Pro tip : ne faites jamais (jamais !) confiance à votre MJ.
              </p>
              <p>
                <u>PJ :</u> Personnage Joueur. Comme son nom l’indique, il s’agit d’un personnage incarné par un joueur.
              </p>
              <p>
                <u>PNJ :</u> Personnage Non-Joueur. Personnage incarné par le MJ.
              </p>
              <p>
                <u>Scénario :</u> Partie de jeu de rôle classique comportant quelques scénes et réalisée en une seule fois. Suivant les joueurs, la durée de ces parties peuvent varier d’une paire d’heures à une dizaine
                d’heures.
              </p>
              <p>
                <u>Campagne :</u> Enchainement de plusieurs scénarios. Il n’y a pas vraiment de limite sur la durée d’une campagne si ce n’est celle de vos joueurs. Une campagne se déroule généralement sur plusieurs sessions.
              </p>
              <p>
                <u>XP :</u> Diminutif d’Expérience. Ces points symbolisent l’évolution d’un personnage et permettent, en les dépensant, d’acquérir de nouvelles caractéristiques, que ce soient des pouvoirs ou des compétences.
              </p>
            </content>
          </bloc-1>
          <v-divider class="mb-3"></v-divider>
          <bloc-1>
            <titre>Les spécifiques à Wyrdwalkers</titre>
            <content>
              <p>
                <u>Cabale :</u> Une Société Secrète répandue dans le monde entier et basée sur l’occultisme et les magies peu recommandables. ses membres sont en général les parias de toutes les sociétés humaines de par
                le monde.
              </p>
              <p>
                <u>Cercle de Merlin :</u> Une Société Secrète héritière de Merlin et des Chevaliers de la Table Ronde. Très proches de la nature et des mythborns, ils font office de Police du Concordat de Stonehenge, n’hésitant
                pas à traquer les envoyés des dieux ou les titans qui essaient de l’enfreindre.
              </p>
              <p>
                <u>Concordat de Stonehenge :</u> Immense pacte réalisé par Merlin et les dieux devant le Destin. Il interdit les dieux de venir sur le monde en personne et à leurs enfants d’occuper des positions de pouvoir
                suprême dans les sociétés humaines. Il définit aussi des zones d’influence sur le monde délimitées pour chaque panthéon avec interdiction d’envahir celles d’un panthéon voisin. Des zones neutres, comme Las
                Vegas, ont été prévues pour laisser aux dieux le loisir de s’adonner à leurs luttes d’influence.
              </p>
              <p>
                <u>Destin :</u> Force incontournable de l’Univers, le Destin est ce qui guide les personnages vers la Légende qu’ils contribuent à écrire. Pour le Destin, le passé, le présent et le futur ne forment qu’une
                seule et même histoire, inconnue mais pourtant déjà racontée mille fois.
              </p>
              <p>
                <u>Engeances titaniques :</u> Les enfants des Titans. Eux-même des Titans, leur puissance ne rivalise pas avec celle de leurs créateurs mais ils incarnent tout de même comme eux des concepts sous forme physique.
              </p>
              <p>
                <u>Godborns :</u> Enfants de l’union d’un dieu ou d’une déesse avec un humain (ou une humaine, les dieux ne sont pas regardants là-dessus), ils constituent la vaste majorité des forces d’intervention des
                dieux sur le monde.
              </p>
              <p>
                <u>Grands Sages :</u> Anomalies du Destin issues de l’interférence des dieux avec le monde, les Grands Sages sont des humains éveillés possédant des pouvoirs cosmiques phénoménaux pouvant rivaliser avec
                ceux des dieux. Chaque passage d’un Grand Sage a bouleversé la marche du monde. Le dernier d’entre eux était Merlin, il était précédé de personnalités comme Gautama Bouddha, Jésus, Zoroastre ou encore Moïse.
              </p>
              <p>
                <u>Kami :</u> Entité incarnant le matériel. Les kamis sont les “âmes” des objets et des animaux.
              </p>
              <p>
                <u>Illuminati :</u> Une Société Secrète fondée par le Roi Salomon et reprise par les Phéniciens, axée sur le business. Sexe, Drogues et Rockefeller est leur mot d’ordre et leur organisation cellulaire traite
                avec n’importe quelle entité du moment que le profit est à la clé.
              </p>
              <p>
                <u>Légende :</u> Du latin legenda, “qui mérite d’être lu”. La Légende est la principale source de magie de Wyrdwalkers, car les légendes sont ce qui fait avancer le monde et les sociétés dans un chemin ou
                un autre. Créer de la Légende est le but ultime du Destin.
              </p>
              <p>
                <u>Monde :</u> Le plan cosmique physique où vivent les hommes. Principalement centré sur la Terre, l’univers physique en fait également partie, simplement dépourvu de Légende. Cette dernière étant créée
                par les créatures des mythes, elle se concentre principalement sur Terre.
              </p>
              <p>
                <u>Mythborn :</u> Ce sont les créatures des contes et des folklores de par le monde. Les dragons, les elfes, les trolls, les djinns,...tous sont des Mythborns et tous représentent une facette de la Nature.
                Chaque Mythborn renferme en lui un kami.
              </p>
              <p>
                <u>Ordre du Poing de Jade :</u> Une Société Secrète fondée par Gautama Bouddha axée sur la prouesse martiale. Originellement implantée en Asie, elle est aujourd'hui ramifiée dans le monde entier et implantée
                dans les ordres martiaux passés ou présents.
              </p>
              <p>
                <u>Outres-Mondes :</u> Plans d’existence à l’intersection entre le Monde et l’Overworld. Les Outres-Mondes sont la barrière permettant la séparation entre le monde physique et le monde des dieux et des titans.
                C’est là qu’habitent les différentes espèces de Mythborns. La Forêt Noire, Shambhala ou Fairie en sont des exemples.
              </p>
              <p>
                <u>Overworld :</u> Le plan cosmique abritant les dieux et les titans. Plan métaphorique par excellence, tout n’y est que concept et métaphore. Un humain ou un être légendaire d niveau inférieur à 5 ne pourrait
                pas y survivre.
              </p>
              <p>
                <u>Royaumes Divins :</u> Lieux de rassemblement des panthéons. Chacun possède le sien, généralement conquis sur le territoire d’un Titan en particulier. L’Olympe pour les dieux grecs, Asgard pour les dieux
                scandinaves ou encore Aunu pour les dieux égyptiens sont des Royaumes Divins.
              </p>
              <p>
                <u>Royaumes Titaniques :</u> Fragments de l’Overworld, chaque Royaume Titanique incarne un concept général. Aether incarne celui de la Lumière, Océanus celui de l’Eau et des Océans, Muspelheim celui du feu
                et de la Chaleur,... Chaque Royaume Titanique abrite plusieurs Titans majeurs chacun incarnant un concept principal du Royaume auquel ils appartiennent. Aten incarne la Brillance de la Lumière, Tiamat incarne
                la Vie portée par l’Eau et Surtr incarne la Destruction par le Feu.
              </p>
              <p>
                <u>Titans :</u> Aussi appelés Avatars, les Titans sont des concepts majeurs sous forme physique. Ce ne sont pas seulement des êtres fanatiquement axés sur leur concept, ils sont le concept qu’ils incarnent.
              </p>
              <p>
                <u>Wyrd :</u> Le Wyrd est le nom scandinave désignant la Toile du Destin. C’est un plan cosmique particulier où tout ce qui existe cherche à créer des liens avec ce qui l’entoure.
              </p>
              <p>
                <u>Wyrdborns :</u> Enfants de l’union entre un dieu (ou une déesse) et un Mythborn. Bien qu’intrinsèquement puissants, les Wyrdborns possèdent moins de marges d’évolutions que leurs cousins Godborns. Ainsi,
                les rares Wyrdborns devenant des dieux sont généralement moins puissants qu’un dieu d’origine humaine.
              </p>
            </content>
          </bloc-1>
        </div>
      </div>
    </v-card>
    <div class="float-fixed">
      <v-btn fab dark color="red" absolute right top @click.stop=" showDrawer = !showDrawer">
        <v-icon>view_list</v-icon>
      </v-btn>
    </div>
    <v-navigation-drawer right bottom v-model="showDrawer" fixed temporary dark color="black">
      <v-list dense rounded>
        <v-list-item link href="#introduction">
          <v-list-item-icon>
            <v-icon small>fa-comments</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Introduction</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="#jets">
          <v-list-item-icon>
            <v-icon small>fa-dice-d20</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Les jets</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="#competences">
          <v-list-item-icon>
            <v-icon small>fa-database</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Compétences</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="#aspects">
          <v-list-item-icon>
            <v-icon small>fa-tasks</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Les aspects</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="#points-destin">
          <v-list-item-icon>
            <v-icon small>fa-certificate</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Points du Destin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="#combats">
          <v-list-item-icon>
            <v-icon small>fa-ambulance</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Les combats</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="#prouesses">
          <v-list-item-icon>
            <v-icon small>fa-balance-scale</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Les prouesses</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="#pouvoirs">
          <v-list-item-icon>
            <v-icon small>fa-bolt</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Capacités légendaires</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="#liens-wyrd">
          <v-list-item-icon>
            <v-icon small>fa-globe</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Liens du Wyrd</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="#niveaux-legende">
          <v-list-item-icon>
            <v-icon small>fa-layer-group</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Niveaux de Légende</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="#creation-personnage">
          <v-list-item-icon>
            <v-icon small>fa-users-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Création de personnage</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="#atelier-mj">
          <v-list-item-icon>
            <v-icon small>fa-id-badge</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Atelier du MJ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="#glossaire">
          <v-list-item-icon>
            <v-icon small>fa-bookmark</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Glossaire</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";

export default Vue.extend({
  name: "Rules",
  computed: {
    carouselHeight: function() {
      return this.$vuetify.breakpoint.xs ? "413px" : "650px";
    }
  },
  data: () => ({
    showDrawer: false,
    sheets: [
      "http://localhost:8080/ressources/regles/Diapositive1.PNG",
      "http://localhost:8080/ressources/regles/Diapositive2.PNG",
      "http://localhost:8080/ressources/regles/Diapositive3.PNG",
      "http://localhost:8080/ressources/regles/Diapositive4.PNG",
      "http://localhost:8080/ressources/regles/Diapositive5.PNG",
      "http://localhost:8080/ressources/regles/Diapositive6.PNG",
      "http://localhost:8080/ressources/regles/Diapositive7.PNG",
      "http://localhost:8080/ressources/regles/Diapositive8.PNG"
    ],
    sheetsSkills: [
      "http://localhost:8080/ressources/regles/Diapositive9.PNG",
      "http://localhost:8080/ressources/regles/Diapositive10.PNG",
      "http://localhost:8080/ressources/regles/Diapositive11.PNG"
    ]
  })
});
</script>