import { computed, Ref, ssrRef, useAsync } from "@nuxtjs/composition-api";
import apiRoutes from "../../api/apiRoutes";
import { NewsPost } from "@/types";
import { WpResponseData, WPResponseItem } from "@/types/wordpressTypes";
import Urls from "@/utils/urls";
import { DATE_FORMAT } from "@/utils/constants";
import dayjs from "dayjs";
import newsHelpers from "@/utils/news";
import client from "~/api/client";
import { AxiosOptions } from "@nuxtjs/axios";
import { AxiosRequestConfig } from "axios";

// Used on the first network request, to initialize state with N news
export const INITIAL_NEWS = 6;

// Wordpress header containing the total amount of items to be fetched
// https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/
const TOTAL_PAGES_HEADER = "x-wp-totalpages";

const NO_PAGES_INDICATOR = -9999;

const mapNewsFromWpPosts = (array: WPResponseItem[]) =>
  array
    .map(newsPost => newsHelpers.mapNewsCustomFieldsToNews(newsPost))
    .sort((a: NewsPost, b: NewsPost): number => {
      return dayjs(b.date, DATE_FORMAT).diff(dayjs(a.date, DATE_FORMAT));
    })
    // Filter duplicated ids
    .filter(
      (thing, index, self) => index === self.findIndex(t => t.id === thing.id)
    );

// Page number used to fetch data using vue-infinite-loading
const currentPage = ssrRef<number>(1);
const totalPages = ssrRef(-1);

export default function useNews() {
  // const singeNewsPostData = useAsync<WpResponseData>(() =>
  //   client
  //     .get(apiRoutes.News)
  //     .then(res => res.data)
  //     .catch(() => [])
  // );
  const newsData = ssrRef<WpResponseData<WPResponseItem>>([]);
  const singleNewsPostData = ssrRef<WpResponseData<WPResponseItem>>([]);

  const options = { per_page: INITIAL_NEWS, page: 1 };

  // Fetch first batch of news, to display on homepage and news page
  useAsync<WpResponseData>(() =>
    client
      .get(apiRoutes.News, { params: options })
      .then(res => {
        newsData.value = res.data;
        currentPage.value = 2;
        const totalPagesFromHeader =
          (res && res.headers && res.headers[TOTAL_PAGES_HEADER]) ||
          NO_PAGES_INDICATOR;
        // Set total pages from response header
        totalPages.value = parseInt(totalPagesFromHeader, 10);
        return res.data;
      })
      .catch(() => [])
  );

  const setNewsData = (data: WpResponseData) => {
    newsData.value = [...newsData.value, ...data];
  };

  console.log(newsData.value);
  // const { fetchCategories } = useWpCategories();

  // fetchCategories();

  const news = computed<NewsPost[]>(() =>
    newsData.value ? mapNewsFromWpPosts(newsData.value) : []
  );

  const singleNewsPost = computed<NewsPost>(() =>
    newsHelpers.mapNewsCustomFieldsToNews(singleNewsPostData.value[0] || [])
  );

  // Highlighted news are displayed on:
  // - homepage on regular viewports
  // - news page
  const highlightedNews = computed<NewsPost[]>(() =>
    news.value.filter(p => p.is_highlighted).slice(0, 2)
  );

  // All news that are not highlighted
  const newsToGrid = computed(() =>
    news.value.filter(p => !highlightedNews.value.find(n => n.id === p.id))
  );

  function getNewsPostUrlBySlug(postSlug: string): string {
    return `${Urls.NewsPost}${postSlug}`;
  }

  // Top five latest news
  function getLatestNews(
    mainPost: Readonly<Ref<Readonly<NewsPost | undefined>>>
  ): NewsPost[] {
    return (
      news.value
        // Filter the main post id to not repeat it on latest news
        .filter(lastesNewsPost =>
          mainPost && mainPost.value
            ? lastesNewsPost.id !== mainPost.value.id
            : true
        )
        .slice(0, 5)
    );
  }

  function setCurrentPage(pageNumber: number) {
    currentPage.value = pageNumber;
  }

  return {
    news: newsToGrid,
    highlightedNews,
    singleNewsPost,
    getLatestNews,
    isLoading: false,
    isLoadingSingleNewsPost: false,
    getNewsPostUrlBySlug,
    // Fetch methods
    fetchNews: () => ({}),
    fetchSingleNewsPost: () => ({}),
    // Pagination
    setCurrentPage,
    totalPages,
    setNewsData,
    currentPage
  };
}
