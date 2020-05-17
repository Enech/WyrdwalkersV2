<template>
  <div class="pa-3">
    <v-row>
      <v-col cols="12" sm="4">
        <v-card dark :loading="loadingTotalPlayers" color="lime darken-1">
          <v-card-title>
            Total joueurs
            <v-spacer></v-spacer>
            {{allPlayers.length}}
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card dark :loading="loadingTotalPlayers" color="cyan darken-1">
          <v-card-title>
            Joueurs / partie
            <v-spacer></v-spacer>
            {{this.allPlayers.length / this.rotgGames.length}}
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card dark :loading="loadingTotalPlayers" color="blue darken-1">
          <v-card-title>
            Parties jouées
            <v-spacer></v-spacer>
            {{rotgGames.length}}
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card dark :loading="loadingTotalPlayers" color="deep-purple darken-1">
          <v-card-title>
            Utilisateurs distincts
            <v-spacer></v-spacer>
            {{distinctUsers}}
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card dark :loading="loadingTotalPlayers" color="blue-grey darken-1">
          <v-card-title>
            Plans conquis
            <v-spacer></v-spacer>
            {{conqueredPlanes}} / {{rotgGames.length * 10}}
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card dark :loading="loadingTotalPlayers" color="indigo darken-1">
          <v-card-title>
            Plans / joueur
            <v-spacer></v-spacer>
            {{averagePlanesPlayer.toFixed(1)}}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card>
          <chart
            ref="gameswon"
            style="width: 100%"
            v-show="dataFetched"
            :chartOptions="optionsGamesWon"
          />
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card>
          <chart
            ref="vpstats"
            style="width: 100%"
            v-show="dataFetched"
            :chartOptions="optionsVpStats"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card :loading="loadingTotalPlayers" class="pa-3">
          <chart
            ref="resourcesdependency"
            style="width: 100%"
            v-show="dataFetched"
            :chartOptions="optionsPantheonsPlayed"
          />
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card :loading="loadingOrdersResults" class="pa-3">
          <chart
            ref="resourcesdependency"
            style="width: 100%"
            v-show="dataFetched"
            :chartOptions="optionsResourcesDependency"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :loading="loadingOrdersByTurn" class="pa-3">
          <v-card-title>
            <div style="width: 200px; display: inline-block; margin-right: 10px;">
              <v-select
                v-model="selectedResource"
                return-object
                :items="resourcesTypes"
                solo
                :loading="loadingOrdersByTurn"
                hide-details
              ></v-select>
            </div>
            <div style="width: 200px; display: inline-block">
              <v-select
                v-model="selectedOrder"
                :items="filteredOrders"
                return-object
                solo
                :loading="loadingOrdersByTurn"
                hide-details
              ></v-select>
            </div>
            <div style="display: inline-block; margin-left: 10px;">
              <v-btn class="ml-3" color="blue" dark @click.stop="resetOrdersData()">Reset</v-btn>
            </div>
          </v-card-title>
          <v-divider class="mb-3"></v-divider>
          <span class="subtitle-1 pl-3">Choisir un ordre pour commencer</span>
          <chart
            ref="ordersbyturn"
            style="width: 100%"
            v-show="dataFetched"
            :chartOptions="optionsOrdersByTurn"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :loading="loadingOrdersResults" class="pa-3">
          <v-card-title>
            <div style="width: 200px; display: inline-block; margin-right: 10px;">
              <v-select
                v-model="selectedPlane"
                :items="planes"
                solo
                :loading="loadingOrdersResults"
                hide-details
              ></v-select>
            </div>
            <div style="display: inline-block; margin-left: 10px;">
              <v-btn class="ml-3" color="blue" dark @click.stop="resetConquestsData()">Reset</v-btn>
            </div>
          </v-card-title>
          <v-divider class="mb-3"></v-divider>
          <span class="subtitle-1 pl-3">Choisir un Plan Cosmique pour commencer</span>
          <chart
            ref="ordersbyturn"
            style="width: 100%"
            v-show="dataFetched"
            :chartOptions="optionsPlanesConquests"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../../store";
import Chart from "../../../../components/global/Chart.vue";
import Game from "../../../../model/rotg/Game.model";
import Player from "../../../../model/rotg/Player.model";
import OrderSheet from "../../../../model/rotg/OrderSheet.model";
import OrderResult from "../../../../model/rotg/OrderResult.model";
import Territory from "../../../../model/rotg/Territory.model";
import ResourceEnum from "../../../../model/rotg/enums/Resources.enum";
import ResourcesEnum from "../../../../model/rotg/enums/Resources.enum";

export default Vue.extend({
  name: "AdminROTG",
  components: {
    chart: Chart
  },
  created: function() {
    this.selectedResource = this.resourcesTypes[0];
    this.filterOrders();
  },
  mounted: function() {
    this.fetchGames();
    this.fetchPlayers();
    this.fetchOrderSheets();
    this.fetchOrdersResults();
  },
  computed: {
    rotgGames: {
      get: function() {
        return store.getters.rotgGames;
      }
    },
    dataFetched: function(): boolean {
      return (
        this.gamesFetched &&
        this.playersFetched &&
        this.ordersFetched &&
        this.resultsFetched
      );
    }
  },
  methods: {
    fetchGames: function() {
      store.dispatch("fetchAllROTGGames").then(() => {
        this.buildOptionsGamesWon();
        this.gamesFetched = true;
      });
    },
    fetchPlayers: function() {
      store.dispatch("fetchROTGAllPlayers").then((players: Player[]) => {
        this.allPlayers = players;
        this.computeDistinctUsers();
        this.computeConqueredPlanes();
        this.buildOptionsVpStats();
        this.buildOptionsPantheonsPlayed();
        this.loadingTotalPlayers = false;
        this.playersFetched = true;
      });
    },
    fetchOrderSheets: function() {
      store.dispatch("fetchROTGAllOrderSheets").then((sheets: OrderSheet[]) => {
        this.allSheets = sheets;
        this.buildOptionsOrdersByTurn();
        this.loadingOrdersByTurn = false;
        this.ordersFetched = true;
      });
    },
    fetchOrdersResults: function() {
      var promises = [
        store.dispatch("fetchROTGOrdersResults"),
        store.dispatch("fetchROTGAllTerritories")
      ];
      Promise.all(promises).then((values: any) => {
        this.allResults = values[0];
        this.allPlanes = values[1];
        this.resultsFetched = true;
        this.loadingOrdersResults = false;
        this.buildOptionsConquestByTurn();
        this.buildOptionsResourcesDependency();
      });
    },
    reflowCharts: function() {
      for (var [key, value] of Object.entries(this.$refs)) {
        this.$refs[key].$children[0].chart.reflow();
      }
    },
    computeDistinctUsers: function() {
      var usersIds = this.allPlayers.map((p: Player) => p.user._id);
      var noDuplicates = new Array<string>();
      usersIds.forEach((e: string) => {
        if (noDuplicates.indexOf(e) < 0) {
          noDuplicates.push(e);
        }
      });
      this.distinctUsers = noDuplicates.length;
    },
    computeConqueredPlanes: function() {
      this.allPlayers.forEach((p: Player) => {
        this.conqueredPlanes += p.territories.length;
      });
      this.averagePlanesPlayer = this.conqueredPlanes / this.allPlayers.length;
    },
    buildOptionsGamesWon: function() {
      this.closedGames = this.rotgGames.filter((game: Game) => game.closed);
      var nbGamesWon = this.closedGames.filter((game: Game) => game.won).length;
      var percentGlobalVictory = (nbGamesWon / this.closedGames.length) * 100;
      this.optionsGamesWon = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie"
        },
        accessibility: {
          point: {
            valueSuffix: "%"
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %"
            }
          }
        },
        title: {
          text: "Pourcentage de victoires globales"
        },
        series: [
          {
            name: "Victoires globales",
            data: [
              {
                name: "Gagnées",
                y: percentGlobalVictory,
                sliced: true
              },
              {
                name: "Perdues",
                y: 100 - percentGlobalVictory
              }
            ]
          }
        ]
      };
    },
    buildOptionsVpStats: function() {
      var sortedPlayers = new Array<Player>();
      Object.assign(sortedPlayers, this.allPlayers);
      sortedPlayers.sort((a: Player, b: Player) => {
        if (a.victoryPoints > b.victoryPoints) {
          return 1;
        } else if (a.victoryPoints == b.victoryPoints) {
          return 0;
        } else {
          return -1;
        }
      });
      var totalPoints = 0;
      sortedPlayers.forEach((p: Player) => {
        totalPoints += p.victoryPoints;
      });
      var meanPoints = totalPoints / this.allPlayers.length;
      var minPoints = sortedPlayers[0].victoryPoints;
      var maxPoints = sortedPlayers[sortedPlayers.length - 1].victoryPoints;
      var medianPoints = 0;
      if (this.allPlayers.length % 2 == 0) {
        var median1 =
          sortedPlayers[Math.floor(sortedPlayers.length / 2)].victoryPoints;
        var median2 =
          sortedPlayers[Math.ceil(sortedPlayers.length / 2)].victoryPoints;
        medianPoints = (median1 + median2) / 2;
      } else {
        medianPoints =
          sortedPlayers[(sortedPlayers.length - 1) / 2].victoryPoints;
      }
      this.optionsVpStats = {
        chart: {
          type: "column"
        },
        xAxis: {
          categories: ["Min", "Moy.", "Med.", "Max"]
        },
        yAxis: {
          min: 0,
          title: {
            text: "PV"
          }
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        title: {
          text: "Points de Victoire"
        },
        series: [
          {
            name: "Points de Victoire",
            data: [
              minPoints,
              parseFloat(meanPoints.toFixed(1)),
              medianPoints,
              maxPoints
            ],
            dataLabels: [
              {
                enabled: true
              }
            ]
          }
        ]
      };
    },
    buildOptionsOrdersByTurn: function() {
      this.optionsOrdersByTurn = {
        title: {
          text: "Répartition des ordres par tour"
        },
        subtitle: {
          text: `Calculée sur ${this.allSheets.length} Feuilles d'Ordre`
        },
        chart: {
          type: "areaspline"
        },
        xAxis: {
          categories: ["T1", "T2", "T3", "T4", "T5", "T6", "T7"]
        },
        yAxis: {
          min: 0,
          title: {
            text: "Joués"
          }
        },
        legend: {
          enabled: true
        },
        plotOptions: {
          areaspline: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: true
          }
        },
        series: []
      };
    },
    buildOptionsConquestByTurn: function() {
      this.optionsPlanesConquests = {
        chart: {
          type: "column"
        },
        xAxis: {
          categories: ["T1", "T2", "T3", "T4", "T5", "T6", "T7"]
        },
        yAxis: {
          min: 0,
          title: {
            text: "Conquis # fois"
          }
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
            dataLabels: {
              enabled: true
            }
          }
        },
        title: {
          text: "Répartition des conquêtes par tour"
        },
        subtitle: {
          text: `Calculée sur ${this.allSheets.length} Feuilles d'Ordre`
        },
        series: []
      };
    },
    buildOptionsResourcesDependency: function() {
      var dependencyData = [];
      var costs = {
        orichalcum: this.allResults.filter(
          (result: OrderResult) => result.resourceCost == ResourcesEnum.ORI
        ),
        army: this.allResults.filter(
          (result: OrderResult) => result.resourceCost == ResourcesEnum.ARMY
        ),
        heroism: this.allResults.filter(
          (result: OrderResult) => result.resourceCost == ResourcesEnum.HERO
        ),
        prophets: this.allResults.filter(
          (result: OrderResult) => result.resourceCost == ResourcesEnum.PROPH
        ),
        population: this.allResults.filter(
          (result: OrderResult) => result.resourceCost == ResourcesEnum.POP
        ),
        fatebindings: this.allResults.filter(
          (result: OrderResult) => result.resourceCost == ResourcesEnum.FATE
        ),
        victoryPoints: this.allResults.filter(
          (result: OrderResult) => result.resourceCost == ResourcesEnum.VIC
        )
      };
      for (var [key, value] of Object.entries(costs)) {
        costs[key].forEach((result: OrderResult) => {
          var from = this.getResourceNameFromKey(result.resourceCost);
          var cost = parseInt(result.cost.toString(), 10);
          for (var i = 0; i < result.resourceGain.length; i++) {
            var to = this.getResourceNameFromKey(result.resourceGain[i]);
            var gain = parseInt(result.gains[i].toString(), 10);
            var poids = Math.abs(cost - gain);
            if (from != to) {
              dependencyData.push([from, to, poids]);
            }
          }
        });
      }
      var noDuplicate = [];
      for (var j = 0; j < dependencyData.length; j++) {
        var data = dependencyData[j];
        var from = data[0];
        var to = data[1];
        var poids = data[2];
        var dependencyPresent =
          noDuplicate.filter((e: any) => e[0] == from && e[1] == to).length > 0;
        if (!dependencyPresent) {
          var all = dependencyData.filter(
            (e: any) => e[0] == from && e[1] == to
          );
          var finalPoids = 0;
          all.forEach((tab: any) => {
            finalPoids += tab[2];
          });
          noDuplicate.push([from, to, finalPoids]);
        }
      }
      this.optionsResourcesDependency = {
        colors: [
          "#FFB300",
          "#E53935",
          "#43A047",
          "#00ACC1",
          "#1E88E5",
          "#5E35B1",
          "#546E7A"
        ],
        title: {
          text: "Dependances des ressources"
        },
        accessibility: {
          point: {
            valueDescriptionFormat:
              "{index}. From {point.from} to {point.to}: {point.weight}."
          }
        },
        series: [
          {
            keys: ["from", "to", "weight"],
            data: noDuplicate,
            type: "dependencywheel",
            name: "Dépendances",
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
    },
    buildOptionsPantheonsPlayed: function() {
      var pantheons = this.allPlayers.map((p: Player) => p.pantheon.name);
      var dataToLoad = [];
      var parsedPantheons = [];
      for (var i = 0; i < pantheons.length; i++) {
        var pantheon = pantheons[i];

        if (parsedPantheons.indexOf(pantheon) < 0) {
          var nbOccurences = pantheons.filter((e: string) => e == pantheon)
            .length;
          dataToLoad.push([pantheon, nbOccurences]);
          parsedPantheons.push(pantheon);
        }
      }
      this.optionsPantheonsPlayed = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
        title: {
          text: "Panthéons joués",
          align: "center",
          verticalAlign: "middle",
          y: 60
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true
            },
            startAngle: -90,
            endAngle: 90,
            center: ["50%", "75%"],
            size: "110%"
          }
        },
        series: [
          {
            type: "pie",
            name: "Panthéons joués",
            innerSize: "50%",
            data: dataToLoad
          }
        ]
      };
    },
    filterOrders: function() {
      this.filteredOrders = this.ordersSelect.filter(
        (order: any) => order.resource == this.selectedResource.value
      );
    },
    loadOrdersData: function() {
      var targetSheets = this.allSheets.filter(
        (sheet: OrderSheet) =>
          sheet.ordersSent.indexOf(this.selectedOrder.value) > -1
      );
      var dataToLoad = [];

      for (var i = 1; i <= 7; i++) {
        dataToLoad.push(
          targetSheets.filter((sheet: OrderSheet) => sheet.turn == i).length
        );
      }
      this.optionsOrdersByTurn.series.push({
        name: this.selectedOrder.text,
        color: this.selectedOrder.color,
        data: dataToLoad
      });
    },
    loadConquestsData: function() {
      var targetPlanes = this.allPlanes.filter(
        (plane: Territory) => plane.key == this.selectedPlane
      );
      var targetIds = targetPlanes.map((t: Territory) => t._id);
      var targetResults = this.allResults.filter(
        (result: OrderResult) =>
          targetIds.indexOf(result.attackedPlaneID) > -1 &&
          result.planeConquered
      );
      var dataToLoad = [];
      for (var i = 1; i <= 7; i++) {
        var turnTargetResults = targetResults.filter(
          (result: OrderResult) => result.turn == i
        );
        dataToLoad.push(turnTargetResults.length);
      }
      var woosh = document.createElement("div");
      woosh.innerHTML = targetPlanes[0].name;
      var planeName = woosh.innerText;
      this.optionsPlanesConquests.series.push({
        name: planeName,
        data: dataToLoad
      });
    },
    resetOrdersData: function() {
      this.optionsOrdersByTurn.series = [];
      this.selectedOrder = {
        value: -1
      };
      this.filterOrders();
    },
    resetConquestsData: function() {
      this.selectedPlane = -1;
      this.optionsPlanesConquests.series = [];
    },
    getResourceNameFromKey: function(key: number) {
      var result = "";
      switch (key) {
        case ResourceEnum.ORI:
          result = "Orichalque";
          break;
        case ResourceEnum.ARMY:
          result = "Armée";
          break;
        case ResourceEnum.HERO:
          result = "Héroïsme";
          break;
        case ResourceEnum.PROPH:
          result = "Prophètes";
          break;
        case ResourceEnum.POP:
          result = "Population";
          break;
        case ResourceEnum.FATE:
          result = "Liens du Destin";
          break;
        case ResourceEnum.VIC:
          result = "Points de Victoire";
          break;
      }

      return result;
    }
  },
  watch: {
    dataFetched: function(newValue: boolean, oldValue: boolean) {
      if (newValue && !oldValue) {
        this.reflowCharts();
      }
    },
    "selectedResource.value": function() {
      this.filterOrders();
    },
    "selectedOrder.value": function() {
      if (this.selectedOrder.value != -1) {
        this.loadOrdersData();
      }
    },
    selectedPlane: function() {
      if (this.selectedPlane != -1) {
        this.loadConquestsData();
      }
    }
  },
  data: () => ({
    gamesFetched: false,
    playersFetched: false,
    ordersFetched: false,
    resultsFetched: false,
    isMounted: false,
    closedGames: new Array<Game>(),
    optionsGamesWon: {},
    allPlayers: new Array<Player>(),
    allSheets: new Array<OrderSheet>(),
    allResults: new Array<OrderResult>(),
    allPlanes: new Array<Territory>(),
    loadingTotalPlayers: true,
    loadingAverageGamePlayers: true,
    averagePlayersByGame: 0,
    distinctUsers: 0,
    conqueredPlanes: 0,
    averagePlanesPlayer: 0,
    optionsVpStats: {},
    optionsOrdersByTurn: {},
    loadingOrdersByTurn: true,
    loadingOrdersResults: true,
    optionsPlanesConquests: {},
    optionsResourcesDependency: {},
    optionsPantheonsPlayed: {},
    selectedResource: {},
    selectedOrder: {},
    resourcesTypes: [
      {
        value: 0,
        text: "Orichalque",
        color: "#ffb300"
      },
      {
        value: 1,
        text: "Armée",
        color: "#e53935"
      },
      {
        value: 2,
        text: "Héroïsme",
        color: "#43a047"
      },
      {
        value: 3,
        text: "Prophètes",
        color: "#00acc1"
      },
      {
        value: 4,
        text: "Population",
        color: "#1e88e5"
      },
      {
        value: 5,
        text: "Liens du Destin",
        color: "#311b92"
      }
    ],
    filteredOrders: [],
    ordersSelect: [
      {
        value: 0,
        text: "Prospérité",
        resource: 0,
        color: "#FFB300"
      },
      {
        value: 18,
        text: "Opulence",
        resource: 0,
        color: "#FFA000"
      },
      {
        value: 1,
        text: "Investissement",
        resource: 0,
        color: "#FF8F00"
      },
      {
        value: 17,
        text: "Anticipation",
        resource: 0,
        color: "#FF6F00"
      },
      {
        value: 3,
        text: "Attaquer",
        resource: 1,
        color: "#E53935"
      },
      {
        value: 4,
        text: "Stabiliser",
        resource: 1,
        color: "#B71C1C"
      },
      {
        value: 5,
        text: "Godborn",
        resource: 2,
        color: "#43A047"
      },
      {
        value: 6,
        text: "Exploration",
        resource: 2,
        color: "#66BB6A"
      },
      {
        value: 7,
        text: "Equipée",
        resource: 2,
        color: "#81C784"
      },
      {
        value: 25,
        text: "Apothéose",
        resource: 2,
        color: "#1B5E20"
      },
      {
        value: 16,
        text: "Espionner",
        resource: 3,
        color: "#00ACC1"
      },
      {
        value: 15,
        text: "Infiltration",
        resource: 3,
        color: "#0097A7"
      },
      {
        value: 14,
        text: "Prophétie",
        resource: 3,
        color: "#00838F"
      },
      {
        value: 21,
        text: "Oracles",
        resource: 3,
        color: "#006064"
      },
      {
        value: 22,
        text: "Augures",
        resource: 3,
        color: "#26C6DA"
      },
      {
        value: 23,
        text: "Vision",
        resource: 3,
        color: "#4DD0E1"
      },
      {
        value: 24,
        text: "Répartition",
        resource: 3,
        color: "#80DEEA"
      },
      {
        value: 8,
        text: "Habiter",
        resource: 4,
        color: "#1E88E5"
      },
      {
        value: 9,
        text: "Recrutement",
        resource: 4,
        color: "#1976D2"
      },
      {
        value: 10,
        text: "Informateurs",
        resource: 4,
        color: "#1565C0"
      },
      {
        value: 20,
        text: "Civilisation",
        resource: 4,
        color: "#0D47A1"
      },
      {
        value: 11,
        text: "Célébration",
        resource: 5,
        color: "#5E35B1"
      },
      {
        value: 12,
        text: "Destinée",
        resource: 5,
        color: "#4527A0"
      },
      {
        value: 13,
        text: "Ragots",
        resource: 5,
        color: "#311B92"
      },
      {
        value: 2,
        text: "Alea Jacta Est",
        resource: 5,
        color: "#7E57C2"
      }
    ],
    selectedPlane: -1,
    planes: [
      {
        text: "Le Monde",
        value: 0
      },
      {
        text: "Fairie",
        value: 1
      },
      {
        text: "Shambhala",
        value: 2
      },
      {
        text: "Aunu",
        value: 3
      },
      {
        text: "Mont Olympe",
        value: 4
      },
      {
        text: "Devaloka",
        value: 5
      },
      {
        text: "Aether",
        value: 6
      },
      {
        text: "Nyx",
        value: 7
      },
      {
        text: "Kosmos",
        value: 8
      },
      {
        text: "Sheol",
        value: 9
      }
    ]
  }),
  metaInfo: function() {
    return {
      title: "Backoffice Rise of the Gods",
      link: [{ rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }]
    };
  }
});
</script>