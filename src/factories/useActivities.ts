import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { Activity } from "@/types/viewTypes"
import useAsyncData from "../utils/useAsyncData"
import { WpImage, WPResponseItem } from "@/types/wordpressTypes"
import AppUrls from "@/utils/urls"
import { getWPTitle, getCustomField } from "@/utils/api"
import { ActivityKeys } from "@/types/customFieldsKeysTypes"
import { ActivityType } from "@/types/customFieldsTypes"
import useNews from "./useNews"

Vue.use(VueCompositionApi)

const { data, fetch: fetchActivities, isLoading } = useAsyncData<
  WPResponseItem
>(apiRoutes.Activities)

export default function useActivities() {
  const { activityNews, fetchNews, isLoading: isLoadingNews } = useNews()
  // There could be also news that are activities
  fetchNews()

  const activities = computed<Activity[]>(() => {
    return [
      ...data.value.map(
        (activity): Activity => ({
          id: activity.id,
          isNewsPost: false,
          name: getWPTitle(activity),
          slug: activity.slug,
          abstract: getCustomField(activity, ActivityKeys.abstract),
          gallery: getCustomField<WpImage[]>(activity, ActivityKeys.gallery),
          text: getCustomField(activity, ActivityKeys.text),
          type: getCustomField(activity, ActivityKeys.type),
          video_url: getCustomField(activity, ActivityKeys.video_url),
        })
      ),
      ...activityNews.value,
    ]
  })

  const getActivityUrlBySlug = (postSlug: string): string => {
    return `${AppUrls.Activities}${postSlug}`
  }

  const getActvitiesTitleByType = (type: ActivityType): string => {
    switch (type) {
      case ActivityType.Conversation:
        return "Conversatorios"
      case ActivityType.Movie:
        return "Cine Foros"
      case ActivityType.Concert:
        return "Conciertos"
      case ActivityType.Performance:
        return "Performances"
      default:
        return ""
    }
  }

  const getActvitiesByType = (type: ActivityType) => {
    return activities.value.filter((act) => act.type === type)
  }

  return {
    activities,
    getActvitiesByType,
    // Include news fetch in loading state
    isLoading: computed(() => isLoading.value || !!isLoadingNews.value),
    getActivityUrlBySlug,
    getActvitiesTitleByType,
    fetchActivities,
  }
}
