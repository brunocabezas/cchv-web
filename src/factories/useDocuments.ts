import Vue from "vue"
import VueCompositionApi, { Ref, computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { Document } from "@/types/viewTypes"
import useAsyncData from "./useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { DocumentKeys } from "@/types/customFieldsKeysTypes"
import { CustomFieldDocument } from "@/types/customFieldsTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchDocuments, isLoading } = useAsyncData<WpResponseData>(
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
          order: getCustomField<number>(documentPost, DocumentKeys.order) || 0,
        })
      )
      .sort((a: Document, b: Document) => b.order - a.order)
  })

  return {
    fetchDocuments,
    documents,
    isLoading,
  }
}
