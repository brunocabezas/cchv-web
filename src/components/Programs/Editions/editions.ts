import { defineComponent } from "@vue/composition-api"
import Loader from "@/components/Loader.vue"
import { MAIN_COLOR } from "@/utils/constants"
import useEditions from "@/models/useEditions"
import Edition from "@/components/Programs/Editions/Edition.vue"

export default defineComponent({
  name: "Editions",
  components: {
    Loader,
    Edition,
  },
  setup() {
    const { editions, fetchEditions, isLoading } = useEditions()

    fetchEditions()

    return {
      editions,
      isLoading,
      MAIN_COLOR,
    }
  },
})
