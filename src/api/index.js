import { get } from './axios'

export default {
// 测试接口
  test: function(params) {
    return get(params, 'test')
  }
}
