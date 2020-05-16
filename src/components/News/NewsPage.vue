<template>
  <div class="page newsGrid">
    <div class="pageTitle">
      <h1 class="pageTitleText">Noticias</h1>
      <!-- <div class="pageTitleInput">search input</div>-->
    </div>
    <Loader v-if="loading" />
    <div class="newsGrid__topGrid">
      <NewsThumb :post="post" v-bind:key="post.id" v-for="post in news" />
    </div>
    <div class="newsGrid__grid">
      <NewsThumb small :post="post" v-bind:key="post.id" v-for="post in news" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";
import NewsThumb from "@/components/News/NewsThumb.vue";
import Loader from "@/components/Loader.vue";
import useNews from "@/factories/useNews";
import { AsyncDataStatus } from "@/factories/useAsyncData";

export default defineComponent({
  name: "NewsGrid",
  components: { NewsThumb, Loader },
  setup(props) {
    const { news, fetchNews, status } = useNews();

    fetchNews();

    return {
      news,
      loading: computed(() => status.value === AsyncDataStatus.Loading)
    };
  }
});
</script>
<style scoped lang="stylus">
@import '../../styles/variables.styl';

.newsGrid
  &__topGrid, &__grid
    width: 100%;
    display: flex;

  &__topGrid
    .newsGridItem
      width: 50%;
      margin: 1em 0;
      border-bottom: 1px solid #000;

  &__grid
    .newsGridItem
      width: 33.3%;
      margin: 1em 0;
</style>
