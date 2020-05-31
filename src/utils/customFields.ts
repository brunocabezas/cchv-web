import { getWPTitle, getCustomField } from "./api"
import { NewsKeys } from "@/types/customFieldsKeysTypes"
import { WpResponseData, WpImage } from "@/types/wordpressTypes"
import View from "@/types/viewTypes"
import dayjs from "dayjs"
import { DATE_FORMAT } from "./static"

const mapNewsToView = (state: WpResponseData): View.NewsPost[] => {
  const news = state.map(
    (newsPost): View.NewsPost => {
      const gallery: WpImage[] = getCustomField(newsPost, NewsKeys.gallery, [])
      return {
        id: newsPost.id,
        title: getWPTitle(newsPost),
        date: dayjs(newsPost.date).format(DATE_FORMAT),
        thumbnail: (gallery[0] && gallery[0].url) || "",
        slug: newsPost.slug,
        abstract: getCustomField(newsPost, NewsKeys.abstract, ""),
        text: getCustomField(newsPost, NewsKeys.text, ""),
        gallery,
        related: getCustomField(newsPost, NewsKeys.related, [])
          .filter((postId: number) => state.find((pst) => pst.id === postId))
          .map((postId: number) => {
            const post = state.find((pst) => pst.id === postId)
            if (post) {
              const relatedGallery = getCustomField(post, NewsKeys.gallery, [])
              return {
                title: getWPTitle(post),
                id: post.id,
                slug: post.slug,
                date: dayjs(post.date).format(DATE_FORMAT),
                thumbnail: (relatedGallery[0] && relatedGallery[0].url) || "",
              }
            }
          }),
        video_url: getCustomField(newsPost, NewsKeys.video_url, ""),
      }
    }
  )

  return news
}

export default {
  mapNewsToView,
}
