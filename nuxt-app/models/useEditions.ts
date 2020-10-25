import Vue from "vue"
import VueCompositionApi, { computed } from "@nuxtjs/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "@/hooks/useAsyncData"
import { WPResponseItem } from "@/types/wordpressTypes"
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api"
import { EditionKeys } from "@/types/customFieldsKeysTypes"
import { Edition } from "@/types"
import { sortByOrder } from "@/utils/arrays"
import { DEFAULT_ORDER } from "@/utils/constants"

Vue.use(VueCompositionApi)

const { data, fetch: fetchEditions, isLoading } = useAsyncData<WPResponseItem>(
  apiRoutes.Editions
)

const mapEditionsFromWpPost = (editionPost: WPResponseItem): Edition => {
  return {
    id: editionPost.id,
    name: getWPTitle(editionPost),
    video_url: getCustomFieldFromPost(editionPost, EditionKeys.video_url, ""),
    gallery: getCustomFieldFromPost(editionPost, EditionKeys.gallery, []),
    text: getCustomFieldFromPost(editionPost, EditionKeys.text, ""),
    brochure_url: getCustomFieldFromPost(
      editionPost,
      EditionKeys.brochure_url,
      ""
    ),
    url: getCustomFieldFromPost(editionPost, EditionKeys.url, ""),
    order: getCustomFieldFromPost(
      editionPost,
      EditionKeys.order,
      DEFAULT_ORDER
    ),
    date: getCustomFieldFromPost(editionPost, EditionKeys.date, ""),
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
