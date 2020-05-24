import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import View from "@/types/viewTypes"
import useAsyncData from "./useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { SchoolProgramKeys } from "@/types/customFieldsKeysTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchSchoolPrograms, isLoading } = useAsyncData<
  WpResponseData
>(apiRoutes.SchoolPrograms)

export default function useSchoolPrograms() {
  const schoolPrograms = computed<View.SchoolProgram[]>(() => {
    return data.value.map(
      (schoolProgramPost): View.SchoolProgram => ({
        id: schoolProgramPost.id,
        name: getWPTitle(schoolProgramPost),
        // slug: schoolProgramPost.slug,
        [SchoolProgramKeys.logo]: getCustomField(
          schoolProgramPost,
          SchoolProgramKeys.logo
        ),
        [SchoolProgramKeys.video_url]: getCustomField(
          schoolProgramPost,
          SchoolProgramKeys.video_url
        ),
        [SchoolProgramKeys.text]: getCustomField(
          schoolProgramPost,
          SchoolProgramKeys.text
        ),
        [SchoolProgramKeys.gallery]: getCustomField(
          schoolProgramPost,
          SchoolProgramKeys.gallery
        ),
        [SchoolProgramKeys.teachers]: getCustomField(
          schoolProgramPost,
          SchoolProgramKeys.teachers
        ),
        [SchoolProgramKeys.pdf]: getCustomField(
          schoolProgramPost,
          SchoolProgramKeys.pdf
        ),
        [SchoolProgramKeys.schedule]: getCustomField(
          schoolProgramPost,
          SchoolProgramKeys.schedule
        ),
      })
    )
  })

  // function getProgramById(slug: string): View.Program | undefined {
  //   console.log(slug, programs.value)
  //   return programs.value.find((p) => p.slug === slug)
  // }

  return {
    fetchSchoolPrograms,
    schoolPrograms,
    isLoading,
    // getProgramById,
  }
}
