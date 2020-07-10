<template>
  <div v-if="activities.length" class="activitiesGrid">
    <h1 class="activitiesGridTitle">{{ title }}</h1>
    <div class="activitiesGridContainer">
      <div v-for="act in activities" v-bind:key="act.id" class="activity">
        <router-link
          class="activitiesGridLink"
          :title="act.name"
          :to="
            act.isNewsPost
              ? getNewsPostUrlBySlug(act.slug)
              : getActivityUrlBySlug(act.slug)
          "
        >
          <ProgressiveImage
            v-if="act.gallery"
            height="200px"
            :src="act.gallery[0].url"
          />
          <h3 v-html="act.name" class="activitiesGridTitle"></h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "@vue/composition-api";
import AppUrls from "@/utils/urls";
import useActivities from "@/factories/useActivities";
import { ActivityType } from "@/types/customFieldsTypes";
import ProgressiveImage from "@/components/ProgressiveImage.vue";
import { Activity } from "../../types/viewTypes";
import useNews from "../../factories/useNews";

const ActivitiesGrid = defineComponent({
  name: "ActivitiesGrid",
  components: { ProgressiveImage },
  props: {
    type: {
      type: String as PropType<ActivityType>,
      required: true
    }
  },
  setup(props) {
    const {
      getActvitiesTitleByType,
      getActivityUrlBySlug,
      getActvitiesByType
    } = useActivities();
    const { getNewsPostUrlBySlug } = useNews();
    const title = computed<string>(() => getActvitiesTitleByType(props.type));
    const activities = computed(() => getActvitiesByType(props.type));
    return { activities, title, getNewsPostUrlBySlug, getActivityUrlBySlug };
  }
});

export default ActivitiesGrid;
</script>
<style lang="stylus">
.activitiesGrid
  width: 100%;
  text-align: center;
  display: block;

  .activitiesGridContainer
    display: flex;
    flex-wrap: wrap;

    .activity
      margin: 5px;
      width: calc(33.333333% - 10px);

  .activitiesGridTitle
    margin-top: 5px;

  .activitiesGridLink
    display: block;

    &:hover
      text-decoration: underline;
</style>
