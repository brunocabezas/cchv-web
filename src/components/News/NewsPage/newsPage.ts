import { computed, defineComponent, ref } from "@vue/composition-api"
import NewsThumb from "@/components/News/NewsThumb.vue"
import Loader from "@/components/Loader.vue"
import useNews from "@/models/useNews"

// Used with infinite loading
const NEWS_PER_PAGE = 6
// Initial news per page used to fetch first five news
export const INITIAL_NEWS_BY_PAGE = 5
const TOTAL_PAGES_HEADER = "x-wp-totalpages"

interface infiniteHandlerState {
  loaded: () => void
  // Stops fetching
  complete: () => void
}

export default defineComponent({
  name: "NewsPage",
  components: { NewsThumb, Loader },
  setup() {
    const {
      news,
      homeNews,
      fetchNews,
      isLoading,
      currentPage: page,
      setNewsPage,
    } = useNews()

    const initialDataLoading = ref(false)

    if (news.value.length === 0) {
      initialDataLoading.value = true

      // Fetch
      fetchNews(
        { per_page: INITIAL_NEWS_BY_PAGE, page: page.value },
        true
      ).finally(() => {
        initialDataLoading.value = false
      })
      setNewsPage(page.value + 1)
    } else if (page.value === 1) {
      // If there are news defined and the page is equal to one, set it to 2
      setNewsPage(2)
    }

    function infiniteHandler($state: infiniteHandlerState) {
      const params = { per_page: NEWS_PER_PAGE, page: page.value }
      fetchNews(params, true).then((response) => {
        // Get total pages from headers
        const totalPages =
          (response &&
            response.headers &&
            response.headers[TOTAL_PAGES_HEADER]) ||
          0

        // Stop fetch checking at totalPages
        if (page.value < totalPages) {
          setNewsPage(page.value + 1)
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    }

    return {
      news,
      homeNews,
      infiniteHandler,
      initialDataLoading,
      isLoading: computed(() => isLoading.value),
    }
  },
})
