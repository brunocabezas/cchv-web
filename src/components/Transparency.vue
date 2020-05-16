<template>
  <div>Transparency</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import View from "@/types/viewTypes";
import AppUrls from "@/utils/urls";

export default defineComponent({
  // props: {
  //   small: {
  //     type: Boolean,
  //     default: false
  //   },
  //   post: {
  //     default: {}
  //   }
  // },
  name: "Transparency"
  // setup() {
  //   function getNewsPostUrl(postId: number) {
  //     return `${AppUrls.NewsPost}${postId}`;
  //   }

  //   return { getNewsPostUrl };
  // }
});
</script>
<style scoped lang="stylus">
@import '../styles/variables.styl';
</style>
