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
              <span
                class="headline"
                v-if="editedItem._id !== ''"
              >Modifier la page {{editedItem.title.titleVF}}</span>
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
                    <v-text-field
                      v-model="editedItem.tags"
                      label="Tags"
                      placeholder="A séparer par des ,"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" v-if="lang=='FR'">
                    <div class="subtitle-2">Version française</div>
                    <v-text-field v-model="editedItem.title.titleVF" label="Titre"></v-text-field>
                    <div class="subtitle-2 mt-3">Informations générales</div>
                    <wyrd-editor
                      class="custom-editor bordered"
                      :htmlContent="editedItem.generalInfos.vf"
                      refName="generalVF"
                    />
                    <div class="subtitle-2 mt-3">Mythe</div>
                    <wyrd-editor
                      class="custom-editor bordered"
                      :htmlContent="editedItem.myth.vf"
                      refName="mythVF"
                    />
                  </v-col>
                  <v-col cols="12" v-if="lang=='EN'">
                    <div class="subtitle-2">English version</div>
                    <v-text-field v-model="editedItem.title.titleVO" label="Title"></v-text-field>
                    <div class="subtitle-2 mt-3">General information</div>
                    <wyrd-editor
                      class="custom-editor bordered"
                      :htmlContent="editedItem.generalInfos.vo"
                      refName="generalVO"
                    />
                    <div class="subtitle-2 mt-3">Myth</div>
                    <wyrd-editor
                      class="custom-editor bordered"
                      :htmlContent="editedItem.myth.vo"
                      refName="mythVO"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" text @click="dialog = false;">Annuler</v-btn>
              <v-btn color="blue" v-if="editedItem._id !== ''" text>Modifier</v-btn>
              <v-btn color="blue" v-else text>Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-data-table
        :items="croppedPages"
        :loading="loading"
        :headers="headers"
        :server-items-length="pages.length"
        :options.sync="pagination"
      >
        <template v-slot:item.generalInfos="{ item }">
          <v-icon color="green" v-if="item.generalInfos">check</v-icon>
          <v-icon color="red" v-else>close</v-icon>
        </template>
        <template v-slot:item.myth="{ item }">
          <v-icon color="green" v-if="item.myth">check</v-icon>
          <v-icon color="red" v-else>close</v-icon>
        </template>
        <template v-slot:item.isEditionLocked="{ item }">
          <v-icon color="green" v-if="item.isEditionLocked">check</v-icon>
          <v-icon color="red" v-else>close</v-icon>
        </template>
        <template v-slot:item.timelines="{ item }">
          <v-btn color="blue darken-2" icon dark>{{item.timelines}}</v-btn>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn text icon color="black" @click="editPage(item)">
            <v-icon small>edit</v-icon>
          </v-btn>
          <v-btn text icon color="red" @click="deletePage(item)">
            <v-icon small>delete</v-icon>
          </v-btn>
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
import WikiPageDense from "../../../../model/WikiPageDense.model";
import Pagination from "../../../../model/Pagination.model";
import QuillEditor from "@/components/edition/Editor.vue";

export default Vue.extend({
  name: "AdminWikiPages",
  components: {
    "wyrd-editor": QuillEditor
  },
  created: function() {
    this.fetchWikipages();
  },
  watch: {
    "pagination.page": function(newValue: Pagination) {
      if (!this.firstLoad) {
        this.loading = true;
        this.customPaginate();
        this.loading = false;
      }
    },
    "pagination.itemsPerPage": function(newValue: Pagination) {
      if (!this.firstLoad) {
        this.loading = true;
        this.customPaginate();
        this.loading = false;
      }
    },
    "pagination.sortBy": function(newValue: Pagination) {
      if (!this.firstLoad) {
        this.loading = true;
        this.customPaginate();
        this.loading = false;
      }
    },
    "pagination.sortDesc": function(newValue: Pagination) {
      if (!this.firstLoad) {
        this.loading = true;
        this.customPaginate();
        this.loading = false;
      }
    },
    loading: function(newValue: boolean) {
      if (!newValue) {
        if (this.firstLoad) {
          var newPagination = new Pagination();
          newPagination.mustSort = true;
          newPagination.sortBy = ["titleVF"];
          newPagination.sortDesc = [false];
          Object.assign(this.pagination, newPagination);
          this.firstLoad = false;
        } else {
          Object.assign(this.pagination, this.pagination);
        }
      }
    }
  },
  methods: {
    fetchWikipages: function() {
      this.loading = true;
      store.dispatch("fetchAllWikiPages").then((response: any) => {
        var densePages = this.DensifyWikiPages(response.data);
        Object.assign(this.pages, densePages);
        this.loading = false;
      });
    },
    DensifyWikiPages: function(pages: WikiPage[]) {
      var result = new Array<WikiPageDense>();

      pages.forEach((page: WikiPage) => {
        result.push({
          _id: page._id,
          titleVF: page.title.titleVF,
          titleVO: page.title.titleVO,
          author: page.author,
          searchable: page.searchable != null,
          generalInfos: page.generalInfos != undefined,
          myth: page.myth != undefined,
          timelines: page.content.length,
          tags: page.tags,
          isEditionLocked: page.isEditionLocked
        });
      });

      return result;
    },
    customPaginate: function() {
      var tempPages = new Array<WikiPageDense>();
      Object.assign(tempPages, this.pages);
      var pag = this.pagination;
      tempPages.sort(function(a: WikiPageDense, b: WikiPageDense) {
        var sortBy = pag.sortBy[0];
        var result = 0;
        var A = eval("a." + sortBy);
        var B = eval("b." + sortBy);
        if (pag.sortDesc[0]) {
          if (A < B) {
            result = 1;
          } else {
            result = -1;
          }
        } else {
          if (A < B) {
            result = -1;
          } else {
            result = 1;
          }
        }
        return result;
      });
      this.croppedPages = tempPages.slice(
        (pag.page - 1) * pag.itemsPerPage,
        pag.page * pag.itemsPerPage
      );
    },
    editPage: function(page: WikiPageDense) {},
    deletePage: function(page: WikiPageDense) {}
  },
  data: () => ({
    editedItem: new WikiPage(),
    pages: new Array<WikiPageDense>(),
    croppedPages: new Array<WikiPageDense>(),
    loading: true,
    dialog: false,
    deleteDialog: false,
    firstLoad: true,
    search: "",
    lang: "FR",
    pagination: new Pagination(),
    headers: [
      { text: "Titre", value: "titleVF" },
      { text: "Général", value: "generalInfos" },
      { text: "Mythe", value: "myth" },
      { text: "Locked", value: "isEditionLocked" },
      { text: "Timelines", value: "timelines" },
      { text: "Actions", value: "action", sortable: false }
    ]
  })
});
</script>