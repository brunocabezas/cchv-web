import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { Video } from "@/types/viewTypes"
import useAsyncData from "../utils/useAsyncData"
import { WPResponseItem } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { VideoKeys } from "@/types/customFieldsKeysTypes"

Vue.use(VueCompositionApi)

export default function useVideos() {
  const { data, fetch: fetchVideos, isLoading } = useAsyncData<WPResponseItem>(
    apiRoutes.Videos
  )

  const videos = computed<Video[]>(() => {
    return data.value.map(
      (video): Video => ({
        id: video.id,
        name: getWPTitle(video),
        video_url: getCustomField(video, VideoKeys.video_url),
        order: getCustomField(video, VideoKeys.order),
      })
    )
  })

  return {
    fetchVideos,
    videos,
    isLoading,
  }
}
