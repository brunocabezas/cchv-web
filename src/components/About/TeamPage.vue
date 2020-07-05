<template>
  <div class="page">
    <div class="pageTitle">
      <h1 class="pageTitleText">Equipo</h1>
    </div>
    <div class="teamPositions">
      <div
        v-bind:key="position.name"
        v-for="position in team"
        class="teamPosition"
      >
        <h5 class="teamPositionName">{{ position.name }}</h5>
        <p
          v-for="person in position.members"
          v-bind:key="person.id"
          class="teamPositionMember"
        >
          {{ person.name }}
        </p>
      </div>
    </div>
    <Loader :loading="isLoading" />

    <div class="pageTitle" v-if="!isLoading">
      <h1 class="pageTitleText">Directorio</h1>
    </div>
    <div class="teamPositions">
      <div
        v-bind:key="position.name"
        v-for="position in staff"
        class="teamPosition"
      >
        <h5 class="teamPositionName">{{ position.name }}</h5>
        <p
          v-for="person in position.members"
          v-bind:key="person.id"
          class="teamPositionMember"
        >
          {{ person.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import useTeamMembers from "@/factories/useTeamMembers";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  name: "TeamPage",
  components: { Loader },
  setup() {
    const { team, staff, isLoading, fetchTeamMembers } = useTeamMembers();

    fetchTeamMembers();
    return { isLoading, team, staff };
  }
});
</script>
<style scoped lang="stylus">
@import '../../styles/variables.styl';

.page
  .teamPositions
    flex-wrap: wrap;
    display: flex;

    .teamPosition
      width: 50%;
      padding: 0.5em 0;
      font-size: 20px;

      .teamPositionName
        color: $blue;
        margin-top: 0;
        font-weight: bold;
        font-family: OpenSans;
        margin-bottom: 0;

      .teamPositionMember
        margin-top: 5px;
        margin-bottom: 5px;
</style>
