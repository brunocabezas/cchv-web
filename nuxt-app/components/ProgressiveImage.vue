<template>
  <progressive-background
    v-bind:style="{ height }"
    :class="`progressiveImage ${className}`"
    :placeholder="src"
    :src="src"
  >
    <div slot="content" slot-scope="{ visible }" v-bind:style="{ height }">
      <Loader
        :color="loaderColor"
        size="20px"
        v-if="!!src && visible"
        :loading="visible"
      />
    </div>
  </progressive-background>
</template>

<script lang="ts">
// https://github.com/MatteoGabriele/vue-progressive-image
import { defineComponent } from "@vue/composition-api";
import Loader from "@/components/Loader.vue";
import { DARKER_MAIN_COLOR } from "@/utils/constants"

const ProgressiveImage = defineComponent({
  name: "ProgressiveImage",
  props: {
    src: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: "300px",
      required: false
    },
    className: {
      type: String,
      default: "",
      required: false
    }
  },
  components: {
    Loader
  },
  setup() {
    return {
      loaderColor: DARKER_MAIN_COLOR
    };
  }
});

export default ProgressiveImage;
</script>
<style lang="stylus" scoped>
@import '~assets/variables.styl';

.progressiveImage
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $blue;
</style>