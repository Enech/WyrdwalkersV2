<template>
  <div>
    <router-view />
    <v-navigation-drawer v-model="contextDrawer" app clipped color="black" dark bottom>
      <template v-slot:prepend>
        <v-divider color="white"></v-divider>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title></v-list-item-title>
            <v-list-item-subtitle>
              <v-btn small text>
                <v-icon small left>fa-user-plus</v-icon>
                <span class="hidden-xs-only">S'inscrire</span>
              </v-btn>
              <v-btn small text>
                <v-icon left small>fa-sign-in-alt</v-icon>
                <span class="hidden-xs-only">Connexion</span>
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider color="white"></v-divider>
      <v-list>
        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>L'association</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item :to="{name:'presentation'}">
            <v-list-item-title>Accueil</v-list-item-title>
            <v-list-item-action>
              <v-icon small>fa-lightbulb</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item :to="{name:'join'}">
            <v-list-item-title>Nous rejoindre</v-list-item-title>
            <v-list-item-action>
              <v-icon small>fa-map</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Activités</v-list-item-title>
            <v-list-item-action>
              <v-icon small>fa-rss</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item :to="{name:'status'}">
            <v-list-item-title>Fonctionnement</v-list-item-title>
            <v-list-item-action>
              <v-icon small>fa-cog</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Historique</v-list-item-title>
            <v-list-item-action>
              <v-icon small>fa-book</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item-title>Evènements proposés</v-list-item-title>
          </template>
          <v-list-item :to="{name:'murderParties'}">
            <v-list-item-title>Soirées enquêtes</v-list-item-title>
            <v-list-item-action>
              <v-icon small>fa-search</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Ateliers</v-list-item-title>
            <v-list-item-action>
              <v-icon small>fa-gamepad</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Historique</v-list-item-title>
            <v-list-item-action>
              <v-icon small>fa-book</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Historique JDR</v-list-item-title>
            <v-list-item-action>
              <v-icon small>fa-scroll</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
        <v-list-item>
          <v-list-item-title>Test de personnalité</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";

export default Vue.extend({
  name: "Accueil",
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