import { defineComponent, computed, PropType } from "@vue/composition-api"
import useActivities from "@/factories/useActivities"
import { ActivityType } from "@/types/customFieldsTypes"
import Loader from "@/components/Loader.vue"
import ActivitiesGrid from "@/components/Activities/ActivitiesGrid.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"

const ActivitiesGridPage = defineComponent({
  name: "ActivitiesGridPage",
  components: { ProgressiveImage, Loader, ActivitiesGrid },
  props: {
    activityType: {
      type: String as PropType<ActivityType>,
      required: true,
    },
  },
  setup(props) {
    const {
      getActvitiesTitleByType,
      getActvitiesByType,
      isLoading,
    } = useActivities()
    const title = computed(() => getActvitiesTitleByType(props.activityType))
    const activities = computed(() => getActvitiesByType(props.activityType))
    return { activities, title, isLoading }
  },
})

export default ActivitiesGridPage
