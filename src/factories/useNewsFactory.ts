import apiRoutes from "@/api/apiRoutes"
import Vue from "vue"
import VueCompositionApi, { Ref, computed } from "@vue/composition-api"
import View from "@/types/viewTypes"
import helpers from "@/utils/customFields"
import useAsyncData from './useAsyncData'
import { WpResponseData } from '@/types/wordpressTypes'

Vue.use(VueCompositionApi)

const { data, fetch: fetchNews, status } = useAsyncData<WpResponseData>(apiRoutes.HomeNews)

export default function useNews() {
  const news: Readonly<Ref<Readonly<View.News>>> = computed(() => {
    return helpers.mapNewsToView(data.value)
  })

  function getNewsPostById (id : number) {
    return news.value.find(post => post.id === id);
  }

  return { fetchNews, news, getNewsPostById, status: computed(() => status.value) }
}
