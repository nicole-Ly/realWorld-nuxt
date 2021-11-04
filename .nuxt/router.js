import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ad31da4e = () => interopDefault(import('..\\pages\\layout\\index.vue' /* webpackChunkName: "" */))
const _2798e844 = () => interopDefault(import('..\\pages\\home\\index.vue' /* webpackChunkName: "" */))
const _89059130 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "" */))
const _b8862130 = () => interopDefault(import('..\\pages\\profile\\index.vue' /* webpackChunkName: "" */))
const _1714cc61 = () => interopDefault(import('..\\pages\\setting\\index.vue' /* webpackChunkName: "" */))
const _31cbedf1 = () => interopDefault(import('..\\pages\\article\\edit.vue' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _ad31da4e,
    name: "home",
    children: [{
      path: "/",
      component: _2798e844,
      name: "home"
    }, {
      path: "login",
      component: _89059130,
      name: "login"
    }, {
      path: "register",
      component: _89059130,
      name: "register"
    }, {
      path: "profile",
      component: _b8862130,
      name: "profile"
    }, {
      path: "setting",
      component: _1714cc61,
      name: "setting"
    }, {
      path: "article",
      component: _2798e844,
      name: "article"
    }, {
      path: "editor/:id?",
      component: _31cbedf1,
      name: "editor"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
