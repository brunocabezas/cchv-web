import { defineComponent, computed } from "@nuxtjs/composition-api"
import Loader from "@/components/Loader.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import DownloadLink from "@/components/DownloadLink.vue"
import useSchoolPrograms from "@/models/useSchoolPrograms"
import SchoolProgramThumbnail from "@/components/Programs/SchoolProgramsTabs/SchoolProgramThumbnail.vue"
import useTabs from "@/hooks/useTabs"
import { SchoolProgram } from "@/types"
import useMediaQueries from "@/hooks/useMediaQueries"

const SchoolProgramWorkshopsTabs = defineComponent({
  name: "SchoolProgramWorkshopsTabs",
  components: {
    Loader,
    ProgressiveImage,
    DownloadLink,
    SchoolProgramThumbnail,
  },
  setup() {
    const {
      workshops,
      getSchoolProgramById,
      workshopsTabs,
      workshopsAbstract,
      getWorkshopUrlBySlug,
    } = useSchoolPrograms()
    const { onBigScreen } = useMediaQueries()
    const { tabs, activeTabId, setActiveTab } = useTabs(workshopsTabs)

    const activeWorkshop = computed<SchoolProgram | undefined>(() =>
      getSchoolProgramById(activeTabId.value)
    )

    // Display only if an id is defined
    const displayActiveWorkshop = computed<boolean>(
      () => !!(activeWorkshop.value && activeWorkshop.value.id)
    )

    return {
      activeTabId,
      tabs,
      workshops,
      workshopsAbstract,
      activeWorkshop,
      displayActiveWorkshop,
      setActiveTab,
      isLoading: false,
      getWorkshopUrlBySlug,
      onBigScreen,
    }
  },
})

export default SchoolProgramWorkshopsTabs
