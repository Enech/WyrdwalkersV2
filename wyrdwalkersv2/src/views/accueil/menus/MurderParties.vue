<template>
  <div class="pa-3">
    <v-row>
      <v-col cols="12">
        <v-expansion-panels dark :value="0">
          <v-expansion-panel class="blue white--text">
            <v-expansion-panel-header>Qu'est-ce que c'est ?</v-expansion-panel-header>
            <v-expansion-panel-content>
              <p class="subtitle-1">
                Une soirée enquête, ou murder party, est une forme de jeu de rôle grandeur nature au croisement entre le théâtre d'improvisation, le jeu d'enquête et l'aventure policière. Chaque joueur y incarne un personnage et ne connait de l'histoire que ce que son personnage en sait. Chaque personnage possède un secret, quelque chose de compromettant et parfois inavouable, qu'il doit protéger à tout prix en empêchant les autres joueurs de le découvrir. Parmi l'assemblée des joueurs se glisse presque toujours un "assassin", c'est-à-dire la personne ayant commit le méfait ayant réuni les personnages pour l'occasion. Le but principal d'une soirée enquête est donc de trouver l'assassin tout en protégeant son propre secret.
                <br />
                <br />L'association Wyrdwalkers vous propose donc de vous faire vivre ce divertissement apprécié du public mais encore rare, sous la forme de trois histoires différentes incluses dans son univers de jeu de rôle dédié. Que vous soyez entre amis, en famille ou entre collègues, vous êtes assurés de vous amuser dans des histoires où vous pourrez incarner ni plus ni moins que des dieux mythologiques.
              </p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-parallax eager dark src="@/assets/PerilCosmique.jpg" class="pa-3" height="600">
            <v-row>
              <v-col cols="12">
                <h1 class="display-2 font-weight-thin mb-4 text-center">Péril Cosmique</h1>
                <v-divider color="white" class="mb-4"></v-divider>
                <h1 class="title text-center">SYNOPSIS</h1>
                <p
                  class="mb-4"
                >Les Titans se sont échappés du Tartare, la prison des dieux. Ces derniers se réunissent en urgence pour trouver le responsable et éviter une crise à échelle cosmique.</p>
                <h1 class="title text-center">PERSONNAGES</h1>
                <p class="mb-4">
                  Horus, Artémis, Thor ou encore Amaterasu et bien d'autres seront de la partie.
                  <br />Devenez un dieu et sauvez l'univers de la menace des Titans.
                </p>
                <v-list dense color="transparent" dark>
                  <v-list-item-group>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>fa-user-friends</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="uppercase subtitle-1">De 5 à 20 joueurs</v-list-item-title>
                    </v-list-item>
                    <v-divider color="white"></v-divider>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>fa-wallet</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="uppercase subtitle-1">20€ / joueur</v-list-item-title>
                    </v-list-item>
                    <v-divider color="white"></v-divider>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>fa-clock</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="uppercase subtitle-1">Entre 2h et 3h</v-list-item-title>
                    </v-list-item>
                    <v-divider color="white"></v-divider>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>fa-map-marker-alt</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="uppercase subtitle-1">A définir ensemble</v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
          </v-parallax>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="blue-grey" href="https://www.helloasso.com/associations/wyrdwalkers/evenements/soiree-enquete-peril-cosmique" target="_blank">Réserver</v-btn>
              <v-btn dark color="blue-grey" href="https://wyrdwalkers.com/ressources/murder-parties/PerilCosmique.pdf" download>En savoir plus</v-btn>
              <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-parallax eager dark src="@/assets/HeureH2.jpg" class="pa-3" height="600">
            <v-row>
              <v-col cols="12">
                <h1 class="display-2 font-weight-thin mb-4 text-center">Heure H</h1>
                <v-divider color="white" class="mb-4"></v-divider>
                <h1 class="title text-center">SYNOPSIS</h1>
                <p
                  class="mb-4"
                >1945. L'assemblée des dieux se réunit pour découvrir lequel ou laquelle d'entre eux a bien pu donner les moyens à l'humanité de construire la bombe atomique.</p>
                <h1 class="title text-center">PERSONNAGES</h1>
                <p class="mb-4">
                  Athéna, Osiris, Raiden ou encore Baron Samedi et bien d'autres tenteront de trouver qui a conduit l'humanité sur le chemin de la destruction et pourquoi.
                  <br />Être un dieu ne vient pas sans responsabilités.
                </p>
                <v-list dense color="transparent" dark>
                  <v-list-item-group>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>fa-user-friends</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="uppercase subtitle-1">De 5 à 20 joueurs</v-list-item-title>
                    </v-list-item>
                    <v-divider color="white"></v-divider>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>fa-wallet</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="uppercase subtitle-1">20€ / joueur</v-list-item-title>
                    </v-list-item>
                    <v-divider color="white"></v-divider>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>fa-clock</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="uppercase subtitle-1">Entre 2h et 3h</v-list-item-title>
                    </v-list-item>
                    <v-divider color="white"></v-divider>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>fa-map-marker-alt</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="uppercase subtitle-1">A définir ensemble</v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
          </v-parallax>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="blue-grey" href="https://www.helloasso.com/associations/wyrdwalkers/evenements/soiree-enquete-heure-h" target="_blank">Réserver</v-btn>
              <v-btn dark color="blue-grey" href="https://wyrdwalkers.com/ressources/murder-parties/HeureH.pdf" download>En savoir plus</v-btn>
              <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-parallax eager dark src="@/assets/ArturusRex_2.jpg" class="pa-3" height="600">
            <v-row>
              <v-col cols="12">
                <h1 class="display-2 font-weight-thin mb-4 text-center">Arturus Rex</h1>
                <v-divider color="white" class="mb-4"></v-divider>
                <h1 class="title text-center">SYNOPSIS</h1>
                <p
                  class="mb-4"
                >Merlin a disparu. Le Roi Arthur et Mordred se sont entretués. Après des évènements suspects ayant conduit à la mort du Roi, la Table Ronde se réunit pour découvrir qui a bien pu orchestrer une telle machination.</p>
                <h1 class="title text-center">PERSONNAGES</h1>
                <p
                  class="mb-4"
                >Guenièvre, Lancelot, Galahad ou encore Gauvain, incarnez un des personnages de légende les plus populaires et découvrez l'envers de la Table Ronde.</p>
                <v-list dense color="transparent" dark>
                  <v-list-item-group>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>fa-user-friends</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="uppercase subtitle-1">De 5 à 20 joueurs</v-list-item-title>
                    </v-list-item>
                    <v-divider color="white"></v-divider>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>fa-wallet</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="uppercase subtitle-1">20€ / joueur</v-list-item-title>
                    </v-list-item>
                    <v-divider color="white"></v-divider>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>fa-clock</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="uppercase subtitle-1">Entre 2h et 3h</v-list-item-title>
                    </v-list-item>
                    <v-divider color="white"></v-divider>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>fa-map-marker-alt</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="uppercase subtitle-1">A définir ensemble</v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
          </v-parallax>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="blue-grey" href="https://www.helloasso.com/associations/wyrdwalkers/evenements/soiree-enquete-arturus-rex" target="_blank">Réserver</v-btn>
              <v-btn dark color="blue-grey" href="https://wyrdwalkers.com/ressources/murder-parties/ArturusRex.pdf" download>En savoir plus</v-btn>
              <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";

export default Vue.extend({
  name: "MurderParties",
  data: () => ({}),
  metaInfo: {
    title: "Soirées enquêtes",
    meta:[
      {name: "description", content: "Nos soirées enquêtes"},
      {name: "keywords", content: "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons,murder party,soirée enquête"},
      {name: "author", content: "Thomas Gely"},
      {property: "og:url", content: "https://wyrdwalkers.com/home/murder-parties"},
      {property: "og:type", content: "website"},
      {property: "og:description", content: "Pour votre plus grand divertissement, l'association Wyrdwalkers vous propose des soirées enquête (murder party) dans notre univers mythologique. Incarnez des dieux ou des personnages de légende et trouvez le traitre qui se cache parmis vous."},
      {property: "og:image", content: "https://i.imgur.com/xSW0VL0.png"}
    ]
  }
});
</script>