import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { Page } from "@/types"
import useAsyncData from "@/hooks/useAsyncData"
import { WPResponseItem, WpImage } from "@/types/wordpressTypes"
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api"
import { PageKeys } from "@/types/customFieldsKeysTypes"
import { PageExtraContent } from "@/types/customFieldsTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchPages, isLoading } = useAsyncData<WPResponseItem>(
  apiRoutes.Pages
)

const mapPagesFromWp = (pagePost: WPResponseItem): Page => ({
  id: pagePost.id,
  name: getWPTitle(pagePost),
  text: getCustomFieldFromPost(pagePost, PageKeys.text, ""),
  gallery: getCustomFieldFromPost<WpImage[]>(pagePost, PageKeys.gallery, []),
  extra_content: getCustomFieldFromPost<PageExtraContent>(
    pagePost,
    PageKeys.extra_content,
    PageExtraContent.None
  ),
})

export default function usePages() {
  const pages = computed<Page[]>(() => data.value.map(mapPagesFromWp))

  const transparencyPage = computed<Page | null>(() => {
    return (
      pages.value.find((page) =>
        page.name.toLocaleLowerCase().includes("transparencia")
      ) || null
    )
  })

  const historyPage = computed<Page | null>(() => {
    return (
      pages.value.find((page) =>
        page.name.toLocaleLowerCase().includes("historia")
      ) || null
    )
  })

  return {
    fetchPages,
    transparencyPage,
    historyPage,
    isLoading,
  }
}
