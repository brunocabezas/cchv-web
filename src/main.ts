import Vue from 'vue'
import VueRouter from 'vue-router';
import VueYoutube from 'vue-youtube';
import VueCompositionApi from '@vue/composition-api';
import App from "./App.vue";
import router from '@/utils/router'
import './styles/main.styl';
import './types/index';

// only import the icons you use to reduce bundle size
import 'vue-awesome/icons/chevron-left'
import 'vue-awesome/icons/chevron-right'

Vue.use(VueRouter);
Vue.use(VueYoutube)
Vue.use(VueCompositionApi);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
