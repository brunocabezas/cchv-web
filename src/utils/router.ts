import VueRouter, { Route } from "vue-router"
import Home from "@/components/Home/Home.vue"
import NewsPage from "@/components/News/NewsPage.vue"
import NewsPostPage from "@/components/News/NewsPostPage/NewsPostPage.vue"
import TeamPage from "@/components/About/TeamPage.vue"
import AboutPage from "@/components/About/AboutPage.vue"
import HistoryPage from "@/components/About/HistoryPage.vue"
import TransparencyPage from "@/components/About/TransparencyPage.vue"
import ProgramPage from "@/components/Programs/ProgramPage.vue"
import FullWidthSliderPage, {
  FullWidthPageDataType,
} from "@/components/FullWidthSliderPage.vue"
import AppUrls from "./urls"

const routes = [
  { path: AppUrls.Home, component: Home },
  { path: AppUrls.News, component: NewsPage },
  {
    path: `${AppUrls.NewsPost}:postSlug`,
    component: NewsPostPage,
    props: (route: Route) => ({
      postSlug: route.params.postSlug,
    }),
  },
  // About
  { path: AppUrls.About, component: AboutPage },
  { path: AppUrls.AboutHistory, component: HistoryPage },
  { path: AppUrls.AboutTeam, component: TeamPage },
  { path: AppUrls.AboutTransparency, component: TransparencyPage },
  // Programs
  {
    path: `${AppUrls.Programs}:slug`,
    component: ProgramPage,
    props: (route: Route) => ({
      slug: route.params.slug,
    }),
  },
  // Activities
  {
    path: `${AppUrls.Activities}:slug`,
    component: FullWidthSliderPage,
    props: (route: Route) => ({
      slug: route.params.slug,
      pageType: FullWidthPageDataType.Activity,
    }),
  },
  // School Program Single Page
  {
    path: `${AppUrls.SchoolProgram}:slug`,
    component: FullWidthSliderPage,
    props: (route: Route) => ({
      slug: route.params.slug,
      pageType: FullWidthPageDataType.SchoolProgram,
    }),
  },
]

const router = new VueRouter({
  mode: "history",
  routes,
  // Always set page to top when changing route
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})

export default router
