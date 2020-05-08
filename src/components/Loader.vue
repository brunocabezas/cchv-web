<template>
  <div v-if="loading">
    Loading...
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

const Loader = defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  name: "Loader",
  setup({ loading }) {
    return { loading };
  }
});

export default Loader;
</script>
<style lang="stylus"></style>
