const CompressionWebpackPlugin = require("compression-webpack-plugin")
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV)
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg|ttf|otf)(\?.*)?$/i

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  transpileDependencies: [/\bvue-awesome\b/],
  publicPath:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_ASSETS_URL
      : "/",
  configureWebpack: (config) => {
    const plugins = []
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins]
  },
}
