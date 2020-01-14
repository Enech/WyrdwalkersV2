<template>
    <v-dialog persistent fullscreen v-model="open"></v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../../store";
import WikiPage from "../../model/WikiPage.model";

export default Vue.extend({
  name: "EditGeneral",
  props: {
      open: Boolean,
      content: WikiPage
  },
  created: function() {},
  data: () => ({
  }),
  methods: {
  }
});
</script>