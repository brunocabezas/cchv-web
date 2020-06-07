import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { SchoolProgram } from "@/types/viewTypes"
import useAsyncData from "./useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { SchoolProgramKeys } from "@/types/customFieldsKeysTypes"
import { Tab, Tabs } from "./useTabs"
import AppUrls from "@/utils/urls"

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
  const schoolPrograms = computed<SchoolProgram[]>(() => {
    return data.value.map(
      (schoolProgramPost): SchoolProgram => ({
        id: schoolProgramPost.id,
        name: getWPTitle(schoolProgramPost),
        slug: schoolProgramPost.slug,
        logo: getCustomField(schoolProgramPost, SchoolProgramKeys.logo),
        video_url: getCustomField(
          schoolProgramPost,
          SchoolProgramKeys.video_url
        ),
        text: getCustomField(schoolProgramPost, SchoolProgramKeys.text),
        gallery: getCustomField(schoolProgramPost, SchoolProgramKeys.gallery),
        teachers: getCustomField(schoolProgramPost, SchoolProgramKeys.teachers),
        pdf: getCustomField(schoolProgramPost, SchoolProgramKeys.pdf),
        schedule: getCustomField(schoolProgramPost, SchoolProgramKeys.schedule),
        abstract: getCustomField(schoolProgramPost, SchoolProgramKeys.abstract),
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

  const getSchoolProgramById = (
    programId: number
  ): SchoolProgram | undefined => {
    return schoolPrograms.value.find((p) => p.id === programId)
  }

  const getSchoolProgramUrlBySlug = (slug: string) =>
    `${AppUrls.SchoolProgram}${slug}`

  return {
    fetchSchoolPrograms,
    schoolPrograms,
    isLoading,
    schoolProgramsTabs,
    getSchoolProgramById,
    getSchoolProgramUrlBySlug,
  }
}
