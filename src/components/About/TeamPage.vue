<template>
  <div class="page">
    <div class="pageTitle">
      <h1 class="pageTitleText">Equipo</h1>
    </div>
    <div class="pageBody" v-if="page" v-html="page.text"></div>
    <Loader :loading="isLoading" />
    <hr v-if="!isLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import useTeamMembers from "@/factories/useTeamMembers";
import Loader from "@/components/Loader.vue";
import usePages from "../../factories/usePages";

export default defineComponent({
  name: "TeamPage",
  components: { Loader },
  setup() {
    const { fetchPages, isLoading, teamPage } = usePages();
    fetchPages();
    return { isLoading, page: teamPage };
  }
});
</script>
<style scoped lang="stylus">
@import '../../styles/variables.styl';

.team
  max-width: 50%;
  display: flex;
  flex-wrap: wrap;

  .teamMember
    width: 50%;
    padding: 1em 0;
    font-size: 20px;

    .position
      color: $blue;
      margin-top: 0;
      font-weight: bold;

    .name
      margin-top: 10px;
      font-style: italic;
</style>
