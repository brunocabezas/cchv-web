import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { NewsPost } from "@/types/viewTypes"
import helpers from "@/utils/customFields"
import useAsyncData from "./useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import AppUrls from "@/utils/urls"

Vue.use(VueCompositionApi)

const { data, fetch: fetchNews, isLoading } = useAsyncData<WpResponseData>(
  apiRoutes.News
)

export default function useNews() {
  const news = computed<NewsPost[]>(() => {
    return helpers.mapNewsToView(data.value)
  })

  const homeNews = computed<NewsPost[]>(() => {
    return news.value.filter((p) => p.is_highlighted).slice(0, 2)
  })

  const newsToGrid = computed(() => {
    return news.value.filter((p) => !homeNews.value.find((n) => n.id === p.id))
  })

  function getNewsPostBySlug(slug: string) {
    return news.value.find((post) => post.slug === slug)
  }

  function getNewsPostUrl(postSlug: string): string {
    return `${AppUrls.NewsPost}${postSlug}`
  }

  const latestNews = computed<NewsPost[]>(() => {
    return news.value.slice(0, 5)
  })

  return {
    news: newsToGrid,
    homeNews,
    latestNews,
    isLoading: computed(() => isLoading.value),
    getNewsPostUrl,
    getNewsPostBySlug,
    fetchNews,
  }
}
