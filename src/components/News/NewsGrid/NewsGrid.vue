<template>
  <div class="page newsGrid">
    <div class="pageTitle">
      <h1 class="pageTitleText">Noticias</h1>
      <!-- <div class="pageTitleInput">search input</div>-->
    </div>
    <Loader v-if="!ready" />
    <div class="newsGrid__topGrid">
      <NewsGridItem :post="post" v-bind:key="post.id" v-for="post in news" />
    </div>
    <div class="newsGrid__grid">
      <NewsGridItem small :post="post" v-bind:key="post.id" v-for="post in news" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, createComponent, Ref } from "@vue/composition-api";
import NewsGridItem from "@/components/News/NewsGrid/NewsGridItem.vue";
import { WpResponseData } from "@/types/wordpressTypes";
import { useAsyncState } from "@vueuse/core";
import apiRoutes from "@/api/apiRoutes";
import client from "@/api/client";
import Loader from "@/components/Loader.vue";
import { AxiosResponse } from "axios";
import { News, NewsKeys } from "@/types/customFieldsTypes";
import { getCustomField, getWPTitle } from "@/utils/api";
import View from "@/types/viewTypes.ts";
import helpers from "@/utils/customFields";

const initialState: WpResponseData = [];

export default createComponent({
  name: "NewsGrid",
  components: { NewsGridItem, Loader },
  setup() {
    const { state, ready } = useAsyncState<WpResponseData>(
      client
        .get(apiRoutes.News)
        .then((t: AxiosResponse<WpResponseData>) => t.data),
      initialState
    );

    const news: Readonly<Ref<Readonly<View.News>>> = computed(() =>
      helpers.mapNewsToView(state.value)
    );

    return { news, ready };
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
