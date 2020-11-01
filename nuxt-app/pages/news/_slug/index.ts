import {
  defineComponent,
  computed,
  useContext,
  useMeta
} from "@nuxtjs/composition-api";
import Loader from "@/components/Loader.vue";
import ProgressiveImage from "@/components/ProgressiveImage.vue";
import Media from "@/components/Media/Media.vue";
import NewsPostMobileThumbnail from "@/components/news/NewsPostMobileThumbnail.vue";
import ActivitySchedule from "@/components/news/activities/ActivitySchedule.vue";
import useNews from "@/models/useNews";
import useMediaQueries from "@/hooks/useMediaQueries";
import { MOBILE_IMG_HEIGHT } from "@/utils/constants";
import meta from "~/utils/meta";

export default defineComponent({
  name: "NewsPostPage",
  head: {},
  components: {
    Loader,
    Media,
    NewsPostMobileThumbnail,
    ProgressiveImage,
    ActivitySchedule
  },
  setup() {
    const { params } = useContext();
    const { slug } = params.value;
    const {
      isLoadingSingleNewsPost,
      isLoading,
      getNewsPostUrlBySlug,
      getLatestNews,
      singleNewsPost: data
    } = useNews(slug);
    const { onBigScreen } = useMediaQueries();
    const filteredLatestNews = computed(() =>
      data.value && data.value.id ? getLatestNews(data.value.id) : []
    );

    useMeta(() => ({
      title: !data.value.id ? "Noticias" : data.value.title,
      meta: !data.value
        ? []
        : meta({
            title: data.value.title,
            url: "https://bobross.com",
            description: data.value.text,
            mainImage: data.value.gallery[0] && data.value.gallery[0].url
          })
    }));

    return {
      getNewsPostUrlBySlug,
      latestNews: filteredLatestNews,
      post: data,
      isLoading: computed(
        () => isLoadingSingleNewsPost.value || isLoading.value
      ),
      onBigScreen,
      MOBILE_IMG_HEIGHT
    };
  }
});
