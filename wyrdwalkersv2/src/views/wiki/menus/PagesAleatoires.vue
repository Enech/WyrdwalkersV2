<template>
    <div class="pa-3">
        <v-card class="pa-3">
            <v-card-title class="headline">Pages aléatoires</v-card-title>
            <v-divider class="mb-3"></v-divider>
            <v-row dense>
                <v-col cols="12" md="4" v-for="(page,index) in randomPages" :key="index">
                    <v-card class="pa-3" dark>
                        <v-card-title>{{page.title.titleVF}}</v-card-title>
                        <v-card-content class="caption font-weight-light">{{getRenderText(page)}}</v-card-content>
                        <v-card-actions>
                            <v-btn block dark color="red darken-4" :href="`/wiki/lore/${page.title.titleVF}`" target="_blank">Voir</v-btn>
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
  created: function(){
      this.fetchRandomPages();
  },
  computed: {
      randomPages: function(){
          return store.getters.randomWikiPages;
      }
  },
  methods:{
    getRenderText: function(page: WikiPage){
        var text = page.generalInfos !== undefined ? page.generalInfos.vf : page.content[0].textVF;
        var node = document.createElement("div");
        node.innerHTML = text;
        var innerText = node.innerText;
        var result = innerText.substring(0,149) + '...';
        return result;
    },
    fetchRandomPages: function(){
        store.dispatch("fetchRandomWikiPages");
    }
  },
  data: () => ({})
});
</script>