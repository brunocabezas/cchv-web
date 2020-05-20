import Vue from "vue"
import VueCompositionApi, { Ref, computed } from "@vue/composition-api"
import apiRoutes from "@/api/apiRoutes"
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

  function getNewsPostById(id: number) {
    return news.value.find((post) => post.id === id)
  }

  function getNewsPostUrl(postId: number): string {
    return `${AppUrls.NewsPost}${postId}`
  }

  return {
    fetchNews,
    news,
    getNewsPostUrl,
    getNewsPostById,
    isLoading: computed(() => isLoading.value),
  }
}
