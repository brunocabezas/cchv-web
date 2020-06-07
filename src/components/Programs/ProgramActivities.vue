<template>
  <div class="programActivities">
    <ActivitiesGrid :type="ActivityType.Movie" />
    <ActivitiesGrid :type="ActivityType.Conversations" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, set } from "@vue/composition-api";
import ActivitiesGrid from "@/components/Activities/AcitvitiesGrid.vue";
import CustomFields from "../../types/customFieldsTypes";
import useActivities from "../../factories/useActivities";

const ProgramActivities = defineComponent({
  name: "ProgramActivities",
  components: {
    ActivitiesGrid
  },
  setup() {
    const { fetchActivities } = useActivities();
    fetchActivities();
    return {
      ActivityType: CustomFields.ActivityType
    };
  }
});

export default ProgramActivities;
</script>
<style lang="stylus"></style>
