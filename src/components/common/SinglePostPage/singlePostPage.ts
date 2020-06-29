import { defineComponent, PropType, computed } from "@vue/composition-api"
import { SchoolProgram, Activity } from "@/types/viewTypes"
import Loader from "@/components/Loader.vue"
import useActivities from "@/factories/useActivities"
import Media from "@/components/Media/Media.vue"
import DownloadLink from "@/components/DownloadLink.vue"
import useSchoolPrograms from "@/factories/useSchoolPrograms"

export enum SinglePostDataType {
  Activity = "activity",
  SchoolProgram = "school_program",
  Workshop = "workshop",
}

const MEDIA_HEIGHT = "500px"
// Workshop is a variant of SchoolProgram
type FullWidthPageData = SchoolProgram | Activity

const SinglePostPage = defineComponent({
  name: "SinglePostPage",
  props: {
    pageType: {
      type: String as PropType<SinglePostDataType>,
      default: SinglePostDataType.Activity,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  components: { Loader, Media, DownloadLink },
  setup(props) {
    const {
      isLoading: isLoadingSchoolPrograms,
      schoolPrograms,
      workshops,
      fetchSchoolPrograms,
    } = useSchoolPrograms()
    const {
      activities,
      fetchActivities,
      isLoading: isLoadingActivities,
    } = useActivities()

    if (props.pageType === SinglePostDataType.Activity) {
      fetchActivities()
    } else if (
      props.pageType === SinglePostDataType.SchoolProgram ||
      props.pageType === SinglePostDataType.Workshop
    ) {
      fetchSchoolPrograms()
    }

    const page = computed<FullWidthPageData | undefined>(() => {
      switch (props.pageType) {
        case SinglePostDataType.Workshop:
          return workshops.value.find((p) => p.slug === props.slug)
        case SinglePostDataType.Activity:
          return activities.value.find((p) => p.slug === props.slug)
        case SinglePostDataType.SchoolProgram:
          return schoolPrograms.value.find((p) => p.slug === props.slug)
        default:
          return undefined
      }
    })

    const isLoading = computed(() => {
      switch (props.pageType) {
        case SinglePostDataType.Activity || SinglePostDataType.Workshop:
          return !!isLoadingActivities.value
        case SinglePostDataType.SchoolProgram:
          return !!isLoadingSchoolPrograms.value
        default:
          return false
      }
    })

    return {
      page,
      isLoading,
      MEDIA_HEIGHT,
    }
  },
})

export default SinglePostPage
