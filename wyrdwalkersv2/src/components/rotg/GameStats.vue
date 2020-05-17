<template>
  <div class="mt-3">
      <v-tabs v-model="tab" vertical>
          <v-tab v-for="(player,index) in rankings" :key="index">{{player.user.login}}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
          <v-tab-item v-for="(player,index) in rankings" :key="index"></v-tab-item>
      </v-tabs-items>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";
import Player from "../../model/rotg/Player.model";
import OrderSheet from "../../model/rotg/OrderSheet.model";
import OrdersEnum from "../../model/rotg/enums/Orders.enum";
import Territory from "../../model/rotg/Territory.model";
import Resources from "../../model/rotg/Resources.model";

export default Vue.extend({
  name: "ROTGStats",
  created() {
  },
  methods: {
    fetchGameOrderSheets: function() {
      store.dispatch("fetchROTGGameOrderSheets", this.selectedGame._id);
    },
    fetchGamePlayersHistory: function() {
      store.dispatch("fetchROTGGamePlayersHistory", this.selectedGame._id);
    }
  },
  computed: {
    selectedGame: function() {
      return store.getters.selectedGame;
    },
    gameSheets: function() {
      return store.getters.gameSheets;
    },
    selectedGamePlayers: function() {
      return store.getters.selectedGamePlayers;
    },
    rankings: function() {
      var players = store.getters.selectedGamePlayers;
      var sortedPlayers = new Array<Player>();
      players.sort((a: Player, b: Player) => {
        return b.victoryPoints - a.victoryPoints;
      });
      Object.assign(sortedPlayers, players);
      return players;
    }
  },
  data: () => ({
      tab: 0,
      rankedPlayers: new Array<Player>()
  })
});
</script>