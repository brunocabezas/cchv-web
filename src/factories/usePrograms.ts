import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { Program } from "@/types/viewTypes"
import useAsyncData from "../utils/useAsyncData"
import {
  WPResponseItem,
  WpImage,
  WPSelectCustomFieldValue,
} from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { ProgramKeys } from "@/types/customFieldsKeysTypes"
import { ProgramExtraContent } from "@/types/customFieldsTypes"
import AppUrls from "@/utils/urls"

Vue.use(VueCompositionApi)

const { data, fetch: fetchPrograms, isLoading } = useAsyncData<WPResponseItem>(
  apiRoutes.Programs
)

export default function usePrograms() {
  const programs = computed<Program[]>(() => {
    return data.value
      .map(
        (programPost): Program => {
          const extraContent = getCustomField<
            WPSelectCustomFieldValue<ProgramExtraContent>
          >(programPost, ProgramKeys.extra_content)
          const isExternal = getCustomField<boolean>(
            programPost,
            ProgramKeys.is_external
          )
          return {
            id: programPost.id,
            name: getWPTitle(programPost),
            order: getCustomField(programPost, ProgramKeys.order),
            // If program is not external, url is build with the slug
            nav_menu_url: isExternal
              ? getCustomField(programPost, ProgramKeys.url)
              : `${AppUrls.Programs}${programPost.slug}`,
            slug: programPost.slug,
            video_url: getCustomField(programPost, ProgramKeys.video_url),
            is_external: isExternal,
            text: getCustomField(programPost, ProgramKeys.text),
            gallery: getCustomField<WpImage[] | undefined>(
              programPost,
              ProgramKeys.gallery
            ),
            extra_content: extraContent.value,
          }
        }
      )
      .sort((a, b) => a.order - b.order)
  })

  function getProgramById(slug: string): Program | undefined {
    // console.log(slug, programs.value)
    return programs.value.find((p) => p.slug === slug)
  }

  return {
    fetchPrograms,
    // Used on nav menu
    programs,
    isLoading,
    getProgramById,
  }
}
