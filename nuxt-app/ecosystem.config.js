module.exports = {
  apps: [
    {
      name: 'NuxtAppName',
      exec_mode: 'cluster',
      port: 3000,
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      cwd: '/home/bienal2019/cchv-web-add-nuxtjs/nuxt-app',
      args: 'start',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}