<template>
  <div class="header">
    <div class="headerLeftSection">
      <Logo />
    </div>
    <div class="headerRightSection">
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

<script lang="ts">
import HeaderNav from "@/components/layout/Header/HeaderNav.vue";
import Logo from "@/components/Logo.vue";
import SocialNetworks from "@/components/SocialNetworks.vue";
import { defineComponent } from "@vue/composition-api";
import { YOUTUBE_CHANNEL, YOUTUBE_CHANNEL_LABEL } from "@/utils/static";

const Header = defineComponent({
  name: "Header",
  components: { Logo, HeaderNav, SocialNetworks },
  setup() {
    return { YOUTUBE_CHANNEL, YOUTUBE_CHANNEL_LABEL };
  }
});

export default Header;
</script>
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
  justify-content: center;
  border-bottom: 2px solid $grey;

  .headerLeftSection
    display: flex;
    height: $header_height;
    align-items: center;
    width: 30%;

  .headerRightSection
    display: flex;
    height: $header_height;
    width: 70%;
    flex-direction: column;

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

