import { defineComponent, PropType, computed } from "@vue/composition-api"
import { SchoolProgram, Activity } from "@/types"
import Loader from "@/components/Loader.vue"
import useActivities from "@/models/useActivities"
import Media from "@/components/Media/Media.vue"
import DownloadLink from "@/components/DownloadLink.vue"
import useSchoolPrograms from "@/models/useSchoolPrograms"

export enum SinglePostDataType {
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
      default: SinglePostDataType.SchoolProgram,
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
    const { activities, isLoading: isLoadingActivities } = useActivities()

    if (
      props.pageType === SinglePostDataType.SchoolProgram ||
      props.pageType === SinglePostDataType.Workshop
    ) {
      fetchSchoolPrograms()
    }

    const page = computed<FullWidthPageData | undefined>(() => {
      console.log(props.pageType)
      switch (props.pageType) {
        case SinglePostDataType.Workshop:
          return workshops.value.find((p) => p.slug === props.slug)
        case SinglePostDataType.SchoolProgram:
          console.log(schoolPrograms.value)
          return schoolPrograms.value.find((p) => p.slug === props.slug)
        default:
          return undefined
      }
    })

    const isLoading = computed(() => {
      switch (props.pageType) {
        case SinglePostDataType.Workshop:
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
