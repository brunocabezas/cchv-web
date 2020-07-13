import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { Activity } from "@/types"
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

  const getActivitiesGridUrlByActivityType = (type: ActivityType): string => {
    return `${AppUrls.Programs}campos-magneticos/${getSlugByType(type)}`
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

  const getSlugByType = (type: ActivityType): string => {
    switch (type) {
      case ActivityType.Conversation:
        return "conversatorios"
      case ActivityType.Movie:
        return "cine-foros"
      case ActivityType.Concert:
        return "conciertos"
      case ActivityType.Performance:
        return "performance"
      default:
        return ""
    }
  }

  const getTypeBySlug = (type: string): ActivityType => {
    switch (type) {
      case "conversatorios":
        return ActivityType.Conversation
      case "cine-foros":
        return ActivityType.Movie
      case "conciertos":
        return ActivityType.Concert
      case "performance":
        return ActivityType.Performance
      default:
        return ActivityType.Conversation
    }
  }

  const getActvitiesByType = (type: ActivityType) => {
    return activities.value.filter((act) => act.type === type)
  }

  return {
    activities,
    getActvitiesByType,
    // Include news fetch in loading state
    isLoading: computed(() => isLoading.value || isLoadingNews.value || false),
    getActivityUrlBySlug,
    getTypeBySlug,
    getActvitiesTitleByType,
    getActivitiesGridUrlByActivityType,
    fetchActivities,
  }
}
