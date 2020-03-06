<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>
        Gestion des personnalités
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="1000px" persistent>
          <template v-slot:activator="{ on }">
            <v-btn icon color="blue" class="mb-2" v-on="on" dark>
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="black white--text">
              <span
                class="headline"
                v-if="this.editedItem._id != ''"
              >Personnalité - {{this.editedItem.nameVF}}</span>
              <span class="headline" v-else>Nouvelle personnalité</span>
              <v-spacer></v-spacer>
              <v-btn text icon dark @click="closeDialog()">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.nameVF" label="Nom (VF)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editedItem.name" label="Name (VO)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field v-model="editedItem.logos" label="Score Logos"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field v-model="editedItem.kosmos" label="Score Kosmos"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field v-model="editedItem.eros" label="Score Eros"></v-text-field>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                 <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Talents</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.athletics.poids"
                            label="Athlétisme"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.rapport.poids"
                            label="Rapport"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.engineering.poids"
                            label="Ingénierie"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.combat.poids"
                            label="Combat"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.lore.poids"
                            label="Savoir"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.notice.poids"
                            label="Perception"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.physique.poids"
                            label="Physique"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.presence.poids"
                            label="Présence"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.manipulation.poids"
                            label="Manipulation"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.resources.poids"
                            label="Ressources"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.marksmanship.poids"
                            label="Tir"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.stealth.poids"
                            label="Furtivité"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.will.poids"
                            label="Volonté"
                            type="number"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Pouvoirs</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-expansion-panels>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Druidisme</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.druidGreen.poids"
                                  label="Druidisme Vert"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.druidTechno.poids"
                                  label="Technodruidisme"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="3">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.druidTherianthropy.poids"
                                  label="Thériantropie"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.druidMythcalling.poids"
                                  label="Mythcalling"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.druidAugury.poids"
                                  label="Augure"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.druidFeySummer.poids"
                                  label="Fey - Eté"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.druidFeyWinter.poids"
                                  label="Fey - Hiver"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Hématurgie</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.hemaItztli.poids"
                                  label="Itztli"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.hemaYahuar.poids"
                                  label="Yahuar"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.hemaRiastrad.poids"
                                  label="Riastrad"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.hemaHaruspicy.poids"
                                  label="Haruspices"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Vision du Wyrd</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.wyrdMystery.poids"
                                  label="Mystère"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.wyrdProphecy.poids"
                                  label="Prophétie"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Taiyi</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.taiyiNature.poids"
                                  label="Nature"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.taiyiFlow.poids"
                                  label="Flot"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Physiologie Epique</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioStrength.poids"
                                  label="Force"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioToughness.poids"
                                  label="Constitution"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioSpeed.poids"
                                  label="Vitesse"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioBeauty.poids"
                                  label="Beauté"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioUgly.poids"
                                  label="Laideur"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioPresence.poids"
                                  label="Présence"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioEaring.poids"
                                  label="Ouïe"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioTouch.poids"
                                  label="Toucher"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioSmell.poids"
                                  label="Odorat"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioTaste.poids"
                                  label="Goût"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioSight.poids"
                                  label="Vision"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Invocation : Feu</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.fireDestruction.poids"
                                  label="Destruction"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.fireStrife.poids"
                                  label="Discorde"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.fireInvention.poids"
                                  label="Invention"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.fireMagma.poids"
                                  label="Magma"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.fireDrought.poids"
                                  label="Sécheresse"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.fireLife.poids"
                                  label="Vie"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.fireRetribution.poids"
                                  label="Rétribution"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.fireStellar.poids"
                                  label="Feu Stellaire"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Invocation : Eau</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.waterProvider.poids"
                                  label="Pourvoyeuse"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="3">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.waterLife.poids"
                                  label="Vie"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.waterSea.poids"
                                  label="Mer Déchainée"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.waterHeal.poids"
                                  label="Soin"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Invocation : Lumière</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.lightBrightness.poids"
                                  label="Brillance"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.lightSun.poids"
                                  label="Soleil"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.lightIllumination.poids"
                                  label="Illumination"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.lightGlory.poids"
                                  label="Gloire"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Invocation : Ciel</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.skyCalm.poids"
                                  label="Calme"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.skyCataclysm.poids"
                                  label="Cataclysme"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.skyTempest.poids"
                                  label="Tempête"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.skyRain.poids"
                                  label="Pluie"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.skyLightning.poids"
                                  label="Eclairs"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.skyWind.poids"
                                  label="Vent"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Invocation : Terre</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.earthLife.poids"
                                  label="Vie"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.earthStone.poids"
                                  label="Roche"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.earthExpanse.poids"
                                  label="Etendue"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.earthNature.poids"
                                  label="Nature"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.earthCataclysm.poids"
                                  label="Cataclysme"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Invocation : Profondeurs</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.depthsUnderground.poids"
                                  label="Cavernes"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.depthsDarkness.poids"
                                  label="Obscurité"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.depthsAbyss.poids"
                                  label="Abysses"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.depthsRiches.poids"
                                  label="Abondance"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.depthsDecay.poids"
                                  label="Décomposition"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Invocation : Mort</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.deathIneluctability.poids"
                                  label="Inéluctabilité"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.deathHorror.poids"
                                  label="Horreur"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.deathExtinction.poids"
                                  label="Extinction"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.deathJourney.poids"
                                  label="Voyage"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.deathPeace.poids"
                                  label="Paix"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.deathCold.poids"
                                  label="Froid"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Invocation : Nuit</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.nightVeil.poids"
                                  label="Voile"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.nightTerror.poids"
                                  label="Terreur"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.nightSleep.poids"
                                  label="Sommeil"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.nightShadows.poids"
                                  label="Ombres"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.nightStars.poids"
                                  label="Etoiles"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.nightVoid.poids"
                                  label="Néant"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.nightMoon.poids"
                                  label="Lune"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Invocation : Ordre</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.orderLaw.poids"
                                  label="Loi"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.orderKnowledge.poids"
                                  label="Savoir"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.orderControl.poids"
                                  label="Contrôle"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.orderGravity.poids"
                                  label="Gravité"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.orderMusic.poids"
                                  label="Musique"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.orderSelfless.poids"
                                  label="Abnégation"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Magie des âmes</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.soulNecromancy.poids"
                                  label="Nécromancie"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.soulSoulbinding.poids"
                                  label="Soulbinding"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.soulShamanism.poids"
                                  label="Shamanisme"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.soulChwal.poids"
                                  label="Chwal"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.soulHaunting.poids"
                                  label="Envoûtement"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Enech</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.enech.poids"
                                  label="Enech"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Arcana</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.arcanaCarvings.poids"
                                  label="Inscriptions"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.arcanaHeku.poids"
                                  label="Heku"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.arcanaAlchemy.poids"
                                  label="Alchimie"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Eveillés</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.middleWay.poids"
                                  label="Voie du Milieu"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.isfet.poids"
                                  label="Isfet"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.kannagara.poids"
                                  label="Kannagara"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.nihilism.poids"
                                  label="Nihilisme"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" text @click="closeDialog();">Annuler</v-btn>
              <v-btn
                color="blue"
                text
                @click="sendUpdate();"
                :disabled="editedItem.nameVF.length < 2"
                v-if="this.editedItem._id != ''"
              >Modifier</v-btn>
              <v-btn
                color="blue"
                text
                @click="addPersonality();"
                :disabled="editedItem.nameVF.length < 2"
                v-else
              >Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-data-table :items="personalities" :loading="loading" :headers="headers">
        <template v-slot:item.action="{ item }">
          <v-btn fab small dark color="light-blue" @click.stop="openDialog(item)">
            <v-icon small>edit</v-icon>
          </v-btn>
          <v-btn fab small dark color="red" @click.stop="editedItem = item; deleteDialog = true;">
            <v-icon small>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="deleteDialog" max-width="500px" persistent>
        <v-card>
          <v-card-title>
            <span class="headline">Suppression d'une personnalité</span>
          </v-card-title>
          <v-card-text>Vous êtes sur le point de supprimer une personnalité. Cette action est définitive. Êtes-vous sûr de vouloir continuer ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="deleteDialog = false;">Annuler</v-btn>
            <v-btn color="red" text @click="deletePersonality()">Supprimer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../../store";
import Personality from "../../../../model/explorer/Personality.model";

export default Vue.extend({
  name: "AdminPersonality",
  created: function() {
    this.fetchPersonalities();
  },
  computed: {
    personalities: function() {
      return store.getters.personalities;
    }
  },
  methods: {
    fetchPersonalities: function() {
      this.loading = true;
      store.dispatch("fetchPersonalities").then(() => {
        this.loading = false;
      });
    },
    addPersonality: function() {
      store.dispatch("addPersonality", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem, new Personality());
      });
    },
    sendUpdate: function() {
      store.dispatch("updatePersonality", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem, new Personality());
      });
    },
    deletePersonality: function() {
      store.dispatch("deletePersonality", this.editedItem).then(() => {
        this.deleteDialog = false;
        this.fetchPersonalities();
        Object.assign(this.editedItem, new Personality());
      });
    },
    openDialog: function(domaine: Personality) {
      Object.assign(this.editedItem, domaine);
      this.dialog = true;
    },
    closeDialog: function() {
      Object.assign(this.editedItem, new Personality());
      this.dialog = false;
      this.fetchPersonalities();
    }
  },
  data: () => ({
    dialog: false,
    deleteDialog: false,
    editedItem: new Personality(),
    openDates: false,
    dateResult: "",
    loading: false,
    headers: [
      { text: "Nom (VF)", value: "nameVF" },
      { text: "Name (VO)", value: "name" },
      { text: "Logos", value: "logos" },
      { text: "Kosmos", value: "kosmos" },
      { text: "Eros", value: "eros" },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  metaInfo: function() {
    return {
      title: "Backoffice Personnalités",
      link: [{ rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }]
    };
  }
});
</script>