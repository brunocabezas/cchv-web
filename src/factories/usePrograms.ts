import Vue from "vue"
import VueCompositionApi, { Ref, computed } from "@vue/composition-api"
import apiRoutes from "@/api/apiRoutes"
import View from "@/types/viewTypes"
import useAsyncData from "./useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { ProgramKeys } from "@/types/customFieldsKeysTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchPrograms, isLoading } = useAsyncData<WpResponseData>(
  apiRoutes.Programs
)

export default function usePrograms() {
  const team = computed<View.Program[]>(() => {
    return data.value.map(
      (programPost): View.Program => ({
        id: programPost.id,
        name: getWPTitle(programPost),
        [ProgramKeys.video_url]: getCustomField(
          programPost,
          ProgramKeys.video_url
        ),
        [ProgramKeys.url]: getCustomField(programPost, ProgramKeys.url),
        [ProgramKeys.is_external]: getCustomField(
          programPost,
          ProgramKeys.is_external
        ),
        [ProgramKeys.text]: getCustomField(programPost, ProgramKeys.text),
        [ProgramKeys.gallery]: getCustomField(programPost, ProgramKeys.gallery),
        [ProgramKeys.extra_content]: getCustomField(
          programPost,
          ProgramKeys.extra_content
        ),
      })
    )
  })

  return {
    fetchPrograms,
    team,
    isLoading,
  }
}
