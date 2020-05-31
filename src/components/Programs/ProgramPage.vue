<template>
  <div class="page program">
    <Loader v-if="!program" :loading="isLoading" />
    <div v-if="program" class="pageTitle">
      <h1 class="pageTitleText">{{ program.name }}</h1>
    </div>
    <Media />
    <div v-if="program" class="pageRow programText" v-html="program.text"></div>
    <DowneyProgramVideos v-if="isDowneyProgram" />
    <SchoolProgramsTabs v-if="isSchoolProgram" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import usePrograms from "@/factories/usePrograms";
import View from "@/types/viewTypes";
import Loader from "@/components/Loader.vue";
import Media from "@/components/Media.vue";
import DowneyProgramVideos from "@/components/Programs/DowneyProgramVideos.vue";
import SchoolProgramsTabs from "@/components/Programs/SchoolProgramsTabs.vue";

const ProgramPage = defineComponent({
  name: "ProgramPage",
  components: {
    Loader,
    DowneyProgramVideos,
    SchoolProgramsTabs,
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
    return {
      program,
      isLoading,
      isMagneticFieldsProgram: computed(
        () => program.value && program.value.extra_content === "activities"
      ),
      isSchoolProgram: computed(
        () => program.value && program.value.extra_content === "schools"
      ),
      isDowneyProgram: computed(
        () => program.value && program.value.extra_content === "videos"
      )
    };
  }
});

export default ProgramPage;
</script>
<style lang="stylus">
@import '../../styles/variables.styl';

.program
  .programText.pageRow
    display: block;
</style>
