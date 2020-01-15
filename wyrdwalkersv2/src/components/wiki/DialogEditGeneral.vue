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
      <div class="pa-3">
        <v-row>
          <v-col cols="12">
            <div class="subtitle-1">Version française</div>
            <wyrd-editor :htmlContent.sync="content.generalInfos.vf" name="generalVF" />
          </v-col>
        </v-row>
        <v-divider class="my-3"></v-divider>
        <v-row>
          <v-col cols="12">
            <div class="subtitle-1">English version</div>
            <wyrd-editor :htmlContent.sync="content.generalInfos.vo" name="generalVO" />
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";
import WikiPage from "../../model/WikiPage.model";
import CKEditor from "../edition/Editor.vue"

export default Vue.extend({
  name: "EditGeneral",
  components: {
    "wyrd-editor": CKEditor
  },
  props: {
    content: WikiPage
  },
  created: function() {},
  data: () => ({
  }),
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