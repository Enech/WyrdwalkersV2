<template>
  <v-dialog persistent fullscreen v-model="open">
    <v-card>
      <v-card-title class="black white--text">
        <span>Timeline {{timeline}} - {{content.title.titleVF}}</span>
        <v-spacer></v-spacer>
        <v-btn dark icon @click="closeDialog()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-alert
        type="error"
        v-if="content.isEditionLocked"
      >Cette page est actuellement éditée par un autre utilisateur. Les changements que vous ferez risquent d'être perdus. Continuez à vos risques et périls.</v-alert>
      <div class="pa-3">
        <v-row>
          <v-col cols="4">
            <v-select
              label="Timeline"
              :loading="loadingTimelines"
              :items="timelines"
              item-value="name"
              item-text="name"
              return-object
              v-model="selectedTimeline"
            ></v-select>
            <v-select label="Factions" v-model="selectedFaction" :items="factions" return-object></v-select>
            <v-select
              label="Camps"
              v-model="selectedTeam"
              :items="teams"
              return-object
              item-value="team"
              item-text="team"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field label="URL de l'image" v-model="contentToEdit.picture"></v-text-field>
            <v-text-field label="Nom de l'auteur" v-model="contentToEdit.picAuthor"></v-text-field>
            <v-text-field label="Page de l'auteur" v-model="contentToEdit.picAuthorPage"></v-text-field>
            <v-text-field label="URL de la musique (YouTube)" v-model="contentToEdit.music"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-img
              :src="contentToEdit.picture"
              v-if="contentToEdit.picture.length > 0"
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
          <v-col cols="12" md="6">
            <div class="subtitle-1">Version française</div>
            <wyrd-editor :htmlContent.sync="contentToEdit.textVF" name="generalVF" />
          </v-col>
          <v-col cols="12" md="6">
            <div class="subtitle-1">English version</div>
            <wyrd-editor :htmlContent.sync="contentToEdit.textVO" name="generalVO" />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="closeDialog()">Annuler</v-btn>
          <v-btn color="blue" text @click="sendUpdate();">Modifier</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";
import WikiPage from "../../model/WikiPage.model";
import CKEditor from "../edition/Editor.vue";
import WikiPageContent from "../../model/WikiPageContent.model";
import TimelineTeam from "../../model/TimelineTeam.model";
import Timeline from "../../model/Timeline.model";

export default Vue.extend({
  name: "EditContent",
  components: {
    "wyrd-editor": CKEditor
  },
  props: {
    content: WikiPage,
    timeline: String
  },
  created: function() {
    Object.assign(this.page, this.content);
    this.fetchAllTimelines();
  },
  mounted: function() {
    if (this.page.content.length > 0) {
      var contentFound = false;
      for (var i = 0; i < this.page.content.length; i++) {
        var refTimeline = this.page.content[i].timeline;
        if (refTimeline == this.timeline) {
          //On parse les objets WikiPageContent
          Object.assign(this.contentToEdit, this.page.content[i]);
          this.indexTimeline = i;
          contentFound = true;
          break;
        }
      }

      if (!contentFound) {
        this.indexTimeline = this.page.content.length;
      }
    }
  },
  methods: {
    fetchAllTimelines: function() {
      this.loadingTimelines = true;
      store.dispatch("fetchTimelines").then(() => {
        this.loadingTimelines = false;
        for (var i = 0; i < this.timelines.length; i++) {
          if (this.timelines[i].name === this.timeline) {
            this.selectedTimeline = this.timelines[i]; // On parse les objets Timeline
            break;
          }
        }
      });
    },
    sendUpdate: function() {
      this.page.author = this.currentUser.login;
      this.page.content[this.indexTimeline] = this.contentToEdit;
      store.dispatch("updateWikiPage", this.page).then(() => {
        this.closeDialog();
      });
    },
    closeDialog: function() {
      this.open = false;
      if (this.page._id.length > 0) {
        store
          .dispatch("lockWikiPage", {
            pageID: this.page._id,
            lock: false
          })
          .then(() => {
            this.refreshData = true;
          });
      } else {
        this.refreshData = true;
      }
    }
  },
  watch: {
    "selectedTimeline.name": function(newValue: string) {
      this.teams = this.selectedTimeline.availableTeams;

      for (var i = 0; i < this.teams.length; i++) {
        var team = this.teams[i];
        if (team.team === this.contentToEdit.team) {
          this.selectedTeam = team;
        }
      }

      for (var j = 0; j < this.factions.length; j++) {
        var faction = this.factions[j];
        if (faction.value === this.contentToEdit.faction) {
          this.selectedFaction = faction;
        }
      }

      this.contentToEdit.timeline = newValue;
    },
    selectedFaction: function(newValue: any) {
      this.contentToEdit.faction = newValue.value;
      this.teams = this.selectedTimeline.availableTeams.filter(
        (element: TimelineTeam) => element.faction === newValue.value
      );
    },
    selectedTeam: function(newValue: TimelineTeam) {
      this.contentToEdit.team = newValue.team;
    }
  },
  data: () => ({
    page: new WikiPage(),
    contentToEdit: new WikiPageContent(),
    loadingTimelines: false,
    selectedFaction: {},
    selectedTeam: new TimelineTeam(),
    selectedTimeline: new Timeline(),
    indexTimeline: 0,
    factions: [
      {
        value: "dieux",
        text: "Dieux"
      },
      {
        value: "titans",
        text: "Titans"
      },
      {
        value: "society",
        text: "Sociétés Secrètes"
      },
      {
        value: "otherworld",
        text: "Outres-Mondes"
      }
    ],
    teams: new Array<TimelineTeam>()
  }),
  computed: {
    open: {
      get: function() {
        return store.getters.contentDialog;
      },
      set: function(open: boolean) {
        store.commit("setContentDialog", open);
      }
    },
    timelines: function() {
      return store.getters.timelines;
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
  }
});
</script>