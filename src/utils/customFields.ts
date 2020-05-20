import { getWPTitle, getCustomField } from "./api"
import { NewsKeys } from "@/types/customFieldsKeysTypes"
import { WpResponseData } from "@/types/wordpressTypes"
import View from "@/types/viewTypes"
import dayjs from "dayjs"
import { DATE_FORMAT } from "./static"

const mapNewsToView = (state: WpResponseData): View.NewsPost[] => {
  const news = state.map(
    (newsPost): View.NewsPost => {
      const gallery = getCustomField(newsPost, NewsKeys.gallery, [])
      return {
        id: newsPost.id,
        title: getWPTitle(newsPost),
        date: dayjs(newsPost.date).format(DATE_FORMAT),
        thumbnail: (gallery[0] && gallery[0].url) || "",
        [NewsKeys.abstract]: getCustomField(newsPost, NewsKeys.abstract, ""),
        [NewsKeys.text]: getCustomField(newsPost, NewsKeys.text, ""),
        [NewsKeys.gallery]: gallery,
        [NewsKeys.related]: getCustomField(newsPost, NewsKeys.related, [])
          .filter((postId: number) => state.find((pst) => pst.id === postId))
          .map((postId: number) => {
            const post = state.find((pst) => pst.id === postId)
            if (post) {
              const postGal = getCustomField(post, NewsKeys.gallery, [])
              return {
                title: getWPTitle(post),
                id: post.id,
                date: dayjs(post.date).format(DATE_FORMAT),
                thumbnail: (postGal[0] && postGal[0].url) || "",
              }
            }
          }),
        [NewsKeys.video_url]: getCustomField(newsPost, NewsKeys.video_url, ""),
      }
    }
  )

  return news
}

export default {
  mapNewsToView,
}
