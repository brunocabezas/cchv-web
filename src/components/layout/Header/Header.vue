<template>
  <div class="header">
    <Logo />
    <HeaderNav />
    <div class="headerNavItem">
      <a
        class="youtubeChannelLink"
        title="Canal de YouTube"
        :href="YOUTUBE_CHANNEL"
        target="_blank"
        rel="noopener noreferrer"
      >
        CCHV TV</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import HeaderNav from "@/components/layout/Header/HeaderNav.vue";
import Logo from "@/components/Logo.vue";
import { defineComponent } from "@vue/composition-api";
import { YOUTUBE_CHANNEL } from "@/utils/static";

const Header = defineComponent({
  name: "Header",
  components: { Logo, HeaderNav },
  setup() {
    return { YOUTUBE_CHANNEL };
  }
});

export default Header;
</script>
<style scoped lang="stylus">
@import '../../../styles/variables.styl';

.header
  display: flex;
  height: $header_height;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid $grey;

  .youtubeChannelLink
    font-size: 18px;
</style>
