import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { SchoolProgram } from "@/types/viewTypes"
import useAsyncData from "./useAsyncData"
import { WpResponseData, WpImage } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { SchoolProgramKeys } from "@/types/customFieldsKeysTypes"
import { Tab, Tabs } from "./useTabs"
import AppUrls from "@/utils/urls"

Vue.use(VueCompositionApi)

interface SchoolProgramTab extends Tab {
  logo: string
}
type SchoolProgramTabs = SchoolProgramTab[]

// const SCHOOL_PROGRAMS_TABS: Tabs = [
//   { id: 0, title: "Artes y Oficios" },
//   { id: 1, title: "Mediacion y comunidades" },
// ]

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
        is_workshop: getCustomField<boolean>(
          schoolProgramPost,
          SchoolProgramKeys.is_workshop
        ),
        logo: getCustomField(schoolProgramPost, SchoolProgramKeys.logo),
        video_url: getCustomField(
          schoolProgramPost,
          SchoolProgramKeys.video_url
        ),
        text: getCustomField(schoolProgramPost, SchoolProgramKeys.text),
        gallery: getCustomField<WpImage[]>(
          schoolProgramPost,
          SchoolProgramKeys.gallery
        ),
        teachers: getCustomField(schoolProgramPost, SchoolProgramKeys.teachers),
        pdf: getCustomField(schoolProgramPost, SchoolProgramKeys.pdf),
        schedule: getCustomField(schoolProgramPost, SchoolProgramKeys.schedule),
        abstract: getCustomField(schoolProgramPost, SchoolProgramKeys.abstract),
      })
    )
  })

  // Divinding exports by is_workshp
  const programs = computed<SchoolProgram[]>(() =>
    schoolPrograms.value.filter((program) => !program.is_workshop)
  )
  const workshops = computed<SchoolProgram[]>(() =>
    schoolPrograms.value.filter((program) => program.is_workshop)
  )

  const schoolProgramsTabs = computed<SchoolProgramTabs>(() =>
    programs.value.map((t) => ({
      ...t,
      title: t.name,
    }))
  )

  const workshopsTabs = computed<SchoolProgramTabs>(() =>
    workshops.value.map((t) => ({
      ...t,
      title: t.name,
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
    isLoading,
    workshops,
    workshopsTabs,
    schoolPrograms: programs,
    schoolProgramsTabs,
    getSchoolProgramById,
    getSchoolProgramUrlBySlug,
  }
}
