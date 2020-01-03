<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>
        Gestion des timelines
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <template v-slot:activator="{ on }">
            <v-btn icon color="blue" class="mb-2" v-on="on" dark>
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Nouvelle timeline</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.name" label="Nom"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.availableTeams" label="Equipes disponibles"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <div class="subtitle-1">Premier évènement</div>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      type="number"
                      v-model="editedItem.firstEvent.month"
                      label="Mois (optionnel)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field type="number" v-model="editedItem.firstEvent.year" label="Année"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.firstEvent.title" label="Titre"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea v-model="editedItem.firstEvent.content" label="Contenu"></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" text @click="dialog = false;">Annuler</v-btn>
              <v-btn color="blue" text @click="addTimeline();">Ajouter</v-btn>
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
          <v-btn text icon color="black" @click.stop="editedItem = item; editDialog = true;">
            <v-icon small>edit</v-icon>
          </v-btn>
          <v-btn text icon color="red" @click.stop="editedItem = item; deleteDialog = true;">
            <v-icon small>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="editDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Modification d'une timeline</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.name" label="Nom"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.availableTeams" label="Equipes disponibles"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <div class="subtitle-1">Premier évènement</div>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      type="number"
                      v-model="editedItem.firstEvent.month"
                      label="Mois (optionnel)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field type="number" v-model="editedItem.firstEvent.year" label="Année"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.firstEvent.title" label="Titre"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea v-model="editedItem.firstEvent.content" label="Contenu"></v-textarea>
                  </v-col>
                </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="editDialog = false;">Annuler</v-btn>
          <v-btn color="blue" text @click="editTimeline()">Modifier</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Suppression d'une timeline</span>
        </v-card-title>
        <v-card-text>Vous êtes sur le point de supprimer une redirection. Cette action est définitive. Êtes-vous sûr de vouloir continuer ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="deleteDialog = false;">Annuler</v-btn>
          <v-btn color="red" text @click="deleteTimeline()">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import Timeline from "../../../model/Timeline.model";

export default Vue.extend({
  name: "AdminWikiTimelines",
  created: function() {
    this.fetchTimelines();
  },
  computed: {
    timelines: {
      get: function() {
        return store.getters.timelines;
      },
      set: function(values: Timeline[]) {
        store.commit("setTimelines", values);
      }
    }
  },
  methods: {
    fetchTimelines: function() {
      this.loading = true;
      store.dispatch("fetchTimelines").then(() => {
        this.loading = false;
      });
    },
    addTimeline: function() {
      this.dialog = false;
      store.dispatch("addTimeline", this.editedItem).then(() => {
        this.fetchTimelines();
      });
      this.editedItem = new Timeline();
    },
    editTimeline: function() {
      this.editDialog = false;
      store.dispatch("updateWikiRedirection", this.editedItem).then(() => {
        this.fetchTimelines();
      });
      this.editedItem = new Timeline();
    },
    deleteTimeline: function() {
      this.deleteDialog = false;
      store.dispatch("deleteWikiRedirection", this.editedItem._id).then(() => {
        this.fetchTimelines();
      });
      this.editedItem = new Timeline();
    }
  },
  data: () => ({
    editedItem: new Timeline(),
    loading: true,
    dialog: false,
    editDialog: false,
    deleteDialog: false,
    headers: [
      { text: "Nom", value: "name" },
      { text: "Description", value: "description" },
      { text: "1° évènement", value: "firstEvent" },
      { text: "Evènements", value: "events" },
      { text: "Actions", value: "action" }
    ]
  })
});
</script>