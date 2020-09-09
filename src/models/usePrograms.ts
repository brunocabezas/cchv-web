import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { Program } from "@/types"
import useAsyncData from "@/hooks/useAsyncData"
import {
  WPResponseItem,
  WpImage,
  WPSelectCustomFieldValue,
} from "@/types/wordpressTypes"
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api"
import { ProgramKeys } from "@/types/customFieldsKeysTypes"
import { ProgramExtraContent } from "@/types/customFieldsTypes"
import Urls from "@/utils/urls"
import { sortByOrder } from "@/utils/arrays"
import { DEFAULT_ORDER } from "@/utils/constants"

Vue.use(VueCompositionApi)

const { data, fetch: fetchPrograms, isLoading } = useAsyncData<WPResponseItem>(
  apiRoutes.Programs
)

const mapProgramFromWpPost = (programPost: WPResponseItem): Program => {
  const extraContent = getCustomFieldFromPost<
    WPSelectCustomFieldValue<ProgramExtraContent>
  >(programPost, ProgramKeys.extra_content, {
    label: "",
    value: ProgramExtraContent.None,
  })

  const isExternal = getCustomFieldFromPost<boolean>(
    programPost,
    ProgramKeys.is_external,
    false
  )
  return {
    id: programPost.id,
    name: getWPTitle(programPost),
    order: getCustomFieldFromPost(
      programPost,
      ProgramKeys.order,
      DEFAULT_ORDER
    ),
    // If program is not external, url is build with the slug
    nav_menu_url: isExternal
      ? getCustomFieldFromPost(programPost, ProgramKeys.url, "")
      : `${Urls.Programs}${programPost.slug}`,
    slug: programPost.slug,
    video_url: getCustomFieldFromPost(programPost, ProgramKeys.video_url, ""),
    is_external: isExternal,
    text: getCustomFieldFromPost(programPost, ProgramKeys.text, ""),
    gallery: getCustomFieldFromPost<WpImage[]>(
      programPost,
      ProgramKeys.gallery,
      []
    ),
    short_name: getCustomFieldFromPost(programPost, ProgramKeys.short_name, ""),
    extra_content: (extraContent && extraContent.value) || "",
  }
}

export default function usePrograms() {
  const programs = computed<Program[]>(() =>
    data.value.map(mapProgramFromWpPost).sort(sortByOrder)
  )

  function getProgramBySlug(slug: string): Program | undefined {
    return programs.value.find((p) => p.slug === slug)
  }

  function matchContentTypeWithProgram(
    contentType: ProgramExtraContent,
    program: Program
  ) {
    return !!(program && program.extra_content === contentType)
  }

  return {
    fetchPrograms,
    // Used on nav menu
    programs,
    isLoading,
    getProgramBySlug,
    matchContentTypeWithProgram,
  }
}
