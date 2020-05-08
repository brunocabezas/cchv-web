import Home from '../components/Home/Home.vue';
import AppUrls from './urls';
import VueRouter from 'vue-router';

const routes = [
  { path: AppUrls.Home, component: Home },
  // { path: '/bar', component: Bar }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router