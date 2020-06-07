import { getWPTitle, getCustomField } from "./api"
import { NewsKeys } from "@/types/customFieldsKeysTypes"
import {
  WpResponseData,
  WpImage,
  WPRelatedCustomFieldValue,
} from "@/types/wordpressTypes"
import { RelatedNewsPost, NewsPost } from "@/types/viewTypes"
import dayjs from "dayjs"
import { DATE_FORMAT } from "./static"
import { filterUndef } from "./arrays"

const mapRelatedNews = (
  related: WPRelatedCustomFieldValue,
  state: WpResponseData
): RelatedNewsPost[] => {
  const relatedOnState = related.filter((postId: number) =>
    state.find((pst) => pst.id === postId)
  )

  return filterUndef(
    relatedOnState.map((postId: number) => {
      const post = state.find((pst) => pst.id === postId)
      if (post) {
        const relatedGallery = getCustomField<WpImage[]>(
          post,
          NewsKeys.gallery,
          []
        )
        return {
          title: getWPTitle(post),
          id: post.id,
          slug: post.slug,
          date: dayjs(post.date).format(DATE_FORMAT),
          thumbnail: (relatedGallery[0] && relatedGallery[0].url) || "",
        }
      } else return undefined
    })
  )
}

const mapNewsToView = (state: WpResponseData): NewsPost[] => {
  const news = state
    .map(
      (newsPost): NewsPost => {
        const gallery: WpImage[] = getCustomField(
          newsPost,
          NewsKeys.gallery,
          []
        )
        const related = getCustomField<WPRelatedCustomFieldValue>(
          newsPost,
          NewsKeys.related,
          []
        )
        return {
          id: newsPost.id,
          title: getWPTitle(newsPost),
          date: dayjs(newsPost.date).format(DATE_FORMAT),
          thumbnail: (gallery[0] && gallery[0].url) || "",
          slug: newsPost.slug,
          abstract: getCustomField(newsPost, NewsKeys.abstract, ""),
          text: getCustomField(newsPost, NewsKeys.text, ""),
          gallery,
          is_highlighted: getCustomField<boolean>(
            newsPost,
            NewsKeys.is_highlighted
          ),
          related: mapRelatedNews(related, state),
          video_url: getCustomField(newsPost, NewsKeys.video_url, ""),
        }
      }
    )
    .sort((a: NewsPost, b: NewsPost) => dayjs(a.date).diff(dayjs(b.date)))

  return news
}

export default {
  mapNewsToView,
}
