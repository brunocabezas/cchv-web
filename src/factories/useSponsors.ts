import Vue from "vue"
import VueCompositionApi, { Ref, computed } from "@vue/composition-api"
import apiRoutes from "@/api/apiRoutes"
import useAsyncData, { AsyncDataStatus } from "@/factories/useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField } from "@/utils/api"
import { SponsorCategoryKeys } from "@/types/customFieldsTypes"

Vue.use(VueCompositionApi)

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

  return {
    fetchSponsorsAndCategories,
    sponsors: computed(() => {
      return sponsorsCategories.value.map((cat) => {
        const categorySponsors = getCustomField(
          cat,
          SponsorCategoryKeys.sponsors
        )
        return Object.assign({}, cat, {
          sponsors: categorySponsors.map((sponsorId: number) =>
            sponsors.value.find((s) => s.id === sponsorId)
          ),
        })
      })
    }),
    isLoading,
  }
}
