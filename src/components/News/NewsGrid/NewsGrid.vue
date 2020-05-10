<template>
  <div class="page newsGrid">
    <div class="pageTitle">
      <h1 class="pageTitleText">Noticias</h1>
      <!-- <div class="pageTitleInput">search input</div>-->
    </div>
    <Loader v-if="loading" />
    <div class="newsGrid__topGrid">
      <NewsGridItem :post="post" v-bind:key="post.id" v-for="post in news" />
    </div>
    <div class="newsGrid__grid">
      <NewsGridItem
        small
        :post="post"
        v-bind:key="post.id"
        v-for="post in news"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";
import NewsGridItem from "@/components/News/NewsGrid/NewsGridItem.vue";
import { WpResponseData } from "@/types/wordpressTypes";
import Loader from "@/components/Loader.vue";
import useNews from "@/factories/useNewsFactory";
import { AsyncDataStatus } from "@/factories/useAsyncData";

const initialState: WpResponseData = [];

export default defineComponent({
  name: "NewsGrid",
  components: { NewsGridItem, Loader },
  setup() {
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
@import '../../../styles/variables.styl';

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
