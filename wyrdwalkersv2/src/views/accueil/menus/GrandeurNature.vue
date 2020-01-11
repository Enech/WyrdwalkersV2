<template>
  <div class="pa-3" id="app-content-custom">
    <v-parallax dark src="@/assets/ParallaxAccueil.webp" eager :height="250">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-2 font-weight-thin mb-4">Le Grandeur Nature</h1>
          <h3 class="headline">Inscrivez-vous dans la Légende</h3>
        </v-col>
      </v-row>
    </v-parallax>
    <v-row align="center" class="pa-3 pb-0">
      <v-col cols="12" md="3" v-for="(gn, index) in gns" :key="index">
        <v-card class="gn-card">
          <v-card-title>
            <v-icon left>fa-dice-d20</v-icon>
            <span class="title font-weight-light">{{gn.name}}</span>
          </v-card-title>
          <v-card-text>{{gn.caption.substring(0,150) + '...'}}</v-card-text>
          <v-card-actions>
            <v-btn text color="red" @click="showDialog = true; selectedGN = gn;" v-if="gn.done">PLUS</v-btn>
            <v-spacer></v-spacer>
            <span class="mr-3">
              <v-icon small left>fa-calendar-alt</v-icon>
              <span class="caption font-weight-light">{{gn.date}}</span>
            </span>
            <span>
              <v-icon small left>fa-map-marker-alt</v-icon>
              <span class="caption font-weight-light">{{gn.location}}</span>
            </span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="showDialog" fullscreen>
      <v-card>
        <v-card-title class="black white--text">
          {{selectedGN.name}}
          <v-spacer></v-spacer>
          <v-btn color="white" text icon @click.stop="showDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text class="subtitle-1 mb-3">{{selectedGN.caption}}</v-card-text>
        <v-carousel continuous cycle :height="carouselHeight">
          <v-carousel-item v-for="(picture, index) in selectedGN.pictures" :key="index">
            <img :src="picture" />
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import Workshop from "../../../model/Workshop.model";

export default Vue.extend({
  name: "Ateliers",
  created: function() {
  },
  computed: {
      carouselHeight: function() {
      return this.$vuetify.breakpoint.xs ? "413px" : "650px";
    }
  },
  data: () => ({
    showDialog: false,
    selectedGN: new Object(),
    gns: [
      {
        name: "La Libération de l'Amérique",
        caption:
          "An 1492. Alors que Christophe Colomb découvre un nouveau continent jusque-là inconnu des dieux eux-mêmes, ces derniers sont en émoi et cherchent à tout prix à se partager le gâteau. Seulement voilà, un certain Grand Manitou leur met des bâtons dans les roues...",
        date: "17/03/2018",
        location: "Lyon",
        done: true,
        pictures: [
          "/ressources/GN/Amerique_1.webp",
          "/ressources/GN/Amerique_2.webp",
          "/ressources/GN/Amerique_3.webp",
          "/ressources/GN/Amerique_4.webp"
        ]
      },
      {
        name: "Le Cercle des Lumières",
        caption:
          "350 ap. J-C. Les Chevaliers de la Table Ronde sont parvenus à interdire aux dieux l'accès au Monde. Devenus immortels de par leur Légende, ils ont pu faire du Royaume de Logres un phare d'illumination pour les humains pendant plus d'un siècle. Jusqu'au jour où Lancelot a déclaré sa flamme à Guenièvre et Arthur été tué par Mordred. Les Chevaliers de Camelot se retrouvent pour savoir quoi faire alors que les ennemis de Logres ne perdent pas de temps.",
        date: "21/09/2018",
        location: "Lyon",
        done: true,
        pictures: ["/ressources/GN/Arthur_1.webp"]
      },
      {
        name: "Le Fléau des Dieux",
        caption:
          "1352 ap. J-C. 1000 ans plus tard, les Chevaliers de la Table Ronde, agissant depuis les ombres, se retrouvent face à un nouveau fléau : la Peste Noire. D'origine divine, elle affecte tous les humains. Dépourvus de leur avantage immortel, les Chevaliers doivent agir vite alors que les vagues de peste s'emballent.",
        date: "16/02/2019",
        location: "Lyon",
        done: true,
        pictures: [
          "/ressources/GN/Fleau_1.webp",
          "/ressources/GN/Fleau_2.webp",
          "/ressources/GN/Fleau_3.webp",
          "/ressources/GN/Fleau_4.webp",
          "/ressources/GN/Fleau_5.webp",
          "/ressources/GN/Fleau_6.webp",
          "/ressources/GN/Fleau_7.webp",
          "/ressources/GN/Fleau_8.webp",
          "/ressources/GN/Fleau_9.webp",
          "/ressources/GN/Fleau_11.webp",
          "/ressources/GN/Fleau_12.webp",
          "/ressources/GN/Fleau_13.webp",
          "/ressources/GN/Fleau_14.webp"
        ]
      },
      {
        name: "Hors de Contrôle",
        caption:
          "~1200 av. J-C. Le grand Kronus a trahi les dieux et est devenu un Titan, laissant son empire Atlante sans chef. Alors que la guerre entre dieux et titans s'annonce proche, les dirigeants de l'Atlantide se réunissent pour sauver l'Empire.",
        date: "12/10/2019",
        location: "Lyon - Le Barnadé",
        done: true,
        pictures: [
          "/ressources/GN/Atlantis_1.webp",
          "/ressources/GN/Atlantis_2.webp",
          "/ressources/GN/Atlantis_3.webp",
          "/ressources/GN/Atlantis_4.webp",
          "/ressources/GN/Atlantis_5.webp",
          "/ressources/GN/Atlantis_6.webp"
        ]
      },
      {
        name: "Acmérythros",
        caption:
          "L'Atlantide et ses factions influentes ont réussi à se faire une place dans l'ordre nouveau. Malgré les compétitions en interne, un conseil Atlante est né, remplaçant la tyrannie d'un Kronus défait par son fils Zeus. Les luttes d'influences sont maintenus au minimum dans l'intérêt commun tandis qu'un Axis Mundi a ouvert Atlantis sur l'univers entier. Mais tout cela s'apprête à changer : un énorme gisement d'Orichalque, le métal des dieux qui ne peut être imité par la magie, a été trouvé sous la capitale de l'Empire Atlante. Et chaque faction veut sa part du gâteau... Mais les Atlantes ne sont pas les seuls à vouloir une part de cette extraordinaire richesse souterraine. A l'apogée de sa puissance, l'Atlantide saura t'elle se prémunir des influences extérieures tout en régulant sa course au pouvoir et à la richesse en interne ?",
        date: "A définir",
        location: "Lyon",
        done: false,
        pictures: []
      }
    ]
  }),
  metaInfo: {
    title: "Grandeur Nature",
    link: [
      { rel: "canonical", href: "https://wyrdwalkers.com/home/live-action" },
      { rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }
    ],
    meta: [
      {
        name: "description",
        content: "Les évènements Grandeur Nature de Wyrdwalkers"
      },
      {
        name: "keywords",
        content:
          "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons,atelier,storytelling,narration,histoire,mythes,grandeur nature,murder party"
      },
      { name: "author", content: "Thomas Gely" },
      {
        property: "og:url",
        content: "https://wyrdwalkers.com/home/live-action"
      },
      { property: "og:type", content: "website" },
      {
        property: "og:description",
        content:
          "L'association Wyrdwalkers propose plusieurs fois par an des murder parties sur plusieurs heures. Vos actions sont inscrites dans l'univers Wyrdwalkers et forgent la Légende."
      },
      { property: "og:image", content: "https://i.imgur.com/xSW0VL0.png" }
    ]
  }
});
</script>