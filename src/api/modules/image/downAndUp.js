import { get, post } from '../../axios'

export default {
  // 路由获取
  list: function(params) {
    return get(params, '/image/imgList')
  },
  upload: function(params) {
    return post(params, '/image/upload', 'multipart/form-data')
  },
  detail: function(params) {
    return get(params, '/image/detail')
  }
}