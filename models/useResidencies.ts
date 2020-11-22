import { computed, ssrRef, useAsync } from "@nuxtjs/composition-api";
import apiRoutes from "~/api/apiRoutes";
import { WpResponseData, WPResponseItem } from "@/types/wordpressTypes";
import { getCustomFieldFromPost, getWPTitle, handleErrorResponse } from "@/utils/api";
import Urls from "@/utils/urls";
import { ResidencyKeys } from "@/types/customFieldsKeysTypes";
import { Residency } from "@/types";
import { sortByDate } from "@/utils/arrays";
import {
  DATE_FORMAT,
  SHORT_DATE_FORMAT,
  CUSTOM_FIELDS_DATE_FORMAT
} from "@/utils/constants";
import dayjs from "dayjs";
import client from "~/api/client";

const mapResidenciesFromWpPost = (wordpressPost: WPResponseItem): Residency => {
  const hasDateRange = !!getCustomFieldFromPost(
    wordpressPost,
    ResidencyKeys.end_date,
    ""
  );
  // Date format
  const dateObject = dayjs(
    getCustomFieldFromPost(wordpressPost, ResidencyKeys.date, ""),
    CUSTOM_FIELDS_DATE_FORMAT,
    ""
  );
  const date = dateObject.format(DATE_FORMAT);
  const short_date = dateObject.format(SHORT_DATE_FORMAT);

  // End date format
  const endDateObject = dayjs(
    getCustomFieldFromPost(wordpressPost, ResidencyKeys.end_date, ""),
    CUSTOM_FIELDS_DATE_FORMAT
  );
  const end_date = hasDateRange ? endDateObject.format(DATE_FORMAT) : "";
  const short_end_date = hasDateRange
    ? endDateObject.format(SHORT_DATE_FORMAT)
    : "";

  return {
    id: wordpressPost.id,
    slug: wordpressPost.slug,
    name: getWPTitle(wordpressPost),
    video_url: getCustomFieldFromPost(
      wordpressPost,
      ResidencyKeys.video_url,
      ""
    ),
    gallery: getCustomFieldFromPost(wordpressPost, ResidencyKeys.gallery, []),
    text: getCustomFieldFromPost(wordpressPost, ResidencyKeys.text, ""),
    date,
    end_date,
    // Same as date and end_date but with shorter format
    short_date,
    short_end_date
  };
};

const loading = ssrRef(false);
export default function useResidencies() {
  const data = useAsync<WpResponseData>(() => {
    loading.value = true;
    return client
      .get(apiRoutes.Residencies)
      .then(res => res.data)
      .catch(handleErrorResponse)
      .finally(() => {
        loading.value = false;
      });
  });

  const residencies = computed<Residency[]>(() =>
    data.value ? data.value.map(mapResidenciesFromWpPost).sort(sortByDate) : []
  );

  function getResidencyBySlug(slug: string): Residency | undefined {
    return residencies.value.find(res => res.slug === slug);
  }

  function getResidencyUrlBySlug(slug: string): string {
    return `${Urls.Residencies}/${slug}`;
  }

  return {
    getResidencyBySlug,
    getResidencyUrlBySlug,
    residencies,
    isLoading: loading
  };
}
