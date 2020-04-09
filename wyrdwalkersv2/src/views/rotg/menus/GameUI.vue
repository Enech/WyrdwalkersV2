<template>
  <div class="pa-3" style="position:relative;">
    <v-toolbar class="pl-3">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon left v-on="on" href="/rotg/games">
            <v-icon>arrow_back</v-icon>
          </v-btn>
        </template>
        <span>Revenir aux parties</span>
      </v-tooltip>
      <v-toolbar-title>{{selectedGame.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <rotg-counter />
      <v-spacer></v-spacer>
      <v-tooltip bottom v-if="selectedGame.running">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>alarm_on</v-icon>
          </v-btn>
        </template>
        <span>Finir le tour</span>
      </v-tooltip>
      <v-tooltip bottom v-if="registerAvailable()">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="openRegisterPlayer()">
            <v-icon>fa-dungeon</v-icon>
          </v-btn>
        </template>
        <span>Rejoindre la partie</span>
      </v-tooltip>
      <v-tooltip bottom v-if="userIsInGame && !selectedGame.running">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="launchGame()">
            <v-icon>play_arrow</v-icon>
          </v-btn>
        </template>
        <span>Lancer la partie</span>
      </v-tooltip>
    </v-toolbar>
    <v-row class="mt-3" v-if="currentPlayer._id != '' && selectedGame.running">
      <v-col cols="4" sm="2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card v-on="on" color="amber darken-1" dark>
              <v-card-title>
                <v-icon left>fa-gem</v-icon>
                <v-spacer></v-spacer>
                <span class="subtitle-1">{{currentPlayer.orichalcum}}</span>
              </v-card-title>
            </v-card>
          </template>
          <span>Orichalque</span>
        </v-tooltip>
      </v-col>
      <v-col cols="4" sm="2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card v-on="on" color="red darken-1" dark>
              <v-card-title>
                <v-icon left>fa-fist-raised</v-icon>
                <v-spacer></v-spacer>
                <span class="subtitle-1">{{currentPlayer.army}}</span>
              </v-card-title>
            </v-card>
          </template>
          <span>Armée</span>
        </v-tooltip>
      </v-col>
      <v-col cols="4" sm="2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card v-on="on" color="green darken-1" dark>
              <v-card-title>
                <v-icon left>fa-jedi</v-icon>
                <v-spacer></v-spacer>
                <span class="subtitle-1">{{currentPlayer.heroism}}</span>
              </v-card-title>
            </v-card>
          </template>
          <span>Héroïsme</span>
        </v-tooltip>
      </v-col>
      <v-col cols="4" sm="2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card v-on="on" color="cyan darken-1" dark>
              <v-card-title>
                <v-icon left>fa-eye</v-icon>
                <v-spacer></v-spacer>
                <span class="subtitle-1">{{currentPlayer.prophets}}</span>
              </v-card-title>
            </v-card>
          </template>
          <span>Prophètes</span>
        </v-tooltip>
      </v-col>
      <v-col cols="4" sm="2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card v-on="on" color="blue darken-1" dark>
              <v-card-title>
                <v-icon left>fa-user-friends</v-icon>
                <v-spacer></v-spacer>
                <span class="subtitle-1">{{currentPlayer.population}}</span>
              </v-card-title>
            </v-card>
          </template>
          <span>Population</span>
        </v-tooltip>
      </v-col>
      <v-col cols="4" sm="2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card v-on="on" color="deep-purple darken-4" dark>
              <v-card-title>
                <v-icon left>fa-spider</v-icon>
                <v-spacer></v-spacer>
                <span class="subtitle-1">{{currentPlayer.fatebindings}}</span>
              </v-card-title>
            </v-card>
          </template>
          <span>Liens du Destin</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <div class="mt-3">
      <v-tabs v-model="tab" show-arrows grow>
        <v-tab>Vue générale</v-tab>
        <v-tab>Feuille d'ordre</v-tab>
        <v-tab>Archives</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-row>
            <v-col cols="12" sm="6">
              <v-card class="pa-3">
                <v-card-title>Plans</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <span
                    class="subtitle-1"
                    v-if="selectedGameTerritories.length == 0"
                  >Aucune donnée à afficher</span>
                  <v-simple-table v-else>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Plan</th>
                          <th class="text-left">Propriétaire</th>
                          <th class="text-left">Forces</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in selectedGameTerritories" :key="item._id">
                          <td>{{ item.name }}</td>
                          <td>{{ item.ownerName != '' ? item.ownerName : 'Titans' }}</td>
                          <td>{{ displayPlanesForces(item) }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card class="pa-3">
                <v-card-title>Scores</v-card-title>
                <v-divider></v-divider>
                <v-card-text></v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item></v-tab-item>
        <v-tab-item></v-tab-item>
      </v-tabs-items>
    </div>
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Chargement...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="registerGameDialog" max-width="1000" persistent scrollable>
      <v-card>
        <v-card-title class="blue darken-4 white--text">
          <span class="headline">Rejoindre la partie {{selectedGame.name}}</span>
          <v-spacer></v-spacer>
          <v-btn text icon dark @click="closeDialog()">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text :max-height="dialogHeight">
          <v-data-iterator :items="pantheons" disable-pagination hide-default-footer>
            <template v-slot:default="props">
              <v-row>
                <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6">
                  <v-card
                    height="300"
                    @click="assignPantheonToPlayer(item)"
                    :dark="pantheonSelected(item.name)"
                    :color="pantheonSelected(item.name) ? 'light-blue' : 'white'"
                  >
                    <v-card-title class="headline font-weight-medium">{{ item.name }}</v-card-title>
                    <v-divider></v-divider>
                    <v-list dense :color="pantheonSelected(item.name) ? 'light-blue' : 'white'">
                      <v-list-item>
                        <v-list-item-content class="subtitle-1 font-weight-regular">Leader :</v-list-item-content>
                        <v-list-item-content
                          class="align-end subtitle-1 font-weight-regular"
                        >{{ item.leaderName }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>{{ item.description }}</v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="closeDialog()">Annuler</v-btn>
          <v-btn color="blue" text @click="addPlayer()">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import ROTGCounter from "../../../components/rotg/Counter.vue";
import Player from "../../../model/rotg/Player.model";
import Pantheon from "../../../model/rotg/Pantheon.model";
import Game from "../../../model/rotg/Game.model";
import Territory from "../../../model/rotg/Territory.model";

export default Vue.extend({
  components: {
    "rotg-counter": ROTGCounter
  },
  name: "GameUI",
  created() {
    this.loading = true;
    this.fetchGame(this.$route.params.idGame);
  },
  computed: {
    userIsInGame: function() {
      return this.registeredUsers.indexOf(store.getters.currentUser._id) > -1;
    },
    selectedGame: function() {
      return store.getters.selectedGame;
    },
    selectedGamePlayers: function() {
      return store.getters.selectedGamePlayers;
    },
    selectedGameTerritories: function() {
      return store.getters.selectedGameTerritories;
    },
    currentUser: function() {
      return store.getters.currentUser;
    },
    dialogHeight: function() {
      return this.$vuetify.breakpoint.xs ? 400 : 800;
    },
    currentPlayer: function() {
      var player = store.getters.selectedGamePlayers.filter((p: Player) => {
        return p.user._id == store.getters.currentUser._id;
      });
      return player[0];
    }
  },
  watch: {},
  methods: {
    fetchGame: function(gameId: string) {
      if (gameId && gameId !== "") {
        var promises = [
          store.dispatch("fetchROTGGame", gameId),
          store.dispatch("fetchROTGGamePlayers", gameId),
          store.dispatch("fetchROTGGameTerritories", gameId)
        ];
        Promise.all(promises).then(() => {
          this.loading = false;
          this.registeredUsers = this.selectedGamePlayers.map((e: Player) => {
            return e.user._id;
          });
          this.getRemainingPantheons();
        });
      }
    },
    openRegisterPlayer: function() {
      this.loading = true;
      store.dispatch("fetchROTGGamePlayers", this.selectedGame._id).then(() => {
        this.loading = false;
        this.takenPantheonsNames = this.selectedGamePlayers.map((e: Player) => {
          return e.pantheon.name;
        });
        this.registerGameDialog = true;
      });
    },
    closeDialog: function() {
      this.registerGameDialog = false;
    },
    resetNewPlayer: function() {
      Object.assign(this.newPlayer, new Player());
    },
    registerAvailable: function() {
      return (
        !this.userIsInGame &&
        !this.selectedGame.running &&
        !this.selectedGame.closed &&
        this.selectedGame.playersIds.length < 12
      );
    },
    getRemainingPantheons: function() {
      this.pantheons = this.allPantheonsAvailable.filter(pantheon => {
        return this.takenPantheonsNames.indexOf(pantheon.name) < 0;
      });
    },
    assignPantheonToPlayer(p: Pantheon) {
      this.newPlayer.pantheon = p;
    },
    pantheonSelected: function(name: string) {
      return (
        this.newPlayer.pantheon.name == name &&
        this.newPlayer.pantheon.name != ""
      );
    },
    addPlayer: function() {
      this.closeDialog();
      Object.assign(this.newPlayer.user, this.currentUser);
      this.newPlayer.gameID = this.$route.params.idGame;
      this.loading = true;
      store.dispatch("addROTGPlayer", this.newPlayer).then(() => {
        this.fetchGame(this.$route.params.idGame);
        this.resetNewPlayer();
      });
    },
    launchGame: function() {
      this.loading = true;
      store
        .dispatch("launchROTGGame", this.$route.params.idGame)
        .then((response: Game) => {
          this.fetchGame(this.$route.params.idGame);
        });
    },
    displayPlanesForces: function(territory: Territory) {
      var result = "";
      if (this.currentPlayer.titanForcesVisible && territory.owner == "") {
        result = territory.titanForces.toString();
      } else if (territory.owner != "") {
        result = "-";
      } else {
        result = "?";
      }
      return result;
    }
  },
  data: () => ({
    loading: false,
    registeredUsers: new Array<string>(),
    takenPantheonsNames: new Array<string>(),
    registerGameDialog: false,
    newPlayer: new Player(),
    pantheons: new Array<Pantheon>(),
    tab: 0,
    allPantheonsAvailable: [
      {
        name: "Aesir",
        nameVO: "Aesir",
        leaderName: "Odin",
        description:
          "Les dieux scandinaves. Fiers, un brin brutaux, ils ont le sens de la famille et cherchent en permanence à échapper au Destin. Il faut dire qu'ils sont condamnés à périr le jour de Ragnarök...",
        descriptionVO:
          "The Scandinavian Gods. Proud, a tad brutish, they have a sense of family and always try to defy Fate. After all, they are condemned to all perish on the day of Ragnarök...",
        objective: -1
      },
      {
        name: "Amatsukami",
        nameVO: "Amatsukami",
        leaderName: "Amaterasu",
        description:
          "Les dieux japonais. Un brin isolés et portés sur les traditions, ils ont su tisser des alliances leur assurant protection contre les titans les plus envieux de leurs ressources.",
        descriptionVO:
          "The Japanese Gods. A tad isolated and focused on tradition, they have managed to weave alliances ensuring their safety against the Titans most envious of their resources.",
        objective: -1
      },
      {
        name: "Ayllus",
        nameVO: "Ayllus",
        leaderName: "Inti",
        description:
          "Les dieux incas. Isolés des affaires du monde et peu influents dans la géopilitique divine, le panthéon inca est jeune, dynamique et est mené par un leader protecteur et énergique.",
        descriptionVO:
          "The Incan Gods. Isolated from worldly matters and with limited influence in Divine Geopolitics, the Inca Pantheon is nevertheless young, dynamic and led by a protective and energetic leader.",
        objective: -1
      },
      {
        name: "Bureaucratie Céleste",
        nameVO: "Celestial Bureaucracy",
        leaderName: "Shangdi",
        description:
          "Les dieux chinois. Le nom du panthéon se suffit à lui seul. Oubliez l'individualisme avec ces dieux. Chaque membre du panthéon (et ils sont très nombreux !) est un maillon dans la chaïne. Véritable rouleau compresseur de la politique divine, rien ne lui résiste vraiment. Pas même le Destin...",
        descriptionVO:
          "The Chinese Gods. Exactly what their name suggests. Forget individualism with these Gods. Each member of this Pantheon (and there are many of them!) is a link in the chain. Steamroller of divine politics, nothing really resists the Bureaucracy. Not even Fate...",
        objective: -1
      },
      {
        name: "Deva",
        nameVO: "Deva",
        leaderName: "Indra",
        description:
          "Les dieux hindous. Créé par l'extrêmement puissant Trimurti (Brahma, Vishnu et Shiva), le Deva fait partie des plus vieux panthéons et contient donc les divinités les plus anciennes et les plus sages. En revanche, leur puissance les a amené à prendre de plus en plus de recul par rapport aux affaires du monde...",
        descriptionVO:
          "The Hindu Gods. Created by the extremely powerful Trimurti (Brahma, Vishnu and Shiva), the Deva is among the oldest Pantheons and includes some of the eldest and wisest deities. However, their power has led them to take more and more distance from the World...",
        objective: -1
      },
      {
        name: "K'Asunel",
        nameVO: "K'Asunel",
        leaderName: "Itzamna",
        description:
          "Les dieux mayas. Fanatiquement anti-titans, les dieux mayas vivent selon les préceptes des quatres accords toltèques. Ils croient dans les principes édictés dans l'Hunab Ku, ce qui fait d'eux le seul panthéon de dieux croyants.",
        descriptionVO:
          "The Mayan Gods. Fanatically anti-Titans, the Mayan Gods live under the precepts of the Four Toltec Accords. They believe in the precepts of the Hunab Ku, which makes them the only Pantheon of Gods who are themselves religious.",
        objective: -1
      },
      {
        name: "Neter",
        nameVO: "Neter",
        leaderName: "Râ",
        description:
          "Les dieux égyptiens et un des plus vieux panthéons. Avec le Deva et le Théoï il fait partie du trio de tête des panthéons en terme de richesses, de puissance militaire et de sagesse millénaire. Très ordonnés, les dieux égyptiens croient fermement en Ma'at - le principe d'équilibre cosmique - et l'appliquent à travers des valeurs comme la Justice, la Vérité et l'Ordre.",
        descriptionVO:
          "The Egyptian Gods and one of the oldest Pantheons. With the Deva and the Theoi, they are amongst the three greatest Pantheons in terms of wealth, military might and ancient wisdom. Very orderly, the Egyptian Gods believe firmly in Ma’at - the principle of cosmic balance - and apply it through promoting values like Justice, Truth and Order.",
        objective: -1
      },
      {
        name: "Nga Tama a Rangi",
        nameVO: "Nga Tama a Rangi",
        leaderName: "Tumataüenga",
        description:
          "Les dieux maoris. Composé des enfants directs de Gaïa et Ouranos, les membres du Nga Tama a Rangi comptent parmis les plus vieilles divinités du cosmos - plus vieux que certains titans - mais ne fait pas partie des panthéons les plus puissants. Ayant préféré l'exil après la première guerre contre les titans, les dieux maoris se concentrent désormais sur des problèmes plus locaux et moins ambitieux.",
        descriptionVO:
          "The Maori Gods. Made up of children of Gaïa and Ouranos, the members of the Nga Tama a Rangi are amongst the oldest deities of the Cosmos - older than some Titans - but are not amongst the strongest Pantheons. Having chosen exile after the first war against the Titans, the Maori Gods are now focused on local and less ambitious problems.",
        objective: -1
      },
      {
        name: "Orisha",
        nameVO: "Orisha",
        leaderName: "Olorun",
        description:
          "Les dieux africains. Réunissant deux générations majeures de divinités et beaucoup plus concentrés sur les affaires du Monde et des humains, les Orishas font parti des dieux les moins belliqueux et ambitieux, même si leur force est reconnue à travers le cosmos. Leur pacifisme n'a pas été toujours présent et il y a quelques siècles encore, l'Orisha était considéré comme le panthéon le plus guerrier de l'univers pendant plusieurs millénaires.",
        descriptionVO:
          "The African gods. Bringing together two major generations of deities and much more focused on the affairs of the World and humans, the Orisha are among the least belligerent and ambitious gods, even if their strength is recognized throughout the Cosmos. Their pacifism was not always this way and until a few centuries ago, the Orisha was considered the most warlike pantheon in the universe for several millennia. It's the kind of thing that doesn't magically fade...",
        objective: -1
      },
      {
        name: "Teotl",
        nameVO: "Teotl",
        leaderName: "Hitzilopochtli",
        description:
          "Les dieux aztèques. Grands adeptes de la magie du sang, les dieux aztèques ont des traditions que d'aucuns considèrent violentes. Ce sont de fiers combattants et des conquérants. Malheureusement leur impulsivité poussée à l'extrême limite le nombre de leurs alliés, mais ils n'hésitent pas à mettre leurs compétences martiales et leur soif de sang à profit pour la cause des dieux contre les titans.",
        descriptionVO:
          "The Aztec Gods. Great practitioners of blood magic, the Aztec Gods have traditions that some consider violent. They are proud fighters and conquerors. Unfortunately their extreme impulsiveness limits the number of their allies, but they do not hesitate to put their martial skills and their thirst for blood to bear for the cause of the gods against the Titans.",
        objective: -1
      },
      {
        name: "Théoï",
        nameVO: "Theoi",
        leaderName: "Zeus",
        description:
          "Les dieux grecs. Figurant parmi les panthéons les plus connus, les Olympiens sont menés par Zeus et sont une des principales forces motrices du cosmos. Ils regroupent suffisamment d'atouts dans tous les domaines pour assoir leur puissance sur d'autres panthéons. Mais même les tout-puissants ont une faiblesse. La leur ? Leur égo et leur arrogance surdimensionnée.",
        descriptionVO:
          "The Greek Gods. One of the most famous Pantheons, the Olympians are led by Zeus and are one of the main driving forces of the Cosmos. They bring together enough assets in all areas to assuage their power on other Pantheons. But even the all-powerful have a weakness. Theirs ? Their oversized ego and arrogance.",
        objective: -1
      },
      {
        name: "Tuatha Dé Danann",
        nameVO: "Tuatha Dé Danann",
        leaderName: "Niamh",
        description:
          "Les dieux celtes. Sans doute les divinités les plus proches de la Nature. Tous sont des maitres druides avant tout. Mais les prendre pour des hippies cosmiques serait une grave erreur. Les Enfants de Danu font parti des panthéons les plus combattifs et fiers du cosmos et leurs talents combinés à leur sagesse ancestrale font d'eux des atouts vitaux contre les titans.",
        descriptionVO:
          "The Celtic Gods. Without doubt the deities closest to Nature. They are all Master Druid above all. But to mistake them for cosmic hippies would be a big mistake. The Children of Danu are among the most combative and proud pantheons of the Cosmos and their talents combined with their ancestral wisdom make them vital assets against the Titans.",
        objective: -1
      }
    ]
  }),
  metaInfo: {
    title: `Rise of The Gods`,
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