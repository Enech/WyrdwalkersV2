<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-title>
        Gestion des panthéons
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
              >Panthéon - {{this.editedItem.nameVF}}</span>
              <span class="headline" v-else>Nouveau panthéon</span>
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
                            v-model="editedItem.skillsWeights.athletics"
                            label="Athlétisme"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.rapport"
                            label="Rapport"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.engineering"
                            label="Ingénierie"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.combat"
                            label="Combat"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.lore"
                            label="Savoir"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.notice"
                            label="Perception"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.physique"
                            label="Physique"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.presence"
                            label="Présence"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.manipulation"
                            label="Manipulation"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.resources"
                            label="Ressources"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.marksmanship"
                            label="Tir"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.stealth"
                            label="Furtivité"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <v-text-field
                            v-model="editedItem.skillsWeights.will"
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
                                  v-model="editedItem.legendaryWeights.druidGreen"
                                  label="Druidisme Vert"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.druidTechno"
                                  label="Technodruidisme"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="3">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.druidTherianthropy"
                                  label="Thériantropie"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.druidMythcalling"
                                  label="Mythcalling"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.druidAugury"
                                  label="Augure"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.druidFeySummer"
                                  label="Fey - Eté"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.druidFeyWinter"
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
                                  v-model="editedItem.legendaryWeights.hemaItztli"
                                  label="Itztli"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.hemaYahuar"
                                  label="Yahuar"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.hemaRiastrad"
                                  label="Riastrad"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.hemaHaruspicy"
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
                                  v-model="editedItem.legendaryWeights.wyrdMystery"
                                  label="Mystère"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.wyrdProphecy"
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
                                  v-model="editedItem.legendaryWeights.taiyiNature"
                                  label="Nature"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.taiyiFlow"
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
                                  v-model="editedItem.legendaryWeights.physioStrength"
                                  label="Force"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioToughness"
                                  label="Constitution"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioSpeed"
                                  label="Vitesse"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioBeauty"
                                  label="Beauté"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioUgly"
                                  label="Laideur"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioPresence"
                                  label="Présence"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioEaring"
                                  label="Ouïe"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioTouch"
                                  label="Toucher"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioSmell"
                                  label="Odorat"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioTaste"
                                  label="Goût"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.physioSight"
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
                                  v-model="editedItem.legendaryWeights.fireDestruction"
                                  label="Destruction"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.fireStrife"
                                  label="Discorde"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.fireInvention"
                                  label="Invention"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.fireMagma"
                                  label="Magma"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.fireDrought"
                                  label="Sécheresse"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.fireLife"
                                  label="Vie"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.fireRetribution"
                                  label="Rétribution"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.fireStellar"
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
                                  v-model="editedItem.legendaryWeights.waterProvider"
                                  label="Pourvoyeuse"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="3">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.waterLife"
                                  label="Vie"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.waterSea"
                                  label="Mer Déchainée"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.waterHeal"
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
                                  v-model="editedItem.legendaryWeights.lightBrightness"
                                  label="Brillance"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.lightSun"
                                  label="Soleil"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.lightIllumination"
                                  label="Illumination"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.lightGlory"
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
                                  v-model="editedItem.legendaryWeights.skyCalm"
                                  label="Calme"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.skyCataclysm"
                                  label="Cataclysme"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.skyTempest"
                                  label="Tempête"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.skyRain"
                                  label="Pluie"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.skyLightning"
                                  label="Eclairs"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.skyWind"
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
                                  v-model="editedItem.legendaryWeights.earthLife"
                                  label="Vie"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.earthStone"
                                  label="Roche"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.earthExpanse"
                                  label="Etendue"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.earthNature"
                                  label="Nature"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.earthCataclysm"
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
                                  v-model="editedItem.legendaryWeights.depthsUnderground"
                                  label="Cavernes"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.depthsDarkness"
                                  label="Obscurité"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.depthsAbyss"
                                  label="Abysses"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.depthsRiches"
                                  label="Abondance"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.depthsDecay"
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
                                  v-model="editedItem.legendaryWeights.deathIneluctability"
                                  label="Inéluctabilité"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.deathHorror"
                                  label="Horreur"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.deathExtinction"
                                  label="Extinction"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.deathJourney"
                                  label="Voyage"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.deathPeace"
                                  label="Paix"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.deathCold"
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
                                  v-model="editedItem.legendaryWeights.nightVeil"
                                  label="Voile"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.nightTerror"
                                  label="Terreur"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.nightSleep"
                                  label="Sommeil"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.nightShadows"
                                  label="Ombres"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.nightStars"
                                  label="Etoiles"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.nightVoid"
                                  label="Néant"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.nightMoon"
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
                                  v-model="editedItem.legendaryWeights.orderLaw"
                                  label="Loi"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.orderKnowledge"
                                  label="Savoir"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.orderControl"
                                  label="Contrôle"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.orderGravity"
                                  label="Gravité"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.orderMusic"
                                  label="Musique"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.orderSelfless"
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
                                  v-model="editedItem.legendaryWeights.soulNecromancy"
                                  label="Nécromancie"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.soulSoulbinding"
                                  label="Soulbinding"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.soulShamanism"
                                  label="Shamanisme"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.soulChwal"
                                  label="Chwal"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.soulHaunting"
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
                                  v-model="editedItem.legendaryWeights.enech"
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
                                  v-model="editedItem.legendaryWeights.arcanaCarvings"
                                  label="Inscriptions"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.arcanaHeku"
                                  label="Heku"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.arcanaAlchemy"
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
                                  v-model="editedItem.legendaryWeights.middleWay"
                                  label="Voie du Milieu"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.isfet"
                                  label="Isfet"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.kannagara"
                                  label="Kannagara"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6" sm="2">
                                <v-text-field
                                  v-model="editedItem.legendaryWeights.nihilism"
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
                @click="addPantheon();"
                :disabled="editedItem.nameVF.length < 2"
                v-else
              >Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-data-table :items="pantheons" :loading="loading" :headers="headers">
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
            <span class="headline">Suppression d'un panthéon</span>
          </v-card-title>
          <v-card-text>Vous êtes sur le point de supprimer un panthéon. Cette action est définitive. Êtes-vous sûr de vouloir continuer ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="deleteDialog = false;">Annuler</v-btn>
            <v-btn color="red" text @click="deletePantheon()">Supprimer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../../store";
import Pantheon from "../../../../model/explorer/Pantheon.model";

export default Vue.extend({
  name: "AdminPantheon",
  created: function() {
    this.fetchPantheons();
  },
  computed: {
    pantheons: function() {
      return store.getters.pantheons;
    }
  },
  methods: {
    fetchPantheons: function() {
      this.loading = true;
      store.dispatch("fetchPantheons").then(() => {
        this.loading = false;
      });
    },
    addPantheon: function() {
      store.dispatch("addPantheon", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem, new Pantheon());
      });
    },
    sendUpdate: function() {
      store.dispatch("updatePantheon", this.editedItem).then(() => {
        this.closeDialog();
        Object.assign(this.editedItem, new Pantheon());
      });
    },
    deletePantheon: function() {
      store.dispatch("deletePantheon", this.editedItem).then(() => {
        this.deleteDialog = false;
        this.fetchPantheons();
        Object.assign(this.editedItem, new Pantheon());
      });
    },
    openDialog: function(pantheon: Pantheon) {
      Object.assign(this.editedItem, pantheon);
      this.dialog = true;
    },
    closeDialog: function() {
      Object.assign(this.editedItem, new Pantheon());
      this.dialog = false;
      this.fetchPantheons();
    }
  },
  data: () => ({
    dialog: false,
    deleteDialog: false,
    editedItem: new Pantheon(),
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
      title: "Backoffice Panthéons",
      link: [{ rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }]
    };
  }
});
</script>