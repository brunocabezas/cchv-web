import Vue from "vue"
import VueCompositionApi, { computed, ref } from "@vue/composition-api"
import Urls from "@/utils/urls"
import { ActivityType } from "@/types/customFieldsTypes"
import useNews from "./useNews"
import useWpCategories from "./useWpCategories"
import { WPResponseItem } from "@/types/wordpressTypes"
import newsHelpers from "@/utils/news"

Vue.use(VueCompositionApi)

export default function useActivities(fetchData?: ActivityType) {
  const {
    activityCategories,
    fetchCategories,
    isLoading: isLoadingCategories,
  } = useWpCategories()
  const { fetchNews } = useNews()
  const isLoadingActivities = ref(false)
  // Activities, one per activity type
  const conversations = ref<WPResponseItem[]>([])
  const perfomances = ref<WPResponseItem[]>([])
  const concerts = ref<WPResponseItem[]>([])
  const movies = ref<WPResponseItem[]>([])

  // Initial data fetch
  if (fetchData && fetchData !== ActivityType.None) {
    fetchCategories().then(() => {
      const category = activityCategories.value.find(
        (cat) => cat.slug === fetchData
      )
      console.log(category, activityCategories.value, fetchData)
      if (category && category.count > 0) {
        fetchActivities(fetchData)
      }
    })
  } else {
    fetchCategories()
  }

  function fetchActivities(activityType: ActivityType) {
    const category = activityCategories.value.find(
      (cat) => cat.slug === activityType
    )
    if (!category) {
      return
    } else if (category.count === 0) {
      return console.warn("Category without any posts, skip fetchNews()")
    }

    isLoadingActivities.value = true
    fetchNews({ categories: category.id }, false, true)
      .then((response) => {
        switch (fetchData) {
          case ActivityType.Concert:
            concerts.value = response.data
            return
          case ActivityType.Conversation:
            conversations.value = response.data
            return
          case ActivityType.Performance:
            perfomances.value = response.data
            return
          case ActivityType.Movie:
            movies.value = response.data
            return
          default:
            return
        }
      })
      .finally(() => (isLoadingActivities.value = false))
  }

  const getActivityUrlBySlug = (postSlug: string): string => {
    return `${Urls.Activities}${postSlug}`
  }

  const getActivitiesGridUrlByActivityType = (type: ActivityType): string => {
    return `${Urls.Programs}campos-magneticos/${getSlugByType(type)}`
  }

  const getActvitiesGridTitleByType = (type: ActivityType): string => {
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
    switch (type) {
      case ActivityType.Concert:
        return newsHelpers.mapNewsPostToActivity(concerts.value)
      case ActivityType.Conversation:
        return newsHelpers.mapNewsPostToActivity(conversations.value)
      case ActivityType.Performance:
        return newsHelpers.mapNewsPostToActivity(perfomances.value)
      case ActivityType.Movie:
        return newsHelpers.mapNewsPostToActivity(movies.value)
      default:
        return []
    }
  }

  const activities = computed(() => [
    ...getActvitiesByType(ActivityType.Concert),
    ...getActvitiesByType(ActivityType.Performance),
    ...getActvitiesByType(ActivityType.Movie),
    ...getActvitiesByType(ActivityType.Conversation),
  ])

  return {
    activities,
    getActvitiesByType,
    fetchActivities,
    // Include news fetch in loading state
    isLoading: computed(
      () => isLoadingCategories.value || isLoadingActivities.value
    ),
    getActivityUrlBySlug,
    getTypeBySlug,
    getActvitiesGridTitleByType,
    getActivitiesGridUrlByActivityType,
  }
}
