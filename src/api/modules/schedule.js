/**
 * @Author: linzq
 * @Date: 2021-05-20 16:56:45
 * @LastEditors: linzq
 * @LastEditTime: 2021-05-20 16:57:31
 * @Description: 开发任务管理接口
 */
import { get, post } from '../axios'

export default {
  // 测试接口
  schedule: function(params) {
    return get(params, '/nest/schedule')
  },
}
