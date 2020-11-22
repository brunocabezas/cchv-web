import { computed, ssrRef, useAsync } from "@nuxtjs/composition-api";
import apiRoutes from "~/api/apiRoutes";
import { SchoolProgram } from "@/types";
import {
  WpImage,
  WpResponseData,
  WPResponseItem
} from "@/types/wordpressTypes";
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api";
import { SchoolProgramKeys } from "@/types/customFieldsKeysTypes";
import { Tab } from "@/hooks/useTabs";
import Urls from "@/utils/urls";
import client from "~/api/client";

export interface SchoolProgramTab extends Tab {
  logo: string;
  active_school_logo: string;
}
type SchoolProgramTabs = SchoolProgramTab[];

// The text to introduce workshops (displayed above the workshop tabs)
// is included on a workshop from schoolPrograms with this specific title
const WORKSHOP_ABSTRACT_POST_NAME = "MANDRAGORA_TEXTO";
const SCHOOL_ABSTRACT_POST_NAME = "ESCUELAS_TEXTO";

const mapSchoolProgramFromWpPost = (
  schoolProgramPost: WPResponseItem
): SchoolProgram => ({
  id: schoolProgramPost.id,
  name: getWPTitle(schoolProgramPost),
  slug: schoolProgramPost.slug,
  is_workshop: getCustomFieldFromPost<boolean>(
    schoolProgramPost,
    SchoolProgramKeys.is_workshop,
    false
  ),
  is_active: getCustomFieldFromPost<boolean>(
    schoolProgramPost,
    SchoolProgramKeys.is_active,
    false
  ),
  logo: getCustomFieldFromPost(schoolProgramPost, SchoolProgramKeys.logo, ""),
  active_school_logo: getCustomFieldFromPost(
    schoolProgramPost,
    SchoolProgramKeys.active_school_logo,
    ""
  ),
  video_url: getCustomFieldFromPost(
    schoolProgramPost,
    SchoolProgramKeys.video_url,
    ""
  ),
  text: getCustomFieldFromPost(schoolProgramPost, SchoolProgramKeys.text, ""),
  gallery: getCustomFieldFromPost<WpImage[]>(
    schoolProgramPost,
    SchoolProgramKeys.gallery,
    []
  ),
  teachers: getCustomFieldFromPost(
    schoolProgramPost,
    SchoolProgramKeys.teachers,
    ""
  ),
  pdf: getCustomFieldFromPost(schoolProgramPost, SchoolProgramKeys.pdf, ""),
  schedule: getCustomFieldFromPost(
    schoolProgramPost,
    SchoolProgramKeys.schedule,
    ""
  ),
  abstract: getCustomFieldFromPost(
    schoolProgramPost,
    SchoolProgramKeys.abstract,
    ""
  )
});

const mapProgramTitleFromName = (t: SchoolProgram) => ({
  ...t,
  title: t.name
});

const loading = ssrRef(false);
export default function useSchoolPrograms() {
  const data = useAsync<WpResponseData>(() => {
    loading.value = true;
    return client
      .get(apiRoutes.SchoolPrograms)
      .then(res => res.data)
      .catch(() => [])
      .finally(() => {
        loading.value = false;
      });
  });

  const schoolPrograms = computed<SchoolProgram[]>(() =>
    data.value ? data.value.map(mapSchoolProgramFromWpPost) : []
  );

  // Programs have is_workshop set false
  const programs = computed<SchoolProgram[]>(() =>
    schoolPrograms.value
      .filter(program => !program.is_workshop)
      // Remove workshop that contains the abstract text
      .filter(p => p.name !== WORKSHOP_ABSTRACT_POST_NAME)
      .filter(p => p.name !== SCHOOL_ABSTRACT_POST_NAME)
  );

  const workshops = computed<SchoolProgram[]>(() =>
    schoolPrograms.value
      .filter(program => program.is_workshop)
      // Remove workshop that contains the abstract text
      .filter(p => p.name !== WORKSHOP_ABSTRACT_POST_NAME)
      .filter(p => p.name !== SCHOOL_ABSTRACT_POST_NAME)
  );

  const workshopsAbstract = computed(() => {
    const postWithText = schoolPrograms.value.find(
      p => p.name === WORKSHOP_ABSTRACT_POST_NAME
    );

    return postWithText ? postWithText.text : "";
  });

  const schoolProgramsAbstract = computed(() => {
    const postWithText = schoolPrograms.value.find(
      p => p.name === SCHOOL_ABSTRACT_POST_NAME
    );

    return postWithText ? postWithText.text : "";
  });

  const schoolProgramsTabs = computed<SchoolProgramTabs>(() =>
    programs.value.map(mapProgramTitleFromName)
  );

  const workshopsTabs = computed<SchoolProgramTabs>(() =>
    workshops.value.map(mapProgramTitleFromName)
  );

  function getSchoolProgramById(programId: number): SchoolProgram | undefined {
    return schoolPrograms.value.find(p => p.id === programId);
  }

  function getSchoolProgramUrlBySlug(slug: string) {
    return `${Urls.SchoolProgram}${slug}`;
  }

  function getWorkshopUrlBySlug(slug: string) {
    return `${Urls.Workshop}${slug}`;
  }

  return {
    workshops,
    workshopsAbstract,
    workshopsTabs,
    schoolProgramsAbstract,
    schoolPrograms: programs,
    schoolProgramsTabs,
    getSchoolProgramById,
    getSchoolProgramUrlBySlug,
    getWorkshopUrlBySlug
  };
}
