import Vue from "vue"
import VueCompositionApi, { computed, Ref, ref } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import { NewsPost } from "@/types"
import useAsyncData from "@/hooks/useAsyncData"
import { WPResponseItem } from "@/types/wordpressTypes"
import Urls from "@/utils/urls"
import { DATE_FORMAT } from "@/utils/static"
import dayjs from "dayjs"
import useWpCategories from "@/models/useWpCategories"
import newsHelpers from "@/utils/news"

Vue.use(VueCompositionApi)

// state to manage news posts
const { data, fetch: fetchNews, isLoading } = useAsyncData<WPResponseItem>(
  apiRoutes.News
)
// state to a single news post
const {
  data: singleNewsPostData,
  fetch: fetchSingleNewsPost,
  isLoading: isLoadingSingleNewsPost,
} = useAsyncData<WPResponseItem>(apiRoutes.News)

// Page number used to fetch data using vue-infinite-loading
const newsPage = ref<number>(1)

export default function useNews() {
  const { fetchCategories } = useWpCategories()

  fetchCategories()

  const news = computed<NewsPost[]>(() =>
    data.value
      .map((newsPost) => newsHelpers.mapNewsCustomFieldsToNews(newsPost))
      .sort((a: NewsPost, b: NewsPost): number => {
        return dayjs(b.date, DATE_FORMAT).diff(dayjs(a.date, DATE_FORMAT))
      })
  )

  const singleNewsPost = computed(() =>
    newsHelpers.mapNewsCustomFieldsToNews(singleNewsPostData.value[0] || [])
  )

  // Highlighted news are displayed on:
  // - homepage on regular viewports
  // - news page
  const highlightedNews = computed<NewsPost[]>(() =>
    news.value.filter((p) => p.is_highlighted).slice(0, 2)
  )

  // All news that are not highlighted
  const newsToGrid = computed(() =>
    news.value.filter((p) => !highlightedNews.value.find((n) => n.id === p.id))
  )

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
    highlightedNews,
    singleNewsPost,
    getLatestNews,
    isLoading,
    isLoadingSingleNewsPost,
    getNewsPostUrlBySlug,
    // Fetch methods
    fetchNews,
    fetchSingleNewsPost,
    // Pagination
    setNewsPage,
    currentPage: newsPage,
  }
}
