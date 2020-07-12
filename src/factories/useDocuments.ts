import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { Document } from "@/types"
import useAsyncData from "../utils/useAsyncData"
import { WPResponseItem } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { DEFAULT_ORDER } from "@/utils/static"
import { DocumentKeys } from "@/types/customFieldsKeysTypes"
import { CustomFieldDocument } from "@/types/customFieldsTypes"
import { sortByOrder } from "@/utils/arrays"

Vue.use(VueCompositionApi)

const { data, fetch: fetchDocuments, isLoading } = useAsyncData<WPResponseItem>(
  apiRoutes.Documents
)

export default function useTransparencyDocuments() {
  const documents = computed<Document[]>(() => {
    return data.value
      .map(
        (documentPost): Document => ({
          id: documentPost.id,
          name: getWPTitle(documentPost),
          documentUrl: getCustomField<CustomFieldDocument>(
            documentPost,
            DocumentKeys.link
          ).url,
          order:
            getCustomField<number>(documentPost, DocumentKeys.order) ||
            DEFAULT_ORDER,
        })
      )
      .sort(sortByOrder)
  })

  return {
    fetchDocuments,
    documents,
    isLoading,
  }
}
