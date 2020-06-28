<template>
  <div>
    <HomeCarousel />
    <HomeNews />
    <HomeVideos />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import HomeCarousel from "@/components/Home/HomeCarousel/HomeCarousel.vue";
import HomeNews from "@/components/Home/HomeNews/HomeNews.vue";
import HomeVideos from "@/components/Home/HomeVideosCarousel/HomeVideosCarousel.vue";

export default defineComponent({
  name: "Home",
  components: { HomeCarousel, HomeNews, HomeVideos }
});
</script>

<style lang="stylus">
@import '../../styles/variables.styl';

.homeSection
  width: $boxed_content_max_width;
  page_padding();
  position: relative;
  margin: 0 auto;

  &__title
    color: $blue;
    margin-bottom: 15px;
</style>
