import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { Document } from "@/types"
import useAsyncData from "../utils/useAsyncData"
import {
  WPResponseItem,
  WPDocument,
  DEFAULT_WP_DOCUMENT,
} from "@/types/wordpressTypes"
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api"
import { DEFAULT_ORDER } from "@/utils/static"
import { DocumentKeys } from "@/types/customFieldsKeysTypes"
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
          documentUrl: getCustomFieldFromPost<WPDocument>(
            documentPost,
            DocumentKeys.link,
            DEFAULT_WP_DOCUMENT
          ).url,
          order: getCustomFieldFromPost<number>(
            documentPost,
            DocumentKeys.order,
            DEFAULT_ORDER
          ),
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
