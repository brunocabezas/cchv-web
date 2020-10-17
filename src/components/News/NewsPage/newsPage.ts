import { computed, defineComponent, onMounted, ref } from "@vue/composition-api"
import NewsPostThumbnail from "@/components/News/NewsPostThumbnail.vue"
import Loader from "@/components/Loader.vue"
import useNews from "@/models/useNews"
import useMediaQueries from "@/hooks/useMediaQueries"

// News are loaded when the user scrolls down
// An infinite loader is displayed
// Wordpress pagination is utilized

// Number of news to fetch when the user scrolls down
const NEWS_PER_PAGE = 6

// Used on the first network request, to initialize state with N news
export const INITIAL_NEWS = 6

const NO_PAGES_INDICATOR = -9999

// Wordpress header containing the total amount of items to be fetched
// https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/
const TOTAL_PAGES_HEADER = "x-wp-totalpages"

interface infiniteHandlerState {
  loaded: () => void
  // Stops fetching
  reset: () => void
  complete: () => void
}

export default defineComponent({
  name: "NewsPage",
  components: { NewsPostThumbnail, Loader },
  setup() {
    const {
      news,
      highlightedNews,
      fetchNews,
      isLoading,
      currentPage: page,
      setNewsPage,
    } = useNews()
    const { onBigScreen } = useMediaQueries()
    const totalPages = ref(-1)
    const initialDataLoading = ref(false)

    // Fetching data initially
    onMounted(() => {
      initialDataLoading.value = true
      const options = { per_page: 6, page: page.value }
      fetchNews(options, true)
        .then((response) => {
          const totalPagesFromHeader =
            (response &&
              response.headers &&
              response.headers[TOTAL_PAGES_HEADER]) ||
            NO_PAGES_INDICATOR
          // Set total pages from response header
          totalPages.value = parseInt(totalPagesFromHeader, 10)
          setNewsPage(page.value + 1)
        })
        .catch(() => {
          totalPages.value = NO_PAGES_INDICATOR
        })
        .finally(() => {
          initialDataLoading.value = false
        })
    })

    function infiniteHandler($state: infiniteHandlerState) {
      const params = { per_page: NEWS_PER_PAGE, page: page.value }
      fetchNews(params, true).then(() => {
        if (totalPages.value >= 0) {
          // Stop fetch checking at totalPages
          if (page.value < totalPages.value) {
            setNewsPage(page.value + 1)
            $state.loaded()
          } else {
            $state.complete()
          }
        } else {
          // If NO_PAGES_INDICATOR is used, there are no news available
          if (totalPages.value === NO_PAGES_INDICATOR) {
            $state.complete()
          } else {
            // handler state will be reseted unit onMounted
            $state.reset()
          }
        }
      })
    }

    return {
      news,
      homeNews: highlightedNews,
      infiniteHandler,
      initialDataLoading,
      isLoading: computed(() => isLoading.value),
      onBigScreen,
      totalPages,
    }
  },
})
