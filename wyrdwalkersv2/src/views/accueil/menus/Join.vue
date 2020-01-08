<template>
  <div class="pa-3" id="app-content-custom">
    <v-parallax dark src="@/assets/ParallaxAccueil.webp" eager>
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-2 font-weight-thin mb-4">WYRDWALKERS</h1>
          <h3 class="headline">Devenez une Légende</h3>
        </v-col>
      </v-row>
    </v-parallax>
    <v-row align="center" class="pa-3 pb-0">
      <v-card color="#292929" width="100%">
        <v-card-text class="white--text headline">Nous rejoindre</v-card-text>
      </v-card>
    </v-row>
    <iframe
      id="haWidget"
      allowtransparency="true"
      src="https://www.helloasso.com/associations/wyrdwalkers/adhesions/adhesion/widget"
      style="width:100%;height:660px;border:none;"
      onload="window.scroll(0, this.offsetTop)"
    ></iframe>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";

export default Vue.extend({
  name: "Join",
  data: () => ({}),
  metaInfo: {
    title: "Nous rejoindre",
    meta:[
      {name: "description", content: "Rejoindre l'association Wyrdwalkers"},
      {name: "keywords", content: "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons,join,rejoindre"},
      {name: "author", content: "Thomas Gely"},
      {property: "og:url", content: "https://wyrdwalkers.com/home/join"},
      {property: "og:type", content: "website"},
      {property: "og:description", content: "Rejoindre l'association Wyrdwalkers"},
      {property: "og:image", content: "https://i.imgur.com/xSW0VL0.png"}
    ]
  }
});
</script>