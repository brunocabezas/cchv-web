<template lang="jsx">
  <div class="headerNav">
    <div v-for="menu in navigationMenu" class="headerNavItem">
      <router-link :title="menu.label" :to="menu.url">{{menu.label}}</router-link>
      <div v-if="menu.pages" class="headerNavItemSubLevel" >
          <div v-for="submenu in menu.pages" class="headerNavItemSubMenu">
            <a :href="submenu.url">{{submenu.label}}</a>
          </div>
      </div>  
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { NAVIGATION_MENU } from "@/utils/static";

export default defineComponent({
  name: "HeaderNav",
  setup() {
    return {
      navigationMenu: NAVIGATION_MENU
    };
  }
});
</script>

<style lang="stylus" scoped>
@import '../../../styles/variables.styl';

.headerNav
  display: flex;
  justify-content: flex-end;
  flex: 1;

  .headerNavItem
    display: flex;
    align-items: center;
    padding: 0;

    a
      display: flex;
      height: $header_height;
      align-items: center;
      font-family: Montserrat;
      padding: 1em 2em;
      transition: background-color 0.2s;

      &:hover
        background-color: $grey;

    .headerNavItemSubLevel, .headerNavItemSubMenu
      display none // TODO Remove
</style>
