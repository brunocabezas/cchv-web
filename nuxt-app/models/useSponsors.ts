import Vue from "vue"
import VueCompositionApi, { computed } from "@nuxtjs/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "@/hooks/useAsyncData"
import { WpResponseData, WPResponseItem } from "@/types/wordpressTypes"
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api"
import { SponsorCategoryKeys, SponsorKeys } from "@/types/customFieldsKeysTypes"
import { Sponsor, SponsorsCategory } from "@/types"
import { filterUndef, sortByOrder } from "@/utils/arrays"
import { DEFAULT_ORDER } from "@/utils/constants"

Vue.use(VueCompositionApi)

// Map WpResponseItem to SponsorsCategory
const mapWpResponseToView = (
  sponsorCategoryPost: WPResponseItem,
  sponsors: WpResponseData
): SponsorsCategory => {
  const sponsorsIds = getCustomFieldFromPost<number[]>(
    sponsorCategoryPost,
    SponsorCategoryKeys.sponsors,
    []
  )
  const sponsorsFromState = sponsorsIds.map((sponsorId: number) =>
    sponsors.find((s) => s.id === sponsorId)
  )

  const viewSponsors: Sponsor[] = filterUndef(sponsorsFromState).map(
    (sponsor): Sponsor => ({
      id: sponsor.id,
      order: getCustomFieldFromPost<number>(
        sponsor,
        SponsorKeys.order,
        DEFAULT_ORDER
      ),
      logo: getCustomFieldFromPost(sponsor, SponsorKeys.logo, ""),
      url: getCustomFieldFromPost(sponsor, SponsorKeys.url, ""),
    })
  )

  return {
    id: sponsorCategoryPost.id,
    name: getWPTitle(sponsorCategoryPost),
    order: getCustomFieldFromPost<number>(
      sponsorCategoryPost,
      SponsorCategoryKeys.order,
      DEFAULT_ORDER
    ),
    sponsors: viewSponsors.sort(sortByOrder),
  }
}

export default function useSponsors() {
  const {
    data: sponsors,
    fetch: fetchSponsors,
    isLoading: isLoadingSponsors,
  } = useAsyncData<WPResponseItem>(apiRoutes.Sponsors)

  const {
    data,
    fetch: fetchSponsorsCategories,
    isLoading: isLoadingCategories,
  } = useAsyncData<WPResponseItem>(apiRoutes.SponsorsCategories)

  const isLoading = computed<boolean>(
    () => isLoadingSponsors.value || isLoadingCategories.value
  )

  const sponsorsCategories = computed<SponsorsCategory[]>(() =>
    data.value
      .map((wp) => mapWpResponseToView(wp, sponsors.value))
      .sort(sortByOrder)
  )

  function fetchSponsorsAndCategories() {
    return Promise.all([fetchSponsorsCategories(), fetchSponsors()])
  }
  
  return {
    fetchSponsorsAndCategories,
    sponsorsCategories,
    isLoading,
  }
}
