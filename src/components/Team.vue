<template>
  <div class="page">
    <div class="pageTitle">
      <h1 class="pageTitleText">Equipo</h1>
    </div>
    <Loader :loading="isLoading" />
    <div v-if="!isLoading" class="team">
      <div v-bind:key="person.id" v-for="person in team" class="teamMember">
        <h3 class="position">{{ person.position }}</h3>
        <p class="name">{{ person.name }}</p>
      </div>
    </div>
    <hr v-if="!isLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import useTeamMembers from "@/factories/useTeamMembers";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  name: "Team",
  components: { Loader },
  setup() {
    const { isLoading, team, fetchTeamMembers } = useTeamMembers();

    fetchTeamMembers();
    return { team, isLoading };
  }
});
</script>
<style scoped lang="stylus">
@import '../styles/variables.styl';

.team
  max-width: 50%;
  display: flex;
  flex-wrap: wrap;

  .teamMember
    width: 50%;
    padding: 1em;

    .position
      color: $blue;
      margin-top: 0;

    .name
      font-style: italic;
</style>
