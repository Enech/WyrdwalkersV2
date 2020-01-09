<template>
  <div class="pa-3" id="app-content-custom">
    <div class="parallax-container">
      <v-parallax dark src="@/assets/WikiHome.webp" eager>
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
      <h3 class="display-1 font-weight-light uppercase pa-3 text-center">Bienvenue sur le codex Wyrdwalkers</h3>
      <p class="body-1 article-look-3">
        <i>Novembre 2018. Le Chaudron Bedonnant - pub New-Yorkais, Brooklyn.</i>
        <br />
        <br />"Un Godborn tout frais ! Allez gamin, chope une pinte de Guinness, elle est importée et ça change de la pisse chaude qu'ils font par
        ici. Laisse-moi t'expliquer quelques petites choses à propos de notre business. Le business de la Légende. Nos parents sont quelque part, là-haut. Pas parce-qu'ils sont morts, mais parce-que ce sont des dieux. C'est
        qui ton parent divin déjà ? Le mien c'est Le Dagda, des fois que ce soit pas assez évident avec mon sourire ravageur. Enfin bon, ils sont perchés là-haut chez eux et ils comptent sur nous pour remettre le Monde
        en ordre. Je sais pas si tu as remarqué mais c'est vraiment le bordel chez nous les mortels.
        <br />
        <br />Ton principal boulot c'est de faire ce qu'on appelle de la "gestion de nuisibles". Tu vois, quand des Titans arrivent
        à se frayer un chemin jusqu'à nous, ils restent généralement discrets et rassemblent des cultistes à droite à gauche. Ca leur permet de gonfler en puissance jusqu'à ce qu'ils puissent grignoter suffisamment la réalité
        pour invoquer un gros truc dégueulasse. Etonamment c'est là que les gens commencent à mourir. T'as déjà entendu parler de la Peste Noire ? Ouais ? Ben notre job c'est de faire en sorte que ce genre de catastrophe
        n'arrive pas. Ou plus. Cette ville est un véritable foyer pour toutes ces conneries. De temps en temps tu vas avoir affaire à un vampire ou à une liche, mais la plupart du temps c'est juste un abruti qui a voulu
        jouer au malin avec sa version crackée de '
        <i>La nécromancie pour les nuls</i>' et qui s'est retrouvé à invoquer un poltergeist qui lui a vidé la cervelle comme un petit gros face à un pot de glace.
        <br />
        <br />On est pas nombreux,
        il faut bien l'avouer, alors il te faudra sûrement travailler avec la population locale. Avec un peu de chance tu pourras choper les informations qui t'intéressent auprès des covens de sorcières habituels ou des
        punks technodruides, mais parfois tu auras besoin d'un peu plus de moyens. C'est là que les Sociétés Secrètes entrent en jeu. Ne cherche pas de loyauté chez elles, elles ne sont loyales qu'envers elles-mêmes, mais
        elles ont des informations et des ressources. Et elles ont besoin de nous, parce-qu'on a une puissance qu'elles n'ont pas - on est des demi-dieux, faut pas l'oublier ! Fait juste attention aux Illuminati par contre,
        ils trouveront toujours un moyen de te faire payer plus que ce que tu aurais dû.
        <br />
        <br />Si tu commences à te balader autour du globe, tu vas forcément rencontrer des Mythborns. Des elfes, des loups-garous, des
        dragons, des fées,... J'ai même rencontré un kangourou-garou (ou un kangarou si tu préfères) ! Il tenait pas en place mais c'était un sacré bon joueur de poker. Même si je reste persuadé qu'il cachait quelques as
        dans sa grosse poche...Enfin bref, ces Mythborns sont comme des gens normaux - certains sont sympas d'autres beaucoup moins - mais en général ils sont plus puissants et ont toujours une corde à leur arc. Essaie
        de te les mettre dans la poche si tu peux, les rumeurs vont vite dans ce monde.
        <br />
        <br />Mais ta plus grande aide viendra toujours de tes camarades Godborns. On est pas très nombreux et notre espérance de vie est assez courte alors il faut
        qu'on se serre les coudes. On est comme des étoiles filantes, on essaie d'écrire nos noms dans le ciel pendant qu'on le peut. On cherche tous la même carotte : l'Apothéose, le moment où un Godborn devient un Dieu.
        Et ouais ! L'immortalité mon gars ! Je suis quasiment sûr que si j'y arrive je deviendrai Dieu de l'Honneur. Ou du Rugby. Je suis pas encore décidé, mais j'ai encore du temps.
        <br />
        <br />De quoi ? 'Pourquoi les gens
        autour de nous ne voient pas les Dragons et les demi-dieux qui se baladent' ? C'est très simple : la vie de la plupart des gens est insignifiante. Il n'y a pas de secret ou de grande mascarade. Les gens sont juste
        des figurants, vraiment. Comme ils ne contribuent pas à la Légende, ils n'en font pas partie, c'est aussi simple que ça. A moins que tu les y inclue toi-même, là ils deviendraient liés à ta Légende...mais il faut
        garder en tête que le courageux petit acolyte humain fait rarement de vieux os dans ce qu'on vit au quotidien.
        <br />
        <br />Enfin bref, je diverge. Finis ta pinte, on va aller dans un entrepôt pas loin. T'as déjà tabassé
        un Géant de Feu ? Parce-que si on a de la chance, ça pourrait bien arriver ce soir. En attendant, profite bien de ton temps de demi-dieu sur Terre et essaie de pas trop causer de ruine et de dévastation. La paperasse
        est un véritable enfer."
      </p>
      <v-btn outlined color="red" block class="mb-3" :to="{path:'/wiki/lore/panthéons'}">
          <v-icon left>fa-dungeon</v-icon>Découvrir l'univers Wyrdwalkers
        </v-btn>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";

export default Vue.extend({
  name: "WikiHome",
  data: () => ({}),
  metaInfo: {
    title: "Wiki",
    link: [
      {rel: "canonical", href: "https://wyrdwalkers.com/wiki/home"},
      {rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico"}
    ],
    meta:[
      {name: "description", content: "Le codex officiel de l'univers Wyrdwalkers"},
      {name: "keywords", content: "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons"},
      {name: "author", content: "Thomas Gely"},
      {property: "og:url", content: "https://wyrdwalkers.com/wiki/home"},
      {property: "og:type", content: "website"},
      {property: "og:description", content: "Découvrez le wiki officiel de Wyrdwalkers"},
      {property: "og:image", content: "https://i.imgur.com/xSW0VL0.png"}
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

@media (max-width: 450px) {
  .logo-container {
    padding-top: calc(25vw - 0px);
  }

  .logo-container .spinning-logo {
    top: calc(25vw - 0px);
  }
}
</style>
