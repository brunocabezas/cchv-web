import Home from '@/components/Home/Home.vue';
import NewsGrid from '@/components/News/NewsGrid/NewsGrid.vue';
import AppUrls from './urls';
import VueRouter from 'vue-router';

const routes = [
  { path: AppUrls.Home, component: Home },
  { path: AppUrls.News, component: NewsGrid }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router