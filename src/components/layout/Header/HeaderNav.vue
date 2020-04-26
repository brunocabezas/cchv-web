<template lang="jsx">
  <div class="headerNav">
    <ul>
      <li v-for="menu in navigationMenu" class="headerNavItem">{{menu.label}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Pages, Page } from "@/types";

const AboutPage: Page = { url: "", label: "about" };
const ProgramsPage: Page = { url: "", label: "programs" };
const CCHVTVPage: Page = { url: "", label: "TV" };
// Defines the order of appeareance
const navigationMenu: Pages = [AboutPage, ProgramsPage, CCHVTVPage];

export default defineComponent({
  setup(props) {
    return {
      navigationMenu
    };
  }
});
</script>

<style lang="stylus" scoped></style>
