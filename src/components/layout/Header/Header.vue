<template>
  <div class="header">
    <div class="headerLeftSection">
      <Logo />
    </div>

    <div
      v-if="!displayNavigationMenuButton"
      class="headerRightSection headerRightSection--only-button"
    >
      <burger-button
        class="burgerButton"
        :active="isMenuOpen"
        :bar-color="isMenuOpen ? 'white' : 'black'"
        :bar-height="4"
        :bar-width="30"
        @click="toggleMenu"
        type="button"
      />
    </div>
    <div v-if="displayNavigationMenuButton" class="headerRightSection">
      <div class="socialNetworkContainer">
        <SocialNetworks small />
      </div>
      <div class="headerNavContainer">
        <HeaderNav />
        <div class="customHeaderNavItem headerNavItem">
          <a
            class="youtubeChannelLink"
            title="Canal de YouTube"
            :href="YOUTUBE_CHANNEL"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ YOUTUBE_CHANNEL_LABEL }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./header.ts"></script>
<style scoped lang="stylus">
@import '../../../styles/variables.styl';

.header
  background-color: $bg_color;
  z-index: 10;
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: $header_height;
  align-items: center;
  padding: 0 10px;
  border-bottom: 2px solid $grey;

  .headerLeftSection
    display: flex;
    height: $header_height;
    align-items: center;
    width: 300px;

  .headerRightSection
    display: flex;
    flex: 1;
    height: $header_height;
    width: 70%;
    flex-direction: column;

    &--only-button
      padding-right: 10px;
      justify-content: center;
      align-items: flex-end;

    .headerNavContainer
      display: flex;
      flex: 1;

      .youtubeChannelLink
        font-size: 18px;

    .socialNetworkContainer
      text-align: right;
      display: block;
      width: 100%;

  .customHeaderNavItem
    display: flex;
</style>

<style lang="stylus">
@import '../../../styles/variables.styl';

.header .headerRightSection
  .socialNetworks--small
    padding: 1em 2em 0 0;

    .socialNetwork:last-child
      margin-right: 0;
</style>

