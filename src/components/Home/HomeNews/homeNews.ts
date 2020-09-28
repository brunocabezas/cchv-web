import { defineComponent, computed } from "@vue/composition-api"
import Icon from "vue-awesome/components/Icon.vue"
import { MAIN_COLOR } from "@/utils/constants"
import Loader from "@/components/Loader.vue"
import NewsPostThumbnail from "@/components/News/NewsPostThumbnail.vue"
import NewsPostMobileThumbnail from "@/components/News/NewsPostMobileThumbnail.vue"
import Urls from "@/utils/urls"
import useNews from "@/models/useNews"
import useMediaQueries from "@/hooks/useMediaQueries"

const HomeNews = defineComponent({
  name: "HomeNews",
  components: {
    NewsPostThumbnail,
    NewsPostMobileThumbnail,
    Loader,
    "v-icon": Icon,
  },
  setup() {
    const { onBigScreen } = useMediaQueries()
    const { news, highlightedNews, fetchNews, isLoading } = useNews()

    const newsPosts = computed(() => {
      const numberOfPosts = onBigScreen.value ? 2 : 5
      if (onBigScreen) {
        return [...highlightedNews.value, ...news.value].slice(0, numberOfPosts)
      }
      return highlightedNews.value.slice(0, numberOfPosts)
    })

    fetchNews({ per_page: 5 })

    return {
      isLoading,
      news: newsPosts,
      newsGridUrl: Urls.News,
      MAIN_COLOR,
      onBigScreen,
    }
  },
})
export default HomeNews
