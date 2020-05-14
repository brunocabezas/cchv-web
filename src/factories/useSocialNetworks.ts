import Vue from "vue"
import VueCompositionApi, { Ref, computed } from "@vue/composition-api"
import apiRoutes from "@/api/apiRoutes"
import useAsyncData from '@/factories/useAsyncData'
import { WpResponseData } from '@/types/wordpressTypes'

Vue.use(VueCompositionApi)

const { data, fetch: fetchSocialNetworks, status } = useAsyncData<WpResponseData>(apiRoutes.SocialNetworks)

export default function useSocialNetworks() {
  // const news: Readonly<Ref<Readonly<View.News>>> = computed(() => {
    // return helpers.mapNewsToView(data.value)
  // })

  // function getNewsPostById (id : number) {
    // return news.value.find(post => post.id === id);
  // }

  return { fetchSocialNetworks, sponsors: data, status: computed(() => status.value) }
}
