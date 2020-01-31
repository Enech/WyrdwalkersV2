<template>
  <div class="pa-3 ck-content">
    <v-card class="pa-3 lore" v-if="!loading" id="app-content-custom">
      <v-card-title class="headline">{{$i18n.locale.toLowerCase() == 'fr' ? page.title.titleVF : page.title.titleVO}}</v-card-title>
      <v-tabs grow show-arrows>
        <v-tab
          v-if="generalDefined"
          href="#tab-general"
        >{{$t("wiki.contents.lore.general")}}</v-tab>
        <v-tab v-if="mythDefined" href="#tab-myth">{{$t("wiki.contents.lore.myth")}}</v-tab>
        <v-tab
          v-for="(content,index) in page.content"
          :key="index"
          :href="'#tab-' + content.timeline"
        >{{content.timeline}}</v-tab>
        <v-tab-item value="tab-general" v-if="generalDefined">
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
              <v-col
                cols="12"
                md="9"
                v-html="$i18n.locale.toLowerCase() == 'fr' ? computeLinks(page.generalInfos.vf) : computeLinks(page.generalInfos.vo)"
              ></v-col>
              <v-col cols="12" md="3">
                <v-img :src="page.content[0].picture" eager></v-img>
                <v-list-item class="blue mb-1" dark v-if="page.content[0].picture != ''">
                  <v-list-item-icon>
                    <v-icon small>edit</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <span v-if="page.content[0].picAuthor != ''">{{page.content[0].picAuthor}}</span>
                    <span v-else>{{$t("wiki.contents.lore.noAuthor")}}</span>
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
        <v-tab-item value="tab-myth" v-if="mythDefined">
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
              <v-col cols="12" md="9" v-html="$i18n.locale.toLowerCase() == 'fr' ? computeLinks(page.myth.vf) : computeLinks(page.myth.vo)"></v-col>
              <v-col cols="12" md="3">
                <v-img :src="page.content[0].picture" eager></v-img>
                <v-list-item class="blue mb-1" dark v-if="page.content[0].picture != ''">
                  <v-list-item-icon>
                    <v-icon small>edit</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <span v-if="page.content[0].picAuthor != ''">{{page.content[0].picAuthor}}</span>
                    <span v-else>{{$t("wiki.contents.lore.noAuthor")}}</span>
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
              <v-col
                cols="12"
                md="9"
                v-html="$i18n.locale.toLowerCase() == 'fr' ? computeLinks(content.textVF) : computeLinks(content.textVO)"
              ></v-col>
              <v-col cols="12" md="3">
                <v-img :src="content.picture" eager></v-img>
                <v-list-item class="blue mb-1" dark v-if="content.picture != ''">
                  <v-list-item-icon>
                    <v-icon small>edit</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <span v-if="content.picAuthor != ''">{{content.picAuthor}}</span>
                    <span v-else>{{$t("wiki.contents.lore.noAuthor")}}</span>
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
          {{$t("wiki.contents.lore.loading")}}
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
  mounted() {
    document.dispatchEvent(new Event("custom-post-render-event"));
  },
  computed: {
    generalDefined: function() {
      return (
        this.page.generalInfos != undefined &&
        (this.page.generalInfos.vf !== "" || this.page.generalInfos.vo !== "")
      );
    },
    mythDefined: function() {
      return (
        this.page.myth != undefined &&
        (this.page.myth.vf !== "" || this.page.myth.vo !== "")
      );
    }
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
    computeLinks(html: string){
      var container = document.createElement("div");
      container.innerHTML = html;
      var linkElements = container.querySelectorAll("a");
      
      for(var i = 0; i < linkElements.length; i++){
        var link = linkElements[i];
        var url = link.href;

        if(!url.includes("/wiki/lore/") && !url.includes("http://") && !url.includes("https://")){
          var targetTab = url.split("/");
          var target = targetTab[targetTab.length - 1];
          link.href = "/wiki/lore/" + target.toLowerCase().replace(" ", "-");
        }
      }
      return container.innerHTML;
    },
    computeBreadcrumbs: function(content: any) {
      var result = new Array<any>();
      var factionCrumb = {};
      var teamCrumb = {};
      var nameCrumb = {
        text: this.$i18n.locale.toLowerCase() == "fr" ? this.page.title.titleVF : this.page.title.titleVO,
        disabled: true
      };
      result.push({
        text: this.$i18n.locale.toLowerCase() == "fr" ? "Accueil" : "Home",
        href: "/wiki/home"
      });
      // Le cas "empty" induit de ne pas mettre le breadcrumb correspondant danas la liste
      if (content.faction !== "empty" && content.faction !== "") {
        switch (content.faction) {
          case "dieux":
            result.push({
              text: this.$i18n.locale.toLowerCase() == "fr" ? "Panthéons" : "Pantheons",
              href: "/wiki/lore/panthéons"
            });
            break;
          case "society":
            result.push({
              text:
                this.$i18n.locale.toLowerCase() == "fr"
                  ? "Sociétés Secrètes"
                  : "Secret Societies",
              href: "/wiki/lore/sociétés-secrètes"
            });
            break;
          case "otherworld":
            result.push({
              text: this.$i18n.locale.toLowerCase() == "fr" ? "Outres-Mondes" : "Otherworlds",
              href: "/wiki/lore/outres-mondes"
            });
            break;
          case "titans":
            result.push({
              text:
                this.$i18n.locale.toLowerCase() == "fr"
                  ? "Royaumes Titaniques"
                  : "Titanrealms",
              href: "/wiki/lore/titans"
            });
            break;
        }

        if (content.team !== "empty" && content.team !== "") {
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
      link: [
        {
          rel: "canonical",
          href: `https://wyrdwalkers.com/wiki/lore/${tempPage.title.titleVF
            .toLowerCase()
            .replace(" ", "-")}`
        },
        { rel: "icon", href: "https://wyrdwalkers.com/faviconWW.ico" }
      ],
      meta: [
        {
          name: "description",
          content: tempPage
            ? `Page codex de ${tempPage.title.titleVF}`
            : "Page de codex"
        },
        {
          name: "keywords",
          content: tempPage
            ? `philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons,${tempPage.title.titleVF}`
            : "philosophy,philosophie,mythologie,mythologie,codex,association,panthéons,fate,destin,dieux,titans,dragons"
        },
        { name: "author", content: "Thomas Gely" },
        {
          property: "og:url",
          content: tempPage
            ? `https://wyrdwalkers.com/wiki/lore/${tempPage.title.titleVF
                .toLowerCase()
                .replace(" ", "-")}`
            : ""
        },
        { property: "og:type", content: "website" },
        {
          property: "og:description",
          content: tempPage
            ? `Page codex de ${tempPage.title.titleVF}`
            : "Page de codex"
        },
        { property: "og:image", content: "https://i.imgur.com/xSW0VL0.png" }
      ]
    };
  }
});
</script>