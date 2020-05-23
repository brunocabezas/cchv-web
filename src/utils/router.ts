import Home from "@/components/Home/Home.vue"
import NewsPage from "@/components/News/NewsPage.vue"
import NewsPostPage from "@/components/News/NewsPostPage/NewsPostPage.vue"
import TeamPage from "@/components/About/TeamPage.vue"
import AboutPage from "@/components/About/AboutPage.vue"
import TransparencyPage from "@/components/About/TransparencyPage.vue"
import ProgramPage from "@/components/Programs/ProgramPage.vue"
import AppUrls from "./urls"
import VueRouter, { Route } from "vue-router"

const routes = [
  { path: AppUrls.Home, component: Home },
  { path: AppUrls.News, component: NewsPage },
  {
    path: `${AppUrls.NewsPost}:postId`,
    component: NewsPostPage,
    props: (route: Route) => ({
      postId: parseInt(route.params.postId, 10),
    }),
  },
  // About
  { path: AppUrls.About, component: AboutPage },
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
