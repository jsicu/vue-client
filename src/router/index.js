import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@pages/login/main'),
    },
    {
      path: '/main',
      name: 'mian',
      component: () => import('@pages/main/main'),
    }
  ]
})
