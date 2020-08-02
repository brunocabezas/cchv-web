import Vue from "vue"
import VueCompositionApi, { computed, Ref, ref } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { NewsPost, Activity } from "@/types"
import helpers from "@/utils/customFields"
import useAsyncData from "../utils/useAsyncData"
import { WPResponseItem } from "@/types/wordpressTypes"
import Urls from "@/utils/urls"
import { ActivityType } from "@/types/customFieldsTypes"
import { NewsKeys } from "@/types/customFieldsKeysTypes"
import { dateIsPast } from "@/utils/date"

Vue.use(VueCompositionApi)

const { data, fetch: fetchNews, isLoading } = useAsyncData<WPResponseItem>(
  apiRoutes.News
)
// Page number used to fetch data using vue-infinite-loading
const newsPage = ref(1)

export default function useNews() {
  const news = computed<NewsPost[]>(() => helpers.mapNewsToView(data.value))

  // Home news are highlighted with is_highlighted set to true. Limit to two
  const homeNews = computed<NewsPost[]>(() =>
    news.value.filter((p) => p.is_highlighted).slice(0, 2)
  )

  const newsToGrid = computed(() =>
    news.value.filter((p) => !homeNews.value.find((n) => n.id === p.id))
  )

  // Some news can be defined as also activities
  // Map news with NewsKeys.is_activity field set !act.activity_calendar_url || dateInPast(activity_date)to true
  const activityNews = computed<Activity[]>(() => {
    const newsAsActivities = news.value.filter(
      (post: NewsPost) => post[NewsKeys.is_activity] !== ActivityType.None
    )

    return newsAsActivities.map(
      (newsPost: NewsPost): Activity => ({
        id: newsPost.id,
        name: newsPost.title,
        slug: newsPost.slug,
        type: newsPost.is_activity,
        isNewsPost: true,
        abstract: newsPost.abstract,
        gallery: newsPost.gallery,
        text: newsPost.text,
        video_url: newsPost.video_url,
        activity_date: newsPost.activity_date,
        activity_date_has_passed: newsPost.activity_date_has_passed,
        activity_calendar_url: newsPost.activity_calendar_url,
      })
    )
  })

  function getNewsPostBySlug(slug: string) {
    return news.value.find((post) => post.slug === slug)
  }

  function getNewsPostUrlBySlug(postSlug: string): string {
    return `${Urls.NewsPost}${postSlug}`
  }

  // Top five latest news
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

  function setNewsPage(pageNumber: number) {
    newsPage.value = pageNumber
  }

  return {
    news: newsToGrid,
    homeNews,
    getLatestNews,
    activityNews,
    isLoading,
    getNewsPostUrlBySlug,
    getNewsPostBySlug,
    fetchNews,
    // Pagination
    setNewsPage,
    currentPage: newsPage,
  }
}
