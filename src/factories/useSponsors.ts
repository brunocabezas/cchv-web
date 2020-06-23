import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "@/factories/useAsyncData"
import { WpResponseData, WPResponseItem } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { SponsorCategoryKeys, SponsorKeys } from "@/types/customFieldsKeysTypes"
import { Sponsor, SponsorsCategory } from "@/types/viewTypes"
import { filterUndef, sortByOrder } from "@/utils/arrays"

Vue.use(VueCompositionApi)

// Map WpResponseItem to SponsorsCategory
const mapWpResponseToView = (
  sponsorCategoryPost: WPResponseItem,
  sponsors: WpResponseData
): SponsorsCategory => {
  const sponsorsIds = getCustomField<number[]>(
    sponsorCategoryPost,
    SponsorCategoryKeys.sponsors,
    []
  )
  const sponsorsFromState = sponsorsIds.map((sponsorId: number) =>
    sponsors.find((s) => s.id === sponsorId)
  )

  const viewSponsors: Sponsor[] = filterUndef(sponsorsFromState).map(
    (sponsor) => ({
      id: sponsor.id,
      order: getCustomField<number>(sponsor, SponsorKeys.order),
      logo: getCustomField(sponsor, SponsorKeys.logo),
      url: getCustomField(sponsor, SponsorKeys.url),
    })
  )

  return {
    id: sponsorCategoryPost.id,
    name: getWPTitle(sponsorCategoryPost),
    order: getCustomField<number>(
      sponsorCategoryPost,
      SponsorCategoryKeys.order
    ),
    sponsors: viewSponsors.sort(sortByOrder),
  }
}

export default function useSponsors() {
  const {
    data: sponsors,
    fetch: fetchSponsors,
    isLoading: isLoadingSponsors,
  } = useAsyncData<WpResponseData>(apiRoutes.Sponsors)

  const {
    data,
    fetch: fetchSponsorsCategories,
    isLoading: isLoadingCategories,
  } = useAsyncData<WpResponseData>(apiRoutes.SponsorsCategories)

  const fetchSponsorsAndCategories = () =>
    Promise.all([fetchSponsorsCategories(), fetchSponsors()])

  const isLoading = computed<boolean>(
    () => isLoadingSponsors.value || isLoadingCategories.value
  )

  const sponsorsCategories = computed<SponsorsCategory[]>(() =>
    data.value
      .map((wp) => mapWpResponseToView(wp, sponsors.value))
      .sort(sortByOrder)
  )

  return {
    fetchSponsorsAndCategories,
    sponsorsCategories,
    isLoading,
  }
}
