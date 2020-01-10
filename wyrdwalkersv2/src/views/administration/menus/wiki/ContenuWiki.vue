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
            <v-card-title>
              <span class="headline" v-if="editedItem._id !== ''">Modifier la page {{editedItem.title.titleVF}}</span>
              <span class="headline" v-else>Nouvelle page</span>
              <v-spacer></v-spacer>
              <v-btn @click="dialog = false" text icon>
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
                  <v-col cols="12">
                    <v-combobox
                      v-model="editedItem.availableTeams"
                      :items="allTeams"
                      label="Camps disponibles"
                      multiple
                      chips
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          :key="JSON.stringify(data.item)"
                          v-bind="data.attrs"
                          :input-value="data.selected"
                          :disabled="data.disabled"
                          @click:close="data.parent.selectItem(data.item)"
                        >
                          <v-avatar class="accent white--text" left v-text="data.item.slice(0, 2)"></v-avatar>
                          {{ data.item }}
                        </v-chip>
                      </template>
                    </v-combobox>
                  </v-col>
                </v-row>
                <v-divider class="mb-3"></v-divider>
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
                <v-divider class="mb-3"></v-divider>
                <div class="subtitle-1">Evènements suivants</div>
                <div v-for="(event,index) in editedItem.events" :key="index">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field type="number" v-model="event.month" label="Mois (optionnel)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="number" v-model="event.year" label="Année"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="event.title" label="Titre"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="event.content" label="Contenu"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-btn
                        color="red"
                        dark
                        @click.stop="editedItem.events.splice(index,1)"
                      >Supprimer</v-btn>
                    </v-col>
                  </v-row>
                </div>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" text @click="dialog = false;">Annuler</v-btn>
              <v-btn
                color="blue"
                v-if="editedItem._id !== ''"
                text
                @click="editTimeline();"
              >Modifier</v-btn>
              <v-btn color="blue" v-else text @click="addTimeline();">Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-data-table :items="timelines" :loading="loading" :headers="headers" must-sort>
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item._id">
              <td>{{item.name}}</td>
              <td>{{item.description}}</td>
              <td>{{`${item.firstEvent.title} / ${item.firstEvent.year}`}}</td>
              <td>
                <v-menu :max-height="300">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">Voir</v-btn>
                  </template>
                  <v-list two-line>
                    <v-list-item v-for="(event,index) in item.events" :key="index">
                      <v-list-item-title>{{event.title}}</v-list-item-title>
                      <v-list-item-subtitle>{{event.year}}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
              <td>
                <v-menu :max-height="300">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">Voir</v-btn>
                  </template>
                  <v-list>
                    <v-list-item v-for="(team,index) in item.availableTeams" :key="index">
                      <v-list-item-title>{{team}}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
              <td>
                <v-btn text icon color="black" @click.stop="editedItem = item; dialog = true;">
                  <v-icon small>edit</v-icon>
                </v-btn>
                <v-btn text icon color="red" @click.stop="editedItem = item; deleteDialog = true;">
                  <v-icon small>delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
        <template v-slot:item.action="{ item }"></template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="deleteDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Suppression d'une timeline</span>
        </v-card-title>
        <v-card-text>Vous êtes sur le point de supprimer une timeline. Cette action est définitive. Êtes-vous sûr de vouloir continuer ?</v-card-text>
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
import store from "../../../../store";
import WikiPage from "../../../../model/WikiPage.model";
import Editor from '@/components/edition/Editor.vue'

export default Vue.extend({
  name: "AdminWikiPages",
  components: {
    "wyrd-editor": Editor
  },
  created: function() {},
  methods: {
    fetchWikipages(){
      this.loading = true;
      store.dispatch("fetchAllWikipages").then ((response: any) => {
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
      { text: "Titre", value: "title.titleVF" },
      { text: "Général", value: "", sortable: false },
      { text: "Mythe", value: "", sortable: false },
      { text: "Tags", value: "tags", sortable: false },
      { text: "Locked", value: "isEditionLocked" },
      { text: "Timelines", value: "content.length" },
      { text: "Actions", value: "action", sortable: false }
    ]
  })
});
</script>