<template>
  <div>team members</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import useTeamMembers from "@/factories/useTeamMembers";

export default defineComponent({
  name: "TeamMembers",
  setup() {
    const { isLoading, team, fetchTeamMembers } = useTeamMembers();
    fetchTeamMembers();

    return { isLoading, team };
  }
});
</script>
<style scoped lang="stylus">
@import '../../styles/variables.styl';
</style>
