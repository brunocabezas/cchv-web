import VueRouter, { Route } from "vue-router"
import Vue from "vue"
import { DEFAULT_TITLE } from "@/utils/static"
import Home from "@/components/Home/Home.vue"
import NewsPage from "@/components/News/NewsPage/NewsPage.vue"
import NewsPostPage from "@/components/News/NewsPostPage/NewsPostPage.vue"
import TeamPage from "@/components/About/TeamPage.vue"
import HistoryPage from "@/components/About/HistoryPage.vue"
import TransparencyPage from "@/components/About/TransparencyPage.vue"
import ProgramPage from "@/components/Programs/ProgramPage.vue"
import ActivitiesGridPage from "@/components/Activities/ActivitiesGridPage.vue"
import SinglePostPage, {
  SinglePostDataType,
} from "@/components/common/SinglePostPage/SinglePostPage.vue"
import AppUrls from "./urls"
import useActivities from "@/factories/useActivities"

const { getTypeBySlug } = useActivities()
const routes = [
  { path: AppUrls.Home, component: Home },
  {
    path: AppUrls.News,
    component: NewsPage,
    meta: {
      title: "Noticias",
    },
  },
  {
    path: `${AppUrls.NewsPost}:postSlug`,
    component: NewsPostPage,
    props: (route: Route) => ({
      postSlug: route.params.postSlug,
    }),
    meta: {
      title: "Noticias",
    },
  },
  // About
  {
    path: AppUrls.AboutHistory,
    component: HistoryPage,
    meta: {
      title: "Historia",
    },
  },
  {
    path: AppUrls.AboutTeam,
    component: TeamPage,
    meta: {
      title: "Equipo",
    },
  },
  {
    path: AppUrls.AboutTransparency,
    component: TransparencyPage,
    meta: {
      title: "Transparencia",
    },
  },
  // Programs
  {
    path: `${AppUrls.Programs}:slug`,
    component: ProgramPage,
    props: (route: Route) => ({
      slug: route.params.slug,
    }),
    meta: {
      title: "Programas",
    },
  },
  // Programs Activities
  {
    path: `${AppUrls.Programs}campos-magneticos/:activityType`,
    component: ActivitiesGridPage,
    props: (route: Route) => ({
      // Prop of ActivitiesGridPage
      activityType: getTypeBySlug(route.params.activityType),
    }),
    meta: {
      title: "Actividades",
    },
  },
  // Activities
  {
    path: `${AppUrls.Activities}:slug`,
    component: SinglePostPage,
    props: (route: Route) => ({
      slug: route.params.slug,
      pageType: SinglePostDataType.Activity,
    }),
    meta: {
      title: "Actividades",
    },
  },
  // School Program Single Page
  {
    path: `${AppUrls.SchoolProgram}:slug`,
    component: SinglePostPage,
    props: (route: Route) => ({
      slug: route.params.slug,
      pageType: SinglePostDataType.SchoolProgram,
    }),
    meta: {
      title: "Escuelas",
    },
  },
  // Workshops Single Page
  {
    path: `${AppUrls.Workshop}:slug`,
    component: SinglePostPage,
    props: (route: Route) => ({
      slug: route.params.slug,
      pageType: SinglePostDataType.Workshop,
    }),
    meta: {
      title: "Mandragoras",
    },
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

router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = `${DEFAULT_TITLE}${
      to.meta.title ? ` | ${to.meta.title}` : ""
    }`
  })
})

export default router
