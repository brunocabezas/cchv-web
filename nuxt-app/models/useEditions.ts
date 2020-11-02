import { computed, ssrRef, useAsync } from "@nuxtjs/composition-api";
import apiRoutes from "../../api/apiRoutes";
import { WpResponseData, WPResponseItem } from "@/types/wordpressTypes";
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api";
import { EditionKeys } from "@/types/customFieldsKeysTypes";
import { Edition } from "@/types";
import { sortByOrder } from "@/utils/arrays";
import { DEFAULT_ORDER } from "@/utils/constants";
import client from "~/api/client";

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
    date: getCustomFieldFromPost(editionPost, EditionKeys.date, "")
  };
};

const loading = ssrRef(false);

export default function useEditions() {
  const data = useAsync<WpResponseData>(() => {
    loading.value = true;
    return client
      .get(apiRoutes.Editions)
      .then(res => res.data)
      .catch(() => [])
      .finally(() => {
        loading.value = false;
      });
  });
  const editions = computed<Edition[]>(() =>
    data.value ? data.value.map(mapEditionsFromWpPost).sort(sortByOrder) : []
  );

  return {
    // fetchEditions,
    editions,
    isLoading: loading
  };
}
