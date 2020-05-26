<template>
  <div class="pa-3" id="app-content-custom">
    <v-card class="pa-3">
      <v-card-text>
        <div class="display-3 text-center">
          <v-badge color="teal" content="1.1">Rise of The Gods</v-badge>
        </div>
        <div class="display-1 font-weight-thin text-center">{{$t("rotg.content.home.subtitle")}}</div>
      </v-card-text>
      <v-card-text class="subtitle-1">{{$t("rotg.content.home.presentation")}}</v-card-text>
      <v-divider></v-divider>
      <v-card-subtitle class="subtitle-1">
        <v-row>
          <v-col cols="12" sm="6">
            <span v-html="$t('rotg.content.home.description')"></span>
            <br />
            <br />
            <div class="text-center mb-3">
              <v-btn
                color="indigo lighten-1"
                class="white--text"
                href="https://discord.gg/CJf25BB"
                target="_blank"
              >{{$t("rotg.common.buttons.discord")}}</v-btn>
            </div>
            <div class="text-center">
              <v-btn
                color="blue"
                class="white--text"
                :to="{name: 'gamesROTG'}"
              >{{$t("rotg.common.buttons.goToGames")}}</v-btn>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="headline">{{$t("rotg.content.home.goal.title")}}</div>
            <div v-html="$t('rotg.content.home.goal.text')"></div>
            <br />
            <br />
            <div class="text-center">
              <v-btn
                block
                color="blue"
                class="white--text"
                :to="{name:'ROTGRules'}"
              >{{$t("rotg.common.buttons.goToRules")}}</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <span class="subtitle-1">Version 1.1</span>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import ROTGCounter from "../../../components/rotg/Counter.vue";

export default Vue.extend({
  name: "ROTGHome",
  created: function() {},
  computed: {
    currentUser: function() {
      return store.getters.currentUser;
    }
  },
  methods: {},
  data: () => ({}),
  metaInfo: {
    title: "Rise of The Gods",
    link: [
      { rel: "canonical", href: "https://wyrdwalkers.com/rotg/home" },
      { rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }
    ],
    meta: [
      {
        name: "description",
        content:
          "Le premier jeu coopératif sur navigateur se déroulant dans l'univers Wyrdwalkers"
      },
      {
        name: "keywords",
        content:
          "jeu,game,browser,navigateur,philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons"
      },
      { name: "author", content: "Thomas Gely" },
      { property: "og:url", content: "https://wyrdwalkers.com/rotg/home" },
      { property: "og:type", content: "website" },
      {
        property: "og:description",
        content:
          "Découvrez le premier jeu sur navigateur dans l'univers de Wyrdwalkers"
      },
      { property: "og:image", content: "https://i.imgur.com/GuuGCI5.png" }
    ]
  }
});
</script>