<template>
  <div>
    <router-view />
    <v-navigation-drawer v-model="contextDrawer" app clipped color="black" dark>
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
        <v-list-item :to="{name:'wikiTimelines'}">
          <v-list-item-title>Timelines</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name:'backofficeAnimations'}">
          <v-list-item-title>Animations</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name:'backofficeHistoriqueJDR'}">
          <v-list-item-title>Evènements JDR</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name:'backofficeAteliers'}">
          <v-list-item-title>Ateliers</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name:'backofficeHistoriqueAsso'}">
          <v-list-item-title>Historique association</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Test de personnalité</v-list-item-title>
        </v-list-item>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Character Makers</v-list-item-title>
          </template>
          <v-list-item :to="{name:'approches'}">
            <v-list-item-title>Approches</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{name:'domaines'}">
            <v-list-item-title>Domaines</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{name:'personalities'}">
            <v-list-item-title>Personnalités</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{name:'origins'}">
            <v-list-item-title>Origines</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Capacités légendaires</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{name:'backofficeExplorer'}">
            <v-list-item-title>Explorateur</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item :to="{name:'backofficeUsers'}">
          <v-list-item-title>Utilisateurs</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name:'rotgBO'}">
          <v-list-item-title>Rise of the Gods</v-list-item-title>
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
    },
    siteSection: {
      get: function(){
        return store.getters.siteSection;
      },
      set: function(section: number){
        store.commit("setSiteSection", section);
      }
    }
  },
  created: function(){
    this.siteSection = SiteSection.ADMIN;
  },
  data: () => ({})
});
</script>