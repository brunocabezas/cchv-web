import VueRouter, { Route } from "vue-router"
import Vue from "vue"
import { DEFAULT_TITLE } from "@/utils/constants"
import Urls from "./urls"
import Home from "@/components/Home/Home.vue"
import NewsPage from "@/components/News/NewsPage/NewsPage.vue"
import NewsPostPage from "@/components/News/NewsPostPage/NewsPostPage.vue"
import TeamPage from "@/components/About/TeamPage.vue"
import HistoryPage from "@/components/About/HistoryPage.vue"
import TransparencyPage from "@/components/About/TransparencyPage.vue"
import ResidencyPage from "@/components/Programs/Residencies/Residency.vue"
import ProgramPage from "@/components/Programs/ProgramPage/ProgramPage.vue"
import ActivitiesPage from "@/components/Activities/ActivitiesPage.vue"
import SinglePostPage, {
  SinglePostDataType,
} from "@/components/common/SinglePostPage/SinglePostPage.vue"
import useActivities from "@/models/useActivities"

const { getTypeBySlug } = useActivities()

const aboutRoutes = [
  {
    path: Urls.AboutHistory,
    component: HistoryPage,
    name: "Historia",
  },
  {
    path: Urls.AboutTeam,
    component: TeamPage,
    name: "Equipo",
  },
  {
    path: Urls.AboutTransparency,
    component: TransparencyPage,
    name: "Transparencia",
  },
]

const programRoutes = [
  // Programs
  {
    path: `${Urls.Programs}:slug`,
    component: ProgramPage,
    props: (route: Route) => ({
      slug: route.params.slug,
    }),
    name: "Programas",
  },
  // Program Activities
  {
    path: `${Urls.Programs}campos-magneticos/:activityType`,
    component: ActivitiesPage,
    props: (route: Route) => ({
      // Prop of ActivitiesPage
      activityType: getTypeBySlug(route.params.activityType),
    }),
    name: "Actividades",
  },
  // School Program Single Page
  {
    path: `${Urls.SchoolProgram}:slug`,
    component: SinglePostPage,
    props: (route: Route) => ({
      slug: route.params.slug,
      pageType: SinglePostDataType.SchoolProgram,
    }),
    name: "Escuelas",
  },
]

const newsRoutes = [
  {
    path: Urls.News,
    component: NewsPage,
    name: "Noticias",
  },
  {
    path: `${Urls.NewsPost}:postSlug`,
    component: NewsPostPage,
    props: (route: Route) => ({
      postSlug: route.params.postSlug,
    }),
    name: "Noticias",
  },
]
// Workshops Single Page

const singleWorkshopPage = {
  path: `${Urls.Workshop}:slug`,
  component: SinglePostPage,
  props: (route: Route) => ({
    slug: route.params.slug,
    pageType: SinglePostDataType.Workshop,
  }),
  name: "Mandragoras",
}

const singleResidencyPage =
  // Residency Single Page
  {
    path: `${Urls.Residencies}/:slug`,
    component: ResidencyPage,
    props: (route: Route) => ({
      slug: route.params.slug,
    }),
    name: "Residencias",
  }

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: Urls.Home, component: Home, name: "Inicio" },
    ...newsRoutes,
    ...aboutRoutes,
    ...programRoutes,
    singleWorkshopPage,
    singleResidencyPage,
  ],
  // Always set page to top when changing route
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})

router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    // Use route name for the title
    document.title = `${DEFAULT_TITLE}${to.name ? ` | ${to.name}` : ""}`
  })
})

export default router
