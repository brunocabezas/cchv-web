<template>
  <div class="programActivities">
    <ActivitiesGrid :type="ActivityType.Movie" />
    <ActivitiesGrid :type="ActivityType.Conversation" />
    <ActivitiesGrid :type="ActivityType.Concert" />
    <ActivitiesGrid :type="ActivityType.Performance" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, set } from "@nuxtjs/composition-api";
import ActivitiesGrid from "@/components/news/activities/ActivitiesGrid/ActivitiesGrid.vue";
import useActivities from "@/models/useActivities";
import { ActivityType } from "../../types/customFieldsTypes";

const ProgramActivities = defineComponent({
  name: "ProgramActivities",
  components: {
    ActivitiesGrid
  },
  setup() {
    return {
      ActivityType: ActivityType
    };
  }
});

export default ProgramActivities;
</script>
<style lang="stylus">
.programActivities
  margin-top: 2em;

  .activitiesGrid
    margin-bottom: 2.5em;

    &:last-child
      margin-bottom: 0;
</style>
