import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/pages/index.vue";
import HistoryPage from "@/pages/history.vue";
import TransparencyPage from "@/pages/transparency/index.vue";
import TeamPage from "@/pages/team.vue";
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

export function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        component: HomePage
      },
      ...aboutRoutes
    ]
  });
}
