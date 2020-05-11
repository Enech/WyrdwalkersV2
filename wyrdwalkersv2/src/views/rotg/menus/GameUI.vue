<template>
  <div class="pa-3" style="position:relative;">
    <v-toolbar class="pl-3" tile>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon left v-on="on" @click="backToGamesList()">
            <v-icon>arrow_back</v-icon>
          </v-btn>
        </template>
        <span>{{$t('rotg.content.ui.back')}}</span>
      </v-tooltip>
      <v-toolbar-title>
        {{selectedGame.name}}
        <span v-if="selectedGame.turn > 0">(T{{selectedGame.turn}})</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom v-if="selectedGame.won && selectedGame.closed">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" color="green">
            <v-icon>fa-handshake</v-icon>
          </v-btn>
        </template>
        <span>{{$t('rotg.content.ui.won')}}</span>
      </v-tooltip>
      <v-tooltip bottom v-if="!selectedGame.won && selectedGame.closed">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" color="red">
            <v-icon>fa-skull-crossbones</v-icon>
          </v-btn>
        </template>
        <span>{{$t('rotg.content.ui.lost')}}</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-tooltip bottom v-if="selectedGame.turn > 1">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="resolutionDialog = true;">
            <v-icon>fa-balance-scale</v-icon>
          </v-btn>
        </template>
        <span>{{$t('rotg.content.ui.lastTurn')}}</span>
      </v-tooltip>
      <v-tooltip bottom v-if="playerIsCreator && selectedGame.running && !selectedGame.timerMode">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="openReadyToEndDialog()" :loading="loadingButton">
            <v-icon>alarm_on</v-icon>
          </v-btn>
        </template>
        <span>{{$t('rotg.common.buttons.endTurn')}}</span>
      </v-tooltip>
      <v-tooltip bottom v-if="selectedGame.running && selectedGame.timerMode">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" class="blob">
            <v-icon>fa-stopwatch</v-icon>
          </v-btn>
        </template>
        <div>
          <div
            class="subtitle-2 text-center"
          >{{$t('rotg.content.ui.timerText1')}} {{selectedGame.turn}} {{$t('rotg.content.ui.timerText2')}}</div>
          <rotg-counter />
        </div>
      </v-tooltip>
      <v-tooltip bottom v-if="registerAvailable()">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="openRegisterPlayer()">
            <v-icon>fa-dungeon</v-icon>
          </v-btn>
        </template>
        <span>{{$t('rotg.common.buttons.joinGame')}}</span>
      </v-tooltip>
      <v-tooltip
        bottom
        v-if="playerIsCreator && userIsInGame && !selectedGame.running && !selectedGame.closed"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="openReadyToEndDialog()" :loading="loadingButton">
            <v-icon>play_arrow</v-icon>
          </v-btn>
        </template>
        <span>{{$t('rotg.common.buttons.startGame')}}</span>
      </v-tooltip>
    </v-toolbar>
    <v-img
      :height="100"
      src="/ressources/rotg/galaxy-min.gif"
      class="text-center align-center pa-3 mt-3"
      v-if="currentPlayer.pantheon.name != ''"
    >
      <div
        class="headline pa-3 bg-transparent-black white--text"
      >{{$t('rotg.content.ui.welcome')}} {{currentPlayer.pantheon.leaderName}} !</div>
    </v-img>
    <v-row class="mt-3" v-if="currentPlayer._id != '' && selectedGame.running">
      <v-col cols="4" sm="2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card v-on="on" color="amber darken-1" dark>
              <v-card-title>
                <v-icon left>fa-gem</v-icon>
                <v-spacer></v-spacer>
                <span class="subtitle-1">{{currentPlayer.orichalcum}}</span>
                <span
                  class="subtitle-1"
                  v-if="resourcesSpent.orichalcum > 0"
                >({{displayRhesus(-1 * resourcesSpent.orichalcum)}})</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pa-1 text-right">+2 {{$t('rotg.common.resources.byTurn')}}</v-card-text>
            </v-card>
          </template>
          <span>{{$t('rotg.common.resources.orichalcum')}}</span>
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
                <span
                  class="subtitle-1"
                  v-if="resourcesSpent.army > 0"
                >({{displayRhesus(-1 * resourcesSpent.army)}})</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pa-1 text-right">+0 {{$t('rotg.common.resources.byTurn')}}</v-card-text>
            </v-card>
          </template>
          <span>{{$t('rotg.common.resources.army')}}</span>
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
                <span
                  class="subtitle-1"
                  v-if="resourcesSpent.heroism > 0"
                >({{displayRhesus(-1 * resourcesSpent.heroism) }})</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pa-1 text-right">+1 {{$t('rotg.common.resources.byTurn')}}</v-card-text>
            </v-card>
          </template>
          <span>{{$t('rotg.common.resources.heroism')}}</span>
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
                <span
                  class="subtitle-1"
                  v-if="resourcesSpent.prophets > 0"
                >({{displayRhesus(-1 * resourcesSpent.prophets)}})</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pa-1 text-right">+2 {{$t('rotg.common.resources.byTurn')}}</v-card-text>
            </v-card>
          </template>
          <span>{{$t('rotg.common.resources.prophets')}}</span>
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
                <span
                  class="subtitle-1"
                  v-if="resourcesSpent.population > 0"
                >({{displayRhesus(-1 * resourcesSpent.population)}})</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pa-1 text-right">+2 {{$t('rotg.common.resources.byTurn')}}</v-card-text>
            </v-card>
          </template>
          <span>{{$t('rotg.common.resources.population')}}</span>
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
                <span
                  class="subtitle-1"
                  v-if="resourcesSpent.fatebindings > 0"
                >({{displayRhesus(resourcesSpent.fatebindings)}})</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pa-1 text-right">+0 {{$t('rotg.common.resources.byTurn')}}</v-card-text>
            </v-card>
          </template>
          <span>{{$t('rotg.common.resources.fatebindings')}}</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-card class="mt-3 pa-3">
      <v-tabs v-model="tab" show-arrows grow>
        <v-tab>
          <v-icon left>fa-chess-bishop</v-icon>
          {{$t('rotg.content.ui.generalView.title')}}
        </v-tab>
        <v-tab v-if="userIsInGame && selectedGame.running">
          <v-icon left>fa-receipt</v-icon>
          {{$t('rotg.content.ui.orderSheet.title')}}
          <span
            v-if="selectedGame.turn > 0"
          >(T{{selectedGame.turn}})</span>
        </v-tab>
        <v-tab v-if="userIsInGame && selectedGame.running">
          <v-icon left>fa-archive</v-icon>
          {{$t('rotg.content.ui.archives.title')}}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-row>
            <v-col cols="12" sm="6">
              <v-card class="pa-3" outlined>
                <v-card-title>
                  <v-icon small left>mdi-layers-triple</v-icon>
                  &nbsp;{{$t('rotg.content.ui.planes')}}
                </v-card-title>
                <v-divider></v-divider>
                <v-row class="pa-3">
                  <v-col cols="12">
                    <span class="green--text subtitle-1" v-if="nbGodsPlanes >= globalVictory()">{{$t("rotg.content.ui.generalView.globalVictory")}}</span>
                    <span v-else class="subtitle-1"><b>{{globalVictory() - nbGodsPlanes}}</b>{{$t("rotg.content.ui.generalView.remainingPlanes")}}</span>
                  </v-col>
                </v-row>
                <v-card-text>
                  <span
                    class="subtitle-1"
                    v-if="selectedGameTerritories.length == 0"
                  >{{$t('rotg.content.ui.noData')}}</span>
                  <v-simple-table v-else>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">{{$t('rotg.content.ui.generalView.plane')}}</th>
                          <th class="text-left">{{$t('rotg.content.ui.generalView.owner')}}</th>
                          <th class="text-left">Forces</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in selectedGameTerritories" :key="item.name">
                          <td v-html="localeFR ? item.name : item.nameVO"></td>
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
              <v-card class="pa-3" outlined>
                <v-card-title>Scores</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-simple-table v-if="selectedGamePlayers.length > 0">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">{{$t('rotg.content.ui.generalView.pantheon')}}</th>
                          <th class="text-left">{{$t('rotg.content.ui.generalView.player')}}</th>
                          <th class="text-left">{{$t('rotg.content.ui.generalView.victoryPoints')}}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item,index) in rankings" :key="index">
                          <td>{{ localeFR ? item.pantheon.name : item.pantheon.nameVO }}</td>
                          <td>{{ item.user.name }}</td>
                          <td>
                            {{ item.victoryPoints }}&nbsp;
                            <v-icon small>fa-trophy</v-icon>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                  <span class="subtitle-1" v-else>{{$t('rotg.content.ui.noData')}}</span>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <rotg-ordersheet />
        </v-tab-item>
        <v-tab-item>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">{{$t('rotg.content.ui.archives.turn')}}</th>
                  <th class="text-left">{{$t('rotg.content.ui.archives.sent')}}</th>
                  <th class="text-left">{{$t('rotg.content.ui.archives.processed')}}</th>
                  <th class="text-left">{{$t('rotg.content.ui.archives.details')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in playerSheets" :key="index">
                  <td>{{$t('rotg.content.ui.archives.turn')}} {{ item.turn }}</td>
                  <td>{{item.dayOfSubmit}} {{$t('rotg.content.ui.archives.timeSeparator')}} {{item.timeOfSubmit}}</td>
                  <td>
                    <v-icon color="green" v-if="item.processed">fa-check</v-icon>
                    <v-icon color="red" v-else>fa-times</v-icon>
                  </td>
                  <td>
                    <v-btn
                      color="blue"
                      dark
                      @click="openOrderSheetView(item)"
                    >{{$t('rotg.content.ui.archives.open')}}</v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-dialog v-model="loading" persistent width="300" hide-overlay>
      <v-card color="primary" dark>
        <v-card-text>
          {{$t('rotg.common.loading')}}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="registerGameDialog" max-width="1000" persistent scrollable>
      <v-card>
        <v-card-title class="blue darken-4 white--text">
          <span class="headline">{{$t('rotg.common.buttons.joinGame')}} {{selectedGame.name}}</span>
          <v-spacer></v-spacer>
          <v-btn text icon dark @click="closeDialog()">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text :max-height="dialogHeight">
          <v-data-iterator :items="pantheons" disable-pagination hide-default-footer>
            <template v-slot:default="props">
              <v-row>
                <v-col v-for="(item,index) in props.items" :key="index" cols="12" sm="6">
                  <v-card
                    height="300"
                    @click="assignPantheonToPlayer(item)"
                    :dark="pantheonSelected(item.name)"
                    :color="pantheonSelected(item.name) ? 'light-blue' : 'white'"
                  >
                    <v-card-title class="headline font-weight-medium">{{ localeFR ? item.name : item.nameVO }}</v-card-title>
                    <v-divider></v-divider>
                    <v-list dense :color="pantheonSelected(item.name) ? 'light-blue' : 'white'">
                      <v-list-item>
                        <v-list-item-content class="subtitle-1 font-weight-regular">Leader :</v-list-item-content>
                        <v-list-item-content
                          class="align-end subtitle-1 font-weight-regular"
                        >{{ item.leaderName }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content v-if="localeFR">{{ item.description }}</v-list-item-content>
                        <v-list-item-content v-else>{{ item.descriptionVO }}</v-list-item-content>
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
          <v-btn color="black" text @click="closeDialog()">{{$t('rotg.common.buttons.cancel')}}</v-btn>
          <v-btn color="blue" text @click="addPlayer()">{{$t('rotg.common.buttons.confirm')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="resolutionDialog" max-width="1000" persistent scrollable>
      <v-card>
        <v-card-title class="black white--text">
          <span class="headline">{{$t('rotg.content.ui.turnResult.title')}} {{selectedGame.turn-1}}</span>
          <v-spacer></v-spacer>
          <v-btn text icon dark @click="closeResolutionDialog();">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text :max-height="dialogHeight">
          <v-row align-content="center" justify="center" v-if="loadingFate">
            <v-col class="subtitle-1 text-center" cols="12">{{$t('rotg.common.loading')}}</v-col>
            <v-col cols="6">
              <v-progress-linear color="blue accent-4" indeterminate rounded height="6"></v-progress-linear>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <v-card class="pa-3" outlined>
                <v-card-title>
                  <v-icon left>fa-spider</v-icon>
                  &nbsp;{{localeFR ? currentFateConsequence.name : currentFateConsequence.nameVO}}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text v-html="localeFR ? currentFateConsequence.text : currentFateConsequence.textVO"></v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card class="pa-3" outlined>
                <v-card-title>
                  <v-icon left>fa-coins</v-icon>
                  &nbsp;{{$t('rotg.content.ui.turnResult.earnings')}}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">{{$t('rotg.content.ui.turnResult.resource')}}</th>
                          <th class="text-left">{{$t('rotg.content.ui.turnResult.gainLoss')}}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <v-icon small left>fa-gem</v-icon>
                            &nbsp;{{$t('rotg.common.resources.orichalcum')}}
                          </td>
                          <td>{{ currentPlayer.orichalcum - previousPlayer.orichalcum }}</td>
                        </tr>
                        <tr>
                          <td>
                            <v-icon small left>fa-fist-raised</v-icon>
                            &nbsp;{{$t('rotg.common.resources.army')}}
                          </td>
                          <td>{{ currentPlayer.army - previousPlayer.army }}</td>
                        </tr>
                        <tr>
                          <td>
                            <v-icon small left>fa-jedi</v-icon>
                            &nbsp;{{$t('rotg.common.resources.heroism')}}
                          </td>
                          <td>{{ currentPlayer.heroism - previousPlayer.heroism }}</td>
                        </tr>
                        <tr>
                          <td>
                            <v-icon small left>fa-eye</v-icon>
                            &nbsp;{{$t('rotg.common.resources.prophets')}}
                          </td>
                          <td>{{ currentPlayer.prophets - previousPlayer.prophets }}</td>
                        </tr>
                        <tr>
                          <td>
                            <v-icon small left>fa-user-friends</v-icon>
                            &nbsp;{{$t('rotg.common.resources.population')}}
                          </td>
                          <td>{{ currentPlayer.population - previousPlayer.population }}</td>
                        </tr>
                        <tr>
                          <td>
                            <v-icon small left>fa-spider</v-icon>
                            &nbsp;{{$t('rotg.common.resources.fatebindings')}}
                          </td>
                          <td>{{ currentPlayer.fatebindings - previousPlayer.fatebindings }}</td>
                        </tr>
                        <tr>
                          <td>
                            <v-icon small left>fa-trophy</v-icon>
                            &nbsp;{{$t('rotg.common.resources.victoryPoints')}}
                          </td>
                          <td>{{ currentPlayer.victoryPoints - previousPlayer.victoryPoints }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card class="pa-3" outlined>
                <v-card-title>
                  <v-icon left>fa-spider</v-icon>
                  &nbsp;{{$t('rotg.content.ui.turnResult.otherInformation')}}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="mb-3">
                      <v-icon small left>fa-receipt</v-icon>
                      &nbsp;{{$t('rotg.content.ui.turnResult.sheetsVisible')}}
                      <span
                        v-if="currentPlayer.sheetsVisible.length == 0"
                      >/</span>
                      <div v-else>
                        <v-btn
                          color="blue"
                          dark
                          @click="fetchOrderSheet(currentPlayer.sheetsVisible[0])"
                        >
                          <v-icon small left>fa-receipt</v-icon>#1
                        </v-btn>
                        <v-btn
                          color="blue"
                          dark
                          @click="fetchOrderSheet(currentPlayer.sheetsVisible[1])"
                        >
                          <v-icon small left>fa-receipt</v-icon>#2
                        </v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" class="mb-3">
                      {{$t('rotg.content.ui.turnResult.titansVisible')}}
                      <span
                        v-if="currentPlayer.titanForcesVisible"
                      >
                        <v-icon small left class="green--text">fa-check</v-icon>
                        &nbsp; {{$t('rotg.common.yes')}}
                      </span>
                      <span v-else>
                        <v-icon small class="red--text">fa-times</v-icon>
                        &nbsp; {{$t('rotg.common.no')}}
                      </span>
                    </v-col>
                    <v-col cols="12">
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th
                                class="text-left"
                              >{{$t('rotg.content.ui.turnResult.attackedPlane')}}</th>
                              <th
                                class="text-left"
                              >{{$t('rotg.content.ui.turnResult.attackingPlayers')}}</th>
                              <th
                                class="text-left"
                              >{{$t('rotg.content.ui.turnResult.attackResult')}}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(attack,index) in attacksResults" :key="index">
                              <td v-html="localeFR ? attack.name : attack.nameVO"></td>
                              <td>{{ attack.nbPlayers }}</td>
                              <td>
                                <span v-if="attack.taken">
                                  <v-icon small left>mdi-crown</v-icon>
                                  &nbsp;{{$t('rotg.content.ui.turnResult.victory')}}
                                </span>
                                <span v-else>
                                  <v-icon small left>mdi-sword-cross</v-icon>
                                  &nbsp;{{$t('rotg.content.ui.turnResult.defeat')}}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="closeResolutionDialog()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="orderSheetDialog" max-width="1000" persistent scrollable>
      <v-card>
        <v-card-title class="blue darken-4 white--text">
          <span class="headline">
            <v-icon left dark>fa-receipt</v-icon>
            {{$t('rotg.content.ui.orderSheetDialog.title1')}} {{viewedOrderSheet.parameters.playerName}} ({{$t('rotg.content.ui.orderSheetDialog.title2')}} {{viewedOrderSheet.turn}})
          </span>
          <v-spacer></v-spacer>
          <v-btn text icon dark @click="closeOrderSheetView();">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text :max-height="dialogHeight">
          <v-row>
            <v-col cols="12" sm="6">
              <v-card outlined>
                <v-card-title>{{$t('rotg.content.ui.orderSheetDialog.sentOrders')}}</v-card-title>
                <v-card-text>
                  <div v-for="(order,index) in viewedOrderSheet.ordersSent" :key="index">
                    <span class="subtitle-1" v-html="getOrderNameFromNumber(order)"></span>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card outlined>
                <v-card-title>{{$t('rotg.content.ui.orderSheetDialog.ordersTargets')}}</v-card-title>
                <v-card-text>
                  <div
                    class="subtitle-1"
                    v-if="viewedOrderSheet.parameters.armySent > 0 && viewedOrderSheet.parameters.attackTarget.length > 0"
                  >
                    <div v-if="localeFR">
                      Attaque du Plan
                      <span
                        class="font-weight-bold"
                        v-html="getObjectFromID(viewedOrderSheet.parameters.attackTarget,selectedGameTerritories).name"
                      ></span> avec
                      <b>{{viewedOrderSheet.parameters.armySent}}</b>&nbsp;
                      <v-icon small left>fa-fist-raised</v-icon>&nbsp;Armées
                    </div>
                    <div v-else>
                      Attack of the Plane
                      <span
                        class="font-weight-bold"
                        v-html="getObjectFromID(viewedOrderSheet.parameters.attackTarget,selectedGameTerritories).nameVO"
                      ></span> with
                      <b>{{viewedOrderSheet.parameters.armySent}}</b>&nbsp;
                      <v-icon small left>fa-fist-raised</v-icon>&nbsp;Armies
                    </div>
                  </div>
                  <div class="subtitle-1" v-if="viewedOrderSheet.parameters.populateTarget != ''">
                    <div v-if="localeFR">
                      Habiter le Plan
                      <span
                        class="font-weight-bold"
                        v-html="getObjectFromID(viewedOrderSheet.parameters.populateTarget,selectedGameTerritories).name"
                      ></span>
                    </div>
                    <div v-else>
                      Settle the Plane
                      <span
                        class="font-weight-bold"
                        v-html="getObjectFromID(viewedOrderSheet.parameters.populateTarget,selectedGameTerritories).nameVO"
                      ></span>
                    </div>
                  </div>
                  <div class="subtitle-1" v-if="viewedOrderSheet.parameters.gambleTarget != ''">
                    <div v-if="localeFR">
                      Anticipation de la
                      <b>{{viewedOrderSheet.parameters.gambleDefeat ? 'défaite' : 'victoire'}}</b>
                      de l'attaque sur le Plan
                      <span
                        class="font-weight-bold"
                        v-html="getObjectFromID(viewedOrderSheet.parameters.gambleTarget,selectedGameTerritories).name"
                      ></span>
                    </div>
                    <div v-else>
                      Anticipation of the
                      <b>{{viewedOrderSheet.parameters.gambleDefeat ? 'defeat' : 'victory'}}</b>
                      of the attack over the Plane
                      <span
                        class="font-weight-bold"
                        v-html="getObjectFromID(viewedOrderSheet.parameters.gambleTarget,selectedGameTerritories).nameVO"
                      ></span>
                    </div>
                  </div>
                  <div
                    class="subtitle-1"
                    v-if="viewedOrderSheet.parameters.foreseeTargets.length > 0"
                  >
                    <div v-if="localeFR">
                      Demande de vue sur les Feuilles d'Ordre du tour {{viewedOrderSheet.turn-1}} des Panthéons :
                      <ul>
                        <li
                          v-for="(target,index) in viewedOrderSheet.parameters.foreseeTargets"
                          :key="index"
                        >{{getObjectFromID(target,selectedGamePlayers).pantheon.name}}</li>
                      </ul>
                    </div>
                    <div v-else>
                      Request for viewing Order Sheets of turn {{viewedOrderSheet.turn-1}} for Pantheons :
                      <ul>
                        <li
                          v-for="(target,index) in viewedOrderSheet.parameters.foreseeTargets"
                          :key="index"
                        >{{getObjectFromID(target,selectedGamePlayers).pantheon.nameVO}}</li>
                      </ul>
                    </div>
                  </div>
                  <div
                    class="subtitle-1"
                    v-if="viewedOrderSheet.parameters.handBonusPlanes.length > 0"
                  >
                    <div v-if="localeFR">
                      Main du Destin sur les Plans suivants :
                      <ul>
                        <li
                          v-for="(bonus,index) in viewedOrderSheet.parameters.handBonusPlanes"
                          :key="index"
                        >
                          <span v-html="getObjectFromID(bonus,selectedGameTerritories).name"></span> (
                          <b>-1</b>&nbsp;
                          <v-icon small left>fa-fist-raised</v-icon>Armée)
                        </li>
                        <li>
                          <span
                            v-html="getObjectFromID(viewedOrderSheet.parameters.handMalusPlane,selectedGameTerritories).name"
                          ></span> (
                          <b>+3</b>&nbsp;
                          <v-icon small left>fa-fist-raised</v-icon>Armées)
                        </li>
                      </ul>
                    </div>
                    <div v-else>
                      Hand of Fate over the following Planes :
                      <ul>
                        <li
                          v-for="(bonus,index) in viewedOrderSheet.parameters.handBonusPlanes"
                          :key="index"
                        >
                          <span v-html="getObjectFromID(bonus,selectedGameTerritories).nameVO"></span> (
                          <b>-1</b>&nbsp;
                          <v-icon small left>fa-fist-raised</v-icon>Army)
                        </li>
                        <li>
                          <span
                            v-html="getObjectFromID(viewedOrderSheet.parameters.handMalusPlane,selectedGameTerritories).nameVO"
                          ></span> (
                          <b>+3</b>&nbsp;
                          <v-icon small left>fa-fist-raised</v-icon>Armies)
                        </li>
                      </ul>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="closeOrderSheetView()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="readyPlayersDialog" max-width="1000" persistent scrollable hide-overlay>
      <v-card>
        <v-card-title class="blue darken-4 white--text">
          <span class="headline">
            <span v-if="!selectedGame.running">{{$t('rotg.content.ui.readyDialog.launchTitle')}}</span>
            <span v-else>{{$t('rotg.content.ui.readyDialog.endTurnTitle')}} {{selectedGame.turn}}</span>
            - {{$t('rotg.content.ui.readyDialog.readyTitle')}}
          </span>
        </v-card-title>
        <v-card-text :max-height="dialogHeight">
          <v-list two-line>
            <v-list-item v-for="(player,index) in selectedGamePlayers" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{player.user.name}}</v-list-item-title>
                <v-list-item-subtitle v-if="localeFR">{{player.pantheon.name}}</v-list-item-subtitle>
                <v-list-item-subtitle v-else>{{player.pantheon.nameVO}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                  v-if="player.turnReady"
                >{{$t('rotg.content.ui.readyDialog.ready')}}</v-chip>
                <v-chip class="ma-2" color="red" text-color="white" v-else>...</v-chip>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="unReadyPlayerOne()" :loading="loadingReadyButton">{{$t('rotg.content.ui.readyDialog.notReady')}}</v-btn>
          <v-btn color="green" text @click="readyPlayerOne()" :loading="loadingReadyButton">{{$t('rotg.content.ui.readyDialog.ready')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="finalDialog" max-width="1000" persistent scrollable hide-overlay>
      <v-card>
        <v-card-title class="red darken-4 white--text" v-if="!selectedGame.won">
          <v-icon left class="white--text">mdi-emoticon-sad</v-icon>&nbsp;{{$t('rotg.content.ui.endgameDialog.lostTitle')}}
          <v-spacer></v-spacer>
          <v-btn text class="white--text" @click="finalDialog = false;">
            <v-icon>fa-times</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-title class="teal darken-4 white--text" v-else>
          <v-icon left class="white--text">mdi-emoticon-happy</v-icon>&nbsp;{{$t('rotg.content.ui.endgameDialog.wonTitle')}}
          <v-spacer></v-spacer>
          <v-btn text class="white--text" @click="finalDialog = false;">
            <v-icon>fa-times</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text
          :max-height="dialogHeight"
          v-if="!selectedGame.won && selectedGame.closed"
          class="pt-3"
        >
          <span v-html="$t('rotg.content.ui.endgameDialog.lostText1')"></span>&nbsp;
          <b>{{rankings[0].pantheon.leaderName}}</b>
          , {{$t('rotg.content.ui.endgameDialog.lostText2')}} {{rankings[0].pantheon.name}}. {{$t('rotg.content.ui.endgameDialog.lostText3')}}
        </v-card-text>
        <v-card-text
          :max-height="dialogHeight"
          v-if="selectedGame.won && selectedGame.closed"
          class="pt-3"
        >
          <span v-html="$t('rotg.content.ui.endgameDialog.wonText1')"></span>&nbsp;
          <b>{{rankings[0].pantheon.leaderName}}</b>
          {{$t('rotg.content.ui.endgameDialog.wonText2')}} {{rankings[0].pantheon.nameVO}}.
          <br />
          <br />
          <span class="headline uppercase">{{$t('rotg.content.ui.endgameDialog.wonText3')}}</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="selectedGame.won ? 'teal' : 'red'" text @click="finalDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="showTurnAllSent" dark color="blue" :timeout="0" :top="true">
      {{ $t("rotg.content.ui.allPlayersSent") }}
      <v-btn icon text @click="showTurnAllSent = false">
        <v-icon small>clear</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import router from "../../../router";
import ROTGCounter from "../../../components/rotg/Counter.vue";
import ROTGOrderSheet from "../../../components/rotg/OrderSheet.vue";
import Player from "../../../model/rotg/Player.model";
import Pantheon from "../../../model/rotg/Pantheon.model";
import Game from "../../../model/rotg/Game.model";
import OrderSheet from "../../../model/rotg/OrderSheet.model";
import Territory from "../../../model/rotg/Territory.model";
import Resources from "../../../model/rotg/Resources.model";
import ResourceOrders from "../../../model/rotg/enums/Orders.enum";
import AttackResult from "../../../model/rotg/AttackResult.model";

export default Vue.extend({
  components: {
    "rotg-counter": ROTGCounter,
    "rotg-ordersheet": ROTGOrderSheet
  },
  name: "GameUI",
  created() {
    this.loading = true;
    this.fetchGame(this.$route.params.idGame).then(() => {
      this.loading = false;
      store.dispatch("fetchROTGGameTerritories", this.selectedGame._id);
      store.commit("setResourcesSpent", new Resources());
      if (this.selectedGame.turn > 1) {
        this.computeAttackResults();
      }
    });
  },
  destroyed() {
    clearInterval(this.intervalID);
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
    currentPlayer: {
      get: function() {
        return store.getters.currentPlayer;
      },
      set: function(player: Player) {
        store.commit("setCurrentPlayer", player);
      }
    },
    previousPlayer: {
      get: function() {
        return store.getters.previousPlayer;
      },
      set: function(player: Player) {
        store.commit("setPreviousPlayer", player);
      }
    },
    currentFateConsequence: function() {
      return store.getters.currentFateConsequence;
    },
    resourcesSpent: {
      get: function() {
        return store.getters.resourcesSpent;
      },
      set: function(resources: Resources) {
        store.commit("setResourcesSpent", resources);
      }
    },
    rankings: function() {
      var players = store.getters.selectedGamePlayers;
      var sortedPlayers = new Array<Player>();
      players.sort((a: Player, b: Player) => {
        return b.victoryPoints - a.victoryPoints;
      });
      Object.assign(sortedPlayers, players);
      return players;
    },
    playerSheets: {
      get: function() {
        var gameSheets = store.getters.gameSheets;
        return gameSheets.filter(
          (sheet: OrderSheet) =>
            sheet.parameters.playerID == store.getters.currentPlayer._id
        );
      }
    },
    selectedGameSheets: function() {
      return store.getters.gameSheets;
    },
    playerIsCreator: function() {
      return (
        store.getters.currentPlayer.user._id ==
        store.getters.selectedGame.creatorUser
      );
    },
    localeFR: function() {
      return this.$i18n.locale == "fr";
    },
    nbGodsPlanes: function(){
      return store.getters.selectedGameTerritories.filter((plane: Territory) => plane.owner != "").length;
    }
  },
  watch: {
    "selectedGame.readyRequired": function(
      newValue: boolean,
      oldValue: boolean
    ) {
      if (newValue && !oldValue) {
        this.readyPlayersDialog = true;
      } else if (!newValue && oldValue && this.readyPlayersDialog) {
        var allPlayersReady = this.selectedGamePlayers.every(
          (player: Player) => player.turnReady
        );
        if (this.playerIsCreator && allPlayersReady) {
          this.sendReadyResult();
        }
        this.loadingButton = false;
        this.readyPlayersDialog = false;
        this.loading = true;
      }
    },
    "selectedGame.turn": function(newTurn: number, oldTurn: number) {
      if (newTurn > oldTurn) {
        this.loading = false;
        if (oldTurn != 0) {
          this.fetchFateConsequences();
        }
      }
    },
    "selectedGame.closed": function(newValue: boolean, oldValue: boolean) {
      if (newValue && !oldValue) {
        this.finalDialog = true;
      }
    },
    allPlayersOrdersSent: function(newValue: boolean, oldValue: boolean){
      if(newValue && !oldValue){
        this.showTurnAllSent = true;
      } else {
        this.showTurnAllSent = false;
      }
    }
  },
  methods: {
    fetchGame: function(gameId: string) {
      var obj = new Promise(resolve => {
        if (gameId && gameId !== "" && this.$route.params.idGame) {
          store
            .dispatch("fetchROTGGameInformations", this.$route.params.idGame)
            .then(() => {
              var offsetTime = 1000;
              if (!this.selectedGame.running) {
                this.getRemainingPantheons();
                offsetTime = 250;
              }
              if (
                this.selectedGame.running &&
                !this.selectedGame.readyRequired
              ) {
                offsetTime = 1500;
              } else if (
                this.selectedGame.running &&
                this.selectedGame.readyRequired
              ) {
                offsetTime = 250;
              }
              this.registeredUsers = this.selectedGamePlayers.map(
                (e: Player) => {
                  return e.user._id;
                }
              );
              var player = this.selectedGamePlayers.filter((p: Player) => {
                return p.user._id == this.currentUser._id;
              });
              this.allPlayersOrdersSent = this.selectedGamePlayers.every((p: Player) => p.sheetSent);
              store.commit(
                "setCurrentPlayer",
                player[0] ? player[0] : new Player()
              );
              if (!this.selectedGame.closed) {
                setTimeout(() => {
                  this.fetchGame(this.selectedGame._id);
                }, offsetTime);
              }
              this.loading = false;
              resolve(true);
            });
        }
      });
      return obj;
    },
    PlayNotification: function(url: string) {
      if (url) {
        var audio = new Audio(url);
        audio.play();
      }
    },
    openRegisterPlayer: function() {
      this.loading = true;
      store.dispatch("fetchROTGGamePlayers", this.selectedGame._id).then(() => {
        this.loading = false;
        this.getRemainingPantheons();
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
      this.takenPantheonsNames = this.selectedGamePlayers.map((e: Player) => {
        return e.pantheon.name;
      });
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
        this.loading = false;
        this.resetNewPlayer();
      });
    },
    launchGame: function() {
      this.loading = true;
      store.dispatch("launchROTGGame", this.selectedGame._id).then(() => {
        store
          .dispatch("fetchROTGGameTerritories", this.selectedGame._id)
          .then(() => {
            this.loading = false;
          });
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
    },
    closeResolutionDialog: function() {
      this.resolutionDialog = false;
    },
    fetchFateConsequences: function() {
      this.resolutionDialog = true;
      var wrapper = {
        gameId: this.selectedGame._id,
        playerId: this.currentPlayer._id
      };
      this.loadingFate = true;
      store.dispatch("fetchROTGFateConsequence", wrapper).then(() => {
        //this.PlayNotification("/ressources/sounds/thunder3.mp3");
        Object.assign(this.resourcesSpent, new Resources());
        var promises = [
          store.dispatch("fetchROTGGameTerritories", this.selectedGame._id),
          store.dispatch("fetchROTGGamePlayers", this.selectedGame._id)
        ];
        Promise.all(promises).then(() => {
          this.computeAttackResults();
          this.loadingFate = false;
        });
      });
    },
    openOrderSheetView: function(orderSheet: OrderSheet) {
      Object.assign(this.viewedOrderSheet, orderSheet);
      this.orderSheetDialog = true;
    },
    closeOrderSheetView: function() {
      Object.assign(this.viewedOrderSheet, new OrderSheet());
      this.orderSheetDialog = false;
    },
    getOrderNameFromNumber: function(order: number) {
      var result = "";
      switch (order) {
        case ResourceOrders.ORI_PROSP:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-gem'></i>&nbsp;Prospérité";
          } else {
            result = "<i class='fa fa-gem'></i>&nbsp;Prosperity";
          }
          break;
        case ResourceOrders.ORI_INVEST:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-gem'></i>&nbsp;Investissement";
          } else {
            result = "<i class='fa fa-gem'></i>&nbsp;Investment";
          }
          break;
        case ResourceOrders.ARMY_ATTACK:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-fist-raised'></i>&nbsp;Attaquer";
          } else {
            result = "<i class='fa fa-fist-raised'></i>&nbsp;Attack";
          }
          break;
        case ResourceOrders.ARMY_STABI:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-fist-raised'></i>&nbsp;Stabiliser";
          } else {
            result = "<i class='fa fa-fist-raised'></i>&nbsp;Stabilize";
          }
          break;
        case ResourceOrders.HERO_GODBORN:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-jedi'></i>&nbsp;Créer un Godborn";
          } else {
            result = "<i class='fa fa-jedi'></i>&nbsp;Make a Godborn";
          }
          break;
        case ResourceOrders.HERO_EXPLO:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-jedi'></i>&nbsp;Exploration Risquée";
          } else {
            result = "<i class='fa fa-jedi'></i>&nbsp;Risky Exploration";
          }
          break;
        case ResourceOrders.HERO_TEAM:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-jedi'></i>&nbsp;Equipée Héroïque";
          } else {
            result = "<i class='fa fa-jedi'></i>&nbsp;Epic Call to Adventure";
          }
          break;
        case ResourceOrders.POP_PLAN:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-user-friends'></i>&nbsp;Habiter";
          } else {
            result = "<i class='fa fa-user-friends'></i>&nbsp;Settle";
          }
          break;
        case ResourceOrders.POP_INFO:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-user-friends'></i>&nbsp;Informateurs";
          } else {
            result = "<i class='fa fa-user-friends'></i>&nbsp;Informants";
          }
          break;
        case ResourceOrders.FATE_CELEB:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-spider'></i>&nbsp;Célébration";
          } else {
            result = "<i class='fa fa-spider'></i>&nbsp;Celebration";
          }
          break;
        case ResourceOrders.FATE_RITUAL:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-spider'></i>&nbsp;Destinée Epique";
          } else {
            result = "<i class='fa fa-spider'></i>&nbsp;Epic Destiny";
          }
          break;
        case ResourceOrders.FATE_GOSSIP:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-spider'></i>&nbsp;Ragots Cosmiques";
          } else {
            result = "<i class='fa fa-spider'></i>&nbsp;Mythical Gossips";
          }
          break;
        case ResourceOrders.PROPH_FORESEE:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-eye'></i>&nbsp;Prophétie";
          } else {
            result = "<i class='fa fa-eye'></i>&nbsp;Prophecy";
          }
          break;
        case ResourceOrders.PROPH_INFILT:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-eye'></i>&nbsp;Infiltration";
          } else {
            result = "<i class='fa fa-eye'></i>&nbsp;Infiltrate";
          }
          break;
        case ResourceOrders.PROPH_SPY:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-eye'></i>&nbsp;Espionner";
          } else {
            result = "<i class='fa fa-eye'></i>&nbsp;Spy";
          }
          break;
        case ResourceOrders.ORI_GAMBLE:
          result = "<i class='fa fa-gem'></i>&nbsp;Anticipation";
          break;
        case ResourceOrders.ORI_OPU:
          result = "<i class='fa fa-gem'></i>&nbsp;Opulence";
          break;
        case ResourceOrders.HAND_FATE:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-bolt'></i>&nbsp;Main du Destin";
          } else {
            result = "<i class='fa fa-bolt'></i>&nbsp;Hand of Fate";
          }
          break;
        case ResourceOrders.POP_RECRUIT:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-user-friends'></i>&nbsp;Recrutement";
          } else {
            result = "<i class='fa fa-user-friends'></i>&nbsp;Recruitment";
          }
          break;
        case ResourceOrders.POP_CIVI:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-user-friends'></i>&nbsp;Civilisation";
          } else {
            result = "<i class='fa fa-user-friends'></i>&nbsp;Civilization";
          }
          break;
        case ResourceOrders.PROPH_ORA:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-eye'></i>&nbsp;Oracles prosélytes";
          } else {
            result = "<i class='fa fa-eye'></i>&nbsp;Proselytes Oracles";
          }
          break;
        case ResourceOrders.PROPH_AUG:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-eye'></i>&nbsp;Augures";
          } else {
            result = "<i class='fa fa-eye'></i>&nbsp;Augurs";
          }
          break;
        case ResourceOrders.PROPH_FUTUR:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-eye'></i>&nbsp;Vision du futur";
          } else {
            result = "<i class='fa fa-eye'></i>&nbsp;Vision of the Future";
          }
          break;
        case ResourceOrders.PROPH_LEGEND:
          if (this.$i18n.locale == "fr") {
            result = "<i class='fa fa-eye'></i>&nbsp;Répartition de Légende";
          } else {
            result = "<i class='fa fa-eye'></i>&nbsp;Legend Redistribution";
          }
          break;
        case ResourceOrders.FATE_ALEA:
          result = "<i class='fa fa-spider'></i>&nbsp;Alea Jacta Est";
          break;
      }
      return result;
    },
    getObjectFromID: function(id: string, source: any[]) {
      var index = source.findIndex((e: any) => e._id == id);
      if (index > -1) {
        return source[index];
      }
    },
    fetchOrderSheet(id: string) {
      this.loading = true;
      store
        .dispatch("fetchROTGOrderSheet", id)
        .then((response: OrderSheet[]) => {
          if (response) {
            Object.assign(this.viewedOrderSheet, response[0]);
            this.loading = false;
            this.orderSheetDialog = true;
          }
        });
    },
    manualOverride: function() {
      this.loading = true;
      store.dispatch("manualEnding", this.selectedGame._id).then(() => {
        store
          .dispatch("fetchROTGGameTerritories", this.selectedGame._id)
          .then(() => {
            this.loading = false;
          });
      });
    },
    displayRhesus: function(quantity: number) {
      var result = "";
      if (quantity < 0) {
        result = `-${quantity}`;
      } else {
        result = `+${quantity}`;
      }
      return result;
    },
    setParallaxHeight: function() {
      if (document) {
        var container = document.getElementById("parallax-container");
        if (container) {
          this.parallaxHeight = container.clientHeight;
        }
      }
    },
    readyPlayerOne: function() {
      this.currentPlayer.turnReady = true;
      this.loadingReadyButton = true;
      store.dispatch("readyROTGGamePlayer", this.currentPlayer).then(() => {
        this.loadingReadyButton = false;
      });
    },
    unReadyPlayerOne: function() {
      this.currentPlayer.turnReady = false;
      this.loadingReadyButton = true;
      store.dispatch("readyROTGGamePlayer", this.currentPlayer).then(() => {
        this.loadingReadyButton = false;
      });
    },
    openReadyToEndDialog: function() {
      this.loadingButton = true;
      var game = new Game();
      Object.assign(game, this.selectedGame);
      game.readyRequired = true;
      store.dispatch("updateROTGGame", game);
    },
    sendReadyResult: function() {
      if (!this.selectedGame.running) {
        this.launchGame();
      } else {
        this.manualOverride();
      }
    },
    computeAttackResults: function() {
      this.attacksResults = new Array<AttackResult>();
      var previousTurn = this.selectedGame.turn - 1;
      var previousSheets = this.selectedGameSheets.filter(
        (sheet: OrderSheet) => {
          return sheet.turn == previousTurn;
        }
      );
      var attackSheets = previousSheets.filter((sheet: OrderSheet) => {
        return sheet.ordersSent.indexOf(ResourceOrders.ARMY_ATTACK) > -1;
      });
      var infiltratedSheets = previousSheets.filter((sheet: OrderSheet) => {
        return sheet.ordersSent.indexOf(ResourceOrders.PROPH_INFILT) > -1;
      });
      var planesAttacked = attackSheets.map((e: OrderSheet) => {
        return e.parameters.attackTarget;
      });
      var processed = [];
      for (var i = 0; i < planesAttacked.length; i++) {
        var planeId = planesAttacked[i];
        if (processed.indexOf(planeId) > -1) {
          continue;
        } else {
          processed.push(planeId);
          var result = new AttackResult();
          var plane = this.getObjectFromID(
            planeId,
            this.selectedGameTerritories
          );
          if (plane) {
            var obj = {
              name: plane.name,
              nameVO: plane.nameVO,
              nbPlayers: planesAttacked.filter((x: any) => {
                return x == planeId;
              }).length,
              infiltrated: infiltratedSheets.length > 0,
              taken: plane.owner != ""
            };
            Object.assign(result, obj);
            this.attacksResults.push(result);
          }
        }
      }
    },
    backToGamesList: function() {
      clearInterval(this.intervalID);
      router.push({ name: "gamesROTG" });
    },
    globalVictory: function(){
      var nbPlayers = this.selectedGamePlayers.length;

      if (nbPlayers < 6) {
            return nbPlayers + 2;
        } else if (nbPlayers < 8) {
            return nbPlayers + 1;
        } else if (nbPlayers < 10) {
            return nbPlayers;
        } else if (nbPlayers < 12) {
            return nbPlayers - 1;
        } else {
            return 10;
        }
    }
  },
  data: () => ({
    intervalID: 0,
    loading: false,
    loadingFate: false,
    registeredUsers: new Array<string>(),
    takenPantheonsNames: new Array<string>(),
    registerGameDialog: false,
    resolutionDialog: false,
    newPlayer: new Player(),
    pantheons: new Array<Pantheon>(),
    tab: 0,
    permanentRequest: true,
    viewedOrderSheet: new OrderSheet(),
    orderSheetDialog: false,
    readyPlayersDialog: false,
    parallaxHeight: 300,
    loadingButton: false,
    loadingReadyButton: false,
    finalDialog: false,
    attacksResults: new Array<AttackResult>(),
    showTurnAllSent: false,
    allPlayersOrdersSent: false,
    allPantheonsAvailable: [
      {
        name: "Aesir",
        nameVO: "Aesir",
        leaderName: "Odin",
        description:
          "Les dieux scandinaves. Fiers, un brin brutaux, ils ont le sens de la famille et cherchent en permanence à échapper au Destin. Il faut dire qu'ils sont condamnés à périr le jour de Ragnarök...",
        descriptionVO:
          "The Scandinavian Gods. Proud, a tad brutish, they have a sense of family and always try to defy Fate. After all, they are condemned to all perish on the day of Ragnarök...",
        objective: -1,
        picture: "/ressources/rotg/aesir.jpg"
      },
      {
        name: "Amatsukami",
        nameVO: "Amatsukami",
        leaderName: "Amaterasu",
        description:
          "Les dieux japonais. Un brin isolés et portés sur les traditions, ils ont su tisser des alliances leur assurant protection contre les titans les plus envieux de leurs ressources.",
        descriptionVO:
          "The Japanese Gods. A tad isolated and focused on tradition, they have managed to weave alliances ensuring their safety against the Titans most envious of their resources.",
        objective: -1,
        picture: "/ressources/rotg/aesir.jpg"
      },
      {
        name: "Ayllus",
        nameVO: "Ayllus",
        leaderName: "Inti",
        description:
          "Les dieux incas. Isolés des affaires du monde et peu influents dans la géopilitique divine, le panthéon inca est jeune, dynamique et est mené par un leader protecteur et énergique.",
        descriptionVO:
          "The Incan Gods. Isolated from worldly matters and with limited influence in Divine Geopolitics, the Inca Pantheon is nevertheless young, dynamic and led by a protective and energetic leader.",
        objective: -1,
        picture: "http://i.imgur.com/ijxPa1y.jpg"
      },
      {
        name: "Bureaucratie Céleste",
        nameVO: "Celestial Bureaucracy",
        leaderName: "Shangdi",
        description:
          "Les dieux chinois. Le nom du panthéon se suffit à lui seul. Oubliez l'individualisme avec ces dieux. Chaque membre du panthéon (et ils sont très nombreux !) est un maillon dans la chaïne. Véritable rouleau compresseur de la politique divine, rien ne lui résiste vraiment. Pas même le Destin...",
        descriptionVO:
          "The Chinese Gods. Exactly what their name suggests. Forget individualism with these Gods. Each member of this Pantheon (and there are many of them!) is a link in the chain. Steamroller of divine politics, nothing really resists the Bureaucracy. Not even Fate itself...",
        objective: -1,
        picture: "http://i.imgur.com/3Z4KfxG.jpg"
      },
      {
        name: "Deva",
        nameVO: "Deva",
        leaderName: "Indra",
        description:
          "Les dieux hindous. Créé par l'extrêmement puissant Trimurti (Brahma, Vishnu et Shiva), le Deva fait partie des plus vieux panthéons et contient donc les divinités les plus anciennes et les plus sages. En revanche, leur puissance les a amené à prendre de plus en plus de recul par rapport aux affaires du monde...",
        descriptionVO:
          "The Hindu Gods. Created by the extremely powerful Trimurti (Brahma, Vishnu and Shiva), the Deva is among the oldest Pantheons and includes some of the eldest and wisest deities. However, their power has led them to take more and more distance from world affairs...",
        objective: -1,
        picture: "http://i.imgur.com/pRXECKx.jpg"
      },
      {
        name: "K'Asunel",
        nameVO: "K'Asunel",
        leaderName: "Itzamna",
        description:
          "Les dieux mayas. Fanatiquement anti-titans, les dieux mayas vivent selon les préceptes des quatres accords toltèques. Ils croient dans les principes édictés dans l'Hunab Ku, ce qui fait d'eux le seul panthéon de dieux croyants.",
        descriptionVO:
          "The Mayan Gods. Fanatically anti-Titans, the Mayan Gods live under the precepts of the Four Toltec Accords. They believe in the precepts of the Hunab Ku, which makes them the only Pantheon of Gods who are themselves religious.",
        objective: -1,
        picture:
          "https://cdna.artstation.com/p/assets/images/images/000/158/432/large/renju-mv-mayan-dance-atrstation.jpg?1443931069"
      },
      {
        name: "Neter",
        nameVO: "Neter",
        leaderName: "Râ",
        description:
          "Les dieux égyptiens et un des plus vieux panthéons. Avec le Deva et le Théoï il fait partie du trio de tête des panthéons en terme de richesses, de puissance militaire et de sagesse millénaire. Très ordonnés, les dieux égyptiens croient fermement en Ma'at - le principe d'équilibre cosmique - et l'appliquent à travers des valeurs comme la Justice, la Vérité et l'Ordre.",
        descriptionVO:
          "The Egyptian Gods and one of the oldest Pantheons. With the Deva and the Theoi, they are amongst the three greatest Pantheons in terms of wealth, military might and ancient wisdom. Very orderly, the Egyptian Gods believe firmly in Ma’at - the principle of cosmic balance - and apply it through promoting values like Justice, Truth and Order.",
        objective: -1,
        picture: "http://i.imgur.com/U7KkFLG.jpg"
      },
      {
        name: "Nga Tama a Rangi",
        nameVO: "Nga Tama a Rangi",
        leaderName: "Tumataüenga",
        description:
          "Les dieux maoris. Composé des enfants directs de Gaïa et Ouranos, les membres du Nga Tama a Rangi comptent parmis les plus vieilles divinités du cosmos - plus vieux que certains titans - mais ne fait pas partie des panthéons les plus puissants. Ayant préféré l'exil après la première guerre contre les titans, les dieux maoris se concentrent désormais sur des problèmes plus locaux et moins ambitieux.",
        descriptionVO:
          "The Maori Gods. Made up of children of Gaïa and Ouranos, the members of the Nga Tama a Rangi are amongst the oldest deities of the Cosmos - older than some Titans - but are not amongst the strongest Pantheons. Having chosen exile after the first war against the Titans, the Maori Gods are now focused on local and less ambitious problems.",
        objective: -1,
        picture: "http://i.imgur.com/y82Yv7Q.jpg"
      },
      {
        name: "Orisha",
        nameVO: "Orisha",
        leaderName: "Olorun",
        description:
          "Les dieux africains. A l'époque de la Seconde Titanomachie, les Orishas étaient sans conteste les dieux les plus guerriers et les plus féroces du Cosmos. Ne vivant que pour le combat et la guerre, ils étaient toutefois tempérés tant bien que mal par leur sage leader Olorun.",
        descriptionVO:
          "The African gods. At the time of the Second Titanomachy, the Orisha were without a doubt the most warlike and fierce gods in the entire Cosmos. Living only for combat and war, they were however tempered as much as possible by their wise leader Olorun.",
        objective: -1,
        picture: "http://i.imgur.com/xsjRnhT.jpg"
      },
      {
        name: "Teotl",
        nameVO: "Teotl",
        leaderName: "Huitzilopochtli",
        description:
          "Les dieux aztèques. Grands adeptes de la magie du sang, les dieux aztèques ont des traditions que d'aucuns considèrent violentes. Ce sont de fiers combattants et des conquérants. Malheureusement leur impulsivité poussée à l'extrême limite le nombre de leurs alliés, mais ils n'hésitent pas à mettre leurs compétences martiales et leur soif de sang à profit pour la cause des dieux contre les titans.",
        descriptionVO:
          "The Aztec Gods. Great practitioners of blood magic, the Aztec Gods have traditions that some consider violent. They are proud fighters and conquerors. Unfortunately their extreme impulsiveness limits the number of their allies, but they do not hesitate to put their martial skills and their thirst for blood to bear for the cause of the gods against the Titans.",
        objective: -1,
        picture: "http://i.imgur.com/9veIxlL.png"
      },
      {
        name: "Théoï",
        nameVO: "Theoi",
        leaderName: "Zeus",
        description:
          "Les dieux grecs. Figurant parmi les panthéons les plus connus, les Olympiens sont menés par Zeus et sont une des principales forces motrices du cosmos. Ils regroupent suffisamment d'atouts dans tous les domaines pour assoir leur puissance sur d'autres panthéons. Mais même les tout-puissants ont une faiblesse. La leur ? Leur égo et leur arrogance surdimensionnée.",
        descriptionVO:
          "The Greek Gods. One of the most famous Pantheons, the Olympians are led by Zeus and are one of the main driving forces of the Cosmos. They bring together enough assets in all areas to assuage their power on other Pantheons. But even the all-powerful have a weakness. Theirs ? Their oversized ego and arrogance.",
        objective: -1,
        picture:
          "https://i.pinimg.com/564x/f0/34/88/f034883909cead1826069084aecfeccc.jpg"
      },
      {
        name: "Tuatha Dé Danann",
        nameVO: "Tuatha Dé Danann",
        leaderName: "Niamh",
        description:
          "Les dieux celtes. Sans doute les divinités les plus proches de la Nature. Tous sont des maitres druides avant tout. Mais les prendre pour des hippies cosmiques serait une grave erreur. Les Enfants de Danu font parti des panthéons les plus combattifs et fiers du cosmos et leurs talents combinés à leur sagesse ancestrale font d'eux des atouts vitaux contre les titans.",
        descriptionVO:
          "The Celtic Gods. Without doubt the deities closest to Nature. They are all Master Druid above all. But to mistake them for cosmic hippies would be a big mistake. The Children of Danu are among the most combative and proud pantheons of the Cosmos and their talents combined with their ancestral wisdom make them vital assets against the Titans.",
        objective: -1,
        picture:
          "https://i.pinimg.com/564x/36/73/91/367391eaadadf2309cb4b75f8c45f836.jpg"
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
<style scoped>
.blob {
  border-radius: 50%;
  margin: 10px;
  height: 20px;
  width: 20px;

  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  transform: scale(1);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}

.bg-transparent-black {
  background-color: rgba(0, 0, 0, 0.31);
}
</style>