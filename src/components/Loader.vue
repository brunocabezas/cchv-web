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
import { MAIN_COLOR } from "@/utils/static";

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
.loader
  top: 50%;
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
</style>
