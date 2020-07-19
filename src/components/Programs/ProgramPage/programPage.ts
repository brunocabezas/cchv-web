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

// Returns true if program has contentType
const matchProgramContent = (
  contentType: ProgramExtraContent,
  program: Program
) => !!(program && program.extra_content === contentType)

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

    const isArtScienceAndCultureProgram = computed<boolean>(() =>
      program.value
        ? matchProgramContent(
            ProgramExtraContent.ArtScienceAndCulture,
            program.value
          )
        : false
    )

    return {
      program,
      isLoading,
      isMagneticFieldsProgram: computed<boolean>(() =>
        program.value
          ? matchProgramContent(ProgramExtraContent.Activities, program.value)
          : false
      ),
      isSchoolProgram: computed<boolean>(() =>
        program.value
          ? matchProgramContent(ProgramExtraContent.Schools, program.value)
          : false
      ),
      isDowneyProgram: computed<boolean>(() =>
        program.value
          ? matchProgramContent(ProgramExtraContent.Videos, program.value)
          : false
      ),
      isArtScienceAndCultureProgram: isArtScienceAndCultureProgram,
      pageHasFullWidth: isArtScienceAndCultureProgram,
    }
  },
})

export default ProgramPage
