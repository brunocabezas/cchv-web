
import Loader from "@/components/Loader.vue";
import Media from "@/components/Media/Media.vue";
// import { stripHtmlFromString } from "@/utils/strings";
import meta from "@/utils/meta";
import {
  computed,
  defineComponent,
  ref,
  useFetch,
  useMeta
} from "@nuxtjs/composition-api";
import { PageExtraContent } from "~/types/customFieldsTypes";
import { WpImage } from "~/types/wordpressTypes";
import { getCustomFieldFromPost } from "~/utils/api";
import { PageKeys } from "~/types/customFieldsKeysTypes";
import client from "~/api/client";
import apiRoutes from "~/api/apiRoutes";
// import { META_IMG_FALLBACK } from "~/utils/constants";
import useDocuments from "~/models/useDocuments";

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

const initialPage = {
  name: "",
  id: 0,
  text: "",
  gallery: [],
  extra_content: PageExtraContent.None
};

export default defineComponent({
  name: "TransparencyPage",
  components: { Loader, Media },
  head: {},
  setup() {
    const data = ref<any>(null);

    const { documents } = useDocuments();

    const { fetch: fetchPages, fetchState } = useFetch(async () => {
      const response = await client.get(apiRoutes.Pages).catch(() => ({
        data: []
      }));

      data.value =
        response.data
          .map(mapPagesFromWp)
          .find(
            (page: any) =>
              page &&
              page.name &&
              page.name.toLocaleLowerCase().includes("transparencia")
          ) || initialPage;
    });

    fetchPages();

    useMeta(() => ({
      title: !data.value ? "transparencia" : data.value.name,
      meta: !data.value
        ? []
        : meta({
            title: data.value.name,
            url: "https://bobross.com",
            description: data.value.text,
            mainImage: data.value.gallery[0] && data.value.gallery[0].url
          })
    }));

    return {
      isLoading: computed(() => fetchState.pending && !data.value),
      page: data,
      title: data.value ? data.value.name : "transparencia",
      documents,
    };
  }
});