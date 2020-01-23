<template>
  <div class="pa-3">
    <rules-vf v-if="$i18n.locale == 'fr'"/>
    <rules-vo v-else/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import RulesVF from "../../../components/rules/RulesVF.vue"
import RulesVO from "../../../components/rules/RulesVO.vue"

export default Vue.extend({
  name: "Rules",
  components: {
    "rules-vf": RulesVF,
    "rules-vo": RulesVO
  },
  computed: {
    carouselHeight: function() {
      return this.$vuetify.breakpoint.xs ? "413px" : "650px";
    }
  },
  data: () => ({}),
  metaInfo: {
    title: "Règles du jeu",
    link: [
      {rel: "canonical", href: "https://wyrdwalkers.com/wiki/rules"},
      {rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico"}
    ],
    meta:[
      {name: "description", content: "Les règles du jeu Wyrdwalkers"},
      {name: "keywords", content: "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons,rpg,jdr,dice,rules,gameplay"},
      {name: "author", content: "Thomas Gely"},
      {property: "og:url", content: "https://wyrdwalkers.com/wiki/rules"},
      {property: "og:type", content: "website"},
      {property: "og:description", content: "Vous voulez faire une partie dans l'univers de Wyrdwalkers ? Voici les règles ! Wyrdwalkers est doté d'un système de jeu privilégiant la narrative avant tout"},
      {property: "og:image", content: "https://i.imgur.com/xSW0VL0.png"}
    ]
  }
});
</script>