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

const mapEditionsFromWpPost = (editionPost: WPResponseItem): Edition => {
  return {
    id: editionPost.id,
    name: getWPTitle(editionPost),
    video_url: getCustomField(editionPost, EditionKeys.video_url),
    gallery: getCustomField(editionPost, EditionKeys.gallery),
    text: getCustomField(editionPost, EditionKeys.text),
    order: getCustomField(editionPost, EditionKeys.order),
    date: getCustomField(editionPost, EditionKeys.date),
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
