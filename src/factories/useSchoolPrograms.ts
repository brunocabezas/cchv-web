import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import View from "@/types/viewTypes"
import useAsyncData from "./useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { SchoolProgramKeys } from "@/types/customFieldsKeysTypes"
import { Tab, Tabs } from "./useTabs"

Vue.use(VueCompositionApi)

interface SchoolProgramTab extends Tab {
  logo: string
}
type SchoolProgramTabs = SchoolProgramTab[]

const SCHOOL_PROGRAMS_TABS: Tabs = [
  { id: 0, title: "Artes y Oficios" },
  { id: 1, title: "Mediacion y comunidades" },
]

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
        [SchoolProgramKeys.abstract]: getCustomField(
          schoolProgramPost,
          SchoolProgramKeys.abstract
        ),
      })
    )
  })

  const schoolProgramsTabs = computed<SchoolProgramTabs>(() =>
    SCHOOL_PROGRAMS_TABS.map((t, ix) => ({
      ...t,
      logo: (schoolPrograms.value[ix] && schoolPrograms.value[ix].logo) || "",
      id: (schoolPrograms.value[ix] && schoolPrograms.value[ix].id) || t.id,
    }))
  )

  function getSchoolProgramById(
    programId: number
  ): View.SchoolProgram | undefined {
    return schoolPrograms.value.find((p) => p.id === programId)
  }

  return {
    fetchSchoolPrograms,
    schoolPrograms,
    isLoading,
    schoolProgramsTabs,
    getSchoolProgramById,
  }
}
