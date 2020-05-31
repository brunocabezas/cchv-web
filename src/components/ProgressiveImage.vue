<template>
  <progressive-background :placeholder="src" :src="src">
    <div
      v-bind:class="{
        'progressiveImage--loading': visible,
        progressiveImage: true
      }"
      slot="content"
      slot-scope="{ visible }"
    >
      <Loader :loading="visible" />
      <slot></slot>
    </div>
  </progressive-background>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "@vue/composition-api";
import Loader from "@/components/Loader.vue";

const ProgressiveImage = defineComponent({
  name: "ProgressiveImage",
  props: {
    src: {
      type: String,
      required: true
    }
  },
  components: {
    Loader
  }
});

export default ProgressiveImage;
</script>

<style lang="stylus">
.progressive-background-image
  height: 100%;

.progressive-background, .progressive-background-image, .progressiveImage
  position: relative;

  .progressive-background-placeholder
    background-position: center center !important;
    background-size: contain;

  .loaderContainer
    top: calc((300px / 2) - 13px);
</style>
