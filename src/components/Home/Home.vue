<template>
  <div>
    <HomeCarousel />
    <HomeNews />
    <div class="tv homeSection">
      <h1 class="homeSection__title">CChV TV</h1>
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
import HomeCarousel from "@/components/Home/HomeCarousel/HomeCarousel.vue";
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

.homeSection
  max-width: $boxed_content_max_width;
  padding: $footer_padding;
  position: relative;
  margin: 0 auto;

  &__title
    color: $blue;
    margin-bottom: 15px;
</style>
