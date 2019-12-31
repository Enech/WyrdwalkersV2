<template>
  <div class="pa-3">
    <v-card class="pa-3" v-if="!loading">
      <v-card-title class="headline">{{page.title.titleVF}}</v-card-title>
      <v-tabs grow show-arrows>
        <v-tab v-if="page.generalInfos != undefined" href="#tab-general">Général</v-tab>
        <v-tab v-if="page.myth != undefined" href="#tab-myth">Mythe</v-tab>
        <v-tab
          v-for="(content,index) in page.content"
          :key="index"
          :href="'#tab-' + content.timeline"
        >{{content.timeline}}</v-tab>
        <v-tab-item value="tab-general" v-if="page.generalInfos != undefined">
          <v-card class="pa-3" flat tile>
            <v-row dense>
              <v-col cols="12">
                <v-breadcrumbs
                  v-if="page._id.length > 0"
                  :items="computeBreadcrumbs(page.content[0])"
                ></v-breadcrumbs>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" md="9" v-html="page.generalInfos.vf"></v-col>
              <v-col cols="12" md="3">
                <v-img :src="page.content[0].picture" eager></v-img>
                <v-list-item class="blue mb-1" dark v-if="page.content[0].picture != ''">
                  <v-list-item-icon>
                    <v-icon small>edit</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <span v-if="page.content[0].picAuthor != ''">{{page.content[0].picAuthor}}</span>
                    <span v-else>Auteur inconnu</span>
                  </v-list-item-content>
                </v-list-item>
                <div v-if="page.content[0].music != ''">
                  <iframe
                    width="100%"
                    height="100"
                    :src="getEmbedUrl(page.content[0].music)"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                  ></iframe>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab-myth" v-if="page.myth != undefined">
          <v-card class="pa-3" tile flat>
            <v-row dense>
              <v-col cols="12">
                <v-breadcrumbs
                  v-if="page._id.length > 0"
                  :items="computeBreadcrumbs(page.content[0])"
                ></v-breadcrumbs>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" md="9" v-html="page.myth.vf"></v-col>
              <v-col cols="12" md="3">
                <v-img :src="page.content[0].picture" eager></v-img>
                <v-list-item class="blue mb-1" dark v-if="page.content[0].picture != ''">
                  <v-list-item-icon>
                    <v-icon small>edit</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <span v-if="page.content[0].picAuthor != ''">{{page.content[0].picAuthor}}</span>
                    <span v-else>Auteur inconnu</span>
                  </v-list-item-content>
                </v-list-item>
                <div v-if="page.content[0].music != ''">
                  <iframe
                    width="100%"
                    height="100"
                    :src="getEmbedUrl(page.content[0].music)"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                  ></iframe>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
        <v-tab-item
          v-for="(content,index) in page.content"
          :key="index"
          :value="'tab-' + content.timeline"
        >
          <v-card class="pa-3" tile flat>
            <v-row dense>
              <v-col cols="12">
                <v-breadcrumbs v-if="page._id.length > 0" :items="computeBreadcrumbs(content)"></v-breadcrumbs>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" md="9" v-html="content.textVF"></v-col>
              <v-col cols="12" md="3">
                <v-img :src="content.picture" eager></v-img>
                <v-list-item class="blue mb-1" dark v-if="content.picture != ''">
                  <v-list-item-icon>
                    <v-icon small>edit</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <span v-if="content.picAuthor != ''">{{content.picAuthor}}</span>
                    <span v-else>Auteur inconnu</span>
                  </v-list-item-content>
                </v-list-item>
                <div v-if="content.music != ''">
                  <iframe
                    width="100%"
                    height="100"
                    :src="getEmbedUrl(content.music)"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                  ></iframe>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <v-dialog v-model="loading" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Chargement...
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";
import WikiPage from "../../../model/WikiPage.model";

export default Vue.extend({
  name: "WikiLore",
  created: function() {
    this.fetchWikiPage(this.$route.params.pagename);
  },
  methods: {
    fetchWikiPage: function(name: string) {
      store.dispatch("fetchWikiPage", name).then(() => {
        this.page = store.getters.wikipage;
        this.loading = false;
      });
    },
    getEmbedUrl: function(url: string) {
      var urlTab = url.split("watch?v=");
      var videoId = urlTab[urlTab.length - 1];
      return `https://www.youtube.com/embed/${videoId}`;
    },
    computeBreadcrumbs: function(content: any) {
      var result = new Array<any>();
      var factionCrumb = {};
      var teamCrumb = {};
      var nameCrumb = {
        text: this.page.title.titleVF,
        disabled: true
      };
      result.push({
        text: "Accueil",
        href: "/wiki/home"
      });
      // Le cas "empty" induit de ne pas mettre le breadcrumb correspondant danas la liste
      if (content.faction !== "empty") {
        switch (content.faction) {
          case "dieux":
            result.push({
              text: "Panthéons",
              href: "/wiki/lore/panthéons"
            });
            break;
          case "society":
            result.push({
              text: "Sociétés Secrètes",
              href: "/wiki/lore/sociétés-secrètes"
            });
            break;
          case "otherworld":
            result.push({
              text: "Outres-Mondes",
              href: "/wiki/lore/outres-mondes"
            });
            break;
          case "titans":
            result.push({
              text: "Royaumes Titaniques",
              href: "/wiki/lore/titans"
            });
            break;
        }

        if (content.team !== "empty") {
          result.push({
            text: content.team,
            href: `/wiki/lore/${content.team}`
          });
        }
      }
      result.push(nameCrumb);

      return result;
    }
  },
  data: () => ({
    page: new WikiPage(),
    loading: true
  }),
  metaInfo: function() {
    var tempPage = this.page;
    return {
      title: tempPage ? `${tempPage.title.titleVF}` : "Wiki",
      meta: [
        {
          name: "description",
          content: tempPage ? `Page codex de ${tempPage.title.titleVF}` : "Page de codex"
        },
        {
          name: "keywords",
          content: tempPage ? `philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons,${tempPage.title.titleVF}` : "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons"
        },
        { name: "author", content: "Thomas Gely" },
        {
          property: "og:url",
          content: tempPage ? `https://wyrdwalkers.com/wiki/lore/${tempPage.title.titleVF}` : ""
        },
        { property: "og:type", content: "website" },
        {
          property: "og:description",
          content: tempPage ? `Page codex de ${tempPage.title.titleVF}` : "Page de codex"
        },
        { property: "og:image", content: "https://i.imgur.com/xSW0VL0.png" }
      ]
    };
  }
});
</script>