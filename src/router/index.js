import Vue from 'vue'
import VueRouter from 'vue-router'
import pcRoute from './pcRoute'
import mbRoute from './mbRoute'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: '',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    ...pcRoute,
    ...mbRoute,
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/404',
      component: resolve => require(['@v/404'], resolve)
    },
    {
      path: '/403',
      component: resolve => require(['@v/403'], resolve)
    }
  ]
})

// 路由守卫

// router.beforeEach((to, from, next) => {})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

export default router
