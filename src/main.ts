import Vue from 'vue'
import VueRouter from 'vue-router';
import VueCompositionApi from '@vue/composition-api';
import App from "./App.vue";
import router from '@/utils/router'
import './styles/main.styl';
import './types/index';

Vue.use(VueRouter);

Vue.use(VueCompositionApi);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
