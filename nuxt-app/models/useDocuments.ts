import { computed, useAsync } from "@nuxtjs/composition-api";
import apiRoutes from "../../api/apiRoutes";
import { Document } from "@/types";
import {
  WPResponseItem,
  WPDocument,
  DEFAULT_WP_DOCUMENT,
  WpResponseData
} from "@/types/wordpressTypes";
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api";
import { DEFAULT_ORDER } from "@/utils/constants";
import { DocumentKeys } from "@/types/customFieldsKeysTypes";
import { sortByOrder } from "@/utils/arrays";
import client from "~/api/client";

const mapDocumentsFromWpPost = (documentPost: WPResponseItem): Document => ({
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
  )
});

export default function useDocuments() {
  const data = useAsync<WpResponseData>(() =>
    client
      .get(apiRoutes.Documents)
      .then(res => res.data)
      .catch(() => [])
  );

  const documents = computed<Document[]>(() =>
    data.value ? data.value.map(mapDocumentsFromWpPost).sort(sortByOrder) : []
  );

  return {
    documents,
    isLoading: false
  };
}
