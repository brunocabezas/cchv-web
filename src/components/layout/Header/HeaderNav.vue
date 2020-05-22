<template>
  <div class="headerNav">
    <div
      v-bind:key="menu.label"
      v-for="menu in navigationMenu"
      class="headerNavItem"
    >
      <router-link
        v-if="!menu.pages || !menu.pages.length"
        :title="menu.label"
        :to="menu.url"
      >
        {{ menu.label }}
      </router-link>

      <div
        v-if="menu.pages && menu.pages.length"
        @mouseover="onHover(menu.label)"
        @mouseleave="onHoverLeave(menu.label)"
      >
        <router-link :title="menu.label" :to="menu.url">
          {{ menu.label }} {{ hoverState[menu.label] }}
        </router-link>
        <div v-if="hoverState[menu.label]" class="headerNavItemSubLevel">
          <div
            v-bind:key="submenu.label"
            v-for="submenu in menu.pages"
            class="headerNavItemSubMenu"
          >
            <a
              :target="submenu.is_external ? '_blank' : '_self'"
              :title="submenu.label"
              :href="submenu.url"
              >{{ submenu.label }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./headerNav.ts"></script>

<style lang="stylus">
@import '../../../styles/variables.styl';

.headerNavItem
  display: flex;
  align-items: center;
  padding: 0;
  position: relative;

  a
    display: flex;
    box-sizing: border-box;
    height: $header_height;
    align-items: center;
    font-family: Montserrat;
    text-transform: uppercase;
    padding: 1em 2em;
    transition: all 0.2s;

    &:hover
      background-color: $grey;

.headerNav
  display: flex;
  justify-content: flex-end;
  flex: 1;

  .headerNavItemSubLevel
    position: absolute;
    background-color: white;
    top: $header_height;
    left: 0;
    z-index: 2;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

    .headerNavItemSubMenu
      border-top: 1px solid $blue;
      text-transform: uppercase;

      &:hover
        background-color: darken($grey, 3);

      a
        height: auto;
</style>
