<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>
        Gestion du contenu
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <template v-slot:activator="{ on }">
            <v-btn icon color="blue" class="mb-2" v-on="on" dark>
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Nouvelle page de wiki</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" text @click="dialog = false;">Annuler</v-btn>
              <v-btn color="blue" text>Ajouter</v-btn>
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
    <v-dialog v-model="editDialog" max-width="500px" persistent fullscreen>
      <v-card>
        <v-card-title>
          <span class="headline">Modification d'une page</span>
        </v-card-title>
        <v-card-text>
          <v-container>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="editDialog = false;">Annuler</v-btn>
          <v-btn color="blue" text>Modifier</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Suppression d'une page</span>
        </v-card-title>
        <v-card-text>Vous êtes sur le point de supprimer une page du wiki. Cette action est définitive. Êtes-vous sûr de vouloir continuer ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="deleteDialog = false;">Annuler</v-btn>
          <v-btn color="red" text>Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../../store";
import WikiPage from "../../../../model/WikiPage.model";

export default Vue.extend({
  name: "AdminWikiContent",
  created: function() {
  },
  computed: {
  },
  methods: {
  },
  watch: {
      search: function(newValue: string){
          var reference =  this.search.toLowerCase();
      }
  },
  data: () => ({
    editedItem: new WikiPage(),
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
  })
});
</script>