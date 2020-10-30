import { computed, useAsync } from "@nuxtjs/composition-api";
import apiRoutes from "../../api/apiRoutes";
import { Video } from "@/types";
import { WpResponseData, WPResponseItem } from "@/types/wordpressTypes";
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api";
import { VideoKeys } from "@/types/customFieldsKeysTypes";
import { DEFAULT_ORDER } from "@/utils/constants";
import client from "~/api/client";

const mapVideoFromWpPost = (video: WPResponseItem): Video => ({
  id: video.id,
  name: getWPTitle(video),
  video_url: getCustomFieldFromPost(video, VideoKeys.video_url, ""),
  order: getCustomFieldFromPost(video, VideoKeys.order, DEFAULT_ORDER)
});

export default function useVideos() {
  const data = useAsync<WpResponseData>(() =>
    client
      .get(apiRoutes.Videos)
      .then(res => res.data)
      .catch(() => [])
  );
  const videos = computed<Video[]>(() =>
    data.value ? data.value.map(mapVideoFromWpPost) : []
  );

  return {
    // fetchVideos,
    videos,
    isLoading: false
  };
}
