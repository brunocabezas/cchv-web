import { defineComponent, computed } from "@vue/composition-api"
import usePrograms from "@/factories/usePrograms"
import { Program } from "@/types"
import Loader from "@/components/Loader.vue"
import Media from "@/components/Media/Media.vue"
import DowneyProgramVideos from "@/components/Programs/DowneyProgramVideos.vue"
import ProgramActivites from "@/components/Programs/ProgramActivities.vue"
import Editions from "@/components/Programs/Editions.vue"
import SchoolProgramsTabs from "@/components/Programs/SchoolProgramsTabs/SchoolProgramsTabs.vue"
import SchoolProgramWorkshopsTabs from "@/components/Programs/SchoolProgramsTabs/SchoolProgramWorkshopsTabs.vue"
import { ProgramExtraContent } from "@/types/customFieldsTypes"

const ProgramPage = defineComponent({
  name: "ProgramPage",
  components: {
    Loader,
    DowneyProgramVideos,
    SchoolProgramsTabs,
    ProgramActivites,
    SchoolProgramWorkshopsTabs,
    Media,
    Editions,
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { getProgramBySlug, isLoading } = usePrograms()

    const program = computed<Program | undefined>(() =>
      getProgramBySlug(props.slug)
    )
    return {
      program,
      isLoading,
      isMagneticFieldsProgram: computed(
        () =>
          program.value &&
          program.value.extra_content === ProgramExtraContent.Activities
      ),
      isSchoolProgram: computed(
        () =>
          program.value &&
          program.value.extra_content === ProgramExtraContent.Schools
      ),
      isDowneyProgram: computed(
        () =>
          program.value &&
          program.value.extra_content === ProgramExtraContent.Videos
      ),
      isArtScienceAndCultureProgram: computed(
        () =>
          program.value &&
          program.value.extra_content ===
            ProgramExtraContent.ArtScienceAndCulture
      ),
    }
  },
})

export default ProgramPage
