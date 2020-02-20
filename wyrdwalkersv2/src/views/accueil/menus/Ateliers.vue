<template>
  <div class="pa-3" id="app-content-custom">
    <v-parallax dark src="@/assets/ParallaxAccueil.webp" eager :height="250">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-2 font-weight-thin mb-4">{{$t("home.contents.workshops.title")}}</h1>
          <h3 class="headline">{{$t("home.contents.workshops.subtitle")}}</h3>
        </v-col>
      </v-row>
    </v-parallax>
    <div v-if="workshops.length > 0">
      <v-row align="center" class="pa-3 pb-0">
        <v-col cols="12" v-for="(work, index) in workshops" :key="index">
          <v-card>
            <v-card-title>
              <v-icon left>fa-dice-d20</v-icon>
              <span class="title font-weight-light">{{work.name}}</span>
            </v-card-title>
            <v-card-text>{{work.caption}}</v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="red"
                @click="showDialog = true; selectedWorkshop = work;"
              >{{$t("home.contents.wokshops.more")}}</v-btn>
              <v-spacer></v-spacer>
              <span class="mr-3">
                <v-icon small left>fa-calendar-alt</v-icon>
                <span class="caption font-weight-light">{{new Date(work.date).toLocaleDateString()}}</span>
              </span>
              <span>
                <v-icon small left>fa-map-marker-alt</v-icon>
                <span class="caption font-weight-light">{{work.location}}</span>
              </span>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="showDialog" max-width="700px">
        <v-card>
          <v-toolbar dark color="blue" flat dense>
            <v-toolbar-title>{{selectedWorkshop.name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="showDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text class="mt-3">
            <div v-html="selectedWorkshop.description"></div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <span class="mr-3">
              <v-icon small left>fa-calendar-alt</v-icon>
              <span class="caption font-weight-light">Le {{new Date(selectedWorkshop.date).toLocaleDateString()}}</span>
            </span>
            <span>
              <v-icon small left>fa-map-marker-alt</v-icon>
              <span class="caption font-weight-light">à {{selectedWorkshop.location}}</span>
            </span>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div v-else class="mt-2">
      <v-alert
        border="top"
        colored-border
        type="info"
        elevation="2"
        width="100%"
      >{{$t("home.contents.workshops.noData")}}</v-alert>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import Workshop from "../../../model/Workshop.model";

export default Vue.extend({
  name: "Ateliers",
  created: function() {
    this.fetchWorkshops();
  },
  computed: {
    workshops: {
      get: function() {
        return store.getters.workshops;
      },
      set: function(newValues: Workshop[]) {
        store.commit("setWorkshops", newValues);
      }
    }
  },
  methods: {
    fetchWorkshops: function() {
      store.dispatch("fetchWorkshops");
    }
  },
  data: () => ({
    showDialog: false,
    selectedWorkshop: new Workshop()
  }),
  metaInfo: {
    title: "Nos ateliers",
    link: [
      { rel: "canonical", href: "https://wyrdwalkers.com/home/workshops" },
      { rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }
    ],
    meta: [
      { name: "description", content: "Les ateliers storytelling Wyrdwalkers" },
      {
        name: "keywords",
        content:
          "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons,atelier,storytelling,narration,histoire,mythes"
      },
      { name: "author", content: "Thomas Gely" },
      { property: "og:url", content: "https://wyrdwalkers.com/home/workshops" },
      { property: "og:type", content: "website" },
      {
        property: "og:description",
        content:
          "L'association Wyrdwalkers vous propose différents ateliers de storytelling, pour vous apprendre à construire une histoire sous un format ou un autre. Le tout à partir d'un mythe existant que vous pourrez remettre au goût du jour"
      },
      { property: "og:image", content: "https://i.imgur.com/xSW0VL0.png" }
    ]
  }
});
</script>