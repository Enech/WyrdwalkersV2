<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>
        Entités de l'Explorateur
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
              >Entité - {{this.editedItem.nameVF}} ({{this.editedItem.faction.name}})</span>
              <span class="headline" v-else>Nouvelle entité</span>
              <v-spacer></v-spacer>
              <v-btn text icon dark @click="closeDialog()">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Nom (VF)" v-model="editedItem.name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Name (VO)" v-model="editedItem.nameVO"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Titre (VF)" v-model="editedItem.title"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Title (VO)" v-model="editedItem.titleVO"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-select
                      label="Faction"
                      :items="factions"
                      return-object
                      item-text="name"
                      item-value="key"
                      v-model="editedItem.faction"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-select
                      label="Origine"
                      :items="origins"
                      v-model="editedItem.origin"
                      item-value="_id"
                      item-text="nameVF"
                      return-object
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-select
                      label="Personalités"
                      :items="personalities"
                      item-value="_id"
                      item-text="nameVF"
                      multiple
                      v-model="editedItem.personalities"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-select
                      label="Domaines"
                      :items="domains"
                      item-value="_id"
                      item-text="nameVF"
                      multiple
                      v-model="editedItem.domains"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-select
                      label="Approches"
                      :items="approaches"
                      item-value="_id"
                      item-text="nameVF"
                      multiple
                      v-model="editedItem.approaches"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">Pour le calcul automatique du LEK, laisser les scores à -1</v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field label="Logos" v-model="editedItem.logos"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field label="Kosmos" v-model="editedItem.kosmos"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field label="Eros" v-model="editedItem.eros"></v-text-field>
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
                :disabled="editedItem.name.length < 2"
                v-if="this.editedItem._id != ''"
              >Modifier</v-btn>
              <v-btn
                color="blue"
                text
                @click="addExplorerEntity();"
                :disabled="editedItem.name.length < 2"
                v-else
              >Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-data-table :items="explorerEntities" :loading="loading" :headers="headers">
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
            <span class="headline">Suppression d'une entité</span>
          </v-card-title>
          <v-card-text>Vous êtes sur le point de supprimer une entité. Cette action est définitive. Êtes-vous sûr de vouloir continuer ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="deleteDialog = false;">Annuler</v-btn>
            <v-btn color="red" text @click="deleteOrigin()">Supprimer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import EntityExplorer from "../../../model/explorer/EntityExplorer.model";
import ExplorerFaction from "../../../model/enums/ExplorerFaction.enum";
import Origin from "../../../model/explorer/Origin.model";
import Personality from "../../../model/explorer/Personality.model";
import Domaine from "../../../model/explorer/Domaine.model";
import Approche from "../../../model/explorer/Approche.model";

export default Vue.extend({
  name: "AdminExplorer",
  created: function() {
    this.fetchExplorerEntities();
    store.dispatch("fetchApproaches");
    store.dispatch("fetchDomains");
    store.dispatch("fetchPersonalities");
    store.dispatch("fetchOrigins");
  },
  computed: {
    explorerEntities: function() {
      return store.getters.explorerEntities;
    },
    personalities: function() {
      return store.getters.personalities;
    },
    domains: function() {
      return store.getters.domains;
    },
    origins: function() {
      return store.getters.origins;
    },
    approaches: function() {
      return store.getters.approaches;
    },
    needAutoLEKCompute: function() {
      return (
        this.editedItem.logos < 0 &&
        this.editedItem.kosmos < 0 &&
        this.editedItem.eros < 0
      );
    }
  },
  methods: {
    fetchExplorerEntities: function() {
      this.loading = true;
      store.dispatch("fetchExplorerEntities").then(() => {
        this.loading = false;
      });
    },
    addExplorerEntity: function() {
      if (this.needAutoLEKCompute) {
        this.computeLEKScores();
      }
      store.dispatch("addExplorerEntity", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem, new EntityExplorer());
      });
    },
    sendUpdate: function() {
      if (this.needAutoLEKCompute) {
        this.computeLEKScores();
      }
      store.dispatch("updateExplorerEntity", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem, new EntityExplorer());
      });
    },
    deleteOrigin: function() {
      store.dispatch("deleteExplorerEntity", this.editedItem).then(() => {
        this.deleteDialog = false;
        this.fetchExplorerEntities();
        Object.assign(this.editedItem, new EntityExplorer());
      });
    },
    openDialog: function(pantheon: EntityExplorer) {
      Object.assign(this.editedItem, pantheon);
      this.dialog = true;
    },
    closeDialog: function() {
      Object.assign(this.editedItem, new EntityExplorer());
      this.dialog = false;
      this.fetchExplorerEntities();
    },
    computeLEKScores: function() {
      var approcheObj = {
        logos: 0,
        kosmos: 0,
        eros: 0
      };
      var domainObj = {
        logos: 0,
        kosmos: 0,
        eros: 0
      };
      var personalityObj = {
        logos: 0,
        kosmos: 0,
        eros: 0
      };
      var originObj = {
        logos: 0,
        kosmos: 0,
        eros: 0
      };

      if (approcheObj) {
        for (var i = 0; i < this.editedItem.approaches.length; i++) {
          var approcheID = this.editedItem.approaches[i];
          var approche = this.approaches.filter((obj: any) => {
            return obj._id === approcheID;
          })[0];
          approcheObj.logos += approche.logos / (i + 1);
          approcheObj.kosmos += approche.kosmos / (i + 1);
          approcheObj.eros += approche.eros / (i + 1);
        }
      }
      if (domainObj) {
        for (i = 0; i < this.editedItem.domains.length; i++) {
          var domaineID = this.editedItem.domains[i];
          var domaine = this.domains.filter((obj: any) => {
            return obj._id === domaineID;
          })[0];
          domainObj.logos += domaine.logos / this.editedItem.domains.length;
          domainObj.kosmos += domaine.kosmos / this.editedItem.domains.length;
          domainObj.eros += domaine.eros / this.editedItem.domains.length;
        }
      }
      if (personalityObj) {
        for (i = 0; i < this.editedItem.personalities.length; i++) {
          var personalityID = this.editedItem.personalities[i];
          var personality = this.personalities.filter((obj: any) => {
            return obj._id === personalityID;
          })[0];
          personalityObj.logos +=
            personality.logos / this.editedItem.personalities.length;
          personalityObj.kosmos +=
            personality.kosmos / this.editedItem.personalities.length;
          personalityObj.eros +=
            personality.eros / this.editedItem.personalities.length;
        }
      }
      if (originObj) {
        originObj.logos = this.editedItem.origin.logos;
        originObj.kosmos = this.editedItem.origin.kosmos;
        originObj.eros = this.editedItem.origin.eros;
      }
      if (approcheObj && domainObj && personalityObj && originObj) {
        if (this.editedItem.faction.key == ExplorerFaction.TITAN) {
          this.editedItem.logos =
            Math.round(
              (0.1 * approcheObj.logos +
                0.25 * domainObj.logos +
                0.25 * personalityObj.logos +
                0.4 * originObj.logos) *
                10
            ) / 10;
          this.editedItem.kosmos =
            Math.round(
              (0.1 * approcheObj.kosmos +
                0.25 * domainObj.kosmos +
                0.25 * personalityObj.kosmos +
                0.4 * originObj.kosmos) *
                10
            ) / 10;
          this.editedItem.eros =
            Math.round(
              (0.1 * approcheObj.eros +
                0.25 * domainObj.eros +
                0.25 * personalityObj.eros +
                0.4 * originObj.eros) *
                10
            ) / 10;
        } else {
          this.editedItem.logos =
            Math.round(
              (0.15 * approcheObj.logos +
                0.35 * domainObj.logos +
                0.35 * personalityObj.logos +
                0.15 * originObj.logos) *
                10
            ) / 10;
          this.editedItem.kosmos =
            Math.round(
              (0.15 * approcheObj.kosmos +
                0.35 * domainObj.kosmos +
                0.35 * personalityObj.kosmos +
                0.15 * originObj.kosmos) *
                10
            ) / 10;
          this.editedItem.eros =
            Math.round(
              (0.15 * approcheObj.eros +
                0.35 * domainObj.eros +
                0.35 * personalityObj.eros +
                0.15 * originObj.eros) *
                10
            ) / 10;
        }
      }
    }
  },
  data: () => ({
    dialog: false,
    deleteDialog: false,
    editedItem: new EntityExplorer(),
    loading: false,
    headers: [
      { text: "Nom (VF)", value: "name" },
      { text: "Name (VO)", value: "nameVO" },
      { text: "Logos", value: "logos" },
      { text: "Kosmos", value: "kosmos" },
      { text: "Eros", value: "eros" },
      { text: "Faction", value: "faction.name" },
      { text: "Actions", value: "action", sortable: false }
    ],
    factions: [
      { key: ExplorerFaction.GOD, name: "Dieux", nameVO: "Gods" },
      { key: ExplorerFaction.TITAN, name: "Titans", nameVO: "Titans" },
      { key: ExplorerFaction.MYTHBORN, name: "Mythborns", nameVO: "Mythborns" },
      { key: ExplorerFaction.SOCIETY, name: "Eveillés", nameVO: "Enlighteneds" }
    ]
  }),
  metaInfo: function() {
    return {
      title: "Backoffice Explorateur",
      link: [{ rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }]
    };
  }
});
</script>