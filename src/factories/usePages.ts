import Vue from "vue"
import VueCompositionApi, { Ref, computed } from "@vue/composition-api"
import apiRoutes from "@/api/apiRoutes"
import View from "@/types/viewTypes"
import useAsyncData from "./useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { PageKeys } from "@/types/customFieldsKeysTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchPages, isLoading } = useAsyncData<WpResponseData>(
  apiRoutes.Pages
)

export default function usePages() {
  const team = computed<View.Page[]>(() => {
    return data.value.map(
      (pagePost): View.Page => ({
        id: pagePost.id,
        name: getWPTitle(pagePost),
        [PageKeys.text]: getCustomField(pagePost, PageKeys.text),
        [PageKeys.gallery]: getCustomField(pagePost, PageKeys.gallery),
        [PageKeys.extra_content]: getCustomField(
          pagePost,
          PageKeys.extra_content
        ),
      })
    )
  })

  return {
    fetchPages,
    team,
    isLoading,
  }
}
