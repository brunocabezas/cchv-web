import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import View from "@/types/viewTypes"
import useAsyncData from "./useAsyncData"
import { WpResponseData, WpImage } from "@/types/wordpressTypes"
import AppUrls from "@/utils/urls"
import { getWPTitle, getCustomField } from "@/utils/api"
import { ActivityKeys } from "@/types/customFieldsKeysTypes"
import { ActivityType } from "@/types/customFieldsTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchActivities, isLoading } = useAsyncData<
  WpResponseData
>(apiRoutes.Activities)

export default function useActivities() {
  const activities = computed<View.Activity[]>(() => {
    return data.value.map(
      (activity): View.Activity => ({
        id: activity.id,
        name: getWPTitle(activity),
        slug: activity.slug,
        abstract: getCustomField(activity, ActivityKeys.abstract),
        gallery: getCustomField<WpImage[]>(activity, ActivityKeys.gallery),
        text: getCustomField(activity, ActivityKeys.text),
        type: getCustomField(activity, ActivityKeys.type),
        video_url: getCustomField(activity, ActivityKeys.video_url),
      })
    )
  })

  function getActivityUrlBySlug(postSlug: string): string {
    return `${AppUrls.Activities}${postSlug}`
  }

  const getActvitiesTitleByType = (type: ActivityType) => {
    switch (type) {
      case ActivityType.Conversations:
        return "Conversatorio"
      case ActivityType.Movie:
        return "Cine Foro"
      default:
        return ""
    }
  }

  return {
    movies: computed(() =>
      activities.value.filter((act) => act.type === ActivityType.Movie)
    ),
    conversations: computed(() =>
      activities.value.filter((act) => act.type === ActivityType.Conversations)
    ),
    isLoading: computed(() => isLoading.value),
    getActivityUrlBySlug,
    getActvitiesTitleByType,
    fetchActivities,
  }
}
