<template>
  <div class="pa-3" id="app-content-custom">
    <v-parallax dark src="@/assets/ParallaxAccueil.webp" eager :height="250">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-2 font-weight-thin mb-4">{{$t("home.contents.animations.title")}}</h1>
          <h3 class="headline">{{$t("home.contents.animations.subtitle")}}</h3>
        </v-col>
      </v-row>
    </v-parallax>
    <div v-if="!pleaseWait">
      <div v-if="activities.length > 0">
        <v-row align="center" class="pa-3 pb-0">
          <v-col cols="12" v-for="(activity, index) in activities" :key="index">
            <v-card>
              <v-card-title>
                <v-icon left>fa-dice-d20</v-icon>
                <span class="title font-weight-light">{{$i18n.locale == 'fr' ? activity.nameVF : activity.nameVO}}</span>
              </v-card-title>
              <v-card-text>{{$i18n.locale == 'fr' ? activity.captionVF : activity.captionVO}}</v-card-text>
              <v-card-actions>
                <v-btn text color="red" :href="activity.externalLink" target="_blank" v-if="activity.externalLink.length > 0">{{$t("home.contents.animations.more")}}</v-btn>
                <v-spacer></v-spacer>
                <span class="mr-3">
                  <v-icon small left>fa-calendar-alt</v-icon>
                  <span class="caption font-weight-light">{{new Date(activity.date).toLocaleDateString()}}</span>
                </span>
                <span>
                  <v-icon small left>fa-map-marker-alt</v-icon>
                  <span class="caption font-weight-light">{{activity.location}}</span>
                </span>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else class="mt-2">
        <v-alert
          border="top"
          colored-border
          type="info"
          elevation="2"
          width="100%"
        >{{$t("home.contents.animations.noData")}}</v-alert>
      </div>
    </div>
    <v-dialog v-model="pleaseWait" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{$t("home.contents.animations.loading")}}...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import AnimationWW from "../../../model/Animation.model";

export default Vue.extend({
  name: "Activites",
  created: function() {
    this.fetchActivities();
  },
  computed: {
    activities: {
      get: function() {
        return store.getters.activities;
      },
      set: function(newValues: AnimationWW[]) {
        store.commit("setActivities", newValues);
      }
    }
  },
  methods: {
    fetchActivities: function() {
      this.pleaseWait = true;
      store.dispatch("fetchActivities").then(() => {
        this.pleaseWait = false;
      });
    }
  },
  data: () => ({
    pleaseWait: false
  }),
  metaInfo: {
    title: "Nos activités",
    meta: [
      {
        name: "description",
        content: "Les activités auxquelles participe Wyrdwalkers"
      },
      {
        name: "keywords",
        content:
          "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons,activities,activités"
      },
      { name: "author", content: "Thomas Gely" },
      {
        property: "og:url",
        content: "https://wyrdwalkers.com/home/activities"
      },
      { property: "og:type", content: "website" },
      {
        property: "og:description",
        content:
          "Toutes les activités auxquelles Wyrdwalkers participe. Si vous voulez nous rencontrer, vous savez où nous attraper !"
      },
      { property: "og:image", content: "https://i.imgur.com/xSW0VL0.png" }
    ]
  }
});
</script>