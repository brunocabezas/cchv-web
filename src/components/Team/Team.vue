<template>
  <div>team Page</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
// import useTeamMembers from "@/factories/useTeamMembers";
// import AppUrls from "@/utils/urls";
import TeamMembers from "@/components/Team/TeamMembers.vue";

export default defineComponent({
  name: "Team",
  components: { TeamMembers },
  setup() {
    // const { isLoading, team, fetchTeamMembers } = useTeamMembers();
    // fetchTeamMembers();

    return {};
  }
});
</script>
<style scoped lang="stylus">
@import '../../styles/variables.styl';
</style>
