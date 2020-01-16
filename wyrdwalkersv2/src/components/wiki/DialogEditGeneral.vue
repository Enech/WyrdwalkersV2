<template>
  <v-dialog persistent fullscreen v-model="open">
    <v-card>
      <v-card-title class="black white--text">
        <span>Informations générales - {{page.title.titleVF}}</span>
        <v-spacer></v-spacer>
        <v-btn dark icon @click="closeDialog()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-alert type="error" v-if="content.isEditionLocked">Cette page est actuellement éditée par un autre utilisateur. Les changements que vous ferez risquent d'être perdus. Continuez à vos risques et périls.</v-alert>
      <div class="pa-3">
        <v-row>
          <v-col cols="12" md="6">
            <div class="subtitle-1">Version française</div>
            <wyrd-editor :htmlContent.sync="page.generalInfos.vf" name="generalVF" />
          </v-col>
          <v-col cols="12" md="6">
            <div class="subtitle-1">English version</div>
            <wyrd-editor :htmlContent.sync="page.generalInfos.vo" name="generalVO" />
          </v-col>
        </v-row>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black" text @click="closeDialog()">Annuler</v-btn>
        <v-btn color="blue" text @click="sendUpdate();">Modifier</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";
import WikiPage from "../../model/WikiPage.model";
import CKEditor from "../edition/Editor.vue";

export default Vue.extend({
  name: "EditGeneral",
  components: {
    "wyrd-editor": CKEditor
  },
  props: {
    content: WikiPage
  },
  mounted: function() {
    Object.assign(this.page, this.content);
  },
  data: () => ({
    page: new WikiPage()
  }),
  methods: {
    sendUpdate: function() {
      this.page.author = this.currentUser.login;
      store.dispatch("updateWikiPage", this.page).then(() => {
        this.closeDialog();
      });
    },
    closeDialog: function() {
      this.open = false;
      if (this.page._id.length > 0) {
        store
          .dispatch("lockWikiPage", {
            pageID: this.page._id,
            lock: false
          })
          .then(() => {
            this.refreshData = true;
          });
      } else {
        this.refreshData = true;
      }
    }
  },
  computed: {
    open: {
      get: function() {
        return store.getters.generalDialog;
      },
      set: function(open: boolean) {
        store.commit("setGeneralDialog", open);
      }
    },
    currentUser: function() {
      return store.getters.currentUser;
    },
    refreshData: {
      get: function() {
        return store.getters.refreshData;
      },
      set: function(refresh: boolean) {
        store.commit("setRefreshData", refresh);
      }
    }
  }
});
</script>