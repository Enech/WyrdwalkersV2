<template>
    <div class="locale-changer">
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn small text v-on="on">
              <img :src="imgSrc" />
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click.stop="lang = 'fr'">
              <v-list-item-content>
                <v-list-item-title>FR</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="lang = 'en'">
              <v-list-item-content>
                <v-list-item-title>EN</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from '../../store'

export default Vue.extend({
  name: "LocaleChanger",
  created(){
    this.lang = this.storeLang;
  },
  computed: {
    storeLang: {
      get: function(){
        return store.getters.appLanguage;
      },
      set: function(lang: string){
        store.commit("setAppLanguage", lang);
      }
    }
  },
  watch: {
    lang: function(){
        if(this.lang == 'fr'){
            this.imgSrc = "@/assets/fr.png";
        } else if(this.lang == 'en'){
            this.imgSrc = "@/assets/gb.png";
        }
        this.$i18n.locale = this.lang;
        this.storeLang = this.lang;
    }
  },
  data: () => ({
    lang: 'fr',
    imgSrc: '@/assets/fr.png'
  })
});
</script>