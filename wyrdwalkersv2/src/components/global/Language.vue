<template>
    <div class="locale-changer">
        <v-menu v-if="false">
          <template v-slot:activator="{ on }">
            <v-btn small text v-on="on">
              <v-img :src="imgSrc"></v-img>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-content @click.stop="this.lang = 'fr'">
                <v-list-item-title>FR</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content @click.stop="this.lang = 'en'">
                <v-list-item-title>EN</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "LocaleChanger",
  created(){
    this.lang = this.$i18n.locale;
  },
  watch: {
    lang: function(){
        if(this.lang == 'fr'){
            this.imgSrc = "@/assets/fr.png";
        } else if(this.lang == 'en'){
            this.imgSrc = "@/assets/gb.png";
        }
        this.$i18n.locale = this.lang;
    }
  },
  data: () => ({
    lang: 'fr',
    imgSrc: '@/assets/fr.png'
  })
});
</script>