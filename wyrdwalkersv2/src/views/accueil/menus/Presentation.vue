<template>
  <div class="pa-3" id="app-content-custom">
    <v-parallax dark src="@/assets/ParallaxAccueil.png" eager>
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-2 font-weight-thin mb-4">WYRDWALKERS</h1>
          <h3 class="headline">Devenez une Légende</h3>
        </v-col>
      </v-row>
    </v-parallax>
    <v-row align="center" class="pa-3 pb-0">
      <v-alert
        border="top"
        colored-border
        type="info"
        elevation="2"
        width="100%"
      >Wyrdwalkers est une association loi 1901 visant à promouvoir la découverte de la mythologie par l'intermédiaire d'activités axées sur l'imaginaire, le ludique et la pédagogie</v-alert>
    </v-row>
    <v-row align="center">
      <v-col cols="12" sm="6" md="3">
        <v-card height="270">
          <v-card-title class="title justify-center">Ludique</v-card-title>
          <v-divider></v-divider>
          <v-card-text
            class="subtitle text-center"
          >Dotée d'un univers de Jeu de Rôle complet et open-source regroupant 12 panthéons, plus de 300 divinités et 700 fiches détaillées, Wyrdwalkers vise à faire découvrir la mythologie avant tout par le jeu</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card height="270">
          <v-card-title class="title justify-center">Pédagogique</v-card-title>
          <v-divider></v-divider>
          <v-card-text
            class="subtitle text-center"
          >Au travers d'ateliers découverte sur les sujets de la mythologie ou du Jeu de Rôle, Wyrdwalkers pose des bases permettant à ceux et celles désirant plonger dans les contes éternels de la mythologie de s'y adonner et d'y trouver leurs propres aventures</v-card-text>
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
          >Basée sur l'étude des mythologies du monde entier, Wyrdwalkers place celle-ci au coeur de ses activités</v-card-text>
        </v-card>
      </v-col>
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
    title: "Wyrdwalkers - Présentation",
    meta:[
      {name: "description", content: "Présentation de l'association Wyrdwalkers"},
      {name: "keywords", content: "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons"},
      {name: "author", content: "Thomas Gely"},
      {property: "og:url", content: "https://wyrdwalkers.com/home/presentation"},
      {property: "og:type", content: "website"},
      {property: "og:description", content: "Présentation de l'association Wyrdwalkers"},
      {property: "og:image", content: "https://i.imgur.com/xSW0VL0.png"}
    ]
  }
});
</script>