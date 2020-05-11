<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>{{$t("rotg.content.closedGames.title")}}</v-card-title>
      <v-divider></v-divider>
      <div class="mt-3">
        <div v-if="rotgGames.length > 0">
          <v-data-table
            :items="filteredGames"
            :search="search"
            :headers="headers"
            :loading="loading"
          >
            <template v-slot:top>
              <v-row class="pa-3">
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="search"
                    clearable
                    flat
                    hide-details
                    prepend-inner-icon="search"
                    :label="$t('rotg.content.games.search')"
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>
            <template v-slot:item.timerMode="{item}">
              <div v-if="$i18n.locale == 'fr'">{{ item.timerMode ? 'Chronomètre' : 'Plateau' }}</div>
              <div v-else>{{ item.timerMode ? 'Timer' : 'Board game' }}</div>
            </template>
            <template v-slot:item.actions="{item}">
              <v-btn color="blue darken-4 mr-2" class="white--text" @click.stop="goToGamePage(item._id)">
                <v-icon>fa-door-open</v-icon>
              </v-btn>
              <v-btn
                color="red"
                class="white--text"
                @click.stop="openDeleteDialog(item);"
                v-if="currentUser.rights.isAdmin || currentUser._id == item.creatorUser"
              >
                <v-icon>fa-trash</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </div>
        <div v-else>
          <v-alert
            border="top"
            colored-border
            type="info"
            elevation="2"
            width="100%"
          >{{$t("rotg.content.games.noData")}}</v-alert>
        </div>
      </div>
    </v-card>
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{$t('rotg.common.loading')}}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" persistent max-width="500">
      <v-card>
        <v-card-title
          class="red white--text"
        >{{$t('rotg.content.games.deleteGame.title')}} - {{gameToDelete.name}}</v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text v-html="$t('rotg.content.games.deleteGame.text')"></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="closeDeleteDialog();">{{$t('rotg.common.buttons.cancel')}}</v-btn>
          <v-btn
            color="blue"
            text
            @click="deleteGame();"
          >{{$t('rotg.content.games.deleteGame.deleteButton')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import Game from "../../../model/rotg/Game.model";
import router from "../../../router";

export default Vue.extend({
  name: "ROTGlosedGames",
  created: function() {
    this.loading = true;
    this.fetchGames();
  },
  computed: {
    rotgGames: {
      get: function() {
        return store.getters.rotgGames;
      }
    },
    disableGameCreation: function() {
      var now = new Date();
      var nowHours = now.getUTCHours();

      return nowHours >= 21 && nowHours < 23;
    },
    currentUser: function() {
      return store.getters.currentUser;
    },
    selectedGame: {
      get: function() {
        return store.getters.selectedGame;
      },
      set: function(game: Game) {
        Object.assign(store.getters.selectedGame, game);
      }
    },
    nameError: function() {
      if (this.editedItem.name.length > 30) {
        if (this.$i18n.locale == "fr") {
          return "Le nom de la partie ne doit pas contenir plus de 30 caractères";
        } else {
          return "The game's name must not contain more than 30 characters";
        }
      } else {
        return "";
      }
    },
    headers: function() {
      return [
        {
          text: this.$t("rotg.content.closedGames.name"),
          align: "left",
          sortable: true,
          value: "name"
        },
        {
          text: this.$t("rotg.content.games.mode"),
          align: "left",
          sortable: true,
          value: "timerMode"
        },
        {
          text: this.$t("rotg.content.games.players"),
          align: "left",
          sortable: true,
          value: "playersIds.length"
        },
        { text: "", align: "left", sortable: true, value: "actions" }
      ];
    }
  },
  methods: {
    fetchGames: function() {
      store.dispatch("fetchAllROTGGames").then(() => {
        this.loading = false;
        this.filteredGames = this.rotgGames.filter((g: Game) => {
          return g.closed;
        });
      });
    },
    disableJoinButton: function(game: Game) {
      return game.playersIds.length > 12 || this.currentUser._id == "";
    },
    goToGamePage(gameId: string) {
      router.push({ name: "gameUI", params: { idGame: gameId } });
    },
    openDeleteDialog: function(game: Game) {
      Object.assign(this.gameToDelete, game);
      this.deleteDialog = true;
    },
    closeDeleteDialog: function() {
      this.deleteDialog = false;
      Object.assign(this.gameToDelete, new Game());
    },
    deleteGame: function() {
      this.loading = true;
      store.dispatch("deleteROTGGame", this.gameToDelete).then(() => {
        this.fetchGames();
      });
      this.closeDeleteDialog();
    },
    fetchAndResetGames: function() {
      this.loading = true;
      this.fetchGames();
      Object.assign(this.selectedGame, new Game());
    }
  },
  watch: {
    search: function(value: string) {
      if (value.length > 0) {
        var filteredArray = this.filteredGames.filter(game => {
          return game.name.toLowerCase().indexOf(value) > -1;
        });
        this.filteredGames = filteredArray;
      } else {
        this.filteredGames = this.rotgGames.filter((game: Game) => {
          return game.closed;
        });
      }
    }
  },
  data: () => ({
    filteredGames: new Array<Game>(),
    loading: false,
    dialog: false,
    deleteDialog: false,
    editedItem: new Game(),
    search: "",
    filter: {},
    sortDesc: false,
    page: 1,
    sortBy: "name",
    gameToDelete: new Game()
  }),
  metaInfo: {
    title: "ROTG - Parties Terminées",
    link: [
      { rel: "canonical", href: "https://wyrdwalkers.com/rotg/games" },
      { rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }
    ],
    meta: [
      {
        name: "description",
        content:
          "Le premier jeu coopératif sur navigateur se déroulant dans l'univers Wyrdwalkers"
      },
      {
        name: "keywords",
        content:
          "jeu,game,browser,navigateur,philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons"
      },
      { name: "author", content: "Thomas Gely" },
      { property: "og:url", content: "https://wyrdwalkers.com/rotg/games" },
      { property: "og:type", content: "website" },
      {
        property: "og:description",
        content:
          "Découvrez le premier jeu sur navigateur dans l'univers de Wyrdwalkers"
      },
      { property: "og:image", content: "https://i.imgur.com/xSW0VL0.png" }
    ]
  }
});
</script>