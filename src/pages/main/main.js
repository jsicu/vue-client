// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import api from '@/api' // 引入api
import store from '@/store' // 状态管理
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less' // global css
import wsCache from '@/cache' // 本地存储
import config from '@/config' // 引入全局配置
import '@/icons' // 引入svg图片
import './permission' // permission control

Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.$wsCache = wsCache
Vue.prototype.$config = config
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
