import { defineComponent, computed } from "@vue/composition-api"
import Loader from "@/components/Loader.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import DownloadLink from "@/components/DownloadLink.vue"
import useSchoolPrograms from "@/factories/useSchoolPrograms"
import useTabs from "@/factories/useTabs"
import { SchoolProgram } from "@/types/viewTypes"

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
    } = useSchoolPrograms()
    const { tabs, activeTabId, setActiveTab } = useTabs(schoolProgramsTabs)

    fetchSchoolPrograms()

    const activeProgram = computed<SchoolProgram | undefined>(() =>
      getSchoolProgramById(activeTabId.value)
    )

    // Display only if an id is defined
    const displayActiveProgram = computed<boolean>(
      () =>
        !!(
          activeProgram.value &&
          activeProgram.value.id &&
          activeProgram.value.gallery &&
          activeProgram.value.gallery[0]
        )
    )

    return {
      activeTabId,
      tabs,
      schoolPrograms,
      activeProgram,
      displayActiveProgram,
      setActiveTab,
      isLoading,
      getSchoolProgramUrlBySlug,
    }
  },
})

export default SchoolProgramsTabs
