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
      path: '/demo',
      component: resolve => require(['../views/Demo'], resolve)
    },
    {
      path: '/date',
      component: resolve => require(['../views/Date'], resolve)
    },
    {
      path: '*',
      component: resolve => require(['../views/404'], resolve)
    }
  ]
})

// 路由守卫

// router.beforeEach((to, from, next) => {})

// router.afterEach((to, from, next) => {
//   window.scrollTo(0, 0)
// })

export default router
