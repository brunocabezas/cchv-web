import { computed, ssrRef, useAsync } from "@nuxtjs/composition-api";
import apiRoutes from "~/api/apiRoutes";
import { ProgramVideo } from "@/types";
import { WpResponseData, WPResponseItem } from "@/types/wordpressTypes";
import { getCustomFieldFromPost, getWPTitle, handleErrorResponse } from "@/utils/api";
import { ProgramVideoKeys } from "@/types/customFieldsKeysTypes";
import client from "~/api/client";

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
  )
});

const loading = ssrRef(false);

export default function usePrograms() {
  const data = useAsync<WpResponseData>(() => {
    loading.value = true;
    return client
      .get(apiRoutes.ProgramVideos)
      .then(res => res.data)
      .catch(handleErrorResponse)
      .finally(() => {
        loading.value = false;
      });
  });
  const programVideos = computed<ProgramVideo[]>(() =>
    data.value ? data.value.map(mapProgramVideoFromWpPost) : []
  );

  return {
    // fetchProgramVideos,
    programVideos,
    isLoading: false
  };
}
