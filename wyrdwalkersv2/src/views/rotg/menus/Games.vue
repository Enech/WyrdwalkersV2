<template>
  <div class="pa-3">
    <v-alert
      border="left"
      colored-border
      type="warning"
      elevation="2"
      width="100%"
      class="mb-3"
      v-if="currentUser._id == ''"
    >{{$t("rotg.content.games.accountError")}}</v-alert>
    <v-card class="pa-3">
      <v-card-title>{{$t("rotg.content.games.title")}}</v-card-title>
      <v-divider></v-divider>
      <div class="mt-3">
        <div v-if="rotgGames.length > 0">
          <v-data-iterator
            :items="filteredGames"
            :items-per-page.sync="itemsPerPage"
            :page="page"
            :search="search"
            :sort-by="sortBy.toLowerCase()"
            :sort-desc="sortDesc"
          >
            <template v-slot:header>
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

            <template v-slot:default="props">
              <v-row>
                <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
                  <v-card>
                    <v-card-title class="subheading font-weight-bold">
                      {{ item.name }}
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="red"
                        @click.stop="openDeleteDialog(item);"
                        v-if="currentUser.rights.isAdmin || currentUser._id == item.creatorUser"
                      >
                        <v-icon>fa-trash</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>{{$t("rotg.content.games.players")}} :</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.playersIds.length }} / 12</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>{{$t("rotg.content.games.started")}} :</v-list-item-content>
                        <v-list-item-content
                          class="align-end"
                          v-if="$i18n.locale == 'fr'"
                        >{{ item.running ? 'Oui' : 'Non' }}</v-list-item-content>
                        <v-list-item-content
                          class="align-end"
                          v-else
                        >{{ item.running ? 'Yes' : 'No' }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>{{$t("rotg.content.games.closed")}} :</v-list-item-content>
                        <v-list-item-content
                          class="align-end"
                          v-if="$i18n.locale == 'fr'"
                        >{{ item.closed ? 'Oui' : 'Non' }}</v-list-item-content>
                        <v-list-item-content
                          class="align-end"
                          v-else
                        >{{ item.closed ? 'Yes' : 'No' }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>{{$t("rotg.content.games.mode")}} :</v-list-item-content>
                        <v-list-item-content
                          class="align-end"
                          v-if="$i18n.locale == 'fr'"
                        >{{ item.timerMode ? 'Chronomètre' : 'Plateau' }}</v-list-item-content>
                        <v-list-item-content
                          class="align-end"
                          v-else
                        >{{ item.timerMode ? 'Timer' : 'Board game' }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content class="align-center">
                          <v-btn
                            color="blue darken-4"
                            class="white--text"
                            :disabled="disableJoinButton(item)"
                            @click.stop="goToGamePage(item._id)"
                          >{{$t("rotg.common.buttons.enterGame")}}</v-btn>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
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
        <v-dialog v-model="dialog" max-width="1000px" persistent>
          <template v-slot:activator="{ on }">
            <div class="text-center mt-3">
              <v-btn color="deep-purple darken-4 mr-1" class="white--text" v-on="on">
                <v-icon left small>fa-plus</v-icon>
                {{$t("rotg.common.buttons.newGame")}}
              </v-btn>
            </div>
          </template>
          <v-card>
            <v-card-title class="black white--text">
              <span class="headline">{{$t("rotg.content.games.newGame.title")}}</span>
              <v-spacer></v-spacer>
              <v-btn text icon dark @click="dialog = false;">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="8">
                    <v-text-field
                      v-model="editedItem.name"
                      :label="$t('rotg.content.games.newGame.label')"
                      :error="editedItem.name.length > 30"
                      :error-messages="nameError"
                    ></v-text-field>
                    <v-btn
                      @click="getRandomOperationName()"
                    >{{$t("rotg.content.games.newGame.randomName")}}</v-btn>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-radio-group v-model="editedItem.timerMode" column>
                      <v-radio
                        :label="$t('rotg.content.games.newGame.boardgameMode')"
                        :value="false"
                        color="red"
                      ></v-radio>
                      <v-radio
                        :label="$t('rotg.content.games.newGame.timerMode')"
                        :value="true"
                        color="black"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <div v-html="$t('rotg.content.games.newGame.boardDescription')"></div>
                    <div v-html="$t('rotg.content.games.newGame.timerDescription')"></div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" text @click="closeDialog()">{{$t('rotg.common.buttons.cancel')}}</v-btn>
              <v-btn
                color="blue"
                text
                @click="addGame();"
                :disabled="editedItem.name.split(' ').length < 2"
              >{{$t('rotg.content.games.newGame.create')}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
          <v-btn color="blue" text @click="deleteGame();">{{$t('rotg.content.games.deleteGame.deleteButton')}}</v-btn>
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
  name: "ROTGGames",
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
    nameError: function(){
      if(this.editedItem.name.length > 30){
        if(this.$i18n.locale == "fr"){
          return "Le nom de la partie ne doit pas contenir plus de 30 caractères";
        } else {
          return "The game's name must not contain more than 30 characters";
        }
      } else {
        return "";
      }
    }
  },
  methods: {
    fetchGames: function() {
      store.dispatch("fetchAllROTGGames").then(() => {
        this.loading = false;
        this.filteredGames = this.rotgGames.filter((g: Game) => {
          return !g.closed;
        });
        this.numberOfPages = Math.ceil(
          this.filteredGames.length / this.itemsPerPage
        );
      });
    },
    addGame: function() {
      this.editedItem.startDate = new Date().toString();
      var endDate = new Date();
      endDate.setDate(new Date(this.editedItem.startDate).getDate() + 7);
      this.editedItem.endDate = endDate.toString();
      this.editedItem.creatorUser = this.currentUser._id;
      store.dispatch("addROTGGame", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem, new Game());
      });
    },
    closeDialog: function() {
      Object.assign(this.editedItem, new Game());
      this.dialog = false;
      this.fetchGames();
    },
    getRandomOperationName: function() {
      var nameIndex = Math.floor(Math.random() * this.namesArray.length);
      var adjIndex = Math.floor(Math.random() * this.adjectivesAray.length);
      var randomName = this.namesArray[nameIndex];
      var randomAdjective = this.adjectivesAray[adjIndex];
      this.editedItem.name = `${randomAdjective} ${randomName}`;
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number: number) {
      this.itemsPerPage = number;
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
          return !game.closed;
        });
      }
    }
  },
  data: () => ({
    filteredGames: new Array<Game>(),
    numberOfPages: 0,
    loading: false,
    dialog: false,
    deleteDialog: false,
    editedItem: new Game(),
    itemsPerPageArray: [4, 8, 12, 20],
    search: "",
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 4,
    sortBy: "name",
    gameToDelete: new Game(),
    namesArray: [
      "Delphi",
      "Olympus",
      "Underworld",
      "Death",
      "Light",
      "Order",
      "Mountain",
      "Grapes",
      "Mistletoe",
      "Tree",
      "Runes",
      "River",
      "Souls",
      "Fanatics",
      "Rebellion",
      "World",
      "Titans",
      "Cosmos",
      "Destiny",
      "Oblivion",
      "Hell",
      "Redemption",
      "Retribution",
      "Civilization",
      "Destruction",
      "Wave",
      "Tempest",
      "Earth",
      "Bastards",
      "Amazons",
      "Warriors",
      "Thunder",
      "Stone",
      "Home",
      "Table",
      "Chair",
      "Sofa",
      "Window",
      "Fan",
      "Lamp",
      "Wood",
      "Feather",
      "Cupboard",
      "Door",
      "Room",
      "Bed",
      "Blanket",
      "Mask",
      "God",
      "Boat",
      "Luck",
      "Truth",
      "Fear",
      "Me",
      "Future",
      "Story",
      "Life",
      "Love",
      "Paradigm",
      "Sarcasm",
      "Wonder",
      "Armada",
      "Duel",
      "Lord",
      "Delirium",
      "Charm",
      "Rug",
      "Toy",
      "Salt",
      "Pepper",
      "Dice",
      "Leader",
      "Ruler",
      "Project",
      "Quality",
      "Quantity",
      "Diplomacy",
      "Administration",
      "Book",
      "Drawing",
      "Sheet",
      "Author",
      "Number",
      "Word",
      "Line",
      "War",
      "Fish",
      "Koala",
      "Fountain",
      "Space",
      "Time",
      "Accent",
      "Triangle",
      "Logos",
      "Eros",
      "Ananke",
      "Kaos",
      "Dragon",
      "Kosmos",
      "Man",
      "Woman",
      "Cat"
    ],
    adjectivesAray: [
      "Filthy",
      "Dark",
      "Smoky",
      "Shiny",
      "Slick",
      "Glossy",
      "Improbable",
      "Fabled",
      "Fabulous",
      "Goofy",
      "Weird",
      "Righteous",
      "Satanic",
      "Sanitary",
      "Fumbled",
      "Broken",
      "Crazy",
      "Dirty",
      "Confined",
      "Quarantined",
      "Shocked",
      "Despicable",
      "Fluffy",
      "Wacky",
      "Subtle",
      "Magic",
      "New",
      "Fancy",
      "Risky",
      "Courageous",
      "Adventurous",
      "Audacious",
      "Daring",
      "Fearless",
      "Gallant",
      "Gutsy",
      "Heroic",
      "Resolute",
      "Strong",
      "Natural",
      "Wild",
      "Feral",
      "Free",
      "Bright",
      "Luminous",
      "Rich",
      "Sunny",
      "Black",
      "Red",
      "Yellow",
      "Blue",
      "Purple",
      "Orange",
      "Green",
      "Grey",
      "Cloudy",
      "Darkened",
      "Dim",
      "Dingy",
      "Atrocious",
      "Cruel",
      "Dreadful",
      "Egregious",
      "Freakish",
      "Frightful",
      "Grotesque",
      "Gruesome",
      "Heinous",
      "Hideous",
      "Horrendous",
      "Horrible",
      "Horrifying",
      "Infamous",
      "Inhuman",
      "Intolerable",
      "Obscene",
      "Odious",
      "Outrageous",
      "Preposterous",
      "Terrible",
      "Vicious",
      "Absurd",
      "Amusing",
      "Droll",
      "Entertaining",
      "Hilarious",
      "Ludicrous",
      "Playful",
      "Ridiculous",
      "Silly",
      "Dull",
      "Foggy",
      "Gloomy",
      "Misty",
      "Bizarre",
      "Fantastic",
      "Foolish",
      "Impossible",
      "Incredible",
      "Laughable",
      "Nonsensical",
      "Unbelievable",
      "First",
      "Second",
      "Third",
      "Fourth",
      "Scorched"
    ]
  }),
  metaInfo: {
    title: "ROTG - Parties",
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