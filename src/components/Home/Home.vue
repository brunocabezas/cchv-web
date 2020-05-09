<template>
  <div>
    <HomeCarousel />
    <HomeNews />
    <div class="tv home-section">
      <h1 class="home-section__title">CChV TV</h1>
      <div class="video">
        <youtube
          height="500px"
          width="100%"
          :video-id="videoId"
          ref="youtube"
        ></youtube>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import HomeCarousel from "./HomeCarousel.vue";
import HomeNews from "./HomeNews.vue";

export default defineComponent({
  name: "Home",
  components: { HomeCarousel, HomeNews },
  setup() {
    return {
      videoId: "A8cIR54emmY"
    };
  }
});
</script>

<style lang="stylus">
@import '../../styles/variables.styl';

.home-section
  padding: $home_padding;

  &__title
    color: $blue;
    margin-bottom: 15px;
</style>
