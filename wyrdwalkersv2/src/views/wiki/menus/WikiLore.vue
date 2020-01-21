<template>
  <div class="pa-3 ck-content">
    <v-card class="pa-3 lore" v-if="!loading" id="app-content-custom">
      <v-card-title class="headline">{{page.title.titleVF}}</v-card-title>
      <v-tabs grow show-arrows>
        <v-tab v-if="page.generalInfos != undefined" href="#tab-general">{{$t("wiki.contents.lore.general")}}</v-tab>
        <v-tab v-if="page.myth != undefined" href="#tab-myth">{{$t("wiki.contents.lore.myth")}}</v-tab>
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
              <v-col cols="12" md="9" v-html="this.$i18n.locale == 'fr' ? page.generalInfos.vf : page.generalInfos.vo"></v-col>
              <v-col cols="12" md="3">
                <wiki-meta :picture="page.content[0].picture" :pictureAuthor="page.content[0].picAuthor" :music="page.content[0].music"/>
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
              <v-col cols="12" md="9" v-html="this.$i18n.locale == 'fr' ? page.myth.vf : page.myth.vo"></v-col>
              <v-col cols="12" md="3">
                <wiki-meta :picture="page.content[0].picture" :pictureAuthor="page.content[0].picAuthor" :music="page.content[0].music"/>
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
              <v-col cols="12" md="9" v-html="this.$i18n.locale == 'fr' ? content.textVF : content.textVO"></v-col>
              <v-col cols="12" md="3">
                <wiki-meta :picture="content.picture" :pictureAuthor="content.picAuthor" :music="content.music"/>
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
import WikiMeta from "../../../components/wiki/WikiMeta.vue"

export default Vue.extend({
  name: "WikiLore",
  components: {
    "wiki-meta": WikiMeta
  },
  created: function() {
    this.fetchWikiPage(this.$route.params.pagename);
  },
  mounted() {
    document.dispatchEvent(new Event("custom-post-render-event"));
  },
  computed: {
    generalDefined: function(){
      return this.page.generalInfos != undefined && (this.page.generalInfos.vf !== '' || this.page.generalInfos.vo !== '')
    },
    mythDefined: function(){
      return this.page.myth != undefined && (this.page.myth.vf !== '' || this.page.myth.vo !== '')
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
    computeBreadcrumbs: function(content: any) {
      var result = new Array<any>();
      var factionCrumb = {};
      var teamCrumb = {};
      var nameCrumb = {
        text: this.page.title.titleVF,
        disabled: true
      };
      result.push({
        text: this.$i18n.locale == 'fr' ? "Accueil" : "Home",
        href: "/wiki/home"
      });
      // Le cas "empty" induit de ne pas mettre le breadcrumb correspondant danas la liste
      if (content.faction !== "empty") {
        switch (content.faction) {
          case "dieux":
            result.push({
              text: this.$i18n.locale == 'fr' ? "Panthéons" : "Pantheons",
              href: "/wiki/lore/panthéons"
            });
            break;
          case "society":
            result.push({
              text: this.$i18n.locale == 'fr' ? "Sociétés Secrètes" : "Secret Societies",
              href: "/wiki/lore/sociétés-secrètes"
            });
            break;
          case "otherworld":
            result.push({
              text: this.$i18n.locale == 'fr' ? "Outres-Mondes" : "Otherworlds",
              href: "/wiki/lore/outres-mondes"
            });
            break;
          case "titans":
            result.push({
              text: this.$i18n.locale == 'fr' ? "Royaumes Titaniques" : "Titanrealms",
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