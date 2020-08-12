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
import { defineComponent, onMounted } from "@vue/composition-api";
import usePages from "@/models/usePages";
import Loader from "@/components/Loader.vue";
import Media from "@/components/Media/Media.vue";
import Urls from "@/utils/urls";

export default defineComponent({
  name: "HistoryPage",
  components: { Loader, Media },
  setup() {
    const { isLoading, fetchPages, historyPage } = usePages();

    fetchPages();

    return {
      isLoading,
      historyPage
    };
  }
});
</script>
<style scoped lang="stylus">
@import '../../styles/variables.styl';

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
