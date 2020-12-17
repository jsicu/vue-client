/**
 * @author: linzq
 * @date: 2020/12/16
 * @description: 人机验证接口
 */

import { get, post } from '../axios'

export default {
  getPicture: function(params) {
    return get(params, '/image/verify')
  },
  check: function(params) {
    return post(params, '/image/check')
  }
}
