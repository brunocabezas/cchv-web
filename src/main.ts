import Vue from "vue"
import VueRouter from "vue-router"
import VueYoutube from "vue-youtube"
import { ellipsisDirective, ellipsisComponent } from "@hyjiacan/vue-ellipsis"
import VueCompositionApi from "@vue/composition-api"
import App from "./App.vue"
import VueLazyLoad from "vue-lazyload"
import VueAnalytics from "vue-ua"
import VueProgressiveImage from "vue-progressive-image"
import router from "@/utils/router"
import "vue-image-lightbox/dist/vue-image-lightbox.min.css"
import "./styles/main.styl"
import "./types/index"
import "./utils/icons"
import * as dayjs from "dayjs"
import "dayjs/locale/es" // import locale

dayjs.locale("es") // use locale
// For directive usage
Vue.directive(ellipsisDirective.name, ellipsisDirective)
Vue.use(VueRouter)
Vue.component(ellipsisComponent.name, ellipsisComponent)
Vue.use(VueYoutube)
Vue.use(VueCompositionApi)
Vue.use(VueProgressiveImage)
// Required by vue-image-lightbox
Vue.use(VueLazyLoad)

// Your Google Analytics tracking ID.
const trackingId = process.env.VUE_APP_GOOGLE_ANALYTICS || ""

if (trackingId && process.env.NODE_ENV === "production") {
  console.log("setting up Google analytics")
  Vue.use(VueAnalytics, {
    // [Required] The name of your app as specified in Google Analytics.
    appName: "CCHV",
    // [Required] The version of your app.
    appVersion: "0.9",
    trackingId,
    // If you're using vue-router, pass the router instance here.
    vueRouter: router,
  })
}

// eslint-disable-next-line no-new
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
})
