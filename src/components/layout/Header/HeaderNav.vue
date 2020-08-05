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

<style scoped lang="stylus">
@import '../../../styles/variables.styl';

.headerNavItem
  display: flex;
  align-items: center;
  padding: 0;
  position: relative;

  @media (max-width: $md)
    flex-direction: column;
    width: 100%;
    // Display a line on the bottom of each menu
    border-bottom: 1px solid white;
    margin-bottom: 10px;
    padding-bottom: 10px;
    align-items: flex-start;

  &:hover
    .headerNavItemSubMenuContainer
      display: block;

  .headerNavItemSubMenuContainer
    display: none;

    @media (max-width: $md)
      display: block;
      width: 100%;

  > div
    height: 100%;

  a, .headerNavItemLink
    color: $blue;
    display: flex;
    height: 100%;
    align-items: center;
    font-family: Montserrat;
    text-transform: uppercase;
    padding: 1em 1em;
    transition: all 0.2s;

    @media (max-width: $md)
      color: white;
      width: 100%;
      padding: 5px 0;

    &:hover
      background-color: $grey;

  a:hover
    @media (max-width: $md)
      text-decoration: underline;

  .headerNavItemLink
    @media (max-width: $md)
      underline();

.headerNav
  display: flex;
  justify-content: flex-end;
  flex: 1;
  font-size: 18px;

  @media (max-width: $md)
    flex-direction: column;
    align-items: flex-start;
    padding: 0;

  .headerNavItemSubLevel
    position: absolute;
    background-color: white;
    top: 64px;
    left: 0;
    z-index: 2;
    white-space: nowrap;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

    @media (max-width: $md)
      position: initial;
      background-color: $dark-blue;
      text-align: right;
      box-shadow: none;

    .headerNavItemSubMenu
      border-top: 1px solid $blue;
      text-transform: uppercase;
      font-size: 14px;

      &:hover
        background-color: darken($grey, 3);

        a
          height: auto;
</style>
