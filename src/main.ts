import Vue from "vue"
import VueRouter from "vue-router"
import VueYoutube from "vue-youtube"
import VueCompositionApi from "@vue/composition-api"
import App from "./App.vue"
import VueLazyLoad from "vue-lazyload"
import VueProgressiveImage from "vue-progressive-image"
import router from "@/utils/router"
import "vue-image-lightbox/dist/vue-image-lightbox.min.css"
import "./styles/main.styl"
import "./types/index"
import * as dayjs from "dayjs"
import "dayjs/locale/es" // import locale

dayjs.locale("es") // use locale

// only import the icons you use to reduce bundle size
import "vue-awesome/icons/chevron-left"
import "vue-awesome/icons/chevron-right"

Vue.use(VueRouter)
Vue.use(VueYoutube)
Vue.use(VueCompositionApi)
Vue.use(VueProgressiveImage)
// Required by vue-image-lightbox
Vue.use(VueLazyLoad)
// eslint-disable-next-line no-new
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
})
