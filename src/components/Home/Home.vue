<template>
  <div>
    <HomeCarousel />
    <HomeNews />
    <div class="tv home-section">
      <h1 class="home-section__title">CChV TV</h1>
      <div class="video">
        <iframe
          width="100%"
          height="500"
          :src="videoUrl"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
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
      videoUrl: "http://www.youtube.com/watch?v=A8cIR54emmY"
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
