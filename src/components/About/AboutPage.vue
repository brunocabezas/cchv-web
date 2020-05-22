<template>
  <div class="page">
    <div class="pageTitle">
      <h1 class="pageTitleText">Quienes Somos.</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import useTeamMembers from "@/factories/useTeamMembers";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  name: "AboutPage",
  components: { Loader },
  setup() {
    return {};
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
