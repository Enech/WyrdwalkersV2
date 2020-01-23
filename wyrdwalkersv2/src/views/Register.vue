<template>
  <div class="pa-3">
    <div v-if="!loading">
      <v-alert type="success" outlined v-if="activationSuccessful" v-html="$t('general.activation.success')"></v-alert>
      <v-alert
        type="error"
        outlined
        v-else
      >{{$t('general.activation.failure')}}</v-alert>
    </div>
    <div v-else>
      <v-dialog v-model="loading" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            {{$t('general.activation.loading')}}
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