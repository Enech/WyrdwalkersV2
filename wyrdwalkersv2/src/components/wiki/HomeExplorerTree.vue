<template>
  <v-card outlined>
    <v-img
      aspect-ratio="16/9"
      :src="wikiNode.picture"
      height="470"
      class="align-center"
      style="position: relative;"
    >
      <div style="background-color: rgba(0,0,0,0.5);">
        <v-card-title class="white--text justify-center">{{wikiNode.title}}</v-card-title>
        <v-divider color="white"></v-divider>
        <v-card-subtitle class="white--text justify-center" v-html="wikiNode.description"></v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            v-if="wikiNode.wikiLink != null"
            target="_blank"
            :href="wikiNode.wikiLink"
          >Codex</v-btn>
          <v-btn
            color="primary"
            @click="changeTreeNode()"
            v-if="wikiNode.children.length > 0"
          >Détails</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </div>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";
import LandingTree from "../../model/WikiLandingTree.model";

export default Vue.extend({
  name: "WikiHomeExplorer",
  props: {
    wikiNode: LandingTree,
    parentNode: LandingTree
  },
  computed: {
    selectedWikiTree: {
      get: function() {
        return store.getters.selectedWikiTree;
      },
      set: function(tree: LandingTree) {
        store.commit("setSelectedWikiTree", tree);
      }
    },
    wikiTreeHistory: {
      get: function() {
        return store.getters.wikiTreeHistory;
      },
      set: function(history: LandingTree[]) {
        store.commit("setWikiTreeHistory", history);
      }
    }
  },
  mounted: function() {},
  data: () => ({}),
  methods: {
    changeTreeNode: function() {
      var arrayHistory = new Array<LandingTree>();
      Object.assign(arrayHistory, this.wikiTreeHistory);
      arrayHistory.push(this.parentNode);
      this.wikiTreeHistory = arrayHistory;
      this.selectedWikiTree = this.wikiNode;
    }
  }
});
</script>