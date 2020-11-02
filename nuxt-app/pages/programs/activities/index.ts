import { defineComponent, computed, PropType } from "@nuxtjs/composition-api"
import useActivities from "@/models/useActivities"
import { ActivityType } from "@/types/customFieldsTypes"
import Loader from "@/components/Loader.vue"
import ActivitiesGrid from "@/components/news/activities/ActivitiesGrid/ActivitiesGrid.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import Icon from "vue-awesome/components/Icon.vue";
import Urls from "@/utils/urls"

const ActivitiesPage = defineComponent({
  name: "ActivitiesPage",
  components: { ProgressiveImage, Loader, ActivitiesGrid, "v-icon": Icon },
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
    return { title, isLoading, backUrl: Urls.MagneticFieldsProgram }
  },
})

export default ActivitiesPage
