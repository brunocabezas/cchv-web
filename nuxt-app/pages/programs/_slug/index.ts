import { defineComponent, computed, useContext, useMeta } from "@nuxtjs/composition-api";
import usePrograms from "@/models/usePrograms";
import { Program } from "@/types";
import Loader from "@/components/Loader.vue";
import Media from "@/components/Media/Media.vue";
import DowneyProgramVideos from "@/components/Programs/DowneyProgramVideos.vue";
import ProgramActivities from "@/components/Programs/ProgramActivities.vue";
import Editions from "@/components/Programs/Editions/EditionsList.vue";
import Residencies from "@/components/Programs/Residencies/Residencies.vue";
import SchoolProgramsTabs from "@/components/Programs/SchoolProgramsTabs/SchoolProgramsTabs.vue";
import SchoolProgramWorkshopsTabs from "@/components/Programs/SchoolProgramsTabs/SchoolProgramWorkshopsTabs.vue";
import { ProgramExtraContent } from "@/types/customFieldsTypes";
import useMediaQueries from "@/hooks/useMediaQueries";
import meta from "~/utils/meta";

const ProgramPage = defineComponent({
  name: "ProgramPage",
  head: {},
  components: {
    Loader,
    DowneyProgramVideos,
    SchoolProgramsTabs,
    ProgramActivities,
    SchoolProgramWorkshopsTabs,
    Media,
    Residencies,
    Editions
  },
  setup() {
    const { params } = useContext();
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

    useMeta(() => ({
      title: !program.value ? "Programas" : program.value.name,
      meta: !program.value
        ? []
        : meta({
            title: program.value.name,
            url: "https://bobross.com",
            description: program.value.text,
            mainImage:
              (program.value.gallery &&
                program.value.gallery[0] &&
                program.value.gallery[0].url) ||
              ""
          })
    }));

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
