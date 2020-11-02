import { defineComponent, computed, useContext } from "@nuxtjs/composition-api";
import usePrograms from "@/models/usePrograms";
import { Program } from "@/types";
import Loader from "@/components/Loader.vue";
import Media from "@/components/Media/Media.vue";
import DowneyProgramVideos from "@/components/Programs/DowneyProgramVideos.vue";
import ProgramActivites from "@/components/Programs/ProgramActivities.vue";
import Editions from "@/components/Programs/Editions/EditionsList.vue";
import Residencies from "@/components/Programs/Residencies/Residencies.vue";
import SchoolProgramsTabs from "@/components/Programs/SchoolProgramsTabs/SchoolProgramsTabs.vue";
import SchoolProgramWorkshopsTabs from "@/components/Programs/SchoolProgramsTabs/SchoolProgramWorkshopsTabs.vue";
import { ProgramExtraContent } from "@/types/customFieldsTypes";
import useMediaQueries from "@/hooks/useMediaQueries";

const ProgramPage = defineComponent({
  name: "ProgramPage",
  components: {
    Loader,
    DowneyProgramVideos,
    SchoolProgramsTabs,
    ProgramActivites,
    SchoolProgramWorkshopsTabs,
    Media,
    Residencies,
    Editions
  },
  setup() {
    const { params }= useContext()
    const { onBigScreen } = useMediaQueries();
    const {
      getProgramBySlug,
      isLoading,
      matchContentTypeWithProgram
    } = usePrograms();

    const program = computed<Program | undefined>(() =>
      getProgramBySlug(params.value.slug)
    );

    const isArtScienceAndCultureProgram = computed<boolean>(() =>
      program.value
        ? matchContentTypeWithProgram(
            ProgramExtraContent.ArtScienceAndCulture,
            program.value
          )
        : false
    );

    return {
      program,
      isLoading,
      onBigScreen,
      isMagneticFieldsProgram: computed<boolean>(() =>
        program.value
          ? matchContentTypeWithProgram(
              ProgramExtraContent.Activities,
              program.value
            )
          : false
      ),
      isSchoolProgram: computed<boolean>(() =>
        program.value
          ? matchContentTypeWithProgram(
              ProgramExtraContent.Schools,
              program.value
            )
          : false
      ),
      isDowneyProgram: computed<boolean>(() =>
        program.value
          ? matchContentTypeWithProgram(
              ProgramExtraContent.Videos,
              program.value
            )
          : false
      ),
      isResidencies: computed<boolean>(() =>
        program.value
          ? matchContentTypeWithProgram(
              ProgramExtraContent.Residencies,
              program.value
            )
          : false
      ),
      isArtScienceAndCultureProgram: isArtScienceAndCultureProgram,
      pageHasFullWidth: isArtScienceAndCultureProgram
    };
  }
});

export default ProgramPage;
