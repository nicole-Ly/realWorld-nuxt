export default {
  //自定义路由
  router: {
    extendRoutes(routes, resolve) {
      routes.splice(0)
      routes.push(...[{
        linkActiveClass:'active',
        name: 'home',
        path: '/',
        component: resolve(__dirname, 'pages/layout/index.vue'),
        children: [
          {
            path: '/',
            component: resolve(__dirname, 'pages/home/index.vue'),
            name: 'home'
          },
          {
            path: 'login',
            component: resolve(__dirname, 'pages/login/index.vue'),
            name: 'login'
          },
          {
            path: 'register',
            component: resolve(__dirname, 'pages/login/index.vue'),
            name: 'register'
          },
          {
            path: 'profile/:username',
            component: resolve(__dirname, 'pages/profile/index.vue'),
            name: 'profile'
          },
          {
            path: 'setting',
            component: resolve(__dirname, 'pages/setting/index.vue'),
            name: 'setting'
          },
          {
            path: 'article/:slug',
            component: resolve(__dirname, 'pages/article/index.vue'),
            name: 'article'
          },
          {
            path: 'editor/:slug?',
            component: resolve(__dirname, 'pages/article/edit.vue'),
            name: 'editor'
          },
        ]
      }])
    }
  },
  //注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}