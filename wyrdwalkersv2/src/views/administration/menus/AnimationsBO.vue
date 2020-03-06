<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>
        Gestion des animations
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="1000px" persistent>
          <template v-slot:activator="{ on }">
            <v-btn icon color="blue" class="mb-2" v-on="on" dark>
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="black white--text">
              <span
                class="headline"
                v-if="editedItem._id != ''"
              >Animation - {{editedItem.nameVF}}</span>
              <span class="headline" v-else>Nouvelle animation</span>
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
                    <v-textarea v-model="editedItem.captionVF" label="Description (VF)"></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-textarea v-model="editedItem.captionVO" label="Caption (VO)"></v-textarea>
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
                v-if="editedItem._id != ''"
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
        <template v-slot:item.externalLink="{ item }">
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
            <span class="headline">Suppression d'une animation</span>
          </v-card-title>
          <v-card-text>Vous êtes sur le point de supprimer une animation. Cette action est définitive. Êtes-vous sûr de vouloir continuer ?</v-card-text>
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
import store from "../../../store";
import AnimationWW from "../../../model/Animation.model";

export default Vue.extend({
  name: "AdminAnimation",
  created: function(){
    this.fetchAnimations();
  },
  computed:{
    animations: function(){
      return store.getters.activities;
    }
  },
  methods: {
    fetchAnimations: function() {
      this.loading = true;
      store.dispatch("fetchActivities").then(() => {
        this.loading = false;
      });
    },
    addAnimation: function() {
      store.dispatch("addActivity", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem,new AnimationWW());
      });
    },
    sendUpdate: function() {
      store.dispatch("updateActivity", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem,new AnimationWW());
      });
    },
    deleteAnimation: function() {
      store.dispatch("deleteActivity", this.editedItem).then(() => {
        this.deleteDialog = false;
        this.fetchAnimations();
        Object.assign(this.editedItem,new AnimationWW());
      });
    },
    openDialog: function(animation: AnimationWW) {
      Object.assign(this.editedItem, animation);
      this.dialog = true;
    },
    closeDialog: function() {
      Object.assign(this.editedItem, new AnimationWW());
      this.dialog = false;
      this.fetchAnimations();
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
    editedItem: new AnimationWW(),
    openDates: false,
    dateResult: '',
    loading: false,
    headers: [
      { text: "Nom (VF)", value: "nameVF" },
      { text: "Name (VO)", value: "nameVO" },
      { text: "Description (VF)", value: "captionVF", sortable: false },
      { text: "Caption (VO)", value: "captionVO", sortable: false },
      { text: "Date", value: "date" },
      { text: "Lieu", value: "location" },
      { text: "Lien", value: "externalLink", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  metaInfo: function() {
    return {
      title:"Backoffice Animations",
      link: [
        { rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }
      ]
    };
  }
});
</script>