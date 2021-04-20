/*
 * @Author: linzq
 * @Date: 2020-11-25 14:32:29
 * @LastEditors: linzq
 * @LastEditTime: 2021-04-20 17:52:12
 * @Description:
 */
import axios from 'axios'
import qs from 'qs'
import config from '@/config'
import wsCache from '@/cache'

import { Message } from 'element-ui'

export const PATH_URL = config.base_url
// const PATH_URL = '/api'

let newToken = false // 是否需要刷新token

// 创建axios实例
const service = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    //  刷新token
    if (newToken && wsCache.get('userInfo')) {
      config.headers['refresh_token'] = wsCache.get('userInfo').refreshToken
    }
    if (wsCache.get('userInfo')) {
      config.headers['token'] = wsCache.get('userInfo').token
    }
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

// response 拦截器
service.interceptors.response.use(
  res => {
    if (res.data.refresh) {
      newToken = true
    } else if (res.headers.authorization) {
      // 更新token
      newToken = false
      const info = wsCache.get('userInfo')
      info.token = res.headers.authorization
      wsCache.set('userInfo', info)
    }

    /**
     * 返回体格式
     * {
     *   code 错误码
     *   data 数据
     *   message 错误描述
     * }
     */
    if (res.data.code === 1) {
      return res.data.data
    } else {
      config.one_message ? Message.closeAll() : null
      Message.error(res.data.message)
    }
  },
  error => {
    console.log('err: ' + error) // for debug
    if (error.response) {
      config.one_message ? Message.closeAll() : null
      Message.error(error.response.data.message || error.response.data)
    }
    return Promise.reject(error)
  }
)

export default service
