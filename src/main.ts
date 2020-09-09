import Vue from "vue"
import VueRouter from "vue-router"
import VueYoutube from "vue-youtube"
import VueEllipsis from "vue-ellipsis"
import VueCompositionApi from "@vue/composition-api"
import VueLazyLoad from "vue-lazyload"
import VueAnalytics from "vue-ua"
import InfiniteLoading from "vue-infinite-loading"
import VueProgressiveImage from "vue-progressive-image"
import router from "@/utils/router"
import App from "./App.vue"
import "vue-image-lightbox/dist/vue-image-lightbox.min.css"
import "./styles/main.styl"
import "./types"
import "./utils/icons"
// dayjs
import * as dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import updateLocale from "dayjs/plugin/updateLocale"
import "dayjs/locale/es" // import locale
import { DATE_LOCALE } from './utils/constants'

dayjs.locale(DATE_LOCALE)
dayjs.extend(customParseFormat)
dayjs.extend(updateLocale)
// Uppercase short spanish month names
dayjs.updateLocale(DATE_LOCALE, {
  monthsShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ],
})

Vue.use(VueEllipsis)
Vue.use(VueRouter)
Vue.use(VueYoutube)
Vue.use(VueCompositionApi)
Vue.use(VueProgressiveImage)
Vue.use(InfiniteLoading)
// Required by vue-image-lightbox
Vue.use(VueLazyLoad)

// Your Google Analytics tracking ID.
const trackingId = process.env.VUE_APP_GOOGLE_ANALYTICS || ""
const setupAnaylitics = trackingId && process.env.NODE_ENV === "production"

if (setupAnaylitics) {
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

new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
})
