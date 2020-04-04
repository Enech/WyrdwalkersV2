<template>
  <div class="pa-3">
    <rotg-counter class="mb-3" />
    <v-card class="pa-3">
      <v-card-title>Parties en cours</v-card-title>
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
            hide-default-footer
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
                    label="Search"
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>

            <template v-slot:default="props">
              <v-row>
                <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
                  <v-card @click.stop="">
                    <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>

                    <v-divider></v-divider>

                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>Joueurs :</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.playersIds.length }} / 12</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>Démarrée :</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.running ? 'Oui' : 'Non' }}</v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </template>

            <template v-slot:footer>
              <v-row class="mt-2 pa-3" align="center" justify="center">
                <v-spacer></v-spacer>
                <span class="grey--text">Items par page</span>
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn dark text color="primary" class="ml-2" v-on="on">
                      {{ itemsPerPage }}
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(number, index) in itemsPerPageArray"
                      :key="index"
                      @click="updateItemsPerPage(number)"
                    >
                      <v-list-item-title>{{ number }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <span class="mr-4 grey--text">Page {{ page }} sur {{ numberOfPages }}</span>
                <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
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
          >Aucune nouvelle partie n'a été créée pour le moment</v-alert>
        </div>
        <v-dialog v-model="dialog" max-width="1000px" persistent>
          <template v-slot:activator="{ on }">
            <div class="text-center mt-3">
              <v-btn
                color="deep-purple darken-4"
                class="white--text"
                v-on="on"
              >Créer une nouvelle partie</v-btn>
            </div>
          </template>
          <v-card>
            <v-card-title class="black white--text">
              <span class="headline">Nouvelle partie</span>
              <v-spacer></v-spacer>
              <v-btn text icon dark @click="dialog = false;">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="8">
                    <v-text-field v-model="editedItem.name" label="Nom de la partie"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-btn @click="getRandomOperationName()">Nom aléatoire</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" text @click="closeDialog()">Annuler</v-btn>
              <v-btn
                color="blue"
                text
                @click="addGame();"
                :disabled="editedItem.name.split(' ').length < 2"
              >Créer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-card>
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Chargement...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import ROTGCounter from "../../../components/rotg/Counter.vue";
import Game from "../../../model/rotg/Game.model";

export default Vue.extend({
  components: {
    "rotg-counter": ROTGCounter
  },
  name: "ROTGHome",
  created: function() {
    this.loading = true;
    this.fetchGames();
  },
  computed: {
    rotgGames: {
      get: function() {
        return store.getters.rotgGames;
      }
    }
  },
  methods: {
    fetchGames: function() {
      store.dispatch("fetchAllROTGGames").then(() => {
        this.loading = false;
        this.filteredGames = this.rotgGames;
        this.numberOfPages = Math.ceil(
          this.filteredGames.length / this.itemsPerPage
        );
      });
    },
    addGame: function() {
      store.dispatch("addROTGGame", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem, new Game());
      });
    },
    sendUpdate: function() {
      store.dispatch("updateROTGGame", this.editedItem).then(() => {
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
    }
  },
  watch: {
    search: function(value: string) {
        if(value.length > 0){
            var filteredArray = this.filteredGames.filter(game => {
                return game.name.toLowerCase().indexOf(value) > -1;
            });
            this.filteredGames = filteredArray;
        } else {
            this.filteredGames = this.rotgGames;
        }
    }
  },
  data: () => ({
    filteredGames: new Array<Game>(),
    numberOfPages: 0,
    loading: false,
    dialog: false,
    editedItem: new Game(),
    itemsPerPageArray: [4, 8, 12, 20],
    search: "",
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 4,
    sortBy: "name",
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