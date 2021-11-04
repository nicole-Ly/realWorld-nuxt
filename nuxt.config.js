export default {
  //自定义路由
  router: {
    extendRoutes(routes, resolve) {
      routes.splice(0)
      routes.push(...[{
        linkActiveClass:'active',
        name: 'layout',
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
            path: 'profile',
            component: resolve(__dirname, 'pages/profile/index.vue'),
            name: 'profile'
          },
          {
            path: 'setting',
            component: resolve(__dirname, 'pages/setting/index.vue'),
            name: 'setting'
          },
          {
            path: 'article',
            component: resolve(__dirname, 'pages/home/index.vue'),
            name: 'article'
          },
        ]
      }])
    }
  },
  //注册插件
  plugins: [
    '~/plugins/request.js',
  ]
}