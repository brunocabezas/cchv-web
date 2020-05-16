import { getWPTitle, getCustomField } from "./api"
import { NewsKeys } from "@/types/customFieldsKeysTypes"
import { WpResponseData } from "@/types/wordpressTypes"
import dayjs from "dayjs"
import View from "@/types/viewTypes"
import { DATE_FORMAT } from "./static"

const mapNewsToView = (state: WpResponseData): View.NewsPost[] =>
  state.map(
    (newsPost): View.NewsPost => {
      return {
        id: newsPost.id,
        title: getWPTitle(newsPost),
        [NewsKeys.abstract]: getCustomField(newsPost, NewsKeys.abstract),
        [NewsKeys.text]: getCustomField(newsPost, NewsKeys.text),
        [NewsKeys.gallery]: getCustomField(newsPost, NewsKeys.gallery),
        [NewsKeys.related]: getCustomField(newsPost, NewsKeys.related),
        [NewsKeys.video_url]: getCustomField(newsPost, NewsKeys.video_url),
      }
    }
  )

export default {
  mapNewsToView,
}
