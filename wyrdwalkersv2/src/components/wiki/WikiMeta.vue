<template>
  <div>
    <v-img :src="picture" eager></v-img>
    <v-list-item class="blue mb-1" dark v-if="picture != ''">
      <v-list-item-icon>
        <v-icon small>edit</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <span v-if="pictureAuthor != ''">{{pictureAuthor}}</span>
        <span v-else>{{$t("wiki.contents.lore.noAuthor")}}</span>
      </v-list-item-content>
    </v-list-item>
    <div v-if="music != ''">
      <iframe
        width="100%"
        height="100"
        :src="music"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";

export default Vue.extend({
  name: "WikiMeta",
  mounted: function() {
      alert(this.picture);
  },
  data: () => ({}),
  methods: {},
  props: {
    picture: String,
    pictureAuthor: String,
    authorPage: String,
    music: String
  }
});
