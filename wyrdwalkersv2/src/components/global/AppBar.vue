<template>
  <div>
    <v-app-bar color="black" dark app clipped-left dense clipped-right hide-on-scroll>
      <v-toolbar-items>
        <v-btn small text :to="{name:'home'}">
          <v-icon small :left="enableLeft">home</v-icon>
          <span class="hidden-xs-only">{{$t("home.main")}}</span>
        </v-btn>
        <v-btn small text :to="{name:'playerArea'}" v-if="currentUser._id != '' && false">
          <v-icon small :left="enableLeft">games</v-icon>
          <span class="hidden-xs-only">Espace Joueur</span>
        </v-btn>
        <v-btn small text :to="{name:'GMArea'}" v-if="currentUser._id != '' && false">
          <v-icon small :left="enableLeft">amp_stories</v-icon>
          <span class="hidden-xs-only">Espace MJ</span>
        </v-btn>
        <v-btn small text :to="{name:'wiki'}">
          <v-icon small :left="enableLeft">menu_book</v-icon>
          <span class="hidden-xs-only">{{$t("wiki.main")}}</span>
        </v-btn>
        <v-btn small text :to="{name:'philo'}" v-if="false">
          &Phi;
          <span class="hidden-xs-only">Philosophie</span>
        </v-btn>
        <v-btn small text v-if="currentUser.rights.isAdmin" :to="{name:'backOffice'}">
          <v-icon small :left="enableLeft">settings_applications</v-icon>
          <span class="hidden-xs-only">Administration</span>
        </v-btn>
      </v-toolbar-items>
      <template v-slot:extension>
        <v-app-bar-nav-icon @click.stop="contextDrawer = !contextDrawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <wyrd-search v-if="siteSection != 5"/>
        <wyrd-lang />
        <v-btn small text @click.stop="personalDrawer = true" v-if="currentUser._id != ''">
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
      :width="400"
    >
      <v-tabs v-model="storePersonalTabIndex" show-arrows>
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tab0">
          <v-badge>
            <template v-slot:badge>{{currentUser.characters.length}}</template>{{$t("general.characters")}}
          </v-badge>
        </v-tab>
        <v-tab href="#tab1">
          <v-badge>
            <template v-slot:badge>{{currentUser.looseNPC.length}}</template>{{$t("general.npc")}}
          </v-badge>
        </v-tab>
        <v-tab href="#tab2">
          <v-badge>
            <template
              v-slot:badge
            >{{currentUser.playerCampaigns.length + currentUser.masterCampaigns.length}}</template>{{$t("general.campaigns")}}
          </v-badge>
        </v-tab>
        <v-tab-item value="tab0">
          <v-card tile flat class="pa-3" color="black" dark></v-card>
        </v-tab-item>
        <v-tab-item value="tab1">
          <v-card tile flat class="pa-3" color="black" dark></v-card>
        </v-tab-item>
        <v-tab-item value="tab2">
          <v-card tile flat class="pa-3" color="black" dark></v-card>
        </v-tab-item>
      </v-tabs>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";
import vuetify from "../../plugins/vuetify";
import SearchBarVue from "./SearchBar.vue";
import LocaleChanger from "./Language.vue";

export default Vue.extend({
  name: "AppBar",
  components: {
    "wyrd-search": SearchBarVue,
    "wyrd-lang": LocaleChanger
  },
  computed: {
    storePersonalTabIndex: {
      get: function() {
        return store.getters.selectedPersonalTab;
      },
      set: function(value: number) {
        store.commit("setSelectedPersonalTab", value);
      }
    },
    storePersonalDrawer: {
      get: function() {
        return store.getters.personalDrawer;
      },
      set: function(value: boolean) {
        store.commit("setPersonalDrawer", value);
      }
    },
    contextDrawer: {
      set: function(open: boolean) {
        store.commit("setContextDrawer", open);
      },
      get: function() {
        return store.getters.contextDrawer;
      }
    },
    enableLeft: function() {
      return !this.$vuetify.breakpoint.xs;
    },
    currentUser: function() {
      return store.getters.currentUser;
    },
    siteSection: function(){
      return store.getters.siteSection;
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
    personalDrawer: false
  })
});
</script>

<style scoped>
.v-btn--active {
  background-color: #b71c1c !important;
}
</style>