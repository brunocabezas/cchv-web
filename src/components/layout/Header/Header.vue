<template>
  <div class="header" v-bind:class="{ 'header--small': !onBigScreen }">
    <div class="headerLeftSection"><Logo /></div>
    <div
      v-if="!onBigScreen"
      class="headerRightSection headerRightSection--with-button"
    >
      <burger-button
        class="burgerButton"
        :active="isNavOpen"
        bar-color="white"
        :bar-height="4"
        :bar-width="30"
        @click="toggleMenu"
        type="button"
      />
    </div>
    <Slide
      v-if="!onBigScreen"
      width="350"
      @closeMenu="onMenuChange"
      :isOpen="isNavOpen"
      :right="true"
      :closeOnNavigation="true"
      :burgerIcon="false"
      :crossIcon="false"
    >
      <div class="headerRightSection">
        <div v-if="!onBigScreen" class="socialNetworkContainer">
          <SocialNetworks small />
        </div>
        <div class="headerNavContainer">
          <HeaderNav />
          <div class="customHeaderNavItem">
            <a
              class="youtubeChannelLink"
              title="Canal de YouTube"
              :href="YOUTUBE_CHANNEL_URL"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ YOUTUBE_CHANNEL_LABEL }}
            </a>
          </div>
          <div v-if="onBigScreen" class="socialNetworkContainer">
            <div class="socialNetworkContainerTitle headerNavItem">
              Redes Sociales
            </div>
            <SocialNetworks color="white" />
          </div>
          <div class="socialNetworkContainer">
            <div class="socialNetworkContainerTitle headerNavItem">
              Contacto
            </div>
            <a class="headerNavItemLink" href="mailto:info@cchv.cl"
              >info@cchv.cl</a
            >
          </div>
        </div>
      </div>
    </Slide>
    <div v-else class="headerRightSection">
      <div class="socialNetworkContainer">
        <SocialNetworks small />
      </div>
      <div class="headerNavContainer">
        <HeaderNav />
        <div class="customHeaderNavItem">
          <a
            class="youtubeChannelLink"
            title="Canal de YouTube"
            :href="YOUTUBE_CHANNEL_URL"
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
<style lang="stylus">
@import '../../../styles/variables.styl';

.bm-menu
  background-color: $dark-blue;
  height: 500px;
  padding-top: 0;
  margin-top: $header_mobile_height;

  .bm-item-list
    padding-left: 0;
    margin-left: 0;

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
  transition: 0.2s;

  &.header--small
    background-color: $blue;
    height: $header_mobile_height;
    position: relative;

    .headerLeftSection, .headerRightSection
      height: $header_mobile_height;

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

    @media (max-width: $md)
      width: 100%;

    &--with-button
      @media (max-width: $md)
        position: initial;

      padding-right: 10px;
      justify-content: center;
      align-items: flex-end;

    .headerNavContainer
      display: flex;
      flex: 1;

      @media (max-width: $md)
        flex-direction: column;

      .youtubeChannelLink
        font-size: 18px;

.customHeaderNavItem
  // as headerNavItemLink
  a
    display: flex;
    align-items: center;
    height: 100%;
    font-family: Montserrat;
    width: 100%;
    padding: 0 25px;

    &:hover
      background-color: $grey;

    @media (max-width: $md)
      font-size: 18px;
      padding-bottom: 5px;
      margin-bottom: 15px;
      border-bottom: 1px solid white;
      color: white;

// Only on @media (max-width: $md)
.socialNetworkContainer
  padding: 0 0 0 25px;
  margin-top: 10px;
  text-align: right;

  .headerNavItemLink
    font-style: 16px;
    color: white;

  .socialNetworkContainerTitle
    width: 100%;
    padding-bottom: 5px;
    margin-bottom: 15px;
    border-bottom: 1px solid #fff;
    color: #fff;
    text-transform: uppercase;
    font-family: Montserrat;
    font-size: 18px;
</style>

<style lang="stylus">
@import '../../../styles/variables.styl';

.header .headerRightSection
  .socialNetworks--small
    padding: 1em 2em 0 0;

    .socialNetwork:last-child
      margin-right: 0;
</style>

