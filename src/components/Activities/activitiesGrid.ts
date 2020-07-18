import { defineComponent, computed, PropType } from "@vue/composition-api"
import useActivities from "@/factories/useActivities"
import { ActivityType } from "@/types/customFieldsTypes"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import { Activity } from "../../types"
import useNews from "../../factories/useNews"

// While onPages prop is set false, max acitivities to be displayed will be determined by MAX_ACTIVITIES
const MAX_ACTIVITIES = 3

const ActivitiesGrid = defineComponent({
  name: "ActivitiesGrid",
  components: { ProgressiveImage },
  props: {
    type: {
      type: String as PropType<ActivityType>,
      required: true,
    },
    onPage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const {
      getActvitiesTitleByType,
      getActivityUrlBySlug,
      getActvitiesByType,
      getActivitiesGridUrlByActivityType,
    } = useActivities()
    const { getNewsPostUrlBySlug } = useNews()
    const title = computed<string>(() => getActvitiesTitleByType(props.type))
    // Limit Activities to MAX_ACTIVITIES
    const activities = computed<Activity[]>(() =>
      !props.onPage
        ? getActvitiesByType(props.type).slice(0, MAX_ACTIVITIES)
        : getActvitiesByType(props.type)
    )
    const activitiesGridUrl = computed<string>(() =>
      getActivitiesGridUrlByActivityType(props.type)
    )
    // Page title
    const pageLinkTitle = computed<string>(
      () =>
        `Ver ${
          props.type === ActivityType.Performance ? `todas` : `todos`
        } los ${title.value}`
    )
    return {
      activities,
      title,
      getNewsPostUrlBySlug,
      getActivityUrlBySlug,
      activitiesGridUrl,
      pageLinkTitle,
    }
  },
})

export default ActivitiesGrid
