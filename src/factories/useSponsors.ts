import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "@/factories/useAsyncData"
import { WpResponseData, WPResponseItem } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { SponsorCategoryKeys, SponsorKeys } from "@/types/customFieldsKeysTypes"
import { Sponsor, SponsorsCategory } from "@/types/viewTypes"
import { filterUndef } from "@/utils/arrays"

Vue.use(VueCompositionApi)

// TODO move to helpers?
const sortByOrder = (
  a: Sponsor | SponsorsCategory,
  b: Sponsor | SponsorsCategory
) => a.order - b.order

const mapWpResponseToView =
  // Mapping WpResponseItem to SponsorsCategory
  (
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
        order: getCustomField(sponsor, SponsorKeys.order),
        logo: getCustomField(sponsor, SponsorKeys.logo),
        url: getCustomField(sponsor, SponsorKeys.url),
      })
    )

    return {
      id: sponsorCategoryPost.id,
      name: getWPTitle(sponsorCategoryPost),
      order: getCustomField(sponsorCategoryPost, SponsorCategoryKeys.order),
      sponsors: viewSponsors.sort(sortByOrder),
    }
  }

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

export default function useSponsors() {
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
