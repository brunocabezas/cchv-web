import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { Video } from "@/types"
import useAsyncData from "@/hooks/useAsyncData"
import { WPResponseItem } from "@/types/wordpressTypes"
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api"
import { VideoKeys } from "@/types/customFieldsKeysTypes"
import { DEFAULT_ORDER } from "@/utils/constants"

Vue.use(VueCompositionApi)

const mapVideoFromWpPost = (video: WPResponseItem): Video => ({
  id: video.id,
  name: getWPTitle(video),
  video_url: getCustomFieldFromPost(video, VideoKeys.video_url, ""),
  order: getCustomFieldFromPost(video, VideoKeys.order, DEFAULT_ORDER),
})

export default function useVideos() {
  const { data, fetch: fetchVideos, isLoading } = useAsyncData<WPResponseItem>(
    apiRoutes.Videos
  )

  const videos = computed<Video[]>(() => data.value.map(mapVideoFromWpPost))

  return {
    fetchVideos,
    videos,
    isLoading,
  }
}
