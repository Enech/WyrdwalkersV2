<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>Nous contacter</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="3">
            <iframe src="https://discordapp.com/widget?id=664897836806307945&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe>
            <v-divider class="my-3"></v-divider>
            <v-btn
              dark
              href="https://www.facebook.com/wyrdwalkers"
              target="_blank"
              color="blue darken-3"
            >Sur notre page facebook</v-btn>
            <v-divider class="my-3"></v-divider>
            <div class="title font-weight-light">Par email</div>
            <div class="subtitle-1">
              A l'adresse
              <a
                href="mailto:mastersoffate@wyrdwalkers.com"
              >mastersoffate@wyrdwalkers.com</a>
            </div>
            <v-divider class="my-3"></v-divider>
            <div class="title font-weight-light">Par courrier (ou pigeon voyageur)</div>
            <div class="subtitle-1">
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

export default Vue.extend({
  name: "Contact",
  data: () => ({
  }),
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