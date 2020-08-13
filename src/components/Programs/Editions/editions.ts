import { defineComponent, computed, ref, reactive } from "@vue/composition-api"
import CollapseTransition from "@ivanv/vue-collapse-transition"
import Loader from "@/components/Loader.vue"
import Media from "@/components/Media/Media.vue"
import { MAIN_COLOR } from "@/utils/static"
import Icon from "vue-awesome/components/Icon.vue"
import useEditions from "@/models/useEditions"
import useMediaQueries from "@/hooks/useMediaQueries"
import { Edition } from "@/types"
interface collapseEditionsState {
  [key: string]: boolean
}
const Editions = defineComponent({
  name: "Editions",
  components: {
    Loader,
    Media,
    "v-icon": Icon,
    "collapse-transition": CollapseTransition,
  },
  setup() {
    const { editions, fetchEditions, isLoading } = useEditions()
    const { onBigScreen } = useMediaQueries()
    const collapseStateFromEditions = computed<collapseEditionsState>({
      get: () =>
        editions.value.reduce(
          (acc, ed: Edition): collapseEditionsState =>
            Object.assign(acc, { [ed.id]: false }),
          {}
        ),
      set: (val) => "",
    })
    const collapseStates = reactive<collapseEditionsState>(
      collapseStateFromEditions.value
    )

    fetchEditions()

    function toggleCollapseStates(eventId: string) {
      collapseStates[eventId] = !collapseStates[eventId]
    }
    return {
      editions,
      isLoading,
      MAIN_COLOR,
      onBigScreen,
      toggleCollapseStates,
      collapseStates,
      isOpen: ref({}), 
      collapseStateFromEditions,
    }
  },
})

export default Editions
