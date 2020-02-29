<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>
        Gestion des approches
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
                v-if="this.editedItem._id != ''"
              >Approche - {{this.editedItem.nameVF}}</span>
              <span class="headline" v-else>Nouvelle approche</span>
              <v-spacer></v-spacer>
              <v-btn text icon dark @click="closeDialog()">
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
                  <v-col cols="12" sm="4">
                    <v-text-field v-model="editedItem.logos" label="Score Logos"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field v-model="editedItem.kosmos" label="Score Kosmos"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field v-model="editedItem.eros" label="Score Eros"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-text-field
                      v-model="editedItem.skillsWeights.athletics"
                      label="Athlétisme"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-text-field
                      v-model="editedItem.skillsWeights.rapport"
                      label="Rapport"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-text-field
                      v-model="editedItem.skillsWeights.engineering"
                      label="Ingénierie"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-text-field
                      v-model="editedItem.skillsWeights.combat"
                      label="Combat"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-text-field
                      v-model="editedItem.skillsWeights.lore"
                      label="Savoir"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-text-field
                      v-model="editedItem.skillsWeights.notice"
                      label="Perception"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-text-field
                      v-model="editedItem.skillsWeights.physique"
                      label="Physique"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-text-field
                      v-model="editedItem.skillsWeights.presence"
                      label="Présence"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-text-field
                      v-model="editedItem.skillsWeights.manipulation"
                      label="Manipulation"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-text-field
                      v-model="editedItem.skillsWeights.resources"
                      label="Ressources"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-text-field
                      v-model="editedItem.skillsWeights.marksmanship"
                      label="Tir"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-text-field
                      v-model="editedItem.skillsWeights.stealth"
                      label="Furtivité"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="3">
                    <v-text-field
                      v-model="editedItem.skillsWeights.will"
                      label="Volonté"
                      type="number"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" text @click="closeDialog();">Annuler</v-btn>
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
                @click="addApproach();"
                :disabled="editedItem.nameVF.length < 2"
                v-else
              >Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-data-table :items="approaches" :loading="loading" :headers="headers">
          
        <template v-slot:item.skillsWeights="{ item }">
          <v-menu :max-height="300">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark fab small v-on="on">#</v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>Athlétisme : {{item.skillsWeights.athletics}}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Rapport : {{item.skillsWeights.rapport}}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Ingénierie : {{item.skillsWeights.engineering}}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Combat : {{item.skillsWeights.combat}}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Savoir : {{item.skillsWeights.lore}}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Perception : {{item.skillsWeights.notice}}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Physique : {{item.skillsWeights.physique}}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Presence : {{item.skillsWeights.presence}}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Manipulation : {{item.skillsWeights.manipulation}}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Ressources : {{item.skillsWeights.resources}}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Tir : {{item.skillsWeights.marksmanship}}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Furtivité : {{item.skillsWeights.stealth}}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Volonté : {{item.skillsWeights.will}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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
            <v-btn color="red" text @click="deleteApproach()">Supprimer</v-btn>
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
  created: function() {
    this.fetchApproaches();
  },
  computed: {
    approaches: function() {
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
        Object.assign(this.editedItem, new Approche());
      });
    },
    sendUpdate: function() {
      store.dispatch("updateApproach", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem, new Approche());
      });
    },
    deleteApproach: function() {
      store.dispatch("deleteApproach", this.editedItem).then(() => {
        this.deleteDialog = false;
        this.fetchApproaches();
        Object.assign(this.editedItem, new Approche());
      });
    },
    openDialog: function(approche: Approche) {
      Object.assign(this.editedItem, approche);
      this.dialog = true;
    },
    closeDialog: function() {
      Object.assign(this.editedItem, new Approche());
      this.dialog = false;
      this.fetchApproaches();
    }
  },
  data: () => ({
    dialog: false,
    deleteDialog: false,
    editedItem: new Approche(),
    openDates: false,
    dateResult: "",
    loading: false,
    headers: [
      { text: "Nom (VF)", value: "nameVF" },
      { text: "Name (VO)", value: "nameVO" },
      { text: "Logos", value: "logos" },
      { text: "Kosmos", value: "kosmos" },
      { text: "Eros", value: "eros" },
      { text: "Poids Talents", value: "skillsWeights", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  metaInfo: function() {
    return {
      title: "Backoffice Approches",
      link: [{ rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }]
    };
  }
});
</script>