import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "@/hooks/useAsyncData"
import { WPResponseItem } from "@/types/wordpressTypes"
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api"
import Urls from "@/utils/urls"
import { ResidencyKeys } from "@/types/customFieldsKeysTypes"
import { Residency } from "@/types"
import { sortByDate } from "@/utils/arrays"
import {
  DATE_FORMAT,
  SHORT_DATE_FORMAT,
  CUSTOM_FIELDS_DATE_FORMAT,
} from "@/utils/constants"
import dayjs from "dayjs"

Vue.use(VueCompositionApi)

const { data, fetch: fetchResidencies, isLoading } = useAsyncData<
  WPResponseItem
>(apiRoutes.Residencies)

const mapResidenciesFromWpPost = (wordpressPost: WPResponseItem): Residency => {
  const hasDateRange = !!getCustomFieldFromPost(
    wordpressPost,
    ResidencyKeys.end_date,
    ""
  )
  // Date format
  const dateObject = dayjs(
    getCustomFieldFromPost(wordpressPost, ResidencyKeys.date, ""),
    CUSTOM_FIELDS_DATE_FORMAT,
    ""
  )
  const date = dateObject.format(DATE_FORMAT)
  const short_date = dateObject.format(SHORT_DATE_FORMAT)

  // End date format
  const endDateObject = dayjs(
    getCustomFieldFromPost(wordpressPost, ResidencyKeys.end_date, ""),
    CUSTOM_FIELDS_DATE_FORMAT
  )
  const end_date = hasDateRange ? endDateObject.format(DATE_FORMAT) : ""
  const short_end_date = hasDateRange
    ? endDateObject.format(SHORT_DATE_FORMAT)
    : ""

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
    short_end_date,
  }
}

export default function useResidencies() {
  const residencies = computed<Residency[]>(() =>
    data.value.map(mapResidenciesFromWpPost).sort(sortByDate)
  )

  function getResidencyBySlug(slug: string): Residency | undefined {
    return residencies.value.find((res) => res.slug === slug)
  }

  function getResidencyUrlBySlug(slug: string): string {
    return `${Urls.Residencies}/${slug}`
  }

  return {
    fetchResidencies,
    getResidencyBySlug,
    getResidencyUrlBySlug,
    residencies,
    isLoading,
  }
}
