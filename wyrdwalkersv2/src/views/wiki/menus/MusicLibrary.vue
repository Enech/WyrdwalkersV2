<template>
  <div class="pa-3">
    <v-card class="pa-3 scroll-y" :max-height="500">
      <v-card-title>
        <span class="headline">Bibliothèque musicale</span>
        <v-spacer></v-spacer>
        <v-btn
          :color="colorCycle"
          icon
          title="Lecture en boucle"
          @click.stop="activeCycle = !activeCycle"
        >
          <v-icon>replay</v-icon>
        </v-btn>
        <v-btn
          :color="colorShuffle"
          icon
          title="Lecture aléatoire"
          @click.stop="activeShuffle = !activeShuffle"
        >
          <v-icon>shuffle</v-icon>
        </v-btn>
      </v-card-title>
      <v-row dense style="height:100%">
        <v-col cols="12" md="10">
          <v-skeleton-loader
            type="image"
            class="mx-auto"
            v-if="loading"
            transition="scale-transition"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="2">
          <v-list dense v-if="loading">
            <v-list-item>
              <v-skeleton-loader type="list-item" class="mx-auto" transition="scale-transition"></v-skeleton-loader>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-skeleton-loader type="list-item" class="mx-auto" transition="scale-transition"></v-skeleton-loader>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-skeleton-loader type="list-item" class="mx-auto" transition="scale-transition"></v-skeleton-loader>
            </v-list-item>
          </v-list>
          <v-list dense v-else>
            <div v-for="(music,index) in musics" :key="index">
              <v-list-item>
                {{music.pageName}}<v-spacer></v-spacer><i>{{music.timeline}}</i>
              </v-list-item>
              <v-divider></v-divider>
            </div>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import Music from "../../../model/Music.model";
import WikiPage from "../../../model/WikiPage.model";

export default Vue.extend({
  name: "MusicLibrary",
  computed: {
    colorCycle: function() {
      return this.activeCycle ? "blue" : "black";
    },
    colorShuffle: function() {
      return this.activeShuffle ? "blue" : "black";
    },
    pages: function() {
      return store.getters.allWikiPages;
    }
  },
  created: function() {
    this.loading = true;
    this.fetchAllWikiPages();
  },
  methods: {
    fetchAllWikiPages: function() {
      store.dispatch("fetchAllWikiPages").then((response: any) => {
        this.computeMusics(response.data);
        this.loading = false;
      });
    },
    computeMusics(pages: WikiPage[]) {
      pages.forEach(page => {
        page.content.forEach(content => {
          if (content.music.length > 0) {
            var music = new Music();
            music.pageName = page.title.titleVF;
            music.link = content.music;
            music.timeline = content.timeline;
            this.musics.push(music);
          }
        });
      });
    }
  },
  data: () => ({
    activeCycle: false,
    activeShuffle: false,
    musics: new Array<Music>(),
    loading: false
  })
});
</script>