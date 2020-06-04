import { defineComponent, computed } from "@vue/composition-api"
import Loader from "@/components/Loader.vue"
import ProgressiveImage from "@/components/ProgressiveImage.vue"
import useSchoolPrograms from "@/factories/useSchoolPrograms"
import useTabs from "@/factories/useTabs"
import View from "@/types/viewTypes"

const SchoolProgramsTabs = defineComponent({
  name: "SchoolProgramsTabs",
  components: {
    Loader,
    ProgressiveImage,
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

    const activeProgram = computed<View.SchoolProgram | undefined>(() =>
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
      setActiveTab,
      isLoading,
      getSchoolProgramUrlBySlug,
    }
  },
})

export default SchoolProgramsTabs
