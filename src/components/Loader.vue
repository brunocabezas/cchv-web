<template>
  <div v-if="loading">
    Loading...
  </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

const Loader = createComponent({
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  name: "Loader",
});

export default Loader;
</script>
<style lang="stylus"></style>
