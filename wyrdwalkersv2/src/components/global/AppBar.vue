<template>
  <div>
    <v-app-bar color="black" dark app clipped-left dense clipped-right hide-on-scroll>
      <v-toolbar-items>
        <v-btn small text :to="{name:'home'}">
          <v-icon small :left="enableLeft">home</v-icon>
          <span class="hidden-xs-only">Accueil</span>
        </v-btn>
        <v-btn small text :to="{name:'playerArea'}">
          <v-icon small :left="enableLeft">games</v-icon>
          <span class="hidden-xs-only">Espace Joueur</span>
        </v-btn>
        <v-btn small text :to="{name:'GMArea'}">
          <v-icon small :left="enableLeft">amp_stories</v-icon>
          <span class="hidden-xs-only">Espace MJ</span>
        </v-btn>
        <v-btn small text :to="{name:'wiki'}">
          <v-icon small :left="enableLeft">menu_book</v-icon>
          <span class="hidden-xs-only">Wiki</span>
        </v-btn>
        <v-btn small text :to="{name:'philo'}">
          &Phi;
          <span class="hidden-xs-only">Philosophie</span>
        </v-btn>
        <v-btn small text>
          <v-icon small :left="enableLeft">settings_applications</v-icon>
          <span class="hidden-xs-only">Administration</span>
        </v-btn>
      </v-toolbar-items>
      <template v-slot:extension>
        <v-app-bar-nav-icon @click.stop="contextDrawer = !contextDrawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn small text v-on="on">
              <v-img src="@/assets/fr.png"></v-img>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(langItem, index) in langItems" :key="index">
              <v-list-item-content>
                <v-list-item-title v-html="langItem.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        
        <v-btn small text @click.stop="personalDrawer = true">
          <v-icon>folder</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-navigation-drawer
      v-model="personalDrawer"
      temporary
      show-arrows
      app
      color="black"
      dark
      right
      bottom
    >
      <v-tabs v-model="personalTabIndex" show-arrows>
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tab0">
          <v-badge>
            <template v-slot:badge>0</template>Personnages
          </v-badge>
        </v-tab>
        <v-tab href="#tab1">
          <v-badge>
            <template v-slot:badge>0</template>PNJ
          </v-badge>
        </v-tab>
        <v-tab href="#tab2">
          <v-badge>
            <template v-slot:badge>0</template>Campagnes
          </v-badge>
        </v-tab>
        <v-tab-item value="tab0">Onglet des personnages</v-tab-item>
        <v-tab-item value="tab1">Onglet des PNJ</v-tab-item>
        <v-tab-item value="tab2">Onglet des campagnes</v-tab-item>
      </v-tabs>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";
import vuetify from "../../plugins/vuetify";

export default Vue.extend({
  name: "AppBar",
  computed: {
    storePersonalTabIndex: function() {
      return store.getters.selectedPersonalTab;
    },
    storePersonalDrawer: function() {
      return store.getters.personalDrawer;
    },
    contextDrawer: {
      set: function(open: boolean) {
        store.commit("setContextDrawer", open);
      },
      get: function() {
        return store.getters.contextDrawer;
      }
    },
    enableLeft: function(){
      return !(this.$vuetify.breakpoint.xs);
    }
  },
  watch: {
    personalTabIndex: function(newValue: any) {
      store.commit("setSelectedPersonalTab", newValue);
    },
    personalDrawer: function(newValue: any) {
      store.commit("setPersonalDrawer", newValue);
    }
  },
  data: () => ({
    personalTabIndex: 0,
    personalDrawer: false,
    langItems: [
      {
        image: "@/assets/fr.png",
        title: "FR"
      },
      {
        image: "@/assets/gb.png",
        title: "EN"
      }
    ]
  })
});
</script>

<style scoped>
.v-btn--active {
  background-color: #b71c1c !important;
}
</style>