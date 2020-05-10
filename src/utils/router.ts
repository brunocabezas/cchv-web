import Home from '@/components/Home/Home.vue';
import NewsGrid from '@/components/News/NewsGrid/NewsGrid.vue';
import SingleNewsPost from '@/components/News/SingleNewsPost.vue';
import AppUrls from './urls';
import VueRouter from 'vue-router';

const routes = [
  { path: AppUrls.Home, component: Home },
  { path: AppUrls.News, component: NewsGrid },
  { path: `${AppUrls.NewsPost}:newsId`, component: SingleNewsPost }
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

export default router