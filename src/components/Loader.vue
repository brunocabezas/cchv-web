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
import { createComponent } from "@vue/composition-api"
import BounceLoader from "vue-spinner/src/BounceLoader.vue"

const Loader = createComponent({
  components: { BounceLoader },
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: "#00009f",
    },
    size: {
      type: String,
      default: "40px",
    },
  },
  name: "Loader",
})

export default Loader
</script>
<style lang="stylus">
.loader
  top 50%
  position absolute
  width 100%
  display flex
  align-items center
  justify-content center
</style>
