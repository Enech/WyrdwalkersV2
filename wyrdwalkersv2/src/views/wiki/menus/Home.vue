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
              <span>Explorer le Codex</span>
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
          <v-card-title class="justify-center">Wyrdwalkers, c'est quoi ?</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="subtitle-1" :height="400">
            De l'Urban Fantasy ? Du Medieval Fantasy ? De l'Histoire-Fiction ? Wyrdwalkers n'est rien de tout ça. C'est un univers qui est ce que vous avez envie qu'il soit. Chaque lieu et chaque personnage sont conçus pour raconter des histoires et aborder des thèmes mythologiques, épiques et légendaires.<br>
            Vous voulez jouer une histoire medieval-fantasy ? Baladez-vous du côté de Fairie et traitez avec les elfes noirs et les trolls qui y habitent. Puis faites une virée dans la Forêt Noire pour chasser du Loup-Garou.<br>
            C'est l'Urban Fantasy qui vous intéresse ? Qu'à cela ne tienne : partez à la poursuite d'un gang de nécromanciens se cachant dans les cartels mexicains.<br>
            Le plus beau, c'est que vous pouvez jouer toutes ces aventures à l'époque qu'il vous plait sans aucun restriction d'aucune sorte.<br>
            Wyrdwalkers est un univers qui laisse complète liberté à ses Maitres du Jeu et ses joueurs pour écrire leurs légendes ensemble. Quelle que soit l'histoire que vous voulez raconter, elle peut être racontée dans cet univers.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card class="mb-3 text-justify pa-3" min-height="500">
          <v-card-title class="justify-center">Les liens importants</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="subtitle-1">
            Pour bien commencer votre lecture, voici quelques liens rapides que vous pouvez consulter :<br>
            <ul>
              <li>Les <a href="/wiki/lore/dieux" target="_blank">Dieux</a> et les <a href="/wiki/lore/titans" target="_blank">Titans</a></li>
              <li>Les différents plans cosmiques : le <a href="/wiki/lore/monde" target="_blank">Monde</a>, les <a href="/wiki/lore/dieux" target="_blank">Outres-Mondes</a> et l'<a href="/wiki/lore/overworld" target="_blank">Overworld</a></li>
              <li>Les principales races de créatures magiques : les <a href="/wiki/lore/mythborns" target="_blank">Mythborns</a></li>
              <li>Les <a href="/wiki/lore/sociétés-secrètes" target="_blank">Sociétés Secrètes</a> luttant pour une humanité libre et indépendante</li>
              <li>Les <a href="/wiki/random" target="_blank">pages aléatoires</a></li>
              <li>Les différentes <a href="/wiki/timelines" target="_blank">chronologies</a> racontant des univers parallèles</li>
              <li><a href="/wiki/gameplay/rules" target="_blank">Les règles</a> et la <a href="/wiki/gameplay/legendary-abilities" target="_blank">liste des pouvoirs</a></li>
            </ul>
            <br>Vous pouvez aussi cliquer sur le gros bouton rouge en haut de la page pour accéder facilement à toutes les principales pages du codex <v-icon>arrow_upward</v-icon>
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
          title: "Personnages",
          description:
            "Les principales factions luttant pour leurs intérêts dans Wyrdwalkers. Toutes les catégories y sont répertoriées, des Dieux aux Titans jusqu'aux simples mortels suffisamment téméraires pour défier l'ordre divin.",
          picture: "/ressources/wiki-landing/ExplorerCharacters.webp",
          parentKey: "origin",
          children: [
            {
              key: "gods",
              title: "Dieux",
              description:
                "Entités immortelles et métaphysiques réunies en panthéons, les dieux et déesses cherchent à s'attribuer le plus d'influence possible sur le Monde et les humains qui le peuplent grâce à leurs agents demi-dieux : les Godborns",
              picture: "/ressources/wiki-landing/ExplorerGods.webp",
              parentKey: "characters",
              wikiLink: "/wiki/lore/dieux",
              children: [
                {
                  key: "aesir",
                  title: "Aesir",
                  description:
                    "Les dieux scandinaves. Fiers, un brin brutaux, ils ont le sens de la famille et cherchent en permanence à échapper au Destin. Il faut dire qu'ils sont condamnés à périr le jour de Ragnarök...",
                  picture: "/ressources/wiki-landing/ExplorerAesir.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/aesir",
                  children: []
                },
                {
                  key: "amatsukami",
                  title: "Amatsukami",
                  description:
                    "Les dieux japonais. Un brin isolés et portés sur les traditions, ils ont su tisser des alliances leur assurant protection contre les titans les plus envieux de leurs ressources.",
                  picture: "/ressources/wiki-landing/ExplorerAmatsukami.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/amatsukami",
                  children: []
                },
                {
                  key: "ayllus",
                  title: "Ayllus",
                  description:
                    "Les dieux incas. Isolés des affaires du monde et peu influents dans la géopilitique divine, le panthéon inca est jeune, dynamique et est mené par un leader protecteur et énergique. Malgré son isolement, c'est un panthéon qui cherche à revenir sur le devant de la scène.",
                  picture: "/ressources/wiki-landing/ExplorerAyllus.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/ayllus",
                  children: []
                },
                {
                  key: "bureaucracy",
                  title: "Bureaucratie Céleste",
                  description:
                    "Les dieux chinois. Le nom du panthéon se suffit à lui seul. Oubliez l'individualisme avec ces dieux. Chaque membre du panthéon (et ils sont très nombreux !) est un maillon dans la chaïne. Véritable rouleau compresseur de la politique divine, rien ne lui résiste vraiment. Pas même le Destin...",
                  picture: "/ressources/wiki-landing/ExplorerBurCel.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/bureaucratie-céleste",
                  children: []
                },
                {
                  key: "deva",
                  title: "Deva",
                  description:
                    "Les dieux hindous. Créé par l'extrêmement puissant Trimurti (Brahma, Vishnu et Shiva), le Deva fait partie des plus vieux panthéons et contient donc les divinités les plus anciennes et les plus sages. En revanche, leur puissance les a amené à prendre de plus en plus de recul par rapport aux affaires du monde...",
                  picture: "/ressources/wiki-landing/ExplorerDeva.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/deva",
                  children: []
                },
                {
                  key: "kasunel",
                  title: "K'Asunel",
                  description:
                    "Les dieux mayas. Fanatiquement anti-titans, les dieux mayas vivent selon les préceptes des quatres accords toltèques. Ils croient dans les principes édictés dans l'Hunab Ku, ce qui fait d'eux le seul panthéon de dieux croyants.",
                  picture: "/ressources/wiki-landing/ExplorerMaya.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/k'asunel",
                  children: []
                },
                {
                  key: "neter",
                  title: "Neter",
                  description:
                    "Les dieux égyptiens et un des plus vieux panthéons. Avec le Deva et le Théoï il fait partie du trio de tête des panthéons en terme de richesses, de puissance militaire et de sagesse millénaire. Très ordonnés, les dieux égyptiens croient fermement en Ma'at - le principe d'équilibre cosmique - et l'appliquent à travers des valeurs comme la Justice, la Vérité et l'Ordre.",
                  picture: "/ressources/wiki-landing/ExplorerNeter.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/neter",
                  children: []
                },
                {
                  key: "nga",
                  title: "Nga Tama a Rangi",
                  description:
                    "Les dieux maoris. Composé des enfants directs de Gaïa et Ouranos, les membres du Nga Tama a Rangi comptent parmis les plus vieilles divinités du cosmos - plus vieux que certains titans - mais ne fait pas partie des panthéons les plus puissants. Ayant préféré l'exil après la première guerre contre les titans, les dieux maoris se concentrent désormais sur des problèmes plus locaux et moins ambitieux.",
                  picture: "/ressources/wiki-landing/ExplorerNga.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/nga-tama-a-rangi",
                  children: []
                },
                {
                  key: "orisha",
                  title: "Orisha",
                  description:
                    "Les dieux africains. Réunissant deux générations majeures de divinités et beaucoup plus concentrés sur les affaires du Monde et des humains, les Orishas font parti des dieux les moins belliqueux et ambitieux, même si leur force est reconnue à travers le cosmos. Leur pacifisme  n'a pas été toujours présent et il y a quelques siècles encore, l'Orisha était considéré comme le panthéon le plus guerrier de l'univers pendant plusieurs millénaires. C'est le genre de chose qui ne s'efface pas par magie...",
                  picture: "/ressources/wiki-landing/ExplorerOrisha.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/orisha",
                  children: []
                },
                {
                  key: "teotl",
                  title: "Teotl",
                  description:
                    "Les dieux aztèques. Grands adeptes de la magie du sang, les dieux aztèques ont des traditions que d'aucuns considèrent violentes. Ce sont de fiers combattants et des conquérants. Malheureusement leur impulsivité poussée à l'extrême limite le nombre de leurs alliés, mais ils n'hésitent pas à mettre leurs compétences martiales et leur soif de sang à profit pour la cause des dieux contre les titans.",
                  picture: "/ressources/wiki-landing/ExplorerTeotl.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/teotl",
                  children: []
                },
                {
                  key: "theoi",
                  title: "Théoï",
                  description:
                    "Les dieux grecs. Figurant parmi les panthéons les plus connus, les Olympiens sont menés par Zeus et sont une des principales forces motrices du cosmos. Ils regroupent suffisamment d'atouts dans tous les domaines pour assoeir leur puissance sur d'autres panthéons. Mais même les tout-puissants ont une faiblesse. La leur ? Leur égo et leur arrogance surdimensionnée.",
                  picture: "/ressources/wiki-landing/ExplorerTheoi.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/theoi",
                  children: []
                },
                {
                  key: "tuatha",
                  title: "Tuatha Dé Danann",
                  description:
                    "Les dieux celtes. Sans doute les divinités les plus proches de la Nature. Tous sont des maitres druides avant tout. Mais les prendre pour des hippies cosmiques serait une grave erreur. Les Enfants de Danu font parti des panthéons les plus combattifs et fiers du cosmos et leurs talents combinés à leur sagesse ancestrale font d'eux des atouts vitaux contre les titans.",
                  picture: "/ressources/wiki-landing/ExplorerTuatha.webp",
                  parentKey: "gods",
                  wikiLink: "/wiki/lore/tuatha-dé-danann",
                  children: []
                }
              ]
            },
            {
              key: "titans",
              title: "Titans",
              description:
                "Êtres primordiaux, immortels et extrêmement puissants en guerre totale contre les Dieux, les Titans incarnent un concept du Cosmos qu'ils cherchent à faire prévaloir sur les autres coûte que coûte. La plupart sont eux-mêmes d'anciens dieux ayant succombé à l'attraction du Destin et de la Légende.",
              picture: "/ressources/wiki-landing/ExplorerTitans.webp",
              parentKey: "characters",
              wikiLink: "/wiki/lore/titans",
              children: [
                {
                  key: "light",
                  title: "Titans de la Lumière",
                  description:
                    "Les titans de la Lumière sont des créatures zélées et totalement loyales à leurs maitres respectifs. C'est d'autant plus le cas depuis la prise de contrôle d'Aten sur le Royaume Titanique de la Lumière. Tous ses servants font preuve d'un fanatisme éternel lorsqu'il s'agit de porter la parole d'Aten aux confins de l'univers. Ils incarnent des concepts tels que la Gloire, le Soleil ou la Brillance.",
                  picture: "/ressources/wiki-landing/ExplorerLight.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/aether",
                  children: []
                },
                {
                  key: "air",
                  title: "Titans de l'Air et du Ciel",
                  description:
                    "Ces titans sont de tous types de caractères, du calme et puissant Ouranos au colérique et dangereux Huracan. Ils incarnent la Liberté associée à l'Air. Ils incarnent des concepts tels que le Calme, la Pluie ou les Cataclysmes.",
                  picture: "/ressources/wiki-landing/ExplorerAir.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/amaunet",
                  children: []
                },
                {
                  key: "order",
                  title: "Titans de l'Ordre et de la Civilisation",
                  description:
                    "Ces titans sont parmi les ennemis les plus puissants des dieux et aucun panthéon n'a encore tenté d'incursion dans le Royaume de l'Ordre, de crainte de se tranformer eux-mêmes en titans ou bien d'être tout simplement oblitérés de la Réalité. Ils incarnent des concepts tels que le Contrôle, le Savoir ou encore la Loi.",
                  picture: "/ressources/wiki-landing/ExplorerOrder.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/kosmos",
                  children: []
                },
                {
                  key: "fire",
                  title: "Titans de la Chaleur et du Feu",
                  description:
                    "Ces titans sont les forces naturelles les plus destructrices et volatiles du cosmos, en grande partie ennemis des dieux. Ils incarnent des concepts tels que la Destruction, l'Invention ou la Sécheresse.",
                  picture: "/ressources/wiki-landing/ExplorerFire.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/muspelheim",
                  children: []
                },
                {
                  key: "night",
                  title: "Titans de la Nuit",
                  description:
                    "Ces titans ne connaissent pas les concepts d'ordre et d'autorité. Ils jouent sur la peur, les illusions ou le camouflage pour obtenir ce qu'ils veulent. Ils incarnent des concepts tels que la Terreur, le Sommeil, les Ténèbres ou la Lune.",
                  picture: "/ressources/wiki-landing/ExplorerNight.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/nyx",
                  children: []
                },
                {
                  key: "water",
                  title: "Titans de l'Eau et des Océans",
                  description:
                    "Certains de ces titans sont alliés des dieux car bénéfiques à l'humanité, comme Sedna. D'autres, comme Yam, sont voués à la destruction de tout ce qui a l'audace de parcourir les mers. Ils incarnent des concepts tels que la Vie, la Noyade ou la Fertilité.",
                  picture: "/ressources/wiki-landing/ExplorerWater.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/oceanus",
                  children: []
                },
                {
                  key: "depths",
                  title: "Titans des Profondeurs",
                  description:
                    "Tous ces titans incarnent les concepts souterrains qui hantent l'imagination humaine, des profondeurs abyssales oppressantes à la décomposition de ce qui vit en passant par les richesses enfouies.",
                  picture: "/ressources/wiki-landing/ExplorerDepths.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/patala",
                  children: []
                },
                {
                  key: "death",
                  title: "Titans de la Mort",
                  description:
                    "Bien que certains de ces titans soient d'une utilité certaine pour les dieux et les humains, la majorité d'entre eux restent des entités déterminées à apporter la Mort partout où elles passent et des manières les plus horribles qui puissent être imaginées. Ils incarnent des concepts tels que le Voyage, la Paix, l'Horreur ou l'Extinction.",
                  picture: "/ressources/wiki-landing/ExplorerDeath.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/sheol",
                  children: []
                },
                {
                  key: "earth",
                  title: "Titans de la Terre",
                  description:
                    "Ces titans sont extrêmement adaptables et rompus à la loi de la jungle. Beaucoup d'entre eux ont une intelligence bestiale au mieux, mais les avatars majeurs sont de véritables architectes, pouvant penser à des plans sur des décennies directement reliés au Monde et à ses habitants. Ils incarnent des concepts comme la Vie, l'Etendue ou les  Montagnes.",
                  picture: "/ressources/wiki-landing/ExplorerEarth.webp",
                  parentKey: "titans",
                  wikiLink: "/wiki/lore/terra",
                  children: []
                }
              ]
            },
            {
              key: "mythborns",
              title: "Mythborns",
              description:
                "Créatures magiques issues des folklores du monde entier, les mythborns sont les représentants de la Nature. Dragons, Elfes, Nains, etc. vivent tous dans les Outres-Mondes, loin des humains et des Dieux.",
              picture: "/ressources/wiki-landing/ExplorerMythborns.webp",
              parentKey: "characters",
              wikiLink: "/wiki/lore/mythborns",
              children: [
                {
                  key: "dragons",
                  title: "Dragons",
                  description:
                    "Fièrement indépendants et aimant vivre isolés, les Dragons sont une des rares espèces de Mythborns suffisamment puissantes pour imposer leur indépendance aux dieux et aux titans. Toutefois, ayant été pourchassés pendant des siècles par les dieux, certains d'entre eux succombent à l'appel des titans et entrent au service d'Apophis, Zhulong ou encore Kur.",
                  picture: "/ressources/wiki-landing/ExplorerDragons.webp",
                  parentKey: "mythborns",
                  wikiLink: "/wiki/lore/dragons",
                  children: []
                },
                {
                  key: "garous",
                  title: "Garous",
                  description:
                    "Mélange entre une âme humaine et un kami d'animal, les Garous sont une race très diversifiée qui compte entre autre les Centaures, les Loups-Garous, les Satyres ou encore les Minotaures. Leurs allégeances sont aussi variées qu'il y a de Garous, mais la grande majorité d'entre eux ne sont affiliés ni aux dieux ni aux titans et vivent dans l'Outre-Monde de la Forêt Noire.",
                  picture: "/ressources/wiki-landing/ExplorerGarous.webp",
                  parentKey: "mythborns",
                  wikiLink: "/wiki/lore/garous",
                  children: []
                },
                {
                  key: "rakshasas",
                  title: "Rakshasas",
                  description:
                    "Création de Brahma, les Rakshasas se sont très vite rebellés contre l'ordre cosmique imposé par loi du Darma. A cause de leur sauvagerie innée, qu'ils redirigent vers les humains et les dieux, les Rakshasas sont des créatures difficiles à maitriser. Après leur défaite face au grand Vishnu réincarné, les Rakshasas sont devenus la force de frappe de l'Outre-Monde de Shambhala.",
                  picture: "/ressources/wiki-landing/ExplorerRakshasas.webp",
                  parentKey: "mythborns",
                  wikiLink: "/wiki/lore/rakshasas",
                  children: []
                },
                {
                  key: "fey",
                  title: "Feys",
                  description:
                    "Les feys sont un ensemble de créatures de races différentes, malicieuses et se délectant de tourmenter les mortels. Fées, Trolls, Lutins, Kitsune, Yokai, etc. Toutes ces races représentent les Feys. Majoritairement regroupés dans les Outres-Mondes de la Cour de l'Eté et de la Cour de l'Hiver, ils peuvent néanmoins être trouvées partout sur le Monde ou les Outres-Mondes.",
                  picture: "/ressources/wiki-landing/ExplorerFeys.webp",
                  parentKey: "mythborns",
                  wikiLink: "/wiki/lore/fey",
                  children: []
                },
                {
                  key: "nains",
                  title: "Nains",
                  description:
                    "Habitans de Nidavellir, les nains sont une race de mythborns hautement résistants aux environnements extrêmes et de formidables artisans et ingénieurs.",
                  picture: "/ressources/wiki-landing/ExplorerNains.webp",
                  parentKey: "mythborns",
                  wikiLink: "/wiki/lore/nains",
                  children: []
                },
                {
                  key: "asuras",
                  title: "Asuras",
                  description:
                    "Les némésis des dieux hindous. Les asuras sont une race de Mythborns intelligents et organisés. Ils ne sont pas malveillants comme d'autres races Mythborns, mais sont plus enclins à suivre leur émotions. De ce fait, la loi du Darma leur aprait beaucoup trop moralisatrice à leur goût et ils préfèrent s'en détacher, ce qui engendre beaucoup de frictions avec le panthéon hindou.",
                  picture: "/ressources/wiki-landing/ExplorerAsuras.webp",
                  parentKey: "mythborns",
                  wikiLink: "/wiki/lore/asuras",
                  children: []
                }
              ]
            },
            {
              key: "enlight",
              title: "Eveillés",
              description:
                "Humains dotés de pouvoirs magiques, les Eveillés appartiennent à des Sociétés Secrètes et participent à lutter pour l'indépendance de l'humanité vis-à-vis des Dieux et des Titans.",
              picture: "/ressources/wiki-landing/ExplorerEveilles.webp",
              parentKey: "characters",
              wikiLink: "/wiki/lore/éveillé",
              children: [
                {
                  key: "illuminati",
                  title: "Les Illuminati",
                  description:
                    "Une des Sociétés Secrètes les plus répandue sur le Monde, leur devise indique leur état d'esprit : 'Sexe, Drogues et Rockefeller'. Les Illuminati recherchent avant tout le pouvoir matériel et la richesse. Ils n'obéissent à aucun dogme et concentrent leurs valeurs sur l'individualité plutôt que le collectif. Prêts à faire des affaires avec n'importe qui pourvu qu'ils y trouvent un intérêt, ils mettent à profit leurs richesses et leurs secrets accumulés à travers les âges pour être en mesure de négocier à armes égales avec les dieux afin de contrer leur influence sur le Monde.",
                  picture: "/ressources/wiki-landing/ExplorerIlluminati.webp",
                  parentKey: "enlight",
                  wikiLink: "/wiki/lore/illuminati",
                  children: []
                },
                {
                  key: "merlin",
                  title: "Le Cercle de Merlin",
                  description:
                    "Issu des héritiers du Roi Arthur et de la Table Ronde, le Cercle de Merlin est composé de Chevaliers aux talents martiaux hors pairs et de Druides partageant une connexion presque symbiotique avec la Nature. Ennemis jurés des dieux celtes qu'ils ont chassé du Monde, le Cercle de Merlin est la police du Concordat de Stonehenge - le contrat du Destin interdisant aux dieux de se matérialiser sur le Monde - et en tant que telle n'hésite pas à pourchasser les Godborns qui franchissent les limites.",
                  picture: "/ressources/wiki-landing/ExplorerMerlin.webp",
                  parentKey: "enlight",
                  wikiLink: "/wiki/lore/cercle de merlin",
                  children: []
                },
                {
                  key: "cabale",
                  title: "La Cabale",
                  description:
                    "S'il est une Société Secrète sur laquelle il est difficile de mettre la main, c'est La Cabale. Totalement dissimulée en plein jour, elle compte dans ses rangs tous les parias de toutes les sociétés à travers le Monde et les époques et ses membres sont adeptes d'arcanes occultes pas toujours appréciées d'autres groupes, telles que la nécromancie.",
                  picture: "/ressources/wiki-landing/ExplorerCabale.webp",
                  parentKey: "enlight",
                  wikiLink: "/wiki/lore/cabale",
                  children: []
                },
                {
                  key: "poingJade",
                  title: "L'Ordre du Poing de Jade",
                  description:
                    "Ordre martial par excellence, l'Ordre du Poing de Jade regroupe tous les ordres militaires de toutes les époques, des Templiers aux Speztnaz en passant par les Yakuzas japonais et les Triades chinoises.",
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
          title: "Lieux",
          description:
            "Les principaux lieux où se trament les intrigues de Wyrdwalkers, que ce soient les tunnels secrets abritant les complots les plus sordides ou les grandes salles Olympiennes accueillant la politique divine.",
          picture: "/ressources/wiki-landing/ExplorerLocations.webp",
          parentKey: "origin",
          children: [
            {
              key: "monde",
              title: "Le Monde",
              description:
                "Le plan physique abritant les humains. C'est là où se déroule majorité des intrigues impliquant les jeunes Godborns et les Sociétés Secrètes, quelles que soient les époques. C'est aussi là que s'exprime le Destin.",
              picture: "/ressources/wiki-landing/ExplorerMonde.webp",
              parentKey: "locations",
              wikiLink: "/wiki/lore/monde",
              children: []
            },
            {
              key: "outreMonde",
              title: "Les Outres-Mondes",
              description:
                "Les Outres-Mondes représentent la séparation entre le plan d'existence des humains et celui des dieux et des titans. Chacun est unique et possède sa propre histoire et sa propre population. Ce sont les principaux lieux d'intrigues pour les Godborns avancés, les jeunes Dieux, les Wyrdborns et les Mythborns.",
              picture: "/ressources/wiki-landing/ExplorerOutresMondes.webp",
              parentKey: "locations",
              wikiLink: "/wiki/lore/outres-mondes",
              children: [
                {
                  key: "foretNoire",
                  title: "Forêt Noire",
                  description:
                    "Antithèse de l'ordre, de la société et de la santé mentale. C'est là que le Petit Chaperon Rouge s'est perdu, où Hansel et Gretel ont été attirés, où les arbres ont des sourires fous, les animaux parlent en énigmes et où l'obscurité reigne constamment.",
                  picture: "/ressources/wiki-landing/ExplorerForest.webp",
                  parentKey: "outreMonde",
                  wikiLink: "/wiki/lore/forêt-noire",
                  children: []
                },
                {
                  key: "shambhala",
                  title: "Shambhala",
                  description:
                    "Ancien sactuaire des créatures asiatiques, Shambhala est un royaume où le spirituel et le matériel ne font qu'un. Shambhala est un symbole de paix dans un cosmos constamment perturbé par les guerres.",
                  picture: "/ressources/wiki-landing/ExplorerShambhala.webp",
                  parentKey: "outreMonde",
                  wikiLink: "/wiki/lore/shambhala",
                  children: []
                },
                {
                  key: "utopia",
                  title: "Utopia",
                  description:
                    "Outre-Monde très récent, Utopia s'est formée au cours du XXème siècle lorsque le concept de la ville est devenu prépondérant sur le Monde. C'est l'Outre-Monde de la Civilisation, de la ville animée, de la technologie, de la modernité et des nouvelles créatures magiques qui émergent de ces nouveaux mythes.",
                  picture: "/ressources/wiki-landing/ExplorerUtopia.webp",
                  parentKey: "outreMonde",
                  wikiLink: "/wiki/lore/utopia",
                  children: []
                },
                {
                  key: "fairie",
                  title: "Fairie",
                  description:
                    "Territoire des Feys et Outre-Monde le plus influent au sein de la communauté Mythborn, il regroupe un nombre incalculable de races différentes et il est la cible de pléthores de guerres d'influences entre les dieux, les titans et mêmes d'autres races Mythborns.",
                  picture: "/ressources/wiki-landing/ExplorerFairie.webp",
                  parentKey: "outreMonde",
                  wikiLink: "/wiki/lore/fairie",
                  children: []
                },
                {
                  key: "elDorado",
                  title: "El Dorado",
                  description:
                    "Outre-Monde peuplé par les Eveillés mésoaméricains survivants du massacre de l'invasion espagnole. Créé par les panthéons mayas et incas, El Dorado regroupe les fidèles aux préceptes de l'Hunab Ku, portés par les dieux mayas.",
                  picture: "/ressources/wiki-landing/ExplorerDorado.webp",
                  parentKey: "outreMonde",
                  wikiLink: "/wiki/lore/el-dorado",
                  children: []
                },
                {
                  key: "merJade",
                  title: "Mer de Jade",
                  description:
                    "Outre-Monde sous la coupe des Dragons, la Merde de Jade est un endroit difficilement accessible depuis le Monde. Les dragons occidentaux y ont trouvé refuge après la grande purge draconique orchestrée par les dieux au Moyen-Age. L'endroit n'est pas accueillant envers les dieux et les dragons n'hésitent à exercer leur vengeance sur eux, de manière physique ou bien en les extorquant de leurs ressources en échange d'un savoir séculaire (mais tout de même sur-estimé).",
                  picture: "/ressources/wiki-landing/ExplorerMerJade.webp",
                  parentKey: "outreMonde",
                  wikiLink: "/wiki/lore/mer-de-jade",
                  children: []
                }
              ]
            },
            {
              key: "overworld",
              title: "L'Overworld",
              description:
                "L'Overworld est le plan métaphorique où vivent les dieux et les titans et où ils se livrent leur guerre sans mercie. Un être mortel ne peut pas y accéder et encore moins y survivre. Les intrigues qui s'y déroulent impliquent des (jeunes) dieux et des titans.",
              picture: "/ressources/wiki-landing/ExplorerOverworld.webp",
              parentKey: "locations",
              wikiLink: "/wiki/lore/overworld",
              children: [
                {
                  key: "godrealm",
                  title: "Les Royaumes Divins",
                  description:
                    "Les Royaumes Divins - autrement appelés les Cieux ou Paradis par les mortels - sont les lieux de résidence des dieux. Chaque panthéon en possède un. L'Olympe pour les grecs, Asgard pour les scandinaves. Chaque Royaume Divin a été conquis par les dieux sur le territoire d'un ou plusieurs titans, ce sont donc des enclaves divines au milieu de Royaumes Titaniques.",
                  picture: "/ressources/wiki-landing/ExplorerHeavens.webp",
                  parentKey: "locations",
                  wikiLink: "/wiki/lore/royaume-divin",
                  children: [
                    {
                      key: "aunu",
                      title: "Aunu",
                      description:
                        "Le Royaume des dieux égyptiens. Aunu prend la forme d'une immense ville représentant l'ordre social du panthéon égyptien. Essentiellement composée d'âmes indignes réduites en éternel esclavage, la ville est parcourue par la représentation cosmique du Nil, que Râ parcourt tous les jours sur sa barge solaire.",
                      picture: "/ressources/wiki-landing/ExplorerAunu.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/aunu",
                      children: []
                    },
                    {
                      key: "asgard",
                      title: "Asgard",
                      description:
                        "Le Royaume des dieux scandinaves. Il est composée d'une unique ville éponyme plantée au milieu des Plaines d'Idavoll. Asgard est accessible depuis Yggrasil, le grand Arbre-Monde et tous deux sont condamnés par le Destin à être détruits lors de Ragnarök.",
                      picture: "/ressources/wiki-landing/ExplorerAsgard.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/asgard",
                      children: []
                    },
                    {
                      key: "devaloka",
                      title: "Devaloka",
                      description:
                        "Le Royaume des dieux hindous. Le Devaloka est en réalité une succession de Royaumes sur plusieurs niveaux, atteignables selon la pureté de l'âme. Tout en haut se trouve le Royaume du grand Vishnu : Vaikunta, accessible seulement aux âmes pures au-delà de tout reproche.",
                      picture: "/ressources/wiki-landing/ExplorerDevaloka.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/devaloka",
                      children: []
                    },
                    {
                      key: "hanan",
                      title: "Hanan Pacha",
                      description:
                        "Le Royaume des dieux incas. Peuplé des ancêtres vénérables du peuple Inca, le Royaume du Condor est composé d'une ville unique accessible depuis les plus hauts nuages flottant au-dessus des sommets andins..",
                      picture: "/ressources/wiki-landing/ExplorerHanan.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/hanan-pacha",
                      children: []
                    },
                    {
                      key: "ikole",
                      title: "Ikole Orun",
                      description:
                        "Le Royaume des dieux africains. Vaste savane parsemée de villes de toutes les époques, Ikole Orun abrite les ancêtres ayant gagné leur place au paradis. Non loin des frontières d'Ikole Orun se trouve Ville au Camp, la ville des Loas vaudous.",
                      picture: "/ressources/wiki-landing/ExplorerIkole.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/ikole-orun",
                      children: []
                    },
                    {
                      key: "kahiki",
                      title: "Kahiki",
                      description:
                        "Le Royaume des dieux maoris. Véritable archipel dissimulé dans la brûme, Kahiki ne porte pas de palais opulents ou d'autres formes de richesses. Sa topologie est en tout point celui d'un archipel polynésien, faisant de lui un Royaume Divin unique en son genre.",
                      picture: "/ressources/wiki-landing/ExplorerKahiki.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/kahiki",
                      children: []
                    },
                    {
                      key: "olympe",
                      title: "Le Mont Olympe",
                      description:
                        "Le Royaume des dieux grecs. Porté par le titan Atlas en personne, il abrite tous les dieux grecs et leurs serviteurs. C'est dans ses palais de marbre que se joue beaucoup de la politique du cosmos.",
                      picture: "/ressources/wiki-landing/ExplorerOlympe.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/olympe",
                      children: []
                    },
                    {
                      key: "takamagahara",
                      title: "Takamagahara",
                      description:
                        "Le Royaume des dieux japonais. Monde hautain et sacré, il représente la perfection au sens japonais du terme. Tout y est à sa juste place et fonctionne en parfaite harmonie avec le reste du Royaume. Calme et retiré, Takamagahara est considéré comme un refuge par beaucoup de divinités.",
                      picture:
                        "/ressources/wiki-landing/ExplorerTakamagahara.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/takamagahara",
                      children: []
                    },
                    {
                      key: "tian",
                      title: "Tiàn",
                      description:
                        "Le Royaume des dieux chinois. Gigantesque Cité Interdite abritant la Bureaucratie la plus élaborée et la plus huilée du cosmos. QG du Bien Commun, d'aucuns doivent laisser à la porte leur individualité s'ils veulent pouvoir naviguer sans heurts dans l'enceinte de Tiàn.",
                      picture: "/ressources/wiki-landing/ExplorerTian.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/tiàn",
                      children: []
                    },
                    {
                      key: "tirNaNog",
                      title: "Tir na nÓg",
                      description:
                        "Le Royaume des dieux celtes. Immense mer parsemée d'îles, Tir na nÓg ne faisait autrefois qu'un avec le Monde jusqu'à la ratification du Concordat de Stonehenge. C'est un petit paradis de paix et de nature sans fioritures ni extravagance dont les visiteurs peinent à repartir.",
                      picture: "/ressources/wiki-landing/ExplorerTirNaNog.webp",
                      parentKey: "godrealm",
                      wikiLink: "/wiki/lore/tir-na-nog",
                      children: []
                    },
                    {
                      key: "treizeCieux",
                      title: "Les Treize Cieux",
                      description:
                        "Le Royaume des dieux mayas et aztèques. Chacun des 'Cieux' est un Royaume à lui seul et relié à un Royaume Titanique différent. Chaque Royaume est accessible par le Pilier du Feu, qui juge ceux ayant bafoué les préceptes de l'Hunab Ku. Une entité tentant d'accéder à un niveau des Treize Cieux dont elle n'est pas digne est immédiatement brûlée par le Pilier de Feu.",
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
                  title: "Les Royaumes Titaniques",
                  description:
                    "Les Royaumes Titaniques sont l'incarnation de concepts naturels à l'échelle du cosmos. La Nuit, le Ciel, le Feu, etc. Chacun abrite des créatures incarnant à leur tour des concepts reliés. La Nuit comme Terreur, le Ciel comme Vent, le Feu comme Destruction. Chaque Royaume est infini en taille et en existence.",
                  picture: "/ressources/wiki-landing/ExplorerRoyTitans.webp",
                  parentKey: "locations",
                  wikiLink: "/wiki/lore/titans",
                  children: [
                    {
                      key: "aether",
                      title: "Aether",
                      description:
                        "Le Royaume de la Lumière. Il regroupe tous les titans incarnant un concept relié à la lumière. Que ce soit la lumière de la Gloire ou bien celle de l'Illumination. Depuis la prise de pouvoir d'Aten, ce Royaume est devenu un endroit extrêment dangereux où l'influence de l'Avatar de la Brillance corrompt tout ce qui s'en approche en fanatique dévoué à sa cause.",
                      picture: "/ressources/wiki-landing/ExplorerAether.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/aether",
                      children: []
                    },
                    {
                      key: "amaunet",
                      title: "Amaunet",
                      description:
                        "Le Royaume de l'Air et du Ciel. Totalement chaotique, ce Royaume est l'incarnation de la Liberté associée à l'Air. Les titans qui y résident sont de tous types de caractères, du calme et puissant Ouranos au colérique et dangereux Huracan. Malgré tout, chaque strate de ce Royaume contribue à un équilibre global, malheureusement sous la menace constante du retour de Typhon.",
                      picture: "/ressources/wiki-landing/ExplorerAmaunet.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/amaunet",
                      children: []
                    },
                    {
                      key: "kosmos",
                      title: "Kosmos",
                      description:
                        "Le Royaume de l'Ordre et de la Civilisation. Dans ce Royaume, rien de naturel ou de laissé au hasard. Tout est carré, pensé, calibré et mesuré à des niveaux de précision et de rigueur que seules des entités divines peuvent mettre en place. Les titans qui y résident sont parmi les ennemis les plus puissants des dieux et aucun panthéon n'a encore tenté d'incursion dans Kosmos, de crainte de se tranformer eux-mêmes en titans ou bien d'être tout simplement oblitérés de la Réalité.",
                      picture: "/ressources/wiki-landing/ExplorerKosmos.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/kosmos",
                      children: []
                    },
                    {
                      key: "muspelheim",
                      title: "Muspelheim",
                      description:
                        "Le Royaume de la Chaleur et du Feu. Ce Royaume regroupes les forces naturelles les plus destructrices et volatiles du cosmos. C'est pour cette raison que la totalité de ce Royaume est parsemée de zones de conflits permanents. La grande majorité des titans qui y habitent sont des ennemis des dieux.",
                      picture:
                        "/ressources/wiki-landing/ExplorerMuspelheim.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/muspelheim",
                      children: []
                    },
                    {
                      key: "nyx",
                      title: "Nyx",
                      description:
                        "Le Royaume de la Nuit. Les notions de contrôle, d'ordre et d'autorité n'existent pas ici, c'est même l'exact opposé. C'est le Royaume de la Terreur, du Sommeil, de la Lune et de l'Obscurité. Ses habitants jouent sur la peur, les illusions ou le camouflage pour obtenir ce qu'ils veulent. Les dieux y font quelques incursions, mais même eux restent très prudents car ce Royaume est totalement imprévisible.",
                      picture: "/ressources/wiki-landing/ExplorerNyx.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/nyx",
                      children: []
                    },
                    {
                      key: "oceanus",
                      title: "Océanus",
                      description:
                        "Le Royaume de l'Eau et des Océans. De par sa nature, ce Royaume n'est qu'un océan infini rempli de monstres en tous genres et agité des remous de la guerre permanente entre ses titans majeurs Sedna et Yam. Certains de ses titans sont alliés des dieux car bénéfiques à l'humanité, comme Sedna. D'autres, comme Yam, sont voués à la destruction de tout ce qui a l'audace de parcourir les mers.",
                      picture: "/ressources/wiki-landing/ExplorerOceanus.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/oceanus",
                      children: []
                    },
                    {
                      key: "patala",
                      title: "Patala",
                      description:
                        "Le Royaume des Profondeurs. Entièrement composé de cavernes sombres et d'abysses, Patala est un Royaume froid où règne un danger constant. Comme pour Nyx, l'autorité et l'ordre n'existent pas dans ce Royaume. Seuls les plus vigilants ou préparés survivent. Tous les titans qui y vivent incarnent les concepts souterrains qui hantent l'imagination humaine, des profondeurs abysalles oppressantes à la décomposition de ce qui vit en passant par les richesses enfouies.",
                      picture: "/ressources/wiki-landing/ExplorerPatala.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/patala",
                      children: []
                    },
                    {
                      key: "sheol",
                      title: "Sheol",
                      description:
                        "Le Royaume de la Mort. Sans doute le Royaume le moins réjouissant du cosmos. Bien que certains de ses titans soient d'une utilité certaine pour les dieux et les humains, la majorité d'entre eux restent des entités déterminées à apporter la Mort partout où elles passent et des manières les plus horribles qui puissent être imaginées. Les Enfers de chaque panthéon ont été conquis sur le territoire de ce Royaume, ajoutant à la frustration de ses habitants.",
                      picture: "/ressources/wiki-landing/ExplorerSheol.webp",
                      parentKey: "titanrealm",
                      wikiLink: "/wiki/lore/sheol",
                      children: []
                    },
                    {
                      key: "terra",
                      title: "Terra",
                      description:
                        "Le Royaume de la Terre. A ne pas confondre avec la planète Terre (aka le Monde). Terra représente la Terre comme concept opposé au Ciel. C'est un Royaume infini aux paysages tous aussi variés que les créatures qui les peuplent et leurs manières de tuer leurs proies. Gaïa en est l'Avatar principal et tout ce qui y vit est son enfant. Seuls les plus adaptés y survivent.",
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
