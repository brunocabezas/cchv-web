import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { ProgramVideo } from "@/types"
import useAsyncData from "@/hooks/useAsyncData"
import { WPResponseItem } from "@/types/wordpressTypes"
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api"
import { ProgramVideoKeys } from "@/types/customFieldsKeysTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchProgramVideos, isLoading } = useAsyncData<
  WPResponseItem
>(apiRoutes.ProgramVideos)

const mapProgramVideoFromWpPost = (
  programVideoPost: WPResponseItem
): ProgramVideo => ({
  id: programVideoPost.id,
  name: getWPTitle(programVideoPost),
  url: getCustomFieldFromPost(programVideoPost, ProgramVideoKeys.url, ""),
  event: getCustomFieldFromPost(programVideoPost, ProgramVideoKeys.event, ""),
  thumbnail: getCustomFieldFromPost(
    programVideoPost,
    ProgramVideoKeys.thumbnail,
    ""
  ),
  year: getCustomFieldFromPost(programVideoPost, ProgramVideoKeys.year, ""),
  author: getCustomFieldFromPost(programVideoPost, ProgramVideoKeys.author, ""),
  text: getCustomFieldFromPost(programVideoPost, ProgramVideoKeys.text, ""),
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

export default function usePrograms() {
  const programVideos = computed<ProgramVideo[]>(() =>
    data.value.map(mapProgramVideoFromWpPost)
  )

  return {
    fetchProgramVideos,
    programVideos,
    isLoading,
  }
}
