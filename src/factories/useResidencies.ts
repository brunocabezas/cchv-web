import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "@/utils/useAsyncData"
import { WPResponseItem } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import Urls from "@/utils/urls"
import { ResidencyKeys } from "@/types/customFieldsKeysTypes"
import { Residency } from "@/types"
import { sortByDate } from "@/utils/arrays"

Vue.use(VueCompositionApi)

const { data, fetch: fetchResidencies, isLoading } = useAsyncData<
  WPResponseItem
>(apiRoutes.Residencies)

const mapResidenciesFromWpPost = (wordpressPost: WPResponseItem): Residency => {
  console.log(getCustomField(wordpressPost, ResidencyKeys.date))
  return {
    id: wordpressPost.id,
    slug: wordpressPost.slug,
    name: getWPTitle(wordpressPost),
    video_url: getCustomField(wordpressPost, ResidencyKeys.video_url),
    gallery: getCustomField(wordpressPost, ResidencyKeys.gallery),
    text: getCustomField(wordpressPost, ResidencyKeys.text),
    date: getCustomField(wordpressPost, ResidencyKeys.date),
    readable_date: getCustomField(wordpressPost, ResidencyKeys.readable_date),
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
