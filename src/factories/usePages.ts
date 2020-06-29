import Vue from "vue"
import VueCompositionApi, { Ref, computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { Page } from "@/types/viewTypes"
import useAsyncData from "../utils/useAsyncData"
import { WpResponseData, WpImage } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { PageKeys } from "@/types/customFieldsKeysTypes"
import { PageExtraContent } from "@/types/customFieldsTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchPages, isLoading } = useAsyncData<WpResponseData>(
  apiRoutes.Pages
)

export default function usePages() {
  const pages = computed<Page[]>(() => {
    return data.value.map(
      (pagePost): Page => ({
        id: pagePost.id,
        name: getWPTitle(pagePost),
        text: getCustomField(pagePost, PageKeys.text),
        gallery: getCustomField<WpImage[]>(pagePost, PageKeys.gallery),
        extra_content: getCustomField<PageExtraContent>(
          pagePost,
          PageKeys.extra_content
        ),
      })
    )
  })

  const teamPage = computed<Page | null>(() => {
    return (
      pages.value.find((page) =>
        page.name.toLocaleLowerCase().includes("equipo")
      ) || null
    )
  })

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
    teamPage,
    transparencyPage,
    historyPage,
    isLoading,
  }
}
