import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { ProgramVideo } from "@/types"
import useAsyncData from "../utils/useAsyncData"
import { WPResponseItem } from "@/types/wordpressTypes"
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api"
import { ProgramVideoKeys } from "@/types/customFieldsKeysTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchProgramVideos, isLoading } = useAsyncData<
  WPResponseItem
>(apiRoutes.ProgramVideos)

export default function usePrograms() {
  const programVideos = computed<ProgramVideo[]>(() => {
    return data.value.map(
      (programVideoPost): ProgramVideo => ({
        id: programVideoPost.id,
        name: getWPTitle(programVideoPost),
        url: getCustomFieldFromPost(programVideoPost, ProgramVideoKeys.url, ""),
        event: getCustomFieldFromPost(
          programVideoPost,
          ProgramVideoKeys.event,
          ""
        ),
        thumbnail: getCustomFieldFromPost(
          programVideoPost,
          ProgramVideoKeys.thumbnail,
          ""
        ),
        year: getCustomFieldFromPost(
          programVideoPost,
          ProgramVideoKeys.year,
          ""
        ),
        author: getCustomFieldFromPost(
          programVideoPost,
          ProgramVideoKeys.author,
          ""
        ),
        text: getCustomFieldFromPost(
          programVideoPost,
          ProgramVideoKeys.text,
          ""
        ),
        country: getCustomFieldFromPost(
          programVideoPost,
          ProgramVideoKeys.country,
          ""
        ),
        duration: getCustomFieldFromPost(
          programVideoPost,
          ProgramVideoKeys.duration,
          ""
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
