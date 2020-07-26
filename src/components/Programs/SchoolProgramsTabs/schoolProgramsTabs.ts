import { defineComponent, computed } from "@vue/composition-api"
import Loader from "@/components/Loader.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import DownloadLink from "@/components/DownloadLink.vue"
import useSchoolPrograms from "@/models/useSchoolPrograms"
import useTabs from "@/hooks/useTabs"
import { SchoolProgram } from "@/types"

const SchoolProgramsTabs = defineComponent({
  name: "SchoolProgramsTabs",
  components: {
    Loader,
    ProgressiveImage,
    DownloadLink,
  },
  setup() {
    const {
      schoolPrograms,
      schoolProgramsTabs,
      getSchoolProgramById,
      isLoading,
      getSchoolProgramUrlBySlug,
      fetchSchoolPrograms,
      schoolProgramsAbstract,
    } = useSchoolPrograms()
    const { tabs, activeTabId, setActiveTab } = useTabs(schoolProgramsTabs)

    fetchSchoolPrograms()

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
      isLoading,
      getSchoolProgramUrlBySlug,
    }
  },
})

export default SchoolProgramsTabs
