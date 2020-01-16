<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>
        Gestion des animations
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <template v-slot:activator="{ on }">
            <v-btn icon color="blue" class="mb-2" v-on="on" dark>
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="black white--text">
              <span
                class="headline"
                v-if="this.editedItem._id != ''"
              >Historique - {{this.editedItem.nameVF}}</span>
              <span class="headline" v-else>Nouvelle entrée historique</span>
              <v-spacer></v-spacer>
              <v-btn text icon dark @click="dialog = false;">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-textarea v-model="editedItem.title" label="Titre"></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-menu
                      v-model="openDates"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateResult"
                          label="Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="dateResult" @input="openDates = false" locale="fr-fr"></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" text @click="dialog = false;">Annuler</v-btn>
              <v-btn
                color="blue"
                text
                @click="sendUpdate();"
                :disabled="editedItem.title.length < 2"
                v-if="this.editedItem._id != ''"
              >Modifier</v-btn>
              <v-btn
                color="blue"
                text
                @click="addHistory();"
                :disabled="editedItem.title.length < 2"
                v-else
              >Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-data-table :items="history" :loading="loading" :headers="headers" must-sort>
        <template v-slot:item.action="{ item }">
          <v-btn fab small dark color="light-blue" @click.stop="openDialog(item)">
            <v-icon small>edit</v-icon>
          </v-btn>
          <v-btn fab small dark color="red" @click.stop="editedItem = item; deleteDialog = true;">
            <v-icon small>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="deleteDialog" max-width="500px" persistent>
        <v-card>
          <v-card-title>
            <span class="headline">Suppression d'une entrée historique</span>
          </v-card-title>
          <v-card-text>Vous êtes sur le point de supprimer une entrée de l'historique. Cette action est définitive. Êtes-vous sûr de vouloir continuer ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="deleteDialog = false;">Annuler</v-btn>
            <v-btn color="red" text @click="deleteHistory()">Supprimer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import AssoHistory from "../../../model/AssoHistory.model";

export default Vue.extend({
  name: "AdminHistorique",
  created: function(){
    this.fetchHistory();
  },
  computed:{
    history: function(){
      return store.getters.assoHistory;
    }
  },
  methods: {
    fetchHistory: function() {
      this.loading = true;
      store.dispatch("fetchAssoHistory").then(() => {
        this.loading = false;
      });
    },
    addHistory: function() {
      store.dispatch("addHistory", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem,new AssoHistory());
      });
    },
    sendUpdate: function() {
      store.dispatch("updateHistory", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem,new AssoHistory());
      });
    },
    deleteHistory: function() {
      store.dispatch("deleteHistory", this.editedItem).then(() => {
        this.deleteDialog = false;
        this.fetchHistory();
        Object.assign(this.editedItem,new AssoHistory());
      });
    },
    openDialog: function(animation: AssoHistory) {
      Object.assign(this.editedItem, animation);
      this.dialog = true;
    },
    closeDialog: function() {
      Object.assign(this.editedItem, new AssoHistory());
      this.dialog = false;
      this.fetchHistory();
    }
  },
  watch: {
    dateResult: function() {
      this.editedItem.date = this.dateResult;
    },
    dialog: function(){
      if(this.dialog){
        if(this.editedItem.date.length < 1){
          this.dateResult = new Date().toISOString().substring(0, 10);
        } else {
          this.dateResult = new Date(this.editedItem.date).toISOString().substring(0, 10);
        }
      }
    }
  },
  data: () => ({
    dialog: false,
    deleteDialog: false,
    editedItem: new AssoHistory(),
    openDates: false,
    dateResult: '',
    loading: false,
    headers: [
      { text: "Titre", value: "title" },
      { text: "Date", value: "date" },
      { text: "Actions", value: "action", sortable: false }
    ]
  })
});
</script>