<template>
  <div class="residencies">
    <Loader :loading="isLoading" />
    asdas
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import Loader from "@/components/Loader.vue";
import ProgressiveImage from "@/components/ProgressiveImage.vue";
import useResidencies from "@/factories/useResidencies";

const Residency = defineComponent({
  name: "Residency",
  components: {
    Loader,
    ProgressiveImage
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { residencies, fetchResidencies, isLoading } = useResidencies();

    fetchResidencies();

    return { residencies, isLoading };
  }
});

export default Residency;
</script>
<style lang="stylus">
@import '../../../styles/variables.styl';

$margin_between_videos = 2em;
</style>
