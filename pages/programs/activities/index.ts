import { defineComponent, computed, PropType, useMeta } from "@nuxtjs/composition-api"
import useActivities from "@/models/useActivities"
import { ActivityType } from "@/types/customFieldsTypes"
import Loader from "@/components/Loader.vue"
import ActivitiesGrid from "@/components/news/activities/ActivitiesGrid/ActivitiesGrid.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import Icon from "vue-awesome/components/Icon.vue";
import Urls from "@/utils/urls"
import meta from "~/utils/meta"

const ActivitiesPage = defineComponent({
  name: "ActivitiesPage",
  head: {},
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
    
    useMeta(() => ({
      title: title.value,
      meta: !title.value
        ? []
        : meta({
            title: title.value,
            description: 'Actividades de campos magnéticos',
          })
    }));

    return { title, isLoading, backUrl: Urls.MagneticFieldsProgram }
  },
})

export default ActivitiesPage
