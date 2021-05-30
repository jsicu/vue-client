/**
 * @Author: linzq
 * @Date: 2021-05-20 16:56:45
 * @LastEditors: linzq
 * @LastEditTime: 2021-05-29 22:22:17
 * @Description: 开发任务管理接口
 */
import { get, post, del } from '../axios'

export default {
  // 测试接口
  schedule: function(params) {
    return get(params, '/nest/schedule')
  },
  list: function(params) {
    return get(params, '/nest/schedule/task')
  },
  newTask: function(params) {
    return post(params, '/nest/schedule/task')
  },
  del: function(params) {
    return del(params, '/nest/schedule/task')
  }
}
