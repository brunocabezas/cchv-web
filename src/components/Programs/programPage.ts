import { defineComponent, computed } from "@vue/composition-api"
import usePrograms from "@/factories/usePrograms"
import { Program } from "@/types/viewTypes"
import Loader from "@/components/Loader.vue"
import Media from "@/components/Media/Media.vue"
import DowneyProgramVideos from "@/components/Programs/DowneyProgramVideos.vue"
import ProgramActivites from "@/components/Programs/ProgramActivities.vue"
import SchoolProgramsTabs from "@/components/Programs/SchoolProgramsTabs.vue"

const ProgramPage = defineComponent({
  name: "ProgramPage",
  components: {
    Loader,
    DowneyProgramVideos,
    SchoolProgramsTabs,
    ProgramActivites,
    Media,
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { getProgramById, isLoading } = usePrograms()

    const program = computed<Program | undefined>(() =>
      getProgramById(props.slug)
    )
    return {
      program,
      isLoading,
      isMagneticFieldsProgram: computed(
        () => program.value && program.value.extra_content === "activities"
      ),
      isSchoolProgram: computed(
        () => program.value && program.value.extra_content === "schools"
      ),
      isDowneyProgram: computed(
        () => program.value && program.value.extra_content === "videos"
      ),
    }
  },
})

export default ProgramPage
