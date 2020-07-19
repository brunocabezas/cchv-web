import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "@/utils/useAsyncData"
import { WPResponseItem } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { ResidencyKeys } from "@/types/customFieldsKeysTypes"
import { Residency } from "@/types"

Vue.use(VueCompositionApi)

const { data, fetch: fetchResidencies, isLoading } = useAsyncData<
  WPResponseItem
>(apiRoutes.Residencies)

const mapResidenciesFromWpPost = (wordpressPost: WPResponseItem): Residency => {
  return {
    id: wordpressPost.id,
    name: getWPTitle(wordpressPost),
    video_url: getCustomField(wordpressPost, ResidencyKeys.video_url),
    gallery: getCustomField(wordpressPost, ResidencyKeys.gallery),
    text: getCustomField(wordpressPost, ResidencyKeys.text),
    date: getCustomField(wordpressPost, ResidencyKeys.date),
  }
}

export default function useResidencies() {
  const residencies = computed<Residency[]>(() =>
    data.value.map(mapResidenciesFromWpPost)
  )

  return {
    fetchResidencies,
    residencies,
    isLoading,
  }
}
