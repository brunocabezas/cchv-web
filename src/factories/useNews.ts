import Vue from "vue"
import VueCompositionApi, { Ref, computed } from "@vue/composition-api"
import apiRoutes from "@/api/apiRoutes"
import View from "@/types/viewTypes"
import helpers from "@/utils/customFields"
import useAsyncData from "./useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchNews, isLoading } = useAsyncData<WpResponseData>(
  apiRoutes.HomeNews
)

export default function useNews() {
  const news = computed<View.News>(() => {
    return helpers.mapNewsToView(data.value)
  })

  function getNewsPostById(id: number) {
    return news.value.find((post) => post.id === id)
  }

  return {
    fetchNews,
    news,
    getNewsPostById,
    isLoading: computed(() => isLoading.value),
  }
}
