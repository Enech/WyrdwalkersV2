<template>
  <div class="pa-3">
    <v-card class="pa-3" id="app-content-custom">
      <v-card-title class="headline">Pages aléatoires</v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-row dense>
        <v-col cols="12" md="4" v-for="(page,index) in randomPages" :key="index">
          <v-card class="pa-3" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline" v-text="page.title.titleVF"></v-card-title>

                <v-card-subtitle v-text="getRenderText(page)"></v-card-subtitle>
              </div>

              <v-avatar class="ma-3" size="125" tile v-if="page.content[0].picture != ''">
                <v-img :src="page.content[0].picture"></v-img>
              </v-avatar>
            </div>
            <v-card-actions>
              <v-btn
                block
                dark
                color="red darken-4"
                :href="`/wiki/lore/${page.title.titleVF}`"
                target="_blank"
              >Voir</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import WikiPage from "../../../model/WikiPage.model";

export default Vue.extend({
  name: "RandomPages",
  created: function() {
    this.fetchRandomPages();
  },
  computed: {
    randomPages: function() {
      return store.getters.randomWikiPages;
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
    fetchRandomPages: function() {
      store.dispatch("fetchRandomWikiPages");
    }
  },
  data: () => ({}),
  metaInfo: {
    title: "Pages aléatoires",
    meta:[
      {name: "description", content: "Des fiches Wyrdwalkers tirées aléatoirement"},
      {name: "keywords", content: "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons,aléatoire,random,wiki"},
      {name: "author", content: "Thomas Gely"},
      {property: "og:url", content: "https://wyrdwalkers.com/wiki/random"},
      {property: "og:type", content: "website"},
      {property: "og:description", content: "Six fiches Wyrdwalkers tirées au hasard"},
      {property: "og:image", content: "https://i.imgur.com/xSW0VL0.png"}
    ]
  }
});
</script>