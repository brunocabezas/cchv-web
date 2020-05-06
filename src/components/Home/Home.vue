<template>
  <div>
    <HomeCarousel />
    <HomeNews />
    <div class="tv home-section">
      <h1 class="home-section__title">CChV TV</h1>
      <div class="video"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeCarousel from "./HomeCarousel.vue";
import HomeNews from "./HomeNews.vue";

export default defineComponent({
  name: "Home",
  components: { HomeCarousel, HomeNews }
});
</script>

<style lang="stylus">
@import '../../styles/variables.styl';

.home-section
  padding: $home_padding;

  &__title
    color: $blue;
    margin-bottom 0
</style>
