<template>
  <div>
    <h1>Home</h1>
    <HomeSlides />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeSlides from "./HomeSlides.vue";

export default defineComponent({
  name: "Home",
  components: { HomeSlides }
});
</script>

<style scoped></style>
