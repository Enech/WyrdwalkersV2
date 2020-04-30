<template>
  <div class="pa-3">
    <rules-vf v-if="$i18n.locale == 'fr'" />
    <rules-vo v-else />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import RulesVF from "../../../components/rotg/RulesVF.vue"
import RulesVO from "../../../components/rotg/RulesVO.vue"

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
    title: "ROTG - Les règles",
    link: [
      {rel: "canonical", href: "https://wyrdwalkers.com/rotg/rules"},
      {rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico"}
    ],
    meta:[
      {name: "description", content: "Les règles du jeu Rise of the Gods"},
      {name: "keywords", content: "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons,rpg,jdr,dice,rules,gameplay"},
      {name: "author", content: "Thomas Gely"},
      {property: "og:url", content: "https://wyrdwalkers.com/rotg/rules"},
      {property: "og:type", content: "website"},
      {property: "og:description", content: "Incarnez un des 12 panthéons de l'univers Wyrdwalkers et battez-vous contre les Titans pour reconquérir le Cosmos !"},
      {property: "og:image", content: "https://i.imgur.com/xSW0VL0.png"}
    ]
  }
});
</script>