<template>
  <div class="page program">
    <div class="pageBox">
      <Loader v-if="!program" :loading="isLoading" />
      <div v-if="program" class="pageTitle">
        <h1 class="pageTitleText">{{ program.name }}</h1>
      </div>
      <Media />
      <div v-if="program" class="pageRow" v-html="program.text"></div>
      <DowneyProgramVideos />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import usePrograms from "@/factories/usePrograms";
import View from "@/types/viewTypes";
import Loader from "@/components/Loader.vue";
import Media from "@/components/Media.vue";
import DowneyProgramVideos from "@/components/Programs/DowneyProgramVideos.vue";

const ProgramPage = defineComponent({
  name: "ProgramPage",
  components: {
    Loader,
    DowneyProgramVideos,
    Media
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { getProgramById, isLoading } = usePrograms();

    const program = computed<View.Program | undefined>(() =>
      getProgramById(props.slug)
    );
    return { program, isLoading };
  }
});

export default ProgramPage;
</script>
<style lang="stylus">
@import '../../styles/variables.styl';
</style>
