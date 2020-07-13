import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { SchoolProgram } from "@/types"
import useAsyncData from "../utils/useAsyncData"
import { WpImage, WPResponseItem } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { SchoolProgramKeys } from "@/types/customFieldsKeysTypes"
import { Tab, Tabs } from "../utils/useTabs"
import AppUrls from "@/utils/urls"

Vue.use(VueCompositionApi)

export interface SchoolProgramTab extends Tab {
  logo: string
  active_school_logo: string
}
type SchoolProgramTabs = SchoolProgramTab[]

const { data, fetch: fetchSchoolPrograms, isLoading } = useAsyncData<
  WPResponseItem
>(apiRoutes.SchoolPrograms)

// The text to introduce workshops (displayed above the workshop tabs)
// is included on a workshop from schoolPrograms with this specific title
const WORKSHOP_ABSTRACT_POST_NAME = "MANDRAGORA_TEXTO"
const SCHOOL_ABSTRACT_POST_NAME = "ESCUELAS_TEXTO"

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
        is_active: getCustomField<boolean>(
          schoolProgramPost,
          SchoolProgramKeys.is_active
        ),
        logo: getCustomField(schoolProgramPost, SchoolProgramKeys.logo),
        active_school_logo: getCustomField(
          schoolProgramPost,
          SchoolProgramKeys.active_school_logo
        ),
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

  // Programs have is_workshop set false
  const programs = computed<SchoolProgram[]>(() =>
    schoolPrograms.value
      .filter((program) => !program.is_workshop)
      // Remove workshop that contains the abstract text
      .filter((p) => p.name !== WORKSHOP_ABSTRACT_POST_NAME)
      .filter((p) => p.name !== SCHOOL_ABSTRACT_POST_NAME)
  )

  const workshops = computed<SchoolProgram[]>(() =>
    schoolPrograms.value
      .filter((program) => program.is_workshop)
      // Remove workshop that contains the abstract text
      .filter((p) => p.name !== WORKSHOP_ABSTRACT_POST_NAME)
      .filter((p) => p.name !== SCHOOL_ABSTRACT_POST_NAME)
  )

  const workshopsAbstract = computed(() => {
    const postWithText = schoolPrograms.value.find(
      (p) => p.name === WORKSHOP_ABSTRACT_POST_NAME
    )

    return postWithText ? postWithText.text : ""
  })

  const schoolProgramsAbstract = computed(() => {
    const postWithText = schoolPrograms.value.find(
      (p) => p.name === SCHOOL_ABSTRACT_POST_NAME
    )

    return postWithText ? postWithText.text : ""
  })

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

  const getWorkshopUrlBySlug = (slug: string) => `${AppUrls.Workshop}${slug}`

  return {
    fetchSchoolPrograms,
    isLoading,
    workshops,
    workshopsAbstract,
    workshopsTabs,
    schoolProgramsAbstract,
    schoolPrograms: programs,
    schoolProgramsTabs,
    getSchoolProgramById,
    getSchoolProgramUrlBySlug,
    getWorkshopUrlBySlug,
  }
}
