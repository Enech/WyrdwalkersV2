<template>
  <div class="quill-editor">
    <quill-editor
      :ref="refName"
      :content="content"
      :options="editorOption"
      @change="onEditorChange($event)"
    ></quill-editor>
  </div>
</template>

<script>
export default Vue.extend({
  name: "QuillEditor",
  props: {
    content: String,
    refName: String
  },
  data: () => ({
    editorOption: {
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["clean"],
          ["link", "image"]
        ]
      }
    }
  }),
  methods: {},
  computed: {
    editor() {
      return this.$refs[this.refName].quill;
    }
  },
  mounted() {}
});
</script>