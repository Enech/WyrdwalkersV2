<template>
  <div class="pa-3">
    <v-card class="pa-3 scroll-y" :height="customHeight" id="app-content-custom">
      <v-card-title>
        <span class="headline">Playlist</span>
        <v-spacer></v-spacer>
        <v-btn
          :color="openMobilePlaylist ? 'blue' : 'black'"
          icon
          v-if="mobileDevice"
          title="Ouvrir la playlist"
          @click.stop="openMobilePlaylist = !openMobilePlaylist"
        >
          <v-icon>view_list</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-row dense style="height:calc(100% - 70px)">
        <v-col cols="12" md="10" class="full-height">
          <v-skeleton-loader
            type="image"
            class="mx-auto"
            v-if="loading"
            transition="scale-transition"
          ></v-skeleton-loader>
          <div v-else class="full-height">
            <iframe
              width="100%"
              height="100%"
              :src="selectedMusic.link"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
            ></iframe>
          </div>
        </v-col>
        <v-col cols="12" md="2" class="full-height" v-if="!mobileDevice">
          <v-navigation-drawer
            right
            permanent
            floating
            class="full-height no-margin"
            bottom
            width="100%"
            v-if="!mobileDevice"
          >
            <v-list dense>
              <div v-for="(music,index) in musics" :key="index">
                <v-list-item
                  :dark="isPlaying(music)"
                  :class="isPlaying(music) ? 'red text--white' : ''"
                  @click.stop="selectedMusic = music"
                >
                  <div>
                    <v-icon small left v-if="isPlaying(music)">fa-music</v-icon>
                    {{music.pageName}}
                  </div>
                  <v-spacer></v-spacer>
                  <i>{{music.timeline}}</i>
                </v-list-item>
                <v-divider></v-divider>
              </div>
            </v-list>
          </v-navigation-drawer>
        </v-col>
        <v-bottom-sheet v-else v-model="openMobilePlaylist" scrollable inset>
          <v-card tile flat>
            <v-card-text style="height: 300px;">
              <v-list dense class="full-height scroll-thin">
                <div v-for="(music,index) in musics" :key="index">
                  <v-list-item
                    :dark="isPlaying(music)"
                    :class="isPlaying(music) ? 'red' : ''"
                    @click.stop="selectedMusic = music"
                  >
                    <div>
                      <v-icon small left v-if="isPlaying(music)">fa-music</v-icon>
                      {{music.pageName}}
                    </div>
                    <v-spacer></v-spacer>
                    <i>{{music.timeline}}</i>
                  </v-list-item>
                  <v-divider></v-divider>
                </div>
              </v-list>
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
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
    pages: function() {
      return store.getters.allWikiPages;
    },
    customHeight: function() {
      return this.$vuetify.breakpoint.xs ? 450 : 500;
    },
    mobileDevice: function() {
      return this.$vuetify.breakpoint.xs;
    }
  },
  created: function() {
    this.loading = true;
    this.fetchAllWikiPages();
  },
  methods: {
    fetchAllWikiPages: function() {
      store.dispatch("fetchAllWikiPages").then((response: any) => {
        this.musics = this.computeMusics(response.data);
        this.musics = this.musics.sort(function(a: Music, b: Music) {
          if (a.pageName > b.pageName) {
            return 1;
          } else {
            return -1;
          }
        });
        this.selectedMusic = this.musics[0];
        this.loading = false;
      });
    },
    isPlaying: function(music: Music) {
      return music.id === this.selectedMusic.id;
    },
    computeMusics(pages: WikiPage[]) {
      var tempMusics = new Array<Music>();
      for (var i = 0; i < pages.length; i++) {
        var page = pages[i];
        var index = i;
        for (var j = 0; j < page.content.length; j++) {
          var content = page.content[j];
          if (content.music.length > 0) {
            var music = new Music();
            var urlTab = content.music.split("watch?v=");
            var videoId = urlTab[urlTab.length - 1];
            music.pageName = page.title.titleVF;
            music.link = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            music.timeline = content.timeline;
            music.id = `${index}${j}`;
            
            var found = false;
            for(var k = 0; k < tempMusics.length; k++){
              if(tempMusics[k].link == music.link){
                found = true;
                break;
              }
            }
            
            if(!found){
              tempMusics.push(music);
            }
          }
        }
      }
      return tempMusics;
    },
  },
  data: () => ({
    loading: false,
    openMobilePlaylist: false,
    selectedMusic: new Music(),
    musics: new Array<Music>()
  }),
  metaInfo: {
    title: "Playlist",
    link: [
      {rel: "canonical", href: "https://wyrdwalkers.com/wiki/music-library"},
      {rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico"}
    ],
    meta:[
      {name: "description", content: "La playlist Wyrdwalkers"},
      {name: "keywords", content: "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons,playlist"},
      {name: "author", content: "Thomas Gely"},
      {property: "og:url", content: "https://wyrdwalkers.com/wiki/music-library"},
      {property: "og:type", content: "website"},
      {property: "og:description", content: "La playlist Wyrdwalkers. Chaque personnage a sa musique, venez la découvrir"},
      {property: "og:image", content: "https://i.imgur.com/xSW0VL0.png"}
    ]
  }
});
</script>