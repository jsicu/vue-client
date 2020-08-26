import { get, post } from '../axios'

export default {
  // 测试接口
  publicKey: function(params) {
    return get(params, '/security/publicKey')
  },
  login: function(params) {
    return post(params, '/security/login')
  },
  logout: function(params) {
    return post(params, '/security/logout')
  },
  navigation: function(params) {
    return get(params, '/security/navigation')
  }
}
