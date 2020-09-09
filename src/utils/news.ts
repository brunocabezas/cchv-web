import { getWPTitle, getCustomFieldFromPost as getCustomField } from "./api"
import { NewsKeys } from "@/types/customFieldsKeysTypes"
import { WpImage, WPResponseItem } from "@/types/wordpressTypes"
import { NewsPost, Activity } from "@/types"
import dayjs from "dayjs"
import { DATE_FORMAT, CUSTOM_FIELDS_DATE_FORMAT } from "./static"
import { ActivityType } from "@/types/customFieldsTypes"
import { dateIsPast } from "./date"
import useMediaQueries from "@/hooks/useMediaQueries"

const mapNewsCustomFieldsToNews = (newsPost: WPResponseItem): NewsPost => {
  const { onBigScreen } = useMediaQueries()
  const gallery = getCustomField<WpImage[]>(newsPost, NewsKeys.gallery, [])
  const activityDate = getCustomField<string>(
    newsPost,
    NewsKeys.activity_date,
    ""
  )

  const activity_date = activityDate
    ? dayjs(activityDate, CUSTOM_FIELDS_DATE_FORMAT).format(
        onBigScreen.value ? "DD MMM, YYYY" : DATE_FORMAT
      )
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

// Some news can be defined as also activities
// Map news with NewsKeys.is_activity field set !act.activity_calendar_url || dateInPast(activity_date)to true
const mapNewsToActivities = (newsPost: NewsPost): Activity => ({
  id: newsPost.id,
  name: newsPost.title,
  slug: newsPost.slug,
  type: newsPost.is_activity,
  abstract: newsPost.abstract,
  gallery: newsPost.gallery,
  text: newsPost.text,
  video_url: newsPost.video_url,
  activity_date: newsPost.activity_date,
  activity_date_has_passed: newsPost.activity_date_has_passed,
  activity_calendar_url: newsPost.activity_calendar_url,
})

const mapNewsPostsToActivityType = (newsPosts: WPResponseItem[]): Activity[] =>
  newsPosts
    .map((newsPost) => mapNewsCustomFieldsToNews(newsPost))
    .filter(
      (post: NewsPost) => post[NewsKeys.is_activity] !== ActivityType.None
    )
    .map((newsPost) => mapNewsToActivities(newsPost))

const newsHelpers = {
  mapNewsCustomFieldsToNews,
  mapNewsPostsToActivityType,
}
export default newsHelpers
