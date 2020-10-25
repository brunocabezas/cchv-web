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
import { defineComponent, onMounted, useMeta } from "@nuxtjs/composition-api";
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

    useMeta(() => {
      if (!historyPage.value) {
        return { title: "Historia" };
      } else {
        const mainImg = historyPage.value.gallery[0];
        const metaData = meta({
          title: historyPage.value.name,
          url: "https://bobross.com",
          description: stripHtmlFromString(historyPage.value.text),
          mainImage: mainImg.url || "@/assets/logo.png"
        });
        console.log(metaData);
        return {
          title: historyPage.value.name,
          meta: metaData
        };
      }
    });

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
