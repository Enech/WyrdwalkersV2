<template>
  <div class="pa-3" id="app-content-custom">
    <v-parallax dark src="@/assets/ParallaxAccueil.webp" eager :height="250">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-light mb-4">WYRDWALKERS</h1>
          <h3 class="headline font-weight-thin">L'association qui mélange mythologie et jeu de rôle</h3>
          <v-btn color="white" outlined icon><v-icon left>fa-discord</v-icon></v-btn>
        </v-col>
      </v-row>
    </v-parallax>
    <v-row align="center">
      <v-col cols="12" sm="6" md="3">
        <v-card height="270">
          <v-card-title class="title justify-center">Ludique</v-card-title>
          <v-divider></v-divider>
          <v-card-text
            class="subtitle text-center"
          >Dotée d'un univers de Jeu de Rôle complet et open-source regroupant 12 panthéons, plus de 300 divinités et 700 fiches détaillées, Wyrdwalkers vise à faire découvrir la mythologie avant tout par le jeu et l'imaginaire.</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card height="270">
          <v-card-title class="title justify-center">Pédagogique</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="subtitle text-center">
            Au travers d'ateliers découverte sur les sujets de la mythologie, du Jeu de Rôle ou du
            <i>Storytelling</i>, Wyrdwalkers pose des bases permettant à ceux et celles désirant plonger dans les contes éternels que sont les mythes de s'y adonner et d'y trouver leurs propres légendes pour les partager et les faire vivre
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card height="270">
          <v-card-title class="title justify-center">Pour questionner</v-card-title>
          <v-divider></v-divider>
          <v-card-text
            class="subtitle text-center"
          >Dotée d'un système d'analyse des philosophies, Wyrdwalkers est un espace de questionnements. La musique est-elle divine ou humaine ? Est-ce naturel de rechercher l'immortalité ? Autant de questions sur lesquelles il est possible de réfléchir en groupes ou bien à travers le Jeu de Rôle</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card height="270">
          <v-card-title class="title justify-center">Mythologique</v-card-title>
          <v-divider></v-divider>
          <v-card-text
            class="subtitle text-center"
          >Basée sur l'étude de mythologies du monde entier, Wyrdwalkers place les mythes et les légendes au coeur de ses activités.</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12">
        <v-card class="pa-3">
          <v-card-title
            class="title font-weight-light justify-center"
          >Wyrdwalkers s'applique à montrer l'omniprésence des mythes. Par le jeu de rôle, certes, mais pas que. En vrai, Wyrdwalkers c'est tout ça :</v-card-title>
          <v-row align="center">
            <v-col cols="12" sm="6" md="4">
              <v-card color="grey lighten-3">
                <v-card-title class="justify-center">Campagnes de JDR</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="subtitle-1 text-justify">
                  De purs moments de détente entre amis à taper du Titan et démanteler des cultes de nécromanciens. Vivez la mythologie comme si vous y êtiez, avec son lot d'épique et de puissance
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn color="blue-grey" dark>En savoir plus</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-card color="grey lighten-3">
                <v-card-title class="justify-center">Murder Parties Grandeur Nature</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="subtitle-1 text-justify">
                  Du jeu de rôle, mais Grandeur Nature cette fois. Participez à des évènements d'envergure plusieurs fois par an et contribuez à forger le multivers Wyrdwalkers. Que vous participiez à la chute de l'Atlantide, à la mort du Roi Arthur ou à la découverte du Nouveau Monde, vos actions resteront inscrites pour toujours dans la Légende.
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn color="blue-grey" dark>En savoir plus</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-card color="grey lighten-3">
                <v-card-title class="justify-center">Ateliers de storytelling</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="subtitle-1 text-justify">
                  Des mythes, un format et l'envie de remettre au goût du jour une ancienne légende. Les ateliers de Storytelling vous permettent d'apprendre à construire une histoire, à bâtir vos propres mythes pour ensuite les partager. Que vous soyiez plutôt roman, pièce de théâtre ou créateur de jeu comme des escape games, vous repartirez clés en main pour exploiter la puissance des mythes.
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn color="blue-grey" dark>Bientôt...</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-card color="grey lighten-3">
                <v-card-title class="justify-center">Afterworks soirées enquêtes</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="subtitle-1 text-justify">
                  Envie de découvrir qui se cache derrière la mort d'Hadès ? Ou encore qui a assassiné le Roi Arthur ? Le tout entre amis, entre collègues ou en famille ? Wyrdwalkers vous propose d'animer pour vous des "soirées" enquêtes (murder parties). Convient aussi bien aux familles en quête de divertissement qu'aux équipes en recherche de détente. Entre 5 et 20 joueurs.
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn color="blue-grey" dark>En savoir plus</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-card color="grey lighten-3">
                <v-card-title class="justify-center">Animations (Lyon)</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="subtitle-1 text-justify">
                  Wyrdwalkers est une association lyonnaise et le jeu de rôle est notre terrain d'expression favori. Vous pourrez nous trouver à des évènements tels que le festival Yggdrasil ou encore Octogônes. Nos MJ se feront un plaisir de vous accueillir à leur table pour vous initier au jeu de rôle et/ou à l'univers Wyrdwalkers
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn color="blue-grey" dark>En savoir plus</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-card color="grey lighten-3">
                <v-card-title class="justify-center">Une analyse humaine</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="subtitle-1 text-justify">
                  Pour écrire l'univers de Wyrdwalkers et le rendre cohérent, ses créateurs ont étudié plus d'une dizaine de mythologies. De cette étude est née un modèle d'analyse de la condition humaine, directement inspirée des cultures et civilisations qui nous ont précédé. Ce modèle, décrivant les trois grands paradoxes auxquels tout humain fait face, nous permet de de comprendre les "fictions utiles" qui nous entourent pour mieux les maitriser et en inventer de nouvelles.
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn color="blue-grey" dark>Bientôt...</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" class="pa-3 pb-0">
      <v-alert
        border="top"
        colored-border
        type="info"
        elevation="2"
        width="100%"
      >Wyrdwalkers est une association loi 1901 visant à promouvoir la découverte de la mythologie par l'intermédiaire d'activités axées sur l'imaginaire, le ludique et la pédagogie</v-alert>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";

export default Vue.extend({
  name: "Presentation",
  data: () => ({}),
  metaInfo: {
    title: "Wyrdwalkers - Devenez une légende",
    link: [
      { rel: "canonical", href: "https://wyrdwalkers.com/home/presentation" },
      { rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }
    ],
    meta: [
      {
        name: "description",
        content: "Présentation de l'association Wyrdwalkers"
      },
      {
        name: "keywords",
        content:
          "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons"
      },
      { name: "author", content: "Thomas Gely" },
      {
        property: "og:url",
        content: "https://wyrdwalkers.com/home/presentation"
      },
      { property: "og:type", content: "website" },
      {
        property: "og:description",
        content: "Présentation de l'association Wyrdwalkers"
      },
      { property: "og:image", content: "https://i.imgur.com/xSW0VL0.png" }
    ]
  }
});
</script>