import Vue from "vue"
import VueCompositionApi, { Ref, computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { ProgramVideo } from "@/types/viewTypes"
import useAsyncData from "../utils/useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { ProgramVideoKeys } from "@/types/customFieldsKeysTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchProgramVideos, isLoading } = useAsyncData<
  WpResponseData
>(apiRoutes.ProgramVideos)

export default function usePrograms() {
  const programVideos = computed<ProgramVideo[]>(() => {
    return data.value.map(
      (programVideoPost): ProgramVideo => ({
        id: programVideoPost.id,
        name: getWPTitle(programVideoPost),
        url: getCustomField(programVideoPost, ProgramVideoKeys.url),
        event: getCustomField(programVideoPost, ProgramVideoKeys.event),
        thumbnail: getCustomField(programVideoPost, ProgramVideoKeys.thumbnail),
        year: getCustomField(programVideoPost, ProgramVideoKeys.year),
        author: getCustomField(programVideoPost, ProgramVideoKeys.author),
        text: getCustomField(programVideoPost, ProgramVideoKeys.text),
        country: getCustomField(programVideoPost, ProgramVideoKeys.country),
        duration: getCustomField(programVideoPost, ProgramVideoKeys.duration),
      })
    )
  })

  return {
    fetchProgramVideos,
    programVideos,
    isLoading,
  }
}
