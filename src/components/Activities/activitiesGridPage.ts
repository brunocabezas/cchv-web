import { defineComponent, computed, PropType } from "@vue/composition-api"
import useActivities from "@/models/useActivities"
import { ActivityType } from "@/types/customFieldsTypes"
import Loader from "@/components/Loader.vue"
import ActivitiesGrid from "@/components/Activities/ActivitiesGrid/ActivitiesGrid.vue"
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
    const { getActvitiesGridTitleByType, isLoading } = useActivities()
    const title = computed(() =>
      getActvitiesGridTitleByType(props.activityType)
    )
    return { title, isLoading }
  },
})

export default ActivitiesGridPage
