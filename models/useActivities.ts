import { computed, ref, ssrRef, useAsync } from "@nuxtjs/composition-api";
import Urls from "@/utils/urls";
import { ActivityType } from "@/types/customFieldsTypes";
import useWpCategories from "./useWpCategories";
import { WpResponseData, WPResponseItem } from "@/types/wordpressTypes";
import client from "~/api/client";
import apiRoutes from "~/api/apiRoutes";
import { AxiosResponse } from "axios";
import newsHelpers from "~/utils/news";

const conversations = ssrRef<WPResponseItem[]>([]);
const perfomances = ssrRef<WPResponseItem[]>([]);
const concerts = ssrRef<WPResponseItem[]>([]);
const movies = ssrRef<WPResponseItem[]>([]);

export function getTypeBySlug(slug: string): ActivityType {
  switch (slug) {
    case "conversatorios":
      return ActivityType.Conversation;
    case "cine-foros":
      return ActivityType.Movie;
    case "conciertos":
      return ActivityType.Concert;
    case "performance":
      return ActivityType.Performance;
    default:
      return ActivityType.Conversation;
  }
}
// Activities, one per activity type
export default function useActivities(fetchData?: ActivityType) {
  const {
    activityCategories,
    isLoading: isLoadingCategories
  } = useWpCategories();
  const isLoadingActivities = ref(false);
  const categoryFromWordpress = computed(() =>
    activityCategories.value.find(cat => cat.slug === fetchData)
  );

  // Initial data fetch
  if (
    fetchData &&
    fetchData !== ActivityType.None &&
    categoryFromWordpress.value
  ) {
    // If slug is present, load the single post data
    useAsync(() => {
      isLoadingActivities.value = true;
      return client
        .get(apiRoutes.News, {
          params: {
            categories: categoryFromWordpress.value
              ? categoryFromWordpress.value.id
              : 0
          }
        })
        .then((res: AxiosResponse<WpResponseData>) => {
          switch (fetchData) {
            case ActivityType.Concert:
              concerts.value = res.data;
              return;
            case ActivityType.Conversation:
              conversations.value = res.data;
              return;
            case ActivityType.Performance:
              perfomances.value = res.data;
              return;
            case ActivityType.Movie:
              movies.value = res.data;
              return;
            default:
              return;
          }
        })
        .catch(() => [])
        .finally(() => {
          isLoadingActivities.value = false;
        });
    }, fetchData);
  }

  function getActivityUrlBySlug(postSlug: string): string {
    return `${Urls.Activities}${postSlug}`;
  }

  function getActivitiesGridUrlByActivityType(type: ActivityType): string {
    return `${Urls.Programs}campos-magneticos/${getSlugByType(type)}`;
  }

  function getActvitiesGridTitleByType(type: ActivityType): string {
    switch (type) {
      case ActivityType.Conversation:
        return "Conversatorios";
      case ActivityType.Movie:
        return "Cine Foros";
      case ActivityType.Concert:
        return "Conciertos";
      case ActivityType.Performance:
        return "Performances";
      default:
        return "Noticias";
    }
  }

  function getSlugByType(type: ActivityType): string {
    switch (type) {
      case ActivityType.Conversation:
        return "conversatorios";
      case ActivityType.Movie:
        return "cine-foros";
      case ActivityType.Concert:
        return "conciertos";
      case ActivityType.Performance:
        return "performance";
      default:
        return "";
    }
  }

  function getActvitiesByType(type: ActivityType) {
    switch (type) {
      case ActivityType.Concert:
        return newsHelpers.mapNewsPostsToActivityType(concerts.value);
      case ActivityType.Conversation:
        return newsHelpers.mapNewsPostsToActivityType(conversations.value);
      case ActivityType.Performance:
        return newsHelpers.mapNewsPostsToActivityType(perfomances.value);
      case ActivityType.Movie:
        return newsHelpers.mapNewsPostsToActivityType(movies.value);
      default:
        return [];
    }
  }

  const activities = computed(() => [
    ...getActvitiesByType(ActivityType.Concert),
    ...getActvitiesByType(ActivityType.Performance),
    ...getActvitiesByType(ActivityType.Movie),
    ...getActvitiesByType(ActivityType.Conversation)
  ]);

  return {
    activities,
    getActvitiesByType,
    // fetchActivities,
    isLoading: computed(() => {
      return isLoadingActivities.value;
    }),
    getActivityUrlBySlug,
    getTypeBySlug,
    getActvitiesGridTitleByType,
    getActivitiesGridUrlByActivityType
  };
}
