<template>
  <div class="programActivities">
    <ActivitiesGrid :type="ActivityType.Movie" />
    <ActivitiesGrid :type="ActivityType.Conversation" />
    <ActivitiesGrid :type="ActivityType.Concert" />
    <ActivitiesGrid :type="ActivityType.Performance" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, set } from "@vue/composition-api";
import ActivitiesGrid from "@/components/Activities/AcitvitiesGrid.vue";
import useActivities from "@/factories/useActivities";
import { ActivityType } from "../../types/customFieldsTypes";

const ProgramActivities = defineComponent({
  name: "ProgramActivities",
  components: {
    ActivitiesGrid
  },
  setup() {
    const { fetchActivities } = useActivities();
    fetchActivities();
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
</style>
