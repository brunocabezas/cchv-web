import { computed, reqSsrRef, ssrRef, useAsync } from "@nuxtjs/composition-api";
import apiRoutes from "~/api/apiRoutes";
import { NewsPost } from "@/types";
import { WpResponseData, WPResponseItem } from "@/types/wordpressTypes";
import Urls from "@/utils/urls";
import { DATE_FORMAT } from "@/utils/constants";
import dayjs from "dayjs";
import newsHelpers from "@/utils/news";
import client from "~/api/client";
import { AxiosResponse } from "axios";
import useMediaQueries from "~/hooks/useMediaQueries";
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
const newsData = ssrRef<WpResponseData>([]);
const isLoadingSinglePostData = ssrRef(false);
const isLoading = ssrRef(false);

export default function useNews(slug?: string) {
  const options = { per_page: INITIAL_NEWS, page: 1 };
  const { onBigScreen } = useMediaQueries();
  const singleNewsPostData = reqSsrRef<WpResponseData<WPResponseItem>>([]);

  // Fetch initial news batch, they're displayed on home and news pages
  useAsync<WpResponseData>(() => {
    isLoading.value = true;
    return client
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
      .finally(() => {
        isLoading.value = false;
      });
  });

  if (slug) {
    // If slug is present, load the single post data
    useAsync<WpResponseData>(() => {
      isLoadingSinglePostData.value = true;
      return client
        .get(apiRoutes.News, { params: { per_page: 1, slug } })
        .then((res: AxiosResponse<WpResponseData>) => {
          singleNewsPostData.value = res.data;
          return res.data;
        })
        .catch(() => [])
        .finally(() => {
          isLoadingSinglePostData.value = false;
        });
    }, slug);
  }

  const setNewsData = (data: WpResponseData) => {
    newsData.value = [...newsData.value, ...data];
  };

  const news = computed<NewsPost[]>(() =>
    newsData.value ? mapNewsFromWpPosts(newsData.value) : []
  );

  const singleNewsPost = computed<NewsPost>(() => {
    return newsHelpers.mapNewsCustomFieldsToNews(singleNewsPostData.value[0]);
  });

  // Highlighted news are displayed on:
  // - homepage on regular viewports
  // - news page
  const highlightedNews = computed<NewsPost[]>(() => {
    const numberOfPosts = onBigScreen.value ? 2 : 5;
    return news.value.filter(p => p.is_highlighted).slice(0, numberOfPosts);
  });

  // All news that are not highlighted
  const newsToGrid = computed(() =>
    news.value.filter(p => !highlightedNews.value.find(n => n.id === p.id))
  );

  function getNewsPostUrlBySlug(postSlug: string): string {
    return `${Urls.NewsPost}${postSlug}`;
  }

  // Top five latest news
  function getLatestNews(singlePostActiveId: Number): NewsPost[] {
    return (
      news.value
        // Filter the main post id to not repeat it on latest news
        .filter(lastesNewsPost =>
          singlePostActiveId ? lastesNewsPost.id !== singlePostActiveId : true
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
    isLoading,
    isLoadingSingleNewsPost: isLoadingSinglePostData,
    getNewsPostUrlBySlug,
    // Pagination
    setCurrentPage,
    totalPages,
    setNewsData,
    currentPage
  };
}
