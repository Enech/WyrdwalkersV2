<template>
  <div class="pa-3">
      <v-parallax dark src="@/assets/fractal-969516.jpg" eager>
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-2 font-weight-thin mb-4">WYRDWALKERS</h1>
          <h3 class="headline">Quelle est votre Légende ?</h3>
        </v-col>
      </v-row>
      </v-parallax>
      <v-card>
          
      </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";

export default Vue.extend({
  name: "PersonalityTest",
  created: function() {},
  data: () => ({})
});
</script>