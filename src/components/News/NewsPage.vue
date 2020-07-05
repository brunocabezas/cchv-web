<template>
  <div class="page newsPage">
    <div class="pageTitle">
      <h1 class="pageTitleText">Noticias</h1>
      <!-- <div class="pageTitleInput">search input</div>-->
    </div>
    <Loader v-if="initialDataLoading" />
    <div class="newsPage__topGrid">
      <NewsThumb :post="post" v-bind:key="post.id" v-for="post in homeNews" />
    </div>
    <div class="newsPage__grid">
      <NewsThumb small :post="post" v-bind:key="post.id" v-for="post in news" />
      <infinite-loading @infinite="infiniteHandler">
        <div slot="spinner"></div>
        <div slot="no-more"></div>
      </infinite-loading>
      <Loader v-if="!initialDataLoading" :loading="isLoading" size="20px" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "@vue/composition-api";
import NewsThumb from "@/components/News/NewsThumb.vue";
import Loader from "@/components/Loader.vue";
import useNews from "@/factories/useNews";

// Used with infinite loading
const NEWS_PER_PAGE = 6;
// Initial news per page used to fetch first five news
const INITIAL_NEWS_BY_PAGE = 5;
const TOTAL_PAGES_HEADER = "x-wp-totalpages";

interface infiniteHandlerState {
  loaded: () => void;
  // Stops fetching
  complete: () => void;
}

export default defineComponent({
  name: "NewsPage",
  components: { NewsThumb, Loader },
  setup(props) {
    const {
      news,
      homeNews,
      fetchNews,
      isLoading,
      currentPage: page,
      setNewsPage
    } = useNews();
    const initialDataLoading = ref(false);

    if (news.value.length === 0) {
      initialDataLoading.value = true;
      // Fetch
      fetchNews(
        { per_page: INITIAL_NEWS_BY_PAGE, page: page.value },
        true
      ).finally(() => {
        initialDataLoading.value = false;
      });
      setNewsPage(page.value + 1);
    } else if (page.value === 1) {
      // If there are news defined and the page is equal to one, set it to 2
      setNewsPage(2);
    }

    function infiniteHandler($state: infiniteHandlerState) {
      const params = { per_page: NEWS_PER_PAGE, page: page.value };
      fetchNews(params, true).then(response => {
        // Get total pages from headers
        const totalPages =
          (response &&
            response.headers &&
            response.headers[TOTAL_PAGES_HEADER]) ||
          0;

        // Stop fetch checking at totalPages
        if (page.value < totalPages) {
          setNewsPage(page.value + 1);
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    }

    return {
      news,
      homeNews,
      infiniteHandler,
      initialDataLoading,
      isLoading: computed(() => isLoading.value)
    };
  }
});
</script>
<style lang="stylus">
@import '../../styles/variables.styl';

$grid_padding = 25px;

.newsPage
  .pageTitleText
    margin: 0;

  &__topGrid, &__grid
    width: 100%;
    display: flex;

  &__topGrid
    .newsGridItem
      width: 50%;
      margin: 1em 0;

      &.newsPostPreview
        padding: $grid_padding;

      &:first-child
        padding-left: 0;

      &:last-child
        padding-right: 0;

      hr
        width: 99%;

  &__grid
    flex-wrap: wrap;
    position: relative;
    margin-bottom: 30px;

    > .loader
      height: 20px;
      bottom: 20px;
      top: calc(100% + 20px);
      transform: none;
      margin: auto 0;
      left: 0;
      right: 0;

    .newsGridItem
      width: 33.3%;
      margin: 1em 0;

      &.newsPostPreview
        padding: $grid_padding;

      // Grid of 3 items
      // first in the middle
      &:nth-child(3n + 1)
        &.newsPostPreview
          padding-left: 0;

      // item in the middle
      &:nth-child(3n + 2)
        &.newsPostPreview
          hr
            width: calc(100% - 50px);

      // last in the middle
      &:nth-child(3n)
        &.newsPostPreview
          padding-right: 0;
</style>
