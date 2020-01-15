<template>
  <div class="custom-editor">
    <div :id="name"></div>
  </div>
</template>

<script>
import Vue from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default Vue.extend({
  name: "CKEditor",
  props: {
    htmlContent: String,
    name: String
  },
  data: function() {
    return {
      editor: {}
    };
  },
  methods: {},
  computed: {},
  mounted() {
    ClassicEditor.create(document.querySelector(`#${this.name}`))
    .then ((editeur => {
      editeur.setData(this.htmlContent);
      this.editor = editeur;
    }));
  }
});
</script>