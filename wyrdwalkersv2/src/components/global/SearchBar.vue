<template>
  <div>
    <v-text-field
      v-if="!mobileDevice"
      hide-details
      :label="$t('wiki.contents.search.bar.title')"
      v-model="search"
      clearable
      prepend-icon="search"
      @keyup.enter="goToResultPage();"
    ></v-text-field>
    <v-btn small text @click.stop="openDialog = true" v-else>
      <v-icon>search</v-icon>
    </v-btn>
    <v-dialog v-model="openDialog" max-width="250px">
      <v-card class="pa-3" id="app-content-custom">
        <v-card-title>{{$t('wiki.contents.search.bar.dialog')}}</v-card-title>
        <v-card-text>
          <v-text-field v-model="search" clearable @keyup.enter="goToResultPage();"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="black"
            @click="openDialog = false"
          >{{$t('general.dialogs.common.cancel')}}</v-btn>
          <v-btn
            text
            color="blue"
            :disabled="search.length == 0"
            :href="`/wiki/search/${search}`"
          >{{$t('wiki.contents.search.bar.button')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";
import vuetify from "../../plugins/vuetify";

export default Vue.extend({
  name: "SearchBar",
  computed: {
    mobileDevice: function() {
      return this.$vuetify.breakpoint.xs;
    }
  },
  methods: {
    goToResultPage: function() {
      var searchTab = this.search.split(" ");
      var searchQuery = searchTab.join("+");
      window.location.href = `/wiki/search/${searchQuery}`;
    }
  },
  data: () => ({
    search: "",
    openDialog: false
  })
});
</script>