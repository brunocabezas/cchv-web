import Vue from "vue"
import VueCompositionApi, { computed, Ref } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { NewsPost, Activity } from "@/types/viewTypes"
import helpers from "@/utils/customFields"
import useAsyncData from "../utils/useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import AppUrls from "@/utils/urls"
import { ActivityType } from "@/types/customFieldsTypes"
import { NewsKeys } from "@/types/customFieldsKeysTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchNews, isLoading } = useAsyncData<WpResponseData>(
  apiRoutes.News
)

export default function useNews() {
  const news = computed<NewsPost[]>(() => {
    return helpers.mapNewsToView(data.value)
  })

  const homeNews = computed<NewsPost[]>(() => {
    return news.value.filter((p) => p.is_highlighted).slice(0, 2)
  })

  const newsToGrid = computed(() => {
    return news.value.filter((p) => !homeNews.value.find((n) => n.id === p.id))
  })

  function getNewsPostBySlug(slug: string) {
    return news.value.find((post) => post.slug === slug)
  }

  function getNewsPostUrl(postSlug: string): string {
    return `${AppUrls.NewsPost}${postSlug}`
  }

  function getLatestNews(
    mainPost: Readonly<Ref<Readonly<NewsPost | undefined>>>
  ): NewsPost[] {
    return (
      news.value
        // Filter the main post id to not repeat it on latest news
        .filter((lastesNewsPost) =>
          mainPost && mainPost.value
            ? lastesNewsPost.id !== mainPost.value.id
            : true
        )
        .slice(0, 5)
    )
  }

  // Maps news with NewsKeys.is_activity
  const activityNews = computed<Activity[]>(() => {
    const newsAsActivities = news.value.filter(
      (n: NewsPost) => n[NewsKeys.is_activity] !== ActivityType.None
    )

    return newsAsActivities.map(
      (n: NewsPost): Activity => ({
        id: n.id,
        name: n.title,
        slug: n.slug,
        type: n.is_activity,
        abstract: n.abstract,
        gallery: n.gallery,
        text: n.text,
        video_url: n.video_url,
      })
    )
  })

  return {
    news: newsToGrid,
    homeNews,
    getLatestNews,
    activityNews,
    isLoading: computed(() => isLoading.value),
    getNewsPostUrl,
    getNewsPostBySlug,
    fetchNews,
  }
}
