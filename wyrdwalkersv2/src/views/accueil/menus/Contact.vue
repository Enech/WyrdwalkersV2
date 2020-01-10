<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>Nous contacter</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6">
            <div class="subtitle-1">Sur Discord</div>
            <div class="subtitle-2">
              <v-btn dark icon color="indigo lighten-1">
                <v-icon>fa-discord</v-icon>
              </v-btn>
            </div>
            <v-divider></v-divider>
            <div class="subtitle-1">Sur notre page Facebook</div>
            <div class="subtitle-2">
              <v-btn dark icon href="https://www.facebook.com/wyrdwalkers" target="_blank" color="blue darken-3">
                <v-icon>fa-facebook</v-icon>
              </v-btn>
            </div>
            <v-divider></v-divider>
            <div class="subtitle-1">Par email</div>
            <div class="subtitle-2">
              A l'adresse
              <a href="mailto:mastersoffate@wyrdwalkers.com">mastersoffate@wyrdwalkers.com</a>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <l-map :zoom="zoom" :center="center">
              <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
              <l-marker :lat-lng="marker"></l-marker>
            </l-map>
            <v-divider></v-divider>
            <div class="subtitle-1">Par courrier (comme les anciens)</div>
            <div class="subtitle-2">
              Chez Thomas Gely
              <br />3 rue de la Villette
              <br />69003 Lyon
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import L from "leaflet";

export default Vue.extend({
  name: "Contact",
  data: () => ({
    zoom: 13,
    center: L.latLng(45.763351, 4.86219),
    url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    marker: L.latLng(45.763351, 4.86219)
  }),
  components: { LMap, LTileLayer, LMarker },
  metaInfo: {
    title: "Contact",
    link: [
      { rel: "canonical", href: "https://wyrdwalkers.com/home/contact" },
      { rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }
    ],
    meta: [
      {
        name: "description",
        content: "Contacter l'association Wyrdwalkers"
      },
      {
        name: "keywords",
        content:
          "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons,contact"
      },
      { name: "author", content: "Thomas Gely" },
      {
        property: "og:url",
        content: "https://wyrdwalkers.com/home/contact"
      },
      { property: "og:type", content: "website" },
      {
        property: "og:description",
        content: "Contacter l'association Wyrdwalkers"
      },
      { property: "og:image", content: "https://i.imgur.com/xSW0VL0.png" }
    ]
  }
});
</script>