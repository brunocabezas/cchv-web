import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "@/hooks/useAsyncData"
import { WpCategory } from "@/types/wordpressTypes"
import { ActivityType } from "@/types/customFieldsTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchCategories, isLoading } = useAsyncData<WpCategory>(
  apiRoutes.WpCategories
)

export default function useWpCategories() {
  const categories = computed<WpCategory[]>(() => data.value)

  const activityCategories = computed<WpCategory[]>(() =>
    categories.value.filter(
      (cat) =>
        cat.slug === ActivityType.Concert ||
        cat.slug === ActivityType.Conversation ||
        cat.slug === ActivityType.Performance ||
        cat.slug === ActivityType.Movie
    )
  )

  return {
    fetchCategories,
    categories,
    activityCategories,
    isLoading,
  }
}
