<template>
    <div class="pa-3">
        <v-card class="pa-3">
            <v-card-title>Panneau d'administration</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                Quelques statistiques :
            </v-card-text>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../../store";

export default Vue.extend({
  name: "AdminHome",
  data: () => ({})
});
</script>