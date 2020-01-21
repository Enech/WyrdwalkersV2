<template>
  <div class="pa-3" id="app-content-custom">
    <v-parallax dark src="@/assets/ParallaxAccueil.webp" eager :height="250">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-light mb-4">{{$t("home.contents.presentation.title")}}</h1>
          <h3 class="headline font-weight-thin">{{$t("home.contents.presentation.subtitle")}}</h3>
          <v-btn color="white" class="mt-3" outlined href="https://discord.gg/tjqrwJ" target="_blank">{{$t("home.contents.presentation.discord")}}</v-btn>
        </v-col>
      </v-row>
    </v-parallax>
    <v-row align="center">
      <v-col cols="12" sm="6" md="3">
        <v-card height="270">
          <v-card-title class="title justify-center">{{$t("home.contents.presentation.playful.title")}}</v-card-title>
          <v-divider></v-divider>
          <v-card-text
            class="subtitle text-center"
          >{{$t("home.contents.presentation.playful.text")}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card height="270">
          <v-card-title class="title justify-center">{{$t("home.contents.presentation.educational.title")}}</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="subtitle text-center">
            {{$t("home.contents.presentation.educational.text")}}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card height="270">
          <v-card-title class="title justify-center">{{$t("home.contents.presentation.questions.title")}}</v-card-title>
          <v-divider></v-divider>
          <v-card-text
            class="subtitle text-center"
          >
          {{$t("home.contents.presentation.questions.text")}}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card height="270">
          <v-card-title class="title justify-center">{{$t("home.contents.presentation.mythological.title")}}</v-card-title>
          <v-divider></v-divider>
          <v-card-text
            class="subtitle text-center"
          >{{$t("home.contents.presentation.mythological.text")}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12">
        <v-card class="pa-3">
          <v-card-title class="title font-weight-light text-justify">
            {{$t("home.contents.presentation.presentation.header")}}
          </v-card-title>
          <v-row align="center">
            <v-col cols="12" sm="6" md="4">
              <v-card color="grey lighten-3 prez-card">
                <v-card-title class="justify-center">{{$t("home.contents.presentation.presentation.afterworks.title")}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text
                  class="subtitle-1 text-justify"
                >{{$t("home.contents.presentation.presentation.afterworks.text")}}</v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn color="blue-grey" dark bottom :absolute="!isMobile" :to="{name:'murderParties'}">{{$t("home.contents.presentation.presentation.more")}}</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-card color="grey lighten-3 prez-card">
                <v-card-title class="justify-center">{{$t("home.contents.presentation.presentation.gn.title")}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text
                  class="subtitle-1 text-justify"
                >{{$t("home.contents.presentation.presentation.gn.text")}}</v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn color="blue-grey" bottom :absolute="!isMobile" dark :to="{name:'grandeurNature'}">{{$t("home.contents.presentation.presentation.more")}}</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-card color="grey lighten-3 prez-card">
                <v-card-title class="justify-center">{{$t("home.contents.presentation.presentation.workshops.title")}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text
                  class="subtitle-1 text-justify"
                >{{$t("home.contents.presentation.presentation.workshops.text")}}</v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn color="blue-grey" dark bottom :absolute="!isMobile" :to="{name:'ateliers'}">{{$t("home.contents.presentation.presentation.more")}}</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-card color="grey lighten-3 prez-card">
                <v-card-title class="justify-center">{{$t("home.contents.presentation.presentation.campaigns.title")}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text
                  class="subtitle-1 text-justify"
                >{{$t("home.contents.presentation.presentation.campaigns.text")}}</v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn color="blue-grey" dark bottom :absolute="!isMobile" :to="{name:'historiqueJdr'}">{{$t("home.contents.presentation.presentation.more")}}</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-card color="grey lighten-3 prez-card">
                <v-card-title class="justify-center">{{$t("home.contents.presentation.presentation.animations.title")}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text
                  class="subtitle-1 text-justify"
                >{{$t("home.contents.presentation.presentation.animations.text")}}</v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn color="blue-grey" dark bottom :absolute="!isMobile" :to="{name:'animations'}">{{$t("home.contents.presentation.presentation.more")}}</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-card color="grey lighten-3 prez-card">
                <v-card-title class="justify-center">{{$t("home.contents.presentation.presentation.triangle.title")}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text
                  class="subtitle-1 text-justify"
                >{{$t("home.contents.presentation.presentation.triangle.text")}}v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn color="blue-grey" dark bottom :absolute="!isMobile">{{$t("home.contents.presentation.presentation.soon")}}</v-btn>
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
      >{{$t("home.contents.presentation.presentation.message")}}</v-alert>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";

export default Vue.extend({
  name: "Presentation",
  data: () => ({}),
  computed: {
    isMobile: function() {
      return this.$vuetify.breakpoint.xs;
    }
  },
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

<style scoped>
.prez-card {
  height: 375px;
}

@media (max-width: 600px) {
  .prez-card {
    height: auto;
  }
}
</style>