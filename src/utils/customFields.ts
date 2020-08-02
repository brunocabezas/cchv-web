import { getWPTitle, getCustomField } from "./api"
import { NewsKeys } from "@/types/customFieldsKeysTypes"
import {
  WpResponseData,
  WpImage,
  WPRelatedCustomFieldValue,
} from "@/types/wordpressTypes"
import { NewsPost } from "@/types"
import dayjs from "dayjs"
import { DATE_FORMAT, CUSTOM_FIELDS_DATE_FORMAT } from "./static"
import { ActivityType } from "@/types/customFieldsTypes"
import { dateIsPast } from "./date"

const mapNewsToView = (state: WpResponseData): NewsPost[] => {
  return state
    .map(
      (newsPost): NewsPost => {
        const gallery: WpImage[] = getCustomField(
          newsPost,
          NewsKeys.gallery,
          []
        )
        const activityDate = getCustomField(
          newsPost,
          NewsKeys.activity_date,
          ""
        )
        const activity_date = activityDate
          ? dayjs(activityDate, CUSTOM_FIELDS_DATE_FORMAT).format(DATE_FORMAT)
          : ""

        return {
          id: newsPost.id,
          title: getWPTitle(newsPost),
          date: dayjs(newsPost.date).format(DATE_FORMAT),
          thumbnail: (gallery[0] && gallery[0].url) || "",
          slug: newsPost.slug,
          // As abstract is displayed with v-ellipsis, text needs to be parsed before the view
          abstract: getCustomField<string>(newsPost, NewsKeys.abstract),
          is_activity: getCustomField<ActivityType>(
            newsPost,
            NewsKeys.is_activity
          ),
          text: getCustomField<string>(newsPost, NewsKeys.text),
          gallery,
          is_highlighted: getCustomField<boolean>(
            newsPost,
            NewsKeys.is_highlighted
          ),
          video_url: getCustomField<string>(newsPost, NewsKeys.video_url),
          activity_calendar_url: getCustomField(
            newsPost,
            NewsKeys.activity_calendar_url,
            ""
          ),
          activity_date,
          activity_date_has_passed:
            !getCustomField(newsPost, NewsKeys.activity_calendar_url, "") ||
            dateIsPast(activityDate),
        }
      }
    )
    .sort((a: NewsPost, b: NewsPost): number => {
      return dayjs(b.date, DATE_FORMAT).diff(dayjs(a.date, DATE_FORMAT))
    })
}

export default {
  mapNewsToView,
}
