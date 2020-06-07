import Vue from "vue"
import VueCompositionApi, { Ref, computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import View from "@/types/viewTypes"
import helpers from "@/utils/customFields"
import useAsyncData from "./useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import AppUrls from "@/utils/urls"

Vue.use(VueCompositionApi)

const { data, fetch: fetchNews, isLoading } = useAsyncData<WpResponseData>(
  apiRoutes.News
)

export default function useNews() {
  const news = computed<View.News>(() => {
    return helpers.mapNewsToView(data.value)
  })

  const homeNews = computed<View.News>(() => {
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

  return {
    news: newsToGrid,
    homeNews,
    isLoading: computed(() => isLoading.value),
    getNewsPostUrl,
    getNewsPostBySlug,
    fetchNews,
  }
}
