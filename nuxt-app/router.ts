import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/pages/index.vue";
import HistoryPage from "@/pages/history.vue";
import TransparencyPage from "@/pages/transparency/index.vue";
import TeamPage from "@/pages/team.vue";
import NewsPage from "@/pages/news/index.vue";
import NewsPostPage from "@/pages/news/_slug/index.vue";
import ProgramPage from "@/pages/programs/_slug/index.vue";
import Urls from "./utils/urls";

Vue.use(Router);

const aboutRoutes = [
  {
    path: Urls.AboutHistory,
    component: HistoryPage,
    name: "history"
  },
  {
    path: Urls.AboutTeam,
    component: TeamPage,
    name: "team"
  },
  {
    path: Urls.AboutTransparency,
    component: TransparencyPage,
    name: "transparency"
  }
];

const programRoutes = [
  // Programs
  {
    path: `${Urls.Programs}:slug`,
    component: ProgramPage,
    // props: (route: Route) => ({
    //   slug: route.params.slug,
    // }),
    name: "Programas"
  }
  // // Program Activities
  // {
  //   path: `${Urls.Programs}campos-magneticos/:activityType`,
  //   component: ActivitiesPage,
  //   props: (route: Route) => ({
  //     // Prop of ActivitiesPage
  //     activityType: getTypeBySlug(route.params.activityType),
  //   }),
  //   name: "Actividades",
  // },
  // // School Program Single Page
  // {
  //   path: `${Urls.SchoolProgram}:slug`,
  //   component: SinglePostPage,
  //   props: (route: Route) => ({
  //     slug: route.params.slug,
  //     pageType: SinglePostDataType.SchoolProgram,
  //   }),
  //   name: "Escuelas",
  // },
];

const newsRoutes = [
  {
    path: Urls.News,
    component: NewsPage,
    name: "Noticias"
  },
  {
    path: `${Urls.NewsPost}:slug`,
    component: NewsPostPage,
    name: "Noticia"
  }
];

export function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        component: HomePage
      },
      ...aboutRoutes,
      ...newsRoutes,
      ...programRoutes
    ]
  });
}
