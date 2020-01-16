<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>
        Gestion des redirections
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <template v-slot:activator="{ on }">
            <v-btn icon color="blue" class="mb-2" v-on="on" dark>
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Nouvelle redirection</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.originVF" label="Origine (VF)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.originVO" label="Origine (VO)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.destinationVF" label="Destination (VF)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.destinationVO" label="Destination (VO)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" text @click="dialog = false;">Annuler</v-btn>
              <v-btn color="blue" text @click="addRedirection();">Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <v-text-field append-icon="search" v-model="search"></v-text-field>
      </v-toolbar>
      <v-data-table :items="redirections" :loading="loading" :headers="headers" must-sort>
        <template v-slot:item.action="{ item }">
          <v-btn fab small dark color="light-blue" @click.stop="editedItem = item; editDialog = true;">
            <v-icon small>edit</v-icon>
          </v-btn>
          <v-btn fab small dark color="red" @click.stop="editedItem = item; deleteDialog = true;">
            <v-icon small>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="editDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Modification d'une redirection</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.originVF" label="Origine (VF)"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.originVO" label="Origine (VO)"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.destinationVF" label="Destination (VF)"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.destinationVO" label="Destination (VO)"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="editDialog = false;">Annuler</v-btn>
          <v-btn color="blue" text @click="editRedirection()">Modifier</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Suppression d'une redirection</span>
        </v-card-title>
        <v-card-text>Vous êtes sur le point de supprimer une redirection. Cette action est définitive. Êtes-vous sûr de vouloir continuer ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="deleteDialog = false;">Annuler</v-btn>
          <v-btn color="red" text @click="deleteRedirection()">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../../store";
import WikiRedirection from "../../../../model/WikiRedirection.model";

export default Vue.extend({
  name: "AdminWikiRedirections",
  created: function() {
    this.fetchRedirections();
  },
  computed: {
    storeRedirections: {
      get: function() {
        return store.getters.wikiRedirections;
      },
      set: function(values: WikiRedirection[]) {
        store.commit("setWikiRedirections", values);
      }
    }
  },
  methods: {
    fetchRedirections: function() {
      this.loading = true;
      store.dispatch("fetchAllWikiRedirections").then(() => {
        this.redirections = this.storeRedirections;
        this.loading = false;
      });
    },
    addRedirection: function() {
      this.dialog = false;
      store.dispatch("addWikiRedirection", this.editedItem).then(() => {
        this.fetchRedirections();
      });
      this.editedItem = new WikiRedirection();
    },
    editRedirection: function() {
      this.editDialog = false;
      store.dispatch("updateWikiRedirection", this.editedItem).then(() => {
        this.fetchRedirections();
      });
      this.editedItem = new WikiRedirection();
    },
    deleteRedirection: function() {
      this.deleteDialog = false;
      store.dispatch("deleteWikiRedirection", this.editedItem._id).then(() => {
        this.fetchRedirections();
      });
      this.editedItem = new WikiRedirection();
    }
  },
  watch: {
      search: function(newValue: string){
          var reference =  this.search.toLowerCase();
          if(this.search.length > 0){
              this.redirections = this.storeRedirections.filter((redirection: WikiRedirection) => redirection.originVO.toLowerCase().includes(reference) || redirection.originVF.toLowerCase().includes(reference) || redirection.destinationVO.toLowerCase().includes(reference) || redirection.destinationVF.toLowerCase().includes(reference));
          } else {
              this.redirections = this.storeRedirections;
          }
      }
  },
  data: () => ({
    redirections: new Array<WikiRedirection>(),
    editedItem: new WikiRedirection(),
    loading: true,
    dialog: false,
    editDialog: false,
    deleteDialog: false,
    search: '',
    headers: [
      { text: "Origine (VF)", value: "originVF" },
      { text: "Origine (VO)", value: "originVO" },
      { text: "Destination (VF)", value: "destinationVF" },
      { text: "Destination (VO)", value: "destinationVO" },
      { text: "Actions", value: "action" }
    ]
  }),
  metaInfo: function() {
    return {
      title:"Backoffice Redirections",
      link: [
        { rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }
      ]
    };
  }
});
</script>