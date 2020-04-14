<template>
  <div class="mt-3">
    <v-alert
      dark
      color="blue"
      icon="mdi-information"
      v-if="sheetSent"
    >Votre Feuille d'Ordre a déjà été soumise pour ce tour</v-alert>
    <div v-else>
      <v-row align-content="center" justify="center" v-if="loadingSheets">
        <v-col class="subtitle-1 text-center" cols="12">Récupération des feuilles d'ordres</v-col>
        <v-col cols="6">
          <v-progress-linear color="blue accent-4" indeterminate rounded height="6"></v-progress-linear>
        </v-col>
      </v-row>
      <v-expansion-panels hover popout inset dark v-else>
        <v-expansion-panel dark>
          <v-expansion-panel-header>
            <v-icon left>fa-gem</v-icon>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pa-1">
            <v-tabs dark v-model="tabOri" show-arrows :vertical="!$vuetify.breakpoint.xs">
              <v-tab>Prospérité</v-tab>
              <v-tab>Opulence</v-tab>
              <v-tab>Investissement</v-tab>
              <v-tab>Anticipation</v-tab>
              <v-tab>Inventivité</v-tab>
              <v-tabs-items dark v-model="tabOri" :vertical="!$vuetify.breakpoint.xs">
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Vous faites jouer vos alliances et vos vassaux pour obtenir des moyens</span>
                  <ul class="mb-3">
                    <li>
                      Coût :
                      <b>2</b>&nbsp;
                      <v-icon small>fa-gem</v-icon>&nbsp;Orichalque
                    </li>
                    <li>
                      Gains :
                      <b>1</b>&nbsp;
                      <v-icon small>fa-fist-raised</v-icon>&nbsp;Armée,
                      <b>1</b>&nbsp;
                      <v-icon small>fa-user-friends</v-icon>&nbsp;Population
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(0)"
                    @click.stop="addOrder(0,2)"
                    block
                    :disabled="disableOrder(0) || currentPlayer.orichalcum < 2"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(0)">Annuler</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Vous ratissez massivement pour approvisionner vos troupes</span>
                  <ul class="mb-3">
                    <li>
                      Coût :
                      <b>5</b>&nbsp;
                      <v-icon small>fa-gem</v-icon>&nbsp;Orichalque
                    </li>
                    <li>
                      Gains :
                      <b>3</b>&nbsp;
                      <v-icon small>fa-fist-raised</v-icon>&nbsp;Armée,
                      <b>3</b>&nbsp;
                      <v-icon small>fa-user-friends</v-icon>&nbsp;Population
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(18)"
                    @click.stop="addOrder(18,5)"
                    block
                    :disabled="disableOrder(18) || currentPlayer.orichalcum < 5"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(18)">Annuler</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Vous investissez dans un plan économique à court terme</span>
                  <ul class="mb-3">
                    <li>
                      Coût :
                      <b>2</b>&nbsp;
                      <v-icon small>fa-gem</v-icon>&nbsp;Orichalque
                    </li>
                    <li>
                      Gains :
                      <b>3</b>&nbsp;
                      <v-icon small>fa-gem</v-icon>
                      &nbsp;Orichalque + {{currentPlayer.territories.length}} (Plans que vous contrôlez ce tour-ci).
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(1)"
                    @click.stop="addOrder(1,2)"
                    block
                    :disabled="disableOrder(1) || currentPlayer.orichalcum < 2"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(1)">Annuler</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>
                    Vous faites un pari sur la victoire (ou la défaite) d'une attaque déclarée ce tour-ci sur un plan choisi.
                    <br />
                    <i>Si aucune attaque n'est déclarée, vous serez remboursé(e) de votre dépense.</i>
                  </span>
                  <ul class="mb-3">
                    <li>
                      Parier sur la victoire :
                      <ul>
                        <li>
                          Coût :
                          <b>1</b>&nbsp;
                          <v-icon small>fa-gem</v-icon>&nbsp;Orichalque
                        </li>
                        <li>
                          Gains :
                          <b>2</b>&nbsp;
                          <v-icon small>fa-gem</v-icon>&nbsp;Orichalque (si l'attaque réussit)
                          <br />
                          <b>
                            <u>OU</u>
                          </b>&nbsp;
                          <b>1</b>&nbsp;
                          <v-icon small>fa-spider</v-icon>&nbsp;Lien du Destin (si l'attaque échoue)
                        </li>
                      </ul>
                    </li>
                    <li>
                      Parier sur la défaite :
                      <ul>
                        <li>
                          Coût :
                          <b>1</b>&nbsp;
                          <v-icon small>fa-gem</v-icon>&nbsp;Orichalque
                        </li>
                        <li>
                          Gains :
                          <b>3</b>&nbsp;
                          <v-icon small>fa-gem</v-icon>&nbsp;Orichalque (si l'attaque échoue)
                          <br />
                          <b>
                            <u>OU</u>
                          </b>&nbsp;
                          <b>2</b>&nbsp;
                          <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin (si l'attaque réussit)
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div class="mt-3">
                    <div style="display: inline-block; margin-right: 10px;">
                      <v-switch
                        v-model="sheet.parameters.gambleDefeat"
                        :label="`Parier sur la ${sheet.parameters.gambleDefeat ? 'défaite' : 'victoire'} de l'attaque sur le Plan `"
                        color="blue"
                        class="title"
                      ></v-switch>
                    </div>
                    <div style="width: 200px; display: inline-block">
                      <v-select
                        v-model="sheet.parameters.gambleTarget"
                        :items="titanicPlanes"
                        item-value="_id"
                        item-text="name"
                        outlined
                        solo
                      ></v-select>
                    </div>
                  </div>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(17)"
                    @click.stop="addOrder(17,1)"
                    block
                    :disabled="disableOrder(17) || currentPlayer.orichalcum < 1"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(17)">Annuler</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Vous investissez dans un plan économique à court terme.</span>
                  <br />
                  <i>Cette action n'est disponible que si vous figurez parmi les 3 derniers joueurs de la partie en terme de Points de Victoire (le dernier 3 joueurs ou moins).</i>
                  <ul class="mb-3">
                    <li>
                      Coût :
                      <b>6</b>&nbsp;
                      <v-icon small>fa-gem</v-icon>&nbsp;Orichalque
                    </li>
                    <li>
                      Gains :
                      <b>1D3</b>&nbsp; de chaque ressource (vous perdez
                      <b>1D3</b>&nbsp;
                      <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin)
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(2)"
                    @click="addOrder(2,6)"
                    block
                    :disabled="disableOrder(2) || currentPlayer.orichalcum < 6 || playerIsFlop3()"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(2)">Annuler</v-btn>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon left>fa-fist-raised</v-icon>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs dark v-model="tabArmy" show-arrows :vertical="!$vuetify.breakpoint.xs">
              <v-tab>Attaquer</v-tab>
              <v-tab>Stabiliser</v-tab>
              <v-tabs-items dark v-model="tabArmy" :vertical="!$vuetify.breakpoint.xs">
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Vous déployez vos troupes pour rejoindre le combat et tenter de vous emparer d'un plan contrôlé par les Titans</span>
                  <ul class="mb-3">
                    <li>
                      Coût :
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
                      <v-icon small>fa-fist-raised</v-icon>&nbsp;Armées pour attaquer
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
                        ></v-select>
                      </div>
                    </li>
                    <li>
                      Gains : (si réussite de l'attaque)
                      <ul>
                        <li>
                          <b>3</b>&nbsp;
                          <v-icon small>fa-trophy</v-icon>&nbsp;Points de Victoire si vous avez attaqué avec le plus de forces
                        </li>
                        <li>
                          <b>2</b>&nbsp;
                          <v-icon small>fa-trophy</v-icon>&nbsp;Points de Victoire si vous êtes en deuxième position
                        </li>
                        <li>
                          <b>1</b>&nbsp;
                          <v-icon small>fa-trophy</v-icon>&nbsp;Point de Victoire si vous êtes en troisième position
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
                    :disabled="disableOrder(3) || sheet.parameters.armySent <= 0 || currentPlayer.army < sheet.parameters.armySent"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(3)">Annuler</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Vous déployez vos troupes pour pacifier les régions du cosmos les plus agitées.</span>
                  <ul class="mb-3">
                    <li>
                      Coût :
                      <b>4</b>&nbsp;
                      <v-icon small>fa-fist-raised</v-icon>&nbsp;Armées
                    </li>
                    <li>
                      Gains : Vous perdez
                      <b>2</b>&nbsp;
                      <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(4)"
                    @click.stop="addOrder(4,4)"
                    block
                    :disabled="disableOrder(4) || currentPlayer.army < 4"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(4)">Annuler</v-btn>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon left>fa-jedi</v-icon>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs dark v-model="tabHero" show-arrows :vertical="!$vuetify.breakpoint.xs">
              <v-tab>Godborn</v-tab>
              <v-tab>Exploration</v-tab>
              <v-tab>Equipée</v-tab>
              <v-tabs-items dark v-model="tabHero" :vertical="!$vuetify.breakpoint.xs">
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>En tant que {{currentPlayer.pantheon.leaderName}}, vous vous mêlez aux mortels pour enfanter un Godborn qui fera une excellente recrue pour votre armée.</span>
                  <ul class="mb-3">
                    <li>
                      Coût :
                      <b>3</b>&nbsp;
                      <v-icon small>fa-jedi</v-icon>&nbsp;Héroïsme
                    </li>
                    <li>
                      Gains :
                      <b>3</b>&nbsp;
                      <v-icon small>fa-fist-raised</v-icon>&nbsp;Armée
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(5)"
                    @click="addOrder(5,3)"
                    block
                    :disabled="disableOrder(5) || currentPlayer.heroism < 3"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(5)">Annuler</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Vous envoyez une équipe en reconnaissance dans les plans titaniques.</span>
                  <ul class="mb-3">
                    <li>
                      Coût :
                      <b>4</b>&nbsp;
                      <v-icon small>fa-jedi</v-icon>&nbsp;Héroïsme
                    </li>
                    <li>Gains : Au tour suivant, vous pourrez voir les forces titaniques présentes sur les plans contrôlés par les Titans.</li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(6)"
                    @click="addOrder(6,4)"
                    block
                    :disabled="disableOrder(6) || currentPlayer.heroism < 4"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(6)">Annuler</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Vous, {{currentPlayer.pantheon.leaderName}}, accompagné(e) de vos alliés les plus téméraires, vous embarquez pour une équipée héroïque dans les terres titaniques pour ramener la gloir à votre Panthéon.</span>
                  <ul class="mb-3">
                    <li>
                      Coût :
                      <b>3</b>&nbsp;
                      <v-icon small>fa-jedi</v-icon>&nbsp;Héroïsme
                    </li>
                    <li>
                      Gains :
                      <b>2D3</b>&nbsp;
                      <v-icon small>fa-jedi</v-icon>&nbsp;Héroïsme
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(7)"
                    @click="addOrder(7,3)"
                    block
                    :disabled="disableOrder(7) || currentPlayer.heroism < 3"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(7)">Annuler</v-btn>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon left>fa-eye</v-icon>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs dark v-model="tabProph" show-arrows :vertical="!$vuetify.breakpoint.xs">
              <v-tab>Espionner</v-tab>
              <v-tab>Infiltration</v-tab>
              <v-tab>Prophétie</v-tab>
              <v-tabs-items dark v-model="tabProph" :vertical="!$vuetify.breakpoint.xs">
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Vous invoquez le pouvoir des Oracles pour être certain(e) que vos alliés ne vous jouent pas des tours en ces temps troublés.</span>
                  <ul class="mb-3">
                    <li>
                      Coût :
                      <b>2</b>&nbsp;
                      <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                    </li>
                    <li>
                      Gains : Au tour suivant, vous pourrez voir les fiches d'ordre envoyées ce tour-ci de 2 joueurs parmi les suivants :
                      <div style="width: 200px; display: inline-block">
                        <v-select
                          v-model="sheet.parameters.foreseeTargets"
                          :items="selectedGamePlayers"
                          item-value="_id"
                          item-text="pantheon.name"
                          outlined
                          solo
                          multiple
                        ></v-select>
                      </div>
                    </li>
                  </ul>
                  <v-alert
                    dark
                    color="amber darken-3"
                    icon="mdi-fire"
                    v-if="sheet.parameters.foreseeTargets.length != 4"
                  >Veuillez choisir exactement 4 joueurs</v-alert>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(16)"
                    @click="addOrder(16,2)"
                    block
                    :disabled="disableOrder(16) || currentPlayer.prophets < 2 || sheet.parameters.foreseeTargets.length != 4"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(16)">Annuler</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Les Augures vous donnent un aperçu de l'avenir proche et vous permettent d'infiltrer des plans contrôlés par les titans avant que ceux-ci ne soient attaqués par les autres panthéons.</span>
                  <ul class="mb-3">
                    <li>
                      Coût :
                      <b>3</b>&nbsp;
                      <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                    </li>
                    <li>
                      Gains : Tous les plans attaqués à la fin de ce tour voient leurs armées divines augmentées de 1 en votre nom. Ceci ne consomme pas de ressource
                      <v-icon small>fa-fist-raised</v-icon>&nbsp;Armée. Si aucune attaque n'est déclenchée ce tour-ci, votre dépenses sera remboursée.
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(15)"
                    @click="addOrder(15,3)"
                    block
                    :disabled="disableOrder(15) || currentPlayer.prophets < 3"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(15)">Annuler</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Les Augures vous donnent un aperçu de l'avenir proche et vous permettent d'infiltrer des plans contrôlés par les titans avant que ceux-ci ne soient attaqués par les autres panthéons.</span>
                  <ul class="mb-3">
                    <li>
                      Coût :
                      <b>4</b>&nbsp;
                      <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                    </li>
                    <li>Gains : Au prochain tour, vous serez en mesure de voir les forces titaniques présentes sur les Plans contrôlés par les Titans.</li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(14)"
                    @click="addOrder(14,4)"
                    block
                    :disabled="disableOrder(14) || currentPlayer.prophets < 4"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(14)">Annuler</v-btn>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon left>fa-user-friends</v-icon>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs dark v-model="tabPop" show-arrows :vertical="!$vuetify.breakpoint.xs">
              <v-tab>Habiter</v-tab>
              <v-tab>Recrutement</v-tab>
              <v-tab>Informateurs</v-tab>
              <v-tabs-items dark v-model="tabPop" :vertical="!$vuetify.breakpoint.xs">
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Vous déplacez vos populations sur les plans contrôlés par vous et vos alliés</span>
                  <ul class="mb-3">
                    <li>
                      Coût :
                      <b>3</b>&nbsp;
                      <v-icon small>fa-user-friends</v-icon>&nbsp;Population
                    </li>
                    <li>
                      Gains :
                      <ul>
                        <li>
                          Le contrôleur du plan
                          <div style="width: 200px; display: inline-block">
                            <v-select
                              v-model="sheet.parameters.populateTarget"
                              :disabled="disableOrder(8) || currentPlayer.population < 3"
                              :items="godPlanes"
                              item-value="_id"
                              item-text="name"
                              outlined
                              solo
                            ></v-select>
                          </div>&nbsp;gagne
                          <b>2</b> de la
                          <v-btn text color="blue" @click="resourcesDialog = true">
                            ressource associée au plan&nbsp;
                            <v-icon small right>fa-info-circle</v-icon>
                          </v-btn>
                        </li>
                        <li>
                          Vous gagnez
                          <b>3</b> de cette même ressource
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(8)"
                    @click="addOrder(8,3)"
                    block
                    :disabled="disableOrder(8) || currentPlayer.population < 3"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(8)">Annuler</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Vous vantez les mérites de la guerre contre les Titans à vos populations pour recruter des troupes.</span>
                  <ul class="mb-3">
                    <li>
                      Coût :
                      <b>2</b>&nbsp;
                      <v-icon small>fa-user-friends</v-icon>&nbsp;Population
                    </li>
                    <li>
                      Gains :
                      <b>1</b>&nbsp;
                      <v-icon small>fa-fist-raised</v-icon>
                      &nbsp;Armée + {{currentPlayer.territories.length}} (Plans que vous contrôlez ce tour-ci).
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(9)"
                    @click.stop="addOrder(9,2)"
                    block
                    :disabled="disableOrder(9) || currentPlayer.population < 2"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(9)">Annuler</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Des agents dormants infiltrés dans les populations du cosmos vous envoient les dernières informations sur la guerre.</span>
                  <ul class="mb-3">
                    <li>
                      Coût :
                      <b>4</b>&nbsp;
                      <v-icon small>fa-user-friends</v-icon>&nbsp;Population
                    </li>
                    <li>
                      Gains :
                      <b>3</b>&nbsp;
                      <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(10)"
                    @click.stop="addOrder(10,4)"
                    block
                    :disabled="disableOrder(10) || currentPlayer.population < 4"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(10)">Annuler</v-btn>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-icon left>fa-spider</v-icon>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs dark v-model="tabFate" show-arrows :vertical="!$vuetify.breakpoint.xs">
              <v-tab>Célébration</v-tab>
              <v-tab>Destinée</v-tab>
              <v-tab>Ragots</v-tab>
              <v-tabs-items dark v-model="tabFate" :vertical="!$vuetify.breakpoint.xs">
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Alors que vous vous investissez de plus en plus dans cette guerre, vous organisez une célébration au sein du {{currentPlayer.pantheon.name}}, votre panthéon, pour oublier un peu cette période troublée l'espace d'un instant. Un mariage, une alliance politique, une naissance...vous prenez du recul par rapport au Destin...ou pas !</span>
                  <ul class="mb-3">
                    <li>Coût : Aucun</li>
                    <li>
                      Gains :
                      Vos&nbsp;
                      <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin évoluent de
                      <b>1D6 - 1D10</b>
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(11)"
                    @click.stop="addOrder(11,0)"
                    block
                    :disabled="disableOrder(11)"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(11)">Annuler</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Vous êtes {{currentPlayer.pantheon.leaderName}}, leader du mythique {{currentPlayer.pantheon.name}}. La Légende accumulée lors de cette guerre vous couvre de gloire...et vous met en valeur auprès du Destin.</span>
                  <ul class="mb-3">
                    <li>
                      Coût : Vous gagnez 1&nbsp;
                      <v-icon small>fa-spider</v-icon>&nbsp;Lien du Destin
                    </li>
                    <li>
                      Gains :
                      <b>2</b>&nbsp;
                      <v-icon small>fa-jedi</v-icon>&nbsp;Héroïsme
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(12)"
                    @click.stop="addOrder(12,1)"
                    block
                    :disabled="disableOrder(12)"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(12)">Annuler</v-btn>
                </v-tab-item>
                <v-tab-item class="pa-2 title font-weight-thin">
                  <span>Les murmures se propagent à travers la Légende et recèlent moultes informations pour qui sait tendre l'oreille vers le Destin.</span>
                  <ul class="mb-3">
                    <li>
                      Coût : Vous gagnez 1&nbsp;
                      <v-icon small>fa-spider</v-icon>&nbsp;Lien du Destin
                    </li>
                    <li>
                      Gains :
                      <b>1D3</b>&nbsp;
                      <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                    </li>
                  </ul>
                  <v-btn
                    color="blue darken-4"
                    class="white--text"
                    v-if="!orderInList(13)"
                    @click.stop="addOrder(13,1)"
                    block
                    :disabled="disableOrder(13)"
                  >Valider</v-btn>
                  <v-btn block color="red darken-4" v-else @click.stop="removeOrder(13)">Annuler</v-btn>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
              <v-icon left>fa-bolt</v-icon>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pa-2 title font-weight-thin">
            <span>Parfois le Destin a besoin de se faire un peu forcer la main...</span>
            <br />
            <span>
              <u>NB:</u>&nbsp;Cet ordre est exécuté avant les attaques programmées sur les Plans Cosmiques aux mains des Titans.
            </span>
            <ul class="mb-3">
              <li>
                Choisissez 3 Plans Cosmiques où faire baisser les forces titaniques de
                <b>1</b>
                <v-icon small>fa-fist-raised></v-icon>&nbsp;Armée :&nbsp;
                <div style="width: 200px; display: inline-block">
                  <v-select
                    v-model="sheet.parameters.handBonusPlanes"
                    :items="titanicPlanes"
                    item-value="_id"
                    item-text="name"
                    outlined
                    solo
                    multiple
                  ></v-select>
                </div>
                <v-alert
                  dark
                  color="amber darken-3"
                  icon="mdi-fire"
                  v-if="sheet.parameters.handBonusPlanes.length != 3"
                >Veuillez choisir exactement 3 Plans Cosmiques</v-alert>
              </li>
              <li>
                Choisissez un Plan Cosmique où faire augmenter les forces titaniques de
                <b>3</b>
                <v-icon small>fa-fist-raised></v-icon>&nbsp;Armées :&nbsp;
                <div style="width: 200px; display: inline-block">
                  <v-select
                    v-model="sheet.parameters.handMalusPlane"
                    :items="fateSortedTitanicPlanes"
                    item-value="_id"
                    item-text="name"
                    outlined
                    solo
                  ></v-select>
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
            >Valider</v-btn>
            <v-btn block color="red darken-4" v-else @click.stop="removeOrder(19)">Annuler</v-btn>
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
            <v-icon left small>fa-paper-plane</v-icon>Envoyer ma fiche d'ordre
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="resourcesDialog" persistent max-width="500">
      <v-card>
        <v-card-title class="blue darken-4 white--text">Ressources associées aux Plans Cosmiques</v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Plan</th>
                  <th class="text-left">Ressource</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Le Monde</td>
                  <td>
                    <v-icon small>fa-spider</v-icon>&nbsp;Liens du Destin (diminution)
                  </td>
                </tr>
                <tr>
                  <td>Fairie</td>
                  <td>
                    <v-icon small>fa-gem</v-icon>&nbsp;Orichalque
                  </td>
                </tr>
                <tr>
                  <td>Shambhala</td>
                  <td>
                    <v-icon small>fa-gem</v-icon>&nbsp;Orichalque
                  </td>
                </tr>
                <tr>
                  <td>Aunu</td>
                  <td>
                    <v-icon small>fa-fist-raised</v-icon>&nbsp;Armée
                  </td>
                </tr>
                <tr>
                  <td>Aether</td>
                  <td>
                    <v-icon small>fa-fist-raised</v-icon>&nbsp;Armée
                  </td>
                </tr>
                <tr>
                  <td>Mont Olympe</td>
                  <td>
                    <v-icon small>fa-jedi</v-icon>&nbsp;Héroïsme
                  </td>
                </tr>
                <tr>
                  <td>Kosmos</td>
                  <td>
                    <v-icon small>fa-jedi</v-icon>&nbsp;Héroïsme
                  </td>
                </tr>
                <tr>
                  <td>Devaloka</td>
                  <td>
                    <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                  </td>
                </tr>
                <tr>
                  <td>Nyx</td>
                  <td>
                    <v-icon small>fa-eye</v-icon>&nbsp;Prophètes
                  </td>
                </tr>
                <tr>
                  <td>Sheol</td>
                  <td>
                    <v-icon small>fa-user-friends</v-icon>&nbsp;Population
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
          Attention
          <v-spacer></v-spacer>
          <v-icon class="white--text">fa-radiation</v-icon>
        </v-card-title>
        <v-card-text
          class="mt-2"
        >L'envoi de la fiche d'ordre pour ce tour est définitif. Êtes-vous sûr(e) de vouloir l'envoyer maintenant ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="sendSheetDialog = false;">Annuler</v-btn>
          <v-btn text color="blue" @click="sendOrderSheet">Envoyer</v-btn>
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
    this.titanicPlanes = this.selectedGameTerritories.filter((t: Territory) => {
      return t.owner == "";
    });
    this.godPlanes = this.selectedGameTerritories.filter((t: Territory) => {
      return t.owner != "";
    });
    Object.assign(this.localPlayer, this.currentPlayer);
    this.fetchMyOrderSheets();
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
        return store.getters.playerSheets;
      },
      set: function(sheets: OrderSheet[]) {
        store.commit("setPlayerSheets", sheets);
      }
    },
    sheetSent: function() {
      var sheets = new Array<OrderSheet>();
      var gameTurn = store.getters.selectedGame.turn;
      Object.assign(sheets, store.getters.playerSheets);
      var indexOfTurnSheet = sheets.findIndex(
        (sheet: OrderSheet) => sheet.turn == gameTurn
      );

      return indexOfTurnSheet > -1;
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
    fateSortedTitanicPlanes: function(){
        var result = this.titanicPlanes.filter((t: Territory) => {
            return this.sheet.parameters.handBonusPlanes.indexOf(t._id) < 0;
        });
        return result;
    }
  },
  watch: {},
  methods: {
    addOrderToList(num: number) {
      if (this.currentOrderSheet.ordersSent.length < 6) {
        this.currentOrderSheet.ordersSent.push(num);
      }
    },
    orderInList: function(order: number) {
      return this.currentOrderSheet.ordersSent.indexOf(order) > -1;
    },
    disableOrder: function(order: number) {
      var oriOrdered = this.ordersOri.some(
        (r: number) => this.currentOrderSheet.ordersSent.indexOf(r) >= 0
      );
      var heroOrdered = this.ordersHero.some(
        (r: number) => this.currentOrderSheet.ordersSent.indexOf(r) >= 0
      );
      var armyOrdered = this.ordersArmy.some(
        (r: number) => this.currentOrderSheet.ordersSent.indexOf(r) >= 0
      );
      var popOrdered = this.ordersPop.some(
        (r: number) => this.currentOrderSheet.ordersSent.indexOf(r) >= 0
      );
      var prophOrdered = this.ordersProph.some(
        (r: number) => this.currentOrderSheet.ordersSent.indexOf(r) >= 0
      );
      var fateOrdered = this.ordersFate.some(
        (r: number) => this.currentOrderSheet.ordersSent.indexOf(r) >= 0
      );

      if (this.ordersOri.indexOf(order) > -1) {
        return oriOrdered;
      } else if (this.ordersArmy.indexOf(order) > -1) {
        return armyOrdered;
      } else if (this.ordersFate.indexOf(order) > -1) {
        return fateOrdered;
      } else if (this.ordersHero.indexOf(order) > -1) {
        return heroOrdered;
      } else if (this.ordersPop.indexOf(order) > -1) {
        return popOrdered;
      } else if (this.ordersProph.indexOf(order) > -1) {
        return prophOrdered;
      }
    },
    addOrder: function(order: number, resources: number) {
      this.sheet.ordersSent.push(order);
      Object.assign(this.currentOrderSheet, this.sheet);

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
      Object.assign(this.sheet, this.currentOrderSheet);
      this.sheet.ordersSent.splice(this.sheet.ordersSent.indexOf(order), 1);
      Object.assign(this.currentOrderSheet, this.sheet);

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
      this.currentOrderSheet.sent = true;
      store.dispatch("sendROTGOrderSheet", this.currentOrderSheet).then(() => {
        this.loadingSend = false;
        Object.assign(this.currentOrderSheet, new OrderSheet());
        this.fetchMyOrderSheets();
      });
    },
    fetchMyOrderSheets: function() {
      this.loadingSheets = true;
      store
        .dispatch("fetchROTGPlayerSheets", this.currentPlayer._id)
        .then(() => {
          this.loadingSheets = false;
        });
    },
    playerIsFlop3: function() {
      var nbPlayers = this.selectedGamePlayers.length;
      var indexFlop = nbPlayers > 3 ? nbPlayers - 4 : nbPlayers - 1;
      var indexOfPlayer = this.rankings.findIndex(
        (player: Player) => player._id == this.currentPlayer._id
      );
      return nbPlayers > 3
        ? indexOfPlayer > indexFlop
        : indexOfPlayer >= indexFlop;
    },
    saveSheetInStore: function() {
      Object.assign(this.currentOrderSheet, this.sheet);
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
      OrdersEnum.ORI_OPU,
      OrdersEnum.ORI_INVENT
    ],
    ordersArmy: [OrdersEnum.ARMY_ATTACK, OrdersEnum.ARMY_STABI],
    ordersHero: [
      OrdersEnum.HERO_GODBORN,
      OrdersEnum.HERO_EXPLO,
      OrdersEnum.HERO_TEAM
    ],
    ordersPop: [
      OrdersEnum.POP_INFO,
      OrdersEnum.POP_PLAN,
      OrdersEnum.POP_RECRUIT
    ],
    ordersProph: [
      OrdersEnum.PROPH_FORESEE,
      OrdersEnum.PROPH_INFILT,
      OrdersEnum.PROPH_SPY
    ],
    ordersFate: [
      OrdersEnum.FATE_CELEB,
      OrdersEnum.FATE_RITUAL,
      OrdersEnum.FATE_GOSSIP
    ]
  })
});
</script>