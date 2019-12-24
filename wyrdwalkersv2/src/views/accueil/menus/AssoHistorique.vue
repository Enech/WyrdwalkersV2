<template>
  <div class="pa-3">
    <v-card max-width="1000" class="mx-auto" v-if="assoHistory.length > 0">
      <v-card-title class="title">Historique de l'association</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <article class="mb-10" v-for="(history,index) in assoHistory" :key="index">
          <h3>{{history.title}}</h3>
          <p class="body-2 font-weight-light">{{history.date}}</p>
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
  data: () => ({})
});
</script>