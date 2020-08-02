import { getWPTitle, getCustomFieldFromPost as getCustomField } from "./api"
import { NewsKeys } from "@/types/customFieldsKeysTypes"
import { WpImage, WPResponseItem } from "@/types/wordpressTypes"
import { NewsPost } from "@/types"
import dayjs from "dayjs"
import { DATE_FORMAT, CUSTOM_FIELDS_DATE_FORMAT } from "./static"
import { ActivityType } from "@/types/customFieldsTypes"
import { dateIsPast } from "./date"

const mapNewsToView = (newsPost: WPResponseItem): NewsPost => {
  const gallery = getCustomField<WpImage[]>(newsPost, NewsKeys.gallery, [])
  const activityDate = getCustomField<string>(
    newsPost,
    NewsKeys.activity_date,
    ""
  )

  const activity_date = activityDate
    ? dayjs(activityDate, CUSTOM_FIELDS_DATE_FORMAT).format(DATE_FORMAT)
    : ""

  const activity_calendar_url = getCustomField<string>(
    newsPost,
    NewsKeys.activity_calendar_url,
    ""
  )

  return {
    id: newsPost.id,
    title: getWPTitle(newsPost),
    slug: newsPost.slug,
    date: dayjs(newsPost.date).format(DATE_FORMAT),
    thumbnail: (gallery[0] && gallery[0].url) || "",
    abstract: getCustomField(newsPost, NewsKeys.abstract, ""),
    is_activity: getCustomField<ActivityType>(
      newsPost,
      NewsKeys.is_activity,
      ActivityType.None
    ),
    text: getCustomField(newsPost, NewsKeys.text, ""),
    is_highlighted: getCustomField<boolean>(
      newsPost,
      NewsKeys.is_highlighted,
      false
    ),
    video_url: getCustomField(newsPost, NewsKeys.video_url, ""),
    gallery,
    activity_calendar_url,
    activity_date,
    activity_date_has_passed:
      !activity_calendar_url || dateIsPast(activityDate),
  }
}

export default {
  mapNewsToView,
}
