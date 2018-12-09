import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Register from '@/views/Register'
import Home from '@/views/Home'
import Document from '@/views/Document'
import Layout from '@/views/layouts/authenticated/Index'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {requiredAuth: false}
    },
    {
      path: '/registro',
      name: 'Register',
      component: Register,
      meta: {requiredAuth: false}
    },
    {
      path: '/',
      component: Layout,
      meta: {requiredAuth: true},
      children: [
        {path: '', component: Home, name: 'home'},
        {path: '/documentos', component: Document, name: 'documents'}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    if (Vue.auth.isAuthenticated()) {
      next()
    } else {
      next({path: '/login'})
    }
  } else {
    next()
  }
})

export default router
