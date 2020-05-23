<template>
  <div class="pageRow">
    <h2>Videos Ganadores</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import View from "@/types/viewTypes";
import Loader from "@/components/Loader.vue";
import useProgramVideos from "@/factories/usePrograms";

const DowneyProgramVideos = defineComponent({
  name: "DowneyProgramVideos",
  components: {
    Loader
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { getProgramById, isLoading } = useProgramVideos();

    const program = computed<View.Program | undefined>(() =>
      getProgramById(props.slug)
    );
    return { program, isLoading };
  }
});

export default DowneyProgramVideos;
</script>
<style lang="stylus">
@import '../../styles/variables.styl';
</style>
