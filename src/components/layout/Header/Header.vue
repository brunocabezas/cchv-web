<template>
  <header class="header" v-bind:class="{ 'header--small': !onBigScreen }">
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
      width="320"
      @closeMenu="onMenuChange"
      :isOpen="isNavOpen"
      :right="true"
      :closeOnNavigation="true"
      :burgerIcon="false"
      :crossIcon="false"
    >
      <div class="headerRightSection">
        <div v-if="onBigScreen" class="socialNetworkContainer">
          <SocialNetworks small />
        </div>
        <div class="headerNavContainer">
          <HeaderNav />
          <div class="customHeaderNavItem">
            <a
              class="headerNavItemLink youtubeChannelLink"
              title="Canal de YouTube"
              :href="YOUTUBE_CHANNEL_URL"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ YOUTUBE_CHANNEL_LABEL }}
            </a>
          </div>
          <div v-if="!onBigScreen" class="socialNetworkContainer">
            <div class="socialNetworkContainerTitle headerNavItem">
              Redes Sociales
            </div>
            <SocialNetworks color="white" />
          </div>
          <div class="contactContainer">
            <div class="contactContainerTitle headerNavItem">
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
            class="headerNavItemLink youtubeChannelLink"
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
  </header>
</template>
<script lang="ts" src="./header.ts"></script>
<style lang="stylus" src="./header.styl"></style>
<style lang="stylus">
@import '../../../styles/variables.styl';

.header .headerRightSection
  .socialNetworks--small
    padding: 1em 2em 0 0;

    .socialNetwork:last-child
      margin-right: 0;
</style>

