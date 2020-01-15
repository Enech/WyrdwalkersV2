<template>
  <v-dialog persistent fullscreen v-model="open">
    <v-card>
      <v-card-title class="black white--text">
        <span>Informations générales - {{content.title.titleVF}}</span>
        <v-spacer></v-spacer>
        <v-btn dark icon @click="open = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <wyrd-editor :htmlContent="content.generalInfos.vf" />
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";
import WikiPage from "../../model/WikiPage.model";
import QuillEditor from "../edition/Editor.vue"

export default Vue.extend({
  name: "EditGeneral",
  components: {
    "wyrd-editor": QuillEditor
  },
  props: {
    content: WikiPage
  },
  created: function() {},
  data: () => ({}),
  methods: {},
  computed: {
    open: {
      get: function(){
        return store.getters.generalDialog;
      },
      set: function(open: boolean){
        store.commit("setGeneralDialog", open);
      }
    }
  }
});
</script>