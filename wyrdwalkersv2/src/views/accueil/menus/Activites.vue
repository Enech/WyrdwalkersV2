<template>
  <div class="pa-3" id="app-content-custom">
    <v-parallax dark src="@/assets/ParallaxAccueil.webp" eager>
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-2 font-weight-thin mb-4">Où nous trouver</h1>
          <h3 class="headline">Les endroits où vous pourrez trouver Wyrdwalkers</h3>
        </v-col>
      </v-row>
    </v-parallax>
    <div v-if="activities.length > 0">
      <v-row align="center" class="pa-3 pb-0">
        <v-col cols="12" md="3" v-for="(activity, index) in activities" :key="index">
          <v-card>
            <v-card-title>
              <v-icon left>fa-dice-d20</v-icon>
              <span class="title font-weight-light">{{activity.nameVF}}</span>
            </v-card-title>
            <v-card-text>
                {{activity.captionVF}}
            </v-card-text>
            <v-card-actions>
                <v-btn text color="red" :href="activity.externalLink" target="_blank">En savoir plus</v-btn>
                <v-spacer></v-spacer>
                <span class="mr-3"><v-icon small left>fa-calendar-alt</v-icon><span class="caption font-weight-light">{{activity.date}}</span></span>
                <span><v-icon small left>fa-map-marker-alt</v-icon><span class="caption font-weight-light">{{activity.location}}</span></span>
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
      >Wyrdwalkers n'a pas d'activités prévues pour le moment</v-alert>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import Activity from "../../../model/Activity.model";

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
      set: function(newValues: Activity[]) {
        store.commit("setActivities", newValues);
      }
    }
  },
  methods: {
    fetchActivities: function() {
      store.dispatch("fetchActivities");
    }
  },
  data: () => ({}),
  metaInfo: {
    title: "Nos activités",
    meta:[
      {name: "description", content: "Les activités auxquelles participe Wyrdwalkers"},
      {name: "keywords", content: "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons,activities,activités"},
      {name: "author", content: "Thomas Gely"},
      {property: "og:url", content: "https://wyrdwalkers.com/home/activities"},
      {property: "og:type", content: "website"},
      {property: "og:description", content: "Toutes les activités auxquelles Wyrdwalkers participe. Si vous voulez nous rencontrer, vous savez où nous attraper !"},
      {property: "og:image", content: "https://i.imgur.com/xSW0VL0.png"}
    ]
  }
});
</script>