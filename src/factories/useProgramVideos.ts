import Vue from "vue"
import VueCompositionApi, { Ref, computed } from "@vue/composition-api"
import apiRoutes from "@/api/apiRoutes"
import View from "@/types/viewTypes"
import useAsyncData from "./useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { ProgramVideoKeys } from "@/types/customFieldsKeysTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchProgramVideos, isLoading } = useAsyncData<
  WpResponseData
>(apiRoutes.Videos)

export default function usePrograms() {
  const programVideos = computed<View.ProgramVideo[]>(() => {
    return data.value.map(
      (programVideoPost): View.ProgramVideo => ({
        id: programVideoPost.id,
        name: getWPTitle(programVideoPost),
        [ProgramVideoKeys.url]: getCustomField(
          programVideoPost,
          ProgramVideoKeys.url
        ),
        [ProgramVideoKeys.year]: getCustomField(
          programVideoPost,
          ProgramVideoKeys.year
        ),
        [ProgramVideoKeys.author]: getCustomField(
          programVideoPost,
          ProgramVideoKeys.author
        ),
        [ProgramVideoKeys.text]: getCustomField(
          programVideoPost,
          ProgramVideoKeys.text
        ),
        [ProgramVideoKeys.country]: getCustomField(
          programVideoPost,
          ProgramVideoKeys.country
        ),
        [ProgramVideoKeys.duration]: getCustomField(
          programVideoPost,
          ProgramVideoKeys.duration
        ),
      })
    )
  })

  return {
    fetchProgramVideos,
    programVideos,
    isLoading,
  }
}
