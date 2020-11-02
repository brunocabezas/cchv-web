import { defineComponent, computed, useMeta } from "@nuxtjs/composition-api"
import Loader from "@/components/Loader.vue"
import Media from "@/components/Media/Media.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import useResidencies from "@/models/useResidencies"
import { Residency } from "../../../types"
import { sortByDate } from "@/utils/arrays"
import { MOBILE_IMG_HEIGHT } from "@/utils/constants"
import meta from "~/utils/meta"

const Residency = defineComponent({
  name: "Residency",
  head: {},
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
      residencies,
      isLoading,
    } = useResidencies()
    

    const residency = computed<Residency | undefined>(() =>
      getResidencyBySlug(props.slug)
    )

    useMeta(() => ({
      title: !residency.value ? "" : residency.value.name,
      meta: !residency.value
        ? []
        : meta({
            title: residency.value.name,
            url: "https://bobross.com",
            description: residency.value.text,
            mainImage: residency.value.gallery[0] && residency.value.gallery[0].url
          })
    }));

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
