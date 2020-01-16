<template>
  <div class="pa-3" id="app-content-custom">
    <v-card max-width="1000" class="mx-auto" v-if="assoHistory.length > 0">
      <v-card-title class="title">Historique de l'association</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <article class="mb-10" v-for="(history,index) in assoHistory" :key="index">
          <h3>{{new Date(history.date).toLocaleDateString()}}</h3>
          <p class="body-2 font-weight-light">{{history.title}}</p>
          <v-divider class="my-3"></v-divider>
        </article>
      </v-card-text>
    </v-card>
    <div v-else>
      <v-alert
        border="top"
        colored-border
        type="info"
        elevation="2"
        width="100%"
      >Wyrdwalkers n'a pas d'historique pour le moment</v-alert>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import AssoHistory from "../../../model/AssoHistory.model";

export default Vue.extend({
  name: "Activites",
  created: function() {
    this.fetchAssoHistory();
  },
  computed: {
    assoHistory: {
      get: function() {
        return store.getters.assoHistory;
      },
      set: function(newValues: AssoHistory[]) {
        store.commit("setAssoHistory", newValues);
      }
    }
  },
  methods: {
    fetchAssoHistory: function() {
      store.dispatch("fetchAssoHistory");
    }
  },
  data: () => ({}),
  metaInfo: {
    title: "Historique",
    link: [
      {rel: "canonical", href: "https://wyrdwalkers.com/home/association-history"},
      {rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico"}
    ],
    meta:[
      {name: "description", content: "<historique de la vie de l'association Wyrdwalkers"},
      {name: "keywords", content: "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons,historique,vie associative"},
      {name: "author", content: "Thomas Gely"},
      {property: "og:url", content: "https://wyrdwalkers.com/home/association-history"},
      {property: "og:type", content: "website"},
      {property: "og:description", content: "Ce qu'il s'est passé dans l'association Wyrdwalkers"},
      {property: "og:image", content: "https://i.imgur.com/xSW0VL0.png"}
    ]
  }
});
</script>