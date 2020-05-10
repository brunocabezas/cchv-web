import Home from "@/components/Home/Home.vue"
import NewsGrid from "@/components/News/NewsGrid/NewsGrid.vue"
import NewsPost from "@/components/News/NewsPost/NewsPost.vue"
import AppUrls from "./urls"
import VueRouter, { Route } from "vue-router"

const routes = [
  { path: AppUrls.Home, component: Home },
  { path: AppUrls.News, component: NewsGrid },
  {
    path: `${AppUrls.NewsPost}:postId`,
    component: NewsPost,
    props: (route: Route) => ({
      postId: parseInt(route.params.postId, 10)
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
