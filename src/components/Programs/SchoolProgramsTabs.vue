<template>
  <div class="schoolProgramTabs pageRow">
    <h2 class="pageTitleText">Escuelas</h2>
    <Loader :loading="isLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import Loader from "@/components/Loader.vue";
import Media from "@/components/Media.vue";
import useSchoolPrograms from "@/factories/useSchoolPrograms";

const DowneyProgramVideos = defineComponent({
  name: "SchoolProgramsTabs",
  components: {
    Loader,
    Media
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const {
      schoolPrograms,
      isLoading,
      fetchSchoolPrograms
    } = useSchoolPrograms();

    fetchSchoolPrograms();

    return { schoolPrograms, isLoading };
  }
});

export default DowneyProgramVideos;
</script>
<style lang="stylus">
@import '../../styles/variables.styl';

.schoolProgramTabs
  text-align: center;
  position: relative;
</style>
