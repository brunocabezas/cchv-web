import { defineComponent, computed } from "@nuxtjs/composition-api"
import Loader from "@/components/Loader.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import DownloadLink from "@/components/DownloadLink.vue"
import useSchoolPrograms from "@/models/useSchoolPrograms"
import SchoolProgramThumbnail from "@/components/Programs/SchoolProgramsTabs/SchoolProgramThumbnail.vue"
import useTabs from "@/hooks/useTabs"
import { SchoolProgram } from "@/types"
import useMediaQueries from "@/hooks/useMediaQueries"

const SchoolProgramsTabs = defineComponent({
  name: "SchoolProgramsTabs",
  components: {
    Loader,
    ProgressiveImage,
    DownloadLink,
    SchoolProgramThumbnail,
  },
  setup() {
    const {
      schoolPrograms,
      schoolProgramsTabs,
      getSchoolProgramById,
      schoolProgramsAbstract,
    } = useSchoolPrograms()
    const { tabs, activeTabId, setActiveTab } = useTabs(schoolProgramsTabs)
    const { onBigScreen } = useMediaQueries()

    const activeProgram = computed<SchoolProgram | undefined>(() =>
      getSchoolProgramById(activeTabId.value)
    )

    // Display only if an id is defined
    const displayActiveProgram = computed<boolean>(
      () => !!(activeProgram.value && activeProgram.value.id)
    )
    return {
      activeTabId,
      tabs,
      schoolPrograms,
      activeProgram,
      displayActiveProgram,
      schoolProgramsAbstract,
      setActiveTab,
      isLoading: false,
      onBigScreen,
    }
  },
})

export default SchoolProgramsTabs
