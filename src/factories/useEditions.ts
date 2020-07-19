import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "@/utils/useAsyncData"
import { WPResponseItem } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { EditionKeys } from "@/types/customFieldsKeysTypes"
import { Edition } from "@/types"
import { sortByOrder } from "@/utils/arrays"

Vue.use(VueCompositionApi)

const { data, fetch: fetchEditions, isLoading } = useAsyncData<WPResponseItem>(
  apiRoutes.Editions
)

const mapEditionsFromWpPost = (socialNetworkPost: WPResponseItem): Edition => {
  return {
    id: socialNetworkPost.id,
    name: getWPTitle(socialNetworkPost),
    video_url: getCustomField(socialNetworkPost, EditionKeys.video_url),
    gallery: getCustomField(socialNetworkPost, EditionKeys.gallery),
    text: getCustomField(socialNetworkPost, EditionKeys.text),
    order: getCustomField(socialNetworkPost, EditionKeys.order),
  }
}

export default function useEditions() {
  const editions = computed<Edition[]>(() =>
    data.value.map(mapEditionsFromWpPost).sort(sortByOrder)
  )

  return {
    fetchEditions,
    editions,
    isLoading,
  }
}
