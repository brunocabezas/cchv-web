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
      <nuxt-link
        class="headerNavItemLink"
        v-if="menu.url"
        :title="menu.label"
        :to="menu.url"
      >
        {{ menu.label }}
      </nuxt-link>

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
              class="headerNavItemLink"
              v-if="submenu.is_external"
              target="_blank"
              :title="submenu.label"
              :href="submenu.url"
              >{{ submenu.label }}</a
            >
            <nuxt-link class="headerNavItemLink" :to="submenu.url" v-else>
              {{ submenu.label }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./headerNav.ts"></script>
<style lang="stylus" src="./headerNav.styl"></style>
