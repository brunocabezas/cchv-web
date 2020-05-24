import { defineComponent, computed } from "@vue/composition-api"
import Loader from "@/components/Loader.vue"
import Media from "@/components/Media.vue"
import useSchoolPrograms from "@/factories/useSchoolPrograms"
import useTabs from "@/factories/useTabs"

const SchoolProgramsTabs = defineComponent({
  name: "SchoolProgramsTabs",
  components: {
    Loader,
    Media,
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  setup() {
    const {
      schoolPrograms,
      schoolProgramsTabs,
      getSchoolProgramById,
      isLoading,
      fetchSchoolPrograms,
    } = useSchoolPrograms()
    const { tabs, activeTabId, setActiveTab } = useTabs(schoolProgramsTabs)
    fetchSchoolPrograms()

    const activeProgram = computed(() =>
      getSchoolProgramById(activeTabId.value)
    )

    return {
      activeTabId,
      tabs,
      schoolPrograms,
      activeProgram,
      displayActiveProgram: computed(
        () => !!(activeProgram.value && activeProgram.value.id)
      ),
      setActiveTab,
      isLoading,
    }
  },
})

export default SchoolProgramsTabs
