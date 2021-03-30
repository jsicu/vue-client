/*
 * @Author: linzq
 * @Date: 2021-01-30 16:22:26
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-29 18:23:01
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
  }
}
