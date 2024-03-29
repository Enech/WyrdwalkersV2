<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>
        Gestion des pages wiki
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent width="500px">
          <template v-slot:activator="{ on }">
            <v-btn icon color="blue" class="mb-2" v-on="on" dark>
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="black white--text">
              <span
                class="headline"
                v-if="editedItem._id.length > 0"
              >Renommer - {{editedItem.title.titleVF}}</span>
              <span class="headline" v-else>Nouvelle page</span>
              <v-spacer></v-spacer>
              <v-btn @click="dialog = false" text icon dark>
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-alert
              type="error"
              v-if="editedItem.isEditionLocked"
            >Cette page est actuellement éditée par un autre utilisateur. Les changements que vous ferez risquent d'être perdus. Continuez à vos risques et périls.</v-alert>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <div class="subtitle-2">Version française</div>
                    <v-text-field v-model="editedItem.title.titleVF" label="Titre"></v-text-field>
                  </v-col>
                  <v-divider></v-divider>
                  <v-col cols="12">
                    <div class="subtitle-2">English version</div>
                    <v-text-field v-model="editedItem.title.titleVO" label="Title"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.tags"
                      label="Tags"
                      placeholder="A séparer par des ,"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" text @click="closeRename(editedItem._id)">Annuler</v-btn>
              <v-btn
                color="blue"
                text
                @click="sendUpdate();"
                v-if="editedItem._id.length > 0"
              >Modifier</v-btn>
              <v-btn color="blue" text @click="addWikiPage();" v-else>Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <v-text-field append-icon="search" v-model="search"></v-text-field>
      </v-toolbar>
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
          <v-btn
            dark
            fab
            small
            color="green"
            v-if="item.isEditionLocked"
            @click="lockPage(item._id,false)"
          >
            <v-icon small>check</v-icon>
          </v-btn>
          <v-btn dark fab small color="red" v-else @click="lockPage(item._id,true)">
            <v-icon small>close</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.timelines="{ item }">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="blue darken-2" fab small dark v-on="on">{{item.timelines}}</v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(timelineName, index) in item.timelinesNames"
                :key="index"
                @click="openEditPageContent(item, timelineName)"
              >
                <v-list-item-title>
                  <v-btn text>{{timelineName}}</v-btn>
                </v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-title class="text-center" @click="openEditPageContent(item, '')">
                  <v-btn text>
                    <v-icon small>add</v-icon>
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:item.action="{ item }">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="light-blue" dark fab small v-on="on">
                <v-icon small>edit</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="openEditPageGeneral(item)">
                <v-list-item-title>Modifier le Général</v-list-item-title>
              </v-list-item>
              <v-list-item @click="openEditPageMyth(item)">
                <v-list-item-title>Modifier le Mythe</v-list-item-title>
              </v-list-item>
              <v-list-item @click="openRename(item)">
                <v-list-item-title>Renommer</v-list-item-title>
              </v-list-item>
              <v-list-item :href="`/wiki/lore/${item.titleVF}`" target="_blank">
                <v-list-item-title>Voir la page</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn dark fab small color="red" @click="openDeletePage(item)">
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
          <v-btn color="black" text @click="deleteDialog = false">Annuler</v-btn>
          <v-btn color="red" text @click="deletePage();">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="pleaseWait" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Chargement...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <edit-general v-if="generalDialog" :content="editedItem" />
    <edit-myth v-if="mythDialog" :content="editedItem" />
    <edit-content v-if="contentDialog" :content="editedItem" :timeline="selectedTimeline" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../../store";
import WikiPage from "../../../../model/WikiPage.model";
import WikiPageDense from "../../../../model/WikiPageDense.model";
import Pagination from "../../../../model/Pagination.model";
import EditGeneral from "../../../../components/wiki/DialogEditGeneral.vue";
import EditMyth from "../../../../components/wiki/DialogEditMyth.vue";
import EditContent from "../../../../components/wiki/DialogEditContent.vue";
import WikiPageContent from "../../../../model/WikiPageContent.model";

export default Vue.extend({
  name: "AdminWikiPages",
  components: {
    "edit-general": EditGeneral,
    "edit-myth": EditMyth,
    "edit-content": EditContent
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
    pages: function() {
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
    },
    search: function(newValue: string) {
      this.searchInPages(newValue);
    },
    refreshData: function() {
      if (this.refreshData) {
        this.fetchWikipages();
        this.refreshData = false;
      }
    }
  },
  methods: {
    fetchWikipages: function() {
      this.loading = true;
      store.dispatch("fetchAllWikiPages").then((response: any) => {
        var densePages = this.DensifyWikiPages(response.data);
        this.pages = densePages;
        this.originalPages = this.pages;
        this.searchInPages(this.search);
        this.customPaginate();
        this.loading = false;
        this.editedItem = new WikiPage();
      });
    },
    searchInPages: function(stringSearch: string) {
      var searchValue = stringSearch.toLowerCase();
      this.pages = this.originalPages;

      if (stringSearch.length > 0) {
        var result = new Array<WikiPageDense>();

        this.pages.forEach((element: WikiPageDense) => {
          var isInTimelines = false;
          var isinFactions = false;
          var isInTeams = false;
          var isInTags = false;
          var condition =
            element.titleVF.toLowerCase().includes(searchValue) ||
            element.titleVO.toLowerCase().includes(searchValue);

          for (var i = 0; i < element.timelinesNames.length; i++) {
            var name = element.timelinesNames[i].toLowerCase();
            if (name.includes(searchValue)) {
              isInTimelines = true;
              break;
            }
          }

          for (var j = 0; j < element.factions.length; j++) {
            var faction = element.factions[j].toLowerCase();
            if (faction.includes(searchValue)) {
              isinFactions = true;
              break;
            }
          }

          for (var k = 0; k < element.teams.length; k++) {
            var team = element.teams[k].toLowerCase();
            if (team.includes(searchValue)) {
              isInTeams = true;
              break;
            }
          }
          
          var tags = element.tags.split(";");
          for (var l = 0; l < tags.length; l++) {
            var tag = tags[l].toLowerCase();
            if (tag.includes(searchValue)) {
              isInTags = true;
              break;
            }
          }

          condition = condition || isInTimelines || isinFactions || isInTeams || isInTags;

          if (condition) {
            result.push(element);
          }
        });

        this.pages = result;
      }
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
          generalInfos:
            page.generalInfos != undefined &&
            page.generalInfos.vf.length + page.generalInfos.vo.length > 0,
          myth:
            page.myth != undefined &&
            page.myth.vf.length + page.myth.vo.length > 0,
          timelines: page.content.length,
          tags: page.tags,
          isEditionLocked: page.isEditionLocked,
          timelinesNames: page.content.map((e: WikiPageContent) => {
            return e.timeline;
          }),
          factions: page.content.map((e: WikiPageContent) => {
            return e.faction;
          }),
          teams: page.content.map((e: WikiPageContent) => {
            return e.team;
          })
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

        if (typeof A === "string" && typeof B === "string") {
          if (pag.sortDesc[0]) {
            result = -1 * A.localeCompare(B,"fr");
          } else {
            result = A.localeCompare(B,"fr");
          }
        } else {
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
        }
        return result;
      });
      this.croppedPages = tempPages.slice(
        (pag.page - 1) * pag.itemsPerPage,
        pag.page * pag.itemsPerPage
      );
    },
    openEditPageGeneral: function(page: WikiPageDense) {
      this.pleaseWait = true;
      store.dispatch("fetchWikiPageById", page._id).then(() => {
        this.pleaseWait = false;
        this.generalDialog = true;
        Object.assign(this.editedItem, store.getters.wikipage);
        store.dispatch("lockWikiPage", {
          pageID: page._id,
          lock: true
        });
      });
    },
    openEditPageMyth: function(page: WikiPageDense) {
      store.dispatch("lockWikiPage", {
        pageID: page._id,
        lock: true
      });
      this.pleaseWait = true;
      store.dispatch("fetchWikiPageById", page._id).then(() => {
        this.pleaseWait = false;
        this.mythDialog = true;
        Object.assign(this.editedItem, store.getters.wikipage);
        store.dispatch("lockWikiPage", {
          pageID: page._id,
          lock: true
        });
      });
    },
    openRename: function(page: WikiPageDense) {
      store.dispatch("lockWikiPage", {
        pageID: page._id,
        lock: true
      });
      this.pleaseWait = true;
      store.dispatch("fetchWikiPageById", page._id).then(() => {
        this.pleaseWait = false;
        this.dialog = true;
        Object.assign(this.editedItem, store.getters.wikipage);
        store.dispatch("lockWikiPage", {
          pageID: page._id,
          lock: true
        });
      });
    },
    closeRename: function(id: string) {
      this.dialog = false;
      store
        .dispatch("lockWikiPage", {
          pageID: id,
          lock: false
        })
        .then(() => {
          this.fetchWikipages();
        });
    },
    openEditPageContent: function(page: WikiPageDense, timeline: string) {
      this.selectedTimeline = timeline;
      this.pleaseWait = true;
      store.dispatch("fetchWikiPageById", page._id).then(() => {
        this.pleaseWait = false;
        this.contentDialog = true;
        Object.assign(this.editedItem, store.getters.wikipage);
        store.dispatch("lockWikiPage", {
          pageID: page._id,
          lock: true
        });
      });
    },
    openDeletePage: function(page: WikiPageDense) {
      this.deleteDialog = true;
      this.deleteId = page._id;
    },
    deletePage: function() {
      store.dispatch("deleteWikiPage", this.deleteId).then(() => {
        this.deleteDialog = false;
        this.fetchWikipages();
        this.deleteId = "";
      });
    },
    addWikiPage: function() {
      this.editedItem.author = this.currentUser.login;
      store.dispatch("addWikiPage", this.editedItem).then(() => {
        this.fetchWikipages();
      });
      this.dialog = false;
    },
    sendUpdate: function() {
      this.editedItem.author = this.currentUser.login;
      store.dispatch("updateWikiPage", this.editedItem).then(() => {
        this.closeRename(this.editedItem._id);
      });
    },
    lockPage: function(id: string, lock: boolean) {
      store
        .dispatch("lockWikiPage", {
          pageID: id,
          lock: lock
        })
        .then(() => {
          this.fetchWikipages();
        });
    }
  },
  data: () => ({
    editedItem: new WikiPage(),
    pages: new Array<WikiPageDense>(),
    croppedPages: new Array<WikiPageDense>(),
    originalPages: new Array<WikiPageDense>(),
    loading: true,
    dialog: false,
    deleteDialog: false,
    deleteId: "",
    firstLoad: true,
    search: "",
    pagination: new Pagination(),
    pleaseWait: false,
    selectedTimeline: "",
    canEdit: true,
    headers: [
      { text: "Titre", value: "titleVF" },
      { text: "Général", value: "generalInfos" },
      { text: "Mythe", value: "myth" },
      { text: "Locked", value: "isEditionLocked" },
      { text: "Timelines", value: "timelines" },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  computed: {
    generalDialog: {
      get: function() {
        return store.getters.generalDialog;
      },
      set: function(open: boolean) {
        store.commit("setGeneralDialog", open);
      }
    },
    mythDialog: {
      get: function() {
        return store.getters.mythDialog;
      },
      set: function(open: boolean) {
        store.commit("setMythDialog", open);
      }
    },
    contentDialog: {
      get: function() {
        return store.getters.contentDialog;
      },
      set: function(open: boolean) {
        store.commit("setContentDialog", open);
      }
    },
    currentUser: function() {
      return store.getters.currentUser;
    },
    refreshData: {
      get: function() {
        return store.getters.refreshData;
      },
      set: function(refresh: boolean) {
        store.commit("setRefreshData", refresh);
      }
    }
  },
  metaInfo: function() {
    return {
      title: "Backoffice Wiki",
      link: [{ rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }]
    };
  }
});
</script>