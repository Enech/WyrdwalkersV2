<template>
  <div class="pa-3">
    <v-card class="pa-3" id="app-content-custom">
      <v-card-title class="headline">
        <v-icon left>search</v-icon>{{$t("wiki.contents.search.title")}}
      </v-card-title>
      <v-card-subtitle>{{searchQuery}}</v-card-subtitle>
      <v-divider class="mb-3"></v-divider>
      <v-row dense v-if="searchResults.length > 0">
        <v-col cols="12" md="4" v-for="(page,index) in searchResults" :key="index">
          <v-card class="pa-3" :class="!mobileDevice ? 'search-card' : ''" dark>
            <v-img
              :src="page.content[0].picture"
              height="200px"
              v-if="page.content[0].picture != '' && mobileDevice"
            ></v-img>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline" v-text="page.title.titleVF"></v-card-title>
                <v-divider></v-divider>
                <v-card-subtitle v-text="getRenderText(page)"></v-card-subtitle>
              </div>
              <v-avatar
                class="ma-3"
                size="125"
                tile
                v-if="page.content[0].picture != '' && !mobileDevice"
              >
                <v-img :src="page.content[0].picture"></v-img>
              </v-avatar>
            </div>
            <v-card-actions>
              <v-btn
                dark
                bottom
                :absolute="!mobileDevice"
                color="red darken-4"
                :href="`/wiki/lore/${page.title.titleVF}`"
                target="_blank"
              >{{$t("wiki.contents.search.go")}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-alert prominent border="left" type="error" outlined v-if="searchResults.length == 0 && !loading">
        {{$t("wiki.contents.search.noData")}}
        <i>{{searchQuery}}</i>
      </v-alert>
      <v-dialog v-model="loading" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            {{$t("wiki.contents.search.noData")}}
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import WikiPage from "../../../model/WikiPage.model";

export default Vue.extend({
  name: "SearchResults",
  created: function() {
    this.loading = true;
    this.fetchSearchResults(this.searchQuery);
  },
  computed: {
    searchResults: function() {
      return store.getters.wikiSearchResults;
    },
    searchQuery: function() {
      return this.$route.params.searchquery;
    },
    mobileDevice: function() {
      return this.$vuetify.breakpoint.xs;
    }
  },
  methods: {
    getRenderText: function(page: WikiPage) {
      var text =
        page.generalInfos !== undefined
          ? page.generalInfos.vf
          : page.content[0].textVF;
      var node = document.createElement("div");
      node.innerHTML = text;
      var innerText = node.innerText;
      var result = innerText.substring(0, 149) + "...";
      return result;
    },
    fetchSearchResults: function(query: string) {
      store.dispatch("fetchWikiSearchResults", query).then(() => {
        this.loading = false;
      });
    }
  },
  data: () => ({
    loading: true
  }),
  metaInfo: {
    title: "Recherches",
    meta:[
      {name: "description", content: "Pages de résultats des recherches"},
      {name: "keywords", content: "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons"},
      {name: "author", content: "Thomas Gely"}
    ]
  }
});
</script>