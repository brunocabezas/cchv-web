import { defineComponent, ref } from "@vue/composition-api";
import NewsPostThumbnail from "@/components/news/NewsPostThumbnail.vue";
import Loader from "@/components/Loader.vue";
import useNews from "@/models/useNews";
import useMediaQueries from "@/hooks/useMediaQueries";
import apiRoutes from "~/api/apiRoutes";
import client from "~/api/client";

// TODO move to constans
// Number of news to fetch when the user scrolls down
const NEWS_PER_PAGE = 6;
const NO_PAGES_INDICATOR = -9999;

interface infiniteHandlerState {
  loaded: () => void;
  // Stops fetching
  reset: () => void;
  complete: () => void;
}

export default defineComponent({
  name: "NewsPage",
  components: { NewsPostThumbnail, Loader },
  setup() {
    const {
      news,
      highlightedNews,
      setNewsData,
      totalPages,
      currentPage: page,
      setCurrentPage
    } = useNews();
    const { onBigScreen } = useMediaQueries();
    const isLoading = ref(false);

    const infiniteHandler = ($state: infiniteHandlerState) => {
      const params = { per_page: NEWS_PER_PAGE, page: page.value };
      isLoading.value = true;

      return client
        .get(apiRoutes.News, { params })
        .then(res => {
          if (totalPages.value >= 0) {
            // Stop fetch checking at totalPages
            if (page.value < totalPages.value) {
              setCurrentPage(page.value + 1);
              $state.loaded();
            } else {
              $state.complete();
            }
            setNewsData(res.data);
          } else {
            // If NO_PAGES_INDICATOR is used, there are no news available
            if (totalPages.value === NO_PAGES_INDICATOR) {
              $state.complete();
            } else {
              // handler state will be reseted unit onMounted
              $state.reset();
            }
          }
          return res;
        })
        .catch(() => ({ data: [] }))
        .finally(() => {
          isLoading.value = false;
        });
    };

    return {
      news,
      homeNews: highlightedNews,
      infiniteHandler,
      isLoading,
      onBigScreen,
      totalPages
    };
  }
});
