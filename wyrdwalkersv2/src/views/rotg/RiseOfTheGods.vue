<template>
  <div class="rotg">
    <router-view />
    <v-navigation-drawer v-model="contextDrawer" app temporary color="black" dark>
      <template v-slot:prepend>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title v-if="currentUser._id != ''">
              <span class="mr-3">{{currentUser.login}} / {{currentUser.name}}</span>
              <v-btn small icon @click.stop="openProfileDialog = true;">
                <v-icon small>edit</v-icon>
              </v-btn>
            </v-list-item-title>
            <v-list-item-subtitle>
              <div v-if="currentUser._id == ''">
                <v-btn small text @click.stop="triggerSignup()">
                  <v-icon small left>fa-user-plus</v-icon>
                  <span class="hidden-xs-only">{{$t("general.signup")}}</span>
                </v-btn>
                <v-btn small text @click.stop="triggerLogin()">
                  <v-icon left small>fa-sign-in-alt</v-icon>
                  <span class="hidden-xs-only">{{$t("general.login")}}</span>
                </v-btn>
              </div>
              <div v-else>
                <v-btn small text @click.stop="triggerSignout()">
                  <v-icon left small>fa-sign-out-alt</v-icon>
                  <span class="hidden-xs-only">{{$t("general.logout")}}</span>
                </v-btn>
              </div>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider color="white"></v-divider>
      <v-list>
        <v-list-item :to="{name:'homeROTG'}">
          <v-list-item-title>Accueil</v-list-item-title>
          <v-list-item-action>
            <v-icon small>fa-home</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item :to="{name:'gamesROTG'}">
          <v-list-item-title>Parties en cours</v-list-item-title>
          <v-list-item-action>
            <v-icon small>fa-gamepad</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";
import User from "../../model/User.model";

export default Vue.extend({
  name: "ROTG",
  created: function() {
    //store.commit("setSiteSection", SiteSection.WIKI);
  },
  computed: {
    contextDrawer: {
      get: function() {
        return store.getters.contextDrawer;
      },
      set: function(open: boolean) {
        store.commit("setContextDrawer", open);
      }
    },
    eventBus: function() {
      return store.getters.centralBus;
    },
    openLoginDialog: {
      get: function() {
        return store.getters.openLoginDialog;
      },
      set: function(open: boolean) {
        store.commit("setOpenLoginDialog", open);
      }
    },
    openSigninDialog: {
      get: function() {
        return store.getters.openSigninDialog;
      },
      set: function(open: boolean) {
        store.commit("setOpenSigninDialog", open);
      }
    },
    openProfileDialog: {
      get: function() {
        return store.getters.openProfileDialog;
      },
      set: function(open: boolean) {
        store.commit("setOpenProfileDialog", open);
      }
    },
    currentUser: function() {
      return store.getters.currentUser;
    }
  },
  methods: {
    triggerLogin: function() {
      this.openLoginDialog = true;
    },
    triggerSignup: function() {
      this.openSigninDialog = true;
    },
    triggerSignout: function() {
      store.commit("setCurrentUser", new User());
    }
  },
  data: () => ({})
});
</script>