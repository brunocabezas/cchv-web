import { getWPTitle, getCustomField } from "./api"
import { NewsKeys } from "@/types/customFieldsKeysTypes"
import { WpResponseData } from "@/types/wordpressTypes"
import dayjs from "dayjs"
import View from "@/types/viewTypes"
import { DATE_FORMAT } from "./static"

const mapNewsToView = (state: WpResponseData): View.News =>
  state.map((newsPost) => ({
    [NewsKeys.title]: getWPTitle(newsPost),
    [NewsKeys.abstract]: getCustomField(newsPost, NewsKeys.abstract),
    [NewsKeys.date]: dayjs(getCustomField(newsPost, NewsKeys.date)).format(
      DATE_FORMAT
    ),
    imageUrl: getCustomField(newsPost, NewsKeys.img)[0].url,
    id: newsPost.id,
  }))

export default {
  mapNewsToView,
}
