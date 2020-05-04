<template>
  <div>
    <h1>Home</h1>
    <HomeCarousel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeCarousel from "./HomeCarousel.vue";

export default defineComponent({
  name: "Home",
  components: { HomeCarousel }
});
</script>

<style scoped></style>
