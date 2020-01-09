<template>
  <div class="pa-3">
    <v-card class="pa-3" id="app-content-custom">
      <v-card-title>Chronologies</v-card-title>
      <div id="TimelinesCardsContainer" v-if="showCards">
        <v-layout v-for="(timeline, index) in timelines" :key="index">
          <v-flex xs12>
            <v-card>
              <v-card-title>{{timeline.name}}</v-card-title>
              <v-card-text>{{timeline.description}}</v-card-text>
              <v-card-actions>
                <v-btn dark color="red" @click="assignSelectedTimeline(timeline);">Explorer</v-btn>
              </v-card-actions>
            </v-card>
            <br />
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
      </div>
      <div id="TimelinesContainer" v-if="!showCards">
        <v-timeline :dense="showDense">
          <v-flex>
            <v-timeline-item color="red lighten-2" large>
              <template v-slot:opposite>
                <span>{{GetLiteralYear(selectedTimeline.firstEvent.year)}}</span>
              </template>
              <v-card class="elevation-2">
                <v-card-title class="headline">{{selectedTimeline.firstEvent.title}}</v-card-title>
                <v-subheader v-if="showDense">
                  <span>{{GetLiteralYear(selectedTimeline.firstEvent.year)}}</span>
                </v-subheader>
                <v-card-text>{{selectedTimeline.firstEvent.content}}</v-card-text>
              </v-card>
            </v-timeline-item>
            <v-timeline-item
              v-for="(event,index) in selectedTimeline.events"
              :key="index"
              color="red lighten-2"
              large
            >
              <template v-slot:opposite>
                <span>{{GetLiteralYear(event.year)}}</span>
              </template>
              <v-card class="elevation-2">
                <v-card-title class="headline">{{event.title}}</v-card-title>
                <v-subheader v-if="showDense">
                  <span>{{GetLiteralYear(event.year)}}</span>
                </v-subheader>
                <v-card-text>{{event.content}}</v-card-text>
              </v-card>
            </v-timeline-item>
            <v-btn fixed dark fab bottom right color="red" @click="showCards = true;"><v-icon>clear</v-icon></v-btn>
          </v-flex>
        </v-timeline>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import Timeline from "../../../model/Timeline.model";

export default Vue.extend({
  name: "Timelines",
  computed: {
    timelines: function() {
      return store.getters.timelines;
    },
    showDense: function(){
        return this.$vuetify.breakpoint.xs;
    }
  },
  created: function() {
    this.fetchTimelines();
  },
  methods: {
    fetchTimelines: function() {
      store.dispatch("fetchTimelines");
    },
    assignSelectedTimeline(timeline: Timeline) {
      Object.assign(this.selectedTimeline, timeline);
      this.showCards = false;
    },
    GetLiteralYear: function(yearString: string) {
      var result = yearString;
      var yearsTab = yearString.split(";");

      if (yearsTab.length > 1) {
        result = "De ";

        for (var i = 0; i < yearsTab.length; i++) {
          result += this.GetBCorAD(yearsTab[i]);

          if (i == 0) result += " à ";
        }
      } else {
        result = this.GetBCorAD(yearString);
      }

      return result;
    },
    GetBCorAD: function(yearString: string) {
      var year = parseInt(yearString);
      var result = yearString;

      if (year < 0) {
        result = Math.abs(year) + " av. J-C";
      } else {
        result = year + " ap. J-C";
      }

      return result;
    }
  },
  data: () => ({
    showCards: true,
    selectedTimeline: new Timeline()
  }),
  metaInfo: {
    title: "Chronologies",
    link: [
      {rel: "canonical", href: "https://wyrdwalkers.com/wiki/timelines"},
      {rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico"}
    ],
    meta:[
      {name: "description", content: "Le multivers Wyrdwalkers"},
      {name: "keywords", content: "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons,timelines"},
      {name: "author", content: "Thomas Gely"},
      {property: "og:url", content: "https://wyrdwalkers.com/wiki/timelines"},
      {property: "og:type", content: "website"},
      {property: "og:description", content: "Découvrez les évènements du multivers Wyrdwalkers"},
      {property: "og:image", content: "https://i.imgur.com/xSW0VL0.png"}
    ]
  }
});
</script>