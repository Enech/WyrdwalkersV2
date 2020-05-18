<template>
  <div class="mt-3">
    <v-row align-content="center" justify="center" v-show="!dataFetched">
      <v-col class="subtitle-1 text-center" cols="12">{{$t('rotg.common.loading')}}</v-col>
      <v-col cols="6">
        <v-progress-linear color="blue accent-4" indeterminate rounded height="6"></v-progress-linear>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12">
            <v-card outlined>
              <chart
                ref="cumulresources"
                style="width: 100%"
                v-if="dataFetched"
                :chartOptions="buildOptionsCumulativeResources()"
              />
            </v-card>
          </v-col>
          <v-col cols="12" v-if="rankings.length > 1">
            <v-card outlined>
              <chart
                ref="playersrelations"
                style="width: 100%"
                v-if="dataFetched"
                :chartOptions="buildOptionsPlayersInteractions()"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-expansion-panels hover popout v-if="dataFetched">
          <v-expansion-panel v-for="(player,index) in rankings" :key="index">
            <v-expansion-panel-header>{{player.user.login}}</v-expansion-panel-header>
            <v-expansion-panel-content class="pa-1">
              <v-row>
                <v-col cols="12">
                  <v-card outlined>
                    <chart
                      ref="resourcesevolution"
                      style="width: 100%"
                      v-if="dataFetched"
                      :chartOptions="buildOptionsResourcesEvolution(player)"
                    />
                  </v-card>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12">
                  <v-card outlined :color="getHindersColor(player)" dark>
                    <v-card-title>
                      <v-tooltip bottom v-if="selectedGame.won && selectedGame.closed">
                        <template v-slot:activator="{ on }">
                          <v-icon left v-on="on">fa-info-circle</v-icon>
                        </template>
                        <span v-if="localeFR">
                          Nombre de
                          <v-icon small>fa-bolt</v-icon>Mains du Destin lancées par le joueur ayant ajouté des forces titaniques sur des Plans attaqués durant le même tour
                        </span>
                        <span v-else>
                          Number of
                          <v-icon small>fa-bolt</v-icon>Hands of Fate triggered by the player which added titanic forces on attacked Planes in the same turn
                        </span>
                      </v-tooltip>
                      {{localeFR ? "Gênes" : "Hinderances"}}
                      <v-spacer></v-spacer>
                      {{computeHinders(player)}}
                    </v-card-title>
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-card outlined :color="getConqueredPlanesColor(player)" dark>
                    <v-card-title>
                      {{localeFR ? "Plans conquis" : "Conquered Planes"}}
                      <v-spacer></v-spacer>
                      {{player.territories.length}} / {{nbConqueredPlanes}}
                    </v-card-title>
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-card outlined class="pa-3">
                    <v-btn
                      block
                      dark
                      :class="index > 0 ? 'mt-2' : ''"
                      color="blue"
                      v-for="(sheet, index) in getPlayerSheets(player)"
                      :key="index"
                      @click.stop="openOrderSheet(sheet)"
                    >{{$t("rotg.content.ui.orderSheet.title")}} T{{sheet.turn}}</v-btn>
                  </v-card>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";
import Chart from "../global/Chart.vue";
import Player from "../../model/rotg/Player.model";
import OrderSheet from "../../model/rotg/OrderSheet.model";
import OrdersEnum from "../../model/rotg/enums/Orders.enum";
import Territory from "../../model/rotg/Territory.model";
import Resources from "../../model/rotg/Resources.model";
import PlayerHistory from "../../model/rotg/PlayerHistory.model";
import Game from "../../model/rotg/Game.model";
import OrderResult from "../../model/rotg/OrderResult.model";
import ResourceOrders from "../../model/rotg/enums/Orders.enum";

export default Vue.extend({
  name: "ROTGStats",
  components: {
    chart: Chart
  },
  created: function() {
    if (store.getters.selectedGame.closed) {
      this.fetchGameOrderSheets();
      this.fetchGamePlayersHistory();
      this.fetchOrdersResults();
    }
    this.nbConqueredPlanes = this.selectedGameTerritories.filter(
      (t: Territory) => t.owner != ""
    ).length;
  },
  methods: {
    fetchGameOrderSheets: function() {
      store
        .dispatch("fetchROTGGameOrderSheets", this.selectedGame._id)
        .then((sheets: OrderSheet[]) => {
          this.sheetsFetched = true;
        });
    },
    fetchGamePlayersHistory: function() {
      store
        .dispatch("fetchROTGGamePlayersHistory", this.selectedGame._id)
        .then((history: PlayerHistory[]) => {
          this.playersHistory = history;
          this.historyFetched = true;
        });
    },
    fetchOrdersResults: function() {
      store
        .dispatch("fetchROTGGameOrdersResults")
        .then((results: OrderResult[]) => {
          this.ordersResults = results;
          this.resultsFetched = true;
        });
    },
    buildOptionsResourcesEvolution: function(player: Player) {
      var playerHistory = this.playersHistory.filter(
        (ph: PlayerHistory) => ph.playerID == player._id
      );
      playerHistory.sort((a: PlayerHistory, b: PlayerHistory) => {
        return a.turn - b.turn;
      });
      var dataSeries = [
        {
          name: this.$t("rotg.common.resources.orichalcum"),
          color: "#FFB300",
          data: playerHistory.map((h: PlayerHistory) => h.orichalcum)
        },
        {
          name: this.$t("rotg.common.resources.army"),
          color: "#E53935",
          data: playerHistory.map((h: PlayerHistory) => h.army)
        },
        {
          name: this.$t("rotg.common.resources.heroism"),
          color: "#43A047",
          data: playerHistory.map((h: PlayerHistory) => h.heroism)
        },
        {
          name: this.$t("rotg.common.resources.prophets"),
          color: "#00ACC1",
          data: playerHistory.map((h: PlayerHistory) => h.prophets)
        },
        {
          name: this.$t("rotg.common.resources.population"),
          color: "#1E88E5",
          data: playerHistory.map((h: PlayerHistory) => h.population)
        },
        {
          name: this.$t("rotg.common.resources.fatebindings"),
          color: "#5E35B1",
          data: playerHistory.map((h: PlayerHistory) => h.fatebindings)
        },
        {
          name: this.$t("rotg.common.resources.victoryPoints"),
          color: "#546E7A",
          data: playerHistory.map((h: PlayerHistory) => h.victoryPoints),
          selected: false
        }
      ];
      var optionsResourcesEvolution = {
        title: {
          text: this.$t("rotg.content.ui.stats.resourcesEvol")
        },
        chart: {
          type: "spline"
        },
        xAxis: {
          categories: [
            "T1",
            "T2",
            "T3",
            "T4",
            "T5",
            "T6",
            "T7",
            this.$t("rotg.content.ui.stats.endTurn")
          ]
        },
        yAxis: {
          min: 0,
          title: {
            text: this.$t("rotg.content.ui.stats.quantity")
          }
        },
        legend: {
          enabled: true
        },
        plotOptions: {
          spline: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: true
          }
        },
        series: dataSeries
      };

      return optionsResourcesEvolution;
    },
    buildOptionsCumulativeResources: function() {
      var dataSeries = [];
      var totalCumulResources = this.computeCumulResourcesObject(
        this.playersHistory
      );
      dataSeries.push({
        name: "Total",
        data: [
          totalCumulResources.orichalcum,
          totalCumulResources.army,
          totalCumulResources.heroism,
          totalCumulResources.prophets,
          totalCumulResources.population,
          totalCumulResources.fatebindings
        ]
      });
      this.rankings.forEach((player: Player) => {
        var playerHistory = this.playersHistory.filter(
          (h: PlayerHistory) => h.playerID == player._id
        );
        var playerCumulResources = this.computeCumulResourcesObject(
          playerHistory
        );
        dataSeries.push({
          name: player.user.login,
          data: [
            playerCumulResources.orichalcum,
            playerCumulResources.army,
            playerCumulResources.heroism,
            playerCumulResources.prophets,
            playerCumulResources.population,
            playerCumulResources.fatebindings
          ],
          stack: "players"
        });
      });
      var optionsCumulativeResources = {
        chart: {
          type: "column"
        },
        title: {
          text: this.$t("rotg.content.ui.stats.cumulResources")
        },
        xAxis: {
          categories: [
            this.$t("rotg.common.resources.orichalcum"),
            this.$t("rotg.common.resources.army"),
            this.$t("rotg.common.resources.heroism"),
            this.$t("rotg.common.resources.prophets"),
            this.$t("rotg.common.resources.population"),
            this.$t("rotg.common.resources.fatebindings")
          ]
        },
        yAxis: {
          min: 0,
          title: {
            text: this.$t("rotg.content.ui.stats.quantity")
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          column: {
            stacking: "normal"
          }
        },
        series: dataSeries
      };

      return optionsCumulativeResources;
    },
    buildOptionsPlayersInteractions: function() {
      var dataSeries = [];
      var attackResults = this.ordersResults.filter(
        (r: OrderResult) => r.order == ResourceOrders.ARMY_ATTACK
      );
      var spyResults = this.playersHistory.filter(
        (r: OrderResult) =>
          r.order == ResourceOrders.PROPH_SPY && r.sheetsSpied.length > 0
      );
      var settleResults = this.ordersResults.filter(
        (r: OrderResult) =>
          r.order == ResourceOrders.POP_PLAN &&
          r.settleTarget != "" &&
          r.cost > 0
      );
      // Pour chaque tour, on récupère les attaques communes et on créé un lien entre les joueurs attaquants
      for (var i = 1; i <= 7; i++) {
        var turnAttacks = attackResults.filter((r: OrderResult) => r.turn == i);
        var attackedPlanes = [];
        turnAttacks.forEach((attack: OrderResult) => {
          if (attackedPlanes.indexOf(attack.attackedPlaneID) < 0) {
            attackedPlanes.push(attack.attackedPlaneID);
          }
        });
        attackedPlanes.forEach((plane: string) => {
          var attackers = turnAttacks
            .filter((r: OrderResult) => r.attackedPlaneID == plane)
            .map((e: OrderResult) => e.playerID);
          if (attackers.length > 1) {
            for (var j = 0; j < attackers.length; j++) {
              var attacker = attackers[j];
              var nextAttacker = attackers[(j + 1) % attackers.length];
              dataSeries.push([
                this.getPlayerLoginFromId(attacker),
                this.getPlayerLoginFromId(nextAttacker),
                1
              ]);
            }
          }
        });
      }
      // On rajoute un lien entre le joueur espion et les deux joueurs espionnés
      spyResults.forEach((result: OrderResult) => {
        dataSeries.push([
          this.getPlayerLoginFromId(result.playerID),
          this.getPlayerLoginFromId(result.sheetsSpied[0], 1)
        ]);
        dataSeries.push([
          this.getPlayerLoginFromId(result.playerID),
          this.getPlayerLoginFromId(result.sheetsSpied[1], 1)
        ]);
      });
      // On rajoute le lien entre le joueur ayant lancé l'ordre Habiter et le joueur en bénéficiant
      settleResults.forEach((result: OrderResult) => {
        var from = this.getPlayerLoginFromId(result.playerID);
        var to = "";
        for (var k = 0; k < this.rankings.length; k++) {
          var player = this.rankings[k];
          if (player.territories.indexOf(result.settleTarget) > -1) {
            to = player.user.login;
            break;
          } else {
            continue;
          }
        }
        if (from != to) {
          dataSeries.push(from, to, 1);
        }
      });
      // Dédoublonnage des données
        var noDuplicate = [];
        for (var j = 0; j < dataSeries.length; j++) {
          var data = (dataSeries as any)[j];
          var de = data[0];
          var vers = data[1];
          var poids = data[2];
          var dependencyPresent =
            noDuplicate.filter((e: any) => e[0] == de && e[1] == vers).length >
            0;
          if (!dependencyPresent) {
            var all = (dataSeries as any).filter(
              (e: any) => e[0] == de && e[1] == vers
            );
            var finalPoids = 0;
            all.forEach((tab: any) => {
              finalPoids += tab[2];
            });
            noDuplicate.push([de, vers, finalPoids]);
          }
        }
        var options = {
          title: {
            text: this.$t("rotg.content.ui.stats.playersRelations")
          },
          series: [
            {
              keys: ["from", "to", "weight"],
              data: noDuplicate,
              type: "dependencywheel",
              name: "Relations",
              dataLabels: {
                color: "#333",
                textPath: {
                  enabled: true,
                  attributes: {
                    dy: 5
                  }
                },
                distance: 10
              }
            }
          ]
        };

        return options;
    },
    getPlayerSheets: function(player: Player) {
      var playerSheets = this.gameSheets.filter(
        (sheet: OrderSheet) => sheet.parameters.playerID == player._id
      );
      playerSheets.sort((a: OrderSheet, b: OrderSheet) => {
        return a.turn - b.turn;
      });

      return playerSheets;
    },
    computeHinders: function(player: Player) {
      var handsTargets = this.gameSheets
        .filter((sheet: OrderSheet) => sheet.parameters.playerID == player._id)
        .map((sheet: OrderSheet) => {
          return {
            plane: sheet.parameters.handMalusPlane,
            turn: sheet.turn
          };
        })
        .filter((id: string) => id != "");
      var attacksTargets = this.gameSheets
        .filter((sheet: OrderSheet) => sheet.parameters.attackTarget != "")
        .map((sheet: OrderSheet) => {
          return {
            plane: sheet.parameters.attackTarget,
            turn: sheet.turn
          };
        });
      var nbHinders = 0;
      attacksTargets.forEach((target: any) => {
        var turnHands = handsTargets.filter((e: any) => e.turn == target.turn);
        turnHands.forEach((hand: any) => {
          if (hand.plane == target.plane) {
            nbHinders++;
          }
        });
      });

      return nbHinders;
    },
    computeCumulArray(array: number[]) {
      var cumul = 0;
      array.forEach((e: number) => {
        cumul += e;
      });

      return cumul;
    },
    computeCumulResourcesObject: function(history: PlayerHistory[]) {
      var result = {
        orichalcum: this.computeCumulArray(
          history.map((h: PlayerHistory) => h.orichalcum)
        ),
        army: this.computeCumulArray(history.map((h: PlayerHistory) => h.army)),
        heroism: this.computeCumulArray(
          history.map((h: PlayerHistory) => h.heroism)
        ),
        prophets: this.computeCumulArray(
          history.map((h: PlayerHistory) => h.prophets)
        ),
        population: this.computeCumulArray(
          history.map((h: PlayerHistory) => h.population)
        ),
        fatebindings: this.computeCumulArray(
          history.map((h: PlayerHistory) => h.fatebindings)
        )
      };

      return result;
    },
    getConqueredPlanesColor(player: Player) {
      var conquestRatio = player.territories.length / this.nbConqueredPlanes;
      var averagePlanes = parseInt(
        (this.nbConqueredPlanes / this.rankings.length).toFixed(1)
      );
      if (player.territories.length < averagePlanes) {
        return "red darken-1";
      } else {
        return "teal darken-1";
      }
    },
    getHindersColor(player: Player) {
      var playerHinders = this.computeHinders(player);
      var SLICES = 3;
      var NB_TURNS = 7;
      var sliceValue = NB_TURNS / SLICES;
      if (playerHinders < sliceValue) {
        return "teal darken-1";
      } else if (
        playerHinders < (2 * sliceValue) / 3 &&
        playerHinders >= sliceValue
      ) {
        return "amber darken-1";
      } else {
        return "red darken-1";
      }
    },
    getPlayerLoginFromId: function(id: string) {
      var player = this.rankings.filter((p: Player) => p._id == id)[0];

      return player.user.login;
    },
    openOrderSheet: function(sheet: OrderSheet){
      this.$emit("opensheet", sheet);
    }
  },
  computed: {
    selectedGame: function(): Game {
      return store.getters.selectedGame;
    },
    gameSheets: function() {
      return store.getters.gameSheets;
    },
    selectedGamePlayers: function() {
      return store.getters.selectedGamePlayers;
    },
    selectedGameTerritories: function() {
      return store.getters.selectedGameTerritories;
    },
    rankings: function() {
      var players = new Array<Player>();
      Object.assign(players, store.getters.selectedGamePlayers);
      var sortedPlayers = new Array<Player>();
      players.sort((a: Player, b: Player) => {
        return b.victoryPoints - a.victoryPoints;
      });
      Object.assign(sortedPlayers, players);
      return players;
    },
    dataFetched: function(): boolean {
      return this.historyFetched && this.sheetsFetched && this.resultsFetched;
    },
    localeFR: function(): boolean {
      return this.$i18n.locale == "fr";
    }
  },
  watch: {
    "selectedGame.closed": function(newValue: boolean, oldValue: boolean) {
      if (newValue && !oldValue) {
        this.fetchGameOrderSheets();
        this.fetchGamePlayersHistory();
      }
    }
  },
  data: () => ({
    tab: 0,
    rankedPlayers: new Array<Player>(),
    playersHistory: new Array<PlayerHistory>(),
    orderSheets: new Array<OrderSheet>(),
    ordersResults: new Array<OrderResult>(),
    historyFetched: false,
    sheetsFetched: false,
    resultsFetched: false,
    loadingEvolution: true,
    nbConqueredPlanes: 0
  })
});
</script>