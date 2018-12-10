import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Professor from "@/components/Professor";
import Login from "@/components/Login";
import Orientacao from "@/components/Orientacao";
import Logout from "@/components/Logout";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      meta: { requiresAuth: false },
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      meta: { requiresAuth: false },
      name: 'logout',
      component: Logout
    },
    {
      path: '/professor',
      name: 'professor',
      meta: { requiresAuth: true },
      component: Professor,
    },
    {
      path: '/orientacao',
      meta: { requiresAuth: true },
      name: 'orientacao',
      component: Orientacao
    },
    {
      path: '/login',
      meta: { requiresAuth: false },
      name: 'login2',
      component: Login
    },
  ]
})
router.beforeEach((to, from, next) => {
  console.log('router.beforeEach')
  console.log(to)
  if (to.meta.requiresAuth) {
    console.log(to.meta.requiresAuth)
    const authUser = localStorage.getItem('logado')
    console.log(authUser)
    if (authUser && authUser == 'sucesso') {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else next()
})
export default router
