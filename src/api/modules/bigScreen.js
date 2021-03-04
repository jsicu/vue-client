/*
 * @Author: linzq
 * @Date: 2021-03-01 20:20:01
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-01 20:25:59
 * @Description: 可视化bigScreen
 */

import { get, post } from '../axios'

export default {
  // 列表获取
  list: function(params) {
    return post(params, '/bigScreen/list')
  }
}
