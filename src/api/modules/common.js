/*
 * @Author: linzq
 * @Date: 2021-01-30 16:22:26
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-31 14:48:56
 * @Description:
 */
import { get, post } from '../axios'

export default {
  // 路由获取
  getMenuList: function(params) {
    return get(params, '/common/navigation')
  },
  // 字典获取
  getAll: function(params) {
    return get(params, '/common/getAll')
  },
  // 服务测试
  serveTest: function(params) {
    return get(params, '/common')
  }
}
