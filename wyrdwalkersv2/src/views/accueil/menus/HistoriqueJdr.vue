<template>
  <div class="pa-3">
    <v-card>
      <v-card-title>Historique des évènements JDR</v-card-title>
      <v-tabs grow>
        <v-tab v-for="(timeline,index) in timelines" :key="index">{{timeline.name}}</v-tab>
        <v-tab-item v-for="(timeline,index) in timelines" :key="index">
          <div class="mt-2" v-for="(event,indexEvent) in events" :key="indexEvent">
            <v-card
              v-if="event.timeline == timeline.name"
              @click.stop="selectedEvent = event; showDialog = true;"
            >
              <v-card-title class="font-weight-light">{{event.nameVF}}</v-card-title>
              <v-card-text>
                <div class="subtitle-1">{{event.captionVF}}</div>
                <div class="deep-orange--text text--darken-4">{{fullTextYear(event.year)}}</div>
              </v-card-text>
            </v-card>
          </div>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <v-dialog fullscreen v-model="showDialog">
      <v-card>
        <v-toolbar dark color="black">
          <v-toolbar-title>{{selectedEvent.nameVF}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="showDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-3">
          <v-row>
            <v-col cols="12" md="9">
              <div v-html="selectedEvent.descriptionVF"></div>
            </v-col>
            <v-col cols="12" md="3">
              <v-img :src="selectedEvent.picture" eager></v-img>
              <v-list-item class="blue mb-1" dark>
                <v-list-item-icon>
                  <v-icon small>edit</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <span v-if="selectedEvent.pictureAuthor != ''">{{selectedEvent.pictureAuthor}}</span>
                  <span v-else>Auteur inconnu</span>
                </v-list-item-content>
              </v-list-item>
              <div v-if="selectedEvent.music != ''">
                <iframe
                  width="100%"
                  height="100"
                  :src="getEmbedUrl(selectedEvent.music)"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                ></iframe>
              </div>
              <div v-for="(character,indexChar) in selectedEvent.characters" :key="indexChar" class="mb-1">
                <v-btn block outlined :href="'/wiki/' + character" target="_blank" color="blue">{{character}}</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import Timeline from "../../../model/Timeline.model";
import EventJdr from "../../../model/Event.model";
import TimelineEvent from "../../../model/TimelineEvent.model";

export default Vue.extend({
  name: "HistoriqueJDR",
  created: function() {
    this.fetchEvents();
    this.fetchTimelines();
  },
  methods: {
    fetchEvents: function() {
      store.dispatch("fetchEvents");
    },
    fetchTimelines: function() {
      store.dispatch("fetchTimelines");
    },
    fullTextYear(year: string) {
      var intYear = parseInt(year);
      if (intYear < 0) {
        return `${Math.abs(intYear)} av. J-C`;
      } else {
        return `${Math.abs(intYear)} ap. J-C`;
      }
    },
    getEmbedUrl: function(url: string){
        var urlTab = url.split("watch?v=");
        var videoId = urlTab[urlTab.length-1];
        return `https://www.youtube.com/embed/${videoId}`;
    }
  },
  computed: {
    timelines: {
      get: function() {
        return store.getters.timelines;
      },
      set: function(newValue: Timeline[]) {
        store.commit("setTimelines", newValue);
      }
    },
    events: {
      get: function() {
        return store.getters.events.sort(function(a: TimelineEvent, b: TimelineEvent) {
          if (parseInt(a.year) < parseInt(b.year)) {
            return -1;
          } else if (parseInt(a.year) > parseInt(b.year)) {
            return 1;
          }
        });
      },
      set: function(newValue: EventJdr[]) {
        store.commit("setEvents", newValue);
      }
    }
  },
  data: () => ({
    showDialog: false,
    selectedEvent: new EventJdr()
  })
});
</script>