import Vue from "vue"
import VueCompositionApi, { Ref, computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import View from "@/types/viewTypes"
import useAsyncData from "./useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { DocumentKeys } from "@/types/customFieldsKeysTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchDocuments, isLoading } = useAsyncData<WpResponseData>(
  apiRoutes.Documents
)

export default function useTransparencyDocuments() {
  const documents = computed<View.Document[]>(() => {
    return data.value.map(
      (documentPost): View.Document => ({
        id: documentPost.id,
        name: getWPTitle(documentPost),
        [DocumentKeys.link]: getCustomField(documentPost, DocumentKeys.link),
      })
    )
  })

  return {
    fetchDocuments,
    documents,
    isLoading,
  }
}
