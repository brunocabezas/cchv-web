import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home/Home.vue';
import AppUrls from './urls';

const routes = [
  { path: AppUrls.Home, component: Home },
  // { path: '/bar', component: Bar }
];

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes // short for `routes: routes`
});

export default router;