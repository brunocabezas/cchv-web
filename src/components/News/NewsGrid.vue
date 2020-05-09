<template>
  <div class="page newsGrid">
    <div class="pageTitle">
      <h1 class="pageTitleText">Noticias</h1>
      <!-- <div class="pageTitleInput">search input</div>-->
    </div>
    <div class="grid"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "NewsGrid",
  setup() {
    return { news: [] };
  }
});
</script>
<style scoped lang="stylus">
@import '../../styles/variables.styl';

.newsGrid
  display: flex;
</style>
