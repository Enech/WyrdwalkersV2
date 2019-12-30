<template>
  <div class="pa-3">
    <div v-if="!loading">
      <v-alert type="success" outlined v-if="activationSuccessful">
        Votre compte est désormais activé. Connectez-vous en revenant sur le site en suivant
        <a
          href="/home"
        >ce lien</a>
      </v-alert>
      <v-alert
        type="error"
        outlined
        v-else
      >L'activation de votre compte n'a pas pu se faire suite à un problème technique. Veuillez contacter un administrateur pour activer votre compte manuellement</v-alert>
    </div>
    <div v-else>
      <v-dialog v-model="loading" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Activation de votre compte...
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../store";

export default Vue.extend({
  name: "Register",
  created: function() {
    this.activateUser();
  },
  computed: {
    userId: function() {
      return this.$route.params.idUser;
    },
    activationSuccessful: function() {
      return store.getters.activationSuccessful;
    }
  },
  methods: {
    activateUser: function() {
      store.dispatch("activateUser", this.userId).then(() => {
        this.loading = false;
      });
    }
  },
  data: () => ({
    loading: true
  })
});
</script>