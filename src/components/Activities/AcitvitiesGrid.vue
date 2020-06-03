<template>
  <div class="activitiesGrid">
    <h1 class="activitiesGridTitle">{{ title }}</h1>
    <div class="activitiesGridContainer">
      <div v-for="act in activities" v-bind:key="act.id" class="activity">
        <router-link
          class="activitiesGridLink"
          :title="act.name"
          :to="getActivityUrlBySlug(act.slug)"
        >
          <ProgressiveImage
            v-if="act.gallery"
            height="150px"
            :src="act.gallery[0].url"
          />
          <h3 class="activitiesGridTitle">{{ act.name }}</h3>
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
import View from "../../types/viewTypes";

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
      movies,
      conversations,
      getActvitiesTitleByType,
      getActivityUrlBySlug
    } = useActivities();
    const title = computed<string>(() => getActvitiesTitleByType(props.type));
    const activities = computed<readonly View.Activity[]>(() => {
      switch (props.type) {
        case ActivityType.Movie:
          return movies.value;
        case ActivityType.Conversations:
          return conversations.value;
        default:
          return [];
      }
    });

    return { activities, title, getActivityUrlBySlug };
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

    .activity
      margin: 5px;
      // max-width: 100px;
      width: 25%;

  .activitiesGridTitle
    margin-top: 5px;

  .activitiesGridLink
    display: block;

    &:hover
      text-decoration: underline;
</style>
