<template>
  <div class="page pageWithFullWidthSlider">
    <Loader :loading="isLoading" />
    <div v-if="page" class="pageFullWidthSlider">
      Hola
    </div>
    <div v-if="page" class="pageTitle">
      <h1 class="pageTitleText">{{ page && page.name }}</h1>
    </div>

    <div v-if="page" class="pageContent">
      <div v-html="page.text" class="pageBody"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "@vue/composition-api";
import View from "../types/viewTypes";
import Loader from "@/components/Loader.vue";
import useActivities from "../factories/useActivities";

export enum FullWidthPageDataType {
  Activity = "activity",
  SchoolProgram = "school_program"
}

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
  components: { Loader },
  setup(props) {
    const {
      activities,
      fetchActivities,
      isLoading: isLoadingActivities
    } = useActivities();
    if (props.pageType === FullWidthPageDataType.Activity) {
      fetchActivities();
    }

    const page = computed<View.Activity | undefined>(() => {
      if (props.pageType === FullWidthPageDataType.Activity) {
        return activities.value.find(
          (p: View.Activity) => p.slug === props.slug
        );
      } else {
        return undefined;
      }
    });

    const isLoading = computed<Boolean>(() => {
      if (props.pageType === FullWidthPageDataType.Activity) {
        return isLoadingActivities.value;
      } else {
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
</style>
