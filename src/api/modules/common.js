/*
 * @Author: linzq
 * @Date: 2021-01-30 16:22:26
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-22 10:37:38
 * @Description:
 */
import { get, post } from '../axios'

export default {
  // 路由获取
  getMenuList: function(params) {
    return get(params, '/common/navigation')
  }
}
