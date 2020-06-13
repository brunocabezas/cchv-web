<template>
  <div class="headerNav">
    <div
      v-bind:key="menu.label"
      v-for="menu in navigationMenu"
      class="headerNavItem"
      v-bind:class="{
        'headerNavItem--nested': menu.pages && menu.pages.length
      }"
    >
      <router-link v-if="menu.url" :title="menu.label" :to="menu.url">
        {{ menu.label }}
      </router-link>

      <span class="headerNavItemLink" v-else>{{ menu.label }}</span>

      <div
        class="headerNavItemSubMenuContainer"
        v-if="menu.pages && menu.pages.length > 0"
      >
        <div class="headerNavItemSubLevel">
          <div
            v-bind:key="submenu.label"
            v-for="submenu in menu.pages"
            class="headerNavItemSubMenu"
          >
            <a
              v-if="submenu.is_external"
              target="_blank"
              :title="submenu.label"
              :href="submenu.url"
              >{{ submenu.label }}</a
            >
            <router-link :to="submenu.url" v-else>{{
              submenu.label
            }}</router-link>
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

  &:hover
    .headerNavItemSubMenuContainer
      display: block;

  .headerNavItemSubMenuContainer
    display: none;

  > div
    height: 100%;

  a, .headerNavItemLink
    color: $blue;
    display: flex;
    box-sizing: border-box;
    height: 100%;
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
  font-size: 18px;

  .headerNavItemSubLevel
    position: absolute;
    background-color: white;
    top: 68px;
    left: 0;
    z-index: 2;
    white-space: nowrap;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

    .headerNavItemSubMenu
      border-top: 1px solid $blue;
      text-transform: uppercase;
      font-size: 14px;

      &:hover
        background-color: darken($grey, 3);

      a
        height: auto;
</style>
