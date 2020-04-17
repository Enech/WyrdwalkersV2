<template>
  <div class="pa-3">
    <v-card class="pa-3">
      <v-card-text>
        <div class="display-3 text-center">Rise of The Gods</div>
        <div
          class="display-1 font-weight-thin text-center"
        >Le premier jeu en ligne dans l'univers Wyrdwalkers</div>
      </v-card-text>
      <v-card-text
        class="subtitle-1"
      >Alentours de 1200 avant Jésus-Christ. Zeus se lève contre son père Kronus, devenu Titan de l’Ordre et du Contrôle et un véritable tyran cosmique. Menant les dieux à la bataille contre les titans, le jeune dieu grec a réussi à retrouver sa fratrie dévorée par Kronus et mène désormais une guerre acharnée pour faire reculer les ennemis de l’humanité. Après maints sacrifices effroyables, Zeus est parvenu à enfermer son père dans le Tartare. Mais il reste encore beaucoup de ses fidèles à éradiquer. La victoire semble proche et les plans cosmiques encore aux mains des titans peuvent tomber sous votre influence si tous les panthéons unissent leurs forces. D’une certaine manière, vous préparez déjà la fin de la guerre et votre place dans cet univers nouveau.</v-card-text>
      <v-divider></v-divider>
      <v-card-subtitle class="subtitle-1">
        <v-row>
          <v-col cols="12" sm="6">
            Cette expérience sur navigateur en tour par tour est un jeu à la fois compétitif et collaboratif où vous prendrez les rênes d'un des 12 panthéons de l'univers Wyrdwalkers.
            <br />Dans chaque partie, vous pourrez jouer avec 11 autres personnes maximum pour reconquérir le cosmos lors des évènements mythiques de la
            <a
              href="https://wyrdwalkers.com/wiki/lore/seconde-titanomachie"
              target="_blank"
            >Seconde Titanomachie</a>.
            <br />
            <br />
            <div class="text-center mb-3">
              <v-btn color="indigo lighten-1" class="white--text" href="https://discord.gg/CJf25BB" target="_blank">Rejoindre le Discord</v-btn>
            </div>
            <div class="text-center">
              <v-btn color="blue" class="white--text" :to="{name: 'gamesROTG'}">Commencer une partie</v-btn>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="headline">But du jeu</div>
            <div>
              Il est simple : obtenir un maximum de Points de Victoire en 7 tours de jeu. Ces points sont obtenus en conquérant des plans cosmiques occupés par les titans. Pour conquérir ces plans occupés, vous devrez dépenser des ressources intelligemment à travers des ordres compilés dans une
              <b>Fiche d’Ordre</b> quotidienne. Il faudra surtout vous concerter avec les autres joueurs pour que vos rares ressources soient dépensées judicieusement ! Le but n'est pas de gagner seul.e mais de parvenir ensemble à écraser les titans, tout en vous taillant une part du gâteau.
            </div>
            <br />
            <br />
            <div class="text-center">
              <v-btn block color="blue" class="white--text">Voir les règles du jeu</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import ROTGCounter from "../../../components/rotg/Counter.vue";

export default Vue.extend({
  name: "ROTGHome",
  created: function() {
  },
  computed: {
    currentUser: function() {
      return store.getters.currentUser;
    }
  },
  methods: {},
  data: () => ({}),
  metaInfo: {
    title: "Rise of The Gods",
    link: [
      { rel: "canonical", href: "https://wyrdwalkers.com/rotg/home" },
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
      { property: "og:url", content: "https://wyrdwalkers.com/rotg/home" },
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