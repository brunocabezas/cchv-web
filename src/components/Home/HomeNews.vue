<template>
  <div class="news-section">
    <div>home news</div>
    <Loader v-if="!ready" />
    <div v-if="ready" class="news">
      {{ news }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useAsyncState } from "@vueuse/core";
import apiRoutes from "../../api/apiRoutes";
import client from "../../api/client";
import Loader from "@/components/Loader.vue";
import { getCustomField } from "../../utils/api";
import { NewsKeys } from "../../types/customFieldsTypes";
import { WpResponseData } from "../../types/wordpressTypes";

const initialState: WpResponseData = [];

const HomeNews = defineComponent({
  name: "HomeNews",
  components: { Loader },
  setup() {
    const { state, ready } = useAsyncState<WpResponseData>(
      client.get(apiRoutes.News).then(t => t.data),
      initialState
    );

    const news: News = computed(() => {
      return state.value.map(item => ({
        [NewsKeys.title]: getCustomField(item, NewsKeys.title),
        [NewsKeys.abstract]: getCustomField(item, NewsKeys.abstract),
        [NewsKeys.date]: getCustomField(item, NewsKeys.date),
        [NewsKeys.img]: getCustomField(item, NewsKeys.img)
      }));
    });

    return { ready, news };
  }
});
export default HomeNews;
</script>

<style scoped></style>
