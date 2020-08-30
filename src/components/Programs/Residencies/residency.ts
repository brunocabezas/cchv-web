import { defineComponent, computed } from "@vue/composition-api"
import Loader from "@/components/Loader.vue"
import Media from "@/components/Media/Media.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import useResidencies from "@/models/useResidencies"
import { Residency } from "../../../types"
import { sortByDate } from "@/utils/arrays"
import { MOBILE_IMG_HEIGHT } from "@/utils/static"
import useMediaQueries from "@/hooks/useMediaQueries"

const Residency = defineComponent({
  name: "Residency",
  components: {
    Loader,
    Media,
    ProgressiveImage,
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const {
      getResidencyBySlug,
      getResidencyUrlBySlug,
      fetchResidencies,
      residencies,
      isLoading,
    } = useResidencies()
    const { onBigScreen } = useMediaQueries()

    fetchResidencies()

    const residency = computed<Residency | undefined>(() =>
      getResidencyBySlug(props.slug)
    )

    // Returns residencies occurring ahead from today, the closest one goes first
    const latestResidencies = computed<Residency[]>(() =>
      residencies.value
        .filter((res) => res.slug !== props.slug)
        .slice(0, 3)
        .sort(sortByDate)
    )

    return {
      residency,
      isLoading,
      latestResidencies,
      getResidencyUrlBySlug,
      MOBILE_IMG_HEIGHT,
    }
  },
})

export default Residency
