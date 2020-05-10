<template>
  <div class="mt-3">
    <v-alert dark color="blue" icon="mdi-information" v-if="currentPlayer.sheetSent">
      <span v-if="localeFR">
        Votre&nbsp;
        <v-icon small>fa-receipt</v-icon>Feuille d'Ordre a déjà été soumise pour ce tour
      </span>
      <span v-else>
        Your&nbsp;
        <v-icon small>fa-receipt</v-icon>Order Sheet has already been submited for this turn
      </span>
    </v-alert>
    <div v-else>
      <v-expansion-panels hover popout dark>
        <v-expansion-panel dark>
          <v-expansion-panel-header>
            <v-icon left :color="oriOrdered ? 'teal' : 'white'">fa-gem</v-icon>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pa-1">
            <v-tabs dark v-model="tabOri" show-arrows :vertical="!$vuetify.breakpoint.xs">
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.orichalcum.prosperity.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.orichalcum.opulence.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.orichalcum.investment.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.orichalcum.anticipation.short")}}</v-tab>
              <v-tabs-items dark v-model="tabOri" :vertical="!$vuetify.breakpoint.xs">
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.orichalcum.prosperity.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.orichalcum.prosperity.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>2</b>&nbsp;
                      <v-icon small>fa-gem</v-icon>
                      &nbsp;{{$t("rotg.common.resources.orichalcum")}}
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}
                      <b>1</b>&nbsp;
                      <v-icon small>fa-eye</v-icon>
                      &nbsp;{{$t("rotg.common.resources.prophets")}},
                      <b>1</b>&nbsp;
                      <v-icon small>fa-user-friends</v-icon>
                      &nbsp;{{$t("rotg.common.resources.population")}}
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(0)"
                    @click.stop="addOrder(0,2)"
                    block
                    :disabled="disableOrder(0) || currentPlayer.orichalcum < 2"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(0)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.orichalcum.opulence.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.orichalcum.opulence.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>4</b>&nbsp;
                      <v-icon small>fa-gem</v-icon>
                      &nbsp;{{$t("rotg.common.resources.orichalcum")}}
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}
                      <b>3</b>&nbsp;
                      <v-icon small>fa-eye</v-icon>
                      &nbsp;{{$t("rotg.common.resources.prophets")}},
                      <b>3</b>&nbsp;
                      <v-icon small>fa-user-friends</v-icon>
                      &nbsp;{{$t("rotg.common.resources.population")}}
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(18)"
                    @click.stop="addOrder(18,4)"
                    block
                    :disabled="disableOrder(18) || currentPlayer.orichalcum < 4"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(18)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.orichalcum.investment.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.orichalcum.investment.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>2</b>&nbsp;
                      <v-icon small>fa-gem</v-icon>
                      &nbsp;{{$t("rotg.common.resources.orichalcum")}}
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}
                      <b>3</b>&nbsp;
                      <v-icon small>fa-gem</v-icon>
                      &nbsp;{{$t("rotg.common.resources.orichalcum")}} + {{currentPlayer.territories.length}}&nbsp;
                      <span
                        v-if="localeFR"
                      >(Plans que vous contrôlez ce tour-ci).</span>
                      <span v-else>(Planes under your control this turn).</span>
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(1)"
                    @click.stop="addOrder(1,2)"
                    block
                    :disabled="disableOrder(1) || currentPlayer.orichalcum < 2"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(1)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.orichalcum.anticipation.title")}}</div>
                  <span
                    v-html="$t('rotg.content.ui.orderSheet.orders.orichalcum.anticipation.description')"
                  ></span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <div style="width: 60px; display: inline-block">
                        <v-text-field
                          type="number"
                          dense
                          :readonly="disableOrder(17)"
                          v-model="sheet.parameters.gambleSent"
                          :full-width="false"
                          :error="currentPlayer.orichalcum < sheet.parameters.gambleSent || sheet.parameters.gambleSent < 0"
                          solo
                          outlined
                        ></v-text-field>
                      </div>&nbsp;&nbsp;
                      <v-icon small>fa-gem</v-icon>
                      &nbsp;{{$t("rotg.common.resources.orichalcum")}}
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}
                      <b>{{isNaN(parseInt(sheet.parameters.gambleSent)) ? 0 : Math.ceil(parseInt(sheet.parameters.gambleSent)/2)}}</b>&nbsp;
                      <span v-if="localeFR">
                        <v-icon small>fa-trophy</v-icon>
                        &nbsp;{{$t("rotg.common.resources.victoryPoints")}} (si le pari est réussi)
                        <br />
                        <b>
                          <u>OU</u>
                        </b>&nbsp;
                        <b>{{isNaN(parseInt(sheet.parameters.gambleSent)) ? 0 : Math.ceil(parseInt(sheet.parameters.gambleSent))}}</b>&nbsp;
                        <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin (si le pari échoue)
                      </span>
                      <span v-else>
                        <v-icon small>fa-trophy</v-icon>
                        &nbsp;{{$t("rotg.common.resources.victoryPoints")}} (if the bet is successful)
                        <br />
                        <b>
                          <u>OR</u>
                        </b>&nbsp;
                        <b>{{isNaN(parseInt(sheet.parameters.gambleSent)) ? 0 : Math.ceil(parseInt(sheet.parameters.gambleSent))}}</b>&nbsp;
                        <v-icon small>fa-spider</v-icon>&nbsp;Fate Bindings (if the bet is unsuccessful)
                      </span>
                    </li>
                  </ul>
                  <div class="mt-3">
                    <div style="display: inline-block; margin-right: 10px;">
                      <span v-if="localeFR">Parier sur la victoire de l'attaque sur le Plan</span>
                      <span v-else>Bet on the victory of the attack on the Plane</span>
                    </div>
                    <div style="width: 200px; display: inline-block">
                      <v-select
                        v-model="sheet.parameters.gambleTarget"
                        :items="titanicPlanes"
                        :disabled="sheet.parameters.gambleSent <= 0 || currentPlayer.orichalcum < sheet.parameters.gambleSent"
                        item-value="_id"
                        item-text="name"
                        outlined
                        solo
                      >
                        <template v-slot:selection="{ item }">
                          <span v-html="localeFR ? item.name : item.nameVO"></span>
                        </template>
                        <template v-slot:item="{ item }">
                          <span v-html="localeFR ? item.name : item.nameVO"></span>
                        </template>
                      </v-select>
                    </div>
                  </div>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(17)"
                    @click.stop="addOrder(17,sheet.parameters.gambleSent)"
                    block
                    :disabled="disableOrder(17) || currentPlayer.orichalcum < sheet.parameters.gambleSent || sheet.parameters.gambleTarget == '' || sheet.parameters.gambleSent <= 0"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(17)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon left :color="armyOrdered ? 'teal' : 'white'">fa-fist-raised</v-icon>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs dark v-model="tabArmy" show-arrows :vertical="!$vuetify.breakpoint.xs">
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.army.attack.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.army.stabilize.short")}}</v-tab>
              <v-tabs-items dark v-model="tabArmy" :vertical="!$vuetify.breakpoint.xs">
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div class="title">{{$t("rotg.content.ui.orderSheet.orders.army.attack.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.army.attack.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <div style="width: 60px; display: inline-block">
                        <v-text-field
                          type="number"
                          dense
                          :readonly="disableOrder(3)"
                          v-model="sheet.parameters.armySent"
                          :full-width="false"
                          :error="currentPlayer.army < sheet.parameters.armySent || sheet.parameters.armySent < 0"
                          solo
                          outlined
                        ></v-text-field>
                      </div>&nbsp;
                      <v-icon small>fa-fist-raised</v-icon>
                      &nbsp;{{$t("rotg.common.resources.army")}}
                      <span v-if="localeFR">pour attaquer</span>
                      <span v-else>to attack</span>
                      <div style="width: 200px; display: inline-block">
                        <v-select
                          v-model="sheet.parameters.attackTarget"
                          :disabled="disableOrder(3) || sheet.parameters.armySent <= 0 || currentPlayer.army < sheet.parameters.armySent"
                          :items="titanicPlanes"
                          item-value="_id"
                          item-text="name"
                          :error="currentPlayer.army < sheet.parameters.armySent"
                          outlined
                          solo
                        >
                          <template v-slot:selection="{ item }">
                            <span v-html="localeFR ? item.name : item.nameVO"></span>
                          </template>
                          <template v-slot:item="{ item }">
                            <span v-html="localeFR ? item.name : item.nameVO"></span>
                          </template>
                        </v-select>
                      </div>
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}
                      <span
                        v-if="localeFR"
                      >(si réussite de l'attaque)</span>
                      <span v-else>(if the attack is successful)</span>
                      <ul v-if="localeFR">
                        <li>
                          <b>5</b>&nbsp;
                          <v-icon small>fa-trophy</v-icon>
                          &nbsp;{{$t("rotg.common.resources.victoryPoints")}} et
                          <b>2</b>&nbsp;
                          <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin si vous avez attaqué avec le plus de forces
                        </li>
                        <li>
                          <b>3</b>&nbsp;
                          <v-icon small>fa-trophy</v-icon>
                          &nbsp;{{$t("rotg.common.resources.victoryPoints")}} si vous êtes en deuxième position
                        </li>
                        <li>
                          <b>2</b>&nbsp;
                          <v-icon small>fa-trophy</v-icon>&nbsp;Point de Victoire si vous êtes en troisième position
                        </li>
                      </ul>
                      <ul v-else>
                        <li>
                          <b>5</b>&nbsp;
                          <v-icon small>fa-trophy</v-icon>
                          &nbsp;{{$t("rotg.common.resources.victoryPoints")}} and
                          <b>2</b>&nbsp;
                          <v-icon small>fa-spider</v-icon>&nbsp;Fate Bindings if you attacked with the highest forces
                        </li>
                        <li>
                          <b>3</b>&nbsp;
                          <v-icon small>fa-trophy</v-icon>
                          &nbsp;{{$t("rotg.common.resources.victoryPoints")}} if you attacked wit the second highest forces
                        </li>
                        <li>
                          <b>2</b>&nbsp;
                          <v-icon small>fa-trophy</v-icon>&nbsp;Victory Point if you attacked with the third highest forces
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(3)"
                    @click.stop="addOrder(3, sheet.parameters.armySent)"
                    block
                    :disabled="disableOrder(3) || sheet.parameters.armySent <= 0 || currentPlayer.army < sheet.parameters.armySent || sheet.parameters.attackTarget == ''"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(3)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.army.stabilize.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.army.stabilize.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>4</b>&nbsp;
                      <v-icon small>fa-fist-raised</v-icon>
                      &nbsp;{{$t("rotg.common.resources.army")}}
                    </li>
                    <li>
                      <span v-if="localeFR">
                        {{$t("rotg.content.ui.orderSheet.gains")}} Vous perdez
                        <b>2</b>&nbsp;
                        <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin
                      </span>
                      <span v-else>
                        {{$t("rotg.content.ui.orderSheet.gains")}} You lose
                        <b>2</b>&nbsp;
                        <v-icon small>fa-spider</v-icon>&nbsp;Fate Bindings
                      </span>
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(4)"
                    @click.stop="addOrder(4,4)"
                    block
                    :disabled="disableOrder(4) || currentPlayer.army < 4"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(4)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon left :color="heroOrdered ? 'teal' : 'white'">fa-jedi</v-icon>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs dark v-model="tabHero" show-arrows :vertical="!$vuetify.breakpoint.xs">
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.heroism.godborn.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.heroism.exploration.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.heroism.adventure.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.heroism.apotheosis.short")}}</v-tab>
              <v-tabs-items dark v-model="tabHero" :vertical="!$vuetify.breakpoint.xs">
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.heroism.godborn.title")}}</div>
                  <span>
                    <span v-if="localeFR">En tant que</span>
                    <span v-else>As</span>
                    {{currentPlayer.pantheon.leaderName}},&nbsp;
                    {{$t("rotg.content.ui.orderSheet.orders.heroism.godborn.description")}}
                  </span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>2</b>&nbsp;
                      <v-icon small>fa-jedi</v-icon>
                      &nbsp;{{$t("rotg.common.resources.heroism")}}
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}
                      <b>2</b>&nbsp;
                      <v-icon small>fa-fist-raised</v-icon>
                      &nbsp;{{$t("rotg.common.resources.army")}}
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(5)"
                    @click="addOrder(5,2)"
                    block
                    :disabled="disableOrder(5) || currentPlayer.heroism < 2"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(5)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.heroism.exploration.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.heroism.exploration.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>3</b>&nbsp;
                      <v-icon small>fa-jedi</v-icon>
                      &nbsp;{{$t("rotg.common.resources.heroism")}}
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}&nbsp;
                      <span
                        v-if="localeFR"
                      >Au tour suivant, vous pourrez voir les forces titaniques présentes sur les plans contrôlés par les Titans.</span>
                      <span
                        v-else
                      >In the next turn, you will be able to see the titanic forces present on the Planes controlled by the Titans.</span>
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(6)"
                    @click="addOrder(6,3)"
                    block
                    :disabled="disableOrder(6) || currentPlayer.heroism < 3"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(6)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.heroism.adventure.title")}}</div>
                  <span>
                    <span v-if="localeFR">Vous,</span>
                    <span v-else>You,</span>
                    {{currentPlayer.pantheon.leaderName}},&nbsp;
                    {{$t("rotg.content.ui.orderSheet.orders.heroism.adventure.description")}}
                  </span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>3</b>&nbsp;
                      <v-icon small>fa-jedi</v-icon>
                      &nbsp;{{$t("rotg.common.resources.heroism")}}
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}
                      <b>2D3</b>&nbsp;
                      <v-icon small>fa-jedi</v-icon>
                      &nbsp;{{$t("rotg.common.resources.heroism")}}
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(7)"
                    @click="addOrder(7,3)"
                    block
                    :disabled="disableOrder(7) || currentPlayer.heroism < 3"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(7)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.heroism.apotheosis.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.heroism.apotheosis.description")}} {{localeFR ? currentPlayer.pantheon.name : currentPlayer.pantheon.nameVO}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>6</b>&nbsp;
                      <v-icon small>fa-jedi</v-icon>
                      &nbsp;{{$t("rotg.common.resources.heroism")}}
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}
                      <b>1D4</b>&nbsp;
                      <v-icon small>fa-trophy</v-icon>
                      &nbsp;{{$t("rotg.common.resources.victoryPoints")}}
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(25)"
                    @click="addOrder(25,6)"
                    block
                    :disabled="disableOrder(25) || currentPlayer.heroism < 6"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(25)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon left :color="prophOrdered ? 'teal' : 'white'">fa-eye</v-icon>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs dark v-model="tabProph" show-arrows :vertical="!$vuetify.breakpoint.xs">
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.prophets.spy.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.prophets.infiltrate.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.prophets.prophecy.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.prophets.oracles.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.prophets.augurs.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.prophets.vision.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.prophets.redistribution.short")}}</v-tab>
              <v-tabs-items dark v-model="tabProph" :vertical="!$vuetify.breakpoint.xs">
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div class="title">{{$t("rotg.content.ui.orderSheet.orders.prophets.spy.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.prophets.spy.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>2</b>&nbsp;
                      <v-icon small>fa-eye</v-icon>
                      &nbsp;{{$t("rotg.common.resources.prophets")}}
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}&nbsp;
                      <span v-if="localeFR">
                        Au tour suivant, vous pourrez voir les
                        <v-icon small>fa-receipt</v-icon>&nbsp;Fiches d'Ordre de 2 joueurs, envoyées ce tour-ci :
                      </span>
                      <span v-else>
                        Next turn, you will be able to read the
                        <v-icon small>fa-receipt</v-icon>&nbsp;Order Sheets sent this turn by 2 players:
                      </span>
                      <div style="width: 200px; display: inline-block">
                        <v-select
                          v-model="sheet.parameters.foreseeTargets"
                          :items="selectedGamePlayers"
                          item-value="_id"
                          item-text="pantheon.name"
                          outlined
                          solo
                          multiple
                          v-if="localeFR"
                        ></v-select>
                        <v-select
                          v-model="sheet.parameters.foreseeTargets"
                          :items="selectedGamePlayers"
                          item-value="_id"
                          item-text="pantheon.nameVO"
                          outlined
                          solo
                          multiple
                          v-else
                        ></v-select>
                      </div>
                    </li>
                  </ul>
                  <v-alert
                    dark
                    color="amber darken-3"
                    icon="mdi-fire"
                    v-if="sheet.parameters.foreseeTargets.length != 2"
                  >{{$t("rotg.content.ui.orderSheet.orders.prophets.spy.error")}}</v-alert>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(16)"
                    @click="addOrder(16,2)"
                    block
                    :disabled="disableOrder(16) || currentPlayer.prophets < 2 || sheet.parameters.foreseeTargets.length != 2"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(16)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.prophets.infiltrate.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.prophets.infiltrate.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>4</b>&nbsp;
                      <v-icon small>fa-eye</v-icon>
                      &nbsp;{{$t("rotg.common.resources.prophets")}}
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}&nbsp;
                      <span v-if="localeFR">
                        Tous les plans attaqués à la fin de ce tour voient leurs armées divines augmentées de 1 en votre nom. Ceci ne consomme pas de ressource
                        <v-icon small>fa-fist-raised</v-icon>&nbsp;Armée. Si aucune attaque n'est déclenchée ce tour-ci, votre dépense sera remboursée.
                      </span>
                      <span v-else>
                        All planes attacked at the end of this turn have their divine armies increased by 1 on your behalf. This does not consume an
                        <v-icon small>fa-fist-raised</v-icon>&nbsp;Army resource. If no attack is triggered this turn, your expenses will be reimbursed.
                      </span>
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(15)"
                    @click="addOrder(15,4)"
                    block
                    :disabled="disableOrder(15) || currentPlayer.prophets < 4"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(15)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.prophets.prophecy.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.prophets.prophecy.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>3</b>&nbsp;
                      <v-icon small>fa-eye</v-icon>
                      &nbsp;{{$t("rotg.common.resources.prophets")}}
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}&nbsp;
                      <span
                        v-if="localeFR"
                      >Au tour suivant, vous pourrez voir les forces titaniques présentes sur les plans contrôlés par les Titans.</span>
                      <span
                        v-else
                      >In the next turn, you will be able to see the titanic forces present on the Planes controlled by the Titans.</span>
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(14)"
                    @click="addOrder(14,3)"
                    block
                    :disabled="disableOrder(14) || currentPlayer.prophets < 3"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(14)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.prophets.oracles.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.prophets.oracles.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>2</b>&nbsp;
                      <v-icon small>fa-eye</v-icon>
                      &nbsp;{{$t("rotg.common.resources.prophets")}}
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}
                      <b>2</b>&nbsp;
                      <v-icon small>fa-gem</v-icon>
                      &nbsp;{{$t("rotg.common.resources.orichalcum")}}
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(21)"
                    @click="addOrder(21,2)"
                    block
                    :disabled="disableOrder(21) || currentPlayer.prophets < 2"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(21)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.prophets.augurs.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.prophets.augurs.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>1</b>&nbsp;
                      <v-icon small>fa-eye</v-icon>
                      &nbsp;{{$t("rotg.common.resources.prophets")}}
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}
                      <b>1D3 - 1</b>&nbsp;
                      <v-icon small>fa-fist-raised</v-icon>
                      &nbsp;{{$t("rotg.common.resources.army")}}
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(22)"
                    @click="addOrder(22,1)"
                    block
                    :disabled="disableOrder(22) || currentPlayer.prophets < 1"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(22)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.prophets.vision.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.prophets.vision.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>1</b>&nbsp;
                      <v-icon small>fa-eye</v-icon>
                      &nbsp;{{$t("rotg.common.resources.prophets")}}
                    </li>
                    <li>
                      <span v-if="localeFR">
                        {{$t("rotg.content.ui.orderSheet.gains")}} Une chance sur deux de gagner ou de perdre
                        <b>1</b>&nbsp;
                        <v-icon small>fa-spider</v-icon>&nbsp;Lien du Destin
                      </span>
                      <span v-else>
                        {{$t("rotg.content.ui.orderSheet.gains")}} One chance out of two to gain or lose
                        <b>1</b>&nbsp;
                        <v-icon small>fa-spider</v-icon>&nbsp;Fate Binding
                      </span>
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(23)"
                    @click="addOrder(23,1)"
                    block
                    :disabled="disableOrder(23) || currentPlayer.prophets < 1"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(23)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.prophets.redistribution.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.prophets.redistribution.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>4</b>&nbsp;
                      <v-icon small>fa-eye</v-icon>
                      &nbsp;{{$t("rotg.common.resources.prophets")}}
                    </li>
                    <li>
                      <span v-if="localeFR">
                        {{$t("rotg.content.ui.orderSheet.gains")}} Vous gagnez
                        <b>2</b>&nbsp;
                        <v-icon small>fa-user-friends</v-icon>
                        &nbsp;{{$t("rotg.common.resources.population")}} et vous perdez
                        <b>1</b>&nbsp;
                        <v-icon small>fa-spider</v-icon>&nbsp;Lien du Destin
                      </span>
                      <span v-else>
                        {{$t("rotg.content.ui.orderSheet.gains")}} You gain
                        <b>2</b>&nbsp;
                        <v-icon small>fa-user-friends</v-icon>
                        &nbsp;{{$t("rotg.common.resources.population")}} and you lose
                        <b>1</b>&nbsp;
                        <v-icon small>fa-spider</v-icon>&nbsp;Fate Binding
                      </span>
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(24)"
                    @click="addOrder(24,4)"
                    block
                    :disabled="disableOrder(24) || currentPlayer.prophets < 4"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(24)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon left :color="popOrdered ? 'teal' : 'white'">fa-user-friends</v-icon>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs dark v-model="tabPop" show-arrows :vertical="!$vuetify.breakpoint.xs">
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.population.settle.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.population.recruitment.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.population.informants.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.population.civilization.short")}}</v-tab>
              <v-tabs-items dark v-model="tabPop" :vertical="!$vuetify.breakpoint.xs">
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.population.settle.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.population.settle.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <div style="width: 60px; display: inline-block">
                        <v-text-field
                          type="number"
                          dense
                          :readonly="disableOrder(8)"
                          v-model="sheet.parameters.populationSent"
                          :full-width="false"
                          :error="currentPlayer.population < sheet.parameters.populationSent || sheet.parameters.populationSent < 0"
                          solo
                          outlined
                        ></v-text-field>
                      </div>&nbsp;
                      <v-icon small>fa-user-friends</v-icon>
                      &nbsp;{{$t("rotg.common.resources.population")}}s
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}
                      <ul>
                        <li>
                          <span v-if="localeFR">Le contrôleur du Plan</span>
                          <span v-else>The owner of the Plane</span>
                          <div style="width: 200px; display: inline-block">
                            <v-select
                              v-model="sheet.parameters.populateTarget"
                              :disabled="disableOrder(8) || sheet.parameters.populationSent <= 0"
                              :items="godPlanes"
                              item-value="_id"
                              item-text="name"
                              outlined
                              solo
                            >
                              <template v-slot:selection="{ item }">
                                <span v-html="localeFR ? item.name : item.nameVO"></span>
                              </template>
                              <template v-slot:item="{ item }">
                                <span v-html="localeFR ? item.name : item.nameVO"></span>
                              </template>
                            </v-select>
                          </div>&nbsp;
                          <span v-if="localeFR">gagne&nbsp;</span>
                          <span v-else>gains&nbsp;</span>
                          <b>{{isNaN(parseInt(sheet.parameters.populationSent)) ? 0 : Math.ceil(parseInt(sheet.parameters.populationSent)/2)}}</b>
                          <span v-if="localeFR">&nbsp;de la&nbsp;</span>
                          <span v-else>&nbsp;of the&nbsp;</span>
                          <v-btn text color="blue" @click="resourcesDialog = true">
                            {{$t("rotg.content.ui.orderSheet.planesResources.title")}}&nbsp;
                            <v-icon small right>fa-info-circle</v-icon>
                          </v-btn>
                        </li>
                        <li>
                          <span v-if="localeFR">
                            Vous gagnez
                            <b>{{isNaN(parseInt(sheet.parameters.populationSent)) ? 0 : parseInt(sheet.parameters.populationSent)}}</b> de cette même ressource
                          </span>
                          <span v-else>
                            You gain
                            <b>{{isNaN(parseInt(sheet.parameters.populationSent)) ? 0 : parseInt(sheet.parameters.populationSent)}}</b> of that same resource
                          </span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(8)"
                    @click="addOrder(8,sheet.parameters.populationSent)"
                    block
                    :disabled="disableOrder(8) || currentPlayer.population < sheet.parameters.populationSent || sheet.parameters.populationSent <= 0 || isNaN(sheet.parameters.populationSent) || sheet.parameters.populateTarget == ''"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(8)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.population.recruitment.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.population.recruitment.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>2</b>&nbsp;
                      <v-icon small>fa-user-friends</v-icon>
                      &nbsp;{{$t("rotg.common.resources.population")}}
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}
                      <b>1</b>&nbsp;
                      <v-icon small>fa-fist-raised</v-icon>
                      &nbsp;{{$t("rotg.common.resources.army")}} + {{currentPlayer.territories.length}}&nbsp;
                      <span
                        v-if="localeFR"
                      >(Plans que vous contrôlez ce tour-ci).</span>
                      <span v-else>(Planes under your control this turn).</span>
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(9)"
                    @click.stop="addOrder(9,2)"
                    block
                    :disabled="disableOrder(9) || currentPlayer.population < 2"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(9)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.population.informants.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.population.informants.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>2</b>&nbsp;
                      <v-icon small>fa-user-friends</v-icon>
                      &nbsp;{{$t("rotg.common.resources.population")}}
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}
                      <b>1D4</b>&nbsp;
                      <v-icon small>fa-eye</v-icon>
                      &nbsp;{{$t("rotg.common.resources.prophets")}}
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(10)"
                    @click.stop="addOrder(10,2)"
                    block
                    :disabled="disableOrder(10) || currentPlayer.population < 2"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(10)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.population.civilization.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.population.civilization.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <b>4</b>&nbsp;
                      <v-icon small>fa-user-friends</v-icon>
                      &nbsp;{{$t("rotg.common.resources.population")}}
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}
                      <b>1D3</b>&nbsp;
                      <v-icon small>fa-user-friends</v-icon>
                      &nbsp;{{$t("rotg.common.resources.population")}},
                      <b>1D3</b>&nbsp;
                      <v-icon small>fa-gem</v-icon>
                      &nbsp;{{$t("rotg.common.resources.orichalcum")}}
                      <span
                        v-if="localeFR"
                      >&nbsp;et&nbsp;</span>
                      <span v-else>&nbsp;and&nbsp;</span>
                      <b>3</b>&nbsp;
                      <v-icon small>fa-fist-raised</v-icon>
                      &nbsp;{{$t("rotg.common.resources.army")}}
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(20)"
                    @click.stop="addOrder(20,4)"
                    block
                    :disabled="disableOrder(20) || currentPlayer.population < 4"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(20)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon left :color="fateOrdered ? 'teal' : 'white'">fa-spider</v-icon>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs dark v-model="tabFate" show-arrows :vertical="!$vuetify.breakpoint.xs">
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.fatebindings.celebration.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.fatebindings.destiny.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.fatebindings.gossips.short")}}</v-tab>
              <v-tab>{{$t("rotg.content.ui.orderSheet.orders.fatebindings.alea.short")}}</v-tab>
              <v-tabs-items dark v-model="tabFate" :vertical="!$vuetify.breakpoint.xs">
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.fatebindings.celebration.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.fatebindings.celebration.description1")}} {{currentPlayer.pantheon.name}} {{$t("rotg.content.ui.orderSheet.orders.fatebindings.celebration.description2")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      {{$t("rotg.content.ui.orderSheet.cost")}}
                      <span
                        v-if="localeFR"
                      >&nbsp;Aucun&nbsp;</span>
                      <span v-else>&nbsp;None&nbsp;</span>
                    </li>
                    <li>
                      <span v-if="localeFR">
                        {{$t("rotg.content.ui.orderSheet.gains")}}
                        Vos&nbsp;
                        <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin évoluent de
                        <b>1D6 - 1D10</b>
                      </span>
                      <span v-else>
                        {{$t("rotg.content.ui.orderSheet.gains")}}
                        Your&nbsp;
                        <v-icon small>fa-spider</v-icon>&nbsp;Fate Bindings are increased (or decreased) of
                        <b>1D6 - 1D10</b>
                      </span>
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(11)"
                    @click.stop="addOrder(11,0)"
                    block
                    :disabled="disableOrder(11)"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(11)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.fatebindings.destiny.title")}}</div>
                  <span>
                    <span
                      v-if="localeFR"
                    >Vous êtes {{currentPlayer.pantheon.leaderName}}, leader du mythique {{currentPlayer.pantheon.name}}.</span>
                    <span
                      v-else
                    >You are {{currentPlayer.pantheon.leaderName}}, leader of the mythical {{currentPlayer.pantheon.name}}.</span>
                    {{$t("rotg.content.ui.orderSheet.orders.fatebindings.destiny.description")}}
                  </span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      <span v-if="localeFR">
                        {{$t("rotg.content.ui.orderSheet.cost")}} Vous gagnez 1&nbsp;
                        <v-icon small>fa-spider</v-icon>&nbsp;Lien du Destin
                      </span>
                      <span v-else>
                        {{$t("rotg.content.ui.orderSheet.cost")}} You gain 1&nbsp;
                        <v-icon small>fa-spider</v-icon>&nbsp;Fate Binding
                      </span>
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}
                      <b>2</b>&nbsp;
                      <v-icon small>fa-jedi</v-icon>
                      &nbsp;{{$t("rotg.common.resources.heroism")}}
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(12)"
                    @click.stop="addOrder(12,1)"
                    block
                    :disabled="disableOrder(12)"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(12)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.fatebindings.gossips.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.fatebindings.gossips.description")}}</span>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      <span v-if="localeFR">
                        {{$t("rotg.content.ui.orderSheet.cost")}} Vous gagnez 1&nbsp;
                        <v-icon small>fa-spider</v-icon>&nbsp;Lien du Destin
                      </span>
                      <span v-else>
                        {{$t("rotg.content.ui.orderSheet.cost")}} You gain 1&nbsp;
                        <v-icon small>fa-spider</v-icon>&nbsp;Fate Binding
                      </span>
                    </li>
                    <li>
                      {{$t("rotg.content.ui.orderSheet.gains")}}
                      <b>1D3</b>&nbsp;
                      <v-icon small>fa-eye</v-icon>
                      &nbsp;{{$t("rotg.common.resources.prophets")}}
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(13)"
                    @click.stop="addOrder(13,1)"
                    block
                    :disabled="disableOrder(13)"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(13)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 subtitle-1 font-weight-thin">
                  <div
                    class="title"
                  >{{$t("rotg.content.ui.orderSheet.orders.fatebindings.alea.title")}}</div>
                  <span>{{$t("rotg.content.ui.orderSheet.orders.fatebindings.alea.description")}}</span>
                  <br />
                  <i v-if="localeFR">
                    Cet ordre n'est disponible que si vous êtes le dernier joueur en nombre de &nbsp;
                    <v-icon small>fa-trophy</v-icon>
                    {{$t("rotg.common.resources.victoryPoints")}}
                  </i>
                  <i v-else>
                    This order is only available if you are among the lowest amount of &nbsp;
                    <v-icon small>fa-trophy</v-icon>
                    {{$t("rotg.common.resources.victoryPoints")}}
                  </i>
                  <v-divider></v-divider>
                  <ul class="mb-3 mt-3">
                    <li>
                      <span v-if="localeFR">
                        {{$t("rotg.content.ui.orderSheet.cost")}} Vous gagnez 4&nbsp;
                        <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin
                      </span>
                      <span v-else>
                        {{$t("rotg.content.ui.orderSheet.cost")}} You gain 4&nbsp;
                        <v-icon small>fa-spider</v-icon>&nbsp;Fate Bindings
                      </span>
                    </li>
                    <li>
                      <span v-if="localeFR">
                        {{$t("rotg.content.ui.orderSheet.gains")}}
                        <b>2D3</b>&nbsp; de chaque autre ressource
                      </span>
                      <span v-else>
                        {{$t("rotg.content.ui.orderSheet.gains")}}
                        <b>2D3</b>&nbsp; of each other resource
                      </span>
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(2)"
                    @click.stop="addOrder(2,4)"
                    block
                    :disabled="disableOrder(2) || !playerIsFlop3()"
                  >{{$t("rotg.common.buttons.confirm")}}</v-btn>
                  <v-btn
                    block
                    color="red darken-4"
                    v-else
                    @click.stop="removeOrder(2)"
                  >{{$t("rotg.common.buttons.cancel")}}</v-btn>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon left :color="sheet.ordersSent.indexOf(19) > -1 ? 'teal' : 'white'">fa-bolt</v-icon>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pa-2 subtitle-1 font-weight-thin">
            <div class="title">
              <span v-if="localeFR">Main du Destin</span>
              <span v-else>Hand of Fate</span>
            </div>
            <span v-if="localeFR">
              <span>Parfois le Destin a besoin de se faire un peu forcer la main...</span>
              <br />
              <span>
                <u>NB:</u>&nbsp;Cet ordre est exécuté avant les attaques programmées sur les Plans Cosmiques aux mains des Titans.
              </span>
            </span>
            <span v-else>
              <span>Sometimes Fate needs to be forced a little...</span>
              <br />
              <span>
                <u>NB:</u>&nbsp;This order is executed before the attacks planned on the Cosmic Planes in the hands of the Titans.
              </span>
            </span>
            <v-divider></v-divider>
            <ul class="mb-3 mt-3">
              <li>
                <span
                  v-if="localeFR"
                >Choisissez 3 Plans Cosmiques où faire baisser les forces titaniques de</span>
                <span v-else>Choose 3 Cosmic Planes where to lower the titanic forces of</span>
                &nbsp;
                <b>1</b>
                <v-icon small>fa-fist-raised></v-icon>
                &nbsp;{{$t("rotg.common.resources.army")}} :&nbsp;
                <div style="width: 200px; display: inline-block">
                  <v-select
                    v-model="sheet.parameters.handBonusPlanes"
                    :items="titanicPlanes"
                    item-value="_id"
                    item-text="name"
                    outlined
                    solo
                    multiple
                  >
                    <template v-slot:selection="{ item }">
                      <span v-html="localeFR ? item.name : item.nameVO"></span>
                    </template>
                    <template v-slot:item="{ item }">
                      <span v-html="localeFR ? item.name : item.nameVO"></span>
                    </template>
                  </v-select>
                </div>
                <v-alert
                  dark
                  color="amber darken-3"
                  icon="mdi-fire"
                  v-if="sheet.parameters.handBonusPlanes.length != 3"
                >{{$t("rotg.content.ui.orderSheet.fateHandError")}}</v-alert>
              </li>
              <li>
                <span
                  v-if="localeFR"
                >Choisissez un Plan Cosmique où faire augmenter les forces titaniques de</span>
                <span v-else>Choose a Cosmic Plan where to increase the titanium forces of</span>
                &nbsp;
                <b>3</b>
                <v-icon small>fa-fist-raised></v-icon>
                &nbsp;{{$t("rotg.common.resources.army")}} :&nbsp;
                <div style="width: 200px; display: inline-block">
                  <v-select
                    v-model="sheet.parameters.handMalusPlane"
                    :items="fateSortedTitanicPlanes"
                    item-value="_id"
                    item-text="name"
                    outlined
                    solo
                  >
                    <template v-slot:selection="{ item }">
                      <span v-html="localeFR ? item.name : item.nameVO"></span>
                    </template>
                    <template v-slot:item="{ item }">
                      <span v-html="localeFR ? item.name : item.nameVO"></span>
                    </template>
                  </v-select>
                </div>
              </li>
            </ul>
            <v-btn
              color="blue darken-4"
              class="white--text"
              v-if="!orderInList(19)"
              @click.stop="addOrder(19,0)"
              block
              :disabled="disableOrder(19) || (sheet.parameters.handMalusPlane == '' || sheet.parameters.handBonusPlanes.length != 3)"
            >{{$t("rotg.common.buttons.confirm")}}</v-btn>
            <v-btn
              block
              color="red darken-4"
              v-else
              @click.stop="removeOrder(19)"
            >{{$t("rotg.common.buttons.cancel")}}</v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-row class="mt-3">
        <v-col cols="12">
          <v-btn
            block
            class="white--text"
            color="teal"
            @click.stop="sendSheetDialog = true;"
            :loading="loadingSend"
            :disabled="sheet.ordersSent.length == 0"
          >
            <v-icon left small>fa-paper-plane</v-icon>{{$t("rotg.common.buttons.sendOrderSheet")}}
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="resourcesDialog" max-width="500">
      <v-card>
        <v-card-title class="blue darken-4 white--text">{{$t("rotg.content.ui.orderSheet.planesResources.title")}}</v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">{{$t("rotg.content.ui.orderSheet.planesResources.plane")}}</th>
                  <th class="text-left">{{$t("rotg.content.ui.orderSheet.planesResources.resource")}}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span v-if="localeFR">Le Monde</span>
                    <span v-else>The World</span>
                  </td>
                  <td>
                    <span v-if="localeFR">
                      <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin (diminution)
                    </span>
                    <span v-else>
                      <v-icon small>fa-spider</v-icon>&nbsp;Fate Bindings (decrease)
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Fairie</td>
                  <td>
                    <v-icon small>fa-gem</v-icon>
                    &nbsp;{{$t("rotg.common.resources.orichalcum")}}
                  </td>
                </tr>
                <tr>
                  <td>Shambhala</td>
                  <td>
                    <v-icon small>fa-gem</v-icon>
                    &nbsp;{{$t("rotg.common.resources.orichalcum")}}
                  </td>
                </tr>
                <tr>
                  <td>Aunu</td>
                  <td>
                    <v-icon small>fa-fist-raised</v-icon>
                    &nbsp;{{$t("rotg.common.resources.army")}}
                  </td>
                </tr>
                <tr>
                  <td>Aether</td>
                  <td>
                    <v-icon small>fa-fist-raised</v-icon>
                    &nbsp;{{$t("rotg.common.resources.army")}}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span v-if="localeFR">Mont Olympe</span>
                    <span v-else>Mount Olympus</span>
                  </td>
                  <td>
                    <v-icon small>fa-jedi</v-icon>
                    &nbsp;{{$t("rotg.common.resources.heroism")}}
                  </td>
                </tr>
                <tr>
                  <td>Kosmos</td>
                  <td>
                    <v-icon small>fa-jedi</v-icon>
                    &nbsp;{{$t("rotg.common.resources.heroism")}}
                  </td>
                </tr>
                <tr>
                  <td>Devaloka</td>
                  <td>
                    <v-icon small>fa-eye</v-icon>
                    &nbsp;{{$t("rotg.common.resources.prophets")}}
                  </td>
                </tr>
                <tr>
                  <td>Nyx</td>
                  <td>
                    <v-icon small>fa-eye</v-icon>
                    &nbsp;{{$t("rotg.common.resources.prophets")}}
                  </td>
                </tr>
                <tr>
                  <td>Sheol</td>
                  <td>
                    <v-icon small>fa-eye</v-icon>
                    &nbsp;{{$t("rotg.common.resources.prophets")}}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="blue" @click="resourcesDialog = false;">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="sendSheetDialog" persistent max-width="500">
      <v-card>
        <v-card-title class="orange darken-4 white--text">
          {{$t("rotg.content.ui.orderSheet.warningDialog.title")}}
          <v-spacer></v-spacer>
          <v-icon class="white--text">fa-radiation</v-icon>
        </v-card-title>
        <v-card-text
          class="mt-2"
        >{{$t("rotg.content.ui.orderSheet.warningDialog.text")}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="sendSheetDialog = false;">{{$t("rotg.common.buttons.cancel")}}</v-btn>
          <v-btn text color="blue" @click="sendOrderSheet">{{$t("rotg.common.buttons.send")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  name: "ROTGOrderSheet",
  created() {
    this.sheet.parameters.playerID = this.currentPlayer._id;
    this.sheet.parameters.playerName = this.currentPlayer.user.name;
    this.sheet.gameID = this.selectedGame._id;
    this.sheet.turn = this.selectedGame.turn;
    Object.assign(this.localPlayer, this.currentPlayer);
  },
  computed: {
    currentPlayer: {
      get: function() {
        return store.getters.currentPlayer;
      },
      set: function(player: Player) {
        store.commit("setCurrentPlayer", player);
      }
    },
    currentOrderSheet: {
      get: function() {
        return store.getters.currentOrderSheet;
      },
      set: function(sheet: OrderSheet) {
        store.commit("setCurrentOrderSheet", sheet);
      }
    },
    selectedGameTerritories: function() {
      return store.getters.selectedGameTerritories;
    },
    selectedGamePlayers: function() {
      return store.getters.selectedGamePlayers;
    },
    selectedGame: function() {
      return store.getters.selectedGame;
    },
    resourcesSpent: {
      get: function() {
        return store.getters.resourcesSpent;
      },
      set: function(resources: Resources) {
        store.commit("setResourcesSpent", resources);
      }
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
    fateSortedTitanicPlanes: function() {
      var result = this.titanicPlanes.filter((t: Territory) => {
        return this.sheet.parameters.handBonusPlanes.indexOf(t._id) < 0;
      });
      return result;
    },
    oriOrdered: function() {
      return this.ordersOri.some(
        (r: number) => this.sheet.ordersSent.indexOf(r) >= 0
      );
    },
    heroOrdered: function() {
      return this.ordersHero.some(
        (r: number) => this.sheet.ordersSent.indexOf(r) >= 0
      );
    },
    armyOrdered: function() {
      return this.ordersArmy.some(
        (r: number) => this.sheet.ordersSent.indexOf(r) >= 0
      );
    },
    popOrdered: function() {
      return this.ordersPop.some(
        (r: number) => this.sheet.ordersSent.indexOf(r) >= 0
      );
    },
    prophOrdered: function() {
      return this.ordersProph.some(
        (r: number) => this.sheet.ordersSent.indexOf(r) >= 0
      );
    },
    fateOrdered: function() {
      return this.ordersFate.some(
        (r: number) => this.sheet.ordersSent.indexOf(r) >= 0
      );
    },
    localeFR: function() {
      return this.$i18n.locale == "fr";
    }
  },
  watch: {
    "selectedGame.turn": function(newTurn: number, oldTurn: number) {
      if (newTurn > oldTurn) {
        this.sheet.turn = newTurn;
        this.sheet.parameters.playerID = this.currentPlayer._id;
        this.sheet.parameters.playerName = this.currentPlayer.user.name;
        this.sheet.gameID = this.selectedGame._id;
      }
    },
    selectedGameTerritories: function() {
      this.titanicPlanes = this.selectedGameTerritories.filter(
        (t: Territory) => {
          return t.owner == "";
        }
      );
      this.godPlanes = this.selectedGameTerritories.filter((t: Territory) => {
        return t.owner != "";
      });
    }
  },
  methods: {
    orderInList: function(order: number) {
      return this.sheet.ordersSent.indexOf(order) > -1;
    },
    disableOrder: function(order: number) {
      if (this.ordersOri.indexOf(order) > -1) {
        return this.oriOrdered;
      } else if (this.ordersArmy.indexOf(order) > -1) {
        return this.armyOrdered;
      } else if (this.ordersFate.indexOf(order) > -1) {
        return this.fateOrdered;
      } else if (this.ordersHero.indexOf(order) > -1) {
        return this.heroOrdered;
      } else if (this.ordersPop.indexOf(order) > -1) {
        return this.popOrdered;
      } else if (this.ordersProph.indexOf(order) > -1) {
        return this.prophOrdered;
      }
    },
    addOrder: function(order: number, resources: number) {
      this.sheet.ordersSent.push(order);

      if (this.ordersOri.indexOf(order) > -1) {
        this.resourcesSpent.orichalcum = resources;
      } else if (this.ordersArmy.indexOf(order) > -1) {
        this.resourcesSpent.army = resources;
      } else if (this.ordersFate.indexOf(order) > -1) {
        this.resourcesSpent.fatebindings = resources;
      } else if (this.ordersHero.indexOf(order) > -1) {
        this.resourcesSpent.heroism = resources;
      } else if (this.ordersPop.indexOf(order) > -1) {
        this.resourcesSpent.population = resources;
      } else if (this.ordersProph.indexOf(order) > -1) {
        this.resourcesSpent.prophets = resources;
      }
    },
    removeOrder: function(order: number) {
      this.sheet.ordersSent.splice(this.sheet.ordersSent.indexOf(order), 1);

      if (this.ordersOri.indexOf(order) > -1) {
        this.resourcesSpent.orichalcum = 0;
      } else if (this.ordersArmy.indexOf(order) > -1) {
        this.resourcesSpent.army = 0;
      } else if (this.ordersFate.indexOf(order) > -1) {
        this.resourcesSpent.fatebindings = 0;
      } else if (this.ordersHero.indexOf(order) > -1) {
        this.resourcesSpent.heroism = 0;
      } else if (this.ordersPop.indexOf(order) > -1) {
        this.resourcesSpent.population = 0;
      } else if (this.ordersProph.indexOf(order) > -1) {
        this.resourcesSpent.prophets = 0;
      }
    },
    sendOrderSheet: function() {
      this.sendSheetDialog = false;
      this.loadingSend = true;
      this.sheet.parameters.playerID = this.currentPlayer._id;
      this.sheet.parameters.playerName = this.currentPlayer.user.name;
      this.sheet.gameID = this.selectedGame._id;
      this.sheet.turn = this.selectedGame.turn;
      this.sheet.sent = true;
      this.sheet.timeOfSubmit = this.GetToday().time;
      this.sheet.dayOfSubmit = this.GetToday().date;
      store.commit("setPreviousPlayer", this.currentPlayer);
      store.dispatch("sendROTGOrderSheet", this.sheet).then(() => {
        Object.assign(this.sheet, new OrderSheet());
        this.loadingSend = false;
      });
    },
    playerIsFlop3: function() {
      var pv = -1;
      var scoreGroups = [];
      var result = false;
      for (var i = 0; i < this.selectedGamePlayers.length; i++) {
        var player = this.selectedGamePlayers[i];
        if (player.victoryPoints != pv) {
          pv = player.victoryPoints;
          scoreGroups.push([player]);
        } else {
          scoreGroups[scoreGroups.length - 1].push(player);
        }
      }

      if (scoreGroups.length > 1) {
        var playerInside = scoreGroups[scoreGroups.length - 1].filter(
          (p: Player) => p._id == this.currentPlayer._id
        );
        if (playerInside.length == 1) {
          result = true;
        } else {
          result = false;
        }
      } else {
        result = false;
      }
      return result;
    },
    GetToday: function() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      var todayDate = dd + "/" + mm + "/" + yyyy;
      var hours = today.getHours();
      var minutes = today.getMinutes();
      var todayTime =
        (hours < 10 ? `0${hours}` : hours) +
        ":" +
        (minutes < 10 ? `0${minutes}` : minutes);

      return {
        date: todayDate,
        time: todayTime
      };
    }
  },
  data: () => ({
    tabOri: 0,
    tabArmy: 0,
    tabHero: 0,
    tabPop: 0,
    tabProph: 0,
    tabFate: 0,
    loadingSend: false,
    loadingSheets: false,
    sheet: new OrderSheet(),
    resourcesDialog: false,
    sendSheetDialog: false,
    fourPlayersForeseeAlert: false,
    threePlanesFateHandAlert: false,
    titanicPlanes: new Array<Territory>(),
    godPlanes: new Array<Territory>(),
    localPlayer: new Player(),
    ordersOri: [
      OrdersEnum.ORI_PROSP,
      OrdersEnum.ORI_INVEST,
      OrdersEnum.ORI_GAMBLE,
      OrdersEnum.ORI_OPU
    ],
    ordersArmy: [OrdersEnum.ARMY_ATTACK, OrdersEnum.ARMY_STABI],
    ordersHero: [
      OrdersEnum.HERO_GODBORN,
      OrdersEnum.HERO_EXPLO,
      OrdersEnum.HERO_TEAM,
      OrdersEnum.HERO_APO
    ],
    ordersPop: [
      OrdersEnum.POP_INFO,
      OrdersEnum.POP_PLAN,
      OrdersEnum.POP_RECRUIT,
      OrdersEnum.POP_CIVI
    ],
    ordersProph: [
      OrdersEnum.PROPH_FORESEE,
      OrdersEnum.PROPH_INFILT,
      OrdersEnum.PROPH_SPY,
      OrdersEnum.PROPH_ORA,
      OrdersEnum.PROPH_AUG,
      OrdersEnum.PROPH_FUTUR,
      OrdersEnum.PROPH_LEGEND
    ],
    ordersFate: [
      OrdersEnum.FATE_CELEB,
      OrdersEnum.FATE_RITUAL,
      OrdersEnum.FATE_GOSSIP,
      OrdersEnum.FATE_ALEA
    ]
  })
});
</script>