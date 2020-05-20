<template>
  <div class="page newsPage">
    <div class="pageBox">
      <div class="pageTitle">
        <h1 class="pageTitleText">Noticias</h1>
        <!-- <div class="pageTitleInput">search input</div>-->
      </div>
      <Loader v-if="isLoading" />
      <div class="newsPage__topGrid">
        <NewsThumb :post="post" v-bind:key="post.id" v-for="post in news" />
      </div>
      <div class="newsPage__grid">
        <NewsThumb
          small
          :post="post"
          v-bind:key="post.id"
          v-for="post in news"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";
import NewsThumb from "@/components/News/NewsThumb.vue";
import Loader from "@/components/Loader.vue";
import useNews from "@/factories/useNews";

export default defineComponent({
  name: "NewsPage",
  components: { NewsThumb, Loader },
  setup(props) {
    const { news, fetchNews, isLoading } = useNews();

    fetchNews();

    return {
      news,
      isLoading: computed(() => isLoading.value)
    };
  }
});
</script>
<style scoped lang="stylus">
@import '../../styles/variables.styl';

.newsPage
  &__topGrid, &__grid
    width: 100%;
    display: flex;

  &__topGrid
    .newsPageItem
      width: 50%;
      margin: 1em 0;
      border-bottom: 1px solid #000;

  &__grid
    .newsPageItem
      width: 33.3%;
      margin: 1em 0;
</style>
