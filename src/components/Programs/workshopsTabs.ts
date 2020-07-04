import { defineComponent, computed } from "@vue/composition-api"
import Loader from "@/components/Loader.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import DownloadLink from "@/components/DownloadLink.vue"
import useSchoolPrograms from "@/factories/useSchoolPrograms"
import useTabs from "@/utils/useTabs"
import { SchoolProgram } from "@/types/viewTypes"

const WorkshopsTabs = defineComponent({
  name: "WorkshopsTabs",
  components: {
    Loader,
    ProgressiveImage,
    DownloadLink,
  },
  setup() {
    const {
      workshops,
      getSchoolProgramById,
      isLoading,
      workshopsTabs,
      workshopsAbstract,
      getWorkshopUrlBySlug,
      fetchSchoolPrograms,
    } = useSchoolPrograms()
    const { tabs, activeTabId, setActiveTab } = useTabs(workshopsTabs)

    fetchSchoolPrograms()

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
      isLoading,
      getWorkshopUrlBySlug,
    }
  },
})

export default WorkshopsTabs
