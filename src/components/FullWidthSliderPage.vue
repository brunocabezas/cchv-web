<template>
  <div class="page pageWithFullWidthSlider">
    <Loader :loading="isLoading" />
    <div v-if="page" class="pageFullWidthSlider">
      <Media
        hideLightBox
        height="80vh"
        :youtubeUrl="page.video_url"
        :gallery="page.gallery"
      />
    </div>
    <div v-if="page" class="pageTitle">
      <h1 class="pageTitleText">{{ page && page.name }}</h1>
    </div>

    <div v-if="page" class="pageContent">
      <div v-html="page.text" class="pageBody"></div>
      <div v-if="page.pdf" class="pageBody">
        <DownloadLink label="Descargar programa completo" :url="page.pdf" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "@vue/composition-api";
import { SchoolProgram, Activity } from "../types/viewTypes";
import Loader from "@/components/Loader.vue";
import useActivities from "../factories/useActivities";
import Media from "@/components/Media/Media.vue";
import DownloadLink from "@/components/DownloadLink.vue";
import useSchoolPrograms from "../factories/useSchoolPrograms";

export enum FullWidthPageDataType {
  Activity = "activity",
  SchoolProgram = "school_program",
  Workshop = "workshop"
}

type FullWidthPageData = SchoolProgram | Activity;

const FullWidthSliderPage = defineComponent({
  name: "FullWidthSliderPage",
  props: {
    pageType: {
      type: String as PropType<FullWidthPageDataType>,
      default: FullWidthPageDataType.Activity
    },
    slug: {
      type: String,
      required: true
    }
  },
  components: { Loader, Media, DownloadLink },
  setup(props) {
    const {
      isLoading: isLoadingSchoolPrograms,
      schoolPrograms,
      workshops,
      fetchSchoolPrograms
    } = useSchoolPrograms();
    const {
      activities,
      fetchActivities,
      isLoading: isLoadingActivities
    } = useActivities();

    if (props.pageType === FullWidthPageDataType.Activity) {
      fetchActivities();
    } else if (
      props.pageType === FullWidthPageDataType.SchoolProgram ||
      props.pageType === FullWidthPageDataType.Workshop
    ) {
      fetchSchoolPrograms();
    }

    const page = computed<FullWidthPageData | undefined>(() => {
      switch (props.pageType) {
        case FullWidthPageDataType.Workshop:
          return workshops.value.find(p => p.slug === props.slug);
        case FullWidthPageDataType.Activity:
          return activities.value.find(p => p.slug === props.slug);
        case FullWidthPageDataType.SchoolProgram:
          return schoolPrograms.value.find(p => p.slug === props.slug);
        default:
          return undefined;
      }
    });

    const isLoading = computed(() => {
      switch (props.pageType) {
        case FullWidthPageDataType.Activity || FullWidthPageDataType.Workshop:
          return !!isLoadingActivities.value;
        case FullWidthPageDataType.SchoolProgram:
          return !!isLoadingSchoolPrograms.value;
        default:
          return false;
      }
    });

    return {
      page,
      isLoading
    };
  }
});

export default FullWidthSliderPage;
</script>
<style lang="stylus">
@import '../styles/variables.styl';

.pageFullWidthSlider
  background-color: $blue;
</style>
