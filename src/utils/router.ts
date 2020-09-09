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
    meta: {
      title: "Historia",
    },
  },
  {
    path: Urls.AboutTeam,
    component: TeamPage,
    meta: {
      title: "Equipo",
    },
  },
  {
    path: Urls.AboutTransparency,
    component: TransparencyPage,
    meta: {
      title: "Transparencia",
    },
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
    meta: {
      title: "Programas",
    },
  },
  // Program Activities
  {
    path: `${Urls.Programs}campos-magneticos/:activityType`,
    component: ActivitiesPage,
    props: (route: Route) => ({
      // Prop of ActivitiesPage
      activityType: getTypeBySlug(route.params.activityType),
    }),
    meta: {
      title: "Actividades",
    },
  },
  // School Program Single Page
  {
    path: `${Urls.SchoolProgram}:slug`,
    component: SinglePostPage,
    props: (route: Route) => ({
      slug: route.params.slug,
      pageType: SinglePostDataType.SchoolProgram,
    }),
    meta: {
      title: "Escuelas",
    },
  },
]

const newsRoutes = [
  {
    path: Urls.News,
    component: NewsPage,
    meta: {
      title: "Noticias",
    },
  },
  {
    path: `${Urls.NewsPost}:postSlug`,
    component: NewsPostPage,
    props: (route: Route) => ({
      postSlug: route.params.postSlug,
    }),
    meta: {
      title: "Noticias",
    },
  },
]

const router = new VueRouter({
  mode: "history",
  routes:  [
    { path: Urls.Home, component: Home },
    ...newsRoutes,
    ...aboutRoutes,
    ...programRoutes,
    // Workshops Single Page
    {
      path: `${Urls.Workshop}:slug`,
      component: SinglePostPage,
      props: (route: Route) => ({
        slug: route.params.slug,
        pageType: SinglePostDataType.Workshop,
      }),
      meta: {
        title: "Mandragoras",
      },
    },
    // Residency Single Page
    {
      path: `${Urls.Residencies}/:slug`,
      component: ResidencyPage,
      props: (route: Route) => ({
        slug: route.params.slug,
      }),
      meta: {
        title: "Residencias",
      },
    },
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
    // Display title depending on each route meta information meta.title
    const metaTitle = to.meta.title ? ` | ${to.meta.title}` : ""
    document.title = `${DEFAULT_TITLE}${metaTitle}`
  })
})

export default router
