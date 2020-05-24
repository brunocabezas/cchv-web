<template>
  <div class="schoolProgramTabs">
    <h2 class="pageTitleText">Escuelas</h2>
    <Loader :loading="isLoading" />
    <div class="pageRow">
      <button
        v-bind:key="tab.id"
        @click="setActiveTab(tab.id)"
        v-for="tab in tabs"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="pageRow tabContent">
      <div v-for="tab in tabs" v-bind:key="tab.id" class="">
        <div v-if="activeTabId === tab.id">{{ tab.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import Loader from "@/components/Loader.vue";
import Media from "@/components/Media.vue";
import useSchoolPrograms from "@/factories/useSchoolPrograms";
import useTabs, { Tabs } from "@/factories/useTabs";

const SCHOOL_PROGRAMS_TABS: Tabs = [
  { id: 0, title: "Artes y Oficios" },
  { id: 1, title: "Mediacion y comunidades" }
];

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

    const { tabs, activeTabId, setActiveTab } = useTabs(SCHOOL_PROGRAMS_TABS);
    fetchSchoolPrograms();

    return {
      activeTabId,
      tabs,
      schoolPrograms,
      setActiveTab,
      isLoading
    };
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
