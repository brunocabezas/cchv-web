import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { Program } from "@/types/viewTypes"
import useAsyncData from "./useAsyncData"
import {
  WpResponseData,
  WpImage,
  WPSelectCustomFieldValue,
} from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { ProgramKeys } from "@/types/customFieldsKeysTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchPrograms, isLoading } = useAsyncData<WpResponseData>(
  apiRoutes.Programs
)

export default function usePrograms() {
  const programs = computed<Program[]>(() => {
    return data.value.map(
      (programPost): Program => {
        const extraContent = getCustomField<WPSelectCustomFieldValue>(
          programPost,
          ProgramKeys.extra_content
        )
        return {
          id: programPost.id,
          name: getWPTitle(programPost),
          url: getCustomField(programPost, ProgramKeys.url),
          slug: programPost.slug,
          video_url: getCustomField(programPost, ProgramKeys.video_url),
          is_external: getCustomField<boolean>(
            programPost,
            ProgramKeys.is_external
          ),
          text: getCustomField(programPost, ProgramKeys.text),
          gallery: getCustomField<WpImage[] | undefined>(
            programPost,
            ProgramKeys.gallery
          ),
          extra_content: extraContent.value,
        }
      }
    )
  })

  function getProgramById(slug: string): Program | undefined {
    // console.log(slug, programs.value)
    return programs.value.find((p) => p.slug === slug)
  }

  return {
    fetchPrograms,
    programs,
    isLoading,
    getProgramById,
  }
}
