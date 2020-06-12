<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>
        Gestion des évènements JDR passés
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" fullscreen persistent :retain-focus="false">
          <template v-slot:activator="{ on }">
            <v-btn icon color="blue" class="mb-2" v-on="on" dark>
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="black white--text">
              <span class="headline" v-if="editedItem._id != ''">JDR - {{editedItem.nameVF}}</span>
              <span class="headline" v-else>Nouveau JDR</span>
              <v-spacer></v-spacer>
              <v-btn text icon dark @click="dialog = false;">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.nameVF" label="Nom (VF)" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.nameVO" label="Name (VO)" outlined></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-textarea v-model="charactersString" outlined label="Personnages" placeholder="Séparer par des ;"></v-textarea>
                    <v-menu open-on-hover>
                      <template v-slot:activator="{ on }">
                        <v-btn color="indigo" dark v-on="on">
                          <v-icon left small>fa-user-friends</v-icon> Liste
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(character, index) in editedItem.characters"
                          :key="index"
                        >
                          <v-list-item-title>{{ character }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field v-model="editedItem.picture" label="URL de l'image" outlined></v-text-field>
                    <v-text-field
                      v-model="editedItem.pictureAuthor"
                      label="Auteur de l'image"
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.pictureAuthorLink"
                      label="URL de la page de l'auteur"
                      outlined
                    ></v-text-field>
                    <v-text-field v-model="editedItem.music" label="URL musique (YouTube)" outlined></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-img
                      :src="editedItem.picture"
                      v-if="editedItem.picture.length > 0"
                      :max-height="300"
                      contain
                    >
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular :size="70" :width="7" color="blue" indeterminate></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-textarea v-model="editedItem.captionVF" label="Caption (VF)" outlined></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-textarea v-model="editedItem.captionVO" label="Caption (VO)" outlined></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="subtitle-1">Version française</div>
                    <wyrd-editor :htmlContent.sync="editedItem.descriptionVF" name="descriptionVF" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="subtitle-1">English version</div>
                    <wyrd-editor :htmlContent.sync="editedItem.descriptionVO" name="descriptionVO" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="editedItem.timeline"
                      :items="timelines"
                      item-value="name"
                      item-text="name"
                      label="Timeline"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field type="number" v-model="editedItem.year" label="Année" outlined></v-text-field>
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
                @click="addEvent();"
                :disabled="editedItem.nameVF.length < 2"
                v-else
              >Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-data-table :items="events" :loading="loading" :headers="headers" must-sort>
        <template v-slot:item.characters="{ item }">
          <v-menu :max-height="300">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark fab small v-on="on">{{item.characters.length}}</v-btn>
            </template>
            <v-list dense>
              <v-list-item v-for="(character,index) in item.characters" :key="index">
                <v-list-item-title>{{character}}</v-list-item-title>
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
            <span class="headline">Suppression d'un évènement</span>
          </v-card-title>
          <v-card-text>Vous êtes sur le point de supprimer un évènement. Cette action est définitive. Êtes-vous sûr de vouloir continuer ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="deleteDialog = false;">Annuler</v-btn>
            <v-btn color="red" text @click="deleteEvent()">Supprimer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import EventJdr from "../../../model/Event.model";
import CKEditor from "../../../components/edition/Editor.vue";

export default Vue.extend({
  name: "AdminEvents",
  components: {
    "wyrd-editor": CKEditor
  },
  created: function() {
    this.fetchEvents();
    this.fetchTimelines();
  },
  computed: {
    events: function() {
      return store.getters.events;
    },
    timelines: {
      get: function() {
        return store.getters.timelines;
      }
    }
  },
  methods: {
    fetchTimelines: function() {
      store.dispatch("fetchTimelines");
    },
    fetchEvents: function() {
      this.loading = true;
      store.dispatch("fetchEvents").then(() => {
        this.loading = false;
      });
    },
    addEvent: function() {
      store.dispatch("addEvent", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem, new EventJdr());
      });
    },
    sendUpdate: function() {
      store.dispatch("updateEvent", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem, new EventJdr());
      });
    },
    deleteEvent: function() {
      store.dispatch("deleteEvent", this.editedItem).then(() => {
        this.deleteDialog = false;
        this.fetchEvents();
        Object.assign(this.editedItem, new EventJdr());
      });
    },
    openDialog: function(event: EventJdr) {
      Object.assign(this.editedItem, event);
      this.charactersString = event.characters.join(";");
      this.dialog = true;
    },
    closeDialog: function() {
      Object.assign(this.editedItem, new EventJdr());
      this.dialog = false;
      this.charactersString = "";
      this.fetchEvents();
    }
  },
  watch: {
    charactersString: function(){
      this.editedItem.characters = this.charactersString.split(";");
    }
  },
  data: () => ({
    dialog: false,
    deleteDialog: false,
    editedItem: new EventJdr(),
    loading: false,
    fab: false,
    charactersString: "",
    headers: [
      { text: "Nom", value: "nameVF" },
      { text: "Personnages", value: "characters", sortable: false },
      { text: "Timeline", value: "timeline" },
      { text: "Année", value: "year" },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  metaInfo: function() {
    return {
      title: "Backoffice JDR",
      link: [{ rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }]
    };
  }
});
</script>