import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "@/api/apiRoutes"
import useAsyncData from "@/factories/useAsyncData"
import { WpResponseData, WPResponseItem } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { SponsorCategoryKeys, SponsorKeys } from "@/types/customFieldsKeysTypes"
import View from "@/types/viewTypes"

Vue.use(VueCompositionApi)

type ObjectWithOrder = { order: number }
const sortByOrder = (a: ObjectWithOrder, b: ObjectWithOrder) =>
  a.order - b.order

const mapWpResponseToView =
  // Mapping WpResponseItem to View.SponsorsCategory
  (
    sponsorCategoryPost: WPResponseItem,
    sponsors: WpResponseData
  ): View.SponsorsCategory => {
    const sponsorsIds = getCustomField(
      sponsorCategoryPost,
      SponsorCategoryKeys.sponsors
    )
    return {
      id: sponsorCategoryPost.id,
      name: getWPTitle(sponsorCategoryPost),
      order: getCustomField(sponsorCategoryPost, SponsorCategoryKeys.order),
      sponsors: sponsorsIds
        .filter((sponsorId: number) => sponsors.find((s) => s.id === sponsorId))
        .map((sponsorId: number) => {
          const spon = sponsors.find((s) => s.id === sponsorId)
          if (spon) {
            return {
              id: sponsorId,
              order: getCustomField(spon, SponsorKeys.order),
              logo: getCustomField(spon, SponsorKeys.logo),
              url: getCustomField(spon, SponsorKeys.url),
            }
          }
        })
        .sort(sortByOrder),
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

  const sponsorsCategories = computed<View.SponsorsCategory[]>(() =>
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
