<template>
  <div>
    <h1>Home</h1>
    <HomeCarousel />
    <HomeNews />
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

<style scoped></style>
