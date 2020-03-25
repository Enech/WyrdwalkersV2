<template>
  <div class="pa-3" id="app-content-custom">
    <v-card class="mb-3 text-justify pa-3">
      <h3
        class="display-1 font-weight-light uppercase pa-3 text-center"
      >{{$t("wiki.contents.home.header")}}</h3>
      <v-card-subtitle class="title text-center">{{$t("wiki.contents.home.subheader")}}</v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-dialog v-model="explorerDialog" max-width="1000" persistent scrollable>
          <template v-slot:activator="{ on }">
            <v-btn outlined color="red" class="mb-3" v-on="on">
              <v-icon left small>fa-dungeon</v-icon>
              {{$t("wiki.contents.home.action")}}
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="black white--text">
              <v-btn dark icon v-if="selectedWikiTree.key != 'origin'" @click="findParentNode()">
                <v-icon>arrow_back</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <span>{{$t("wiki.contents.explorer.title")}}</span>
              <v-spacer></v-spacer>
              <v-btn dark icon @click="closeExplorerDialog()">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text :max-height="dialogHeight">
              <v-row class="text-center">
                <v-col
                  cols="12"
                  sm="6"
                  v-for="(child, index) in selectedWikiTree.children"
                  :key="index"
                >
                  <explorer-tree :wikiNode="child" :parentNode="selectedWikiTree" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card class="mb-3 text-justify pa-3" min-height="500">
          <v-card-title class="justify-center">{{$t("wiki.contents.home.whatis.title")}}</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="subtitle-1" v-html="$t('wiki.contents.home.whatis.content')">
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card class="mb-3 text-justify pa-3" min-height="500">
          <v-card-title class="justify-center">{{$t("wiki.contents.home.links.title")}}</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="subtitle-1"><span v-html="$t('wiki.contents.home.links.content')"></span>&nbsp;<v-icon>arrow_upward</v-icon>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="parallax-container mb-3">
      <v-parallax dark src="@/assets/WikiHome.webp" eager :height="300">
        <v-row justify="center" align="center" class="full-height">
          <v-col cols="12" class="text-center full-height">
            <div class="logo-container">
              <img class="main-logo" src="@/assets/Logo_NoSnake.webp" />
              <img class="spinning-logo" src="@/assets/Ouroboros.webp" />
            </div>
          </v-col>
        </v-row>
      </v-parallax>
    </div>
    <v-card class="mt-3 text-justify pa-3">
      <p class="body-1 article-look-3" v-html="$t('wiki.contents.home.text')"></p>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import WikiHomeExplorer from "../../../components/wiki/HomeExplorerTree.vue";
import LandingTree from "../../../model/WikiLandingTree.model";

export default Vue.extend({
  name: "WikiHome",
  components: {
    "explorer-tree": WikiHomeExplorer
  },
  computed: {
    selectedWikiTree: {
      get: function() {
        return store.getters.selectedWikiTree;
      },
      set: function(tree: LandingTree) {
        store.commit("setSelectedWikiTree", tree);
      }
    },
    wikiTreeHistory: {
      get: function() {
        return store.getters.wikiTreeHistory;
      },
      set: function(history: LandingTree[]) {
        store.commit("setWikiTreeHistory", history);
      }
    },
    dialogHeight: function() {
      return this.$vuetify.breakpoint.xs ? 400 : 800;
    }
  },
  created: function() {
    this.selectedWikiTree = this.tree;
  },
  methods: {
    closeExplorerDialog: function() {
      this.explorerDialog = false;
      this.selectedWikiTree = this.tree;
      this.wikiTreeHistory = new Array<LandingTree>();
    },
    findParentNode: function() {
      var lastNodeSelected = this.wikiTreeHistory[
        this.wikiTreeHistory.length - 1
      ];
      this.wikiTreeHistory.pop();
      this.selectedWikiTree = lastNodeSelected;
    }
  },
  data: () => ({
    parentNode: new LandingTree(),
    explorerDialog: false,
    tree: {
      key: "origin",
      parentKey: "",
      children: [
        {
          key: "characters",
          title: "wiki.contents.explorer.characters.title",
          description:
            "wiki.contents.explorer.characters.description",
          picture: "/ressources/wiki-landing/ExplorerCharacters.webp",
          parentKey: "origin",
          children: [
            {
              key: "gods",
              title: "wiki.contents.explorer.characters.content.gods.title",
              description:
                "wiki.contents.explorer.characters.content.gods.description",
              picture: "/ressources/wiki-landing/ExplorerGods.webp",
              parentKey: "characters",
              wikiLink: "/wiki/lore/dieux",
              children: [
                {
                  key: "aesir",
                  title: "wiki.contents.explorer.characters.content.gods.content.aesir.title",
                  description:
                    "wiki.contents.explorer.characters.content.gods.content.aesir.description",
                  picture: "/ressources/wiki-landing/ExplorerAesir.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/aesir",
                  children: []
                },
                {
                  key: "amatsukami",
                  title: "wiki.contents.explorer.characters.content.gods.content.amatsukami.title",
                  description:
                    "wiki.contents.explorer.characters.content.gods.content.amatsukami.description",
                  picture: "/ressources/wiki-landing/ExplorerAmatsukami.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/amatsukami",
                  children: []
                },
                {
                  key: "ayllus",
                  title: "wiki.contents.explorer.characters.content.gods.content.ayllus.title",
                  description:
                    "wiki.contents.explorer.characters.content.gods.content.ayllus.description",
                  picture: "/ressources/wiki-landing/ExplorerAyllus.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/ayllus",
                  children: []
                },
                {
                  key: "bureaucracy",
                  title: "wiki.contents.explorer.characters.content.gods.content.bureaucracy.title",
                  description:
                    "wiki.contents.explorer.characters.content.gods.content.bureaucracy.description",
                  picture: "/ressources/wiki-landing/ExplorerBurCel.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/bureaucratie-céleste",
                  children: []
                },
                {
                  key: "deva",
                  title: "wiki.contents.explorer.characters.content.gods.content.deva.title",
                  description:
                    "wiki.contents.explorer.characters.content.gods.content.deva.description",
                  picture: "/ressources/wiki-landing/ExplorerDeva.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/deva",
                  children: []
                },
                {
                  key: "kasunel",
                  title: "wiki.contents.explorer.characters.content.gods.content.kasunel.title",
                  description:
                    "wiki.contents.explorer.characters.content.gods.content.kasunel.description",
                  picture: "/ressources/wiki-landing/ExplorerMaya.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/k'asunel",
                  children: []
                },
                {
                  key: "neter",
                  title: "wiki.contents.explorer.characters.content.gods.content.neter.title",
                  description:
                    "wiki.contents.explorer.characters.content.gods.content.neter.description",
                  picture: "/ressources/wiki-landing/ExplorerNeter.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/neter",
                  children: []
                },
                {
                  key: "nga",
                  title: "wiki.contents.explorer.characters.content.gods.content.nga.title",
                  description:
                    "wiki.contents.explorer.characters.content.gods.content.nga.description",
                  picture: "/ressources/wiki-landing/ExplorerNga.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/nga-tama-a-rangi",
                  children: []
                },
                {
                  key: "orisha",
                  title: "wiki.contents.explorer.characters.content.gods.content.orisha.title",
                  description:
                    "wiki.contents.explorer.characters.content.gods.content.orisha.description",
                  picture: "/ressources/wiki-landing/ExplorerOrisha.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/orisha",
                  children: []
                },
                {
                  key: "teotl",
                  title: "wiki.contents.explorer.characters.content.gods.content.teotl.title",
                  description:
                    "wiki.contents.explorer.characters.content.gods.content.teotl.description",
                  picture: "/ressources/wiki-landing/ExplorerTeotl.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/teotl",
                  children: []
                },
                {
                  key: "theoi",
                  title: "wiki.contents.explorer.characters.content.gods.content.theoi.title",
                  description:
                    "wiki.contents.explorer.characters.content.gods.content.theoi.description",
                  picture: "/ressources/wiki-landing/ExplorerTheoi.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/theoi",
                  children: []
                },
                {
                  key: "tuatha",
                  title: "wiki.contents.explorer.characters.content.gods.content.tuatha.title",
                  description:
                    "wiki.contents.explorer.characters.content.gods.content.tuatha.description",
                  picture: "/ressources/wiki-landing/ExplorerTuatha.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/tuatha-dé-danann",
                  children: []
                }
              ]
            },
            {
              key: "titans",
              title: "wiki.contents.explorer.characters.content.titans.title",
              description:
                "wiki.contents.explorer.characters.content.titans.description",
              picture: "/ressources/wiki-landing/ExplorerTitans.webp",
              parentKey: "characters",
              wikiLink: "/wiki/lore/titans",
              children: [
                {
                  key: "light",
                  title: "wiki.contents.explorer.characters.content.titans.content.light.title",
                  description:
                    "wiki.contents.explorer.characters.content.titans.content.light.description",
                  picture: "/ressources/wiki-landing/ExplorerLight.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/aether",
                  children: []
                },
                {
                  key: "air",
                  title: "wiki.contents.explorer.characters.content.titans.content.air.title",
                  description:
                    "wiki.contents.explorer.characters.content.titans.content.air.description",
                  picture: "/ressources/wiki-landing/ExplorerAir.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/amaunet",
                  children: []
                },
                {
                  key: "order",
                  title: "wiki.contents.explorer.characters.content.titans.content.order.title",
                  description:
                    "wiki.contents.explorer.characters.content.titans.content.order.description",
                  picture: "/ressources/wiki-landing/ExplorerOrder.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/kosmos",
                  children: []
                },
                {
                  key: "fire",
                  title: "wiki.contents.explorer.characters.content.titans.content.fire.title",
                  description:
                    "wiki.contents.explorer.characters.content.titans.content.fire.description",
                  picture: "/ressources/wiki-landing/ExplorerFire.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/muspelheim",
                  children: []
                },
                {
                  key: "night",
                  title: "wiki.contents.explorer.characters.content.titans.content.night.title",
                  description:
                    "wiki.contents.explorer.characters.content.titans.content.night.description",
                  picture: "/ressources/wiki-landing/ExplorerNight.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/nyx",
                  children: []
                },
                {
                  key: "water",
                  title: "wiki.contents.explorer.characters.content.titans.content.water.title",
                  description:
                    "wiki.contents.explorer.characters.content.titans.content.water.description",
                  picture: "/ressources/wiki-landing/ExplorerWater.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/oceanus",
                  children: []
                },
                {
                  key: "depths",
                  title: "wiki.contents.explorer.characters.content.titans.content.depths.title",
                  description:
                    "wiki.contents.explorer.characters.content.titans.content.depths.description",
                  picture: "/ressources/wiki-landing/ExplorerDepths.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/patala",
                  children: []
                },
                {
                  key: "death",
                  title: "wiki.contents.explorer.characters.content.titans.content.death.title",
                  description:
                    "wiki.contents.explorer.characters.content.titans.content.death.description",
                  picture: "/ressources/wiki-landing/ExplorerDeath.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/sheol",
                  children: []
                },
                {
                  key: "earth",
                  title: "wiki.contents.explorer.characters.content.titans.content.earth.title",
                  description:
                    "wiki.contents.explorer.characters.content.titans.content.earth.description",
                  picture: "/ressources/wiki-landing/ExplorerEarth.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/terra",
                  children: []
                }
              ]
            },
            {
              key: "mythborns",
              title: "wiki.contents.explorer.characters.content.mythborns.title",
              description:
                "wiki.contents.explorer.characters.content.mythborns.description",
              picture: "/ressources/wiki-landing/ExplorerMythborns.webp",
              parentKey: "characters",
              wikiLink: "/wiki/lore/mythborns",
              children: [
                {
                  key: "dragons",
                  title: "wiki.contents.explorer.characters.content.mythborns.content.dragons.title",
                  description:
                    "wiki.contents.explorer.characters.content.mythborns.content.dragons.description",
                  picture: "/ressources/wiki-landing/ExplorerDragons.webp",
                  parentKey: "mythborns",
                  wikiLink: "/wiki/lore/dragons",
                  children: []
                },
                {
                  key: "garous",
                  title: "wiki.contents.explorer.characters.content.mythborns.content.garous.title",
                  description:
                    "wiki.contents.explorer.characters.content.mythborns.content.garous.description",
                  picture: "/ressources/wiki-landing/ExplorerGarous.webp",
                  parentKey: "mythborns",
                  wikiLink: "/wiki/lore/garous",
                  children: []
                },
                {
                  key: "rakshasas",
                  title: "wiki.contents.explorer.characters.content.mythborns.content.rakshasas.title",
                  description:
                    "wiki.contents.explorer.characters.content.mythborns.content.rakshasas.description",
                  picture: "/ressources/wiki-landing/ExplorerRakshasas.webp",
                  parentKey: "mythborns",
                  wikiLink: "/wiki/lore/rakshasas",
                  children: []
                },
                {
                  key: "fey",
                  title: "wiki.contents.explorer.characters.content.mythborns.content.feys.title",
                  description:
                    "wiki.contents.explorer.characters.content.mythborns.content.feys.description",
                  picture: "/ressources/wiki-landing/ExplorerFeys.webp",
                  parentKey: "mythborns",
                  wikiLink: "/wiki/lore/fey",
                  children: []
                },
                {
                  key: "nains",
                  title: "wiki.contents.explorer.characters.content.mythborns.content.dwarves.title",
                  description:
                    "wiki.contents.explorer.characters.content.mythborns.content.dwarves.description",
                  picture: "/ressources/wiki-landing/ExplorerNains.webp",
                  parentKey: "mythborns",
                  wikiLink: "/wiki/lore/nains",
                  children: []
                },
                {
                  key: "asuras",
                  title: "wiki.contents.explorer.characters.content.mythborns.content.asuras.title",
                  description:
                    "wiki.contents.explorer.characters.content.mythborns.content.asuras.description",
                  picture: "/ressources/wiki-landing/ExplorerAsuras.webp",
                  parentKey: "mythborns",
                  wikiLink: "/wiki/lore/asuras",
                  children: []
                }
              ]
            },
            {
              key: "enlight",
              title: "wiki.contents.explorer.characters.content.enlightened.title",
              description:
                "wiki.contents.explorer.characters.content.enlightened.description",
              picture: "/ressources/wiki-landing/ExplorerEveilles.webp",
              parentKey: "characters",
              wikiLink: "/wiki/lore/éveillé",
              children: [
                {
                  key: "illuminati",
                  title: "wiki.contents.explorer.characters.content.enlightened.content.illuminati.title",
                  description:
                    "wiki.contents.explorer.characters.content.enlightened.content.illuminati.description",
                  picture: "/ressources/wiki-landing/ExplorerIlluminati.webp",
                  parentKey: "enlight",
                  wikiLink: "/wiki/lore/illuminati",
                  children: []
                },
                {
                  key: "merlin",
                  title: "wiki.contents.explorer.characters.content.enlightened.content.merlin.title",
                  description:
                    "wiki.contents.explorer.characters.content.enlightened.content.merlin.description",
                  picture: "/ressources/wiki-landing/ExplorerMerlin.webp",
                  parentKey: "enlight",
                  wikiLink: "/wiki/lore/cercle de merlin",
                  children: []
                },
                {
                  key: "cabale",
                  title: "wiki.contents.explorer.characters.content.enlightened.content.cabale.title",
                  description:
                    "wiki.contents.explorer.characters.content.enlightened.content.cabale.description",
                  picture: "/ressources/wiki-landing/ExplorerCabale.webp",
                  parentKey: "enlight",
                  wikiLink: "/wiki/lore/cabale",
                  children: []
                },
                {
                  key: "poingJade",
                  title: "wiki.contents.explorer.characters.content.enlightened.content.fist.title",
                  description:
                    "wiki.contents.explorer.characters.content.enlightened.content.fist.description",
                  picture: "/ressources/wiki-landing/ExplorerJade.webp",
                  parentKey: "enlight",
                  wikiLink: "/wiki/lore/ordre du poing de jade",
                  children: []
                }
              ]
            }
          ]
        },
        {
          key: "locations",
          title: "wiki.contents.explorer.locations.title",
          description:
            "wiki.contents.explorer.locations.description",
          picture: "/ressources/wiki-landing/ExplorerLocations.webp",
          parentKey: "origin",
          children: [
            {
              key: "monde",
              title: "wiki.contents.explorer.locations.content.world.title",
              description:
                "wiki.contents.explorer.locations.content.world.description",
              picture: "/ressources/wiki-landing/ExplorerMonde.webp",
              parentKey: "locations",
              wikiLink: "/wiki/lore/monde",
              children: []
            },
            {
              key: "outreMonde",
              title: "wiki.contents.explorer.locations.content.otherworld.title",
              description:
                "wiki.contents.explorer.locations.content.otherworld.description",
              picture: "/ressources/wiki-landing/ExplorerOutresMondes.webp",
              parentKey: "locations",
              wikiLink: "/wiki/lore/outres-mondes",
              children: [
                {
                  key: "foretNoire",
                  title: "wiki.contents.explorer.locations.content.otherworld.content.forest.title",
                  description:
                    "wiki.contents.explorer.locations.content.otherworld.content.forest.description",
                  picture: "/ressources/wiki-landing/ExplorerForest.webp",
                  parentKey: "outreMonde",
                  wikiLink: "/wiki/lore/forêt-noire",
                  children: []
                },
                {
                  key: "shambhala",
                  title: "wiki.contents.explorer.locations.content.otherworld.content.shambhala.title",
                  description:
                    "wiki.contents.explorer.locations.content.otherworld.content.shambhala.description",
                  picture: "/ressources/wiki-landing/ExplorerShambhala.webp",
                  parentKey: "outreMonde",
                  wikiLink: "/wiki/lore/shambhala",
                  children: []
                },
                {
                  key: "utopia",
                  title: "wiki.contents.explorer.locations.content.otherworld.content.utopia.title",
                  description:
                    "wiki.contents.explorer.locations.content.otherworld.content.utopia.description",
                  picture: "/ressources/wiki-landing/ExplorerUtopia.webp",
                  parentKey: "outreMonde",
                  wikiLink: "/wiki/lore/utopia",
                  children: []
                },
                {
                  key: "fairie",
                  title: "wiki.contents.explorer.locations.content.otherworld.content.fairie.title",
                  description:
                    "wiki.contents.explorer.locations.content.otherworld.content.fairie.description",
                  picture: "/ressources/wiki-landing/ExplorerFairie.webp",
                  parentKey: "outreMonde",
                  wikiLink: "/wiki/lore/fairie",
                  children: []
                },
                {
                  key: "elDorado",
                  title: "wiki.contents.explorer.locations.content.otherworld.content.eldorado.title",
                  description:
                    "wiki.contents.explorer.locations.content.otherworld.content.eldorado.description",
                  picture: "/ressources/wiki-landing/ExplorerDorado.webp",
                  parentKey: "outreMonde",
                  wikiLink: "/wiki/lore/el-dorado",
                  children: []
                },
                {
                  key: "merJade",
                  title: "wiki.contents.explorer.locations.content.otherworld.content.jadesea.title",
                  description:
                    "wiki.contents.explorer.locations.content.otherworld.content.jadesea.description",
                  picture: "/ressources/wiki-landing/ExplorerMerJade.webp",
                  parentKey: "outreMonde",
                  wikiLink: "/wiki/lore/mer-de-jade",
                  children: []
                }
              ]
            },
            {
              key: "overworld",
              title: "wiki.contents.explorer.locations.content.overworld.title",
              description:
                "wiki.contents.explorer.locations.content.overworld.description",
              picture: "/ressources/wiki-landing/ExplorerOverworld.webp",
              parentKey: "locations",
              wikiLink: "/wiki/lore/overworld",
              children: [
                {
                  key: "godrealm",
                  title: "wiki.contents.explorer.locations.content.overworld.content.godrealms.title",
                  description:
                    "wiki.contents.explorer.locations.content.overworld.content.godrealms.description",
                  picture: "/ressources/wiki-landing/ExplorerHeavens.webp",
                  parentKey: "locations",
                  wikiLink: "/wiki/lore/royaume-divin",
                  children: [
                    {
                      key: "aunu",
                      title: "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.aunu.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.aunu.description",
                      picture: "/ressources/wiki-landing/ExplorerAunu.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/aunu",
                      children: []
                    },
                    {
                      key: "asgard",
                      title: "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.asgard.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.asgard.description",
                      picture: "/ressources/wiki-landing/ExplorerAsgard.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/asgard",
                      children: []
                    },
                    {
                      key: "devaloka",
                      title: "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.devaloka.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.devaloka.description",
                      picture: "/ressources/wiki-landing/ExplorerDevaloka.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/devaloka",
                      children: []
                    },
                    {
                      key: "hanan",
                      title: "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.hanan.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.hanan.description",
                      picture: "/ressources/wiki-landing/ExplorerHanan.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/hanan-pacha",
                      children: []
                    },
                    {
                      key: "ikole",
                      title: "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.ikole.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.ikole.description",
                      picture: "/ressources/wiki-landing/ExplorerIkole.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/ikole-orun",
                      children: []
                    },
                    {
                      key: "kahiki",
                      title: "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.kahiki.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.kahiki.description",
                      picture: "/ressources/wiki-landing/ExplorerKahiki.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/kahiki",
                      children: []
                    },
                    {
                      key: "olympe",
                      title: "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.olympe.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.olympe.description",
                      picture: "/ressources/wiki-landing/ExplorerOlympe.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/olympe",
                      children: []
                    },
                    {
                      key: "takamagahara",
                      title: "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.takamagahara.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.takamagahara.description",
                      picture:
                        "/ressources/wiki-landing/ExplorerTakamagahara.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/takamagahara",
                      children: []
                    },
                    {
                      key: "tian",
                      title: "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.tian.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.tian.description",
                      picture: "/ressources/wiki-landing/ExplorerTian.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/tiàn",
                      children: []
                    },
                    {
                      key: "tirNaNog",
                      title: "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.tirnanog.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.tirnanog.description",
                      picture: "/ressources/wiki-landing/ExplorerTirNaNog.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/tir-na-nog",
                      children: []
                    },
                    {
                      key: "treizeCieux",
                      title: "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.treize.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.godrealms.content.treize.description",
                      picture:
                        "/ressources/wiki-landing/ExplorerTreizeCieux.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/treize-cieux",
                      children: []
                    }
                  ]
                },
                {
                  key: "titanrealm",
                  title: "wiki.contents.explorer.locations.content.overworld.content.titanrealms.title",
                  description:
                    "wiki.contents.explorer.locations.content.overworld.content.titanrealms.description",
                  picture: "/ressources/wiki-landing/ExplorerRoyTitans.webp",
                  parentKey: "locations",
                  wikiLink: "/wiki/lore/titans",
                  children: [
                    {
                      key: "aether",
                      title: "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.aether.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.aether.description",
                      picture: "/ressources/wiki-landing/ExplorerAether.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/aether",
                      children: []
                    },
                    {
                      key: "amaunet",
                      title: "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.amaunet.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.amaunet.description",
                      picture: "/ressources/wiki-landing/ExplorerAmaunet.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/amaunet",
                      children: []
                    },
                    {
                      key: "kosmos",
                      title: "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.kosmos.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.kosmos.description",
                      picture: "/ressources/wiki-landing/ExplorerKosmos.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/kosmos",
                      children: []
                    },
                    {
                      key: "muspelheim",
                      title: "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.muspelheim.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.muspelheim.description",
                      picture:
                        "/ressources/wiki-landing/ExplorerMuspelheim.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/muspelheim",
                      children: []
                    },
                    {
                      key: "nyx",
                      title: "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.nyx.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.nyx.description",
                      picture: "/ressources/wiki-landing/ExplorerNyx.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/nyx",
                      children: []
                    },
                    {
                      key: "oceanus",
                      title: "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.oceanus.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.oceanus.description",
                      picture: "/ressources/wiki-landing/ExplorerOceanus.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/oceanus",
                      children: []
                    },
                    {
                      key: "patala",
                      title: "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.patala.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.patala.description",
                      picture: "/ressources/wiki-landing/ExplorerPatala.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/patala",
                      children: []
                    },
                    {
                      key: "sheol",
                      title: "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.sheol.title",
                      description:
                        "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.sheol.description",
                      picture: "/ressources/wiki-landing/ExplorerSheol.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/sheol",
                      children: []
                    },
                    {
                      key: "terra",
                      title: "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.terra.title",
                      description: "wiki.contents.explorer.locations.content.overworld.content.titanrealms.content.terra.description",
                      picture: "/ressources/wiki-landing/ExplorerTerra.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/terra",
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }),
  metaInfo: {
    title: "Wiki",
    link: [
      { rel: "canonical", href: "https://wyrdwalkers.com/wiki/home" },
      { rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }
    ],
    meta: [
      {
        name: "description",
        content: "Le codex officiel de l'univers Wyrdwalkers"
      },
      {
        name: "keywords",
        content:
          "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons"
      },
      { name: "author", content: "Thomas Gely" },
      { property: "og:url", content: "https://wyrdwalkers.com/wiki/home" },
      { property: "og:type", content: "website" },
      {
        property: "og:description",
        content: "Découvrez le wiki officiel de Wyrdwalkers"
      },
      { property: "og:image", content: "https://i.imgur.com/xSW0VL0.png" }
    ]
  }
});
</script>

<style scoped>
.parallax-container {
  position: relative;
}

.logo-container {
  position: relative;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  line-height: 100%;
}

.logo-container img {
  max-width: 100%;
  max-height: 100%;
}

img.main-logo {
  margin-top: 12px;
  max-height: calc(100% - 12px);
}

.logo-container .spinning-logo {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  margin-left: 10%;
  margin-right: 10%;
  width: 77%;
  -webkit-animation-name: spin;
  -webkit-animation-duration: 20000ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: spin;
  -moz-animation-duration: 20000ms;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  -ms-animation-name: spin;
  -ms-animation-duration: 20000ms;
  -ms-animation-iteration-count: infinite;
  -ms-animation-timing-function: linear;
  animation-name: spin;
  animation-duration: 20000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@-ms-keyframes spin {
  from {
    -ms-transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
  }
}

@-moz-keyframes spin {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

.full-height {
  height: 100%;
}
</style>
