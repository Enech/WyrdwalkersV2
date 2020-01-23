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
      <h3 class="display-1 font-weight-light uppercase pa-3 text-center">{{$t("wiki.contents.home.header")}}</h3>
      <p class="body-1 article-look-3" v-html="$t('wiki.contents.home.text')"></p>
      <v-btn outlined color="red" block class="mb-3" :to="{path:'/wiki/lore/panthéons'}">
          <v-icon left>fa-dungeon</v-icon>{{$t("wiki.contents.home.action")}}
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
