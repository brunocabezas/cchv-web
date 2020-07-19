import { defineComponent, computed } from "@vue/composition-api"
import Loader from "@/components/Loader.vue"
import Media from "@/components/Media/Media.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import useResidencies from "@/factories/useResidencies"
import { Residency } from "../../../types"

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

    fetchResidencies()

    const residency = computed<Residency | undefined>(() =>
      getResidencyBySlug(props.slug)
    )

    // Returns residencies occurring ahead from today, the closest one goes first
    const latestResidencies = computed<Residency[]>(() =>
      residencies.value.filter((res) => res.slug !== props.slug).slice(0, 3)
    )

    return { residency, isLoading, latestResidencies, getResidencyUrlBySlug }
  },
})

export default Residency
