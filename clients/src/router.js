import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: e => import('./views/Home.vue'),
      redirect: '/index',
      children: [
        {
          path: '/about',
          name: 'about',
          component: e => import('./views/About.vue')
        },
        {
          path: '/index',
          name: 'index',
          component: e => import('./views/Index.vue')
        },
        {
          path: '/account',
          name: 'account',
          component: e => import('./views/Account.vue')
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: e => import('./views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: e => import('./views/Login.vue')
    },
    {
      path: '*',
      name: 'is404',
      component: e => import('./views/404.vue')
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.token ? true : false;
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    isLogin ? next() : router.push('/login');
  }
})

export default router;