import { defineComponent, ref } from "@vue/composition-api"
import useSponsors from "@/models/useSponsors"
import Icon from "vue-awesome/components/Icon.vue"
import CollapseTransition from "@ivanv/vue-collapse-transition"
import { BIG_SPONSOR_CATEGORY_LABEL } from "@/utils/constants"
import Loader from "@/components/Loader.vue"
import useMediaQueries from "@/hooks/useMediaQueries"

export default defineComponent({
  name: "FooterSponsors",
  components: {
    Loader,
    "v-icon": Icon,
    "collapse-transition": CollapseTransition,
  },
  setup() {
    const {
      sponsorsCategories,
      fetchSponsorsAndCategories,
      isLoading,
    } = useSponsors()
    const isFooterOpen = ref(false)
    const { onBigScreen } = useMediaQueries()

    function toggleFooterSponsors() {
      const newValue = !isFooterOpen.value
      isFooterOpen.value = newValue
    }

    fetchSponsorsAndCategories()
    return {
      sponsorsCategories,
      isLoading,
      onBigScreen,
      isFooterOpen,
      toggleFooterSponsors,
      BIG_SPONSOR_CATEGORY_LABEL,
    }
  },
})
