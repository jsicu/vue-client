/**
 * @Author: linzq
 * @Date: 2021-04-21 14:51:38
 * @LastEditors: linzq
 * @LastEditTime: 2021-05-29 21:54:24
 * @Description: 主页入口
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from '@/router'
import api from '@/api' // 引入api
import store from '@/store' // 状态管理
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less' // global css
import wsCache from '@/cache' // 本地存储
import config from '@/config' // 引入全局配置
import '@/assets/icons' // 引入svg图片
import './permission' // permission control
import dataV from '@jiaminghi/data-view'
// import * as echarts from 'echarts'

// import importDirective from '@/directive' // 自定义指令
// importDirective(Vue)

Vue.config.productionTip = false

import { ResetMessage } from '@components/ResetMessage' // 引入自定义message配置
if (config.one_message) {
  Vue.prototype.$message = ResetMessage
}
Vue.prototype.$api = api
Vue.prototype.$wsCache = wsCache
Vue.prototype.$config = config
Vue.prototype.$echarts = echarts

Vue.use(ELEMENT, {
  size: config.size || 'medium' // set element-ui default size
})
Vue.use(dataV)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
