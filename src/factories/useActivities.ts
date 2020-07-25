import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import { Activity } from "@/types"
import Urls from "@/utils/urls"
import { ActivityType } from "@/types/customFieldsTypes"
import useNews from "./useNews"

Vue.use(VueCompositionApi)

export default function useActivities() {
  const { activityNews, fetchNews, isLoading: isLoadingNews } = useNews()
  // There could be also news that are activities
  fetchNews()

  const activities = computed<Activity[]>(() => {
    return [...activityNews.value]
  })

  const getActivityUrlBySlug = (postSlug: string): string => {
    return `${Urls.Activities}${postSlug}`
  }

  const getActivitiesGridUrlByActivityType = (type: ActivityType): string => {
    return `${Urls.Programs}campos-magneticos/${getSlugByType(type)}`
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

  const getTypeBySlug = (slug: string): ActivityType => {
    switch (slug) {
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
    isLoading: computed(() => isLoadingNews.value || false),
    getActivityUrlBySlug,
    getTypeBySlug,
    getActvitiesTitleByType,
    getActivitiesGridUrlByActivityType,
  }
}
