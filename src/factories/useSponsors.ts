import Vue from "vue"
import VueCompositionApi, { Ref, computed } from "@vue/composition-api"
import apiRoutes from "@/api/apiRoutes"
import useAsyncData, { AsyncDataStatus } from "@/factories/useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { SponsorCategoryKeys, SponsorKeys } from "@/types/customFieldsKeysTypes"
import { SponsorsCategory } from "@/types/customFieldsTypes"

Vue.use(VueCompositionApi)

type ObjectWithOrder = { order: number }
const sortByOrder = (a: ObjectWithOrder, b: ObjectWithOrder) =>
  a.order - b.order

const { data: sponsors, fetch: fetchSponsors, status } = useAsyncData<
  WpResponseData
>(apiRoutes.Sponsors)
const {
  data: sponsorsCategories,
  fetch: fetchSponsorsCategories,
  status: sponsorCategoriesStatus,
} = useAsyncData<WpResponseData>(apiRoutes.SponsorsCategories)

export default function useSponsors() {
  const fetchSponsorsAndCategories = () =>
    Promise.all([fetchSponsorsCategories(), fetchSponsors()])

  const isLoading = computed(
    () =>
      status.value === AsyncDataStatus.Loading ||
      sponsorCategoriesStatus.value === AsyncDataStatus.Loading
  )

  const categories: Readonly<Ref<readonly SponsorsCategory[]>> = computed(
    () => {
      return sponsorsCategories.value
        .map((cat) => {
          const sponsorsIds = getCustomField(cat, SponsorCategoryKeys.sponsors)
          return {
            id: cat.id,
            name: getWPTitle(cat),
            order: getCustomField(cat, SponsorCategoryKeys.order),
            sponsors: sponsorsIds
              .filter((sponsorId: number) =>
                sponsors.value.find((s) => s.id === sponsorId)
              )
              .map((sponsorId: number) => {
                const spon = sponsors.value.find((s) => s.id === sponsorId)
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
        })
        .sort(sortByOrder)
    }
  )

  return {
    fetchSponsorsAndCategories,
    sponsorsCategories: categories,
    isLoading,
  }
}
