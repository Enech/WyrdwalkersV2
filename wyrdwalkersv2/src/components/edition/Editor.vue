<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <div class="toolbar">
          <button class="menubar__button" @click="commands.undo">
            <v-icon>undo</v-icon>
          </button>

          <button class="menubar__button" @click="commands.redo">
            <v-icon>redo</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <v-icon>format_bold</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <v-icon>format_italic</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <v-icon>format_strikethrough</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <v-icon>format_underline</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <v-icon>code</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <v-icon>fa-paragraph</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >H1</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >H2</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >H3</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <v-icon>format_list_bulleted</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <v-icon>format_list_numbered</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <v-icon>format_quote</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <v-icon>code</v-icon>
          </button>

          <button
            class="menubar__button"
            @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
          >
            <v-icon>table</v-icon>
          </button>

          <span v-if="isActive.table()">
            <button class="menubar__button" @click="commands.deleteTable">
              <v-icon></v-icon>
            </button>
            <button class="menubar__button" @click="commands.addColumnBefore">
              <v-icon></v-icon>
            </button>
            <button class="menubar__button" @click="commands.addColumnAfter">
              <v-icon></v-icon>
            </button>
            <button class="menubar__button" @click="commands.deleteColumn">
              <v-icon></v-icon>
            </button>
            <button class="menubar__button" @click="commands.addRowBefore">
              <v-icon></v-icon>
            </button>
            <button class="menubar__button" @click="commands.addRowAfter">
              <v-icon></v-icon>
            </button>
            <button class="menubar__button" @click="commands.deleteRow">
              <v-icon></v-icon>
            </button>
            <button class="menubar__button" @click="commands.toggleCellMerge">
              <v-icon></v-icon>
            </button>
          </span>
        </div>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Strike,
  Underline,
  History
} from "tiptap-extensions";
export default Vue.extend({
  name: "Editor",
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {
    editorContent: String
  },
  created(){
    this.editor.content = this.editorContent;
  },
  data: () => ({
    editor: new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new Table({
          resizable: true
        }),
        new TableHeader(),
        new TableCell(),
        new TableRow()
      ],
      content: ''
    })
  }),
  beforeDestroy() {
    this.editor.destroy();
  }
});
</script>