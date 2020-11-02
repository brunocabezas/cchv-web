export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: true,

  // Target (https://go.nuxtjs.dev/config-target)
  target: "server",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "CChV",
    meta: [
      { charset: "utf-8" },
      { name: "HandheldFriendly", content: "True" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        hid: "canonical",
        rel: "canonical",
        href: "https://cchv.cl"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // CSS file in the project
    "~/assets/variables.styl",
    "~/assets/main.styl"
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "@/plugins/vue-awesome",
    "@/plugins/day-js",
    { src: "@/plugins/vue-progressive-image", ssr: false },
    { src: "@/plugins/vue-image-lightbox", mode: "client" },
    { src: "@/plugins/useWindowSize", mode: "client" },
    { src: "@/plugins/vue-burger-menu", mode: "client" },
    "@/plugins/vue-ellipsis",
    "@/plugins/vue-youtube",
    { src: "@/plugins/vue-infinite-loading", ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/composition-api",
    ["@nuxtjs/router", { fileName: "router.ts" }]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv"
  ],
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^vue-awesome/],
    extend(config) {
      config.resolve.alias["vue"] = "vue/dist/vue.common";
    }
  }
};
