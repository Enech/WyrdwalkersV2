<template>
  <div class="wiki">
    <router-view />
    <v-navigation-drawer v-model="contextDrawer" app clipped color="black" dark bottom>
      <template v-slot:prepend>
        <v-divider color="white"></v-divider>
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
        <v-list-item :to="{name:'wikiHome'}">
          <v-list-item-title>{{$t("wiki.menus.home")}}</v-list-item-title>
          <v-list-item-action>
            <v-icon small>fa-book-reader</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item :to="{name:'explorer'}" v-if="false">
          <v-list-item-title>Explorateur</v-list-item-title>
          <v-list-item-action>
            <v-icon small>near_me</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item :to="{name:'randomPages'}">
          <v-list-item-title>{{$t("wiki.menus.random")}}</v-list-item-title>
          <v-list-item-action>
            <v-icon small>fa-random</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item :to="{name:'timelines'}">
          <v-list-item-title>{{$t("wiki.menus.timelines")}}</v-list-item-title>
          <v-list-item-action>
            <v-icon small>fa-bezier-curve</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>{{$t("wiki.menus.gameplay")}}</v-list-item-title>
          </template>
          <v-list-item :to="{name:'rules'}">
            <v-list-item-title>{{$t("wiki.menus.rules")}}</v-list-item-title>
            <v-list-item-action>
              <v-icon small>fa-book</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item :to="{name:'abilities'}">
            <v-list-item-title>{{$t("wiki.menus.abilities")}}</v-list-item-title>
            <v-list-item-action>
              <v-icon small>fa-bolt</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>{{$t("wiki.menus.pantheons")}}</v-list-item-title>
          </template>
          <v-list-item :to="{path:'/wiki/lore/aesir'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.aesir")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/amatsukami'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.amatsukami")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/ayllus'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.ayllus")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/celestial-bureaucracy'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.bureaucracy")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/deva'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.deva")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/k\'asunel'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.kasunel")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/neter'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.neter")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/nga-tama-a-rangi'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.rangi")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/orisha'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.orisha")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/teotl'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.teotl")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/theoi'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.theoi")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/tuatha-dé-danann'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.tuatha")}}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>{{$t("wiki.menus.titans")}}</v-list-item-title>
          </template>
          <v-list-item :to="{path:'/wiki/lore/aether'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.aether")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/amaunet'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.amaunet")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/kosmos'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.kosmos")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/muspelheim'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.muspelheim")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/nyx'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.nyx")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/océanus'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.oceanus")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/patala'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.patala")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/sheol'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.sheol")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/terra'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.terra")}}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>{{$t("wiki.menus.otherworlds")}}</v-list-item-title>
          </template>
          <v-list-item :to="{path:'/wiki/lore/mythborn'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.mythborns")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/forêt-noire'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.blackForest")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/fairie'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.fairie")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/mer-de-jade'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.jadeSea")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/shambhala'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.shambhala")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/utopia'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.utopia")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/el-dorado'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.eldorado")}}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>{{$t("wiki.menus.societies")}}</v-list-item-title>
          </template>
          <v-list-item :to="{path:'/wiki/lore/illuminati'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.illuminati")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/cabale'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.cabale")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/cercle-de-merlin'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.merlinCircle")}}</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{path:'/wiki/lore/ordre-du-poing-de-jade'}" target="_blank">
            <v-list-item-title>{{$t("wiki.menus.jadeFist")}}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item :to="{path:'/wiki/music-library'}" target="_blank">
          <v-list-item-title>{{$t("wiki.menus.playlist")}}</v-list-item-title>
          <v-list-item-action>
            <v-icon small>fa-music</v-icon>
          </v-list-item-action>
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
  name: "Wiki",
  created: function() {
    store.commit("setSiteSection", SiteSection.WIKI);
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
    triggerSignout: function(){
      store.commit("setCurrentUser", new User())
    }
  },
  data: () => ({})
});
</script>