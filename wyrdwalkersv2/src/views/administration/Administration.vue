<template>
  <div>
    <router-view />
    <v-navigation-drawer v-model="contextDrawer" app clipped color="black" dark bottom>
      <v-divider color="white"></v-divider>
      <v-list>
         <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Wiki</v-list-item-title>
          </template>
          <v-list-item :to="{name:'wikiPages'}">
            <v-list-item-title>Gestion du contenu</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{name:'wikiRedirections'}">
            <v-list-item-title>Gestion des redirections</v-list-item-title>
          </v-list-item>
         </v-list-group>
         <v-list-item>
            <v-list-item-title>Timelines</v-list-item-title>
          </v-list-item>
        <v-list-item>
          <v-list-item-title>Activités</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Evènements JDR</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Ateliers</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Historique association</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Test de personnalité</v-list-item-title>
        </v-list-item>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Character Makers</v-list-item-title>
          </template>
          <v-list-item>
            <v-list-item-title>Approches</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Domaines</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Personnalités</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Panthéons</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Capacités légendaires</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item>
          <v-list-item-title>Utilisateurs</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";
import SiteSection from "../../model/enums/SiteSection.enum";
import User from "../../model/User.model";

export default Vue.extend({
  name: "Admin",
  computed: {
    contextDrawer: {
      get: function() {
        return store.getters.contextDrawer;
      },
      set: function(open: boolean) {
        store.commit("setContextDrawer", open);
      }
    }
  },
  data: () => ({})
});
</script>