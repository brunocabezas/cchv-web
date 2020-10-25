<template>
  <div class="page">
    <div class="pageTitle">
      <h1 class="pageTitleText">Historia con fetch</h1>
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
import usePagesFetch from "@/models/usePagesFetch";
import Loader from "@/components/Loader.vue";
import Media from "@/components/Media/Media.vue";
import Urls from "@/utils/urls";
import { stripHtmlFromString } from "@/utils/strings";
import meta from "@/utils/meta";
import {
  computed,
  defineComponent,
  ref,
  ssrRef,
  useFetch,
  useMeta
} from "@nuxtjs/composition-api";
import axios from "axios";
import { Page, PageExtraContent } from "~/types/customFieldsTypes";
import { WpImage, WPResponseItem } from "~/types/wordpressTypes";
import { getCustomFieldFromPost, getWPTitle } from "~/utils/api";
import { PageKeys } from "~/types/customFieldsKeysTypes";

const mapPagesFromWp = (pagePost: any): any => ({
  id: pagePost.id,
  name: pagePost.title.rendered,
  text: getCustomFieldFromPost(pagePost, PageKeys.text, ""),
  gallery: getCustomFieldFromPost<WpImage[]>(pagePost, PageKeys.gallery, []),
  extra_content: getCustomFieldFromPost<PageExtraContent>(
    pagePost,
    PageKeys.extra_content,
    PageExtraContent.None
  )
});

export default defineComponent({
  name: "HistoryPage",
  components: { Loader, Media },
  head: {},
  setup() {
    const res = ref<any>(null);
    const data = ref<any>(null);

    const { fetch, fetchState } = useFetch(async () => {
      const response = await axios.get(
        "https://www.cchv.cl/futuro/wp-json/wp/v2/custom-pages"
      );

      data.value = response.data
        .map(mapPagesFromWp)
        .find(
          (page: any) =>
            page &&
            page.name &&
            page.name.toLocaleLowerCase().includes("historia")
        ) || {
        name: "",
        id: 0,
        text: "",
        gallery: [],
        extra_content: PageExtraContent.None
      };
      console.log(
        response.data,
        response.data.find(
          (page: any) =>
            page &&
            page.name &&
            page.name.toLocaleLowerCase().includes("historia")
        ) || {
          name: "",
          id: 0,
          text: "",
          gallery: [],
          extra_content: PageExtraContent.None
        }
      );
    });

    // Manually trigger a refetch

    // Access fetch error, pending and timestamp
    // fetchState;

    // const historyPage = computed<Page>(() => {
    //   console.log("data.value");
    //   return {
    //     name: "",
    //     id: 0,
    //     text: "",
    //     gallery: [],
    //     extra_content: PageExtraContent.None
    //   };
    // });

    fetch();

    useMeta(() => ({
      title: !data.value ? "" : data.value.name,
      meta: !data.value
        ? []
        : meta({
            title: data.value.name,
            url: "https://bobross.com",
            description: data.value.text,
            mainImage:
              (data.value.gallery[0] && data.value.gallery[0].url) ||
              "@/assets/logo.png"
          })
    }));

    return {
      isLoading: false,
      historyPage: data,
      title: "History"
    };
  }
});
</script>