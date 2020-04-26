<template lang="jsx">
  <div class="headerNav">
    <ul>
      <li v-for="menu in navigationMenu" class="headerNavItem">{{menu.label}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Pages, Page } from "@/types/index";
import { NAVIGATION_MENU } from "@/types/static";

export default defineComponent({
  setup(props) {
    return {
      navigationMenu: NAVIGATION_MENU
    };
  }
});
</script>

<style lang="stylus" scoped></style>
