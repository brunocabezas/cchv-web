<template>
  <div class="page">
    <div class="pageTitle">
      <h1 class="pageTitleText">Historia</h1>
    </div>
    <div v-if="historyPage && historyPage.id" class="pageContent">
      <div v-if="historyPage.gallery" class="pageRow pageRow--with-media">
        <Media :gallery="historyPage.gallery" />
      </div>
      <div v-html="historyPage.text" class="pageBody pageRow"></div>
      <hr />
    </div>

    <Loader :loading="isLoading" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  useMeta,
  watch
} from "@nuxtjs/composition-api";
import usePages from "@/models/usePages";
import Loader from "@/components/Loader.vue";
import Media from "@/components/Media/Media.vue";
import Urls from "@/utils/urls";
import { stripHtmlFromString } from "@/utils/strings";
import meta from "@/utils/meta";

export default defineComponent({
  name: "HistoryPage",
  components: { Loader, Media },
  head: {},
  setup() {
    const { isLoading, fetchPages, historyPage } = usePages();

    const desc = computed(() =>
      historyPage.value && historyPage.value.id
        ? stripHtmlFromString(historyPage.value.text)
        : ""
    );
    useMeta(() => ({
      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: "Historia"
        },
        {
          hid: "description",
          name: "description",
          content: desc.value
        },
        { property: "og:site_name", content: "Redfern Dev" },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://bobross.com"
        },
        {
          hid: "og:description",
          property: "og:description",
          content: desc.value
        },
        {
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content:
            historyPage.value && historyPage.value.id
              ? stripHtmlFromString(historyPage.value.text)
              : ""
        },
        {
          hid: "twitter:title",
          property: "twitter:title",
          content: "Historia"
        }
      ]
    }));

    fetchPages();

    return {
      isLoading,
      historyPage,
      title: "History"
    };
  }
});
</script>
<style scoped lang="stylus">
@import '~assets/variables.styl';

.aboutSquareLink
  background-color: $blue;
  width: 50%;
  color: white;
  font-size: 36px;
  padding: 1em;
  text-align: center;
  font-family: NoeDisplay;
  margin: 15px;
  transition: background-color 0.2s;

  &:hover
    background-color: darken($blue, 10);

  &:first-child
    margin-left: 0;

  &:last-child
    margin-right: 0;
</style>
