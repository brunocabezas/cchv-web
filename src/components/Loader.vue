<template>
  <div class="loader">
    <bounce-loader
      :loading="loading"
      :color="color"
      :size="size"
    ></bounce-loader>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import BounceLoader from "vue-spinner/src/BounceLoader.vue";
import { MAIN_COLOR } from "@/utils/constants";

const Loader = defineComponent({
  components: { BounceLoader },
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: MAIN_COLOR
    },
    size: {
      type: String,
      default: "40px"
    }
  },
  name: "Loader"
});

export default Loader;
</script>
<style lang="stylus">
@import '../styles/variables.styl';

.loader
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  max-width: $boxed_content_max_width;
  justify-content: center;
</style>
