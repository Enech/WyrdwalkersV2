<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>
        Gestion des approches
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
              >Approche - {{this.editedItem.nameVF}}</span>
              <span class="headline" v-else>Nouvelle approche</span>
              <v-spacer></v-spacer>
              <v-btn text icon dark @click="dialog = false;">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.nameVF" label="Nom (VF)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.nameVO" label="Name (VO)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.captionVF" label="Description (VF)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.captionVO" label="Caption (VO)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
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
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.location" label="Lieu"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.externalLink" label="Lien externe"></v-text-field>
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
                :disabled="editedItem.nameVF.length < 2"
                v-if="this.editedItem._id != ''"
              >Modifier</v-btn>
              <v-btn
                color="blue"
                text
                @click="addAnimation();"
                :disabled="editedItem.nameVF.length < 2"
                v-else
              >Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-data-table :items="animations" :loading="loading" :headers="headers" must-sort>
        <template v-slot:item.skillsWeights="{ item }">
          <v-btn fab small dark color="accent" target="_blank" :href="item.externalLink" v-if="item.externalLink.length > 0">
            <v-icon small>link</v-icon>
          </v-btn>
        </template>
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
            <span class="headline">Suppression d'une approche</span>
          </v-card-title>
          <v-card-text>Vous êtes sur le point de supprimer une approche. Cette action est définitive. Êtes-vous sûr de vouloir continuer ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="deleteDialog = false;">Annuler</v-btn>
            <v-btn color="red" text @click="deleteAnimation()">Supprimer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../../store";
import Approche from "../../../../model/explorer/Approche.model";

export default Vue.extend({
  name: "AdminApproches",
  created: function(){
    this.fetchApproaches();
  },
  computed:{
    approaches: function(){
      return store.getters.approaches;
    }
  },
  methods: {
    fetchApproaches: function() {
      this.loading = true;
      store.dispatch("fetchApproaches").then(() => {
        this.loading = false;
      });
    },
    addApproach: function() {
      store.dispatch("addApproach", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem,new Approche());
      });
    },
    sendUpdate: function() {
      store.dispatch("updateApproach", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem,new Approche());
      });
    },
    deleteApproach: function() {
      store.dispatch("deleteApproach", this.editedItem).then(() => {
        this.deleteDialog = false;
        this.fetchAnimations();
        Object.assign(this.editedItem,new Approche());
      });
    },
    openDialog: function(approche: Approche) {
      Object.assign(this.editedItem, approche);
      this.dialog = true;
    },
    closeDialog: function() {
      Object.assign(this.editedItem, new Approche());
      this.dialog = false;
      this.fetchAnimations();
    }
  },
  data: () => ({
    dialog: false,
    deleteDialog: false,
    editedItem: new Approche(),
    openDates: false,
    dateResult: '',
    loading: false,
    headers: [
      { text: "Nom (VF)", value: "nameVF" },
      { text: "Name (VO)", value: "nameVO" },
      { text: "Logos", value: "captionVF", sortable: false },
      { text: "Kosmos", value: "captionVO", sortable: false },
      { text: "Eros", value: "date" },
      { text: "Poids Talents", value: "skillsWeights" },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  metaInfo: function() {
    return {
      title:"Backoffice Approches",
      link: [
        { rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }
      ]
    };
  }
});
</script>