<template>
  <div class="newsGridItem">
    {{ post.title }}
  </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import View from "@/types/viewTypes";

export default createComponent({
  props: {
    post : {
      default: {}
    },
  },
  name: "NewsGridItem"
});
</script>
<style scoped lang="stylus">
@import '../../../styles/variables.styl';

.newsGridItem
  display: flex;
</style>
