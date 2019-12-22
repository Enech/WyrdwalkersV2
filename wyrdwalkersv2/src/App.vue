<template>
  <v-app>
    <wyrd-appbar />
    <v-content fluid>
      <router-view />
    </v-content>
    <v-footer dark color="black" app padless>
      <v-card color="black" flat tile width="100%">
        <v-row align="center" class="pa-0">
          <v-col cols="12" sm="6" class="pa-0">
            <v-card-text class="white--text text-center pa-0">
              <v-btn small dark icon href="mailto:mastersoffate@wyrdwalkers.com" class="mx-4">
                <v-icon>fa-envelope</v-icon>
              </v-btn>
              <v-btn
                dark
                small
                icon
                href="https://www.helloasso.com/associations/wyrdwalkers/formulaires/1"
                target="_blank"
                class="mx-4"
              >
                <v-icon>fa-hand-holding-usd</v-icon>
              </v-btn>
              <div
                class="fb-like"
                data-href="https://www.facebook.com/wyrdwalkers"
                data-width
                data-layout="button_count"
                data-action="like"
                data-size="large"
                data-share="false"
              ></div>
            </v-card-text>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-text class="white--text text-center pa-0">
              {{ new Date().getFullYear() }} ©
              <strong>Wyrdwalkers</strong>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "@/components/global/AppBar.vue";

export default Vue.extend({
  name: "App",

  components: {
    "wyrd-appbar": AppBar
  },

  data: () => ({
    //
  })
});
</script>
