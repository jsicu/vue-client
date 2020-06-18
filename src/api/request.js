import axios from 'axios'
import qs from 'qs'
import config from '@/config'

export const PATH_URL = process.env.NODE_ENV === 'development'
  ? config.base_url.dev
  : config.base_url.pro
// const PATH_URL = '/api'

// let host = location.host
// let hostAddress = host.substr(0, host.length - 4)

// 创建axios实例
// const service = axios.create({
//   baseURL: 'http://' + hostAddress + '8088/', // api 的 base_url
//   timeout: 60000 // 请求超时时间
// })

// 创建axios实例
const service = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: 60000 // 请求超时时间
})

// // request拦截器
service.interceptors.request.use(
  config => {
    // if (config.params && config.params.deviceId) {
    //   config.headers['deviceId'] = config.params.deviceId
    // }
    // if (config.method === 'post') {
    //   if (config.data && config.data.Authorization) {
    //     config.headers['Authorization'] = config.data.Authorization
    //   }
    //   if (config.data && config.data.deviceId) {
    //     config.headers['deviceId'] = config.data.deviceId
    //   }
    // }
    if (config.method === 'post' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data)
    }
    if (config.method === 'put' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// // response 拦截器
// service.interceptors.response.use(
//   response => {

//     if (response.data.code === 1 || (!response.data.code && response.data.code !== 0)) {
//       return response.data.data || response.data
//     } else if (response.data.code === 3001 || response.data.code === 3002) {
//       config.one_message ? ResetMessage.error(response.data.message) : Message.error(response.data.message)
//       wsCache.delete('userInfo')
//       store.dispatch('delAllViews')
//       resetRouter()
//       window.location.href = 'login.html'
//     } else if (response.data.code === 4001) {
//       MessageBox({
//         title: '提示',
//         message: response.data.message,
//         confirmButtonText: '确定'
//       })
//     } else if (response.data.code === 4000) {
//       return response.data
//     } else {
//       if (response.config.url.includes('/matter/task-verify')) {
//         config.one_message ? ResetMessage({
//           showClose: true,
//           message: response.data.message,
//           type: 'error',
//           duration: 0
//         }) : Message({
//           showClose: true,
//           message: response.data.message,
//           type: 'error',
//           duration: 0
//         })
//       } else {
//         config.one_message ? ResetMessage.error(response.data.message) : Message.error(response.data.message)
//         // Message.error(response.data.message)
//       }
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     if (error.response) config.one_message ? ResetMessage.error(error.response.data.message) : Message.error(error.response.data.message)
//     return Promise.reject(error)
//   }
// )

export default service
