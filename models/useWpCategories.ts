import { computed, ssrRef, useAsync } from "@nuxtjs/composition-api";
import { WpCategory } from "@/types/wordpressTypes";
import { ActivityType } from "@/types/customFieldsTypes";
import client from "~/api/client";
import apiRoutes from "~/api/apiRoutes";
import { handleErrorResponse } from "~/utils/api";

const loading = ssrRef(false);

export default function useWpCategories() {
  const categories = useAsync<WpCategory[]>(() => {
    loading.value = true;
    return client
      .get(apiRoutes.WpCategories)
      .then(res => res.data)
      .catch(handleErrorResponse)
      .finally(() => {
        loading.value = false;
      });
  });

  const activityCategories = computed<WpCategory[]>(() =>
    categories.value
      ? categories.value.filter(
          cat =>
            cat.slug === ActivityType.Concert ||
            cat.slug === ActivityType.Conversation ||
            cat.slug === ActivityType.Performance ||
            cat.slug === ActivityType.Movie
        )
      : []
  );

  return {
    categories,
    activityCategories,
    isLoading: loading
  };
}
