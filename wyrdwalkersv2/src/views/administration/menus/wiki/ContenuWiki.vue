<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>
        Gestion des pages wiki
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" fullscreen persistent>
          <template v-slot:activator="{ on }">
            <v-btn icon color="blue" class="mb-2" v-on="on" dark>
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <v-card>
             <v-card-title class="black white--text">
              <span class="headline" v-if="editedItem._id !== ''">Modifier la page {{editedItem.title.titleVF}}</span>
              <span class="headline" v-else>Nouvelle page</span>
              <v-spacer></v-spacer>
              <v-btn @click="dialog = false" text icon dark>
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.tags" label="Tags" placeholder="A séparer par des ,"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="subtitle-2">Version française</div>
                    <v-text-field v-model="editedItem.title.titleVF" label="Titre"></v-text-field>
                    <div class="subtitle-2 mt-3">Informations générales</div>
                    <wyrd-editor :editorContent="editedItem.generalInfos.vf" />
                    <div class="subtitle-2 mt-3">Mythe</div>
                    <wyrd-editor :editorContent="editedItem.myth.vf" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="subtitle-2">Version anglaise</div>
                    <v-text-field v-model="editedItem.title.titleVO" label="Title"></v-text-field>
                    <div class="subtitle-2 mt-3">General information</div>
                    <wyrd-editor :editorContent="editedItem.generalInfos.vo" />
                    <div class="subtitle-2 mt-3">Myth</div>
                    <wyrd-editor :editorContent="editedItem.myth.vo" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" text @click="dialog = false;">Annuler</v-btn>
              <v-btn
                color="blue"
                v-if="editedItem._id !== ''"
                text
              >Modifier</v-btn>
              <v-btn color="blue" v-else text>Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-data-table :items="pages" :loading="loading" :headers="headers" must-sort item-key="_id" loading-text="Chargement...">
        <template v-slot:items="props">
            <tr>
              <td>{{props.item.title.titleVF}}</td>
              <td>
                <v-icon color="green" v-if="props.item.generalInfos">check</v-icon>
                <v-icon color="red" v-else>close</v-icon>
              </td>
              <td>
                <v-icon color="green" v-if="props.item.myth">check</v-icon>
                <v-icon color="red" v-else>close</v-icon>
              </td>
              <td>
                <v-icon color="green" v-if="props.item.isEditionLocked">check</v-icon>
                <v-icon color="red" v-else>close</v-icon>
              </td>
              <td>
                <v-btn color="blue darken-2" icon dark>{{props.item.content.length}}</v-btn>
              </td>
              <td>
                <v-btn text icon color="black">
                  <v-icon small>edit</v-icon>
                </v-btn>
                <v-btn text icon color="red">
                  <v-icon small>delete</v-icon>
                </v-btn>
              </td>
            </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="deleteDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Suppression d'une page</span>
        </v-card-title>
        <v-card-text>Vous êtes sur le point de supprimer une page. Cette action est définitive. Êtes-vous sûr de vouloir continuer ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text>Annuler</v-btn>
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
import Editor from '@/components/edition/Editor.vue'

export default Vue.extend({
  name: "AdminWikiPages",
  components: {
    "wyrd-editor": Editor
  },
  created: function() {
    this.fetchWikipages();
  },
  methods: {
    fetchWikipages: function(){
      this.loading = true;
      store.dispatch("fetchAllWikiPages").then ((response: any) => {
        Object.assign(this.pages, response.data);
        this.loading = false;
      });
    }
  },
  data: () => ({
    editedItem: new WikiPage(),
    pages: new Array<WikiPage>(),
    loading: true,
    dialog: false,
    deleteDialog: false,
    search: "",
    headers: [
      { text: "Titre", value: "" },
      { text: "Général", value: "", sortable: false },
      { text: "Mythe", value: "", sortable: false },
      { text: "Locked", value: "" },
      { text: "Timelines", value: "" },
      { text: "Actions", value: "", sortable: false }
    ]
  })
});
</script>