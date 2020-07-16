// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import './permission' // permission control
import api from '@/api' // 引入api
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import wsCache from '@/cache' // 本地存储

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$api = api
Vue.prototype.$wsCache = wsCache

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
