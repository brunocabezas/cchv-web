import { defineComponent, computed, useContext } from "@nuxtjs/composition-api";
import Loader from "@/components/Loader.vue";
import ProgressiveImage from "@/components/ProgressiveImage.vue";
import Media from "@/components/Media/Media.vue";
import NewsPostMobileThumbnail from "@/components/news/NewsPostMobileThumbnail.vue";
import ActivitySchedule from "@/components/news/activities/ActivitySchedule.vue";
import useNews from "@/models/useNews";
import useMediaQueries from "@/hooks/useMediaQueries";
import { MOBILE_IMG_HEIGHT } from "@/utils/constants";

export default defineComponent({
  name: "NewsPostPage",
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
      singleNewsPost: post
    } = useNews(slug);
    const { onBigScreen } = useMediaQueries();
    const filteredLatestNews = computed(() => getLatestNews(post));

    return {
      getNewsPostUrlBySlug,
      latestNews: filteredLatestNews,
      post,
      isLoading: computed(
        () => isLoadingSingleNewsPost.value || isLoading.value
      ),
      onBigScreen,
      MOBILE_IMG_HEIGHT
    };
  }
});
