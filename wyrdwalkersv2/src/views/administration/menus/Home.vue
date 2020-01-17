<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>Panneau d'administration</v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-card shaped :loading="loadingFiches" class="pa-3" color="indigo" dark>
            <v-list-item>
              <v-list-item-title class="display-1">Wiki</v-list-item-title>
            </v-list-item>
            <v-card-text>
              <v-row align="center">
                <v-col class="display-3" cols="6">{{nbFiches}}</v-col>
                <v-col cols="6" class="headline">
                  <v-icon left large>menu_book</v-icon>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card shaped :loading="loadingTimelines" class="pa-3" color="indigo" dark>
            <v-list-item>
              <v-list-item-title class="display-1">Timelines</v-list-item-title>
            </v-list-item>
            <v-card-text>
              <v-row align="center">
                <v-col class="display-3" cols="6">{{nbTimelines}}</v-col>
                <v-col cols="6" class="headline">
                  <v-icon left large>fa-bezier-curve</v-icon>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card shaped :loading="loadingRedirections" class="pa-3" color="indigo" dark>
            <v-list-item>
              <v-list-item-title class="display-1">Redirections</v-list-item-title>
            </v-list-item>
            <v-card-text>
              <v-row align="center">
                <v-col class="display-3" cols="6">{{nbRedirections}}</v-col>
                <v-col cols="6" class="headline">
                  <v-icon left large>compare_arrows</v-icon>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card shaped :loading="loadingAteliers" class="pa-3" color="indigo" dark>
            <v-list-item>
              <v-list-item-title class="display-1">Ateliers</v-list-item-title>
            </v-list-item>
            <v-card-text>
              <v-row align="center">
                <v-col class="display-3" cols="6">{{nbAteliers}}</v-col>
                <v-col cols="6" class="headline">
                  <v-icon left large>menu_book</v-icon>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card shaped :loading="loadingAnimations" class="pa-3" color="indigo" dark>
            <v-list-item>
              <v-list-item-title class="display-1">Animations</v-list-item-title>
            </v-list-item>
            <v-card-text>
              <v-row align="center">
                <v-col class="display-3" cols="6">{{nbAnimations}}</v-col>
                <v-col cols="6" class="headline">
                  <v-icon left large>menu_book</v-icon>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card shaped :loading="loadingEvents" class="pa-3" color="indigo" dark>
            <v-list-item>
              <v-list-item-title class="display-1">Events JDR</v-list-item-title>
            </v-list-item>
            <v-card-text>
              <v-row align="center">
                <v-col class="display-3" cols="6">{{nbEvents}}</v-col>
                <v-col cols="6" class="headline">
                  <v-icon left large>menu_book</v-icon>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card shaped :loading="loadingUsers" class="pa-3" color="indigo" dark>
            <v-list-item>
              <v-list-item-title class="display-1">Utilisateurs</v-list-item-title>
            </v-list-item>
            <v-card-text>
              <v-row align="center">
                <v-col class="display-3" cols="6">{{nbUsers}}</v-col>
                <v-col cols="6" class="headline">
                  <v-icon left large>menu_book</v-icon>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";

export default Vue.extend({
  name: "AdminHome",
  created: function() {
    this.fetchWikiPages();
    this.fetchTimelines();
    this.fetchRedirections();
    this.fetchAteliers();
    this.fetchAnimations();
    this.fetchEvents();
  },
  methods: {
    fetchWikiPages: function() {
      store.dispatch("fetchAllWikiPages").then((response: any) => {
        this.nbFiches = response.data.length;
        this.loadingFiches = false;
      });
    },
    fetchTimelines: function() {
      store.dispatch("fetchTimelines").then((response: any) => {
        this.loadingTimelines = false;
        this.nbTimelines = response.data.length;
      });
    },
    fetchRedirections: function() {
      store.dispatch("fetchAllWikiRedirections").then((response: any) => {
        this.loadingRedirections = false;
        this.nbRedirections = response.data.length;
      });
    },
    fetchAteliers: function() {
      store.dispatch("fetchWorkshops").then((response: any) => {
        this.nbAteliers = response.data.length;
        this.loadingAteliers = false;
      });
    },
    fetchAnimations: function() {
      store.dispatch("fetchActivities").then((response: any) => {
        this.loadingAnimations = false;
        this.nbAnimations = response.data.length;
      });
    },
    fetchEvents: function() {
      store.dispatch("fetchEvents").then((response: any) => {
        this.loadingEvents = false;
        this.nbEvents = response.data.length;
      });
    },
  },
  data: () => ({
    nbFiches: 0,
    nbUsers: 0,
    nbRedirections: 0,
    nbTimelines: 0,
    nbAteliers: 0,
    nbAnimations: 0,
    nbEvents: 0,
    loadingFiches: true,
    loadingUsers: true,
    loadingRedirections: true,
    loadingTimelines: true,
    loadingAteliers: true,
    loadingAnimations: true,
    loadingEvents: true
  }),
  metaInfo: function() {
    return {
      title: "Backoffice - Acceuil",
      link: [{ rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }]
    };
  }
});
</script>